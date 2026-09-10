import { Link } from 'react-router-dom';
import { labs } from '@/data/navigation';

const circuitBuilderLab = {
  id: 'circuit-builder',
  title: 'Quantum Circuit Builder',
  chapter: 'Circuits',
};

const allLabs = [...labs, circuitBuilderLab];

export default function PlaygroundIndex() {
  const byChapter = allLabs.reduce<Record<string, typeof allLabs>>((acc, lab) => {
    (acc[lab.chapter] ??= []).push(lab);
    return acc;
  }, {});

  const chapterOrder = [
    'Classical',
    'One Qubit',
    'Linear Algebra',
    'Multiple Qubits',
    'QEC',
    'Protocols',
    'Algorithms',
    'Shor',
    'Circuits',
  ];

  return (
    <div>
      <h1>Playground</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '40rem' }}>
        {allLabs.length} interactive labs for hands-on exploration. Each lab connects to material
        in the Learn chapters — use them to build intuition before or after reading.
      </p>

      {chapterOrder.map((chapter) => {
        const chapterLabs = byChapter[chapter];
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
        <Link to="/">← Home</Link>
        <Link to="/learn">Learn Chapters →</Link>
      </div>
    </div>
  );
}
