# Copy deck: {{BRAND}} personal loan

Draft for builder and reviewer, 8 Nov 2026. Binding: `01_site_spec.md` (claims, mandatory wording), `02_design_system.md` (components). Australian spelling, Year 8 level.

**Flags.** `[PLACEHOLDER]` = undecided value; pull from `RATE_CARD` config, never type it. `[VERIFY: counsel]` = spec says verify with counsel. `[OPS]` = promise Mantis operations must keep.

**Tokens.** Every `{{TOKEN}}` is a `site-config.js` key (rate-card and example figures live in `RATE_CARD`). Builder: list unused or missing keys at build and fail loudly.

**Standing warning (WARN).** Place directly under every comparison rate: "WARNING: This comparison rate is true only for the example given and may not include all fees and charges. Different terms, fees or other loan amounts might result in a different comparison rate." `[VERIFY: counsel]`

---

## A. BrandScript

| SB7 element | {{BRAND}} |
|---|---|
| **1. Character (hero)** | A working Australian, 25 to 50, steady pay, no room for a surprise. Wants to cover a $2,001 to $5,000 cost and know what it will cost. |
| **2. Has a problem** | **Villain:** the price of a bad week (car fails, tooth cracks, bond due). **External:** a big bill lands before the savings do. **Internal:** they feel rushed and fear the fine print. **Philosophical:** a loan should show its full cost before you sign. |
| **3. Meets a guide** | {{BRAND}}, a loan from Mantis. **Empathy:** "You did not plan for this. You should not be rushed." **Authority:** Mantis holds an Australian credit licence ({{ACL_NUMBER}}); every application is assessed; AFCA covers complaints. |
| **4. Who gives them a plan** | Process: check your rate, choose your repayments, get your money. Agreement: total shown first, no early-repayment fee, a reason with any decline, a person to call. |
| **5. And calls them to action** | Direct: **Check your rate.** Transitional: **See the full rate card.** |
| **6. That helps them avoid failure** | Paying a price they only learn after signing. A repayment that squeezes rent and food. A decline with no reason. |
| **7. And ends in success** | One bill paid, a fixed repayment, a known end date, and a lower cost if they pay early. |

## B. One-liner

**Main (problem, solution, result):** "A big bill can land before the savings do, and the price you hear in a rush is hard to check. {{BRAND}} shows the total you will repay first, so you borrow knowing the cost and the end date."

Alternates:
1. "Car repair, dental work, rental bond: borrow $2,001 to $5,000 and see the total before you apply."
2. "A fixed repayment you can plan around, and the full cost shown up front."
3. "A bad week should not set the price. See what you would repay, then decide."

---

## C. Page copy

### C1. Home (`/`)

**Meta title:** {{BRAND}} personal loan: see the total first
**Meta description:** Borrow $2,001 to $5,000 over 3 to 12 months. See the total you repay before you apply. Every application is assessed.

**Header (section 1).** Direct CTA (`.btn--sm`): Check your rate. Transitional CTA (nav link): See the full rate card (`/rates-and-fees`). Hero image: a person with the repair, dental or bond bill paid, no product shots `[design to supply]`.

**Hero `h1.display` (8 words):** Know what you will repay before you apply.

**Hero `p.lede`:** A personal loan of $2,001 to $5,000, over 3 to 12 months. You see the total first. Your repayments are equal, so you can plan around them. `[PLACEHOLDER: "equal" assumes monthly]`

**Primary CTA (`.btn--primary`):** Check your rate

**`.hero__note`:** Every application is assessed. We check that you can repay without hardship. Approval is not guaranteed. (Add "will not affect your credit score" only if Mantis confirms it, open item 6.)

**"What it costs" strip (`.cost-strip`, ledger rows):**
- Heading: What it costs
- You borrow ···· {{EXAMPLE_AMOUNT}}
- Over ···· {{EXAMPLE_TERM}}
- Each month you repay ···· {{EXAMPLE_MONTHLY}}
- Interest rate ···· {{RATE_REP}} p.a.
- Comparison rate ···· {{COMPARISON_RATE_EXAMPLE}} p.a.*
- **You repay in total ···· {{EXAMPLE_TOTAL}}** (last row, heaviest)
- WARN, directly under the comparison rate.
- `.cost-strip__foot`: "Example only. Your rate depends on your assessment. Rates range from {{RATE_MIN}} to {{RATE_MAX}} p.a. See the full rate card." (link to `/rates-and-fees`) `[PLACEHOLDER all figures]`

