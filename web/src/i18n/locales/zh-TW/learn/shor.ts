import type { TranslationTree } from '@/i18n/types';

export const shor: TranslationTree = {
  "title": "第 11 章：Shor 演算法",
  "intro": "Shor 演算法（1994）在容錯量子計算機上以多項式時間分解大合數——威脅 RSA 與 Diffie–Hellman。量子核心是透過 QPE 的週期尋找；其餘為古典數論。",
  "labLink": "開啟完整實驗：{{title}} →",
  "sections": {
    "11.1": {
      "title": "11.1 歸約到週期尋找",
      "paragraphs": {
        "p1": "要分解合數 N，選取 1 < a < N 且 gcd(a, N) = 1 的隨機 a。若 gcd(a, N) > 1，古典上已找到因數。否則找最小 r > 0 使得：",
        "p2": "此 r 是 a 模 N 的週期（階）。週期尋找是困難的量子步驟；從 r 分解使用古典 gcd 算術。"
      },
      "cards": {
        "quantum": {
          "title": "⚛ 量子部分",
          "items": {
            "0": "對 x 準備疊加",
            "1": "計算 a^x mod N（模指數）",
            "2": "QPE + QFT 提取週期 r"
          }
        },
        "classical": {
          "title": "⚙ 古典部分",
          "items": {
            "0": "選隨機 a，檢查 gcd",
            "1": "驗證 r 為偶數，a^{r/2} ≢ −1",
            "2": "計算 gcd(a^{r/2} ± 1, N)",
            "3": "若為平凡因數則重試"
          }
        }
      },
      "labs": {
        "period-finding": "週期探索器"
      }
    },
    "11.2": {
      "title": "11.2 從週期到因數",
      "paragraphs": {
        "p1": "給定 a^r ≡ 1 (mod N) 的週期 r，有 a^r − 1 ≡ 0 (mod N)，故 N 整除 (a^{r/2} − 1)(a^{r/2} + 1)。若 a^{r/2} ≢ −1 (mod N)，則兩因子都不是 N 的倍數，gcd 提取非平凡因數。"
      },
      "workedExamples": {
        "conditions": {
          "title": "成功分解的條件",
          "steps": {
            "0": {
              "label": "r 必須為偶數使 r/2 為整數。",
              "latex": "r = 2k \\text{ for some integer } k"
            },
            "1": {
              "label": "a^{r/2} ≢ −1 (mod N)。否則兩個 gcd 都等於 1 或 N——平凡。",
              "latex": "a^{r/2} \\not\\equiv -1 \\pmod{N}"
            },
            "2": {
              "label": "若兩條件成立，gcd(a^{r/2} − 1, N) 與 gcd(a^{r/2} + 1, N) 對隨機 a 以 ≥ 1/2 機率為非平凡因數。",
              "latex": "p \\cdot q = N"
            },
            "3": {
              "label": "若任一條件失敗，選新 a 重試。期望 O(1) 次試驗。",
              "latex": "\\text{Repeat until success}"
            }
          }
        }
      },
      "expandables": {
        "minusOne": {
          "title": "為何 a^{r/2} ≡ −1 導致失敗",
          "p1": "若 a^{r/2} ≡ −1 (mod N)，則 a^{r/2} + 1 ≡ 0 (mod N)，故 gcd(a^{r/2} + 1, N) = N——平凡因數。同樣 gcd(a^{r/2} − 1, N) = 1。約一半有效週期產生有用因數；其餘需以不同 a 重試。"
        }
      },
      "checkpoints": {
        "gcd": {
          "question": "什麼 gcd 計算從週期 r 提取因數？",
          "answer": "gcd(a^{r/2} ± 1, N)",
          "hint": "來自 a^r − 1 分解的 ±1。"
        }
      }
    },
    "11.3": {
      "title": "11.3 分解 15：互動式逐步說明",
      "paragraphs": {
        "p1": "標準示範以 a = 2 分解 N = 15。2^x mod 15 的週期為 r = 4，得到因數 3 與 5。"
      },
      "workedExamples": {
        "summary": {
          "title": "a = 2, N = 15（摘要）",
          "steps": {
            "0": {
              "label": "序列 2^x mod 15：1, 2, 4, 8, 1, … → 週期 r = 4。",
              "latex": "2^4 \\equiv 1 \\pmod{15}"
            },
            "1": {
              "label": "r 為偶數。a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15)。✓",
              "latex": "4 \\not\\equiv -1 \\pmod{15}"
            },
            "2": {
              "label": "gcd(4 − 1, 15) = gcd(3, 15) = 3。",
              "latex": "\\gcd(3, 15) = 3"
            },
            "3": {
              "label": "gcd(4 + 1, 15) = gcd(5, 15) = 5。因此 15 = 3 × 5。",
              "latex": "15 = 3 \\times 5"
            }
          }
        }
      },
      "widgets": {
        "stepper": {
          "intro": "互動式逐步說明：以 a = 2 分解 N = 15（Shor 標準示範）。",
          "classicalStep": "⚙ 古典步驟",
          "quantumStep": "⚛ 量子步驟",
          "periodMark": " ← 週期！",
          "factors": "因數：",
          "reset": "重設",
          "next": "下一步 →",
          "done": "完成",
          "steps": {
            "0": {
              "title": "選擇 N 與互素 a",
              "classical": "true",
              "content": "選合數 N = 15。選 a = 2，gcd(2, 15) = 1。"
            },
            "1": {
              "title": "計算模冪（古典檢查）",
              "classical": "true",
              "content": "計算 x = 0, 1, 2, … 的 2^x mod 15 以發現重複。"
            },
            "2": {
              "title": "量子週期尋找",
              "classical": "false",
              "content": "對 U|y⟩ = |2^x · y mod 15⟩ 做 QPE + QFT 估計 2^x mod 15 的週期 r。"
            },
            "3": {
              "title": "驗證週期 r = 4",
              "classical": "true",
              "content": "2^4 mod 15 = 16 mod 15 = 1。序列：1, 2, 4, 8, 1, …"
            },
            "4": {
              "title": "檢查 r 為偶數",
              "classical": "true",
              "content": "r = 4 為偶數。若 r 為奇數，以不同 a 重新開始。"
            },
            "5": {
              "title": "計算 a^{r/2} mod N",
              "classical": "true",
              "content": "2^{4/2} mod 15 = 2² mod 15 = 4。"
            },
            "6": {
              "title": "檢查 a^{r/2} ≢ −1 (mod N)",
              "classical": "true",
              "content": "4 ≢ 14 (≡ −1 mod 15)。若 a^{r/2} ≡ −1，重新開始——此 a 無因數。"
            },
            "7": {
              "title": "透過 gcd 提取因數",
              "classical": "true",
              "content": "gcd(4 − 1, 15) = gcd(3, 15) = 3。gcd(4 + 1, 15) = gcd(5, 15) = 5。"
            },
            "8": {
              "title": "驗證因數分解",
              "classical": "true",
              "content": "15 = 3 × 5。成功！"
            }
          },
          "tableHeaders": {
            "0": "x",
            "1": "2^x mod 15"
          }
        }
      },
      "labs": {
        "shor": "Shor 演算法示範"
      }
    },
    "11.4": {
      "title": "11.4 複雜度",
      "paragraphs": {
        "p1": "在具有 O(n) 量子位元與 poly(n) 閘的容錯量子計算機上：",
        "p2": "已知最佳古典分解（一般數域篩法）為次指數：exp(O((log N)^{1/3})). Shor 提供超多項式加速——後量子密碼學遷移的原因。"
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "組件",
            "1": "古典 / 量子",
            "2": "成本"
          },
          "rows": {
            "0": {
              "component": "選 a、gcd 檢查",
              "type": "古典",
              "cost": "O(log² N)"
            },
            "1": {
              "component": "模指數電路",
              "type": "量子",
              "cost": "O(n³) 閘"
            },
            "2": {
              "component": "QPE + QFT",
              "type": "量子",
              "cost": "O(n² log N) 閘"
            },
            "3": {
              "component": "連分數",
              "type": "古典",
              "cost": "O(n²)"
            },
            "4": {
              "component": "gcd(a^{r/2} ± 1, N)",
              "type": "古典",
              "cost": "O(log² N)"
            }
          }
        }
      },
      "checkpoints": {
        "time": {
          "question": "Shor 在容錯機器上運行時間（n = log N）？",
          "answer": "polynomial",
          "hint": "Poly(n) = poly(log N)。"
        }
      }
    },
    "11.5": {
      "title": "11.5 密碼學影響",
      "paragraphs": {
        "p1": "RSA、Diffie–Hellman 與橢圓曲線密碼（透過 Shor 的離散對數變體）依賴因數分解或離散對數的困難性。大規模容錯量子計算機運行 Shor 將破解這些系統。"
      },
      "headings": {
        "relatedLabs": "相關實驗"
      },
      "expandables": {
        "pqc": {
          "title": "後量子密碼學（PQC）",
          "p1": "NIST 標準化後量子演算法（2024）基於格問題、哈希簽名與碼基方案——Shor 不攻擊的數學假設。政府與產業標準的 PQC 遷移正在進行。",
          "p2": "重要細節：今日 NISQ 裝置無法對密碼學相關密鑰大小（2048 位元 RSA）運行完整 Shor。「先收集、後解密」威脅促使主動遷移，而非對即時破解的恐慌。"
        },
        "periodHeart": {
          "title": "週期尋找——量子核心",
          "p1": "量子子程序在模乘法酉算子上用 QPE 估計 f(x) = a^x mod N 的週期 r。QFT 將 x 中的週期結構轉為 N/r 倍數處的峰值；連分數從測量相位恢復 r。見第 9 章（QFT）與第 10 章（QPE）。"
        }
      },
      "labLinks": {
        "shor": "Shor 演算法示範（N=15）",
        "period-finding": "週期探索器",
        "phase-estimation": "相位估計",
        "qft": "QFT 視覺化"
      }
    }
  }
};
