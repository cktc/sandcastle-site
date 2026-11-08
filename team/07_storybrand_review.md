# StoryBrand review of the built pages

Reviewed 8 Nov 2026: index, how-it-works, rates, eligibility, apply, thank-you, faq, hardship, about. Words, order and calls to action only. No file was edited.

## 1. Grunt test (home, as built): PASS, with two soft spots

| Question | Result | Lines |
|---|---|---|
| What do you offer? | Pass | "Know what you will repay before you apply." then "A personal loan of $2,001 to $5,000, over 3 to 12 months." The headline never says "loan"; the noun waits for line two. |
| How does it make my life better? | Pass, thin | "You see the total first. Your repayments are equal, so you can plan around them." Plain, but the feeling (no rush, no surprise) is not in the hero. |
| What do I do to buy it? | Pass | "Check your rate" (header button, hero, closing). It asks for a quote, not a loan, and the page where it lands ends in "Send my request". |

Above the fold also carries two near-duplicate disclosure paragraphs ("Approval is not guaranteed" twice) before the cost panel. That is more than ten sentences between the headline and the first story beat.

## 2. Wireframe audit (home)

| Section | Present | In order | Strength | Line |
|---|---|---|---|---|
| Header: direct CTA | Yes | Yes | Strong | "Check your rate" button in nav, hero, close |
| Header: transitional CTA | Yes | Yes | Medium | "See the full rate card" (nav, hero, cost panel). Nav label becomes "Rates and fees" on every other page. |
| Hero | Yes | Yes | Medium | "Know what you will repay before you apply." Clear, not emotional. |
| Cost panel | Extra | Out of order | Weak placement | "What it costs ... You borrow $3,100". Required by the spec, but it lands between hero and stakes and breaks the story. |
| Stakes | Yes | Late | Medium | "The price of a bad week" / "Without the total, you can sign for a price you only learn later." |
| Value stack | Yes | Yes | Strong | "You see the total in dollars before you apply." / "If we say no, we tell you why." |
| Guide: empathy | Yes | Yes | Medium | "We know a surprise bill is stressful" (heading opens with "We"); body "You did not plan for this and should not be rushed." is good. |
| Guide: authority | Yes | Yes | Medium | "Fernbank is a loan from Mantis, an Australian credit licensee ... AFCA covers complaints." Placeholders only; no proof beyond the licence. Fine, since no reviews exist. |
| Plan, three steps | Yes | Yes | Strong | "Check your rate / Choose your repayments / Get your money" |
| Explanatory paragraph | Yes | Yes | Medium | Collapsed under "Read more". Right place, weak label. |
| Mid-page CTA | **No** | n/a | Gap | Nothing between the hero and the close except the nav button. The plan has no button under it. |
| Closing CTA | Yes | Yes | Strong | "Do not let the price of a bad week choose for you. It takes about 5 minutes." |
| Junk-drawer footer | Yes | Yes | Strong | Links, licence, disclosures, cookies. |

## 3. SB7 check

- **Customer as hero.** About 72 sentences on the home page body, about 36 with "you/your", 14 with "we/our/Fernbank/Mantis" (5 with no "you"). Pass. The only "We" lead is the guide heading.
- **Villain.** "The price of a bad week" appears twice on the home page (stakes heading and closing) and nowhere else. Other pages say "a big bill" (about) or nothing. Never a competitor, but the FAQ question "Is this a payday loan?" names a rival category, and "Will you cut my limit?" borrows pay-advance language that a personal-loan visitor will not recognise. Partial.
- **Three problems.** External: "The car fails its roadworthy ... The bond ... is due". Internal: "That leaves you worried about the fine print and about the next payment." Philosophical: "A loan should show its full cost before you sign." All present, home page only. The internal problem is absent from how-it-works, rates and eligibility.
- **Plan.** Names match on home and how-it-works. Descriptions drift: home step 1 "Answer a few questions", how-it-works "Answer four quick questions", apply "Four short steps". Visitors meet "three steps", then "four". Thank-you "What happens next" is a different three (call, ID, decision).
- **Direct CTA.** Not the same. Home, apply h1: "Check your rate". How-it-works, rates, eligibility, faq, about: "Start application". Form: "Continue", "Send my request". Fail.
- **Failure without fear.** Pass. "Without the total, you can sign for a price you only learn later." Calm, specific. Eligibility's "short for rent and food" is the only sharp line and is justified.
- **Success.** "With it, you pay one bill and know the end date." Concrete but one line. The thank-you page does not picture it.

## 4. Common-mistakes scan

