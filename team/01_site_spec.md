# Site specification: Fernbank personal loan (working title)

Draft for copywriter, designer and builder, 8 Nov 2026. Brand name in one config token (`BRAND_NAME`; no trademark check done). Entity: Mantis, ACL 000000 (PLACEHOLDER). Static HTML on GitHub Pages.

Source key: **[R]** = research reports and panel notes. **[Own]** = my own knowledge, always marked "(verify with counsel)".

## 0. Product in one paragraph

A regulated medium amount credit contract (MACC) of $2,001 to $5,000 over 3 to 12 months, risk-based rate, no early-repayment fee, assessed on bank data. Web-first. Headline benefit: price shown first and a fair process, not speed or "licensed" [R].

**Catch for the team:** the canvas says "$2,000 to $5,000". A $2,000 credit limit of 16 days to 12 months is a small amount credit contract (SACC), with different fee caps and ASIC-set warnings [R: landscape report s 5(1) definition]. Set the minimum at **$2,001** (or $2,100 to leave margin), so no page, ad or form ever offers a SACC. Chris to confirm (open item 2).

## 1. Site map

| # | Page (path) | Purpose | Primary CTA | Legally required? |
|---|---|---|---|---|
| 1 | Home (`/`) | Product, price shown first, rate card summary, 3-step process | Check your rate (to apply) | No; but must carry the comparison-rate warning wherever a rate appears [Own, verify with counsel] |
| 2 | How it works (`/how-it-works`) | Steps, bank connection, repayment, decline reasons | Start application | No |
| 3 | Rates and fees (`/rates-and-fees`) | Full rate card, representative example, comparison rate, all fees | Start application | Effectively yes: the advertised-rate rules require the comparison rate and its warning with any rate shown [Own, verify with counsel] |
| 4 | Eligibility (`/eligibility`) | Who can apply, what is needed | Start application | No; supports DDO target market (see 11) |
| 5 | FAQ (`/faq`) | Customer objections: limits, fees, bank link, hardship | Start application | No |
| 6 | Hardship and complaints (`/help`) | Hardship request route, internal complaints (named person, phone), AFCA details | Contact us (phone first) | Yes: licensees must have internal dispute resolution and AFCA membership, and a hardship process under the National Credit Code [R: panel/landscape; Own, verify with counsel] |
| 7 | About and licence (`/about`) | Who Mantis is, ACL number, ABN, address, contact | Start application | Licence number must appear on the site and in advertising [Own, verify with counsel] |
| 8 | Privacy policy (`/privacy`) | Collection, bank-data use, analytics, overseas disclosure, access and correction | None | Yes: Privacy Act 1988 (Cth) and the Australian Privacy Principles; credit providers also owe credit-reporting notices [Own, verify with counsel] |
| 9 | Credit guide (`/credit-guide`) | Licensee details, fees, complaints | Download | Yes: a licensee must give a credit guide before providing credit assistance or credit [Own, verify with counsel]; the site makes it available, and the real guide is given again at application |
| 10 | TMD summary (`/target-market`) | Plain-English summary of the target market determination, link to full TMD PDF | None | Yes: a TMD must be made and published before distribution, and the distribution conditions bind every ad and page [R: regulator note; Own: Corporations Act Pt 7.8A, verify with counsel] |
| 11 | Apply (`/apply`) | Multi-step stub (section 6) | Continue | No |
| 12 | Thank you (`/thank-you`) | Confirms callback request; fires submit conversion | None | No |
| 13 | 404 (`/404.html`) | Navigation back to home, rates, help | Go home | No |

Footer on every page: legal name, ACL number, links to pages 3, 6, 7, 8, 9, 10, phone, email, address (PLACEHOLDER).

## 2. Rate card (all values for Mantis's pricing committee unless stated)

