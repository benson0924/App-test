import type { ReactNode } from 'react';
import type { TranslationTree } from '@/i18n/types';
import Checkpoint from './Checkpoint';
import WorkedExample from './WorkedExample';
import Expandable from './Expandable';
import Section from './Section';
import { useLocale } from '@/context/LocaleContext';
import { useChapterContent, useSectionContent, type ChapterKey } from '@/i18n/hooks';

interface LocalizedSectionProps {
  chapter: ChapterKey;
  sectionId: string;
  title?: string;
  children?: ReactNode;
  widgets?: ReactNode;
  prev?: { title: string; path: string; anchor?: string };
  next?: { title: string; path: string; anchor?: string };
  showConceptLinks?: boolean;
}

function collectStrings(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (value && typeof value === 'object') return Object.values(value).map(String);
  if (typeof value === 'string') return [value];
  return [];
}

function collectItems(value: unknown): TranslationTree[] {
  if (Array.isArray(value)) return value as TranslationTree[];
  if (value && typeof value === 'object') return Object.values(value) as TranslationTree[];
  return [];
}

export function useLocalizedSectionTitle(chapter: ChapterKey, sectionId: string): string {
  const section = useSectionContent(chapter, sectionId);
  if (section?.title) return String(section.title);
  return sectionId;
}

export function LocalizedSectionBody({
  chapter,
  sectionId,
  children,
  widgets,
}: Omit<LocalizedSectionProps, 'title' | 'prev' | 'next' | 'showConceptLinks'>) {
  const { locale } = useLocale();
  const section = useSectionContent(chapter, sectionId);
  if (!section) return <>{widgets}{children}</>;

  const paragraphs = collectStrings(section.paragraphs);
  const checkpoints = collectItems(section.checkpoints);
  const examples = [...collectItems(section.examples), ...collectItems(section.workedExamples)];
  const expandables = collectItems(section.expandables);

  if (locale === 'en') {
    return <>{widgets}{children}</>;
  }

  return (
    <>
      {widgets}
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {expandables.map((ex, i) => (
        <Expandable key={i} title={String(ex.title ?? '')}>
          {collectStrings(ex.body).map((line, j) => (
            <p key={j}>{line}</p>
          ))}
          {collectStrings(ex.paragraphs).map((line, j) => (
            <p key={`p-${j}`}>{line}</p>
          ))}
          {Object.entries(ex).filter(([k]) => k.startsWith('p') && typeof ex[k] === 'string').map(([k, v]) => (
            <p key={k}>{String(v)}</p>
          ))}
          {typeof ex.body === 'string' && <p>{ex.body}</p>}
        </Expandable>
      ))}
      {examples.map((ex, i) => (
        <WorkedExample
          key={i}
          title={String(ex.title ?? '')}
          steps={collectItems(ex.steps).map((s) => ({
            label: String(s.label ?? s.text ?? ''),
            latex: s.latex ? String(s.latex) : undefined,
          }))}
        />
      ))}
      {checkpoints.map((cp, i) => (
        <Checkpoint
          key={i}
          question={String(cp.question ?? '')}
          answer={String(cp.answer ?? '')}
          hint={cp.hint ? String(cp.hint) : undefined}
        />
      ))}
    </>
  );
}

export function LearnSection({
  chapter,
  sectionId,
  children,
  widgets,
  prev,
  next,
  showConceptLinks,
}: LocalizedSectionProps) {
  const title = useLocalizedSectionTitle(chapter, sectionId);
  return (
    <Section
      id={sectionId}
      title={title}
      prev={prev}
      next={next}
      showConceptLinks={showConceptLinks}
    >
      <LocalizedSectionBody chapter={chapter} sectionId={sectionId} widgets={widgets}>
        {children}
      </LocalizedSectionBody>
    </Section>
  );
}

export function useChapterMeta(chapter: ChapterKey) {
  const content = useChapterContent(chapter);
  const meta = (content.meta && typeof content.meta === 'object' && !Array.isArray(content.meta)
    ? content.meta
    : {}) as TranslationTree;
  return {
    tag: String(meta.tag ?? content.tag ?? ''),
    title: String(meta.title ?? content.title ?? ''),
    intro: String(meta.intro ?? content.intro ?? ''),
  };
}
