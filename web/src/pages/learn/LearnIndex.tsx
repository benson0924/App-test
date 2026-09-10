import { Link } from 'react-router-dom';
import { learnNav } from '@/data/navigation';

const chapterDescriptions: Record<string, string> = {
  '/learn/classical':
    'Bits, binary arithmetic, logic gates, Boolean algebra, adders, reversibility, classical error correction, complexity classes, and Turing machines — the classical substrate quantum computing extends.',
  '/learn/one-qubit':
    'The qubit as a two-level quantum system: superposition, the Bloch sphere, measurement statistics, and the fundamental single-qubit gates X, Y, Z, H, and phase rotations.',
  '/learn/linear-algebra':
    'Complex numbers, vectors, matrices, inner products, eigenvalues, and tensor products — the mathematical language used throughout quantum computing.',
  '/learn/multiple-qubits':
    'Composite systems, tensor-product Hilbert spaces, multi-qubit gates, Bell states, and partial measurement on subsystems.',
  '/learn/circuits':
    'Quantum circuit model, universal gate sets, circuit depth and width, decomposition strategies, and how algorithms map to gate sequences.',
  '/learn/error-correction':
    'Quantum noise models, the no-cloning theorem, stabilizer codes, surface-code intuition, and the threshold theorem for fault tolerance.',
  '/learn/entanglement':
    'Entanglement measures, separability, Schmidt decomposition, EPR pairs, and why entanglement is a resource rather than a communication channel.',
  '/learn/protocols':
    'Quantum teleportation, superdense coding, Bell/CHSH tests, and BB84 quantum key distribution — protocols that use entanglement and measurement.',
  '/learn/algorithms':
    'Oracle model, Deutsch and Deutsch–Jozsa, Bernstein–Vazirani, Simon, and Grover search — early quantum speedups and query complexity.',
  '/learn/qft':
    'The quantum Fourier transform, phase kickback, QFT circuit construction, and its role as a subroutine in period finding and chemistry simulation.',
  '/learn/phase-estimation':
    'Quantum phase estimation: estimating eigenvalues of unitaries, precision scaling, and connection to Hamiltonian simulation.',
  '/learn/shor':
    "Shor's factoring algorithm — modular exponentiation, period finding via QFT, and implications for public-key cryptography.",
  '/learn/modern':
    'Fault-tolerant roadmaps (2026), NISQ variational algorithms, quantum advantage claims, error-mitigation techniques, and open research frontiers.',
};

export default function LearnIndex() {
  return (
    <div>
      <h1>Learn</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '40rem' }}>
        Thirteen chapters progressing from classical computing through quantum algorithms and
        contemporary topics. Each chapter includes interactive elements, worked examples, and
        links to playground labs.
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
              <span className="tag">Ch. {index + 1}</span>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{chapter.title}</h2>
            </div>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {chapterDescriptions[chapter.path] ?? 'Interactive chapter with concept checks and labs.'}
            </p>
          </Link>
        ))}
      </div>

      <div className="section-nav">
        <Link to="/">← Home</Link>
        <Link to="/learn/classical">Classical Computing →</Link>
      </div>
    </div>
  );
}
