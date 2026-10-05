// Shrinks oversized photos in the site's image folder to the size they are
// actually displayed at (about 2x the rendered box, for sharp screens).
//
// The site is a static export with `images: { unoptimized: true }`, so the
// browser downloads and decodes these files as-is — a 24-megapixel photo shown
// at 273px wide costs ~100MB of memory and stalls scrolling while it decodes.
//
// Originals are moved to /original-images (outside /public, so never deployed)
// the first time a file is shrunk; re-running is safe and only touches files
// still larger than their target.
//
// Usage: node scripts/optimize-images.mjs

import { existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const IMAGES = "public/sites/elaro-framer-website-d569c65d/root-8a5edab2/images";
const ORIGINALS = "original-images";

/**
 * Max width per photo, matched on the whole file name so decorative images
 * (marquee-fade, ornament-*, logo) are never touched.
 */
const TARGETS = [
  { pattern: /^marquee-\d+\.webp$/, width: 600 }, // shown at 273px
  { pattern: /^hero\.webp$/, width: 2560 }, // full-bleed
  { pattern: /^venue(-\d+)?\.webp$/, width: 1600 }, // shown at 693px
  { pattern: /^schedule-[a-z]+\.webp$/, width: 1800 }, // shown at 882px
  { pattern: /^hotel-\d+\.webp$/, width: 1100 }, // shown at 530px
  { pattern: /^dress-\d+\.webp$/, width: 1100 }, // shown at ~420px
  { pattern: /^footer-\d+\.webp$/, width: 900 }, // shown at 435px
  { pattern: /^rsvp\.webp$/, width: 1000 }, // shown at 470px
];

mkdirSync(ORIGINALS, { recursive: true });

for (const { pattern, width } of TARGETS) {
  const files = readdirSync(IMAGES).filter((name) => pattern.test(name));

  for (const name of files) {
    const path = join(IMAGES, name);
    const meta = await sharp(path).metadata();
    // EXIF orientation 5–8 means the stored pixels are rotated 90°.
    const shownWidth = (meta.orientation ?? 1) >= 5 ? meta.height : meta.width;
    if (!shownWidth || shownWidth <= width) continue;

    const original = join(ORIGINALS, name);
    if (!existsSync(original)) renameSync(path, original);

    await sharp(existsSync(original) ? original : path)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path);

    const after = await sharp(path).metadata();
    console.log(`${name}: ${shownWidth}px → ${after.width}x${after.height}`);
  }
}