**Framing line above the strip:** "One real example, every dollar shown. Your numbers may differ."

**Stakes section (`h2`):** The price of a bad week
Body:
"The car fails its roadworthy. A tooth cracks. The bond on the new place is due before the old one comes back.

In a rush, it is easy to take the first offer and find the real cost later. That leaves you worried about the fine print and about the next payment.

A loan should show its full cost before you sign. You should not have to guess."

Failure line: "Without the total, you can sign for a price you only learn later." Success line: "With it, you pay one bill and know the end date."

**Value stack (section 3, outcomes as bullets, `ul`):**
- You see the total in dollars before you apply.
- Every repayment is the same, so you can plan your pay around it.
- Pay early and pay no early-repayment fee.
- If we say no, we tell you why.

**Guide (section 4).** `h2`: We know a surprise bill is stressful. Empathy: "You did not plan for this and should not be rushed." Authority: "{{BRAND}} is a loan from Mantis, an Australian credit licensee ({{ACL_NUMBER}}). Every application is assessed, and AFCA covers complaints." The trust row follows. No reviews, stars or counts until Mantis supplies verified links (spec s 8).

**Three-step plan (`ol.steps`):** `h2`: How it works in three steps
1. **Check your rate.** Tell us the amount and term. Connect your bank, read-only. Answer a few questions. You see your rate and total before you commit.
2. **Choose your repayments.** Pick 3 to 12 months. Each repayment is the same. Repay early and pay no early-repayment fee.
3. **Get your money.** Once approved and signed, {{FUNDS_TIME}}. `[PLACEHOLDER: only if measured; else "We pay it into your bank account once you accept."]`

**Trust row (inside the guide section; labels):**
- Licence: **Licensed credit provider** / Mantis, {{ACL_NUMBER}} *(trust row only)*
- AFCA: **Independent complaints help** / Member of AFCA, {{AFCA_MEMBER_NO}}
- Hardship: **Talk to us early** / A person to call if repayments get hard
- No early-repayment fee: **Repay early, pay less interest** / No fee to pay off sooner

**Explanatory paragraph (section 6, collapsed under "Read more"):** "{{BRAND}} is a personal loan of $2,001 to $5,000 from Mantis, over 3 to 12 months with equal repayments. Your rate is set from your income and spending, and your credit history where we use it. Every application is assessed. You see the rate, repayment and total before you accept. Repay early with no fee." `[open item 6: confirm assessment inputs]`

**FAQ teaser (`h2`):** Questions people ask first
Three `<details>`: will you cut my limit, what if I miss a payment, is this a payday loan (short answers from C5). Link: See all questions.

**Closing CTA band:** `h2` See your total before you decide. `p` Do not let the price of a bad week choose for you. It takes about {{APPLY_MINUTES}} minutes. You can stop at any step. `[PLACEHOLDER: measure]` Button: Check your rate

**Footer (junk drawer, every page):** links to rates and fees, help, about, privacy, credit guide, target market, cookie settings; {{LEGAL_ENTITY}}, ACL {{ACL_NUMBER}}, ABN {{ABN}}, {{ADDRESS}}, {{PHONE}}, {{EMAIL}}; every application is assessed; WARN; hardship {{PHONE}}; AFCA 1800 931 678, afca.org.au `[VERIFY]`.


---

### C2. How it works (`/how-it-works`)

**Meta title:** How a {{BRAND}} loan works in three steps
**Meta description:** Check your rate, choose your repayments, get your money. See how the bank link works and what a decline tells you.

**h1:** How it works

**Step 1: Check your rate.**
"Pick $2,001 to $5,000 and 3 to 12 months. Answer four quick questions. Connect your bank, read-only. You see your rate, repayment and total."

**Step 2: Choose your repayments.**
"Every repayment is the same. You pick the term that suits your pay. Pay off early whenever you like: no early-repayment fee, and interest stops."

