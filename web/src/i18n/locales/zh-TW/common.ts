import type { TranslationTree } from '@/i18n/types';

export const common: TranslationTree = {
  nav: {
    home: '首頁',
    learn: '學習',
    playground: '實驗室',
    reference: '參考資料',
    practice: '練習',
    labs: '實驗',
    circuit: '電路',
    labList: '實驗列表',
  },
  theme: {
    toggle: '切換主題',
    dark: '深色',
    light: '淺色',
  },
  search: {
    label: '搜尋',
    placeholder: '搜尋章節、小節、實驗…',
    noResults: '沒有結果',
  },
  loading: '載入中…',
  checkpoint: {
    title: '概念檢核',
    placeholder: '請輸入你的答案…',
    hint: '提示',
    check: '檢查',
    reveal: '顯示答案',
    hide: '隱藏',
    answer: '答案：',
    correct: '正確！',
    incorrect: '尚未正確——請複習說明或顯示答案。',
  },
  workedExample: {
    title: '範例演算：',
    step: '步驟',
    showNextStep: '顯示下一步',
  },
  section: {
    prerequisites: '先備知識',
    nextConcepts: '相關後續概念',
    interactiveLabs: '互動實驗',
  },
  chapterShell: {
    tableOfContents: '章節目錄',
    readingProgress: '已閱讀本章 {{progress}}%',
    prevChapter: '上一章',
    nextChapter: '下一章',
  },
  language: {
    label: '語言',
  },
  edition: '2026 版',
};
