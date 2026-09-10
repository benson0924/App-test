import type { Circuit } from './circuit.js';
import { applyCircuit } from './circuit.js';
import type { StateVector } from './statevector.js';

export function exportOpenQASM(circuit: Circuit, includeMeasures = false): string {
  const lines: string[] = [
    'OPENQASM 3.0;',
    'include "stdgates.inc";',
    `qubit[${circuit.n}] q;`,
  ];
  if (includeMeasures) lines.push(`bit[${circuit.n}] c;`);

  for (const op of circuit.ops) {
    if (op.type === 'measure') {
      lines.push(`c[${op.qubit}] = measure q[${op.qubit}];`);
      continue;
    }
    const qs = op.qubits.map((q) => `q[${q}]`).join(', ');
    const param = op.param !== undefined ? `(${op.param})` : '';
    switch (op.name) {
      case 'CNOT':
        lines.push(`cx q[${op.qubits[0]}], q[${op.qubits[1]}];`);
        break;
      case 'CZ':
        lines.push(`cz q[${op.qubits[0]}], q[${op.qubits[1]}];`);
        break;
      case 'SWAP':
        lines.push(`swap q[${op.qubits[0]}], q[${op.qubits[1]}];`);
        break;
      case 'Toffoli':
        lines.push(`ccx q[${op.qubits[0]}], q[${op.qubits[1]}], q[${op.qubits[2]}];`);
        break;
      case 'Rx':
      case 'Ry':
      case 'Rz':
        lines.push(`${op.name.toLowerCase()}${param} ${qs};`);
        break;
      default:
        lines.push(`${op.name.toLowerCase()} ${qs};`);
    }
  }
  return lines.join('\n');
}

export function applyCircuitStep(
  state: StateVector,
  circuit: Circuit,
  stepIndex: number
): StateVector {
  const partial: Circuit = { n: circuit.n, ops: circuit.ops.slice(0, stepIndex + 1) };
  return applyCircuit(state, partial);
}

export function countGates(circuit: Circuit): number {
  return circuit.ops.filter((o) => o.type === 'gate').length;
}
