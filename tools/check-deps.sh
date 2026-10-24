#!/bin/sh
# check-deps.sh -- has anything the EBaC app is built from changed?
#
#   sh tools/check-deps.sh            report only
#   sh tools/check-deps.sh --update   also make the app's next version
#
# Home Assistant offers an update only when the app's version number (in
# ebac/config.yaml) changes. EBaC itself, and Home Assistant's base image,
# are pinned in ebac/Dockerfile, so they only change with a new version.
# But the Alpine packages the Dockerfile adds (ttyd, ncurses, and the
# libraries ttyd uses) are simply the newest at build time: when Alpine
# fixes one, an installed app keeps the old one, and nothing says so.
#
# This compares what the app was last built from with what is newest now:
#   - Home Assistant's base image: the newest release of
#     github.com/home-assistant/docker-base that is built for our Alpine
#     version, against the tag in ebac/Dockerfile;
#   - the Alpine packages: their versions on Alpine's stable branch (from
#     the build recipes, APKBUILD, in github.com/alpinelinux/aports),
#     against ebac/dependencies.txt.
# With --update, when something changed, it writes the new versions there,
# moves the Dockerfile to the new base image, raises the app's version by
# one (2.1.7 -> 2.1.8) and adds a CHANGELOG entry. Installing that update
# rebuilds the app with the newest packages.
#
# It never moves to a newer Alpine version (3.24 -> 3.25), which could need
# other changes; that, and a new upstream version of ttyd (whose terminal
# the touch gestures rely on), are reported as needing a person.
#
# Exit status: 0 nothing changed, 3 something changed, 1 the check failed.
# Needs only sh, git, awk and sed. Run from anywhere in the repository.

set -e
cd "$(dirname "$0")/.."
if command -v nawk > /dev/null 2>&1; then AWK=nawk; else AWK=awk; fi

update=no
[ "$1" = "--update" ] && update=yes

record=ebac/dependencies.txt
dockerfile=ebac/Dockerfile
config=ebac/config.yaml
changelog=ebac/CHANGELOG.md

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fail() {
        echo "check-deps: $*" >&2
        exit 1
}

