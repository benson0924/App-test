import { type StateVector } from './statevector.js';
import { applyCircuit, createCircuit, type Circuit } from './circuit.js';
/** Deutsch algorithm for n=1: determine constant vs balanced. */
export declare function deutschOracle(f: (x: number) => number): Circuit;
export declare function runDeutsch(f: (x: number) => number): {
    constant: boolean;
    measured: string;
};
/** Deutsch-Jozsa for small n. */
export declare function runDeutschJozsa(n: number, f: (x: number) => number): {
    balanced: boolean;
};
/** Bernstein-Vazirani: find secret string s. */
export declare function runBernsteinVazirani(n: number, secret: number[]): number[];
/** Grover iteration count. */
export declare function groverIterations(n: number): number;
/** Single Grover iteration on marked state |w>. */
export declare function groverStep(state: StateVector, marked: number): StateVector;
export declare function runGrover(n: number, marked: number, iterations?: number): StateVector;
/** QFT on amplitudes. */
export declare function qft(state: StateVector): StateVector;
/** Inverse QFT. */
export declare function iqft(state: StateVector): StateVector;
/** Quantum phase estimation (simplified). */
export declare function phaseEstimation(phi: number, precisionQubits: number): {
    estimate: number;
    binary: string;
    error: number;
};
/** Modular exponentiation a^x mod N. */
export declare function modExp(a: number, x: number, N: number): number;
/** Find period of a^x mod N. */
export declare function findPeriod(a: number, N: number): number;
export declare function gcd(a: number, b: number): number;
/** Shor factoring demo (classical period finding). */
export declare function shorFactor(N: number, a?: number): {
    p: number;
    q: number;
    r: number;
    a: number;
} | null;
/** CHSH correlation simulation. */
export declare function chshExperiment(a: number, b: number, ap: number, bp: number, trials: number): {
    E: Record<string, number>;
    S: number;
};
/** BB84 key distribution simulation. */
export interface BB84Result {
    aliceBits: number[];
    aliceBases: ('Z' | 'X')[];
    bobBases: ('Z' | 'X')[];
    bobResults: number[];
    siftedKey: number[];
    errorRate: number;
    eveEnabled: boolean;
}
export declare function runBB84(numQubits: number, eveEnabled?: boolean): BB84Result;
/** Three-qubit bit-flip code syndrome. */
export declare function bitFlipSyndrome(errorQubit: number | null): [number, number];
export declare function applyBitFlipError(state: StateVector, qubit: number): StateVector;
export { createCircuit, applyCircuit, type Circuit };
