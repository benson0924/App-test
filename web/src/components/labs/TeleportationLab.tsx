import { useState, useMemo } from 'react';
import {
  applyCircuit,
  createCircuit,
  C,
  type Complex,
  fromAmplitudes,
  applySingleQubitGate,
  Gates,
  fidelity,
  normalize,
  singleQubitState,
} from 'quantum-core';
import { StateVectorTable } from './labUtils';
import Katex from '@/components/Math';

const STEP_LABELS = ['Setup', 'Bell pair', 'Alice gates', 'Measure', 'Bob corrects', 'Complete'];

export default function TeleportationLab() {
  const [theta, setTheta] = useState(Math.PI / 3);
  const [phi, setPhi] = useState(0.8);
  const [stepIdx, setStepIdx] = useState(0);
  const [m0, setM0] = useState(0);
  const [m1, setM1] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [bobState, setBobState] = useState<ReturnType<typeof fromAmplitudes> | null>(null);

  const message = useMemo(() => {
    const alpha = C.fromPolar(Math.cos(theta / 2), 0);
    const beta = C.fromPolar(Math.sin(theta / 2), phi);
    return normalize(singleQubitState(alpha, beta));
  }, [theta, phi]);

  const messageFidelity = bobState ? fidelity(message, bobState) : null;

  const reset = () => {
    setStepIdx(0);
    setLog([]);
    setBobState(null);
    setM0(0);
    setM1(0);
  };

  /** Full teleportation simulation; returns outcome bits and Bob's qubit. */
  const simulate = (alpha: Complex, beta: Complex, meas0?: number, meas1?: number) => {
    let state = fromAmplitudes(3, Array(8).fill(C.zero()).map((_, i) => {
      const q0 = (i >> 2) & 1;
      if (q0 === 0) return i === 0 ? alpha : C.zero();
      return i === 4 ? beta : C.zero();
    }));

    const prep = createCircuit(3);
    prep.ops.push({ type: 'gate', name: 'H', qubits: [1] });
    prep.ops.push({ type: 'gate', name: 'CNOT', qubits: [1, 2] });
    state = applyCircuit(state, prep);

    const alice = createCircuit(3);
    alice.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    alice.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    state = applyCircuit(state, alice);

    const probs: Record<string, number> = {};
    for (let i = 0; i < 8; i++) {
      const b0 = (i >> 2) & 1;
      const b1 = (i >> 1) & 1;
      const key = `${b0}${b1}`;
      probs[key] = (probs[key] ?? 0) + C.mag2(state.amplitudes[i]);
    }

    let outcome0 = meas0;
    let outcome1 = meas1;
    if (outcome0 === undefined || outcome1 === undefined) {
      const r = Math.random();
      let cum = 0;
      let outcome = '00';
      for (const [k, p] of Object.entries(probs)) {
        cum += p;
        if (r <= cum) { outcome = k; break; }
      }
      outcome0 = parseInt(outcome[0]);
      outcome1 = parseInt(outcome[1]);
    }

    let corrected = state;
    if (outcome1) corrected = fromAmplitudes(3, applySingleQubitGate(corrected.amplitudes, 3, 2, Gates.X));
    if (outcome0) corrected = fromAmplitudes(3, applySingleQubitGate(corrected.amplitudes, 3, 2, Gates.Z));

    const amps = [corrected.amplitudes[0], corrected.amplitudes[4]];
    const norm2 = C.mag2(amps[0]) + C.mag2(amps[1]);
    const scale = 1 / Math.sqrt(norm2);
    const teleported = fromAmplitudes(1, amps.map((a) => C.scale(scale, a)));

    return { outcome0, outcome1, teleported, state };
  };

  const advance = () => {
    if (stepIdx >= STEP_LABELS.length - 1) { reset(); return; }
    const next = stepIdx + 1;
    const alpha = message.amplitudes[0];
    const beta = message.amplitudes[1];
    const newLog = [...log];

    if (next === 1) newLog.push('Prepare |Φ⁺⟩ on qubits 1,2 via H₁ and CNOT₁₂.');
    if (next === 2) newLog.push('Alice applies CNOT₀₁ and H₀ to her qubits.');
    if (next === 3) {
      const { outcome0, outcome1 } = simulate(alpha, beta);
      setM0(outcome0);
      setM1(outcome1);
      newLog.push(`Alice measures → (${outcome0}, ${outcome1}). Sends 2 classical bits.`);
    }
    if (next === 4) {
      const { outcome0, outcome1, teleported } = simulate(alpha, beta, m0, m1);
      setBobState(teleported);
      newLog.push(`Bob applies ${outcome0 ? 'Z' : 'I'} and ${outcome1 ? 'X' : 'I'}.`);
    }
    if (next === 5) {
      const F = bobState ? fidelity(message, bobState) : fidelity(message, simulate(alpha, beta, m0, m1).teleported);
      newLog.push(`Verified: F = ${F.toFixed(4)} (ideal 1).`);
    }

    setLog(newLog);
    setStepIdx(next);
  };

  const runAll = () => {
    reset();
    const alpha = message.amplitudes[0];
    const beta = message.amplitudes[1];
    const { outcome0, outcome1, teleported } = simulate(alpha, beta);
    setM0(outcome0);
    setM1(outcome1);
    setBobState(teleported);
    const F = fidelity(message, teleported);
    setLog([
      'Prepare |Φ⁺⟩ on qubits 1,2.',
      'Alice applies CNOT₀₁ and H₀.',
      `Alice measures → (${outcome0}, ${outcome1}).`,
      `Bob applies ${outcome0 ? 'Z' : 'I'} and ${outcome1 ? 'X' : 'I'}.`,
      `Fidelity F = ${F.toFixed(4)}.`,
    ]);
    setStepIdx(5);
  };

  return (
    <div className="lab-panel">
      <h3>Quantum Teleportation</h3>
      <p style={{ fontSize: '0.875rem' }}>
        Transfer unknown |ψ⟩ using shared entanglement + 2 classical bits. Qubit 0 = message, 1 = Alice, 2 = Bob.
      </p>

      <div className="grid-2">
        <div>
          <label>θ: {(theta * 180 / Math.PI).toFixed(0)}°</label>
          <input type="range" min={0} max={Math.PI} step={0.05} value={theta} onChange={(e) => { setTheta(Number(e.target.value)); reset(); }} />
          <label>φ: {phi.toFixed(2)} rad</label>
          <input type="range" min={0} max={2 * Math.PI} step={0.05} value={phi} onChange={(e) => { setPhi(Number(e.target.value)); reset(); }} />
        </div>
        <div>
          <p><strong>Original |ψ⟩:</strong></p>
          <StateVectorTable state={message} />
        </div>
      </div>

      <div className="btn-group">
        <button className="btn" onClick={reset}>Reset</button>
        <button className="btn btn-primary" onClick={advance}>Step ({STEP_LABELS[stepIdx]})</button>
        <button className="btn" onClick={runAll}>Run</button>
        <button className="btn" onClick={() => { setTheta(Math.random() * Math.PI); setPhi(Math.random() * 2 * Math.PI); reset(); }}>Randomize</button>
      </div>

      {log.length > 0 && <ol style={{ fontSize: '0.875rem' }}>{log.map((s, i) => <li key={i}>{s}</li>)}</ol>}

      {bobState && (
        <>
          <p><strong>Bob&apos;s qubit:</strong></p>
          <StateVectorTable state={bobState} />
          {messageFidelity !== null && (
            <p>Fidelity <Katex>{`F = ${messageFidelity.toFixed(4)}`}</Katex>{messageFidelity > 0.999 ? ' ✓' : ''}</p>
          )}
        </>
      )}

      <details style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
        <summary style={{ cursor: 'pointer', color: 'var(--accent)' }}>Protocol notes</summary>
        <ul>
          <li>Correction table: 00→I, 01→X, 10→Z, 11→ZX (convention-dependent).</li>
          <li>Alice&apos;s state is destroyed; Bob needs classical bits before decoding.</li>
          <li>Entanglement alone cannot signal faster than light.</li>
        </ul>
      </details>
    </div>
  );
}
