/* ═══════════════════════════════════════════════════════════════════
   PATATAS ANDÚJAR · main.js
   ─────────────────────────────────────────────────────────────────
   Para cambiar datos, fotos o textos: edita config.js únicamente.
   Este archivo no necesita tocarse salvo que cambies la lógica.
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

const PAGES = [
  'inicio','productos',
  'paja','baston','panadera','dado','entera','envasado',
  'nosotros','contacto'
];

/* ════════════════════════════════════════════
   1. RENDER DE DATOS DESDE CONFIG.JS
   Rellena automáticamente todos los elementos
   con data-cfg="clave" usando CONFIG.
   ════════════════════════════════════════════ */
function renderConfig() {
  const C = CONFIG;

  // Teléfonos, emails, dirección — cualquier elemento con data-cfg
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const key = el.dataset.cfg; // p.ej. "contacto.email"
    const val = key.split('.').reduce((o, k) => o?.[k], C);
    if (val === undefined) return;

    if (el.tagName === 'A' && key.includes('href')) {
      el.href = val;
    } else if (el.tagName === 'A') {
      el.textContent = val;
      // Si hay un href asociado en config (p.ej. telefono1 → telefono1_href)
      const hrefKey = key + '_href';
      const href = hrefKey.split('.').reduce((o, k) => o?.[k], C);
      if (href) el.href = href;
    } else if (el.tagName === 'IMG') {
      el.src = val;
      el.onerror = () => {
        const fbKey = key.replace('src','fb').replace('logo','logo_fb');
        const fb = fbKey.split('.').reduce((o, k) => o?.[k], C);
        if (fb) el.src = fb;
      };
    } else {
      el.textContent = val;
    }
  });

  // Logo
  document.querySelectorAll('.logo-img').forEach(img => {
    img.src    = C.logo.src;
    img.alt    = C.logo.alt;
    img.height = C.logo.height;
  });

  // Vídeo hero
  const vid = document.querySelector('.hero-video');
  if (vid) {
    vid.querySelector('source').src = C.video_hero.src;
    vid.poster = C.video_hero.poster;
    vid.load();
  }

  // Footer — datos de contacto
  document.querySelectorAll('[data-contact]').forEach(el => {
    const k = el.dataset.contact;
    const v = C.contacto[k];
    if (!v) return;
    if (el.tagName === 'A') {
      el.textContent = v;
      const hk = k + '_href';
      if (C.contacto[hk]) el.href = C.contacto[hk];
    } else {
      el.textContent = v;
    }
  });
}

/* ════════════════════════════════════════════
   2. GENERADOR DE HEROES DE PRODUCTO
   Lee config.js → productos[] y construye
   el HTML del hero dual (foto grande + chica)
   para cada subpágina de producto.
   ════════════════════════════════════════════ */
function buildProductHeroes() {
  CONFIG.productos.forEach(p => {
    const page = document.getElementById('page-' + p.id);
    if (!page) return;

    // Construir navegación anterior/siguiente
    const prevHTML = p.nav_prev
      ? `<a href="#${p.nav_prev}" data-page="${p.nav_prev}" class="prod-nav-prev">← ${labelFor(p.nav_prev)}</a>`
      : '<span></span>';
    const nextHTML = p.nav_next
      ? `<a href="#${p.nav_next}" data-page="${p.nav_next}" class="prod-nav-next">${labelFor(p.nav_next)} →</a>`
      : '<span></span>';

    // Construir el hero dual
    const heroHTML = `
      <div class="page-hero" id="hero-${p.id}">
        <div class="page-hero-bg" style="background-image:url('${p.bg}')"></div>
        <div class="page-hero-overlay"></div>
        <div class="page-hero-inner">

          <div class="page-hero-content">
            <div class="breadcrumb">
              <a href="#inicio"    data-page="inicio">Inicio</a>
              <span>/</span>
              <a href="#productos" data-page="productos">Productos</a>
              <span>/</span>
              <span>${p.titulo}</span>
            </div>
            <div class="eyebrow-white">Patatas Andújar</div>
            <h1 class="page-hero-title">${p.titulo}</h1>
            <p class="page-hero-sub">${p.subtitulo}</p>
            <div class="page-hero-use">
              <strong>Uso recomendado</strong>
              ${p.uso}
            </div>
            <a href="#contacto" data-page="contacto" class="btn btn-gold page-hero-cta">
              Pedir Presupuesto
            </a>
          </div>

          <div class="page-hero-product">
            <div class="page-hero-product-img-wrap">
              <div class="page-hero-product-badge">${p.badge}</div>
              <img
                src="${p.img}"
                onerror="this.src='${p.img_fb}'"
                alt="${p.titulo}"
                class="page-hero-product-img"
                loading="eager"
              >
            </div>
          </div>

        </div>
      </div>
      <div class="prod-nav-strip">
        ${prevHTML}
        ${nextHTML}
      </div>
    `;

    // Insertar al principio de la página de producto
    page.insertAdjacentHTML('afterbegin', heroHTML);

    // Ken Burns: animar foto de fondo al cargar
    const bg = page.querySelector('.page-hero-bg');
    if (bg) {
      const img = new Image();
      img.onload = () => page.querySelector('.page-hero')?.classList.add('loaded');
      img.src = p.bg;
    }
  });
}

