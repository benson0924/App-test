import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import {
  C,
  zeroState,
  createCircuit,
  applyCircuit,
  applyBitFlipError,
  bitFlipSyndrome,
  Gates,
  fromAmplitudes,
  applySingleQubitGate,
  fidelity,
  type StateVector,
} from 'quantum-core';
import { StateVectorTable } from '@/components/labs/labUtils';

const BASE = '/learn/error-correction';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

function PracticeProblem({ prompt, children }: { prompt: ReactNode; children: ReactNode }) {
  return (
    <div className="lab-panel" style={{ marginTop: '1rem' }}>
      <p><strong>Practice problem.</strong> {prompt}</p>
    </div>
  );
}

type NoiseKind = 'none' | 'bit' | 'phase' | 'decoherence' | 'gate';

function NoiseExplorer() {
  const [noise, setNoise] = useState<NoiseKind>('none');

  const demo = useMemo(() => {
    let state = fromAmplitudes(1, [
      C.scale(1 / Math.sqrt(2), C.one()),
      C.scale(1 / Math.sqrt(2), C.one()),
    ]);
    const label = '|+⟩ = (|0⟩ + |1⟩)/√2';
    if (noise === 'bit') {
      state = fromAmplitudes(1, applySingleQubitGate(state.amplitudes, 1, 0, Gates.X));
      return { state, desc: 'Bit-flip (X): |+⟩ → |−⟩ — superposition sign in Z basis flips.' };
    }
    if (noise === 'phase') {
      state = fromAmplitudes(1, applySingleQubitGate(state.amplitudes, 1, 0, Gates.Z));
      return { state, desc: 'Phase-flip (Z): |+⟩ unchanged in Z probs, but relative phase becomes −1.' };
    }
    if (noise === 'decoherence') {
      return {
        state: fromAmplitudes(1, [C.one(), C.zero()]),
        desc: 'Decoherence (T₂): off-diagonal coherences vanish → classical mixture |0⟩⟨0| (shown as |0⟩).',
      };
    }
    if (noise === 'gate') {
      state = fromAmplitudes(1, applySingleQubitGate(state.amplitudes, 1, 0, Gates.Rx(0.3)));
      return { state, desc: 'Gate over-rotation: intended H approximated by Rx(0.3) — wrong unitary.' };
    }
    return { state, desc: label };
  }, [noise]);

  const p0 = C.mag2(demo.state.amplitudes[0]);
  const p1 = C.mag2(demo.state.amplitudes[1]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Noise on a single qubit</h3>
      <div className="btn-group" style={{ flexWrap: 'wrap' }}>
        {(
          [
            ['none', 'Ideal |+⟩'],
            ['bit', 'Bit flip (X)'],
            ['phase', 'Phase flip (Z)'],
            ['decoherence', 'Decoherence'],
            ['gate', 'Gate error'],
          ] as const
        ).map(([k, lbl]) => (
          <button
            key={k}
            type="button"
            className={`btn ${noise === k ? 'btn-primary' : ''}`}
            onClick={() => setNoise(k)}
          >
            {lbl}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.9rem' }}>{demo.desc}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        P(|0⟩) = {(p0 * 100).toFixed(1)}%, P(|1⟩) = {(p1 * 100).toFixed(1)}%
      </p>
    </div>
  );
}

const SYNDROME_ROWS: { error: string; s0: number; s1: number; fix: string }[] = [
  { error: 'None', s0: 0, s1: 0, fix: 'Identity' },
  { error: 'X on qubit 0', s0: 1, s1: 1, fix: 'X₀' },
  { error: 'X on qubit 1', s0: 1, s1: 0, fix: 'X₁' },
  { error: 'X on qubit 2', s0: 0, s1: 1, fix: 'X₂' },
];

function SyndromeTableInteractive() {
  const [errorQubit, setErrorQubit] = useState<number | null>(null);
  const [logicalBit, setLogicalBit] = useState(0);

  const { encoded, corrupted, corrected, syndrome, row } = useMemo(() => {
    const c = createCircuit(3);
    if (logicalBit === 1) c.ops.push({ type: 'gate', name: 'X', qubits: [0] });
    c.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    c.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 2] });
    const encoded = applyCircuit(zeroState(3), c);

    let corrupted = encoded;
    if (errorQubit !== null) corrupted = applyBitFlipError(encoded, errorQubit);

    const syndrome = bitFlipSyndrome(errorQubit);
    let corrected: StateVector = corrupted;
    if (errorQubit !== null) {
      corrected = fromAmplitudes(
        3,
        applySingleQubitGate(corrupted.amplitudes, 3, errorQubit, Gates.X)
      );
    }

    const row =
      errorQubit === null ? 0 : errorQubit === 0 ? 1 : errorQubit === 1 ? 2 : 3;

    return { encoded, corrupted, corrected, syndrome, row };
  }, [logicalBit, errorQubit]);

  const encodeFidelity = fidelity(encoded, corrected);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>3-qubit bit-flip code — syndrome table</h3>
      <div className="grid-2">
        <label>
          Logical |0⟩_L or |1⟩_L
          <select value={logicalBit} onChange={(e) => setLogicalBit(Number(e.target.value))}>
            <option value={0}>|0⟩_L → |000⟩</option>
            <option value={1}>|1⟩_L → |111⟩</option>
          </select>
        </label>
        <label>
          Inject bit-flip error
          <select
            value={errorQubit ?? 'none'}
            onChange={(e) =>
              setErrorQubit(e.target.value === 'none' ? null : Number(e.target.value))
            }
          >
            <option value="none">No error</option>
            <option value={0}>X on qubit 0</option>
            <option value={1}>X on qubit 1</option>
            <option value={2}>X on qubit 2</option>
          </select>
        </label>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Error</th>
            <th>Syndrome (Z₀Z₁, Z₁Z₂)</th>
            <th>Correction</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {SYNDROME_ROWS.map((r, i) => (
            <tr
              key={r.error}
              style={{
                background: i === row ? 'var(--bg-elevated)' : undefined,
                fontWeight: i === row ? 600 : 400,
              }}
            >
              <td>{r.error}</td>
              <td className="mono">({r.s0}, {r.s1})</td>
              <td>{r.fix}</td>
              <td>{i === row ? '●' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Measured syndrome: <strong className="mono">({syndrome[0]}, {syndrome[1]})</strong>
        {errorQubit !== null && (
          <> → apply <Katex>{`X_{${errorQubit}}`}</Katex></>
        )}
      </p>
      <p style={{ fontSize: '0.85rem' }}>
        Post-correction fidelity with encoded state: {(encodeFidelity * 100).toFixed(1)}%
      </p>
      {errorQubit !== null && (
        <>
          <h4>Corrupted state (non-zero amplitudes)</h4>
          <StateVectorTable state={corrupted} />
          <h4>After correction</h4>
          <StateVectorTable state={corrected} />
        </>
      )}
    </div>
  );
}

function PhaseFlipViaH() {
  const [errorQubit, setErrorQubit] = useState<number | null>(1);

  const { before, after } = useMemo(() => {
    const encode = createCircuit(3);
    encode.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    encode.ops.push({ type: 'gate', name: 'H', qubits: [1] });
    encode.ops.push({ type: 'gate', name: 'H', qubits: [2] });
    encode.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    encode.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 2] });
    const logical = applyCircuit(zeroState(3), encode);

    let corrupted = logical;
    if (errorQubit !== null) {
      corrupted = fromAmplitudes(
        3,
        applySingleQubitGate(logical.amplitudes, 3, errorQubit, Gates.Z)
      );
    }

    const conj = createCircuit(3);
    conj.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    conj.ops.push({ type: 'gate', name: 'H', qubits: [1] });
    conj.ops.push({ type: 'gate', name: 'H', qubits: [2] });
    const afterH = applyCircuit(corrupted, conj);

    return { before: corrupted, after: afterH };
  }, [errorQubit]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Phase-flip code via H conjugation</h3>
      <p style={{ fontSize: '0.9rem' }}>
        Apply H on each qubit before/after the bit-flip code: a Z error in the original basis
        becomes an X error in the H-rotated basis, detected by the same parity checks.
      </p>
      <label>
        Z error location
        <select
          value={errorQubit ?? 'none'}
          onChange={(e) =>
            setErrorQubit(e.target.value === 'none' ? null : Number(e.target.value))
          }
        >
          <option value="none">No Z error</option>
          <option value={0}>Z on qubit 0</option>
          <option value={1}>Z on qubit 1</option>
          <option value={2}>Z on qubit 2</option>
        </select>
      </label>
      {errorQubit !== null && (
        <>
          <p style={{ fontSize: '0.85rem' }}>
            After H⊗³, the Z error appears as a bit-flip on qubit {errorQubit} in the rotated basis.
          </p>
          <h4>State after Z error (logical |+⟩_L in phase code)</h4>
          <StateVectorTable state={before} />
          <h4>After H⊗³ (X-type error exposed)</h4>
          <StateVectorTable state={after} />
        </>
      )}
    </div>
  );
}