| Item | Display value | Status |
|---|---|---|
| Amount | $2,001 to $5,000 | Floor is a compliance fix; Chris to confirm |
| Term | 3 to 12 months, equal monthly repayments (fortnightly option aligned to pay cycle is open item) | PLACEHOLDER |
| Representative interest rate | Range 20% to 48% p.a. **always** shown with "Your rate depends on your assessment"; representative rate **36.00% p.a.** | PLACEHOLDER. 20% and 48% are from the canvas [R]; 36% is the advocate's ceiling and the Apple 36% line [R] |
| Establishment fee | $0 on loans under $3,000 (advocate ask); $200 above | PLACEHOLDER. The reports say MACC rules allow up to $400 [R]; I have not verified the cap's mechanics, and whether the fee counts toward the 48% cost cap (verify with counsel) |
| Monthly account fee | None | PLACEHOLDER (recommended: none) |
| Late or default fee | Only a fee Mantis will actually charge, within the caps; state the dollar figure or "None" | PLACEHOLDER |
| Dishonour fee | Dollar figure, or "None" | PLACEHOLDER |
| Early repayment | No fee; interest stops on payoff | Product rule [R] |

**Worked representative example (builder: compute from config, never hard-code).** Borrow $3,100 over 12 months, 36.00% p.a., $200 establishment fee added to the balance. Monthly repayment about $331.52; total repaid about $3,978.24; total cost of credit about $878.24 ($678.24 interest plus $200 fee). **Comparison rate 48.76% p.a.** (my calculation; Mantis finance must confirm). With a $0 fee the figures are $311.43 a month, $3,737.16 total, comparison rate 36.00%.

Warning for the comparison rate (standard wording [Own, verify with counsel]): "WARNING: This comparison rate is true only for the example given and may not include all fees and charges. Different terms, fees or other loan amounts might result in a different comparison rate." Place it directly under every comparison rate.

A 48.76% comparison rate exceeds the 48% cap; counsel must say whether the example complies, else drop the fee or the rate (open item 3).

## 3. Mandatory disclosures and placement

| Disclosure | Text or content | Where |
|---|---|---|
| Comparison rate and warning | As above | Home hero panel, rates page, any page quoting a rate, every ad landing page |
| Representative example | Section 2 example, all figures dollar amounts | Rates page in full; home in short form with link |
| Credit licence | "Mantis Pty Ltd (placeholder) Australian credit licence ACL 000000" | Footer on every page; about page; apply page |
| Credit guide | Link plus "ask us for a copy" | Footer; about; apply step 1 |
| Responsible-lending statement | "Every application is assessed. We check your income, expenses and bank data to confirm you can repay without hardship. Approval is not guaranteed." (NCCP assessment duty [R]; wording own) | Home, how it works, apply |
| Hardship notice | "If you are struggling to repay, tell us early. Call [PLACEHOLDER phone]. We will talk through options." | Help page; footer link; FAQ; confirmation email text |
| Complaints and AFCA | Internal route first; then Australian Financial Complaints Authority, membership number PLACEHOLDER, phone 1800 931 678, afca.org.au (AFCA details from my knowledge, verify before publishing) | Help page; footer |
| Privacy and bank-data consent | See below | Apply step 3; privacy page |
| TMD reference | "This product is designed for [target market]. Read the target market determination." with link | Eligibility, footer, apply step 1 |

Bank-data consent wording (copywriter to polish; Basiq or equivalent, provider name in config): "We use [PROVIDER NAME] to read your bank transactions, read-only, for 90 days. We use them to confirm your income and expenses and assess this application. We cannot move money. You can withdraw consent at any time. See our Privacy Policy." (Consumer data right accreditation of the provider: verify with counsel.)

**Do NOT add the SACC warnings.** SACC advertising and pre-contract materials carry ASIC-set warnings (the "consider alternatives" Centrelink advance, NILS and MoneySmart wording) [R: landscape report; wording Own, verify with counsel]. They apply to credit of $2,000 or less. This product is above that line, so do not add them. If the floor drops to $2,000 or less, the SACC regime applies and the whole spec changes.

The 10% protected-earnings cap and equal-repayment rule are also SACC rules [R]; the advocate asked for the 10% test as policy anyway (open item 5).

## 4. Prohibited and risky claims

