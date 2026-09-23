#!/usr/bin/env node
/** verify-taste.mjs — programmatic assertions for the taste-skill fixes. */
import { chromium } from 'playwright-core';
const BASE = 'http://localhost:4173';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
const out = {};

// 1. status bar colour flips on the dark Studio
await page.goto(`${BASE}/contributor`, { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
out.chromeLight = await page.evaluate(() => {
  const el = document.querySelector('.statusbar');
  return el ? getComputedStyle(el).color : null;
});

// seed + walk into the studio
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
await page.waitForTimeout(1200);
out.studioAttr = await page.evaluate(() => document.documentElement.getAttribute('data-studio'));
out.chromeDark = await page.evaluate(() => {
  const el = document.querySelector('.statusbar');
  return el ? getComputedStyle(el).color : null;
});

// 2. no ghost cards left: border+shadow in the same computed element
await page.goto(`${BASE}/contributor/wallet`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
out.ghostCards = await page.evaluate(() => {
  let n = 0;
  for (const el of document.querySelectorAll('#root *')) {
    const s = getComputedStyle(el);
    const bw = parseFloat(s.borderTopWidth) || 0;
    const sh = s.boxShadow && s.boxShadow !== 'none';
    if (bw > 0 && bw <= 1.5 && sh) {
      const blur = (s.boxShadow.match(/(\d+)px/g) || []).length;
      if (blur >= 2) n++;
    }
  }
  return n;
});

// 3. no eyebrow kickers left above h1 on the main screens
out.kickers = await page.evaluate(() => {
  const found = [];
  for (const h of document.querySelectorAll('h1')) {
    const prev = h.previousElementSibling;
    if (prev && prev.tagName === 'SPAN') {
      const s = getComputedStyle(prev);
      if (s.textTransform === 'uppercase') found.push(prev.textContent.trim().slice(0, 24));
    }
  }
  return found;
});

// 4. review beat has no kicker (drive the flow)
await page.goto(`${BASE}/recording/q-lines-1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
out.reviewKicker = await page.evaluate(() => {
  const h = document.querySelector('h1');
  if (!h) return 'no-h1';
  const prev = h.previousElementSibling;
  return prev && prev.tagName === 'SPAN' ? prev.textContent.trim() : null;
});

console.log(JSON.stringify(out, null, 2));
await browser.close();
