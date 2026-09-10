import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import {
  C,
  Gates,
  zeroState,
  applyCircuit,
  bellPairCircuit,
  createCircuit,
  circuitDepth,
  probabilities,
  stateLabel,
  BellStates,
  getSingleQubitGate,
  applySingleQubitGate,
  fromAmplitudes,
} from 'quantum-core';
import { StateVectorTable, AmplitudeBars } from '@/components/labs/labUtils';

const BASE = '/learn/circuits';

const SINGLE_GATES = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'] as const;
const PARAM_GATES = ['Rx', 'Ry', 'Rz'] as const;
const TWO_QUBIT = ['CNOT', 'CZ', 'SWAP'] as const;

function LabLink({ path, title }: { path: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={path} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        {title} →
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

function BellStepWalkthrough() {
  const [step, setStep] = useState(0);

  const steps = useMemo(() => {
    const s0 = zeroState(2);
    const afterH = fromAmplitudes(2, applySingleQubitGate(s0.amplitudes, 2, 0, Gates.H));
    const afterCNOT = applyCircuit(s0, bellPairCircuit());
    return [
      { label: 'Initial |00⟩', state: s0, gate: '—' },
      { label: 'H on qubit 0', state: afterH, gate: 'H₀' },
      { label: 'CNOT₀₁', state: afterCNOT, gate: 'CNOT₀₁' },
    ];
  }, []);

  const current = steps[step];

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Bell pair — step mode</h3>
      <p style={{ fontSize: '0.9rem' }}>
        Circuit: H on qubit 0, then CNOT with control 0 and target 1. Step through to build |Φ⁺⟩.
      </p>
      <div className="btn-group">
        <button type="button" className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}>
          ← Prev
        </button>
        <span style={{ alignSelf: 'center', fontFamily: 'var(--font-mono)' }}>
          Step {step + 1}/{steps.length}: {current.gate}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next →
        </button>
      </div>
      <p><strong>{current.label}</strong></p>
      <AmplitudeBars state={current.state} />
      <StateVectorTable state={current.state} />
    </div>
  );
}

function GateSetExplorer() {
  const [gate, setGate] = useState<string>('H');
  const [theta, setTheta] = useState(Math.PI / 2);
  const [input, setInput] = useState<'0' | '1' | '+'>('0');

  const result = useMemo(() => {
    const init =
      input === '0'
        ? zeroState(1)
        : input === '1'
          ? fromAmplitudes(1, [C.zero(), C.one()])
          : fromAmplitudes(1, [
              C.scale(1 / Math.sqrt(2), C.one()),
              C.scale(1 / Math.sqrt(2), C.one()),
            ]);

    if (gate === 'CNOT' || gate === 'CZ' || gate === 'SWAP' || gate === 'Toffoli') {
      const c = createCircuit(gate === 'Toffoli' ? 3 : 2);
      if (gate === 'Toffoli') {
        c.ops.push({ type: 'gate', name: 'Toffoli', qubits: [0, 1, 2] });
        let s = zeroState(3);
        s = fromAmplitudes(3, applySingleQubitGate(s.amplitudes, 3, 0, Gates.X));
        s = fromAmplitudes(3, applySingleQubitGate(s.amplitudes, 3, 1, Gates.X));
        return { state: applyCircuit(s, c), n: 3, note: '|110⟩ → |111⟩ (target flip when both controls 1)' };
      }
      c.ops.push({ type: 'gate', name: gate, qubits: [0, 1] });
      let s = zeroState(2);
      if (gate === 'CNOT') s = fromAmplitudes(2, applySingleQubitGate(s.amplitudes, 2, 0, Gates.X));
      return {
        state: applyCircuit(s, c),
        n: 2,
        note: gate === 'CNOT' ? '|10⟩ → |11⟩' : gate === 'CZ' ? 'Adds −1 phase on |11⟩' : 'SWAP exchanges qubits',
      };
    }

    const g = getSingleQubitGate(gate, theta);
    const out = fromAmplitudes(1, applySingleQubitGate(init.amplitudes, 1, 0, g));
    return { state: out, n: 1, note: `${gate} on |${input}⟩` };
  }, [gate, theta, input]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Gate set explorer</h3>
      <div className="btn-group" style={{ flexWrap: 'wrap' }}>
        {SINGLE_GATES.map((g) => (
          <button
            key={g}
            type="button"
            className={`btn ${gate === g ? 'btn-primary' : ''}`}
            onClick={() => setGate(g)}
          >
            {g}
          </button>
        ))}
        {PARAM_GATES.map((g) => (
          <button
            key={g}
            type="button"
            className={`btn ${gate === g ? 'btn-primary' : ''}`}
            onClick={() => setGate(g)}
          >
            {g}(θ)
          </button>
        ))}
        {TWO_QUBIT.map((g) => (
          <button
            key={g}
            type="button"
            className={`btn ${gate === g ? 'btn-primary' : ''}`}
            onClick={() => setGate(g)}
          >
            {g}
          </button>
        ))}
        <button
          type="button"
          className={`btn ${gate === 'Toffoli' ? 'btn-primary' : ''}`}
          onClick={() => setGate('Toffoli')}
        >
          Toffoli
        </button>
      </div>
      {PARAM_GATES.includes(gate as (typeof PARAM_GATES)[number]) && (
        <label>
          θ = {theta.toFixed(2)} rad
          <input
            type="range"
            min={0}
            max={Math.PI * 2}
            step={0.05}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
          />
        </label>
      )}
      {result.n === 1 && (
        <div className="btn-group">
          {(['0', '1', '+'] as const).map((inp) => (
            <button
              key={inp}
              type="button"
              className={`btn ${input === inp ? 'btn-primary' : ''}`}
              onClick={() => setInput(inp)}
            >
              |{inp}⟩
            </button>
          ))}
        </div>
      )}
      <p style={{ fontSize: '0.85rem' }}>{result.note}</p>
      <StateVectorTable state={result.state} />
    </div>
  );
}