| Do not use | Why | Safe alternative |
|---|---|---|
| "No credit check" | ASIC fined Fundo $19,800 (Sep 2026) over this claim; untrue if Mantis pulls a bureau file; s 130 verification issue otherwise [R] | "Every application is assessed." Describe the assessment accurately once credit policy is fixed |
| "Guaranteed approval" | Misleading; responsible lending means some are declined [Own, verify with counsel] | "Apply in about [X] minutes. We tell you the decision and the reasons." |
| "Instant", "approved in minutes" | Speed against assessment is the exposure; Money3, Cash Converters precedents [R] | "Funds usually reach you [X] after approval" only if measured; state conditions |
| "Bad credit OK" as headline | Conflicts with TMD (stable near-prime earners) and signals targeting of vulnerable people [R] | Say who it suits in the eligibility page, not as a hook |
| "Priced on your bank data, not your score" | Reads as no-credit-check; ASIC risk [R panel condition] | "Your rate is set from your income and spending, and your credit history where we use it." (Mantis confirms what it uses) |
| "Licensed lender" as headline | Customers do not value it; it belongs in the footer [R] | Lead with price shown first, no early-repayment fee, a person to call |
| "Rates from 20%" alone | Bait if most approvals land at 36 to 48% [R] | "Rates 20% to 48% p.a. Representative rate 36.00% p.a. Comparison rate 48.76% p.a.*" |
| "Outgrown your pay-advance app", urgency timers | REP 805 migration pattern; pressure [R] | Calm, factual; never name or target pay-advance users |
| Review stars or counts, customer numbers | None exist | Omit (section 8) |

Unexplained limit cuts are the top customer complaint [R]; promise explanations only if operations can deliver them.

## 5. Eligibility criteria to show

- Aged 18 or over; Australian resident (citizen, permanent resident, or visa holder with work rights: Mantis to confirm).
- Regular income from employment, paid into an Australian bank account in your name. Casual and shift workers qualify if bank data shows a steady pattern (threshold: open item 4).
- Centrelink: the panel's advocate asked for the 10% protected-earnings test across all credit [R]. Recommended display: "Government payments count only as additional income and are assessed with your other income; they cannot be your only income for this loan." Mantis to confirm (open item 5).
- An Australian bank account with online banking, for the read-only bank connection and repayments.
- Photo ID (driver licence, passport, or Medicare card [verify]) at the full application stage.
- No credit-score criterion shown; say credit history may be checked only if true (open item 6).

## 6. Apply flow (stub, no origination)

State: held in browser memory (`sessionStorage`) only; nothing sent anywhere except the final contact form. Progress bar; Back on every step.

| Step | Screen | Fields and validation | Fires |
|---|---|---|---|
| 0 | Landing arrival on `/apply` | none | `view_apply` |
| 1 | Loan details | Amount slider/input $2,001 to $5,000 (step $100); term select 3 to 12 months; purpose (optional select). Live indicative repayment shown **with** representative-rate warning, labelled "estimate only" | `start_application` on first interaction |
| 2 | Eligibility check | Checkboxes: 18+, Australian resident, receive regular income, hold an Australian bank account. Any "no" shows a polite end screen with the help-page link and no contact capture | `eligibility_passed` if all yes |
| 3 | Consent | Read-only bank-data consent text (section 3), privacy link, credit guide link, TMD link; unticked checkbox required | `consent_given` |
| 4 | Contact for callback | Name (required); email or mobile (one required; email regex, AU mobile `04XXXXXXXX` or +61); preferred time (optional); tick to agree to be contacted | `submit_application` on success |
| 5 | Submit | POST to form-service placeholder (`FORM_ENDPOINT` in config, e.g. Formspree-type); on 2xx redirect to `/thank-you`; on failure show a loud inline error and a phone number, never a silent fail; log the response to the console | `generate_lead` (GA4 standard name) |

Thank-you page says "A team member will call you to continue your application. This is a request to contact you, not a loan approval." No fake "approved" screen. Amount and term may post as hidden fields; list them in the privacy policy.

### Conversion events

