"""
PATATAS ANDÚJAR · Descargador de imágenes
==========================================
Ejecuta este script UNA VEZ desde la raíz del proyecto:
    python descargar_imagenes.py

Descarga todas las imágenes de WordPress a la carpeta /img local.
Después puedes subir el proyecto a GitHub Pages / Netlify / Vercel
y las imágenes se servirán desde tu propio dominio.

Requisitos: Python 3.7+ (sin dependencias externas)
"""

import urllib.request
import urllib.error
import os
import time

# ── DESTINO ────────────────────────────────────────────────────────
IMG_DIR = "img"
os.makedirs(IMG_DIR, exist_ok=True)

BASE = "https://patatasandujar.com/wp-content/uploads"

# ── IMÁGENES A DESCARGAR ───────────────────────────────────────────
# (nombre_local, ruta_wordpress)
IMAGENES = [
    # Logo + bodegón
    ("logo.png",                           f"{BASE}/2026/02/02-LOGOTIPO-PATATAS-ANDUJAR-14-300x125.png"),
    ("bodegon.png",                        f"{BASE}/2026/01/BODEGON-SIMULACION-1-scaled.png"),
    ("bodegon-thumb.png",                  f"{BASE}/elementor/thumbs/BODEGON-SIMULACION-1-scaled-ri6s43rpuu9hlo8y4gt985cog3y2cztgoor0zelnpc.png"),

    # Vídeo hero poster
    ("video-poster.png",                   f"{BASE}/2026/01/BODEGON-SIMULACION-1-scaled.png"),

    # ── PAJA ──────────────────────────────────────────────────────
    ("paja-hero-bg.jpg",                   f"{BASE}/2026/02/PATATA-JULIANA.jpg"),
    ("paja-hero-bg-thumb.jpeg",            f"{BASE}/elementor/thumbs/PATATA-JULIANA.jpg-scaled-rikrz0a61q8ym6z8x4by6o9q4gxtj4tc2n4jyyv3ao.jpeg"),
    ("paja-simulacion.png",                f"{BASE}/2026/02/PATATAS-PAJA-scaled.png"),
    ("paja-juliana.jpg",                   f"{BASE}/2026/02/PATATA-JULIANA.jpg"),

    # ── BASTÓN ────────────────────────────────────────────────────
    ("baston-hero-bg.jpg",                 f"{BASE}/2026/02/PATATA-BASTON-no10-1-scaled.jpg"),
    ("baston-simulacion-8mm.png",          f"{BASE}/2026/02/PATATA-BASTON-no8-SIMULACION-2-scaled.png"),
    ("baston-8mm.jpg",                     f"{BASE}/2026/02/PATATA-BASTON-no8-scaled.jpg"),
    ("baston-simulacion-10mm.png",         f"{BASE}/2026/02/PATATA-BASTON-no16-SIMULACION-2-scaled.png"),
    ("baston-10mm.jpg",                    f"{BASE}/2026/02/PATATA-BASTON-no10-1-scaled.jpg"),
    ("baston-simulacion-16mm.jpg",         f"{BASE}/2026/02/PATATA-BASTON-no16-SIMULACION-scaled.jpg"),
    ("baston-16mm.jpg",                    f"{BASE}/2026/02/PATATA-BASTON-no16-scaled.jpg"),

    # ── PANADERA ──────────────────────────────────────────────────
    ("panadera-hero-bg.jpg",               f"{BASE}/2026/02/PATATA-PANADERA-No5-EN-FILA-scaled.jpg"),
    ("panadera-simulacion-2mm.png",        f"{BASE}/2026/02/PATATA-PANADERA-No2-SIMULACION-scaled.png"),
    ("panadera-1mm-a.jpg",                 f"{BASE}/2026/02/00-PATATAS-PARA-WEB18.jpg"),
    ("panadera-1mm-b.jpg",                 f"{BASE}/2026/02/00-PATATAS-PARA-WEB16.jpg"),
    ("panadera-simulacion-2mm-real.jpg",   f"{BASE}/2026/02/PATATA-PANADERA-No2-1-scaled.jpg"),
    ("panadera-simulacion-3mm.png",        f"{BASE}/2026/02/PATATA-PANADERA-No4-SIMULACION-2-scaled.png"),
    ("panadera-3mm.jpg",                   f"{BASE}/2026/02/PATATA-PANADERA-No4-scaled.jpg"),
    ("panadera-simulacion-5mm.png",        f"{BASE}/2026/02/PATATA-PANADERA-No5-SIMULACION-scaled.png"),
    ("panadera-5mm.jpg",                   f"{BASE}/2026/02/PATATA-PANADERA-No5-EN-FILA-scaled.jpg"),

    # ── DADO ──────────────────────────────────────────────────────
    ("dado-hero-bg.jpg",                   f"{BASE}/2026/02/PATATA-DADO-10-mm-ENSALADILLA-1-scaled.jpg"),
    ("dado-simulacion-20mm.png",           f"{BASE}/2026/02/PATATA-DADO-20-SIMULACION-scaled.png"),
    ("dado-10mm-a.jpg",                    f"{BASE}/2026/02/00-PATATAS-PARA-WEB5.jpg"),
    ("dado-10mm-b.jpg",                    f"{BASE}/2026/02/PATATA-DADO-10-mm-ENSALADILLA-1-scaled.jpg"),
    ("dado-20mm.jpg",                      f"{BASE}/2026/02/PATATA-DADO-20-mm-scaled.jpg"),
    ("dado-simulacion-25mm.png",           f"{BASE}/2026/02/PATATA-DADO-25-SIMULACION-2-scaled.png"),
    ("dado-25mm.jpg",                      f"{BASE}/2026/02/PATATA-DADO-25-mm-scaled.jpg"),

    # ── ENTERA ────────────────────────────────────────────────────
    ("entera-simulacion.jpg",            f"{BASE}/elementor/thumbs/PATATA-ENTERA-PELADA-SIMULACION-scaled-rikr65mjhnk4bodz54wtsn1r4vt278gu94c0uknbcw.jpg"),
    ("entera-real.jpg",                   f"{BASE}/2026/02/PATATA-ENTERA-PELADA-1-scaled.jpg"),
    ("entera-hero-bg.jpg",                 f"{BASE}/2026/02/PATATA-BASTON-no16-scaled.jpg"),
    # ── ENVASADO ──────────────────────────────────────────────────
    ("envasado-hero-bg.jpg",               f"{BASE}/2026/02/ENVASADO-TERMOSELLADO-BOLSA-PLASTICO-scaled.jpg"),
    ("envasado-simulacion.jpg",            f"{BASE}/2026/02/SIMULACION-copia-scaled.jpg"),
    ("envasado-termosellado.jpg",          f"{BASE}/2026/02/ENVASADO-TERMOSELLADO-BOLSA-PLASTICO-scaled.jpg"),

    # ── HEROES PÁGINAS ESTÁTICAS (nosotros, productos, contacto) ──
    ("productos-hero-bg.jpg",              f"{BASE}/elementor/thumbs/PATATA-BASTON-no16-scaled-rikrtjtwdcs17owls9ex7judyxu3ue5fnms2o4ydf4.jpg"),
    ("nosotros-hero-bg.jpeg",             f"{BASE}/elementor/thumbs/PATATA-JULIANA.jpg-scaled-rikrz0a61q8ym6z8x4by6o9q4gxtj4tc2n4jyyv3ao.jpeg"),
    ("contacto-hero-bg.jpg",              f"{BASE}/elementor/thumbs/PATATA-PANADERA-No5-EN-FILA-scaled-rikrkvrhccwu55hweiis7qlcr0k8uvqjsq6vc9t2sw.jpg"),
]

