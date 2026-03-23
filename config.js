/* ═══════════════════════════════════════════════════════════════════
   PATATAS ANDÚJAR · config.js
   ───────────────────────────────────────────────────────────────────
   ARCHIVO DE CONFIGURACIÓN CENTRAL — edita solo aquí.
   Cambiar teléfono, email, texto, foto → efecto inmediato en toda la web.

   IMÁGENES: ahora servidas desde /img/ (locales).
   Si añades un corte nuevo, descarga su imagen y pon la ruta aquí.
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {

  empresa: {
    nombre:  'Patatas Andújar',
    slogan:  'Patata Natural Pelada y Cortada',
    año:     '2026',
  },

  contacto: {
    telefono1:       '644 60 46 72',
    telefono1_href:  'tel:644604672',
    telefono2:       '953 02 21 75',
    telefono2_href:  'tel:953022175',
    email:           'patatasandujar@gmail.com',
    direccion:       'Avda. Árcangel San Gabriel, Nave 1',
    poligono:        'Polígono El Brillante',
    ciudad:          'Andújar, Jaén',
    legal_url:       'https://patatasandujar.com/politicas',
  },

  /* Para activar el envío real de email:
     1. Ve a formspree.io → crea cuenta gratis
     2. Nuevo form con email: patatasandujar@gmail.com
     3. Copia el ID (p.ej. "xpzgkqab") y pégalo abajo */
  formulario: {
    formspree_id:  'TU_ID_FORMSPREE',
    email_destino: 'patatasandujar@gmail.com',
  },

  fundadores: {
    nombre1: 'Mónica',
    nombre2: 'Roque',
    lugar:   'Andújar, Jaén',
    firma:   'Una solución práctica, limpia y eficiente para negocios que no quieren renunciar a la calidad por la rapidez.',
  },

  logo: {
    src:    'img/logo.png',
    alt:    'Patatas Andújar',
    height: '42',
  },

  video_hero: {
    src:    'https://patatasandujar.com/wp-content/uploads/2026/02/0-VIDEO-PATATAS-ANDUJAR-WEB.mp4',
    poster: 'img/bodegon.png',
  },

  /* ─── PÁGINAS DE PRODUCTO ─────────────────────────────────────
     bg:    foto GRANDE de ambiente (fondo, toda la pantalla)
     img:   foto PEQUEÑA del producto (superpuesta encima)
     img_fb: fallback si img falla (usa otra imagen local)
  ──────────────────────────────────────────────────────────────── */
  productos: [

    {
      id:          'paja',
      badge:       'Juliana',
      titulo:      'Patatas Paja',
      subtitulo:   'Bastón extrafino · Acabado homogéneo y visualmente atractivo',
      descripcion: 'Bastón extrafino (tipo juliana), diseñado para un acabado homogéneo y visualmente atractivo.',
      uso:         'Fritura rápida tipo chips. Perfectas como base de platos combinados, decoración de tapas o acompañamiento ligero que no satura el plato.',
      bg:     'img/paja-hero-bg.jpg',
      img:    'img/paja-simulacion.png',
      img_fb: 'img/paja-juliana.jpg',
      nav_prev: null,
      nav_next: 'baston',
    },

    {
      id:          'baston',
      badge:       '8 · 10 · 16 mm',
      titulo:      'Patatas Bastón',
      subtitulo:   '3 calibres para cada necesidad de la cocina profesional',
      descripcion: 'Tres calibres de bastón: fino (8mm), clásico (10mm) y grueso (16mm).',
      uso:         'Fritura rápida y tapas (8mm) · Hostelería estándar y hamburgueserías (10mm) · Platos principales y presentaciones rústicas (16mm).',
      bg:     'img/baston-hero-bg.jpg',
      img:    'img/baston-simulacion-8mm.png',
      img_fb: 'img/baston-8mm.jpg',
      nav_prev: 'paja',
      nav_next: 'panadera',
    },

    {
      id:          'panadera',
      badge:       '1 · 2 · 3 · 5 mm',
      titulo:      'Patatas Panadera',
      subtitulo:   '4 espesores para horno, fritura y presentaciones creativas',
      descripcion: 'Láminas de patata en cuatro espesores para diferentes técnicas de cocción.',
      uso:         'Chips y decoraciones crujientes (1mm) · Guarniciones finas y horno (2mm) · Patatas panaderas clásicas (3mm) · Asados y cocciones largas (5mm).',
      bg:     'img/panadera-hero-bg.jpg',
      img:    'img/panadera-simulacion-2mm.png',
      img_fb: 'img/panadera-2mm.jpg',
      nav_prev: 'baston',
      nav_next: 'dado',
    },

    {
      id:          'dado',
      badge:       '10 · 20 · 25 mm',
      titulo:      'Patatas Dado',
      subtitulo:   '3 tamaños de cubo para guisos, ensaladillas y asados',
      descripcion: 'Cubos perfectos en tres tamaños para cada técnica y presentación.',
      uso:         'Ensaladilla y salteados (10mm) · Guisos, tortillas y platos de cuchara (20mm) · Asados, estofados y cocidos (25mm).',
      bg:     'img/dado-hero-bg.jpg',
      img:    'img/dado-simulacion-20mm.png',
      img_fb: 'img/dado-20mm.jpg',
      nav_prev: 'panadera',
      nav_next: 'entera',
    },

    {
      id:          'entera',
      badge:       'Sin corte · Entera',
      titulo:      'Patata Entera Pelada',
      subtitulo:   'Lista para cocer, asar o preparar · Sin merma de pelado',
      descripcion: 'Patata entera pelada, lista para cualquier preparación. Elimina el tiempo de pelado y la merma en cocina.',
      uso:         'Cocida entera · Asada al horno · Base para purés y cremas · Platos de cocina tradicional · Cortada al gusto por el cocinero.',
      bg:     'img/entera-hero-bg.jpg',
      img:    'img/entera-real.jpg',
      img_fb: 'img/entera-real.jpg',
      nav_prev: 'dado',
      nav_next: 'envasado',
    },

    {
      id:          'envasado',
      badge:       'Termosellado · 2–4ºC',
      titulo:      'Nuestro Envasado',
      subtitulo:   'Higiénico · Seguro · Listo para usar',
      descripcion: 'Envasado termosellado higiénico con conservantes autorizados que mantienen el producto sin alterar su comportamiento en cocina.',
      uso:         'Mantener en refrigeración a 2–4ºC. Una vez abierto, conservar bien cerrado y consumir en las siguientes 48 horas.',
      bg:     'img/envasado-hero-bg.jpg',
      img:    'img/envasado-simulacion.jpg',
      img_fb: 'img/envasado-termosellado.jpg',
      nav_prev: 'entera',
      nav_next: null,
    },

  ],

};

if (typeof module !== 'undefined' && module.exports) module.exports = CONFIG;