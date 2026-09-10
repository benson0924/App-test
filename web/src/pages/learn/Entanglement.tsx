import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import {
  C,
  BellStates,
  isProductState,
  innerProduct,
  probabilities,
  stateLabel,
  zeroState,
  applyCircuit,
  bellPairCircuit,
  type StateVector,
} from 'quantum-core';
import { StateVectorTable } from '@/components/labs/labUtils';

const BASE = '/learn/entanglement';

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

/** Reduced density matrix ρ_A for qubit A (index 0) of a 2-qubit pure state. */
function partialTraceQubit0(state: StateVector): number[][] {
  const c = state.amplitudes;
  const rho = [
    [C.mag2(c[0]) + C.mag2(c[1]), C.mul(C.conj(c[0]), c[2]).re + C.mul(C.conj(c[1]), c[3]).re],
    [C.mul(C.conj(c[2]), c[0]).re + C.mul(C.conj(c[3]), c[1]).re, C.mag2(c[2]) + C.mag2(c[3])],
  ];
  return rho;
}

function formatRho(rho: number[][]): string {
  return rho
    .map((row) => row.map((v) => (Math.abs(v) < 1e-10 ? '0' : v.toFixed(3))).join(', '))
    .join(' | ');
}

const BELL_DEFS = [
  { key: 'phi+', name: '|Φ⁺⟩', formula: '(|00⟩ + |11⟩)/√2', factory: BellStates.phiPlus },
  { key: 'phi-', name: '|Φ⁻⟩', formula: '(|00⟩ − |11⟩)/√2', factory: BellStates.phiMinus },
  { key: 'psi+', name: '|Ψ⁺⟩', formula: '(|01⟩ + |10⟩)/√2', factory: BellStates.psiPlus },
  { key: 'psi-', name: '|Ψ⁻⟩', formula: '(|01⟩ − |10⟩)/√2', factory: BellStates.psiMinus },
] as const;

