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

ARG EBAC_COMMIT=61794e53fd66cbfeece376648368f61a80f29bf0

RUN apk add --no-cache build-base ncurses-dev tar

# "make" builds the program and also each translation's concordance
# index (the .dat files in AV), which isn't stored in the EBaC repository.
WORKDIR /src
RUN curl -fsSL "https://github.com/neilbrookins/ebac/archive/${EBAC_COMMIT}.tar.gz" \
        | tar -xz --strip-components=1 \
    && make \
    && mkdir -p /out/AV \
    && cp bible /out/ \
    && cp trans /out/ \
    && cp AV/* /out/AV/

# ---- Stage 2: the app ----
FROM ${BUILD_FROM}

# ttyd is the web terminal used by Home Assistant's own Terminal app.
# ncurses-terminfo-base describes ttyd's terminal (xterm-256color).
RUN apk add --no-cache ttyd ncurses-libs ncurses-terminfo-base

# EBaC's files: the program, the 'trans' list and the King James text.
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
