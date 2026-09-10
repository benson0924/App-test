import { useMemo, useState } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import {
  zeroState, applyCircuit, createCircuit, applyBitFlipError,
  bitFlipSyndrome, Gates, fromAmplitudes, applySingleQubitGate,
} from 'quantum-core';
import { StateVectorTable } from './labUtils';

export default function ErrorCorrectionLab() {
  const labT = useLabT('error-correction');
  const sharedT = useLabSharedT();
  const [logicalBit, setLogicalBit] = useState(0);
  const [errorQubit, setErrorQubit] = useState<number | null>(null);

  const { encoded, corrupted, corrected, syndrome } = useMemo(() => {
    const c = createCircuit(3);
    if (logicalBit === 1) c.ops.push({ type: 'gate', name: 'X', qubits: [0] });
    c.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    c.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 2] });
    const encoded = applyCircuit(zeroState(3), c);

    let corrupted = encoded;
    if (errorQubit !== null) {
      corrupted = applyBitFlipError(encoded, errorQubit);
    }

    const [s0, s1] = bitFlipSyndrome(errorQubit);
    let corrected = corrupted;
    if (errorQubit === 0) {
      corrected = fromAmplitudes(3, applySingleQubitGate(corrupted.amplitudes, 3, 0, Gates.X));
    } else if (errorQubit === 1) {
      corrected = fromAmplitudes(3, applySingleQubitGate(corrupted.amplitudes, 3, 1, Gates.X));
    } else if (errorQubit === 2) {
      corrected = fromAmplitudes(3, applySingleQubitGate(corrupted.amplitudes, 3, 2, Gates.X));
    }

    return { encoded, corrupted, corrected, syndrome: [s0, s1] as [number, number] };
  }, [logicalBit, errorQubit]);

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p>Encode |0⟩ or |1⟩, inject a bit-flip error, read syndrome, and correct.</p>
      <div className="grid-2">
        <label>
          Logical bit
          <select value={logicalBit} onChange={(e) => setLogicalBit(Number(e.target.value))}>
            <option value={0}>|0⟩</option>
            <option value={1}>|1⟩</option>
          </select>
        </label>
        <label>
          Error location
          <select value={errorQubit ?? 'none'} onChange={(e) => setErrorQubit(e.target.value === 'none' ? null : Number(e.target.value))}>
            <option value="none">No error</option>
            <option value={0}>Qubit 0</option>
            <option value={1}>Qubit 1</option>
            <option value={2}>Qubit 2</option>
          </select>
        </label>
      </div>
      <p><strong>Syndrome (Z₀Z₁, Z₁Z₂):</strong> ({syndrome[0]}, {syndrome[1]})</p>
      <h4>Encoded</h4>
      <StateVectorTable state={encoded} />
      {errorQubit !== null && (
        <>
          <h4>After error</h4>
          <StateVectorTable state={corrupted} />
          <h4>After correction</h4>
          <StateVectorTable state={corrected} />
        </>
      )}
    </div>
  );
}