function labelFor(id) {
  const labels = {
    paja:     'Patatas Paja',
    baston:   'Patatas Bastón',
    panadera: 'Patatas Panadera',
    dado:     'Patatas Dado',
    entera:   'Patata Entera',
    envasado: 'Envasado',
  };
  return labels[id] || id;
}

/* ════════════════════════════════════════════
   3. ROUTER SPA
   ════════════════════════════════════════════ */
function showPage(pageId) {
  if (!PAGES.includes(pageId)) pageId = 'inicio';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initScrollAnimations, 80);
  }

  // Marcar nav activo (productos activo para todas sus subpáginas)
  const productPages = ['paja','baston','panadera','dado','entera','envasado'];
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = link.dataset.page;
    const active =
      lp === pageId ||
      (lp === 'productos' && productPages.includes(pageId));
    link.classList.toggle('active', active);
  });

  closeMenu();
  history.pushState({ page: pageId }, '', '#' + pageId);

  const titles = {
    inicio:    'Patatas Andújar · Patata Natural Pelada y Cortada',
    productos: 'Productos · Patatas Andújar',
    paja:      'Patatas Paja · Patatas Andújar',
    baston:    'Patatas Bastón · Patatas Andújar',
    panadera:  'Patatas Panadera · Patatas Andújar',
    dado:      'Patatas Dado · Patatas Andújar',
    entera:    'Patata Entera Pelada · Patatas Andújar',
    envasado:  'Envasado · Patatas Andújar',
    nosotros:  'Quiénes Somos · Patatas Andújar',
    contacto:  'Contacto · Pide Presupuesto · Patatas Andújar',
  };
  document.title = titles[pageId] || titles.inicio;
}

/* ── Delegación de clicks ── */
document.addEventListener('click', function (e) {
  const link = e.target.closest('[data-page]');
  if (!link) return;
  e.preventDefault();
  showPage(link.dataset.page);
});

window.addEventListener('popstate', e => showPage(e.state?.page || getHash()));

function getHash() {
  const h = window.location.hash.replace('#', '');
  return PAGES.includes(h) ? h : 'inicio';
}

/* ════════════════════════════════════════════
   4. NAVBAR SCROLL + BURGER
   ════════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

function closeMenu() {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) closeMenu();
});

/* ════════════════════════════════════════════
   5. FORMULARIO — envío a patatasandujar@gmail.com
   vía Formspree (configura el ID en config.js)
   ════════════════════════════════════════════ */
const form         = document.getElementById('contactForm');
const submitBtn    = document.getElementById('submitBtn');
const btnText      = document.getElementById('btnText');
const btnLoader    = document.getElementById('btnLoader');
const formSuccess  = document.getElementById('formSuccess');
const formErrorMsg = document.getElementById('formError');

['nombre','telefono','email','mensaje'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => clearErr(id));
});
document.getElementById('privacidad')?.addEventListener('change', () => clearErr('privacidad'));