# ---- what the app was last built from
base=$(sed -n 's|^ARG BUILD_FROM=ghcr.io/home-assistant/base:||p' "$dockerfile")
alpine=${base%%-*}          # 3.24
base_release=${base#*-}     # 2026.10.1
[ -n "$alpine" ] && [ -n "$base_release" ] || fail "no BUILD_FROM base image in $dockerfile"
[ -f "$record" ] || fail "$record is missing"

# ---- Home Assistant's base image
git ls-remote --tags https://github.com/home-assistant/docker-base > "$work/tags" ||
        fail "can't reach github.com/home-assistant/docker-base"
sed -n 's|.*refs/tags/\([0-9][0-9][0-9][0-9]\.[0-9]*\.[0-9]*\)$|\1|p' "$work/tags" |
        sort -t. -k1,1n -k2,2n -k3,3n > "$work/releases"
newest_release=""
alpine_latest=""
# the newest release (newest first) whose images include our Alpine version
for r in $(sort -t. -k1,1nr -k2,2nr -k3,3nr "$work/releases" | head -5); do
        rm -rf "$work/db"
        git clone -q --depth 1 --branch "$r" https://github.com/home-assistant/docker-base \
                "$work/db" 2> /dev/null || fail "can't download docker-base $r"
        yml=$work/db/.github/workflows/builder.yml
        [ -n "$alpine_latest" ] ||
                alpine_latest=$(sed -n 's/^ *ALPINE_LATEST: *"\([0-9.]*\)".*/\1/p' "$yml")
        if grep -q "alpine_version:.*\"$alpine\"" "$yml"; then
                newest_release=$r
                break
        fi
done
[ -n "$newest_release" ] || fail "no recent docker-base release is built for Alpine $alpine"

# ---- the Alpine packages, from the build recipes on the stable branch
# ($record lines: "package  repository/package  version")
$AWK '!/^#/ && NF == 3 { print $2 }' "$record" > "$work/paths"
[ -s "$work/paths" ] || fail "$record lists no packages"
git clone -q --depth 1 --branch "$alpine-stable" --filter=blob:none --sparse \
        https://github.com/alpinelinux/aports "$work/aports" 2> /dev/null ||
        fail "can't download Alpine's aports, branch $alpine-stable"
(cd "$work/aports" && git sparse-checkout set $(cat "$work/paths")) > /dev/null 2>&1 ||
        fail "can't fetch the package recipes from aports"

: > "$work/new-record"
: > "$work/changes"
: > "$work/attention"
while IFS= read -r line; do
        case $line in
        "#"* | "")
                echo "$line" >> "$work/new-record"
                continue ;;
        esac
        set -- $line
        name=$1 path=$2 old=$3
        recipe=$work/aports/$path/APKBUILD
        [ -f "$recipe" ] || fail "Alpine $alpine has no $path (renamed or removed?)"
        ver=$(sed -n 's/^pkgver=["'\'']*\([^"'\'' ]*\).*/\1/p' "$recipe" | head -1)
        rel=$(sed -n 's/^pkgrel=["'\'']*\([0-9]*\).*/\1/p' "$recipe" | head -1)
        case $ver$rel in
        "" | *'$'*) fail "can't read the version in $path/APKBUILD" ;;
        esac
        new=$ver-r$rel
        printf '%-16s %-24s %s\n' "$name" "$path" "$new" >> "$work/new-record"
        if [ "$new" != "$old" ]; then
                echo "$name $old -> $new" >> "$work/changes"
                if [ "$name" = ttyd ] && [ "${old%-r*}" != "$ver" ]; then
                        echo "ttyd's own version changed ($old -> $new): test the touch gestures, which rely on its terminal (xterm.js)." >> "$work/attention"
                fi
        fi
done < "$record"

if [ "$newest_release" != "$base_release" ]; then
        echo "Home Assistant base image $alpine-$base_release -> $alpine-$newest_release" >> "$work/changes"
fi
case $alpine_latest in
"" | "$alpine") ;;
*) echo "Home Assistant's base images now default to Alpine $alpine_latest (the app uses $alpine). Moving is a manual change." >> "$work/attention" ;;
esac

# ---- report
echo "Built from: base image $alpine-$base_release; Alpine $alpine packages in $record"
if [ -s "$work/changes" ]; then
        echo "Changed since the app's last version:"
        sed 's/^/  /' "$work/changes"
else
        echo "Nothing has changed."
fi
if [ -s "$work/attention" ]; then
        echo "Needs a person:"
        sed 's/^/  /' "$work/attention"
fi
[ -s "$work/changes" ] || exit 0
[ "$update" = yes ] || exit 3

# ---- make the next version
cp "$work/new-record" "$record"
if [ "$newest_release" != "$base_release" ]; then
        sed "s|^ARG BUILD_FROM=ghcr.io/home-assistant/base:.*|ARG BUILD_FROM=ghcr.io/home-assistant/base:$alpine-$newest_release|" \
                "$dockerfile" > "$work/Dockerfile" && cp "$work/Dockerfile" "$dockerfile"
fi
version=$(sed -n 's/^version: *"\([0-9.]*\)".*/\1/p' "$config")
case $version in
*.*.*) ;;
*) fail "can't read the version in $config" ;;
esac
next=${version%.*}.$((${version##*.} + 1))
sed "s/^version: *\"$version\"/version: \"$next\"/" "$config" > "$work/config" &&
        cp "$work/config" "$config"
{
        echo "# Changelog"
        echo
        echo "## $next"
        echo
        echo "- Rebuilt with updated system software (no change to EBaC itself):"
        sed 's/^/  - /' "$work/changes"
        echo
        sed '1{/^# Changelog$/d;}' "$changelog" | sed '1{/^$/d;}'
} > "$work/changelog" && cp "$work/changelog" "$changelog"
echo "Made version $next."
exit 3
