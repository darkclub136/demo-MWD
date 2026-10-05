# Page Topology — elaro.framer.website/

- **Source:** https://elaro.framer.website/
- **Destination route:** `/` (`src/app/page.tsx`)
- **Site key:** `elaro-framer-website-d569c65d`
- **Page key:** `root-8a5edab2`
- **Measured at:** 1440 × 900 viewport (content width 1425px after scrollbar)
- **Total document height:** ~15,940px (varies ±500px while reveal animations settle)

## Source stack

Framer-published site. React + Motion (framer-motion) + **Lenis smooth scroll** (`<html class="lenis">`).
Fonts: **Fraunces** (variable, display serif) + **Inter** (body). No video, no canvas.

## Page shell

| Layer | Detail |
|---|---|
| Page background | `#F8F5F0` (cream) on `<main>` |
| Content container | `max-width: 1440px`, horizontal padding `40px` → 1345px content column |
| Fixed nav | `position: fixed; z-index: 3`, full width, overlays everything |
| Section rhythm | Most sections use `padding: 180px 40px` and an 80px gap between heading block and body |

## Sections, top to bottom

| # | Name | Top | Height | Anchor id | Background | Interaction model |
|---|---|---|---|---|---|---|
| 0 | `SiteNav` | fixed | 100 → 90 | — | transparent → `#0F0F0F` | **scroll-driven** (variant swap past hero) |
| 1 | `HeroSection` | 0 | 900 (100vh) | `banner-section` | full-bleed photo + bottom gradient | static (entrance fade-up) |
| 2 | `DetailsTicker` | 900 | 138 | — | cream | **time-driven** (infinite left marquee) |
| 3 | `AboutSection` | 1038 | 1083 | — | cream | **time-driven** (photo marquee) + static copy |
| 4 | `StorySection` | 2121 | 1681 | — | cream | **scroll-driven** (vertical progress fill) |
| 5 | `VenueSection` | 3802 | 766 | `venue` | `#0F0F0F` | static + `position: sticky` right column |
| 6 | `ScheduleSection` | 4568 | 3630 | `schedule` | cream | **scroll-driven** (cards open on enter) |
| 7 | `HotelsSection` | 8197 | 2700 | `hotel` | cream | **scroll-driven** (sticky block, active item switches) |
| 8 | `RsvpSection` | 10897 | 802 | `rsvp` | cream | static form |
| 9 | `FaqSection` | 11699 | 965 | `faq` | `#0F0F0F` | **click-driven** accordion |
| 10 | `DressCodeSection` | 12664 | 2255 | `dress-code` | cream | static + `position: sticky` heading |
| 11 | `SiteFooter` | 14919 | 1021 | — | cream | static |

> Section tops drift by a few hundred px once the Schedule cards open and the Hotels
> block releases its sticky phase. The heights above are the settled, fully-hydrated values.

## Z-index layers

1. `z-index: 3` — fixed nav container
2. `z-index: 2` — hero copy container; marquee arc masks in the About section
3. `z-index: 1` — Schedule card copy block (sits over its photo in the closed state); centre photo in the footer stack
4. default — everything else

## Dependencies between sections

- Nav links are in-page anchors: `#venue`, `#schedule`, `#faq`, `#dress-code`, `#rsvp`.
  Every target section must carry that exact `id`.
- The nav variant swap is driven by the Hero's height (100vh), so the Hero must stay
  exactly `100vh` for the threshold to line up.
- Lenis is global: it must be mounted once at the page level, not per section.

## Shared building blocks

| Component | Used by |
|---|---|
| `SectionHeading` (ornament rule + two-tone Fraunces heading) | About, Story, Schedule, Hotels, FAQ, Dress code |
| `ElaroButton` (olive block button with hover text slide-up) | Nav, About, Venue, RSVP |
| `RevealOnScroll` (fade-up on viewport entry) | every section |
| `icons.tsx` (hairline rule SVG, accordion plus/minus) | Hero, Footer, FAQ |
