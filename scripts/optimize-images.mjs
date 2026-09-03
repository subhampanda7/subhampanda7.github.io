/**
 * Generates responsive, compressed variants of the source portrait.
 * Static export ships images as-is, so the optimisation has to happen ahead of time.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "assets", "profile-hero.png");
const OUT_DIR = path.join(ROOT, "public", "img");
const WIDTHS = [480, 720];

await mkdir(OUT_DIR, { recursive: true });

const meta = await sharp(SOURCE).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

for (const width of WIDTHS) {
  await sharp(SOURCE)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 62, effort: 6 })
    .toFile(path.join(OUT_DIR, `profile-${width}.avif`));

  await sharp(SOURCE)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, `profile-${width}.webp`));
}

// PNG fallback for the rare client without WebP support.
await sharp(SOURCE)
  .resize({ width: 720, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(path.join(OUT_DIR, "profile-720.png"));

// ---------------------------------------------------------------------------
// Social preview card (1200x630), composed rather than cropped.
// ---------------------------------------------------------------------------
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";
const MONO = "SF Mono, Menlo, Monaco, monospace";

const card = /* svg */ `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="50%" stop-color="#6d7dff"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.2" cy="0.1" r="0.7">
      <stop offset="0%" stop-color="#6d7dff" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#6d7dff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.85" cy="0.85" r="0.6">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#05060a"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <rect x="0" y="0" width="1200" height="5" fill="url(#brand)"/>

  <g transform="translate(80, 150)">
    <rect x="0" y="0" width="250" height="38" rx="19" fill="#34d399" fill-opacity="0.12" stroke="#34d399" stroke-opacity="0.3"/>
    <circle cx="24" cy="19" r="5" fill="#34d399"/>
    <text x="42" y="25" font-family="${FONT}" font-size="16" fill="#9aa1b4">Open to opportunities</text>

    <text x="0" y="130" font-family="${FONT}" font-size="86" font-weight="700" fill="#edeff5" letter-spacing="-3">Subham Panda</text>
    <text x="2" y="188" font-family="${FONT}" font-size="40" font-weight="600" fill="url(#brand)" letter-spacing="-1">Backend Software Engineer</text>

    <text x="2" y="248" font-family="${MONO}" font-size="20" fill="#6b7285">Java · Spring Boot · Kafka · Temporal.io · Redis</text>

    <g transform="translate(2, 300)">
      <text x="0" y="0" font-family="${FONT}" font-size="30" font-weight="700" fill="#edeff5">800ms→280ms</text>
      <text x="0" y="26" font-family="${MONO}" font-size="15" fill="#6b7285">API latency</text>
      <text x="250" y="0" font-family="${FONT}" font-size="30" font-weight="700" fill="#edeff5">99.9%</text>
      <text x="250" y="26" font-family="${MONO}" font-size="15" fill="#6b7285">uptime</text>
      <text x="400" y="0" font-family="${FONT}" font-size="30" font-weight="700" fill="#edeff5">10K+</text>
      <text x="400" y="26" font-family="${MONO}" font-size="15" fill="#6b7285">events / month</text>
    </g>
  </g>
</svg>`;

const PORTRAIT_SIZE = 500;

// Fade the portrait into the card instead of letting it hit a hard edge.
const fade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PORTRAIT_SIZE}" height="${PORTRAIT_SIZE}">
     <defs><linearGradient id="m" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0.74" stop-color="#fff" stop-opacity="1"/>
       <stop offset="1" stop-color="#fff" stop-opacity="0"/>
     </linearGradient></defs>
     <rect width="${PORTRAIT_SIZE}" height="${PORTRAIT_SIZE}" fill="url(#m)"/>
   </svg>`,
);

const portrait = await sharp(SOURCE)
  .resize({ width: PORTRAIT_SIZE, height: PORTRAIT_SIZE, fit: "inside" })
  .composite([{ input: fade, blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(Buffer.from(card))
  .composite([{ input: portrait, top: 130, left: 690 }])
  .png({ compressionLevel: 9, quality: 88, palette: true })
  .toFile(path.join(OUT_DIR, "og.png"));

console.log(`wrote ${WIDTHS.length * 2 + 2} files to public/img`);
