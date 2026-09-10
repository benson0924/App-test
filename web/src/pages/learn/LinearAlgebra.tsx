import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Section from '@/components/Section';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import {
  C,
  Gates,
  innerProduct,
  normalize,
  singleQubitState,
  parseComplex,
  type Complex,
} from 'quantum-core';

const BASE = '/learn/linear-algebra';
const SQ2 = 1 / Math.sqrt(2);

function formatComplex(c: Complex): string {
  return C.toString(c, 3);
}

function parseVec2(re0: string, im0: string, re1: string, im1: string): Complex[] | null {
  try {
    return [
      C.add(parseComplex(re0), C.mul(parseComplex(im0 || '0'), C.i())),
      C.add(parseComplex(re1), C.mul(parseComplex(im1 || '0'), C.i())),
    ];
  } catch {
    return null;
  }
}

function InnerProductCalculator() {
  const [aRe0, setARe0] = useState('1');
  const [aIm0, setAIm0] = useState('0');
  const [aRe1, setARe1] = useState('0');
  const [aIm1, setAIm1] = useState('0');
  const [bRe0, setBRe0] = useState(String(SQ2.toFixed(4)));
  const [bIm0, setBIm0] = useState('0');
  const [bRe1, setBRe1] = useState(String(SQ2.toFixed(4)));
  const [bIm1, setBIm1] = useState('0');

  const result = useMemo(() => {
    const ampsA = parseVec2(aRe0, aIm0, aRe1, aIm1);
    const ampsB = parseVec2(bRe0, bIm0, bRe1, bIm1);
    if (!ampsA || !ampsB) return { error: 'Invalid complex entry' as const };

    const stateA = normalize(singleQubitState(ampsA[0], ampsA[1]));
    const stateB = normalize(singleQubitState(ampsB[0], ampsB[1]));
    const ip = innerProduct(stateA, stateB);
    const normA = Math.sqrt(C.mag2(ampsA[0]) + C.mag2(ampsA[1]));
    const normB = Math.sqrt(C.mag2(ampsB[0]) + C.mag2(ampsB[1]));
    const rawIp = C.add(
      C.mul(C.conj(ampsA[0]), ampsB[0]),
      C.mul(C.conj(ampsA[1]), ampsB[1])
    );
    const orthogonal = C.mag(ip) < 1e-6;

    return { ip, rawIp, normA, normB, orthogonal, error: null as null };
  }, [aRe0, aIm0, aRe1, aIm1, bRe0, bIm0, bRe1, bIm1]);

  const presets = [
    { label: '|0⟩ · |+⟩', a: ['1', '0', '0', '0'], b: [String(SQ2), '0', String(SQ2), '0'] },
    { label: '|0⟩ · |1⟩', a: ['1', '0', '0', '0'], b: ['0', '0', '1', '0'] },
    { label: '|+⟩ · |−⟩', a: [String(SQ2), '0', String(SQ2), '0'], b: [String(SQ2), '0', String(-SQ2), '0'] },
  ];

  return (
    <div className="lab-panel">
      <p style={{ marginTop: 0 }}>
        Enter two 2-vectors (complex components). The calculator computes{' '}
        <Katex>{`\\langle a|b\\rangle = a_0^* b_0 + a_1^* b_1`}</Katex> using{' '}
        <code>quantum-core</code>.
      </p>
      <div className="btn-group" style={{ marginBottom: '1rem' }}>
        {presets.map((p) => (
          <button
            key={p.label}
            className="btn"
            onClick={() => {
              setARe0(p.a[0]); setAIm0(p.a[1]); setARe1(p.a[2]); setAIm1(p.a[3]);
              setBRe0(p.b[0]); setBIm0(p.b[1]); setBRe1(p.b[2]); setBIm1(p.b[3]);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid-2">
        <div>
          <label><strong>|a⟩</strong> components</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginTop: '0.35rem' }}>
            <input placeholder="Re a₀" value={aRe0} onChange={(e) => setARe0(e.target.value)} />
            <input placeholder="Im a₀" value={aIm0} onChange={(e) => setAIm0(e.target.value)} />
            <input placeholder="Re a₁" value={aRe1} onChange={(e) => setARe1(e.target.value)} />
            <input placeholder="Im a₁" value={aIm1} onChange={(e) => setAIm1(e.target.value)} />
          </div>
        </div>
        <div>
          <label><strong>|b⟩</strong> components</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginTop: '0.35rem' }}>
            <input placeholder="Re b₀" value={bRe0} onChange={(e) => setBRe0(e.target.value)} />
            <input placeholder="Im b₀" value={bIm0} onChange={(e) => setBIm0(e.target.value)} />
            <input placeholder="Re b₁" value={bRe1} onChange={(e) => setBRe1(e.target.value)} />
            <input placeholder="Im b₁" value={bIm1} onChange={(e) => setBIm1(e.target.value)} />
          </div>
        </div>
      </div>
      {result.error ? (
        <p style={{ color: 'var(--error)', marginBottom: 0 }}>{result.error}</p>
      ) : (
        <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <p>|a| = {result.normA!.toFixed(4)} &nbsp;|b| = {result.normB!.toFixed(4)}</p>
          <p>
            ⟨a|b⟩ (raw) = {formatComplex(result.rawIp!)} &nbsp;→&nbsp;
            ⟨â|b̂⟩ (normalized) = {formatComplex(result.ip!)}
          </p>
          <p style={{ marginBottom: 0 }}>
            |⟨a|b⟩|² = {(C.mag2(result.ip!) * 100).toFixed(2)}%
            {result.orthogonal ? ' — orthogonal (inner product ≈ 0)' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

type GateKey = 'I' | 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T';

function matrixCell(c: Complex): string {
  if (Math.abs(c.im) < 1e-10 && Math.abs(c.re) < 1e-10) return '0';
  if (Math.abs(c.im) < 1e-10) return c.re.toFixed(3);
  if (Math.abs(c.re) < 1e-10) return `${c.im.toFixed(3)}i`;
  const sign = c.im >= 0 ? '+' : '-';
  return `${c.re.toFixed(3)}${sign}${Math.abs(c.im).toFixed(3)}i`;
}

function UnitaryDemo() {
  const [gate, setGate] = useState<GateKey>('H');
  const U = Gates[gate];
  const UdU = useMemo(() => U.mulMat(U.dagger()), [gate]);
  const isUnitary = U.isUnitary();

  return (
    <div className="lab-panel">
      <label>Single-qubit gate U</label>
      <div className="btn-group" style={{ marginTop: '0.5rem' }}>
        {(['I', 'X', 'Y', 'Z', 'H', 'S', 'T'] as GateKey[]).map((g) => (
          <button
            key={g}
            className={`btn ${gate === g ? 'btn-primary' : ''}`}
            onClick={() => setGate(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div>
          <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem' }}>Matrix U</p>
          <table className="data-table" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <tbody>
              {U.data.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{matrixCell(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem' }}>Product U†U</p>
          <table className="data-table" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <tbody>
              {UdU.data.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ background: i === j && C.eq(cell, C.one(), 1e-6) ? 'var(--accent-muted)' : undefined }}>
                      {matrixCell(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ marginBottom: 0, marginTop: '1rem' }}>
        {isUnitary ? '✓ U†U = I — this gate preserves vector norms.' : '✗ Not unitary — not a valid quantum gate.'}
      </p>
    </div>
  );
}

function ProjectionDemo() {
  const [alphaRe, setAlphaRe] = useState('0.6');
  const [betaRe, setBetaRe] = useState('0.8');

  const result = useMemo(() => {
    try {
      const a = parseComplex(alphaRe);
      const b = parseComplex(betaRe);
      const state = normalize(singleQubitState(a, b));
      const zero = singleQubitState(C.one(), C.zero());
      const one = singleQubitState(C.zero(), C.one());
      const amp0 = innerProduct(zero, state);
      const amp1 = innerProduct(one, state);
      return {
        p0: C.mag2(amp0),
        p1: C.mag2(amp1),
        amp0,
        amp1,
      };
    } catch {
      return null;
    }
  }, [alphaRe, betaRe]);

  return (
    <div className="lab-panel">
      <p style={{ marginTop: 0 }}>
        Set amplitudes α, β (real for simplicity). The demo computes{' '}
        <Katex>{`P(0) = |\\langle 0|\\psi\\rangle|^2`}</Katex> and{' '}
        <Katex>{`P(1) = |\\langle 1|\\psi\\rangle|^2`}</Katex>.
      </p>
      <div className="grid-2">
        <div>
          <label>α (real)</label>
          <input value={alphaRe} onChange={(e) => setAlphaRe(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <label>β (real)</label>
          <input value={betaRe} onChange={(e) => setBetaRe(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem' }}>P(0)</p>
              <div style={{ height: '24px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${result.p0 * 100}%`, height: '100%', background: 'var(--accent)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                {(result.p0 * 100).toFixed(1)}% — ⟨0|ψ⟩ = {formatComplex(result.amp0)}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem' }}>P(1)</p>
              <div style={{ height: '24px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${result.p1 * 100}%`, height: '100%', background: 'var(--accent)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                {(result.p1 * 100).toFixed(1)}% — ⟨1|ψ⟩ = {formatComplex(result.amp1)}
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
            P(0) + P(1) = {((result.p0 + result.p1) * 100).toFixed(1)}% (completeness relation).
          </p>
        </div>
      )}
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

export default function LinearAlgebra() {
  return (
    <article>
      <span className="tag">Chapter 3</span>
      <h1>Linear Algebra for Quantum Computing</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Quantum mechanics is linear algebra over complex numbers. This chapter develops the Dirac
        notation — kets, bras, inner products, projectors, and unitary operators — that we use to
        describe states, measurements, and reversible gates throughout the rest of the textbook.
      </p>

      <Section
        id="3.1"
        title="3.1 Kets — Vector Representation"
        prev={{ title: 'Chapter 2: One Qubit', path: '/learn/one-qubit' }}
        next={{ title: '3.2 Bras', path: `${BASE}#3.2` }}
      >
        <p>
          A quantum <strong>pure state</strong> is represented by a column vector in a complex
          Hilbert space. Dirac's <strong>ket</strong> notation writes this vector as{' '}
          <Katex>{`|\\psi\\rangle`}</Katex>, read "psi ket." For one qubit the space is{' '}
          <Katex>{`\\mathbb{C}^2`}</Katex>, spanned by the computational basis kets{' '}
          <Katex>{`|0\\rangle`}</Katex> and <Katex>{`|1\\rangle`}</Katex>.
        </p>
        <p>
          In column-vector form, <Katex>{`|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}`}</Katex>{' '}
          and <Katex>{`|1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix}`}</Katex>. Any single-qubit
          state is a linear combination{' '}
          <Katex>{`|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle`}</Katex> with complex
          coefficients stored as a two-component column:
        </p>
        <Katex display>{`|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}, \\quad \\alpha, \\beta \\in \\mathbb{C}`}</Katex>
        <p>
          The ket is not merely a notational convenience — it signals that we are treating the object
          as a vector that will be acted on by matrices (operators) from the left. When we extend to
          multiple qubits, kets live in larger tensor-product spaces, but the column-vector picture
          remains the same.
        </p>
        <p>
          We often label basis kets by bit strings: <Katex>{`|0\\rangle`}</Katex> and{' '}
          <Katex>{`|1\\rangle`}</Katex> for one qubit, later <Katex>{`|00\\rangle, |01\\rangle, \\ldots`}</Katex>{' '}
          for two. The symbol inside the ket is a shorthand for which standard basis direction the
          vector points — not a classical value stored inside the quantum system.
        </p>

        <WorkedExample
          title="Express |+⟩ in column form"
          steps={[
            { label: 'The |+⟩ state is an equal superposition of |0⟩ and |1⟩.', latex: '|+\\rangle = \\tfrac{1}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle' },
            { label: 'Substitute the basis column vectors and add component-wise.', latex: '|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\0\\end{pmatrix} + \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}0\\\\1\\end{pmatrix}' },
            { label: 'Result: a normalized column vector with equal real entries.', latex: '|+\\rangle = \\begin{pmatrix} 1/\\sqrt{2} \\\\ 1/\\sqrt{2} \\end{pmatrix}' },
          ]}
        />

        <Checkpoint
          question="How many complex amplitudes specify a single-qubit pure state?"
          answer="2"
          hint="Count the basis states |0⟩ and |1⟩."
        />

        <Expandable title="Global phase is unphysical">
          <p>
            Multiplying a ket by any non-zero complex scalar{' '}
            <Katex>{`e^{i\\gamma}`}</Katex> changes the vector but not any observable probability.
            States <Katex>{`|\\psi\\rangle`}</Katex> and{' '}
            <Katex>{`e^{i\\gamma}|\\psi\\rangle`}</Katex> are physically equivalent. We usually
            fix the global phase by requiring the first non-zero amplitude to be real and positive,
            or by imposing the normalization constraint below.
          </p>
        </Expandable>
      </Section>

      <Section
        id="3.2"
        title="3.2 Bras — Conjugate Transpose"
        prev={{ title: '3.1 Kets', path: `${BASE}#3.1` }}
        next={{ title: '3.3 Inner Products', path: `${BASE}#3.3` }}
      >
        <p>
          Every ket <Katex>{`|\\psi\\rangle`}</Katex> has a dual <strong>bra</strong>{' '}
          <Katex>{`\\langle\\psi|`}</Katex>, obtained by taking the conjugate transpose (Hermitian
          adjoint) of the column vector. If{' '}
          <Katex>{`|\\psi\\rangle = (\\alpha, \\beta)^\\mathsf{T}`}</Katex>, then{' '}
          <Katex>{`\\langle\\psi| = (\\alpha^*, \\beta^*)`}</Katex> — a row vector with complex
          conjugated entries.
        </p>
        <Katex display>{`|\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} \\quad \\Longleftrightarrow \\quad \\langle\\psi| = \\begin{pmatrix} \\alpha^* & \\beta^* \\end{pmatrix}`}</Katex>
        <p>
          The dagger notation <Katex>{`(\\cdot)^\\dagger`}</Katex> denotes conjugate transpose for
          vectors and matrices. For kets, <Katex>{`\\langle\\psi| = |\\psi\\rangle^\\dagger`}</Katex>.
          This pairing is what makes Dirac's <strong>braket</strong>{' '}
          <Katex>{`\\langle\\phi|\\psi\\rangle`}</Katex> a natural inner product: a row times a column
          yielding a complex scalar.
        </p>

        <WorkedExample
          title="Find ⟨ψ| for |ψ⟩ = (1, i)ᵀ"
          steps={[
            { label: 'Write the ket as a column.', latex: '|\\psi\\rangle = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix}' },
            { label: 'Take complex conjugate of each entry.', latex: '1^* = 1, \\quad i^* = -i' },
            { label: 'Form the row vector (conjugate transpose).', latex: '\\langle\\psi| = \\begin{pmatrix} 1 & -i \\end{pmatrix}' },
          ]}
        />

        <Checkpoint
          question="What is the bra ⟨0| in row-vector form?"
          answer="(1, 0)"
          hint="Take the conjugate transpose of |0⟩ = (1, 0)ᵀ."
        />

        <Expandable title="Why conjugate?">
          <p>
            Complex conjugation ensures the inner product{' '}
            <Katex>{`\\langle\\psi|\\psi\\rangle`}</Katex> is a non-negative real number — the
            squared norm of the state. Without conjugation,{' '}
            <Katex>{`\\psi^\\mathsf{T}\\psi`}</Katex> could be complex, which would not serve as
            a probability weight.
          </p>
          <Katex display>{`\\langle\\psi|\\psi\\rangle = |\\alpha|^2 + |\\beta|^2 \\geq 0`}</Katex>
        </Expandable>

        <Expandable title="Matrix–vector multiplication preview">
          <p>
            A gate matrix <Katex>{`U`}</Katex> maps kets to kets:{' '}
            <Katex>{`|\\psi'\\rangle = U|\\psi\\rangle`}</Katex>. In components,{' '}
            <Katex>{`\\psi'_i = \\sum_j U_{ij} \\psi_j`}</Katex>. The bra transforms contravariantly:{' '}
            <Katex>{`\\langle\\psi'| = \\langle\\psi|U^\\dagger`}</Katex>. Keeping track of whether
            the adjoint acts on the left or right prevents many sign errors in derivations.
          </p>
        </Expandable>
      </Section>

      <Section
        id="3.3"
        title="3.3 Inner Products, Norm, and Orthogonality"
        prev={{ title: '3.2 Bras', path: `${BASE}#3.2` }}
        next={{ title: '3.4 Projection & Measurement', path: `${BASE}#3.4` }}
      >
        <p>
          The <strong>inner product</strong> (or <strong>scalar product</strong>) of two kets{' '}
          <Katex>{`|\\phi\\rangle`}</Katex> and <Katex>{`|\\psi\\rangle`}</Katex> is the complex
          number <Katex>{`\\langle\\phi|\\psi\\rangle`}</Katex>, computed by summing products of
          conjugated components:
        </p>
        <Katex display>{`\\langle\\phi|\\psi\\rangle = \\sum_i \\phi_i^* \\psi_i = \\phi^\\dagger \\psi`}</Katex>
        <p>
          The <strong>norm</strong> of a state is{' '}
          <Katex>{`\\|\\psi\\| = \\sqrt{\\langle\\psi|\\psi\\rangle}`}</Katex>. A valid quantum
          state must be <strong>normalized</strong>: <Katex>{`\\langle\\psi|\\psi\\rangle = 1`}</Katex>.
          Two states are <strong>orthogonal</strong> when{' '}
          <Katex>{`\\langle\\phi|\\psi\\rangle = 0`}</Katex> — they share no overlap and are
          perfectly distinguishable in a single-shot measurement in a basis containing both.
        </p>
        <p>
          The computational basis <Katex>{`\\{|0\\rangle, |1\\rangle\\}`}</Katex> is{' '}
          <strong>orthonormal</strong>: each vector has unit norm and any two distinct basis kets
          are orthogonal. This is the default measurement basis for qubits throughout the textbook.
        </p>
        <Katex display>{`\\langle i|j\\rangle = \\delta_{ij} = \\begin{cases} 1 & i = j \\\\ 0 & i \\neq j \\end{cases}`}</Katex>

        <InnerProductCalculator />

        <WorkedExample
          title="Inner product of |0⟩ and |+⟩"
          steps={[
            { label: 'Write both kets in column form.', latex: '|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix},\\; |+\\rangle = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1\\\\1\\end{pmatrix}' },
            { label: 'Form ⟨0|+⟩ = 1*·(1/√2) + 0*·(1/√2).', latex: '\\langle 0|+\\rangle = \\tfrac{1}{\\sqrt{2}}' },
            { label: 'The overlap is non-zero — |0⟩ and |+⟩ are not orthogonal.', latex: '|\\langle 0|+\\rangle|^2 = \\tfrac{1}{2}' },
          ]}
        />

        <Checkpoint
          question="Are |+⟩ and |−⟩ orthogonal?"
          answer="yes"
          hint="Compute ⟨+|−⟩; |−⟩ = (|0⟩ − |1⟩)/√2."
        />

        <Expandable title="Properties of the inner product">
          <Katex display>{`\\langle\\phi|\\psi\\rangle = \\langle\\psi|\\phi\\rangle^*`}</Katex>
          <Katex display>{`\\langle\\psi|(\\alpha|\\phi\\rangle + \\beta|\\chi\\rangle) = \\alpha\\langle\\psi|\\phi\\rangle + \\beta\\langle\\psi|\\chi\\rangle`}</Katex>
          <p>
            Conjugate symmetry and linearity in the second argument make the inner product a
            sesquilinear form — the standard geometry of complex Hilbert spaces.
          </p>
        </Expandable>
      </Section>

      <Section
        id="3.4"
        title="3.4 Projection and Measurement"
        prev={{ title: '3.3 Inner Products', path: `${BASE}#3.3` }}
        next={{ title: '3.5 Outer Products', path: `${BASE}#3.5` }}
      >
        <p>
          When we measure a qubit in the computational basis, outcome <Katex>{`m \\in \\{0,1\\}`}</Katex>{' '}
          occurs with probability given by the <strong>Born rule</strong>:
        </p>
        <Katex display>{`P(m) = |\\langle m|\\psi\\rangle|^2`}</Katex>
        <p>
          The amplitude <Katex>{`\\langle m|\\psi\\rangle`}</Katex> is the overlap between the
          state and the measurement outcome ket. Squaring its magnitude gives a real probability
          between 0 and 1. After obtaining outcome <Katex>{`m`}</Katex>, the state{' '}
          <strong>collapses</strong> to <Katex>{`|m\\rangle`}</Katex> (up to normalization, which
          is already 1 for basis states).
        </p>
        <p>
          The <strong>projector</strong> onto outcome <Katex>{`m`}</Katex> is the outer product{' '}
          <Katex>{`P_m = |m\\rangle\\langle m|`}</Katex>, a 2×2 matrix that picks out the component
          of <Katex>{`|\\psi\\rangle`}</Katex> along <Katex>{`|m\\rangle`}</Katex>. The probability
          can also be written <Katex>{`P(m) = \\langle\\psi|P_m|\\psi\\rangle`}</Katex>.
        </p>
        <Katex display>{`P_0 = |0\\rangle\\langle 0| = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}, \\quad P_1 = |1\\rangle\\langle 1| = \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}`}</Katex>
        <p>
          Projectors are Hermitian (<Katex>{`P_m = P_m^\\dagger`}</Katex>) and idempotent (
          <Katex>{`P_m^2 = P_m`}</Katex>). Applying a projector once has the same effect as applying
          it twice — once we know the outcome, repeating the measurement yields the same result with
          certainty.
        </p>

        <ProjectionDemo />

        <WorkedExample
          title="Measure |ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩ in the Z basis"
          steps={[
            { label: 'Compute ⟨0|ψ⟩ = 3/5.', latex: '\\langle 0|\\psi\\rangle = \\tfrac{3}{5}' },
            { label: 'Probability of outcome 0.', latex: 'P(0) = |\\tfrac{3}{5}|^2 = \\tfrac{9}{25} = 0.36' },
            { label: 'By normalization, P(1) = 1 − P(0) = 16/25 = 0.64.', latex: 'P(1) = |\\tfrac{4}{5}|^2 = \\tfrac{16}{25}' },
          ]}
        />

        <Checkpoint
          question="For |ψ⟩ = |+⟩, what is P(0) when measuring in the computational basis?"
          answer="1/2"
          hint="⟨0|+⟩ = 1/√2; square the magnitude."
        />

        <LabLink id="measurement" title="Measurement Lab" />

        <Expandable title="General projective measurement">
          <p>
            For an orthonormal basis <Katex>{`\\{|m\\rangle\\}`}</Katex>, the projectors{' '}
            <Katex>{`P_m = |m\\rangle\\langle m|`}</Katex> satisfy{' '}
            <Katex>{`\\sum_m P_m = I`}</Katex> and <Katex>{`P_m P_{m'} = \\delta_{mm'} P_m`}</Katex>.
            Measuring in the X basis uses projectors onto |+⟩ and |−⟩ instead of |0⟩ and |1⟩.
          </p>
        </Expandable>
      </Section>

      <Section
        id="3.5"
        title="3.5 Outer Products and Completeness"
        prev={{ title: '3.4 Projection & Measurement', path: `${BASE}#3.4` }}
        next={{ title: '3.6 Unitary Matrices', path: `${BASE}#3.6` }}
      >
        <p>
          The <strong>outer product</strong> of a ket <Katex>{`|\\psi\\rangle`}</Katex> and a bra{' '}
          <Katex>{`\\langle\\phi|`}</Katex> forms a matrix:{' '}
          <Katex>{`|\\psi\\rangle\\langle\\phi|`}</Katex>. For single-qubit kets this is a 2×2
          complex matrix. When <Katex>{`\\phi = \\psi`}</Katex>, the outer product is a rank-one
          projector onto the subspace spanned by <Katex>{`|\\psi\\rangle`}</Katex>.
        </p>
        <Katex display>{`|\\psi\\rangle\\langle\\phi| = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix} \\begin{pmatrix} \\gamma^* & \\delta^* \\end{pmatrix} = \\begin{pmatrix} \\alpha\\gamma^* & \\alpha\\delta^* \\\\ \\beta\\gamma^* & \\beta\\delta^* \\end{pmatrix}`}</Katex>
        <p>
          A crucial identity: summing outer products over an orthonormal basis reconstructs the
          identity operator. For the computational basis,
        </p>
        <Katex display>{`\\sum_{j \\in \\{0,1\\}} |j\\rangle\\langle j| = |0\\rangle\\langle 0| + |1\\rangle\\langle 1| = I`}</Katex>
        <p>
          This <strong>completeness relation</strong> (also called <strong>resolution of the
          identity</strong>) underlies the Born rule: inserting <Katex>{`I = \\sum_j |j\\rangle\\langle j|`}</Katex>{' '}
          into <Katex>{`\\langle\\psi|\\psi\\rangle`}</Katex> decomposes unity into a sum of
          probabilities <Katex>{`|\\langle j|\\psi\\rangle|^2`}</Katex>.
        </p>

        <WorkedExample
          title="Verify completeness for one qubit"
          steps={[
            { label: 'Write each projector explicitly.', latex: '|0\\rangle\\langle 0| = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix},\\; |1\\rangle\\langle 1| = \\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}' },
            { label: 'Add the matrices entry-wise.', latex: '|0\\rangle\\langle 0| + |1\\rangle\\langle 1| = \\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}' },
            { label: 'The sum is the 2×2 identity I.', latex: '\\sum_j |j\\rangle\\langle j| = I' },
          ]}
        />

        <Checkpoint
          question="What is the rank of the projector |0⟩⟨0|?"
          answer="1"
          hint="It projects onto a one-dimensional subspace."
        />

        <LabLink id="tensor-product" title="Tensor Product Lab" />

        <Expandable title="Spectral decomposition preview">
          <p>
            Hermitian operators (observables) decompose as{' '}
            <Katex>{`A = \\sum_k \\lambda_k |k\\rangle\\langle k|`}</Katex> with real eigenvalues{' '}
            <Katex>{`\\lambda_k`}</Katex>. Unitary operators have eigenvalues on the unit circle.
            The outer-product framework unifies measurement projectors and gate spectral theory.
          </p>
        </Expandable>
      </Section>

      <Section
        id="3.6"
        title="3.6 Unitary Matrices"
        prev={{ title: '3.5 Outer Products', path: `${BASE}#3.5` }}
        next={{ title: 'Chapter 4: Multiple Qubits', path: '/learn/multiple-qubits' }}
      >
        <p>
          Quantum gates are represented by <strong>unitary matrices</strong>. A matrix{' '}
          <Katex>{`U`}</Katex> is unitary if its conjugate transpose equals its inverse:
        </p>
        <Katex display>{`U^\\dagger U = U U^\\dagger = I`}</Katex>
        <p>
          Unitary evolution is reversible: given <Katex>{`|\\psi'\\rangle = U|\\psi\\rangle`}</Katex>,
          we can recover <Katex>{`|\\psi\\rangle = U^\\dagger|\\psi'\\rangle`}</Katex>. This
          reversibility is essential — unlike classical AND gates, quantum gates do not discard
          information (until measurement).
        </p>
        <p>
          <strong>Normalization is preserved:</strong> for any unitary{' '}
          <Katex>{`U`}</Katex> and state <Katex>{`|\\psi\\rangle`}</Katex>,
        </p>
        <Katex display>{`\\langle\\psi'|\\psi'\\rangle = \\langle\\psi|U^\\dagger U|\\psi\\rangle = \\langle\\psi|I|\\psi\\rangle = \\langle\\psi|\\psi\\rangle = 1`}</Katex>

        <UnitaryDemo />

        <WorkedExample
          title="Prove H is unitary"
          steps={[
            { label: 'Write the Hadamard matrix.', latex: 'H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}' },
            { label: 'Compute H† (conjugate transpose).', latex: 'H^\\dagger = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix} = H' },
            { label: 'Multiply H†H — the (1,1) entry is ½(1+1) = 1; off-diagonals cancel.', latex: 'H^\\dagger H = I' },
            { label: 'H is unitary, so it maps valid states to valid states.', latex: '\\|H|\\psi\\rangle\\| = \\||\\psi\\rangle\\|' },
          ]}
        />

        <Checkpoint
          question="If U is unitary, what is det(U) in general?"
          answer="e^(iθ)"
          hint="Determinant of a unitary lies on the unit circle in the complex plane."
        />

        <LabLink id="unitary-checker" title="Unitary Checker" />

        <Expandable title="Full proof: unitaries preserve inner products">
          <p>
            For unitary <Katex>{`U`}</Katex> and any kets{' '}
            <Katex>{`|\\phi\\rangle, |\\psi\\rangle`}</Katex>:
          </p>
          <Katex display>{`\\langle U\\phi|U\\psi\\rangle = \\langle\\phi|U^\\dagger U|\\psi\\rangle = \\langle\\phi|\\psi\\rangle`}</Katex>
          <p>
            Unitary maps are <strong>isometries</strong> of Hilbert space — they preserve lengths
            and angles. Orthonormal bases map to orthonormal bases. This is why composing gates
            (multiplying unitaries) always yields another valid gate.
          </p>
        </Expandable>
      </Section>

      <div className="section-nav">
        <Link to="/learn">← All Chapters</Link>
        <Link to="/learn/multiple-qubits">Next: Multiple Qubits →</Link>
      </div>
    </article>
  );
}