**Step 3: Get your money.**
"If you are approved, you read your contract and accept it. We pay the money into your bank account. {{FUNDS_TIME}}." `[PLACEHOLDER; only if measured]`

**Section: How we assess you**
"Every application is assessed. We check your income, expenses and bank data to confirm you can repay without hardship. Approval is not guaranteed." *(spec wording, verbatim)*
"Your rate is set from your income and spending, and your credit history where we use it." `[OPS / open item 6: Mantis must confirm exactly what it uses]`

**If we say no:** "We tell you why, in plain words, and what you can do next." (link `/eligibility#decline`) `[OPS]`

**CTA:** Start application

---

### C3. Rates and fees (`/rates-and-fees`)

**Meta title:** Rates and fees: see every dollar | {{BRAND}}
**Meta description:** Full rate card, a worked example and the comparison rate. Rates {{RATE_MIN}} to {{RATE_MAX}} p.a. No early-repayment fee. `[PLACEHOLDER]`

**h1:** Rates and fees
**Lede:** Here is the whole price. We put the total first because that is the number that matters.

**Worked example (`.rate-card`).** "Your rate depends on your assessment. This shows how the numbers work."
- Amount borrowed: {{EXAMPLE_AMOUNT}}
- Term: {{EXAMPLE_TERM}}
- Establishment fee: {{EXAMPLE_FEE}}
- Interest: {{EXAMPLE_INTEREST}}
- Monthly account fee: None `[PLACEHOLDER]`
- Each month you repay: {{EXAMPLE_MONTHLY}}
- **You repay in total: {{EXAMPLE_TOTAL}}**
- Total cost of credit: {{EXAMPLE_COST}}
- Interest rate used in this example: {{RATE_REP}} p.a.
- Comparison rate: {{COMPARISON_RATE_EXAMPLE}} p.a.*
- WARN

**Section: Our rate range**
"Rates run from {{RATE_MIN}} to {{RATE_MAX}} p.a., depending on your assessment. The example uses {{RATE_REP}} p.a." `[PLACEHOLDER]`

**Section: Every fee**
- Establishment fee: {{ESTAB_FEE_UNDER_3000}} on loans under $3,000. {{ESTAB_FEE_OVER_3000}} on loans of $3,000 or more. `[PLACEHOLDER; cap interaction: open item 3, VERIFY: counsel]`
- Late fee: {{LATE_FEE}}.
- Dishonour fee: {{DISHONOUR_FEE}}. `[PLACEHOLDER: dollar figure or "None"]`
- Early repayment: No fee.

**CTA:** Start application

---

### C4. Eligibility (`/eligibility`)

**Meta title:** Who can apply for a {{BRAND}} loan
**Meta description:** Check the simple requirements, who we cannot lend to and why, and what a decline tells you.

**h1:** Who can apply

**You can apply if you:**
- are 18 or over
- are an Australian resident (citizen, permanent resident, or visa holder with work rights) `[VERIFY: Mantis to confirm visa rule]`
- have regular income from work, paid into an Australian bank account in your name. Casual and shift workers can apply if bank data shows a steady pattern. `[PLACEHOLDER: threshold, open item 4]`
- have an Australian bank account with online banking
- can show photo ID (driver licence, passport or Medicare card) at the full application `[verify]`

**Who we cannot lend to, and why**
"We cannot lend to you if government payments are your only or main income. A repayment on top could leave you short for rent and food. Government payments can count as extra income, assessed with your other income." `[Centrelink position, open item 5. Never soften to "may be eligible" or welcome Centrelink recipients.]`
"We also cannot lend if we cannot confirm you can repay without hardship. That protects you." 

**Who this loan is designed for** (TMD, short form): "This product is designed for [target market]. Read the target market determination." (link `/target-market`) `[PLACEHOLDER text from final TMD; VERIFY: counsel]`

**What a decline will tell you** (`id="decline"`)
"If we say no, we tell you the main reason, such as: your income could not be confirmed, the repayment looked too high against your spending, or an identity check failed. We also say what to do next, like a smaller amount or longer term, if that would help." `[OPS: reasons must come from real decline codes; keep only examples Mantis can deliver.]`

**CTA:** Start application

---

### C5. FAQ (`/faq`)

