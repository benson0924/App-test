import type { TranslationTree } from '@/i18n/types';

export const common: TranslationTree = {
  nav: {
    home: 'ホーム',
    learn: '学習',
    playground: 'ラボ',
    reference: 'リファレンス',
    practice: '練習',
    labs: 'ラボ',
    circuit: '回路',
    labList: 'ラボ一覧',
  },
  theme: {
    toggle: 'テーマを切り替え',
    dark: 'ダーク',
    light: 'ライト',
  },
  search: {
    label: '検索',
    placeholder: '章・セクション・ラボを検索…',
    noResults: '結果がありません',
  },
  loading: '読み込み中…',
  checkpoint: {
    title: '概念チェック',
    placeholder: '答えを入力…',
    hint: 'ヒント',
    check: '確認',
    reveal: '答えを表示',
    hide: '非表示',
    answer: '答え：',
    correct: '正解！',
    incorrect: 'もう少し——説明を確認するか、答えを表示してください。',
  },
  workedExample: {
    title: '例題：',
    step: 'ステップ',
    showNextStep: '次のステップを表示',
  },
  section: {
    prerequisites: '前提知識',
    nextConcepts: '関連する次の概念',
    interactiveLabs: 'インタラクティブラボ',
  },
  chapterShell: {
    tableOfContents: '章の目次',
    readingProgress: '本章の {{progress}}% を読了',
    prevChapter: '前の章',
    nextChapter: '次の章',
  },
  language: {
    label: '言語',
  },
  edition: '2026年版',
};
