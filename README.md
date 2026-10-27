# EBaC app for Home Assistant

> [!NOTE]
> **You are looking at the EBaC app for Home Assistant** (an app, which Home Assistant used to call an add-on: a program that runs beside it, here with a page in its sidebar). [Home Assistant](https://www.home-assistant.io/) is a free smart-home system, often run on a small computer such as a Raspberry Pi and used through a web browser or its phone app. If you have it, this is the easiest way to get EBaC: there's nothing to type or build, it updates itself, and besides the keyboard it works by tapping, swiping and clicking, on a phone, a tablet or a computer's web browser.
>
> **Don't use Home Assistant?** This version needs it. To run EBaC directly on Linux (including the Raspberry Pi), a Mac or Solaris, in a terminal window with the keyboard, go to **[EBaC](https://github.com/neilbrookins/ebac)**, the main repository, which explains how to install it there.

This repository adds **EBaC, the Electronic Bible and Concordance**, to Home Assistant as an app. After installing it, an **EBaC** button appears in the Home Assistant sidebar. Clicking it opens EBaC in a terminal window inside Home Assistant, ready to read and search the Bible with the keyboard, or by tapping, swiping and clicking.

EBaC itself is developed at [neilbrookins/ebac](https://github.com/neilbrookins/ebac), where it also runs as a standalone program on Linux, macOS and Solaris. This repository only packages it for Home Assistant.

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

## Updating

When a new version is released, Home Assistant shows an update for EBaC under **Settings → Apps** (and in **Settings → Updates**). Select it and choose **Update**. You don't need to remove or reinstall anything.

Updates also come when the system software EBaC runs on is fixed, not only when EBaC changes. Each month, [`tools/check-deps.sh`](tools/check-deps.sh) checks Home Assistant's base image and the Alpine packages the app installs (the ttyd web terminal, ncurses and the libraries they use). If any has a newer version, it makes a new app version, so the fix reaches you as an ordinary update instead of waiting, unannounced, for the next rebuild. The versions the current app is built with are listed in [`ebac/dependencies.txt`](ebac/dependencies.txt).

## Supported hardware

64-bit systems: Raspberry Pi 4 and 5 and other 64-bit ARM boards (`aarch64`), Home Assistant Green and Yellow, and PCs and virtual machines (`amd64`).

## License

GNU General Public License, version 2, the same as EBaC. See [`COPYING`](COPYING).
