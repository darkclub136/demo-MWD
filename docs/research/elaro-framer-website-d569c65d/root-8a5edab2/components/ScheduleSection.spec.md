# ScheduleSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/ScheduleSection.tsx`
- **Interaction model:** **SCROLL-DRIVEN.** Each card re-lays-out when it enters the viewport.
- **Client component** (`"use client"`) — needs an `IntersectionObserver`.

> **Read this first.** This is NOT a hover interaction and NOT a click interaction.
> Both were tested on the live site and neither does anything. The cards open purely
> because they scroll into view, and they stay open afterwards. Building this as a
> hover or click effect is a rewrite, not a tweak.

## DOM Structure
```
<section id="schedule">  relative, flex row, justify-center, items-center
  <div> Container — padding 180px 40px, flex column, items-center, gap 80
    <SectionHeading lead="Our" accent="wedding day" />
    <div> Day planning wrapper — w full, flex column, items-center, gap 40
      <ScheduleCard /> × 4
```

### ScheduleCard (both states)
```
<article>  w 1345, flex row, justify-center, items-center, gap 60
  <div> copy block
    <div> Time pill
      <p> 15:00
    <div> Title & text — flex column, gap 20
      <h5> title
      <p>  description
  <div> photo block — overflow-clip
    <Image fill cover />
```

## Computed Styles (exact)

### Container
- padding: `180px 40px`, display `flex`, flexDirection `column`,
  justifyContent `center`, alignItems `center`, gap `80px`

### Heading
- `<SectionHeading lead="Our" accent="wedding day" />` — `Our` black, `wedding day` `#C9A96A`

### Day planning wrapper
- width: `1345px`, display `flex`, flexDirection `column`,
  justifyContent `center`, alignItems `center`, **`gap: 40px`**

### Card — CLOSED state (variant "Default")
- Card: `1345 × 734`, `display: flex`, `flex-direction: row`,
  `justify-content: center`, `align-items: center`, `gap: 60px`
- Photo block: `1345 × 734` (fills the card), `overflow: clip`, `objectFit: cover`
- Copy block: **`position: absolute`**, `left: 50%`, `top: 50%`,
  `transform: translate(-50%, -50%)`, `width: 336px`, `height: 236px`, `z-index: 1`,
  `display: flex`, `flex-direction: column`, `justify-content: center`,
  **`align-items: center`**, `gap: 100px`
- `Title & text` inside: `align-items: center`, text centred

### Card — OPEN state (variant "2")
- Card: `1345 × 481`
- Copy block: **`position: static`**, `width: 404px`, `height: 236px`,
  `display: flex`, `flex-direction: column`, `justify-content: center`,
  **`align-items: flex-start`**, `gap: 100px` — it becomes the left flex child
- `Title & text` inside: `align-items: flex-start`, text left-aligned;
  the description `<p>` is `380px` wide
- Photo block: `882 × 481`, `overflow: clip`, `objectFit: cover` — the right flex child
- Card gap stays `60px` (404 + 60 + 882 = 1346 ≈ 1345)

### Copy block internals (identical in both states)
- Time pill: `height: 26px`, `padding: 3px 8px`, `background: rgb(201, 169, 106)`,
  `border-radius: 0`, `display: flex`, `align-items: center`, `overflow: clip`
  - `<p>`: `16px / 20px`, weight **500**, **Inter**, color `rgb(255, 255, 255)`
- `Title & text`: `display: flex`, `flex-direction: column`, `gap: 20px`
  - Title `<h5>`: `26px / 30px`, letterSpacing `-0.52px`, weight 400,
    **Fraunces Variable**, color `rgb(0, 0, 0)`, height `30px`
  - Description `<p>`: `16px / 20px`, weight 400, **Inter**,
    color `rgba(0, 0, 0, 0.7)`, height `60px`

## States & Behaviors

### Scroll-driven open (THE key behaviour)
- **Trigger:** `IntersectionObserver` on each card with
  `rootMargin: "0px 0px -40% 0px"`, `threshold: 0`. Once it fires, set `open = true`
  and **disconnect** — the card never closes again.
- Measured evidence at `scrollY = 5330` (viewport 5330–6230, 900 tall):
  cards whose top was at viewport y `153` or above were **open**;
  a card whose top was at viewport y `674` was still **closed**.
- **State A (closed):** card `h 734`, photo `1345 × 734`, copy absolutely centred, 336 wide, centre-aligned
- **State B (open):** card `h 481`, photo `882 × 481`, copy static left column, 404 wide, left-aligned
- **Transition:** `all 0.5s cubic-bezier(0.44, 0, 0.56, 1)` on the card height, the copy
  block's width and the photo's width. Because the copy block switches between
  `absolute` and `static`, animate it by keeping it `absolute` in **both** states and
  animating `left` / `width` / `text-align` instead — that keeps the transition smooth
  and matches the measured geometry:
  - closed: `left: 50%; transform: translate(-50%,-50%); width: 336px; align-items: center`
  - open: `left: 0; transform: translateY(-50%); width: 404px; align-items: flex-start`
  …with the photo block animating `width: 100% → 882px` and `margin-left: 0 → auto`.
- Text opacity never changes — it is `1` in both states. Do not fade it.

### Hover / click
- **None.** Verified on the live site.

### Entrance
- The heading uses `<Reveal>`. The cards do **not** need a separate reveal — their
  open animation is the entrance.

## Assets
| Card | Image | Natural |
|---|---|---|
| 1 | `ASSETS.schedule.ceremony` | 759 × 414 |
| 2 | `ASSETS.schedule.drinks` | 759 × 414 |
| 3 | `ASSETS.schedule.dinner` | 759 × 414 |
| 4 | `ASSETS.schedule.party` | 759 × 414 |

All rendered `objectFit: cover`.

## Text Content (verbatim)

| Time | Title | Description |
|---|---|---|
| `15:00` | `Wedding Ceremony` | `Join us in the garden as we exchange vows, surrounded by love, nature, and those closest to us.` |
| `16:00` | `Drinks & mingle` | `Celebrate with drinks, laughter, and connection in a welcoming atmosphere filled with joy and elegance.` |
| `18:00` | `Dinner Reception` | `Delight in fine dining, meaningful conversations, and joyful toasts as we celebrate love and lasting memories.` |
| `20:00` | `Party & dancing` | `Let the night unfold with music, dancing, and joy as we celebrate together in laughter, energy, and love.` |

Heading: `Our` + gold `wedding day`

## Responsive Behavior
- **Desktop (≥1200px):** the two-state scroll behaviour above.
- **Tablet (768px) and Mobile (390px):** the scroll open/close is **dropped**. Cards
  render permanently in a stacked layout: photo on top (full column width, ~16:9),
  copy block beneath it, left-aligned, `gap: 20px`. Card copy width `105px`+ → use
  full column width. Section padding becomes `130px 20px`; wrapper gap stays `40px`.
  Section height ≈ 2288px at 390px.
- **Breakpoint:** 1200px (Tailwind `xl`). Below it, skip the `IntersectionObserver`
  entirely and render the stacked layout.
