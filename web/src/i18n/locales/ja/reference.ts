import type { TranslationTree } from '@/i18n/types';

export const reference: TranslationTree = {
  "index": {
    "title": "リファレンス",
    "gates": {
      "title": "ゲートリファレンス",
      "desc": "単一・多量子ビットゲートの行列。"
    },
    "formulas": {
      "title": "公式シート",
      "desc": "各章の主要方程式。"
    },
    "complexity": {
      "title": "計算量",
      "desc": "古典と量子のクエリ／時間境界。"
    },
    "glossary": {
      "title": "用語集",
      "desc": "ナビゲーションデータの用語。"
    },
    "misconceptions": {
      "title": "よくある誤解",
      "desc": "よくある迷思と正しい説明。"
    }
  },
  "gates": {
    "title": "ゲートリファレンス",
    "intro": "シンボル、行列（quantum-core 由来）、作用、ブロッホ球の解釈、逆ゲートを含む完全なゲート表。",
    "singleQubit": "単一量子ビットゲート",
    "twoQubit": "2 量子ビットゲート",
    "threeQubit": "3 量子ビットゲート",
    "commonIdentities": "よく使う恒等式",
    "pauliRelations": "パウリ群の関係",
    "universalSets": "汎用ゲート集合",
    "colSymbol": "記号",
    "colMatrix": "行列",
    "colAction": "作用",
    "colBloch": "ブロッホ",
    "colInverse": "逆",
    "universalEstablished1": "確立：{H, S, T, CNOT} は耐故障計算で一般的な汎用集合（T ゲートは FT では魔法状態蒸留が必要）。",
    "universalEstablished2": "確立：{Rx, Ry, Rz, CNOT} は NISQ デバイスでの近似合成に汎用。",
    "I": {
      "name": "恒等",
      "action": "I|0⟩ = |0⟩, I|1⟩ = |1⟩ — 変化なし",
      "bloch": "恒等回転：ブロッホ球上で移動なし",
      "inverse": "I† = I"
    },
    "X": {
      "name": "パウリ X（NOT）",
      "action": "ビット反転：X|0⟩ = |1⟩, X|1⟩ = |0⟩",
      "bloch": "x 軸まわりに π 回転：|0⟩ ↔ |1⟩",
      "inverse": "X† = X (X² = I)"
    },
    "Y": {
      "name": "パウリ Y",
      "action": "Y|0⟩ = i|1⟩、Y|1⟩ = −i|0⟩",
      "bloch": "y 軸まわりに π 回転",
      "inverse": "Y† = Y (Y² = I)"
    },
    "Z": {
      "name": "パウリ Z",
      "action": "位相反転：Z|0⟩ = |0⟩、Z|1⟩ = −|1⟩",
      "bloch": "z 軸まわりに π 回転",
      "inverse": "Z† = Z (Z² = I)"
    },
    "H": {
      "name": "アダマール",
      "action": "H|0⟩ = |+⟩, H|1⟩ = |−⟩",
      "bloch": "(x+z)/√2 軸まわりに π；z ↔ x",
      "inverse": "H† = H (H² = I)"
    },
    "S": {
      "name": "位相（S ゲート）",
      "action": "S|0⟩ = |0⟩、S|1⟩ = i|1⟩",
      "bloch": "z 軸まわりに π/2 回転",
      "inverse": "S† = S³ = ZS (S² = Z)"
    },
    "T": {
      "name": "π/8 ゲート",
      "action": "T|0⟩ = |0⟩、T|1⟩ = e^{iπ/4}|1⟩",
      "bloch": "z 軸まわりに π/4 回転",
      "inverse": "T† = T⁷ (T² = S, T⁴ = Z)"
    },
    "Rx": {
      "name": "x 軸回転",
      "action": "R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩",
      "bloch": "x 軸まわりに θ 回転",
      "inverse": "R_x(θ)† = R_x(−θ)"
    },
    "Ry": {
      "name": "y 軸回転",
      "action": "R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩",
      "bloch": "y 軸まわりに θ 回転",
      "inverse": "R_y(θ)† = R_y(−θ)"
    },
    "Rz": {
      "name": "z 軸回転",
      "action": "R_z(θ)|0⟩ = e^{−iθ/2}|0⟩、R_z(θ)|1⟩ = e^{iθ/2}|1⟩",
      "bloch": "z 軸まわりに θ 回転（|0⟩ の大域位相）",
      "inverse": "R_z(θ)† = R_z(−θ)"
    },
    "CNOT": {
      "name": "制御 NOT",
      "action": "CNOT|a,b⟩ = |a, b⊕a⟩ — 制御が 1 のときターゲットを反転",
      "bloch": "もつれを生成；単一量子ビットのブロッホ回転ではない",
      "inverse": "CNOT† = CNOT (CNOT² = I on target)"
    },
    "CZ": {
      "name": "制御 Z",
      "action": "CZ|11⟩ = −|11⟩；他は不変 — 両方 1 のとき π 位相",
      "bloch": "もつれ位相ゲート；CZ = (I⊗H) CNOT (I⊗H)",
      "inverse": "CZ† = CZ (CZ² = I)"
    },
    "SWAP": {
      "name": "スワップ",
      "action": "SWAP|a,b⟩ = |b,a⟩",
      "bloch": "量子ビット状態を交換；3 CNOT 分解",
      "inverse": "SWAP† = SWAP (SWAP² = I)"
    },
    "Toffoli": {
      "name": "CCNOT（トフォリ）",
      "action": "両制御が |1⟩ のときターゲットを反転",
      "bloch": "汎用古典論理；可逆 AND",
      "inverse": "Toffoli† = Toffoli（自己逆）"
    }
  },
  "formulas": {
    "title": "公式シート",
    "intro": "教科書の記法に沿ったクイックリファレンス。研究カットオフ：2026年9月。",
    "singleQubit": "単一量子ビット状態",
    "measurement": "測定",
    "linearAlgebra": "線形代数",
    "multiQubit": "多量子ビットとテンソル積",
    "bell": "ベル状態",
    "singleGates": "単一量子ビットゲート",
    "multiGates": "多量子ビットゲート",
    "entanglementChsh": "もつれと CHSH",
    "qft": "量子フーリエ変換",
    "grover": "グローバーアルゴリズム",
    "shor": "ショアアルゴリズム",
    "phaseEst": "位相推定",
    "errorCorrection": "誤り訂正",
    "noise": "ノイズとデコヒーレンス",
    "complexity": "計算量クラス",
    "classical": "古典計算（第 I 部）"
  },
  "misconceptions": {
    "myth": "迷思：",
    "correction": "正しい説明："
  },
  "complexity": {
    "title": "計算量リファレンス",
    "intro": "基礎量子アルゴリズムのクエリ・時間計算量の比較。定数は省略；特記なき場合は耐故障モデルを仮定。",
    "tableTitle": "アルゴリズム比較表",
    "colAlgorithm": "アルゴリズム",
    "colProblem": "問題",
    "colClassical": "古典",
    "colQuantum": "量子",
    "colNotes": "注記",
    "bqpTitle": "BQP の定義",
    "bqpIntro": "BQP（有界誤差量子多項式時間）は誤差確率最大 1/3 で一様な多項式時間量子回路族が解ける決定問題のクラス。",
    "bqpContainments": "既知の包含：古典多項式時間は量子の部分集合、量子シミュレーションは PSPACE を超えない。",
    "cautionTitle": "注意：BQP と NP",
    "cautionIntro": "NP ⊆ BQP かは未解。量子コンピュータがすべての NP 完全問題を効率的に解けるとは知られていない。ショアは周期探索／因数分解に適用され、一般 NP 探索ではない。",
    "cautionGrover": "グローバーは非構造探索で二次加速のみ — 指数ではない。",
    "cautionPromise": "ドイチ・ヨズサとバーンスタイン・ヴァジラニの優位は構造化オラクルの約束問題に対するもの。",
    "cautionSampling": "ランダム回路サンプリングは特定タスクで古典シミュレーションが困難な量子振る舞いを示す — 普遍的 NP 加速ではない。",
    "queryVsTime": "クエリ計算量 vs 時間計算量",
    "queryVsTimeBody": "クエリ計算量はオラクル呼び出し（ドイチ、グローバー）。時間計算量はオラクルと演算の回路サイズを含む（ショア）。少ないクエリは大きな古典前処理や高コストオラクルを隠すことがある。",
    "faultTolerance": "耐故障要件",
    "faultToleranceBody": "ショアの因数分解と大規模位相推定は閾値以下のエラー率の耐故障論理量子ビットが必要。訂正なし NISQ では暗号学的に relevant なショアは実行不能 — 計算量の記述は理想耐故障モデルを仮定。",
    "checkpointQ": "グローバーアルゴリズムは BQP が NP を含むことを証明するか？",
    "checkpointHint": "グローバーは二次であり指数ではない；NP と BQP は未解。",
    "rows": {
      "deutsch": {
        "algorithm": "ドイチ",
        "problem": "f:{0,1}→{0,1} は定数かバランスか？",
        "classical": "2 照会（最悪）",
        "quantum": "1 照会",
        "notes": "最初の優位；バランス = 少なくとも一入力で出力が異なる"
      },
      "deutschJozsa": {
        "algorithm": "ドイチ・ヨズサ",
        "problem": "定数 vs バランス f:{0,1}ⁿ→{0,1}",
        "classical": "2ⁿ⁻¹ + 1 照会（最悪）",
        "quantum": "1 照会",
        "notes": "指数的クエリ優位；実用外（約束問題）"
      },
      "bernsteinVazirani": {
        "algorithm": "バーンスタイン・ヴァジラニ",
        "problem": "隠れ文字列 s を見つける、f(x) = s·x mod 2",
        "classical": "n 照会",
        "quantum": "1 照会",
        "notes": "線形クエリ優位；ドイチ・ヨズサの一般化"
      },
      "grover": {
        "algorithm": "グローバー",
        "problem": "N 項目の非構造探索",
        "classical": "O(N) 照会",
        "quantum": "O(√N) 照会",
        "notes": "二次加速；非構造探索で最適"
      },
      "shor": {
        "algorithm": "ショア",
        "problem": "N ビット整数の因数分解",
        "classical": "準指数（GNFS）；多項式時間は未知",
        "quantum": "多項式時間（耐故障モデル）",
        "notes": "QFT + 位相推定が必要；暗号スケールでは NISQ 非現実的"
      },
      "simon": {
        "algorithm": "サイモン",
        "problem": "f(x)=f(x⊕s) の隠れ周期を見つける",
        "classical": "O(2ⁿ/²) 照会",
        "quantum": "O(n) 照会",
        "notes": "指数的優位；ショアの前身"
      },
      "stateSimulation": {
        "algorithm": "状態シミュレーション",
        "problem": "n 量子ビット汎用回路のシミュレーション",
        "classical": "O(2ⁿ) メモリ／時間",
        "quantum": "物理実装 — 完全 2ⁿ ベクトル出力は非効率",
        "notes": "クリフォード回路は古典 O(n²)（ゴッテスマン–ニル）"
      }
    }
  }
};
