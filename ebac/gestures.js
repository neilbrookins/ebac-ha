/*
 * Touch gestures for EBaC in the Home Assistant app.
 *
 * This script is added to the web page of ttyd, the web terminal EBaC runs
 * in. The terminal itself never passes swipes on to the program, and every
 * tap makes a phone show its keyboard; so the gestures are recognised here,
 * in the page, and turned into the keys EBaC already understands.
 *
 * EBaC says which screen is showing with a private escape sequence,
 * "ESC ] 7766 ; name BEL" (only when EBAC_GESTURES is set; see scr_mode()
 * in EBaC's curses.c), and the gestures depend on it:
 *
 *   screen    tap                              swipe
 *   menu      the nearest of C, A, V, S or I:   -
 *             that key (never E, so a
 *             slightly missed tap can't exit)
 *   trans     a numbered translation: it        left/right: back, unchanged
 *   transenter  (more than 9 translations, shown a page at a time)
 *             a numbered translation: its       up/down: next/previous page;
 *             number and Enter                  left/right: back, unchanged
 *   list      a result (any line of it): its    up: next page, down: previous
 *             label                             left/right: back (x)
 *   passage   -                                 up/down: next/previous verse;
 *                                               a long swipe: next/previous
 *                                               screen; left/right: back (x);
 *                                               with two fingers, up/down: the
 *                                               next/previous book (f, b)
 *   anykey    anywhere: a key ("Press any key") any: a key
 *   search    -                                 down: the previous search in
 *                                               the history, up: the next
 *                                               (Up and Down arrows), any length;
 *                                               left/right: cursor left/right,
 *                                               a long one: to the start/end
 *                                               (Home, End)
 *   input     -                                 left: erase a character
 *   (book,                                      (Backspace), a long one: the
 *   chapter,                                    whole entry (CTRL-U)
 *   verse)
 *
 * A tap this script uses doesn't bring up the keyboard, except on View,
 * Search and Add a translation in the main menu, which ask for typing next. Any other tap works
 * as before: it brings up the keyboard.
 *
 * Letters a phone keyboard holds back as a word being composed are sent to
 * EBaC at once (see "Keyboards that hold back what is typed", below).
 *
 * The terminal's scrollback (the lines that have scrolled off the top) is
 * turned off. EBaC redraws the whole screen itself, so those lines are only
 * old screens, and the terminal would scroll back to them on a swipe down,
 * fighting the swipe's own job (previous verse or page). The terminal's own
 * touch scrolling is also kept from seeing the swipes this script uses.
 *
 * Hiding a phone's keyboard leaves the terminal's typing box focused, and
 * the phone then brings the keyboard back as soon as the screen is redrawn,
 * shrinking the window in the middle of a page: a page back would skip the
 * lines in between. So a gesture made while the keyboard is hidden lets go
 * of the typing box first, and the keyboard stays hidden. (While it's
 * showing, gestures leave it showing.) A tap anywhere else still brings it
 * up.
 */
