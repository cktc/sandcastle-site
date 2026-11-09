# Sandcastle site (placeholder brand)

Static marketing and application site. Plain HTML, CSS and vanilla JS. No framework, no build step. Served by GitHub Pages from `/docs` on `main`.

## Layout

```
docs/                     everything that gets published
  index.html, *.html      pages (written by the builder)
  assets/css/, assets/js/ styles and scripts
  assets/js/config.js     brand, legal and tracking settings (the one file to edit)
  assets/js/analytics.js  attribution, consent, track()
  assets/js/forms.js      apply-form steps, validation, eligibility, submit
  404.html  robots.txt  sitemap.xml  site.webmanifest
  .nojekyll               stops Pages running Jekyll over the files
  CNAME.example           rename to CNAME when a domain exists
team/                     specs and plans (not published)
```

Only `docs/` is public. Keep anything internal in `team/`.

## Run locally

```bash
cd docs && python3 -m http.server 8000
```

Open http://localhost:8000. Add `?debug=1` to any URL to log every tracking call to the console. All pages use relative paths (`assets/css/...`, `rates.html`), so they work locally and on `github.io/<repo>/` alike. `404.html` also uses relative paths (`assets/...`, `index.html`), so it is styled at the `/REPO/` root. GitHub serves it at any depth, so on a 404 at a nested path its relative links break. A custom domain works either way; at the domain root the relative paths resolve correctly.

## Enable GitHub Pages

1. Push the repo to GitHub with `docs/` on `main`.
2. Settings, Pages, Source: "Deploy from a branch", Branch: `main`, folder `/docs`, Save.
3. The site appears at `https://<user>.github.io/<repo>/` within a minute or two. A 404 at a nested path looks right only on a custom domain (see above).

## Custom domain

1. Rename `docs/CNAME.example` to `docs/CNAME`. One line, bare host, no comments: `www.yourdomain.com.au`.
2. At the registrar, add DNS records:
   - `www`: `CNAME` to `<user>.github.io`.
   - Apex (`yourdomain.com.au`): four `A` records, `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; optionally four `AAAA` records starting `2606:50c0:8000::153`. Check GitHub's current list in their custom-domain docs before launch.
3. Settings, Pages, Custom domain: enter the host and save. Wait for the DNS check to pass.
4. Tick "Enforce HTTPS" once the certificate is issued (can take up to an hour). Do not launch ads before it is ticked.
5. Pick one canonical host (`www` suggested). GitHub redirects the other to it when both are set up. Use that host in `<link rel="canonical">`, `sitemap.xml` and `robots.txt`.

## Change the brand and IDs

Edit `docs/assets/js/config.js` only: `BRAND_NAME`, `LEGAL_ENTITY`, `ACL_NUMBER`, contact details, `META_PIXEL_ID`, `GOOGLE_TAG_ID`, `GA4_MEASUREMENT_ID`, `FORM_ENDPOINT`, `CONSENT_REQUIRED`. Page text uses `<span data-cfg="BRAND_NAME"></span>`, filled at load. Static things JS cannot reach (titles, meta tags, JSON-LD, `site.webmanifest`, `sitemap.xml`, `robots.txt`) must be changed by find and replace; the pre-launch checklist covers them.

## Favicons without binary files

Use an inline SVG data URI in every page head, and the same one in the manifest:

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230f5c4d'/%3E%3C/svg%3E">
```

Safari ignores SVG icons for the home screen. That is accepted: there is no `apple-touch-icon` PNG.

## Deploy

```bash
git add -A && git commit -m "Describe the change" && git push origin main
```

Pages rebuilds in about a minute. Check Actions, "pages build and deployment", if it does not appear. Hard-refresh to bypass the CDN cache (10 minutes).

## Pre-launch blockers

Copied from `team/06_qa_compliance.md` section 6, plus the open counsel and copy items. All of these show to customers or affect compliance.

- [ ] Market brand clearance replaces the Sandcastle name. A third party holds the SANDCASTLE FINANCE trade mark; Sandcastle is a working name only. Then find and replace the brand everywhere (see the checklist below).
- [ ] Remove the prototype banner (`data-testid="prototype-banner"`, `.proto-banner` in `components.css`, on all 13 pages) and the `noindex, nofollow` robots meta, and restore `Allow: /` in `robots.txt`, only at launch. `thank-you.html` keeps its `noindex`.
- [ ] ACL "000000" (footer, about, apply, credit guide, home).
- [ ] Entity "Mantis Pty Ltd (placeholder)".
- [ ] ABN "00 000 000 000".
- [ ] Address "[Street address, Suburb STATE 0000]".
- [ ] Phone 1300 000 000 and email hello@example.com.au.
- [ ] Hours "[Days and hours, ...]" (footer, FAQ, hardship, apply).
- [ ] AFCA membership number "000000" (footer, home, hardship, about).
- [ ] Target market text "[target market]" (footer, eligibility, tmd, apply).
- [ ] Late and dishonour fees "[$ amount, or None]" (rates, FAQ, home).
- [ ] Provider "Basiq (placeholder)" (apply, privacy, FAQ).
- [ ] Hardship contact "[Name]", complaint reply "[number] business days", callback "[response time]".
- [ ] Credit guide, TMD and privacy are frames: "[Mantis legal ...]" and "will be linked here as a PDF" show. Link the real PDFs.
- [ ] Tracking IDs (Meta, Google tag, GA4) and `FORM_ENDPOINT` are blank; the submit shows an error and sends nothing.
- [ ] Counsel sign-off on the comparison rates shown at 48% plus the establishment fee ($250 under $3,500, $400 from $3,500): 59.67% on the $3,100 over 18 months example, 92.85% on the $2,001 over 6 months example. Confirm the MACC establishment fee sits outside the 48% annual cost rate cap (NCC s 32B). Then remove the `.placeholder-note` lines.
- [ ] Counsel on the "Check your rate" CTA and "You see your rate" wording against a flat-rate estimate.
- [ ] Counsel on the FAQ "Will you cut my limit? No." answer.
- [ ] Measure or cut "about 5 minutes" (`APPLY_MINUTES`).
- [ ] Measure the 10-minute decision time and the waiver process before any public claim (`DECISION_PROMISE_MINUTES`, `DECISION_TIME`).
- [ ] Counsel on the 48-hour change of mind and the good-payer rate.
- [ ] Counsel on the 6-month minimum term against Meta's 90-day rule for loans repayable within 90 days. Advocate and counsel review of the 6 to 18 month range (a longer term costs more total interest).

