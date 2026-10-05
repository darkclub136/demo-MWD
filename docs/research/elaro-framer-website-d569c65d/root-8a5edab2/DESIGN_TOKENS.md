# Design Tokens — elaro.framer.website/

All values read from `getComputedStyle()` on the live site at 1440 × 900.

## Colour

| Token | Value | Used for |
|---|---|---|
| `--elaro-cream` | `rgb(248, 245, 240)` `#F8F5F0` | page background, footer background |
| `--elaro-ink` | `rgb(15, 15, 15)` `#0F0F0F` | nav (scrolled), Venue section, FAQ section |
| `--elaro-gold` | `rgb(201, 169, 106)` `#C9A96A` | accent half of every heading, years, time pills, phone number |
| `--elaro-olive` | `rgb(111, 126, 98)` `#6F7E62` | every button background |
| `--elaro-field` | `rgb(237, 234, 223)` `#EDEADF` | RSVP input / textarea background |
| `--elaro-black` | `rgb(0, 0, 0)` | headings and body copy on cream |
| `--elaro-white` | `rgb(255, 255, 255)` | copy on dark, button labels, FAQ toggle circle |

### Derived opacities (used verbatim, not computed)

| Value | Used for |
|---|---|
| `rgba(0, 0, 0, 0.7)` | body paragraphs on cream |
| `rgba(0, 0, 0, 0.2)` | inactive hotel rows; Story progress-bar track |
| `rgba(255, 255, 255, 0.7)` | hero eyebrow + date; Venue body; FAQ answers |
| `rgba(255, 255, 255, 0.4)` | Venue detail labels |
| `rgba(255, 255, 255, 0.1)` | FAQ row separators |
| `linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%)` | hero bottom scrim, 360px tall |

## Typography

Two families, both already loaded by the original site:

- **Fraunces** (variable, `opsz 30`, `SOFT 0`, `WONK 1`) — all display type, nav links,
  buttons, data values, form inputs
- **Inter** — eyebrows, body paragraphs, labels, FAQ questions, time pills

| Role | Desktop (1440) | Tablet (768) | Mobile (390) | Family / weight |
|---|---|---|---|---|
| `h1` hero names | `190px / 170px`, ls `-7.6px` | `44px / 40px`, ls `-0.88px` | `44px / 40px`, ls `-0.88px` | Fraunces 400 |
| Footer couple name | `190px / 170px`, ls `-7.6px` | — | `64px / 56px`, ls `-1.28px` | Fraunces 400 |
| `h2` section headings | `82px / 85px`, ls `-1.64px` | `50px / 55px`, ls `-1px` | `50px / 55px`, ls `-1px` | Fraunces 400 |
| `h3` years / venue name | `48px / 52px`, ls `-0.96px` | — | `30px / 34px`, ls `-0.6px` | Fraunces 400 |
| `h4` About intro | `30px / 38px`, ls `-0.6px` | `18px / 24px`, ls `-0.36px` | `18px / 24px`, ls `-0.36px` | Fraunces 400 |
| `h5` card titles | `26px / 30px`, ls `-0.52px` | `26px / 30px` | `26px / 30px` | Fraunces 400 |
| Ticker phrases | `34px / 38px` | — | — | Fraunces 400 |
| Data values / nav-adjacent | `18px / 24px` | — | — | Fraunces 400 |
| Button labels | `18px / 24px`, weight 600 | — | — | Fraunces 600 |
| Nav links | `16px / 20px` | — | — | Fraunces 400 |
| Form inputs | `16px / 20px` | — | — | Fraunces 400 |
| FAQ questions | `20px / 24px`, ls `-0.2px`, weight 500 | — | — | Inter 500 |
| Phone number | `20px / 24px`, ls `-0.2px`, weight 500 | — | — | Inter 500 |
| Body paragraphs | `16px / 20px` | — | — | Inter 400 |
| Dress-code captions | `16px / 20px`, weight 500 | — | — | Inter 500 |
| Time pills | `16px / 20px`, weight 500 | — | — | Inter 500 |
| Eyebrows / labels | `14px / 18px` | — | — | Inter 400 |

## Spacing & layout

| Token | Value |
|---|---|
| Container max width | `1440px` |
| Page gutter (desktop) | `40px` → 1345px content column |
| Page gutter (tablet / mobile) | `20px` |
| Section vertical padding (desktop) | `180px` |
| Section vertical padding (tablet / mobile) | `130px` |
| Heading block → body gap | `80px` |
| Ornament → heading gap | `20px` |
| Narrow centred column | `700px` (headings), `770px` (About intro), `940px` (Story) |

## Shape

- **Border radius is `0` everywhere** except: the nav hamburger circle (`25px`), the FAQ
  toggle circle (`13px`), and the Story progress track (`4px`) / fill (`10px`).
- **No box-shadows anywhere on the page.**
- The only borders are 1px hairlines: the FAQ row separators and the short decorative
  rules beside the hero eyebrow / footer date.

## Decorative assets

| File | Size | Role |
|---|---|---|
| `ornament-rule.png` | 270 × 30 | the small flourish above every section heading |
| `ornament-leaf.png` | 99 × 84 (rendered 28 × 24) | gold heart used in the ticker, Story timeline, footer |
| `marquee-fade.png` | 1425 × 59.375 | cream arc masking the top and bottom of the About photo strip |
| `logo-er.png` | 282 × 120 (rendered 94 × 40) | the “E&R” monogram |
