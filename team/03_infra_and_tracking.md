# Infrastructure and tracking plan

Context: the A$50k Meta and Google test (verdict report). Gates are cost per funded loan under A$200 blended with 30% or better approval. The site measures the top of the funnel; funded loans come from the backend.

## Script order (every page)

```html
<script src="/assets/js/config.js" defer></script>
<script src="/assets/js/analytics.js" defer></script>
<script src="/assets/js/forms.js" defer></script>   <!-- apply.html only -->
```

The consent banner calls `Consent.set(true)` / `Consent.set(false)`, and shows itself when `Consent.get() === null`. `Consent.onChange(fn)` is available. With `CONSENT_REQUIRED: true`, no vendor script loads and no event fires before accept; a `page_view` held back is sent on accept. `?debug=1` logs every call.

## Tracking plan

`track(name, params)` adds `event_id` (for later server-side deduplication) and `page_path`, and drops PII-like parameter names with a console error. Never pass name, email, phone, DOB or income.

| Event | Trigger | Meta | Google (GA4) | Parameters |
|---|---|---|---|---|
| `page_view` | Every page load (opt out with `<meta name="no-auto-pageview">`) | `ViewContent` | `page_view` | `page_title`, `page_path` |
| `apply_start` | First focus or input in the apply form, once per load | `InitiateCheckout` | `begin_checkout` | none |
| `apply_step` | Each step shown | none | `apply_step` (custom) | `step`, `step_count` |
| `eligibility_passed` | Eligibility step passes | `Lead` | `qualify_lead` | none |
| `eligibility_failed` | Eligibility step fails | `EligibilityFailed` (custom) | `disqualify_lead` | `reasons` (age, residency, income_source, centrelink_majority) |
| `apply_submitted` | Endpoint returns 2xx, 300ms before redirect | `CompleteRegistration` | `generate_lead` | `loan_amount` |
| `loan_funded` | Backend, server side only | CAPI `Purchase` | GA4 Measurement Protocol / Ads offline import | `value`, `event_id`, click IDs |

Notes:

- Google Ads conversions: create conversion actions for `apply_submitted` and `eligibility_passed`, then put their `AW-.../label` in `GOOGLE_ADS_CONVERSIONS`.
- Attribution: UTMs, `fbclid`, `gclid`, `gbraid`, `wbraid`, landing page and referrer are saved to `sessionStorage` and appended as hidden fields to every `form[data-track]`, so the form service records the source of each application. A new paid click overwrites the earlier one within the session. A visitor who returns in a new session loses attribution; accepted for the test.
- The decision metric is cost per funded loan. The funded event cannot come from the browser. Pass `event_id`, `fbclid` and `gclid` from the form submission to the backend, then send Meta CAPI and Google offline conversions from there. This is needed before spend starts, and a static site cannot do it alone (a Make or Zapier webhook on the form service works as a bridge).
- Utm convention: `utm_source` (meta, google, comparison), `utm_medium` (paid_social, cpc, referral), `utm_campaign`, `utm_content` (creative ID), `utm_term`.

## Performance budget

- HTML plus CSS under 100KB per page, uncompressed total. JS under 40KB across the three files.
- No render-blocking web fonts. Prefer the system font stack. If a brand font is used: self-host WOFF2, `font-display: swap`, `<link rel="preload" as="font" crossorigin>` for one weight, and preconnect only to origins that remain (`https://connect.facebook.net`, `https://www.googletagmanager.com`, added with `rel="preconnect"` on pages that load them).
- No images above 100KB; set `width` and `height`, `loading="lazy"` below the fold, prefer inline SVG. No binary favicons.
- CSS inline for the first screen is allowed within the budget; otherwise one stylesheet, `<link>` in head. Scripts always `defer`.
- Targets: Lighthouse mobile performance 90+, LCP under 2.5s, CLS under 0.1 on home and apply.

## SEO basics (every page)

- Unique `<title>` (under 60 characters) and `<meta name="description">` (under 155).
- `<link rel="canonical" href="https://www.example.com.au/page.html">`, `<html lang="en-AU">`, one `<h1>`.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`; `og:image` only when a PNG or JPG exists. `twitter:card` summary.
- `noindex` on `thank-you.html` and `404.html`.
- Organization JSON-LD on the home page:

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FinancialService","name":"Sandcastle",
 "legalName":"Sandcastle Pty Ltd","url":"https://www.example.com.au/",
 "email":"hello@example.com.au","telephone":"+61-1300-000-000",
 "areaServed":"AU","description":"Personal loans for Australians. Australian Credit Licence 000000."}
</script>
```

- FAQPage JSON-LD on `faq.html`, one entry per visible question (text must match the page):

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
 {"@type":"Question","name":"Question text?","acceptedAnswer":{"@type":"Answer","text":"Answer text."}}
]}
</script>
```

- Do not mark up rates or reviews in structured data. Keep comparison-rate and credit-advertising wording to the compliance review.

## Security headers

GitHub Pages sends HSTS on enforced-HTTPS sites (verify with `curl -I`) and lets us set nothing else. What to do instead:

- CSP via meta tag (no `frame-ancestors`, no report-only). Starting point, adjust to the form service host:
  `default-src 'self'; script-src 'self' https://connect.facebook.net https://www.googletagmanager.com; connect-src 'self' https://www.facebook.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://formspree.io; img-src 'self' data: https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self'; base-uri 'self'; form-action 'self' https://formspree.io`
  The scripts add no inline code, so `'unsafe-inline'` is not needed; keep inline `<style>` out or add a hash.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` on every page.
- Clickjacking, `X-Content-Type-Options` and `Permissions-Policy` cannot be set. If they are required (a funder's security review may ask), put Cloudflare (free) in front with the domain proxied and add response headers with a Transform Rule. This is also the route to a rate-limited, bot-filtered form proxy.
- The apply form is not an identity or bank-data collector. Bank linking (a later step) must go to the provider's hosted flow, never through this site's JS.

## Needed from Chris

1. Meta Pixel ID and Business Manager access (clean one, per the plan); Google tag, GA4 ID and Google Ads conversion labels.
2. The domain, the registrar login (for DNS), and the canonical host choice.
3. A form endpoint: create the Formspree or Basin account, set the notification email, enable the spam filter, and give us the URL. Name the person who receives applications.
4. The brand name, legal entity and ACL number when settled; the real eligibility rule (`team/01_site_spec.md` was missing, so `forms.js` uses placeholder defaults: 18+, citizen/PR/NZ, employed or self-employed, Centrelink not above 50%).
5. A decision on server-side events: who builds the funded-loan feed to Meta CAPI and Google. Without it the gates cannot be measured.
6. Privacy and consent wording signed off (the Privacy Act and credit advertising rules); this plan is not legal advice.
