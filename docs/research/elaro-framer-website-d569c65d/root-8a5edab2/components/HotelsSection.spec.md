# HotelsSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/HotelsSection.tsx`
- **Interaction model:** **SCROLL-DRIVEN.** A sticky block whose active hotel row and
  photo change as you scroll past three invisible sentinels.
- **Client component** (`"use client"`) — needs an `IntersectionObserver`.

> Not a tabbed/click interface. The rows are not clickable on the original; the
> highlight moves only because you scroll.

## DOM Structure
```
<section id="hotel">  relative, h 2700, flex row, justify-center
  <div> Container — w full, padding 0 40px 180px, flex column, items-center, gap 80
    <div> Main-content — w 1345, h 940, STICKY top-0, flex column, items-center, gap 80
      <SectionHeading lead="Where to sleep" accent="after party" />
      <div> image & text content — w full, h 640, flex row, justify-center, items-start, gap 60
        <div> Images — 530 × 640, relative   (three stacked photos that cross-fade)
        <div> Right text content — 755 × 640, flex column, justify-center, gap 80
          <div> hotel-name-list — flex column, gap 30
            <HotelRow /> × 3
          <div> Contact number — flex column, gap 20
            <a> +40 723 456 789
            <p> helper copy
    <div> sentinel 1 — 530 × 640, absolute
    <div> sentinel 2 — 530 × 640, absolute
    <div> sentinel 3 — 530 × 640, absolute
```

## Computed Styles (exact)

### Section / Container
- Section height: `2700px`
- Container: padding `0px 40px 180px`, display `flex`, flexDirection `column`,
  justifyContent `flex-start`, alignItems `center`, gap `80px`

### Main-content (the sticky block)
- width: `1345px`, height: `940px`
- **`position: sticky; top: 0`**
- display: `flex`, flexDirection: `column`, justifyContent: `flex-start`,
  alignItems: `center`, gap: `80px`

### Heading block
- `<SectionHeading lead="Where to sleep" accent="after party" headingClassName="max-w-[700px]" />`
- Block height `220px` — the heading wraps to **two lines** (700px wide, 170px tall).

### image & text content
- width: `1345px`, height: `640px`
- display: `flex`, flexDirection: `row`, justifyContent: `center`,
  alignItems: `flex-start`, gap: `60px`

### Images
- width: `530px`, height: `640px`, `position: relative`, `overflow: hidden`
- Three `<Image fill objectFit="cover">` stacked absolutely; only the active one has
  `opacity: 1`, the others `opacity: 0`.
- Transition: `opacity 0.4s ease`

### Right text content
- width: `755px`, height: `640px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, **`gap: 80px`**

### hotel-name-list
- width: `755px`, height: `420px`
- display: `flex`, flexDirection: `column`, **`gap: 30px`**
- Each row is 70px tall (title 30 + 20 gap… measured spacing between row tops is 150px:
  30 title + 40 description + 80 (30 gap + the row's own internal 20px gap)).
  Build each row as: `flex flex-col gap-5`, title then description, then a `30px` gap
  to the next row, and a 1px separator at `rgba(0, 0, 0, 0.1)` between rows.

### Hotel row — ACTIVE
- Title `<h5>`: `26px / 30px`, letterSpacing `-0.52px`, weight 400,
  **Fraunces Variable**, color `rgb(0, 0, 0)`
- Description `<p>`: width `450px`, `16px / 20px`, weight 400, **Inter**,
  color `rgba(0, 0, 0, 0.7)`

### Hotel row — INACTIVE
- Title: same metrics, color `rgba(0, 0, 0, 0.2)`
- Description: same metrics, color `rgba(0, 0, 0, 0.2)`
- Transition: `color 0.3s ease`

### Contact number
- display: `flex`, flexDirection: `column`, `gap: 20px`
- Phone `<a>`: `20px / 24px`, letterSpacing `-0.2px`, weight **500**, **Inter**,
  color `rgb(201, 169, 106)`, `href="tel:+40723456789"`
- Helper `<p>`: width `490px`, `16px / 20px`, weight 400, **Inter**,
  color `rgba(0, 0, 0, 0.7)`

### Sentinels
- Three `530 × 640` boxes, `position: absolute`, `visibility: hidden` /
  `pointer-events: none`, placed `640px` apart inside the section
  (measured at page y 8624, 9264, 9903 within a section starting at 8197 — i.e. at
  offsets `427`, `1067`, `1706` from the section top).
  In practice: give the section `position: relative` and place them at
  `top: 427px`, `1067px`, `1706px`, `left: 97px`.

## States & Behaviors

### Active-hotel switching (scroll-driven)
- **Trigger:** `IntersectionObserver` on the three sentinels,
  `rootMargin: "-50% 0px -50% 0px"`, `threshold: 0`. Whichever sentinel crosses the
  viewport's vertical centre sets the active index. Default active index `0`.
- **Effect:** the matching row goes from `rgba(0,0,0,0.2)` to
  `#000` / `rgba(0,0,0,0.7)`, and the matching photo cross-fades in.
- **Transitions:** `color 0.3s ease` (rows), `opacity 0.4s ease` (photo).

### Hover / click
- **None.** The rows are plain text on the original, not buttons.

### Entrance
- Wrap the heading in `<Reveal>`.

## Assets
| Index | Image | Natural | Rendered |
|---|---|---|---|
| 0 | `ASSETS.hotels[0]` | 759 × 713 | 530 × 640 cover |
| 1 | `ASSETS.hotels[1]` | 759 × 713 | 530 × 640 cover |
| 2 | `ASSETS.hotels[2]` | 759 × 713 | 530 × 640 cover |

## Text Content (verbatim)

Heading: `Where to sleep` + gold `after party`

| # | Name | Description |
|---|---|---|
| 1 | `1. Hotel Laurentius` | `A countryside hotel with spa facilities, located just an ten-minute drive from the venue.` |
| 2 | `2. Hotel Belvedere` | `Cozy and inviting country inn, only a short five-minute stroll away from the event venue.` |
| 3 | `3. Hotel Florence` | `Relaxing rural getaway featuring a spa, conveniently only six minutes by car from the venue.` |

- Phone: `+40 723 456 789`
- Helper: `If you’d like assistance choosing the perfect place to stay, don’t hesitate to contact us—we’re happy to help.`

(Keep `just an ten-minute` exactly as written — it is the original's typo.)

## Responsive Behavior
- **Desktop (≥1200px):** the sticky scroll-driven layout above; section 2700px tall.
- **Tablet (768px) and Mobile (390px):** the sticky block and the scroll switching are
  **dropped**. `image & text content` becomes `flex-direction: column`: one photo
  (`ASSETS.hotels[0]`, full column width, ≈350 × 329) on top, then all three hotel rows
  rendered at **full opacity** (no dimming), then the contact block.
  Section height collapses to ≈1343px; container padding `0 20px 130px`.
  Heading becomes `50px / 55px`, tracking `-1px`.
- **Breakpoint:** 1200px (Tailwind `xl`). Below it, do not mount the
  `IntersectionObserver` or render the sentinels.
