# Changelog

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
