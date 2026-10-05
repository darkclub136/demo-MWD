# Behaviors — elaro.framer.website/

Everything below was observed through browser automation on the live site at 1440 × 900.
Values marked **(estimated)** could not be read exactly; everything else is a measured
`getComputedStyle()` / `getBoundingClientRect()` value.

## Global

### Lenis smooth scroll
`<html>` carries the class `lenis`. The whole page scrolls through Lenis, not the native
scroller. Default browser scrolling feels noticeably different — mount Lenis (or an
equivalent) once at the page level.

### Entrance reveals **(estimated)**
Framer `appear` animations run on nearly every block: `opacity 0 → 1` plus
`translateY(20px) → 0`, ~0.6s, `cubic-bezier(0.44, 0, 0.56, 1)`, fired when the element
enters the viewport, with ~0.1s stagger between siblings in the same group. Each element
animates once and stays.

### Buttons — hover text slide
Every olive button renders its label **twice**, stacked inside a clipped box
(`overflow: hidden`, label height 24px). On hover the pair slides up by exactly one label
height so the second copy takes the first copy's place.

- Button box: `background: #6F7E62`, `padding: 13px 30px`, `height: 50px`, `border-radius: 0`
- Label: Fraunces 18px / 24px, weight 600, `#FFFFFF`
- Transition **(estimated)**: `transform 0.35s cubic-bezier(0.44, 0, 0.56, 1)`

## Section - Hero → nav variant swap (scroll-driven)

| | State A — "Desktop" | State B — "Desktop BG nav" |
|---|---|---|
| nav height | `100px` | `90px` |
| nav background | `transparent` | `#0F0F0F` |
| inner container padding | `25px 40px` | `20px 40px` |

- **Trigger:** crossing the bottom of the Hero — `scrollY >= 100vh` (900px at this viewport).
  Measured: still State A at `scrollY = 542`, State B at `scrollY = 900`. Reverts when
  scrolling back above the threshold.
- **Transition (estimated):** `all 0.3s ease`
- Link colour stays `#FFFFFF` in both states; it never recolours per section.

## Section - details (time-driven)

Horizontal text ticker, moving **left**. `<ul>` is `display: flex`, `gap: 40px`, driven by
`transform: translateX(...)` from a rAF loop (no CSS animation, no scroll link — it froze
when the tab was backgrounded, which is how it was identified as time-based).

- 16 `<li>` = 4 phrases × 2 passes, each phrase followed by a 28 × 24 heart ornament
- Speed **(estimated):** ~70 px/s
- Implement as a CSS `@keyframes` loop over a duplicated track.

## Section - About (time-driven)

Same ticker mechanism for the photo strip: `<ul>` `display: flex`, `gap: 15px`,
10 `<li>` = 5 photos × 2 passes, each card `273 × 388.5`.

- Speed **(estimated):** ~40 px/s, leftward
- **Arc mask:** the curved top and bottom edges are *not* CSS — they are two copies of
  `marquee-fade.png` (1425 × 59.375) absolutely positioned at `top: -1px` and
  `bottom: -1px`, `z-index: 2`. The top copy is flipped with
  `transform: matrix(-1, 0, 0, -1, 0, 0)` (i.e. `rotate(180deg)`).

## Section - story (scroll-driven progress)

A 2px vertical rule runs down the centre of the 940px column, split into four segments
with a heart ornament between them.

- Track: `width: 2px`, `background: rgba(0, 0, 0, 0.2)`, `border-radius: 4px`, `overflow: hidden`
- Fill: absolutely positioned child, `background: #000000`, `height: 400px`,
  `border-radius: 10px`, driven by `transform: translateY(...)`
- **Mechanism:** scroll-linked. The fill translates from `-400px` (segment empty) to `0`
  (segment full) as that segment passes the viewport. Observed mid-scroll value:
  `translateY(-935.5px)` on a 83px segment, i.e. the fill overshoots far beyond the track
  and is clipped — only the clipped window is visible.
- Segment heights at this viewport: 83, 387, 387, 267 (top to bottom).

## Section - wedding day (scroll-driven card open)

This is the most important interaction on the page. **Do not build it as hover or click.**

Each of the four cards has two variants:

