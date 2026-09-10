import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import { modExp, findPeriod, gcd, shorFactor } from 'quantum-core';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

const SHOR_STEPS = [
  {
    title: 'Choose N and coprime a',
    classical: true,
    content: 'Pick composite N = 15. Choose a = 2 with gcd(2, 15) = 1.',
  },
  {
    title: 'Compute modular powers (classical check)',
    classical: true,
    content: 'Evaluate 2^x mod 15 for x = 0, 1, 2, … to spot repetition.',
  },
  {
    title: 'Quantum period finding',
    classical: false,
    content: 'QPE + QFT on U|y⟩ = |2^x · y mod 15⟩ estimates period r of 2^x mod 15.',
  },
  {
    title: 'Verify period r = 4',
    classical: true,
    content: '2^4 mod 15 = 16 mod 15 = 1. Sequence: 1, 2, 4, 8, 1, …',
  },
  {
    title: 'Check r is even',
    classical: true,
    content: 'r = 4 is even. If r were odd, restart with different a.',
  },
  {
    title: 'Compute a^{r/2} mod N',
    classical: true,
    content: '2^{4/2} mod 15 = 2² mod 15 = 4.',
  },
  {
    title: 'Check a^{r/2} ≢ −1 (mod N)',
    classical: true,
    content: '4 ≢ 14 (≡ −1 mod 15). If a^{r/2} ≡ −1, restart — no factors from this a.',
  },
  {
    title: 'Extract factors via gcd',
    classical: true,
    content: 'gcd(4 − 1, 15) = gcd(3, 15) = 3. gcd(4 + 1, 15) = gcd(5, 15) = 5.',
  },
  {
    title: 'Verify factorization',
    classical: true,
    content: '15 = 3 × 5. Success!',
  },
];

