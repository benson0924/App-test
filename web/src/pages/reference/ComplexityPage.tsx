import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';
import Checkpoint from '@/components/Checkpoint';

interface Row {
  algorithm: string;
  problem: string;
  classical: string;
  quantum: string;
  notes: string;
}

const ROWS: Row[] = [
  {
    algorithm: 'Deutsch',
    problem: 'Is f:{0,1}→{0,1} constant or balanced?',
    classical: '2 queries (worst case)',
    quantum: '1 query',
    notes: 'First separation; balanced = outputs differ on at least one input',
  },
  {
    algorithm: 'Deutsch–Jozsa',
    problem: 'Constant vs balanced f:{0,1}ⁿ→{0,1}',
    classical: '2ⁿ⁻¹ + 1 queries (worst)',
    quantum: '1 query',
    notes: 'Exponential query separation; not practical (promise problem)',
  },
  {
    algorithm: 'Bernstein–Vazirani',
    problem: 'Find hidden string s where f(x) = s·x mod 2',
    classical: 'n queries',
    quantum: '1 query',
    notes: 'Linear query separation; generalizes Deutsch–Jozsa',
  },
  {
    algorithm: 'Grover',
    problem: 'Unstructured search over N items',
    classical: 'O(N) queries',
    quantum: 'O(√N) queries',
    notes: 'Quadratic speedup; optimal for unstructured search',
  },
  {
    algorithm: 'Shor',
    problem: 'Factor N-bit integer',
    classical: 'Subexp (GNFS); no known poly-time',
    quantum: 'Poly(n) time (fault-tolerant model)',
    notes: 'Requires QFT + phase estimation; not NISQ-feasible at crypt scale',
  },
  {
    algorithm: 'Simon',
    problem: 'Find hidden period of f with f(x)=f(x⊕s)',
    classical: 'O(2ⁿ/²) queries',
    quantum: 'O(n) queries',
    notes: 'Exponential separation; precursor to Shor',
  },
  {
    algorithm: 'State simulation',
    problem: 'Simulate n-qubit generic circuit',
    classical: 'O(2ⁿ) memory/time',
    quantum: 'Physical — not efficient to output full 2ⁿ vector',
    notes: 'Clifford circuits simulate in O(n²) classically (Gottesman–Knill)',
  },
];

export default function ComplexityPage() {
  return (
    <article>
      <h1>Complexity Reference</h1>
      <p>
        Query and time complexity comparisons for foundational quantum algorithms.
        Constants hidden; fault-tolerant model assumed unless noted.
      </p>

      <h2>Algorithm comparison table</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Problem</th>
            <th>Classical</th>
            <th>Quantum</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.algorithm}>
              <td><strong>{r.algorithm}</strong></td>
              <td>{r.problem}</td>
              <td className="mono">{r.classical}</td>
              <td className="mono">{r.quantum}</td>
              <td style={{ fontSize: '0.875rem' }}>{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>BQP definition</h2>
      <div className="card">
        <p>
          <strong>BQP</strong> (Bounded-error Quantum Polynomial time) is the class of decision problems
          solvable by a uniform family of quantum circuits in polynomial time with error probability at most 1/3.
        </p>
        <Katex display>{`\\text{BQP} = \\{ L : \\exists \\text{ poly-time uniform QC family } \\{U_n\\}, \\Pr[\\text{accept}] \\geq \\tfrac{2}{3} \\text{ if } x \\in L \\}`}</Katex>
        <Katex display>{`\\text{P} \\subseteq \\text{BQP} \\subseteq \\text{PSPACE} \\subseteq \\text{EXP}`}</Katex>
        <p>
          Known containments: every classical polynomial-time algorithm is a quantum algorithm (ignore
          classical as subset), and quantum simulation does not exceed PSPACE.
        </p>
      </div>

      <h2>Caution: BQP and NP</h2>
      <div className="card" style={{ borderLeft: '4px solid var(--warning, #c9a227)' }}>
        <p>
          <strong>It is unknown whether NP ⊆ BQP.</strong> Quantum computers are not known to solve
          all NP-complete problems efficiently. Shor's algorithm applies to <em>period finding / factoring</em>,
          not generic NP search.
        </p>
        <ul>
          <li>Grover gives only <strong>quadratic</strong> speedup for unstructured search — not exponential.</li>
          <li>Deutsch–Jozsa and Bernstein–Vazirani separations are for <strong>promise problems</strong> with structured oracles.</li>
          <li>Random circuit sampling demonstrates quantum behavior hard to simulate classically for <em>specific tasks</em> — not universal NP speedup.</li>
        </ul>
        <Katex display>{`\\text{NP} \\stackrel{?}{\\subseteq} \\text{BQP} \\quad \\text{(open as of 2026)}`}</Katex>
      </div>

      <Expandable title="Query complexity vs time complexity">
        <p>
          <strong>Query complexity</strong> counts oracle calls (Deutsch, Grover). <strong>Time complexity</strong>
          includes circuit size for implementing oracles and arithmetic (Shor). A small query count can hide
          large classical preprocessing or expensive oracles.
        </p>
      </Expandable>

      <Expandable title="Fault tolerance requirement">
        <p>
          Shor's factoring and large-scale phase estimation require fault-tolerant logical qubits with
          error rates below threshold. NISQ devices without correction cannot run cryptographically relevant
          Shor instances — complexity statements assume the ideal fault-tolerant model.
        </p>
      </Expandable>

      <Checkpoint
        question="Does Grover's algorithm prove BQP contains NP?"
        answer="no"
        hint="Grover is quadratic, not exponential; NP vs BQP is open."
      />
    </article>
  );
}
