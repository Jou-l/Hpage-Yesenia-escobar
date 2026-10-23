# Yesenia Escobar – Author Site

Static site organized as individual HTML pages with shared CSS and vanilla JavaScript. No build step.

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000`.

## Structure
- `index.html` – home page
- `about.html`, `books.html`, `news.html`, `profiles.html`, `contact.html` – separate pages linked from the shared navigation
- `book.html?slug=<book-slug>` – individual book details
- `css/styles.css` – layout, palette (CSS variables in `:root`), components
- `css/animations.css` – transitions, scroll reveals, hover/press effects
- `js/data.js` – the book catalogue and the Instagram cards
- `js/animations.js` – reveal-on-scroll, page entry, header shrink, progress bar, button ripple
- `js/main.js` – shared navigation, book list/detail rendering, Instagram cards, and contact form behavior
- `assets/img/` – favicon and the profile photo
- `assets/img/books/` – the four book covers
- `assets/img/instagram/` – the square images used by the Instagram cards

Each page loads the shared stylesheets and scripts. Script order matters: `data.js` -> `animations.js` -> `main.js`. Navigation uses regular page links, and the active section, dropdown, responsive menu, and reveal animations work across pages.

## Profile photo
The arch frame on Home/About shows `assets/img/profile.jpg`, a static image committed to the project.
To change it, replace that file — a square or 4:5 portrait works best (it is cropped with `object-fit: cover`).

## Books
The catalogue lives in the `B` list at the top of `js/data.js`. Each entry is an object:

```js
{ title, slug, label, genre, cover, fit, coverBg, synopsis, facts, buy, pdf, extra, quote, quoteBy }
```

- `cover` points to `assets/img/books/…`. If omitted, the CSS-generated cover is used.
- `fit:"contain"` letterboxes square covers inside the 2:3 frame; omit it for a regular 2:3 cover.
- `coverBg` is the letterbox colour used with `fit:"contain"` (for example, cream for a light cover).
- `facts` is a list of `[label, value]` pairs shown on the detail page.
- `buy`, `pdf` and `extra` are optional external links.

## Contact and newsletter (placeholders)
- `contact.html` still shows the example addresses `press@example.com`, `legal@example.com` and `lessons@example.com`. Replace them when the real ones are available; the block is marked with a `TODO` comment.
- The contact form is a demo. To activate it, create a Formspree form, add `action="https://formspree.io/f/…"` and `method="POST"` to `<form id="f">`, and remove the demo handler in `js/main.js`.
- The home band links to Contact until the newsletter subscription is added; see the `TODO` comment in `index.html`.

## Instagram cards
The home page grid is built from the `IG` list at the bottom of `js/data.js`. Each card is one entry:

```js
{ img:"assets/img/instagram/file.jpg", src:"@yesi_poeta · July 17, 2026", url:"https://www.instagram.com/p/SHORTCODE/",
  alt:"Short description for screen readers",
  text:"English version of the caption." }
```

Add, remove or reorder entries to change the grid. Images are square (cropped to 1000×1000-ish) and live in
`assets/img/instagram/`, so a new card needs its image there. `text` is truncated to four lines on the card;
the full post is one click away through `url`.
