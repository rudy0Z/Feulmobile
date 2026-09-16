#!/usr/bin/env node
/**
 * smoke.mjs — render every route in a real browser and fail on any error.
 *
 * WHY THIS EXISTS (2026-09-16 visual audit):
 * The app shipped a completely blank screen while `pnpm build` exited 0 and all
 * 18 design-metric rows were green. Two runtime failures were invisible to the
 * build:
 *
 *   1. A temporal-dead-zone error in lib/motion.ts — `springs` read
 *      `durations.exit` before `durations` was declared. Valid syntax, valid
 *      types, fails at module evaluation.
 *   2. Four files used `<IconButton>` with no import. A bare identifier is a
 *      legal global reference, so nothing errored until render.
 *
 * Rollup only catches a *named import that doesn't exist*. It cannot catch a
 * TDZ violation or a *missing* import. This script can.
 *
 *   node scripts/smoke.mjs            # start a preview server yourself first
 *   node scripts/smoke.mjs --url http://localhost:5173
 *
 * Exit code 1 on any console error, page error, or an empty #root.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const urlIdx = args.indexOf('--url');
const BASE = urlIdx >= 0 ? args[urlIdx + 1] : 'http://localhost:4173';

/* Every route a reviewer can reach. Add new screens here. */
const ROUTES = [
  '/',
  '/contributor',
  '/contributor/consent',
  '/contributor/quests',
  '/contributor/wallet',
  '/contributor/rewards',
  '/contributor/profile',
  '/contributor/performance',
  '/contributor/payout',
  '/contributor/rewards/claim',
  '/recording/q-lines-1',
  '/recording/q-scen-1',
  '/rejected/q-lines-1',
  '/contributor/room-consent',
  '/contributor/coverage-full',
  '/contributor/campaign-closed',
  '/contributor/dialect-mismatch',
  '/contributor/session-interrupted',
  '/contributor/silent-room',
  '/contributor/campaign-oversubscribed',
  '/contributor/quality-dispute',
  '/contributor/battery-warning',
  '/earning-celebration',
  '/validator',
  '/validator/tasks',
  '/validator/wallet',
  '/validator/rewards',
  '/validator/profile',
  '/validator/grading/t-1',
  '/validator/disagreement/t-1',
  '/validator/accuracy-warning',
  '/validator/queue-empty',
  '/validator-apply',
  '/role-selection',
];

/* A signed-in, consented contributor — so gated screens actually render. */
const SEED = `
  localStorage.setItem('feul_profile', JSON.stringify({
    name: 'Rudraksh', initials: 'R', languages: ['Hindi'], consentLang: 'en',
    upiId: 'rudra@okhdfcbank', upiLinked: true, upiNameMatched: true,
    verification: 'verified', standing: { level: 2, reliability: 78 },
    craft: { 'lines:Hindi': 62 }, stage: 'credited', walletBalance: 268,
    micPrimed: true,
  }));
  localStorage.setItem('feul_consent', '1');
`;

const EXE = process.env.CHROME_PATH
  || 'C:/Users/rudra/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe';

/* Ignore noise that is not a real defect. */
const IGNORE = [
  /favicon/i,
  /Download the React DevTools/i,
  /status of 404.*\.(png|ico|svg)/i,
];

let failures = 0;

const browser = await chromium.launch({
  executablePath: fs.existsSync(EXE) ? EXE : undefined,
});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });

for (const route of ROUTES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' && !IGNORE.some((r) => r.test(m.text()))) errors.push(m.text());
  });
  page.on('pageerror', (e) => {
    if (!IGNORE.some((r) => r.test(e.message))) errors.push('PAGEERROR: ' + e.message);
  });

  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.evaluate(SEED);
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(600);

    const nodes = await page.evaluate(() => document.querySelectorAll('*').length);
    const text = (await page.evaluate(() => document.body.innerText || '')).trim();
    const boundary = /Application Error|ReferenceError|is not defined/i.test(text);

    const problems = [];
    if (nodes < 20) problems.push(`empty render (${nodes} nodes)`);
    if (boundary) problems.push('React error boundary tripped');
    if (errors.length) problems.push(...errors.slice(0, 3));

    if (problems.length) {
      failures++;
      console.log(`FAIL  ${route}`);
      problems.forEach((p) => console.log(`        ${p.slice(0, 160)}`));
    } else {
      console.log(`ok    ${route}  (${nodes} nodes)`);
    }
  } catch (e) {
    failures++;
    console.log(`FAIL  ${route}\n        ${e.message.slice(0, 160)}`);
  }
  await page.close();
}

await browser.close();
console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes render clean`);
process.exit(failures ? 1 : 0);
