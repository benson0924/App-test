import { type Matrix } from './matrix.js';
export type GateName = 'I' | 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T' | 'Rx' | 'Ry' | 'Rz' | 'CNOT' | 'CZ' | 'SWAP' | 'Toffoli';
export declare const Gates: {
    I: Matrix;
    X: Matrix;
    Y: Matrix;
    Z: Matrix;
    H: Matrix;
    S: Matrix;
    T: Matrix;
    Rx(theta: number): Matrix;
    Ry(theta: number): Matrix;
    Rz(theta: number): Matrix;
    CNOT: Matrix;
    CZ: Matrix;
    SWAP: Matrix;
    Toffoli: Matrix;
};
export declare function getSingleQubitGate(name: string, param?: number): Matrix;
