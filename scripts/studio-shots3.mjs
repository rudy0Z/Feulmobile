#!/usr/bin/env node
/**
 * studio-shots3.mjs — consent via the motion drag knob: pointerdown on the
 * round knob (width == height, round), drag to maxDrag, pointerup. The knob is
 * a motion.div with drag="x", so synthetic mouse events drive it.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://localhost:4173';
const OUT = 'docs/audit';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);
const shot = async (n) => page.screenshot({ path: `${OUT}/${n}.png` });

await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' });
await settle(900);
await shot('07a-consent-sheet');

// The knob: a round element whose rendered width ≈ height and whose border-radius is 50%.
const knobs = await page.evaluate(() => {
  const els = [...document.querySelectorAll('div')];
  return els
    .filter((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.borderRadius === '50%' && Math.abs(r.width - r.height) < 2 && r.width >= 44 && r.width <= 80 && r.top > 500;
    })
    .map((el) => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y, w: el.getBoundingClientRect().width }));
});
console.log('knob candidates:', JSON.stringify(knobs));

if (knobs.length > 0) {
  const k = knobs[knobs.length - 1];
  const cx = k.x + k.w / 2;
  const cy = k.y + k.w / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  // drag in steps to the right edge of the rail (~330px)
  for (let i = 1; i <= 14; i++) {
    await page.mouse.move(cx + (330 - cx) * (i / 14), cy);
    await page.waitForTimeout(30);
  }
  await page.mouse.up();
  await settle(1100);
  console.log('dragged');
}
await shot('07b-consent-after');

// Walk gates: mic prime (if re-asked) → brief
for (let i = 0; i < 5; i++) {
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
await shot('07-brief3');

try {
  await page.getByRole('button', { name: /start/i }).first().click({ timeout: 2200 });
  await settle(700);
} catch {}
await shot('08-capture3');

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
await shot('09-review3');

try {
  await page.getByRole('button', { name: /submit/i }).first().click({ timeout: 1400 });
  await settle(800);
} catch {}
await shot('10-pending3');

await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' }); await settle(800);
await shot('05b-home-live');
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' }); await settle(800);
await shot('11b-wallet-live');

await browser.close();
console.log('done3');
