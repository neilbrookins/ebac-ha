# EBaC (Electronic Bible and Concordance)

## Getting started

Select **EBaC** in the sidebar. (If it isn't there, open this app's page under **Settings → Apps** and turn on **Show in sidebar**.)

Click inside the terminal window so it has the keyboard, then press a letter at the main menu:

- **V** to view a passage: type the start of a book name, then the chapter and verse. For the numbers you can type the letters under the digits instead, **q w e r t y u i o p** for **1 2 3 4 5 6 7 8 9 0**, and **m** for a minus sign, so a phone's keyboard can stay on letters. Chapter and verse count from the start of the book, so **0** or a negative number counts back: John 3:0 is John 2:25, and Exodus chapter 0 is Genesis 50. Enter alone means 1.
- **S** to search for words.
- **C** to change translation.
- **A** to add a translation: see [Adding translations](#adding-translations).
- **I** for information about EBaC.
- **E** to exit.

In any list or passage, press **?** to see the keys you can use there. If the window changes size, for example when a phone's on-screen keyboard appears or goes away, the passage or list is redrawn at once to fit.

## Reading

| Key | Does |
|---|---|
| Space, **n** or Page Down | next screen |
| **p** or Page Up | previous screen |
| **.**, **>** or Down arrow | next verse |
| **,**, **<** or Up arrow | previous verse |
| **f** / **b** | forward / back one book |
| **x** or Esc | back to the main menu |

## Searching

Type the words to search for, then Enter. Searches use postfix (reverse Polish) notation, so the operator comes after the two things it combines:

| Search | Finds |
|---|---|
| `amen` | every verse containing "amen" |
| `love hate 0` | verses with both "love" and "hate" |
| `love hate 2` | "love" and "hate" within 2 verses of each other |
| `amen @rev 0` | "amen" in the book of Revelation |
| `food @gen -` | "food" anywhere except Genesis |
| `@mat @mar , @lu , @joh , blessed 0` | "blessed" in the four Gospels |

A number means AND (`0` = in the same verse), `,` means OR, `-` means AND NOT, and `@` plus the start of a book's name means that book.

The top of the list says how many verses were found. For a search of one word alone it also says how many times the word occurs, which can be more, since a verse may have it twice: "56 verses, grass 62 times", with the word highlighted as it is in the verses.

In the list of results, press the label beside a verse (**1** to **9**, then **a**, **b**, ...) to read it in context, and **x** to come back to the list. The letters under the digits, **q w e r t y u i o**, also pick entries 1 to 9, so on a phone you never have to switch the on-screen keyboard to numbers. A label works even when its entry is below the bottom of the screen, so entries you saw while the keyboard was hidden can still be opened after it reappears.

While typing a search, **Up** and **Down** bring back earlier searches. **Left**, **Right**, **Home**, **End** and **Delete** edit the line.

## Touch gestures

On a phone or tablet, you only need the keyboard to type a search or a book, chapter and verse. Everything else works by tapping and swiping:

| Where | Tap | Swipe |
|---|---|---|
| Main menu | **Change**, **View**, **Search** or **Information**, or the blank line next to it (Exit isn't tappable) | — |
| Choosing a translation | a translation | left or right: back, unchanged |
| Search results | a result, anywhere on it: read it in context | up: next page · down: previous page · left or right: back |
| Reading a passage | — | up or down: one verse · a long swipe: a whole screen · with two fingers: the next or previous book · left or right: back to the results |
| Typing a search | brings up the keyboard | down: your previous search · up: the next one (any length: one step) · left or right: the cursor one character · a long swipe left or right: to the start or end of the line |
| Typing a book, chapter or verse | brings up the keyboard | left: erase the last character · a long swipe left: erase it all |
| "Press any key" | anywhere | anywhere |

Swiping up moves on to what comes next, as when scrolling. Tapping **View**, **Search** or **Add a translation** brings up the keyboard, since you type next; the other gestures don't. Tapping anywhere else brings up the keyboard, as before, so you can still use every key. If you hide the keyboard to see more of the screen, swiping and tapping keep it hidden; while it's showing, they leave it showing.

### If you use the Home Assistant Companion app

The Companion app has its own gestures, under **Settings → Companion app → Gestures**, and it acts on them as well as passing them to EBaC. If a two-finger swipe there is set to do something, such as refreshing the page, a two-finger swipe in EBaC does both: the Companion app's action first (a refresh asks whether to leave the page), and then EBaC's jump to the next or previous book.

So that EBaC's two-finger swipes work properly, set the Companion app's **two-finger swipe up** and **two-finger swipe down** to **None**. (Two-finger swipes left and right, and three-finger gestures, aren't used by EBaC, so they can stay as they are.)

Turning the phone in the Companion app takes the keyboard away from the page altogether: the keyboard stays up for a moment, but what you type goes nowhere. This happens in the Companion app itself, and no web page can undo it, so EBaC shows a **Tap here to type** bar instead: tap anywhere on EBaC and typing works again.

## Adding translations

The app comes with the King James Version. To add others, press **A** at the main menu: EBaC lists 31 English translations it can download, including the American Standard Version, the Berean Standard Bible, the Lexham English Bible, Young's Literal Translation, Darby, Webster, the Geneva Bible and Tyndale. Type the numbers of the ones you want, such as `6` or `6 14`, and press Enter (**n** and **p**, then Enter, turn the page; Enter alone goes back). Each one is downloaded and indexed in a few seconds, and then you are back at the main menu with the new translation chosen; **C** switches between them.

Added translations are kept in this app's own storage, so they are kept when the app is updated, and they are included in Home Assistant's backups (about 6 MB for each whole Bible, 2 MB for a New Testament). They are available to every Home Assistant user. To download, Home Assistant needs to be connected to the Internet.

## Exiting

Pressing **E** at the main menu exits EBaC. As with the Terminal app, the window greys out and offers **Press ⏎ to Reconnect**; press Enter to start EBaC again at the main menu.

## Your search history

Earlier searches are saved in this app's own storage, so they are kept when Home Assistant restarts, when the app is updated, and in backups. Each Home Assistant user has their own history: what one person searches for is not shown to anyone else.

## Troubleshooting

The **Troubleshooting box** option, under this app's **Configuration** tab, shows a small box in the top right corner of EBaC's page listing what the page sees of the keyboard focus and the window's size (for example, when the phone is turned). A screenshot of it helps track down a problem that happens on one phone but not another. After changing the option, restart the app; leave it off normally.

## About

EBaC was written by Neil G. Brookins. The source code, and a standalone version for Linux, are at [github.com/neilbrookins/ebac](https://github.com/neilbrookins/ebac).
