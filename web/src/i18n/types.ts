export type Locale = 'en' | 'zh-TW' | 'ja';

export const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'zh-TW', label: 'Traditional Chinese (Taiwan)', nativeLabel: '繁體中文（臺灣）' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'qc-textbook-locale';

export type TranslationValue = string | TranslationTree | TranslationValue[];
export interface TranslationTree {
  [key: string]: TranslationValue;
}
