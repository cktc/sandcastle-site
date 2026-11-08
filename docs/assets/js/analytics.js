/* analytics.js: attribution capture, consent state, and track() for Meta Pixel + Google.
 * Dependency-free. Load after config.js, with defer, on every page:
 *   <script src="assets/js/config.js" defer></script>
 *   <script src="assets/js/analytics.js" defer></script>
 * Consent banner contract: call Consent.set(true) on accept, Consent.set(false) on decline,
 * and show the banner when Consent.get() === null.
 * The site is limited to three scripts, so the small page behaviours that depend on this file
 * (consent banner, mobile nav toggle, click events, data-cfg filling) live in the "page UI"
 * section at the bottom rather than in a fourth file. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');   // CSS hook: collapse the nav only when JS can open it
  var CFG = window.SITE_CONFIG;
  if (!CFG) { console.error('[analytics] window.SITE_CONFIG missing: load config.js before analytics.js'); return; }

  var CONSENT_KEY = 'site_consent';            // localStorage: 'granted' | 'denied'
  var ATTR_KEY = 'site_attribution';           // sessionStorage: JSON of captured params
  var ATTR_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                     'fbclid', 'gclid', 'gbraid', 'wbraid'];
  var PII_KEY = /e-?mail|phone|mobile|dob|birth|(first|last|full|sur)_?name|address|income|tfn|licen[cs]e/i;

  /* Event table. meta: Meta standard event (null = not sent to Meta; custom: true = trackCustom).
     ga: GA4 event name. Keep in step with team/03_infra_and_tracking.md. */
  var EVENTS = {
    page_view:          { meta: 'ViewContent',        ga: 'page_view' },
    apply_start:        { meta: 'InitiateCheckout',   ga: 'begin_checkout' },
    eligibility_passed: { meta: 'Lead',               ga: 'qualify_lead' },
    eligibility_failed: { meta: 'EligibilityFailed',  ga: 'disqualify_lead', custom: true },
    apply_submitted:    { meta: 'CompleteRegistration', ga: 'generate_lead' },
    apply_step:         { meta: null,                 ga: 'apply_step' },
    // Spec s 7 extras. Map to the spec's names: view_apply = page_view on /apply,
    // start_application = apply_start, submit_application = apply_submitted.
    consent_given:      { meta: null,                 ga: 'consent_given' },
    cta_click:          { meta: null,                 ga: 'cta_click' },
    phone_click:        { meta: null,                 ga: 'phone_click' },
    faq_expand:         { meta: null,                 ga: 'faq_expand' },
    rate_card_view:     { meta: null,                 ga: 'rate_card_view' },
    help_page_view:     { meta: null,                 ga: 'help_page_view' }
  };

  /* ---------- safe storage ---------- */
  function store(area, op, key, val) {
    try { var s = window[area]; return op === 'get' ? s.getItem(key) : op === 'set' ? s.setItem(key, val) : s.removeItem(key); }
    catch (e) { console.warn('[analytics] ' + area + ' unavailable (' + op + ' ' + key + '):', e); return null; }
  }
  function isDebug() {
    return CFG.DEBUG === true || /[?&]debug=1\b/.test(location.search) || store('localStorage', 'get', 'site_debug') === '1';
  }
  function log() {
    if (!isDebug()) return;
    console.log.apply(console, ['[track]'].concat([].slice.call(arguments)));
  }

  /* ---------- consent ---------- */
  var listeners = [];
  var Consent = {
    get: function () { var v = store('localStorage', 'get', CONSENT_KEY); return v === 'granted' ? true : v === 'denied' ? false : null; },
    set: function (granted) {
      store('localStorage', 'set', CONSENT_KEY, granted ? 'granted' : 'denied');
      log('consent', granted ? 'granted' : 'denied');
      listeners.forEach(function (fn) { try { fn(granted); } catch (e) { console.error('[analytics] consent listener failed:', e); } });
    },
    onChange: function (fn) { listeners.push(fn); },
    // True when tracking may fire right now.
    allowed: function () { return CFG.CONSENT_REQUIRED ? Consent.get() === true : Consent.get() !== false; }
  };
  window.Consent = Consent;

  /* ---------- attribution ---------- */
  function captureAttribution() {
    var found = {}, any = false, q = new URLSearchParams(location.search);
    ATTR_PARAMS.forEach(function (k) { var v = q.get(k); if (v) { found[k] = v.slice(0, 200); any = true; } });
    var cur = {};
    try { cur = JSON.parse(store('sessionStorage', 'get', ATTR_KEY) || '{}'); } catch (e) { console.warn('[analytics] bad attribution JSON, resetting', e); }
    if (any) cur = found;                      // last paid click in the session wins
    if (!cur.landing_page) cur.landing_page = location.pathname;
    if (!cur.referrer && document.referrer) cur.referrer = document.referrer.slice(0, 300);
    store('sessionStorage', 'set', ATTR_KEY, JSON.stringify(cur));
    return cur;
  }
  var attribution = captureAttribution();

  function addHiddenFields() {
    var forms = document.querySelectorAll('form[data-track]');
    [].forEach.call(forms, function (form) {
      [].forEach.call(form.querySelectorAll('input[data-attribution]'), function (n) { n.remove(); });
      Object.keys(attribution).forEach(function (k) {
        var i = document.createElement('input');
        i.type = 'hidden'; i.name = k; i.value = attribution[k]; i.setAttribute('data-attribution', '');
        form.appendChild(i);
      });
    });
  }
  // <span data-cfg="ANY_KEY"> -> that SITE_CONFIG value. <a data-cfg-href="tel:{PHONE_TEL}"> -> href.
  function fillConfigText() {
    [].forEach.call(document.querySelectorAll('[data-cfg]'), function (el) {
      var k = el.getAttribute('data-cfg'), v = CFG[k];
      if (v === undefined || typeof v === 'object') console.error('[analytics] unknown or non-text data-cfg key:', k);
      else el.textContent = v;
    });
    [].forEach.call(document.querySelectorAll('[data-cfg-href]'), function (el) {
      el.setAttribute('href', el.getAttribute('data-cfg-href').replace(/\{(\w+)\}/g, function (m, k) {
        if (CFG[k] === undefined) console.error('[analytics] unknown data-cfg-href key:', k);
        return CFG[k] === undefined ? m : CFG[k];
      }));
    });
  }

  /* ---------- lazy vendor loading (only after consent) ---------- */
  var loaded = false;
  function loadScript(src) {
    var s = document.createElement('script'); s.async = true; s.src = src;
    s.onerror = function () { console.error('[analytics] failed to load', src, '(ad blocker or CSP?)'); };
    document.head.appendChild(s);
  }
  function loadVendors() {
    if (loaded) return; loaded = true;
    if (CFG.META_PIXEL_ID) {
      // Standard Meta stub, without the inline <script> so a strict CSP works.
      var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CFG.META_PIXEL_ID);
    }
    var gIds = [CFG.GOOGLE_TAG_ID, CFG.GA4_MEASUREMENT_ID].filter(Boolean);
    if (gIds.length) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      gIds.forEach(function (id) { window.gtag('config', id, { send_page_view: false }); });
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gIds[0]));
    }
    log('vendors loaded', { meta: !!CFG.META_PIXEL_ID, google: gIds });
  }

  /* ---------- track() ---------- */
  var pendingPageView = null;
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }

  function track(name, params) {
    var def = EVENTS[name];
    if (!def) { console.error('[track] unknown event "' + name + '". Add it to EVENTS in analytics.js and the tracking plan.'); return; }
    var p = {};
    Object.keys(params || {}).forEach(function (k) {
      if (PII_KEY.test(k)) console.error('[track] dropped PII-like param "' + k + '" from ' + name);
      else p[k] = params[k];
    });
    var eventId = p.event_id || uid();       // share with server-side CAPI later to dedupe
    p.event_id = eventId;
    p.page_path = p.page_path || location.pathname;
    log(name, p, Consent.allowed() ? '' : '(blocked: no consent)');
    if (!Consent.allowed()) { if (name === 'page_view') pendingPageView = p; return eventId; }

    loadVendors();
    var rest = {}; Object.keys(p).forEach(function (k) { if (k !== 'event_id') rest[k] = p[k]; });
    var a = attribution;
    if (CFG.META_PIXEL_ID && def.meta && window.fbq) {
      window.fbq(def.custom ? 'trackCustom' : 'track', def.meta, rest, { eventID: eventId });
    }
    if (window.gtag && (CFG.GOOGLE_TAG_ID || CFG.GA4_MEASUREMENT_ID)) {
      var g = Object.assign({ campaign_source: a.utm_source, campaign_medium: a.utm_medium, campaign_name: a.utm_campaign }, rest);
      window.gtag('event', def.ga, g);
      var label = CFG.GOOGLE_ADS_CONVERSIONS && CFG.GOOGLE_ADS_CONVERSIONS[name];
      if (label) window.gtag('event', 'conversion', { send_to: label, transaction_id: eventId });
    }
    return eventId;
  }
  window.track = track;
  window.Analytics = { events: EVENTS, attribution: function () { return Object.assign({}, attribution); } };

  /* ---------- page UI: nav toggle, click events, consent banner ---------- */
  function initNav() {
    var btn = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
    if (!btn || !nav) return;
    function setOpen(open) { nav.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); } });
  }
  function initClickEvents() {
    document.addEventListener('click', function (e) {
      var cta = e.target.closest('[data-cta]'), tel = e.target.closest('a[href^="tel:"]');
      if (cta) track('cta_click', { cta_id: cta.getAttribute('data-cta') });
      if (tel) track('phone_click', {});
    });
    // <details> toggle does not bubble, so listen in the capture phase.
    document.addEventListener('toggle', function (e) {
      var d = e.target;
      if (d.matches && d.matches('details.faq__item') && d.open) {
        var q = d.querySelector('summary');
        track('faq_expand', { question: q ? q.textContent.trim().slice(0, 80) : '' });
      }
    }, true);
    var v = document.body.getAttribute('data-track-view');   // e.g. rate_card_view, help_page_view
    if (v) track(v, {});
  }
  function initConsentBanner() {
    var b = document.querySelector('[data-consent-banner]');
    if (!b) return;
    var prefs = b.querySelector('[data-consent-prefs]');
    var opener = null;   // QA fix: element to return focus to; a hidden banner would otherwise drop focus to <body>
    function open() { b.hidden = false; }
    function close() {
      var had = b.contains(document.activeElement);
      b.hidden = true;
      if (had) { var back = (opener && document.contains(opener)) ? opener : document.getElementById('main'); if (back) back.focus(); }
    }
    if (Consent.get() === null) open();
    b.addEventListener('click', function (e) {
      var t = e.target.closest('[data-consent]');
      if (!t) return;
      var a = t.getAttribute('data-consent');
      if (a === 'accept') { Consent.set(true); close(); }
      else if (a === 'reject') { Consent.set(false); close(); }
      else if (a === 'manage') { if (!prefs) { console.error('[analytics] banner has no [data-consent-prefs]'); return; } prefs.hidden = !prefs.hidden; t.setAttribute('aria-expanded', prefs.hidden ? 'false' : 'true'); }
      else if (a === 'save') {
        // One consent flag covers both categories (see Consent above): any ticked box means accept.
        var any = !!prefs && [].some.call(prefs.querySelectorAll('input[type="checkbox"]'), function (c) { return c.checked; });
        Consent.set(any); close();
      }
    });
    [].forEach.call(document.querySelectorAll('[data-consent-open]'), function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); opener = el; open(); var acc = b.querySelector('[data-consent="accept"]'); if (acc) acc.focus(); });
    });
  }

  /* ---------- boot ---------- */
  Consent.onChange(function (granted) {
    if (!granted) return;
    if (pendingPageView) { var p = pendingPageView; pendingPageView = null; track('page_view', p); }
  });
  function boot() {
    fillConfigText();
    initNav();
    initClickEvents();
    initConsentBanner();
    addHiddenFields();
    if (!document.querySelector('meta[name="no-auto-pageview"]')) track('page_view', { page_title: document.title });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
