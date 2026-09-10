import type { TranslationTree } from '@/i18n/types';

export const qft: TranslationTree = {
  "title": "Chapter 9: Quantum Fourier Transform",
  "intro": "The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform. It maps computational-basis states to Fourier-basis states and is the engine behind phase estimation, period finding, and Shor's algorithm.",
  "labLink": "Open full lab: {{title}} →",
  "sections": {
    "9.1": {
      "title": "9.1 Definition and ω_N",
      "paragraphs": {
        "p1": "For N = 2ⁿ, define the N-th root of unity:",
        "p2": "The QFT on an n-qubit register acts on computational basis |x⟩ as:",
        "p3": "The QFT matrix F_N has entries F_kx = ω_N^{kx} / √N. For example, with N = {{N}} and k = {{k}}: ω_N^{kx} = e^{i·{{angle}}°}."
      },
      "expandables": {
        "unitarity": {
          "title": "Unitarity of F_N",
          "p1": "The rows (and columns) of F_N are orthonormal because ∑_{x=0}^{N−1} ω_N^{x(k−k')} = N·δ_{kk'}. Therefore F_N†F_N = I — the QFT is a valid quantum gate."
        }
      },
      "checkpoints": {
        "omega": {
          "question": "What is ω_N in terms of N?",
          "answer": "e^{2πi/N}",
          "hint": "Primitive N-th root of unity."
        }
      }
    },
    "9.2": {
      "title": "9.2 The Measurement Warning",
      "paragraphs": {
        "p1": "A critical distinction from classical FFT: the QFT transforms amplitudes, not measured classical data. After QFT, the state is a superposition of all Fourier basis states.",
        "p2": "For input |x⟩, every output amplitude has magnitude 1/√N — the information about x is encoded in the phases ω_N^{xk}, not in a single peak."
      },
      "warning": {
        "title": "Warning:",
        "p1": "You cannot read all N amplitudes at once.",
        "p2": "A single measurement returns one outcome k with probability |⟨k|QFT|ψ⟩|². Extracting the full Fourier spectrum requires either many copies of the state or structured algorithms (e.g. phase estimation) that read out specific bits of k one at a time."
      },
      "widgets": {
        "amplitude": {
          "numQubits": "Number of qubits n = {{n}} (N = {{N}})",
          "inputState": "Input basis state |x⟩: x = {{x}} = |{{label}}⟩",
          "spread": "After QFT, amplitudes spread across all {{N}} basis states — each |k⟩ has probability |⟨k|F_N|x⟩|² = 1/N.",
          "footnote": "Measuring once yields one k — you cannot read all N amplitudes from a single run. The QFT lab visualizes full state vectors for small n."
        }
      }
    },
    "9.3": {
      "title": "9.3 Circuit Decomposition",
      "paragraphs": {
        "p1": "The QFT admits an efficient O(n²) gate circuit — exponentially faster than the O(N²) classical DFT matrix multiply for N = 2ⁿ."
      },
      "workedExamples": {
        "twoQubit": {
          "title": "2-qubit QFT circuit",
          "steps": {
            "0": {
              "label": "Apply H to qubit 0 (MSB in big-endian convention)."
            },
            "1": {
              "label": "Controlled phase R₂ on qubit 1, controlled by qubit 0: angle π/2.",
              "latex": "R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}"
            },
            "2": {
              "label": "Apply H to qubit 1."
            },
            "3": {
              "label": "Swap qubits to match standard bit ordering (optional).",
              "latex": "\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0"
            }
          }
        },
        "general": {
          "title": "General n-qubit pattern",
          "steps": {
            "0": {
              "label": "For j = 0, …, n−1: apply H to qubit j, then controlled phases R_m from qubits j+1, …, n−1 with angles π/2^{m−j−1}."
            },
            "1": {
              "label": "After all Hadamards and phases, apply SWAP gates to reverse qubit order.",
              "latex": "O(n^2) \\text{ gates total}"
            },
            "2": {
              "label": "Each controlled phase R_d = diag(1, e^{2πi/2^d}).",
              "latex": "R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}"
            }
          }
        }
      },
      "expandables": {
        "product": {
          "title": "Product representation",
          "p1": "This binary-fraction form connects directly to phase estimation: each control qubit captures one bit of a phase φ."
        }
      }
    },
    "9.4": {
      "title": "9.4 Inverse QFT",
      "paragraphs": {
        "p1": "The inverse QFT (IQFT) uses the conjugate phases — replace ω_N with ω_N^{−1}:",
        "p2": "In circuit form: reverse the gate order and conjugate every phase angle (π/2^d → −π/2^d)."
      },
      "widgets": {
        "iqft": {
          "fidelity": "QFT then IQFT on |{{label}}⟩ (n={{n}}): fidelity on original basis state = {{fidelity}}% (ideal: 100%)."
        }
      },
      "checkpoints": {
        "exponent": {
          "question": "How does the IQFT differ from the QFT in the exponent?",
          "answer": "negative exponent",
          "hint": "Sign of 2πixk/N."
        }
      }
    },
    "9.5": {
      "title": "9.5 Connection to Period Finding",
      "paragraphs": {
        "p1": "Period finding — the core of Simon's and Shor's algorithms — exploits the QFT to extract periodicity from superposition states.",
        "p2": "See also: Period Explorer and Chapter 11: Shor's Algorithm."
      },
      "workedExamples": {
        "periodFinding": {
          "title": "Period finding sketch",
          "steps": {
            "0": {
              "label": "Prepare uniform superposition over x, compute f(x) into ancilla (or use phase oracle)."
            },
            "1": {
              "label": "Measure or discard ancilla; input register collapses to superposition over x with the same f-value — a periodic state.",
              "latex": "\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle"
            },
            "2": {
              "label": "Apply QFT to the input register. Peaks appear at k multiples of N/r.",
              "latex": "\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r"
            },
            "3": {
              "label": "Measure k; classical post-processing (continued fractions) recovers period r.",
              "latex": "r = N / \\gcd(k, N)"
            }
          }
        }
      },
      "expandables": {
        "hsp": {
          "title": "Hidden subgroup perspective",
          "p1": "The QFT succeeds when the function is constant on cosets of a hidden subgroup H of ℤ_N (or ℤ_2ⁿ for Simon). Measuring Fourier basis states reveals information about H⊥ — unifying Deutsch–Jozsa, Simon, and Shor as hidden-subgroup problems."
        }
      },
      "labs": {
        "qft": "QFT Visualizer"
      },
      "links": {
        "periodFinding": "Period Explorer",
        "shor": "Chapter 11: Shor's Algorithm"
      }
    }
  }
};
