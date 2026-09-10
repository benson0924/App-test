import { Link } from 'react-router-dom';
import { useT } from '@/context/LocaleContext';
import { useLocalizedLearnNav } from '@/data/localizedNavigation';
import { useChapterContent } from '@/i18n/hooks';
import type { TranslationTree } from '@/i18n/types';

export default function LearnIndex() {
  const t = useT();
  const learnNav = useLocalizedLearnNav();
  const indexContent = useChapterContent('index');
  const descriptions = (indexContent.descriptions ?? {}) as TranslationTree;

  return (
    <div>
      <h1>{String(indexContent.title ?? t('common.nav.learn'))}</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '40rem' }}>
        {String(indexContent.intro ?? '')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        {learnNav.map((chapter, index) => (
          <Link
            key={chapter.path}
            to={chapter.path}
            className="card"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span className="tag">{t('learn.index.chapterTag', { n: index + 1 })}</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{chapter.title}</h2>
            </div>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {String(descriptions[chapter.path] ?? t('learn.index.fallbackDescription'))}
            </p>
          </Link>
        ))}
      </div>

      <div className="section-nav">
        <Link to="/">{t('learn.index.nav.home')}</Link>
        <Link to="/learn/classical">{t('learn.index.nav.start')}</Link>
      </div>
    </div>
  );
}
