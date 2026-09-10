import type { TranslationTree } from '@/i18n/types';

export const protocols: TranslationTree = {
  "title": "第 7 章：量子協定",
  "intro": "糾纏與量子通道使古典上不可能的通訊原語成為可能——但絕不會實現超光速信號傳遞。本章涵蓋 EPR 悖論與隱變量、CHSH 測試、超密集編碼、傳態與 BB84 密鑰分配。",
  "labLink": "開啟完整實驗：{{title}} →",
  "sections": {
    "7.1": {
      "title": "7.1 EPR 與局域隱變量",
      "paragraphs": {
        "p1": "愛因斯坦–波多爾斯基–羅森（EPR）論證（1935）質疑量子力學是否完備。考慮 Alice 與 Bob 共享的單態：",
        "p2": "在 Z 基中測量 Alice 的量子位元會立即決定 Bob 的結果（反相關）。EPR 問：能否用預先存在的局域隱變量（LHV）解釋這些相關性，而不需要「鬼魅般的超距作用」？"
      },
      "expandables": {
        "lhv": {
          "title": "局域隱變量模型",
          "p1": "LHV 模型在測量前為每個粒子賦予確定的性質 λ。結果是函數 A(a, λ) 與 B(b, λ)，其中 a、b 為測量設定。局域性意味 Alice 的結果不能依賴 Bob 的設定 b，反之亦然。"
        },
        "noSignaling": {
          "title": "無信號傳遞",
          "p1": "雖然相關性是非古典的，Alice 無法透過選擇測量基向 Bob 傳送訊息。Bob 的邊緣結果統計與 Alice 的設定無關——只有相關性會改變。這是無信號傳遞原理，由量子力學保持並為相對論所要求。"
        }
      },
      "workedExamples": {
        "singlet": {
          "title": "單態中的完美反相關",
          "steps": {
            "0": {
              "label": "Alice 與 Bob 共享 |Ψ⁻⟩ 並在相同基（例如 Z）中測量。",
              "latex": "P(01) = P(10) = 0"
            },
            "1": {
              "label": "結果總是相反：Alice 得到 0 ↔ Bob 得到 1。",
              "latex": "A_Z B_Z = -1 \\text{ with certainty}"
            },
            "2": {
              "label": "對任何匹配的基都成立——但 LHV 模型無法重現所有相關模式。",
              "latex": "\\text{See CHSH (Section 7.2)}"
            }
          }
        }
      },
      "checkpoints": {
        "signaling": {
          "question": "Alice 能否透過在共享 EPR 對上選擇測量角度向 Bob 傳信？",
          "answer": "no",
          "hint": "Bob 的邊緣統計不變。"
        }
      }
    },
    "7.2": {
      "title": "7.2 CHSH 不等式與 Tsirelson 上界",
      "paragraphs": {
        "p1": "Bell（1964）與 CHSH（1969）證明 LHV 模型限制相關函數。定義 CHSH 參數：",
        "p2": "任何局域隱變量理論滿足 |S| ≤ 2。量子力學可違反此上界——量子最大值為 Tsirelson 上界：",
        "p3": "對於最佳角度的單態（a = 0, a' = π/4, b = π/8, b' = −π/8），量子力學預測 S = 2√2——最大違反。"
      },
      "expandables": {
        "noSignalingVsBell": {
          "title": "無信號傳遞 vs Bell 違反",
          "p1": "CHSH 違反證明相關性不能來自任何局域隱變量模型——但不會實現信號傳遞。無信號條件限制相關性偏離古典的程度；Tsirelson 上界 2√2 低於無信號極限 4。"
        }
      },
      "checkpoints": {
        "classicalBound": {
          "question": "|S| 的古典上界是多少？",
          "answer": "2"
        }
      },
      "widgets": {
        "chsh": {
          "simulationTrials": "模擬試驗次數：{{trials}}",
          "classicalBound": "古典上界：|S| ≤ 2。量子（Tsirelson）：|S| ≤ 2√2 ≈ {{tsirelson}}。模擬 S ≈ {{s}}。"
        }
      },
      "labs": {
        "chsh": "Bell/CHSH 實驗"
      }
    },
    "7.3": {
      "title": "7.3 超密集編碼",
      "paragraphs": {
        "p1": "超密集編碼（Bennett & Wiesner，1992）在預先共享 ebit（糾纏位元）的條件下，透過傳送一個量子位元傳輸兩個古典位元。",
        "p2": "協定消耗一個 ebit 與一次量子位元傳輸來傳送兩個位元——在此特定意義上使古典通道容量加倍。沒有預先共享糾纏時，傳送兩個位元需要兩個量子位元（每個量子位元在固定基測量時最多攜帶一個位元）。"
      },
      "headings": {
        "encodingTable": "編碼表"
      },
      "tables": {
        "superdense": {
          "headers": {
            "0": "古典位元",
            "1": "Alice 的閘",
            "2": "共享態變為"
          },
          "rows": {
            "0": {
              "bits": "00",
              "gate": "I",
              "state": "|Φ⁺⟩"
            },
            "1": {
              "bits": "01",
              "gate": "X",
              "state": "|Ψ⁺⟩"
            },
            "2": {
              "bits": "10",
              "gate": "Z",
              "state": "|Φ⁻⟩"
            },
            "3": {
              "bits": "11",
              "gate": "XZ (= iY)",
              "state": "|Ψ⁻⟩"
            }
          }
        }
      },
      "workedExamples": {
        "steps": {
          "title": "超密集編碼逐步說明",
          "steps": {
            "0": {
              "label": "在 Alice 與 Bob 之間準備共享 Bell 態 |Φ⁺⟩ = (|00⟩ + |11⟩)/√2。",
              "latex": "|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "Alice 透過對其量子位元套用 I、X、Z 或 XZ 編碼兩個古典位元（b₁b₂）。",
              "latex": "00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ"
            },
            "2": {
              "label": "Alice 將其量子位元傳給 Bob（傳送一個量子位元）。"
            },
            "3": {
              "label": "Bob 以 CNOT（Alice→Bob 控制）然後 H 解碼，測量兩個量子位元讀出 (b₁b₂)。",
              "latex": "(CNOT)(H \\otimes I) \\text{ reverses the encoding}"
            }
          }
        }
      },
      "expandables": {
        "noSignaling": {
          "title": "超密集編碼中的無信號傳遞",
          "p1": "ebit 必須在編碼前建立——通常由 Alice 與 Bob 會面或使用量子通道。古典位元在 Alice 傳送其量子位元前不會傳輸；僅靠糾纏無法攜帶可用的古典資訊（無信號傳遞）。"
        }
      },
      "labs": {
        "superdense": "超密集編碼"
      }
    },
    "7.4": {
      "title": "7.4 量子傳態",
      "paragraphs": {
        "p1": "傳態（Bennett 等，1993）使用一個 ebit 與兩個古典位元將未知量子位元態 |ψ⟩ 從 Alice 傳給 Bob——不物理移動原始粒子且不克隆。"
      },
      "headings": {
        "correctionTable": "校正表"
      },
      "tables": {
        "teleport": {
          "headers": {
            "0": "m₁ (Alice)",
            "1": "m₂ (Alice)",
            "2": "Bob 套用",
            "3": "效果"
          },
          "rows": {
            "0": {
              "m1": "0",
              "m2": "0",
              "correction": "I",
              "note": "無需改變"
            },
            "1": {
              "m1": "0",
              "m2": "1",
              "correction": "X",
              "note": "位元翻轉"
            },
            "2": {
              "m1": "1",
              "m2": "0",
              "correction": "Z",
              "note": "相位翻轉"
            },
            "3": {
              "m1": "1",
              "m2": "1",
              "correction": "ZX (= iY)",
              "note": "兩種翻轉"
            }
          }
        }
      },
      "workedExamples": {
        "algebra": {
          "title": "傳態代數",
          "steps": {
            "0": {
              "label": "起始：Alice 持有 |ψ⟩ = α|0⟩ + β|1⟩；Alice 與 Bob 在量子位元 2,3 共享 |Φ⁺⟩。",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "在 Alice 的量子位元 (1,2) 上以 Bell 基重寫。出現四個具有不同 (m₁,m₂) 結果的 Bell 項。",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3"
            },
            "2": {
              "label": "Alice 在 Bell 基測量量子位元 1,2 → 結果 m₁m₂。Bob 的量子位元變為 X^{m₂}Z^{m₁}|ψ⟩。",
              "latex": "\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle"
            },
            "3": {
              "label": "Alice 透過古典通道傳送 (m₁,m₂) 給 Bob。Bob 套用校正。理想裝置的保真度 F = 1。",
              "latex": "F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1"
            }
          }
        }
      },
      "expandables": {
        "noCloning": {
          "title": "不可克隆與無信號傳遞",
          "p1": "傳態破壞 Alice 的原始態（透過測量）——與不可克隆定理一致。兩個古典位元在 Alice 測量前不攜帶 |ψ⟩ 的資訊；Bob 在收到前無法解碼。沒有資訊以超光速傳播。"
        }
      },
      "checkpoints": {
        "classicalBits": {
          "question": "傳態需要多少古典位元？",
          "answer": "2"
        }
      },
      "labs": {
        "teleportation": "量子傳態"
      }
    },
    "7.5": {
      "title": "7.5 BB84 量子密鑰分配",
      "paragraphs": {
        "p1": "BB84（Bennett & Brassard，1984）允許 Alice 與 Bob 建立共享秘密密鑰，對被動竊聽具有資訊理論安全性——透過升高的錯誤率偵測 Eve。"
      },
      "headings": {
        "basisEncoding": "基編碼"
      },
      "tables": {
        "basis": {
          "headers": {
            "0": "位元",
            "1": "Z 基",
            "2": "X 基"
          },
          "rows": {
            "0": {
              "bit": "0",
              "z": "|0⟩",
              "x": "|+⟩"
            },
            "1": {
              "bit": "1",
              "z": "|1⟩",
              "x": "|−⟩"
            }
          }
        }
      },
      "workedExamples": {
        "protocol": {
          "title": "BB84 協定",
          "steps": {
            "0": {
              "label": "Alice 為每個量子位元選擇隨機位元與隨機基（Z 或 X），編碼後傳送。"
            },
            "1": {
              "label": "Bob 以隨機選擇的 Z 或 X 基測量每個量子位元。"
            },
            "2": {
              "label": "Alice 與 Bob 公開比較基（不比較結果）。保留基匹配的位置——篩選後密鑰。"
            },
            "3": {
              "label": "比較篩選位元的一個隨機子集以估計錯誤率。若太高則中止——可能有竊聽者。"
            },
            "4": {
              "label": "套用錯誤校正與私密放大以獲得最終秘密密鑰。"
            }
          }
        }
      },
      "expandables": {
        "eveAttack": {
          "title": "Eve 的截獲–重送攻擊",
          "p1": "若 Eve 截獲每個量子位元、以隨機基測量並重送，她有一半時間猜錯基。當 Eve 的基 ≠ Alice 的基時，她隨機化態——Bob 的篩選密鑰顯示約 25% 位元錯誤（50% 錯基 × 50% 隨機結果）。Alice 與 Bob 偵測到並中止。"
        },
        "security": {
          "title": "安全性概述與無信號傳遞",
          "p1": "對被動竊聽，BB84 在理想裝置下具有資訊理論安全性。實際部署加入認證、錯誤校正與私密放大。量子通道使密鑰分配成為可能；它不允許瞬時提取密鑰——篩選與錯誤估計需要古典通訊（全程無信號傳遞）。"
        }
      },
      "checkpoints": {
        "eveError": {
          "question": "Eve 截獲 BB84 量子位元時錯誤率會如何？",
          "answer": "increases",
          "hint": "錯基測量會擾動態。"
        }
      },
      "widgets": {
        "bb84": {
          "qubitsPerRun": "每次執行的量子位元：{{num}}",
          "noEavesdropper": "無竊聽者",
          "eveIntercepts": "Eve 截獲",
          "rerun": "重新執行",
          "siftedKey": "篩選後密鑰長度：{{length}} 位元（約 {{num}} 的一半——匹配基）。篩選位元錯誤率：{{rate}}%",
          "eveDetected": " — 升高，偵測到 Eve！",
          "footnote": "Eve 以隨機基測量時，若其基 ≠ Alice 的基會擾動態，在篩選密鑰上引入約 25% 錯誤。"
        }
      },
      "labs": {
        "bb84": "BB84 模擬器"
      }
    }
  }
};
