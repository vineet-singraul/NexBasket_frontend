const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:5174';

const run = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console.error]', msg.text());
  });
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));

  await context.addInitScript(() => {
    localStorage.setItem(
      'nexbasket_auth',
      JSON.stringify({
        user: { _id: 'test-owner-id-123', role: 'owner', fullName: 'Test Owner' },
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }),
    );
  });

  await page.goto(`${BASE_URL}/owner/category/add`, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Add Category', { timeout: 15000 });
  await page.screenshot({ path: '__01-form.png' });

  const headerIconBtn = page.locator('button').last();
  await headerIconBtn.click();

  await page.waitForSelector('text=Category Details', { timeout: 15000 });
  await page.waitForTimeout(500);

  await page.screenshot({ path: '__02-dialog.png' });

  const appBarInfo = await page.evaluate(() => {
    const appBar = document.querySelector('.MuiAppBar-root');
    const paper = document.querySelector('.MuiDialog-paper');
    const modalRoot = document.querySelector('.MuiModal-root');
    const cards = Array.from(document.querySelectorAll('[class*="SC_card"]'));

    const describe = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className,
        position: cs.position,
        top: cs.top,
        zIndex: cs.zIndex,
        display: cs.display,
        overflow: cs.overflow,
        overflowY: cs.overflowY,
        transform: cs.transform,
        height: cs.height,
        rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, height: rect.height, width: rect.width },
      };
    };

    return {
      appBar: describe(appBar),
      paper: describe(paper),
      modalRoot: describe(modalRoot),
      bodyScroll: { scrollTop: document.body.scrollTop, docScrollTop: document.documentElement.scrollTop },
      cardRects: cards.slice(0, 6).map((el) => {
        const r = el.getBoundingClientRect();
        return { className: el.className, top: r.top, bottom: r.bottom, height: r.height };
      }),
      windowScrollY: window.scrollY,
    };
  });

  console.log('INSPECT RESULT:', JSON.stringify(appBarInfo, null, 2));

  await browser.close();
};

run().catch((err) => {
  console.error('SCRIPT ERROR', err);
  process.exit(1);
});
