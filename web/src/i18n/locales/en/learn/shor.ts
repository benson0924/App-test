import type { TranslationTree } from '@/i18n/types';

export const shor: TranslationTree = {
  "title": "Chapter 11: Shor's Algorithm",
  "intro": "Shor's algorithm (1994) factors large composite integers in polynomial time on a fault-tolerant quantum computer — threatening RSA and Diffie–Hellman. The quantum core is period finding via QPE; everything else is classical number theory.",
  "labLink": "Open full lab: {{title}} →",
  "sections": {
    "11.1": {
      "title": "11.1 Reduction to Period Finding",
      "paragraphs": {
        "p1": "To factor composite N, pick random a with 1 < a < N and gcd(a, N) = 1. If gcd(a, N) > 1, we already found a factor classically. Otherwise, find the smallest r > 0 such that:",
        "p2": "This r is the period (order) of a modulo N. Period finding is the hard quantum step; factoring from r uses classical gcd arithmetic."
      },
      "cards": {
        "quantum": {
          "title": "⚛ Quantum portion",
          "items": {
            "0": "Prepare superposition over x",
            "1": "Compute a^x mod N (modular exponentiation)",
            "2": "QPE + QFT to extract period r"
          }
        },
        "classical": {
          "title": "⚙ Classical portion",
          "items": {
            "0": "Choose random a, check gcd",
            "1": "Verify r is even, a^{r/2} ≢ −1",
            "2": "Compute gcd(a^{r/2} ± 1, N)",
            "3": "Repeat if trivial factors"
          }
        }
      },
      "labs": {
        "period-finding": "Period Explorer"
      }
    },
    "11.2": {
      "title": "11.2 From Period to Factors",
      "paragraphs": {
        "p1": "Given period r with a^r ≡ 1 (mod N), we have a^r − 1 ≡ 0 (mod N), so N divides (a^{r/2} − 1)(a^{r/2} + 1). If a^{r/2} ≢ −1 (mod N), then neither factor is a multiple of N, and gcd extracts non-trivial factors."
      },
      "workedExamples": {
        "conditions": {
          "title": "Conditions for successful factoring",
          "steps": {
            "0": {
              "label": "r must be even so that r/2 is an integer.",
              "latex": "r = 2k \\text{ for some integer } k"
            },
            "1": {
              "label": "a^{r/2} ≢ −1 (mod N). Otherwise both gcds equal 1 or N — trivial.",
              "latex": "a^{r/2} \\not\\equiv -1 \\pmod{N}"
            },
            "2": {
              "label": "If both conditions hold, gcd(a^{r/2} − 1, N) and gcd(a^{r/2} + 1, N) are non-trivial factors with probability ≥ 1/2 over random a.",
              "latex": "p \\cdot q = N"
            },
            "3": {
              "label": "If any condition fails, pick a new a and repeat. Expected O(1) trials.",
              "latex": "\\text{Repeat until success}"
            }
          }
        }
      },
      "expandables": {
        "minusOne": {
          "title": "Why a^{r/2} ≡ −1 causes failure",
          "p1": "If a^{r/2} ≡ −1 (mod N), then a^{r/2} + 1 ≡ 0 (mod N), so gcd(a^{r/2} + 1, N) = N — a trivial factor. Similarly gcd(a^{r/2} − 1, N) = 1. About half of valid periods yield useful factors; the rest require retrying with a different a."
        }
      },
      "checkpoints": {
        "gcd": {
          "question": "What gcd computation extracts a factor from period r?",
          "answer": "gcd(a^{r/2} ± 1, N)",
          "hint": "±1 from the a^r − 1 factorization."
        }
      }
    },
    "11.3": {
      "title": "11.3 Factoring 15: Interactive Walkthrough",
      "paragraphs": {
        "p1": "The canonical demo factors N = 15 with a = 2. The period of 2^x mod 15 is r = 4, yielding factors 3 and 5."
      },
      "workedExamples": {
        "summary": {
          "title": "a = 2, N = 15 (summary)",
          "steps": {
            "0": {
              "label": "Sequence 2^x mod 15: 1, 2, 4, 8, 1, … → period r = 4.",
              "latex": "2^4 \\equiv 1 \\pmod{15}"
            },
            "1": {
              "label": "r is even. a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15). ✓",
              "latex": "4 \\not\\equiv -1 \\pmod{15}"
            },
            "2": {
              "label": "gcd(4 − 1, 15) = gcd(3, 15) = 3.",
              "latex": "\\gcd(3, 15) = 3"
            },
            "3": {
              "label": "gcd(4 + 1, 15) = gcd(5, 15) = 5. Therefore 15 = 3 × 5.",
              "latex": "15 = 3 \\times 5"
            }
          }
        }
      },
      "widgets": {
        "stepper": {
          "intro": "Interactive walkthrough: Factor N = 15 with a = 2 (Shor's standard demo).",
          "classicalStep": "⚙ Classical step",
          "quantumStep": "⚛ Quantum step",
          "periodMark": " ← period!",
          "factors": "Factors:",
          "reset": "Reset",
          "next": "Next step →",
          "done": "Done",
          "steps": {
            "0": {
              "title": "Choose N and coprime a",
              "classical": "true",
              "content": "Pick composite N = 15. Choose a = 2 with gcd(2, 15) = 1."
            },
            "1": {
              "title": "Compute modular powers (classical check)",
              "classical": "true",
              "content": "Evaluate 2^x mod 15 for x = 0, 1, 2, … to spot repetition."
            },
            "2": {
              "title": "Quantum period finding",
              "classical": "false",
              "content": "QPE + QFT on U|y⟩ = |2^x · y mod 15⟩ estimates period r of 2^x mod 15."
            },
            "3": {
              "title": "Verify period r = 4",
              "classical": "true",
              "content": "2^4 mod 15 = 16 mod 15 = 1. Sequence: 1, 2, 4, 8, 1, …"
            },
            "4": {
              "title": "Check r is even",
              "classical": "true",
              "content": "r = 4 is even. If r were odd, restart with different a."
            },
            "5": {
              "title": "Compute a^{r/2} mod N",
              "classical": "true",
              "content": "2^{4/2} mod 15 = 2² mod 15 = 4."
            },
            "6": {
              "title": "Check a^{r/2} ≢ −1 (mod N)",
              "classical": "true",
              "content": "4 ≢ 14 (≡ −1 mod 15). If a^{r/2} ≡ −1, restart — no factors from this a."
            },
            "7": {
              "title": "Extract factors via gcd",
              "classical": "true",
              "content": "gcd(4 − 1, 15) = gcd(3, 15) = 3. gcd(4 + 1, 15) = gcd(5, 15) = 5."
            },
            "8": {
              "title": "Verify factorization",
              "classical": "true",
              "content": "15 = 3 × 5. Success!"
            }
          },
          "tableHeaders": {
            "0": "x",
            "1": "2^x mod 15"
          }
        }
      },
      "labs": {
        "shor": "Shor's Algorithm Demo"
      }
    },
    "11.4": {
      "title": "11.4 Complexity",
      "paragraphs": {
        "p1": "On a fault-tolerant quantum computer with O(n) qubits and poly(n) gates:",
        "p2": "The best known classical factoring (General Number Field Sieve) is sub-exponential: exp(O((log N)^{1/3})). Shor provides a super-polynomial speedup — the reason post-quantum cryptography migration is underway."
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "Component",
            "1": "Classical / Quantum",
            "2": "Cost"
          },
          "rows": {
            "0": {
              "component": "Choose a, gcd check",
              "type": "Classical",
              "cost": "O(log² N)"
            },
            "1": {
              "component": "Modular exponentiation circuit",
              "type": "Quantum",
              "cost": "O(n³) gates"
            },
            "2": {
              "component": "QPE + QFT",
              "type": "Quantum",
              "cost": "O(n² log N) gates"
            },
            "3": {
              "component": "Continued fractions",
              "type": "Classical",
              "cost": "O(n²)"
            },
            "4": {
              "component": "gcd(a^{r/2} ± 1, N)",
              "type": "Classical",
              "cost": "O(log² N)"
            }
          }
        }
      },
      "checkpoints": {
        "time": {
          "question": "Shor runs in what time on a fault-tolerant machine (in n = log N)?",
          "answer": "polynomial",
          "hint": "Poly(n) = poly(log N)."
        }
      }
    },
    "11.5": {
      "title": "11.5 Cryptographic Impact",
      "paragraphs": {
        "p1": "RSA, Diffie–Hellman, and elliptic-curve cryptography (via Shor's discrete-log variant) rely on the hardness of factoring or discrete logarithms. A large-scale fault-tolerant quantum computer running Shor would break these systems."
      },
      "headings": {
        "relatedLabs": "Related labs"
      },
      "expandables": {
        "pqc": {
          "title": "Post-quantum cryptography (PQC)",
          "p1": "NIST standardized post-quantum algorithms (2024) based on lattice problems, hash signatures, and code-based schemes — mathematical assumptions Shor does not attack. Migration to PQC is underway in government and industry standards.",
          "p2": "Important nuance: Today's NISQ devices cannot run full Shor on cryptographically relevant key sizes (2048-bit RSA). \"Harvest now, decrypt later\" threats motivate proactive migration, not panic about immediate breaks."
        },
        "periodHeart": {
          "title": "Period finding — the quantum heart",
          "p1": "The quantum subroutine estimates the period r of f(x) = a^x mod N using QPE on the modular multiplication unitary. The QFT converts periodic structure in x into peaks at multiples of N/r; continued fractions recover r from a measured phase. See Chapter 9 (QFT) and Chapter 10 (QPE)."
        }
      },
      "labLinks": {
        "shor": "Shor's Algorithm Demo (N=15)",
        "period-finding": "Period Explorer",
        "phase-estimation": "Phase Estimation",
        "qft": "QFT Visualizer"
      }
    }
  }
};
