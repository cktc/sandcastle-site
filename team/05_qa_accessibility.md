# 05 QA and accessibility review

Reviewed by reading code and running python3 and node checks. Nothing was tested in a browser or screen reader.

## Summary

**Pass with fixes.** The structure is sound: one h1 per page, correct landmarks, no heading skips, no duplicate ids, every control labelled, every SVG `aria-hidden`, all text at or above 14px, every contrast pair at or above 4.5:1 in both themes. Four small defects were fixed (CSP, two JS null-safety and focus issues, an ARIA overwrite). The remaining open items are judgement calls or depend on hosting and legal decisions. `node --check` passes on all three scripts. `check_links.py` reports OK.

## Checks that passed

- All 13 pages: `lang="en-AU"`, viewport with `viewport-fit=cover`, one h1, one `header`, `main#main` (tabindex -1, the skip-link target), a Main nav and a Footer nav (both with `aria-label`), and `footer`.
- No heading skips, duplicate ids or dead `#` anchors.
- No `<img>` tags. Every inline SVG has `aria-hidden="true"`.
- All form controls on apply.html have a `<label for>`. The range slider has an `aria-label`. The progress steps carry visually hidden names.
- Every button and summary has text or an `aria-label`. The nav toggle has `aria-expanded="false"`, `aria-controls="site-nav"` and `aria-label`. The FAQ uses native `<details>/<summary>`, which is keyboard-operable.
- Every `data-cfg` key exists in `SITE_CONFIG`, and every static fallback equals the config value.
- Focus: `:focus-visible` is a 3px ring on all elements, including links, buttons, inputs, summary, the range slider and the radio cards. The scrolling table region has `tabindex=0` and a label. `prefers-reduced-motion` is handled.
- Responsive: the gutter is `max(1rem, env(safe-area-inset-*))`, the body `min-width` is 20rem (320px), and no other fixed min-width exceeds 17rem. The only table sits in `.table-wrap` with `overflow-x:auto`. The ledger rows are flex with a shrinkable fill.
- Performance: HTML is 8.2 to 21 KB per page, CSS 27.7 KB, JS 36.1 KB. Fonts use `preconnect` and `display=swap` via `<link>`. Scripts are deferred. Only the CSS and font stylesheet block rendering.

## Contrast (computed from tokens.css hex values)

No text pair fails in light or dark. Body text on bg and surface is 14.1 to 16.5:1. text-2 on bg, surface, sunk and accent-soft is 6.6 to 9.2:1. accent-text on bg, surface, soft and sunk is 6.4 to 9.0:1. Button ink on accent is 7.9 (light) and 8.8 (dark). Success, warning and danger on their backgrounds are 5.6 to 9.0:1. The lowest is the light placeholder on surface at 4.74:1. Non-text borders (border-strong) are 3.19 to 4.11:1 against 3:1 needed. The smallest font token is `--fs-xs` at 14px; the only literal sizes are the 16px input font and the 1.5rem wordmark.

## Rate calculation

I re-ran `RATE_CALC(3100, 12)` and derived the comparison rate independently:

- Balance is $3,300 ($3,100 plus the $200 fee), at 3% a month. The monthly repayment is **$331.52**, matching the spec. The total is $3,978.24 (12 × $331.52), interest is $678.24 and the cost of credit is $878.24.
- The comparison rate solves for the monthly rate that discounts twelve payments of $331.52 to $3,100, the cash actually advanced. This gives 4.0630% a month, or **48.76%** nominal (×12). The page output matches.
- The method is correct, not a shortcut. It is an IRR on the net cash advanced, quoted as a nominal annual rate, which is how an Australian comparison rate is expressed (the effective annual equivalent would be 61.3%, which is not the convention). It treats the financed fee as a cost, as it should. Counsel should still confirm two points: that the fee is correctly treated as credit-provided versus charge, and that no mandated standard example (the $30,000 over 5 years figure applies to some contracts) is required for this product. The bisection is safe: `mid` is never 0 and it runs 80 iterations.

## Findings

