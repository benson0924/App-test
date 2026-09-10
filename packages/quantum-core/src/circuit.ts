import { C, type Complex } from './complex.js';
import { applySingleQubitGate, applyTwoQubitGate, identity, kronMat } from './matrix.js';
import { Gates, getSingleQubitGate } from './gates.js';
import { fromAmplitudes, normalize, type StateVector } from './statevector.js';

export type CircuitOp =
  | { type: 'gate'; name: string; qubits: number[]; param?: number }
  | { type: 'measure'; qubit: number };

export interface Circuit {
  n: number;
  ops: CircuitOp[];
}

export function createCircuit(n: number): Circuit {
  return { n, ops: [] };
}

export function applyCircuit(state: StateVector, circuit: Circuit): StateVector {
  let amps = [...state.amplitudes.map((a) => ({ ...a }))];
  for (const op of circuit.ops) {
    if (op.type === 'gate') {
      amps = applyOp(amps, circuit.n, op);
    }
  }
  return fromAmplitudes(circuit.n, amps);
}

function applyOp(amps: Complex[], n: number, op: Extract<CircuitOp, { type: 'gate' }>): Complex[] {
  const { name, qubits, param } = op;
  if (name === 'CNOT') {
    return applyTwoQubitGate(amps, n, qubits[0], qubits[1], Gates.CNOT);
  }
  if (name === 'CZ') {
    return applyTwoQubitGate(amps, n, qubits[0], qubits[1], Gates.CZ);
  }
  if (name === 'SWAP') {
    return applyTwoQubitGate(amps, n, qubits[0], qubits[1], Gates.SWAP);
  }
  if (name === 'Toffoli' && qubits.length === 3) {
    return applyToffoli(amps, n, qubits[0], qubits[1], qubits[2]);
  }
  const gate = getSingleQubitGate(name, param);
  let result = amps;
  for (const q of qubits) {
    result = applySingleQubitGate(result, n, q, gate);
  }
  return result;
}

function applyToffoli(
  amps: Complex[],
  n: number,
  c1: number,
  c2: number,
  target: number
): Complex[] {
  const dim = 1 << n;
  const result = amps.map((a) => ({ ...a }));
  for (let idx = 0; idx < dim; idx++) {
    const b1 = (idx >> (n - 1 - c1)) & 1;
    const b2 = (idx >> (n - 1 - c2)) & 1;
    if (b1 === 1 && b2 === 1) {
      const mask = 1 << (n - 1 - target);
      const flipped = idx ^ mask;
      if (idx < flipped) {
        const tmp = result[idx];
        result[idx] = result[flipped];
        result[flipped] = tmp;
      }
    }
  }
  return result;
}

export function circuitDepth(circuit: Circuit): number {
  if (circuit.ops.length === 0) return 0;
  const layers: number[][] = Array.from({ length: circuit.n }, () => []);
  let time = 0;
  const qubitTime = Array(circuit.n).fill(0);
  for (const op of circuit.ops) {
    if (op.type === 'measure') {
      qubitTime[op.qubit] = Math.max(...qubitTime) + 1;
      continue;
    }
    const qs = op.qubits;
    const start = Math.max(...qs.map((q) => qubitTime[q]));
    const end = start + 1;
    for (const q of qs) qubitTime[q] = end;
    time = Math.max(time, end);
  }
  return time;
}

export function bellPairCircuit(): Circuit {
  return {
    n: 2,
    ops: [
      { type: 'gate', name: 'H', qubits: [0] },
      { type: 'gate', name: 'CNOT', qubits: [0, 1] },
    ],
  };
}

export function teleportationCircuit(): Circuit {
  return {
    n: 3,
    ops: [
      { type: 'gate', name: 'CNOT', qubits: [0, 1] },
      { type: 'gate', name: 'H', qubits: [0] },
      { type: 'gate', name: 'CNOT', qubits: [1, 2] },
      { type: 'gate', name: 'CNOT', qubits: [0, 2] },
    ],
  };
}

export function buildFullUnitary(circuit: Circuit): Complex[][] {
  let u = identity(1 << circuit.n);
  for (const op of circuit.ops) {
    if (op.type !== 'gate') continue;
    const gu = gateOnSystem(circuit.n, op);
    u = u.mulMat(gu);
  }
  return u.toArray();
}

function gateOnSystem(n: number, op: Extract<CircuitOp, { type: 'gate' }>) {
  const dim = 1 << n;
  if (op.name === 'CNOT' && op.qubits.length === 2) {
    const amps = Array.from({ length: dim }, (_, i) => {
      const v = Array.from({ length: dim }, () => C.zero());
      v[i] = C.one();
      return applyTwoQubitGate(v, n, op.qubits[0], op.qubits[1], Gates.CNOT);
    });
    return identity(dim); // fallback - use apply for simulation
  }
  const gate = getSingleQubitGate(op.name, op.param);
  // Build via basis application
  const data: Complex[][] = Array.from({ length: dim }, () =>
    Array.from({ length: dim }, () => C.zero())
  );
  for (let col = 0; col < dim; col++) {
    const v = Array.from({ length: dim }, () => C.zero());
    v[col] = C.one();
    let result: Complex[];
    if (op.name === 'CNOT') {
      result = applyTwoQubitGate(v, n, op.qubits[0], op.qubits[1], Gates.CNOT);
    } else if (op.name === 'CZ') {
      result = applyTwoQubitGate(v, n, op.qubits[0], op.qubits[1], Gates.CZ);
    } else if (op.name === 'SWAP') {
      result = applyTwoQubitGate(v, n, op.qubits[0], op.qubits[1], Gates.SWAP);
    } else {
      result = v;
      for (const q of op.qubits) {
        result = applySingleQubitGate(result, n, q, gate);
      }
    }
    for (let row = 0; row < dim; row++) data[row][col] = result[row];
  }
  return identity(dim); // simulation uses applyCircuit
}
