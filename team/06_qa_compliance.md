# QA and compliance review: Fernbank site

Credit-compliance and copy QA, 8 Nov 2026. HTML read only, no browser. Checked against `01_site_spec.md`, `04_copy_deck.md`, the panel verdict and the regulator and advocate notes. Paths are under `site/docs/`.

## Summary

**Clear with fixes for a private test. Blocked for any public or paid launch.**

The copy follows the deck closely. No prohibited claim appears, the rate-card figures are identical everywhere, and the SACC warning is absent. Three issues block launch: the 48.76% comparison rate exceeds the 48% cap with no visible flag, the landing pages carry no 18+ statement, and about 17 groups of placeholders show to customers. One typo was fixed (apply.html line 71). No numbers or legal wording were changed.

## Findings

| Sev | Page | Line | Issue | Status |
|---|---|---|---|---|
| High | index, rates, apply | idx 81; rates 55, 75; apply estimate | Comparison rate 48.76% is above the 48% cap (open item 3). Only HTML comments flag it; customers see no PLACEHOLDER or counsel flag. Rates page shows it beside "20% to 48%". | Open |
| High | all pages | rates, index, apply | The 73.87% example comparison rate and the 170.74% small-example comparison rate are now shown (48% plus a $400 fee). Counsel to confirm the MACC fee sits outside the 48% cap (NCC s 32B). Supersedes the 48.76% finding above. | Open, counsel |
| High | index, apply | whole page | No "18+" statement. Apply has only the step-2 tick box. The ads rely on the page for Meta's 18+ expectation. | Open |
| High | all | footers etc. | Placeholders render (section 6). | Open |
| Med | rates | 75 vs 80 | In the worked-example table the warning is not directly under the comparison-rate row (it follows the table). The ledger at 55-58 is correct. | Open, copywriter/designer |
| Med | index, how-it-works | idx 134; how 49 | "You see your rate and total before you commit" and the "Check your rate" CTA. Apply shows an estimate at the flat 36% rate, then a callback. | Open, copywriter and counsel |
| Med | faq, index | faq 158; idx 148 | "Will you cut my limit? No." Flat promise; deck says VERIFY: counsel; limit cuts are the advocate's top complaint. | Open, counsel |
| Med | index | 164 | "About 5 minutes" is unmeasured (`APPLY_MINUTES`). | Open |
| Med | tmd | 49-64 | Builder-written body; no real target market; says the PDF "will be linked here". | Open, counsel |
| Med | credit-guide | 49-58 | Builder-written pointer page, not a credit guide; no download. | Open, Mantis |
| Low | privacy | 55, 59-66 | Consent callout links "Privacy Policy" to its own page. Policy body is invented framing with visible "[Mantis legal ...]" brackets. | Open, counsel |
| Low | index | 123 | Bold trust-row title "Licensed credit provider". Panel: licence belongs in the footer. Deck-approved. | Acceptable, watch |
| Low | about | 7, 12 | Meta says "the licensed lender behind Fernbank". Deck wording, not a headline. | Acceptable, watch |
| Low | 404 | 50-52 | Absolute links break on a GitHub Pages project path. | Open, builder |
| Fixed | apply | 71 | Radio `term-3` had `data-error=&quot;...&quot;`, a malformed attribute. Now a valid `data-error="Choose a term between 3 and 12 months."` | Fixed |

## 1. Prohibited claims

Grepped all HTML, `config.js` and the deck's ad copy (section D).

| Term | Result | Verdict |
|---|---|---|
| "no credit check", "bad credit", "instant", "pre-approved", "cash in minutes", "same day", "priced on your bank data" | No hits on any page or ad | Clear |
| "guaranteed" | Only "Approval is not guaranteed" (footers, home, how-it-works, apply) | Acceptable; mandated wording |
| "minutes" | index 164 only (application time, not approval or funding) | Acceptable if measured |
| "quick" | "four quick questions" (how-it-works 49, apply 7, 46) | Acceptable |
| "licensed" | index 123 and 135, about 7 and 12; never a hero | Acceptable, watch |
| "from X%" | None. Every rate appears as "20% to 48%" with the example | Clear |
| Speed or approval promise | Funds and decision times use the config fallbacks; thank-you says "not a loan approval" | Clear |
| Ads P1-P6, H1-H6, D1-D3 | No rate, speed, urgency or approval claim; button "Apply Now" | Clear |

## 2. Mandatory disclosures

- **Comparison-rate warning:** exact spec text directly under the comparison rate on the home strip (index 83), the rates ledger (58) and the apply estimate (90). Exception: the rates table row (above). The footer repeats it on every page; harmless.
- **Licence:** footer of every page, about, credit guide, apply (line 99). The value is the 000000 placeholder.
- **Credit guide:** footer link and "ask us for a copy" on every page, about 62, apply steps 1 and 3.
- **Hardship:** footer on every page, FAQ, hardship.html 48 (spec wording verbatim), thank-you.
- **Complaints and AFCA:** footer, hardship 62-65, FAQ. Phone and web match the spec; the membership number is a placeholder.
- **Bank-data consent:** apply 115 and privacy 55 match the spec word for word.
- **TMD reference:** footer everywhere, eligibility 61, apply steps 1 and 3. Text still "[target market]".
- **SACC warning ("Do you really need a loan today?"):** absent from every page, the deck and the spec. Clear.
- **Responsible-lending statement:** exact spec wording on home (69), how-it-works (56), apply (99) and every footer.

## 3. Rate card consistency

