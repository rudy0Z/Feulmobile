#!/usr/bin/env node
/**
 * design-metrics.mjs - design-system discipline metrics for this repo.
 *
 * Measures what plans/01-DESIGN-SYSTEM.md + plans/04-ISSUE-MAP.md track:
 *   1. distinct font-size values (approved scale: 11/12/14/16/18/20/24/26/28/30/38/48/64)
 *   2. text sizes <= 12px (readability risk)
 *   3. 1px solid borders
 *   4. boxShadow occurrences
 *   5. gradient occurrences
 *   6. raw hex colors in tsx/ts (theme.css is the token source - exempt)
 *   7. emoji in tsx/ts strings
 *   8. banned brand strings (Feul / Grain)
 *   9. heuristic interactive controls < 44px
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

const APPROVED_SIZES = new Set([11, 12, 14, 16, 18, 20, 24, 26, 28, 30, 38, 48, 64]);
const BRAND_RE = /\b(feul|grain)\b/i;
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'archive', '.git'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx|ts|css)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const m = {
  sizes: new Map(),
  smallText: 0,
  borders1px: 0,
  shadows: 0,
  gradients: 0,
  rawHex: 0,
  emoji: 0,
  brand: 0,
  smallTargets: 0,
};
const examples = { brand: [], emoji: [], rawHex: [], smallTargets: [] };

for (const f of files) {
  const rel = path.relative(ROOT, f);
  const isCss = f.endsWith('.css');
  const isTokenSource = rel.replace(/\\/g, '/').endsWith('src/styles/theme.css');
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const lineNo = i + 1;
    const code = l.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/, '');

    for (const mm of code.matchAll(/fontSize:\s*(\d+(?:\.\d+)?)/g)) {
      const px = Math.round(parseFloat(mm[1]));
      m.sizes.set(px, (m.sizes.get(px) || 0) + 1);
      if (px <= 12) m.smallText++;
    }
    for (const mm of code.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) {
      const px = Math.round(parseFloat(mm[1]));
      m.sizes.set(px, (m.sizes.get(px) || 0) + 1);
      if (px <= 12) m.smallText++;
    }
    for (const mm of code.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)) {
      const px = Math.round(parseFloat(mm[1]));
      m.sizes.set(px, (m.sizes.get(px) || 0) + 1);
      if (px <= 12) m.smallText++;
    }

    if (/1px\s+solid/.test(code)) m.borders1px++;
    if (/boxShadow|box-shadow/.test(code)) m.shadows++;
    if (/linear-gradient|radial-gradient/.test(code)) m.gradients++;

    if (!isTokenSource) {
      for (const mm of code.matchAll(/#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b/g)) {
        m.rawHex++;
        if (examples.rawHex.length < 30) examples.rawHex.push(`${rel}:${lineNo} ${mm[0]}`);
      }
    }

    if (!isCss) {
      if (EMOJI_RE.test(code)) {
        m.emoji++;
        if (examples.emoji.length < 30) examples.emoji.push(`${rel}:${lineNo} ${code.trim().slice(0, 60)}`);
      }
      if (BRAND_RE.test(code) && !/FeulLogo|BrandSlot|feul:session|FeulProfile/.test(code)) {
        m.brand++;
        if (examples.brand.length < 30) examples.brand.push(`${rel}:${lineNo} ${code.trim().slice(0, 60)}`);
      }
    }

    if (!isCss && /<(button|a)\b/i.test(l)) {
      const seg = lines.slice(i, i + 8).join(' ');
      const w = seg.match(/width:\s*(\d+)[,}]/); const h = seg.match(/height:\s*(\d+)[,}]/);
      if (w && h && parseInt(w[1]) < 44 && parseInt(h[1]) < 44 && !seg.includes('width: 1')) {
        m.smallTargets++;
        if (examples.smallTargets.length < 30) examples.smallTargets.push(`${rel}:${lineNo}`);
      }
    }
  }
}

const offScale = [...m.sizes.entries()].filter(([px]) => !APPROVED_SIZES.has(px)).sort((a, b) => b[0] - a[0]);
const sizeLine = [...m.sizes.entries()].sort((a, b) => a[0] - b[0]).map(([px, c]) => `${px}px x${c}`).join(', ');

const out = [];
out.push('# Design metrics baseline');
out.push('');
out.push(`Generated: ${new Date().toISOString()}`);
out.push('');
out.push('| Metric | Count | Target (issue map) |');
out.push('|---|---|---|');
out.push(`| Distinct font sizes | ${m.sizes.size} | 11 (approved scale) |`);
out.push(`| Text instances <= 12px | ${m.smallText} | ~60 (captions only) |`);
out.push(`| 1px solid borders | ${m.borders1px} | < 15 |`);
out.push(`| box-shadow usages | ${m.shadows} | < 10 |`);
out.push(`| gradients | ${m.gradients} | 2 |`);
out.push(`| raw hex in components | ${m.rawHex} | 0 |`);
out.push(`| emoji in code strings | ${m.emoji} | 0 |`);
out.push(`| brand strings (Feul/Grain) | ${m.brand} | 0 |`);
out.push(`| heuristic targets < 44px | ${m.smallTargets} | 0 |`);
out.push('');
out.push(`Sizes in use: ${sizeLine || '(none)'}`);
if (offScale.length) {
  out.push('');
  out.push(`Off-scale sizes: ${offScale.map(([px, c]) => `${px}px x${c}`).join(', ')}`);
}
if (SAVE) {
  out.push('');
  out.push('## Examples: brand strings'); examples.brand.forEach(e => out.push(`- ${e}`));
  out.push('');
  out.push('## Examples: emoji'); examples.emoji.forEach(e => out.push(`- ${e}`));
  out.push('');
  out.push('## Examples: raw hex'); examples.rawHex.forEach(e => out.push(`- ${e}`));
  out.push('');
  out.push('## Examples: small targets'); examples.smallTargets.forEach(e => out.push(`- ${e}`));
}
const report = out.join('\n');
console.log(report);
if (SAVE) {
  fs.writeFileSync(path.join(ROOT, 'plans', 'design-metrics-baseline.md'), report, 'utf8');
  console.log('\nSaved to plans/design-metrics-baseline.md');
}
