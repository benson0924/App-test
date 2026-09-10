import { C, type Complex } from './complex.js';
import { kronVec } from './matrix.js';

export type MeasurementBasis = 'Z' | 'X' | 'Y';

export interface StateVector {
  readonly n: number;
  readonly amplitudes: Complex[];
}

export function stateLabel(index: number, n: number): string {
  return index.toString(2).padStart(n, '0');
}

export function zeroState(n: number): StateVector {
  const dim = 1 << n;
  const amplitudes = Array.from({ length: dim }, () => C.zero());
  amplitudes[0] = C.one();
  return { n, amplitudes };
}

export function fromAmplitudes(n: number, amplitudes: Complex[]): StateVector {
  if (amplitudes.length !== (1 << n)) {
    throw new Error(`Expected ${1 << n} amplitudes for ${n} qubits`);
  }
  return { n, amplitudes: amplitudes.map((a) => ({ ...a })) };
}

export function singleQubitState(alpha: Complex, beta: Complex): StateVector {
  return fromAmplitudes(1, [alpha, beta]);
}

export function normalize(state: StateVector): StateVector {
  let norm2 = 0;
  for (const a of state.amplitudes) norm2 += C.mag2(a);
  if (norm2 < 1e-15) throw new Error('Zero vector cannot be normalized');
  const scale = 1 / Math.sqrt(norm2);
  return fromAmplitudes(
    state.n,
    state.amplitudes.map((a) => C.scale(scale, a))
  );
}

export function norm(state: StateVector): number {
  let sum = 0;
  for (const a of state.amplitudes) sum += C.mag2(a);
  return Math.sqrt(sum);
}

export function probabilities(state: StateVector): number[] {
  return state.amplitudes.map((a) => C.mag2(a));
}

export function innerProduct(a: StateVector, b: StateVector): Complex {
  if (a.n !== b.n) throw new Error('Dimension mismatch');
  let sum = C.zero();
  for (let i = 0; i < a.amplitudes.length; i++) {
    sum = C.add(sum, C.mul(C.conj(a.amplitudes[i]), b.amplitudes[i]));
  }
  return sum;
}

export function fidelity(a: StateVector, b: StateVector): number {
  const ip = innerProduct(a, b);
  return C.mag2(ip);
}

/** Bloch sphere coordinates from single-qubit state (ignoring global phase). */
export function blochCoordinates(state: StateVector): { x: number; y: number; z: number; theta: number; phi: number } {
  if (state.n !== 1) throw new Error('Bloch coordinates require one qubit');
  const s = normalize(state);
  const a = s.amplitudes[0];
  const b = s.amplitudes[1];
  const magA = C.mag(a);
  if (magA < 1e-12) {
    const phi = C.phase(b);
    return { x: 0, y: 0, z: -1, theta: Math.PI, phi };
  }
  const theta = 2 * Math.acos(Math.min(1, magA));
  const globalPhase = C.phase(a);
  const relPhase = C.phase(b) - globalPhase;
  const phi = relPhase;
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);
  return { x, y, z, theta, phi };
}

export function fromBloch(theta: number, phi: number): StateVector {
  const a = C.scale(Math.cos(theta / 2), C.one());
  const b = C.mul(C.fromPolar(Math.sin(theta / 2), phi), C.one());
  return singleQubitState(a, b);
}

export function measureComputational(state: StateVector, shots = 1): { counts: Record<string, number>; collapsed: StateVector | null } {
  const probs = probabilities(state);
  const counts: Record<string, number> = {};
  let lastIdx = 0;
  for (let s = 0; s < shots; s++) {
    const r = Math.random();
    let cum = 0;
    for (let i = 0; i < probs.length; i++) {
      cum += probs[i];
      if (r <= cum) {
        const label = stateLabel(i, state.n);
        counts[label] = (counts[label] ?? 0) + 1;
        lastIdx = i;
        break;
      }
    }
  }
  const collapsed = shots === 1 ? basisState(state.n, lastIdx) : null;
  return { counts, collapsed };
}

export function basisState(n: number, index: number): StateVector {
  const amplitudes = Array.from({ length: 1 << n }, () => C.zero());
  amplitudes[index] = C.one();
  return { n, amplitudes };
}

