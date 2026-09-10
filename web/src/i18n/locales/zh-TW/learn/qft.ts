import type { TranslationTree } from '@/i18n/types';

export const qft: TranslationTree = {
  "title": "第 9 章：量子傅立葉變換",
  "intro": "量子傅立葉變換（QFT）是離散傅立葉變換的量子類似物。它將計算基態映射到傅立葉基態，是相位估計、週期尋找與 Shor 演算法的核心。",
  "labLink": "開啟完整實驗：{{title}} →",
  "sections": {
    "9.1": {
      "title": "9.1 定義與 ω_N",
      "paragraphs": {
        "p1": "對 N = 2ⁿ，定義 N 次單位根：",
        "p2": "n 量子位元寄存器上的 QFT 對計算基 |x⟩ 的作用為：",
        "p3": "QFT 矩陣 F_N 的元素為 F_kx = ω_N^{kx} / √N。例如 N = {{N}}、k = {{k}}：ω_N^{kx} = e^{i·{{angle}}°}。"
      },
      "expandables": {
        "unitarity": {
          "title": "F_N 的酉性",
          "p1": "F_N 的行（與列）正交歸一，因為 ∑_{x=0}^{N−1} ω_N^{x(k−k')} = N·δ_{kk'}。因此 F_N†F_N = I——QFT 是有效的量子閘。"
        }
      },
      "checkpoints": {
        "omega": {
          "question": "ω_N 用 N 如何表示？",
          "answer": "e^{2πi/N}",
          "hint": "本原 N 次單位根。"
        }
      }
    },
    "9.2": {
      "title": "9.2 測量警告",
      "paragraphs": {
        "p1": "與古典 FFT 的關鍵區別：QFT 變換振幅，而非測量後的古典資料。QFT 後，狀態是所有傅立葉基態的疊加。",
        "p2": "對輸入 |x⟩，每個輸出振幅的幅度為 1/√N——關於 x 的資訊編碼在相位 ω_N^{xk} 中，而非單一峰值。"
      },
      "warning": {
        "title": "警告：",
        "p1": "無法一次讀出所有 N 個振幅。",
        "p2": "單次測量以機率 |⟨k|QFT|ψ⟩|² 回傳一個結果 k。提取完整傅立葉頻譜需要多份狀態副本，或結構化演算法（如相位估計）逐位讀出 k 的特定位元。"
      },
      "widgets": {
        "amplitude": {
          "numQubits": "量子位元數 n = {{n}}（N = {{N}}）",
          "inputState": "輸入基態 |x⟩：x = {{x}} = |{{label}}⟩",
          "spread": "QFT 後，振幅分散於全部 {{N}} 個基態——每個 |k⟩ 的機率為 |⟨k|F_N|x⟩|² = 1/N。",
          "footnote": "測量一次只得一個 k——無法從單次執行讀出所有 N 個振幅。QFT 實驗為小 n 視覺化完整狀態向量。"
        }
      }
    },
    "9.3": {
      "title": "9.3 電路分解",
      "paragraphs": {
        "p1": "QFT 有高效的 O(n²) 閘電路——對 N = 2ⁿ 比 O(N²) 古典 DFT 矩陣乘法快指數級。"
      },
      "workedExamples": {
        "twoQubit": {
          "title": "2 量子位元 QFT 電路",
          "steps": {
            "0": {
              "label": "對量子位元 0（大端慣例中的 MSB）套用 H。"
            },
            "1": {
              "label": "在量子位元 1 上套用受控相位 R₂，由量子位元 0 控制：角度 π/2。",
              "latex": "R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}"
            },
            "2": {
              "label": "對量子位元 1 套用 H。"
            },
            "3": {
              "label": "交換量子位元以匹配標準位元順序（可選）。",
              "latex": "\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0"
            }
          }
        },
        "general": {
          "title": "一般 n 量子位元模式",
          "steps": {
            "0": {
              "label": "對 j = 0, …, n−1：對量子位元 j 套用 H，然後從量子位元 j+1, …, n−1 以角度 π/2^{m−j−1} 套用受控相位 R_m。"
            },
            "1": {
              "label": "所有 Hadamard 與相位後，套用 SWAP 閘反轉量子位元順序。",
              "latex": "O(n^2) \\text{ gates total}"
            },
            "2": {
              "label": "每個受控相位 R_d = diag(1, e^{2πi/2^d})。",
              "latex": "R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}"
            }
          }
        }
      },
      "expandables": {
        "product": {
          "title": "乘積表示",
          "p1": "此二進位分數形式直接連接相位估計：每個控制量子位元捕捉相位 φ 的一位。"
        }
      }
    },
    "9.4": {
      "title": "9.4 逆 QFT",
      "paragraphs": {
        "p1": "逆 QFT（IQFT）使用共轭相位——將 ω_N 替換為 ω_N^{−1}：",
        "p2": "電路形式：反轉閘順序並共轭每個相位角（π/2^d → −π/2^d）。"
      },
      "widgets": {
        "iqft": {
          "fidelity": "对 |{{label}}⟩（n={{n}}）做 QFT 再 IQFT：原始基態保真度 = {{fidelity}}%（理想：100%）。"
        }
      },
      "checkpoints": {
        "exponent": {
          "question": "IQFT 與 QFT 在指數上有何不同？",
          "answer": "negative exponent",
          "hint": "2πixk/N 的符號。"
        }
      }
    },
    "9.5": {
      "title": "9.5 與週期尋找的連結",
      "paragraphs": {
        "p1": "週期尋找——Simon 與 Shor 演算法的核心——利用 QFT 從疊加態提取週期性。",
        "p2": "另見：週期探索器與第 11 章：Shor 演算法。"
      },
      "workedExamples": {
        "periodFinding": {
          "title": "週期尋找概述",
          "steps": {
            "0": {
              "label": "對 x 準備均勻疊加，將 f(x) 計入輔助量子位元（或使用相位神諭）。"
            },
            "1": {
              "label": "測量或丟棄輔助量子位元；輸入寄存器坍縮為相同 f 值的 x 疊加——週期態。",
              "latex": "\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle"
            },
            "2": {
              "label": "對輸入寄存器套用 QFT。在 k 為 N/r 的倍數處出現峰值。",
              "latex": "\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r"
            },
            "3": {
              "label": "測量 k；古典後處理（連分數）恢復週期 r。",
              "latex": "r = N / \\gcd(k, N)"
            }
          }
        }
      },
      "expandables": {
        "hsp": {
          "title": "隱藏子群觀點",
          "p1": "當函數在 ℤ_N（或 Simon 的 ℤ_2ⁿ）的隱藏子群 H 的陪集上為常數時，QFT 成功。測量傅立葉基態揭示 H⊥ 的資訊——統一 Deutsch–Jozsa、Simon 與 Shor 為隱藏子群問題。"
        }
      },
      "labs": {
        "qft": "QFT 視覺化"
      },
      "links": {
        "periodFinding": "週期探索器",
        "shor": "第 11 章：Shor 演算法"
      }
    }
  }
};
