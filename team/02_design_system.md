# Fernbank design system

"Fernbank" is a placeholder. The name lives in one place: a `BRAND` constant in the page build (or `<meta name="brand">`), and in the wordmark text node. CSS never contains it. Tokens are in `docs/assets/css/tokens.css`; components go in `components.css`.

## 1. Direction

Calm, plain-dealing, Australian, adult. It should feel like a well-run local credit union's printed rate sheet: everything is shown, in order, without a fuss. Cool mineral-white paper, deep teal ink for actions, a green-grey neutral, a serif for headlines that reads as a person speaking and a clean sans for the numbers. It must not look like neon fintech (gradients, glow, dark-mode-only), pawnshop yellow (Cash Converters, payday), bank navy (every incumbent), or the AI-template cream-and-terracotta page.

**The distinctive device: the ledger line.** Every money figure on the site sits on a dotted-leader line, as on a receipt or a tradie's invoice: `You borrow ········ $3,000`, `You repay in total ········ $3,640`. The line is a `border-bottom: 2px dotted var(--border-strong)` that fills the gap between label and figure. The cost strip, rate card and worked example all use it, and the "You repay in total" line is always the last and the heaviest. The competitors hide the total; this brand makes it the signature. Jess named the up-front total as her one hook (`06_customer_voices.md`).

## 2. Colour

All values are tokens on `:root`. Dark values apply under `@media (prefers-color-scheme: dark)` (unless `data-theme="light"`) and under `[data-theme="dark"]`. Neutrals are tinted toward green (hue about 150); there is no pure grey, pure black or pure white except the card surface in light mode.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | #F2F5F3 | #101714 | Page |
| `--surface` | #FFFFFF | #18211D | Cards, inputs, tables |
| `--surface-sunk` | #E7ECE9 | #0C120F | Disabled, footer band |
| `--text` | #16211D | #E8EFEB | Primary text |
| `--text-2` | #44544C | #A9B8B0 | Secondary text |
| `--border` | #CBD6D0 | #2B3832 | Dividers, card edges |
| `--border-strong` | #7C8D84 | #6A7C73 | Input borders, leader lines, icons |
| `--accent` | #0E5A63 | #5FC1CB | Primary button, links |
| `--accent-ink` | #FFFFFF | #0B1512 | Label on accent |
| `--accent-soft` | #DCEBEC | #17313A | Secondary hover, selected card |
| `--success` / `--success-bg` | #1B6B3A / #E3F1E7 | #7FD39A / #16301F | Confirmed, saved |
| `--warning` / `--warning-bg` | #7A4A00 / #FBEED2 | #F0C46A / #33260A | Repayment-risk notices |
| `--danger` / `--danger-bg` | #A32B20 / #FBE6E3 | #FF9A8E / #3A1814 | Form errors only |
| `--chart-neutral` | #6F8178 | #8A9C93 | Chart bars and lines |

**Contrast (WCAG 2.2, computed):**

| Pair | Light | Dark |
|---|---|---|
| Body text on `--bg` | 15.1:1 | 15.6:1 |
| Body text on `--surface` | 16.5:1 | 14.1:1 |
| Secondary text on `--bg` | 7.3:1 | 8.8:1 |
| Secondary text on `--surface` | 8.0:1 | 8.0:1 |
| **Primary button label on `--accent`** | **7.9:1** | **8.8:1** |
| Accent link on `--bg` | 7.2:1 | 8.6:1 |
| Success text on `--success-bg` | 5.6:1 | 7.9:1 |
| Warning text on `--warning-bg` | 6.5:1 | 9.0:1 |
| Danger text on `--surface` | 7.2:1 | 8.1:1 |
| Input border on `--bg` (non-text) | 3.2:1 | 4.1:1 |

Rules: one accent, no gradients. Colour never carries meaning alone (errors get an icon and text). Warning colour is for repayment notices only.

## 3. Type

