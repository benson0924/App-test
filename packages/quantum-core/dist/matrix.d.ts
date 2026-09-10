import { type Complex } from './complex.js';
export interface Matrix {
    readonly rows: number;
    readonly cols: number;
    readonly data: Complex[][];
    mulVec(v: Complex[]): Complex[];
    mulMat(m: Matrix): Matrix;
    dagger(): Matrix;
    isUnitary(eps?: number): boolean;
    toArray(): Complex[][];
}
export declare const Matrix2: (data: Complex[][]) => Matrix;
export declare const Matrix4: (data: Complex[][]) => Matrix;
export declare const Matrix8: (data: Complex[][]) => Matrix;
export declare function identity(n: number): Matrix;
/** Kronecker product of two vectors. */
export declare function kronVec(a: Complex[], b: Complex[]): Complex[];
/** Kronecker product of two matrices. */
export declare function kronMat(a: Matrix, b: Matrix): Matrix;
/** Apply single-qubit gate U to qubit `target` in n-qubit system. */
export declare function applySingleQubitGate(state: Complex[], n: number, target: number, gate: Matrix): Complex[];
/** Apply two-qubit gate to qubits (control, target) with control as lower index. */
export declare function applyTwoQubitGate(state: Complex[], n: number, control: number, target: number, gate: Matrix): Complex[];
export declare function parseComplex(s: string): Complex;
