#!/usr/bin/env node
/** after-shots.mjs — re-capture the fixed screens for before/after evidence. */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const BASE = 'http://localhost:4173';
const OUT = 'docs/audit/after';
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);
const shot = async (n) => page.screenshot({ path: `${OUT}/${n}.png` });

// Market (BrandSlot / IllustrationSlot placeholder redesign)
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await settle();
await shot('01-market-after');

// Wallet (sticky stack fix) — fresh + live
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' }); await settle(900);
await shot('11-wallet-after');
await page.evaluate(() => {
  const seeded = {
    name: 'Ramesh', initials: 'RM', languages: ['Hindi'], consentLang: 'en',
    upiId: 'ramesh@okaxis', upiLinked: true, upiNameMatched: true,
    verification: 'verified', standing: { level: 2, reliability: 87 },
    craft: { 'lines:Hindi': 74 }, stage: 'credited', walletBalance: 122, micPrimed: true,
  };
  for (const k of Object.keys(localStorage)) { if (/feul|profile|consent/i.test(k)) localStorage.removeItem(k); }
  localStorage.setItem('feul:profile', JSON.stringify(seeded));
  localStorage.setItem('feul:consent', '1');
});
await page.reload({ waitUntil: 'networkidle' }); await settle(900);
await shot('11b-wallet-live-after');

// Profile (avatar initials)
await page.goto(`${BASE}/contributor/profile`, { waitUntil: 'networkidle' }); await settle(900);
await shot('15-profile-after');

// Credited (chain-true amount)
await page.goto(`${BASE}/contributor/credited`, { waitUntil: 'networkidle' }); await settle(900);
await shot('26-credited-after');

// Edge with personas fixed
await page.goto(`${BASE}/contributor/room-consent`, { waitUntil: 'networkidle' }); await settle(800);
await shot('17-edge-room-consent-after');
await page.goto(`${BASE}/contributor/silent-room`, { waitUntil: 'networkidle' }); await settle(800);
await shot('21-edge-silent-room-after');

// OTP disabled-state redesign
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' }); await settle();
try {
  await page.getByText(/Continue with (Google|Phone)/i).first().click({ timeout: 2000 });
  await settle(700);
  await shot('02-otp-after');
} catch { console.log('otp path missed'); }

await browser.close();
console.log('after shots done:', fs.readdirSync(OUT).length);
