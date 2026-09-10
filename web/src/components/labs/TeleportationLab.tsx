import { useState } from 'react';
import {
  BellStates, applyCircuit, createCircuit, C, fromAmplitudes,
  applySingleQubitGate, Gates, stateLabel,
} from 'quantum-core';
import { StateVectorTable } from './labUtils';

export default function TeleportationLab() {
  const [theta, setTheta] = useState(Math.PI / 3);
  const [log, setLog] = useState<string[]>([]);
  const [final, setFinal] = useState<ReturnType<typeof fromAmplitudes> | null>(null);

  const run = () => {
    const steps: string[] = [];
    const alpha = C.scale(Math.cos(theta / 2), C.one());
    const beta = C.scale(Math.sin(theta / 2), C.one());
    let state = fromAmplitudes(3, [
      ...fromAmplitudes(1, [alpha, beta]).amplitudes.flatMap((a) => [a, C.zero(), C.zero(), C.zero()]),
    ]);
    // |ψ⟩|00⟩ properly: qubit 0 is message
    state = fromAmplitudes(3, Array(8).fill(C.zero()).map((_, i) => {
      const q0 = (i >> 2) & 1;
      if (q0 === 0) return i === 0 ? alpha : C.zero();
      return i === 4 ? beta : C.zero();
    }));

    steps.push(`Message state |ψ⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩ on qubit 0.`);

    const prep = createCircuit(3);
    prep.ops.push({ type: 'gate', name: 'H', qubits: [1] });
    prep.ops.push({ type: 'gate', name: 'CNOT', qubits: [1, 2] });
    state = applyCircuit(state, prep);
    steps.push('Qubits 1,2 prepared in |Φ⁺⟩ Bell pair.');

    const bell = createCircuit(3);
    bell.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    bell.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    state = applyCircuit(state, bell);
    steps.push('Alice applies CNOT₀₁ and H₀, measures qubits 0 and 1.');

    // Simulate measurement outcomes probabilistically — show ideal average correction for |0⟩⟨0| on qubits 0,1
    const m0 = 0, m1 = 0;
    let corrected = state;
    if (m1) corrected = fromAmplitudes(3, applySingleQubitGate(corrected.amplitudes, 3, 2, Gates.X));
    if (m0) corrected = fromAmplitudes(3, applySingleQubitGate(corrected.amplitudes, 3, 2, Gates.Z));
    steps.push(`Classical bits (${m0}, ${m1}) sent; Bob applies Z^m0 X^m1 on qubit 2.`);

    // Extract qubit 2 reduced state amplitudes for |00⟩ on 0,1
    const amps = [corrected.amplitudes[0], corrected.amplitudes[4]];
    const teleported = fromAmplitudes(1, amps);
    setFinal(teleported);
    setLog(steps);
  };

  return (
    <div className="lab-panel">
      <h3>Quantum Teleportation</h3>
      <label>
        θ (message angle): {(theta * 180 / Math.PI).toFixed(0)}°
        <input type="range" min={0} max={Math.PI} step={0.05} value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
      </label>
      <button className="btn btn-primary" onClick={run}>Teleport state</button>
      {log.length > 0 && (
        <ol>{log.map((s, i) => <li key={i}>{s}</li>)}</ol>
      )}
      {final && (
        <>
          <p><strong>Bob's qubit after correction:</strong></p>
          <StateVectorTable state={final} />
        </>
      )}
    </div>
  );
}
