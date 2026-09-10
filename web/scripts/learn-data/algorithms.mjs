export const algorithms = {
  en: {
    title: 'Chapter 8: Quantum Algorithms',
    intro:
      "Quantum algorithms exploit interference and phase kickback to extract structure from black-box oracles faster than classical query complexity allows. This chapter builds from the oracle model through early promise problems to Grover's unstructured search — the foundation for Shor and phase estimation in later chapters.",
    labLink: 'Open full lab: {{title}} →',
    sections: {
      '8.1': {
        title: '8.1 The Oracle Model',
        paragraphs: {
          p1: 'An oracle is a reversible black-box unitary that encodes a classical function f : {0,1}ⁿ → {0,1}. The standard construction uses an ancilla qubit:',
          p2: 'Query complexity counts how many times an algorithm invokes U_f. This model abstracts away the internal structure of f — the algorithm must learn about f only through queries.',
        },
        workedExamples: {
          phaseKickback: {
            title: 'Phase kickback with |−⟩ ancilla',
            steps: [
              { label: 'Prepare ancilla in |−⟩ = H|1⟩. A controlled-X (flip when f(x)=1) on |y⟩ becomes a controlled-Z on |x⟩.', latex: '|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle' },
              { label: 'Apply H to input: |+⟩ picks up phase (−1)^{f(0)}; |−⟩ picks up (−1)^{f(1)}.', latex: 'H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)' },
              { label: 'For constant f (f(0)=f(1)): result is ±|+⟩ → measure |0⟩. For balanced f: result is ±|−⟩ → measure |1⟩.', latex: '\\text{1 query distinguishes constant vs balanced (Deutsch)}' },
            ],
          },
        },
        widgets: {
          phaseKickback: {
            intro: 'Oracle U_f|x,y⟩ = |x, y ⊕ f(x)⟩ flips the ancilla when f(x)=1. With ancilla in |−⟩, the flip becomes a phase on the input register — phase kickback.',
            inputX: 'Input x:',
            setup: 'Setup',
            oracleAction: 'Oracle action',
            effectOnInput: 'Effect on input',
            ancilla0: 'Ancilla |0⟩',
            ancillaMinus: 'Ancilla |−⟩',
            noPhase: 'No phase (bit flip only)',
            controlledFlip: 'Controlled flip on y → phase on x',
          },
        },
        checkpoints: {
          ancilla: { question: 'What state must the ancilla be in for phase kickback to occur?', answer: '|−⟩', hint: 'Hadamard of |1⟩.' },
        },
      },
      '8.2': {
        title: "8.2 Deutsch's Algorithm",
        paragraphs: {
          p1: "Deutsch's problem (1985): given f: {0,1} → {0,1}, determine whether f is constant (f(0)=f(1)) or balanced (f(0)≠f(1)). There are exactly four such functions on one bit:",
        },
        tables: {
          deutsch: {
            headers: ['Function', 'f(0)', 'f(1)', 'Type'],
            rows: [
              { name: 'f₀(x) = 0', f0: '0', f1: '0', type: 'constant' },
              { name: 'f₁(x) = 1', f0: '0', f1: '1', type: 'balanced' },
              { name: 'f₂(x) = x', f0: '0', f1: '1', type: 'balanced' },
              { name: 'f₃(x) = 1 ⊕ x', f0: '1', f1: '0', type: 'balanced' },
            ],
          },
        },
        expandables: {
          classical: {
            title: 'Why classical needs 2 queries in the worst case',
            p1: 'A classical algorithm must evaluate f(0) and f(1) to distinguish constant from balanced. If it stops after one evaluation, the unseen input could still differ — the answer would be wrong. Deutsch achieves certainty with a single oracle call by using superposition and interference.',
          },
        },
        widgets: {
          deutsch: {
            selectFn: "Select Boolean function f: {0,1} → {0,1}",
            circuit: 'Circuit: |0⟩|1⟩ → X on ancilla → H⊗H → U_f (phase oracle) → H on input → measure input.',
            measured: 'Measured input qubit:',
            reports: 'algorithm reports',
            trueLabel: 'True label:',
            classicalNote: 'Classical worst case: 2 oracle queries (evaluate f(0) and f(1)). Deutsch: 1 query.',
          },
        },
        labs: { deutsch: 'Deutsch Algorithm' },
      },
      '8.3': {
        title: '8.3 Deutsch–Jozsa Algorithm',
        paragraphs: {
          p1: 'Generalizing to n input bits, the promise is that f is either constant (same value for all 2ⁿ inputs) or balanced (exactly 2ⁿ⁻¹ zeros and 2ⁿ⁻¹ ones). Without this promise, the problem is hard even quantumly.',
          p2: 'The circuit mirrors Deutsch: prepare |−⟩ ancilla, apply H⊗ⁿ, oracle, H⊗ⁿ. Constant functions yield |0…0⟩ with certainty; balanced functions never yield all zeros.',
        },
        widgets: {
          dj: {
            inputSize: 'Input register size n = {{n}}',
            constantF: 'Constant f',
            balancedF: 'Balanced f',
            promise: 'Promise: f is either constant (same output for all x) or balanced (exactly half 0s, half 1s).',
            returns: 'Deutsch–Jozsa returns:',
            quantumNote: 'Quantum: 1 query. Classical worst case: 2^{n-1}+1 queries.',
          },
        },
        checkpoints: {
          constant: { question: 'What measurement outcome proves f is constant in Deutsch–Jozsa?', answer: '|0⟩⊗n', hint: 'All-zero on the input register.' },
        },
        labs: { 'deutsch-jozsa': 'Deutsch–Jozsa' },
      },
      '8.4': {
        title: '8.4 Bernstein–Vazirani Algorithm',
        paragraphs: {
          p1: 'Given oracle access to f(x) = s · x (mod 2) (inner product mod 2 of n-bit strings), recover the hidden string s ∈ {0,1}ⁿ.',
          p2: 'Classically, learning s requires querying f with each standard basis vector e_i — n queries. Bernstein–Vazirani needs only one.',
        },
        workedExamples: {
          recoverS: {
            title: 'Recover s in one query',
            steps: [
              { label: 'Prepare |+⟩⊗ⁿ and |−⟩ ancilla (same as Deutsch–Jozsa setup).' },
              { label: 'The phase oracle implements (−1)^{s·x} on each basis state |x⟩.' },
              { label: 'After inverse Hadamards, the amplitude of |x⟩ is concentrated on x = s. Measure to read s.', latex: 'H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle' },
            ],
          },
        },
        widgets: {
          bv: {
            hiddenString: 'Hidden string s (bits):',
            oracle: 'Oracle: f(x) = s · x (mod 2) = ⊕_i s_i x_i',
            recovered: 'After H⊗ⁿ → oracle → H⊗ⁿ, measurement yields s directly. Recovered:',
          },
        },
        labs: { 'bernstein-vazirani': 'Bernstein–Vazirani' },
      },
      '8.5': {
        title: "8.5 Simon's Algorithm",
        paragraphs: {
          p1: "Simon's problem (1994): f: {0,1}ⁿ → {0,1}ⁿ is promised to be 2-to-1 with a hidden period s ∈ {0,1}ⁿ, s ≠ 0, such that f(x) = f(x ⊕ s) for all x.",
          p2: "Classically, finding s requires ~2^{n/2} queries (birthday paradox). Simon's quantum algorithm finds s with O(n) oracle queries plus O(n) classical post-processing.",
        },
        expandables: {
          gf2: {
            title: 'GF(2) linear algebra behind Simon',
            p1: "Measurements yield random vectors y ∈ {0,1}ⁿ satisfying y · s = 0 (mod 2). Each query adds a linear constraint over GF(2). After ~n independent equations, Gaussian elimination over GF(2) recovers s.",
            p2: "This hidden-period structure over abelian groups is the direct precursor to Shor's period finding over ℤ_N.",
          },
        },
        checkpoints: {
          field: { question: "What field is Simon's post-processing linear algebra performed over?", answer: 'GF(2)', hint: 'Bits with XOR as addition.' },
        },
        labs: { simon: "Simon's Algorithm" },
      },
      '8.6': {
        title: "8.6 Grover's Search Algorithm",
        paragraphs: {
          p1: 'Grover (1996) searches an unstructured database of N = 2ⁿ items for a marked entry w, using O(√N) oracle queries — a quadratic speedup over classical O(N).',
          p2: 'Each Grover iteration G = D · O_w rotates the state vector toward |w⟩ by angle ≈ 2 arcsin(1/√N). The optimal iteration count is:',
        },
        headings: {
          uniformSuperposition: 'Uniform superposition',
          oracle: 'Oracle O_w',
          diffusion: 'Diffusion operator D',
        },
        expandables: {
          overshooting: {
            title: 'Overshooting and optimality',
            p1: "Grover search is a rotation in a two-dimensional subspace spanned by |w⟩ and |s'⟩ (uniform superposition with |w⟩ removed). Applying too many iterations rotates past |w⟩ — success probability decreases. Grover's algorithm is provably optimal for unstructured search: no quantum algorithm can do better than O(√N) queries.",
          },
        },
        widgets: {
          grover: {
            searchSpace: 'Search space: n = {{n}} qubits, N = {{N}} states',
            markedState: 'Marked state |w⟩ = |{{label}}⟩',
            iterations: 'Grover iterations: {{iters}} (optimal ≈ {{optimal}} = ⌊π/4 · √N⌋)',
            successProb: 'P(success) = {{prob}}% (uniform start: {{uniform}}%)',
            overshooting: 'Overshooting: too many iterations rotate past the marked state — probability drops again.',
          },
        },
        checkpoints: {
          queries: { question: 'How many queries does Grover need for N items (order of growth)?', answer: 'O(√N)', hint: 'Quadratic speedup over classical O(N).' },
        },
        labs: { grover: 'Grover Search' },
      },
      '8.7': {
        title: '8.7 Complexity Comparison',
        paragraphs: {
          p1: 'The algorithms in this chapter illustrate different speedup types: constant-factor (Deutsch), polynomial (Bernstein–Vazirani), exponential in query complexity (Deutsch–Jozsa, Simon), quadratic (Grover), and super-polynomial (Shor, covered in Chapter 11).',
        },
        headings: { algorithmLabs: 'Algorithm labs' },
        tables: {
          complexity: {
            headers: ['Problem', 'Classical (query/time)', 'Quantum', 'Speedup'],
            rows: [
              { problem: 'Deutsch (n=1)', classical: '2 queries (worst)', quantum: '1 query', speedup: '2×' },
              { problem: 'Deutsch–Jozsa', classical: '2^{n−1}+1 (worst)', quantum: '1 query', speedup: 'exponential' },
              { problem: 'Bernstein–Vazirani', classical: 'n queries', quantum: '1 query', speedup: 'n×' },
              { problem: "Simon's algorithm", classical: 'O(2^{n/2})', quantum: 'O(n) queries', speedup: 'exponential' },
              { problem: 'Grover search', classical: 'O(N)', quantum: 'O(√N)', speedup: 'quadratic' },
              { problem: "Shor's factoring", classical: 'sub-exponential', quantum: 'poly(n)', speedup: 'super-polynomial' },
            ],
          },
        },
        labLinks: {
          deutsch: 'Deutsch Algorithm',
          'deutsch-jozsa': 'Deutsch–Jozsa',
          'bernstein-vazirani': 'Bernstein–Vazirani',
          simon: "Simon's Algorithm",
          grover: 'Grover Search',
          qft: 'QFT Visualizer',
          'phase-estimation': 'Phase Estimation',
        },
      },
    },
    labels: { constant: 'constant', balanced: 'balanced' },
  },
  'zh-TW': {
    title: '第 8 章：量子演算法',
    intro:
      '量子演算法利用干涉與相位回踢，從黑箱神諭中比古典查詢複雜度更快地提取結構。本章從神諭模型出發，經早期承諾問題到 Grover 非結構化搜尋——為後續 Shor 與相位估計奠定基礎。',
    labLink: '開啟完整實驗：{{title}} →',
    sections: {
      '8.1': {
        title: '8.1 神諭模型',
        paragraphs: {
          p1: '神諭是可逆黑箱酉算子，編碼古典函數 f : {0,1}ⁿ → {0,1}。標準構造使用輔助量子位元：',
          p2: '查詢複雜度計算演算法呼叫 U_f 的次數。此模型抽象掉 f 的內部結構——演算法只能透過查詢了解 f。',
        },
        workedExamples: {
          phaseKickback: {
            title: '以 |−⟩ 輔助量子位元的相位回踢',
            steps: [
              { label: '將輔助量子位元準備為 |−⟩ = H|1⟩。當 f(x)=1 時對 |y⟩ 的受控-X（翻轉）變為對 |x⟩ 的受控-Z。', latex: '|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle' },
              { label: '對輸入套用 H：|+⟩ 獲得相位 (−1)^{f(0)}；|−⟩ 獲得 (−1)^{f(1)}。', latex: 'H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)' },
              { label: '對常數 f (f(0)=f(1))：結果為 ±|+⟩ → 測得 |0⟩。對平衡 f：結果為 ±|−⟩ → 測得 |1⟩。', latex: '\\text{1 query distinguishes constant vs balanced (Deutsch)}' },
            ],
          },
        },
        widgets: {
          phaseKickback: {
            intro: '神諭 U_f|x,y⟩ = |x, y ⊕ f(x)⟩ 在 f(x)=1 時翻轉輔助量子位元。輔助量子位元在 |−⟩ 時，翻轉變為輸入寄存器上的相位——相位回踢。',
            inputX: '輸入 x：',
            setup: '設定',
            oracleAction: '神諭作用',
            effectOnInput: '對輸入的效應',
            ancilla0: '輔助量子位元 |0⟩',
            ancillaMinus: '輔助量子位元 |−⟩',
            noPhase: '無相位（僅位元翻轉）',
            controlledFlip: '對 y 受控翻轉 → x 上的相位',
          },
        },
        checkpoints: {
          ancilla: { question: '相位回踢需要輔助量子位元處於什麼狀態？', answer: '|−⟩', hint: '|1⟩ 的 Hadamard。' },
        },
      },
      '8.2': {
        title: '8.2 Deutsch 演算法',
        paragraphs: {
          p1: 'Deutsch 問題（1985）：給定 f: {0,1} → {0,1}，判斷 f 是常數 (f(0)=f(1)) 還是平衡 (f(0)≠f(1))。單一位元上恰好有四種此類函數：',
        },
        tables: {
          deutsch: {
            headers: ['函數', 'f(0)', 'f(1)', '類型'],
            rows: [
              { name: 'f₀(x) = 0', f0: '0', f1: '0', type: '常數' },
              { name: 'f₁(x) = 1', f0: '0', f1: '1', type: '平衡' },
              { name: 'f₂(x) = x', f0: '0', f1: '1', type: '平衡' },
              { name: 'f₃(x) = 1 ⊕ x', f0: '1', f1: '0', type: '平衡' },
            ],
          },
        },
        expandables: {
          classical: {
            title: '為何古典最壞情況需要 2 次查詢',
            p1: '古典演算法必須計算 f(0) 與 f(1) 以區分常數與平衡。若在一次求值後停止，未見輸入仍可能不同——答案會錯。Deutsch 透過疊加與干涉以單次神諭呼叫確定答案。',
          },
        },
        widgets: {
          deutsch: {
            selectFn: '選擇布林函數 f: {0,1} → {0,1}',
            circuit: '電路：|0⟩|1⟩ → 輔助量子位元 X → H⊗H → U_f（相位神諭）→ 輸入 H → 測量輸入。',
            measured: '測得的輸入量子位元：',
            reports: '演算法報告',
            trueLabel: '真實標籤：',
            classicalNote: '古典最壞情況：2 次神諭查詢（計算 f(0) 與 f(1)）。Deutsch：1 次查詢。',
          },
        },
        labs: { deutsch: 'Deutsch 演算法' },
      },
      '8.3': {
        title: '8.3 Deutsch–Jozsa 演算法',
        paragraphs: {
          p1: '推廣到 n 個輸入位元，承諾 f 要麼是常數（所有 2ⁿ 輸入相同），要麼是平衡（恰好 2ⁿ⁻¹ 個 0 與 2ⁿ⁻¹ 個 1）。沒有此承諾，問題即使量子上也困難。',
          p2: '電路與 Deutsch 類似：準備 |−⟩ 輔助量子位元，套用 H⊗ⁿ、神諭、H⊗ⁿ。常數函數確定產生 |0…0⟩；平衡函數永不產生全零。',
        },
        widgets: {
          dj: {
            inputSize: '輸入寄存器大小 n = {{n}}',
            constantF: '常數 f',
            balancedF: '平衡 f',
            promise: '承諾：f 要麼是常數（所有 x 相同輸出），要麼是平衡（恰好一半 0、一半 1）。',
            returns: 'Deutsch–Jozsa 回傳：',
            quantumNote: '量子：1 次查詢。古典最壞情況：2^{n-1}+1 次查詢。',
          },
        },
        checkpoints: {
          constant: { question: 'Deutsch–Jozsa 中什麼測量結果證明 f 是常數？', answer: '|0⟩⊗n', hint: '輸入寄存器全零。' },
        },
        labs: { 'deutsch-jozsa': 'Deutsch–Jozsa' },
      },
      '8.4': {
        title: '8.4 Bernstein–Vazirani 演算法',
        paragraphs: {
          p1: '給定神諭存取 f(x) = s · x (mod 2)（n 位元字串的內積 mod 2），恢復隱藏字串 s ∈ {0,1}ⁿ。',
          p2: '古典上，學習 s 需要以每個標準基向量 e_i 查詢 f——n 次查詢。Bernstein–Vazirani 只需一次。',
        },
        workedExamples: {
          recoverS: {
            title: '一次查詢恢復 s',
            steps: [
              { label: '準備 |+⟩⊗ⁿ 與 |−⟩ 輔助量子位元（與 Deutsch–Jozsa 相同設定）。' },
              { label: '相位神諭在每個基態 |x⟩ 上實現 (−1)^{s·x}。' },
              { label: '逆 Hadamard 後，|x⟩ 的振幅集中在 x = s。測量讀出 s。', latex: 'H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle' },
            ],
          },
        },
        widgets: {
          bv: {
            hiddenString: '隱藏字串 s（位元）：',
            oracle: '神諭：f(x) = s · x (mod 2) = ⊕_i s_i x_i',
            recovered: 'H⊗ⁿ → 神諭 → H⊗ⁿ 後，測量直接得到 s。已恢復：',
          },
        },
        labs: { 'bernstein-vazirani': 'Bernstein–Vazirani' },
      },
      '8.5': {
        title: '8.5 Simon 演算法',
        paragraphs: {
          p1: 'Simon 問題（1994）：f: {0,1}ⁿ → {0,1}ⁿ 承諾為 2 對 1，具有隱藏週期 s ∈ {0,1}ⁿ, s ≠ 0，使得對所有 x 有 f(x) = f(x ⊕ s)。',
          p2: '古典上找 s 需要約 2^{n/2} 次查詢（生日悖論）。Simon 量子演算法以 O(n) 次神諭查詢加 O(n) 古典後處理找到 s。',
        },
        expandables: {
          gf2: {
            title: 'Simon 背後的 GF(2) 線性代數',
            p1: '測量產生滿足 y · s = 0 (mod 2) 的隨機向量 y ∈ {0,1}ⁿ。每次查詢在 GF(2) 上增加線性約束。約 n 個獨立方程後，GF(2) 上的高斯消元恢復 s。',
            p2: '阿貝爾群上的此隱藏週期結構是 Shor 在 ℤ_N 上週期尋找的直接前身。',
          },
        },
        checkpoints: {
          field: { question: 'Simon 的後處理線性代數在哪個域上進行？', answer: 'GF(2)', hint: '以 XOR 為加法的位元。' },
        },
        labs: { simon: 'Simon 演算法' },
      },
      '8.6': {
        title: '8.6 Grover 搜尋演算法',
        paragraphs: {
          p1: 'Grover（1996）在非結構化資料庫 N = 2ⁿ 個項目中搜尋標記項 w，使用 O(√N) 次神諭查詢——相對古典 O(N) 的二次加速。',
          p2: '每次 Grover 迭代 G = D · O_w 以約 2 arcsin(1/√N) 的角度將狀態向量旋轉向 |w⟩。最佳迭代次數為：',
        },
        headings: {
          uniformSuperposition: '均勻疊加',
          oracle: '神諭 O_w',
          diffusion: '擴散算子 D',
        },
        expandables: {
          overshooting: {
            title: '過度迭代與最優性',
            p1: 'Grover 搜尋在 |w⟩ 與 |s\'⟩（移除 |w⟩ 的均勻疊加）張成的二維子空間中旋轉。迭代過多會旋轉超過 |w⟩——成功機率下降。Grover 演算法對非結構化搜尋可證最優：沒有量子演算法能優於 O(√N) 次查詢。',
          },
        },
        widgets: {
          grover: {
            searchSpace: '搜尋空間：n = {{n}} 量子位元，N = {{N}} 個狀態',
            markedState: '標記狀態 |w⟩ = |{{label}}⟩',
            iterations: 'Grover 迭代：{{iters}}（最佳 ≈ {{optimal}} = ⌊π/4 · √N⌋）',
            successProb: 'P(成功) = {{prob}}%（均勻起始：{{uniform}}%）',
            overshooting: '過度迭代：迭代過多會旋轉超過標記態——機率再次下降。',
          },
        },
        checkpoints: {
          queries: { question: 'Grover 對 N 個項目需要多少次查詢（增長階）？', answer: 'O(√N)', hint: '相對古典 O(N) 的二次加速。' },
        },
        labs: { grover: 'Grover 搜尋' },
      },
      '8.7': {
        title: '8.7 複雜度比較',
        paragraphs: {
          p1: '本章演算法展示不同加速類型：常數因子（Deutsch）、多項式（Bernstein–Vazirani）、查詢複雜度指數（Deutsch–Jozsa、Simon）、二次（Grover）、超多項式（Shor，見第 11 章）。',
        },
        headings: { algorithmLabs: '演算法實驗' },
        tables: {
          complexity: {
            headers: ['問題', '古典（查詢/時間）', '量子', '加速'],
            rows: [
              { problem: 'Deutsch (n=1)', classical: '2 次查詢（最壞）', quantum: '1 次查詢', speedup: '2×' },
              { problem: 'Deutsch–Jozsa', classical: '2^{n−1}+1（最壞）', quantum: '1 次查詢', speedup: '指數' },
              { problem: 'Bernstein–Vazirani', classical: 'n 次查詢', quantum: '1 次查詢', speedup: 'n×' },
              { problem: 'Simon 演算法', classical: 'O(2^{n/2})', quantum: 'O(n) 次查詢', speedup: '指數' },
              { problem: 'Grover 搜尋', classical: 'O(N)', quantum: 'O(√N)', speedup: '二次' },
              { problem: 'Shor 因數分解', classical: '次指數', quantum: 'poly(n)', speedup: '超多項式' },
            ],
          },
        },
        labLinks: {
          deutsch: 'Deutsch 演算法',
          'deutsch-jozsa': 'Deutsch–Jozsa',
          'bernstein-vazirani': 'Bernstein–Vazirani',
          simon: 'Simon 演算法',
          grover: 'Grover 搜尋',
          qft: 'QFT 視覺化',
          'phase-estimation': '相位估計',
        },
      },
    },
    labels: { constant: '常數', balanced: '平衡' },
  },
  ja: {
    title: '第8章：量子アルゴリズム',
    intro:
      '量子アルゴリズムは干渉と位相キックバックを利用し、ブラックボックスオラクルから古典のクエリ計算量より速く構造を抽出します。本章はオラクルモデルから初期の約束問題、Grover の非構造探索へ——後の Shor と位相推定の基盤です。',
    labLink: 'フルラボを開く：{{title}} →',
    sections: {
      '8.1': {
        title: '8.1 オラクルモデル',
        paragraphs: {
          p1: 'オラクルは古典関数 f : {0,1}ⁿ → {0,1} を符号化する可逆ブラックボックスユニタリです。標準構成は補助量子ビットを使います：',
          p2: 'クエリ計算量はアルゴリズムが U_f を呼ぶ回数を数えます。このモデルは f の内部構造を抽象化——アルゴリズムはクエリだけで f について学ぶ必要があります。',
        },
        workedExamples: {
          phaseKickback: {
            title: '|−⟩ 補助量子ビットでの位相キックバック',
            steps: [
              { label: '補助量子ビットを |−⟩ = H|1⟩ に準備。f(x)=1 のとき |y⟩ への制御 X（反転）が |x⟩ への制御 Z になる。', latex: '|x\\rangle|{-}\\rangle \\xrightarrow{U_f} (-1)^{f(x)}|x\\rangle|{-}\\rangle' },
              { label: '入力に H を適用：|+⟩ は位相 (−1)^{f(0)}；|−⟩ は (−1)^{f(1)}。', latex: 'H|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)' },
              { label: '定数 f (f(0)=f(1))：結果は ±|+⟩ → |0⟩ を測定。平衡 f：結果は ±|−⟩ → |1⟩ を測定。', latex: '\\text{1 query distinguishes constant vs balanced (Deutsch)}' },
            ],
          },
        },
        widgets: {
          phaseKickback: {
            intro: 'オラクル U_f|x,y⟩ = |x, y ⊕ f(x)⟩ は f(x)=1 のとき補助量子ビットを反転。|−⟩ の補助では反転が入力レジスタの位相になる——位相キックバック。',
            inputX: '入力 x：',
            setup: 'セットアップ',
            oracleAction: 'オラクル作用',
            effectOnInput: '入力への効果',
            ancilla0: '補助 |0⟩',
            ancillaMinus: '補助 |−⟩',
            noPhase: '位相なし（ビット反転のみ）',
            controlledFlip: 'y への制御反転 → x の位相',
          },
        },
        checkpoints: {
          ancilla: { question: '位相キックバックには補助量子ビットはどの状態である必要がある？', answer: '|−⟩', hint: '|1⟩ のアダマール。' },
        },
      },
      '8.2': {
        title: '8.2 ドイチアルゴリズム',
        paragraphs: {
          p1: 'ドイチ問題（1985）：f: {0,1} → {0,1} が定数 (f(0)=f(1)) か平衡 (f(0)≠f(1)) かを判定。1 ビットにはちょうど 4 つのこのような関数がある：',
        },
        tables: {
          deutsch: {
            headers: ['関数', 'f(0)', 'f(1)', '型'],
            rows: [
              { name: 'f₀(x) = 0', f0: '0', f1: '0', type: '定数' },
              { name: 'f₁(x) = 1', f0: '0', f1: '1', type: '平衡' },
              { name: 'f₂(x) = x', f0: '0', f1: '1', type: '平衡' },
              { name: 'f₃(x) = 1 ⊕ x', f0: '1', f1: '0', type: '平衡' },
            ],
          },
        },
        expandables: {
          classical: {
            title: '古典が最悪で 2 クエリ必要な理由',
            p1: '古典アルゴリズムは f(0) と f(1) を評価して定数と平衡を区別する必要がある。1 回の評価で止まれば、未見の入力はまだ異なる可能性があり——答えは間違う。ドイチは重ね合わせと干渉で 1 回のオラクル呼び出しで確実に判定する。',
          },
        },
        widgets: {
          deutsch: {
            selectFn: 'ブール関数 f を選択: {0,1} → {0,1}',
            circuit: '回路：|0⟩|1⟩ → 補助 X → H⊗H → U_f（位相オラクル）→ 入力 H → 入力測定。',
            measured: '測定された入力量子ビット：',
            reports: 'アルゴリズムは報告',
            trueLabel: '真のラベル：',
            classicalNote: '古典最悪：2 オラクルクエリ（f(0) と f(1) を評価）。ドイチ：1 クエリ。',
          },
        },
        labs: { deutsch: 'ドイチアルゴリズム' },
      },
      '8.3': {
        title: '8.3 ドイチ・ヨズサアルゴリズム',
        paragraphs: {
          p1: 'n 入力ビットに一般化すると、約束は f が定数（すべての 2ⁿ 入力で同じ値）か平衡（ちょうど 2ⁿ⁻¹ 個の 0 と 2ⁿ⁻¹ 個の 1）のどちらか。この約束がないと、量子でも問題は困難。',
          p2: '回路はドイチと同様：|−⟩ 補助を準備、H⊗ⁿ、オラクル、H⊗ⁿ。定数関数は確実に |0…0⟩；平衡関数は全ゼロにならない。',
        },
        widgets: {
          dj: {
            inputSize: '入力レジスタサイズ n = {{n}}',
            constantF: '定数 f',
            balancedF: '平衡 f',
            promise: '約束：f は定数（すべての x で同じ出力）か平衡（ちょうど半分 0、半分 1）。',
            returns: 'ドイチ・ヨズサは返す：',
            quantumNote: '量子：1 クエリ。古典最悪：2^{n-1}+1 クエリ。',
          },
        },
        checkpoints: {
          constant: { question: 'ドイチ・ヨズサで f が定数であることを証明する測定結果は？', answer: '|0⟩⊗n', hint: '入力レジスタが全ゼロ。' },
        },
        labs: { 'deutsch-jozsa': 'ドイチ・ヨズサ' },
      },
      '8.4': {
        title: '8.4 バーンスタイン・ヴァジラニアルゴリズム',
        paragraphs: {
          p1: 'オラクルアクセス f(x) = s · x (mod 2)（n ビット文字列の内積 mod 2）が与えられたとき、隠れ文字列 s ∈ {0,1}ⁿ を復元。',
          p2: '古典では s を学ぶには各標準基底ベクトル e_i で f をクエリ——n クエリ。バーンスタイン・ヴァジラニは 1 回だけ。',
        },
        workedExamples: {
          recoverS: {
            title: '1 クエリで s を復元',
            steps: [
              { label: '|+⟩⊗ⁿ と |−⟩ 補助を準備（ドイチ・ヨズサと同じセットアップ）。' },
              { label: '位相オラクルは各基底状態 |x⟩ に (−1)^{s·x} を実装。' },
              { label: '逆アダマール後、|x⟩ の振幅は x = s に集中。測定で s を読む。', latex: 'H^{\\otimes n} \\, (-1)^{s\\cdot x} |+\\rangle^{\\otimes n} \\propto |s\\rangle' },
            ],
          },
        },
        widgets: {
          bv: {
            hiddenString: '隠れ文字列 s（ビット）：',
            oracle: 'オラクル：f(x) = s · x (mod 2) = ⊕_i s_i x_i',
            recovered: 'H⊗ⁿ → オラクル → H⊗ⁿ の後、測定で直接 s。復元：',
          },
        },
        labs: { 'bernstein-vazirani': 'バーンスタイン・ヴァジラニ' },
      },
      '8.5': {
        title: '8.5 サイモンアルゴリズム',
        paragraphs: {
          p1: 'サイモン問題（1994）：f: {0,1}ⁿ → {0,1}ⁿ は 2 対 1 で隠れ周期 s ∈ {0,1}ⁿ, s ≠ 0 を持ち、すべての x で f(x) = f(x ⊕ s)。',
          p2: '古典では s を見つけるには約 2^{n/2} クエリ（誕生日パラドックス）。サイモンの量子アルゴリズムは O(n) オラクルクエリと O(n) 古典後処理で s を見つける。',
        },
        expandables: {
          gf2: {
            title: 'サイモン背後の GF(2) 線形代数',
            p1: '測定は y · s = 0 (mod 2) を満たすランダムベクトル y ∈ {0,1}ⁿ を生成。各クエリは GF(2) 上の線形制約を追加。約 n 個の独立方程式後、GF(2) ガウス消去で s を復元。',
            p2: 'アーベル群上のこの隠れ周期構造は、ℤ_N 上の Shor の周期探索の直接の前身。',
          },
        },
        checkpoints: {
          field: { question: 'サイモンの後処理線形代数はどの体上で行われる？', answer: 'GF(2)', hint: 'XOR を加算とするビット。' },
        },
        labs: { simon: 'サイモンアルゴリズム' },
      },
      '8.6': {
        title: '8.6 グローバー探索アルゴリズム',
        paragraphs: {
          p1: 'Grover（1996）は N = 2ⁿ 項目の非構造データベースでマーク項目 w を探索し、O(√N) オラクルクエリを使用——古典 O(N) に対する二次加速。',
          p2: '各 Grover 反復 G = D · O_w は約 2 arcsin(1/√N) の角度で状態ベクトルを |w⟩ に向けて回転。最適反復回数は：',
        },
        headings: {
          uniformSuperposition: '一様重ね合わせ',
          oracle: 'オラクル O_w',
          diffusion: '拡散演算子 D',
        },
        expandables: {
          overshooting: {
            title: 'オーバーシュートと最適性',
            p1: 'Grover 探索は |w⟩ と |s\'⟩（|w⟩ を除いた一様重ね合わせ）が張る 2 次元部分空間での回転。反復が多すぎると |w⟩ を通り過ぎる——成功確率が下がる。Grover は非構造探索で証明的に最適：O(√N) クエリより良い量子アルゴリズムはない。',
          },
        },
        widgets: {
          grover: {
            searchSpace: '探索空間：n = {{n}} 量子ビット、N = {{N}} 状態',
            markedState: 'マーク状態 |w⟩ = |{{label}}⟩',
            iterations: 'Grover 反復：{{iters}}（最適 ≈ {{optimal}} = ⌊π/4 · √N⌋）',
            successProb: 'P(成功) = {{prob}}%（一様開始：{{uniform}}%）',
            overshooting: 'オーバーシュート：反復が多すぎるとマーク状態を通り過ぎる——確率が再び下がる。',
          },
        },
        checkpoints: {
          queries: { question: 'Grover は N 項目に何クエリ必要（増大の次数）？', answer: 'O(√N)', hint: '古典 O(N) に対する二次加速。' },
        },
        labs: { grover: 'グローバー探索' },
      },
      '8.7': {
        title: '8.7 計算量比較',
        paragraphs: {
          p1: '本章のアルゴリズムは異なる加速型を示す：定数倍（ドイチ）、多項式（バーンスタイン・ヴァジラニ）、クエリ計算量で指数（ドイチ・ヨズサ、サイモン）、二次（Grover）、超多項式（Shor、第11章）。',
        },
        headings: { algorithmLabs: 'アルゴリズムラボ' },
        tables: {
          complexity: {
            headers: ['問題', '古典（クエリ/時間）', '量子', '加速'],
            rows: [
              { problem: 'ドイチ (n=1)', classical: '2 クエリ（最悪）', quantum: '1 クエリ', speedup: '2×' },
              { problem: 'ドイチ・ヨズサ', classical: '2^{n−1}+1（最悪）', quantum: '1 クエリ', speedup: '指数' },
              { problem: 'バーンスタイン・ヴァジラニ', classical: 'n クエリ', quantum: '1 クエリ', speedup: 'n×' },
              { problem: 'サイモンアルゴリズム', classical: 'O(2^{n/2})', quantum: 'O(n) クエリ', speedup: '指数' },
              { problem: 'グローバー探索', classical: 'O(N)', quantum: 'O(√N)', speedup: '二次' },
              { problem: 'ショア因数分解', classical: '準指数', quantum: 'poly(n)', speedup: '超多項式' },
            ],
          },
        },
        labLinks: {
          deutsch: 'ドイチアルゴリズム',
          'deutsch-jozsa': 'ドイチ・ヨズサ',
          'bernstein-vazirani': 'バーンスタイン・ヴァジラニ',
          simon: 'サイモンアルゴリズム',
          grover: 'グローバー探索',
          qft: 'QFT ビジュアライザ',
          'phase-estimation': '位相推定',
        },
      },
    },
    labels: { constant: '定数', balanced: '平衡' },
  },
};
