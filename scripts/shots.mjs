#!/usr/bin/env node
/**
 * shots.mjs — responsive + visual evidence for the contributor section.
 *
 * Renders the contributor routes in a real browser at every supported width
 * (320 / 360 / 390 / 430), asserts there is no horizontal overflow, and writes
 * a PNG per (width, route) plus a text summary. Complements `smoke.mjs`
 * (which asserts the app *runs*): this one asserts it *fits*.
 *
 *   node scripts/shots.mjs            # needs `pnpm preview` on :4173
 *   node scripts/shots.mjs --url http://localhost:5173
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const urlIdx = args.indexOf('--url');
const BASE = urlIdx >= 0 ? args[urlIdx + 1] : 'http://localhost:4173';
const OUT = 'docs/proof/shots';

const WIDTHS = [320, 360, 390, 430];
const ROUTES = [
  ['market', '/'],
  ['home', '/contributor'],
  ['jobs', '/contributor/quests'],
  ['wallet', '/contributor/wallet'],
  ['profile', '/contributor/profile'],
  ['rewards', '/contributor/rewards'],
  ['credited', '/contributor/credited'],
  ['studio', '/recording/q-lines-1'],
  ['payout', '/contributor/payout'],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const summary = [];
let overflows = 0;

for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const [name, route] of ROUTES) {
    await page.goto(`${BASE}${route}?embed=1`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      root: document.querySelector('#root')?.childElementCount ?? 0,
    }));
    const bad = m.overflow > 0 || m.root === 0;
    if (bad) overflows++;
    summary.push(`${bad ? 'FAIL' : 'ok  '} ${String(w).padStart(3)}px  ${name.padEnd(8)} overflow=${m.overflow}  root=${m.root}`);
    await page.screenshot({ path: path.join(OUT, `${w}-${name}.png`) });
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, 'summary.txt'), summary.join('\n') + '\n');
console.log(summary.join('\n'));
console.log(`\n${WIDTHS.length * ROUTES.length - overflows}/${WIDTHS.length * ROUTES.length} shots clean (no overflow, non-empty root)`);
process.exit(overflows ? 1 : 0);
