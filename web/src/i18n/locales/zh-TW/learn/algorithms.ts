import type { TranslationTree } from '@/i18n/types';

export const algorithms: TranslationTree = {
  "title": "第 8 章：量子演算法",
  "intro": "量子演算法利用干涉與相位回踢，從黑箱神諭中比古典查詢複雜度更快地提取結構。本章從神諭模型出發，經早期承諾問題到 Grover 非結構化搜尋——為後續 Shor 與相位估計奠定基礎。",
  "labLink": "開啟完整實驗：{{title}} →",
  "sections": {
    "8.1": {
      "title": "8.1 神諭模型",
      "paragraphs": {
        "p1": "神諭是可逆黑箱酉算子，編碼古典函數 f : {0,1}ⁿ → {0,1}。標準構造使用輔助量子位元：",
        "p2": "查詢複雜度計算演算法呼叫 U_f 的次數。此模型抽象掉 f 的內部結構——演算法只能透過查詢了解 f。"
      },
      "workedExamples": {
        "phaseKickback": {
          "title": "以 |−⟩ 輔助量子位元的相位回踢",
          "steps": {
            "0": {
              "label": "將輔助量子位元準備為 |−⟩ = H|1⟩。當 f(x)=1 時對 |y⟩ 的受控-X（翻轉）變為對 |x⟩ 的受控-Z。",
              "latex": "|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle"
            },
            "1": {
              "label": "對輸入套用 H：|+⟩ 獲得相位 (−1)^{f(0)}；|−⟩ 獲得 (−1)^{f(1)}。",
              "latex": "H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)"
            },
            "2": {
              "label": "對常數 f (f(0)=f(1))：結果為 ±|+⟩ → 測得 |0⟩。對平衡 f：結果為 ±|−⟩ → 測得 |1⟩。",
              "latex": "\\text{1 query distinguishes constant vs balanced (Deutsch)}"
            }
          }
        }
      },
      "widgets": {
        "phaseKickback": {
          "intro": "神諭 U_f|x,y⟩ = |x, y ⊕ f(x)⟩ 在 f(x)=1 時翻轉輔助量子位元。輔助量子位元在 |−⟩ 時，翻轉變為輸入寄存器上的相位——相位回踢。",
          "inputX": "輸入 x：",
          "setup": "設定",
          "oracleAction": "神諭作用",
          "effectOnInput": "對輸入的效應",
          "ancilla0": "輔助量子位元 |0⟩",
          "ancillaMinus": "輔助量子位元 |−⟩",
          "noPhase": "無相位（僅位元翻轉）",
          "controlledFlip": "對 y 受控翻轉 → x 上的相位"
        }
      },
      "checkpoints": {
        "ancilla": {
          "question": "相位回踢需要輔助量子位元處於什麼狀態？",
          "answer": "|−⟩",
          "hint": "|1⟩ 的 Hadamard。"
        }
      }
    },
    "8.2": {
      "title": "8.2 Deutsch 演算法",
      "paragraphs": {
        "p1": "Deutsch 問題（1985）：給定 f: {0,1} → {0,1}，判斷 f 是常數 (f(0)=f(1)) 還是平衡 (f(0)≠f(1))。單一位元上恰好有四種此類函數："
      },
      "tables": {
        "deutsch": {
          "headers": {
            "0": "函數",
            "1": "f(0)",
            "2": "f(1)",
            "3": "類型"
          },
          "rows": {
            "0": {
              "name": "f₀(x) = 0",
              "f0": "0",
              "f1": "0",
              "type": "常數"
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
          "title": "為何古典最壞情況需要 2 次查詢",
          "p1": "古典演算法必須計算 f(0) 與 f(1) 以區分常數與平衡。若在一次求值後停止，未見輸入仍可能不同——答案會錯。Deutsch 透過疊加與干涉以單次神諭呼叫確定答案。"
        }
      },
      "widgets": {
        "deutsch": {
          "selectFn": "選擇布林函數 f: {0,1} → {0,1}",
          "circuit": "電路：|0⟩|1⟩ → 輔助量子位元 X → H⊗H → U_f（相位神諭）→ 輸入 H → 測量輸入。",
          "measured": "測得的輸入量子位元：",
          "reports": "演算法報告",
          "trueLabel": "真實標籤：",
          "classicalNote": "古典最壞情況：2 次神諭查詢（計算 f(0) 與 f(1)）。Deutsch：1 次查詢。"
        }
      },
      "labs": {
        "deutsch": "Deutsch 演算法"
      }
    },
    "8.3": {
      "title": "8.3 Deutsch–Jozsa 演算法",
      "paragraphs": {
        "p1": "推廣到 n 個輸入位元，承諾 f 要麼是常數（所有 2ⁿ 輸入相同），要麼是平衡（恰好 2ⁿ⁻¹ 個 0 與 2ⁿ⁻¹ 個 1）。沒有此承諾，問題即使量子上也困難。",
        "p2": "電路與 Deutsch 類似：準備 |−⟩ 輔助量子位元，套用 H⊗ⁿ、神諭、H⊗ⁿ。常數函數確定產生 |0…0⟩；平衡函數永不產生全零。"
      },
      "widgets": {
        "dj": {
          "inputSize": "輸入寄存器大小 n = {{n}}",
          "constantF": "常數 f",
          "balancedF": "平衡 f",
          "promise": "承諾：f 要麼是常數（所有 x 相同輸出），要麼是平衡（恰好一半 0、一半 1）。",
          "returns": "Deutsch–Jozsa 回傳：",
          "quantumNote": "量子：1 次查詢。古典最壞情況：2^{n-1}+1 次查詢。"
        }
      },
      "checkpoints": {
        "constant": {
          "question": "Deutsch–Jozsa 中什麼測量結果證明 f 是常數？",
          "answer": "|0⟩⊗n",
          "hint": "輸入寄存器全零。"
        }
      },
      "labs": {
        "deutsch-jozsa": "Deutsch–Jozsa"
      }
    },
    "8.4": {
      "title": "8.4 Bernstein–Vazirani 演算法",
      "paragraphs": {
        "p1": "給定神諭存取 f(x) = s · x (mod 2)（n 位元字串的內積 mod 2），恢復隱藏字串 s ∈ {0,1}ⁿ。",
        "p2": "古典上，學習 s 需要以每個標準基向量 e_i 查詢 f——n 次查詢。Bernstein–Vazirani 只需一次。"
      },
      "workedExamples": {
        "recoverS": {
          "title": "一次查詢恢復 s",
          "steps": {
            "0": {
              "label": "準備 |+⟩⊗ⁿ 與 |−⟩ 輔助量子位元（與 Deutsch–Jozsa 相同設定）。"
            },
            "1": {
              "label": "相位神諭在每個基態 |x⟩ 上實現 (−1)^{s·x}。"
            },
            "2": {
              "label": "逆 Hadamard 後，|x⟩ 的振幅集中在 x = s。測量讀出 s。",
              "latex": "H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle"
            }
          }
        }
      },
      "widgets": {
        "bv": {
          "hiddenString": "隱藏字串 s（位元）：",
          "oracle": "神諭：f(x) = s · x (mod 2) = ⊕_i s_i x_i",
          "recovered": "H⊗ⁿ → 神諭 → H⊗ⁿ 後，測量直接得到 s。已恢復："
        }
      },
      "labs": {
        "bernstein-vazirani": "Bernstein–Vazirani"
      }
    },
    "8.5": {
      "title": "8.5 Simon 演算法",
      "paragraphs": {
        "p1": "Simon 問題（1994）：f: {0,1}ⁿ → {0,1}ⁿ 承諾為 2 對 1，具有隱藏週期 s ∈ {0,1}ⁿ, s ≠ 0，使得對所有 x 有 f(x) = f(x ⊕ s)。",
        "p2": "古典上找 s 需要約 2^{n/2} 次查詢（生日悖論）。Simon 量子演算法以 O(n) 次神諭查詢加 O(n) 古典後處理找到 s。"
      },
      "expandables": {
        "gf2": {
          "title": "Simon 背後的 GF(2) 線性代數",
          "p1": "測量產生滿足 y · s = 0 (mod 2) 的隨機向量 y ∈ {0,1}ⁿ。每次查詢在 GF(2) 上增加線性約束。約 n 個獨立方程後，GF(2) 上的高斯消元恢復 s。",
          "p2": "阿貝爾群上的此隱藏週期結構是 Shor 在 ℤ_N 上週期尋找的直接前身。"
        }
      },
      "checkpoints": {
        "field": {
          "question": "Simon 的後處理線性代數在哪個域上進行？",
          "answer": "GF(2)",
          "hint": "以 XOR 為加法的位元。"
        }
      },
      "labs": {
        "simon": "Simon 演算法"
      }
    },
    "8.6": {
      "title": "8.6 Grover 搜尋演算法",
      "paragraphs": {
        "p1": "Grover（1996）在非結構化資料庫 N = 2ⁿ 個項目中搜尋標記項 w，使用 O(√N) 次神諭查詢——相對古典 O(N) 的二次加速。",
        "p2": "每次 Grover 迭代 G = D · O_w 以約 2 arcsin(1/√N) 的角度將狀態向量旋轉向 |w⟩。最佳迭代次數為："
      },
      "headings": {
        "uniformSuperposition": "均勻疊加",
        "oracle": "神諭 O_w",
        "diffusion": "擴散算子 D"
      },
      "expandables": {
        "overshooting": {
          "title": "過度迭代與最優性",
          "p1": "Grover 搜尋在 |w⟩ 與 |s'⟩（移除 |w⟩ 的均勻疊加）張成的二維子空間中旋轉。迭代過多會旋轉超過 |w⟩——成功機率下降。Grover 演算法對非結構化搜尋可證最優：沒有量子演算法能優於 O(√N) 次查詢。"
        }
      },
      "widgets": {
        "grover": {
          "searchSpace": "搜尋空間：n = {{n}} 量子位元，N = {{N}} 個狀態",
          "markedState": "標記狀態 |w⟩ = |{{label}}⟩",
          "iterations": "Grover 迭代：{{iters}}（最佳 ≈ {{optimal}} = ⌊π/4 · √N⌋）",
          "successProb": "P(成功) = {{prob}}%（均勻起始：{{uniform}}%）",
          "overshooting": "過度迭代：迭代過多會旋轉超過標記態——機率再次下降。"
        }
      },
      "checkpoints": {
        "queries": {
          "question": "Grover 對 N 個項目需要多少次查詢（增長階）？",
          "answer": "O(√N)",
          "hint": "相對古典 O(N) 的二次加速。"
        }
      },
      "labs": {
        "grover": "Grover 搜尋"
      }
    },
    "8.7": {
      "title": "8.7 複雜度比較",
      "paragraphs": {
        "p1": "本章演算法展示不同加速類型：常數因子（Deutsch）、多項式（Bernstein–Vazirani）、查詢複雜度指數（Deutsch–Jozsa、Simon）、二次（Grover）、超多項式（Shor，見第 11 章）。"
      },
      "headings": {
        "algorithmLabs": "演算法實驗"
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "問題",
            "1": "古典（查詢/時間）",
            "2": "量子",
            "3": "加速"
          },
          "rows": {
            "0": {
              "problem": "Deutsch (n=1)",
              "classical": "2 次查詢（最壞）",
              "quantum": "1 次查詢",
              "speedup": "2×"
            },
            "1": {
              "problem": "Deutsch–Jozsa",
              "classical": "2^{n−1}+1（最壞）",
              "quantum": "1 次查詢",
              "speedup": "指數"
            },
            "2": {
              "problem": "Bernstein–Vazirani",
              "classical": "n 次查詢",
              "quantum": "1 次查詢",
              "speedup": "n×"
            },
            "3": {
              "problem": "Simon 演算法",
              "classical": "O(2^{n/2})",
              "quantum": "O(n) 次查詢",
              "speedup": "指數"
            },
            "4": {
              "problem": "Grover 搜尋",
              "classical": "O(N)",
              "quantum": "O(√N)",
              "speedup": "二次"
            },
            "5": {
              "problem": "Shor 因數分解",
              "classical": "次指數",
              "quantum": "poly(n)",
              "speedup": "超多項式"
            }
          }
        }
      },
      "labLinks": {
        "deutsch": "Deutsch 演算法",
        "deutsch-jozsa": "Deutsch–Jozsa",
        "bernstein-vazirani": "Bernstein–Vazirani",
        "simon": "Simon 演算法",
        "grover": "Grover 搜尋",
        "qft": "QFT 視覺化",
        "phase-estimation": "相位估計"
      }
    }
  },
  "labels": {
    "constant": "常數",
    "balanced": "平衡"
  }
};
