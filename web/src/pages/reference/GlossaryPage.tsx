import { useLocalizedGlossary } from '@/data/localizedNavigation';
import { useT } from '@/context/LocaleContext';

export default function GlossaryPage() {
  const t = useT();
  const glossary = useLocalizedGlossary();

  return (
    <article>
      <h1>{t('reference.index.glossary.title')}</h1>
      <dl>
        {glossary.map(({ term, definition }) => (
          <div key={term} className="card" style={{ marginBottom: '0.75rem' }}>
            <dt><strong>{term}</strong></dt>
            <dd style={{ margin: '0.5rem 0 0' }}>{definition}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
