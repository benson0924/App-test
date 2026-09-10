import type { TranslationTree } from '@/i18n/types';

export const algorithms: TranslationTree = {
  "title": "Chapter 8: Quantum Algorithms",
  "intro": "Quantum algorithms exploit interference and phase kickback to extract structure from black-box oracles faster than classical query complexity allows. This chapter builds from the oracle model through early promise problems to Grover's unstructured search — the foundation for Shor and phase estimation in later chapters.",
  "labLink": "Open full lab: {{title}} →",
  "sections": {
    "8.1": {
      "title": "8.1 The Oracle Model",
      "paragraphs": {
        "p1": "An oracle is a reversible black-box unitary that encodes a classical function f : {0,1}ⁿ → {0,1}. The standard construction uses an ancilla qubit:",
        "p2": "Query complexity counts how many times an algorithm invokes U_f. This model abstracts away the internal structure of f — the algorithm must learn about f only through queries."
      },
      "workedExamples": {
        "phaseKickback": {
          "title": "Phase kickback with |−⟩ ancilla",
          "steps": {
            "0": {
              "label": "Prepare ancilla in |−⟩ = H|1⟩. A controlled-X (flip when f(x)=1) on |y⟩ becomes a controlled-Z on |x⟩.",
              "latex": "|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle"
            },
            "1": {
              "label": "Apply H to input: |+⟩ picks up phase (−1)^{f(0)}; |−⟩ picks up (−1)^{f(1)}.",
              "latex": "H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)"
            },
            "2": {
              "label": "For constant f (f(0)=f(1)): result is ±|+⟩ → measure |0⟩. For balanced f: result is ±|−⟩ → measure |1⟩.",
              "latex": "\\text{1 query distinguishes constant vs balanced (Deutsch)}"
            }
          }
        }
      },
      "widgets": {
        "phaseKickback": {
          "intro": "Oracle U_f|x,y⟩ = |x, y ⊕ f(x)⟩ flips the ancilla when f(x)=1. With ancilla in |−⟩, the flip becomes a phase on the input register — phase kickback.",
          "inputX": "Input x:",
          "setup": "Setup",
          "oracleAction": "Oracle action",
          "effectOnInput": "Effect on input",
          "ancilla0": "Ancilla |0⟩",
          "ancillaMinus": "Ancilla |−⟩",
          "noPhase": "No phase (bit flip only)",
          "controlledFlip": "Controlled flip on y → phase on x"
        }
      },
      "checkpoints": {
        "ancilla": {
          "question": "What state must the ancilla be in for phase kickback to occur?",
          "answer": "|−⟩",
          "hint": "Hadamard of |1⟩."
        }
      }
    },
    "8.2": {
      "title": "8.2 Deutsch's Algorithm",
      "paragraphs": {
        "p1": "Deutsch's problem (1985): given f: {0,1} → {0,1}, determine whether f is constant (f(0)=f(1)) or balanced (f(0)≠f(1)). There are exactly four such functions on one bit:"
      },
      "tables": {
        "deutsch": {
          "headers": {
            "0": "Function",
            "1": "f(0)",
            "2": "f(1)",
            "3": "Type"
          },
          "rows": {
            "0": {
              "name": "f₀(x) = 0",
              "f0": "0",
              "f1": "0",
              "type": "constant"
            },
            "1": {
              "name": "f₁(x) = 1",
              "f0": "0",
              "f1": "1",
              "type": "balanced"
            },
            "2": {
              "name": "f₂(x) = x",
              "f0": "0",
              "f1": "1",
              "type": "balanced"
            },
            "3": {
              "name": "f₃(x) = 1 ⊕ x",
              "f0": "1",
              "f1": "0",
              "type": "balanced"
            }
          }
        }
      },
      "expandables": {
        "classical": {
          "title": "Why classical needs 2 queries in the worst case",
          "p1": "A classical algorithm must evaluate f(0) and f(1) to distinguish constant from balanced. If it stops after one evaluation, the unseen input could still differ — the answer would be wrong. Deutsch achieves certainty with a single oracle call by using superposition and interference."
        }
      },
      "widgets": {
        "deutsch": {
          "selectFn": "Select Boolean function f: {0,1} → {0,1}",
          "circuit": "Circuit: |0⟩|1⟩ → X on ancilla → H⊗H → U_f (phase oracle) → H on input → measure input.",
          "measured": "Measured input qubit:",
          "reports": "algorithm reports",
          "trueLabel": "True label:",
          "classicalNote": "Classical worst case: 2 oracle queries (evaluate f(0) and f(1)). Deutsch: 1 query."
        }
      },
      "labs": {
        "deutsch": "Deutsch Algorithm"
      }
    },
    "8.3": {
      "title": "8.3 Deutsch–Jozsa Algorithm",
      "paragraphs": {
        "p1": "Generalizing to n input bits, the promise is that f is either constant (same value for all 2ⁿ inputs) or balanced (exactly 2ⁿ⁻¹ zeros and 2ⁿ⁻¹ ones). Without this promise, the problem is hard even quantumly.",
        "p2": "The circuit mirrors Deutsch: prepare |−⟩ ancilla, apply H⊗ⁿ, oracle, H⊗ⁿ. Constant functions yield |0…0⟩ with certainty; balanced functions never yield all zeros."
      },
      "widgets": {
        "dj": {
          "inputSize": "Input register size n = {{n}}",
          "constantF": "Constant f",
          "balancedF": "Balanced f",
          "promise": "Promise: f is either constant (same output for all x) or balanced (exactly half 0s, half 1s).",
          "returns": "Deutsch–Jozsa returns:",
          "quantumNote": "Quantum: 1 query. Classical worst case: 2^{n-1}+1 queries."
        }
      },
      "checkpoints": {
        "constant": {
          "question": "What measurement outcome proves f is constant in Deutsch–Jozsa?",
          "answer": "|0⟩⊗n",
          "hint": "All-zero on the input register."
        }
      },
      "labs": {
        "deutsch-jozsa": "Deutsch–Jozsa"
      }
    },
    "8.4": {
      "title": "8.4 Bernstein–Vazirani Algorithm",
      "paragraphs": {
        "p1": "Given oracle access to f(x) = s · x (mod 2) (inner product mod 2 of n-bit strings), recover the hidden string s ∈ {0,1}ⁿ.",
        "p2": "Classically, learning s requires querying f with each standard basis vector e_i — n queries. Bernstein–Vazirani needs only one."
      },
      "workedExamples": {
        "recoverS": {
          "title": "Recover s in one query",
          "steps": {
            "0": {
              "label": "Prepare |+⟩⊗ⁿ and |−⟩ ancilla (same as Deutsch–Jozsa setup)."
            },
            "1": {
              "label": "The phase oracle implements (−1)^{s·x} on each basis state |x⟩."
            },
            "2": {
              "label": "After inverse Hadamards, the amplitude of |x⟩ is concentrated on x = s. Measure to read s.",
              "latex": "H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle"
            }
          }
        }
      },
      "widgets": {
        "bv": {
          "hiddenString": "Hidden string s (bits):",
          "oracle": "Oracle: f(x) = s · x (mod 2) = ⊕_i s_i x_i",
          "recovered": "After H⊗ⁿ → oracle → H⊗ⁿ, measurement yields s directly. Recovered:"
        }
      },
      "labs": {
        "bernstein-vazirani": "Bernstein–Vazirani"
      }
    },
    "8.5": {
      "title": "8.5 Simon's Algorithm",
      "paragraphs": {
        "p1": "Simon's problem (1994): f: {0,1}ⁿ → {0,1}ⁿ is promised to be 2-to-1 with a hidden period s ∈ {0,1}ⁿ, s ≠ 0, such that f(x) = f(x ⊕ s) for all x.",
        "p2": "Classically, finding s requires ~2^{n/2} queries (birthday paradox). Simon's quantum algorithm finds s with O(n) oracle queries plus O(n) classical post-processing."
      },
      "expandables": {
        "gf2": {
          "title": "GF(2) linear algebra behind Simon",
          "p1": "Measurements yield random vectors y ∈ {0,1}ⁿ satisfying y · s = 0 (mod 2). Each query adds a linear constraint over GF(2). After ~n independent equations, Gaussian elimination over GF(2) recovers s.",
          "p2": "This hidden-period structure over abelian groups is the direct precursor to Shor's period finding over ℤ_N."
        }
      },
      "checkpoints": {
        "field": {
          "question": "What field is Simon's post-processing linear algebra performed over?",
          "answer": "GF(2)",
          "hint": "Bits with XOR as addition."
        }
      },
      "labs": {
        "simon": "Simon's Algorithm"
      }
    },
    "8.6": {
      "title": "8.6 Grover's Search Algorithm",
      "paragraphs": {
        "p1": "Grover (1996) searches an unstructured database of N = 2ⁿ items for a marked entry w, using O(√N) oracle queries — a quadratic speedup over classical O(N).",
        "p2": "Each Grover iteration G = D · O_w rotates the state vector toward |w⟩ by angle ≈ 2 arcsin(1/√N). The optimal iteration count is:"
      },
      "headings": {
        "uniformSuperposition": "Uniform superposition",
        "oracle": "Oracle O_w",
        "diffusion": "Diffusion operator D"
      },
      "expandables": {
        "overshooting": {
          "title": "Overshooting and optimality",
          "p1": "Grover search is a rotation in a two-dimensional subspace spanned by |w⟩ and |s'⟩ (uniform superposition with |w⟩ removed). Applying too many iterations rotates past |w⟩ — success probability decreases. Grover's algorithm is provably optimal for unstructured search: no quantum algorithm can do better than O(√N) queries."
        }
      },
      "widgets": {
        "grover": {
          "searchSpace": "Search space: n = {{n}} qubits, N = {{N}} states",
          "markedState": "Marked state |w⟩ = |{{label}}⟩",
          "iterations": "Grover iterations: {{iters}} (optimal ≈ {{optimal}} = ⌊π/4 · √N⌋)",
          "successProb": "P(success) = {{prob}}% (uniform start: {{uniform}}%)",
          "overshooting": "Overshooting: too many iterations rotate past the marked state — probability drops again."
        }
      },
      "checkpoints": {
        "queries": {
          "question": "How many queries does Grover need for N items (order of growth)?",
          "answer": "O(√N)",
          "hint": "Quadratic speedup over classical O(N)."
        }
      },
      "labs": {
        "grover": "Grover Search"
      }
    },
    "8.7": {
      "title": "8.7 Complexity Comparison",
      "paragraphs": {
        "p1": "The algorithms in this chapter illustrate different speedup types: constant-factor (Deutsch), polynomial (Bernstein–Vazirani), exponential in query complexity (Deutsch–Jozsa, Simon), quadratic (Grover), and super-polynomial (Shor, covered in Chapter 11)."
      },
      "headings": {
        "algorithmLabs": "Algorithm labs"
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "Problem",
            "1": "Classical (query/time)",
            "2": "Quantum",
            "3": "Speedup"
          },
          "rows": {
            "0": {
              "problem": "Deutsch (n=1)",
              "classical": "2 queries (worst)",
              "quantum": "1 query",
              "speedup": "2×"
            },
            "1": {
              "problem": "Deutsch–Jozsa",
              "classical": "2^{n−1}+1 (worst)",
              "quantum": "1 query",
              "speedup": "exponential"
            },
            "2": {
              "problem": "Bernstein–Vazirani",
              "classical": "n queries",
              "quantum": "1 query",
              "speedup": "n×"
            },
            "3": {
              "problem": "Simon's algorithm",
              "classical": "O(2^{n/2})",
              "quantum": "O(n) queries",
              "speedup": "exponential"
            },
            "4": {
              "problem": "Grover search",
              "classical": "O(N)",
              "quantum": "O(√N)",
              "speedup": "quadratic"
            },
            "5": {
              "problem": "Shor's factoring",
              "classical": "sub-exponential",
              "quantum": "poly(n)",
              "speedup": "super-polynomial"
            }
          }
        }
      },
      "labLinks": {
        "deutsch": "Deutsch Algorithm",
        "deutsch-jozsa": "Deutsch–Jozsa",
        "bernstein-vazirani": "Bernstein–Vazirani",
        "simon": "Simon's Algorithm",
        "grover": "Grover Search",
        "qft": "QFT Visualizer",
        "phase-estimation": "Phase Estimation"
      }
    }
  },
  "labels": {
    "constant": "constant",
    "balanced": "balanced"
  }
};