**Meta title:** {{BRAND}} loan FAQ: fees, limits, missed payments
**Meta description:** Straight answers on cost, missed payments, bank links, early repayment and what a decline means.

Twelve questions in `<details class="faq__item">`.

1. **How much will I actually pay back?** "You see the total in dollars before you apply, and again in your contract. See our worked example on the rates page." `[PLACEHOLDER]`
2. **Will you cut my limit?** "No. Your loan amount is set in your contract. We cannot reduce it or call it back once you accept, as long as you keep to the contract." `[VERIFY: counsel]`
3. **What happens if I miss a payment?** "Tell us early. Call {{PHONE}}. You may pay a late fee of {{LATE_FEE}} and interest on the unpaid amount. We will talk through options, such as a new date. You can go to AFCA if you disagree." `[PLACEHOLDER fees; OPS options]`
4. **Is this a payday loan?** "It is a personal loan of $2,001 to $5,000 over 3 to 12 months, with equal repayments. You repay it with interest and fees. It is not an advance on your next pay." `[VERIFY: counsel before any flat "No".]`
5. **Why do you need my bank login?** "You never give us your password. You use {{PROVIDER}} to share your transactions, read-only, for 90 days. We use them to confirm income and spending. We cannot move money. You can withdraw consent any time." `[VERIFY: counsel]`
6. **What do you check?** "Your income, expenses and bank data, and your credit history where we use it." `[open item 6: must match reality]`
7. **Can I pay off early?** "Yes. There is no early-repayment fee, and interest stops when you pay off."
8. **What if I am a casual or shift worker?** "You can apply. We look for a steady pattern in your bank data, not identical pays."
9. **What if you say no?** "We tell you why and what you can do next."
10. **How long until I know?** "{{DECISION_TIME}}. We tell you the decision and the reasons." `[PLACEHOLDER: only if measured]`
11. **I am struggling to pay. Who do I talk to?** "Call {{PHONE}}, {{HOURS}}. You will talk to a person."
12. **How do I make a complaint?** "Call or write to us first. If you are not happy, you can go to AFCA, free and independent: 1800 931 678, afca.org.au." `[VERIFY: AFCA details]`

**CTA below FAQ:** Start application

---

### C6. Hardship and complaints (`/help`)

**Meta title:** Hardship and complaints | {{BRAND}}
**Meta description:** Struggling to repay? Call a person. Learn how to make a complaint and how to reach AFCA.

**h1:** If you are struggling to repay
"If you are struggling to repay, tell us early. Call {{PHONE}}. We will talk through options." *(spec wording, verbatim)*

**What we can talk about** `[OPS / VERIFY: counsel — list only what Mantis offers]`: a change to repayment dates, a smaller repayment over a longer time, a short pause while your income recovers.

**Who you will speak to:** [NAME], hardship contact. {{PHONE}}, {{HOURS}}. Email {{EMAIL}}. `[PLACEHOLDER: named person is a spec requirement]`
"For free financial counselling, call the National Debt Helpline on 1800 007 007." `[verify]`

**Make a complaint**
1. Tell us. Call {{PHONE}} or email {{EMAIL}}. We will reply within [PLACEHOLDER days]. 
2. If we do not fix it, or you are unhappy with our answer, go to AFCA, the Australian Financial Complaints Authority. It is free and independent. Phone 1800 931 678. Web afca.org.au. Our AFCA membership number is {{AFCA_MEMBER_NO}}. `[VERIFY: AFCA details before publishing]`

**CTA:** Call {{PHONE}} (`phone_click`)

---

### C7. About and licence (`/about`)

**Meta title:** About {{BRAND}} and Mantis, our lender
**Meta description:** Mantis is the licensed lender behind {{BRAND}}. Licence, ABN, address and a phone number.

**h1:** Who stands behind {{BRAND}}
**Lede:** You are borrowing from a real company, with a real address and a phone that gets answered.

"A big bill is stressful. We built {{BRAND}} to show the price first, so you can decide with a clear head." *(empathy)*
"{{BRAND}} is a loan from Mantis. Mantis holds an Australian credit licence and is a member of AFCA. Every application is assessed." *(authority)*

