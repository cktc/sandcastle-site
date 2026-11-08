/* forms.js: progressive enhancement for the apply form (form[data-apply]).
 * Without JS the form is one long page that posts natively. With JS it becomes a stepped flow.
 * Load after config.js and analytics.js, with defer, on apply.html only.
 *
 * Markup contract (team/03_infra_and_tracking.md, unchanged except where marked):
 *   <form data-apply data-track action="" method="post" novalidate>
 *     <div data-errors role="alert" aria-live="assertive" tabindex="-1"></div>
 *     <p data-progress aria-live="polite"></p>           (+ optional ol.progress > li.progress__step dots)
 *     <fieldset data-step [data-gate="eligibility"] [data-one-of="email,mobile"] [data-on-next="event"]>
 *        <h2 data-step-heading tabindex="-1">..</h2>
 *        fields (name=...), each with <span data-error-for="name" id="err-name"></span>
 *        optional per-field message: data-error="..." (replaces the generic "Enter or select ...")
 *        <button type="button" data-back>  <button type="button" data-next> (last step: type=submit)
 *     </fieldset>
 *     <div data-ineligible hidden tabindex="-1">...</div>
 *        inside it: [data-ineligible-reason] receives the failed statement; [data-ineligible-back]
 *        returns to the eligibility step.
 *   </form>
 * Estimate panel: [data-est="monthly|total|fee|rate|comparison"] and, on each term radio,
 *   [data-term-monthly] / [data-term-total] are filled live from RATE_CALC (config.js).
 *
 * CHANGED FROM THE ORIGINAL SCAFFOLD (5 changes, all to follow team/01_site_spec.md s 5 and s 6,
 * which did not exist when the scaffold was written):
 *   1. Fields are now: loan_amount, term_months, purpose, elig_age, elig_resident, elig_income,
 *      elig_bank, consent_bank_data, full_name, email, mobile, preferred_time, contact_consent.
 *      The old dob, residency, income_source, income_amount, centrelink_share and consent_credit
 *      fields are gone: the spec asks four tick-box questions, not a date of birth or income.
 *   2. RULES: amount $2,001 to $5,000 (was $300 to $5,000), term 3 to 12 months, and the spec's
 *      Centrelink rule and income floor (see RULES).
 *   3. Eligibility fails if any of the four statements is unticked, with the statement's own words
 *      shown as the reason (data-fail-reason on each checkbox).
 *   4. A failure to reach the endpoint now shows the same loud inline error as a non-2xx reply
 *      (with the phone number), instead of falling back to a native submit.
 *   5. Non-sensitive state (amount, term, purpose) is kept in sessionStorage, per spec s 6.
 *      Contact details and consent are never stored. */
