#!/usr/bin/env node
/**
 * studio-shots.mjs — capture the Studio beats by driving the REAL UI flow
 * (no storage guessing): Market → consent screen → swipe consent → prime →
 * Brief → Capture → Review → Pending. Also captures Home live + Wallet live.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = 'docs/audit';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);

// Studio route for the first job
await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' });
await settle(900);

// Whatever gate renders first, work through it.
for (let round = 0; round < 8; round++) {
  const url = page.url();
  const body = (await page.locator('body').innerText().catch(() => '')).slice(0, 400);

  if (body.includes('Swipe to consent')) {
    await page.screenshot({ path: `${OUT}/07a-consent-sheet.png` });
    // swipe-to-consent: drag the knob right
    const knob = page.locator('button[style*="position: absolute"], [data-swipe], button').filter({ hasText: /→|»/ }).first();
    const box = await knob.boundingBox().catch(() => null);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + 320, box.y + box.height / 2, { steps: 12 });
      await page.mouse.up();
    } else {
      // fallback: keyboard/pointer swipe anywhere on the sheet CTA
      await page.touchscreen?.tap?.(300, 700).catch?.(() => {});
    }
    await settle(900);
    continue;
  }
  if (body.includes('Allow microphone')) {
    await page.screenshot({ path: `${OUT}/07b-mic-prime.png` });
    await page.getByRole('button', { name: /allow microphone/i }).first().click({ timeout: 2000 }).catch(() => {});
    await settle(900);
    continue;
  }
  if (body.includes('swipe') === false && body.includes('Allow microphone') === false) break;
}

await settle(600);
await page.screenshot({ path: `${OUT}/07-brief.png` });

// Brief → Start
try {
  await page.getByRole('button', { name: /start|begin/i }).first().click({ timeout: 2500 });
  await settle(800);
} catch (e) { console.log('start not found:', String(e).slice(0, 80)); }
await page.screenshot({ path: `${OUT}/08-capture.png` });

// Record one line: tap trigger, wait, stop, keep — loop through lines
for (let line = 0; line < 10; line++) {
  const body = (await page.locator('body').innerText().catch(() => ''));
  if (body.includes('clips ready') || body.includes('Listen back')) { await page.screenshot({ path: `${OUT}/09-review.png` }); break; }
  const rec = page.getByRole('button', { name: /tap to record/i }).first();
  if (await rec.isVisible().catch(() => false)) {
    await rec.click({ timeout: 1500 }).catch(() => {});
    await settle(1200);
    const stop = page.getByRole('button', { name: /recording — tap to stop/i }).first();
    await stop.click({ timeout: 1500 }).catch(() => {});
    await settle(500);
  }
  const keep = page.getByRole('button', { name: /keep/i }).first();
  if (await keep.isVisible().catch(() => false)) { await keep.click({ timeout: 1500 }).catch(() => {}); await settle(500); }
  else break;
}
await settle(500);
await page.screenshot({ path: `${OUT}/09-review.png` });

// Submit → Pending
try {
  await page.getByRole('button', { name: /submit/i }).first().click({ timeout: 1500 });
  await settle(900);
  await page.screenshot({ path: `${OUT}/10-pending.png` });
} catch { console.log('submit not found'); }

// Home live + wallet live (session now credited)
await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/05b-home-live.png` });
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/11b-wallet-live.png` });

await browser.close();
console.log('studio shots done');
