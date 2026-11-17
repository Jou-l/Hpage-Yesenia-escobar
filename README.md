# Yesenia Escobar – Author Site

Static site organized as individual HTML pages with shared CSS and vanilla JavaScript. No build step.

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000`.

## Structure
- `index.html` – home page
- `about.html`, `books.html`, `news.html`, `profiles.html`, `contact.html` – separate pages linked from the shared navigation (`profiles.html` is the **Background** page)
- `book.html?slug=<book-slug>` – individual book details
- `css/styles.css` – layout, palette (CSS variables in `:root`), components
- `css/animations.css` – transitions, scroll reveals, hover/press effects
- `js/data.js` – the book catalogue, the Instagram cards and the news/activities feed
- `js/animations.js` – reveal-on-scroll, page entry, header shrink, progress bar, button ripple
- `js/main.js` – shared navigation, book list/detail rendering, news feed, Background tabs, Instagram cards, and contact form behavior
- `assets/img/` – favicon and the profile photo
- `assets/img/books/` – the four book covers
- `assets/img/events/` – photos used by the news feed and the Background page
- `assets/img/instagram/` – the square images used by the Instagram cards

Each page loads the shared stylesheets and scripts. Script order matters: `data.js` -> `animations.js` -> `main.js`. Navigation uses regular page links, and the active section, dropdown, responsive menu, and reveal animations work across pages.

## Profile photo
The arch frame on Home/About shows `assets/img/profile.webp`, a static image committed to the project.
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

## Contact and newsletter
- `contact.html` shows the professional address `yescobarenglish@gmail.com`.
- The contact form is a demo. To activate it, create a Formspree form, add `action="https://formspree.io/f/…"` and `method="POST"` to `<form id="f">`, and remove the demo handler in `js/main.js`.
- A newsletter subscription is not implemented yet.

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

## News and activities
The News page is generated from the `NEWS` list at the bottom of `js/data.js`:

```js
{ date, title, text, images:[{ src, alt, fit }], caption }
```

- `images` can hold one or several photos; `caption` is shown once under the gallery.
- `fit:true` letterboxes tall images such as posters.
- Photos live in `assets/img/events/` (WebP, about 1600 px wide).

## Background page
`profiles.html` is labelled **Background** and holds two tabs: *Scholar and Writer* and
*Activism and Professional Affairs*. The tab content is static HTML; the switching logic is
`enableTabs()` in `js/main.js`.

## Deployment
The site is a plain static folder. To publish it, enable GitHub Pages on the repository
(Settings → Pages → Deploy from a branch → `main` / root). Pages is not enabled at the moment.
