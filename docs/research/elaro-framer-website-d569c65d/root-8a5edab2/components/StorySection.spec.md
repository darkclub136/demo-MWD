# StorySection Specification

## Overview
- **Target file:** `src/components/sites/elaro-framer-website-d569c65d/root-8a5edab2/StorySection.tsx`
- **Interaction model:** **scroll-driven** — a vertical progress rule fills as you scroll
- **Client component** (`"use client"`) — the progress fill needs a scroll listener.

## DOM Structure
```
<section>  relative, flex row, justify-center, items-center
  <div> Container — padding 0 40px 180px, flex column, items-center, gap 80
    <SectionHeading lead="Our" accent="story" />
    <div> Our Storys — w full, flex row, justify-center
      <div> timeline column — w 940, relative, flex column, items-center, gap 40
        <ProgressSegment h 83 />
        <StoryCard 1 />         (image LEFT,  text RIGHT)
        <ProgressSegment h 387 />
        <StoryCard 2 />         (text LEFT,   image RIGHT)
        <ProgressSegment h 387 />
        <StoryCard 3 />         (image LEFT,  text RIGHT)
        <ProgressSegment h 267 />
```
The progress segments are **absolutely positioned** behind the cards, centred on the
column, so the cards sit on top of a continuous centre rule.

## Computed Styles (exact)

### Container
- padding: `0px 40px 180px`, display `flex`, flexDirection `column`,
  justifyContent `center`, alignItems `center`, gap `80px`

### Heading block
- Uses `<SectionHeading lead="Our" accent="story" />` — ornament 270 × 30, 20px gap,
  `h2` 82px / 85px, tracking `-1.64px`, black + `#C9A96A`.
- Block height `135px`.

### Timeline column
- width: `940px`, centred inside the 1345px content column
- display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, gap: `40px`
- Total height `1286px`

### Progress segment ("Progress bar wrap")
- Wrapper: `position: absolute`, left 50% / `-translate-x-1/2`, `width: 32px`,
  display `flex`, flexDirection `column`, alignItems `center`, `gap: 15px`, `overflow: hidden`
- Track ("Progress bar"): `width: 2px`, `background: rgba(0, 0, 0, 0.2)`,
  `border-radius: 4px`, `overflow: hidden`, `position: relative`
- Fill: `position: absolute`, `width: 2px`, `height: 400px`, `background: #000000`,
  `border-radius: 10px`, driven by `transform: translateY(...)`
- Below each segment (except the last) sits a `28 × 24` heart, `ASSETS.ornamentHeart`,
  15px below the track (that is what the wrapper's `gap: 15px` provides).
- Segment track heights, top to bottom: `83px`, `387px`, `387px`, `267px`

### Story card
- width: `940px`, height: `402px`
- display: `flex`, flexDirection: `row`, justifyContent: `space-between`, alignItems: `center`
- Photo block: `402 × 402`, `overflow: clip`, `objectFit: cover`
- Text block ("right content"): `width: 420px`, `height: 232px`,
  display `flex`, flexDirection `column`, justifyContent `center`, alignItems `center`,
  **`gap: 70px`** (year block, then the title + description block)
- Inside the text block: the year sits alone; the title and description are a second
  group with the title directly above the description (title height 30, 20px gap,
  description height 60).

Desktop x-positions inside the 940 column (left edge at 243 in a 1425 viewport):
| Card | Photo x | Text x |
|---|---|---|
| 1 | `243` (left) | `763` (right) |
| 2 | `781` (right) | `243` (left) |
| 3 | `243` (left) | `763` (right) |

### Type
- Year `<h3>`: `48px / 52px`, letterSpacing `-0.96px`, weight 400,
  **Fraunces Variable**, color `rgb(201, 169, 106)`
- Title `<h5>`: `26px / 30px`, letterSpacing `-0.52px`, weight 400,
  **Fraunces Variable**, color `rgb(0, 0, 0)`
- Description `<p>`: `16px / 20px`, weight 400, **Inter**, color `rgba(0, 0, 0, 0.7)`,
  width `420px`

## States & Behaviors

### Scroll progress fill (scroll-driven)
- **Trigger:** the segment's own position in the viewport.
- **State A (segment not yet reached):** fill is fully above the track — `translateY(-400px)`,
  so nothing is visible.
- **State B (segment passed):** `translateY(0)` — the 400px fill covers the whole track.
- **Mechanism:** on `scroll`, for each segment compute
  `p = clamp((viewportCentre - segmentTop) / segmentHeight, 0, 1)` and set
  `translateY(${(p - 1) * 400}px)`. Use `requestAnimationFrame` throttling and
  `will-change: transform`.
- **Transition:** none — it is directly scroll-linked, not eased.

### Entrance
- Wrap the heading and each Story card in `<Reveal>` (delays 0 / 0 / 100 / 200).

### Hover
- None anywhere in this section.

## Assets
- `ASSETS.ornamentRule` (via `<SectionHeading>`)
- `ASSETS.ornamentHeart` — 28 × 24, three of them (between the four segments)
- `ASSETS.story.met` / `.proposal` / `.celebration` — each rendered `402 × 402`, cover

## Text Content (verbatim)

### Card 1 — photo left
- Year: `2018`
- Title: `The day we met`
- Description: `Our journey began in 2018—through shy smiles and laughter at a friend’s gathering, we found a connection that felt timeless and true.`

### Card 2 — photo right
- Year: `2022`
- Title: `The Proposal day`
- Description: `After years of memories, a seaside sunset paused the world—one question, full of love and gratitude, marked the beginning of our forever.`

### Card 3 — photo left
- Year: `2026`
- Title: `The Celebration day`
- Description: `Surrounded by loved ones, we begin our next chapter—celebrating laughter, lessons, and a love that grows. We can’t wait to share this moment.`

Heading: `Our` + gold `story`

## Responsive Behavior
- **Desktop (≥1200px):** as above — 940px column, cards `flex-row`, photo 402 × 402.
- **Tablet (768px) and Mobile (390px):** cards become `flex-direction: column` —
  the photo goes **full column width, square** (measured 350 × 350 at 390px) with the
  text block beneath it; card height ≈ 574px. The centre progress rule and hearts are
  **dropped** on the stacked layout. Container padding becomes `0 20px 130px`;
  heading becomes `50px / 55px`, tracking `-1px`.
- **Breakpoint:** 1200px (Tailwind `xl`).
