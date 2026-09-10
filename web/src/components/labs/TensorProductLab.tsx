import { useMemo, useState } from 'react';
import { basisState, tensorProduct, C } from 'quantum-core';
import { StateVectorTable } from './labUtils';

const PRESETS = [
  { label: '|0⟩ ⊗ |0⟩', a: 0, b: 0 },
  { label: '|0⟩ ⊗ |1⟩', a: 0, b: 1 },
  { label: '|1⟩ ⊗ |+⟩', a: 1, b: 'plus' as const },
  { label: '|+⟩ ⊗ |+⟩', a: 'plus' as const, b: 'plus' as const },
];

function qubitState(bit: number | 'plus') {
  if (bit === 'plus') {
    return { n: 1, amplitudes: [C.scale(1 / Math.sqrt(2), C.one()), C.scale(1 / Math.sqrt(2), C.one())] };
  }
  return basisState(1, bit);
}

export default function TensorProductLab() {
  const [preset, setPreset] = useState(0);
  const state = useMemo(() => {
    const p = PRESETS[preset];
    return tensorProduct(qubitState(p.a), qubitState(p.b));
  }, [preset]);

  return (
    <div className="lab-panel">
      <h3>Tensor Product Calculator</h3>
      <p>Explore how two single-qubit states combine into a two-qubit product state |ψ⟩ ⊗ |φ⟩.</p>
      <div className="btn-group">
        {PRESETS.map((p, i) => (
          <button key={p.label} className={`btn ${preset === i ? 'btn-primary' : ''}`} onClick={() => setPreset(i)}>
            {p.label}
          </button>
        ))}
      </div>
      <StateVectorTable state={state} />
    </div>
  );
}