Two Google Fonts: **Source Serif 4** (headings, 600 and 700, optical size on) and **Public Sans** (everything else, 400, 600, 700). Public Sans has clear tabular figures, which matters on a rate table.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap">
```

Fallback stacks are in `--font-display` (Georgia) and `--font-body` (system-ui).

| Token | Mobile | At 48em+ | Line height | Use |
|---|---|---|---|---|
| `--fs-display` / `.display` | 2.5rem | 3.5rem | 1.05 | Hero headline only |
| `--fs-h1` | 2.125rem | 2.75rem | 1.15 | Page title |
| `--fs-h2` | 1.75rem | 2.125rem | 1.15 | Section |
| `--fs-h3` | 1.375rem | 1.5rem | 1.3 | Card, step |
| `--fs-lg` / `.lede` | 1.25rem | same | 1.5 | Subhead |
| `--fs-base` | 1.0625rem (17px) | same | 1.6 | Body |
| `--fs-sm` | 0.9375rem | same | 1.5 | Table, labels |
| `--fs-xs` | 0.875rem (14px) | same | 1.5 | Legal, hints. The floor. |

Measure: `p, li, dd` are capped at `--measure: 66ch` (target 60 to 70). Prose containers use `.container--reading` (44rem). Money figures use `font-variant-numeric: tabular-nums` (set on `body`). Headings use `text-wrap: balance`.

## 4. Space, shape, motion

- **Spacing** (4px base): `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 72, `-9` 96. Section padding is `--space-7` on mobile and `--space-8` from 48em.
- **Radius**: one value, `--radius: 6px`, on buttons, inputs, cards, tables. No pills, no full-round except the 8px dots of the progress indicator and the radio dot.
- **Borders**: 1px `--border` for structure; 1px `--border-strong` on inputs; 2px for focus, error and selected states. Dotted 2px `--border-strong` is reserved for ledger lines.
- **Shadow**: none by default. One token, `--shadow-pop`, for things that float above the page: mobile nav panel and consent banner.
- **Motion**: only colour and background transitions (`--ease`, 160ms) and the accordion chevron turn. No scroll animation, parallax or count-up numbers. `prefers-reduced-motion: reduce` collapses all durations to 0.01ms (in tokens.css).

## 5. Components

Class names are BEM-style. Every interactive element is at least `--tap` (48px) tall, with a `:focus-visible` ring of 3px `--focus`, 2px offset. Hover changes colour only.

### Header
`.site-header` (sticky, `--bg`, bottom border `--border`, padding `--space-3` 0, height 4rem) containing `.container.site-header__inner` (flex, space-between) with `.wordmark` on the left and one `a.btn.btn--primary.btn--sm` ("Check your rate") on the right. `.btn--sm` is min-height 2.5rem, padding 0.5rem 1rem, `--fs-sm`. The CTA stays visible beside `.nav-toggle` on mobile. 

### Mobile nav
`button.nav-toggle` (48px square, `aria-expanded`, `aria-controls="site-nav"`, three 2px bars in `--text`) opens `nav#site-nav.site-nav` as a full-width panel under the header: `--surface`, `--shadow-pop`, links at `--fs-lg`, 56px rows separated by `--border`. Closes on Escape and link tap. Without JS it is a plain list. From 48em `.site-nav` is inline and the toggle hidden.

### Hero
`.hero` (padding `--space-7` 0 on mobile, `--space-8` from 48em). Children: `h1.display.hero__title` (max 14 words), `p.lede.hero__sub`, `.hero__actions` with `a.btn.btn--primary.btn--block` (inline from 40em) and a `.hero__note` line in `--fs-xs` `--text-2` ("Checking your rate will not affect your credit score" only if true), then `.cost-strip`.

**`.cost-strip`** ("what it costs"): `--surface`, 1px `--border`, `--radius`, padding `--space-4`. A `dl.ledger` of 3 rows: `You borrow` / `$3,000`; `Over` / `12 months`; `You repay in total` / `$3,640` (last row, `font-weight: 700`, `--fs-lg`, 2px solid `--text` top rule). A `.cost-strip__foot` line in `--fs-xs`: "Example only. Your rate depends on your circumstances."