## Pre-launch checklist

- [ ] `config.js` filled in: brand, legal entity, ACL number, contact details, all IDs, `FORM_ENDPOINT`.
- [ ] The `action` on the apply `<form>` (`https://formspree.io/f/PLACEHOLDER`) matches `FORM_ENDPOINT` in `config.js`. It is the target for a no-JS native post.
- [ ] Domain live, HTTPS enforced, `CNAME` committed, canonical host chosen.
- [ ] Find and replace `https://example.github.io/REPO/` (the placeholder base, with trailing slash) in every canonical, `og:url`, JSON-LD, `sitemap.xml` and `robots.txt`.
- [ ] Find and replace the brand `Sandcastle` in every `<title>`, meta description, `og:` tag and JSON-LD block, and in `site.webmanifest` (JS cannot reach these; crawlers need the literal name). Also replace placeholder contact values in the JSON-LD on `index.html` and `faq.html`.
- [ ] If the form service is not Formspree, change `https://formspree.io` in the CSP `<meta>` of every page.
- [ ] Consent banner calls `Consent.set(true|false)`; with `CONSENT_REQUIRED` true, nothing loads before accept (check the Network tab).
- [ ] Test the funnel with `?debug=1&utm_source=meta&utm_campaign=test&fbclid=x`: events fire in order, hidden fields carry UTMs into the form submission.
- [ ] Meta Events Manager (Test Events) and GA4 DebugView show `ViewContent`, `InitiateCheckout`, `Lead`, `CompleteRegistration` / `begin_checkout`, `qualify_lead`, `generate_lead`.
- [ ] A real submission reaches the form service, emails the team, and lands on `thank-you.html`.
- [ ] `thank-you.html` has `noindex` (until launch every page has `noindex, nofollow`); every other page has unique title, description, canonical.
- [ ] 404 page works at a deep URL; Lighthouse mobile above 90 on home and apply; HTML plus CSS under 100KB.
- [ ] Footer on every page: legal entity, ACL number, credit guide link, hardship link, privacy link.
- [ ] Privacy policy names Meta, Google and the form service, and says what is collected.
- [ ] Eligibility rules in `forms.js` match the product spec (defaults are placeholders).

## Build notes (pages, tokens, apply flow)

- **Pages:** `index, how-it-works, rates, eligibility, faq, hardship, about, privacy, credit-guide, tmd, apply, thank-you, 404`. The spec's paths map to these files (`/rates-and-fees` is `rates.html`, `/help` is `hardship.html`, `/target-market` is `tmd.html`). The header, footer and consent banner are repeated in each file, so change them in all 13 (find and replace).
- **Tokens:** every `{{TOKEN}}` in the copy deck is `<span data-cfg="KEY">placeholder</span>`, filled by `analytics.js` from `config.js`. New keys include `ABN, ADDRESS, PHONE, PHONE_TEL, EMAIL, HOURS, HARDSHIP_CONTACT, COMPLAINT_REPLY_TIME, CALLBACK_TIME, AFCA_*, NDH_*, PROVIDER, RATE_*, ESTAB_FEE_*, LATE_FEE, DISHONOUR_FEE, EXAMPLE_*, COMPARISON_RATE_EXAMPLE, FUNDS_TIME, DECISION_TIME, APPLY_MINUTES`. `CONTACT_EMAIL` and `CONTACT_PHONE` became `EMAIL` and `PHONE`. Links use `data-cfg-href="tel:{PHONE_TEL}"`.
- **Rate card numbers:** edit the `CARD` object at the top of `config.js`. The worked example, comparison rate and the apply-form estimate are computed from it (`window.RATE_CALC`), never typed. Literal "$2,001 to $5,000" and "6 to 18 months" in the copy are text and must be changed by hand if `CARD` changes.
- **Check before every deploy:** `python3 team/check_links.py`.
- **Tracking names:** spec s 6 names map to `analytics.js` events: `view_apply` is `page_view` on apply, `start_application` is `apply_start`, `submit_application` and `generate_lead` are `apply_submitted`. Added: `consent_given, cta_click, phone_click, faq_expand, rate_card_view, help_page_view`. `eligibility_failed` reasons are now `age, residency, income, bank_account`.
- **Apply flow:** four steps (loan details, four tick-box eligibility questions, bank-data consent, callback contact). Field names are in the header of `forms.js`. Amount, term and purpose are kept in `sessionStorage`; nothing else is stored.

## Test the apply flow locally

1. `cd docs && python3 -m http.server 8000`, open `http://localhost:8000/apply.html?debug=1&utm_source=meta&utm_campaign=test`.
2. Accept the banner so events fire (`debug=1` logs them to the console either way).
3. Untick one eligibility box: the "We cannot go further today" screen names that statement; "Go back" returns to step 2.
4. With `FORM_ENDPOINT` blank, submitting shows the inline error with the phone number and logs the cause. Put a real Formspree URL in `config.js` to see the redirect to `thank-you.html` and the UTM hidden fields in the payload.
