import { Link } from 'react-router-dom';
import { learnNav, labs } from '@/data/navigation';

const chapterLinks = learnNav.map((ch) => ({ title: ch.title, path: ch.path }));

const pathOverview = [
  { phase: 'Foundation', chapters: ['Classical Computing', 'Linear Algebra', 'One Qubit'], color: 'var(--accent)' },
  { phase: 'Multi-Qubit World', chapters: ['Multiple Qubits', 'Quantum Circuits', 'Entanglement'], color: 'var(--success)' },
  { phase: 'Algorithms & Beyond', chapters: ['Protocols', 'Algorithms', 'QFT', 'Shor', 'Modern Topics'], color: 'var(--warning)' },
];

export default function HomePage() {
  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <span className="tag">2026 Edition</span>
        <h1 style={{ marginTop: '1rem', fontSize: '2.75rem', lineHeight: 1.15 }}>
          Introduction to Quantum Computing — 2026
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '36rem' }}>
          From Classical Bits to Quantum Algorithms
        </p>
        <p style={{ marginTop: '1.5rem', maxWidth: '40rem' }}>
          A self-contained, interactive textbook that builds quantum computing from the ground up.
          Start with classical bits and logic gates, develop the linear-algebra language of qubits,
          and progress through entanglement, error correction, and landmark algorithms — with hands-on
          labs at every stage.
        </p>
      </header>

      <div className="btn-group" style={{ marginBottom: '2.5rem' }}>
        <Link to="/learn" className="btn btn-primary">Start Learning</Link>
        <Link to="/playground" className="btn">Open Playground</Link>
        <Link to="/reference" className="btn">Reference</Link>
      </div>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Learning Path</h2>
        <p>
          The curriculum follows a deliberate arc: classical foundations first, then the mathematics
          and physics of single- and multi-qubit systems, and finally quantum protocols and algorithms.
          Each chapter includes concept checks, worked examples, and links to interactive labs.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
          {pathOverview.map((block) => (
            <div key={block.phase} style={{ borderLeft: `4px solid ${block.color}`, paddingLeft: '1rem' }}>
              <strong>{block.phase}</strong>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {block.chapters.join(' → ')}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.5rem', marginBottom: 0 }}>
          <Link to="/learn">Browse all {learnNav.length} chapters →</Link>
        </p>
      </section>

      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Learn</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Structured chapters with intuitive explanations, mathematical formalism, worked examples,
            and concept checkpoints. Begin with classical computing or jump to any topic.
          </p>
          <Link to="/learn/classical" className="btn">Chapter 1: Classical Computing</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Playground</h3>
          <p style={{ fontSize: '0.9rem' }}>
            27 interactive labs — from binary adders and logic gates to Grover search and Shor's
            factoring demo. Experiment freely and connect theory to simulation.
          </p>
          <Link to="/playground" className="btn">Explore Labs</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Reference</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Gate cheat sheets, formula collections, complexity classes, glossary, and a guide to
            common misconceptions about quantum computing.
          </p>
          <Link to="/reference/gates" className="btn">Gate Reference</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Practice</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Problem sets organized by chapter to reinforce understanding. Work through exercises
            after each section or use them for exam preparation.
          </p>
          <Link to="/practice" className="btn">Practice Problems</Link>
        </div>
      </div>

      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>All Chapters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {chapterLinks.map((ch) => (
            <Link key={ch.path} to={ch.path} className="btn" style={{ textDecoration: 'none', justifyContent: 'flex-start' }}>
              {ch.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Featured Labs</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['bloch-sphere', 'circuit-builder', 'teleportation', 'grover', 'bb84', 'shor'].map((id) => {
            const lab = labs.find((l) => l.id === id);
            if (!lab) return null;
            return (
              <Link key={id} to={id === 'circuit-builder' ? '/playground/circuit-builder' : `/playground/${id}`} className="btn">
                {lab.title}
              </Link>
            );
          })}
        </div>
      </section>

      <aside className="lab-panel" style={{ marginTop: '2rem' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>Research cutoff:</strong> Content reflects the state of quantum computing research
          and industry practice through <strong>September 2026</strong>. Modern-topics coverage
          (fault-tolerant milestones, NISQ-era algorithms, post-quantum cryptography landscape) is
          updated to that date.
        </p>
      </aside>
    </div>
  );
}
