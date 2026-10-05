# DressCodeSection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/DressCodeSection.tsx`
- **Interaction model:** static, with a `position: sticky` heading
- **Server component.**

## DOM Structure
```
<section id="dress-code">  relative, flex row, justify-center, items-center
  <div> Container — w full, padding 180px 40px, flex column, justify-center, items-start, gap 0
    <div> Shape & Heading — STICKY top-0, w full, padding-bottom 80, flex column, items-center, gap 20
      <Image ornamentRule 270 × 30 />
      <h2> What to wear
    <div> dress code wrap — relative, w 1345, h 1680
      <Panel 1 /> absolute left
      <Panel 2 /> absolute right
      <Panel 3 /> absolute centre
```

## Computed Styles (exact)

### Section / Container
- Section height: `2255px`
- Container: padding `180px 40px`, display `flex`, flexDirection `column`,
  justifyContent `center`, alignItems `flex-start`, `gap: 0px`

### Shape & Heading
- **`position: sticky; top: 0`**
- width: `1345px`, height: `215px`, `padding: 0 0 80px`
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, `gap: 20px`
- Ornament: `270 × 30`, `ASSETS.ornamentRule`
- Heading `<h2>`: width `700px`, height `85px` (single line), `82px / 85px`,
  letterSpacing `-1.64px`, weight 400, **Fraunces Variable**.
  **Two-tone:** `What to` in `rgb(0, 0, 0)`, `wear` in `rgb(201, 169, 106)`.

> Build the heading inline here rather than via `<SectionHeading>`, because this one
> needs `position: sticky` and `padding-bottom: 80px` on its wrapper.

### dress code wrap
- `position: relative`, width `1345px`, height `1680px`
- The three panels are absolutely positioned at these offsets (relative to the wrap's top-left):

| Panel | left | top | image size | caption width |
|---|---|---|---|---|
| 1 | `0` | `0` | `400 × 420` | `390px` |
| 2 | `945` | `480` | `400 × 420` | `390px` |
| 3 | `343` | `1219` | `660 × 461` | `520px` |

### Panel
- Block height: image height + `20px` gap + `40px` caption
  (panels 1 and 2: 480px; panel 3: 521px)
- Image: `objectFit: cover`, no radius
- Caption `<p>`: `16px / 20px`, weight **500**, **Inter**, color `rgb(0, 0, 0)`,
  sits directly below the image with a `20px` gap.
  - Panels 1 and 2: caption left-aligned, width `390px`
  - Panel 3: caption width `520px`, horizontally **centred** under the 660px image
    (caption left edge at wrap-x `413`, i.e. `(660 − 520) / 2 = 70` from the panel's left)

## States & Behaviors
- **Sticky heading:** `Shape & Heading` is `position: sticky; top: 0`, so it pins while
  the three panels scroll past it. That is the whole interaction.
- **Entrance:** wrap each panel in `<Reveal>` with delays 0 / 100 / 200.
- No hover, click or scroll-linked motion on the panels.

## Assets
| Panel | Image | Natural | Rendered |
|---|---|---|---|
| 1 | `ASSETS.dress[0]` | 760 × 798 | 400 × 420 cover |
| 2 | `ASSETS.dress[1]` | 760 × 798 | 400 × 420 cover |
| 3 | `ASSETS.dress[2]` | 760 × 798 | 660 × 461 cover |

## Text Content (verbatim)

Heading: `What to ` + gold `wear`

1. `A refined, elegant outfit is encouraged, such as a suit with dress shoes.`
2. `Opt for breathable fabrics and soft, light hues to achieve an elegant summer formal style.`
3. `No strict dress code—wear what makes you feel amazing. Just one request: kindly reserve white outfits for the bride.`

## Responsive Behavior
- **Desktop (≥1200px):** the absolutely-positioned staggered layout above; the heading
  stays sticky.
- **Tablet (768px) and Mobile (390px):** `dress code wrap` becomes a normal
  `flex-direction: column` stack — the three panels run full column width in order,
  each image full width keeping its ratio, caption beneath. Drop the absolute
  positioning and the fixed 1680px height. Container padding becomes `130px 20px`;
  heading drops to `50px / 55px`, tracking `-1px`. Keep the heading sticky.
  Section height ≈ 1818px at 390px.
- **Breakpoint:** 1200px (Tailwind `xl`).
