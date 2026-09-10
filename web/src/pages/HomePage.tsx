import { Link } from 'react-router-dom';
import { learnNav, labs } from '@/data/navigation';

const chapterLinks = learnNav.map((ch) => ({ title: ch.title, path: ch.path }));

const featuredLabIds = [
  { id: 'bloch-sphere', title: '3D Bloch Sphere' },
  { id: 'circuit-builder', title: 'Circuit Builder', path: '/playground/circuit-builder' },
  { id: 'teleportation', title: 'Quantum Teleportation' },
  { id: 'grover', title: "Grover's Search" },
  { id: 'bb84', title: 'BB84 Protocol' },
  { id: 'shor', title: "Shor's Algorithm" },
  { id: 'gate-explorer', title: 'Gate Explorer' },
  { id: 'logic-gates', title: 'Logic Gates' },
];

const pathOverview = [
  { phase: 'Foundation', chapters: ['Classical Computing', 'Linear Algebra', 'One Qubit'], color: 'var(--accent)' },
  { phase: 'Multi-Qubit World', chapters: ['Multiple Qubits', 'Quantum Circuits', 'Entanglement'], color: 'var(--success)' },
  { phase: 'Algorithms & Beyond', chapters: ['Protocols', 'Algorithms', 'QFT', 'Shor', 'Modern Topics'], color: 'var(--warning)' },
];

function labPath(id: string) {
  return id === 'circuit-builder' ? '/playground/circuit-builder' : `/playground/${id}`;
}

export default function HomePage() {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <span className="tag">2026 Edition · 全部在瀏覽器執行，無需安裝</span>
        <h1 style={{ marginTop: '1rem', fontSize: '2.75rem', lineHeight: 1.15 }}>
          Introduction to Quantum Computing — 2026
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '36rem' }}>
          From Classical Bits to Quantum Algorithms
        </p>
        <p style={{ marginTop: '1.5rem', maxWidth: '40rem' }}>
          A self-contained, interactive textbook that builds quantum computing from the ground up.
          All 27 labs, the circuit builder, practice problems, and chapters run directly in your browser.
        </p>
      </header>

      <div className="btn-group" style={{ marginBottom: '1.5rem' }}>
        <Link to="/learn" className="btn btn-primary">Start Learning</Link>
        <Link to="/playground" className="btn btn-primary">Open Playground (27 Labs)</Link>
        <Link to="/playground/circuit-builder" className="btn">Circuit Builder</Link>
        <Link to="/practice" className="btn">Practice</Link>
      </div>

      <section className="card" style={{ marginBottom: '1.5rem', borderColor: 'var(--accent)', borderWidth: 2 }}>
        <h2 style={{ marginTop: 0 }}>Interactive Labs — 直接在網頁操作</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          點選任一實驗即可開始互動模擬（Bloch 球、量子閘、Grover、Shor、BB84 等）。共 {labs.length + 1} 個實驗 + 電路建構器。
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0.75rem',
            marginTop: '1rem',
          }}
        >
          {featuredLabIds.map((item) => (
            <Link
              key={item.id}
              to={item.path ?? labPath(item.id)}
              className="btn"
              style={{ textDecoration: 'none', justifyContent: 'flex-start', height: 'auto', padding: '0.75rem 1rem' }}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: '1rem', marginBottom: 0 }}>
          <Link to="/playground" className="btn btn-primary">Browse all {labs.length + 1} labs →</Link>
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>All Interactive Labs</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <Link to="/playground/circuit-builder" className="card" style={{ margin: 0, textDecoration: 'none', color: 'inherit' }}>
            <span className="tag">Circuits</span>
            <h3 style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>Quantum Circuit Builder</h3>
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
            and concept checkpoints.
          </p>
          <Link to="/learn/classical" className="btn">Chapter 1: Classical Computing</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Reference</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Gate cheat sheets, formula collections, complexity classes, glossary, and misconceptions.
          </p>
          <Link to="/reference/gates" className="btn">Gate Reference</Link>
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

      <aside className="lab-panel" style={{ marginTop: '2rem' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>Research cutoff:</strong> September 2026. All simulations run in-browser — no download required.
        </p>
      </aside>
    </div>
  );
}
