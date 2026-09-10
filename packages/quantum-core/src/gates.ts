import { C, type Complex } from './complex.js';
import { Matrix2, Matrix4, Matrix8, type Matrix } from './matrix.js';

export type GateName =
  | 'I' | 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T'
  | 'Rx' | 'Ry' | 'Rz'
  | 'CNOT' | 'CZ' | 'SWAP' | 'Toffoli';

const SQ2 = 1 / Math.sqrt(2);
const SQ2INV = SQ2;

export const Gates = {
  I: Matrix2([[C.one(), C.zero()], [C.zero(), C.one()]]),
  X: Matrix2([[C.zero(), C.one()], [C.one(), C.zero()]]),
  Y: Matrix2([[C.zero(), C.scale(-1, C.i())], [C.i(), C.zero()]]),
  Z: Matrix2([[C.one(), C.zero()], [C.zero(), C.scale(-1, C.one())]]),
  H: Matrix2([
    [C.scale(SQ2INV, C.one()), C.scale(SQ2INV, C.one())],
    [C.scale(SQ2INV, C.one()), C.scale(-SQ2INV, C.one())],
  ]),
  S: Matrix2([[C.one(), C.zero()], [C.zero(), C.i()]]),
  T: Matrix2([[C.one(), C.zero()], [C.zero(), C.exp(Math.PI / 4)]]),

  Rx(theta: number) {
    const c = Math.cos(theta / 2);
    const s = Math.sin(theta / 2);
    return Matrix2([
      [C.scale(c, C.one()), C.scale(-s, C.i())],
      [C.scale(-s, C.i()), C.scale(c, C.one())],
    ]);
  },

  Ry(theta: number) {
    const c = Math.cos(theta / 2);
    const s = Math.sin(theta / 2);
    return Matrix2([
      [C.scale(c, C.one()), C.scale(-s, C.one())],
      [C.scale(s, C.one()), C.scale(c, C.one())],
    ]);
  },

  Rz(theta: number) {
    return Matrix2([
      [C.exp(-theta / 2), C.zero()],
      [C.zero(), C.exp(theta / 2)],
    ]);
  },

  CNOT: Matrix4([
    [C.one(), C.zero(), C.zero(), C.zero()],
    [C.zero(), C.one(), C.zero(), C.zero()],
    [C.zero(), C.zero(), C.zero(), C.one()],
    [C.zero(), C.zero(), C.one(), C.zero()],
  ]),

  CZ: Matrix4([
    [C.one(), C.zero(), C.zero(), C.zero()],
    [C.zero(), C.one(), C.zero(), C.zero()],
    [C.zero(), C.zero(), C.one(), C.zero()],
    [C.zero(), C.zero(), C.zero(), C.scale(-1, C.one())],
  ]),

  SWAP: Matrix4([
    [C.one(), C.zero(), C.zero(), C.zero()],
    [C.zero(), C.zero(), C.one(), C.zero()],
    [C.zero(), C.one(), C.zero(), C.zero()],
    [C.zero(), C.zero(), C.zero(), C.one()],
  ]),

  Toffoli: Matrix8([
    ...Array.from({ length: 6 }, (_, i) =>
      Array.from({ length: 8 }, (_, j) => (i === j ? C.one() : C.zero()))
    ),
    [C.zero(), C.zero(), C.zero(), C.zero(), C.zero(), C.zero(), C.zero(), C.one()],
    [C.zero(), C.zero(), C.zero(), C.zero(), C.zero(), C.zero(), C.one(), C.zero()],
  ] as Complex[][]),
};

export function getSingleQubitGate(name: string, param?: number): Matrix {
  switch (name) {
    case 'I': return Gates.I;
    case 'X': return Gates.X;
    case 'Y': return Gates.Y;
    case 'Z': return Gates.Z;
    case 'H': return Gates.H;
    case 'S': return Gates.S;
    case 'T': return Gates.T;
    case 'Rx': return Gates.Rx(param ?? 0);
    case 'Ry': return Gates.Ry(param ?? 0);
    case 'Rz': return Gates.Rz(param ?? 0);
    default: throw new Error(`Unknown gate: ${name}`);
  }
}
