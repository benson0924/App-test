import { Link } from 'react-router-dom';
import { useT } from '@/context/LocaleContext';
import { LAB_CHAPTER_ORDER, useLocalizedLabs } from '@/data/localizedNavigation';

export default function PlaygroundIndex() {
  const t = useT();
  const labs = useLocalizedLabs();
  const circuitBuilder = {
    id: 'circuit-builder',
    title: t('playground.index.circuitBuilderTitle'),
    chapter: t('playground.index.chapterCircuits'),
  };
  const allLabs = [...labs, circuitBuilder];
  const labCount = allLabs.length;

  const grouped = allLabs.reduce<Record<string, typeof allLabs>>((acc, lab) => {
    (acc[lab.chapter] ??= []).push(lab);
    return acc;
  }, {});

  const chapterOrder = [
    ...LAB_CHAPTER_ORDER.map((k) => t(`navigation.labChapters.${k}`)),
    t('playground.index.chapterCircuits'),
  ];

  return (
    <div>
      <h1>{t('playground.index.title')}</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '40rem' }}>
        {t('playground.index.intro', { count: labCount })}
      </p>

      {chapterOrder.map((chapter) => {
        const chapterLabs = grouped[chapter];
        if (!chapterLabs?.length) return null;
        return (
          <section key={chapter} style={{ marginTop: '2.5rem' }}>
            <h2>{chapter}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {chapterLabs.map((lab) => (
                <Link
                  key={lab.id}
                  to={`/playground/${lab.id}`}
                  className="card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    margin: 0,
                  }}
                >
                  <span className="tag">{lab.chapter}</span>
                  <h3 style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>{lab.title}</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    /playground/{lab.id}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="section-nav">
        <Link to="/">{t('playground.index.homeLink')}</Link>
        <Link to="/learn">{t('playground.index.learnLink')}</Link>
      </div>
    </div>
  );
}
