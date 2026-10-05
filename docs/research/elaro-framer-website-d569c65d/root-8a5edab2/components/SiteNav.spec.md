# SiteNav Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/SiteNav.tsx`
- **Interaction model:** scroll-driven (variant swap), plus a mobile menu button
- **Client component** (`"use client"`) — it needs a scroll listener.

## DOM Structure
```
<header>  fixed, inset-x-0, top-0, z-[3]
  <nav>   full width, h 100 → 90, bg transparent → #0F0F0F
    <div> container: max-w-[1440px], mx-auto, flex row, justify-between, items-center,
          padding 25px 40px → 20px 40px
      <div> Logo & Menu icon — w 200, flex row, justify-start, items-center, gap 10
        <Link href="/"> <Image logo 94 × 40 />
      <div> Nav menu — flex row, items-center, gap 40   (hidden below 1200px)
        <Link> × 4
      <div> Button — w 200, flex row, justify-end, items-center
        <ElaroButton label="RSVP" href="#rsvp" />
      <button> hamburger — only below 1200px
```

## Computed Styles (exact)

### nav — state A, "Desktop" (at page top)
- height: `100px`
- backgroundColor: `transparent`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`

### nav — state B, "Desktop BG nav" (scrolled past the hero)
- height: `90px`
- backgroundColor: `rgb(15, 15, 15)`

### Container
- padding: `25px 40px` (state A) → `20px 40px` (state B)
- maxWidth: `1440px`, width: `100%`
- display: `flex`, justifyContent: `space-between`, alignItems: `center`

### Logo & Menu icon
- width: `200px`, maxWidth: `200px`
- display: `flex`, flexDirection: `row`, justifyContent: `flex-start`, alignItems: `center`, gap: `10px`
- Logo image: `94 × 40`, objectFit: `cover`, source `ASSETS.logo`

### Nav menu
- width: `349.92px` (intrinsic), display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`, gap: `40px`
- Each link `<p>`: fontSize `16px`, lineHeight `20px`, fontWeight `400`,
  fontFamily **Fraunces**, color `rgb(255, 255, 255)`

### Button wrapper
- width: `200px`, maxWidth: `200px`, display: `flex`, justifyContent: `flex-end`, alignItems: `center`
- The button itself is `<ElaroButton>` — do not restyle it.

### Hamburger (mobile only)
- Outer circle: `50 × 50`, backgroundColor: `rgb(255, 255, 255)`, borderRadius: `25px`,
  display: `flex`, justifyContent: `center`, alignItems: `center`
- Icon: `28 × 15`, use `<MenuIcon />` from `../shared/icons`, color `#0F0F0F`

## States & Behaviors

### Scroll-triggered background
- **Trigger:** `window.scrollY >= window.innerHeight` (the hero is exactly `100vh`).
  Measured: still state A at scrollY 542, state B at scrollY 900. It reverts below the threshold.
- **State A:** `height: 100px; background: transparent; padding: 25px 40px`
- **State B:** `height: 90px; background: #0F0F0F; padding: 20px 40px`
- **Transition:** `all 0.3s ease` on height, background-color and padding.
- **Implementation:** a `scroll` listener on `window` (passive) that toggles a boolean.
  Lenis drives the scroll, but `window.scrollY` still tracks correctly.

### Hover states
- Nav links: **no measurable change** on the original. Do not invent one.
- RSVP button: handled inside `<ElaroButton>` (label pair slides up 24px).

## Links (exact hrefs and labels)
| Label | href |
|---|---|
| (logo) | `/` |
| Venue | `#venue` |
| Schedule | `#schedule` |
| FAQ | `#faq` |
| Dress code | `#dress-code` |
| RSVP (button) | `#rsvp` |

## Assets
- `ASSETS.logo` → `/sites/elaro-framer-website-d569c65d/root-8a5edab2/images/logo-er.png` (natural 282 × 120, rendered 94 × 40)
- `MenuIcon` from `../shared/icons`

## Text Content (verbatim)
`Venue` · `Schedule` · `FAQ` · `Dress code` · `RSVP`

## Responsive Behavior
- **Desktop (≥1200px):** logo left, 4-link row centred, RSVP button right. No hamburger.
- **Below 1200px (tablet + mobile):** the link row and the RSVP button are **removed**;
  only the logo (left) and the 50 × 50 white hamburger circle (right) remain.
  Container padding becomes `25px 20px`, nav height `100px`.
  The hamburger does not need to open a panel — the original's open state is out of scope;
  render it as a non-functional button with `aria-label="Open menu"`.
- **Breakpoint:** 1200px (Tailwind `xl`).
