#!/usr/bin/env python3
"""Pre-launch checks for docs/: HTML parses, internal links and assets resolve, #anchors exist,
ids are unique, aria/label references resolve, every data-cfg key exists in config.js (and none
is unused), and page size is within budget. Run from anywhere: python3 team/check_links.py
Exits 1 if anything fails."""
import os, re, sys
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DOCS = os.path.join(ROOT, 'docs')
errors, warnings = [], []

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.refs, self.cfg, self.cfg_href = [], [], [], [], []
        self.labels_for, self.controls, self.stack, self.in_label = set(), [], [], 0
        self.scripts, self.h1 = [], 0
    def handle_starttag(self, tag, a):
        a = dict(a)
        self.stack.append(tag)
        if tag == 'label': self.in_label += 1
        for k in ('href', 'src', 'action'):
            if a.get(k): self.links.append((tag, k, a[k]))
        if a.get('id'): self.ids.append(a['id'])
        for k in ('aria-controls', 'aria-describedby', 'aria-labelledby'):
            for v in (a.get(k) or '').split(): self.refs.append((k, v))
        if a.get('for'): self.labels_for.add(a['for'])
        if a.get('data-cfg'): self.cfg.append(a['data-cfg'])
        if a.get('data-cfg-href'): self.cfg_href += re.findall(r'\{(\w+)\}', a['data-cfg-href'])
        if tag == 'h1': self.h1 += 1
        if tag in ('input', 'select', 'textarea') and a.get('type') not in ('hidden', 'submit', 'button'):
            labelled = bool(a.get('aria-label') or a.get('aria-labelledby')) or self.in_label
            self.controls.append((a.get('id'), a.get('name'), labelled))
    def handle_endtag(self, tag):
        if tag == 'label': self.in_label -= 1
        if self.stack and self.stack[-1] == tag: self.stack.pop()

def check_page(name):
    path = os.path.join(DOCS, name)
    p = Page()
    try:
        p.feed(open(path, encoding='utf-8').read()); p.close()
    except Exception as e:
        errors.append(f'{name}: does not parse: {e}'); return None
    if p.h1 != 1: errors.append(f'{name}: expected one h1, found {p.h1}')
    dup = {i for i in p.ids if p.ids.count(i) > 1}
    if dup: errors.append(f'{name}: duplicate ids {sorted(dup)}')
    for k, v in p.refs:
        if v not in p.ids: errors.append(f'{name}: {k} points at missing id "{v}"')
    for cid, cname, labelled in p.controls:
        if not (labelled or (cid and cid in p.labels_for)):
            errors.append(f'{name}: control {cid or cname} has no label')
    return p

def resolve(page, ref):
    """Return (file path or None, fragment) for an internal reference, or None if external."""
    u = urlparse(ref)
    if u.scheme in ('http', 'https', 'mailto', 'tel', 'data') or ref.startswith('//'): return None
    if u.scheme or ref.startswith('{'): return None
    target = unquote(u.path)
    if target == '': return (os.path.join(DOCS, page), u.fragment)
    # GitHub Pages serves this project at /sandcastle-site/, so root-absolute links carry that prefix (used by 404.html).
    if target.startswith('/sandcastle-site/'): target = target[len('/sandcastle-site'):]
    base = DOCS if target.startswith('/') else os.path.dirname(os.path.join(DOCS, page))
    f = os.path.normpath(os.path.join(base, target.lstrip('/') if target.startswith('/') else target))
    if os.path.isdir(f): f = os.path.join(f, 'index.html')
    return (f, u.fragment)

pages = sorted(f for f in os.listdir(DOCS) if f.endswith('.html'))
parsed = {n: check_page(n) for n in pages}

cfg_src = open(os.path.join(DOCS, 'assets/js/config.js')).read()
cfg_keys = set(re.findall(r'^\s{4}([A-Z0-9_]+):', cfg_src, re.M))
used = set()
for name, p in parsed.items():
    if not p: continue
    used |= set(p.cfg) | set(p.cfg_href)
    for key in set(p.cfg) | set(p.cfg_href):
        if key not in cfg_keys: errors.append(f'{name}: data-cfg key "{key}" is not in config.js')
    for tag, attr, ref in p.links:
        if tag == 'link' and ref.startswith('https://fonts.'): continue
        r = resolve(name, ref)
        if r is None: continue
        f, frag = r
        if not os.path.isfile(f): errors.append(f'{name}: {attr} "{ref}" does not resolve to a file'); continue
        if frag and f.endswith('.html'):
            tp = parsed.get(os.path.basename(f))
            if tp and frag not in tp.ids: errors.append(f'{name}: "{ref}" points at missing anchor #{frag}')
    html = open(os.path.join(DOCS, name)).read()
    if 'style="' in html: errors.append(f'{name}: inline style attribute (blocked by the CSP meta tag)')
    for m in re.findall(r'\{\{\w+\}\}', html): errors.append(f'{name}: unreplaced token {m}')

# Unused config keys are reported, not failed: some are read only by JS (tracking IDs, flags).
js_only = {'META_PIXEL_ID', 'GOOGLE_TAG_ID', 'GA4_MEASUREMENT_ID', 'GOOGLE_ADS_CONVERSIONS', 'FORM_ENDPOINT', 'CONSENT_REQUIRED', 'DEBUG'}
for k in sorted(cfg_keys - used - js_only): warnings.append(f'config.js key "{k}" is not used by any page')

# Size budget (infra doc): HTML plus CSS under 100KB per page, JS under 40KB across the three files.
css = sum(os.path.getsize(os.path.join(DOCS, 'assets/css', f)) for f in os.listdir(os.path.join(DOCS, 'assets/css')))
js = sum(os.path.getsize(os.path.join(DOCS, 'assets/js', f)) for f in os.listdir(os.path.join(DOCS, 'assets/js')))
total = css
for n in pages:
    sz = os.path.getsize(os.path.join(DOCS, n)); total += sz
    if sz + css > 100 * 1024: errors.append(f'{n}: HTML + CSS = {(sz + css) / 1024:.1f}KB, over 100KB')
if js > 40 * 1024: errors.append(f'JS is {js / 1024:.1f}KB, over 40KB')
if total > 100 * 1024: warnings.append(f'all HTML + CSS together = {total / 1024:.1f}KB (over 100KB; the budget is per page)')

# Sitemap lists real pages only, never noindex pages.
sm = open(os.path.join(DOCS, 'sitemap.xml')).read()
for loc in re.findall(r'<loc>([^<]+)</loc>', sm):
    f = loc.rsplit('/', 1)[-1] or 'index.html'
    if not os.path.isfile(os.path.join(DOCS, f)): errors.append(f'sitemap.xml lists {loc}, no such file')
    if f in ('thank-you.html', '404.html'): errors.append(f'sitemap.xml lists noindex page {f}')

print(f'{len(pages)} pages, CSS {css / 1024:.1f}KB, JS {js / 1024:.1f}KB, all HTML + CSS {total / 1024:.1f}KB')
for w in warnings: print('WARN ', w)
for e in errors: print('ERROR', e)
print('FAILED' if errors else 'OK')
sys.exit(1 if errors else 0)
