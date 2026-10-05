# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/SiteFooter.tsx`
- **Interaction model:** static
- **Server component.**

## DOM Structure
```
<footer>  bg #F8F5F0, relative, flex row, justify-center, items-center
  <div> Container — w full, padding 0 40px 30px, flex column, items-center, gap 70
    <div> Top content — w full, flex column, justify-center, items-center, gap 70
      <div> Heading — w 1200, flex row, justify-between, items-center, h 170
        <p> Khởi </p> <p> & </p> <p> Rose </p>
      <div> Date & place — w 900, flex row, justify-center, items-center, gap 30
        <HairlineIcon w 101 />  <p> Sat 5 Aug, 2026 </p>
        <Image heart 28 × 24 />
        <p> Lake Como, Italy </p>  <HairlineIcon w 102 />
    <div> bottom content — w full, flex column, justify-center, items-center, gap 30
      <div> Image — w full, h 607, flex row, justify-center, items-center, gap 20
        <div> photo 1 — 435 × 607, z-1, translateX(380px)
        <div> photo 2 — 435 × 607, z-2, no transform
        <div> photo 3 — 435 × 607, z-1, translateX(-380px)
      <p> 2026 © POWERED BY Oval Studio.
```

## Computed Styles (exact)

### Footer / Container
- `background: rgb(248, 245, 240)`
- Footer height: `1021px`
- Container: padding `0px 40px 30px`, display `flex`, flexDirection `column`,
  justifyContent `flex-start`, alignItems `center`, **`gap: 70px`**

### Top content
- width: `1345px`, height: `264px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, `gap: 70px`

### Heading
- width: `1200px`, height: `170px`
- display: `flex`, flexDirection: `row`, **`justifyContent: space-between`**, alignItems: `center`
- Three `<p>` elements: `190px / 170px`, letterSpacing `-7.6px`, weight 400,
  **Fraunces Variable**
  - `Khởi` — `rgb(0, 0, 0)`
  - `&` — **`rgb(201, 169, 106)`** (gold)
  - `Rose` — `rgb(0, 0, 0)`

### Date & place
- width: `900px`, height: `24px`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`, **`gap: 30px`**
- Order, left to right: hairline (`101 × 1`), `Sat 5 Aug, 2026`, heart (`28 × 24`),
  `Lake Como, Italy`, hairline (`102 × 1`)
- Both `<p>`: `18px / 24px`, weight 400, **Fraunces Variable**, color `rgb(0, 0, 0)`
- Hairlines: `currentColor` at `rgba(0, 0, 0, 0.2)`

### bottom content
- width: `1345px`, height: `657px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, **`gap: 30px`**

### Image row — a STATIC fanned stack
- Row: width `1345px`, height `607px`, `display: flex`, `flex-direction: row`,
  `justify-content: center`, `align-items: center`, **`gap: 20px`**
- Three photo blocks, each `435 × 607`, `objectFit: cover`
- Natural flex positions (1345 wide, gap 20): x = `40`, `495`, `950`
- **Applied transforms, which do not change at any scroll position:**
  - photo 1: `transform: translateX(380px)`, `z-index: 1`
  - photo 2: `transform: none`, `z-index: 2`
  - photo 3: `transform: translateX(-380px)`, `z-index: 1`
- Result: visible left edges at x `420`, `495`, `570` — the three photos overlap by
  360px with the centre one on top.
- This is **not** an animation. Verified identical from scroll 13400 to the page bottom.

### Copyright
- `<p>`: width `1345px`, height `20px`, `16px / 20px`, weight 400, **Inter**,
  color `rgba(0, 0, 0, 0.7)`, `text-align: center`

## States & Behaviors
- **None.** No hover, click, scroll or time-driven behaviour anywhere in the footer.
- **Entrance:** wrap `Top content` and `bottom content` in `<Reveal>` with delays 0 / 100.

## Assets
- `ASSETS.ornamentHeart` — 28 × 24
- `ASSETS.footer[0..2]` — each `435 × 607` cover
- `HairlineIcon` from `../shared/icons`

## Text Content (verbatim)
- `Khởi`  `&`  `Rose`
- `Sat 5 Aug, 2026`
- `Lake Como, Italy`
- `2026 © POWERED BY Oval Studio.`

## Responsive Behavior
- **Desktop (≥1200px):** as above.
- **Tablet (768px):** footer height ≈ 594px; the couple name scales down; the photo
  row keeps its fanned arrangement at reduced size.
- **Mobile (390px):** the couple name becomes `64px / 56px`, letterSpacing `-1.28px`;
  the three photos become ≈ `310 × 432` each, still fanned (scale the ±380px offsets
  proportionally to roughly ±270px); container padding stays `0 40px 30px`;
  footer height ≈ 856px.
- **Breakpoint:** 1200px (Tailwind `xl`), with a further type step at 810px.
- Implement the offsets as `translate-x-[270px] xl:translate-x-[380px]` and the mirror.
