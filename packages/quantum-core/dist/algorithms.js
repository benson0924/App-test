import { C } from './complex.js';
import { applySingleQubitGate } from './matrix.js';
import { Gates } from './gates.js';
import { fromAmplitudes, normalize, zeroState, } from './statevector.js';
import { applyCircuit, createCircuit } from './circuit.js';
const SQ2 = 1 / Math.sqrt(2);
/** Deutsch algorithm for n=1: determine constant vs balanced. */
export function deutschOracle(f) {
    return {
        n: 2,
        ops: [
            { type: 'gate', name: 'X', qubits: [1] },
            { type: 'gate', name: 'H', qubits: [0] },
            { type: 'gate', name: 'H', qubits: [1] },
            // Oracle as controlled phase
            ...(f(0) !== f(1)
                ? [{ type: 'gate', name: 'Z', qubits: [0] }]
                : []),
            { type: 'gate', name: 'H', qubits: [0] },
        ],
    };
}
export function runDeutsch(f) {
    let state = zeroState(2);
    state = fromAmplitudes(2, applySingleQubitGate(state.amplitudes, 2, 1, Gates.X));
    state = fromAmplitudes(2, applySingleQubitGate(state.amplitudes, 2, 0, Gates.H));
    state = fromAmplitudes(2, applySingleQubitGate(state.amplitudes, 2, 1, Gates.H));
    if (f(0) !== f(1)) {
        state = fromAmplitudes(2, applySingleQubitGate(state.amplitudes, 2, 0, Gates.Z));
    }
    state = fromAmplitudes(2, applySingleQubitGate(state.amplitudes, 2, 0, Gates.H));
    const p0 = C.mag2(state.amplitudes[0]) + C.mag2(state.amplitudes[1]);
    const measured = p0 > 0.5 ? '0' : '1';
    return { constant: measured === '0', measured };
}
/** Deutsch-Jozsa for small n. */
export function runDeutschJozsa(n, f) {
    const dim = 1 << (n + 1);
    let amps = Array.from({ length: dim }, () => C.zero());
    amps[0] = C.one();
    // Initialize |-> on ancilla
    const ancilla = n;
    const xMask = (1 << n) - 1;
    // Apply X then H to ancilla
    for (let i = 0; i < dim; i++) {
        if ((i >> (n - ancilla)) & 1) {
            amps[i] = C.scale(-1, amps[i]);
        }
    }
    // H on all qubits
    for (let q = 0; q <= n; q++) {
        const newAmps = [...amps];
        for (let i = 0; i < dim; i++) {
            newAmps[i] = C.zero();
        }
        for (let i = 0; i < dim; i++) {
            for (let b = 0; b < 2; b++) {
                const other = i & ~(1 << (n - q));
                const newI = other | (b << (n - q));
                const bit = (i >> (n - q)) & 1;
                newAmps[newI] = C.add(newAmps[newI], C.scale(SQ2, amps[i]));
                if (bit !== b)
                    newAmps[newI] = C.scale(-1, newAmps[newI]);
            }
        }
        amps = newAmps;
    }
    // Phase oracle
    for (let x = 0; x < (1 << n); x++) {
        if (f(x) === 1) {
            for (let i = 0; i < dim; i++) {
                if ((i & xMask) === x)
                    amps[i] = C.scale(-1, amps[i]);
            }
        }
    }
    // H on first n qubits
    for (let q = 0; q < n; q++) {
        const newAmps = [...amps];
        for (let i = 0; i < dim; i++)
            newAmps[i] = C.zero();
        for (let i = 0; i < dim; i++) {
            for (let b = 0; b < 2; b++) {
                const other = i & ~(1 << (n - q));
                const newI = other | (b << (n - q));
                const bit = (i >> (n - q)) & 1;
                newAmps[newI] = C.add(newAmps[newI], C.scale(SQ2, amps[i]));
                if (bit !== b)
                    newAmps[newI] = C.scale(-1, newAmps[newI]);
            }
        }
        amps = newAmps;
    }
    const pAllZero = C.mag2(amps[0]);
    return { balanced: pAllZero < 0.5 };
}
/** Bernstein-Vazirani: find secret string s. */
export function runBernsteinVazirani(n, secret) {
    const f = (x) => secret.reduce((acc, s, i) => acc ^ (s * ((x >> (n - 1 - i)) & 1)), 0);
    const result = runDeutschJozsa(n, f);
    // After DJ, measuring gives secret - simplified: compute via simulation
    const dim = 1 << n;
    let amps = Array.from({ length: dim }, () => C.zero());
    for (let i = 0; i < dim; i++)
        amps[i] = C.scale(SQ2, C.one());
    for (let x = 0; x < dim; x++) {
        if (f(x) === 1)
            amps[x] = C.scale(-1, amps[x]);
    }
    for (let q = 0; q < n; q++) {
        const newAmps = Array.from({ length: dim }, () => C.zero());
        for (let i = 0; i < dim; i++) {
            for (let b = 0; b < 2; b++) {
                const other = i & ~(1 << (n - 1 - q));
                const newI = other | (b << (n - 1 - q));
                const bit = (i >> (n - 1 - q)) & 1;
                newAmps[newI] = C.add(newAmps[newI], C.scale(SQ2, amps[i]));
                if (bit !== b)
                    newAmps[newI] = C.scale(-1, newAmps[newI]);
            }
        }
        amps = newAmps;
    }
    let maxIdx = 0;
    let maxP = 0;
    for (let i = 0; i < dim; i++) {
        const p = C.mag2(amps[i]);
        if (p > maxP) {
            maxP = p;
            maxIdx = i;
        }
    }
    return maxIdx.toString(2).padStart(n, '0').split('').map(Number);
}
/** Grover iteration count. */
export function groverIterations(n) {
    const N = 1 << n;
    return Math.floor((Math.PI / 4) * Math.sqrt(N));
}
/** Single Grover iteration on marked state |w>. */
export function groverStep(state, marked) {
    const n = state.n;
    const dim = 1 << n;
    // Oracle: flip phase of marked
    const amps = state.amplitudes.map((a, i) => i === marked ? C.scale(-1, a) : a);
    // Diffusion
    const mean = amps.reduce((s, a) => C.add(s, a), C.zero());
    const meanScale = C.scale(2 / dim, mean);
    const diffused = amps.map((a) => C.sub(C.scale(2, meanScale), a));
    // Correct diffusion: D = 2|s><s| - I
    const avg = amps.reduce((s, a) => s + a.re, 0) / dim;
    const avgIm = amps.reduce((s, a) => s + a.im, 0) / dim;
    const result = amps.map((a) => ({
        re: 2 * avg - a.re,
        im: 2 * avgIm - a.im,
    }));
    return normalize(fromAmplitudes(n, result));
}
export function runGrover(n, marked, iterations) {
    const dim = 1 << n;
    let amps = Array.from({ length: dim }, () => C.scale(1 / Math.sqrt(dim), C.one()));
    let state = fromAmplitudes(n, amps);
    const iters = iterations ?? groverIterations(n);
    for (let i = 0; i < iters; i++) {
        state = groverStep(state, marked);
    }
    return state;
}
/** QFT on amplitudes. */
export function qft(state) {
    const n = state.n;
    const N = 1 << n;
    const input = state.amplitudes;
    const output = Array.from({ length: N }, () => C.zero());
    for (let k = 0; k < N; k++) {
        for (let x = 0; x < N; x++) {
            const phase = (2 * Math.PI * x * k) / N;
            output[k] = C.add(output[k], C.mul(C.exp(phase), input[x]));
        }
        output[k] = C.scale(1 / Math.sqrt(N), output[k]);
    }
    return fromAmplitudes(n, output);
}
/** Inverse QFT. */
export function iqft(state) {
    const n = state.n;
    const N = 1 << n;
    const input = state.amplitudes;
    const output = Array.from({ length: N }, () => C.zero());
    for (let x = 0; x < N; x++) {
        for (let k = 0; k < N; k++) {
            const phase = (-2 * Math.PI * x * k) / N;
            output[x] = C.add(output[x], C.mul(C.exp(phase), input[k]));
        }
        output[x] = C.scale(1 / Math.sqrt(N), output[x]);
    }
    return fromAmplitudes(n, output);
}
/** Quantum phase estimation (simplified). */
export function phaseEstimation(phi, precisionQubits) {
    const m = precisionQubits;
    const n = m + 1;
    let state = zeroState(n);
    // Eigenstate on last qubit |1>
    state = fromAmplitudes(n, state.amplitudes.map((a, i) => (i & 1) === 1 ? C.one() : C.zero()));
    state = normalize(state);
    // H on control register
    for (let q = 0; q < m; q++) {
        state = fromAmplitudes(n, applySingleQubitGate(state.amplitudes, n, q, Gates.H));
    }
    // Controlled-U^(2^j) as phase on control
    for (let j = 0; j < m; j++) {
        const power = Math.pow(2, j);
        const angle = 2 * Math.PI * phi * power;
        for (let i = 0; i < (1 << n); i++) {
            if ((i >> (n - 1 - j)) & 1) {
                state.amplitudes[i] = C.mul(C.exp(angle), state.amplitudes[i]);
            }
        }
    }
    // Inverse QFT on control register (simplified measurement)
    const controlState = fromAmplitudes(m, state.amplitudes.slice(0, 1 << m).map((a) => ({ ...a })));
    const qftResult = iqft(controlState);
    let maxIdx = 0;
    let maxP = 0;
    for (let i = 0; i < (1 << m); i++) {
        const p = C.mag2(qftResult.amplitudes[i]);
        if (p > maxP) {
            maxP = p;
            maxIdx = i;
        }
    }
    const estimate = maxIdx / (1 << m);
    const binary = maxIdx.toString(2).padStart(m, '0');
    return { estimate, binary, error: Math.abs(phi - estimate) };
}
/** Modular exponentiation a^x mod N. */
export function modExp(a, x, N) {
    let result = 1;
    let base = a % N;
    let exp = x;
    while (exp > 0) {
        if (exp & 1)
            result = (result * base) % N;
        base = (base * base) % N;
        exp >>= 1;
    }
    return result;
}
/** Find period of a^x mod N. */
export function findPeriod(a, N) {
    const seen = new Map();
    let val = 1;
    for (let x = 0; x < N * N; x++) {
        val = (val * a) % N;
        if (seen.has(val))
            return x + 1 - (seen.get(val) ?? 0);
        seen.set(val, x + 1);
    }
    return 1;
}
export function gcd(a, b) {
    while (b) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
/** Shor factoring demo (classical period finding). */
export function shorFactor(N, a) {
    const base = a ?? 2;
    if (gcd(base, N) > 1)
        return { p: gcd(base, N), q: N / gcd(base, N), r: 1, a: base };
    const r = findPeriod(base, N);
    if (r % 2 !== 0)
        return null;
    const half = modExp(base, r / 2, N);
    if ((half + 1) % N === 0)
        return null;
    const p = gcd(half - 1, N);
    const q = gcd(half + 1, N);
    if (p <= 1 || q <= 1 || p * q !== N)
        return null;
    return { p, q, r, a: base };
}
/** CHSH correlation simulation. */
export function chshExperiment(a, b, ap, bp, trials) {
    const corr = (angleA, angleB) => {
        let sum = 0;
        for (let t = 0; t < trials; t++) {
            // Simulate singlet-like correlations
            const theta = Math.random() * 2 * Math.PI;
            const alice = Math.sign(Math.cos(theta - angleA)) >= 0 ? 1 : -1;
            const bob = Math.sign(Math.cos(theta - angleB + Math.PI)) >= 0 ? 1 : -1;
            sum += alice * bob;
        }
        return sum / trials;
    };
    const Eab = corr(a, b);
    const Eabp = corr(a, bp);
    const Eapb = corr(ap, b);
    const Eapbp = corr(ap, bp);
    const S = Eab + Eabp + Eapb - Eapbp;
    return {
        E: { 'E(a,b)': Eab, "E(a,b')": Eabp, "E(a',b)": Eapb, "E(a',b')": Eapbp },
        S,
    };
}
export function runBB84(numQubits, eveEnabled = false) {
    const aliceBits = Array.from({ length: numQubits }, () => Math.random() < 0.5 ? 0 : 1);
    const aliceBases = Array.from({ length: numQubits }, () => (Math.random() < 0.5 ? 'Z' : 'X'));
    const bobBases = Array.from({ length: numQubits }, () => (Math.random() < 0.5 ? 'Z' : 'X'));
    const bobResults = [];
    for (let i = 0; i < numQubits; i++) {
        let bit = aliceBits[i];
        if (aliceBases[i] === 'X')
            bit = bit; // encoded as +/-
        let measured = bit;
        if (eveEnabled && Math.random() < 0.5) {
            const eveBasis = Math.random() < 0.5 ? 'Z' : 'X';
            if (eveBasis !== aliceBases[i])
                measured = Math.random() < 0.5 ? 0 : 1;
        }
        if (bobBases[i] !== aliceBases[i]) {
            measured = Math.random() < 0.5 ? 0 : 1;
        }
        bobResults.push(measured);
    }
    const sifted = [];
    let errors = 0;
    let total = 0;
    for (let i = 0; i < numQubits; i++) {
        if (aliceBases[i] === bobBases[i]) {
            sifted.push(bobResults[i]);
            if (bobResults[i] !== aliceBits[i])
                errors++;
            total++;
        }
    }
    return {
        aliceBits, aliceBases, bobBases, bobResults,
        siftedKey: sifted,
        errorRate: total > 0 ? errors / total : 0,
        eveEnabled,
    };
}
/** Three-qubit bit-flip code syndrome. */
export function bitFlipSyndrome(errorQubit) {
    if (errorQubit === null)
        return [0, 0];
    if (errorQubit === 0)
        return [1, 1];
    if (errorQubit === 1)
        return [1, 0];
    return [0, 1];
}
export function applyBitFlipError(state, qubit) {
    return fromAmplitudes(state.n, applySingleQubitGate(state.amplitudes, state.n, qubit, Gates.X));
}
export { createCircuit, applyCircuit };