- Example figures: **$3,100, 12 months, 36.00%, $200 fee, $678.24 interest, $331.52 a month, $878.24 cost, $3,978.24 total, 48.76% comparison.** I ran `config.js`; it reproduces the spec. Home and rates static fallbacks match the computed values, and all three surfaces use one function.
- The apply estimate varies with the slider: 43.96% at $5,000 over 12 months, 36.00% at $2,001. Only the $3,100 example exceeds 48%.
- Amount reads **$2,001 to $5,000** in every HTML file and the manifest. No "$2,000" anywhere. Apply input minimum is 2001 (the slider starts at 2100 by design).
- The 48.76% has no visible flag (High finding).

## 4. Eligibility

- Eligibility 57-59 matches deck C4 word for word, including the "only or main income" exclusion. Nothing welcomes Centrelink recipients. The TMD frame also lists government-payment-only applicants as not suited.
- The decline copy (eligibility 64; apply fail screen 134-146) gives the reason, next steps and the National Debt Helpline, and captures no contact details.
- Counsel should know the apply income tick ("regular income from work") is self-declared. It cannot detect a Centrelink-majority applicant until the bank-data step (`forms.js` says so).

## 5. Copy fidelity

| Change | Where | Judgement |
|---|---|---|
| Apply meta description and lede ("Four short steps ... last step") | apply 7, 12, 46 | Fine; accurate |
| FUNDS_TIME sentence dropped | how-it-works 51 | Fine; the config fallback would repeat the sentence before it |
| tmd.html body written | 49-64 | Needs counsel |
| credit-guide.html body written | 49-58 | Needs counsel and Mantis |
| privacy.html full-policy frame (cookies, what we collect) | 59-66 | Needs counsel |
| Summary ledger above the rates worked example | rates 50-58 | Fine; hard-coded range duplicates config |
| Establishment-fee row in the apply estimate | apply estimate | Fine; better disclosure |
| Purpose options (car, dental, bond, other) | apply | Fine; spec asks for an optional select |
| Lead-in "Depending on your situation, we can talk about:" | hardship 51 | Needs copywriter; implies Mantis offers all three (deck: OPS/VERIFY) |
| Hardship line added to thank-you | thank-you 57 | Fine |

Everything else, including titles and meta descriptions, matches the deck.

## 6. Pre-launch blocker list (customer-visible)

1. ACL "000000" (footer, about, apply, credit guide, home).
2. Entity "Mantis Pty Ltd (placeholder)".
3. ABN "00 000 000 000".
4. Address "[Street address, Suburb STATE 0000]".
5. Phone 1300 000 000 and email hello@example.com.au.
6. Hours "[Days and hours, e.g. ...]" (footer, FAQ, hardship, apply).
7. AFCA number "000000" (footer, home, hardship, about).
8. "[target market]" (footer, eligibility, tmd, apply).
9. Late and dishonour fees "[$ amount, or None]" (rates, FAQ, home).
10. Hardship contact "[Name]".
11. Complaint reply "[number] business days".
12. Callback "[response time]".
13. Provider "Basiq (placeholder)" (apply, privacy, FAQ).
14. Credit guide, TMD and privacy are frames; "[Mantis legal ...]" and "will be linked here as a PDF" show.
15. Unmeasured "about 5 minutes".
16. Brand "Fernbank" (no trademark check); `example.github.io/REPO` in canonical, sitemap and CNAME.
17. `FORM_ENDPOINT` and tracking IDs are blank: submit shows the error and sends nothing.

## 7. Meta ad policy

The ads would land on home or apply.

- **Loan disclosure:** the home strip and apply step 1 show the example or estimate, comparison rate and warning. Pass, subject to the flag on the 48.76%.
- **Licence reference:** footer on every page plus apply line 99. Pass once the number is real.
- **18+ statement:** missing from both pages (High).
- **90-day rule:** the 3-month floor sits at Meta's line for loans repayable within 90 days. The deck flags it.
- **"Terms and fees apply"** closes the ads but appears on neither page.

## Items for counsel

1. Does the 48.76% example comply with the 48% cap? May the establishment fee count (open item 3)? Else drop the fee or the rate.
2. A 48.76% comparison rate shown beside a "20% to 48%" range.
3. "Check your rate" and "You see your rate" against an estimate at a flat rate.
4. The FAQ "No" on limit cuts, and the payday-loan answer.
5. TMD, credit guide and privacy frame (credit reporting, overseas disclosure, form service, cookies).
6. The 90-day term floor against Meta policy.
7. A self-declared income tick as the only Centrelink screen before bank data.
8. Licence mentions in the trust row, guide paragraph and about meta.

## Items for the copywriter

1. Add the 18+ and "Terms and fees apply" line to home and apply step 1.
2. Place the warning under the comparison rate in the rates table, or drop that row.
3. Reword the hardship lead-in to promise only options Mantis offers.
4. Measure or cut "about 5 minutes".
5. Remove the self-link to "Privacy Policy" on the privacy page.
6. Reconsider the bold "Licensed credit provider" trust-row title.

## Items added by the offer (8 Nov 2026)

From `reports/Grand slam offer canvas 1.md` section 10.

1. The decision guarantee: wording that it is a decision, not approval; substantiation of the 10 minutes before public launch (RG 234); how the waiver is applied in the contract.
2. The 48-hour change of mind against the contract's termination and early-payout clauses.
3. The good-payer rate as an inducement to re-borrow, and its place in the target market determination.
4. Payday match and the free date move as contract variation terms.
5. Comparison rates above 48% with a $400 fee, and the small-short-loan rows in particular.
6. Whether a soft enquiry is available; if not, remove every "will not affect your credit score" line.
7. Operations must hold the 10-minute clock in business hours, including the manual-review lane, and log every miss so the waiver is paid without the customer asking.
