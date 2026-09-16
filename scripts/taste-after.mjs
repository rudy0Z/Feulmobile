#!/usr/bin/env node
/** taste-after.mjs — evidence capture for the four taste-skill fix rounds. */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const BASE = 'http://localhost:4173';
const OUT = 'docs/audit/taste';
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);
const shot = (n) => page.screenshot({ path: `${OUT}/${n}.png` });

const seeded = {
  name: 'Ramesh', initials: 'RM', languages: ['Hindi'], consentLang: 'en',
  upiId: 'ramesh@okaxis', upiLinked: true, upiNameMatched: true,
  verification: 'verified', standing: { level: 2, reliability: 87 },
  craft: { 'lines:Hindi': 74, 'scenario:Marathi': 41 }, stage: 'credited',
  walletBalance: 122.5, micPrimed: true,
};

await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await settle();
await page.evaluate((s) => { localStorage.setItem('feul_profile', JSON.stringify(s)); localStorage.setItem('feul_consent', '1'); }, seeded);
await shot('01-market');

for (const [n, p] of [
  ['02-home', '/contributor'],
  ['03-wallet', '/contributor/wallet'],
  ['04-profile', '/contributor/profile'],
  ['05-credited', '/contributor/credited'],
  ['06-room-consent', '/contributor/room-consent'],
  ['07-silent-room', '/contributor/silent-room'],
  ['08-dialect', '/contributor/dialect-mismatch'],
  ['09-quests', '/contributor/quests'],
  ['10-rewards', '/contributor/rewards'],
]) {
  await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle' }); await settle(800);
  await shot(n);
}

// Studio (dark chrome proof) — drag consent, then capture
await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' }); await settle(900);
const knob = await page.evaluate(() => {
  const els = [...document.querySelectorAll('div')];
  const k = els.filter((el) => {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    return s.borderRadius === '50%' && Math.abs(r.width - r.height) < 2 && r.width >= 44 && r.width <= 80 && r.top > 480;
  });
  return k.length ? { x: k[k.length - 1].getBoundingClientRect().x, y: k[k.length - 1].getBoundingClientRect().y, w: k[k.length - 1].getBoundingClientRect().width } : null;
});
if (knob) {
  await page.mouse.move(knob.x + knob.w / 2, knob.y + knob.w / 2);
  await page.mouse.down();
  for (let i = 1; i <= 14; i++) { await page.mouse.move(knob.x + knob.w / 2 + (330 - (knob.x + knob.w / 2)) * (i / 14), knob.y + knob.w / 2); await page.waitForTimeout(30); }
  await page.mouse.up(); await settle(1100);
}
for (let i = 0; i < 4; i++) {
  const b = await page.locator('body').innerText().catch(() => '');
  if (/Allow microphone/i.test(b)) { await page.getByRole('button', { name: /allow microphone/i }).first().click({ timeout: 2000 }).catch(() => {}); await settle(900); continue; }
  break;
}
await settle(500);
await shot('11-brief');
try { await page.getByRole('button', { name: /start/i }).first().click({ timeout: 2200 }); await settle(900); } catch {}
await shot('12-studio');

await browser.close();
console.log('taste shots:', fs.readdirSync(OUT).length);
