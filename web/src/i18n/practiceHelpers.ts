import { useLocale } from '@/context/LocaleContext';

/** Build localized practice problem strings from locale keys. */
export function usePracticeT() {
  const { t } = useLocale();
  return (problemId: string, key: string, params?: Record<string, string | number>) =>
    t(`practice.problems.${problemId}.${key}`, params);
}

export function usePracticeUi() {
  const { t } = useLocale();
  return (key: string, params?: Record<string, string | number>) =>
    t(`practice.ui.${key}`, params);
}

export function usePracticeCategory() {
  const { t } = useLocale();
  return (key: string) => t(`practice.categories.${key}`);
}
