import type { TranslationTree } from '@/i18n/types';

export const modern: TranslationTree = {
  "title": "Chapter 12: Modern Topics (2026)",
  "intro": "A research-informed snapshot of quantum computing as of September 2026. Claims are tagged by evidence strength so you can distinguish textbook physics from vendor roadmaps and genuinely open problems.",
  "evidenceLabels": {
    "Established": "Established",
    "Peer-reviewed": "Peer-reviewed",
    "Industry claim": "Industry claim",
    "Open question": "Open question"
  },
  "footer": "Research cutoff: September 2026. Re-verify hardware and industry claims against peer-reviewed primary sources.",
  "sections": {
    "12.1": {
      "title": "Hardware Platforms",
      "paragraphs": {
        "p1": "Physical qubits are implemented on several competing platforms. Each trades off coherence, gate speed, connectivity, fabrication complexity, and control overhead differently."
      },
      "headings": {
        "superconducting": "Superconducting transmon qubits",
        "trappedIons": "Trapped ions",
        "neutralAtoms": "Neutral atoms (Rydberg arrays)",
        "photonic": "Photonic qubits"
      },
      "evidence": {
        "scEstablished": "Transmon circuits on microwave resonators are the dominant cloud-accessible platform (IBM, Google, Rigetti, and others). Two-qubit gates via cross-resonance or tunable couplers; typical T₁ ~ 50–300 μs and T₂ ~ 30–200 μs on leading devices (order-of-magnitude, device-dependent).",
        "scPeerReviewed": "Random circuit sampling milestones and small logical-qubit demonstrations have been published on superconducting hardware; read primary papers for qubit counts, fidelities, and verification methods.",
        "scIndustry": "Roadmaps projecting millions of physical qubits by ~2030 should be treated as engineering targets, not demonstrated capabilities.",
        "ionEstablished": "Ions confined in Paul traps offer long coherence (T₂ > 1 s in favorable conditions) and all-to-all connectivity via shared motional modes. Gate times are slower (~μs–ms) than superconducting.",
        "ionPeerReviewed": "IonQ, Quantinuum, and academic labs report high-fidelity two-qubit gates and algorithm demonstrations on chains of tens of ions.",
        "atomPeerReviewed": "Atoms in optical tweezers, excited to Rydberg states for entangling interactions, scale to hundreds–thousands of qubits with flexible 2D geometry. Native multi-qubit gates and analog Hamiltonian simulation are strengths.",
        "atomOpen": "Whether neutral-atom platforms achieve fault-tolerant logical qubits with competitive overheads relative to surface-code superconducting designs remains active research.",
        "photonEstablished": "Photons carry qubits in polarization or path encoding; room-temperature operation and natural networking are advantages. Probabilistic entangling gates (linear optics + post-selection) limit deterministic circuit depth without multiplexing.",
        "photonIndustry": "Photonic vendors emphasize scalability via chip integration and cluster-state architectures; independent benchmarking against other platforms is still maturing."
      },
      "expandables": {
        "otherPlatforms": {
          "title": "Other platforms: spin qubits & topological proposals",
          "p1": "Semiconductor spin qubits (Si/SiGe, donors) and topological Majorana proposals pursue long-lived qubits with CMOS-compatible fabrication.",
          "p2": "Topological protection at scale has not been experimentally confirmed; treat Majorana-based claims with extra scrutiny until reproducible evidence accumulates."
        }
      },
      "checkpoints": {
        "qubitCount": {
          "question": "Does a higher physical qubit count automatically mean a more powerful quantum computer?",
          "answer": "no",
          "hint": "Consider error rates, connectivity, and whether qubits are logical or physical."
        }
      }
    },
    "12.2": {
      "title": "Logical Qubits & Surface Codes",
      "paragraphs": {
        "p1": "Fault-tolerant quantum computation requires logical qubits encoded with redundancy so errors can be detected and corrected faster than they accumulate."
      },
      "evidence": {
        "established1": "The surface code is a leading 2D topological stabilizer code with a well-studied error threshold around ~1% (physical error rate per gate/measurement, model-dependent).",
        "peerReviewed": "Repeated syndrome extraction on distance-3 and distance-5 surface codes, demonstrating break-even or below-threshold logical error rates in isolated experiments, has been reported through 2025–2026.",
        "established2": "Encoding one logical qubit requires many physical qubits (distance d code: ~2d² physical qubits for a planar surface code layout) plus ancillas for syndrome measurement.",
        "open": "Million-logical-qubit machines capable of cryptographically relevant Shor runs are not available in 2026; resource estimates still point to 10⁶–10⁷ physical qubits for RSA-2048 factoring under optimistic assumptions."
      },
      "expandables": {
        "shorEstimate": {
          "title": "Resource estimate sketch (Shor on RSA-2048)",
          "p1": "Order-of-magnitude planning numbers from the literature (not a guarantee):",
          "items": {
            "0": "~4000–8000 logical qubits for modular exponentiation (algorithm-dependent)",
            "1": "Physical qubits per logical qubit: 1000–10000+ depending on code distance and cycle time",
            "2": "Total physical qubits: 10⁶–10⁸ range in published estimates"
          },
          "p2": "See recent surface-code resource papers for updated constants."
        }
      }
    },
    "12.3": {
      "title": "Noise Channels & Decoherence (T₁, T₂)",
      "paragraphs": {
        "p1": "Real qubits interact with their environment. Open-system dynamics are modeled by completely positive trace-preserving (CPTP) maps — quantum channels."
      },
      "evidence": {
        "t1t2": "T₁ (energy relaxation time): average time for |1⟩ → |0⟩ decay. T₂ (dephasing time): coherence decay in superposition; T₂ ≤ 2T₁ always.",
        "errorModels": "Common error models: bit-flip (X), phase-flip (Z), depolarizing (random Pauli), amplitude damping, and phase damping. Each channel has a Kraus operator representation.",
        "benchmarking": "Randomized benchmarking and gate set tomography characterize average gate error rates on hardware; reported fidelities of 99.5%–99.9% for single-qubit and 99%–99.9% for two-qubit gates on leading platforms."
      },
      "expandables": {
        "propagation": {
          "title": "Channel–circuit error propagation",
          "p1": "A circuit with depth D and per-gate error rate p suffers roughly O(D·p) accumulated error without correction. Coherence limits also cap circuit depth via T₂."
        }
      },
      "checkpoints": {
        "t2t1": {
          "question": "Can T2 be longer than 2 times T1?",
          "answer": "no",
          "hint": "Think about the relationship between energy relaxation and pure dephasing."
        }
      }
    },
    "12.4": {
      "title": "Error Mitigation vs. Error Correction",
      "evidence": {
        "mitigation": "Error mitigation (zero-noise extrapolation, probabilistic error cancellation, symmetry verification, readout error mitigation) reduces bias in noisy expectation values without full fault tolerance.",
        "correction": "Error correction (surface codes, LDPC codes, etc.) uses redundancy and syndrome measurement to protect quantum information arbitrarily long — provided physical error rates are below threshold and sufficient overhead is paid.",
        "peerReviewed": "Mitigation techniques have enabled useful chemistry and optimization experiments on NISQ devices with modest circuit depths; cost grows exponentially with depth in worst cases.",
        "open": "Whether mitigation alone can scale to classically intractable problems without correction is unsettled; most experts expect correction is required for long, precise computations."
      },
      "tables": {
        "compare": {
          "headers": {
            "0": "Feature",
            "1": "Mitigation",
            "2": "Correction"
          },
          "rows": {
            "0": {
              "feature": "Goal",
              "mitigation": "Better estimates from noisy runs",
              "correction": "Protect logical qubits"
            },
            "1": {
              "feature": "Overhead",
              "mitigation": "Extra shots / circuit variants",
              "correction": "Many physical qubits + ancillas"
            },
            "2": {
              "feature": "Depth limit",
              "mitigation": "Practical ceiling on NISQ",
              "correction": "Threshold theorem (in principle unbounded)"
            }
          }
        }
      },
      "checkpoints": {
        "zne": {
          "question": "Does zero-noise extrapolation create a logical qubit?",
          "answer": "no",
          "hint": "Mitigation post-processes measurement statistics; it does not encode redundancy."
        }
      }
    },
    "12.5": {
      "title": "Classical Simulation Limits (2ⁿ)",
      "evidence": {
        "exponential": "Exact simulation of an n-qubit pure state requires storing 2ⁿ complex amplitudes — memory and time scale exponentially in n for generic circuits.",
        "gottesmanKnill": "Clifford circuits (H, S, CNOT, Pauli measurements) simulate efficiently via the Gottesman–Knill theorem in O(n²) time — not all quantum advantage candidates are Clifford-only.",
        "tensor": "Tensor-network and approximate methods extend classical reach for structured circuits, but random-circuit sampling beyond ~50 qubits (depth-dependent) remains challenging on classical supercomputers.",
        "industry": "Claims of \"quantum supremacy\" or \"utility advantage\" must specify the classical comparison, verification method, and problem size — cross-check against independent classical simulations where published."
      }
    },
    "12.6": {
      "title": "Resource Estimation",
      "paragraphs": {
        "p1": "Before running Shor on RSA or large chemistry, practitioners estimate qubit count, gate count, wall-clock time, and error budget — often using the surface code as a reference architecture."
      },
      "evidence": {
        "scaling": "Logical error rate ε_L scales as (p/p_th)^((d+1)/2) for code distance d near threshold p_th (simplified scaling intuition).",
        "tools": "Open-source tools (e.g., Azure Quantum Resource Estimator, various academic calculators) implement updated gate counts from algorithm papers plus code-cycle times from hardware assumptions."
      },
      "expandables": {
        "inputs": {
          "title": "Key inputs to any resource estimate",
          "items": {
            "0": "Algorithm: qubits, T-count, T-depth, parallelization",
            "1": "Code: family, distance, cycle time, physical error rate",
            "2": "Classical co-processing: magic-state distillation factories, routing",
            "3": "Success probability and error budget per logical operation"
          }
        }
      }
    },
    "12.7": {
      "title": "Quantum Networking",
      "evidence": {
        "established": "Quantum networks distribute entanglement or secret keys between nodes. Components include quantum memories, repeaters, and quantum-classical interfaces.",
        "peerReviewed": "Entanglement distribution over metropolitan fiber (tens of km) and satellite links has been demonstrated; full quantum internet with fault-tolerant repeaters is not yet operational at scale.",
        "open": "Which architecture (trusted-node QKD vs. repeater-based entanglement swapping) dominates commercial deployment by 2030 remains unclear."
      }
    },
    "12.8": {
      "title": "Post-Quantum Cryptography",
      "evidence": {
        "shorThreat": "Shor's algorithm breaks RSA and elliptic-curve cryptography on a sufficiently large fault-tolerant machine. Harvest-now-decrypt-later threats motivate migration regardless of current hardware size.",
        "nist": "NIST standardized post-quantum classical algorithms (ML-KEM, ML-DSA, SLH-DSA, 2024) — lattice-based and hash-based schemes designed to resist known quantum attacks.",
        "separate": "Post-quantum cryptography (PQC) runs on classical computers; it is separate from quantum key distribution (QKD), which uses quantum states for key agreement under specific trust models."
      },
      "checkpoints": {
        "mlkem": {
          "question": "Does deploying ML-KEM require a quantum computer?",
          "answer": "no",
          "hint": "PQC algorithms are classical cryptographic standards."
        }
      }
    },
    "12.9": {
      "title": "Software Ecosystem",
      "evidence": {
        "qiskit": "Qiskit (IBM): dominant open SDK, transpilation, simulators, cloud backends, pulse-level control.",
        "cirq": "Cirq (Google): Python framework tuned for NISQ circuits and Google hardware.",
        "pennylane": "PennyLane (Xanadu): differentiable quantum programming, hybrid ML/quantum workflows.",
        "openqasm": "OpenQASM 3: interoperable circuit description language; adoption across vendors growing. QIR (LLVM-based) targets compiler toolchains.",
        "industry": "Vendor-specific cloud pricing, queue times, and claimed \"quantum advantage\" for customer workloads should be validated on your own problem instances."
      },
      "expandables": {
        "quantumCore": {
          "title": "This textbook's quantum-core",
          "p1": "Our in-browser quantum-core library provides pedagogical state-vector simulation, gate matrices, and algorithm demos. It is not a production SDK — use Qiskit/Cirq for hardware submission and large-scale simulation."
        }
      }
    },
    "12.10": {
      "title": "Fault Tolerance Status (2026)",
      "evidence": {
        "threshold": "Threshold theorems prove that if physical gate error rates are below a constant threshold, arbitrary long quantum computation is possible with polylog overhead in qubits and time.",
        "prototypes": "Early logical qubit prototypes with repeated error correction cycles exist; break-even (logical < physical error rate) has been achieved in specific demonstrations.",
        "industry": "Timelines for \"fault-tolerant quantum computing by [year]\" are corporate forecasts, not established science.",
        "open": "Which code family (surface, color, LDPC, bosonic) and platform wins on total system cost remains undecided."
      }
    },
    "12.11": {
      "title": "Quantum Advantage Benchmarks",
      "evidence": {
        "benchmarks": "Different benchmarks measure different things: random circuit sampling (RCS), quantum approximate optimization (QAOA), variational quantum eigensolver (VQE), quantum machine learning, and bespoke industry workloads.",
        "rcs": "Google's RCS experiments (2019, 2023+) show sampling from circuits hard to simulate classically for specific sizes — this is not general-purpose speedup on all NP-hard problems.",
        "industry": "\"Quantum utility\" or \"advantage\" press releases often compare against unoptimized classical baselines; always ask: optimized classical competitor? Verified result? Problem relevance?",
        "open": "Which application domains (catalysis, optimization, ML, finance) will show durable quantum advantage at economically meaningful scales is unknown as of September 2026."
      },
      "expandables": {
        "checklist": {
          "title": "Checklist for reading a quantum advantage claim",
          "items": {
            "0": "What exact problem and input size?",
            "1": "What metric (time, energy, solution quality)?",
            "2": "What classical algorithm was compared — best known or strawman?",
            "3": "Was the quantum result verified independently?",
            "4": "Does success require error mitigation only, or hypothetical fault tolerance?"
          }
        }
      },
      "checkpoints": {
        "rcs": {
          "question": "Does random circuit sampling prove that quantum computers solve all NP problems efficiently?",
          "answer": "no",
          "hint": "RCS is a specific sampling task; BQP vs NP is still unknown."
        }
      }
    }
  }
};
