# Visual QA — elaro.framer.website/ → `/`

## How this pass was run

The browser pane available in this session never became visible (`document.visibilityState`
stayed `"hidden"`, `requestAnimationFrame` delivered **0 frames in 1.5s**). A hidden tab
suspends every rendering-gated API, so screenshots came back blank and
`IntersectionObserver` delivered no callbacks at all.

QA was therefore done by **measuring the live DOM** of the clone and diffing it against the
measurements taken from the original earlier in the same session — which is a stricter
check than eyeballing screenshots for everything that is static, and no check at all for
anything that moves. What is and is not verified is stated plainly below.

## Verified — layout geometry (desktop, 1440 × 900)

Section tops and heights, original vs clone:

| Section | Original (top / height) | Clone (top / height) | Δ |
|---|---|---|---|
| Hero | 0 / 900 | 0 / 900 | 0 |
| Details ticker | 900 / 138 | 900 / 138 | 0 |
| About | 1038 / 1083 | 1038 / 1083 | 0 |
| Story | 2121 / 1681 | 2121 / 1681 | 0 |
| Venue | 3802 / 766 | 3802 / 766 | 0 |
| Schedule | 4568 / 3630 | 4568 / 3631 | +1 |
| Hotels | 8197 / 2700 | 8199 / 2700 | +2 |
| RSVP | 10897 / 802 | 10899 / 802 | +2 |
| FAQ | 11699 / 965 | 11701 / 965 | +2 |
| Dress code | 12664 / 2255 | 12666 / 2255 | +2 |
| Footer | 14919 / 1021 | 14921 / 1021 | +2 |
| **Document** | **15940** | **15942** | **+2** |

## Verified — typography and colour

Every value below was read with `getComputedStyle()` on both sites and matches exactly:

- `h1` / footer names: `190px / 170px`, `-7.6px`, Fraunces 400
- `h2`: `82px / 85px`, `-1.64px`; accent half `rgb(201, 169, 106)`
- `h3`: `48px / 52px`, `-0.96px`; `h4`: `30px / 38px`, `-0.6px`; `h5`: `26px / 30px`, `-0.52px`
- Ticker: `34px / 38px` Fraunces; nav links `16px / 20px` Fraunces white
- Body `16px / 20px` Inter; labels `14px / 18px` Inter; FAQ questions `20px / 24px` Inter 500 `-0.2px`
- Venue on dark: eyebrow + body `rgba(255,255,255,0.7)`, detail labels `rgba(255,255,255,0.4)`, values `18px / 24px` Fraunces white
- Buttons: `#6F7E62`, `padding: 13px 30px`, `height: 50px`, radius 0
- RSVP fields: `#EDEADF`, `padding: 20px`, height `60px` (textarea box `120px`)
- FAQ: section `#0F0F0F`, container `120px 170px`, list `1085px`, closed item `85px`,
  content padding `30px 0`, separator `inset 0 -1px 0 rgba(255,255,255,0.1)`
- Venue/Hotels/Dress sticky columns resolve to `position: sticky` at the measured sizes
  (Venue right column `580 × 766` at x 753, pad `120px 0`, gap 60; Hotels block `1345 × 940`, gap 80;
  Dress heading `1345 × 215`, pad `0 0 80px`)
- Footer: `#F8F5F0`, `&` in gold, photos `435 × 607` landing at x `420 / 495 / 570`

## Verified — content

The clone's full rendered text was diffed against the original's: **identical, verbatim**,
including the typographic apostrophes, the em dashes, the en dash in `15–30`, and the
original's grammar slip `just an ten-minute`.

## Verified — responsive (390 × 844)

- No horizontal overflow (`scrollWidth === innerWidth === 390`)
- Nav collapses to logo + hamburger, link row and RSVP button removed — matches the
  original's "Phone close" variant
- Hero `675px` — matches the original exactly
- `h1` `44px / 40px`, `h2` `50px / 55px` — match
- Venue and RSVP containers switch to `flex-direction: column` — match
- Whole-document height 12,879 vs the original's 12,749 (≈1%)

Individual mobile section heights differ from the original by up to ~20% (e.g. About 714
vs 520, Footer 732 vs 856). Framer hand-tunes each element per breakpoint; the clone's
mobile layout was derived from the original's CSS media queries plus the measured phone
variants, so it is close but **not pixel-identical below 1200px**. Desktop is the
pixel-matched target.

## NOT verified — anything that moves

These were specified from measurements of the original but could not be exercised here,
because the pane never rendered:

- Nav variant swap at 100vh (transparent/100px → `#0F0F0F`/90px)
- Schedule cards opening on scroll (734 → 481, copy block 336 centred → 404 left)
- Hotels active-row switching and photo cross-fade
- Story progress-rule fill
- FAQ accordion open/close
- Both marquees (details ticker, About photo strip)
- `Reveal` entrance animations
- Lenis smooth scrolling

Run `npm run dev` and open http://localhost:3000 to check these by hand.

## Fixed during this pass

1. **Tailwind breakpoint ordering.** An attempt to retarget `xl` to the original's 1200px
   emitted the 1200px media query *before* `md`, so `md:` beat `xl:` at desktop widths and
   the hero rendered 720px instead of 900px. Reverted; `xl` is Tailwind's default 1280px.
   **Known deviation:** the original switches to its desktop layout at 1200px, the clone at
   1280px, so widths 1200–1279px show the tablet layout rather than the desktop one.
2. **Story section 100px too tall.** The original's timeline column declares `height: 1286px`
   and lets the last card overflow into the container's bottom padding; the clone was letting
   the column grow to 1386px. Pinned to `xl:h-[1286px]`, which brought the section from 1781
   back to the measured 1681.
3. **`Reveal` lint error** (`setState` called synchronously in an effect) — replaced the
   reduced-motion branch with `motion-reduce:` utilities.
4. **Horizontal overflow** from the footer's fanned photo stack — added `overflow-x-hidden`
   at the page root.
5. **Scroll-driven work moved off `scroll` listeners.** The nav variant is now driven by an
   `IntersectionObserver` on the hero (the hero is exactly 100vh, so "hero stopped
   intersecting" *is* the measured trigger). The Story fill reads the position from a frame
   loop (`useScrollFrame`), which gives it a value on every frame of a Lenis-eased scroll,
   with a native `scroll` listener kept as a fallback.

## Build status

`npm run check` (lint + typecheck + production build) passes clean.
