#!/usr/bin/env node
/** wallet-live-after.mjs — capture Wallet with the CORRECT storage keys. */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
const BASE = 'http://localhost:4173';
const OUT = 'docs/audit/after';
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settle = (ms = 900) => page.waitForTimeout(ms);

await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' });
await settle(600);
await page.evaluate(() => {
  const seeded = {
    name: 'Ramesh', initials: 'RM', languages: ['Hindi'], consentLang: 'en',
    upiId: 'ramesh@okaxis', upiLinked: true, upiNameMatched: true,
    verification: 'verified', standing: { level: 2, reliability: 87 },
    craft: { 'lines:Hindi': 74 }, stage: 'credited', walletBalance: 122, micPrimed: true,
  };
  localStorage.setItem('feul_profile', JSON.stringify(seeded));
  localStorage.setItem('feul_consent', '1');
  window.dispatchEvent(new Event('feul:session'));
});
await page.reload({ waitUntil: 'networkidle' });
await settle(900);
await page.screenshot({ path: `${OUT}/11b-wallet-live-after.png` });

// Home live too
await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' }); await settle(900);
await page.screenshot({ path: `${OUT}/05b-home-live-after.png` });

await browser.close();
console.log('live shots done');
