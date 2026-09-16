#!/usr/bin/env node
/**
 * design-metrics.mjs - design-system discipline metrics for this repo.
 *
 * Gate re-baselined 2026-09-16 (owner decision, "Hybrid").
 *
 * WHY: the old targets (borders < 15, shadows < 10, gradients 2) were
 * arithmetically unreachable with 68 screens, a mandated 1px border on
 * non-hero objects, and exactly one e-2 hero per viewport. Chasing them
 * would have burned weeks and made the design worse. They measured a
 * *total* where the real intent was a *structure*.
 *
 * So: borders and shadows are now STRUCTURAL rules (checked per screen,
 * not summed across the app), and gradients keep a raised count because
 * gradient masks legitimately repeat on CTAs.
 *
 *   1. distinct type sizes  - 8 steps, resolved through --fs-* tokens
 *   2. raw font-size values - must be 0 (everything goes through tokens)
 *   3. 12px instances       - chrome only, ceiling
 *   4. double border in one style object   - structural, must be 0
 *   5. border density per screen           - structural, ceiling
 *   6. >1 hero shadow per screen           - structural, must be 0
 *   7. gradients            - raised ceiling (masks)
 *   8. raw hex in components (theme.css is the token source - exempt)
 *   9. emoji in tsx/ts strings
 *  10. banned brand strings (Feul / Grain)
 *  11. heuristic interactive controls < 44px
 *
 * Usage:
 *   node scripts/design-metrics.mjs [--root <repo>] [--save]
 * Exit code is always 0 (measurement tool, not a gate - yet).
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const rootIdx = args.indexOf('--root');
const ROOT = rootIdx >= 0 ? args[rootIdx + 1] : process.cwd();
const SAVE = args.includes('--save');

const BRAND_RE = /\b(feul|grain)\b/i;
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;

/* ── The locked 8-step scale (theme.css is the source of truth) ─────── */
const THEME = path.join(ROOT, 'src', 'styles', 'theme.css');
const TOKEN_PX = new Map();
if (fs.existsSync(THEME)) {
  for (const mm of fs.readFileSync(THEME, 'utf8').matchAll(/--fs-([a-z]+):\s*(\d+)px/g)) {
    TOKEN_PX.set(`--fs-${mm[1]}`, parseInt(mm[2], 10));
  }
}
const APPROVED_PX = new Set(TOKEN_PX.values());
const CAPTION_PX = 12;

/* ── Thresholds (the gate) ──────────────────────────────────────────── */
const LIMITS = {
  typeSizes: 8,
  rawFontSize: 0,
  captionInstances: 150,
  doubleBorderStyleObjects: 0,
  /* Smoke alarm for runaway outlining, NOT a density target. Measured
     2026-09-16: 46 screens, median 3, p90 7, max 9 — screens legitimately
     stack several cards (PayoutFlow's 5 steps, Profile's sections). The
     real "borders inside borders" failure is caught by
     doubleBorderStyleObjects, which is 0. */
  bordersPerScreen: 10,
  heroShadowsPerComponent: 1,
  gradients: 30,
  rawHex: 0,
  rawRgb: 0,
  /* ── Adoption ratchets ──────────────────────────────────────────────
     Baseline = the value measured on 2026-09-16 when the rows were added.
     These can only go DOWN. A raw value is not a bug on its own — it is a
     token the design has not adopted yet. The ratchet stops it growing
     while the scale is adopted screen by screen. */
  rawSpacing: 0,
  rawDuration: 0,
  rawRadius: 0,
  primLeaks: 11,
  /* Hand-rolled <button> elements. The <44px heuristic above only inspects
     INLINE width/height, so a button styled by a shared const (e.g. the old
     `backBtn` in Recording.tsx) slipped past it with no hit area at all —
     75 of these 117 have no inline sizing. Ratchet: migrate to Button /
     IconButton, which own the floor. */
  rawButtons: 116,
  /* Every var() must point at a token that exists. Not a ratchet — 0. */
  undefinedTokens: 0,
  emoji: 0,
  brand: 0,
  smallTargets: 0,
};

/* Dev / presentation chrome never ships as app UI, so it is exempt from the
   shipped-app rules. DevPanel is gated behind import.meta.env.DEV (P0-6);
   PhoneFrame is the desktop phone shell — its radii are bezel and screen
   geometry (58/48/20/4/3/2), not app surfaces. */
