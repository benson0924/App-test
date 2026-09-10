import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import Section from '@/components/Section';
import ComplexPlaneLab from '@/components/labs/ComplexPlaneLab';
import QubitStateLab from '@/components/labs/QubitStateLab';
import MeasurementLab from '@/components/labs/MeasurementLab';
import BlochSphereLab from '@/components/labs/BlochSphereLab';
import GateExplorerLab from '@/components/labs/GateExplorerLab';
import {
  C,
  singleQubitState,
  normalize,
  singleQubitMeasurementProbabilities,
  fidelity,
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

export default function OneQubit() {
  const [demoAlpha, setDemoAlpha] = useState(0.6);
  const [demoBeta, setDemoBeta] = useState(0.8);

  const demoState = useMemo(() => {
    const raw = singleQubitState(C.scale(demoAlpha, C.one()), C.scale(demoBeta, C.one()));
    try {
      return normalize(raw);
    } catch {
      return null;
    }
  }, [demoAlpha, demoBeta]);

  const demoProbs = demoState
    ? singleQubitMeasurementProbabilities(demoState.amplitudes[0], demoState.amplitudes[1], 'Z')
    : null;

  const plusState = useMemo(() => normalize(singleQubitState(
    C.scale(1 / Math.sqrt(2), C.one()),
    C.scale(1 / Math.sqrt(2), C.one())
  )), []);

  const phaseShifted = useMemo(() => normalize(singleQubitState(
    C.one(),
    C.i()
  )), []);

  const phaseFidelity = fidelity(plusState, phaseShifted);

  return (
    <article>
      <h1>Chapter 2: One Qubit</h1>
      <p>
        A single qubit is the simplest quantum system—and the foundation for everything that follows.
        In this chapter we build intuition for amplitudes, measurement, alternative bases, phase,
        the Bloch sphere, and the elementary gates that manipulate one qubit.
      </p>

      <Section id="what-is-a-qubit" title="2.1 What Is a Qubit?">
        <p>
          A classical bit is always in one of two definite states: 0 or 1. A <strong>qubit</strong> (quantum bit)
          generalizes this idea. While we still obtain classical outcomes 0 or 1 when we measure, the qubit
          can exist in a <em>superposition</em>—a linear combination of both basis states simultaneously.
        </p>

        <Katex display>{`|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle`}</Katex>

        <p>
          Here |0⟩ and |1⟩ are orthonormal basis vectors, and α and β are complex amplitudes.
          The ket notation |ψ⟩ denotes the state vector living in a two-dimensional complex Hilbert space ℂ².
        </p>

        <WorkedExample
          title="Writing a superposition"
          steps={[
            { label: 'Start with equal weights on |0⟩ and |1⟩.', latex: '|\\psi\\rangle = \\tfrac{1}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle' },
            { label: 'This is the |+⟩ state—a uniform superposition in the computational basis.', latex: '|+\\rangle = H|0\\rangle' },
            { label: 'Measuring in the Z basis gives 0 or 1 each with probability 50%.', latex: 'P(0) = P(1) = \\tfrac{1}{2}' },
          ]}
        />

        <Expandable title="Bit vs qubit — key differences">
          <ul>
            <li>A bit stores exactly one classical value; a qubit stores amplitudes for both outcomes.</li>
            <li>Reading a bit is non-destructive; measuring a qubit generally disturbs the state.</li>
            <li>Two qubits require four complex amplitudes (|00⟩, |01⟩, |10⟩, |11⟩), not two independent bits.</li>
          </ul>
        </Expandable>

        <Checkpoint
          question="How many complex amplitudes describe a single qubit?"
          answer="2"
          hint="Count the basis states |0⟩ and |1⟩."
        />

        <LabLink id="qubit-state" title="Single-Qubit State Explorer" />
      </Section>

      <Section id="complex-amplitudes" title="2.2 Complex Amplitudes">
        <p>
          Amplitudes are complex numbers. Writing z = a + bi (rectangular form) or z = re<sup>iφ</sup> (polar form)
          makes their magnitude and phase explicit. Only the <em>relative</em> phase between α and β affects
          physical predictions—not the overall phase of the state.
        </p>

        <Katex display>{`\\alpha = r_\\alpha e^{i\\phi_\\alpha}, \\quad \\beta = r_\\beta e^{i\\phi_\\beta}`}</Katex>

        <p>
          Normalization requires |α|² + |β|² = 1. Probabilities come from squared magnitudes:
          P(0) = |α|² and P(1) = |β|².
        </p>

        <div className="lab-panel">
          <h3>Quick amplitude demo</h3>
          <label>Real part scale for α: {demoAlpha.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={demoAlpha}
            onChange={(e) => setDemoAlpha(Number(e.target.value))}
          />
          <label>Real part scale for β: {demoBeta.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={demoBeta}
            onChange={(e) => setDemoBeta(Number(e.target.value))}
          />
          {demoState && demoProbs && (
            <p>
              Normalized P(|0⟩) = {(demoProbs['0'] * 100).toFixed(1)}%,
              P(|1⟩) = {(demoProbs['1'] * 100).toFixed(1)}%
            </p>
          )}
        </div>

        <ComplexPlaneLab />
        <LabLink id="complex-plane" title="Complex Number Explorer" />
      </Section>

      <Section id="measurement" title="2.3 Measurement">
        <p>
          Measurement in the computational (Z) basis projects the state onto |0⟩ or |1⟩.
          The Born rule gives outcome probabilities from amplitude magnitudes squared.
          After measurement, the state collapses to the observed outcome.
        </p>

        <Katex display>{`P(0) = |\\langle 0|\\psi\\rangle|^2 = |\\alpha|^2, \\quad P(1) = |\\beta|^2`}</Katex>

        <WorkedExample
          title="Measuring a biased superposition"
          steps={[
            { label: 'Consider |ψ⟩ = 0.8|0⟩ + 0.6|1⟩ (already normalized since 0.64 + 0.36 = 1).', latex: '|\\psi\\rangle = 0.8|0\\rangle + 0.6|1\\rangle' },
            { label: 'Compute P(0).', latex: 'P(0) = 0.8^2 = 0.64' },
            { label: 'If the outcome is 1, the post-measurement state is |1⟩.', latex: '|\\psi\\rangle \\to |1\\rangle' },
          ]}
        />

        <Checkpoint
          question="If |α|² = 0.25, what is P(1)?"
          answer="0.75"
          hint="Probabilities must sum to 1."
        />

        <MeasurementLab />
        <LabLink id="measurement" title="Measurement Simulator" />
      </Section>

      <Section id="other-bases" title="2.4 Other Measurement Bases">
        <p>
          The computational basis {'{|0⟩, |1⟩}'} is not the only choice. The X basis uses
          |+⟩ = (|0⟩ + |1⟩)/√2 and |−⟩ = (|0⟩ − |1⟩)/√2. The Y basis uses |i⟩ and |−i⟩.
          Measuring in a different basis corresponds to first rotating the state, then measuring in Z.
        </p>

        <Katex display>{`|+\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle), \\quad |-\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)`}</Katex>

        <p>
          The Hadamard gate H swaps between Z and X bases: H|0⟩ = |+⟩ and H|1⟩ = |−⟩.
          Use the measurement lab below with the basis selector to compare outcome statistics.
        </p>

        <Expandable title="Why multiple bases matter">
          <p>
            Quantum algorithms exploit interference in carefully chosen bases. Grover's diffusion operator
            reflects about the average; quantum Fourier transforms move between computational and Fourier bases.
            Understanding basis change is essential for reading circuits.
          </p>
        </Expandable>

        <LabLink id="measurement" title="Measurement Simulator (basis selector)" />
      </Section>

      <Section id="global-relative-phase" title="2.5 Global and Relative Phase">
        <p>
          Multiplying an entire state by a complex phase e<sup>iγ</sup> produces a physically equivalent state.
          This <strong>global phase</strong> cannot be observed. What <em>does</em> matter is the
          <strong> relative phase</strong> between |0⟩ and |1⟩ components—it affects interference and
          measurement statistics in non-Z bases.
        </p>

        <Katex display>{`|\\psi\\rangle \\equiv e^{i\\gamma}|\\psi\\rangle \\quad \\text{(same physics)}`}</Katex>
        <Katex display>{`|\\psi_1\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle), \\quad |\\psi_2\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle + i|1\\rangle)`}</Katex>

        <div className="card">
          <p>
            Fidelity between |+⟩ and (|0⟩ + i|1⟩)/√2: <strong>{phaseFidelity.toFixed(4)}</strong>
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Same Z-basis probabilities, different relative phase → different X/Y statistics and Bloch position.
          </p>
        </div>

        <Checkpoint
          question="Does global phase change measurement probabilities in the Z basis?"
          answer="no"
          hint="Probabilities depend on |α|² and |β|², which are unchanged by an overall phase factor."
        />

        <QubitStateLab />
        <LabLink id="qubit-state" title="Single-Qubit State Explorer" />
      </Section>

      <Section id="bloch-sphere" title="2.6 The Bloch Sphere">
        <p>
          Every pure single-qubit state (up to global phase) corresponds to a point on the unit sphere.
          The north pole is |0⟩, the south pole is |1⟩, and equatorial points are equal superpositions
          with different relative phases.
        </p>

        <Katex display>{`|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle`}</Katex>

        <p>
          Bloch coordinates (x, y, z) relate to expectation values of Pauli operators:
          x = ⟨X⟩, y = ⟨Y⟩, z = ⟨Z⟩. Rotations on the sphere are implemented by single-qubit gates.
        </p>

        <WorkedExample
          title="From state to Bloch coordinates"
          steps={[
            { label: 'Take |ψ⟩ = |+⟩ = (|0⟩ + |1⟩)/√2.', latex: '|\\psi\\rangle = |+\\rangle' },
            { label: 'Equal superposition places the vector on the +X axis of the Bloch sphere.', latex: '(x,y,z) = (1,0,0)' },
            { label: 'Measuring X always gives + with probability 1 (after appropriate basis convention).', latex: 'P(+) = 1' },
          ]}
        />

        <BlochSphereLab />
        <LabLink id="bloch-sphere" title="3D Bloch Sphere" />
      </Section>

      <Section id="one-qubit-gates" title="2.7 One-Qubit Gates">
        <p>
          Quantum gates are unitary operations—reversible linear maps that preserve normalization.
          On one qubit, gates are 2×2 unitary matrices acting on the amplitude vector.
        </p>

        <Katex display>{`|\\psi'\\rangle = U|\\psi\\rangle, \\quad U^\\dagger U = I`}</Katex>

        <p>Common single-qubit gates include:</p>
        <ul>
          <li><strong>Pauli X, Y, Z</strong> — bit flip, bit+phase flip, phase flip</li>
          <li><strong>Hadamard H</strong> — creates/removes superposition</li>
          <li><strong>S, T</strong> — π/2 and π/4 phase gates on |1⟩</li>
        </ul>

        <table className="data-table">
          <thead>
            <tr><th>Gate</th><th>Action on |0⟩</th><th>Action on |1⟩</th></tr>
          </thead>
          <tbody>
            <tr><td>X</td><td>|1⟩</td><td>|0⟩</td></tr>
            <tr><td>Z</td><td>|0⟩</td><td>−|1⟩</td></tr>
            <tr><td>H</td><td>|+⟩</td><td>|−⟩</td></tr>
            <tr><td>S</td><td>|0⟩</td><td>i|1⟩</td></tr>
          </tbody>
        </table>

        <Expandable title="Gate matrices (reference)">
          <Katex display>{`X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad
            H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}`}</Katex>
        </Expandable>

        <Checkpoint
          question="What gate takes |0⟩ to |+⟩?"
          answer="hadamard"
          hint="It creates equal superposition."
        />

        <GateExplorerLab />
        <LabLink id="gate-explorer" title="Quantum Gate Explorer" />
      </Section>

      <div className="section-nav">
        <Link to="/learn/classical">← Classical Computing</Link>
        <Link to="/learn/linear-algebra">Linear Algebra →</Link>
      </div>
    </article>
  );
}
