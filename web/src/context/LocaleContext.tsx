import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createTranslator } from '@/i18n/translator';
import { getLocaleBundle } from '@/i18n/locales';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALES,
  type Locale,
  type TranslationTree,
} from '@/i18n/types';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  locales: typeof LOCALES;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
  if (stored && LOCALES.some((l) => l.code === stored)) return stored;
  const lang = navigator.language;
  if (lang.startsWith('zh')) return lang.includes('TW') || lang.includes('Hant') ? 'zh-TW' : 'zh-TW';
  if (lang.startsWith('ja')) return 'ja';
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);
  const [bundle, setBundle] = useState<TranslationTree>(() => getLocaleBundle(locale));

  useEffect(() => {
    setBundle(getLocaleBundle(locale));
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant-TW' : locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useMemo(() => createTranslator(bundle), [bundle]);

  const value = useMemo(
    () => ({ locale, setLocale, t, locales: LOCALES }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useT() {
  return useLocale().t;
}
