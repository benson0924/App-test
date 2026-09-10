import Math from '../../components/Math';

const ROWS = [
  { problem: 'Unstructured search (N items)', classical: 'O(N)', quantum: 'O(√N) — Grover' },
  { problem: 'Constant vs balanced (n bits)', classical: 'O(2^{n−1}+1) worst', quantum: 'O(1) — DJ' },
  { problem: 'Hidden string (BV)', classical: 'O(n)', quantum: 'O(1)' },
  { problem: 'Factoring N-bit integer', classical: 'subexp (GNFS)', quantum: 'poly(n) — Shor (FT)' },
  { problem: 'Simulating n-qubit state', classical: 'O(2^n) memory', quantum: 'Physical — not efficient to output full vector' },
];

export default function ComplexityPage() {
  return (
    <article>
      <h1>Complexity Reference</h1>
      <p>Query and time complexity comparisons (ideal models; constants hidden).</p>
      <table className="data-table">
        <thead>
          <tr><th>Problem</th><th>Classical</th><th>Quantum</th></tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.problem}>
              <td>{r.problem}</td>
              <td className="mono">{r.classical}</td>
              <td className="mono">{r.quantum}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Math display>{`\\text{BQP} \\subseteq \\text{PSPACE}`}</Math>
    </article>
  );
}