**Details (ledger rows):** Lender {{LEGAL_ENTITY}}; Australian credit licence {{ACL_NUMBER}}; ABN {{ABN}}; Address {{ADDRESS}}; Phone {{PHONE}} ({{HOURS}}); Email {{EMAIL}}; AFCA member {{AFCA_MEMBER_NO}}.

Links: credit guide (`/credit-guide`), "ask us for a copy". **CTA:** Start application. `[PLACEHOLDER all details; open item 1. VERIFY: counsel that "licensed" appears only here, in the footer and in the trust row.]`

---

### C8. Privacy summary and bank-data consent (`/privacy`)

**Meta title:** Privacy policy | {{BRAND}}
**Meta description:** What we collect, how we use your bank data, who sees it, and how to access or correct it.

**Plain-English summary (top of page, before the full policy):**
- "We collect what you tell us and, with your consent, your bank transactions. We use them to assess your application and run your loan."
- "Bank data is read-only, for 90 days. We cannot move your money. You can withdraw consent at any time."
- "You can ask to see or correct what we hold. Contact {{EMAIL}}."
Full policy follows `[Mantis legal to supply; VERIFY: counsel — APP, credit-reporting and overseas-disclosure notices]`.

**Bank-data consent (mandatory wording, spec s 3, verbatim):**
"We use {{PROVIDER}} to read your bank transactions, read-only, for 90 days. We use them to confirm your income and expenses and assess this application. We cannot move money. You can withdraw consent at any time. See our Privacy Policy." `[VERIFY: counsel — provider accreditation and wording]`

---

### C9. Apply flow microcopy (`/apply`)

Progress: "Step 1 of 4". Every step has a Back button.


**Step 1: Loan details**
- Amount label: How much do you want to borrow? Helper: Between $2,001 and $5,000, in steps of $100.
- Term label: How long do you want to repay over? Helper: 3 to 12 months. Longer means smaller repayments and more interest.
- Estimate panel heading: Your estimate. Rows: Each month ···· $X; Total you would repay ···· $Y; Interest rate used ···· {{RATE_REP}} p.a.; Comparison rate ···· {{COMPARISON_RATE_EXAMPLE}} p.a.*; WARN. Foot: "Estimate only. Your rate depends on your assessment."
- Button: Continue
- Errors: "Enter an amount between $2,001 and $5,000." / "Choose a term between 3 and 12 months."

**Step 2: Eligibility check**
- Heading: A few quick questions. Helper: Tick each one that is true.
- Checkboxes: I am 18 or over. / I live in Australia and can work here. / I get regular income from work. / I have an Australian bank account in my name.
- Button: Continue

**Eligibility-fail screen (`h2`):** We cannot go further today
"We cannot offer this loan right now. The reason: [dynamic: the statement left unticked, e.g. \"you need to be 18 or over\"]. This is not a judgement on you. We need all four to be true so we can check you can repay."
Next steps: go back if you ticked by mistake; read who can apply (`/eligibility`); for free help with bills, call the National Debt Helpline on 1800 007 007 `[verify]`.
Buttons: Go back / Read who can apply. No contact capture. `[PLACEHOLDER: dynamic reason mapping per statement]`

**Step 3: Consent**
- Heading: Share your bank data, read-only
- Body: mandatory wording from C8, verbatim.
- Checkbox: I have read and agree to this, the Privacy Policy and the target market determination. Links: privacy, credit guide, `/target-market`.
- Error: "Tick the box to continue. We cannot assess your application without it." Button: Continue

**Step 4: Contact for a callback**
- Heading: Where should we reach you?
- Name label: Your name. Error: "Enter your name."
- Email label: Email. Mobile label: Mobile. Helper: Give one of these. Mobile example: 0412 345 678.
- Errors: "Enter an email like name@example.com." / "Enter an Australian mobile, such as 0412 345 678." / "Give an email or a mobile."
- Best time to call (optional). Helper: {{HOURS}}.
- Checkbox: I agree that {{BRAND}} can contact me about this application.
- Error: "Tick the box so we can call you."
- Button: Send my request. While sending: Sending...

**Submit failure message (`.alert--error`, `role="alert"`):** "We could not send your request. Nothing has been lost. Try again, or call {{PHONE}} and we will take it by phone." Buttons: Try again. `[Console log raw response, per spec.]`

