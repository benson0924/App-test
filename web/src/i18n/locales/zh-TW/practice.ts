import type { TranslationTree } from '@/i18n/types';

export const practice: TranslationTree = {
  "ui": {
    "title": "練習中心",
    "intro": "隨機題目，附提示、逐步揭示與完整解答。適用時以 quantum-core 驗證答案。",
    "mixed": "混合",
    "score": "得分：",
    "newRandomSet": "新隨機題組",
    "shuffleNewSet": "重新洗牌題組",
    "questionOf": "第 {{current}} 題，共 {{total}} 題",
    "verified": "✓ 已驗證",
    "check": "⚠ 請檢查",
    "hint": "提示",
    "hideHint": "隱藏提示",
    "revealStep": "揭示步驟 {{n}}",
    "step": "步驟 {{n}}",
    "correct": "正確！",
    "incorrect": "不正確。",
    "fullSolution": "完整解答",
    "finish": "完成",
    "next": "下一題"
  },
  "categories": {
    "classical": "古典",
    "oneQubit": "單量子位元",
    "linearAlgebra": "線性代數",
    "multiQubit": "多量子位元",
    "protocols": "協定",
    "algorithms": "演算法"
  },
  "problems": {
    "cl-xor": {
      "question": "{{a}} XOR {{b}} 是多少？",
      "hint": "輸入不同時 XOR 為 1。",
      "step1": "恰有一個輸入為 1 時 XOR 回傳 1。",
      "step2": "輸入：a={{a}}, b={{b}}。",
      "solution": "{{a}} ⊕ {{b}} = {{xor}}。"
    },
    "cl-bin": {
      "question": "將二元 {{bits}} 轉為十進位。",
      "hint": "對位元為 1 的位置加 2 的冪。",
      "step1": "從右到左讀位元為 2⁰, 2¹, 2², …",
      "step2": "計算 {{bits}} 的二進位值。",
      "solution": "{{bits}}₂ = {{dec}}₁₀。"
    },
    "cl-dec": {
      "question": "將十進位 {{x}} 轉為 4 位元二進位。",
      "hint": "反覆除以 2，自下而上讀取餘數。",
      "step1": "反覆將 {{x}} 除以 2 取得餘數。",
      "step2": "補足至 4 位元。",
      "solution": "{{x}}₁₀ = {{bin}}₂。"
    },
    "cl-add": {
      "question": "二進位加法：{{a}} + {{b}} = ?",
      "hint": "使用漣波進位：XOR 得和位元，AND 得進位。",
      "step1": "從右至左逐位相加並處理進位。",
      "step2": "結果",
      "solution": "{{a}} + {{b}} = {{sum}}（二進位）。"
    },
    "1q-prob": {
      "question": "若 |ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩（已歸一化），P(0) 是多少？",
      "hint": "Born 規則：機率為振幅模長的平方。",
      "step1": "從狀態中識別 α。",
      "step2": "計算 |α|²。",
      "solution": "P(0) = |α|² = {{p0}}。"
    },
    "1q-gate": {
      "question": "{{gate}} 將 |0⟩ 映射到哪個狀態？",
      "hint": "將閘矩陣套用到 |0⟩。",
      "step1": "寫出 {{gate}}|0⟩。",
      "step2": "使用該閘的標準矩陣。",
      "solution": "{{gate}}|0⟩ → {{target}}。"
    },
    "1q-bloch": {
      "question": "Bloch 球上的量子位元 θ = {{deg}}°。z = cos θ 是多少？",
      "hint": "Bloch 向量 (x, y, z)，其中 z = cos θ。",
      "step1": "在 Bloch 球上使用 z = cos θ。",
      "step2": "計算。",
      "solution": "z = cos({{theta}}) ≈ {{z}}。"
    },
    "1q-hh": {
      "question": "H² 對任意單量子位元狀態有何作用？",
      "hint": "H 在全局相位下為自身逆；H² = I。",
      "step1": "回想 H² = I。",
      "step2": "因此連續套用 H 兩次會回到原狀態。",
      "solution": "H² = I，故 H 為對合。"
    },
    "la-unitary": {
      "question": "哪個條件定義酉矩陣 U？",
      "hint": "酉算子保持內積。",
      "step1": "酉算子保持范數。",
      "step2": "矩陣條件",
      "solution": "U†U = I（等价於 UU† = I）。"
    },
    "la-hermitian": {
      "question": "Pauli Z 為 Hermitian。它在 |1⟩ 上的本征值是多少？",
      "hint": "Z = diag(1, −1)。",
      "step1": "在計算基下寫出 Z。",
      "step2": "套用到 |1⟩。",
      "solution": "在 |1⟩ 上本征值為 −1。"
    },
    "la-tensor": {
      "question": "n 個量子位元的 Hilbert 空間維度是多少？",
      "hint": "每增加一個量子位元，維度乘以 2。",
      "step1": "n 個 ℂ² 的張量積。",
      "step2": "維度",
      "solution": "2ⁿ 維複向量空間。"
    },
    "la-inner": {
      "question": "|0⟩ 與 |1⟩ 是否正交？",
      "hint": "計算 ⟨0|1⟩。",
      "step1": "基態的內積。",
      "step2": "⟨0|1⟩ = 0",
      "solution": "是 — 計算基為正規正交。"
    },
    "mq-bell": {
      "question": "|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 是乘積態嗎？",
      "hint": "檢查 c₀₀·c₁₁ = c₀₁·c₁₀。",
      "step1": "雙量子位元乘積態判準。",
      "step2": "Bell 態無法因式分解 — 為糾纏態。",
      "solution": "否 — |Φ⁺⟩ 為糾纏態。"
    },
    "mq-cnot": {
      "question": "CNOT|10⟩ 產生什麼？",
      "hint": "控制為第一個量子位元（1）；控制為 1 時翻轉目標。",
      "step1": "控制 = 1，目標 = 0。",
      "step2": "翻轉目標 → |11⟩。",
      "solution": "CNOT|10⟩ = |11⟩。"
    },
    "mq-swap": {
      "question": "標準 SWAP 分解需要多少個 CNOT 閘？",
      "hint": "SWAP = CNOT ·（中間量子位元 CNOT）· CNOT 模式。",
      "step1": "標準電路：CNOT₁₂ · CNOT₂₁ · CNOT₁₂。",
      "step2": "三個 CNOT 即可。",
      "solution": "3 個 CNOT 閘。"
    },
    "mq-phi": {
      "question": "在 Z 基測量 |Φ⁺⟩ 的兩個量子位元：P(00)？",
      "hint": "僅 |00⟩ 與 |11⟩ 有非零振幅，權重相等。",
      "step1": "振幅：( |00⟩ + |11⟩)/√2。",
      "step2": "P(00) = |1/√2|² = 1/2。",
      "solution": "P(00) = 1/2。"
    },
    "pr-bb84": {
      "question": "BB84 需要經認證的古典通道嗎？",
      "hint": "基篩選與竊聽者偵測使用古典通信。",
      "step1": "量子態承載密鑰材料。",
      "step2": "古典後處理比較基並估計錯誤率。",
      "solution": "是 — 需要經認證的古典通道。"
    },
    "pr-chsh": {
      "question": "CHSH 參數 S 的古典（LHV）上界？",
      "hint": "Tsirelson 上界為 2√2（量子）；古典為 2。",
      "step1": "CHSH：S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′)。",
      "step2": "古典 |S| ≤ 2。",
      "solution": "古典上 |S| ≤ 2。"
    },
    "pr-tele": {
      "question": "量子傳態是否僅用 2 個古典位元加共享糾纏來傳送量子態？",
      "hint": "非超光速；2 古典位元 + 1 ebit。",
      "step1": "Alice 在 Bell 基測量 → 2 古典位元。",
      "step2": "Bob 依位元套用校正。",
      "solution": "是 — 2 古典位元 + 1 共享 Bell 對。"
    },
    "pr-sd": {
      "question": "超密集編碼用 1 量子位元 + 1 ebit 可傳送多少古典位元？",
      "hint": "透過對共享 Bell 態的四種 Pauli 操作編碼 00、01、10、11。",
      "step1": "Alice 在其 Bell 對一半上以 Pauli 編碼 2 位元。",
      "step2": "Bob 進行 Bell 測量 → 恢復 2 位元。",
      "solution": "2 個古典位元。"
    },
    "alg-grover": {
      "question": "在 N = 2^{{n}} 個項目中 Grover 搜尋的查詢複雜度？",
      "hint": "相對古典 O(N) 的二次加速。",
      "step1": "Grover 迭代放大標記態振幅。",
      "step2": "約 π/4 · √N 次迭代。",
      "solution": "O(√N) 次神諭查詢。"
    },
    "alg-dj": {
      "question": "Deutsch–Jozsa：區分 n 位元常數與平衡函數需要幾次查詢？",
      "hint": "量子演算法只需一次神諭查詢。",
      "step1": "準備均勻疊加、套用神諭、測量。",
      "step2": "單次查詢即可。",
      "solution": "1 次查詢（量子）對比古典最壞情況 2ⁿ⁻¹ + 1。"
    },
    "alg-shor": {
      "question": "Shor 演算法因數分解 N 時，尋找 a^x mod N 的什麼性質？",
      "hint": "階 r 滿足 a^r ≡ 1 (mod N)。",
      "step1": "選擇與 N 互質的隨機 a。",
      "step2": "找出 f(x) = a^x mod N 的週期 r。",
      "solution": "模指數的週期（階）r。"
    },
    "alg-deutsch": {
      "question": "Deutsch 演算法（1 位元）：判定 f 是否為常數最多需要幾次古典查詢？",
      "hint": "最壞情況：查 f(0) 仍不明，需查 f(1)。",
      "step1": "古典上一次查詢仍剩兩個一致函數。",
      "step2": "最壞情況需要第二次查詢。",
      "solution": "古典 2 次查詢對比量子 1 次。"
    }
  },
  "choices": {
    "yes": "是",
    "no": "否",
    "period": "週期",
    "minimum": "最小值",
    "maximum": "最大值",
    "parityOnly": "僅奇偶性",
    "identity": "恆等（返回原狀態）",
    "bitFlip": "位元翻轉",
    "phaseFlip": "相位翻轉",
    "projectZero": "投影到 |0⟩",
    "unitary": "U†U = I",
    "hermitian": "U = U†",
    "detZero": "det(U) = 0",
    "real": "U 為實矩陣",
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