# ── DESCARGA ───────────────────────────────────────────────────────
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://patatasandujar.com/",
}

ok = 0
fail = 0
skip = 0

print(f"\n{'='*60}")
print(f"  Descargando {len(IMAGENES)} imágenes → /{IMG_DIR}/")
print(f"{'='*60}\n")

for nombre, url in IMAGENES:
    dest = os.path.join(IMG_DIR, nombre)

    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"  [SKIP]  {nombre}")
        skip += 1
        continue

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()

        with open(dest, "wb") as f:
            f.write(data)

        kb = len(data) // 1024
        print(f"  [OK]    {nombre}  ({kb} KB)")
        ok += 1
        time.sleep(0.3)   # cortesía al servidor

    except urllib.error.HTTPError as e:
        print(f"  [FAIL]  {nombre}  → HTTP {e.code}  ({url})")
        fail += 1
    except Exception as e:
        print(f"  [FAIL]  {nombre}  → {e}")
        fail += 1

print(f"\n{'='*60}")
print(f"  Resultado: {ok} OK · {skip} ya existían · {fail} fallaron")
print(f"{'='*60}\n")

if fail > 0:
    print("  ⚠️  Algunas imágenes fallaron.")
    print("  Descárgalas manualmente desde el admin de WordPress:")
    print("  Medios → Biblioteca → descarga cada archivo.")
    print()