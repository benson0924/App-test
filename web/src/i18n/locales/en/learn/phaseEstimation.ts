import type { TranslationTree } from '@/i18n/types';

export const phaseEstimation: TranslationTree = {
  "title": "Chapter 10: Quantum Phase Estimation",
  "intro": "Quantum Phase Estimation (QPE) reads out the eigenvalue phase of a unitary operator — the subroutine that connects the QFT to Shor's algorithm and quantum chemistry simulations.",
  "labLink": "Open full lab: {{title}} →",
  "sections": {
    "10.1": {
      "title": "10.1 Problem Statement",
      "paragraphs": {
        "p1": "Given a unitary U with eigenstate |u⟩ and eigenvalue e^{2πiφ}:",
        "p2": "The goal is to estimate the phase φ ∈ [0, 1) (as a fraction of a full rotation) to m bits of precision using m ancillary control qubits and O(m) controlled applications of U."
      },
      "expandables": {
        "whyPhases": {
          "title": "Why phases matter",
          "p1": "In Shor's algorithm, the modular multiplication unitary U|y⟩ = |ay mod N⟩ has eigenstates whose phases encode 1/r, where r is the period of a^x mod N. QPE extracts r, enabling factoring."
        }
      },
      "labs": {
        "phase-estimation": "Phase Estimation"
      }
    },
    "10.2": {
      "title": "10.2 The QPE Circuit",
      "paragraphs": {
        "p1": "The standard circuit uses m control qubits and one target qubit prepared in |u⟩:"
      },
      "workedExamples": {
        "controlledU": {
          "title": "Controlled-U powers",
          "steps": {
            "0": {
              "label": "Prepare m control qubits in |+⟩⊗ᵐ and target in eigenstate |u⟩.",
              "latex": "|+\\rangle^{\\otimes m}|u\\rangle"
            },
            "1": {
              "label": "Apply controlled-U^{2^j} from control qubit j (j = 0, …, m−1). Each control picks up phase e^{2πiφ·2^j}.",
              "latex": "|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle"
            },
            "2": {
              "label": "Control register becomes ∑_j e^{2πiφ·2^j}|j⟩ — a Fourier-like superposition encoding φ in binary.",
              "latex": "\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle"
            },
            "3": {
              "label": "Apply inverse QFT on controls. Measure to obtain m-bit binary approximation of φ.",
              "latex": "|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle"
            }
          }
        }
      },
      "checkpoints": {
        "afterControlledU": {
          "question": "What operation follows the controlled-U^{2^j} gates on the control register?",
          "answer": "inverse QFT",
          "hint": "Converts phase kickback into binary readout."
        }
      }
    },
    "10.3": {
      "title": "10.3 Binary Fraction Readout",
      "paragraphs": {
        "p1": "The measurement outcome is interpreted as a binary fraction:",
        "p2": "Control qubit j (0-indexed from the top) encodes bit φ_{j+1} — the j-th digit after the binary point. This is exactly the inverse QFT extracting each bit of the phase."
      },
      "expandables": {
        "kickback": {
          "title": "Phase kickback connection",
          "p1": "Each controlled-U^{2^j} kicks back phase e^{2πiφ·2^j} onto control qubit j when the target is in |u⟩. The inverse QFT reverses the QFT on these phases, concentrating amplitude on the basis state whose binary label best approximates φ."
        }
      }
    },
    "10.4": {
      "title": "10.4 Worked Example: φ = 1/3",
      "paragraphs": {
        "p1": "Run the demo above with φ = 1/3 and m = 6 to see the simulated estimate, binary string, and error from our quantum-core phase estimation routine."
      },
      "workedExamples": {
        "phiThird": {
          "title": "Estimating φ = 1/3 with m = 6 qubits",
          "steps": {
            "0": {
              "label": "Write φ = 1/3 in binary: 0.010101… (repeating).",
              "latex": "\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2"
            },
            "1": {
              "label": "U|u⟩ = e^{2πi/3}|u⟩. Controlled-U^{2^0} adds phase e^{2πi/3}; U^{2^1} adds e^{4πi/3}; etc.",
              "latex": "e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}"
            },
            "2": {
              "label": "After inverse QFT with m = 6, measurement yields ≈ 0.010101 = 21/64 ≈ 0.328.",
              "latex": "\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125"
            },
            "3": {
              "label": "Error |1/3 − 21/64| ≈ 0.005. Adding qubits improves accuracy.",
              "latex": "|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}"
            }
          }
        }
      },
      "widgets": {
        "demo": {
          "truePhase": "True phase φ = {{phi}} (fraction of full rotation)",
          "precisionQubits": "Precision qubits m = {{m}}",
          "truePhiBinary": "True φ (binary)",
          "estimatedPhi": "Estimated φ",
          "measuredBits": "Measured bit string",
          "error": "|φ − φ̂|",
          "footnote": "With m precision qubits, readout approximates φ to m binary digits after the decimal point."
        }
      }
    },
    "10.5": {
      "title": "10.5 Precision vs Qubit Count",
      "paragraphs": {
        "p1": "With m precision qubits, QPE approximates φ to m binary digits (under ideal conditions):"
      },
      "tables": {
        "precision": {
          "headers": {
            "0": "Precision qubits m",
            "1": "Max error 2^{−m}",
            "2": "Example"
          },
          "rows": {
            "0": {
              "m": "4",
              "error": "0.0625",
              "example": "Coarse phase estimate"
            },
            "1": {
              "m": "8",
              "error": "≈ 0.004",
              "example": "Moderate precision"
            },
            "2": {
              "m": "12",
              "error": "≈ 0.00024",
              "example": "Shor-scale periods"
            },
            "3": {
              "m": "2n + ⌈log(1/ε)⌉",
              "error": "ε",
              "example": "Standard complexity bound"
            }
          }
        }
      },
      "expandables": {
        "success": {
          "title": "Success probability and repetitions",
          "p1": "QPE succeeds with high probability when the target is exactly an eigenstate. For Shor, eigenstates are approximated; the algorithm repeats O(log N) times and uses continued fractions to recover r from measured phases. Total cost: O(n² log N) gates for factoring an n-bit number N."
        }
      },
      "checkpoints": {
        "bits": {
          "question": "How many bits of φ does m precision qubits provide (ideally)?",
          "answer": "m"
        }
      }
    },
    "10.6": {
      "title": "10.6 Role in Shor's Algorithm",
      "paragraphs": {
        "p1": "Shor's factoring algorithm reduces to: find period r of f(x) = a^x mod N, then compute gcd(a^{r/2} ± 1, N). The modular multiplication unitary",
        "p2": "has eigenphases s/r for integers s. QPE estimates s/r; continued fractions extract r.",
        "p3": "Next: Chapter 11 — Shor's Algorithm · Period Explorer"
      },
      "expandables": {
        "modularMult": {
          "title": "Modular multiplication unitary",
          "p1": "Implementing controlled-U^{2^j} efficiently requires modular exponentiation circuits — the dominant gate cost in Shor. QPE wraps this arithmetic in a phase-estimation shell, turning period structure into measurable binary fractions."
        }
      },
      "labs": {
        "phase-estimation": "Phase Estimation"
      },
      "links": {
        "shor": "Chapter 11 — Shor's Algorithm",
        "periodFinding": "Period Explorer"
      }
    }
  }
};
