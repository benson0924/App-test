import { Link } from 'react-router-dom';
import { useT } from '@/context/LocaleContext';
import { useLocalizedLearnNav, useLocalizedLabs } from '@/data/localizedNavigation';

const featuredLabIds = [
  'bloch-sphere',
  'circuit-builder',
  'teleportation',
  'grover',
  'bb84',
  'shor',
  'gate-explorer',
  'logic-gates',
] as const;

const pathPhaseKeys = ['foundation', 'multiQubit', 'algorithms'] as const;

function labPath(id: string) {
  return id === 'circuit-builder' ? '/playground/circuit-builder' : `/playground/${id}`;
}

export default function HomePage() {
  const t = useT();
  const learnNav = useLocalizedLearnNav();
  const labs = useLocalizedLabs();
  const labCount = labs.length + 1;

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <span className="tag">{t('home.tag')}</span>
        <h1 style={{ marginTop: '1rem', fontSize: '2.75rem', lineHeight: 1.15 }}>
          {t('home.title')}
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '36rem' }}>
          {t('home.subtitle')}
        </p>
        <p style={{ marginTop: '1.5rem', maxWidth: '40rem' }}>
          {t('home.description', { labCount })}
        </p>
      </header>

      <div className="btn-group" style={{ marginBottom: '1.5rem' }}>
        <Link to="/learn" className="btn btn-primary">{t('home.buttons.startLearning')}</Link>
        <Link to="/playground" className="btn btn-primary">{t('home.buttons.openPlayground', { labCount })}</Link>
        <Link to="/playground/circuit-builder" className="btn">{t('home.buttons.circuitBuilder')}</Link>
        <Link to="/practice" className="btn">{t('home.buttons.practice')}</Link>
      </div>

      <section className="card" style={{ marginBottom: '1.5rem', borderColor: 'var(--accent)', borderWidth: 2 }}>
        <h2 style={{ marginTop: 0 }}>{t('home.featuredLabs.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          {t('home.featuredLabs.description', { labCount })}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.75rem',
            marginTop: '1rem',
          }}
        >
          {featuredLabIds.map((id) => (
            <Link
              key={id}
              to={labPath(id)}
              className="btn"
              style={{ textDecoration: 'none', justifyContent: 'flex-start', height: 'auto', padding: '0.75rem 1rem' }}
            >
              {t(`home.featuredLabs.items.${id}`)}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: '1rem', marginBottom: 0 }}>
          <Link to="/playground" className="btn btn-primary">{t('home.featuredLabs.browseAll', { labCount })}</Link>
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>{t('home.allLabs.title')}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <Link to="/playground/circuit-builder" className="card" style={{ margin: 0, textDecoration: 'none', color: 'inherit' }}>
            <span className="tag">{t('home.allLabs.circuitBuilder.tag')}</span>
            <h3 style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>{t('home.allLabs.circuitBuilder.title')}</h3>
          </Link>
          {labs.map((lab) => (
            <Link
              key={lab.id}
              to={labPath(lab.id)}
              className="card"
              style={{ margin: 0, textDecoration: 'none', color: 'inherit' }}
            >
              <span className="tag">{lab.chapter}</span>
              <h3 style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>{lab.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>{t('home.learningPath.title')}</h2>
        <p>{t('home.learningPath.description')}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
          {pathPhaseKeys.map((phaseKey, i) => {
            const colors = ['var(--accent)', 'var(--success)', 'var(--warning)'];
            return (
              <div key={phaseKey} style={{ borderLeft: `4px solid ${colors[i]}`, paddingLeft: '1rem' }}>
                <strong>{t(`home.learningPath.phases.${phaseKey}.name`)}</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {t(`home.learningPath.phases.${phaseKey}.chapters`)}
                </p>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: '1.5rem', marginBottom: 0 }}>
          <Link to="/learn">{t('home.learningPath.browseAll', { chapterCount: learnNav.length })}</Link>
        </p>
      </section>

      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{t('home.learnCard.title')}</h3>
          <p style={{ fontSize: '0.9rem' }}>{t('home.learnCard.description')}</p>
          <Link to="/learn/classical" className="btn">{t('home.learnCard.cta')}</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{t('home.referenceCard.title')}</h3>
          <p style={{ fontSize: '0.9rem' }}>{t('home.referenceCard.description')}</p>
          <Link to="/reference/gates" className="btn">{t('home.referenceCard.cta')}</Link>
        </div>
      </div>

      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>{t('home.allChapters.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {learnNav.map((ch) => (
            <Link key={ch.path} to={ch.path} className="btn" style={{ textDecoration: 'none', justifyContent: 'flex-start' }}>
              {ch.title}
            </Link>
          ))}
        </div>
      </section>

      <aside className="lab-panel" style={{ marginTop: '2rem' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>{t('home.researchCutoff.label')}</strong> {t('home.researchCutoff.text')}
        </p>
      </aside>
    </div>
  );
}
