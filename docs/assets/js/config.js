/* Single source of truth for brand, legal, rate-card and tracking settings.
 * Pages read these through window.SITE_CONFIG; swap the brand or any value here and nowhere else.
 * Static HTML cannot read this file, so text such as <span data-cfg="BRAND_NAME">Fernbank</span> is
 * filled at load (analytics.js). The span's own text is the same placeholder, so the page reads
 * correctly with JS off. <title>, meta tags and JSON-LD cannot be filled by JS: change those by
 * find and replace (see README).
 * Everything here is public in the browser: never put secrets or API tokens in this file.
 *
 * Every token in team/04_copy_deck.md is a key below. Values marked PLACEHOLDER are the spec's
 * undecided values (team/01_site_spec.md s 2 and s 9). */
(function () {
  'use strict';

  /* ---------- Rate card inputs (numbers). PLACEHOLDER: Mantis pricing committee, open item 8 ---------- */
  var CARD = {
    amountMin: 2001,            // $2,001 floor keeps the product out of the SACC regime (spec s 0, open item 2)
    amountMax: 5000,
    termMin: 3,                 // months
    termMax: 12,
    rateMin: 20,                // % p.a.
    rateMax: 48,
    rateRep: 36,                // representative rate, % p.a.
    feeUnder3000: 0,            // establishment fee, loans under feeThreshold. PLACEHOLDER (cap mechanics: open item 3)
    feeOver3000: 200,           // establishment fee, loans of feeThreshold or more. PLACEHOLDER
    feeThreshold: 3000,
    exampleAmount: 3100,        // worked example (spec s 2)
    exampleMonths: 12
  };

  /* ---------- Loan maths. Shared with forms.js (window.RATE_CALC); never hard-code example figures ---------- */
  // Fee is added to the balance (spec s 2). Equal monthly repayments, monthly rate = rateRep / 12.
  function calc(amount, months) {
    var fee = amount >= CARD.feeThreshold ? CARD.feeOver3000 : CARD.feeUnder3000;
    var balance = amount + fee, i = CARD.rateRep / 100 / 12;
    var monthly = i === 0 ? balance / months : balance * i / (1 - Math.pow(1 + i, -months));
    monthly = Math.round(monthly * 100) / 100;
    var total = Math.round(monthly * months * 100) / 100;
    // Comparison rate: the monthly rate that discounts the repayments back to the cash actually
    // advanced (amount, excluding the fee), found by bisection, quoted as a nominal annual rate.
    var lo = 0, hi = 1;
    for (var n = 0; n < 80; n++) {
      var mid = (lo + hi) / 2, pv = monthly * (1 - Math.pow(1 + mid, -months)) / mid;
      if (pv > amount) lo = mid; else hi = mid;
    }
    return { amount: amount, months: months, fee: fee, monthly: monthly, total: total,
             interest: Math.round((total - balance) * 100) / 100,
             cost: Math.round((total - amount) * 100) / 100,
             comparison: Math.round(lo * 12 * 10000) / 100 };
  }
  var money = function (n) { return '$' + n.toLocaleString('en-AU', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
  var ex = calc(CARD.exampleAmount, CARD.exampleMonths);

  window.RATE_CARD = Object.freeze(CARD);
  window.RATE_CALC = calc;
  window.RATE_MONEY = money;

  window.SITE_CONFIG = Object.freeze({
    /* ---------- Brand and legal ---------- */
    BRAND_NAME: 'Fernbank',                          // working title; also in <title>/meta by find and replace
    LEGAL_ENTITY: 'Mantis Pty Ltd (placeholder)',    // as on the ASIC/ACL register
    ACL_NUMBER: '000000',                            // PLACEHOLDER, digits only (open item 1)
    ABN: '00 000 000 000',                           // PLACEHOLDER (open item 1)
    ADDRESS: '[Street address, Suburb STATE 0000]',  // PLACEHOLDER (open item 1)

    /* ---------- Contact ---------- */
    PHONE: '1300 000 000',                           // PLACEHOLDER
    PHONE_TEL: '1300000000',                         // same number, digits only, for tel: links
    EMAIL: 'hello@example.com.au',                   // PLACEHOLDER
    HOURS: '[Days and hours, e.g. Mon to Fri 9am to 5pm AEST]', // PLACEHOLDER (open item 1)
    HARDSHIP_CONTACT: '[Name]',                      // PLACEHOLDER: named hardship and complaints person (spec s 8)
    COMPLAINT_REPLY_TIME: '[number] business days',  // PLACEHOLDER: a reply time Mantis can keep
    CALLBACK_TIME: '[response time]',                // PLACEHOLDER: callback promise Mantis can keep (open item 10)

    /* ---------- Complaints and help ---------- */
    AFCA_MEMBER_NO: '000000',                        // PLACEHOLDER (open item 1)
    AFCA_PHONE: '1800 931 678',                      // verify before publishing (spec s 3)
    AFCA_WEB: 'afca.org.au',                         // verify before publishing
    NDH_PHONE: '1800 007 007',                       // National Debt Helpline; verify before publishing
    NDH_WEB: 'ndh.org.au',                           // verify before publishing

    /* ---------- Bank data ---------- */
    PROVIDER: 'Basiq (placeholder)',                 // PLACEHOLDER: bank-data provider (open item 9)

    /* ---------- Rate card (display strings built from CARD above) ---------- */
    RATE_MIN: CARD.rateMin + '%',                    // PLACEHOLDER 20%
    RATE_MAX: CARD.rateMax + '%',                    // PLACEHOLDER 48%
    RATE_REP: CARD.rateRep.toFixed(2) + '%',         // PLACEHOLDER representative rate 36.00%
    ESTAB_FEE_UNDER_3000: money(CARD.feeUnder3000),  // PLACEHOLDER
    ESTAB_FEE_OVER_3000: money(CARD.feeOver3000),    // PLACEHOLDER
    LATE_FEE: '[$ amount, or None]',                 // PLACEHOLDER: only a fee Mantis will charge (spec s 2)
    DISHONOUR_FEE: '[$ amount, or None]',            // PLACEHOLDER

    /* ---------- Worked example (computed; Mantis finance must confirm, spec s 2 and open item 3) ---------- */
    EXAMPLE_AMOUNT: money(ex.amount),
    EXAMPLE_TERM: ex.months + ' months',
    EXAMPLE_FEE: money(ex.fee),
    EXAMPLE_INTEREST: money(ex.interest),
    EXAMPLE_MONTHLY: money(ex.monthly),
    EXAMPLE_TOTAL: money(ex.total),
    EXAMPLE_COST: money(ex.cost),
    COMPARISON_RATE_EXAMPLE: ex.comparison.toFixed(2) + '%',

    /* ---------- Timing claims. PLACEHOLDER: state a time only if Mantis has measured it (spec s 4) ---------- */
    FUNDS_TIME: 'we pay it into your bank account once you accept',
    DECISION_TIME: 'You get a decision once we have assessed your application',
    APPLY_MINUTES: '5',                              // PLACEHOLDER: measure before launch

    /* ---------- Forms and tracking ---------- */
    // Meta (Facebook) Pixel ID, 15-16 digits. Blank = Meta never loads.
    META_PIXEL_ID: '',
    // Google tag ID (AW-XXXXXXXXXX for Google Ads, or GT-XXXXXXX). Blank = skipped.
    GOOGLE_TAG_ID: '',
    // GA4 measurement ID (G-XXXXXXXXXX). Blank = skipped.
    GA4_MEASUREMENT_ID: '',
    // Optional Google Ads conversion labels per event, as 'AW-XXXXXXXXXX/label'. Leave {} until
    // the conversion actions exist. Example: { apply_submitted: 'AW-123/AbC_dEfG' }
    GOOGLE_ADS_CONVERSIONS: {},
    // Static-form service endpoint (Formspree, Basin, etc.), e.g. 'https://formspree.io/f/xxxxxxx'.
    // Blank = the apply form shows a loud inline error with the phone number and sends nothing.
    FORM_ENDPOINT: '',
    // true  = no pixel or tag loads and nothing fires until the visitor accepts via the banner.
    // false = tracking loads immediately. Keep true until a lawyer confirms otherwise.
    CONSENT_REQUIRED: true,
    // true = log every track() call to the console. Also switchable per browser with ?debug=1.
    DEBUG: false
  });
})();
