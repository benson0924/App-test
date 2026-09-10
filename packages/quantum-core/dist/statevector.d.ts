import { type Complex } from './complex.js';
export type MeasurementBasis = 'Z' | 'X' | 'Y';
export interface StateVector {
    readonly n: number;
    readonly amplitudes: Complex[];
}
export declare function stateLabel(index: number, n: number): string;
export declare function zeroState(n: number): StateVector;
export declare function fromAmplitudes(n: number, amplitudes: Complex[]): StateVector;
export declare function singleQubitState(alpha: Complex, beta: Complex): StateVector;
export declare function normalize(state: StateVector): StateVector;
export declare function norm(state: StateVector): number;
export declare function probabilities(state: StateVector): number[];
export declare function innerProduct(a: StateVector, b: StateVector): Complex;
export declare function fidelity(a: StateVector, b: StateVector): number;
/** Bloch sphere coordinates from single-qubit state (ignoring global phase). */
export declare function blochCoordinates(state: StateVector): {
    x: number;
    y: number;
    z: number;
    theta: number;
    phi: number;
};
export declare function fromBloch(theta: number, phi: number): StateVector;
export declare function measureComputational(state: StateVector, shots?: number): {
    counts: Record<string, number>;
    collapsed: StateVector | null;
};
export declare function basisState(n: number, index: number): StateVector;
export declare function measureQubitInBasis(state: StateVector, qubitIndex: number, basis: MeasurementBasis): {
    outcome: string;
    probability: number;
    remaining: StateVector;
};
export declare function singleQubitMeasurementProbabilities(alpha: Complex, beta: Complex, basis: MeasurementBasis): Record<string, number>;
export declare function isProductState(state: StateVector): boolean;
export declare function tensorProduct(a: StateVector, b: StateVector): StateVector;
export declare const BellStates: {
    phiPlus: () => StateVector;
    phiMinus: () => StateVector;
    psiPlus: () => StateVector;
    psiMinus: () => StateVector;
};
