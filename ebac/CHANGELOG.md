# Changelog

## 2.2.1

- A key pressed at the main menu (or in a list, a passage, or at "Press
  any key") now works at once with phone keyboards that hold back
  letters as a word being typed, such as the Amazon keyboard on a Fire
  tablet. Before, the key did nothing until space was pressed, and then
  turned up at the start of the next search.

## 2.2.0

EBaC 2.1, with a new concordance index:

- **Phrase search.** Type words alone, such as `in the beginning`, to
  find them next to each other, in order. Phrases run on from one verse
  into the next, and the King James translators' [bracketed] words may be
  typed or left out. With other operators, `.` makes a phrase:
  `in the . beginning . @gen 0`.
- **New distance operators**: `+2`, `-2` and `~2` find verses exactly
  two verses after, before, or apart (a number alone still means
  "within").
- **Translations with the Apocrypha** can be added: the King James
  Version with the Apocrypha, the Douay-Rheims Bible and the Catholic
  Public Domain Version (34 translations in all).
- Every word is indexed, and counted right: "the" occurs 64,040 times in
  the King James Version (shown as 31,487 before).
- The translations you have added are indexed again, once, when the app
  starts after this update (a few seconds each).
- Built from EBaC commit `b50fb87`.

## 2.1.25

- After adding or removing translations, EBaC waits for a key (or a tap)
  before going back to the main menu, so you can read what happened.
- Built from EBaC commit `ba1ad1c`.

## 2.1.24

- Fix: tapping **A** with the keyboard hidden could leave the top of the
  list of translations off the screen, as the keyboard came up just
  after the list was drawn. The list is now drawn again whenever the
  window changes size.
- Built from EBaC commit `2d79e17`.

## 2.1.23

- Remove translations you added: under **A** (now "Add or remove a
  translation"), type **r** and the number, such as `r6`. Adding and
  removing can be mixed in one line, such as `r10 11 13`.
- Choosing a translation you've already added downloads a fresh copy
  and makes it the one EBaC starts with.
- Built from EBaC commit `50bdb5a`.

## 2.1.22

- In the list of translations to add, those already added are marked
  with a `*` before the number, instead of "(added)" after the title,
  so more of each title fits.
- A translation you add now becomes the one EBaC starts with every
  time, not only the first time after adding it. The app keeps the order
  of the translation list across restarts and updates.
- Built from EBaC commit `5ea60c1`.

## 2.1.21

- Fix: the **Tap here to type** bar didn't appear when the phone was
  turned, because the keyboard was judged at the new width, as if it
  weren't up. Whether the keyboard is up is now kept through a turn.

## 2.1.20

- In the Home Assistant Companion app, turning the phone takes the
  keyboard focus away from the page altogether (a problem in the app,
  which no web page can undo), so what is typed goes nowhere until the
  screen is tapped. EBaC now shows a **Tap here to type** bar when that
  happens with the keyboard up; it goes as soon as the focus is back.

## 2.1.19

- When the phone is turned and EBaC's page loses the keyboard focus to
  the Home Assistant page around it, it is also taken back through that
  page (by focusing the frame EBaC's page is in).
- The troubleshooting box shows more lines, and where the Home Assistant
  page around EBaC has the focus.

## 2.1.18

- New option for troubleshooting, **Troubleshooting box**
  (`debug_overlay`, off by default): a box in the corner of EBaC's page
  lists what it sees of the keyboard focus and the window's size, to
  help find problems on a particular phone.
- When the phone is turned, taking the keyboard focus back is tried a
  few times over a second, not once.

## 2.1.17

- Fix: turning the phone could take the keyboard away from EBaC: the
  keyboard stayed up, but nothing typed reached EBaC (the cursor showed
  as an outline) until the screen was tapped. If the terminal loses the
  keyboard as the phone is turned, it now takes it back at once.
- The main menu is drawn again when the window changes size, such as when
  the phone is turned, as passages and lists already were.
- Built from EBaC commit `a94dbf4`.

## 2.1.16

- Fix: after restarting EBaC, choosing an added translation under
  **C** failed ("Can't chdir to ../RNKJV") and closed EBaC. Added
  translations are found again, and a translation whose folder is
  missing is now reported without closing EBaC.
- Built from EBaC commit `8d7b42f`.

## 2.1.15

- Add translations from EBaC's main menu: press **A** to choose from 31
  English translations (such as the American Standard Version, the
  Berean Standard Bible, the Lexham English Bible and Young's Literal
  Translation), which are downloaded and indexed in a few seconds each.
  They are kept in the app's own storage, so updates keep them, and
  backups include them. Tapping **A** brings up the keyboard.
- EBaC now runs from /data/ebac, which the app sets up at each start.
- Built from EBaC commit `a800b41`.

## 2.1.14

- EBaC can read translations from other sources (verse numbers like
  [1:1], longer verses, a few more verses than the King James), and its
  Change translation screen pages through a long list of translations.
  The touch gestures support that screen: tap a translation, swipe up or
  down for the next or previous page, sideways to go back.
- Built from EBaC commit `ce8e59b`.

## 2.1.13

- The Information screen has a third page of diagnostic information:
  EBaC's version (the commit it was built from and its date, and this
  app's version), where it runs from, your search history file, the
  terminal type (TERM) and window size, the terminal library, and the
  system it runs on. The first page shows the commit too.
- Built from EBaC commit `1cb910e`.

## 2.1.12

- The Information screen's list of computers now says that EBaC ran on
  Windows with Cygwin, and that Windows 10 and 11 run it in WSL.
- Built from EBaC commit `49cfdc0`.

## 2.1.11

- Going back a book (**b**, or a two-finger swipe down) from Exodus, or
  from anywhere in Genesis, now goes to Genesis 1:1, instead of a screen
  of "This verse doesn't exist...". The same was fixed at the other end,
  for the next book (**f**) and the next screen in Revelation.
- At Genesis 1:1, going back a book or a verse beeps and stays; at the
  end of Revelation, going on a book or a screen does the same. A passage
  now stops after Revelation 22:21.
- Built from EBaC commit `f0df8fd`.

## 2.1.10

- While reading, swipe up with two fingers to jump to the next book, or
  down to go back to the previous one (like the **f** and **b** keys).
  Any length works. So one finger moves a verse (or a screen, with a long
  swipe), and two fingers a whole book.

## 2.1.9

- Editing by swiping sideways:
  - At the search prompt, a short swipe left or right moves the cursor
    one character; a long one goes to the start or the end of the line
    (like Home and End).
  - At the book name, chapter and verse prompts, a short swipe left
    erases the last character (like Backspace); a long one erases the
    whole entry.
  A long swipe is one across at least a third of the screen.

## 2.1.8

- At the search prompt, swipe down to bring back your previous search,
  and up for the next one, like the Up and Down arrow keys. Each swipe
  is one step, whatever its length, and keeps the keyboard hidden if it
  was. Tap the screen to bring the keyboard back to edit or run it.
- Built from EBaC commit `0624ec5`.

## 2.1.7

- The top of the list of search results can use the full width of the
  screen, so a word one letter longer still gets its count on a phone.
- Built from EBaC commit `33c482d`.

## 2.1.6

- At the top of the list of search results, the counted word is
  highlighted, as it is in the verses, instead of being in quotation
  marks. This saves two columns, so on a phone a longer word still gets
  its count.
- Built from EBaC commit `2a2e12d`.

## 2.1.5

- The top of the list of search results now says what its numbers are:
  **--Beginning of list-- 56 verses, "grass" 62 times**. The number of
  times is shown only for a search of one word alone; with several words
  or a book it would have counted the whole Bible, not this list, so
  only the number of verses is shown. On a narrow screen the number of
  times is left out rather than let the line wrap.
- "Begining" is now spelled correctly.
- Built from EBaC commit `61794e5`.

## 2.1.4

- In the list of search results, the prompt at the bottom no longer
  wraps onto a second line on a narrow screen such as a phone: it
  becomes **--More-- (Press ? for menu.)**. Wider windows show the whole
  line as before.
- Built from EBaC commit `2c22597`.

## 2.1.3

- The main menu choices are easier to tap: there's a blank line between
  them, and a tap goes to the nearest choice, so each one can be tapped
  anywhere over two rows. Exit still can't be tapped.
- Built from EBaC commit `50eb3b1`.

## 2.1.2

- A hidden phone keyboard now stays hidden when you swipe or tap a
  result, so you can read a full-height screen at a time. Before, the
  keyboard came back as the new screen was drawn, shrinking the window
  part way through: a page back then skipped the lines in between. While
  the keyboard is showing, swipes leave it showing; tapping anywhere else
  still brings it up.

## 2.1.1

- Swiping down now always goes back a verse or a page. Before, the
  terminal could also scroll back through old screens at the same time,
  showing the wrong text. The terminal no longer keeps lines that have
  scrolled off the top (EBaC redraws every screen itself, so nothing is
  lost), and it no longer scrolls on its own under a swipe.

## 2.1.0

- Touch gestures, so on a phone the keyboard is only needed for typing:
  - Main menu: tap **Change**, **View**, **Search** or **Information**.
    (Exit is not tappable, so a slightly missed tap can't close EBaC.)
  - Choosing a translation: tap one; swipe left or right to go back.
  - Search results: tap a result to read it; swipe up for the next page,
    down for the previous one; swipe left or right to go back.
  - Reading: swipe up or down to move one verse, or a long swipe for a
    whole screen; swipe left or right to go back to the results.
  - "Press any key" screens: tap anywhere.
  Taps on View and Search bring up the keyboard, since typing comes
  next; other gestures don't. Tapping anywhere else brings up the
  keyboard, as before.
- Built from EBaC commit `8cc97e6`.

## 2.0.8

- At the chapter and verse prompts, **m** types a minus sign (shown as
  "-"), so negative numbers need no keyboard switching on a phone.
- Built from EBaC commit `ff5e31c`.

## 2.0.7

- A chapter or verse of **0**, or a negative number, counts back from the
  start of the book: John 3:0 is John 2:25, Exodus chapter 0 is
  Genesis 50, John 3:-3 is John 2:22. Pressing Enter alone still means 1.
- Built from EBaC commit `72c9e62`.

## 2.0.6

- In the list of search results, a label can be typed even when its
  entry isn't on the screen any more: if hiding the phone's keyboard
  showed entries 3, 4 and 5, typing **3** still opens that entry once
  the keyboard is back. Past the end of the list, the help screen still
  appears.
- Built from EBaC commit `f44c797`.

## 2.0.5

- When the window changes size, such as when a phone's on-screen
  keyboard appears or goes away, a passage or a list of search results
  is redrawn at once to fill the new size, from the same first verse.
  **CTRL-L** redraws it too.
- Built from EBaC commit `6d0d039`.

## 2.0.4

- The concordance index is now built while installing, instead of
  being downloaded with EBaC; searching works exactly as before.
- Built from EBaC commit `75af1f9`.

## 2.0.3

- When viewing a passage, the chapter and verse can be typed with the
  letters **q w e r t y u i o p** for **1 2 3 4 5 6 7 8 9 0**, so a
  phone's on-screen keyboard can stay on letters.
- Built from EBaC commit `d5591ff`.

## 2.0.2

- In the list of search results, the letters **q w e r t y u i o** pick
  entries 1 to 9, like the digits above them, so on a phone you don't
  have to switch the on-screen keyboard to numbers.
- Entries 10 and up are now labelled **a b c d f g h j k l m s v z**,
  skipping letters that have another job on that screen.
- Built from EBaC commit `9215c24`.

## 2.0.1

- Each Home Assistant user now has their own search history, instead of
  one history shared by everyone. It is kept in the app's storage under
  that user's name, the way the Linux version keeps it in each user's
  home folder.
- History saved by 2.0.0, which was shared, is not carried over.

## 2.0.0

- First release of EBaC as a Home Assistant app.
- Opens from the **EBaC** button in the sidebar, for all users.
- Built from EBaC commit `74d9495` ([neilbrookins/ebac](https://github.com/neilbrookins/ebac)).