**Success message:** see C10.

---

### C10. Thank-you page (`/thank-you`)

**Meta title:** Request received | {{BRAND}}
**Meta description:** We have your request. A team member will call you to continue your application. `[noindex]`

**h1:** We have your request
"A team member will call you to continue your application. This is a request to contact you, not a loan approval." *(spec wording, verbatim)*
**Next steps:** expect a call from {{PHONE}} within [PLACEHOLDER: response time Mantis can keep, open item 10]; have photo ID ready; we assess your application and tell you the decision and the reasons. "Nothing is signed yet."

---

### C11. 404 (`/404.html`)

**Meta title:** Page not found | {{BRAND}}
**Meta description:** We could not find that page. Go home, see rates and fees, or get help. `[noindex]`

**h1:** We cannot find that page
"The link may be old, or the address may have a typo. Try one of these."
Links: Go home / Rates and fees / Hardship and help

---

### C12. Consent banner (`.consent`)

"We use cookies to measure the site and to show our ads to the right people. We set analytics and advertising cookies only if you accept. The site works either way. See our Privacy Policy."
Buttons (equal weight): **Accept** / **Reject**. "Manage" opens unticked Analytics and Advertising boxes. Footer link: Cookie settings. `[VERIFY: counsel]`

---

### C13. Confirmation email / SMS

**Email subject:** We have your {{BRAND}} request
**Email body:**
Hey [first name],

We have your request for a loan of $X over Y months. A team member will call you from {{PHONE}} to continue your application.

This is a request to contact you, not a loan approval. Every application is assessed, and approval is not guaranteed.

If you are struggling to repay, tell us early. Call {{PHONE}}.

{{BRAND}} is a loan from {{LEGAL_ENTITY}}, Australian credit licence {{ACL_NUMBER}}.

**SMS (under 160 characters):** "{{BRAND}}: We have your loan request. We will call you from {{PHONE}}. This is not an approval. Reply STOP to opt out." `[PLACEHOLDER: SMS opt-out wording to match provider; VERIFY: counsel on Spam Act]`

---

### C14. Remaining pages

Credit guide: "Credit guide | {{BRAND}}" / "Our credit guide: who we are, what we charge and how to complain." Target market: "Who this loan is for | {{BRAND}}" / "A plain-English summary of who {{BRAND}} is designed for, with a link to the full determination."

---

## D. Meta ad copy

Rules: each ad says it is a loan and 18+; no rates, speed, "no credit check", "guaranteed", "instant", urgency, pay-advance targeting or review claims. Button: **Apply Now** (not "Learn More"). **Flag: Meta bans loans repayable within 90 days.** The term floor is 3 months, so ads say "up to 12 months"; counsel to confirm before launch. `[VERIFY: counsel]` Every primary text ends with: "Credit provided by Mantis, ACL {{ACL_NUMBER}}. Applicants must be 18+. Every application is assessed. Terms and fees apply."

**Primary texts**

| # | Angle | Primary text |
|---|---|---|
| P1 | Car repair | The mechanic's quote just landed. Before you say yes to any loan, see the total you would repay. {{BRAND}} personal loans, $2,001 to $5,000, up to 12 months. 18+. |
| P2 | Car repair | Rego, a new clutch, a set of tyres. A loan is a big decision. {{BRAND}} shows you what you repay in total before you apply. Applicants must be 18+. |
| P3 | Dental | A cracked tooth is a bad week for your budget too. {{BRAND}} personal loans from $2,001 to $5,000. See your total repayment before you apply. 18+. |
| P4 | Dental | Dental work can cost more than you planned. If you are thinking of a loan, see the whole cost first, with equal repayments over up to 12 months. 18+. |
| P5 | Rental bond | New place, bond due. Borrow $2,001 to $5,000 over up to 12 months, with the total shown before you apply. 18+. |
| P6 | Fixed repayment | One loan, equal repayments, a date it ends. {{BRAND}} shows your total repayment first, so you can plan your pay around it. 18+. |

**Headlines (under 40 characters where possible)**
- H1: See the total before you apply
- H2: Car bill? See what you would repay
- H3: Dental work, one clear repayment
- H4: Rental bond loan, total shown first
- H5: Equal repayments you can plan around
- H6: A loan with the cost shown first

