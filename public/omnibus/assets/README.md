# Omnibus Asset Specification

This directory holds the final tableau art for THE OMNIBUS. In v1, every scene
ships with an SVG/CSS placeholder rendered inline. To swap a placeholder for
real art:

1. Drop the finished image into `public/omnibus/assets/` using the expected
   filename below.
2. Open the matching scene config in `src/components/omnibus/scenes/`.
3. Find the `// FINAL ART SWAP POINT` marker and replace the placeholder JSX
   with `<img src="/omnibus/assets/scene-XX-name.png" />` filling the
   container.
4. Re-author hotspot positions if the composition shifts (positions are %, so
   small shifts are usually fine).

## Expected files

| # | Scene | Filename | Resolution |
|---|---|---|---|
| 01 | Observatory | `scene-01-observatory.png` | 1920×1080 |
| 02 | Fog Forest | `scene-02-fog-forest.png` | 1920×1080 |
| 03 | Idol Doorway | `scene-03-idol-doorway.png` | 1920×1080 |
| 04 | Foyer | `scene-04-foyer.png` | 1920×1080 |
| 05 | Great Room | `scene-05-great-room.png` | 1920×1080 |
| 06 | Art Gallery | `scene-06-art-gallery.png` | 1920×1080 |
| 07 | Lore Vault | `scene-07-lore-vault.png` | 1920×1080 |
| 08 | Arcade | `scene-08-arcade.png` | 1920×1080 |
| 09 | Code Chamber | `scene-09-code-chamber.png` | 1920×1080 |
| 10 | Utility Closet | `scene-10-utility-closet.png` | 1920×1080 |
| 11 | Secret Alcove | `scene-11-secret-alcove.png` | 1920×1080 |

## Sigil assets

The Z sigil lives at `/public/omnibus/sigil/`:

- `Z-grey.png` — chrome static version (used in Observatory, Idol Doorway,
  Great Room chandelier, etc.)
- `metal-logo-short.mp4` — animated AE-rendered version for the Secret
  Alcove pedestal hero shot and the pixel-wipe loading flash.

## Format guidance

- PNG with transparent background where the scene composition allows
  layering. WebP is acceptable.
- Target 1920×1080 (16:9). The renderer scales to viewport with `cover`
  semantics, so non-essential edges may crop.
- Bake heavy dithering and Riso ink-grain into the file; the placeholder
  layer stops applying CSS dither once a real image is present.
