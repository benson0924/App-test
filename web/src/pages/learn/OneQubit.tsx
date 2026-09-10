import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import Section from '@/components/Section';
import { LabLink, MisconceptionAlert, PracticeBlock } from '@/components/ChapterHelpers';
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
  blochCoordinates,
  fromBloch,
  type MeasurementBasis,
} from 'quantum-core';


function BasisProbabilityPanel() {
  const [alphaRe, setAlphaRe] = useState(0.6);
  const [betaRe, setBetaRe] = useState(0.4);
  const [betaIm, setBetaIm] = useState(0);
  const [basis, setBasis] = useState<MeasurementBasis>('Z');

  const state = useMemo(() => {
    try {
      return normalize(singleQubitState(
        C.scale(alphaRe, C.one()),
        { re: betaRe, im: betaIm }
      ));
    } catch {
      return null;
    }
  }, [alphaRe, betaRe, betaIm]);

  const probs = state
    ? singleQubitMeasurementProbabilities(state.amplitudes[0], state.amplitudes[1], basis)
    : null;

  return (
    <div className="lab-panel">
      <h3>Basis probability calculator</h3>
      <div className="grid-2">
        <div>
          <label>Re(α): {alphaRe.toFixed(2)}</label>
          <input type="range" min={0} max={1} step={0.01} value={alphaRe} onChange={(e) => setAlphaRe(Number(e.target.value))} />
          <label>Re(β): {betaRe.toFixed(2)}</label>
          <input type="range" min={-1} max={1} step={0.01} value={betaRe} onChange={(e) => setBetaRe(Number(e.target.value))} />
          <label>Im(β): {betaIm.toFixed(2)}</label>
          <input type="range" min={-1} max={1} step={0.01} value={betaIm} onChange={(e) => setBetaIm(Number(e.target.value))} />
        </div>
        <div>
          <label>Measurement basis</label>
          <div className="btn-group">
            {(['Z', 'X', 'Y'] as const).map((b) => (
              <button key={b} className={`btn ${basis === b ? 'btn-primary' : ''}`} onClick={() => setBasis(b)}>{b}</button>
            ))}
          </div>
          {state && probs && (
            <table className="data-table" style={{ marginTop: '0.75rem' }}>
              <thead><tr><th>Outcome</th><th>Probability</th></tr></thead>
              <tbody>
                {Object.entries(probs).map(([k, p]) => (
                  <tr key={k}><td>|{k}⟩</td><td>{(p * 100).toFixed(1)}%</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {state && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          |ψ⟩ = {C.toString(state.amplitudes[0])}|0⟩ + {C.toString(state.amplitudes[1])}|1⟩
        </p>
      )}
    </div>
  );
}

function RelativePhaseDemo() {
  const [phi, setPhi] = useState(0);
  const plus = useMemo(() => normalize(singleQubitState(
    C.scale(1 / Math.sqrt(2), C.one()),
    C.scale(1 / Math.sqrt(2), C.one())
  )), []);
  const shifted = useMemo(() => normalize(singleQubitState(
    C.scale(1 / Math.sqrt(2), C.one()),
    C.scale(1 / Math.sqrt(2), C.exp(phi))
  )), [phi]);

  const zPlus = singleQubitMeasurementProbabilities(plus.amplitudes[0], plus.amplitudes[1], 'Z');
  const zShift = singleQubitMeasurementProbabilities(shifted.amplitudes[0], shifted.amplitudes[1], 'Z');
  const xPlus = singleQubitMeasurementProbabilities(plus.amplitudes[0], plus.amplitudes[1], 'X');
  const xShift = singleQubitMeasurementProbabilities(shifted.amplitudes[0], shifted.amplitudes[1], 'X');
  const blochPlus = blochCoordinates(plus);
  const blochShift = blochCoordinates(shifted);

  return (
    <div className="lab-panel">
      <h3>Relative phase slider</h3>
      <label>φ (radians): {phi.toFixed(2)}</label>
      <input type="range" min={0} max={2 * Math.PI} step={0.05} value={phi} onChange={(e) => setPhi(Number(e.target.value))} />
      <p>|ψ⟩ = (|0⟩ + e<sup>iφ</sup>|1⟩)/√2</p>
      <div className="grid-2">
        <div>
          <strong>Z basis</strong>
          <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>
            P(0): {(zPlus['0'] * 100).toFixed(0)}% vs {(zShift['0'] * 100).toFixed(0)}% — unchanged
          </p>
        </div>
        <div>
          <strong>X basis</strong>
          <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>
            P(+): {(xPlus['+'] * 100).toFixed(0)}% vs {(xShift['+'] * 100).toFixed(0)}% — changes with φ
          </p>
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>
        Bloch y: {blochPlus.y.toFixed(2)} → {blochShift.y.toFixed(2)} as φ varies
      </p>
    </div>
  );
}

export default function OneQubit() {
  return (
    <article>
      <h1>Chapter 2: The Qubit</h1>
      <p>
        A qubit is the fundamental unit of quantum information. Unlike a classical bit, it is described
        by complex amplitudes that can interfere. This chapter develops the language of superposition,
        measurement, alternative bases, phase, the Bloch sphere, and elementary gates — everything you
        need before combining qubits into larger systems.
      </p>

      <MisconceptionAlert
        myth="A qubit is simply both 0 and 1 at the same time."
        correction="A qubit is a normalized vector in ℂ². Measurement returns one classical outcome with probabilities |α|² and |β|². The amplitudes encode phase information that affects interference and non-Z measurements."
      />

      <Section id="what-is-a-qubit" title="2.1 What Is a Qubit?">
        <p>
          A classical bit lives in the set {'{0, 1}'}. A <strong>qubit</strong> lives in a two-dimensional
          complex vector space with orthonormal basis |0⟩ and |1⟩. The general pure state is a
          superposition:
        </p>

        <Katex display>{`|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\quad \\alpha,\\beta \\in \\mathbb{C}`}</Katex>
        <Katex display>{`|\\alpha|^2 + |\\beta|^2 = 1`}</Katex>

        <p>
          Normalization ensures total measurement probability equals 1. The global phase e<sup>iγ</sup>|ψ⟩
          is unobservable, but the relative phase between α and β is physically meaningful in non-Z bases.
        </p>

        <WorkedExample
          title="Equal superposition |+⟩"
          steps={[
            { label: 'Choose α = β = 1/√2.', latex: '|\\psi\\rangle = \\tfrac{1}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle' },
            { label: 'Check normalization: 1/2 + 1/2 = 1.', latex: '|\\alpha|^2 + |\\beta|^2 = 1' },
            { label: 'This state is H|0⟩ = |+⟩.', latex: '|+\\rangle = H|0\\rangle' },
            { label: 'Z measurement: P(0) = P(1) = 1/2.', latex: 'P(0) = P(1) = \\tfrac{1}{2}' },
          ]}
        />

        <Expandable title="Why two complex numbers?">
          <p>
            Two real numbers would not suffice: quantum mechanics requires complex Hilbert spaces so that
            unitary evolution can implement rotations and interference. The Born rule uses |α|², but
            gates combine amplitudes with complex phases before squaring.
          </p>
        </Expandable>

        <Checkpoint question="How many real parameters describe a pure qubit, ignoring global phase?" answer="2" hint="Think Bloch sphere angles θ and φ." />
        <LabLink id="qubit-state" title="Single-Qubit State Explorer" />
      </Section>

      <Section id="complex-amplitudes" title="2.2 Complex Amplitudes">
        <p>
          Write z = a + bi with conjugate z* = a − bi, magnitude |z| = √(a² + b²), and polar form
          z = re<sup>iφ</sup>. Euler's identity e<sup>iφ</sup> = cos φ + i sin φ connects rotation to phase.
        </p>

        <Katex display>{`|z|^2 = z^* z = a^2 + b^2`}</Katex>
        <Katex display>{`z = r e^{i\\phi}`}</Katex>

        <WorkedExample
          title="Amplitude (2 + i)/√13"
          steps={[
            { label: 'Identify a = 2/√13, b = 1/√13.', latex: 'z = \\tfrac{2}{\\sqrt{13}} + \\tfrac{i}{\\sqrt{13}}' },
            { label: 'Magnitude squared: |z|² = 4/13 + 1/13 = 5/13... wait, check: (4+1)/13 = 5/13 for single amplitude.' },
            { label: 'For a full state, both |α|² and |β|² must sum to 1.', latex: '|\\alpha|^2 + |\\beta|^2 = 1' },
          ]}
        />

        <ComplexPlaneLab />
        <LabLink id="complex-plane" title="Complex Number Explorer" />
      </Section>

      <Section id="measurement" title="2.3 Measurement">
        <p>
          Measuring in the Z basis yields outcome 0 with probability P(0) = |α|² and outcome 1 with
          P(1) = |β|². After observing 0, the state collapses to |0⟩; after 1, to |1⟩. This is the
          Born rule for projective measurement.
        </p>

        <Katex display>{`P(0) = |\\langle 0|\\psi\\rangle|^2 = |\\alpha|^2, \\quad P(1) = |\\beta|^2`}</Katex>

        <WorkedExample
          title="State ( √3/2 |0⟩ + 1/2 |1⟩ )"
          steps={[
            { label: 'Identify α = √3/2, β = 1/2.', latex: '|\\psi\\rangle = \\tfrac{\\sqrt{3}}{2}|0\\rangle + \\tfrac{1}{2}|1\\rangle' },
            { label: 'P(0) = (√3/2)² = 3/4.', latex: 'P(0) = \\tfrac{3}{4}' },
            { label: 'P(1) = (1/2)² = 1/4.', latex: 'P(1) = \\tfrac{1}{4}' },
            { label: 'Check: 3/4 + 1/4 = 1.', latex: 'P(0)+P(1)=1' },
          ]}
        />

        <Expandable title="Full projection calculation for P(0)">
          <Katex display>{`\\langle 0|\\psi\\rangle = \\alpha, \\quad P(0) = |\\alpha|^2`}</Katex>
          <p>Similarly ⟨1|ψ⟩ = β. The projector |0⟩⟨0| gives P(0) = ⟨ψ|0⟩⟨0|ψ⟩ = |α|².</p>
        </Expandable>

        <Checkpoint question="After measuring |ψ⟩ and obtaining 1, what is the post-measurement state?" answer="|1⟩" />
        <MeasurementLab />
        <LabLink id="measurement" title="Measurement Simulator" />
      </Section>

      <Section id="other-bases" title="2.4 Other Measurement Bases">
        <p>
          The X basis uses |+⟩ = (|0⟩ + |1⟩)/√2 and |−⟩ = (|0⟩ − |1⟩)/√2. The Y basis uses
          |i⟩ = (|0⟩ + i|1⟩)/√2 and |−i⟩ = (|0⟩ − i|1⟩)/√2. Rewrite any state in the chosen basis
          and square coefficient magnitudes for probabilities.
        </p>

        <Katex display>{`|0\\rangle = \\tfrac{|+\\rangle + |-\\rangle}{\\sqrt{2}}, \\quad |1\\rangle = \\tfrac{|+\\rangle - |-\\rangle}{\\sqrt{2}}`}</Katex>
        <Katex display>{`P(+) = \\left|\\tfrac{\\alpha + \\beta}{\\sqrt{2}}\\right|^2, \\quad P(-) = \\left|\\tfrac{\\alpha - \\beta}{\\sqrt{2}}\\right|^2`}</Katex>

        <WorkedExample
          title="Measuring |−⟩ in the X basis"
          steps={[
            { label: '|−⟩ is already an X-basis eigenstate.', latex: '|\\psi\\rangle = |-\\rangle' },
            { label: 'Therefore P(−) = 1 with certainty.', latex: 'P(-) = 1' },
            { label: 'In Z basis, P(0) = P(1) = 1/2 — same as |+⟩.', latex: 'P(0) = P(1) = \\tfrac{1}{2}' },
          ]}
        />

        <BasisProbabilityPanel />
        <LabLink id="measurement" title="Measurement Simulator (basis selector)" />
      </Section>

      <Section id="global-relative-phase" title="2.5 Global and Relative Phase">
        <p>
          Multiplying |ψ⟩ by e<sup>iγ</sup> does not change any measurement probability in any basis.
          Relative phase between |0⟩ and |1⟩ components <em>does</em> matter: |+⟩ and (|0⟩ + i|1⟩)/√2
          share Z statistics but differ in X and Y statistics and on the Bloch sphere.
        </p>

        <Katex display>{`|\\psi\\rangle \\sim e^{i\\gamma}|\\psi\\rangle`}</Katex>

        <RelativePhaseDemo />

        <Checkpoint question="Do |+⟩ and |−⟩ have the same Z-basis probabilities?" answer="yes" hint="Both are uniform superpositions with equal magnitude." />
        <QubitStateLab />
        <LabLink id="qubit-state" title="Single-Qubit State Explorer" />
      </Section>

      <Section id="bloch-sphere" title="2.6 The Bloch Sphere">
        <p>
          Every pure qubit (up to global phase) maps to a point on the unit sphere with
          θ ∈ [0, π] and φ ∈ [0, 2π):
        </p>

        <Katex display>{`|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle`}</Katex>
        <Katex display>{`x = \\sin\\theta\\cos\\phi, \\quad y = \\sin\\theta\\sin\\phi, \\quad z = \\cos\\theta`}</Katex>

        <table className="data-table">
          <thead><tr><th>State</th><th>Bloch (x, y, z)</th></tr></thead>
          <tbody>
            <tr><td>|0⟩</td><td>(0, 0, 1)</td></tr>
            <tr><td>|1⟩</td><td>(0, 0, −1)</td></tr>
            <tr><td>|+⟩</td><td>(1, 0, 0)</td></tr>
            <tr><td>|−⟩</td><td>(−1, 0, 0)</td></tr>
            <tr><td>|i⟩</td><td>(0, 1, 0)</td></tr>
            <tr><td>|−i⟩</td><td>(0, −1, 0)</td></tr>
          </tbody>
        </table>

        <WorkedExample
          title="|0⟩ on the Bloch sphere"
          steps={[
            { label: 'θ = 0 ⇒ cos(θ/2) = 1, sin(θ/2) = 0.', latex: '|\\psi\\rangle = |0\\rangle' },
            { label: 'Coordinates: x = y = 0, z = 1 (north pole).', latex: '(x,y,z)=(0,0,1)' },
          ]}
        />

        <BlochSphereLab />
        <LabLink id="bloch-sphere" title="3D Bloch Sphere" />
      </Section>

      <Section id="one-qubit-gates" title="2.7 One-Qubit Gates">
        <p>
          Gates are 2×2 unitary matrices. Pauli X flips |0⟩ ↔ |1⟩; Z adds a phase to |1⟩; H creates
          superposition. Important identities: X² = Y² = Z² = H² = I, S² = Z, T² = S.
        </p>

        <Katex display>{`X|0\\rangle = |1\\rangle, \\quad H|0\\rangle = |+\\rangle, \\quad Z|1\\rangle = -|1\\rangle`}</Katex>
        <Katex display>{`X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}`}</Katex>

        <Expandable title="Geometric action on the Bloch sphere">
          <ul>
            <li>X, Y, Z are 180° rotations about their respective axes.</li>
            <li>H maps Z-axis to X-axis (and back, since H² = I).</li>
            <li>S is 90° rotation about Z; T is 45° about Z.</li>
          </ul>
        </Expandable>

        <Checkpoint question="What is H|+⟩?" answer="|0⟩" hint="H is its own inverse: H² = I." />
        <GateExplorerLab />
        <LabLink id="gate-explorer" title="Quantum Gate Explorer" />
      </Section>

      <PracticeBlock problems={[
        { q: 'Normalize (2|0⟩ + 3i|1⟩) and find P(0) in the Z basis.', a: 'Norm is √13. P(0) = 4/13.' },
        { q: 'For |ψ⟩ = (|0⟩ − |1⟩)/√2, what is P(−) in the X basis?', a: 'The state is |−⟩, so P(−) = 1.' },
        { q: 'Apply X then H to |0⟩. What is the result?', a: 'X|0⟩ = |1⟩, H|1⟩ = |−⟩.' },
        { q: 'What Bloch coordinates does |i⟩ have?', a: '(0, 1, 0) on the equator at +Y.' },
      ]} />

      <div className="section-nav">
        <Link to="/learn/classical">← Classical Computing</Link>
        <Link to="/learn/linear-algebra">Linear Algebra →</Link>
      </div>
    </article>
  );
}
