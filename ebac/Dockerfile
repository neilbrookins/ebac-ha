# Home Assistant app: EBaC (Electronic Bible and Concordance)
#
# EBaC itself is not copied into this repository. It is downloaded from
# https://github.com/neilbrookins/ebac at the commit below and compiled
# when Home Assistant installs or updates the app, so there is only one
# copy of the program's source.
#
# To ship a newer EBaC to Home Assistant users:
#   1. set EBAC_COMMIT to the new commit of neilbrookins/ebac, and
#   2. bump "version" in config.yaml, so Home Assistant offers the update.

ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24-2026.10.1

# ---- Stage 1: compile EBaC ----
FROM ${BUILD_FROM} AS build

# BUILD_VERSION is this app's version, which Home Assistant passes to the
# build; EBaC's Information screen shows it ("Home Assistant app 2.1.13").
ARG BUILD_VERSION
ARG EBAC_COMMIT=9b82a13de1cf523c52950866be52bff8492b33ce

RUN apk add --no-cache build-base ncurses-dev tar

# "make" builds the program and also each translation's concordance
# index (the .dat files in AV), which isn't stored in the EBaC repository.
# The index program, the translation importer (add-translation.sh, for
# A)dd a translation) and the groups of books (groups, groups.KJVA: =nt in
# a search) are kept too, and index.version identifies the index
# program's source, so that ebac-setup can tell when an update changes it.
WORKDIR /src
RUN curl -fsSL "https://github.com/neilbrookins/ebac/archive/${EBAC_COMMIT}.tar.gz" \
        | tar -xz --strip-components=1 \
    && make EBAC_PACKAGE="Home Assistant app${BUILD_VERSION:+ $BUILD_VERSION}" \
    && mkdir -p /out/AV \
    && cp bible index add-translation.sh trans groups groups.* /out/ \
    && cat index.c both.h utf8.c utf8.h | sha256sum | cut -c1-64 > /out/index.version \
    && cp AV/* /out/AV/

# ---- Stage 2: the app ----
FROM ${BUILD_FROM}

# ttyd is the web terminal used by Home Assistant's own Terminal app.
# ncurses-terminfo-base describes ttyd's terminal (xterm-256color).
# The translation importer needs only BusyBox (its sh and awk) and curl
# with ca-certificates, to download (the base image has those already).
RUN apk add --no-cache ttyd ncurses-libs ncurses-terminfo-base curl ca-certificates

# EBaC's files: the program, the 'trans' list, the King James text, the
# index program, the translation importer and the groups of books. (EBaC itself runs from
# /data/ebac, which links to these: see ebac-setup.)
COPY --from=build /out /usr/share/ebac

# ttyd's web page, with touch gestures added (taps and swipes on a phone
# become the keys EBaC understands; see gestures.js). Made from the page of
# the ttyd installed above, so the two always match.
COPY gestures.js make-index.sh /tmp/
RUN sh /tmp/make-index.sh /tmp/gestures.js /usr/share/ebac/index.html \
    && rm /tmp/gestures.js /tmp/make-index.sh

# The script that starts ttyd with EBaC in it.
COPY rootfs /

LABEL \
    org.opencontainers.image.title="Home Assistant App: EBaC" \
    org.opencontainers.image.description="Electronic Bible and Concordance, in a terminal in the sidebar" \
    org.opencontainers.image.source="https://github.com/neilbrookins/ebac-ha" \
    org.opencontainers.image.licenses="GPL-2.0"
