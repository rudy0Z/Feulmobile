#!/usr/bin/env node
/**
 * studio-shots2.mjs — capture Studio beats via the SwipeButton drag on the
 * ConsentSheet, using the sheet's own component structure. Finds the knob
 * (first motion/button inside the swipe rail) and drags it across.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = 'docs/audit';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);

await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' });
await settle(900);

// The consent sheet is up. Find the widest rounded rail near the bottom and
// drag from its left knob to the right edge.
const shot = async (n) => page.screenshot({ path: `${OUT}/${n}.png` });

// Try every button: the swipe knob is a small circular button (~56-64px) whose
// x is near the rail's left edge. Drag it to (rail.right - 20).
const candidates = await page.locator('button').all();
let swiped = false;
for (const b of candidates) {
  const box = await b.boundingBox().catch(() => null);
  if (!box || box.width < 40 || box.width > 90) continue;
  if (box.y < 500) continue; // knob sits in the bottom CTA area
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(340, box.y + box.height / 2, { steps: 16 });
  await page.mouse.up();
  swiped = true;
  await settle(900);
  break;
}
console.log('swiped:', swiped);
await settle(700);
await shot('07b-consent-after');

// Walk whatever comes next: mic prime → brief
for (let i = 0; i < 6; i++) {
  const body = (await page.locator('body').innerText().catch(() => ''));
  if (/Allow microphone/i.test(body)) {
    await shot('07c-mic-prime');
    await page.getByRole('button', { name: /allow microphone/i }).first().click({ timeout: 2000 }).catch(() => {});
    await settle(900);
    continue;
  }
  break;
}
await settle(500);
await shot('07-brief2');

// Start capture
try {
  await page.getByRole('button', { name: /start/i }).first().click({ timeout: 2200 });
  await settle(700);
} catch {}
await shot('08-capture2');

// Record → stop → keep loop
for (let line = 0; line < 10; line++) {
  const body = (await page.locator('body').innerText().catch(() => ''));
  if (/clips ready|Listen back/i.test(body)) break;
  const rec = page.getByRole('button', { name: /tap to record/i }).first();
  if (!(await rec.isVisible().catch(() => false))) break;
  await rec.click({ timeout: 1200 }).catch(() => {});
  await settle(1100);
  await page.getByRole('button', { name: /recording — tap to stop/i }).first().click({ timeout: 1200 }).catch(() => {});
  await settle(400);
  const keep = page.getByRole('button', { name: /keep/i }).first();
  if (await keep.isVisible().catch(() => false)) { await keep.click({ timeout: 1200 }).catch(() => {}); await settle(450); }
}
await settle(400);
await shot('09-review2');

try {
  await page.getByRole('button', { name: /submit/i }).first().click({ timeout: 1400 });
  await settle(800);
} catch {}
await shot('10-pending2');

await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' }); await settle(800);
await shot('05b-home-live');
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' }); await settle(800);
await shot('11b-wallet-live');

await browser.close();
console.log('done');