| # | Page | Line |
|---|---|---|
| 1 | home | "We know a surprise bill is stressful" (heading leads with "We") |
| 3 | home | Two disclosure paragraphs stacked under the hero CTA |
| 4 | how-it-works, rates, eligibility | No internal-problem line; open on process, price list and rules |
| 6 | how-it-works, rates, eligibility, faq, about | "Start application" (not the home CTA words) |
| 6 | apply | "Continue", "Send my request"; thank-you has no next-step link |
| 6 | home | "Read more" summary; no mid-page direct CTA |
| 9 | apply / how-it-works | "Four short steps" / "four quick questions" against "three steps" |
| 9 | home vs apply | "You see your rate and total before you commit" against a form that ends in a callback |
| 10 | home FAQ | "Is this a payday loan?" opens a new villain and never closes it into the story |

## 5. Compliance conflicts

| StoryBrand instinct | Forbidden by | Compliant alternative |
|---|---|---|
| Speed as the benefit: "Cash today", "Sorted in minutes" | "Instant", "approved in minutes" | "It takes about 5 minutes" (apply time, as built). Add "funds usually reach you [X] after approval" only once measured. |
| Remove the one thing that scares: "Everyone gets a fair go" / "bad credit OK" | "Bad credit OK", "No credit check" | Who it suits goes on eligibility. Hero stays on price shown first. |
| Cut "Approval is not guaranteed" as negative | Mandatory responsible-lending statement | Say it once per page, verbatim, near the button; remove the duplicate paragraph above the fold. |
| Sharpen the villain with a rival: "Why settle for a payday lender?" | Never name or target pay-advance users | Keep the villain as the bad week. Consider answering "payday" only in the FAQ, flagged for counsel. |

## 6. Prioritised rewrites (data-cfg spans untouched)

**Top three: 1, 2, 3.**

1. **MOST IMPORTANT.** All pages except home: "Start application" button (how-it-works, rates, eligibility, faq, about). Change to "Check your rate". One direct CTA everywhere (also thank-you nav, apply h1 already match). Reason: Mistake 6; two names for one action.
2. **MOST IMPORTANT.** Home, guide section, apply and thank-you: make the promise match the path. Apply intro "Four short steps. You see an estimate first. Nothing is sent until the last step." becomes "Three quick steps: your details, your bank, your estimate. Nothing is sent until the last step." And thank-you h1 "We have your request" becomes "Your rate request is in." Reason: the button says "Check your rate", the form says "Send my request", the page says "call". Align verbs, and keep the "not a loan approval" line.
3. **MOST IMPORTANT.** Home, hero: add the feeling and the noun. Subhead "A personal loan of $2,001 to $5,000, over 3 to 12 months. You see the total first. Your repayments are equal, so you can plan around them." becomes "A personal loan of $2,001 to $5,000, over 3 to 12 months. See the total first, so a bad week stays one bill with an end date." Reason: puts the internal problem and the success picture in the hero; wording stays factual.
4. Home, second hero paragraph: delete "Every application is assessed. We check your income, expenses and bank data ... Approval is not guaranteed." from the hero area; keep the first paragraph and the footer copy. Reason: halves the hero text. Check with compliance that the home page keeps the statement in one visible place.
5. Home, order: move "What it costs" below the plan (after the "Read more"), and keep a one-line total under the hero button: "Example: borrow $3,100 over 12 months, repay $331.52 a month." Reason: story first. Needs designer and compliance sign-off on hero panel placement (the spec says the comparison rate sits in the hero panel).
6. Home, plan: add a button under step 3: "Check your rate". Reason: no mid-page direct CTA.
7. Home, guide heading: "We know a surprise bill is stressful" becomes "A surprise bill is stressful. You should not have to rush." Reason: customer leads the sentence.
8. Home FAQ: replace "Will you cut my limit?" with "Can the amount change after I sign?" Keep the answer. Reason: plain words; no pay-advance echo.
9. Home plan, step 1: "Tell us the amount and term. Connect your bank, read-only. Answer a few questions." becomes "Pick the amount and term. Answer four quick questions. Connect your bank, read-only." Reason: matches how-it-works.
10. Home plan, step 3: "we pay it into your bank account once you accept ." becomes "we pay it into your bank account." Reason: stray fragment (also check the markup).
11. Nav: unify the transitional link as "See the full rate card" on every page, not "Rates and fees" (footer can keep the plain name). Reason: one label for one action.
12. Rates, intro: after "Here is the whole price." add "A bad week should not set the cost." Reason: carries the villain to a page that lacks it.
13. Thank-you, last list item: "We assess your application and tell you the decision and the reasons." followed by "Nothing is signed yet." plus a link "See how repayments work" to how-it-works. Reason: a next step instead of a dead end.

## 7. Verdict

Don Miller would say this page is clean and honest: the customer is the hero, the villain and the three steps are on the page, and a caveman would get it. But it asks the visitor to do two different things by two different names, it buries the story under the numbers, and it never quite pictures the good day after. Fix the button words first, then move the price table below the plan.
