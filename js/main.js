/* BarberShop Sergi-Negrea — main.js
   PLUMBING_V 1 (col fix flash: reveal generico immediateRender:false, nessuna doppia-animazione).
   Gesto-firma: «LA SALA DEL 1929» — il monogramma SG che si disegna (strokeDashoffset, NON opacity).
   GSAP SUBITO; reveal once; watchdog SOLO fallback. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'barbiere-sergi',
    hours: {
      0: [],
      1: [],
      2: [['09:30', '19:30']],
      3: [['09:30', '19:30']],
      4: [['09:30', '19:30']],
      5: [['09:30', '19:30']],
      6: [['09:30', '19:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 900,
    EN: {
      'nav.sala': 'The room', 'nav.mestiere': 'The craft', 'nav.storia': 'Since 1929', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.kicker': 'Barbers on Corso Vercelli · since 1929',
      'hero.sub': 'The historic <strong>Sergi-Negrea</strong> barbershop: cuts, beard and the craft of the old days, in the 1929 Liberty room.',
      'hero.cta1': 'Call: 02 498 1435', 'hero.cta2': 'Step into the room', 'hero.rec': '61 reviews',
      'sala.kicker': 'The shop', 'sala.t1': 'The room', 'sala.t2': 'of 1929',
      'sala.lead': 'Step in and step back in time. The original room is still here: the <strong>stained glass with the SG monogram</strong>, the polished wood boiserie, the marble basins, the vintage chairs. A historic shop, alive since 1929.',
      'sala.d1': 'The stained glass', 'sala.d2': 'The wood boiserie', 'sala.d3': 'The marble basins', 'sala.d4': 'The vintage chairs',
      'sala.plate': '« Shop history since 1929 » — the plaque on the wall',
      'mest.kicker': 'The craft', 'mest.t1': 'Cut and beard,', 'mest.t2': 'done by the book',
      'mest.lead': 'A careful cut — <strong>scissors too</strong> — the beard shaped with care, the precise fade. The hand of someone who has done it for a lifetime: «a perfect men’s cut and real professionalism».',
      'mest.cap': 'Vincenzo at work, in the historic room.',
      's1.t': 'The cut', 's1.d': 'Classic or modern, scissors or clippers. Made to measure, no rush.',
      's2.t': 'The beard', 's2.d': 'Shaped and finished with the razor. «Finally a beard done by the book.»',
      's3.t': 'The fade', 's3.d': 'The clean, precise fade, for a modern cut that lasts.',
      'sto.kicker': 'The story', 'sto.t1': 'Sergi since 1929,', 'sto.t2': 'now Sergi-Negrea',
      'sto.p1': 'Almost a century of scissors in the same room. The <strong>Sergi</strong> shop opens in 1929 and becomes a piece of the neighbourhood’s history. Today the torch is in the hands of <strong>Vincenzo Negrea</strong>, carrying on the same craft made with care.',
      'sto.p2': 'A barber who is «kind and professional», welcoming everyone — and who speaks English too: <strong>English spoken</strong>, for clients coming from afar.',
      'sto.mono': 'since 1929',
      'gal.kicker': 'The shop', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 61 Google reviews',
      'rec.r1': '«Mr Vincenzo was extremely kind, spoke excellent English and gave a truly outstanding service. Highly recommend this place, I’ll be back for sure.»',
      'rec.r2': '«What can I say… I had a great experience, a perfect men’s cut and real professionalism. Thank you Vincenzo.»',
      'rec.r3': '«Finally a beard done by the book.»',
      'rec.r4': '«Fast and precise service, I recommend it.»',
      'rec.r5': '«Professional and stylish experience! Highly recommended. Got a great haircut.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Correggio,', 'dove.t2': 'off Corso Vercelli',
      'dove.metro': 'Via Correggio 69, 20149 Milan · steps from Piazza De Angeli and Corso Vercelli (M1 De Angeli).',
      'dove.chiama': 'Call 02 498 1435', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What services do you offer?', 'faq.a1': 'Men’s cut (classic or modern, scissors too), beard done by the book, and fade. The craft of the old days, cared for in every detail.',
      'faq.q2': 'Do I need an appointment?', 'faq.a2': 'You can book online or call 02 498 1435. Vincenzo and the team speak English too: English spoken.',
      'faq.q3': 'How long has the shop been around?', 'faq.a3': 'Since 1929. It’s a historic shop: the original Liberty room — with the stained glass bearing the SG monogram, the wood boiserie and the marble basins — is still the same. Today Vincenzo Negrea carries it on.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Tuesday to Saturday, 9:30am to 7:30pm. Closed Sunday and Monday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Correggio 69 in Milan, steps from Piazza De Angeli and Corso Vercelli. Phone 02 498 1435.',
      'foot.dove': 'Via Correggio 69, 20149 Milan · <a href="tel:+39024981435">02 498 1435</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Map'
    },
  };
  /* ══════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) {
      el.classList.add(SITE.inViewClass); el.style.opacity = 1;
    });
  }
  // watchdog SOLO fallback (se GSAP non c'è o reduced-motion). Con GSAP rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico — immediateRender:false → niente flash su ScrollTrigger.refresh().
    // (nessun elemento .reveal è animato in opacity da una firma → niente doppia-animazione)
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: il monogramma SG che si disegna (strokeDashoffset — NON opacity) */
    var sg = document.querySelector('.sg-draw');
    if (sg && sg.getTotalLength) {
      var len = sg.getTotalLength();
      sg.style.strokeDasharray = len; sg.style.strokeDashoffset = len;
      gsap.to(sg, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: '.sala', start: 'top 62%', once: true } });
    }
  } else {
    showAllReveals();
    var sgf = document.querySelector('.sg-draw'); if (sgf) sgf.style.strokeDashoffset = 0;
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .1)
      .fromTo('.hero__title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8 }, .2)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .5)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .7)
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .85);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'), nav = document.getElementById('mainNav');
  if (burger && nav) {
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open'); burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg'), lbClose = document.getElementById('lightboxClose');
  function openLb(src, alt) { if (!lb) return; lbImg.src = src; lbImg.alt = alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
  function closeLb() { if (!lb) return; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lbImg.src = ''; }
  document.querySelectorAll('[data-full]').forEach(function (el) {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function () { var img = el.querySelector('img'); openLb(el.getAttribute('data-full'), img ? img.alt : ''); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ══════════ ORARI DINAMICI (Europe/Rome) ══════════ */
  var DIT = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function romeNow() {
    var s = new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome', hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' });
    var d = new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' });
    var dt = new Date(d);
    return { day: dt.getDay(), mins: dt.getHours() * 60 + dt.getMinutes() };
  }
  function toMin(t) { var p = t.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function fmt(m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return h + ':' + (mm < 10 ? '0' + mm : mm); }
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < e) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var dd = 1; dd <= 7; dd++) { var nd = (now.day + dd) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var st = hoursState(), en = root.lang === 'en';
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    var el = document.getElementById(SITE.hoursStatusId); if (!el) return;
    var txt;
    if (st.open) txt = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
    el.classList.toggle('is-open', st.open); el.classList.toggle('is-closed', !st.open);
  }

  /* ══════════ i18n IT/EN ══════════ */
  var langBtn = document.getElementById('langToggle');
  function applyLang(lang) {
    root.lang = lang;
    if (lang === 'en') {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var k = el.getAttribute('data-i18n'), v = SITE.EN[k];
        if (v == null) return;
        if (/[<&]/.test(v)) el.innerHTML = v; else el.textContent = v;
      });
      if (langBtn) { langBtn.textContent = 'IT'; langBtn.setAttribute('aria-label', 'Passa all\'italiano'); }
    } else {
      document.querySelectorAll('[data-i18n][data-it]').forEach(function (el) {
        var v = el.getAttribute('data-it');
        if (/[<&]/.test(v)) el.innerHTML = v; else el.textContent = v;
      });
      if (langBtn) { langBtn.textContent = 'EN'; langBtn.setAttribute('aria-label', 'Switch language to English'); }
    }
    renderHours();
  }
  // salva il testo IT originale
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.setAttribute('data-it', el.innerHTML); });
  if (langBtn) langBtn.addEventListener('click', function () { applyLang(root.lang === 'en' ? 'it' : 'en'); });

  renderHours();
  setInterval(renderHours, 60000);
})();