| Moment | Meta Pixel (browser) + Conversions API placeholder | Google Ads | GA4 |
|---|---|---|---|
| Page view of `/apply` | `ViewContent` | none | `view_apply` |
| Step 1 start | `InitiateCheckout` | none | `start_application` |
| Eligibility passed | `CustomEvent: EligibilityPassed` | secondary conversion `eligibility_passed` | `eligibility_passed` |
| Submitted | `Lead` (with shared `event_id`) | primary conversion `submit_application` | `generate_lead`, `submit_application` |

Conversions API: a static site cannot send server events, so keep a documented `capi_payload` stub (event_name, event_id, event_time, hashed email/phone, `fbc`, `fbp`, event_source_url); browser and server events share `event_id`. A funded-loan event comes later from the loan system [R].

## 7. Analytics and testing

- **Config file** `site-config.js`: `BRAND_NAME`, `LEGAL_ENTITY`, `ACL_NUMBER`, `META_PIXEL_ID`, `GOOGLE_TAG_ID` (GA4 and Ads), `GOOGLE_ADS_CONVERSION_LABELS`, `FORM_ENDPOINT`, `BANK_DATA_PROVIDER`, `RATE_CARD` (all section 2 values), `PHONE`, `EMAIL`. Empty ID means the tag does not load.
- **UTM handling:** on first landing, capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid` into first-party storage for 30 days (last non-direct wins) and pass them as hidden fields on the final form. Preserve parameters on internal links.
- **Event names** exactly as in section 6, plus `cta_click` (with `cta_id`), `rate_card_view`, `faq_expand`, `help_page_view`, `phone_click`.
- **Consent banner (my understanding of Australian law; verify with counsel):** Australia has no general opt-in cookie rule like the EU's, but the Privacy Act and the APPs require notice of collection, and a credit provider should be cautious with marketing tags. Recommended: banner with equal-prominence Accept and Reject; analytics and advertising tags load only after Accept; form state runs regardless; choice kept 12 months.
- **Platform fit [R]:** Meta allows loans over 90 days with 18+ targeting, disclosures and the licence shown; Google needs G2RS verification and on-page disclosures. Landing pages show licence and example above the fold or one click away.
- **Test gates** [R]: A$50k over 8 weeks; GO under A$200 per funded loan with 30%+ approval; KILL above A$300 after 80 funded Meta loans. The stub measures lead cost only.

## 8. Accessibility and trust

- WCAG 2.1 AA: 4.5:1 contrast, keyboard-operable forms, visible focus, real labels, errors linked via `aria-describedby`, slider paired with numeric input.
- Plain English: reading grade 7 or below; gloss "ACL" and "TMD".
- `data-testid` on every CTA, step, field and disclosure block.
- Contact: real phone with hours, email, address, ABN (PLACEHOLDER); a named person for hardship and complaints.
- **Reviews:** a placeholder component, hidden until Mantis supplies verified Trustpilot or ProductReview links. No quotes, stars or counts. Customers check reviews before applying [R]; say so in the open items.

## 9. Open items for Chris or Mantis compliance

1. Supply the real ACL number, ABN, address, phone, hours, AFCA membership number, and confirm Mantis's credit authorisation covers a MACC to consumers (verify with counsel).
2. Confirm the $2,001 floor. At $2,000 the SACC regime applies.
3. Confirm the cost cap mechanics: how the 48% cap and the establishment fee interact, and whether the 48.76% worked example complies.
4. Decide the minimum income pattern and the treatment of irregular earners (casuals), so eligibility copy matches credit policy.
5. Decide the Centrelink position and whether to adopt a 10% protected-earnings test as policy.
6. State exactly what the assessment uses (bank data, bureau file or both), so every claim matches reality.
7. Finalise the TMD, including distribution conditions for Meta and Google targeting, and the credit guide.
8. Set the pricing committee's rate card: representative rate, fees, default and dishonour fees, repayment frequency.
9. Pick the bank-data provider and confirm its consent wording and accreditation.
10. Choose the form service and callback process, with a named staffer and a response-time promise that Mantis can keep.
11. Run a trademark check on "Fernbank" and secure domain, Meta and Google accounts.
12. Decide whether to publish arrears, hardship and refinancing rates (advocate asked).
13. Counsel to review the whole site before launch, in particular the (verify with counsel) items above.
