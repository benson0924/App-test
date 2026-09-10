import type { Locale, TranslationTree } from '../types';
import { mergeTrees } from '../translator';
import { common as enCommon } from './en/common';
import { navigation as enNavigation } from './en/navigation';
import { home as enHome } from './en/home';
import { curriculum as enCurriculum } from './en/curriculum';
import { labs as enLabs } from './en/labs';
import { reference as enReference } from './en/reference';
import { practice as enPractice } from './en/practice';
import { playground as enPlayground } from './en/playground';
import { common as zhCommon } from './zh-TW/common';
import { navigation as zhNavigation } from './zh-TW/navigation';
import { home as zhHome } from './zh-TW/home';
import { curriculum as zhCurriculum } from './zh-TW/curriculum';
import { labs as zhLabs } from './zh-TW/labs';
import { reference as zhReference } from './zh-TW/reference';
import { practice as zhPractice } from './zh-TW/practice';
import { playground as zhPlayground } from './zh-TW/playground';
import { common as jaCommon } from './ja/common';
import { navigation as jaNavigation } from './ja/navigation';
import { home as jaHome } from './ja/home';
import { curriculum as jaCurriculum } from './ja/curriculum';
import { labs as jaLabs } from './ja/labs';
import { reference as jaReference } from './ja/reference';
import { practice as jaPractice } from './ja/practice';
import { playground as jaPlayground } from './ja/playground';

const bundles: Record<Locale, TranslationTree> = {
  en: mergeTrees(enCommon, enNavigation, enHome, enCurriculum, { labs: enLabs }, { reference: enReference }, { practice: enPractice }, { playground: enPlayground }),
  'zh-TW': mergeTrees(zhCommon, zhNavigation, zhHome, zhCurriculum, { labs: zhLabs }, { reference: zhReference }, { practice: zhPractice }, { playground: zhPlayground }),
  ja: mergeTrees(jaCommon, jaNavigation, jaHome, jaCurriculum, { labs: jaLabs }, { reference: jaReference }, { practice: jaPractice }, { playground: jaPlayground }),
};

export function getLocaleBundle(locale: Locale): TranslationTree {
  return bundles[locale] ?? bundles.en;
}