(function () {
  'use strict';
  var CFG = window.SITE_CONFIG || {};
  var CALC = window.RATE_CALC, MONEY = window.RATE_MONEY, CARD = window.RATE_CARD;
  var track = window.track || function (n) { console.warn('[forms] analytics.js not loaded; dropped event', n); };
  // QA fix: RULES below dereferences CARD, so stop here instead of throwing a TypeError; the form then posts natively.
  if (!CALC || !CARD) { console.error('[forms] config.js must load before forms.js: RATE_CALC / RATE_CARD missing; stepped flow disabled'); return; }

  /* Eligibility and input rules, from team/01_site_spec.md s 0, s 5, s 6.
     Mantis credit policy must confirm every value marked PLACEHOLDER. */
  var RULES = {
    loanMin: CARD.amountMin,        // $2,001: a $2,000 loan would be a SACC (spec s 0)
    loanMax: CARD.amountMax,        // $5,000
    loanStep: 100,                  // slider step; the number box accepts any whole dollar in range
    termMin: CARD.termMin,          // 3 months
    termMax: CARD.termMax,          // 12 months
    minAge: 18,                     // elig_age statement
    // Centrelink (spec s 5, open item 5): government payments are extra income only and cannot be
    // the only income. The form does not ask for an income split, so the rule is enforced by the
    // elig_income statement ("regular income from work"); a bank-data check enforces it later.
    governmentPaymentsAreSoleIncome: false,
    // Income floor (open item 4): PLACEHOLDER, no figure decided. The form does not collect income,
    // so nothing is enforced here until Mantis sets a pattern and a question is added.
    incomeFloorMonthly: null
  };
  var STATE_KEY = 'apply_state';    // sessionStorage: { loan_amount, term_months, purpose } only

  var form = document.querySelector('form[data-apply]');
  if (!form) return;
  var steps = [].slice.call(form.querySelectorAll('[data-step]'));
  var dots = [].slice.call(form.querySelectorAll('.progress__step'));
  var errBox = form.querySelector('[data-errors]');
  var progress = form.querySelector('[data-progress]');
  var current = 0, started = false, submitLabel = '';

  /* ---------- validators: return an error string or '' ---------- */
  function val(name) {
    var els = form.elements[name];
    if (!els) return '';
    if (els.length && els[0].type === 'radio') { var c = [].filter.call(els, function (e) { return e.checked; })[0]; return c ? c.value : ''; }
    if (els.type === 'checkbox') return els.checked ? els.value || 'on' : '';
    return String(els.value || '').trim();
  }
  function num(name) { return Number(val(name).replace(/[$,\s]/g, '')); }
  var CHECKS = {
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter an email like name@example.com.'; },
    mobile: function (v) {
      var n = v.replace(/[\s\-()]/g, '').replace(/^\+?61/, '0');
      return /^04\d{8}$/.test(n) ? '' : 'Enter an Australian mobile, such as 0412 345 678.';
    },
    loan_amount: function () {
      var n = num('loan_amount');
      return (n >= RULES.loanMin && n <= RULES.loanMax && n === Math.floor(n)) ? '' : 'Enter an amount between ' + MONEY(RULES.loanMin) + ' and ' + MONEY(RULES.loanMax) + '.';
    },
    term_months: function (v) {
      var n = Number(v);
      return (n >= RULES.termMin && n <= RULES.termMax) ? '' : 'Choose a term between ' + RULES.termMin + ' and ' + RULES.termMax + ' months.';
    }
  };

  function validateField(el) {
    var v = val(el.name), msg = '';
    var label = el.getAttribute('data-label') || el.name.replace(/_/g, ' ');
    if (el.required && !v) msg = el.getAttribute('data-error') || 'Enter or select ' + label + '.';
    else if (v && CHECKS[el.name]) msg = CHECKS[el.name](v);
    return msg;
  }
  function setFieldError(el, msg) {
    var slot = form.querySelector('[data-error-for="' + el.name + '"]');
    if (slot) slot.textContent = msg;
    if (msg) {
      el.setAttribute('aria-invalid', 'true');
      // QA fix: append to, don't replace, existing aria-describedby so hints (amount-hint, contact-hint) stay announced.
      if (slot && slot.id) {
        var ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
        if (ids.indexOf(slot.id) < 0) ids.push(slot.id);
        el.setAttribute('aria-describedby', ids.join(' '));
      }
    }
    else { el.removeAttribute('aria-invalid'); }
  }
  function validateStep(i) {
    var seen = {}, errors = [];
    [].forEach.call(steps[i].querySelectorAll('input[name], select[name], textarea[name]'), function (el) {
      if (el.type === 'hidden' || seen[el.name]) return;
      seen[el.name] = true;
      var msg = validateField(el);
      setFieldError(el, msg);
      if (msg) errors.push({ msg: msg, el: el });
    });
    // "Give one of these" groups, e.g. data-one-of="email,mobile".
    var group = (steps[i].getAttribute('data-one-of') || '').split(',').filter(Boolean);
    if (group.length && !group.some(function (n) { return val(n); })) {
      var first = form.elements[group[0]];
      var gmsg = steps[i].getAttribute('data-one-of-error') || 'Give one of: ' + group.join(', ') + '.';
      setFieldError(first, gmsg);
      errors.push({ msg: gmsg, el: first });
    }
    errBox.textContent = '';
    errBox.hidden = errors.length === 0;
    if (errors.length) {
      var ul = document.createElement('ul');
      errors.forEach(function (x) {
        var li = document.createElement('li'), a = document.createElement('a');
        a.href = '#' + (x.el.id || ''); a.textContent = x.msg;
        a.addEventListener('click', function (e) { e.preventDefault(); x.el.focus(); });
        li.appendChild(a); ul.appendChild(li);
      });
      errBox.appendChild(ul);
      errors[0].el.focus();
    }
    return errors.length === 0;
  }

  /* ---------- eligibility: every statement must be ticked ---------- */
  function failedStatements() {
    return [].filter.call(form.querySelectorAll('[data-gate="eligibility"] input[type="checkbox"]'), function (c) { return !c.checked; });
  }

  /* ---------- live estimate (spec s 6 step 1) ---------- */
  function setText(sel, text, root) {
    [].forEach.call((root || form).querySelectorAll(sel), function (n) { n.textContent = text; });
  }
  function updateEstimate() {
    var amount = num('loan_amount'), months = Number(val('term_months'));
    var ok = !CHECKS.loan_amount() && months >= RULES.termMin && months <= RULES.termMax;
    if (ok) {
      var c = CALC(amount, months);
      setText('[data-est="monthly"]', MONEY(c.monthly));
      setText('[data-est="total"]', MONEY(c.total));
      setText('[data-est="fee"]', MONEY(c.fee));
      setText('[data-est="comparison"]', c.comparison.toFixed(2) + '%');
    } else {
      ['monthly', 'total', 'fee', 'comparison'].forEach(function (k) { setText('[data-est="' + k + '"]', '-'); });
    }
    setText('[data-est="rate"]', CFG.RATE_REP);
    // Each term card shows what that term would cost for the chosen amount.
    [].forEach.call(form.querySelectorAll('input[name="term_months"]'), function (r) {
      var card = r.closest('.radio-card');
      if (!card) return;
      var m = Number(r.value), good = !CHECKS.loan_amount();
      var c = good ? CALC(amount, m) : null;
      setText('[data-term-monthly]', c ? MONEY(c.monthly) + ' a month' : '-', card);
      setText('[data-term-total]', c ? MONEY(c.total) + ' in total' : '-', card);
    });
  }

  /* ---------- saved state: amount, term, purpose only ---------- */
  function saveState() {
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify({ loan_amount: val('loan_amount'), term_months: val('term_months'), purpose: val('purpose') }));
    } catch (e) { console.warn('[forms] sessionStorage unavailable; state not kept:', e); }
  }
  function restoreState() {
    var s = {};
    try { s = JSON.parse(sessionStorage.getItem(STATE_KEY) || '{}'); } catch (e) { console.warn('[forms] bad saved state, ignoring:', e); }
    if (s.loan_amount) form.elements.loan_amount.value = s.loan_amount;
    if (s.purpose) form.elements.purpose.value = s.purpose;
    if (s.term_months) [].forEach.call(form.querySelectorAll('input[name="term_months"]'), function (r) { r.checked = r.value === s.term_months; });
  }
  function startOnce() { if (!started) { started = true; track('apply_start'); } }
  function syncSlider(fromSlider) {
    var slider = form.querySelector('[data-amount-slider]'), box = form.elements.loan_amount;
    if (!slider) return;
    if (fromSlider) box.value = slider.value; else if (box.value) slider.value = box.value;
    slider.setAttribute('aria-valuetext', '$' + Number(slider.value).toLocaleString('en-AU') + ' loan amount');
  }

  /* ---------- navigation ---------- */
  function show(i, moveFocus) {
    current = i;
    steps.forEach(function (s, n) { s.hidden = n !== i; });
    if (progress) progress.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    dots.forEach(function (d, n) {
      d.classList.toggle('is-done', n < i);
      d.classList.toggle('is-current', n === i);
      if (n === i) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
    });
    errBox.hidden = true;
    if (moveFocus) {
      var h = steps[i].querySelector('[data-step-heading]') || steps[i];
      if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
      h.focus();
    }
    /* apply_step only on user-driven moves, and never before apply_start. The silent first render sends nothing. */
    if (moveFocus) { startOnce(); track('apply_step', { step: i + 1, step_count: steps.length }); }
  }
  function reject(failed) {
    track('eligibility_failed', { reasons: failed.map(function (c) { return c.getAttribute('data-fail-code') || c.name; }).join(',') });
    steps.forEach(function (s) { s.hidden = true; });
    if (progress) progress.hidden = true;
    var box = form.querySelector('[data-ineligible]');
    if (!box) { console.error('[forms] no [data-ineligible] element; the visitor sees nothing after failing eligibility'); return; }
    setText('[data-ineligible-reason]', failed[0].getAttribute('data-fail-reason') || 'one of the four statements is not true', box);
    box.hidden = false; box.focus();
  }
  function backFromReject() {
    var box = form.querySelector('[data-ineligible]');
    if (box) box.hidden = true;
    if (progress) progress.hidden = false;
    var gate = steps.indexOf(form.querySelector('[data-gate="eligibility"]'));
    show(gate < 0 ? 0 : gate, true);
  }
  function next() {
    if (!validateStep(current)) return;
    var step = steps[current];
    if (step.getAttribute('data-gate') === 'eligibility') {
      var failed = failedStatements();
      if (failed.length) return reject(failed);
      track('eligibility_passed');
    }
    var ev = step.getAttribute('data-on-next');      // e.g. consent_given
    if (ev) track(ev);
    if (current < steps.length - 1) show(current + 1, true);
  }

  /* ---------- submit ---------- */
  function submit(e) {
    e.preventDefault();
    if (current < steps.length - 1) return next();          // Enter key on an early step advances
    if (!validateStep(current)) return;
    var endpoint = CFG.FORM_ENDPOINT || form.getAttribute('action');
    if (!endpoint) {
      console.error('[forms] FORM_ENDPOINT is blank and the form has no action; nothing was sent.');
      return showError('This form is not connected yet, so nothing was sent.');
    }
    form.setAttribute('action', endpoint);
    var btn = form.querySelector('[type="submit"]');
    if (btn) { submitLabel = submitLabel || btn.textContent; btn.disabled = true; btn.textContent = 'Sending...'; btn.setAttribute('aria-busy', 'true'); }
    fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        return res.text().then(function (body) {
          console.log('[forms] endpoint response', res.status, body);   // raw response, per logging policy
          if (!res.ok) throw new Error('endpoint answered HTTP ' + res.status);
          track('apply_submitted', { loan_amount: num('loan_amount') });
          try { sessionStorage.removeItem(STATE_KEY); } catch (err) { console.warn('[forms] could not clear saved state:', err); }
          setTimeout(function () { location.href = 'thank-you.html'; }, 300);
        });
      })
      .catch(function (err) {
        console.error('[forms] submit failed:', err);
        if (btn) { btn.disabled = false; btn.textContent = 'Try again'; btn.removeAttribute('aria-busy'); }
        showError('We could not send your request.');
      });
  }
  // Copy deck C9: loud inline error, with the phone number, never a silent fail.
  function showError(msg) {
    errBox.textContent = msg + ' Nothing has been lost. Try again, or call ' + (CFG.PHONE || 'us') + ' and we will take it by phone.';
    errBox.hidden = false; errBox.focus();
  }

  /* ---------- init ---------- */
  form.classList.add('js-steps');
  if (!form.getAttribute('action') && CFG.FORM_ENDPOINT) form.setAttribute('action', CFG.FORM_ENDPOINT);
  errBox.hidden = true;
  restoreState();
  syncSlider(false);
  updateEstimate();
  form.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-ineligible-back]')) return backFromReject();
    var t = e.target.closest ? e.target.closest('[data-next],[data-back]') : null;
    if (!t) return;
    if (t.hasAttribute('data-next')) next(); else if (current > 0) show(current - 1, true);
  });
  form.addEventListener('input', function (e) {
    if (e.target.matches('[data-amount-slider]')) syncSlider(true); else if (e.target.name === 'loan_amount') syncSlider(false);
    updateEstimate();
    saveState();
  });
  form.addEventListener('submit', submit);
  form.addEventListener('focusin', startOnce);
  form.addEventListener('input', startOnce);
  show(0, false);
})();
