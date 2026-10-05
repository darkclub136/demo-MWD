# VenueSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/VenueSection.tsx`
- **Interaction model:** static, with a `position: sticky` right-hand column
- **Server component.**

## DOM Structure
```
<section id="venue">  relative, bg #0F0F0F, flex row, justify-center, items-start
  <div> Container — w full, padding 0 40px 0 0, flex row, justify-start, items-start, gap 60
    <div> photo column — 693 × 766, overflow-clip
      <Image venue fill cover />
    <div> Right content — 580 wide, sticky top-0, padding 120px 0, flex column, items-start, gap 60
      <div> Top text wrapper — flex column, items-start, gap 20
        <p> eyebrow
        <h3> heading (two-tone)
        <p> body
      <div> venue place Details — grid, 2 cols, gap 40, w 470
        4 × { label, value }
      <ElaroButton label="Find on the Map" href="#" />
```

## Computed Styles (exact)

### Section
- backgroundColor: `rgb(15, 15, 15)`
- height: `766px`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `flex-start`

### Container
- padding: `0px 40px 0px 0px` — note: **no left padding**, the photo is flush to the left edge
- display: `flex`, flexDirection: `row`, justifyContent: `flex-start`, alignItems: `flex-start`, gap: `60px`

### Photo column
- width: `693px`, height: `766px`, overflow: `clip`
- `<img>`: `objectFit: cover`, source `ASSETS.venue`

### Right content
- width: `580px`
- `position: sticky`, `top: 0`
- padding: `120px 0px`
- display: `flex`, flexDirection: `column`, justifyContent: `flex-start`, alignItems: `flex-start`, gap: `60px`

### Top text wrapper
- width: `580px`, height: `202px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `flex-start`, gap: `20px`

- Eyebrow `<p>`: `14px / 18px`, weight 400, **Inter**, color `rgba(255, 255, 255, 0.7)`
- Heading `<h3>`: width `490px`, height `104px` (two lines),
  `48px / 52px`, letterSpacing `-0.96px`, weight 400, **Fraunces Variable**.
  **Two-tone:** `We’ll see you at` in `rgb(255, 255, 255)`, then
  `Velvet Grove Estate` in `rgb(201, 169, 106)`.
- Body `<p>`: width `450px`, height `40px`, `16px / 20px`, weight 400, **Inter**,
  color `rgba(255, 255, 255, 0.7)`

### Details grid
- width: `470px`, height: `154px`
- `display: grid`, `grid-template-columns: repeat(2, 140px)`, `gap: 40px`
  (columns land at x 753 and x 1008 — a 115px column gap; `gap: 40px` with the
  grid stretched to 470px produces the same result, so set
  `grid-template-columns: 1fr 1fr` and `gap: 40px 115px`)
- Each cell: width `140px`, height `57px`, display `flex`, flexDirection `column`,
  justifyContent `center`, `gap: 15px`
  - Label `<p>`: `14px / 18px`, weight 400, **Inter**, `rgba(255, 255, 255, 0.4)`
  - Value `<p>`: `18px / 24px`, weight 400, **Fraunces Variable**, `rgb(255, 255, 255)`

### Button
- `<ElaroButton label="Find on the Map" href="#" />`, rendered `200 × 50`.
  Wrap it so it occupies exactly `200px` width.

## States & Behaviors
- **Sticky column:** the right content is `position: sticky; top: 0`, so it holds while
  the tall photo scrolls past. Nothing else moves.
- **Entrance:** wrap the Top text wrapper, the details grid and the button in `<Reveal>`
  with delays 0 / 100 / 200.
- **Hover:** only the button's label slide (handled by `<ElaroButton>`).
- There is a second photo (`ASSETS.venueAlt`) in the source markup, stacked below the
  first in a 40px-gap column. It is **not visible** at any scroll position in the
  settled layout — render only `ASSETS.venue`.

## Assets
- `ASSETS.venue` → `.../images/venue.jpg`, rendered `693 × 766` cover

## Text Content (verbatim)
- Eyebrow: `The Venue place`
- Heading: `We’ll see you at ` + gold `Velvet Grove Estate`
- Body: `We look forward to welcoming you at Velvet Grove Estate for a memorable experience.`
- Details, in grid order (row-major):
  | Label | Value |
  |---|---|
  | `Location:` | `Bellagio, Como` |
  | `Built:` | `1830` |
  | `Region:` | `Lombardy` |
  | `Capacity:` | `150 Guests` |
- Button: `Find on the Map`

## Responsive Behavior
- **Desktop (≥1200px):** as above — photo left (flush, 693 wide), sticky copy right.
- **Tablet (768px) and Mobile (390px):** the Container becomes
  `flex-direction: column` — the photo goes full-bleed on top, the copy below it.
  The copy column loses its `sticky` and its `120px 0` padding becomes `60px 20px`.
  The details grid stays 2 columns. The heading drops to `30px / 34px`, tracking `-0.6px`.
  Section height ≈ 872px at 390px, ≈ 576px at 768px.
- **Breakpoint:** 1200px (Tailwind `xl`).
