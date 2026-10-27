# EBaC app for Home Assistant

> [!NOTE]
> **You are looking at the EBaC app for Home Assistant** (an app, which Home Assistant used to call an add-on: a program that runs beside it, here with a page in its sidebar). [Home Assistant](https://www.home-assistant.io/) is a free smart-home system, often run on a small computer such as a Raspberry Pi and used through a web browser or its phone app. If you have it, this is the easiest way to get EBaC: there's nothing to type or build, it updates itself, and besides the keyboard it works by tapping, swiping and clicking, on a phone, a tablet or a computer's web browser.
>
> **Don't use Home Assistant?** This version needs it. To run EBaC directly on Linux (including the Raspberry Pi), Windows, a Mac or Solaris, in a terminal window with the keyboard, go to **[installing EBaC](https://github.com/neilbrookins/ebac#installing)** in the main repository, which has the steps for every other computer, vintage ones too.

This repository adds **EBaC, the Electronic Bible and Concordance**, to Home Assistant as an app. After installing it, an **EBaC** button appears in the Home Assistant sidebar. Clicking it opens EBaC in a terminal window inside Home Assistant, ready to read and search the Bible with the keyboard, or by tapping, swiping and clicking.

EBaC itself is developed at [neilbrookins/ebac](https://github.com/neilbrookins/ebac), where it also runs as a standalone program on Linux, macOS and Solaris. This repository only packages it for Home Assistant.

## Contents

- [Installing](#installing)
- [**Using EBaC**](#using-ebac): reading, searching, adding translations, touch gestures, voice
- [Updating](#updating)
- [Supported hardware](#supported-hardware)
- [License](#license)

## Installing

[![Open your Home Assistant instance and show the add app repository dialog with this repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fneilbrookins%2Febac-ha-app)

Click the button above, or add the repository by hand:

1. In Home Assistant, go to **Settings → Apps** and select **Install app**.
2. Open the menu (⋮) in the top-right corner and select **Repositories**.
3. Paste `https://github.com/neilbrookins/ebac-ha-app` and select **Add**, then close the dialog.
4. Find **EBaC (Electronic Bible and Concordance)** in the list (you may need to refresh the page) and select it.
5. Select **Install**. Installing builds EBaC on your Home Assistant machine, which takes a few minutes, longer on a Raspberry Pi.
6. Select **Start**, then turn on **Show in sidebar**.

**EBaC** now appears in the sidebar for every user.

**Installed? Go on to [Using EBaC](#using-ebac).**

## Using EBaC

> [!TIP]
> **The full guide to using EBaC in Home Assistant is the app's documentation: [DOCS.md](ebac/DOCS.md).** Home Assistant also shows it on the app's page, under **Settings → Apps → EBaC → Documentation**.

| To learn about | Read |
|---|---|
| Getting started: the main menu and its keys | [Getting started](ebac/DOCS.md#getting-started) |
| Reading a passage, and paging through it | [Reading](ebac/DOCS.md#reading) |
| **Searching**: words, phrases, books, AND, OR, NOT, distances | [Searching](ebac/DOCS.md#searching), and every operator in EBaC's [Searching](https://github.com/neilbrookins/ebac#searching) |
| **Adding translations**: 140 in 56 languages | [Adding translations](ebac/DOCS.md#adding-translations), and more in EBaC's [Adding other translations](https://github.com/neilbrookins/ebac#adding-other-translations) |
| Tapping and swiping on a phone or tablet | [Touch gestures](ebac/DOCS.md#touch-gestures) |
| **Voice**: "John 3:16", then "next verse", with Assist | [Voice](ebac/DOCS.md#voice-with-the-ebac-integration), and the [EBaC integration](https://github.com/neilbrookins/ebac-ha-integration) |
| Your search history; exiting; troubleshooting | [Your search history](ebac/DOCS.md#your-search-history), [Exiting](ebac/DOCS.md#exiting), [Troubleshooting](ebac/DOCS.md#troubleshooting) |

EBaC works the same here as on a computer, so everything in [EBaC's own instructions](https://github.com/neilbrookins/ebac#contents) applies, except installing it.

## Updating

When a new version is released, Home Assistant shows an update for EBaC under **Settings → Apps** (and in **Settings → Updates**). Select it and choose **Update**. You don't need to remove or reinstall anything.

Updates also come when the system software EBaC runs on is fixed, not only when EBaC changes. Each month, [`tools/check-deps.sh`](tools/check-deps.sh) checks Home Assistant's base image and the Alpine packages the app installs (the ttyd web terminal, ncurses and the libraries they use). If any has a newer version, it makes a new app version, so the fix reaches you as an ordinary update instead of waiting, unannounced, for the next rebuild. The versions the current app is built with are listed in [`ebac/dependencies.txt`](ebac/dependencies.txt).

## Supported hardware

64-bit systems: Raspberry Pi 4 and 5 and other 64-bit ARM boards (`aarch64`), Home Assistant Green and Yellow, and PCs and virtual machines (`amd64`).

## License

GNU General Public License, version 2, the same as EBaC. See [`COPYING`](COPYING).