export function measureQubitInBasis(
  state: StateVector,
  qubitIndex: number,
  basis: MeasurementBasis
): { outcome: string; probability: number; remaining: StateVector } {
  const n = state.n;
  const dim = 1 << n;
  const transformed = transformQubitBasis(state, qubitIndex, basis, true);
  const probs = [0, 0];
  for (let i = 0; i < dim; i++) {
    const bit = (i >> (n - 1 - qubitIndex)) & 1;
    probs[bit] += C.mag2(transformed.amplitudes[i]);
  }
  const r = Math.random();
  const outcome = r <= probs[0] ? '0' : '1';
  const outcomeBit = outcome === '0' ? 0 : 1;
  const mask = 1 << (n - 1 - qubitIndex);
  const newAmps = Array.from({ length: dim }, () => C.zero());
  let norm2 = 0;
  for (let i = 0; i < dim; i++) {
    if (((i >> (n - 1 - qubitIndex)) & 1) === outcomeBit) {
      newAmps[i] = transformed.amplitudes[i];
      norm2 += C.mag2(newAmps[i]);
    }
  }
  const scale = 1 / Math.sqrt(norm2);
  for (let i = 0; i < dim; i++) newAmps[i] = C.scale(scale, newAmps[i]);
  let remaining = fromAmplitudes(n, newAmps);
  remaining = transformQubitBasis(remaining, qubitIndex, basis, false);
  const basisLabel = basis === 'Z' ? outcome : basis === 'X' ? (outcome === '0' ? '+' : '-') : (outcome === '0' ? 'i' : '-i');
  return { outcome: basisLabel, probability: probs[outcomeBit], remaining };
}

function transformQubitBasis(state: StateVector, qubit: number, basis: MeasurementBasis, toBasis: boolean): StateVector {
  if (basis === 'Z') return state;
  const H = basis === 'X';
  const amplitudes = [...state.amplitudes];
  const n = state.n;
  const dim = 1 << n;
  for (let i = 0; i < dim; i++) {
    const bit = (i >> (n - 1 - qubit)) & 1;
    const other = i & ~(1 << (n - 1 - qubit));
    const idx0 = other;
    const idx1 = other | (1 << (n - 1 - qubit));
    if (bit === 1) continue;
    const a0 = amplitudes[idx0];
    const a1 = amplitudes[idx1];
    if (H) {
      if (toBasis) {
        amplitudes[idx0] = C.scale(SQ2, C.add(a0, a1));
        amplitudes[idx1] = C.scale(SQ2, C.sub(a0, a1));
      } else {
        amplitudes[idx0] = C.scale(SQ2, C.add(a0, a1));
        amplitudes[idx1] = C.scale(SQ2, C.sub(a0, a1));
      }
    } else {
      // Y basis: |i> = (|0> + i|1>)/sqrt2
      if (toBasis) {
        amplitudes[idx0] = C.scale(SQ2, C.add(a0, C.mul(C.i(), a1)));
        amplitudes[idx1] = C.scale(SQ2, C.sub(C.mul(C.i(), a0), a1));
      } else {
        amplitudes[idx0] = C.scale(SQ2, C.sub(a0, C.mul(C.i(), a1)));
        amplitudes[idx1] = C.scale(SQ2, C.add(C.mul(C.i(), a0), a1));
      }
    }
  }
  return fromAmplitudes(n, amplitudes);
}

const SQ2 = 1 / Math.sqrt(2);

export function singleQubitMeasurementProbabilities(
  alpha: Complex,
  beta: Complex,
  basis: MeasurementBasis
): Record<string, number> {
  const state = normalize(singleQubitState(alpha, beta));
  if (basis === 'Z') {
    return { '0': C.mag2(state.amplitudes[0]), '1': C.mag2(state.amplitudes[1]) };
  }
  const a = state.amplitudes[0];
  const b = state.amplitudes[1];
  if (basis === 'X') {
    const plus = C.scale(SQ2, C.add(a, b));
    const minus = C.scale(SQ2, C.sub(a, b));
    return { '+': C.mag2(plus), '-': C.mag2(minus) };
  }
  const iState = C.scale(SQ2, C.add(a, C.mul(C.i(), b)));
  const miState = C.scale(SQ2, C.sub(a, C.mul(C.i(), b)));
  return { i: C.mag2(iState), '-i': C.mag2(miState) };
}

export function isProductState(state: StateVector): boolean {
  if (state.n === 1) return true;
  if (state.n === 2) {
    const c = state.amplitudes;
    return Math.abs(C.mul(c[0], c[3]).re - C.mul(c[1], c[2]).re) < 1e-8 &&
      Math.abs(C.mul(c[0], c[3]).im - C.mul(c[1], c[2]).im) < 1e-8;
  }
  return false; // simplified for n>2
}

export function tensorProduct(a: StateVector, b: StateVector): StateVector {
  return fromAmplitudes(a.n + b.n, kronVec(a.amplitudes, b.amplitudes));
}

export const BellStates = {
  phiPlus: () => normalize(fromAmplitudes(2, [
    C.scale(SQ2, C.one()), C.zero(), C.zero(), C.scale(SQ2, C.one()),
  ])),
  phiMinus: () => normalize(fromAmplitudes(2, [
    C.scale(SQ2, C.one()), C.zero(), C.zero(), C.scale(-SQ2, C.one()),
  ])),
  psiPlus: () => normalize(fromAmplitudes(2, [
    C.zero(), C.scale(SQ2, C.one()), C.scale(SQ2, C.one()), C.zero(),
  ])),
  psiMinus: () => normalize(fromAmplitudes(2, [
    C.zero(), C.scale(SQ2, C.one()), C.scale(-SQ2, C.one()), C.zero(),
  ])),
};
