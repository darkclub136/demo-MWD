# RsvpSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/RsvpSection.tsx`
- **Interaction model:** static form
- **Client component** (`"use client"`) — the submit handler calls `preventDefault()`.
  There is no real backend in scope.

## DOM Structure
```
<section id="rsvp">  relative, flex row, justify-center, items-center
  <div> Container — w full, padding 0 40px 180px, flex row, justify-center, items-start, gap 60
    <div> left content — 643 wide, h 622, flex column, justify-between, items-start
      <h2> Can we count on you?
      <div> 470 × 260 photo
    <form> 643 wide, h 622, flex column, items-start, gap 40
      <label> × 3 (text inputs)
      <label>   (textarea)
      <ElaroButton label="Confirm Now" type="submit" />
```

## Computed Styles (exact)

### Section / Container
- Section height: `802px`
- Container: padding `0px 40px 180px`, display `flex`, flexDirection `row`,
  justifyContent `center`, alignItems `flex-start`, **`gap: 60px`**

### left content
- width: `643px`, height: `622px`
- display: `flex`, flexDirection: `column`, **`justifyContent: space-between`**, alignItems: `flex-start`

- Heading `<h2>`: width `550px`, height `170px` (two lines),
  `82px / 85px`, letterSpacing `-1.64px`, weight 400, **Fraunces Variable**.
  **Two-tone:** `Can we` in `rgb(0, 0, 0)`, `count on you?` in `rgb(201, 169, 106)`.
  *This heading has no ornament rule above it — do not use `<SectionHeading>`.*
- Photo: `470 × 260`, `objectFit: cover`, source `ASSETS.rsvp`

### form
- width: `643px`, height: `622px`
- display: `flex`, flexDirection: `column`, justifyContent: `flex-start`,
  alignItems: `flex-start`, **`gap: 40px`**

### Text field `<label>` (×3)
- width: `643px`, height: `88px`
- display: `flex`, flexDirection: `column`, alignItems: `flex-start`, **`gap: 10px`**
- Label `<p>`: height `18px`, `14px / 18px`, weight 400, **Inter**, color `rgba(0, 0, 0, 0.7)`
- Input wrapper: width `643px`, height `60px`, **`padding: 20px`**,
  `background: rgb(237, 234, 223)`, `border-radius: 0`, `display: flex`, `align-items: center`
- `<input>`: `16px / 20px`, weight 400, **Fraunces Variable**, color `rgb(0, 0, 0)`,
  transparent background, no border, no outline ring, width `603px` (fills the padded box)

### Textarea `<label>`
- width: `643px`, height: `148px`
- Same label styling
- Textarea box: width `643px`, **height `120px`**, `background: rgb(237, 234, 223)`,
  `padding: 20px`, `border-radius: 0`, `resize: none`
- `<textarea>`: `16px / 20px`, weight 400, **Fraunces Variable**, color `rgb(0, 0, 0)`

### Submit button
- `<ElaroButton label="Confirm Now" type="submit" />` — rendered `643 × 50`?
  No: measured `50px` tall, label centred at x 1005 inside the 643px column, i.e. the
  button is **full form width (643px)**, height `50px`. Pass
  `className="w-full"` to `<ElaroButton>`.

## States & Behaviors
- **Submit:** `onSubmit={(e) => e.preventDefault()}` — no network call. The original
  posts to Framer's forms endpoint, which is out of scope.
- **Focus:** no visible focus ring on the original. Use `focus:outline-none` on the
  fields but keep a `focus-visible` ring for accessibility is *not* in the original —
  match the original and use `focus:outline-none`.
- **Entrance:** wrap `left content` and `form` in `<Reveal>` with delays 0 / 100.
- No hover states except the button's label slide.

## Assets
- `ASSETS.rsvp` → `.../images/rsvp.jpg` (natural 759 × 420, rendered 470 × 260 cover)

## Text Content (verbatim)

Heading: `Can we ` + gold `count on you?`

| Field label | Placeholder | Type |
|---|---|---|
| `Name*` | `Jenny Wilson` | text, required |
| `Email*` | `example@gmail.com` | email, required |
| `Additional guests*` | `Liam Halore (Brother)` | text, required |
| `Meal preferences & Additional information` | `Your message here..` | textarea |

Button: `Confirm Now`

(The placeholders are the original's placeholder text, not pre-filled values.)

## Responsive Behavior
- **Desktop (≥1200px):** two columns, 643px each, gap 60.
- **Tablet (768px) and Mobile (390px):** Container becomes `flex-direction: column` —
  the heading + photo stack above the form, both full width. Container padding
  becomes `0 20px 130px`. Heading drops to `50px / 55px`, tracking `-1px`; the photo
  goes full column width keeping its 470:260 ratio. Section height ≈ 1156px.
- **Breakpoint:** 1200px (Tailwind `xl`).
