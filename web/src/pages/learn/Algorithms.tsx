import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Section from '@/components/Section';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import {
  runDeutsch,
  runDeutschJozsa,
  runBernsteinVazirani,
  runGrover,
  groverIterations,
  C,
} from 'quantum-core';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

const DEUTSCH_FUNCTIONS = [
  { id: 0, name: 'f₀(x) = 0', f: (_x: number) => 0, kind: 'constant' as const },
  { id: 1, name: 'f₁(x) = 1', f: (_x: number) => 1, kind: 'constant' as const },
  { id: 2, name: 'f₂(x) = x', f: (x: number) => x, kind: 'balanced' as const },
  { id: 3, name: 'f₃(x) = 1 ⊕ x', f: (x: number) => 1 - x, kind: 'balanced' as const },
];

function PhaseKickbackDemo() {
  const [x, setX] = useState(0);
  const f = (input: number) => input;

  const withoutMinus = useMemo(() => {
    const y = f(x);
    return { input: x, ancillaBefore: 0, ancillaAfter: y, phaseOnInput: 'none' };
  }, [x]);

  const withMinus = useMemo(() => {
    const y = f(x);
    const phase = y === 1 ? '−1' : '+1';
    return { input: x, ancilla: '|−⟩', yTarget: y, phaseKickedBack: phase };
  }, [x]);

  return (
    <div className="lab-panel">
      <p>
        Oracle <Katex>{`U_f|x,y\\rangle = |x, y \\oplus f(x)\\rangle`}</Katex> flips the ancilla when{' '}
        <Katex>{`f(x)=1`}</Katex>. With ancilla in <Katex>{`|{-}\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)`}</Katex>,
        the flip becomes a phase on the input register — <strong>phase kickback</strong>.
      </p>
      <label>Input x:</label>
      <div className="btn-group" style={{ marginTop: '0.5rem' }}>
        {[0, 1].map((v) => (
          <button key={v} className={`btn ${x === v ? 'btn-primary' : ''}`} onClick={() => setX(v)}>
            x = {v}
          </button>
        ))}
      </div>
      <table className="data-table" style={{ marginTop: '1rem', maxWidth: '640px' }}>
        <thead>
          <tr>
            <th>Setup</th>
            <th>Oracle action</th>
            <th>Effect on input</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ancilla |0⟩</td>
            <td>|{withoutMinus.input},{withoutMinus.ancillaBefore}⟩ → |{withoutMinus.input},{withoutMinus.ancillaAfter}⟩</td>
            <td>No phase (bit flip only)</td>
          </tr>
          <tr>
            <td>Ancilla |−⟩</td>
            <td>Controlled flip on y → phase on x</td>
            <td><strong>(−1)<sup>f(x)</sup></strong> = {withMinus.phaseKickedBack} for f(x)={f(x)}</td>
          </tr>
        </tbody>
      </table>
      <Katex display>{`|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle`}</Katex>
    </div>
  );
}

