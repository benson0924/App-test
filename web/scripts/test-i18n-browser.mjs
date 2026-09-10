import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173';
const RAW_KEY_PATTERN = /^(home|common|navigation|playground|practice|reference|learn)\.[a-zA-Z0-9_.-]+$/;

async function getVisibleText(page) {
  return page.evaluate(() => document.body.innerText);
}

async function assertNoRawKeys(page, label) {
  const text = await getVisibleText(page);
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const raw = lines.filter((l) => RAW_KEY_PATTERN.test(l) || l.includes('home.buttons.') || l.includes('common.nav.'));
  if (raw.length > 0) {
    throw new Error(`${label}: found raw i18n keys: ${raw.slice(0, 8).join(', ')}`);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];

  page.on('pageerror', (e) => errors.push(`JS: ${e.message}`));

  // English homepage
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'EN homepage');
  const enTitle = await page.locator('h1').first().textContent();
  if (!enTitle?.includes('Quantum Computing')) throw new Error(`EN title wrong: ${enTitle}`);

  // Switch to zh-TW
  await page.selectOption('.lang-switcher-select', 'zh-TW');
  await page.waitForTimeout(500);
  await assertNoRawKeys(page, 'zh-TW homepage');
  const zhTitle = await page.locator('h1').first().textContent();
  if (!zhTitle?.includes('量子')) throw new Error(`zh-TW title wrong: ${zhTitle}`);

  // Playground
  await page.goto(`${BASE}/playground`, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'zh-TW playground');
  const labLink = page.locator('a[href*="/playground/bloch-sphere"]').first();
  if (!(await labLink.count())) throw new Error('Bloch sphere lab link missing');
  const labText = await labLink.textContent();
  if (labText?.includes('navigation.labs')) throw new Error(`Lab raw key: ${labText}`);

  // Bloch sphere lab
  await page.goto(`${BASE}/playground/bloch-sphere`, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'zh-TW bloch lab');
  const h1 = await page.locator('h1').first().textContent();
  if (!h1?.includes('Bloch') && !h1?.includes('布洛') && !h1?.includes('ブロッ')) {
    throw new Error(`Bloch lab title unexpected: ${h1}`);
  }

  // Japanese
  await page.selectOption('.lang-switcher-select', 'ja');
  await page.waitForTimeout(300);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'ja homepage');

  // Learn chapter
  await page.goto(`${BASE}/learn/classical`, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'ja learn classical');
  const chapterH1 = await page.locator('article h1, h1').first().textContent();
  if (chapterH1?.includes('learn.classical')) throw new Error(`Chapter raw key: ${chapterH1}`);

  // Practice
  await page.selectOption('.lang-switcher-select', 'en');
  await page.goto(`${BASE}/practice`, { waitUntil: 'networkidle' });
  await assertNoRawKeys(page, 'EN practice');

  await browser.close();

  if (errors.length) {
    console.error('Console errors:', errors);
    process.exit(1);
  }
  console.log('✓ All i18n browser tests passed on', BASE);
}

main().catch((e) => {
  console.error('FAIL:', e.message);
  process.exit(1);
});
