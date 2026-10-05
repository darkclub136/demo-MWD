# DetailsTicker Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/DetailsTicker.tsx`
- **Interaction model:** time-driven — an infinite horizontal marquee moving left
- **Server component** — the animation is pure CSS.

## DOM Structure
```
<section>  relative, w full, flex row, justify-center, items-center
  <div> Container — w full, padding 50px 0, flex row, justify-center, items-center
    <div> Text content — w full, overflow-hidden, flex row, items-center
      <div class="elaro-ticker-track">    (items rendered TWICE for a seamless loop)
        <span> phrase </span> <Image heart /> <span> phrase </span> <Image heart /> …
```

## Computed Styles (exact)

### Section
- width: `100%`, height: `138px`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`

### Container
- padding: `50px 0px` → 50 + 38 + 50 = 138 total height
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`

### Track
- display: `flex`, flexDirection: `row`, alignItems: `center`, `gap: 40px`
- The live site drives this with `transform: translateX(...)` from a rAF loop.
  Reproduce it with the shared `.elaro-ticker-track` class already in `globals.css`
  (it animates `translate3d(0,0,0) → translate3d(-50%,0,0)`, linear, infinite).
- Set `style={{ ["--elaro-ticker-duration" as string]: "32s" }}` on the track.
  (Speed on the original is ~70 px/s; one full pass of the duplicated 4-phrase set
  at this gap is ≈ 2200px, so ≈ 32s.)

### Phrase
- `<p>`: fontSize `34px`, lineHeight `38px`, fontWeight `400`,
  fontFamily **Fraunces Variable**, color `rgb(0, 0, 0)`, `white-space: nowrap`

### Heart separator
- `28 × 24`, source `ASSETS.ornamentHeart`, `objectFit: cover`
- One heart after every phrase (so the sequence is phrase, heart, phrase, heart, …)

## States & Behaviors
- **Trigger:** none — it runs continuously from mount.
- **Direction:** leftward (negative X).
- **Hover:** no pause on the original. Do not add one.
- Respect `prefers-reduced-motion` — `globals.css` already disables the animation there.

## Assets
- `ASSETS.ornamentHeart` → `.../images/ornament-leaf.png` (natural 99 × 84, rendered 28 × 24)

## Text Content (verbatim, in this order, repeated)
1. `Khởi & Rose`
2. `Lake Como, Italy`
3. `August the fifth`
4. `Two thousand twenty-six`

Render the four-phrase set **twice** inside the track so the `-50%` loop is seamless.
Mark the second copy `aria-hidden="true"`.

## Responsive Behavior
- **Desktop / tablet / mobile:** identical — height stays `138px`, padding `50px 0`,
  type stays `34px / 38px`. The marquee simply shows fewer phrases on a narrow screen.
- **Breakpoint:** none.
