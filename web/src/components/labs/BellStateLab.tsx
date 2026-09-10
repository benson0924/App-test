import { useMemo, useState } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { BellStates, applyCircuit, zeroState, createCircuit } from 'quantum-core';
import { StateVectorTable } from './labUtils';

const BELL = [
  { id: 'phiPlus', label: '|Φ⁺⟩ = (|00⟩+|11⟩)/√2', fn: BellStates.phiPlus },
  { id: 'phiMinus', label: '|Φ⁻⟩ = (|00⟩−|11⟩)/√2', fn: BellStates.phiMinus },
  { id: 'psiPlus', label: '|Ψ⁺⟩ = (|01⟩+|10⟩)/√2', fn: BellStates.psiPlus },
  { id: 'psiMinus', label: '|Ψ⁻⟩ = (|01⟩−|10⟩)/√2', fn: BellStates.psiMinus },
] as const;

export default function BellStateLab() {
  const labT = useLabT('bell-states');
  const sharedT = useLabSharedT();
  const [mode, setMode] = useState<'direct' | 'circuit'>('circuit');
  const [bellIdx, setBellIdx] = useState(0);

  const state = useMemo(() => {
    if (mode === 'direct') return BELL[bellIdx].fn();
    const c = createCircuit(2);
    c.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    c.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    if (bellIdx === 1) c.ops.unshift({ type: 'gate', name: 'Z', qubits: [1] });
    if (bellIdx === 2) c.ops.unshift({ type: 'gate', name: 'X', qubits: [1] });
    if (bellIdx === 3) { c.ops.unshift({ type: 'gate', name: 'X', qubits: [1] }); c.ops.unshift({ type: 'gate', name: 'Z', qubits: [1] }); }
    return applyCircuit(zeroState(2), c);
  }, [mode, bellIdx]);

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <div className="btn-group">
        <button className={`btn ${mode === 'circuit' ? 'btn-primary' : ''}`} onClick={() => setMode('circuit')}>From H + CNOT</button>
        <button className={`btn ${mode === 'direct' ? 'btn-primary' : ''}`} onClick={() => setMode('direct')}>Direct state</button>
      </div>
      <div className="btn-group">
        {BELL.map((b, i) => (
          <button key={b.id} className={`btn ${bellIdx === i ? 'btn-primary' : ''}`} onClick={() => setBellIdx(i)}>
            {b.label}
          </button>
        ))}
      </div>
      <StateVectorTable state={state} />
    </div>
  );
}
