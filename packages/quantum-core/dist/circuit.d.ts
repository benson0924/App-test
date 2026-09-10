import { type Complex } from './complex.js';
import { type StateVector } from './statevector.js';
export type CircuitOp = {
    type: 'gate';
    name: string;
    qubits: number[];
    param?: number;
} | {
    type: 'measure';
    qubit: number;
};
export interface Circuit {
    n: number;
    ops: CircuitOp[];
}
export declare function createCircuit(n: number): Circuit;
export declare function applyCircuit(state: StateVector, circuit: Circuit): StateVector;
export declare function circuitDepth(circuit: Circuit): number;
export declare function bellPairCircuit(): Circuit;
export declare function teleportationCircuit(): Circuit;
export declare function buildFullUnitary(circuit: Circuit): Complex[][];