function DeutschDemo() {
  const [fnIdx, setFnIdx] = useState(2);
  const fn = DEUTSCH_FUNCTIONS[fnIdx];
  const result = useMemo(() => runDeutsch(fn.f), [fn]);

  return (
    <div className="lab-panel">
      <label>Select Boolean function f: {'{0,1}'} → {'{0,1}'}</label>
      <div className="btn-group" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
        {DEUTSCH_FUNCTIONS.map((f) => (
          <button
            key={f.id}
            className={`btn ${fnIdx === f.id ? 'btn-primary' : ''}`}
            onClick={() => setFnIdx(f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>
      <table className="data-table" style={{ marginTop: '1rem', maxWidth: '400px' }}>
        <thead>
          <tr><th>x</th><th>f(x)</th></tr>
        </thead>
        <tbody>
          <tr><td>0</td><td>{fn.f(0)}</td></tr>
          <tr><td>1</td><td>{fn.f(1)}</td></tr>
        </tbody>
      </table>
      <p style={{ marginTop: '1rem' }}>
        <strong>Circuit:</strong> |0⟩|1⟩ → X on ancilla → H⊗H → U<sub>f</sub> (phase oracle) → H on input → measure input.
      </p>
      <p>
        Measured input qubit: <code>{result.measured}</code> → algorithm reports{' '}
        <strong>{result.constant ? 'constant' : 'balanced'}</strong>.
        True label: <strong>{fn.kind}</strong> {result.constant === (fn.kind === 'constant') ? '✓' : '✗'}.
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Classical worst case: 2 oracle queries (evaluate f(0) and f(1)). Deutsch: <strong>1 query</strong>.
      </p>
    </div>
  );
}

function DeutschJozsaDemo() {
  const [n, setN] = useState(3);
  const [mode, setMode] = useState<'constant' | 'balanced'>('balanced');

  const f = useMemo(() => {
    if (mode === 'constant') return (_x: number) => 0;
    return (x: number) => (x & 1) ^ ((x >> 1) & 1);
  }, [mode]);

  const result = useMemo(() => runDeutschJozsa(n, f), [n, f]);

  return (
    <div className="lab-panel">
      <label>Input register size n = {n}</label>
      <input type="range" min={2} max={5} value={n} onChange={(e) => setN(Number(e.target.value))} />
      <div className="btn-group" style={{ marginTop: '0.75rem' }}>
        <button className={`btn ${mode === 'constant' ? 'btn-primary' : ''}`} onClick={() => setMode('constant')}>
          Constant f
        </button>
        <button className={`btn ${mode === 'balanced' ? 'btn-primary' : ''}`} onClick={() => setMode('balanced')}>
          Balanced f
        </button>
      </div>
      <p>
        Promise: f is either <em>constant</em> (same output for all x) or <em>balanced</em> (exactly half 0s, half 1s).
        Deutsch–Jozsa returns: <strong>{result.balanced ? 'balanced' : 'constant'}</strong>.
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Quantum: 1 query. Classical worst case: <Katex>{`2^{n-1}+1`}</Katex> queries.
      </p>
    </div>
  );
}

function BernsteinVaziraniDemo() {
  const [secret, setSecret] = useState('101');

  const secretBits = useMemo(
    () => secret.split('').map(Number),
    [secret]
  );
  const n = secretBits.length;

  const recovered = useMemo(
    () => runBernsteinVazirani(n, secretBits),
    [n, secretBits]
  );

  return (
    <div className="lab-panel">
      <label>Hidden string s (bits):</label>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
        className="mono"
        style={{ width: '120px', marginLeft: '0.5rem' }}
      />
      <p style={{ marginTop: '0.75rem' }}>
        Oracle: <Katex>{`f(x) = s \\cdot x \\pmod{2} = \\bigoplus_i s_i x_i`}</Katex>
      </p>
      <p>
        After H<sup>⊗n</sup> → oracle → H<sup>⊗n</sup>, measurement yields s directly.
        Recovered: <code>{recovered.join('')}</code>
        {recovered.join('') === secret.padStart(n, '0') ? ' ✓' : ''}
      </p>
    </div>
  );
}

function GroverDemo() {
  const [n, setN] = useState(3);
  const [marked, setMarked] = useState(5);
  const [iters, setIters] = useState<number | null>(null);

  const N = 1 << n;
  const optimal = groverIterations(n);
  const actualIters = iters ?? optimal;

  const state = useMemo(
    () => runGrover(n, marked, actualIters),
    [n, marked, actualIters]
  );

  const probMarked = C.mag2(state.amplitudes[marked]);
  const probUniform = 1 / N;

  return (
    <div className="lab-panel">
      <label>Search space: n = {n} qubits, N = {N} states</label>
      <input type="range" min={2} max={5} value={n} onChange={(e) => { setN(Number(e.target.value)); setMarked(0); setIters(null); }} />
      <label>Marked state |w⟩ = |{marked.toString(2).padStart(n, '0')}⟩</label>
      <input type="range" min={0} max={N - 1} value={marked} onChange={(e) => setMarked(Number(e.target.value))} />
      <label>Grover iterations: {actualIters} (optimal ≈ {optimal} = ⌊π/4 · √N⌋)</label>
      <input
        type="range"
        min={0}
        max={Math.ceil(optimal * 2)}
        value={actualIters}
        onChange={(e) => setIters(Number(e.target.value))}
      />
      <div style={{ marginTop: '1rem' }}>
        <p>P(success) = {(probMarked * 100).toFixed(1)}% (uniform start: {(probUniform * 100).toFixed(1)}%)</p>
        <div style={{ height: '24px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${probMarked * 100}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.2s' }} />
        </div>
      </div>
      {actualIters > optimal && (
        <p style={{ color: 'var(--warning, #c90)', fontSize: '0.875rem', marginBottom: 0 }}>
          Overshooting: too many iterations rotate past the marked state — probability drops again.
        </p>
      )}
    </div>
  );
}

function ComplexityTable() {
  const rows = [
    { problem: 'Deutsch (n=1)', classical: '2 queries (worst)', quantum: '1 query', speedup: '2×' },
    { problem: 'Deutsch–Jozsa', classical: '2^{n−1}+1 (worst)', quantum: '1 query', speedup: 'exponential' },
    { problem: 'Bernstein–Vazirani', classical: 'n queries', quantum: '1 query', speedup: 'n×' },
    { problem: "Simon's algorithm", classical: 'O(2^{n/2})', quantum: 'O(n) queries', speedup: 'exponential' },
    { problem: 'Grover search', classical: 'O(N)', quantum: 'O(√N)', speedup: 'quadratic' },
    { problem: "Shor's factoring", classical: 'sub-exponential', quantum: 'poly(n)', speedup: 'super-polynomial' },
  ];

  return (
    <table className="data-table" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Problem</th>
          <th>Classical (query/time)</th>
          <th>Quantum</th>
          <th>Speedup</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.problem}>
            <td>{r.problem}</td>
            <td><Katex>{r.classical}</Katex></td>
            <td><Katex>{r.quantum}</Katex></td>
            <td>{r.speedup}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Algorithms() {
  return (
    <article>
      <h1>Chapter 8: Quantum Algorithms</h1>
      <p>
        Quantum algorithms exploit interference and phase kickback to extract structure from black-box
        oracles faster than classical query complexity allows. This chapter builds from the oracle model
        through early promise problems to Grover&apos;s unstructured search — the foundation for Shor and
        phase estimation in later chapters.
      </p>

      <Section id="8.1" title="8.1 The Oracle Model" prev={{ title: 'Quantum Protocols', path: '/learn/protocols' }}>
        <p>
          An <strong>oracle</strong> is a reversible black-box unitary that encodes a classical function{' '}
          <Katex>{`f : \\{0,1\\}^n \\to \\{0,1\\}`}</Katex>. The standard construction uses an ancilla qubit:
        </p>
        <Katex display>{`U_f |x\\rangle|y\\rangle = |x\\rangle|y \\oplus f(x)\\rangle`}</Katex>
        <p>
          Query complexity counts how many times an algorithm invokes U<sub>f</sub>. This model abstracts
          away the internal structure of f — the algorithm must learn about f only through queries.
        </p>

        <WorkedExample
          title="Phase kickback with |−⟩ ancilla"
          steps={[
            {
              label: 'Prepare ancilla in |−⟩ = H|1⟩. A controlled-X (flip when f(x)=1) on |y⟩ becomes a controlled-Z on |x⟩.',
              latex: '|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle',
            },
            {
              label: 'Apply H to input: |+⟩ picks up phase (−1)^{f(0)}; |−⟩ picks up (−1)^{f(1)}.',
              latex: 'H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)',
            },
            {
              label: 'For constant f (f(0)=f(1)): result is ±|+⟩ → measure |0⟩. For balanced f: result is ±|−⟩ → measure |1⟩.',
              latex: '\\text{1 query distinguishes constant vs balanced (Deutsch)}',
            },
          ]}
        />

        <PhaseKickbackDemo />

        <Checkpoint
          question="What state must the ancilla be in for phase kickback to occur?"
          answer="|−⟩"
          hint="Hadamard of |1⟩."
        />
      </Section>

      <Section id="8.2" title="8.2 Deutsch's Algorithm">
        <p>
          Deutsch&apos;s problem (1985): given f: {'{0,1}'} → {'{0,1}'}, determine whether f is{' '}
          <em>constant</em> (f(0)=f(1)) or <em>balanced</em> (f(0)≠f(1)). There are exactly four
          such functions on one bit:
        </p>

        <table className="data-table" style={{ maxWidth: '480px' }}>
          <thead>
            <tr><th>Function</th><th>f(0)</th><th>f(1)</th><th>Type</th></tr>
          </thead>
          <tbody>
            {DEUTSCH_FUNCTIONS.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.f(0)}</td>
                <td>{f.f(1)}</td>
                <td>{f.kind}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Katex display>{`|0\\rangle|1\\rangle \\xrightarrow{X,H} |+\\rangle|{-}\\rangle \\xrightarrow{U_f} \\xrightarrow{H} |\\text{answer}\\rangle|{-}\\rangle`}</Katex>

        <DeutschDemo />

        <Expandable title="Why classical needs 2 queries in the worst case">
          <p>
            A classical algorithm must evaluate f(0) and f(1) to distinguish constant from balanced.
            If it stops after one evaluation, the unseen input could still differ — the answer would be wrong.
            Deutsch achieves certainty with a single oracle call by using superposition and interference.
          </p>
        </Expandable>

        <LabLink id="deutsch" title="Deutsch Algorithm" />
      </Section>

      <Section id="8.3" title="8.3 Deutsch–Jozsa Algorithm">
        <p>
          Generalizing to n input bits, the <strong>promise</strong> is that f is either constant
          (same value for all 2<sup>n</sup> inputs) or balanced (exactly 2<sup>n−1</sup> zeros and
          2<sup>n−1</sup> ones). Without this promise, the problem is hard even quantumly.
        </p>

        <Katex display>{`\\text{Classical worst case: } 2^{n-1}+1 \\text{ queries} \\quad\\text{vs}\\quad \\text{Quantum: } 1 \\text{ query}`}</Katex>

        <p>
          The circuit mirrors Deutsch: prepare |−⟩ ancilla, apply H<sup>⊗n</sup>, oracle, H<sup>⊗n</sup>.
          Constant functions yield |0…0⟩ with certainty; balanced functions never yield all zeros.
        </p>

        <DeutschJozsaDemo />

        <Checkpoint
          question="What measurement outcome proves f is constant in Deutsch–Jozsa?"
          answer="|0⟩⊗n"
          hint="All-zero on the input register."
        />

        <LabLink id="deutsch-jozsa" title="Deutsch–Jozsa" />
      </Section>

      <Section id="8.4" title="8.4 Bernstein–Vazirani Algorithm">
        <p>
          Given oracle access to <Katex>{`f(x) = s \\cdot x \\pmod{2}`}</Katex> (inner product mod 2
          of n-bit strings), recover the hidden string s ∈ {'{0,1}'}<sup>n</sup>.
        </p>

        <Katex display>{`f(x) = s_0 x_0 \\oplus s_1 x_1 \\oplus \\cdots \\oplus s_{n-1} x_{n-1}`}</Katex>

        <WorkedExample
          title="Recover s in one query"
          steps={[
            { label: 'Prepare |+⟩⊗n and |−⟩ ancilla (same as Deutsch–Jozsa setup).' },
            { label: 'The phase oracle implements (−1)^{s·x} on each basis state |x⟩.' },
            { label: 'After inverse Hadamards, the amplitude of |x⟩ is concentrated on x = s. Measure to read s.', latex: 'H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle' },
          ]}
        />

        <BernsteinVaziraniDemo />

        <p>
          Classically, learning s requires querying f with each standard basis vector e<sub>i</sub> — n queries.
          Bernstein–Vazirani needs only one.
        </p>

        <LabLink id="bernstein-vazirani" title="Bernstein–Vazirani" />
      </Section>

      <Section id="8.5" title="8.5 Simon's Algorithm">
        <p>
          Simon&apos;s problem (1994): f: {'{0,1}'}<sup>n</sup> → {'{0,1}'}<sup>n</sup> is promised to be
          2-to-1 with a hidden period s ∈ {'{0,1}'}<sup>n</sup>, s ≠ 0, such that f(x) = f(x ⊕ s) for all x.
        </p>

        <Katex display>{`f(x) = f(x \\oplus s) \\quad \\text{for all } x, \\quad s \\neq 0`}</Katex>

        <p>
          Classically, finding s requires ~2<sup>n/2</sup> queries (birthday paradox). Simon&apos;s quantum
          algorithm finds s with O(n) oracle queries plus O(n) classical post-processing.
        </p>

        <Expandable title="GF(2) linear algebra behind Simon">
          <p>
            Measurements yield random vectors y ∈ {'{0,1}'}<sup>n</sup> satisfying y · s = 0 (mod 2).
            Each query adds a linear constraint over GF(2). After ~n independent equations, Gaussian
            elimination over GF(2) recovers s.
          </p>
          <Katex display>{`y_1 \\cdot s = 0,\\; y_2 \\cdot s = 0,\\; \\ldots \\pmod{2}`}</Katex>
          <p>
            This hidden-period structure over abelian groups is the direct precursor to Shor&apos;s period
            finding over ℤ<sub>N</sub>.
          </p>
        </Expandable>

        <Checkpoint
          question="What field is Simon's post-processing linear algebra performed over?"
          answer="GF(2)"
          hint="Bits with XOR as addition."
        />

        <LabLink id="simon" title="Simon's Algorithm" />
      </Section>

      <Section id="8.6" title="8.6 Grover's Search Algorithm" next={{ title: 'Quantum Fourier Transform', path: '/learn/qft' }}>
        <p>
          Grover (1996) searches an unstructured database of N = 2<sup>n</sup> items for a marked
          entry w, using O(√N) oracle queries — a quadratic speedup over classical O(N).
        </p>

        <h3>Uniform superposition</h3>
        <Katex display>{`|s\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N-1}|x\\rangle = H^{\\otimes n}|0\\rangle^{\\otimes n}`}</Katex>

        <h3>Oracle O<sub>w</sub></h3>
        <Katex display>{`O_w |x\\rangle = \\begin{cases}-|x\\rangle & x = w \\\\ |x\\rangle & x \\neq w\\end{cases}`}</Katex>

        <h3>Diffusion operator D</h3>
        <Katex display>{`D = 2|s\\rangle\\langle s| - I \\quad \\text{(reflection about the mean)}`}</Katex>

        <p>
          Each Grover iteration G = D · O<sub>w</sub> rotates the state vector toward |w⟩ by angle
          ≈ 2 arcsin(1/√N). The optimal iteration count is:
        </p>
        <Katex display>{`k \\approx \\frac{\\pi}{4}\\sqrt{N}`}</Katex>

        <GroverDemo />

        <Expandable title="Overshooting and optimality">
          <p>
            Grover search is a rotation in a two-dimensional subspace spanned by |w⟩ and |s&apos;⟩ (uniform
            superposition with |w⟩ removed). Applying too many iterations rotates past |w⟩ — success
            probability decreases. Grover&apos;s algorithm is provably optimal for unstructured search:
            no quantum algorithm can do better than O(√N) queries.
          </p>
        </Expandable>

        <Checkpoint
          question="How many queries does Grover need for N items (order of growth)?"
          answer="O(√N)"
          hint="Quadratic speedup over classical O(N)."
        />

        <LabLink id="grover" title="Grover Search" />
      </Section>

      <Section id="8.7" title="8.7 Complexity Comparison">
        <p>
          The algorithms in this chapter illustrate different speedup types: constant-factor (Deutsch),
          polynomial (Bernstein–Vazirani), exponential in query complexity (Deutsch–Jozsa, Simon),
          quadratic (Grover), and super-polynomial (Shor, covered in Chapter 11).
        </p>
        <ComplexityTable />

        <h3>Algorithm labs</h3>
        <ul>
          <li><Link to="/playground/deutsch">Deutsch Algorithm</Link></li>
          <li><Link to="/playground/deutsch-jozsa">Deutsch–Jozsa</Link></li>
          <li><Link to="/playground/bernstein-vazirani">Bernstein–Vazirani</Link></li>
          <li><Link to="/playground/simon">Simon&apos;s Algorithm</Link></li>
          <li><Link to="/playground/grover">Grover Search</Link></li>
          <li><Link to="/playground/qft">QFT Visualizer</Link></li>
          <li><Link to="/playground/phase-estimation">Phase Estimation</Link></li>
        </ul>
      </Section>
    </article>
  );
}