function PhysicalVsLogical() {
  const [physicalErrorRate, setPhysicalErrorRate] = useState(0.01);
  const [codeDistance, setCodeDistance] = useState(3);

  const logicalRate = useMemo(() => {
    const p = physicalErrorRate;
    const t = Math.floor(codeDistance / 2);
    let prob = 0;
    for (let k = t + 1; k <= codeDistance; k++) {
      prob += binom(codeDistance, k) * Math.pow(p, k) * Math.pow(1 - p, codeDistance - k);
    }
    return prob;
  }, [physicalErrorRate, codeDistance]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Physical vs logical error rates (schematic)</h3>
      <label>
        Physical error rate p = {(physicalErrorRate * 100).toFixed(2)}%
        <input
          type="range"
          min={0.001}
          max={0.1}
          step={0.001}
          value={physicalErrorRate}
          onChange={(e) => setPhysicalErrorRate(Number(e.target.value))}
        />
      </label>
      <label>
        Repetition code distance d = {codeDistance}
        <input
          type="range"
          min={3}
          max={9}
          step={2}
          value={codeDistance}
          onChange={(e) => setCodeDistance(Number(e.target.value))}
        />
      </label>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Logical failure probability ≈ {(logicalRate * 100).toFixed(4)}% (more than ⌊d/2⌋ errors)
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        One <em>logical</em> qubit is encoded across many <em>physical</em> qubits. QEC trades
        overhead for exponentially suppressed logical errors when p is below threshold.
      </p>
    </div>
  );
}

