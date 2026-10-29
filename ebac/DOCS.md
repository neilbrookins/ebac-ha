# EBaC (Electronic Bible and Concordance)

## Getting started

Select **EBaC** in the sidebar. (If it isn't there, open this app's page under **Settings → Apps** and turn on **Show in sidebar**.)

Click inside the terminal window so it has the keyboard, then press a letter at the main menu:

- **V** to view a passage: type the start of a book name, then the chapter and verse. Where a translation writes a book's number in Roman numerals (IThessalonians, IIIJohn), you can type the number instead: `2th` finds IIThessalonians, as it finds 2Thessalonians in the King James Version; this works in `@` searches too. For the numbers you can type the letters under the digits instead, **q w e r t y u i o p** for **1 2 3 4 5 6 7 8 9 0**, and **m** for a minus sign, so a phone's keyboard can stay on letters. Chapter and verse count from the start of the book, so **0** or a negative number counts back: John 3:0 is John 2:25, and Exodus chapter 0 is Genesis 50. Enter alone means 1.
- **S** to search for words.
- **C** to change translation: its number chooses it for now; **d** and its number (such as **d** then **3**) chooses it and makes it the default, the one EBaC starts with from then on, for every Home Assistant user.
- **A** to add or remove a translation: see [Adding translations](#adding-translations).
- **P** to add a text from Project Gutenberg, such as the Book of Mormon: see [Texts from Project Gutenberg](#texts-from-project-gutenberg).
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
| `in the beginning` | the phrase "in the beginning" (words alone are a phrase) |
| `love hate 0` | verses with both "love" and "hate" |
| `love hate 2` | "love" and "hate" within 2 verses of each other |
| `cain abel +1` | "abel" in the verse after one with "cain" (both verses are listed) |
| `amen @rev 0` | "amen" in the book of Revelation |
| `food @gen -` | "food" anywhere except Genesis |
| `blessed =gospels 0` | "blessed" in the four Gospels (a group of books) |
| `faith =nt 0` | "faith" in the New Testament |
| `grace =rom..phile 0` | "grace" from Romans to Philemon |

A number means AND (`0` = in the same verse, `2` = within two verses), `+2`, `-2` and `~2` mean exactly two verses after, before, or apart, `,` means OR, `-` means AND NOT, `.` makes a phrase (with other operators, put it after each word but the first: `in the . beginning . @gen 0`), and `@` plus the start of a book's name means that book.

`=` plus the start of a group's name means a group of books: `=ot` and `=nt` (the Old and New Testaments); `=law`, `=history`, `=poetry`, `=majorprophets`, `=minorprophets`; `=gospels`, `=synoptics`, `=paul`, `=pastoral`, `=general` (James to Jude) and `=john` (John's gospel, letters and Revelation). As with books, type just enough to be unique: `=n`, `=go`, `=ma`. If it could be more than one, EBaC says which: "=p matches =poetry, =paul and =pastoral". `=` and two books is every book from one to the other: `=rom..phile`. Each translation keeps its publisher's arrangement: the Old Testament of the Douay-Rheims Bible includes Tobit and the others, and the King James Version with the Apocrypha has `=apocrypha` too.

Phrases find words next to each other, whatever the punctuation, and run on from one verse into the next (and across chapters and books). Words in [brackets], the King James translators' added words, may be typed or left out: `darkness upon the face` and `darkness was upon` both find Genesis 1:2.

The top of the list says how many verses were found. For a search of one word alone it also says how many times the word occurs, which can be more, since a verse may have it twice: "56 verses, grass 62 times", with the word highlighted as it is in the verses.

In the list of results, press the label beside a verse (**1** to **9**, then **a**, **b**, ...) to read it in context, and **x** to come back to the list. The letters under the digits, **q w e r t y u i o**, also pick entries 1 to 9, so on a phone you never have to switch the on-screen keyboard to numbers. A label works even when its entry is below the bottom of the screen, so entries you saw while the keyboard was hidden can still be opened after it reappears.

While typing a search, **Up** and **Down** bring back earlier searches. **Left**, **Right**, **Home**, **End** and **Delete** edit the line.

## Touch gestures

On a phone or tablet, you only need the keyboard to type a search or a book, chapter and verse. Everything else works by tapping and swiping:

| Where | Tap | Swipe |
|---|---|---|
| Main menu | any item, or the blank line next to it | — |
| Choosing a translation | a translation, or the blank line next to it | left or right: back, unchanged |
| Search results | a result, anywhere on it: read it in context | up: next page · down: previous page · left or right: back |
| Reading a passage | — | up or down: one verse · a long swipe: a whole screen · with two fingers: the next or previous book · left or right: back to the results |
| Typing a search | with the keyboard up: Enter (search) · with it hidden: brings it up | down: your previous search · up: the next one (any length: one step) · left or right: the cursor one character · a long swipe left or right: to the start or end of the line |
| Typing a book, chapter or verse | with the keyboard up: Enter · with it hidden: brings it up | left: erase the last character · a long swipe left: erase it all · right: Enter |
| Adding translations (**A**): the lists of languages and of translations | brings up the keyboard, to type a number | up: next page · down: previous page · left or right: Enter (type a number, such as 1 for English, then swipe to choose it; or swipe alone to go back) |
| "Press any key" | anywhere | anywhere |

When the list of translations fits on the screen with a blank line between them, it is shown that way, as the main menu is, so each is easier to tap; otherwise one to a line. Swiping up moves on to what comes next, as when scrolling. Tapping **View**, **Search** or **Add or remove a translation** brings up the keyboard, since you type next; the other gestures don't. Tapping anywhere else brings up the keyboard, as before, so you can still use every key; while you are typing a line (a search, or a book, chapter or verse) and the keyboard is up, a tap is Enter instead. Enter with nothing typed goes back to the main menu, as the Enter key does. If you hide the keyboard to see more of the screen, swiping and tapping keep it hidden; while it's showing, they leave it showing.

Some phone keyboards, such as the Amazon keyboard on a Fire tablet, hold back what you type until a word is finished. EBaC takes each letter from them at once, so a single key at the main menu works without pressing space after it, and a book's name is completed as you type it.

### If you use the Home Assistant Companion app

The Companion app has its own gestures, under **Settings → Companion app → Gestures**, and it acts on them as well as passing them to EBaC. If a two-finger swipe there is set to do something, such as refreshing the page, a two-finger swipe in EBaC does both: the Companion app's action first (a refresh asks whether to leave the page), and then EBaC's jump to the next or previous book.

So that EBaC's two-finger swipes work properly, set the Companion app's **two-finger swipe up** and **two-finger swipe down** to **None**. (Two-finger swipes left and right, and three-finger gestures, aren't used by EBaC, so they can stay as they are.)

Turning the phone in the Companion app takes the keyboard away from the page altogether: the keyboard stays up for a moment, but what you type goes nowhere. This happens in the Companion app itself, and no web page can undo it, so EBaC shows a **Tap here to type** bar instead: tap anywhere on EBaC and typing works again.

## Adding translations

The app comes with the King James Version. To add others, or remove them, press **A** at the main menu. EBaC first lists the languages there are translations in, each by its own name and its name in English, with how many translations it has: `1) English (34)`, then, in order of their English names, such as `Español, Spanish (4)` or `Deutsch, German (12)`. A `*` marks a language you have added translations in. Type a language's number and press Enter (**n** and **p**, then Enter, turn the page; Enter alone goes back to EBaC).

EBaC then lists that language's translations. The English ones include the American Standard Version, the Berean Standard Bible, the Lexham English Bible, Young's Literal Translation, Darby, Webster, the Geneva Bible, Tyndale, and three with the Apocrypha (the King James Version with the Apocrypha, the Douay-Rheims Bible and the Catholic Public Domain Version). Type the numbers of the ones you want, such as `6` or `6 14`, and press Enter (Enter alone goes back to the languages). Those already added are marked with a `*`. For each one, EBaC first shows its license (most are public domain; some are free only for non-commercial use) and the address of its page at CrossWire, and asks whether you agree to it: **y** adds it, **n** skips it. It asks every time, even for a fresh copy, since a license can change. Each one agreed to is downloaded and indexed in a few seconds; when it's done, press any key (or tap) and you are back at the main menu with the new translation chosen; EBaC starts with it from then on, and **C** switches between them (**d** and a number there makes another the one to start with). Choosing one you've already added downloads a fresh copy and makes it the one EBaC starts with, but only if its text has changed since you downloaded it; if not, EBaC says you already have that version and changes nothing. To download the same version again, remove it first (**r** and its number), then add it.

The languages and translations are read from where EBaC downloads them each time, so new ones appear on their own (140 translations in 56 languages at the moment, including Hebrew and Greek texts). The names of the languages come from Unicode's language database; the first time you press **A**, and once a month after, EBaC fetches them, which takes a few seconds. Some languages, such as Chinese, Japanese and Thai, are often written without spaces between words; EBaC searches word by word, so it notes that searching such a translation works poorly.

To remove one, type **r** and its number, such as `r6`. Adding and removing can be mixed, done in the order typed: `r10 11 13` removes 10 and adds 11 and 13. If anything in the line is wrong, nothing is done and the list says what was wrong. The King James Version that comes with the app can't be removed.

Added translations are kept in this app's own storage, so they are kept when the app is updated, and they are included in Home Assistant's backups (about 6 MB for each whole Bible, 2 MB for a New Testament). They are available to every Home Assistant user. To download, Home Assistant needs to be connected to the Internet.

## Texts from Project Gutenberg

Some texts, such as the Book of Mormon, aren't among those **A** offers, but are on [Project Gutenberg](https://www.gutenberg.org). Find the text there with its search, open its **Plain Text UTF-8** file in your browser, check it is the one you want, and copy its address (such as `https://www.gutenberg.org/cache/epub/17/pg17.txt`). Then press **P** at EBaC's main menu, paste the address, and press Enter. EBaC downloads it, shows its license and asks whether you agree (**y**), then adds it, as **A** does. To remove one, press **P**, then **r** and its number.

EBaC is taught Gutenberg's texts one at a time, as their layouts differ; for now it knows the Book of Mormon (ebook 17, as **BOM**). Nothing in the text is left out: the front matter (title page, the testimonies, the contents) comes before 1 Nephi chapter 1, and each book's heading and summary before its verse 1, shown as plain text without numbers. Comma or a swipe down from 1:1 reaches them, and searches find them. A verse taller than the screen is shown a screenful at a time: swipe up (or press space) for the rest.

## Exiting

Pressing or tapping **E** at the main menu exits EBaC. As with the Terminal app, the window greys out and offers **Press ⏎ to Reconnect**; press Enter to start EBaC again at the main menu.

## Your search history

Earlier searches are saved in this app's own storage, so they are kept when Home Assistant restarts, when the app is updated, and in backups. Each Home Assistant user has their own history: what one person searches for is not shown to anyone else.

## Voice (with the EBaC integration)

This app also answers Home Assistant's voice assistant, Assist, through the **EBaC integration** ([github.com/neilbrookins/ebac-ha-integration](https://github.com/neilbrookins/ebac-ha-integration), from HACS): say "Genesis one colon one" and hear the verse, then "next verse". When the app starts, it tells Home Assistant it is there, so the integration is offered under **Settings → Devices & services** without an address to type. The app answers on port 8080 of Home Assistant's own internal network only: nothing outside Home Assistant can reach it.

Unless you allow more, voice can only read, never change anything. Two options, under this app's **Configuration** tab, let the integration add and remove translations by voice ("add translation LITV", "remove translation LITV"). Both are off unless you check them:

- **Allow voice to add translations.** Risk: someone talking to a voice assistant, who needs no password, could add every translation of a language and fill Home Assistant's disk.
- **Allow voice to remove translations** (needs adding allowed too: this page can't stop you checking it alone, but on its own it does nothing, and the app's log says so). Risk: they could delete a translation you paid for, such as the NIV. EBaC's own translations can't be removed.

The integration has its own checkboxes for these as well, and both the app's option and the integration's must be on. After changing an option here, restart the app. A translation added by voice goes at the end of EBaC's list, so EBaC still starts with the same one here.

## Troubleshooting

The **Troubleshooting box** option, under this app's **Configuration** tab, shows a small box in the top right corner of EBaC's page listing what the page sees of the keyboard focus and the window's size (for example, when the phone is turned). A screenshot of it helps track down a problem that happens on one phone but not another. After changing the option, restart the app; leave it off normally.

## About

EBaC was written by Neil G. Brookins. The source code, and a standalone version for Linux, are at [github.com/neilbrookins/ebac](https://github.com/neilbrookins/ebac).