**Descriptions**
- D1: Loans $2,001 to $5,000. Applicants must be 18+.
- D2: Credit by Mantis, ACL {{ACL_NUMBER}}. 18+.
- D3: Every application is assessed. Fees apply.

---

## E. Grunt test and claims checklist (run on the home page)

**Grunt test.** Offer, benefit and action sit in the lede and buttons: a $2,001 to $5,000 personal loan, the total shown first, "Check your rate". Under 10 sentences above the fold. The customer is the subject of the headline; the brand is the guide. Stakes, a three-step plan and one direct CTA are present; the transitional CTA is "See the full rate card".

**Claims check (spec s 4).** Absent from the home page: "no credit check", "guaranteed", "instant", "minutes", "bad credit OK", "priced on your bank data", "licensed" as a headline, "rates from 20%" alone, pay-advance targeting, urgency, review stars or counts, any Centrelink implication. Present: "Approval is not guaranteed"; rate range, comparison rate, WARN and example total together; licence in trust row and footer only; the Centrelink exclusion on the eligibility page.

**Lines cut and why.** "Fast decision, funds today" and "Bad week? Borrow in minutes" (speed, spec s 4). "Checking your rate will not affect your credit score" (unverified, open item 6). "Why settle for a payday lender?" (pressure; names a rival category). "Trusted by thousands of Australians" (no customers or reviews exist). "Licensed lender you can trust" (licence as a benefit; moved to trust row). "Rates from 20%" in the hero (bait; the cost strip replaces it). "We never drop your limit" (unprovable; narrowed in the FAQ with a counsel flag).

**Open flags:** "equal" assumes monthly repayments; the 90-day ad issue; the example against the 48% cap (open item 3); the payday-loan answer; whether decline reasons and hardship options exist in operations.


---

## Revision log

Checked against the StoryBrand wireframe, one-liner formula and common-mistakes list.

1. **Home order** now follows the wireframe: header, hero (grunt test), stakes, value stack, guide (empathy and authority, trust row), plan, explanatory paragraph, closing CTA, junk-drawer footer. Added the value stack, guide section, explanatory paragraph and footer, which were missing or thin. Social proof is omitted on purpose (spec s 8).
2. **Header** gained a transitional CTA, "See the full rate card" (mistake 6).
3. **Stakes** now name the internal problem (worry about fine print) and the philosophical one (a loan should show its cost), with a failure line and a success line (mistakes 4, 5, 8).
4. **One-liner** rewritten to the formula: problem, then solution, then result. Alternates unchanged.
5. **Closing CTA** now restates the villain ("price of a bad week").
6. **Ads:** button changed from "Learn More" to "Apply Now" (mistake 6).
7. Mistake 1 (brand as hero), 3 (too many words) and 7 (no authority): scanned all pages; copy leads with "you", and authority is the licence, assessment and AFCA, not boasts. No other changes.
8. No compliance wording changed. Token names unchanged.
9. **8 Nov 2026, offer stack and pricing.** Pricing decision (Chris, 8 Nov 2026): 48% p.a. plus the $400 MACC maximum establishment fee. The home page gained a "Two promises" block and "Four things included"; how-it-works, rates, FAQ and apply carry the 10-minute decision and the 48-hour change of mind; the closing band carries the honest launch-cap line. New tokens listed in section F. Source: `reports/Grand slam offer canvas 1.md`.

## Post-build edits (StoryBrand review, section 6)

Site copy now differs from the deck above in these lines. The site is the source.

