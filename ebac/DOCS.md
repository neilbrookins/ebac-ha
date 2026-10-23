# EBaC (Electronic Bible and Concordance)

## Getting started

Select **EBaC** in the sidebar. (If it isn't there, open this app's page under **Settings → Apps** and turn on **Show in sidebar**.)

Click inside the terminal window so it has the keyboard, then press a letter at the main menu:

- **V** to view a passage: type the start of a book name, then the chapter and verse.
- **S** to search for words.
- **C** to change translation.
- **I** for information about EBaC.
- **E** to exit.

In any list or passage, press **?** to see the keys you can use there.

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

In the list of results, press the label beside a verse (**1** to **9**, then **a**, **b**, ...) to read it in context, and **x** to come back to the list. The letters under the digits, **q w e r t y u i o**, also pick entries 1 to 9, so on a phone you never have to switch the on-screen keyboard to numbers.

While typing a search, **Up** and **Down** bring back earlier searches. **Left**, **Right**, **Home**, **End** and **Delete** edit the line.

## Exiting

Pressing **E** at the main menu exits EBaC. As with the Terminal app, the window greys out and offers **Press ⏎ to Reconnect**; press Enter to start EBaC again at the main menu.

## Your search history

Earlier searches are saved in this app's own storage, so they are kept when Home Assistant restarts, when the app is updated, and in backups. Each Home Assistant user has their own history: what one person searches for is not shown to anyone else.

## About

EBaC was written by Neil G. Brookins. The source code, and a standalone version for Linux, are at [github.com/neilbrookins/ebac](https://github.com/neilbrookins/ebac).