function clearErr(id) {
  document.getElementById(id)?.classList.remove('invalid');
  const err = document.getElementById('err-' + id);
  if (err) err.textContent = '';
}
function setErr(id, msg) {
  document.getElementById(id)?.classList.add('invalid');
  const err = document.getElementById('err-' + id);
  if (err) err.textContent = msg;
}

function validateForm() {
  let ok = true;
  const nombre   = document.getElementById('nombre');
  const telefono = document.getElementById('telefono');
  const email    = document.getElementById('email');
  const mensaje  = document.getElementById('mensaje');
  const priv     = document.getElementById('privacidad');

  if (!nombre?.value.trim() || nombre.value.trim().length < 2)
    { setErr('nombre','Introduce tu nombre completo.'); ok = false; }

  if (!/^[0-9\s\-\.]{9,14}$/.test(telefono?.value || ''))
    { setErr('telefono','Teléfono no válido (mínimo 9 dígitos).'); ok = false; }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email?.value || ''))
    { setErr('email','Email no válido.'); ok = false; }

  if (!mensaje?.value.trim() || mensaje.value.trim().length < 10)
    { setErr('mensaje','Mensaje demasiado corto (mínimo 10 caracteres).'); ok = false; }

  if (!priv?.checked)
    { setErr('privacidad','Debes aceptar la política de privacidad.'); ok = false; }

  return ok;
}

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    formSuccess.style.display  = 'none';
    formErrorMsg.style.display = 'none';

    if (!validateForm()) {
      form.querySelector('.invalid')?.scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }

    submitBtn.disabled      = true;
    btnText.style.display   = 'none';
    btnLoader.style.display = 'inline';

    try {
      await submitForm();
      formSuccess.style.display = 'block';
      form.reset();
      formSuccess.scrollIntoView({ behavior:'smooth', block:'center' });
    } catch {
      formErrorMsg.style.display = 'block';
      formErrorMsg.scrollIntoView({ behavior:'smooth', block:'center' });
    } finally {
      submitBtn.disabled      = false;
      btnText.style.display   = 'inline';
      btnLoader.style.display = 'none';
    }
  });
}

async function submitForm() {
  const id = CONFIG.formulario.formspree_id;
  const data = {
    nombre:   document.getElementById('nombre')?.value.trim(),
    empresa:  document.getElementById('empresa')?.value.trim() || '—',
    telefono: document.getElementById('telefono')?.value.trim(),
    email:    document.getElementById('email')?.value.trim(),
    producto: document.getElementById('producto')?.value || '—',
    volumen:  document.getElementById('volumen')?.value  || '—',
    mensaje:  document.getElementById('mensaje')?.value.trim(),
    _subject: 'Solicitud de presupuesto — Patatas Andújar',
    _replyto: document.getElementById('email')?.value.trim(),
  };

  if (id && id !== 'TU_ID_FORMSPREE') {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method:  'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Formspree error');
    return;
  }

  // Fallback mailto si Formspree no está configurado
  const s = encodeURIComponent(data._subject);
  const b = encodeURIComponent(
    Object.entries(data)
      .filter(([k]) => !k.startsWith('_'))
      .map(([k,v]) => `${k}: ${v}`)
      .join('\n')
  );
  window.location.href = `mailto:${CONFIG.formulario.email_destino}?subject=${s}&body=${b}`;
  await new Promise(r => setTimeout(r, 900));
}

/* ════════════════════════════════════════════
   6. ANIMACIONES ON SCROLL
   ════════════════════════════════════════════ */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const sel = '.page.active .corte-card,.page.active .calibre-card,' +
              '.page.active .proceso-step,.page.active .hero-stat,' +
              '.page.active .contact-item,.page.active .valor-card,' +
              '.page.active .pd-step';

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll(sel).forEach((el, i) => {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = `opacity .45s ease ${(i % 6) * .07}s, transform .45s ease ${(i % 6) * .07}s`;
    io.observe(el);
  });
}

/* ════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════ */
function init() {
  renderConfig();         // 1. Rellenar datos de config.js en el DOM
  buildProductHeroes();   // 2. Generar heroes duales de todos los productos
  showPage(getHash());    // 3. Mostrar la página correcta
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