const DEV_ONLY = new Set(['src/app/components/DevPanel.tsx', 'src/app/components/PhoneFrame.tsx']);

/* Motion token source — the JS mirror of the CSS --duration-* tokens.
   Raw duration literals are allowed here and nowhere else. */
const MOTION_SOURCE = 'src/app/lib/motion.ts';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'archive', '.git'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts|css|html)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const m = {
  sizes: new Map(),
  rawFontSize: 0,
  captionInstances: 0,
  doubleBorderStyleObjects: 0,
  bordersPerScreen: new Map(),
  multiHero: [],
  gradients: 0,
  rawHex: 0,
  rawRgb: 0,
  rawSpacing: 0,
  rawDuration: 0,
  rawRadius: 0,
  primLeaks: 0,
  undefinedTokens: 0,
  rawButtons: 0,
  emoji: 0,
  brand: 0,
  smallTargets: 0,
};
const examples = { brand: [], emoji: [], rawHex: [], rawRgb: [], smallTargets: [], rawFontSize: [], doubleBorder: [], rawSpacing: [], rawDuration: [], rawRadius: [], primLeaks: [], undefinedTokens: [] };

/* Every custom property theme.css defines — the reference set for the
   undefined-token check. A var() pointing at a token that does not exist is
   silently dropped by the browser, which is how --t-verdigris-600 shipped
   broken across 7 call sites in 6 screens. */
const DEFINED = new Set();
if (fs.existsSync(THEME)) {
  for (const mm of fs.readFileSync(THEME, 'utf8').matchAll(/(--[a-z0-9-]+)\s*:/gi)) {
    DEFINED.add(mm[1]);
  }
}

/* Count border declarations inside a single style={{ ... }} block.
   Two or more = the element outlines itself twice (border + borderTop,
   or a card drawing its own frame over its parent's). That is the
   "borders inside borders" failure the old <15 target was reaching for. */
function styleObjects(src) {
  const out = [];
  let i = 0;
  while ((i = src.indexOf('style={{', i)) !== -1) {
    let depth = 0, j = i + 7;
    for (; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') { depth--; if (depth === 0) break; }
    }
    out.push(src.slice(i, j + 1));
    i = j + 1;
  }
  return out;
}

