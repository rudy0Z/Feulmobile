#!/usr/bin/env node
/**
 * audit-shots.mjs — full-journey capture for the DESIGN AUDIT.
 * Captures every key screen + state at 360 (reference) into docs/audit/.
 * States: empty (fresh session), market, otp, language, consent, prime, brief,
 * capture, review, pending, home-empty, home-live, jobs, wallet, payout steps,
 * profile, rewards, edges, validator.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = 'docs/audit';
fs.mkdirSync(OUT, { recursive: true });

const SHOTS = [
  ['01-market', '/'],
  ['02-otp', '/'],
  ['03-language', '/'],
  ['04-consent', '/contributor/consent'],
  ['05-home-empty', '/contributor'],
  ['06-jobs', '/contributor/quests'],
  ['07-brief', '/recording/q-lines-1'],
  ['08-capture', '/recording/q-lines-1'],
  ['09-review', '/recording/q-lines-1'],
  ['10-pending', '/recording/q-lines-1'],
  ['11-wallet', '/contributor/wallet'],
  ['12-payout-amount', '/contributor/payout'],
  ['13-payout-confirm', '/contributor/payout'],
  ['14-rewards', '/contributor/rewards'],
  ['15-profile', '/contributor/profile'],
  ['16-performance', '/contributor/performance'],
  ['17-edge-room-consent', '/contributor/room-consent'],
  ['18-edge-coverage-full', '/contributor/coverage-full'],
  ['19-edge-dialect', '/contributor/dialect-mismatch'],
  ['20-edge-session-interrupted', '/contributor/session-interrupted'],
  ['21-edge-silent-room', '/contributor/silent-room'],
  ['22-edge-quality-dispute', '/contributor/quality-dispute'],
  ['23-validator', '/validator'],
  ['24-validator-grading', '/validator/grading/task-1'],
  ['25-celebration', '/earning-celebration'],
  ['26-credited', '/contributor/credited'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const settle = async (ms = 900) => { await page.waitForTimeout(ms); };

// 01 market (fresh)
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await settle();
await page.screenshot({ path: `${OUT}/01-market.png` });

// 02 otp: click Google (phone auth path) if reachable
try {
  await page.getByText('Continue with Google', { exact: false }).first().click({ timeout: 2000 });
  await settle(700);
  await page.screenshot({ path: `${OUT}/02-otp.png` });
} catch { console.log('02-otp: click path not found'); }

// 03 language
try {
  await page.locator('input[inputmode]').first().fill('1', { timeout: 1500 }).catch(() => {});
  const boxes = page.locator('input');
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).fill(String(i + 1)).catch(() => {});
  await settle(400);
  const cta = page.getByRole('button', { name: /verify|continue/i }).first();
  if (await cta.isEnabled().catch(() => false)) { await cta.click({ timeout: 1500 }).catch(() => {}); }
  await settle(700);
  await page.screenshot({ path: `${OUT}/03-language.png` });
} catch { console.log('03-language: path not found'); }

// 04 consent
await page.goto(`${BASE}/contributor/consent`, { waitUntil: 'networkidle' }); await settle();
await page.screenshot({ path: `${OUT}/04-consent.png` });

// 05 home (fresh session = empty state)
await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' }); await settle();
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' }); await settle();
await page.screenshot({ path: `${OUT}/05-home-empty.png` });

// 06 jobs
await page.goto(`${BASE}/contributor/quests`, { waitUntil: 'networkidle' }); await settle(1100);
await page.screenshot({ path: `${OUT}/06-jobs.png` });

// 07-10 studio beats (signed in, consented)
await page.evaluate(() => {
  localStorage.setItem('feul.profile', JSON.stringify({
    name: 'Ramesh', initials: 'R', languages: ['Hindi'], consentLang: 'en',
    upiId: 'ramesh@okaxis', upiLinked: true, upiNameMatched: true,
    verification: 'verified', standing: { level: 2, reliability: 87 },
    craft: { 'lines:Hindi': 74, 'scenario:Marathi': 41 }, stage: 'credited',
    walletBalance: 126.5, micPrimed: true,
  }));
  localStorage.setItem('feul.consent', 'true');
});
await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' }); await settle(1000);
await page.screenshot({ path: `${OUT}/07-brief.png` });
// 08 capture: tap start
try {
  await page.getByRole('button', { name: /start|begin|record/i }).first().click({ timeout: 2500 });
  await settle(900);
  await page.screenshot({ path: `${OUT}/08-capture.png` });
} catch { console.log('08-capture: start button not found'); }
// 09 review
try {
  const rec = page.getByRole('button', { name: /recording|stop/i }).first();
  if (await rec.isVisible().catch(() => false)) { await rec.click({ timeout: 2000 }); await settle(400); }
  const keep = page.getByRole('button', { name: /keep/i }).first();
  for (let i = 0; i < 6; i++) { if (await keep.isVisible().catch(() => false)) { await keep.click({ timeout: 1500 }).catch(() => {}); await settle(350); } }
  await settle(500);
  await page.screenshot({ path: `${OUT}/09-review.png` });
} catch { console.log('09-review: path not found'); }
// 10 pending
try {
  const submit = page.getByRole('button', { name: /submit/i }).first();
  if (await submit.isVisible().catch(() => false)) { await submit.click({ timeout: 1500 }); await settle(800); }
  await page.screenshot({ path: `${OUT}/10-pending.png` });
} catch { console.log('10-pending: path not found'); }

// 11 wallet (live session)
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/11-wallet.png` });

// 12-13 payout
await page.goto(`${BASE}/contributor/payout`, { waitUntil: 'networkidle' }); await settle(800);
await page.screenshot({ path: `${OUT}/12-payout-amount.png` });
try {
  const next = page.getByRole('button', { name: /continue|next/i }).first();
  if (await next.isVisible().catch(() => false)) { await next.click({ timeout: 1500 }); await settle(1800); }
  await page.screenshot({ path: `${OUT}/13-payout-confirm.png` });
} catch { console.log('13-payout-confirm: path not found'); }

// 14-16
for (const [name, path] of [['14-rewards', '/contributor/rewards'], ['15-profile', '/contributor/profile'], ['16-performance', '/contributor/performance']]) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }); await settle(800);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

// 17-22 edges
for (const [name, path] of [
  ['17-edge-room-consent', '/contributor/room-consent'],
  ['18-edge-coverage-full', '/contributor/coverage-full'],
  ['19-edge-dialect', '/contributor/dialect-mismatch'],
  ['20-edge-session-interrupted', '/contributor/session-interrupted'],
  ['21-edge-silent-room', '/contributor/silent-room'],
  ['22-edge-quality-dispute', '/contributor/quality-dispute'],
]) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }); await settle(700);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

// 23-24 validator
await page.goto(`${BASE}/validator`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/23-validator.png` });
await page.goto(`${BASE}/validator/grading/task-1`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/24-validator-grading.png` });

// 25-26 celebrations
await page.goto(`${BASE}/earning-celebration`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/25-celebration.png` });
await page.goto(`${BASE}/contributor/credited`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/26-credited.png` });

await browser.close();
console.log('audit shots complete:', fs.readdirSync(OUT).filter(f => f.endsWith('.png')).length);
