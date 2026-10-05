# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/HeroSection.tsx`
- **Interaction model:** static (entrance fade-up only)
- **Server component** — no client JS needed except the shared `<Reveal>`.

## DOM Structure
```
<section id="banner-section">  relative, h 900 (100vh), flex row, justify-center, items-end, overflow-clip
  <div> absolute inset-0
    <Image hero fill objectFit=cover priority />
  <div> absolute, top 540, h 360, w full, background linear-gradient
  <div> Container — relative, z-2, max-w-[1440px], w-full, h 370,
        padding 100px 40px 40px, flex column, justify-center, items-start, gap 10
    <div> Top text — w full, flex row, justify-start, items-center
      <p> "The wedding of"
      <HairlineIcon 40 × 1 />
    <div> Heading — w full, flex row, justify-between, items-center, h 170
      <h1> Khởi </h1>  <h1> & </h1>  <h1> Rose </h1>
    <div> Bottom text — w full, flex row, justify-end, items-center, gap 10
      <HairlineIcon 40 × 1 />
      <p> "Saturday, 5 Aug, 2026"
```

## Computed Styles (exact)

### Section
- width: `1425px` (100%), height: `900px` → use `h-screen`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `flex-end`
- overflow: `clip`, position: `relative`

### Background image
- Wrapper: `position: absolute`, inset 0, `1425 × 900`
- `<img>`: `width: 100%`, `height: 100%`, `objectFit: cover`
- Source: `ASSETS.hero`

### Gradient scrim
- `position: absolute; top: 540px; height: 360px; width: 100%`
- `backgroundImage: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)`
- Sits above the photo, below the Container.
- At other viewport heights, express as `absolute inset-x-0 bottom-0 h-[40%]`.

### Container
- padding: `100px 40px 40px`
- maxWidth: `1440px`, width: `100%`, height: `370px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `flex-start`, gap: `10px`
- zIndex: `2`, position: `relative`, overflow: `clip`

### Top text row
- width: `100%` (1345px), height: `20px`
- display: `flex`, flexDirection: `row`, justifyContent: `flex-start`, alignItems: `center`
- `<p>`: fontSize `16px`, lineHeight `20px`, fontWeight `400`, fontFamily **Inter**,
  color `rgba(255, 255, 255, 0.7)`, width `130px`
- Hairline: `40 × 1`, sits immediately to the right of the text, color `rgba(255,255,255,0.7)`

### Heading row
- width: `100%` (1345px), height: `170px`
- display: `flex`, flexDirection: `row`, justifyContent: `space-between`, alignItems: `center`
- Three separate `<h1>` elements, each in its own flex-column wrapper:
  - `Khởi` — wrapper width `420px`
  - `&` — wrapper width `180px`
  - `Rose` — wrapper width `400px`
- Every `<h1>`: fontSize `190px`, lineHeight `170px`, letterSpacing `-7.6px`,
  fontWeight `400`, fontFamily **Fraunces Variable**, color `rgb(255, 255, 255)`

### Bottom text row
- width: `100%` (1345px), height: `20px`
- display: `flex`, flexDirection: `row`, justifyContent: `flex-end`, alignItems: `center`, gap: `10px`
- Hairline `40 × 1` first, then the date
- `<p>`: fontSize `16px`, lineHeight `20px`, fontWeight `400`, fontFamily **Inter**,
  color `rgba(255, 255, 255, 0.7)`, textAlign `right`, width `180px`

## States & Behaviors
- **Entrance only.** Wrap the Top text, Heading and Bottom text in `<Reveal>` with
  delays `0`, `100`, `200` ms.
- No hover, click or scroll behaviour inside this section. (The nav's variant swap is
  triggered by this section's height but lives in `SiteNav`.)

## Assets
- `ASSETS.hero` → `.../images/hero.jpg` (natural 800 × 520, rendered 1425 × 900 cover).
  Use `priority` and `sizes="100vw"`.
- `HairlineIcon` from `../shared/icons`

## Text Content (verbatim)
- `The wedding of`
- `Khởi`  `&`  `Rose`
- `Saturday, 5 Aug, 2026`

## Responsive Behavior
- **Desktop (1440px):** as above — three names spread across the full 1345px row at 190px.
- **Tablet (768px):** section height `720px`; `h1` becomes `44px / 40px`, letter-spacing
  `-0.88px`; the heading row stays `flex-row justify-between` but collapses to `40px` tall;
  container padding `100px 20px 40px`.
- **Mobile (390px):** section height `675px` (80vh); same `44px / 40px` type; the three
  names still sit on one row, spread edge to edge.
- **Breakpoint:** 1200px for the type step-down; the section height steps at 810px.
- Implement as: `h-[675px] md:h-[720px] xl:h-screen`, heading
  `text-[44px] leading-10 tracking-[-0.88px] xl:text-[190px] xl:leading-[170px] xl:tracking-[-7.6px]`.
