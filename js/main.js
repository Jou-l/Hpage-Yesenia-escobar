/* Shared interactions for the individual HTML pages */
const cover = (book, index) => {
    if (!book.cover) return `<div class="cover c${index % 7}"><small>${book.genre || 'Book'}</small><b>${book.title}</b><small>Yesenia Escobar</small></div>`;
    const bg = book.fit === 'contain' && book.coverBg ? ` style="background:${book.coverBg}"` : '';
    return `<div class="cover has-img ${book.fit === 'contain' ? 'fit' : ''} c${index % 7}"${bg}><img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy" decoding="async"></div>`;
};

const page = document.body.dataset.page;
const app = document.getElementById('app');
const dropdown = document.getElementById('ddl');
if (dropdown) {
    dropdown.innerHTML = B.map(book => `<li><a href="book.html?slug=${encodeURIComponent(book.slug)}">${book.title}</a></li>`).join('');
}

document.querySelectorAll('nav a[data-r]').forEach(link => {
    link.classList.toggle('on', link.dataset.r === (page === 'book' ? 'books' : page));
});

function renderBookList() {
    const list = document.getElementById('book-list');
    if (!list) return;
    list.innerHTML = B.map((book, index) => `<a class="bk" href="book.html?slug=${encodeURIComponent(book.slug)}">${cover(book, index)}<h3>${book.title}</h3><span>${book.label}</span></a>`).join('');
}

function renderBookDetail() {
    const detail = document.getElementById('book-detail');
    if (!detail) return;
    const slug = new URLSearchParams(location.search).get('slug');
    const index = B.findIndex(book => book.slug === slug);
    if (index < 0) {
        const title = document.getElementById('book-title');
        title.textContent = 'Book not found';
        detail.innerHTML = '<p>We could not find that book. <a href="books.html">Browse all books</a>.</p>';
        document.title = 'Book not found | Yesenia Escobar';
        return;
    }
    const book = B[index];
    document.getElementById('book-title').textContent = book.title;
    document.title = `${book.title} | Yesenia Escobar`;
    const facts = (book.facts || []).map(([term, value]) => `<dt>${term}</dt><dd>${value}</dd>`).join('');
    const quote = book.quote ? `<blockquote class="review">“${book.quote}”<cite>— ${book.quoteBy}</cite></blockquote>` : '';
    const buy = book.buy ? `<a class="btn solid" href="${book.buy}" target="_blank" rel="noopener">Buy the Book</a>` : '';
    const pdf = book.pdf ? `<a class="btn solid" href="${book.pdf}" target="_blank" rel="noopener">Read the Free PDF</a>` : '';
    const extra = book.extra ? `<a class="btn" href="${book.extra.url}" target="_blank" rel="noopener">${book.extra.label}</a>` : '';
    const contact = !book.buy && !book.pdf ? '<a class="btn solid" href="contact.html">Contact</a>' : '';
    detail.innerHTML = `<div class="book-cover-wrap">${cover(book, index)}</div><div><span class="badge">${book.label}</span><p>${book.synopsis}</p>${quote}<dl class="book-meta">${facts}</dl><div class="btns">${buy}${pdf}${extra}${contact}<a class="btn" href="books.html">More Books</a><a class="btn green" href="profiles.html">Background</a></div></div>`;
}

function renderInstagram() {
    const grid = document.getElementById('ig');
    if (!grid) return;
    grid.innerHTML = IG.map(p => `<a class="ig-card" href="${p.url}" target="_blank" rel="noopener"><div class="thumb"><img src="${p.img}" alt="${p.alt}" loading="lazy" decoding="async"></div><div class="body"><span class="src">${p.src}</span><p>${p.text}</p></div></a>`).join('');
    Anim.scan(grid);
}

function enableContactForm() {
    const form = document.getElementById('f');
    if (!form) return;
    // TODO Formspree: replace this demo handler with a POST to the form endpoint.
    form.addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('ok').textContent = 'Thank you — message received (demo).';
        form.reset();
    });
}

function renderNews() {
    const list = document.getElementById('news-list');
    if (!list) return;
    list.innerHTML = NEWS.map(item => {
        const images = item.images.map(image => {
            const cls = [image.fit ? 'fit' : '', image.portrait ? 'portrait' : '', image.natural ? 'natural' : ''].filter(Boolean).join(' ');
            return `<figure${cls ? ` class="${cls}"` : ''}><img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async"></figure>`;
        }).join('');
        const matched = item.images.some(image => image.natural);
        const caption = item.caption ? `<p class="caption">${item.caption}</p>` : '';
        return `<article class="news-item"><div class="news-body"><span class="kicker">${item.date}</span><h2>${item.title}</h2><p>${item.text}</p></div><div class="news-gallery n${item.images.length}${matched ? ' matched' : ''}">${images}</div>${caption}</article>`;
    }).join('');
    Anim.scan(list);
}

function enableTabs() {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    if (!tabs.length) return;
    tabs.forEach(tab => tab.addEventListener('click', () => {
        tabs.forEach(other => {
            const on = other === tab;
            other.classList.toggle('on', on);
            other.setAttribute('aria-selected', String(on));
            document.getElementById(other.dataset.tab).hidden = !on;
        });
    }));
}

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('show');
        burger.setAttribute('aria-expanded', String(isOpen));
    });
}

renderBookList();
renderBookDetail();
renderInstagram();
renderNews();
enableTabs();
enableContactForm();
Anim.enter(app);
