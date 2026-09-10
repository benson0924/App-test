import { glossary } from '../../data/navigation';

export default function GlossaryPage() {
  return (
    <article>
      <h1>Glossary</h1>
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
