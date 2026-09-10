import type { TranslationTree } from '@/i18n/types';

export const protocols: TranslationTree = {
  "title": "第7章：量子プロトコル",
  "intro": "もつれと量子チャネルは、古典では不可能な通信プリミティブを可能にします——ただし光速を超える信号伝達はありません。本章では EPR パラドックスと隠れ変数、CHSH テスト、超高密度符号化、テレポーテーション、BB84 鍵配送を扱います。",
  "labLink": "フルラボを開く：{{title}} →",
  "sections": {
    "7.1": {
      "title": "7.1 EPR と局所隠れ変数",
      "paragraphs": {
        "p1": "アインシュタイン・ポドルスキー・ローゼン（EPR）の論証（1935）は量子力学の完備性を問いました。Alice と Bob が共有する一重項を考えます：",
        "p2": "Z 基底で Alice の量子ビットを測定すると、Bob の結果が即座に決まります（反相関）。EPR は、既存の局所隠れ変数（LHV）が「幽霊のような超距離作用」なしにこれらの相関を説明できるかと問いました。"
      },
      "expandables": {
        "lhv": {
          "title": "局所隠れ変数モデル",
          "p1": "LHV モデルは測定前に各粒子に確定的な性質 λ を割り当てます。結果は関数 A(a, λ) と B(b, λ) で、a, b は測定設定です。局所性とは Alice の結果が Bob の設定 b に依存できず、その逆も成り立つことを意味します。"
        },
        "noSignaling": {
          "title": "ノーシグナリング",
          "p1": "相関は非古典的ですが、Alice は測定基底を選ぶことで Bob にメッセージを送れません。Bob の周辺統計は Alice の設定に依存しません——変わるのは相関だけです。これはノーシグナリング原理で、量子力学が保持し相対論が要求します。"
        }
      },
      "workedExamples": {
        "singlet": {
          "title": "一重項での完全な反相関",
          "steps": {
            "0": {
              "label": "Alice と Bob は |Ψ⁻⟩ を共有し、同じ基底（例：Z）で測定します。",
              "latex": "P(01) = P(10) = 0"
            },
            "1": {
              "label": "結果は常に反対：Alice が 0 ↔ Bob が 1。",
              "latex": "A_Z B_Z = -1 \\text{ with certainty}"
            },
            "2": {
              "label": "一致した基底ならどれでも成立——しかし LHV モデルはすべての相関パターンを再現できません。",
              "latex": "\\text{See CHSH (Section 7.2)}"
            }
          }
        }
      },
      "checkpoints": {
        "signaling": {
          "question": "Alice は共有 EPR 対で測定角度を選ぶことで Bob に信号を送れますか？",
          "answer": "no",
          "hint": "Bob の周辺統計は変わりません。"
        }
      }
    },
    "7.2": {
      "title": "7.2 CHSH 不等式とツァイレルソン限界",
      "paragraphs": {
        "p1": "Bell（1964）と CHSH（1969）は LHV モデルが相関関数を制約することを示しました。CHSH パラメータを定義します：",
        "p2": "任意の局所隠れ変数理論は |S| ≤ 2 を満たします。量子力学はこの限界を破ることができ——量子最大値はツァイレルソン限界です：",
        "p3": "最適角度の一重項（a = 0, a' = π/4, b = π/8, b' = −π/8）では、量子力学は S = 2√2——最大の違反を予測します。"
      },
      "expandables": {
        "noSignalingVsBell": {
          "title": "ノーシグナリング vs Bell 違反",
          "p1": "CHSH 違反は相関が局所隠れ変数モデルから生じられないことを証明します——しかし信号伝達は可能にしません。ノーシグナリング条件は相関が古典からどれだけ逸脱できるかを制限します；ツァイレルソン限界 2√2 はノーシグナリング限界 4 より低いです。"
        }
      },
      "checkpoints": {
        "classicalBound": {
          "question": "|S| の古典的上界は？",
          "answer": "2"
        }
      },
      "widgets": {
        "chsh": {
          "simulationTrials": "シミュレーション試行回数：{{trials}}",
          "classicalBound": "古典限界：|S| ≤ 2。量子（ツァイレルソン）：|S| ≤ 2√2 ≈ {{tsirelson}}。シミュレーション S ≈ {{s}}。"
        }
      },
      "labs": {
        "chsh": "Bell/CHSH 実験"
      }
    },
    "7.3": {
      "title": "7.3 超高密度符号化",
      "paragraphs": {
        "p1": "超高密度符号化（Bennett & Wiesner, 1992）は、事前共有の ebit（もつれビット）を使い、1 量子ビットの送信で 2 古典ビットを伝送します。",
        "p2": "プロトコルは 1 ebit と 1 量子ビット送信で 2 ビットを送ります——この特定の意味で古典チャネル容量を倍増します。事前共有もつれがない場合、2 ビットの送信には 2 量子ビットが必要です（各量子ビットは固定基底測定で最大 1 ビット）。"
      },
      "headings": {
        "encodingTable": "符号化表"
      },
      "tables": {
        "superdense": {
          "headers": {
            "0": "古典ビット",
            "1": "Alice のゲート",
            "2": "共有状態は"
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
          "title": "超高密度符号化のステップ",
          "steps": {
            "0": {
              "label": "Alice と Bob の間で共有 Bell 状態 |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 を準備。",
              "latex": "|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "Alice は I, X, Z, XZ を自分の量子ビットに適用して 2 古典ビット (b₁b₂) を符号化。",
              "latex": "00 \\to I,\\; 01 \\to X,\\; 10 \\to Z,\\; 11 \\to XZ"
            },
            "2": {
              "label": "Alice は自分の量子ビットを Bob に送る（1 量子ビット送信）。"
            },
            "3": {
              "label": "Bob は CNOT（Alice→Bob 制御）と H で復号し、両量子ビットを測定して (b₁b₂) を読む。",
              "latex": "(CNOT)(H \\otimes I) \\text{ reverses the encoding}"
            }
          }
        }
      },
      "expandables": {
        "noSignaling": {
          "title": "超高密度符号化のノーシグナリング",
          "p1": "ebit は符号化前に確立する必要があります——通常 Alice と Bob が会うか量子チャネルを使います。古典ビットは Alice が量子ビットを送るまで伝送されません；もつれだけでは有用な古典情報は運べません（ノーシグナリング）。"
        }
      },
      "labs": {
        "superdense": "超高密度符号化"
      }
    },
    "7.4": {
      "title": "7.4 量子テレポーテーション",
      "paragraphs": {
        "p1": "テレポーテーション（Bennett 他, 1993）は 1 ebit と 2 古典ビットで未知の量子ビット状態 |ψ⟩ を Alice から Bob に転送します——元の粒子を物理的に動かさず、複製もしません。"
      },
      "headings": {
        "correctionTable": "訂正表"
      },
      "tables": {
        "teleport": {
          "headers": {
            "0": "m₁ (Alice)",
            "1": "m₂ (Alice)",
            "2": "Bob が適用",
            "3": "効果"
          },
          "rows": {
            "0": {
              "m1": "0",
              "m2": "0",
              "correction": "I",
              "note": "変更不要"
            },
            "1": {
              "m1": "0",
              "m2": "1",
              "correction": "X",
              "note": "ビット反転"
            },
            "2": {
              "m1": "1",
              "m2": "0",
              "correction": "Z",
              "note": "位相反転"
            },
            "3": {
              "m1": "1",
              "m2": "1",
              "correction": "ZX (= iY)",
              "note": "両方反転"
            }
          }
        }
      },
      "workedExamples": {
        "algebra": {
          "title": "テレポーテーション代数",
          "steps": {
            "0": {
              "label": "開始：Alice は |ψ⟩ = α|0⟩ + β|1⟩ を保持；Alice と Bob は量子ビット 2,3 で |Φ⁺⟩ を共有。",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{\\sqrt{2}}(\\alpha|0\\rangle + \\beta|1\\rangle)(|00\\rangle + |11\\rangle)"
            },
            "1": {
              "label": "Alice の量子ビット (1,2) で Bell 基底に書き直す。異なる (m₁,m₂) 結果の 4 Bell 項が現れる。",
              "latex": "|\\psi\\rangle_1 \\otimes |\\Phi^+\\rangle_{23} = \\tfrac{1}{2}\\sum_{m_1,m_2} |B_{m_1 m_2}\\rangle_{12} \\otimes X^{m_2} Z^{m_1}|\\psi\\rangle_3"
            },
            "2": {
              "label": "Alice は量子ビット 1,2 を Bell 基底で測定 → 結果 m₁m₂。Bob の量子ビットは X^{m₂}Z^{m₁}|ψ⟩ になる。",
              "latex": "\\text{Bob applies } Z^{m_1} X^{m_2} \\text{ to recover } |\\psi\\rangle"
            },
            "3": {
              "label": "Alice は古典チャネルで (m₁,m₂) を Bob に送る。Bob は訂正を適用。理想装置では保真度 F = 1。",
              "latex": "F = |\\langle\\psi|\\psi_{\\text{out}}\\rangle|^2 = 1"
            }
          }
        }
      },
      "expandables": {
        "noCloning": {
          "title": "ノークローニングとノーシグナリング",
          "p1": "テレポーテーションは Alice の元の状態を破壊します（測定による）——ノークローニング定理と一致。2 古典ビットは Alice が測定するまで |ψ⟩ の情報を運びません；Bob は受信前に復号できません。情報は光速を超えて伝わりません。"
        }
      },
      "checkpoints": {
        "classicalBits": {
          "question": "テレポーテーションに必要な古典ビット数は？",
          "answer": "2"
        }
      },
      "labs": {
        "teleportation": "量子テレポーテーション"
      }
    },
    "7.5": {
      "title": "7.5 BB84 量子鍵配送",
      "paragraphs": {
        "p1": "BB84（Bennett & Brassard, 1984）は Alice と Bob が共有秘密鍵を確立でき、受動的盗聴に対して情報理論的に安全——エラー率の上昇で Eve を検出します。"
      },
      "headings": {
        "basisEncoding": "基底符号化"
      },
      "tables": {
        "basis": {
          "headers": {
            "0": "ビット",
            "1": "Z 基底",
            "2": "X 基底"
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
          "title": "BB84 プロトコル",
          "steps": {
            "0": {
              "label": "Alice は各量子ビットにランダムビットとランダム基底（Z または X）を選び、符号化して送信。"
            },
            "1": {
              "label": "Bob はランダムに選んだ Z または X 基底で各量子ビットを測定。"
            },
            "2": {
              "label": "Alice と Bob は基底を公開比較（結果は比較しない）。基底が一致した位置を保持——シフト済み鍵。"
            },
            "3": {
              "label": "シフト済みビットのランダム部分集合を比較してエラー率を推定。高すぎれば中止——盗聴の可能性。"
            },
            "4": {
              "label": "誤り訂正とプライバシー増幅を適用して最終秘密鍵を得る。"
            }
          }
        }
      },
      "expandables": {
        "eveAttack": {
          "title": "Eve の傍受–再送攻撃",
          "p1": "Eve が各量子ビットを傍受し、ランダム基底で測定して再送すると、半分の時間で基底を間違えます。Eve の基底 ≠ Alice の基底のとき、状態をランダム化——Bob のシフト済み鍵は約 25% のビットエラー（50% 誤基底 × 50% ランダム結果）。Alice と Bob はこれを検出して中止します。"
        },
        "security": {
          "title": "安全性の概説とノーシグナリング",
          "p1": "受動盗聴に対する BB84 の安全性は理想装置では情報理論的です。実運用では認証、誤り訂正、プライバシー増幅を追加します。量子チャネルは鍵配送を可能にしますが、瞬時の鍵抽出は許しません——シフトとエラー推定には古典通信が必要（全体を通じてノーシグナリング）。"
        }
      },
      "checkpoints": {
        "eveError": {
          "question": "Eve が BB84 量子ビットを傍受するとエラー率はどうなる？",
          "answer": "increases",
          "hint": "誤った基底での測定は状態を乱します。"
        }
      },
      "widgets": {
        "bb84": {
          "qubitsPerRun": "1 回の量子ビット数：{{num}}",
          "noEavesdropper": "盗聴者なし",
          "eveIntercepts": "Eve が傍受",
          "rerun": "再実行",
          "siftedKey": "シフト済み鍵長：{{length}} ビット（約 {{num}} の半分——一致基底）。シフト済みビットのエラー率：{{rate}}%",
          "eveDetected": " — 上昇、Eve 検出！",
          "footnote": "Eve がランダム基底で測定すると、基底 ≠ Alice のとき状態を乱し、シフト済み鍵に約 25% のエラーを導入します。"
        }
      },
      "labs": {
        "bb84": "BB84 シミュレータ"
      }
    }
  }
};
