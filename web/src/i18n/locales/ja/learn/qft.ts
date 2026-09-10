import type { TranslationTree } from '@/i18n/types';

export const qft: TranslationTree = {
  "title": "第9章：量子フーリエ変換",
  "intro": "量子フーリエ変換（QFT）は離散フーリエ変換の量子版です。計算基底状態をフーリエ基底状態に写し、位相推定、周期探索、ショアアルゴリズムのエンジンです。",
  "labLink": "フルラボを開く：{{title}} →",
  "sections": {
    "9.1": {
      "title": "9.1 定義と ω_N",
      "paragraphs": {
        "p1": "N = 2ⁿ に対し、N 次単位根を定義：",
        "p2": "n 量子ビットレジスタの QFT は計算基底 |x⟩ に次のように作用：",
        "p3": "QFT 行列 F_N の要素は F_kx = ω_N^{kx} / √N。例：N = {{N}}、k = {{k}}：ω_N^{kx} = e^{i·{{angle}}°}。"
      },
      "expandables": {
        "unitarity": {
          "title": "F_N のユニタリ性",
          "p1": "F_N の行（と列）は ∑_{x=0}^{N−1} ω_N^{x(k−k')} = N·δ_{kk'} により正規直交。したがって F_N†F_N = I——QFT は有効な量子ゲート。"
        }
      },
      "checkpoints": {
        "omega": {
          "question": "ω_N は N でどう表される？",
          "answer": "e^{2πi/N}",
          "hint": "原始 N 次単位根。"
        }
      }
    },
    "9.2": {
      "title": "9.2 測定の警告",
      "paragraphs": {
        "p1": "古典 FFT との重要な違い：QFT は測定された古典データではなく振幅を変換する。QFT 後、状態はすべてのフーリエ基底状態の重ね合わせ。",
        "p2": "入力 |x⟩ に対し、各出力振幅の大きさは 1/√N——x の情報は単一のピークではなく位相 ω_N^{xk} に符号化される。"
      },
      "warning": {
        "title": "警告：",
        "p1": "一度にすべての N 振幅は読めない。",
        "p2": "1 回の測定は確率 |⟨k|QFT|ψ⟩|² で 1 つの結果 k を返す。完全なフーリエスペクトルの抽出には状態の複数コピー、または k の特定ビットを 1 つずつ読む構造化アルゴリズム（例：位相推定）が必要。"
      },
      "widgets": {
        "amplitude": {
          "numQubits": "量子ビット数 n = {{n}}（N = {{N}}）",
          "inputState": "入力基底状態 |x⟩：x = {{x}} = |{{label}}⟩",
          "spread": "QFT 後、振幅はすべての {{N}} 基底状態に広がる——各 |k⟩ の確率は |⟨k|F_N|x⟩|² = 1/N。",
          "footnote": "1 回の測定で 1 つの k——1 回の実行からすべての N 振幅は読めない。QFT ラボは小さい n で完全状態ベクトルを視覚化。"
        }
      }
    },
    "9.3": {
      "title": "9.3 回路分解",
      "paragraphs": {
        "p1": "QFT は効率的な O(n²) ゲート回路を持つ——N = 2ⁿ に対して O(N²) の古典 DFT 行列乗算より指数的に速い。"
      },
      "workedExamples": {
        "twoQubit": {
          "title": "2 量子ビット QFT 回路",
          "steps": {
            "0": {
              "label": "量子ビット 0（ビッグエンディアンで MSB）に H を適用。"
            },
            "1": {
              "label": "量子ビット 1 に制御位相 R₂、量子ビット 0 制御：角度 π/2。",
              "latex": "R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}"
            },
            "2": {
              "label": "量子ビット 1 に H を適用。"
            },
            "3": {
              "label": "標準ビット順に合わせて量子ビットを SWAP（任意）。",
              "latex": "\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0"
            }
          }
        },
        "general": {
          "title": "一般 n 量子ビットパターン",
          "steps": {
            "0": {
              "label": "j = 0, …, n−1 に対し：量子ビット j に H、次に量子ビット j+1, …, n−1 から角度 π/2^{m−j−1} の制御位相 R_m。"
            },
            "1": {
              "label": "すべてのアダマールと位相の後、SWAP ゲートで量子ビット順を逆転。",
              "latex": "O(n^2) \\text{ gates total}"
            },
            "2": {
              "label": "各制御位相 R_d = diag(1, e^{2πi/2^d})。",
              "latex": "R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}"
            }
          }
        }
      },
      "expandables": {
        "product": {
          "title": "積表示",
          "p1": "この二進小数形式は位相推定に直接接続：各制御量子ビットが位相 φ の 1 ビットを捉える。"
        }
      }
    },
    "9.4": {
      "title": "9.4 逆 QFT",
      "paragraphs": {
        "p1": "逆 QFT（IQFT）は共役位相を使う——ω_N を ω_N^{−1} に置換：",
        "p2": "回路形式：ゲート順を逆にし、すべての位相角を共役（π/2^d → −π/2^d）。"
      },
      "widgets": {
        "iqft": {
          "fidelity": "|{{label}}⟩（n={{n}}）で QFT して IQFT：元の基底状態の保真度 = {{fidelity}}%（理想：100%）。"
        }
      },
      "checkpoints": {
        "exponent": {
          "question": "IQFT は QFT と指数でどう異なる？",
          "answer": "negative exponent",
          "hint": "2πixk/N の符号。"
        }
      }
    },
    "9.5": {
      "title": "9.5 周期探索との接続",
      "paragraphs": {
        "p1": "周期探索——サイモンとショアの核心——QFT を利用して重ね合わせ状態から周期性を抽出する。",
        "p2": "関連：周期エクスプローラと第11章：ショアアルゴリズム。"
      },
      "workedExamples": {
        "periodFinding": {
          "title": "周期探索の概略",
          "steps": {
            "0": {
              "label": "x 上に一様重ね合わせを準備、f(x) を補助量子ビットに計算（または位相オラクル）。"
            },
            "1": {
              "label": "補助を測定または破棄；入力レジスタは同じ f 値の x の重ね合わせ——周期状態に崩壊。",
              "latex": "\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle"
            },
            "2": {
              "label": "入力レジスタに QFT を適用。k が N/r の倍数でピーク。",
              "latex": "\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r"
            },
            "3": {
              "label": "k を測定；古典後処理（連分数）で周期 r を復元。",
              "latex": "r = N / \\gcd(k, N)"
            }
          }
        }
      },
      "expandables": {
        "hsp": {
          "title": "隠れ部分群の観点",
          "p1": "関数が ℤ_N（またはサイモンの ℤ_2ⁿ）の隠れ部分群 H の陪集合上で定数のとき QFT は成功。フーリエ基底状態の測定は H⊥ の情報を明らかに——ドイチ・ヨズサ、サイモン、ショアを隠れ部分群問題として統一。"
        }
      },
      "labs": {
        "qft": "QFT ビジュアライザ"
      },
      "links": {
        "periodFinding": "周期エクスプローラ",
        "shor": "第11章：ショアアルゴリズム"
      }
    }
  }
};
