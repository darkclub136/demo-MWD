# AboutSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/AboutSection.tsx`
- **Interaction model:** static copy + a time-driven photo marquee with an arc mask
- **Server component.**

## DOM Structure
```
<section>  relative, flex column, justify-center, items-center, gap 80
  <div> Container — padding 180px 0, flex column, items-center, gap 80
    <div> Top content — flex column, items-center, gap 40
      <div> Shape & text — flex column, items-center, gap 20
        <Image ornamentRule 270 × 30 />
        <div> Text — max-w 770, flex row, justify-center
          <h4> intro copy </h4>
      <ElaroButton label="RSVP Now" href="#rsvp" />
    <div> Images wrap — relative, w full, h 388.5, overflow-clip, flex row, justify-center, items-center
      <div> arc mask TOP    — absolute, top -1, h 59.375, w full, z-2, rotate-180
        <Image marqueeFade />
      <div> arc mask BOTTOM — absolute, bottom -1, h 59.375, w full, z-2
        <Image marqueeFade />
      <div> Images — relative, w full, overflow-clip, flex row, items-center
        <div class="elaro-ticker-track">  (5 photos rendered TWICE)
```

## Computed Styles (exact)

### Section / Container
- Container padding: `180px 0px`, display `flex`, flexDirection `column`,
  justifyContent `center`, alignItems `center`, gap `80px`
- Section total height at desktop: `1083px`

### Top content
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, gap: `40px`, height `254px`

### Shape & text
- display: `flex`, flexDirection: `column`, alignItems: `center`, gap: `20px`, height `164px`
- Ornament: `270 × 30`, `ASSETS.ornamentRule`

### Intro `<h4>`
- maxWidth: `770px`, height `114px`, textAlign `center`
- fontSize: `30px`, lineHeight: `38px`, letterSpacing: `-0.6px`, fontWeight: `400`
- fontFamily: **Fraunces**, color: `rgb(0, 0, 0)`

### Images wrap
- width: `100%`, height: `388.5px`, overflow: `clip`, position: `relative`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`

### Arc masks (this is what makes the strip look curved — it is NOT a CSS shape)
- Two copies of `ASSETS.marqueeFade` (`1425 × 59.375`), both `position: absolute`,
  `width: 100%`, `height: 59.375px`, `zIndex: 2`, `objectFit: cover`
- Top copy: `top: -1px`, `transform: matrix(-1, 0, 0, -1, 0, 0)` → `rotate-180`
- Bottom copy: `bottom: -1px`, no transform

### Photo track
- display: `flex`, flexDirection: `row`, alignItems: `center`, **`gap: 15px`**
- Each card: `273 × 388.5`, `objectFit: cover`, no border-radius
- Use the shared `.elaro-ticker-track` class with
  `style={{ ["--elaro-ticker-duration" as string]: "36s" }}`
  (original speed ≈ 40 px/s over a ≈1440px set).

## States & Behaviors
- **Marquee:** continuous leftward loop, no pause on hover, no scroll link.
- **Entrance:** wrap `Top content` in `<Reveal>`; the marquee itself does not fade in.
- `prefers-reduced-motion` is already handled by `globals.css`.

## Assets
- `ASSETS.ornamentRule` — 270 × 30
- `ASSETS.marqueeFade` — 1425 × 59.375, used twice
- `ASSETS.marquee` — five photos, each rendered 273 × 388.5, in array order

## Text Content (verbatim)
> We’re getting married! Join us this summer—explore the schedule, venue, dress code, and RSVP details to celebrate our special day together.

Button label: `RSVP Now` → `#rsvp`

(Note the typographic apostrophe in “We’re”.)

## Responsive Behavior
- **Desktop (1440px):** as above — container padding `180px 0`, intro `30px / 38px`,
  cards `273 × 388.5`.
- **Tablet (768px):** container padding `130px 20px`; intro becomes `18px / 24px`,
  letter-spacing `-0.36px`; cards scale down to `131 × 186` (keep the 1.4:1 ratio and
  scale the gap to 15px still).
- **Mobile (390px):** same type as tablet; cards ≈ `110 × 157`; section height ≈ 520px.
- **Breakpoint:** 1200px for the type; 810px for the card size.
- Implement card sizes as `w-[131px] h-[186px] xl:w-[273px] xl:h-[388.5px]` and
  the wrap height as `h-[186px] xl:h-[388.5px]`; scale the arc masks proportionally
  (`h-[28px] xl:h-[59.375px]`).