(function () {
    "use strict";

    var MODE_OSC = 7766;    /* EBaC's "which screen" escape sequence */
    var TAP_MAX = 24;       /* px: a touch moving less than this is a tap */
    var LONG_SWIPE = 0.3;   /* a swipe longer than this share of the
                               terminal's height (or, sideways, its width)
                               is a long one: a whole screen, say */

    var mode = "";          /* the screen EBaC last said it was showing */
    var term = null;        /* the terminal being listened to */
    var touchTerm = null;   /* the terminal the touch handlers are on */
    var start = null;       /* where the current touch began */
    var two = null;         /* a two-finger touch: where the two fingers'
                               midpoint began, and where it is now */
    var lastTouchEnd = 0;   /* to ignore the click a browser adds after a tap */
    var fullHeight = {};    /* the tallest the window has been, per width */
    var ROTATE_TIME = 1500; /* ms: a lost focus this close to a change in
                               width comes from turning the phone */
    var lettingGo = false;  /* this script is taking the focus away itself */
    var lastWidth = window.innerWidth;
    var widthChanged = 0;   /* when the window's width last changed */
    var focusLost = 0;      /* when the typing box last lost the focus */

    /*
    ** Troubleshooting: with the app's "debug_overlay" option on, the page
    ** is given window.EBAC_DEBUG, and a small box in the top right corner
    ** lists what this script sees: the focus coming and going, the window
    ** changing size, and its attempts to take the focus back. (For a phone
    ** whose behaviour can't be reproduced elsewhere: a screenshot shows it.)
    */
    var debugBox = null, debugLines = [], debugStart = Date.now();

    function debug(text) {
        if (!window.EBAC_DEBUG)
            return;
        if (!debugBox && document.body) {
            debugBox = document.createElement("div");
            debugBox.style.cssText = "position:fixed;top:0;right:0;z-index:99999;" +
                "max-width:70%;padding:2px 4px;font:9px/1.2 monospace;" +
                "white-space:pre;overflow:hidden;pointer-events:none;" +
                "background:rgba(255,255,160,0.85);color:#000";
            document.body.appendChild(debugBox);
        }
        debugLines.push(((Date.now() - debugStart) / 1000).toFixed(1) + " " + text);
        if (debugLines.length > 32)
            debugLines.shift();
        if (debugBox)
            debugBox.textContent = debugLines.join("\n");
    }

    /* the element with the focus in a document, looking inside shadow roots
       (as Home Assistant's page uses them) */
    function deepActive(doc) {
        var a = doc.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement)
            a = a.shadowRoot.activeElement;
        return a;
    }

    /* the focus, in short: this page focused (P) or not (p) and what has it;
       then Home Assistant's page around it (T or t) and what has it there */
    function focusState() {
        var a = document.activeElement, text, top;

        text = (document.hasFocus() ? "P " : "p ") +
            (term && a === term.textarea ? "box" : a ? a.tagName.toLowerCase() : "none");
        try {
            if (window.parent !== window) {
                top = window.parent.document;
                a = deepActive(top);
                text += " / " + (top.hasFocus() ? "T " : "t ") +
                    (a ? a.tagName.toLowerCase() + (a.id ? "#" + a.id : "") : "none");
            }
        } catch (err) {
            text += " / ?";             /* (another origin: can't see it) */
        }
        return text;
    }

    function send(key) {
        term.input(key, true);
    }

    /* the height of the part of the page that can be seen */
    function windowHeight() {
        return window.visualViewport ? window.visualViewport.height
                                     : window.innerHeight;
    }

    var keyboardUp = false;     /* as of the last resize */
    var firstSeen = {};         /* when each width was first seen */

    /* remember the window's full height (no keyboard) for this width, and
       whether the keyboard is up. (Not judged for a width first seen in the
       last moment, as while the phone turns: its full height isn't known
       yet, so the keyboard is taken to be as it was.) */
    function noteHeight() {
        var w = window.innerWidth, h = windowHeight(), now = Date.now();
        if (!fullHeight[w] || h > fullHeight[w])
            fullHeight[w] = h;
        if (!firstSeen[w])
            firstSeen[w] = now;
        if (now - firstSeen[w] > ROTATE_TIME)
            keyboardUp = h < 0.85 * fullHeight[w];
    }

    /* before a gesture that needs no typing: if the typing box is focused
       but the keyboard is hidden (the window is its full height), let go of
       the typing box, so the phone doesn't bring the keyboard back */
    function keepKeyboardHidden() {
        var box = term.textarea;
        noteHeight();
        if (box && document.activeElement === box &&
                windowHeight() >= 0.85 * fullHeight[window.innerWidth]) {
            lettingGo = true;
            box.blur();
            lettingGo = false;
        }
    }

    /*
    ** Keep the keyboard working when the phone is turned. Home Assistant
    ** lays its page out again when the window's width crosses 870 px (its
    ** sidebar changes between a pop-over and a docked one), as a phone's
    ** does when turned sideways, and that moves the panel this page is in;
    ** the browser then takes the focus from the terminal's typing box. The
    ** keyboard stays up, but what is typed goes nowhere (the cursor shows
    ** as an outline). So when the typing box loses the focus close to a
    ** change in the window's width, and this script didn't let go of it,
    ** it is given the focus back. (A change in height alone, such as the
    ** keyboard coming or going, is left alone.)
    */
    function refocus() {
        focusLost = 0;
        /* (tried a few times: the focus may be taken more than once while
           the phone turns) */
        [50, 400, 1200].forEach(function (delay) {
            setTimeout(function () {
                if (!term || !term.textarea ||
                        (document.hasFocus() && document.activeElement === term.textarea))
                    return;
                /* the focus may have gone out of this page altogether (to
                   the Home Assistant page around it), with the typing box
                   still this page's active element: take the focus back
                   first */
                debug("refocus @" + delay + ": " + focusState());
                window.focus();
                term.focus();
                if (!document.hasFocus() && window.frameElement) {
                    /* through Home Assistant's page: give the focus to the
                       frame this page is in, and then to the typing box */
                    try {
                        window.frameElement.focus();
                        term.focus();
                    } catch (err) {
                        /* (not allowed: nothing more to try) */
                    }
                    debug("  via frame: " + focusState());
                } else {
                    debug("  now " + focusState());
                }
            }, delay);
        });
    }

    function onBlur() {
        debug("box blur" + (lettingGo ? " (ours)" : "") +
              (widthChanged ? ", " + (Date.now() - widthChanged) + " ms after width change" : ""));
        if (lettingGo)
            return;
        focusLost = Date.now();
        if (focusLost - widthChanged < ROTATE_TIME)
            refocus();
    }

    /*
    ** When the phone's own focus leaves the web page altogether (in the
    ** Home Assistant Companion app, turning the phone does this), no script
    ** can bring it back: only a touch can. The keyboard stays up for a few
    ** seconds, but what is typed goes nowhere. So if the page loses the
    ** focus while the keyboard is showing, and neither it nor Home
    ** Assistant's page around it has the focus, a bar asks for a tap; it
    ** goes as soon as the focus comes back.
    */
    var tapBar = null;

    function topHasFocus() {
        try {
            return window.parent !== window && window.parent.document.hasFocus();
        } catch (err) {
            return false;
        }
    }

    function showTapBar() {
        if (!tapBar) {
            tapBar = document.createElement("div");
            tapBar.textContent = "Tap here to type";
            tapBar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:99998;" +
                "padding:10px;text-align:center;font:bold 16px sans-serif;" +
                "background:#ffd54f;color:#000;";
            /* a tap on the bar is a tap on the terminal: bring up the keyboard */
            tapBar.addEventListener("click", function () {
                hideTapBar();
                if (term)
                    term.focus();
            });
        }
        if (!tapBar.parentNode && document.body)
            document.body.appendChild(tapBar);
        debug("tap bar shown");
    }

    function hideTapBar() {
        if (tapBar && tapBar.parentNode) {
            tapBar.parentNode.removeChild(tapBar);
            debug("tap bar hidden");
        }
    }

    function onPageBlur() {
        debug("blur check: keyboard " + (keyboardUp ? "up" : "down"));
        if (lettingGo || !keyboardUp || !term ||
                document.activeElement !== term.textarea ||
                document.visibilityState !== "visible")
            return;
        /* (a moment later: the focus may be on its way to somewhere else in
           the page, such as Home Assistant's own menu) */
        setTimeout(function () {
            if (!document.hasFocus() && !topHasFocus() &&
                    document.visibilityState === "visible")
                showTapBar();
        }, 300);
    }

    function noteWidth() {
        debug("resize " + window.innerWidth + "x" + window.innerHeight +
              (window.visualViewport ? " vv " + Math.round(window.visualViewport.height) : "") +
              ", " + focusState());
        if (window.innerWidth === lastWidth)
            return;
        lastWidth = window.innerWidth;
        widthChanged = Date.now();
        if (focusLost && widthChanged - focusLost < ROTATE_TIME)
            refocus();
    }

    /* the text on a row of the screen, 0 = top */
    function rowText(row) {
        var buf = term.buffer.active;
        var line = buf.getLine(buf.viewportY + row);
        return line ? line.translateToString(true) : "";
    }

    /* where a point on the page is, in rows from the top of the screen:
       2.5 is the middle of row 2 (rows count from 0) */
    function rowPos(y) {
        var screen = term.element.querySelector(".xterm-screen");
        var r = screen.getBoundingClientRect();
        return (y - r.top) / (r.height / term.rows);
    }

    /* the row of the screen at a point on the page, or -1 */
    function rowAt(y) {
        var row = Math.floor(rowPos(y));
        return (row >= 0 && row < term.rows) ? row : -1;
    }

    /* the main menu choice nearest a point: its letter, or null. EBaC puts
       a blank line between the choices, and the half of it nearer a choice
       goes with that choice, so a tap a little off still finds it. E is
       found too, so that a tap nearer Exit than Information does nothing. */
    function nearestChoice(y) {
        var pos = rowPos(y), best = null, bestDist = 1, r, m, d;

        for (r = 0; r < term.rows; r++) {
            m = /^\s*([CAVSIE])\)/.exec(rowText(r));
            if (!m)
                continue;
            d = Math.abs(pos - (r + 0.5));
            if (d < bestDist) {
                best = m[1];
                bestDist = d;
            }
        }
        return best;
    }

    /* what a tap does: { key, keyboard } or null for nothing */
    function tapAction(y) {
        var m, r, text, key, row = rowAt(y);

        if (row < 0)
            return null;
        switch (mode) {
        case "menu":
            key = nearestChoice(y);
            if (!key || key === "E")
                return null;
            key = key.toLowerCase();
            /* View, Search and Add ask for typing next: let the keyboard
               come up */
            return { key: key, keyboard: key === "v" || key === "s" || key === "a" };
        case "trans":
            m = /^\s*([1-9])\)/.exec(rowText(row));
            return m ? { key: m[1], keyboard: false } : null;
        case "transenter":
            m = /^\s*([0-9]+)\)/.exec(rowText(row));
            return m ? { key: m[1] + "\r", keyboard: false } : null;
        case "list":
            /* a result's label is on its first line; its other lines start
               with spaces. Anything else (the header, "--More--", a blank
               line) isn't a result. */
            for (r = row; r >= 0; r--) {
                text = rowText(r);
                m = /^([1-9a-z])\)/.exec(text);
                if (m)
                    return { key: m[1], keyboard: false };
                if (!/^\s+\S/.test(text))
                    return null;
            }
            return null;
        case "anykey":
            return { key: " ", keyboard: false };
        }
        return null;
    }

    /* the key for a swipe, or null for nothing */
    function swipeKey(dx, dy) {
        var box = term.element.getBoundingClientRect();
        var height = box.height;
        var forward = dy < 0;   /* finger moved up: on to what comes next */
        var longSide = Math.abs(dx) >= LONG_SWIPE * box.width;

        if (mode === "anykey")
            return " ";
        if (Math.abs(dx) > Math.abs(dy)) {      /* left or right */
            if (mode === "passage" || mode === "list" || mode === "trans" ||
                    mode === "transenter")
                return "x";                     /* back */
            if (mode === "search") {            /* move the cursor */
                if (dx < 0)
                    return longSide ? "\x01" : "\x02";  /* Home, Left */
                return longSide ? "\x05" : "\x06";      /* End, Right */
            }
            if (mode === "input" && dx < 0)     /* erase */
                return longSide ? "\x15" : "\b";        /* CTRL-U, Backspace */
            return null;
        }
        if (mode === "list" || mode === "transenter")
            return forward ? " " : "p";
        if (mode === "search")      /* the history: Down and Up arrows */
            return forward ? "\x0e" : "\x10";
        if (mode === "passage") {
            if (Math.abs(dy) >= LONG_SWIPE * height)
                return forward ? " " : "p";     /* a screen */
            return forward ? "." : ",";         /* a verse */
        }
        return null;
    }

    function gestureScreen() {
        return mode === "menu" || mode === "trans" || mode === "transenter" ||
               mode === "list" ||
               mode === "passage" || mode === "anykey" || mode === "search" ||
               mode === "input";
    }

    /* the point midway between the first two fingers */
    function midpoint(touches) {
        return { x: (touches[0].clientX + touches[1].clientX) / 2,
                 y: (touches[0].clientY + touches[1].clientY) / 2 };
    }

    /*
    ** Two fingers rarely touch, or lift, at the same instant. So a touch
    ** becomes a two-finger one as soon as a second finger joins it, stays
    ** one until every finger has lifted, and is then judged by how far the
    ** midpoint of the two fingers moved. Three or more fingers: nothing.
    */
    function onTouchStart(e) {
        if (e.touches.length === 1 && !two) {
            start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2 && (start || !two)) {
            start = null;               /* not a one-finger gesture now */
            two = { from: midpoint(e.touches), to: midpoint(e.touches) };
        } else {
            start = null;               /* three fingers, or a lost touch */
            two = { from: null, to: null };     /* ignore until all lift */
        }
        if (gestureScreen())
            e.stopPropagation();        /* not for the terminal's scrolling */
    }

    function onTouchMove(e) {
        if (two && two.from && e.touches.length === 2)
            two.to = midpoint(e.touches);
        if (!(start || two) || !gestureScreen())
            return;
        /* keep the page from scrolling or refreshing under a swipe, and the
           terminal from scrolling its view */
        e.stopPropagation();
        if (e.cancelable)
            e.preventDefault();
    }

    /* the key for a two-finger swipe, or null */
    function twoFingerKey(dx, dy) {
        if (mode !== "passage" || Math.abs(dy) <= Math.abs(dx) ||
                Math.abs(dy) < TAP_MAX)
            return null;
        return dy < 0 ? "f" : "b";      /* up: the next book; down: back */
    }

    function onTouchEnd(e) {
        var t, dx, dy, action, key;

        if (two) {
            if (e.touches.length > 0)
                return;                 /* wait for the last finger */
            key = two.from ? twoFingerKey(two.to.x - two.from.x,
                                          two.to.y - two.from.y) : null;
            two = null;
            lastTouchEnd = Date.now();
            if (key !== null) {
                keepKeyboardHidden();
                send(key);
            }
            if (e.cancelable)
                e.preventDefault();     /* not a tap, not for the keyboard */
            return;
        }
        if (!start || e.changedTouches.length !== 1)
            return;
        t = e.changedTouches[0];
        dx = t.clientX - start.x;
        dy = t.clientY - start.y;
        start = null;
        lastTouchEnd = Date.now();

        if (Math.abs(dx) < TAP_MAX && Math.abs(dy) < TAP_MAX) {
            action = tapAction(t.clientY);
            if (!action)
                return;                 /* an ordinary tap: keyboard */
            if (!action.keyboard)
                keepKeyboardHidden();
            send(action.key);
            if (!action.keyboard && e.cancelable) {
                e.preventDefault();     /* no keyboard for this tap */
                e.stopPropagation();
            }
            return;
        }
        key = swipeKey(dx, dy);
        if (key !== null) {
            keepKeyboardHidden();
            send(key);
            if (e.cancelable)
                e.preventDefault();
        }
    }

    /* with a mouse, a click on a menu line, translation or result works too */
    function onClick(e) {
        var action;

        if (Date.now() - lastTouchEnd < 1000)
            return;                     /* the click a tap already handled */
        action = tapAction(e.clientY);
        if (action && action.key !== " ")
            send(action.key);
    }

    /*
    ** Keyboards that hold back what is typed. Some phone keyboards (the
    ** Amazon keyboard on a Fire, for one) treat letters as a word being
    ** composed, and hand the word over only when space or Enter ends it.
    ** The terminal waits for the word, so a single key at the main menu
    ** went nowhere until space was pressed, and then turned up later, at
    ** the start of the next search; and a book's name wasn't completed as
    ** it was typed. EBaC itself acts on every key as it comes, even on its
    ** typing screens (completing a book's name, editing the search line),
    ** so on every screen EBaC names, this script takes the letters itself
    ** as the keyboard composes them, and sends each one at once. A word is
    ** followed to its end, even if the screen changes on the way, so
    ** nothing is sent twice or lost. (Before EBaC has named a screen, the
    ** terminal is left to itself.)
    **
    ** The terminal's typing box holds what the keyboard has typed, and the
    ** letters sent are the change in it: new letters, and a Backspace (DEL)
    ** for each one taken away (the keyboard correcting a word, say).
    */
    var composing = false;  /* a word being composed is this script's */
    var boxSeen = "";       /* the typing box's text, as last sent */
    var realKeyDown = false;    /* a key of its own (not 229) is down: the
                                   terminal sends what it types (a space,
                                   say, then also typed into the box) */

    /* a screen EBaC has named: its letters are sent at once */
    function namedScreen() {
        return mode !== "";
    }

    function takesTyping() {
        return composing || namedScreen();
    }

    /* send the change in the typing box since it was last looked at */
    function sendBoxChange() {
        var now = term.textarea.value, same = 0, out = "", i;

        while (same < boxSeen.length && same < now.length &&
                boxSeen.charAt(same) === now.charAt(same))
            same++;
        for (i = same; i < boxSeen.length; i++)
            out += "\x7f";
        out += now.substring(same);
        boxSeen = now;
        if (out) {
            debug("sent " + JSON.stringify(out));
            send(out);
        }
    }

    function emptyBox() {
        term.textarea.value = "";
        boxSeen = "";
    }

    function onKeyDown(e) {
        if (term && e.target === term.textarea && e.keyCode !== 229)
            realKeyDown = true;
        if (!term || e.target !== term.textarea || !takesTyping())
            return;
        if (e.keyCode === 229) {        /* a phone keyboard's "some key" */
            debug("key 229" + (composing ? " (composing)" : ""));
            if (!composing)
                boxSeen = term.textarea.value;
            e.stopImmediatePropagation();   /* (the change is sent below) */
        } else if (composing) {
            /* a key of its own (Enter, say): the terminal sends it, and may
               empty the box; carry on from what the box then holds */
            setTimeout(function () { boxSeen = term.textarea.value; }, 0);
        }
    }

    function onCompositionStart(e) {
        if (!term || e.target !== term.textarea || !namedScreen())
            return;
        composing = true;
        boxSeen = term.textarea.value;
        debug("compose start");
        e.stopImmediatePropagation();
    }

    function onCompositionUpdate(e) {
        if (!composing || e.target !== term.textarea)
            return;
        debug("compose " + JSON.stringify(e.data));
        e.stopImmediatePropagation();
    }

    function onCompositionEnd(e) {
        if (!composing || e.target !== term.textarea)
            return;
        debug("compose end " + JSON.stringify(e.data));
        e.stopImmediatePropagation();
        setTimeout(function () {        /* (the box holds the final word now) */
            sendBoxChange();
            composing = false;
            emptyBox();
        }, 0);
    }

    function onKeyUp(e) {
        if (e.keyCode !== 229)
            realKeyDown = false;
    }

    function onInput(e) {
        if (!term || e.target !== term.textarea || !takesTyping() ||
                (realKeyDown && !composing))
            return;
        debug("input " + e.inputType + " " + JSON.stringify(e.data));
        e.stopImmediatePropagation();
        sendBoxChange();
        if (!composing)
            emptyBox();
    }

    /* listen for EBaC's "which screen" messages: as soon as the terminal
       exists, before any output arrives */
    function listen(t) {
        term = t;
        mode = "";
        composing = false;
        noScrollback(t);
        t.parser.registerOscHandler(MODE_OSC, function (name) {
            mode = name;
            return true;
        });
    }

    /* keep no scrolled-off lines, so there is nothing to scroll back to */
    function noScrollback(t) {
        try {
            if (t.options)
                t.options.scrollback = 0;
            else
                t.setOption("scrollback", 0);   /* older terminals */
        } catch (err) {
            /* leave it */
        }
    }

    /* handle touches on the terminal: once it is on the page */
    function attach(t) {
        var el = t.element;

        touchTerm = t;
        el.style.touchAction = "none";  /* the page mustn't pan or zoom here */
        el.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
        el.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });
        el.addEventListener("touchend", onTouchEnd, { capture: true, passive: false });
        el.addEventListener("touchcancel", function () {
            start = null;
            two = null;
        }, true);
        el.addEventListener("click", onClick, true);
        /* (on the terminal, capturing: before the typing box's own
           handlers, which these keep from seeing what they take) */
        el.addEventListener("keydown", onKeyDown, true);
        el.addEventListener("keyup", onKeyUp, true);
        el.addEventListener("compositionstart", onCompositionStart, true);
        el.addEventListener("compositionupdate", onCompositionUpdate, true);
        el.addEventListener("compositionend", onCompositionEnd, true);
        el.addEventListener("input", onInput, true);
        if (t.textarea) {
            t.textarea.addEventListener("blur", onBlur);
            t.textarea.addEventListener("focus", function () {
                focusLost = 0;
                debug("box focus");
            });
        }
    }

    function check() {
        var t = window.term;

        if (t && t.parser && t !== term)
            listen(t);
        /* ttyd applies its settings when it connects: keep scrollback off */
        if (t && t === term && t.options && t.options.scrollback !== 0)
            noScrollback(t);
        if (t && t.element && t === term && t !== touchTerm)
            attach(t);
    }

    /*
    ** ttyd makes its terminal after the page loads, and again if it has to
    ** reconnect. Catch the moment it does (it sets window.term), so the
    ** handlers are in place before EBaC's first screen arrives and says
    ** which screen it is. As a fallback, also look for it regularly.
    */
    (function () {
        var current = window.term;

        try {
            Object.defineProperty(window, "term", {
                configurable: true,
                get: function () { return current; },
                set: function (t) { current = t; setTimeout(check, 0); check(); }
            });
        } catch (err) {
            /* not possible here: the regular check below still works */
        }
    }());
    setInterval(check, 50);
    firstSeen[window.innerWidth] = 1;   /* (the starting width: not turning) */
    noteHeight();
    window.addEventListener("resize", noteHeight);
    window.addEventListener("resize", noteWidth);
    window.addEventListener("blur", onPageBlur);
    window.addEventListener("focus", hideTapBar);
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState !== "visible")
            hideTapBar();
    });
    if (window.EBAC_DEBUG) {
        debug("page loaded, " + window.innerWidth + "x" + window.innerHeight);
        window.addEventListener("blur", function () { debug("page blur, " + focusState()); });
        window.addEventListener("focus", function () { debug("page focus, " + focusState()); });
        document.addEventListener("visibilitychange", function () {
            debug("visibility " + document.visibilityState);
        });
        window.addEventListener("orientationchange", function () { debug("orientationchange"); });
        window.addEventListener("pagehide", function () { debug("pagehide"); });
        window.addEventListener("pageshow", function () { debug("pageshow"); });
        document.addEventListener("focusin", function (e) {
            if (!term || e.target !== term.textarea)
                debug("focusin " + e.target.tagName.toLowerCase());
        });
    }
    if (window.visualViewport)
        window.visualViewport.addEventListener("resize", noteHeight);

    /* for testing: which screen the page thinks EBaC is showing */
    window.ebacGestureMode = function () { return mode; };
    /* for testing: the key a tap at this height on the page would send */
    window.ebacTapKey = function (y) {
        var action = tapAction(y);
        return action ? action.key : null;
    };
}());
