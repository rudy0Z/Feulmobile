import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4173/contributor/wallet?embed=1', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const r = await page.evaluate(() => new Promise((res) => {
  window.scrollTo(0, document.documentElement.scrollHeight);
  setTimeout(() => {
    const sticky = [...document.querySelectorAll('div')].find(
      (d) => typeof d.className === 'string' && d.className.includes('bottom-20'),
    );
    const stickyTop = sticky ? Math.round(sticky.getBoundingClientRect().top) : null;
    let lastBottom = null;
    const all = document.querySelectorAll('#root *');
    for (const el of all) {
      if (el.children.length === 0 && el.textContent && el.textContent.trim()) {
        const b = el.getBoundingClientRect().bottom;
        if (b < stickyTop && (lastBottom === null || b > lastBottom)) lastBottom = Math.round(b);
      }
    }
    res({
      y: Math.round(window.scrollY),
      doc: document.documentElement.scrollHeight,
      stickyTop,
      lastContentBottom: lastBottom,
      clears: stickyTop !== null && lastBottom !== null ? lastBottom <= stickyTop : null,
    });
  }, 400);
}));
console.log(JSON.stringify(r));
await page.screenshot({ path: 'docs/proof/shots/320-wallet-bottom.png' });
await browser.close();
