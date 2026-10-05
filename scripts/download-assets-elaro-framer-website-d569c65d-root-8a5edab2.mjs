// Downloads every asset used by the Elaro (elaro.framer.website) home-page clone.
// Usage: node scripts/download-assets-elaro-framer-website-d569c65d-root-8a5edab2.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = "public/sites/elaro-framer-website-d569c65d/root-8a5edab2";

/** @type {{ url: string; to: string }[]} */
const ASSETS = [
  // Brand / chrome
  { url: "https://framerusercontent.com/images/bqubXtWKKLHRhvF2AnUnjd0CKI.png", to: "images/logo-er.png" },
  { url: "https://framerusercontent.com/images/4ZATUfYwmoAsdbzvYL3yXoNJo.png", to: "images/menu-icon.png" },
  { url: "https://framerusercontent.com/images/4aOo0o9Pyn29OvpulNkDQ1Envl4.png", to: "seo/favicon.png" },
  // Decorative
  { url: "https://framerusercontent.com/images/JiZXkIEJ98RJi1lJRGLagU3XuWo.png", to: "images/ornament-rule.png" },
  { url: "https://framerusercontent.com/images/g4bIVln5iaGZUOA33MjfsPc1I.png", to: "images/ornament-leaf.png" },
  // Hero
  { url: "https://framerusercontent.com/images/ZS1oKzr50YbabL7wj85raFtXs4M.jpg", to: "images/hero.jpg" },
  // Our story
  { url: "https://framerusercontent.com/images/OfZhljXtRtB7pPricSYqPo4GXc.jpg", to: "images/story-2018.jpg" },
  { url: "https://framerusercontent.com/images/v6x9UW2UedmCpxh3tPKYvC28g.jpg", to: "images/story-2022.jpg" },
  { url: "https://framerusercontent.com/images/r3KE9BFJjMDRNImhnKMspgLi9K8.jpg", to: "images/story-2026.jpg" },
  // Venue
  { url: "https://framerusercontent.com/images/SCs1kX7pYZjrIucWVJRu1GZvr8w.jpg", to: "images/venue.jpg" },
  // Wedding-day schedule
  { url: "https://framerusercontent.com/images/Rnm6uFehIjfZ5ecXFb7kLKGLLU.jpg", to: "images/schedule-ceremony.jpg" },
  { url: "https://framerusercontent.com/images/szktrUuGMGfTIX04npvf9mfsKI.jpg", to: "images/schedule-drinks.jpg" },
  { url: "https://framerusercontent.com/images/mhBtK4QCW4vLRVaFzvTC8gksRsc.jpg", to: "images/schedule-dinner.jpg" },
  { url: "https://framerusercontent.com/images/EojCMlzmBKjgPJovdIu431iFBtw.jpg", to: "images/schedule-party.jpg" },
  // Hotels / RSVP
  { url: "https://framerusercontent.com/images/TeGdnBCKD5ujIgEM6LPAgOGLWNI.jpg", to: "images/rsvp.jpg" },
  // Dress code
  { url: "https://framerusercontent.com/images/5yvu1gntAxDNJYsDHdfXdSK3mL0.jpg", to: "images/dress-1.jpg" },
  { url: "https://framerusercontent.com/images/uFokj3gEnRZdMgbQnznt3UeNuzI.jpg", to: "images/dress-2.jpg" },
  // About — horizontal photo marquee (5 photos + repeating grain/fade strip)
  { url: "https://framerusercontent.com/images/lo76tuhSgb59Q3kfnnUEyTXHqg.png", to: "images/marquee-fade.png" },
  { url: "https://framerusercontent.com/images/7zaZL2MhTbWC8BFXS9P7oJQ1Ths.jpg", to: "images/marquee-1.jpg" },
  { url: "https://framerusercontent.com/images/mj9DviXVXfkjt81L32BBcsf1wc.jpg", to: "images/marquee-2.jpg" },
  { url: "https://framerusercontent.com/images/oNiJtsdtL8YsOoRNLgMI8eDaWYc.jpg", to: "images/marquee-3.jpg" },
  { url: "https://framerusercontent.com/images/gqh0hmfsORmfpig3SzylKNGiePA.jpg", to: "images/marquee-4.jpg" },
  { url: "https://framerusercontent.com/images/sT8CpUoLvlwOU87cST16p9YdVoc.jpg", to: "images/marquee-5.jpg" },
  // Venue — second (hover/animated) layer
  { url: "https://framerusercontent.com/images/nDuwrFARvRdIbUUk82kkTzBzH0.jpg", to: "images/venue-2.jpg" },
  // Hotels — one photo per hotel
  { url: "https://framerusercontent.com/images/n3GiBzL5ZoO3L6QQMimc4Ue7Rwo.jpg", to: "images/hotel-1.jpg" },
  { url: "https://framerusercontent.com/images/M67ojl2JFLj3NYUXPcsbPtdHZM.jpg", to: "images/hotel-2.jpg" },
  { url: "https://framerusercontent.com/images/ae3BrMmNZ64w3Q4eJk84r5Mexww.jpg", to: "images/hotel-3.jpg" },
  // Dress code — third panel
  { url: "https://framerusercontent.com/images/KpTSMS05P13MKtkermFHo30FIE.jpg", to: "images/dress-3.jpg" },
  // Footer — three stacked photos
  { url: "https://framerusercontent.com/images/sAyszz0sExCj4hQD8hRKHK72L04.jpg", to: "images/footer-1.jpg" },
  { url: "https://framerusercontent.com/images/0SIHC5EOMGTeaN9FV0FCU5B2A.jpg", to: "images/footer-2.jpg" },
  { url: "https://framerusercontent.com/images/0ECVCs0Xb80zzqhurCNHcBkBFJE.jpg", to: "images/footer-3.jpg" },
];

async function download({ url, to }) {
  const dest = join(OUT, to);
  const res = await fetch(url, { headers: { referer: "https://elaro.framer.website/" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `${to} (${(buf.length / 1024).toFixed(0)} KB)`;
}

const BATCH = 4;
let ok = 0;
for (let i = 0; i < ASSETS.length; i += BATCH) {
  const results = await Promise.allSettled(ASSETS.slice(i, i + BATCH).map(download));
  for (const r of results) {
    if (r.status === "fulfilled") {
      ok += 1;
      console.log(`  ok  ${r.value}`);
    } else {
      console.error(`FAIL  ${r.reason.message}`);
    }
  }
}
console.log(`\n${ok}/${ASSETS.length} assets downloaded into ${OUT}`);
if (ok !== ASSETS.length) process.exitCode = 1;
