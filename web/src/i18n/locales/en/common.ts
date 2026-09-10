import type { TranslationTree } from '@/i18n/types';

export const common: TranslationTree = {
  nav: {
    home: 'Home',
    learn: 'Learn',
    playground: 'Playground',
    reference: 'Reference',
    practice: 'Practice',
    labs: 'Labs',
    circuit: 'Circuit',
    labList: 'Lab list',
  },
  theme: {
    toggle: 'Toggle theme',
    dark: 'Dark',
    light: 'Light',
  },
  search: {
    label: 'Search',
    placeholder: 'Search chapters, sections, labs…',
    noResults: 'No results',
  },
  loading: 'Loading…',
  checkpoint: {
    title: 'Concept Check',
    placeholder: 'Your answer…',
    hint: 'Hint',
    check: 'Check',
    reveal: 'Reveal Answer',
    hide: 'Hide',
    answer: 'Answer:',
    correct: 'Correct!',
    incorrect: 'Not quite — review the explanation or reveal the answer.',
  },
  workedExample: {
    title: 'Worked Example:',
    step: 'Step',
    showNextStep: 'Show next step',
  },
  section: {
    prerequisites: 'Prerequisites',
    nextConcepts: 'Next related concepts',
    interactiveLabs: 'Interactive labs',
  },
  chapterShell: {
    tableOfContents: 'Chapter table of contents',
    readingProgress: '{{progress}}% through chapter',
    prevChapter: 'Previous chapter',
    nextChapter: 'Next chapter',
  },
  language: {
    label: 'Language',
  },
};