- **CTA, all pages:** "Start application" is now "Check your rate" (how-it-works, rates, eligibility, faq, about, tmd). Apply submit "Send my request" is now "Check your rate".
- **Apply lede:** "Three quick steps: your details, your bank, your estimate. Nothing is sent until the last step." (was "Four short steps. You see an estimate first. Nothing is sent until the last step.")
- **Thank-you h1:** "Your rate request is in." (was "We have your request"). Last paragraph: "Nothing is signed yet. See how repayments work" (links to how-it-works).
- **Home hero subhead:** "A personal loan of $2,001 to $5,000, over 3 to 12 months. See the total first, so a bad week stays one bill with an end date."
- **Home guide h2:** "A surprise bill is stressful. You should not have to rush."
- **Home plan step 1:** "Pick the amount and term. Answer four quick questions. Connect your bank, read-only. You see your rate and total before you commit."
- **Home plan:** new "Check your rate" button under step 3.
- **Home FAQ:** "Will you cut my limit?" is now "Can the amount change after I sign?" (same answer). Both it and "Is this a payday loan?" carry a counsel VERIFY comment.
- **Rates lede:** "Here is the whole price. A bad week should not set the cost. We put the total first because that is the number that matters."
- **Not applied:** review edits 4, 5, 10 and 11 (see build report).

## F. Offer stack (8 Nov 2026)

Added after the site was built, so it takes the letter F: section E above is the grunt test. The site is the source; this section records what was added and why. Offer: `reports/Grand slam offer canvas 1.md`.

**Two promises** (home, block `data-testid="promises"`; repeated in how-it-works step 1, FAQ and apply step 1)

1. **The 10-minute decision.** "Link your bank in business hours and you have a decision in 10 minutes, or the $400 establishment fee is waived." Always with "A decision, not an approval." or "Approval is not guaranteed." beside it.
2. **48 hours to change your mind.** "Repay the money within two days of it landing and you owe nothing."

**Four included extras** (home, `data-testid="extras"`)

1. Payday match: repayments on your payday, one free date move a year.
2. Early exit, no fee: clear the $3,100 example at month 6 and save about $283.
3. Your amount is yours: no limit cuts or recalls while you keep to the contract.
4. Good-payer rate: after six on-time repayments, eligible for a lower rate on any later loan.

**Scarcity line (the only one allowed).** "We are funding a limited number of loans a month during launch." No countdowns, deadlines or "offer ends".

**Removed.** Every funding-time claim (`FUNDS_TIME` is no longer used by any page). The promise is the decision, not the money.

**New or changed tokens** (all in `config.js`)

| Token | Value | Note |
|---|---|---|
| `DECISION_PROMISE_MINUTES` | 10 | OPS: measure before launch (RG 234) |
| `FEE_WAIVER_AMOUNT` | $400 | From the card |
| `CHANGE_OF_MIND_HOURS` | 48 | Counsel |
| `FREE_DATE_MOVES` | one | Contract term |
| `GOOD_PAYER_REPAYMENTS` | six | Counsel |
| `LAUNCH_CAP_NOTE` | the scarcity line | Must stay true |
| `EARLY_EXIT_MONTH`, `EARLY_EXIT_SAVING` | 6, $283 | Computed from the card |
| `EXAMPLE_SMALL_AMOUNT`, `_TERM`, `_MONTHLY`, `_TOTAL`, `_COST` | $2,001, 3 months, $865.20, $2,595.60, $594.60 | Rates page |
| `COMPARISON_RATE_SMALL` | 170.74% | Warning directly under it |
| `DECISION_TIME` | "You get a decision within 10 minutes of linking your bank, in business hours" | Changed |
| `RATE_REP`, `EXAMPLE_*`, `COMPARISON_RATE_EXAMPLE` | 48.00%, $372.93 a month, $4,475.16 total, 73.87% | Recomputed |


## G. Positioning pass (April Dunford method, 9 Nov 2026)

Frame chosen: big fish in a small pond, a sub-category of personal loans for people whose pay does not arrive in neat fortnights, judged against Cashies, Wallet Wizard and Beforepay's loan rather than against banks. Home page changes: hero now leads with the category and the 10-minute guarantee ("A personal loan for pay that changes week to week" / decision in 10 minutes or the $400 fee is waived, "A decision, not an approval"); the stakes section opens with the insight (lenders judge the shape of pay, not capacity) before the bill; "known total" moves from headline to proof (cost card and callout unchanged); the trust-row title "Licensed credit provider" becomes "Who stands behind it". Meta title and description updated to match. Not unique and no longer led with: "known total" (required of every medium-loan lender) and "bank data" (standard since 2016). Proof still missing: measured decision times, guarantees honoured, reviews. Counsel flags: the guarantee wording in the hero; the competitor-limit line in the insight.
