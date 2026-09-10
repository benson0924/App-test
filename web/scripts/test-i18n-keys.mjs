#!/usr/bin/env node
/** Smoke-test locale key resolution */
import { getLocaleBundle } from '../src/i18n/locales/index.ts';
import { createTranslator } from '../src/i18n/translator.ts';

const keys = [
  'home.title',
  'home.tag',
  'home.buttons.startLearning',
  'common.nav.home',
  'common.nav.labs',
  'common.language.label',
  'navigation.labs.bb84',
  'navigation.labChapters.algorithms',
  'learn.classical.meta.title',
  'practice.ui.title',
  'playground.index.title',
];

let failed = 0;
for (const locale of ['en', 'zh-TW', 'ja']) {
  const t = createTranslator(getLocaleBundle(locale));
  console.log(`\n=== ${locale} ===`);
  for (const key of keys) {
    const val = t(key);
    const ok = val !== key && val.length > 0;
    if (!ok) {
      failed++;
      console.log(`FAIL ${key} => ${val}`);
    } else {
      console.log(`OK   ${key} => ${val.slice(0, 50)}${val.length > 50 ? '…' : ''}`);
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} key(s) failed`);
  process.exit(1);
}
console.log('\nAll keys resolved.');