const BORDER_DECL = /(^|[^a-zA-Z-])border(-[a-z]+)?:\s*['"]?1px\s+solid/g;

for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const isCss = f.endsWith('.css');
  const isHtml = f.endsWith('.html');
  const isTokenSource = rel.endsWith('src/styles/theme.css');
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);

  /* Track multi-line HTML comment spans. The per-line strips below handle
     JS/CSS comments, but `<!-- … -->` can run across lines — without this a
     note *about* the brand strings trips the brand-string check. index.html
     was also never scanned at all until the 2026-09-16 audit, which is how
     "Feul Mobile" sat in the browser tab undetected. */
  const inHtmlComment = new Array(lines.length).fill(false);
  if (isHtml) {
    let inside = false;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const opens = l.indexOf('<!--');
      const closes = l.indexOf('-->');
      if (inside) {
        inHtmlComment[i] = true;
        if (closes !== -1) inside = false;
      } else if (opens !== -1 && (closes === -1 || closes < opens)) {
        inHtmlComment[i] = true;
        inside = true;
      }
    }
  }

  const isScreen = /src\/app\/components\/(validator\/)?[A-Z][A-Za-z]*\.tsx$/.test(rel);
  let fileBorders = 0;
  let fileHeroShadows = 0;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const lineNo = i + 1;
    const code = l.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '');

    /* type — token form */
    for (const mm of code.matchAll(/fontSize:\s*'var\((--fs-[a-z]+)\)'/g)) {
      const px = TOKEN_PX.get(mm[1]);
      if (px === undefined) continue;
      m.sizes.set(px, (m.sizes.get(px) || 0) + 1);
      if (px <= CAPTION_PX) m.captionInstances++;
    }
    /* type — raw numbers are now a violation in their own right.
       theme.css is exempt: it is the token source, so it is the one
       place allowed to state a literal size. */
    if (!isTokenSource) {
      for (const rx of [/fontSize:\s*(\d+(?:\.\d+)?)\b/g, /font-size:\s*(\d+(?:\.\d+)?)px/g, /text-\[(\d+(?:\.\d+)?)px\]/g]) {
        for (const mm of code.matchAll(rx)) {
          const px = Math.round(parseFloat(mm[1]));
          m.rawFontSize++;
          m.sizes.set(px, (m.sizes.get(px) || 0) + 1);
          if (px <= CAPTION_PX) m.captionInstances++;
          if (examples.rawFontSize.length < 30) examples.rawFontSize.push(`${rel}:${lineNo} ${mm[0]}`);
        }
      }
    }

    if (/1px\s+solid/.test(code)) fileBorders++;
    if (/var\(--e-2\)/.test(code)) fileHeroShadows++;
    if (/linear-gradient|radial-gradient/.test(code)) m.gradients++;

    if (!isTokenSource) {
      for (const mm of code.matchAll(/#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b/g)) {
        m.rawHex++;
        if (examples.rawHex.length < 30) examples.rawHex.push(`${rel}:${lineNo} ${mm[0]}`);
      }
      /* The hex rule has a blind spot: it never caught rgba(). 151 literal
         rgba() calls were hiding here. Colour channels must come from the
         --*-rgb tokens so alpha tints stay locked to the palette. */
      for (const mm of code.matchAll(/rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/g)) {
        m.rawRgb++;
        if (examples.rawRgb.length < 30) examples.rawRgb.push(`${rel}:${lineNo} ${mm[0]}`);
      }
    }

    /* ── Adoption ratchets + the undefined-token check ────────────────
       Added 2026-09-16 after the foundation audit (F1/F2/F3/F8). Four of
       the five token axes had rotted unnoticed because the script only
       checked colour and type. These rows make every axis visible, and
       the undefined-token row catches the class of bug where a var()
       points at a token that was never defined — silently dropped by the
       browser. That is exactly how --t-verdigris-600 shipped broken
       across 7 call sites in 6 screens, including the DPDP consent shield. */
    if (!isTokenSource) {
      /* [1-9] leading digit: a literal `0` is the ABSENCE of spacing, not a
         spacing decision, so it is not drift. `margin: 0` needs no token. */
      for (const mm of code.matchAll(/(?:padding|paddingTop|paddingBottom|paddingLeft|paddingRight|margin|marginTop|marginBottom|marginLeft|marginRight|gap|rowGap|columnGap):\s*'?([1-9]\d*)\b/g)) {
        m.rawSpacing++;
        if (examples.rawSpacing.length < 30) examples.rawSpacing.push(`${rel}:${lineNo} ${mm[0].trim()}`);
      }
      for (const mm of code.matchAll(/\bduration:\s*(\d+(?:\.\d+)?)\b/g)) {
        if (rel === MOTION_SOURCE) continue;   // the motion token source
        /* 0 is "no animation" (the reduced-motion path), and >= 0.5s is an
           ambient loop or a deliberate delay. Neither is transition timing. */
        const d = parseFloat(mm[1]);
        if (d === 0 || d >= 0.5) continue;
        m.rawDuration++;
        if (examples.rawDuration.length < 30) examples.rawDuration.push(`${rel}:${lineNo} ${mm[0]}`);
      }
      /* [1-9]: a literal 0 is a square corner — the ABSENCE of a radius. */
      for (const mm of code.matchAll(/borderRadius:\s*['"]?([1-9]\d*)(%?)/g)) {
        if (mm[2] === '%') continue;   // 50% is a legitimate circle, not drift
        if (DEV_ONLY.has(rel)) continue;
        m.rawRadius++;
        if (examples.rawRadius.length < 30) examples.rawRadius.push(`${rel}:${lineNo} ${mm[0]}`);
      }
      for (const mm of code.matchAll(/var\((--t-[a-z]+-\d+)\)/g)) {
        m.primLeaks++;
        if (examples.primLeaks.length < 30) examples.primLeaks.push(`${rel}:${lineNo} ${mm[0]}`);
      }
      for (const mm of code.matchAll(/<button\b/g)) {
        m.rawButtons++;
      }
      for (const mm of code.matchAll(/var\((--[a-z0-9-]+)/gi)) {
        const tok = mm[1];
        if (tok.endsWith('-')) continue;                             // partial, e.g. inside a comment
        if (tok.startsWith('--t-') && /-\d+$/.test(tok)) continue;   // primitives: see primLeaks
        if (!DEFINED.has(tok)) {
          m.undefinedTokens++;
          if (examples.undefinedTokens.length < 30) examples.undefinedTokens.push(`${rel}:${lineNo} ${tok}`);
        }
      }
    }

    if (!isCss && !inHtmlComment[i]) {
      if (EMOJI_RE.test(code)) {
        m.emoji++;
        if (examples.emoji.length < 30) examples.emoji.push(`${rel}:${lineNo} ${code.trim().slice(0, 60)}`);
      }
      if (BRAND_RE.test(code) && !/FeulLogo|BrandSlot|feul:session|FeulProfile/.test(code)) {
        m.brand++;
        if (examples.brand.length < 30) examples.brand.push(`${rel}:${lineNo} ${code.trim().slice(0, 60)}`);
      }
    }

    if (!isCss && !DEV_ONLY.has(rel) && /<(button|a)\b/i.test(l)) {
      const seg = lines.slice(i, i + 8).join(' ');
      const w = seg.match(/width:\s*(\d+)[,}]/); const h = seg.match(/height:\s*(\d+)[,}]/);
      if (w && h && parseInt(w[1]) < 44 && parseInt(h[1]) < 44 && !seg.includes('width: 1')) {
        m.smallTargets++;
        if (examples.smallTargets.length < 30) examples.smallTargets.push(`${rel}:${lineNo}`);
      }
    }
  }

  for (const so of styleObjects(t)) {
    const n = [...so.matchAll(BORDER_DECL)].length;
    if (n > 1) {
      m.doubleBorderStyleObjects++;
      if (examples.doubleBorder.length < 30) examples.doubleBorder.push(`${rel} (${n} border declarations in one style object)`);
    }
  }

  if (isScreen) {
    m.bordersPerScreen.set(rel, fileBorders);
    /* Hero shadows are counted PER COMPONENT, not per file. One file can hold
       several mutually exclusive views (CampaignClosedHonour has Filled and
       Withdrawn), and each is its own viewport — per-file counting flagged
       them as violations when each view correctly had exactly one hero. */
    const starts = [...t.matchAll(/^(?:export\s+)?function\s+([A-Za-z0-9_]+)\s*\(/gm)];
    const bounds = starts.map((s) => ({ name: s[1], at: s.index }));
    bounds.push({ name: '<module>', at: t.length });
    for (let k = 0; k < bounds.length - 1; k++) {
      const body = t.slice(bounds[k].at, bounds[k + 1].at);
      const n = [...body.matchAll(/var\(--e-2\)/g)].length;
      if (n > LIMITS.heroShadowsPerComponent) {
        m.multiHero.push(`${rel} — ${bounds[k].name}() has ${n}`);
      }
    }
  }
}

const denseBorderScreens = [...m.bordersPerScreen.entries()].filter(([, n]) => n > LIMITS.bordersPerScreen);
const multiHeroComponents = m.multiHero;

const ok = (v, limit, cmp = 'max') => (cmp === 'max' ? v <= limit : v >= limit);
const mark = (v, limit) => (ok(v, limit) ? '' : '  <-- OVER');

const sizeLine = [...m.sizes.entries()].sort((a, b) => a[0] - b[0]).map(([px, c]) => `${px}px x${c}`).join(', ');
const offScale = [...m.sizes.entries()].filter(([px]) => !APPROVED_PX.has(px));

const out = [];
out.push('# Design metrics baseline');
out.push('');
out.push(`Generated: ${new Date().toISOString()}`);
out.push('');
out.push('Gate: hybrid (structural for borders/shadows, count for gradients).');
out.push('');
out.push('| Metric | Count | Rule |');
out.push('|---|---|---|');
out.push(`| Distinct type sizes | ${m.sizes.size} | <= ${LIMITS.typeSizes} (locked scale)${mark(m.sizes.size, LIMITS.typeSizes)} |`);
out.push(`| Raw font-size values | ${m.rawFontSize} | ${LIMITS.rawFontSize} (tokens only)${mark(m.rawFontSize, LIMITS.rawFontSize)} |`);
out.push(`| 12px instances (chrome) | ${m.captionInstances} | <= ${LIMITS.captionInstances}${mark(m.captionInstances, LIMITS.captionInstances)} |`);
out.push(`| Double border in one style object | ${m.doubleBorderStyleObjects} | ${LIMITS.doubleBorderStyleObjects}${mark(m.doubleBorderStyleObjects, LIMITS.doubleBorderStyleObjects)} |`);
out.push(`| Screens over ${LIMITS.bordersPerScreen} borders | ${denseBorderScreens.length} | 0${mark(denseBorderScreens.length, 0)} |`);
out.push(`| Components with >${LIMITS.heroShadowsPerComponent} hero shadow | ${multiHeroComponents.length} | 0${mark(multiHeroComponents.length, 0)} |`);
out.push(`| gradients | ${m.gradients} | <= ${LIMITS.gradients} (masks)${mark(m.gradients, LIMITS.gradients)} |`);
out.push(`| raw hex in components | ${m.rawHex} | ${LIMITS.rawHex}${mark(m.rawHex, LIMITS.rawHex)} |`);
out.push(`| literal rgba() in components | ${m.rawRgb} | ${LIMITS.rawRgb} (use --*-rgb)${mark(m.rawRgb, LIMITS.rawRgb)} |`);
out.push(`| emoji in code strings | ${m.emoji} | ${LIMITS.emoji}${mark(m.emoji, LIMITS.emoji)} |`);
out.push(`| brand strings (Feul/Grain) | ${m.brand} | ${LIMITS.brand}${mark(m.brand, LIMITS.brand)} |`);
out.push(`| heuristic targets < 44px | ${m.smallTargets} | ${LIMITS.smallTargets}${mark(m.smallTargets, LIMITS.smallTargets)} |`);
out.push('');
out.push('**Adoption ratchets** — raw values are tokens the design has not adopted yet. These can only go down.');
out.push('');
out.push('| Metric | Count | Ratchet (baseline 2026-09-16) |');
out.push('|---|---|---|');
out.push(`| raw spacing values | ${m.rawSpacing} | <= ${LIMITS.rawSpacing}${mark(m.rawSpacing, LIMITS.rawSpacing)} |`);
out.push(`| raw duration values | ${m.rawDuration} | <= ${LIMITS.rawDuration}${mark(m.rawDuration, LIMITS.rawDuration)} |`);
out.push(`| raw borderRadius values | ${m.rawRadius} | <= ${LIMITS.rawRadius}${mark(m.rawRadius, LIMITS.rawRadius)} |`);
out.push(`| primitive-token leaks | ${m.primLeaks} | <= ${LIMITS.primLeaks}${mark(m.primLeaks, LIMITS.primLeaks)} |`);
out.push(`| hand-rolled <button> elements | ${m.rawButtons} | <= ${LIMITS.rawButtons}${mark(m.rawButtons, LIMITS.rawButtons)} |`);
out.push(`| undefined token references | ${m.undefinedTokens} | ${LIMITS.undefinedTokens}${mark(m.undefinedTokens, LIMITS.undefinedTokens)} |`);
out.push('');
out.push(`Type tokens resolved from theme.css: ${[...TOKEN_PX.entries()].map(([k, v]) => `${k.replace('--fs-', '')}=${v}`).join(', ')}`);
out.push('');
out.push(`Sizes in use: ${sizeLine || '(none)'}`);
if (offScale.length) {
  out.push('');
  out.push(`OFF-SCALE sizes: ${offScale.map(([px, c]) => `${px}px x${c}`).join(', ')}`);
}
if (denseBorderScreens.length) {
  out.push('');
  out.push('## Screens over border density');
  denseBorderScreens.sort((a, b) => b[1] - a[1]).forEach(([r, n]) => out.push(`- ${r} (${n})`));
}
if (multiHeroComponents.length) {
  out.push('');
  out.push('## Components with more than one hero shadow');
  multiHeroComponents.forEach((r) => out.push(`- ${r}`));
}
if (SAVE) {
  const section = (title, arr) => { out.push(''); out.push(`## Examples: ${title}`); arr.forEach((e) => out.push(`- ${e}`)); };
  section('brand strings', examples.brand);
  section('emoji', examples.emoji);
  section('raw hex', examples.rawHex);
  section('literal rgba()', examples.rawRgb);
  section('raw font-size values', examples.rawFontSize);
  section('double border style objects', examples.doubleBorder);
  section('small targets', examples.smallTargets);
  section('raw spacing values', examples.rawSpacing);
  section('raw duration values', examples.rawDuration);
  section('raw borderRadius values', examples.rawRadius);
  section('primitive-token leaks', examples.primLeaks);
  section('UNDEFINED token references', examples.undefinedTokens);
}
const report = out.join('\n');
console.log(report);
if (SAVE) {
  fs.writeFileSync(path.join(ROOT, 'plans', 'design-metrics-baseline.md'), report, 'utf8');
  console.log('\nSaved to plans/design-metrics-baseline.md');
}