function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let num = 1;
  let den = 1;
  for (let i = 0; i < k; i++) {
    num *= n - i;
    den *= i + 1;
  }
  return num / den;
}

export default function ErrorCorrection() {
  const { tag, title, intro } = useChapterMeta('errorCorrection');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        Real quantum hardware is noisy. Gates misfire, qubits decohere, and environment interactions
        leak information. Quantum error correction (QEC) encodes fragile logical information into
        redundant entangled states so that errors can be detected and reversed — without measuring
        the logical qubit directly. This chapter builds from noise models through the simplest codes
        to stabilizer language and the distinction between correction and mitigation.
      </p>

      <LearnSection chapter="errorCorrection" sectionId="5.1"
        prev={{ title: 'Quantum Circuits', path: '/learn/circuits' }}
        next={{ title: '5.2 Bit-flip code', path: `${BASE}#5.2` }}
      
        widgets={<>
          <Katex display>
                    {`E(\\rho) = (1-p)\\,\\rho + p_x X\\rho X + p_y Y\\rho Y + p_z Z\\rho Z + \\cdots`}
                  </Katex>
          <NoiseExplorer />
          <PhysicalVsLogical />
          <PracticeProblem prompt="A physical qubit has error rate p = 0.1 per time step. Why is naive repetition (copying the same classical bit three times) impossible quantum mechanically, and what replaces it?">
                    <p>
                      Unknown qubits cannot be copied. We replace cloning with an entangling encode: |0⟩_L = |000⟩,
                      |1⟩_L = |111⟩ via CNOTs from a single data qubit. Parity checks Z₀Z₁ and Z₁Z₂ detect
                      which bit flipped without measuring the logical value.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  Classical repetition codes copy a bit three times and take a majority vote. Quantum
                  mechanics forbids cloning, so we cannot simply duplicate an unknown qubit state. Instead,
                  QEC spreads one logical qubit across several physical qubits using entanglement, then
                  measures <em>syndrome</em> operators that reveal error types without collapsing the
                  encoded information.
                </p>
        <p>
                  Noise on a qubit is often modeled as a short list of discrete Pauli errors plus continuous
                  decoherence. A <strong>bit-flip</strong> applies X, swapping |0⟩ and |1⟩. A{' '}
                  <strong>phase-flip</strong> applies Z, flipping the sign of |1⟩ while leaving
                  probabilities unchanged. <strong>Decoherence</strong> (T₂ processes) destroys off-diagonal
                  coherences in the density matrix, turning superpositions into classical mixtures.
                  <strong> Gate errors</strong> mean the implemented unitary differs from the intended one —
                  over-rotation, miscalibrated pulses, or crosstalk.
                </p>
        <p>
                  A <strong>physical qubit</strong> is the two-level system you manipulate on chip — subject
                  to all the noise above. A <strong>logical qubit</strong> is an encoded degree of freedom
                  protected by a code; many physical qubits (and ancillas) may represent one logical qubit.
                  The goal is to make logical error rates far smaller than physical rates, enabling long
                  algorithms once physical noise falls below a <em>threshold</em>.
                </p>
      </LearnSection>

      <LearnSection chapter="errorCorrection" sectionId="5.2"
        prev={{ title: '5.1 Why QEC?', path: `${BASE}#5.1` }}
        next={{ title: '5.3 Phase-flip & Shor code', path: `${BASE}#5.3` }}
      
        widgets={<>
          <Katex display>
                    {`|0\\rangle_L = |000\\rangle, \\quad |1\\rangle_L = |111\\rangle`}
                  </Katex>
          <SyndromeTableInteractive />
          <LabLink id="error-correction" title="Error Correction Simulator" />
          <PracticeProblem prompt="You measure syndrome (1, 0) on the bit-flip code. Which correction do you apply, and why does this not reveal whether the logical qubit was |0⟩_L or |1⟩_L?">
                    <p>
                      Syndrome (1, 0) indicates X on qubit 1 — apply X₁. Both |000⟩ and |111⟩ produce the same
                      syndrome under X₁ (|100⟩ and |011⟩ respectively), so the syndrome only identifies the
                      error, not the logical bit value.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  The simplest quantum code protects against a single bit-flip (X) on any of three qubits.
                  Logical zero and one span a two-dimensional subspace of the eight-dimensional Hilbert space
                  of three qubits:
                </p>
        <p>
                  Encoding applies CNOT from qubit 0 to qubits 1 and 2. Any single X error takes the codeword
                  to another state that differs in Z-parity between neighbors. Measuring the stabilizers
                  Z₀Z₁ and Z₁Z₂ (products of Pauli Z on adjacent pairs) yields a two-bit syndrome. The
                  syndrome identifies which qubit flipped; applying X on that qubit restores the codeword.
                </p>
        <p>
                  Crucially, these are <em>commuting</em> measurements on the code space: they do not
                  distinguish |0⟩_L from |1⟩_L, only which error occurred. The interactive table below
                  lets you inject an error and watch the syndrome point to the correction.
                </p>
      </LearnSection>

      <LearnSection chapter="errorCorrection" sectionId="5.3"
        prev={{ title: '5.2 Bit-flip code', path: `${BASE}#5.2` }}
        next={{ title: '5.4 Mitigation vs correction', path: `${BASE}#5.4` }}
      
        widgets={<>
          <Katex display>
                    {`H^{\\otimes 3}\\,\\bigl(\\text{bit-flip code}\\bigr)\\,H^{\\otimes 3} = \\text{phase-flip code}`}
                  </Katex>
          <PhaseFlipViaH />
          <LabLink id="error-correction" title="Error Correction Simulator (Shor-style demos)" />
          <PracticeProblem prompt="Write two stabilizers for the 3-qubit bit-flip code and explain why Z₀Z₁ anticommutes with a logical X̄ = X₀X₁X₂ applied to |1⟩_L but commutes with the code space.">
                    <p>
                      Stabilizers: S₁ = Z₀Z₁, S₂ = Z₁Z₂. For |111⟩, each Z pair gives +1. A logical X̄ flips all
                      bits; S₁ and S₂ still yield +1 on valid codewords. An error X_j anticommutes with one
                      stabilizer, flipping its measurement outcome — that is the syndrome bit.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  The bit-flip code protects against X but not Z: a phase error Z|111⟩ = −|111⟩ leaves
                  bit parities unchanged yet flips the logical sign. The <strong>phase-flip code</strong>{' '}
                  swaps roles: logical states are uniform superpositions |0⟩_L = |+++⟩, |1⟩_L = |−−−⟩ with
                  X-parity checks. Equivalently, conjugate the bit-flip code by H⊗³: Z errors become X
                  errors in the rotated frame.
                </p>
        <p>
                  Neither code alone handles arbitrary single-qubit Pauli errors (X, Y, or Z). Peter Shor
                  combined both ideas into a <strong>9-qubit code</strong>: three blocks of three qubits, each
                  block a bit-flip code, with an outer layer of phase-flip protection across blocks. One
                  logical qubit uses nine physical qubits plus syndrome ancillas in full implementations.
                </p>
      </LearnSection>

      <LearnSection chapter="errorCorrection" sectionId="5.4"
        prev={{ title: '5.3 Phase-flip & Shor', path: `${BASE}#5.3` }}
        next={{ title: 'Entanglement', path: '/learn/entanglement' }}
      
        widgets={<>
          <Katex display>
                    {`\\text{QEC:}\\; |\\psi\\rangle_L \\xrightarrow{\\text{noise}} |\\psi'\\rangle \\xrightarrow{\\text{correct}} |\\psi\\rangle_L \\qquad
                    \\text{Mitigation:}\\; \\langle O \\rangle \\approx f(\\text{noisy samples})`}
                  </Katex>
          <PracticeProblem prompt="Your device has p = 10⁻² gate errors and no full QEC. Should you use mitigation or wait for a fault-tolerant machine to run Shor's algorithm on RSA-2048?">
                    <p>
                      Shor requires millions of high-fidelity gates — far beyond NISQ mitigation. Mitigation
                      might help small variational demos; factoring RSA-2048 needs fault-tolerant QEC below
                      threshold, not post-processing alone.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  <strong>Error correction</strong> actively removes the effect of errors by extracting
                  syndrome information and applying a recovery operation, preserving the logical quantum
                  state (in principle arbitrarily well below threshold). It requires extra qubits, real-time
                  classical processing, and often fast feedback — the full fault-tolerance stack.
                </p>
        <p>
                  <strong>Error mitigation</strong> does not recover the exact pre-error state. Instead it
                  estimates expectation values or outputs by combining many noisy runs: zero-noise
                  extrapolation, probabilistic error cancellation, readout correction, or Clifford data
                  regression. Mitigation is cheaper and works on today&apos;s NISQ devices but does not
                  provide an exponential suppression of logical error with code distance.
                </p>
        <p>
                  Below a <strong>threshold</strong> physical error rate, concatenated or surface codes make
                  logical errors vanish with increasing code size — enabling arbitrarily long computations in
                  principle. Above threshold, correction fails. Mitigation remains useful either way for
                  near-term variational algorithms where full QEC is too costly.
                </p>
      </LearnSection>

      <div className="section-nav">
        <Link to="/learn/circuits">← Quantum Circuits</Link>
        <Link to="/learn/entanglement">Next: Entanglement →</Link>
      </div>
    </article>
  );
}