function StateReadoutPanel() {
  const [which, setWhich] = useState<'phi+' | 'uniform'>('phi+');

  const state = useMemo(() => {
    if (which === 'phi+') return BellStates.phiPlus();
    return normalizeUniform(4);
  }, [which]);

  const probs = probabilities(state);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>State vector &amp; probability readout</h3>
      <div className="btn-group">
        <button
          type="button"
          className={`btn ${which === 'phi+' ? 'btn-primary' : ''}`}
          onClick={() => setWhich('phi+')}
        >
          |Φ⁺⟩ (2 qubits)
        </button>
        <button
          type="button"
          className={`btn ${which === 'uniform' ? 'btn-primary' : ''}`}
          onClick={() => setWhich('uniform')}
        >
          Uniform (2 qubits)
        </button>
      </div>
      <p style={{ fontSize: '0.9rem' }}>
        Born rule: P(x) = |⟨x|ψ⟩|². Only {state.n}-bit strings with non-zero amplitude appear below.
      </p>
      <StateVectorTable state={state} />
      <div style={{ marginTop: '0.75rem' }}>
        {probs.map((p, i) =>
          p > 1e-10 ? (
            <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              P(|{stateLabel(i, state.n)}⟩) = {(p * 100).toFixed(2)}%
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function normalizeUniform(n: number) {
  const dim = 1 << n;
  const amp = C.scale(1 / Math.sqrt(dim), C.one());
  return fromAmplitudes(n, Array.from({ length: dim }, () => amp));
}

function CircuitMetricsDemo() {
  const [extraH, setExtraH] = useState(0);

  const { circuit, depth, gateCount } = useMemo(() => {
    const c = bellPairCircuit();
    for (let i = 0; i < extraH; i++) {
      c.ops.push({ type: 'gate', name: 'H', qubits: [1] });
    }
    const gateCount = c.ops.filter((o) => o.type === 'gate').length;
    return { circuit: c, depth: circuitDepth(c), gateCount };
  }, [extraH]);

  return (
    <div className="lab-panel">
      <h3 style={{ marginTop: 0 }}>Depth &amp; gate count</h3>
      <p style={{ fontSize: '0.9rem' }}>
        Base circuit: H₀, CNOT₀₁. Add extra H gates on qubit 1 (same qubit → increases depth).
      </p>
      <label>
        Extra H gates on qubit 1: {extraH}
        <input
          type="range"
          min={0}
          max={5}
          value={extraH}
          onChange={(e) => setExtraH(Number(e.target.value))}
        />
      </label>
      <p style={{ fontFamily: 'var(--font-mono)' }}>
        Gate count: {gateCount} · Circuit depth: {depth}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        <strong>Width</strong> = number of qubit wires ({circuit.n}).{' '}
        <strong>Depth</strong> = longest critical path of gates on overlapping qubits.{' '}
        State vector dimension = 2^n = {1 << circuit.n}.
      </p>
    </div>
  );
}

export default function QuantumCircuits() {
  const { tag, title, intro } = useChapterMeta('quantumCircuits');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        The quantum circuit model is the standard programming picture for quantum algorithms: qubits
        are wires, time flows left to right (or top to bottom in some diagrams), unitary gates
        transform amplitudes, and measurements produce classical bits. This chapter fixes conventions,
        walks through the Bell preparation circuit, surveys the common gate set, and connects circuit
        metrics to simulation and hardware constraints.
      </p>

      <LearnSection chapter="quantumCircuits" sectionId="6.1"
        prev={{ title: 'Multiple Qubits', path: '/learn/multiple-qubits' }}
        next={{ title: '6.2 Bell walkthrough', path: `${BASE}#6.2` }}
      
        widgets={<>
          <Katex display>
                    {`|\\psi_{\\text{out}}\\rangle = U_k \\cdots U_2 U_1 |\\psi_{\\text{in}}\\rangle`}
                  </Katex>
          <LabLink path="/playground/circuit-builder" title="Open Circuit Builder" />
          <PracticeProblem prompt="You have CNOT with control qubit 1 and target qubit 0, starting from |10⟩. What is the output?">
                    <p>
                      Control is |1⟩, so target flips: |10⟩ → |11⟩.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  Each horizontal line is one qubit&apos;s world-line through time. A box on a line is a
                  single-qubit gate; a vertical line connecting two wires is a two-qubit gate (control shown
                  as a filled dot, target as ⊕ for CNOT). Gates apply in sequence: the rightmost gate in a
                  left-to-right diagram acts last on the state vector.
                </p>
        <p>
                  <strong>Controls</strong> condition an operation on another qubit being |1⟩ (for positive
                  control). Multi-controlled gates generalize this. <strong>Measurement</strong> is drawn as
                  a meter symbol; it projects onto computational basis outcomes and outputs classical bits.
                  Mid-circuit measurement with classical feed-forward lets later gates depend on earlier
                  outcomes — essential for teleportation and error correction.
                </p>
        <p>
                  Classical wires (double lines) carry measurement results. In simulators like this textbook,
                  we track the full state vector until measurement; hardware executes pulses implementing
                  each gate subject to calibration and connectivity limits.
                </p>
      </LearnSection>

      <LearnSection chapter="quantumCircuits" sectionId="6.2"
        prev={{ title: '6.1 Conventions', path: `${BASE}#6.1` }}
        next={{ title: '6.3 Gate set', path: `${BASE}#6.3` }}
      
        widgets={<>
          <Katex display>
                    {`|\\Phi^+\\rangle = \\text{CNOT}_{0\\to 1}\\, H_0 |00\\rangle = \\tfrac{|00\\rangle + |11\\rangle}{\\sqrt{2}}`}
                  </Katex>
          <BellStepWalkthrough />
          <LabLink path="/playground/bell-states" title="Bell State Generator lab" />
          <PracticeProblem prompt="Write the unitary matrix for the Bell preparation circuit in the {|00⟩,|01⟩,|10⟩,|11⟩} basis (conceptually) and list which amplitudes are non-zero.">
                    <p>
                      U = CNOT · (H ⊗ I). Starting from |00⟩, only |00⟩ and |11⟩ have amplitude 1/√2; |01⟩ and
                      |10⟩ are zero — maximally entangled support on the even parity subspace.
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  The Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 is the canonical entangled pair. It is prepared
                  from |00⟩ with one Hadamard and one CNOT — the minimal entangling circuit. Understanding
                  each step builds intuition for how superposition on the control qubit spreads correlation
                  to the target.
                </p>
        <p>
                  After H₀, qubit 0 is in |+⟩ while qubit 1 remains |0⟩ — a product state (|+⟩⊗|0⟩).
                  CNOT entangles: the + branch stays |00⟩, the − branch would flip target, but H only
                  created + amplitude on |0⟩ for qubit 0 in the superposition that matters; the result is
                  equal weight on |00⟩ and |11⟩ with zero on |01⟩ and |10⟩.
                </p>
      </LearnSection>

      <LearnSection chapter="quantumCircuits" sectionId="6.3"
        prev={{ title: '6.2 Bell walkthrough', path: `${BASE}#6.2` }}
        next={{ title: '6.4 State readout', path: `${BASE}#6.4` }}
      
        widgets={<>
          <Katex display>
                    {`H = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix},\\quad
                    T = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/4}\\end{pmatrix}`}
                  </Katex>
          <GateSetExplorer />
          <LabLink path="/playground/gate-explorer" title="Quantum Gate Explorer" />
          <PracticeProblem prompt="Apply S twice to |1⟩. What gate is equivalent to SS?">
                    <p>
                      S|1⟩ = i|1⟩; S²|1⟩ = −|1⟩ = Z|1⟩. So SS = Z (up to global phase on other basis states, S² = Z exactly).
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  <strong>Pauli gates</strong> I, X, Y, Z are involutions (X bit-flip, Z phase-flip, Y = iXZ).
                  <strong> Hadamard</strong> H creates superposition and swaps Z/X bases.{' '}
                  <strong>Phase gates</strong> S (√Z, π/2 phase on |1⟩) and T (⁴√Z, π/4) are common in
                  fault-tolerant constructions because T is non-Clifford — needed for universality with H and
                  CNOT.
                </p>
        <p>
                  <strong>Rotation gates</strong> Rx(θ), Ry(θ), Rz(θ) implement exp(−iθσ/2) about the
                  corresponding axis — any single-qubit unitary is a rotation up to global phase.{' '}
                  <strong>CNOT</strong> flips target when control is |1⟩; <strong>CZ</strong> applies −1 phase
                  on |11⟩ only. <strong>SWAP</strong> exchanges two qubits (real hardware may implement SWAP
                  via three CNOTs). <strong>Toffoli</strong> (CCNOT) flips target when both controls are |1⟩ —
                  universal for classical reversible logic embedded in quantum circuits.
                </p>
      </LearnSection>

      <LearnSection chapter="quantumCircuits" sectionId="6.4"
        prev={{ title: '6.3 Gate set', path: `${BASE}#6.3` }}
        next={{ title: '6.5 Depth & OpenQASM', path: `${BASE}#6.5` }}
      
        widgets={<>
          <Katex display>
                    {`P(x) = |\\langle x | \\psi \\rangle|^2, \\quad \\sum_x P(x) = 1`}
                  </Katex>
          <StateReadoutPanel />
          <PracticeProblem prompt="A 2-qubit state has amplitude 1/2 on |00⟩, 1/2 on |01⟩, and 0 on |10⟩, |11⟩. What is P(00) and is qubit 1 independent of qubit 0?">
                    <p>
                      P(00) = (1/2)² = 1/4. Given q₀=0, only |00⟩ and |01⟩ remain — equal weight — so q₁ is not
                      independent (knowing q₀=0 gives P(q₁=0)=P(q₁=1)=1/2 but the joint is not product).
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  An ideal simulator stores the <strong>state vector</strong> — 2ⁿ complex amplitudes for n
                  qubits. After each gate, amplitudes update by matrix multiplication. Measurement does not
                  change the vector until you sample or collapse: the Born rule gives outcome probabilities
                  P(x) = |α_x|² for label x.
                </p>
        <p>
                  For entangled states, marginal probabilities on one qubit may be 50/50 even when joint
                  outcomes are perfectly correlated. Always distinguish full state vector readout (simulator)
                  from histograms of many shots (hardware).
                </p>
      </LearnSection>

      <LearnSection chapter="quantumCircuits" sectionId="6.5"
        prev={{ title: '6.4 State readout', path: `${BASE}#6.4` }}
        next={{ title: 'Error Correction', path: '/learn/error-correction' }}
      
        widgets={<>
          <CircuitMetricsDemo />
          <LabLink path="/playground/circuit-builder" title="Open Circuit Builder" />
          <PracticeProblem prompt="Bell preparation uses 2 gates and depth 2. If you must insert a SWAP between qubits 0 and 1 using 3 CNOTs after the Bell circuit, what happens to depth if SWAP is implemented as 3 sequential layers?">
                    <p>
                      Original depth 2. Three sequential CNOT layers add 3, giving total depth 5 (assuming SWAP
                      gates run after Bell and each CNOT layer cannot overlap prior qubit operations on involved
                      wires).
                    </p>
                  </PracticeProblem>
        </>}
      >
        <p>
                  <strong>Circuit depth</strong> counts sequential layers of gates that cannot run in parallel
                  on the same qubits. <strong>Gate count</strong> is the total number of operations — related
                  to runtime and error accumulation. <strong>Width</strong> is the qubit count. NISQ devices
                  favor shallow, wide circuits with native gate sets and limited connectivity.
                </p>
        <p>
                  What grows exponentially with n is the <em>state vector dimension</em> 2ⁿ — simulating 50+
                  qubits exactly is infeasible on classical computers for generic states. Structured circuits
                  (Clifford, low entanglement) may be tractable longer.
                </p>
      </LearnSection>

      <div className="section-nav">
        <Link to="/learn/multiple-qubits">← Multiple Qubits</Link>
        <Link to="/learn/error-correction">Next: Error Correction →</Link>
      </div>
    </article>
  );
}
