import type { TranslationTree } from '@/i18n/types';

export const protocols: TranslationTree = {
  "title": "Chapter 7: Quantum Protocols",
  "intro": "Entanglement and quantum channels enable communication primitives impossible classically — but never faster-than-light signaling. This chapter covers EPR paradox and hidden variables, the CHSH test, superdense coding, teleportation, and BB84 key distribution.",
  "labLink": "Open full lab: {{title}} →",
  "sections": {
    "7.1": {
      "title": "7.1 EPR and Local Hidden Variables",
      "paragraphs": {
        "p1": "The Einstein–Podolsky–Rosen (EPR) argument (1935) questioned whether quantum mechanics is complete. Consider the singlet state shared between Alice and Bob:",
        "p2": "Measuring Alice's qubit in the Z basis instantly determines Bob's outcome (anti-correlated). EPR asked: could pre-existing local hidden variables (LHV) explain these correlations without \"spooky action at a distance\"?"
      },
      "expandables": {
        "lhv": {
          "title": "Local hidden variable models",
          "p1": "An LHV model assigns each particle definite properties λ before measurement. Outcomes are functions A(a, λ) and B(b, λ) where a, b are measurement settings. Locality means Alice's outcome cannot depend on Bob's setting b, and vice versa."
        },
        "noSignaling": {
          "title": "No-signaling",
          "p1": "Although correlations are non-classical, Alice cannot send a message to Bob by choosing her measurement basis. Bob's marginal outcome statistics are independent of Alice's setting — only the correlations change. This is the no-signaling principle, preserved by quantum mechanics and required by relativity."
        }
      },
      "workedExamples": {
        "singlet": {
          "title": "Perfect anti-correlations in the singlet",
          "steps": {
            "0": {
              "label": "Alice and Bob share |Ψ⁻⟩ and measure in the same basis (e.g. Z).",
              "latex": "P(01) = P(10) = 0"
            },
            "1": {
              "label": "Outcomes are always opposite: Alice gets 0 ↔ Bob gets 1.",
              "latex": "A_Z B_Z = -1 \\text{ with certainty}"
            },
            "2": {
              "label": "This holds for any matched basis — but LHV models cannot reproduce all correlation patterns.",
              "latex": "\\text{See CHSH (Section 7.2)}"
            }
          }
        }
      },
      "checkpoints": {
        "signaling": {
          "question": "Can Alice signal Bob by choosing her measurement angle on a shared EPR pair?",
          "answer": "no",
          "hint": "Marginal statistics at Bob are unchanged."
        }
      }
    },
    "7.2": {
      "title": "7.2 CHSH Inequality and Tsirelson Bound",
      "paragraphs": {
        "p1": "Bell (1964) and CHSH (1969) showed that LHV models constrain correlation functions. Define the CHSH parameter:",
        "p2": "Any local hidden variable theory satisfies |S| ≤ 2. Quantum mechanics can violate this bound — the maximum quantum value is the Tsirelson bound:",
        "p3": "For a singlet state with optimal angles (a = 0, a' = π/4, b = π/8, b' = −π/8), quantum mechanics predicts S = 2√2 — maximal violation."
      },
      "expandables": {
        "noSignalingVsBell": {
          "title": "No-signaling vs Bell violation",
          "p1": "CHSH violation proves correlations cannot arise from any local hidden variable model — but it does not enable signaling. The no-signaling condition limits how much correlation can deviate from classical; Tsirelson's bound 2√2 is below the no-signaling limit of 4."
        }
      },
      "checkpoints": {
        "classicalBound": {
          "question": "What is the classical upper bound on |S|?",
          "answer": "2"
        }
      },
      "widgets": {
        "chsh": {
          "simulationTrials": "Simulation trials: {{trials}}",
          "classicalBound": "Classical bound: |S| ≤ 2. Quantum (Tsirelson): |S| ≤ 2√2 ≈ {{tsirelson}}. Simulated S ≈ {{s}}."
        }
      },
      "labs": {
        "chsh": "Bell/CHSH Experiment"
      }
    },
    "7.3": {
      "title": "7.3 Superdense Coding",
      "paragraphs": {
        "p1": "Superdense coding (Bennett & Wiesner, 1992) transmits two classical bits by sending one qubit, given a pre-shared ebit (entangled bit).",
        "p2": "The protocol consumes one ebit and one qubit transmission to send two bits — doubling classical channel capacity in this specific sense. Without pre-shared entanglement, sending two bits requires two qubits (each qubit carries at most one bit when measured in a fixed basis)."
      },
      "headings": {
        "encodingTable": "Encoding table"
      },
      "tables": {
        "superdense": {
          "headers": {
            "0": "Classical bits",
            "1": "Alice's gate",
            "2": "Shared state becomes"
          },
          "rows": {
            "0": {
              "bits": "00",
              "gate": "I",
              "state": "|Φ⁺⟩"
            },
            "1": {
              "bits": "01",
              "gate": "X",
              "state": "|Ψ⁺⟩"
            },
            "2": {
              "bits": "10",
              "gate": "Z",
              "state": "|Φ⁻⟩"
            },
            "3": {
              "bits": "11",
              "gate": "XZ (= iY)",
              "state": "|Ψ⁻⟩"
            }
          }
        }
      },
      "workedExamples": {
        "steps": {
          "title": "Superdense coding step-by-step",
          "steps": {
            "0": {
              "label": "Prepare shared Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 between Alice and Bob.",
              "latex": "|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "Alice encodes two classical bits (b₁b₂) by applying I, X, Z, or XZ to her qubit.",
              "latex": "00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ"
            },
            "2": {
              "label": "Alice sends her qubit to Bob (one qubit transmitted)."
            },
            "3": {
              "label": "Bob decodes with CNOT (Alice→Bob control) then H on his qubit, measuring both qubits to read (b₁b₂).",
              "latex": "(CNOT)(H \\otimes I) \\text{ reverses the encoding}"
            }
          }
        }
      },
      "expandables": {
        "noSignaling": {
          "title": "No-signaling in superdense coding",
          "p1": "The ebit must be established before encoding — typically by Alice and Bob meeting or using a quantum channel. The classical bits are not transmitted until Alice sends her qubit; the entanglement alone carries no usable classical information (no-signaling)."
        }
      },
      "labs": {
        "superdense": "Superdense Coding"
      }
    },
    "7.4": {
      "title": "7.4 Quantum Teleportation",
      "paragraphs": {
        "p1": "Teleportation (Bennett et al., 1993) transfers an unknown qubit state |ψ⟩ from Alice to Bob using one ebit and two classical bits — without physically moving the original particle and without cloning."
      },
      "headings": {
        "correctionTable": "Correction table"
      },
      "tables": {
        "teleport": {
          "headers": {
            "0": "m₁ (Alice)",
            "1": "m₂ (Alice)",
            "2": "Bob applies",
            "3": "Effect"
          },
          "rows": {
            "0": {
              "m1": "0",
              "m2": "0",
              "correction": "I",
              "note": "No change needed"
            },
            "1": {
              "m1": "0",
              "m2": "1",
              "correction": "X",
              "note": "Bit flip"
            },
            "2": {
              "m1": "1",
              "m2": "0",
              "correction": "Z",
              "note": "Phase flip"
            },
            "3": {
              "m1": "1",
              "m2": "1",
              "correction": "ZX (= iY)",
              "note": "Both flips"
            }
          }
        }
      },
      "workedExamples": {
        "algebra": {
          "title": "Teleportation algebra",
          "steps": {
            "0": {
              "label": "Start: Alice holds |ψ⟩ = α|0⟩ + β|1⟩; Alice & Bob share |Φ⁺⟩ on qubits 2,3.",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "Rewrite in Bell basis on Alice's qubits (1,2). Four Bell terms appear with distinct (m₁,m₂) outcomes.",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3"
            },
            "2": {
              "label": "Alice measures qubits 1,2 in Bell basis → outcomes m₁m₂. Bob's qubit becomes X^{m₂}Z^{m₁}|ψ⟩.",
              "latex": "\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle"
            },
            "3": {
              "label": "Alice sends (m₁,m₂) to Bob via classical channel. Bob applies the correction. Fidelity F = 1 for ideal devices.",
              "latex": "F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1"
            }
          }
        }
      },
      "expandables": {
        "noCloning": {
          "title": "No-cloning and no-signaling",
          "p1": "Teleportation destroys Alice's original state (by measurement) — consistent with the no-cloning theorem. The two classical bits carry no information about |ψ⟩ until Alice performs her measurement; Bob cannot decode before receiving them. No information travels faster than light."
        }
      },
      "checkpoints": {
        "classicalBits": {
          "question": "How many classical bits does teleportation require?",
          "answer": "2"
        }
      },
      "labs": {
        "teleportation": "Quantum Teleportation"
      }
    },
    "7.5": {
      "title": "7.5 BB84 Quantum Key Distribution",
      "paragraphs": {
        "p1": "BB84 (Bennett & Brassard, 1984) allows Alice and Bob to establish a shared secret key with information-theoretic security against passive eavesdropping — detecting Eve via elevated error rates."
      },
      "headings": {
        "basisEncoding": "Basis encoding"
      },
      "tables": {
        "basis": {
          "headers": {
            "0": "Bit",
            "1": "Z basis",
            "2": "X basis"
          },
          "rows": {
            "0": {
              "bit": "0",
              "z": "|0⟩",
              "x": "|+⟩"
            },
            "1": {
              "bit": "1",
              "z": "|1⟩",
              "x": "|−⟩"
            }
          }
        }
      },
      "workedExamples": {
        "protocol": {
          "title": "BB84 protocol",
          "steps": {
            "0": {
              "label": "Alice chooses random bits and random bases (Z or X) for each qubit, encodes, and sends."
            },
            "1": {
              "label": "Bob measures each qubit in a randomly chosen Z or X basis."
            },
            "2": {
              "label": "Alice and Bob publicly compare bases (not outcomes). Keep positions where bases matched — the sifted key."
            },
            "3": {
              "label": "Compare a random subset of sifted bits to estimate error rate. If too high, abort — possible eavesdropper."
            },
            "4": {
              "label": "Apply error correction and privacy amplification to obtain a final secret key."
            }
          }
        }
      },
      "expandables": {
        "eveAttack": {
          "title": "Eve's intercept–resend attack",
          "p1": "If Eve intercepts each qubit, measures in a random basis, and resends, she guesses wrong half the time. When Eve's basis ≠ Alice's, she randomizes the state — Bob's sifted key shows ~25% bit errors (50% wrong basis × 50% random outcome). Alice and Bob detect this and abort."
        },
        "security": {
          "title": "Security sketch and no-signaling",
          "p1": "BB84 security against passive eavesdropping is information-theoretic with ideal devices. Real deployments add authentication, error correction, and privacy amplification. The quantum channel enables key distribution; it does not allow instantaneous key extraction — classical communication is required for sifting and error estimation (no-signaling throughout)."
        }
      },
      "checkpoints": {
        "eveError": {
          "question": "What happens to the error rate when Eve intercepts BB84 qubits?",
          "answer": "increases",
          "hint": "Wrong-basis measurements disturb the state."
        }
      },
      "widgets": {
        "bb84": {
          "qubitsPerRun": "Qubits per run: {{num}}",
          "noEavesdropper": "No eavesdropper",
          "eveIntercepts": "Eve intercepts",
          "rerun": "Re-run",
          "siftedKey": "Sifted key length: {{length}} bits (≈ half of {{num}} — matching bases). Error rate on sifted bits: {{rate}}%",
          "eveDetected": " — elevated, Eve detected!",
          "footnote": "Eve measuring in a random basis disturbs states when her basis ≠ Alice's, introducing ~25% errors on sifted key."
        }
      },
      "labs": {
        "bb84": "BB84 Simulator"
      }
    }
  }
};
