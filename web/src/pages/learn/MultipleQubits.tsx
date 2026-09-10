import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import {
  C,
  Gates,
  BellStates,
  isProductState,
  kronVec,
  tensorProduct,
  normalize,
  singleQubitState,
  zeroState,
  applySingleQubitGate,
  applyTwoQubitGate,
  fromAmplitudes,
  stateLabel,
  probabilities,
} from 'quantum-core';

const BASE = '/learn/multiple-qubits';
const SQ2 = 1 / Math.sqrt(2);

function formatAmp(c: { re: number; im: number }): string {
  return C.toString(c, 3);
}

function NQubitDimensionExplorer() {
  const [n, setN] = useState(3);
  const dim = 1 << n;
  const labels = useMemo(() => {
    if (n > 5) return [];
    return Array.from({ length: dim }, (_, i) => stateLabel(i, n));
  }, [n, dim]);

  return (
    <div className="lab-panel">
      <label htmlFor="n-qubits">Number of qubits (n): {n}</label>
      <input
        id="n-qubits"
        type="range"
        min={1}
        max={10}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
      />
      <p>
        An <Katex>{`${n}`}</Katex>-qubit register lives in a Hilbert space of dimension{' '}
        <Katex>{`2^{${n}} = ${dim.toLocaleString()}`}</Katex>.
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        State vector length: {dim} complex amplitudes. Memory for dense simulation grows as{' '}
        <Katex>{`O(2^n)`}</Katex> — the central challenge of classical simulation of quantum systems.
      </p>
      {labels.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            maxHeight: n <= 4 ? 'none' : '100px',
            overflowY: n > 4 ? 'auto' : 'visible',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
          }}
        >
          {labels.map((s) => (
            <span
              key={s}
              style={{
                padding: '0.15rem 0.4rem',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
              }}
            >
              |{s}⟩
            </span>
          ))}
        </div>
      )}
      {n > 5 && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          {dim.toLocaleString()} basis kets — too many to display. Try n ≤ 5 to see all labels.
        </p>
      )}
    </div>
  );
}

