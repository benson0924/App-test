import type { TranslationTree } from '@/i18n/types';

export const practice: TranslationTree = {
  "ui": {
    "title": "練習ハブ",
    "intro": "ヒント、段階的な開示、完全な解答付きのランダム問題。該当する場合は quantum-core で検証。",
    "mixed": "混合",
    "score": "スコア：",
    "newRandomSet": "新しいランダムセット",
    "shuffleNewSet": "セットをシャッフル",
    "questionOf": "問題 {{current}} / {{total}}",
    "verified": "✓ 検証済み",
    "check": "⚠ 要確認",
    "hint": "ヒント",
    "hideHint": "ヒントを隠す",
    "revealStep": "ステップ {{n}} を表示",
    "step": "ステップ {{n}}",
    "correct": "正解！",
    "incorrect": "不正解。",
    "fullSolution": "完全な解答",
    "finish": "終了",
    "next": "次へ"
  },
  "categories": {
    "classical": "古典",
    "oneQubit": "単一量子ビット",
    "linearAlgebra": "線形代数",
    "multiQubit": "多量子ビット",
    "protocols": "プロトコル",
    "algorithms": "アルゴリズム"
  },
  "problems": {
    "cl-xor": {
      "question": "{{a}} XOR {{b}} は？",
      "hint": "入力が異なるとき XOR は 1。",
      "step1": "ちょうど一方の入力が 1 のとき XOR は 1。",
      "step2": "入力：a={{a}}, b={{b}}。",
      "solution": "{{a}} ⊕ {{b}} = {{xor}}。"
    },
    "cl-bin": {
      "question": "二進 {{bits}} を十進に変換。",
      "hint": "ビットが 1 の位置の 2 の累乗を足す。",
      "step1": "右から 2⁰, 2¹, 2², … として読む。",
      "step2": "{{bits}} を基数 2 で評価。",
      "solution": "{{bits}}₂ = {{dec}}₁₀。"
    },
    "cl-dec": {
      "question": "十進 {{x}} を 4 ビット二進に変換。",
      "hint": "2 で割り続け、下から余りを読む。",
      "step1": "{{x}} を 2 で割り続けて余りを得る。",
      "step2": "4 ビットにパディング。",
      "solution": "{{x}}₁₀ = {{bin}}₂。"
    },
    "cl-add": {
      "question": "二進加算：{{a}} + {{b}} = ?",
      "hint": "リップルキャリー：XOR で和ビット、AND でキャリー。",
      "step1": "右からビットごとにキャリー付きで加算。",
      "step2": "結果",
      "solution": "{{a}} + {{b}} = {{sum}}（二進）。"
    },
    "1q-prob": {
      "question": "|ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩（正規化）のとき P(0) は？",
      "hint": "ボーンの規則：確率は振幅の二乗の大きさ。",
      "step1": "状態から α を特定。",
      "step2": "|α|² を計算。",
      "solution": "P(0) = |α|² = {{p0}}。"
    },
    "1q-gate": {
      "question": "{{gate}} は |0⟩ をどの状態に写すか？",
      "hint": "ゲート行列を |0⟩ に適用。",
      "step1": "{{gate}}|0⟩ を書く。",
      "step2": "ゲートの標準行列を使う。",
      "solution": "{{gate}}|0⟩ → {{target}}。"
    },
    "1q-bloch": {
      "question": "ブロッホ球上の量子ビットで θ = {{deg}}°。z = cos θ は？",
      "hint": "ブロッホベクトル (x, y, z)、z = cos θ。",
      "step1": "ブロッホ球で z = cos θ を使う。",
      "step2": "評価。",
      "solution": "z = cos({{theta}}) ≈ {{z}}。"
    },
    "1q-hh": {
      "question": "H² は任意の単一量子ビット状態に何をするか？",
      "hint": "H は大域位相を除き自身の逆；H² = I。",
      "step1": "H² = I を思い出す。",
      "step2": "H を 2 回適用すると元の状態に戻る。",
      "solution": "H² = I、よって H は対合。"
    },
    "la-unitary": {
      "question": "ユニタリ行列 U を定義する条件は？",
      "hint": "ユニタリは内積を保存。",
      "step1": "ユニタリ演算子はノルムを保存。",
      "step2": "行列条件",
      "solution": "U†U = I（UU† = I と同値）。"
    },
    "la-hermitian": {
      "question": "パウリ Z はエルミート。|1⟩ の固有値は？",
      "hint": "Z = diag(1, −1)。",
      "step1": "計算基底で Z を書く。",
      "step2": "|1⟩ に適用。",
      "solution": "|1⟩ の固有値は −1。"
    },
    "la-tensor": {
      "question": "n 量子ビットのヒルベルト空間の次元は？",
      "hint": "量子ビットごとに因子 2 が増える。",
      "step1": "n 個の ℂ² のテンソル積。",
      "step2": "次元",
      "solution": "2ⁿ 次元の複ベクトル空間。"
    },
    "la-inner": {
      "question": "|0⟩ と |1⟩ は直交するか？",
      "hint": "⟨0|1⟩ を計算。",
      "step1": "基底状態の内積。",
      "step2": "⟨0|1⟩ = 0",
      "solution": "はい — 計算基底は正規直交。"
    },
    "mq-bell": {
      "question": "|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 は積状態か？",
      "hint": "c₀₀·c₁₁ = c₀₁·c₁₀ を確認。",
      "step1": "2 量子ビットの積状態の条件。",
      "step2": "ベル状態は因数分解できない — もつれ。",
      "solution": "いいえ — |Φ⁺⟩ はもつれている。"
    },
    "mq-cnot": {
      "question": "CNOT|10⟩ は何を生成するか？",
      "hint": "制御は第 1 量子ビット（1）；制御が 1 のときターゲットを反転。",
      "step1": "制御 = 1、ターゲット = 0。",
      "step2": "ターゲット反転 → |11⟩。",
      "solution": "CNOT|10⟩ = |11⟩。"
    },
    "mq-swap": {
      "question": "標準 SWAP 分解の CNOT ゲート数は？",
      "hint": "SWAP = CNOT ·（中間量子ビット CNOT）· CNOT パターン。",
      "step1": "標準回路：CNOT₁₂ · CNOT₂₁ · CNOT₁₂。",
      "step2": "3 つの CNOT で十分。",
      "solution": "3 個の CNOT ゲート。"
    },
    "mq-phi": {
      "question": "|Φ⁺⟩ の両量子ビットを Z 基底で測定：P(00)？",
      "hint": "|00⟩ と |11⟩ のみ非零振幅、等しい重み。",
      "step1": "振幅：( |00⟩ + |11⟩)/√2。",
      "step2": "P(00) = |1/√2|² = 1/2。",
      "solution": "P(00) = 1/2。"
    },
    "pr-bb84": {
      "question": "BB84 は認証済み古典チャネルが必要か？",
      "hint": "基底ふるいと盗聴検出は古典通信を使う。",
      "step1": "量子状態が鍵材料を運ぶ。",
      "step2": "古典後処理で基底を比較し誤り率を推定。",
      "solution": "はい — 認証済み古典チャネルが必要。"
    },
    "pr-chsh": {
      "question": "CHSH パラメータ S の古典（LHV）上界は？",
      "hint": "ツィレルソン上界は 2√2（量子）；古典は 2。",
      "step1": "CHSH：S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′)。",
      "step2": "古典 |S| ≤ 2。",
      "solution": "古典では |S| ≤ 2。"
    },
    "pr-tele": {
      "question": "量子テレポーテーションは 2 古典ビットと共有もつれだけで量子状態を送るか？",
      "hint": "超光速ではない；2 古典ビット + 1 ebit。",
      "step1": "Alice がベル基底で測定 → 2 古典ビット。",
      "step2": "Bob がビットに基づき訂正を適用。",
      "solution": "はい — 2 古典ビット + 1 共有ベル対。"
    },
    "pr-sd": {
      "question": "超高密度符号化は 1 量子ビット + 1 ebit で何古典ビット送れるか？",
      "hint": "共有ベル状態への 4 つのパウリ操作で 00,01,10,11 を符号化。",
      "step1": "Alice がベル対の半分にパウリで 2 ビットを符号化。",
      "step2": "Bob がベル測定 → 2 ビット復元。",
      "solution": "2 古典ビット。"
    },
    "alg-grover": {
      "question": "N = 2^{{n}} 項目のグローバー探索のクエリ計算量は？",
      "hint": "古典 O(N) に対する二次加速。",
      "step1": "グローバー反復でマーク状態の振幅を増幅。",
      "step2": "約 π/4 · √N 回の反復。",
      "solution": "O(√N) オラクルクエリ。"
    },
    "alg-dj": {
      "question": "ドイチ・ヨズサ：n ビットの定数とバランスを区別する照会数は？",
      "hint": "量子アルゴリズムは 1 回のオラクル照会で十分。",
      "step1": "一様重ね合わせを準備、オラクル適用、測定。",
      "step2": "1 回の照会で十分。",
      "solution": "1 回（量子）対 古典最悪 2ⁿ⁻¹ + 1。"
    },
    "alg-shor": {
      "question": "ショアアルゴリズムは N を因数分解する際 a^x mod N の何を見つけるか？",
      "hint": "a^r ≡ 1 (mod N) を満たす位数 r。",
      "step1": "N と互素のランダム a を選ぶ。",
      "step2": "f(x) = a^x mod N の周期 r を見つける。",
      "solution": "合同累乗の周期（位数）r。"
    },
    "alg-deutsch": {
      "question": "ドイチ（1 ビット）：f が定数かどうかの最大古典照会数は？",
      "hint": "最悪：f(0) を照会しても不明、f(1) が必要。",
      "step1": "古典では 1 回の照会で 2 関数が残る。",
      "step2": "最悪で 2 回目が必要。",
      "solution": "古典 2 回対 量子 1 回。"
    }
  },
  "choices": {
    "yes": "はい",
    "no": "いいえ",
    "period": "周期",
    "minimum": "最小値",
    "maximum": "最大値",
    "parityOnly": "パリティのみ",
    "identity": "恒等（状態を返す）",
    "bitFlip": "ビット反転",
    "phaseFlip": "位相反転",
    "projectZero": "|0⟩ に射影",
    "unitary": "U†U = I",
    "hermitian": "U = U†",
    "detZero": "det(U) = 0",
    "real": "U は実数",
    "dim2n": "2ⁿ",
    "dimN2": "n²",
    "dim2nLinear": "2n",
    "dimFactorial": "n!",
    "cnotCount1": "1",
    "cnotCount2": "2",
    "cnotCount3": "3",
    "cnotCount4": "4",
    "sdBits1": "1",
    "sdBits2": "2",
    "sdBits3": "3",
    "sdBits4": "4",
    "query1": "1",
    "queryN": "n",
    "query2n": "2ⁿ⁻¹ + 1",
    "query2nFull": "2ⁿ",
    "deutschClassical2": "2",
    "deutschClassical3": "3",
    "deutschClassical4": "4",
    "chsh2": "≤ 2",
    "chsh2sqrt2": "≤ 2√2",
    "chsh4": "≤ 4",
    "chsh1": "≤ 1",
    "groverSqrt": "O(√N)",
    "groverLog": "O(log N)",
    "groverN": "O(N)",
    "groverN2": "O(N²)",
    "ket0": "|0⟩",
    "ket1": "|1⟩",
    "ketPlus": "|+⟩",
    "ketMinus1": "−|1⟩",
    "prob05": "0.5",
    "prob025": "0.25",
    "prob1": "1",
    "prob0": "0"
  }
};
