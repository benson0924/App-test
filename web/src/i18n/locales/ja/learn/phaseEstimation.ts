import type { TranslationTree } from '@/i18n/types';

export const phaseEstimation: TranslationTree = {
  "title": "第10章：量子位相推定",
  "intro": "量子位相推定（QPE）はユニタリ演算子の固有値位相を読み出す——QFT とショアアルゴリズム、量子化学シミュレーションを結ぶサブルーチン。",
  "labLink": "フルラボを開く：{{title}} →",
  "sections": {
    "10.1": {
      "title": "10.1 問題設定",
      "paragraphs": {
        "p1": "固有状態 |u⟩ と固有値 e^{2πiφ} のユニタリ U が与えられたとき：",
        "p2": "m 個の補助制御量子ビットと O(m) 回の制御 U 適用で、位相 φ ∈ [0, 1)（完全回転の分数）を m ビット精度で推定する。"
      },
      "expandables": {
        "whyPhases": {
          "title": "位相が重要な理由",
          "p1": "ショアアルゴリズムでは、モジュラー乗算ユニタリ U|y⟩ = |ay mod N⟩ の固有状態の位相が 1/r を符号化し、r は a^x mod N の周期。QPE が r を抽出し、因数分解を可能にする。"
        }
      },
      "labs": {
        "phase-estimation": "位相推定"
      }
    },
    "10.2": {
      "title": "10.2 QPE 回路",
      "paragraphs": {
        "p1": "標準回路は m 制御量子ビットと |u⟩ に準備された 1 ターゲット量子ビットを使う："
      },
      "workedExamples": {
        "controlledU": {
          "title": "制御-U の累乗",
          "steps": {
            "0": {
              "label": "m 制御量子ビットを |+⟩⊗ᵐ、ターゲットを固有状態 |u⟩ に準備。",
              "latex": "|+\\rangle^{\\otimes m}|u\\rangle"
            },
            "1": {
              "label": "制御量子ビット j（j = 0, …, m−1）から制御-U^{2^j} を適用。各制御は位相 e^{2πiφ·2^j} を得る。",
              "latex": "|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle"
            },
            "2": {
              "label": "制御レジスタは ∑_j e^{2πiφ·2^j}|j⟩ になる——φ を二進で符号化するフーリエ型重ね合わせ。",
              "latex": "\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle"
            },
            "3": {
              "label": "制御に逆 QFT を適用。測定で φ の m ビット二進近似を得る。",
              "latex": "|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle"
            }
          }
        }
      },
      "checkpoints": {
        "afterControlledU": {
          "question": "制御レジスタで制御-U^{2^j} ゲートの後に何を行う？",
          "answer": "inverse QFT",
          "hint": "位相キックバックを二進読出しに変換。"
        }
      }
    },
    "10.3": {
      "title": "10.3 二進小数読出し",
      "paragraphs": {
        "p1": "測定結果は二進小数として解釈される：",
        "p2": "制御量子ビット j（上から 0 始まり）はビット φ_{j+1} を符号化——二進小数点後の j 桁目。これは逆 QFT が位相の各ビットを抽出するのと同じ。"
      },
      "expandables": {
        "kickback": {
          "title": "位相キックバックの接続",
          "p1": "ターゲットが |u⟩ のとき、各制御-U^{2^j} は制御量子ビット j に位相 e^{2πiφ·2^j} をキックバック。逆 QFT はこれらの位相の QFT を逆にし、二進ラベルが φ を最もよく近似する基底状態に振幅を集中させる。"
        }
      }
    },
    "10.4": {
      "title": "10.4 例：φ = 1/3",
      "paragraphs": {
        "p1": "上のデモで φ = 1/3、m = 6 を実行し、quantum-core 位相推定ルーチンのシミュレーション推定、二進文字列、誤差を確認。"
      },
      "workedExamples": {
        "phiThird": {
          "title": "m = 6 量子ビットで φ = 1/3 を推定",
          "steps": {
            "0": {
              "label": "φ = 1/3 を二進で書く：0.010101…（循環）。",
              "latex": "\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2"
            },
            "1": {
              "label": "U|u⟩ = e^{2πi/3}|u⟩。制御-U^{2^0} は位相 e^{2πi/3}；U^{2^1} は e^{4πi/3}；など。",
              "latex": "e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}"
            },
            "2": {
              "label": "m = 6 で逆 QFT 後、測定は ≈ 0.010101 = 21/64 ≈ 0.328。",
              "latex": "\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125"
            },
            "3": {
              "label": "誤差 |1/3 − 21/64| ≈ 0.005。量子ビットを増やすと精度向上。",
              "latex": "|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}"
            }
          }
        }
      },
      "widgets": {
        "demo": {
          "truePhase": "真の位相 φ = {{phi}}（完全回転の分数）",
          "precisionQubits": "精度量子ビット m = {{m}}",
          "truePhiBinary": "真の φ（二進）",
          "estimatedPhi": "推定 φ",
          "measuredBits": "測定ビット列",
          "error": "|φ − φ̂|",
          "footnote": "m 精度量子ビットで、小数点後 m 桁の二進で φ を近似読出し。"
        }
      }
    },
    "10.5": {
      "title": "10.5 精度と量子ビット数",
      "paragraphs": {
        "p1": "m 精度量子ビットで QPE は φ を m 桁の二進（理想条件下）で近似："
      },
      "tables": {
        "precision": {
          "headers": {
            "0": "精度量子ビット m",
            "1": "最大誤差 2^{−m}",
            "2": "例"
          },
          "rows": {
            "0": {
              "m": "4",
              "error": "0.0625",
              "example": "粗い位相推定"
            },
            "1": {
              "m": "8",
              "error": "≈ 0.004",
              "example": "中程度の精度"
            },
            "2": {
              "m": "12",
              "error": "≈ 0.00024",
              "example": "ショア級周期"
            },
            "3": {
              "m": "2n + ⌈log(1/ε)⌉",
              "error": "ε",
              "example": "標準計算量境界"
            }
          }
        }
      },
      "expandables": {
        "success": {
          "title": "成功確率と反復",
          "p1": "ターゲットが厳密に固有状態のとき QPE は高確率で成功。ショアでは固有状態は近似；アルゴリズムは O(log N) 回反復し連分数で測定位相から r を復元。総コスト：n ビット数 N の因数分解に O(n² log N) ゲート。"
        }
      },
      "checkpoints": {
        "bits": {
          "question": "m 精度量子ビットは理想に φ の何ビットを提供？",
          "answer": "m"
        }
      }
    },
    "10.6": {
      "title": "10.6 ショアアルゴリズムでの役割",
      "paragraphs": {
        "p1": "ショアの因数分解は：f(x) = a^x mod N の周期 r を見つけ、gcd(a^{r/2} ± 1, N) を計算に帰着。モジュラー乗算ユニタリ",
        "p2": "は整数 s の固有位相 s/r を持つ。QPE が s/r を推定；連分数が r を抽出。",
        "p3": "次：第11章——ショアアルゴリズム · 周期エクスプローラ"
      },
      "expandables": {
        "modularMult": {
          "title": "モジュラー乗算ユニタリ",
          "p1": "制御-U^{2^j} の効率的実装にはモジュラー指数回路が必要——ショアの主要ゲートコスト。QPE はこの演算を位相推定シェルで包み、周期構造を測定可能な二進小数に変換。"
        }
      },
      "labs": {
        "phase-estimation": "位相推定"
      },
      "links": {
        "shor": "第11章——ショアアルゴリズム",
        "periodFinding": "周期エクスプローラ"
      }
    }
  }
};
