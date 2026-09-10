import type { TranslationTree } from '@/i18n/types';

export const phaseEstimation: TranslationTree = {
  "title": "第 10 章：量子相位估計",
  "intro": "量子相位估計（QPE）讀出酉算子的本征值相位——連接 QFT 與 Shor 演算法及量子化學模擬的子程序。",
  "labLink": "開啟完整實驗：{{title}} →",
  "sections": {
    "10.1": {
      "title": "10.1 問題表述",
      "paragraphs": {
        "p1": "給定本征態 |u⟩ 與本征值 e^{2πiφ} 的酉算子 U：",
        "p2": "目標是用 m 個輔助控制量子位元與 O(m) 次受控 U 應用，以 m 位元精度估計相位 φ ∈ [0, 1)（完整旋轉的分數）。"
      },
      "expandables": {
        "whyPhases": {
          "title": "相位為何重要",
          "p1": "在 Shor 演算法中，模乘法酉算子 U|y⟩ = |ay mod N⟩ 的本征態相位編碼 1/r，其中 r 是 a^x mod N 的週期。QPE 提取 r，使因數分解成為可能。"
        }
      },
      "labs": {
        "phase-estimation": "相位估計"
      }
    },
    "10.2": {
      "title": "10.2 QPE 電路",
      "paragraphs": {
        "p1": "標準電路使用 m 個控制量子位元與一個準備在 |u⟩ 的目標量子位元："
      },
      "workedExamples": {
        "controlledU": {
          "title": "受控-U 冪次",
          "steps": {
            "0": {
              "label": "將 m 個控制量子位元準備為 |+⟩⊗ᵐ，目標處於本征態 |u⟩。",
              "latex": "|+\\rangle^{\\otimes m}|u\\rangle"
            },
            "1": {
              "label": "從控制量子位元 j（j = 0, …, m−1）套用受控-U^{2^j}。每個控制獲得相位 e^{2πiφ·2^j}。",
              "latex": "|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle"
            },
            "2": {
              "label": "控制寄存器變為 ∑_j e^{2πiφ·2^j}|j⟩——以二進位編碼 φ 的傅立葉型疊加。",
              "latex": "\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle"
            },
            "3": {
              "label": "對控制套用逆 QFT。測量得到 φ 的 m 位元二進位近似。",
              "latex": "|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle"
            }
          }
        }
      },
      "checkpoints": {
        "afterControlledU": {
          "question": "控制寄存器上受控-U^{2^j} 閘之後進行什麼操作？",
          "answer": "inverse QFT",
          "hint": "將相位回踢轉為二進位讀出。"
        }
      }
    },
    "10.3": {
      "title": "10.3 二進位分數讀出",
      "paragraphs": {
        "p1": "測量結果解釋為二進位分數：",
        "p2": "控制量子位元 j（從頂部 0 索引）編碼位元 φ_{j+1}——二進位小數點後第 j 位。這正是逆 QFT 逐位提取相位。"
      },
      "expandables": {
        "kickback": {
          "title": "相位回踢連結",
          "p1": "當目標在 |u⟩ 時，每個受控-U^{2^j} 將相位 e^{2πiφ·2^j} 回踢到控制量子位元 j。逆 QFT 反轉這些相位上的 QFT，將振幅集中在二進位標籤最佳近似 φ 的基態上。"
        }
      }
    },
    "10.4": {
      "title": "10.4 範例：φ = 1/3",
      "paragraphs": {
        "p1": "在上方示範中以 φ = 1/3、m = 6 執行，查看 quantum-core 相位估計例程的模擬估計、二進位字串與誤差。"
      },
      "workedExamples": {
        "phiThird": {
          "title": "以 m = 6 量子位元估計 φ = 1/3",
          "steps": {
            "0": {
              "label": "將 φ = 1/3 寫為二進位：0.010101…（循環）。",
              "latex": "\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2"
            },
            "1": {
              "label": "U|u⟩ = e^{2πi/3}|u⟩。受控-U^{2^0} 加相位 e^{2πi/3}；U^{2^1} 加 e^{4πi/3}；等。",
              "latex": "e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}"
            },
            "2": {
              "label": "m = 6 逆 QFT 後，測量得 ≈ 0.010101 = 21/64 ≈ 0.328。",
              "latex": "\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125"
            },
            "3": {
              "label": "誤差 |1/3 − 21/64| ≈ 0.005。增加量子位元可提高精度。",
              "latex": "|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}"
            }
          }
        }
      },
      "widgets": {
        "demo": {
          "truePhase": "真實相位 φ = {{phi}}（完整旋轉的分數）",
          "precisionQubits": "精度量子位元 m = {{m}}",
          "truePhiBinary": "真實 φ（二進位）",
          "estimatedPhi": "估計 φ",
          "measuredBits": "測得的位元字串",
          "error": "|φ − φ̂|",
          "footnote": "m 個精度量子位元使讀出在小數點後近似 φ 的 m 位二進位數字。"
        }
      }
    },
    "10.5": {
      "title": "10.5 精度與量子位元數",
      "paragraphs": {
        "p1": "m 個精度量子位元使 QPE 近似 φ 至 m 位二進位數字（理想條件下）："
      },
      "tables": {
        "precision": {
          "headers": {
            "0": "精度量子位元 m",
            "1": "最大誤差 2^{−m}",
            "2": "範例"
          },
          "rows": {
            "0": {
              "m": "4",
              "error": "0.0625",
              "example": "粗略相位估計"
            },
            "1": {
              "m": "8",
              "error": "≈ 0.004",
              "example": "中等精度"
            },
            "2": {
              "m": "12",
              "error": "≈ 0.00024",
              "example": "Shor 級週期"
            },
            "3": {
              "m": "2n + ⌈log(1/ε)⌉",
              "error": "ε",
              "example": "標準複雜度界"
            }
          }
        }
      },
      "expandables": {
        "success": {
          "title": "成功機率與重複",
          "p1": "當目標確切為本征態時，QPE 以高機率成功。對 Shor，本征態是近似的；演算法重複 O(log N) 次並用連分數從測量相位恢復 r。總成本：分解 n 位元數 N 需 O(n² log N) 閘。"
        }
      },
      "checkpoints": {
        "bits": {
          "question": "m 個精度量子位元理想上提供 φ 的多少位元？",
          "answer": "m"
        }
      }
    },
    "10.6": {
      "title": "10.6 在 Shor 演算法中的角色",
      "paragraphs": {
        "p1": "Shor 因數分解演算法歸結為：找 f(x) = a^x mod N 的週期 r，然後計算 gcd(a^{r/2} ± 1, N)。模乘法酉算子",
        "p2": "具有整數 s 的本征相位 s/r。QPE 估計 s/r；連分數提取 r。",
        "p3": "下一步：第 11 章——Shor 演算法 · 週期探索器"
      },
      "expandables": {
        "modularMult": {
          "title": "模乘法酉算子",
          "p1": "高效實現受控-U^{2^j} 需要模指數電路——Shor 中的主要閘成本。QPE 將此算術包在相位估計外殼中，將週期結構轉為可測的二進位分數。"
        }
      },
      "labs": {
        "phase-estimation": "相位估計"
      },
      "links": {
        "shor": "第 11 章——Shor 演算法",
        "periodFinding": "週期探索器"
      }
    }
  }
};