function ShorFactor15Stepper() {
  const [step, setStep] = useState(0);
  const a = 2;
  const N = 15;

  const sequence = useMemo(() => {
    const seq: { x: number; val: number }[] = [];
    for (let x = 0; x <= 8; x++) {
      seq.push({ x, val: modExp(a, x, N) });
    }
    return seq;
  }, []);

  const period = useMemo(() => findPeriod(a, N), []);
  const half = modExp(a, period / 2, N);
  const factorResult = useMemo(() => shorFactor(N, a), []);

  const current = SHOR_STEPS[step];

  return (
    <div className="lab-panel">
      <p>
        <strong>Interactive walkthrough:</strong> Factor N = 15 with a = 2 (Shor&apos;s standard demo).
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {SHOR_STEPS.map((s, i) => (
          <button
            key={i}
            className={`btn ${step === i ? 'btn-primary' : ''}`}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            onClick={() => setStep(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="card" style={{ borderLeft: `4px solid ${current.classical ? 'var(--accent)' : 'var(--success, #2a2)'}` }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {current.classical ? '⚙ Classical step' : '⚛ Quantum step'}
        </p>
        <p><strong>{current.title}</strong></p>
        <p>{current.content}</p>
      </div>

      {(step === 1 || step === 2 || step === 3) && (
        <table className="data-table" style={{ marginTop: '1rem', maxWidth: '320px' }}>
          <thead>
            <tr><th>x</th><th>2^x mod 15</th></tr>
          </thead>
          <tbody>
            {sequence.map(({ x, val }) => (
              <tr key={x} style={{ background: x === period ? 'var(--accent-muted)' : undefined }}>
                <td>{x}</td>
                <td>{val}{x === period ? ' ← period!' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {step >= 5 && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          2^{'{r/2}'} mod 15 = {half}
        </p>
      )}

      {step >= 7 && factorResult && (
        <p style={{ marginTop: '0.75rem' }}>
          Factors: <strong>{factorResult.p}</strong> × <strong>{factorResult.q}</strong> = {N}
          (period r = {factorResult.r})
        </p>
      )}

      <div className="btn-group" style={{ marginTop: '1rem' }}>
        <button className="btn" onClick={() => setStep(0)}>Reset</button>
        <button className="btn btn-primary" onClick={() => setStep((s) => Math.min(SHOR_STEPS.length - 1, s + 1))}>
          {step >= SHOR_STEPS.length - 1 ? 'Done' : 'Next step →'}
        </button>
      </div>
    </div>
  );
}

export default function Shor() {
  const { tag, title, intro } = useChapterMeta('shor');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        Shor&apos;s algorithm (1994) factors large composite integers in polynomial time on a
        fault-tolerant quantum computer — threatening RSA and Diffie–Hellman. The quantum core is
        period finding via QPE; everything else is classical number theory.
      </p>

      <LearnSection chapter="shor" sectionId="11.1" prev={{ title: 'Phase Estimation', path: '/learn/phase-estimation' }}>
        <p>
          To factor composite N, pick random a with 1 &lt; a &lt; N and gcd(a, N) = 1. If gcd(a, N) &gt; 1,
          we already found a factor classically. Otherwise, find the smallest r &gt; 0 such that:
        </p>
        <Katex display>{`a^r \\equiv 1 \\pmod{N}`}</Katex>
        <p>
          This r is the <strong>period</strong> (order) of a modulo N. Period finding is the hard quantum
          step; factoring from r uses classical gcd arithmetic.
        </p>

        <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p><strong>⚛ Quantum portion</strong></p>
            <ul>
              <li>Prepare superposition over x</li>
              <li>Compute a<sup>x</sup> mod N (modular exponentiation)</li>
              <li>QPE + QFT to extract period r</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p><strong>⚙ Classical portion</strong></p>
            <ul>
              <li>Choose random a, check gcd</li>
              <li>Verify r is even, a<sup>r/2</sup> ≢ −1</li>
              <li>Compute gcd(a<sup>r/2</sup> ± 1, N)</li>
              <li>Repeat if trivial factors</li>
            </ul>
          </div>
        </div>

        <LabLink id="period-finding" title="Period Explorer" />
      </LearnSection>

      <LearnSection chapter="shor" sectionId="11.2">
        <p>
          Given period r with a<sup>r</sup> ≡ 1 (mod N), we have a<sup>r</sup> − 1 ≡ 0 (mod N), so N divides
          (a<sup>r/2</sup> − 1)(a<sup>r/2</sup> + 1). If a<sup>r/2</sup> ≢ −1 (mod N), then neither factor
          is a multiple of N, and gcd extracts non-trivial factors.
        </p>

        <Katex display>{`p = \\gcd(a^{r/2}-1, N), \\quad q = \\gcd(a^{r/2}+1, N)`}</Katex>

        <WorkedExample
          title="Conditions for successful factoring"
          steps={[
            { label: 'r must be even so that r/2 is an integer.', latex: 'r = 2k \\text{ for some integer } k' },
            { label: 'a^{r/2} ≢ −1 (mod N). Otherwise both gcds equal 1 or N — trivial.', latex: 'a^{r/2} \\not\\equiv -1 \\pmod{N}' },
            { label: 'If both conditions hold, gcd(a^{r/2} − 1, N) and gcd(a^{r/2} + 1, N) are non-trivial factors with probability ≥ 1/2 over random a.', latex: 'p \\cdot q = N' },
            { label: 'If any condition fails, pick a new a and repeat. Expected O(1) trials.', latex: '\\text{Repeat until success}' },
          ]}
        />


        <Checkpoint
          question="What gcd computation extracts a factor from period r?"
          answer="gcd(a^{r/2} ± 1, N)"
          hint="±1 from the a^r − 1 factorization."
        />
      </LearnSection>

      <LearnSection chapter="shor" sectionId="11.3">
        <p>
          The canonical demo factors N = 15 with a = 2. The period of 2<sup>x</sup> mod 15 is r = 4,
          yielding factors 3 and 5.
        </p>

        <ShorFactor15Stepper />

        <WorkedExample
          title="a = 2, N = 15 (summary)"
          steps={[
            { label: 'Sequence 2^x mod 15: 1, 2, 4, 8, 1, … → period r = 4.', latex: '2^4 \\equiv 1 \\pmod{15}' },
            { label: 'r is even. a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15). ✓', latex: '4 \\not\\equiv -1 \\pmod{15}' },
            { label: 'gcd(4 − 1, 15) = gcd(3, 15) = 3.', latex: '\\gcd(3, 15) = 3' },
            { label: 'gcd(4 + 1, 15) = gcd(5, 15) = 5. Therefore 15 = 3 × 5.', latex: '15 = 3 \\times 5' },
          ]}
        />

        <LabLink id="shor" title="Shor's Algorithm Demo" />
      </LearnSection>

      <LearnSection chapter="shor" sectionId="11.4">
        <p>
          On a fault-tolerant quantum computer with O(n) qubits and poly(n) gates:
        </p>
        <Katex display>{`T_{\\text{Shor}}(N) = \\text{poly}(\\log N)`}</Katex>
        <p>
          The best known classical factoring (General Number Field Sieve) is sub-exponential:
          exp(O((log N)<sup>1/3</sup>)). Shor provides a super-polynomial speedup — the reason
          post-quantum cryptography migration is underway.
        </p>

        <table className="data-table" style={{ maxWidth: '560px' }}>
          <thead>
            <tr><th>Component</th><th>Classical / Quantum</th><th>Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>Choose a, gcd check</td><td>Classical</td><td>O(log² N)</td></tr>
            <tr><td>Modular exponentiation circuit</td><td>Quantum</td><td>O(n³) gates</td></tr>
            <tr><td>QPE + QFT</td><td>Quantum</td><td>O(n² log N) gates</td></tr>
            <tr><td>Continued fractions</td><td>Classical</td><td>O(n²)</td></tr>
            <tr><td>{'gcd(a^{r/2} ± 1, N)'}</td><td>Classical</td><td>O(log² N)</td></tr>
          </tbody>
        </table>

        <Checkpoint
          question="Shor runs in what time on a fault-tolerant machine (in n = log N)?"
          answer="polynomial"
          hint="Poly(n) = poly(log N)."
        />
      </LearnSection>

      <LearnSection chapter="shor" sectionId="11.5" next={{ title: 'Modern Topics', path: '/learn/modern' }}>
        <p>
          RSA, Diffie–Hellman, and elliptic-curve cryptography (via Shor&apos;s discrete-log variant)
          rely on the hardness of factoring or discrete logarithms. A large-scale fault-tolerant quantum
          computer running Shor would break these systems.
        </p>



        <h3>Related labs</h3>
        <ul>
          <li><Link to="/playground/shor">Shor&apos;s Algorithm Demo (N=15)</Link></li>
          <li><Link to="/playground/period-finding">Period Explorer</Link></li>
          <li><Link to="/playground/phase-estimation">Phase Estimation</Link></li>
          <li><Link to="/playground/qft">QFT Visualizer</Link></li>
        </ul>
      </LearnSection>
    </article>
  );
}