function KroneckerProductDemo() {
  const plus = normalize(singleQubitState(C.scale(SQ2, C.one()), C.scale(SQ2, C.one())));
  const zero = singleQubitState(C.one(), C.zero());
  const product = useMemo(() => tensorProduct(plus, zero), [plus, zero]);
  const kron = useMemo(() => kronVec(plus.amplitudes, zero.amplitudes), [plus, zero]);

  return (
    <div className="lab-panel">
      <p style={{ marginTop: 0 }}>
        Building <Katex>{`|+\\rangle \\otimes |0\\rangle`}</Katex> via the Kronecker product of
        amplitude vectors (computed with <code>kronVec</code> / <code>tensorProduct</code>).
      </p>
      <Katex display>{`|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\1\\end{pmatrix}, \\quad |0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}`}</Katex>
      <table className="data-table" style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        <thead>
          <tr>
            <th>Basis ket</th>
            <th>Amplitude</th>
          </tr>
        </thead>
        <tbody>
          {product.amplitudes.map((amp, i) => (
            <tr key={i}>
              <td>|{stateLabel(i, 2)}⟩</td>
              <td>{formatAmp(amp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>
        Only |00⟩ and |10⟩ have non-zero amplitude (both = 1/√2). This is a <em>product</em> state:
        the first qubit is |+⟩, the second is |0⟩ — no entanglement.
        {kron.length === product.amplitudes.length ? ' ✓ kronVec matches tensorProduct.' : ''}
      </p>
    </div>
  );
}

function EntanglementChecker() {
  const [choice, setChoice] = useState<'phiPlus' | 'product' | 'psiPlus'>('phiPlus');

  const states = useMemo(() => ({
    phiPlus: BellStates.phiPlus(),
    product: tensorProduct(
      normalize(singleQubitState(C.one(), C.zero())),
      normalize(singleQubitState(C.scale(SQ2, C.one()), C.scale(SQ2, C.one())))
    ),
    psiPlus: BellStates.psiPlus(),
  }), []);

  const state = states[choice];
  const isProduct = isProductState(state);
  const probs = probabilities(state);

  return (
    <div className="lab-panel">
      <label>Select a two-qubit state</label>
      <div className="btn-group" style={{ marginTop: '0.5rem' }}>
        <button className={`btn ${choice === 'phiPlus' ? 'btn-primary' : ''}`} onClick={() => setChoice('phiPlus')}>
          |Φ⁺⟩ Bell
        </button>
        <button className={`btn ${choice === 'product' ? 'btn-primary' : ''}`} onClick={() => setChoice('product')}>
          |0⟩⊗|+⟩
        </button>
        <button className={`btn ${choice === 'psiPlus' ? 'btn-primary' : ''}`} onClick={() => setChoice('psiPlus')}>
          |Ψ⁺⟩ Bell
        </button>
      </div>
      <table className="data-table" style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        <thead>
          <tr><th>Ket</th><th>|Amplitude|²</th></tr>
        </thead>
        <tbody>
          {probs.map((p, i) => (
            <tr key={i}>
              <td>|{stateLabel(i, 2)}⟩</td>
              <td>{(p * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginBottom: 0 }}>
        {isProduct
          ? '✓ Product state — can be written as |a⟩⊗|b⟩ for some single-qubit states.'
          : '✗ Entangled — cannot factor into independent qubit states.'}
      </p>
    </div>
  );
}

function BellPairCircuit() {
  const [step, setStep] = useState(0);

  const steps = useMemo(() => {
    let state = zeroState(2).amplitudes;
    const history: { label: string; latex: string; amps: typeof state }[] = [
      {
        label: 'Initialize |00⟩',
        latex: '|00\\rangle',
        amps: [...state],
      },
    ];
    state = applySingleQubitGate(state, 2, 0, Gates.H);
    history.push({
      label: 'Apply H on qubit 0 (left)',
      latex: '\\tfrac{1}{\\sqrt{2}}(|00\\rangle + |10\\rangle)',
      amps: [...state],
    });
    state = applyTwoQubitGate(state, 2, 0, 1, Gates.CNOT);
    history.push({
      label: 'Apply CNOT (control q0, target q1)',
      latex: '|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)',
      amps: [...state],
    });
    return history;
  }, []);

  const current = steps[step];

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Bell pair circuit: H — CNOT</h3>
      <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-elevated)', padding: '0.75rem', borderRadius: '6px' }}>
{`q0: —${step >= 1 ? '─H─' : '───'}${step >= 2 ? '─●─' : '───'}
q1: ───${step >= 2 ? '─⊕─' : '───'}`}
      </pre>
      <p><strong>Step {step + 1}:</strong> {current.label}</p>
      <Katex display>{current.latex}</Katex>
      <table className="data-table" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        <thead><tr><th>|xy⟩</th><th>Amplitude</th></tr></thead>
        <tbody>
          {current.amps.map((a, i) => (
            <tr key={i} style={{ opacity: C.mag(a) > 1e-8 ? 1 : 0.35 }}>
              <td>|{stateLabel(i, 2)}⟩</td>
              <td>{formatAmp(a)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-group">
        <button className="btn" onClick={() => setStep(0)}>Reset</button>
        <button className="btn btn-primary" onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))} disabled={step >= steps.length - 1}>
          Next gate
        </button>
      </div>
    </div>
  );
}

function MultiQubitGateDemo() {
  const [gate, setGate] = useState<'CNOT' | 'SWAP' | 'Toffoli'>('CNOT');
  const [input, setInput] = useState('00');

  const result = useMemo(() => {
    const n = gate === 'Toffoli' ? 3 : 2;
    const idx = parseInt(input.padStart(n, '0'), 2);
    let amps = fromAmplitudes(n, Array.from({ length: 1 << n }, (_, i) => (i === idx ? C.one() : C.zero()))).amplitudes;

    if (gate === 'CNOT') {
      amps = applyTwoQubitGate(amps, 2, 0, 1, Gates.CNOT);
    } else if (gate === 'SWAP') {
      amps = applyTwoQubitGate(amps, 2, 0, 1, Gates.SWAP);
    } else {
      amps = Gates.Toffoli.mulVec(amps);
    }

    const outIdx = amps.findIndex((a) => C.mag(a) > 0.99);
    return stateLabel(outIdx >= 0 ? outIdx : 0, n);
  }, [gate, input]);

  const inputOptions = gate === 'Toffoli'
    ? ['000', '001', '010', '011', '100', '101', '110', '111']
    : ['00', '01', '10', '11'];

  return (
    <div className="lab-panel">
      <div className="btn-group">
        {(['CNOT', 'SWAP', 'Toffoli'] as const).map((g) => (
          <button key={g} className={`btn ${gate === g ? 'btn-primary' : ''}`} onClick={() => { setGate(g); setInput(g === 'Toffoli' ? '000' : '00'); }}>
            {g}
          </button>
        ))}
      </div>
      <p style={{ marginTop: '1rem' }}>
        {gate === 'CNOT' && 'CNOT: flips target (q1) when control (q0) is |1⟩. Maps |10⟩ → |11⟩ and |11⟩ → |10⟩; leaves |00⟩ and |01⟩ unchanged.'}
        {gate === 'SWAP' && 'SWAP exchanges the two qubits: |01⟩ ↔ |10⟩.'}
        {gate === 'Toffoli' && 'Toffoli (CCNOT): flips target (q2) when both controls (q0, q1) are |1⟩.'}
      </p>
      <label>Input basis state |{input}⟩</label>
      <div className="btn-group" style={{ marginTop: '0.35rem' }}>
        {inputOptions.map((s) => (
          <button key={s} className={`btn ${input === s ? 'btn-primary' : ''}`} onClick={() => setInput(s)}>
            |{s}⟩
          </button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', marginBottom: 0, marginTop: '1rem' }}>
        {gate}|{input}⟩ = |{result}⟩
      </p>
    </div>
  );
}

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

export default function MultipleQubits() {
  const { tag, title, intro } = useChapterMeta('multipleQubits');
  const t = useT();
  return (
    <article>
      <span className="tag">{tag}</span>
      <h1>{title}</h1>
      <p style={{ color: 'var(--text-muted)' }}>{intro}</p>

      <LearnSection chapter="multipleQubits" sectionId="4.1"
        prev={{ title: 'Chapter 3: Linear Algebra', path: '/learn/linear-algebra' }}
        next={{ title: '4.2 Kronecker Product', path: `${BASE}#4.2` }}
      >
        <p>
          When two quantum systems with Hilbert spaces{' '}
          <Katex>{`\\mathcal{H}_A`}</Katex> (dimension <Katex>{`d_A`}</Katex>) and{' '}
          <Katex>{`\\mathcal{H}_B`}</Katex> (dimension <Katex>{`d_B`}</Katex>) are treated as a
          single composite system, the joint space is the <strong>tensor product</strong>{' '}
          <Katex>{`\\mathcal{H}_A \\otimes \\mathcal{H}_B`}</Katex>, with dimension{' '}
          <Katex>{`d_A \\cdot d_B`}</Katex>.
        </p>
        <p>
          For qubits, each single-qubit space has dimension 2. An <Katex>{`n`}</Katex>-qubit register
          therefore lives in a <Katex>{`2^n`}</Katex>-dimensional complex Hilbert space. Five qubits
          need 32 amplitudes; twenty qubits need over one million. This exponential growth is why
          classical simulation of general quantum circuits becomes impractical, and why quantum
          computers can (for some problems) offer computational advantages.
        </p>
        <Katex display>{`\\dim(\\mathcal{H}_1 \\otimes \\cdots \\otimes \\mathcal{H}_n) = \\prod_{k=1}^{n} \\dim(\\mathcal{H}_k) = 2^n \\text{ for qubits}`}</Katex>

        <NQubitDimensionExplorer />

        <WorkedExample
          title="Count amplitudes for 3 qubits"
          steps={[
            { label: 'Each qubit doubles the dimension.', latex: '2 \\times 2 \\times 2 = 2^3' },
            { label: 'Evaluate 2³.', latex: '2^3 = 8' },
            { label: 'The basis is {|000⟩, |001⟩, …, |111⟩} — eight orthonormal kets.', latex: '|\\psi\\rangle = \\sum_{x \\in \\{0,1\\}^3} c_x |x\\rangle' },
          ]}
        />

        <Checkpoint
          question="How many complex amplitudes describe a 4-qubit pure state?"
          answer="16"
          hint="Use 2^n with n = 4."
        />

        <LabLink id="tensor-product" title="Tensor Product Lab" />
      </LearnSection>

      <LearnSection chapter="multipleQubits" sectionId="4.2"
        prev={{ title: '4.1 Tensor Products', path: `${BASE}#4.1` }}
        next={{ title: '4.3 Entanglement', path: `${BASE}#4.3` }}
      >
        <p>
          The <strong>Kronecker product</strong> (tensor product on vectors) builds composite kets
          from single-qubit kets. If{' '}
          <Katex>{`|a\\rangle = (a_0, a_1)^\\mathsf{T}`}</Katex> and{' '}
          <Katex>{`|b\\rangle = (b_0, b_1)^\\mathsf{T}`}</Katex>, then
        </p>
        <Katex display>{`|a\\rangle \\otimes |b\\rangle = \\begin{pmatrix} a_0 b_0 \\\\ a_0 b_1 \\\\ a_1 b_0 \\\\ a_1 b_1 \\end{pmatrix}`}</Katex>
        <p>
          Basis ordering matters: we use <strong>big-endian</strong> bit strings where the leftmost
          qubit is index 0. Thus |10⟩ means qubit 0 is |1⟩, qubit 1 is |0⟩. The Kronecker product
          of matrices works analogously and describes applying independent gates on different qubits
          simultaneously: <Katex>{`U \\otimes V`}</Katex>.
        </p>

        <KroneckerProductDemo />

        <WorkedExample
          title="Compute |+⟩ ⊗ |0⟩ by hand"
          steps={[
            { label: 'Write single-qubit vectors.', latex: '|+\\rangle = \\tfrac{1}{\\sqrt{2}}(1,1)^\\mathsf{T},\\; |0\\rangle = (1,0)^\\mathsf{T}' },
            { label: 'Apply Kronecker product rule.', latex: '|+\\rangle\\otimes|0\\rangle = \\tfrac{1}{\\sqrt{2}}(1\\cdot1,\\, 1\\cdot0,\\, 1\\cdot1,\\, 1\\cdot0)^\\mathsf{T}' },
            { label: 'Simplify — only |00⟩ and |10⟩ survive.', latex: '|+\\rangle\\otimes|0\\rangle = \\tfrac{1}{\\sqrt{2}}|00\\rangle + \\tfrac{1}{\\sqrt{2}}|10\\rangle' },
          ]}
        />

        <Checkpoint
          question="Is |+⟩⊗|0⟩ the same as |0⟩⊗|+⟩?"
          answer="no"
          hint="Tensor product is ordered — swapping qubits gives a different state unless you also SWAP."
        />

      </LearnSection>

      <LearnSection chapter="multipleQubits" sectionId="4.3"
        prev={{ title: '4.2 Kronecker Product', path: `${BASE}#4.2` }}
        next={{ title: '4.4 Multi-Qubit Gates', path: `${BASE}#4.4` }}
      >
        <p>
          Not every two-qubit state is a product{' '}
          <Katex>{`|a\\rangle \\otimes |b\\rangle`}</Katex>. States that <em>cannot</em> be factored
          are called <strong>entangled</strong>. The Bell state{' '}
          <Katex>{`|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)`}</Katex>{' '}
          is the canonical example: measuring one qubit instantly determines the other, no matter
          how far apart the qubits are.
        </p>
        <p>
          Entanglement produces correlations stronger than any classical shared randomness. If Alice
          and Bob each hold one qubit of |Φ⁺⟩, each sees 0 or 1 with 50% probability individually —
          but their outcomes are always equal. This is not "hidden instructions" sent at creation time
          in a classical sense; quantum mechanics predicts violations of Bell inequalities, confirmed
          experimentally.
        </p>
        <Katex display>{`|\\Phi^+\\rangle = \\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}}, \\quad |\\Phi^-\\rangle = \\tfrac{|00\\rangle - |11\\rangle}{\\sqrt{2}}`}</Katex>
        <Katex display>{`|\\Psi^+\\rangle = \\tfrac{|01\\rangle + |10\\rangle}{\\sqrt{2}}, \\quad |\\Psi^-\\rangle = \\tfrac{|01\\rangle - |10\\rangle}{\\sqrt{2}}`}</Katex>

        <EntanglementChecker />

        <WorkedExample
          title="Measurement correlations of |Φ⁺⟩"
          steps={[
            { label: 'Expand the state in the computational basis.', latex: '|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}|00\\rangle + \\tfrac{1}{\\sqrt{2}}|11\\rangle' },
            { label: 'Measuring both qubits: only |00⟩ or |11⟩ appear, each with 50%.', latex: 'P(00) = P(11) = \\tfrac{1}{2},\\; P(01) = P(10) = 0' },
            { label: 'Given outcome 0 on qubit 0, qubit 1 is certainly 0 — perfect correlation.', latex: 'P(q_1=0 \\mid q_0=0) = 1' },
          ]}
        />

        <Checkpoint
          question="Can entanglement be used to send information faster than light?"
          answer="no"
          hint="Individual measurement outcomes are random; correlation appears only when results are compared later."
        />



        <LabLink id="entanglement" title="Entanglement Measurement Lab" />
        <LabLink id="bell-states" title="Bell State Generator" />
      </LearnSection>

      <LearnSection chapter="multipleQubits" sectionId="4.4"
        prev={{ title: '4.3 Entanglement', path: `${BASE}#4.3` }}
        next={{ title: '4.5 No-Cloning Theorem', path: `${BASE}#4.5` }}
      >
        <p>
          Single-qubit gates act as <Katex>{`U \\otimes I`}</Katex> or{' '}
          <Katex>{`I \\otimes U`}</Katex> on two-qubit systems. To create entanglement we need{' '}
          <strong>multi-qubit gates</strong> that cannot be decomposed into independent single-qubit
          operations. The workhorse is <strong>CNOT</strong> (controlled-NOT): flip the target qubit
          iff the control is |1⟩.
        </p>
        <Katex display>{`\\mathrm{CNOT}|c,t\\rangle = |c,\\; t \\oplus c\\rangle`}</Katex>
        <p>
          <strong>SWAP</strong> exchanges two qubits — useful for routing on hardware with limited
          connectivity. The <strong>Toffoli (CCNOT)</strong> gate flips a target when both controls
          are |1⟩; it is universal for classical reversible computation and appears in quantum
          arithmetic circuits.
        </p>

        <BellPairCircuit />

        <MultiQubitGateDemo />

        <WorkedExample
          title="CNOT truth table on computational basis"
          steps={[
            { label: 'CNOT leaves |00⟩ and |01⟩ unchanged (control is 0).', latex: '\\mathrm{CNOT}|00\\rangle = |00\\rangle,\\; \\mathrm{CNOT}|01\\rangle = |01\\rangle' },
            { label: 'When control is 1, target toggles.', latex: '\\mathrm{CNOT}|10\\rangle = |11\\rangle,\\; \\mathrm{CNOT}|11\\rangle = |10\\rangle' },
            { label: 'Applied to (|00⟩+|10⟩)/√2 after H on qubit 0, produces |Φ⁺⟩.', latex: '(\\mathrm{CNOT})(H\\otimes I)|00\\rangle = |\\Phi^+\\rangle' },
          ]}
        />

        <Checkpoint
          question="What does SWAP|01⟩ equal?"
          answer="|10⟩"
        />


        <LabLink id="circuit-builder" title="Quantum Circuit Builder" />
      </LearnSection>

      <LearnSection chapter="multipleQubits" sectionId="4.5"
        prev={{ title: '4.4 Multi-Qubit Gates', path: `${BASE}#4.4` }}
        next={{ title: '4.6 Universal Gate Set', path: `${BASE}#4.6` }}
      >
        <p>
          Classical bits can be copied freely — the COPY gate duplicates information. Quantum
          mechanics forbids an analogous operation: there is no unitary{' '}
          <Katex>{`U`}</Katex> that clones an arbitrary unknown qubit{' '}
          <Katex>{`|\\psi\\rangle`}</Katex> onto an ancilla initialized to |0⟩:
        </p>
        <Katex display>{`\\nexists U \\;\\forall |\\psi\\rangle:\\; U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle`}</Katex>
        <p>
          The theorem, proved by Wootters and Zurek (1982) and independently by Dieks, is a direct
          consequence of linearity. If a cloner worked on |0⟩ and |1⟩, it would have to work on
          their superposition — but then it would produce a state that is not the product of two
          copies of the input.
        </p>

        <WorkedExample
          title="Proof sketch by contradiction"
          steps={[
            { label: 'Suppose a cloner U exists with U|0⟩|0⟩ = |0⟩|0⟩ and U|1⟩|0⟩ = |1⟩|1⟩.', latex: 'U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle \\text{ for all } |\\psi\\rangle' },
            { label: 'Apply U to |+⟩|0⟩ = (|0⟩|0⟩ + |1⟩|0⟩)/√2.', latex: 'U|+\\rangle|0\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle|0\\rangle + |1\\rangle|1\\rangle)' },
            { label: 'If cloning worked, we would also get |+⟩|+⟩ = (|00⟩+|01⟩+|10⟩+|11⟩)/2.', latex: '|+\\rangle|+\\rangle = \\tfrac{1}{2}(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)' },
            { label: 'These are different states — contradiction. No universal cloner exists.', latex: 'U|+\\rangle|0\\rangle \\neq |+\\rangle|+\\rangle' },
          ]}
        />

        <Checkpoint
          question="Can you clone a qubit if you know it is exactly |0⟩ or |1⟩ (classical information)?"
          answer="yes"
          hint="Known orthogonal states can be copied — the theorem applies to unknown arbitrary states."
        />

      </LearnSection>

      <LearnSection chapter="multipleQubits" sectionId="4.6"
        prev={{ title: '4.5 No-Cloning Theorem', path: `${BASE}#4.5` }}
        next={{ title: 'Chapter 5: Quantum Circuits', path: '/learn/circuits' }}
      >
        <p>
          A gate set is <strong>universal</strong> if any n-qubit unitary can be approximated to
          arbitrary precision using circuits composed only of those gates. The set{' '}
          <Katex>{`\\{H, T, \\mathrm{CNOT}\\}`}</Katex> is universal for single-qubit rotations
          plus entangling operations — sufficient to run any quantum algorithm.
        </p>
        <p>
          The Hadamard <Katex>{`H`}</Katex> creates superposition; the T gate{' '}
          <Katex>{`T|0\\rangle = |0\\rangle,\\; T|1\\rangle = e^{i\\pi/4}|1\\rangle`}</Katex>{' '}
          adds a π/4 phase on |1⟩. Together with rotations generated by H and T (via Solovay–Kitaev
          compilation), they approximate any single-qubit unitary. CNOT entangles qubits, enabling
          multi-qubit unitaries.
        </p>
        <Katex display>{`\\text{Universal} \\iff \\text{dense in } U(2^n) \\text{ under composition}`}</Katex>

        <div className="lab-panel">
          <p style={{ marginTop: 0 }}>
            Common single-qubit gates in the same family: <strong>S</strong> = T² (π/2 phase),{' '}
            <strong>Z</strong> = S² (π phase). Clifford gates (H, S, CNOT) are not universal alone —
            they need T (or another non-Clifford gate) for universality.
          </p>
          <div className="btn-group">
            {(['H', 'T', 'S', 'X', 'Z'] as const).map((g) => (
              <span key={g} className="btn" style={{ cursor: 'default' }}>{g}</span>
            ))}
            <span className="btn btn-primary" style={{ cursor: 'default' }}>CNOT</span>
          </div>
          <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>
            Bell state |Φ⁺⟩ from {`{H, CNOT}`} alone — T is needed for arbitrary phase precision
            in general algorithms (e.g. Shor, precise phase estimation).
          </p>
        </div>

        <WorkedExample
          title="Why Clifford + T is a standard fault-tolerant set"
          steps={[
            { label: 'Clifford gates (H, S, CNOT) are efficiently simulable classically (Gottesman–Knill) but not universal.', latex: '\\text{Clifford} \\subsetneq \\text{Universal}' },
            { label: 'Adding T makes the set universal — any unitary can be approximated.', latex: 'H, T, \\mathrm{CNOT} \\text{ generate dense subgroup}' },
            { label: 'T gates are expensive in fault-tolerant architectures (magic state distillation).', latex: 'T\\text{-count often dominates resource estimates}' },
          ]}
        />

        <Checkpoint
          question="Is {H, CNOT} alone sufficient to approximate an arbitrary T rotation on a qubit?"
          answer="no"
          hint="H and CNOT generate only Clifford operations; T adds non-Clifford phases."
        />


        <LabLink id="gate-explorer" title="Gate Explorer" />
      </LearnSection>

      <div className="section-nav">
        <Link to="/learn/linear-algebra">← Linear Algebra</Link>
        <Link to="/learn/circuits">Next: Quantum Circuits →</Link>
      </div>
    </article>
  );
}
