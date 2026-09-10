import type { TranslationTree } from '@/i18n/types';

export const shor: TranslationTree = {
  "title": "第11章：ショアアルゴリズム",
  "intro": "ショアアルゴリズム（1994）は耐故障量子コンピュータで大きな合成整数を多項式時間で因数分解——RSA と Diffie–Hellman を脅かす。量子の核心は QPE による周期探索；残りは古典数論。",
  "labLink": "フルラボを開く：{{title}} →",
  "sections": {
    "11.1": {
      "title": "11.1 周期探索への帰着",
      "paragraphs": {
        "p1": "合成数 N を因数分解するには、1 < a < N かつ gcd(a, N) = 1 のランダム a を選ぶ。gcd(a, N) > 1 なら古典的に因数が見つかった。そうでなければ最小 r > 0 で次を満たすものを見つける：",
        "p2": "この r は a の mod N の周期（位数）。周期探索が困難な量子ステップ；r からの因数分解は古典 gcd 演算。"
      },
      "cards": {
        "quantum": {
          "title": "⚛ 量子部分",
          "items": {
            "0": "x 上に重ね合わせを準備",
            "1": "a^x mod N を計算（モジュラー指数）",
            "2": "QPE + QFT で周期 r を抽出"
          }
        },
        "classical": {
          "title": "⚙ 古典部分",
          "items": {
            "0": "ランダム a を選び gcd を確認",
            "1": "r が偶数、a^{r/2} ≢ −1 を確認",
            "2": "gcd(a^{r/2} ± 1, N) を計算",
            "3": "自明因数なら再試行"
          }
        }
      },
      "labs": {
        "period-finding": "周期エクスプローラ"
      }
    },
    "11.2": {
      "title": "11.2 周期から因数へ",
      "paragraphs": {
        "p1": "a^r ≡ 1 (mod N) の周期 r が与えられたとき、a^r − 1 ≡ 0 (mod N) なので N は (a^{r/2} − 1)(a^{r/2} + 1) を割る。a^{r/2} ≢ −1 (mod N) ならどちらの因子も N の倍数ではなく、gcd が非自明因数を抽出。"
      },
      "workedExamples": {
        "conditions": {
          "title": "成功する因数分解の条件",
          "steps": {
            "0": {
              "label": "r は偶数で r/2 が整数になる必要がある。",
              "latex": "r = 2k \\text{ for some integer } k"
            },
            "1": {
              "label": "a^{r/2} ≢ −1 (mod N)。否则両 gcd が 1 または N——自明。",
              "latex": "a^{r/2} \\not\\equiv -1 \\pmod{N}"
            },
            "2": {
              "label": "両条件が成立すれば、gcd(a^{r/2} − 1, N) と gcd(a^{r/2} + 1, N) はランダム a で確率 ≥ 1/2 で非自明因数。",
              "latex": "p \\cdot q = N"
            },
            "3": {
              "label": "いずれか失敗なら新しい a で再試行。期待 O(1) 回。",
              "latex": "\\text{Repeat until success}"
            }
          }
        }
      },
      "expandables": {
        "minusOne": {
          "title": "a^{r/2} ≡ −1 が失敗を招く理由",
          "p1": "a^{r/2} ≡ −1 (mod N) なら a^{r/2} + 1 ≡ 0 (mod N)、gcd(a^{r/2} + 1, N) = N——自明因数。同様 gcd(a^{r/2} − 1, N) = 1。有効周期の約半分が有用な因数；残りは別の a で再試行。"
        }
      },
      "checkpoints": {
        "gcd": {
          "question": "周期 r から因数を抽出する gcd 計算は？",
          "answer": "gcd(a^{r/2} ± 1, N)",
          "hint": "a^r − 1 因数分解の ±1。"
        }
      }
    },
    "11.3": {
      "title": "11.3 15 の因数分解：インタラクティブウォークスルー",
      "paragraphs": {
        "p1": "標準デモは a = 2 で N = 15 を因数分解。2^x mod 15 の周期は r = 4、因数 3 と 5。"
      },
      "workedExamples": {
        "summary": {
          "title": "a = 2, N = 15（要約）",
          "steps": {
            "0": {
              "label": "列 2^x mod 15：1, 2, 4, 8, 1, … → 周期 r = 4。",
              "latex": "2^4 \\equiv 1 \\pmod{15}"
            },
            "1": {
              "label": "r は偶数。a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15)。✓",
              "latex": "4 \\not\\equiv -1 \\pmod{15}"
            },
            "2": {
              "label": "gcd(4 − 1, 15) = gcd(3, 15) = 3。",
              "latex": "\\gcd(3, 15) = 3"
            },
            "3": {
              "label": "gcd(4 + 1, 15) = gcd(5, 15) = 5。よって 15 = 3 × 5。",
              "latex": "15 = 3 \\times 5"
            }
          }
        }
      },
      "widgets": {
        "stepper": {
          "intro": "インタラクティブウォークスルー：a = 2 で N = 15 を因数分解（ショア標準デモ）。",
          "classicalStep": "⚙ 古典ステップ",
          "quantumStep": "⚛ 量子ステップ",
          "periodMark": " ← 周期！",
          "factors": "因数：",
          "reset": "リセット",
          "next": "次のステップ →",
          "done": "完了",
          "steps": {
            "0": {
              "title": "N と互素 a を選ぶ",
              "classical": "true",
              "content": "合成数 N = 15。a = 2 を選び gcd(2, 15) = 1。"
            },
            "1": {
              "title": "モジュラー累乗を計算（古典チェック）",
              "classical": "true",
              "content": "x = 0, 1, 2, … の 2^x mod 15 を評価して反復を見つける。"
            },
            "2": {
              "title": "量子周期探索",
              "classical": "false",
              "content": "U|y⟩ = |2^x · y mod 15⟩ で QPE + QFT が 2^x mod 15 の周期 r を推定。"
            },
            "3": {
              "title": "周期 r = 4 を確認",
              "classical": "true",
              "content": "2^4 mod 15 = 16 mod 15 = 1。列：1, 2, 4, 8, 1, …"
            },
            "4": {
              "title": "r が偶数か確認",
              "classical": "true",
              "content": "r = 4 は偶数。r が奇数なら別の a で再開。"
            },
            "5": {
              "title": "a^{r/2} mod N を計算",
              "classical": "true",
              "content": "2^{4/2} mod 15 = 2² mod 15 = 4。"
            },
            "6": {
              "title": "a^{r/2} ≢ −1 (mod N) を確認",
              "classical": "true",
              "content": "4 ≢ 14 (≡ −1 mod 15)。a^{r/2} ≡ −1 なら再開——この a から因数なし。"
            },
            "7": {
              "title": "gcd で因数を抽出",
              "classical": "true",
              "content": "gcd(4 − 1, 15) = gcd(3, 15) = 3。gcd(4 + 1, 15) = gcd(5, 15) = 5。"
            },
            "8": {
              "title": "因数分解を確認",
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
        "shor": "ショアアルゴリズムデモ"
      }
    },
    "11.4": {
      "title": "11.4 計算量",
      "paragraphs": {
        "p1": "O(n) 量子ビットと poly(n) ゲートの耐故障量子コンピュータ上で：",
        "p2": "既知の最良古典因数分解（一般数体篩法）は準指数：exp(O((log N)^{1/3})). ショアは超多項式加速——ポスト量子暗号移行の理由。"
      },
      "tables": {
        "complexity": {
          "headers": {
            "0": "コンポーネント",
            "1": "古典 / 量子",
            "2": "コスト"
          },
          "rows": {
            "0": {
              "component": "a 選択、gcd チェック",
              "type": "古典",
              "cost": "O(log² N)"
            },
            "1": {
              "component": "モジュラー指数回路",
              "type": "量子",
              "cost": "O(n³) ゲート"
            },
            "2": {
              "component": "QPE + QFT",
              "type": "量子",
              "cost": "O(n² log N) ゲート"
            },
            "3": {
              "component": "連分数",
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
          "question": "耐故障マシンでのショアの実行時間（n = log N）は？",
          "answer": "polynomial",
          "hint": "Poly(n) = poly(log N)。"
        }
      }
    },
    "11.5": {
      "title": "11.5 暗号への影響",
      "paragraphs": {
        "p1": "RSA、Diffie–Hellman、楕円曲線暗号（ショアの離散対数版）は因数分解または離散対数の困難性に依存。大規模耐故障量子コンピュータでショアを実行すればこれらを破る。"
      },
      "headings": {
        "relatedLabs": "関連ラボ"
      },
      "expandables": {
        "pqc": {
          "title": "ポスト量子暗号（PQC）",
          "p1": "NIST は格子問題、ハッシュ署名、符号ベース方式に基づくポスト量子アルゴリズム（2024）を標準化——ショアが攻撃しない数学的仮定。政府・産業標準での PQC 移行が進行中。",
          "p2": "重要な nuance：今日の NISQ デバイスは暗号学的に関連する鍵サイズ（2048 ビット RSA）で完全なショアを実行できない。「今収集、後で復号」脅威が積極的移行を促す——即時破られへの panic ではない。"
        },
        "periodHeart": {
          "title": "周期探索——量子の心臓",
          "p1": "量子サブルーチンはモジュラー乗算ユニタリで QPE を使い f(x) = a^x mod N の周期 r を推定。QFT は x の周期構造を N/r の倍数のピークに変換；連分数が測定位相から r を復元。第9章（QFT）と第10章（QPE）を参照。"
        }
      },
      "labLinks": {
        "shor": "ショアアルゴリズムデモ（N=15）",
        "period-finding": "周期エクスプローラ",
        "phase-estimation": "位相推定",
        "qft": "QFT ビジュアライザ"
      }
    }
  }
};
