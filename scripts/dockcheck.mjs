import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const out = [];
for (const [name, route] of [['profile', '/contributor/profile'], ['rewards', '/contributor/rewards'], ['jobs', '/contributor/quests'], ['home', '/contributor']]) {
  const page = await browser.newPage({ viewport: { width: 320, height: 844 }, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:4173${route}?embed=1`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  const r = await page.evaluate(() => new Promise((res) => {
    window.scrollTo(0, document.documentElement.scrollHeight);
    setTimeout(() => {
      const dock = [...document.querySelectorAll('nav div')].find(
        (d) => typeof d.className === 'string' && d.className.includes('items-center'),
      );
      const dockTop = dock ? Math.round(dock.getBoundingClientRect().top) : null;
      let lastBottom = null;
      for (const el of document.querySelectorAll('#root *')) {
        if (el.children.length === 0 && el.textContent && el.textContent.trim()) {
          const b = el.getBoundingClientRect().bottom;
          if (dockTop !== null && b <= dockTop && (lastBottom === null || b > lastBottom)) lastBottom = Math.round(b);
        }
      }
      res({ dockTop, lastContentBottom: lastBottom, clears: dockTop !== null && lastBottom !== null ? lastBottom <= dockTop : null });
    }, 350);
  }));
  out.push(`${name}: ${JSON.stringify(r)}`);
  await page.close();
}
console.log(out.join('\n'));
await browser.close();
