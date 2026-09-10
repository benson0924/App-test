import { useMemo } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { getLocaleBundle } from '@/i18n/locales';
import type { TranslationTree, TranslationValue } from '@/i18n/types';

export type ChapterKey =
  | 'classical'
  | 'oneQubit'
  | 'linearAlgebra'
  | 'multipleQubits'
  | 'quantumCircuits'
  | 'errorCorrection'
  | 'entanglement'
  | 'protocols'
  | 'algorithms'
  | 'qft'
  | 'phaseEstimation'
  | 'shor'
  | 'modern'
  | 'index';

function getNested(tree: TranslationTree, path: string): TranslationValue | undefined {
  const parts = path.split('.');
  let node: TranslationValue | undefined = tree;
  for (const part of parts) {
    if (node === undefined || typeof node === 'string' || Array.isArray(node)) break;
    node = node[part];
  }
  return node;
}

export function useChapterContent(chapter: ChapterKey) {
  const { locale } = useLocale();
  return useMemo(() => {
    const bundle = getLocaleBundle(locale);
    const content = getNested(bundle, `learn.${chapter}`) as TranslationTree | undefined;
    return content ?? {};
  }, [locale, chapter]);
}

export function useSectionContent(chapter: ChapterKey, sectionId: string) {
  const chapterContent = useChapterContent(chapter);
  return (chapterContent.sections as TranslationTree | undefined)?.[sectionId] as TranslationTree | undefined;
}

export function useLabT(labId: string) {
  const { t } = useLocale();
  return (key: string, params?: Record<string, string | number>) =>
    t(`labs.${labId}.${key}`, params);
}

export function useLabSharedT() {
  const { t } = useLocale();
  return (key: string, params?: Record<string, string | number>) =>
    t(`labs.shared.${key}`, params);
}
