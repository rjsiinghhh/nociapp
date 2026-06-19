#!/usr/bin/env python3
"""Generate NOCI app icons in JPEG format (PNG for adaptive icon)."""

import cairosvg
from PIL import Image
import io
import os

os.makedirs('/home/user/nociapp/assets', exist_ok=True)

# Colors from the NOCI logo
BLACK   = "#0A0A0A"
CYAN    = "#00BCEF"   # tilted I
PINK    = "#FF527A"   # C shape
LAVENDER = "#C080F0"  # hexagon outline

def make_noci_svg(width, height, bg="white"):
    """Build the NOCI logo as SVG scaled to fit inside width x height."""
    # Logo lives in a 1000x1000 logical space, centered
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}"
     viewBox="0 0 1000 1000"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="1000" height="1000" fill="{bg}"/>

  <!-- === N letter === -->
  <!-- Left vertical bar -->
  <rect x="140" y="80" width="128" height="760" fill="{BLACK}"/>

  <!-- Diagonal strip (parallelogram): top-left → bottom-right -->
  <polygon points="140,80 268,80 790,840 662,840" fill="{BLACK}"/>

  <!-- Right vertical bar with J-hook at bottom-right -->
  <path d="
    M 662 80
    L 790 80
    L 790 700
    C 790 810, 840 840, 840 840
    C 840 860, 820 880, 800 880
    C 750 895, 700 870, 690 840
    L 662 840
    L 662 80
    Z
  " fill="{BLACK}"/>

  <!-- === Cyan I with serifs, rotated −20° around its centre === -->
  <g transform="rotate(-20, 550, 305)">
    <!-- vertical stem -->
    <rect x="534" y="215" width="32" height="180" fill="{CYAN}"/>
    <!-- top serif -->
    <rect x="496" y="215" width="108" height="26" fill="{CYAN}"/>
    <!-- bottom serif -->
    <rect x="496" y="369" width="108" height="26" fill="{CYAN}"/>
  </g>

  <!-- === Pink C, rotated +22° around its centre === -->
  <g transform="rotate(22, 680, 500)">
    <path d="M 748 438
             Q 685 398 634 442
             Q 612 466 612 500
             Q 612 534 634 558
             Q 685 602 748 562"
          stroke="{PINK}" stroke-width="36"
          fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- === Lavender hexagon outline === -->
  <!-- flat-top hex, centre (476, 650), radius 44 -->
  <polygon points="476,606 514,628 514,672 476,694 438,672 438,628"
           stroke="{LAVENDER}" stroke-width="16" fill="none"
           stroke-linejoin="round"/>

</svg>'''


def svg_to_image(svg_str, w, h):
    """Render SVG string to a Pillow Image at w×h px."""
    png_bytes = cairosvg.svg2png(bytestring=svg_str.encode(), output_width=w, output_height=h)
    return Image.open(io.BytesIO(png_bytes)).convert("RGB")


# ── icon.jpg 1024×1024 ──────────────────────────────────────────────
icon = svg_to_image(make_noci_svg(1024, 1024), 1024, 1024)
icon.save('/home/user/nociapp/assets/icon.jpg', 'JPEG', quality=97, subsampling=0)
print("✓ assets/icon.jpg")

# ── splash.jpg  2048×2048 (Expo centres on device) ──────────────────
splash_svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="2048" fill="white"/>
  <!-- Logo centred in a 700×700 box at (674, 674) -->
  <g transform="translate(674,674) scale(0.7)">
    {make_noci_svg(1000, 1000, bg="none").split("<rect")[0]}
    <!-- reuse the inner elements from make_noci_svg, without the background rect -->
  </g>
</svg>'''

# Simpler: just render the square logo then paste on a white canvas
logo_small = svg_to_image(make_noci_svg(700, 700), 700, 700)
splash = Image.new("RGB", (2048, 2048), (255, 255, 255))
splash.paste(logo_small, ((2048 - 700) // 2, (2048 - 700) // 2))
splash.save('/home/user/nociapp/assets/splash.jpg', 'JPEG', quality=97, subsampling=0)
print("✓ assets/splash.jpg")

# ── adaptive-icon.png  1024×1024 (Android needs PNG for transparency)
adapt_svg = make_noci_svg(1024, 1024, bg="none")
cairosvg.svg2png(bytestring=adapt_svg.encode(),
                 write_to='/home/user/nociapp/assets/adaptive-icon.png',
                 output_width=1024, output_height=1024)
print("✓ assets/adaptive-icon.png")

# ── favicon.jpg  196×196 ─────────────────────────────────────────────
favicon = svg_to_image(make_noci_svg(196, 196), 196, 196)
favicon.save('/home/user/nociapp/assets/favicon.jpg', 'JPEG', quality=95, subsampling=0)
print("✓ assets/favicon.jpg")

print("\nAll icons generated.")