**`.ledger`** (the device): each `.ledger__row` is `display:flex; align-items:baseline; gap: var(--space-2)`. `dt` is `--text-2`; `.ledger__fill` is `flex:1; border-bottom:2px dotted var(--border-strong); transform: translateY(-0.3em)`, marked `aria-hidden="true"`; `dd` is `--text`, 600, right-aligned.

### Rate card
`.rate-card.card` (padding `--space-5`, no shadow). Header `h3.rate-card__title` ("Personal loan"). A `.ledger` with rows: Amount ($2,000 to $5,000), Term (3 to 12 months), Interest rate (x% to y% p.a.), Comparison rate (z% p.a.\*), Fees (stated in dollars). Then `h4` "Worked example" and `.table-wrap > table.rate-table` with `<caption class="visually-hidden">`, columns Item / Amount (`th.num`): Amount borrowed, Establishment fee, Interest, Monthly fee, **Total you repay** (in `<tfoot>`), Repayment each fortnight/month. Below it, `.rate-card__foot` in `--fs-xs`: the comparison rate warning ("This comparison rate is true only for the example given and may not include all fees and charges. Different amounts and terms will result in different comparison rates."). Never show a rate without its total.

### How it works (three steps)
`ol.steps` (grid, one column on mobile with `--space-5` gap, three columns from 48em). Each `li.step`: `.step__num` (2rem circle, 1px `--border-strong`, `--font-display` 700, `--accent-text`), `h3.step__title`, `p.step__text` in `--text-2`. Copy: Check your rate / Choose your repayments / Get your money.

### Trust row
`ul.trust-row` (2-col grid on mobile, 4-col from 48em, `--space-5` gap; no list style). Each `li.trust-item`: `.trust-item__icon` (28px inline SVG, stroke `--accent-text`, 2px stroke, round caps, no fill, `viewBox="0 0 24 24"`, `aria-hidden="true"`), `strong.trust-item__title` (600, `--fs-sm`), `span.trust-item__text` (`--fs-xs`, `--text-2`). Icon specs, all on the 24 grid:
- **Licence**: shield `M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z` with a check `M8.5 12l2.5 2.5L15.5 10`.
- **AFCA**: two overlapping circles (`cx=9 cy=12 r=5` and `cx=15 cy=12 r=5`) for an independent third party.
- **Hardship**: a hand-held heart: heart outline `M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z`.
- **No early-repayment fee**: calendar `rect x=4 y=5 w=16 h=15 rx=2`, line `M4 10h16`, and a check `M9 15l2 2 4-4`.


### FAQ accordion
Native `<details class="faq__item"><summary class="faq__q">`. `.faq__item` has a bottom 1px `--border`. `summary`: min-height 56px, padding `--space-4` 0, `--fs-base` 600, flex with a chevron SVG (16px, stroke `--border-strong`), `list-style: none`, `cursor: pointer`. `[open]` rotates the chevron 180deg (160ms). `.faq__a`: padding 0 0 `--space-4`, `--text-2`. States: hover `--accent-text` on the question; focus ring on `summary`.

### Footer
`.site-footer` (`--surface-sunk`, top border `--border`, padding `--space-7` 0). Columns `.footer__links` and `.footer__legal`. **All disclosures are 14px (`--fs-xs`), `--text-2`, line-height 1.5, never below 14px, never in a lighter tint.** Required: lender name and ACL number, brand-and-lender relationship, credit-assessment statement, comparison rate warning, AFCA membership and contact, hardship contact, privacy and credit guide links, ABN.