| # | Sev | File | Line | Issue | Status |
|---|---|---|---|---|---|
| 1 | Medium | all 13 pages (head meta CSP) | 15 | CSP omitted hosts that gtag with an `AW-` id uses: `www.google.com`, `*.g.doubleclick.net`, `www.googleadservices.com`, other `*.googletagmanager.com` hosts, and regional `*.google-analytics.com` image hits. Ads conversions would be blocked silently once an ID is set. | Fixed |
| 2 | Medium | analytics.js | initConsentBanner | Accept, Reject or Save hides the banner while a button inside it has focus, so focus drops to `<body>` and keyboard users lose their place. | Fixed |
| 3 | Low | analytics.js | initConsentBanner | `prefs` was dereferenced without a null check, so a page without `[data-consent-prefs]` would throw on Manage or Save. The footer opener also assumed an accept button exists. | Fixed |
| 4 | Low | forms.js | 49 (CARD use in RULES) | If config.js failed to load, `console.error` fired but `CARD.amountMin` then threw a TypeError. | Fixed |
| 5 | Medium | forms.js | `setFieldError` | It replaced `aria-describedby`, dropping the hint ids (`amount-hint`, `contact-hint`) once a field errored. | Fixed |
| 6 | Medium | apply.html, forms.js | form tag, submit | **No-JS path does not work.** `action=""` posts to apply.html itself, which a static host answers with 405. forms.js sets the action only when JS runs. The noscript notice says to call, which is honest, but a native post has nowhere to go. Hard-coding a Formspree URL in HTML would also fix it. | Open |
| 7 | Medium | 404.html | 18, 22, 23 | Uses root-absolute `/assets/...` and `/index.html` paths. This is correct on a custom domain (CNAME.example suggests one) but breaks on a GitHub Pages project URL (`/REPO/`), and on any 404 at a nested path relative links would break. Decide on hosting. | Open |
| 8 | Low | CSP (all pages) | 15 | `connect-src` and `form-action` only allow `formspree.io`. If the team chooses Basin, Getform or another endpoint, submissions fail with "We could not send your request". Add the chosen host to both. Also, `frame-ancestors` cannot be set by meta tag, so it needs a response header if the host allows one. | Open |
| 9 | Low | forms.js | `show()` | `apply_step` fires on initial render (`show(0,false)`), before `apply_start`, so every page view of /apply sends a step-1 event. Consider firing only when `moveFocus` is true. | Open |
| 10 | Low | analytics.js, apply.html | banner | The consent banner is a non-modal `role="dialog"` placed at the end of the DOM and not focused on first show. A keyboard user reaches it only after tabbing through the whole page. It also overlays the bottom of the page and could cover a focused element (a WCAG 2.2 concern, not 2.1). It does not trap focus. Consider `scroll-padding-bottom` while it is open. | Open |
| 11 | Low | analytics.js | `captureAttribution` | Attribution (UTMs, click IDs, landing page, referrer) is stored in sessionStorage before consent and added to form posts. This is first-party and arguably necessary to process the application, but counsel should confirm. | Open |

## Consent gating and JS review

- With `CONSENT_REQUIRED` true, `track()` returns before `loadVendors()` unless `Consent.get()===true`. Nothing loads or fires without consent, and a page_view is held and replayed on accept. With the three tracking IDs blank, nothing loads at all.
- `data-cfg` fill logs an error and leaves the fallback text for unknown or object-valued keys. It never throws.
- Handlers attach in `boot()` after DOM ready; optional elements (nav, banner, form) are null-checked.
- forms.js validation: loan amount (whole dollars, $2,001 to $5,000), term (3 to 12, radio required), purpose (optional), four eligibility ticks (any unticked sends the visitor to the ineligible panel with the failed statement), bank-data consent (required, custom message), name (required), email format, AU mobile format (04xx, +61 allowed), one-of email or mobile, and contact consent (required). Errors go into a `role="alert"` region with a list of links to the fields, and focus moves to the first invalid field.
- Step change moves focus to the step's h2 (tabindex -1) and updates the polite "Step n of 4" text. Back from the ineligible panel does the same.
- Blank `FORM_ENDPOINT` shows a loud inline error with the phone number, logs to console, and sends nothing. It does not fall back to a native post.

## Fixes applied

1. **CSP, all 13 `*.html`:** added `*.googletagmanager.com`, `www.google.com`, `*.g.doubleclick.net`, `www.googleadservices.com` to `script-src`, `connect-src` and `img-src` as each needs, and `*.google-analytics.com` to `img-src`. Meta and Formspree hosts unchanged.
2. **assets/js/analytics.js:** `close()` returns focus to the footer "Cookie settings" opener, or `#main`, when the focused element was inside the banner; null guards for `prefs` and the accept button.
3. **assets/js/forms.js:** early `return` when RATE_CALC or RATE_CARD is missing, so the page degrades to the native form instead of throwing.
4. **assets/js/forms.js:** `setFieldError` appends the error id to `aria-describedby` instead of replacing it.

All edits are commented "QA fix". `node --check` passes on all three files and `check_links.py` still reports OK.

## Open items

Decisions needed: hosting (items 6 and 7), the form endpoint host (6 and 8), counsel's view on pre-consent attribution storage (11) and the comparison-rate treatment above. Item 9 and 10 are low-risk polish. Minor markup notes: the ledger `<span>` inside `<dl><div>` is not strictly valid HTML, and the range slider has no `aria-valuetext`.
