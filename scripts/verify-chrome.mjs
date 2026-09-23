#!/usr/bin/env node
import { chromium } from 'playwright-core';
const BASE = 'http://localhost:4173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' });
await page.evaluate(() => {
  localStorage.setItem('feul_profile', JSON.stringify({
    name: 'Ramesh', initials: 'RM', languages: ['Hindi'], consentLang: 'en',
    upiId: 'ramesh@okaxis', upiLinked: true, upiNameMatched: true,
    verification: 'verified', standing: { level: 2, reliability: 87 },
    craft: { 'lines:Hindi': 74 }, stage: 'credited', walletBalance: 122.5, micPrimed: true,
  }));
  localStorage.setItem('feul_consent', '1');
});
await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const before = await page.evaluate(() => ({
  attr: document.documentElement.getAttribute('data-studio'),
  colour: getComputedStyle(document.querySelector('.statusbar')).color,
}));
await page.getByRole('button', { name: /start/i }).first().click({ timeout: 2500 }).catch(() => {});
await page.waitForTimeout(1200);
const after = await page.evaluate(() => ({
  attr: document.documentElement.getAttribute('data-studio'),
  colour: getComputedStyle(document.querySelector('.statusbar')).color,
  beats: document.body.innerText.slice(0, 60).replace(/\n/g, ' | '),
}));
console.log(JSON.stringify({ brief: before, capture: after }, null, 2));
await browser.close();
