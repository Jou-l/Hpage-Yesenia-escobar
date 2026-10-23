/* Smoothness layer (vanilla JS, no dependencies) */
(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SEL = '.hero .photo,.hero .kicker,.hero h1,.hero p,.hero .btns,.band .wrap>*,.insta .wrap>h2,.insta .handle,.ig-card,.post,.bk,.pcard,.post-n,.two>*';
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      setTimeout(() => e.target.classList.add('done'), 1100);
      io.unobserve(e.target);
    });
  }, {threshold: .12, rootMargin: '0px 0px -6% 0px'}) : null;

  // Adds staggered fade-up reveal to every matching element inside root
  function scan(root){
    if (reduce || !io) return;
    const count = new Map();
    root.querySelectorAll(SEL).forEach(el => {
      if (el.classList.contains('reveal')) return;
      const p = el.parentElement, i = count.get(p) || 0;
      count.set(p, i + 1);
      el.style.setProperty('--d', Math.min(i, 8) * 90 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  }
  function enter(a){
    a.classList.remove('entering');
    void a.offsetWidth;
    a.classList.add('entering');
    scan(a);
  }
  // Scroll: header shrink + progress bar (rAF-throttled)
  const hd = document.querySelector('header'), pr = document.querySelector('.progress');
  let ticking = false;
  function onScroll(){
    const h = document.documentElement.scrollHeight - innerHeight;
    hd.classList.toggle('scrolled', scrollY > 20);
    pr.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, {passive: true});
  // Button ripple
  document.addEventListener('click', e => {
    const b = e.target.closest('.btn'); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement('span');
    d.className = 'ripple';
    d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
    b.appendChild(d); setTimeout(() => d.remove(), 700);
  });
  window.Anim = {scan, enter};
})();
