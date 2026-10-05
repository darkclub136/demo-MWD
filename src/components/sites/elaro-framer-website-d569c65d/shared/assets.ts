const BASE = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sites/elaro-framer-website-d569c65d/root-8a5edab2`;

/** Every asset downloaded from elaro.framer.website, by role. */
export const ASSETS = {
  logo: `${BASE}/images/logo-er.webp`,
  menuIcon: `${BASE}/images/menu-icon.webp`,
  favicon: `${BASE}/seo/favicon.png`,

  ornamentRule: `${BASE}/images/ornament-rule.webp`,
  ornamentHeart: `${BASE}/images/ornament-leaf.webp`,
  marqueeFade: `${BASE}/images/marquee-fade.webp`,

  hero: `${BASE}/images/hero.webp`,

  marquee: [
    `${BASE}/images/marquee-1.webp`,
    `${BASE}/images/marquee-2.webp`,
    `${BASE}/images/marquee-3.webp`,
    `${BASE}/images/marquee-4.webp`,
    `${BASE}/images/marquee-5.webp`,
  ],

  story: {
    met: `${BASE}/images/story-2018.webp`,
    proposal: `${BASE}/images/story-2022.webp`,
    celebration: `${BASE}/images/story-2026.webp`,
  },

  venue: `${BASE}/images/venue.webp`,
  venueAlt: `${BASE}/images/venue-2.webp`,

  schedule: {
    ceremony: `${BASE}/images/schedule-ceremony.webp`,
    drinks: `${BASE}/images/schedule-drinks.webp`,
    dinner: `${BASE}/images/schedule-dinner.webp`,
    party: `${BASE}/images/schedule-party.webp`,
  },

  hotels: [
    `${BASE}/images/hotel-1.webp`,
    `${BASE}/images/hotel-2.webp`,
    `${BASE}/images/hotel-3.webp`,
  ],

  rsvp: `${BASE}/images/rsvp.webp`,

  dress: [
    `${BASE}/images/dress-1.webp`,
    `${BASE}/images/dress-2.webp`,
    `${BASE}/images/dress-3.webp`,
  ],

  footer: [
    `${BASE}/images/footer-1.webp`
  ],
} as const;