### Forms (apply stub)
- **Field**: `.field` (margin-bottom `--space-5`) = `label` + control + optional `.hint` + `.field-error`.
- **Inputs/selects**: min-height 48px, 1px `--border-strong`, `--radius`, padding 0.625rem 0.875rem, 16px text. Hover: border `--text-2`. Focus: 3px `--focus` ring. Error: `aria-invalid="true"` gives a 2px `--danger` border plus `.field-error` below, prefixed by an 16px alert icon, linked with `aria-describedby`. Valid: `.field-success` text with a check icon.
- **Radio cards**: `label.radio-card` wrapping `input[type=radio].visually-hidden` and `.radio-card__body` (padding `--space-4`, 1px `--border-strong`, `--radius`, `--surface`, `min-height: 56px`). Checked: 2px `--accent` border, `--accent-soft` background, a filled 12px dot in a 24px ring at the right. Focus: ring on `.radio-card__body` via `input:focus-visible + .radio-card__body`. Used for term (3, 6, 9, 12 months), 2 columns, each showing repayment and total.
- **Amount**: a `.field` with number input and range `input[type=range]` (accent-color `--accent`), figure shown in `--fs-h3`.
- **Progress**: `ol.progress` of `li.progress__step` (8px dots joined by a 2px `--border` line; done `--accent`, current `--accent` with 3px ring, upcoming `--border-strong`), plus visible text "Step 2 of 4" (`--fs-sm`, 600) and `aria-current="step"`. No percentage bars.
- **Alerts**: `.alert` (padding `--space-4`, 1px border, `--radius`, icon + text). `.alert--success` (`--success-bg`, text `--success`), `.alert--warning`, `.alert--error` (`--danger-bg`, text `--danger`). Error summary goes at the top of the form with links to fields, `role="alert"`.
- **Success screen**: `.success` card with an `h2`, a `.ledger` repeating amount and total repayable, and next steps.
- **Buttons**: submit is `.btn--primary.btn--block`; disabled has `--surface-sunk` fill. While submitting, label becomes "Sending..." and `aria-busy="true"`.

### Consent banner
`.consent` fixed to the bottom, `--surface`, 1px top `--border`, `--shadow-pop`, padding `--space-4` plus `env(safe-area-inset-bottom)`; `role="dialog"`, `aria-label="Cookies"`, no focus trap, no scroll lock, and never covering the hero CTA at first paint on a 375px screen (max height 40vh). Text `--fs-sm`: what is set and why, with a link to the privacy page. Two buttons of equal weight and size, `Accept` and `Reject` (both `.btn--secondary`; no dark pattern, no pre-ticked categories). "Manage" opens `.consent__prefs`: unchecked boxes for analytics and advertising. A footer "Cookie settings" link reopens it.

## 6. Logo

Text wordmark, no image files. `a.wordmark` = inline SVG mark + the word.
- Text: "Fernbank", **Source Serif 4, 700**, `font-size: 1.5rem`, `letter-spacing: -0.02em`, `line-height: 1`, colour `--text`. The mark and the text sit on one baseline with an 8px gap.
- Mark: 28px square, `viewBox="0 0 28 28"`, `fill: var(--accent)`, rounded 6px. Inside it, in `--accent-ink`, a stylised frond drawn as three rising chevrons that also read as a repayment staircase: `M7 20l7-5 7 5` , `M7 15l7-5 7 5`, `M7 10l7-5 7 5`, stroke 2.5, round caps and joins, no fill, with the top one at full strength and the lower two at 0.6 and 0.35 opacity. `aria-hidden="true"`; the wordmark link carries the name.
- Minimum size: mark 20px, wordmark 1.25rem. Single-colour use: `currentColor` for both.

## 7. Responsive

- **Approach**: mobile first, `min-width` queries only. Breakpoints: `40em` (640px, buttons go inline, 2-col grids), `48em` (768px, type scale steps up, nav inline, 3-col steps, 4-col trust row), `64em` (1024px, hero becomes two columns: text left, rate card right).
- **Gutter**: `--gutter` = `max(1rem, env(safe-area-inset-left))`, and right likewise; `.container` applies both. The page needs `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Fixed bars (`.consent`) add `env(safe-area-inset-bottom)`.
- **No horizontal scroll**: `body { overflow-x: hidden }` is a backstop, not the fix. Grid and flex children get `min-width: 0`; long strings wrap with `overflow-wrap: anywhere` where needed. Images and SVG are `max-width: 100%`.
- **Tables** always sit in `.table-wrap` (`overflow-x: auto`), which gets `tabindex="0"` and `role="region"` with an `aria-label` so keyboards can scroll it. The first column stays under 12rem. The worked example should fit at 375px without scrolling; if it does not, simplify the table, not the figures.
- **Performance**: renders without JS; fonts are the only third-party request; icons are inline SVG.