| | Closed ("Default") | Open ("2") |
|---|---|---|
| card size | `1345 × 734` | `1345 × 481` |
| photo | fills the whole card, `1345 × 734` | right-hand block, `882 × 481` |
| copy block | `336` wide, absolutely centred over the photo (`left/top: 50%`, `translate(-50%, -50%)`) | `404` wide, static, left column |
| layout | `flex-direction: row; gap: 60px` (copy is taken out of flow) | `flex-direction: row; gap: 60px`, copy then photo |

- Copy block internals are identical in both states: `flex-direction: column`, `gap: 100px`,
  time pill on top, `Title & text` below (`gap: 20px`, title then paragraph).
- Text is fully opaque in both states; nothing fades. The card simply re-lays-out.
- **Trigger:** card enters the viewport. Measured at `scrollY = 5330` (viewport 5330–6230):
  card tops at viewport y `153` and above were **open**; a card top at viewport y `674` was
  still **closed**. Implement as `IntersectionObserver` with
  `rootMargin: "0px 0px -40% 0px"`, open once and stay open.
- **Transition (estimated):** `all 0.5s cubic-bezier(0.44, 0, 0.56, 1)` on the card height,
  the copy block width/position and the photo width.

## Section - hotel (scroll-driven active item)

A sticky block whose photo and highlighted list row change as you scroll.

- `Main-content` (1345 × 940) is `position: sticky` inside a 2700px-tall section, so the
  block pins while three invisible 530 × 640 scroll targets pass beneath it. The targets sit
  640px apart (page y 8624, 9264, 9903).
- Active row: title `#000000`, paragraph `rgba(0, 0, 0, 0.7)`
- Inactive row: title **and** paragraph both `rgba(0, 0, 0, 0.2)`
- The 530 × 640 photo cross-fades between `hotel-1/2/3.jpg` in step with the active row.
- **Mechanism:** `IntersectionObserver` on the three sentinels; whichever is intersecting
  sets the active index.
- **Transition (estimated):** `color 0.3s ease` on the rows, `opacity 0.4s ease` on the photo.

## Section - RSVP

Static form. No client-side validation observed; the three text inputs and the textarea are
plain fields with placeholder text. Submission posts to Framer's forms endpoint — out of
scope, so the clone's submit handler should no-op (`event.preventDefault()`).

## Section - FAQ (click-driven accordion)

| | Closed | Open |
|---|---|---|
| item height | `85px` | `145px` |
| icon | white 25 × 25 circle (`border-radius: 13px`) with a dark `+` | same circle with a dark `−` |
| answer | not rendered | `760px` wide paragraph, `16px / 20px` Inter, `rgba(255, 255, 255, 0.7)` |

- `Content` padding is `30px 0`, `gap: 20px`; the question row is 25px tall.
  Closed: 30 + 25 + 30 = 85. Open: 30 + 25 + 20 + 40 + 30 = 145.
- Only one item is open at a time (opening a second closes the first).
- All items start closed.
- Items are separated by a 1px hairline, `rgba(255, 255, 255, 0.1)`, drawn **inside** the
  85px box (a pseudo-element or inset shadow — it does not add height; 5 × 85 = 425 exactly).
- **Transition (estimated):** `height 0.35s cubic-bezier(0.44, 0, 0.56, 1)`.

## Section - Dress code

`Shape & Heading` is `position: sticky` with `padding-bottom: 80px`, so the heading pins
while the three staggered photo panels scroll past it. No other motion.

## Footer

The three 435 × 607 photos are a **static** fanned stack, not an animation — verified
identical at every scroll position from 13400 to the bottom of the page.

- Natural flex-row positions (gap 20, centred in 1345): `x = 40`, `495`, `950`
- Applied transforms: left `translateX(380px)`, centre none, right `translateX(-380px)`
- Result: visible x of `420`, `495`, `570`; centre photo on top (`z-index: 2`), sides `z-index: 1`

## Hover states

| Element | Change |
|---|---|
| Olive buttons | label pair slides up one line (see Global) |
| Nav links | no measurable change |
| FAQ rows | cursor pointer only |
| Hotel rows | no hover state — the highlight is scroll-driven only |
| Schedule cards | no hover state — the open/close is scroll-driven only |

## Responsive

Measured breakpoint behaviour is documented per component in the spec files. The Framer
variants observed are **Desktop** (≥1200), **Tablet**, and **Phone** (<810). The nav keeps
the full link row on desktop; the phone variant replaces it with a 50 × 50 white circular
hamburger button (`border-radius: 25px`, 28 × 15 icon) at the right edge.
