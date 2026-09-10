import type { TranslationTree } from '@/i18n/types';

export const index: TranslationTree = {
  "title": "Learn",
  "intro": "Thirteen chapters progressing from classical computing through quantum algorithms and contemporary topics. Each chapter includes interactive elements, worked examples, and links to playground labs.",
  "chapterTag": "Ch. {{n}}",
  "fallbackDescription": "Interactive chapter with concept checks and labs.",
  "nav": {
    "home": "← Home",
    "start": "Classical Computing →"
  },
  "descriptions": {
    "/learn/classical": "Bits, binary arithmetic, logic gates, Boolean algebra, adders, reversibility, classical error correction, complexity classes, and Turing machines — the classical substrate quantum computing extends.",
    "/learn/one-qubit": "The qubit as a two-level quantum system: superposition, the Bloch sphere, measurement statistics, and the fundamental single-qubit gates X, Y, Z, H, and phase rotations.",
    "/learn/linear-algebra": "Complex numbers, vectors, matrices, inner products, eigenvalues, and tensor products — the mathematical language used throughout quantum computing.",
    "/learn/multiple-qubits": "Composite systems, tensor-product Hilbert spaces, multi-qubit gates, Bell states, and partial measurement on subsystems.",
    "/learn/circuits": "Quantum circuit model, universal gate sets, circuit depth and width, decomposition strategies, and how algorithms map to gate sequences.",
    "/learn/error-correction": "Quantum noise models, the no-cloning theorem, stabilizer codes, surface-code intuition, and the threshold theorem for fault tolerance.",
    "/learn/entanglement": "Entanglement measures, separability, Schmidt decomposition, EPR pairs, and why entanglement is a resource rather than a communication channel.",
    "/learn/protocols": "Quantum teleportation, superdense coding, Bell/CHSH tests, and BB84 quantum key distribution — protocols that use entanglement and measurement.",
    "/learn/algorithms": "Oracle model, Deutsch and Deutsch–Jozsa, Bernstein–Vazirani, Simon, and Grover search — early quantum speedups and query complexity.",
    "/learn/qft": "The quantum Fourier transform, phase kickback, QFT circuit construction, and its role as a subroutine in period finding and chemistry simulation.",
    "/learn/phase-estimation": "Quantum phase estimation: estimating eigenvalues of unitaries, precision scaling, and connection to Hamiltonian simulation.",
    "/learn/shor": "Shor's factoring algorithm — modular exponentiation, period finding via QFT, and implications for public-key cryptography.",
    "/learn/modern": "Fault-tolerant roadmaps (2026), NISQ variational algorithms, quantum advantage claims, error-mitigation techniques, and open research frontiers."
  }
};
