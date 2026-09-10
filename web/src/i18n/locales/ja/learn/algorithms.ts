import type { TranslationTree } from '@/i18n/types';

export const algorithms: TranslationTree = {
  "title": "第8章：量子アルゴリズム",
  "intro": "量子アルゴリズムは干渉と位相キックバックを利用し、ブラックボックスオラクルから古典のクエリ計算量より速く構造を抽出します。本章はオラクルモデルから初期の約束問題、Grover の非構造探索へ——後の Shor と位相推定の基盤です。",
  "labLink": "フルラボを開く：{{title}} →",
  "sections": {
    "8.1": {
      "title": "8.1 オラクルモデル",
      "paragraphs": {
        "p1": "オラクルは古典関数 f : {0,1}ⁿ → {0,1} を符号化する可逆ブラックボックスユニタリです。標準構成は補助量子ビットを使います：",
        "p2": "クエリ計算量はアルゴリズムが U_f を呼ぶ回数を数えます。このモデルは f の内部構造を抽象化——アルゴリズムはクエリだけで f について学ぶ必要があります。"
      },
      "workedExamples": {
        "phaseKickback": {
          "title": "|−⟩ 補助量子ビットでの位相キックバック",
          "steps": {
            "0": {
              "label": "補助量子ビットを |−⟩ = H|1⟩ に準備。f(x)=1 のとき |y⟩ への制御 X（反転）が |x⟩ への制御 Z になる。",
              "latex": "|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle"
            },
            "1": {
              "label": "入力に H を適用：|+⟩ は位相 (−1)^{f(0)}；|−⟩ は (−1)^{f(1)}。",
              "latex": "H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)"
            },
            "2": {
              "label": "定数 f (f(0)=f(1))：結果は ±|+⟩ → |0⟩ を測定。平衡 f：結果は ±|−⟩ → |1⟩ を測定。",
              "latex": "\\text{1 query distinguishes constant vs balanced (Deutsch)}"
            }
          }
        }
      },
      "widgets": {
        "phaseKickback": {
          "intro": "オラクル U_f|x,y⟩ = |x, y ⊕ f(x)⟩ は f(x)=1 のとき補助量子ビットを反転。|−⟩ の補助では反転が入力レジスタの位相になる——位相キックバック。",
          "inputX": "入力 x：",
          "setup": "セットアップ",
          "oracleAction": "オラクル作用",
          "effectOnInput": "入力への効果",
          "ancilla0": "補助 |0⟩",
          "ancillaMinus": "補助 |−⟩",
          "noPhase": "位相なし（ビット反転のみ）",
          "controlledFlip": "y への制御反転 → x の位相"
        }
      },
      "checkpoints": {
        "ancilla": {
          "question": "位相キックバックには補助量子ビットはどの状態である必要がある？",
          "answer": "|−⟩",
          "hint": "|1⟩ のアダマール。"
        }
      }
    },
    "8.2": {
      "title": "8.2 ドイチアルゴリズム",
      "paragraphs": {
        "p1": "ドイチ問題（1985）：f: {0,1} → {0,1} が定数 (f(0)=f(1)) か平衡 (f(0)≠f(1)) かを判定。1 ビットにはちょうど 4 つのこのような関数がある："
      },
      "tables": {
        "deutsch": {
          "headers": {
            "0": "関数",
            "1": "f(0)",
            "2": "f(1)",
            "3": "型"
          },
          "rows": {
            "0": {
              "name": "f₀(x) = 0",
              "f0": "0",
              "f1": "0",
              "type": "定数"
            },
            "1": {
              "name": "f₁(x) = 1",
              "f0": "0",
              "f1": "1",
              "type": "平衡"
            },
            "2": {
              "name": "f₂(x) = x",
              "f0": "0",
              "f1": "1",
              "type": "平衡"
            },
            "3": {
              "name": "f₃(x) = 1 ⊕ x",
              "f0": "1",
              "f1": "0",
              "type": "平衡"
            }
          }
        }
      },
      "expandables": {
        "classical": {
          "title": "古典が最悪で 2 クエリ必要な理由",
          "p1": "古典アルゴリズムは f(0) と f(1) を評価して定数と平衡を区別する必要がある。1 回の評価で止まれば、未見の入力はまだ異なる可能性があり——答えは間違う。ドイチは重ね合わせと干渉で 1 回のオラクル呼び出しで確実に判定する。"
        }
      },
      "widgets": {
        "deutsch": {
          "selectFn": "ブール関数 f を選択: {0,1} → {0,1}",
          "circuit": "回路：|0⟩|1⟩ → 補助 X → H⊗H → U_f（位相オラクル）→ 入力 H → 入力測定。",
          "measured": "測定された入力量子ビット：",
          "reports": "アルゴリズムは報告",
          "trueLabel": "真のラベル：",
          "classicalNote": "古典最悪：2 オラクルクエリ（f(0) と f(1) を評価）。ドイチ：1 クエリ。"
        }
      },
      "labs": {
        "deutsch": "ドイチアルゴリズム"
      }
    },
    "8.3": {
      "title": "8.3 ドイチ・ヨズサアルゴリズム",
      "paragraphs": {
        "p1": "n 入力ビットに一般化すると、約束は f が定数（すべての 2ⁿ 入力で同じ値）か平衡（ちょうど 2ⁿ⁻¹ 個の 0 と 2ⁿ⁻¹ 個の 1）のどちらか。この約束がないと、量子でも問題は困難。",
        "p2": "回路はドイチと同様：|−⟩ 補助を準備、H⊗ⁿ、オラクル、H⊗ⁿ。定数関数は確実に |0…0⟩；平衡関数は全ゼロにならない。"
      },
      "widgets": {
        "dj": {
          "inputSize": "入力レジスタサイズ n = {{n}}",
          "constantF": "定数 f",
          "balancedF": "平衡 f",
          "promise": "約束：f は定数（すべての x で同じ出力）か平衡（ちょうど半分 0、半分 1）。",
          "returns": "ドイチ・ヨズサは返す：",
          "quantumNote": "量子：1 クエリ。古典最悪：2^{n-1}+1 クエリ。"
        }
      },
      "checkpoints": {
        "constant": {
          "question": "ドイチ・ヨズサで f が定数であることを証明する測定結果は？",
          "answer": "|0⟩⊗n",
          "hint": "入力レジスタが全ゼロ。"
        }
      },
      "labs": {
        "deutsch-jozsa": "ドイチ・ヨズサ"
      }
    },
    "8.4": {
      "title": "8.4 バーンスタイン・ヴァジラニアルゴリズム",
      "paragraphs": {
        "p1": "オラクルアクセス f(x) = s · x (mod 2)（n ビット文字列の内積 mod 2）が与えられたとき、隠れ文字列 s ∈ {0,1}ⁿ を復元。",
        "p2": "古典では s を学ぶには各標準基底ベクトル e_i で f をクエリ——n クエリ。バーンスタイン・ヴァジラニは 1 回だけ。"
      },
      "workedExamples": {
        "recoverS": {
          "title": "1 クエリで s を復元",
          "steps": {
            "0": {
              "label": "|+⟩⊗ⁿ と |−⟩ 補助を準備（ドイチ・ヨズサと同じセットアップ）。"
            },
            "1": {
              "label": "位相オラクルは各基底状態 |x⟩ に (−1)^{s·x} を実装。"
            },
            "2": {
              "label": "逆アダマール後、|x⟩ の振幅は x = s に集中。測定で s を読む。",
              "latex": "H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle"
            }
          }
        }
      },
      "widgets": {
        "bv": {
          "hiddenString": "隠れ文字列 s（ビット）：",
          "oracle": "オラクル：f(x) = s · x (mod 2) = ⊕_i s_i x_i",
          "recovered": "H⊗ⁿ → オラクル → H⊗ⁿ の後、測定で直接 s。復元："
        }
      },
      "labs": {
        "bernstein-vazirani": "バーンスタイン・ヴァジラニ"
      }
    },
    "8.5": {
      "title": "8.5 サイモンアルゴリズム",
      "paragraphs": {
        "p1": "サイモン問題（1994）：f: {0,1}ⁿ → {0,1}ⁿ は 2 対 1 で隠れ周期 s ∈ {0,1}ⁿ, s ≠ 0 を持ち、すべての x で f(x) = f(x ⊕ s)。",
        "p2": "古典では s を見つけるには約 2^{n/2} クエリ（誕生日パラドックス）。サイモンの量子アルゴリズムは O(n) オラクルクエリと O(n) 古典後処理で s を見つける。"
      },
      "expandables": {
        "gf2": {
          "title": "サイモン背後の GF(2) 線形代数",
          "p1": "測定は y · s = 0 (mod 2) を満たすランダムベクトル y ∈ {0,1}ⁿ を生成。各クエリは GF(2) 上の線形制約を追加。約 n 個の独立方程式後、GF(2) ガウス消去で s を復元。",
          "p2": "アーベル群上のこの隠れ周期構造は、ℤ_N 上の Shor の周期探索の直接の前身。"
        }
      },
      "checkpoints": {
        "field": {
          "question": "サイモンの後処理線形代数はどの体上で行われる？",
          "answer": "GF(2)",
          "hint": "XOR を加算とするビット。"
        }
      },
      "labs": {
        "simon": "サイモンアルゴリズム"
      }
    },
    "8.6": {
      "title": "8.6 グローバー探索アルゴリズム",
      "paragraphs": {
        "p1": "Grover（1996）は N = 2ⁿ 項目の非構造データベースでマーク項目 w を探索し、O(√N) オラクルクエリを使用——古典 O(N) に対する二次加速。",
        "p2": "各 Grover 反復 G = D · O_w は約 2 arcsin(1/√N) の角度で状態ベクトルを |w⟩ に向けて回転。最適反復回数は："
      },
      "headings": {
        "uniformSuperposition": "一様重ね合わせ",
        "oracle": "オラクル O_w",
        "diffusion": "拡散演算子 D"
      },
      "expandables": {
        "overshooting": {
          "title": "オーバーシュートと最適性",
          "p1": "Grover 探索は |w⟩ と |s'⟩（|w⟩ を除いた一様重ね合わせ）が張る 2 次元部分空間での回転。反復が多すぎると |w⟩ を通り過ぎる——成功確率が下がる。Grover は非構造探索で証明的に最適：O(√N) クエリより良い量子アルゴリズムはない。"
        }
      },
      "widgets": {
        "grover": {
          "searchSpace": "探索空間：n = {{n}} 量子ビット、N = {{N}} 状態",
          "markedState": "マーク状態 |w⟩ = |{{label}}⟩",
          "iterations": "Grover 反復：{{iters}}（最適 ≈ {{optimal}} = ⌊π/4 · √N⌋）",
          "successProb": "P(成功) = {{prob}}%（一様開始：{{uniform}}%）",
          "overshooting": "オーバーシュート：反復が多すぎるとマーク状態を通り過ぎる——確率が再び下がる。"
        }
      },
      "checkpoints": {
        "queries": {
          "question": "Grover は N 項目に何クエリ必要（増大の次数）？",
          "answer": "O(√N)",
          "hint": "古典 O(N) に対する二次加速。"
        }
      },
      "labs": {
        "grover": "グローバー探索"
      }
    },
    "8.7": {
      "title": "8.7 計算量比較",
      "paragraphs": {
        "p1": "本章のアルゴリズムは異なる加速型を示す：定数倍（ドイチ）、多項式（バーンスタイン・ヴァジラニ）、クエリ計算量で指数（ドイチ・ヨズサ、サイモン）、二次（Grover）、超多項式（Shor、第11章）。"
      },
      "headings": {
        "algorithmLabs": "アルゴリズムラボ"
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "問題",
            "1": "古典（クエリ/時間）",
            "2": "量子",
            "3": "加速"
          },
          "rows": {
            "0": {
              "problem": "ドイチ (n=1)",
              "classical": "2 クエリ（最悪）",
              "quantum": "1 クエリ",
              "speedup": "2×"
            },
            "1": {
              "problem": "ドイチ・ヨズサ",
              "classical": "2^{n−1}+1（最悪）",
              "quantum": "1 クエリ",
              "speedup": "指数"
            },
            "2": {
              "problem": "バーンスタイン・ヴァジラニ",
              "classical": "n クエリ",
              "quantum": "1 クエリ",
              "speedup": "n×"
            },
            "3": {
              "problem": "サイモンアルゴリズム",
              "classical": "O(2^{n/2})",
              "quantum": "O(n) クエリ",
              "speedup": "指数"
            },
            "4": {
              "problem": "グローバー探索",
              "classical": "O(N)",
              "quantum": "O(√N)",
              "speedup": "二次"
            },
            "5": {
              "problem": "ショア因数分解",
              "classical": "準指数",
              "quantum": "poly(n)",
              "speedup": "超多項式"
            }
          }
        }
      },
      "labLinks": {
        "deutsch": "ドイチアルゴリズム",
        "deutsch-jozsa": "ドイチ・ヨズサ",
        "bernstein-vazirani": "バーンスタイン・ヴァジラニ",
        "simon": "サイモンアルゴリズム",
        "grover": "グローバー探索",
        "qft": "QFT ビジュアライザ",
        "phase-estimation": "位相推定"
      }
    }
  },
  "labels": {
    "constant": "定数",
    "balanced": "平衡"
  }
};
