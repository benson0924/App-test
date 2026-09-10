import { useMemo, useState } from 'react';
import { BellStates, basisState, tensorProduct, isProductState, C } from 'quantum-core';
import { StateVectorTable } from './labUtils';

export default function EntanglementLab() {
  const [entangled, setEntangled] = useState(true);
  const state = useMemo(() => {
    if (entangled) return BellStates.phiPlus();
    const a = { n: 1, amplitudes: [C.scale(0.6, C.one()), C.scale(0.8, C.one())] };
    const b = basisState(1, 1);
    return tensorProduct(a, b);
  }, [entangled]);
  const product = isProductState(state);

  return (
    <div className="lab-panel">
      <h3>Entanglement Measurement</h3>
      <div className="btn-group">
        <button className={`btn ${entangled ? 'btn-primary' : ''}`} onClick={() => setEntangled(true)}>Bell |Φ⁺⟩</button>
        <button className={`btn ${!entangled ? 'btn-primary' : ''}`} onClick={() => setEntangled(false)}>Product state</button>
      </div>
      <StateVectorTable state={state} />
      <p>
        <strong>Product state test:</strong>{' '}
        <span className={product ? 'correct' : 'incorrect'}>
          {product ? 'Separable (product state)' : 'Entangled (not a product state)'}
        </span>
      </p>
      {!product && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          For two qubits, entangled states satisfy c₀₀·c₁₁ ≠ c₀₁·c₁₀ (Schmidt rank &gt; 1).
        </p>
      )}
    </div>
  );
}
