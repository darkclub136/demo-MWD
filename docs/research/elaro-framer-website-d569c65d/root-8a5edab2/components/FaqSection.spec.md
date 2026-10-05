# FaqSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/FaqSection.tsx`
- **Interaction model:** **click-driven** accordion, one item open at a time
- **Client component** (`"use client"`).

## DOM Structure
```
<section id="faq">  relative, bg #0F0F0F, flex row, justify-center, items-center
  <div> Container — w full, padding 120px 170px, flex column, items-center, gap 80
    <SectionHeading lead="A few things" accent="to know" tone="dark" />
    <div> list — w 1085, flex column
      <FaqItem /> × 5
```

### FaqItem
```
<div>  w 1085, h 85 → 145, overflow-clip, separator hairline
  <button> Content — w full, padding 30px 0, flex column, items-start, gap 20, text-left
    <div> Top — w full, flex row, justify-between, items-center, h 25
      <p> question
      <span> Expand-Collapse — 25 × 25 circle
    <div> Answer — w 760  (open only)
      <p> answer
```

## Computed Styles (exact)

### Section
- backgroundColor: `rgb(15, 15, 15)`
- height: `965px`
- display: `flex`, flexDirection: `row`, justifyContent: `center`, alignItems: `center`

### Container
- **padding: `120px 170px`**
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, gap: `80px`

### Heading block
- `<SectionHeading lead="A few things" accent="to know" tone="dark" headingClassName="max-w-[700px]" />`
- Block height `220px` — wraps to **two lines**, `A few things` white, `to know` gold.

### List
- width: `1085px`, display `flex`, flexDirection `column`, **`gap: 0`**
- Closed list total height: 5 × 85 = `425px`

### Item — CLOSED
- height: `85px`, `overflow: clip`
- `Content`: `padding: 30px 0px`, `display: flex`, `flex-direction: column`, `gap: 20px`
- `Top`: height `25px`, `display: flex`, `justify-content: space-between`, `align-items: center`
- Question `<p>`: width `868px`, height `24px`, `20px / 24px`, letterSpacing `-0.2px`,
  weight **500**, **Inter**, color `rgb(255, 255, 255)`
- Toggle: `25 × 25`, `background: rgb(255, 255, 255)`, `border-radius: 13px`,
  `display: flex`, `justify-content: center`, `align-items: center`;
  icon `<PlusIcon />` 11 × 11, color `#0F0F0F`

### Item — OPEN
- height: `145px` (30 pad + 25 question + 20 gap + 40 answer + 30 pad)
- Answer `<div>`: width `760px`, height `40px`
- Answer `<p>`: `16px / 20px`, weight 400, **Inter**, color `rgba(255, 255, 255, 0.7)`
- Toggle icon becomes `<MinusIcon />`

### Separator
- A 1px hairline, `rgba(255, 255, 255, 0.1)`, drawn **inside** each item's box so it adds
  no height (5 × 85 = 425 exactly on the original). Use a bottom pseudo-element or
  `box-shadow: inset 0 -1px 0 rgba(255,255,255,0.1)`.
- Every item has one, including the last.

## States & Behaviors

### Accordion (click-driven)
- **Trigger:** click anywhere on the item row.
- **Single-open:** opening an item closes whichever was open. All items start **closed**.
  Clicking the open item closes it.
- **State A (closed):** `height: 85px`, `+` icon, answer not rendered
- **State B (open):** `height: 145px`, `−` icon, answer visible
- **Transition:** `height 0.35s cubic-bezier(0.44, 0, 0.56, 1)`.
  Implement with `grid-template-rows: 0fr → 1fr` on the answer wrapper, or by
  animating an explicit height — either matches the measured 85 → 145 step.
- Cursor: `pointer` on the row. No other hover change.

### Entrance
- Wrap the heading in `<Reveal>`; wrap the list in `<Reveal delay={100}>`.

## Assets
- `ASSETS.ornamentRule` (via `<SectionHeading>`)
- `PlusIcon`, `MinusIcon` from `../shared/icons`

## Text Content (verbatim)

Heading: `A few things` + gold `to know`

1. **Q:** `Is bringing a plus-one allowed at this event?`
   **A:** `Plus-ones are allowed if specified on your invitation. Please check your invite details or contact the organizer to confirm eligibility.`
2. **Q:** `When should everyone plan to arrive?`
   **A:** `Guests should plan to arrive 15–30 minutes before the start time to allow for check-in, seating, and a smooth beginning to the event.`
3. **Q:** `Is there space for children?`
   **A:** `Yes, there is space for children. Please let us know in advance so we can ensure appropriate seating and arrangements for a comfortable experience.`
4. **Q:** `Is there a parking area available?`
   **A:** `Yes, a designated parking area is available on-site. Please follow event signage or staff directions for convenient and organized parking upon arrival.`
5. **Q:** `Will vegan or vegetarian dishes be served?`
   **A:** `Yes, vegan and vegetarian options will be available. Please inform us in advance of dietary needs so we can accommodate you properly.`

(Answer 2 uses an en dash in `15–30`.)

## Responsive Behavior
- **Desktop (≥1200px):** as above — container padding `120px 170px`, list 1085px wide.
- **Tablet (768px) and Mobile (390px):** container padding becomes `100px 30px`; the
  list goes full width. Question type stays `20px / 24px`; the heading drops to
  `50px / 55px`, tracking `-1px`. Items grow taller as questions and answers wrap
  (section ≈ 947px at 390px) — let the height be driven by content rather than fixed.
- **Breakpoint:** 1200px (Tailwind `xl`).
