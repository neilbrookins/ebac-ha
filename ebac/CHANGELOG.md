# Changelog

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