function BellStatesExplorer() {
  const [selected, setSelected] = useState<(typeof BELL_DEFS)[number]['key']>('phi+');

  const state = useMemo(() => {
    const def = BELL_DEFS.find((d) => d.key === selected)!;
    return def.factory();
  }, [selected]);

  const product = isProductState(state);
  const probs = probabilities(state);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>The four Bell states</h3>
      <div className="btn-group" style={{ flexWrap: 'wrap' }}>
        {BELL_DEFS.map((d) => (
          <button
            key={d.key}
            type="button"
            className={`btn ${selected === d.key ? 'btn-primary' : ''}`}
            onClick={() => setSelected(d.key)}
          >
            {d.name}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        {BELL_DEFS.find((d) => d.key === selected)!.formula}
      </p>
      <p>
        Product state? <strong>{product ? 'Yes' : 'No'}</strong> — all four Bell states are entangled.
      </p>
      <StateVectorTable state={state} />
      <p style={{ fontSize: '0.85rem' }}>
        Joint probabilities:{' '}
        {probs.map((p, i) => (p > 1e-10 ? `P(|${stateLabel(i, 2)}⟩)=${(p * 100).toFixed(0)}% ` : null))}
      </p>
    </div>
  );
}

function PartialTraceDemo() {
  const [mode, setMode] = useState<'bell' | 'product'>('bell');

  const { state, rhoA, purity } = useMemo(() => {
    const state =
      mode === 'bell'
        ? BellStates.phiPlus()
        : applyCircuit(zeroState(2), bellPairCircuit()); // reuse |Φ+⟩ vs manual product
    const product = fromProduct();
    const s = mode === 'bell' ? state : product;
    const rhoA = partialTraceQubit0(s);
    const purity = rhoA[0][0] * rhoA[0][0] + rhoA[0][1] * rhoA[0][1] + rhoA[1][0] * rhoA[1][0] + rhoA[1][1] * rhoA[1][1];
    return { state: s, rhoA, purity };
  }, [mode]);

  function fromProduct() {
    return {
      n: 2 as const,
      amplitudes: [C.one(), C.zero(), C.zero(), C.zero()] as ReturnType<typeof BellStates.phiPlus>['amplitudes'],
    };
  }

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Reduced state on qubit A (partial trace)</h3>
      <div className="btn-group">
        <button
          type="button"
          className={`btn ${mode === 'bell' ? 'btn-primary' : ''}`}
          onClick={() => setMode('bell')}
        >
          |Φ⁺⟩ (entangled)
        </button>
        <button
          type="button"
          className={`btn ${mode === 'product' ? 'btn-primary' : ''}`}
          onClick={() => setMode('product')}
        >
          |00⟩ (product)
        </button>
      </div>
      <p style={{ fontSize: '0.9rem' }}>
        Tr_B(|ψ⟩⟨ψ|) describes qubit A alone. Entangled states yield mixed reduced states even when the
        joint state is pure.
      </p>
      <Katex display>{`\\rho_A = \\text{Tr}_B(|\\psi\\rangle\\langle\\psi|)`}</Katex>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        ρ_A = [ {formatRho(rhoA)} ] (computational basis)
      </p>
      <p>
        Purity Tr(ρ_A²) ≈ {purity.toFixed(3)} —{' '}
        {purity > 0.99 ? 'pure (product case)' : 'mixed (maximally mixed ≈ 0.5 for Bell)'}
      </p>
      <StateVectorTable state={state} />
    </div>
  );
}

function CorrelationDemo() {
  const [basis, setBasis] = useState<'Z' | 'X'>('Z');

  const note = useMemo(() => {
    if (basis === 'Z') {
      return 'Measure both in Z: outcomes always match (00 or 11) — perfect correlation.';
    }
    return 'Measure both in X: outcomes anti-correlate for |Φ⁺⟩ in matched angles — still non-classical.';
  }, [basis]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Correlation vs causation</h3>
      <div className="btn-group">
        <button
          type="button"
          className={`btn ${basis === 'Z' ? 'btn-primary' : ''}`}
          onClick={() => setBasis('Z')}
        >
          Z basis (computational)
        </button>
        <button
          type="button"
          className={`btn ${basis === 'X' ? 'btn-primary' : ''}`}
          onClick={() => setBasis('X')}
        >
          X basis (Hadamard)
        </button>
      </div>
      <p style={{ fontSize: '0.9rem' }}>{note}</p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Correlation does not imply Alice&apos;s measurement <em>caused</em> Bob&apos;s outcome — no
        signaling. Shared entanglement plus local measurements explain the statistics; CHSH (later)
        quantifies when correlations exceed any local hidden-variable story.
      </p>
    </div>
  );
}

export default function Entanglement() {
  const { tag, title, intro } = useChapterMeta('entanglement');
  const t = useT();
  const phiPsiOverlap = C.mag2(innerProduct(BellStates.phiPlus(), BellStates.psiMinus()));

  return (
    <article>
      <h1>{title}</h1>
      <p>
        When two qubits are entangled, their joint state cannot be factored into individual descriptions.
        Measurements on separated particles show correlations that Einstein, Podolsky, and Rosen found
        puzzling — yet the predictions match experiment. This chapter introduces the EPR question, the
        four Bell states, the difference between correlation and causation, and reduced states via the
        partial trace.
      </p>

      <LearnSection chapter="entanglement" sectionId="7.1"
        prev={{ title: 'Error Correction', path: '/learn/error-correction' }}
        next={{ title: '7.2 Bell states', path: `${BASE}#7.2` }}
      >
        <p>
          In 1935, Einstein, Podolsky, and Rosen argued that if quantum mechanics is complete, measuring
          one particle of an entangled pair seems to instantaneously fix the other&apos;s properties —
          uncomfortable with relativity. Their thought experiment used entangled position/momentum; modern
          presentations use spin or polarization qubits.
        </p>

        <p>
          A <strong>local hidden variable</strong> (LHV) model assumes each particle carries pre-set
          values determined at creation, and measurements merely reveal them without faster-than-light
          influence. Bell and others showed that certain correlation <em>inequalities</em> (CHSH) cap
          what any LHV model can produce — quantum mechanics exceeds that cap.
        </p>

        <Katex display>
          {`|\\Psi^-\\rangle = \\tfrac{|01\\rangle - |10\\rangle}{\\sqrt{2}} \\quad \\text{(singlet)}`}
        </Katex>

        <p>
          We do not need metaphysics to use entanglement: it is a resource for protocols (teleportation,
          superdense coding, error correction). The EPR debate sharpened the question — are correlations
          classical-like with hidden instructions, or genuinely quantum? Experiments favor quantum
          mechanics, while no-signaling ensures relativity is respected.
        </p>

        <WorkedExample
          title="EPR-style correlation sketch"
          steps={[
            {
              label: 'Alice and Bob share |Ψ⁻⟩.',
              latex: '|\\Psi^-\\rangle',
            },
            {
              label: 'Both measure Z: always opposite bits (01 or 10).',
              latex: 'P(01) + P(10) = 1',
            },
            {
              label: 'LHV story: each particle had a hidden z ∈ {+1,−1} fixed at source.',
            },
            {
              label: 'Bell/CHSH: some angle choices force LHV correlations ≤ 2; quantum hits 2√2.',
              latex: 'S_{\\text{QM}} \\leq 2\\sqrt{2}',
            },
          ]}
        />


        <Checkpoint
          question="Can entanglement alone send a message faster than light?"
          answer="no"
          hint="Marginal outcomes at Bob do not depend on Alice's setting."
        />

        <LabLink id="chsh" title="Bell/CHSH Experiment lab" />

        <PracticeProblem prompt="In one sentence, what question do local hidden variables try to answer about Bell correlations?">
          <p>
            Whether pre-shared classical random variables at the source can reproduce all quantum
            correlation statistics without nonlocal influence.
          </p>
        </PracticeProblem>
      </LearnSection>

      <LearnSection chapter="entanglement" sectionId="7.2"
        prev={{ title: '7.1 EPR & LHV', path: `${BASE}#7.1` }}
        next={{ title: '7.3 Correlation vs causation', path: `${BASE}#7.3` }}
      >
        <p>
          The Bell basis is a complete orthonormal set of maximally entangled two-qubit states. Any
          two-qubit pure state can be expressed in this basis, but the four Bell states are the
          building blocks for entanglement swapping, superdense coding, and many algorithms.
        </p>

        <Katex display>
          {`|\\Phi^\\pm\\rangle = \\tfrac{|00\\rangle \\pm |11\\rangle}{\\sqrt{2}}, \\quad
          |\\Psi^\\pm\\rangle = \\tfrac{|01\\rangle \\pm |10\\rangle}{\\sqrt{2}}`}
        </Katex>

        <p>
          |Φ⁺⟩ is prepared by H then CNOT on |00⟩. Applying Z on one qubit turns |Φ⁺⟩ into |Φ⁻⟩;
          X on one qubit gives |Ψ⁺⟩; both gives |Ψ⁻⟩. They are mutually orthogonal — numerically
          {' |⟨Φ⁺|Ψ⁻⟩|² = '}{phiPsiOverlap.toFixed(4)} (zero overlap confirms orthogonality).
        </p>

        <BellStatesExplorer />

        <WorkedExample
          title="Create |Φ⁺⟩ and relate to |Φ⁻⟩"
          steps={[
            { label: 'H₀ on |00⟩.', latex: '\\tfrac{|00\\rangle+|10\\rangle}{\\sqrt{2}}' },
            { label: 'CNOT₀₁ → |Φ⁺⟩.', latex: '|\\Phi^+\\rangle' },
            { label: 'Apply Z on qubit 1.', latex: 'Z_1|\\Phi^+\\rangle = |\\Phi^-\\rangle' },
            { label: 'Apply X on qubit 1 instead.', latex: 'X_1|\\Phi^+\\rangle = |\\Psi^+\\rangle' },
          ]}
        />

        <Checkpoint
          question="Is |Φ⁺⟩ a product state?"
          answer="no"
          hint="Try writing α|0⟩+β|1⟩ on each qubit separately."
        />

        <LabLink id="bell-states" title="Bell State Generator" />

        <PracticeProblem prompt="How many Bell states span the subspace of states with equal amplitude on |00⟩ and |11⟩ only?">
          <p>
            Two: |Φ⁺⟩ and |Φ⁻⟩ differ by relative sign between |00⟩ and |11⟩. The |Ψ±⟩ pair spans
            the odd-parity subspace (|01⟩ and |10⟩) instead.
          </p>
        </PracticeProblem>
      </LearnSection>

      <LearnSection chapter="entanglement" sectionId="7.3"
        prev={{ title: '7.2 Bell states', path: `${BASE}#7.2` }}
        next={{ title: '7.4 Partial trace', path: `${BASE}#7.4` }}
      >
        <p>
          Strong correlations between distant measurements do not mean one event <em>caused</em> the
          other in the classical sense. With entanglement, neither outcome exists as a definite classical
          value before measurement in the standard quantum formalism — yet joint statistics are rigidly
          correlated when bases match.
        </p>

        <p>
          If Alice measures before Bob or Bob before Alice, the predicted <em>joint</em> distribution
          is the same (for the same observables). Relativistic quantum field theory formalizes this
          with no-signaling: Alice cannot encode a message in her choice of measurement basis because
          Bob&apos;s marginal statistics are unchanged.
        </p>

        <Katex display>
          {`P(b \\mid a, \\text{settings}) \\neq P(b \\mid \\text{settings}) \\text{ in general (correlation)}`}
        </Katex>

        <Katex display>
          {`\\rho_B = \\text{Tr}_A(\\rho_{AB}) \\text{ independent of Alice's later measurement choice}`}
        </Katex>

        <CorrelationDemo />

        <WorkedExample
          title="|Φ⁺⟩ in Z basis"
          steps={[
            { label: 'Joint state has only |00⟩ and |11⟩.', latex: 'c_{01}=c_{10}=0' },
            { label: 'Alice measures Z → 0 or 1 with 50% each.', latex: 'P(A=0)=P(A=1)=\\tfrac{1}{2}' },
            { label: 'Given A=0, Bob’s qubit is |0⟩; given A=1, Bob’s is |1⟩.', latex: '\\text{perfect correlation}' },
            { label: 'Bob’s marginal alone is still 50/50 — correlation without controllable signal.', latex: 'P(B=0)=\\tfrac{1}{2}' },
          ]}
        />


        <Checkpoint
          question="Can Alice send a message by choosing her measurement angle alone?"
          answer="no"
        />

        <PracticeProblem prompt="Alice and Bob share |Φ⁺⟩. Alice measures Z and gets 0. What is Bob's state before he measures, and does Alice's choice of X vs Z basis change Bob's marginal if Bob always measures Z?">
          <p>
            Conditional on Alice's 0, Bob is in |0⟩ (collapses joint state). If Alice measures in X
            instead, Bob's Z marginal remains 50/50 — Alice's basis choice changes correlations, not
            Bob's Z-only marginal statistics before he measures.
          </p>
        </PracticeProblem>
      </LearnSection>

      <LearnSection chapter="entanglement" sectionId="7.4"
        prev={{ title: '7.3 Correlation vs causation', path: `${BASE}#7.3` }}
        next={{ title: 'Quantum Protocols', path: '/learn/protocols' }}
      >
        <p>
          Describing one subsystem of an entangled pair requires tracing out the other. For pure joint
          state |ψ⟩<sub>AB</sub>, the reduced density matrix on A is ρ_A = Tr_B(|ψ⟩⟨ψ|). If ρ_A is not a
          pure state projector, subsystem A is entangled with B — even though A alone may look
          completely random when measured.
        </p>

        <Katex display>
          {`\\rho_A = \\sum_b \\langle b| \\psi\\rangle\\langle\\psi| b\\rangle \\quad \\text{(partial trace over B)}`}
        </Katex>

        <p>
          For |Φ⁺⟩, ρ_A = I/2 — maximally mixed. Alice’s Z outcomes are 50/50, yet the joint state is
          pure. This is the hallmark of entanglement: ignorance locally, information globally. For a
          product state |00⟩, ρ_A = |0⟩⟨0| — pure and uncorrelated.
        </p>

        <PartialTraceDemo />

        <WorkedExample
          title="Partial trace of |Φ⁺⟩"
          steps={[
            { label: 'Amplitudes c₀₀ = c₁₁ = 1/√2.', latex: '|\\Phi^+\\rangle' },
            {
              label: 'ρ_A = Tr_B: sum over B index of |ψ⟩⟨ψ| blocks.',
              latex: '\\rho_A = \\tfrac{1}{2}(|0\\rangle\\langle 0| + |1\\rangle\\langle 1|)',
            },
            { label: 'Purity Tr(ρ_A²) = 1/2 < 1 → mixed reduced state.', latex: '\\text{Tr}(\\rho_A^2) = \\tfrac{1}{2}' },
            { label: 'Entanglement entropy S(ρ_A) = ln 2 for this maximally entangled pair.', latex: 'S = 1\\text{ bit}' },
          ]}
        />


        <Checkpoint
          question="For |Φ⁺⟩, is the reduced state on one qubit pure or mixed?"
          answer="mixed"
          hint="Tr(ρ_A²) = 1/2."
        />

        <LabLink id="entanglement" title="Entanglement Measurement lab" />

        <PracticeProblem prompt="Compute ρ_A for |00⟩ and compare purity to |Φ⁺⟩.">
          <p>
            |00⟩ is product: ρ_A = |0⟩⟨0|, purity 1. |Φ⁺⟩ gives ρ_A = I/2, purity 1/2. Entanglement
            shows up as mixed marginals despite a pure joint state.
          </p>
        </PracticeProblem>
      </LearnSection>

      <div className="section-nav">
        <Link to="/learn/error-correction">← Error Correction</Link>
        <Link to="/learn/protocols">Next: Quantum Protocols →</Link>
      </div>
    </article>
  );
}
