export const shor = {
  en: {
    title: "Chapter 11: Shor's Algorithm",
    intro:
      "Shor's algorithm (1994) factors large composite integers in polynomial time on a fault-tolerant quantum computer — threatening RSA and Diffie–Hellman. The quantum core is period finding via QPE; everything else is classical number theory.",
    labLink: 'Open full lab: {{title}} →',
    sections: {
      '11.1': {
        title: '11.1 Reduction to Period Finding',
        paragraphs: {
          p1: 'To factor composite N, pick random a with 1 < a < N and gcd(a, N) = 1. If gcd(a, N) > 1, we already found a factor classically. Otherwise, find the smallest r > 0 such that:',
          p2: 'This r is the period (order) of a modulo N. Period finding is the hard quantum step; factoring from r uses classical gcd arithmetic.',
        },
        cards: {
          quantum: {
            title: '⚛ Quantum portion',
            items: ['Prepare superposition over x', 'Compute a^x mod N (modular exponentiation)', 'QPE + QFT to extract period r'],
          },
          classical: {
            title: '⚙ Classical portion',
            items: ['Choose random a, check gcd', 'Verify r is even, a^{r/2} ≢ −1', 'Compute gcd(a^{r/2} ± 1, N)', 'Repeat if trivial factors'],
          },
        },
        labs: { 'period-finding': 'Period Explorer' },
      },
      '11.2': {
        title: '11.2 From Period to Factors',
        paragraphs: {
          p1: 'Given period r with a^r ≡ 1 (mod N), we have a^r − 1 ≡ 0 (mod N), so N divides (a^{r/2} − 1)(a^{r/2} + 1). If a^{r/2} ≢ −1 (mod N), then neither factor is a multiple of N, and gcd extracts non-trivial factors.',
        },
        workedExamples: {
          conditions: {
            title: 'Conditions for successful factoring',
            steps: [
              { label: 'r must be even so that r/2 is an integer.', latex: 'r = 2k \\text{ for some integer } k' },
              { label: 'a^{r/2} ≢ −1 (mod N). Otherwise both gcds equal 1 or N — trivial.', latex: 'a^{r/2} \\not\\equiv -1 \\pmod{N}' },
              { label: 'If both conditions hold, gcd(a^{r/2} − 1, N) and gcd(a^{r/2} + 1, N) are non-trivial factors with probability ≥ 1/2 over random a.', latex: 'p \\cdot q = N' },
              { label: 'If any condition fails, pick a new a and repeat. Expected O(1) trials.', latex: '\\text{Repeat until success}' },
            ],
          },
        },
        expandables: {
          minusOne: {
            title: 'Why a^{r/2} ≡ −1 causes failure',
            p1: 'If a^{r/2} ≡ −1 (mod N), then a^{r/2} + 1 ≡ 0 (mod N), so gcd(a^{r/2} + 1, N) = N — a trivial factor. Similarly gcd(a^{r/2} − 1, N) = 1. About half of valid periods yield useful factors; the rest require retrying with a different a.',
          },
        },
        checkpoints: {
          gcd: { question: 'What gcd computation extracts a factor from period r?', answer: 'gcd(a^{r/2} ± 1, N)', hint: '±1 from the a^r − 1 factorization.' },
        },
      },
      '11.3': {
        title: '11.3 Factoring 15: Interactive Walkthrough',
        paragraphs: {
          p1: 'The canonical demo factors N = 15 with a = 2. The period of 2^x mod 15 is r = 4, yielding factors 3 and 5.',
        },
        workedExamples: {
          summary: {
            title: 'a = 2, N = 15 (summary)',
            steps: [
              { label: 'Sequence 2^x mod 15: 1, 2, 4, 8, 1, … → period r = 4.', latex: '2^4 \\equiv 1 \\pmod{15}' },
              { label: 'r is even. a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15). ✓', latex: '4 \\not\\equiv -1 \\pmod{15}' },
              { label: 'gcd(4 − 1, 15) = gcd(3, 15) = 3.', latex: '\\gcd(3, 15) = 3' },
              { label: 'gcd(4 + 1, 15) = gcd(5, 15) = 5. Therefore 15 = 3 × 5.', latex: '15 = 3 \\times 5' },
            ],
          },
        },
        widgets: {
          stepper: {
            intro: 'Interactive walkthrough: Factor N = 15 with a = 2 (Shor\'s standard demo).',
            classicalStep: '⚙ Classical step',
            quantumStep: '⚛ Quantum step',
            periodMark: ' ← period!',
            factors: 'Factors:',
            reset: 'Reset',
            next: 'Next step →',
            done: 'Done',
            steps: [
              { title: 'Choose N and coprime a', classical: true, content: 'Pick composite N = 15. Choose a = 2 with gcd(2, 15) = 1.' },
              { title: 'Compute modular powers (classical check)', classical: true, content: 'Evaluate 2^x mod 15 for x = 0, 1, 2, … to spot repetition.' },
              { title: 'Quantum period finding', classical: false, content: 'QPE + QFT on U|y⟩ = |2^x · y mod 15⟩ estimates period r of 2^x mod 15.' },
              { title: 'Verify period r = 4', classical: true, content: '2^4 mod 15 = 16 mod 15 = 1. Sequence: 1, 2, 4, 8, 1, …' },
              { title: 'Check r is even', classical: true, content: 'r = 4 is even. If r were odd, restart with different a.' },
              { title: 'Compute a^{r/2} mod N', classical: true, content: '2^{4/2} mod 15 = 2² mod 15 = 4.' },
              { title: 'Check a^{r/2} ≢ −1 (mod N)', classical: true, content: '4 ≢ 14 (≡ −1 mod 15). If a^{r/2} ≡ −1, restart — no factors from this a.' },
              { title: 'Extract factors via gcd', classical: true, content: 'gcd(4 − 1, 15) = gcd(3, 15) = 3. gcd(4 + 1, 15) = gcd(5, 15) = 5.' },
              { title: 'Verify factorization', classical: true, content: '15 = 3 × 5. Success!' },
            ],
            tableHeaders: ['x', '2^x mod 15'],
          },
        },
        labs: { shor: "Shor's Algorithm Demo" },
      },
      '11.4': {
        title: '11.4 Complexity',
        paragraphs: {
          p1: 'On a fault-tolerant quantum computer with O(n) qubits and poly(n) gates:',
          p2: 'The best known classical factoring (General Number Field Sieve) is sub-exponential: exp(O((log N)^{1/3})). Shor provides a super-polynomial speedup — the reason post-quantum cryptography migration is underway.',
        },
        tables: {
          complexity: {
            headers: ['Component', 'Classical / Quantum', 'Cost'],
            rows: [
              { component: 'Choose a, gcd check', type: 'Classical', cost: 'O(log² N)' },
              { component: 'Modular exponentiation circuit', type: 'Quantum', cost: 'O(n³) gates' },
              { component: 'QPE + QFT', type: 'Quantum', cost: 'O(n² log N) gates' },
              { component: 'Continued fractions', type: 'Classical', cost: 'O(n²)' },
              { component: 'gcd(a^{r/2} ± 1, N)', type: 'Classical', cost: 'O(log² N)' },
            ],
          },
        },
        checkpoints: {
          time: { question: 'Shor runs in what time on a fault-tolerant machine (in n = log N)?', answer: 'polynomial', hint: 'Poly(n) = poly(log N).' },
        },
      },
      '11.5': {
        title: '11.5 Cryptographic Impact',
        paragraphs: {
          p1: "RSA, Diffie–Hellman, and elliptic-curve cryptography (via Shor's discrete-log variant) rely on the hardness of factoring or discrete logarithms. A large-scale fault-tolerant quantum computer running Shor would break these systems.",
        },
        headings: { relatedLabs: 'Related labs' },
        expandables: {
          pqc: {
            title: 'Post-quantum cryptography (PQC)',
            p1: 'NIST standardized post-quantum algorithms (2024) based on lattice problems, hash signatures, and code-based schemes — mathematical assumptions Shor does not attack. Migration to PQC is underway in government and industry standards.',
            p2: 'Important nuance: Today\'s NISQ devices cannot run full Shor on cryptographically relevant key sizes (2048-bit RSA). "Harvest now, decrypt later" threats motivate proactive migration, not panic about immediate breaks.',
          },
          periodHeart: {
            title: 'Period finding — the quantum heart',
            p1: "The quantum subroutine estimates the period r of f(x) = a^x mod N using QPE on the modular multiplication unitary. The QFT converts periodic structure in x into peaks at multiples of N/r; continued fractions recover r from a measured phase. See Chapter 9 (QFT) and Chapter 10 (QPE).",
          },
        },
        labLinks: {
          shor: "Shor's Algorithm Demo (N=15)",
          'period-finding': 'Period Explorer',
          'phase-estimation': 'Phase Estimation',
          qft: 'QFT Visualizer',
        },
      },
    },
  },
  'zh-TW': {
    title: '第 11 章：Shor 演算法',
    intro:
      'Shor 演算法（1994）在容錯量子計算機上以多項式時間分解大合數——威脅 RSA 與 Diffie–Hellman。量子核心是透過 QPE 的週期尋找；其餘為古典數論。',
    labLink: '開啟完整實驗：{{title}} →',
    sections: {
      '11.1': {
        title: '11.1 歸約到週期尋找',
        paragraphs: {
          p1: '要分解合數 N，選取 1 < a < N 且 gcd(a, N) = 1 的隨機 a。若 gcd(a, N) > 1，古典上已找到因數。否則找最小 r > 0 使得：',
          p2: '此 r 是 a 模 N 的週期（階）。週期尋找是困難的量子步驟；從 r 分解使用古典 gcd 算術。',
        },
        cards: {
          quantum: {
            title: '⚛ 量子部分',
            items: ['對 x 準備疊加', '計算 a^x mod N（模指數）', 'QPE + QFT 提取週期 r'],
          },
          classical: {
            title: '⚙ 古典部分',
            items: ['選隨機 a，檢查 gcd', '驗證 r 為偶數，a^{r/2} ≢ −1', '計算 gcd(a^{r/2} ± 1, N)', '若為平凡因數則重試'],
          },
        },
        labs: { 'period-finding': '週期探索器' },
      },
      '11.2': {
        title: '11.2 從週期到因數',
        paragraphs: {
          p1: '給定 a^r ≡ 1 (mod N) 的週期 r，有 a^r − 1 ≡ 0 (mod N)，故 N 整除 (a^{r/2} − 1)(a^{r/2} + 1)。若 a^{r/2} ≢ −1 (mod N)，則兩因子都不是 N 的倍數，gcd 提取非平凡因數。',
        },
        workedExamples: {
          conditions: {
            title: '成功分解的條件',
            steps: [
              { label: 'r 必須為偶數使 r/2 為整數。', latex: 'r = 2k \\text{ for some integer } k' },
              { label: 'a^{r/2} ≢ −1 (mod N)。否則兩個 gcd 都等於 1 或 N——平凡。', latex: 'a^{r/2} \\not\\equiv -1 \\pmod{N}' },
              { label: '若兩條件成立，gcd(a^{r/2} − 1, N) 與 gcd(a^{r/2} + 1, N) 對隨機 a 以 ≥ 1/2 機率為非平凡因數。', latex: 'p \\cdot q = N' },
              { label: '若任一條件失敗，選新 a 重試。期望 O(1) 次試驗。', latex: '\\text{Repeat until success}' },
            ],
          },
        },
        expandables: {
          minusOne: {
            title: '為何 a^{r/2} ≡ −1 導致失敗',
            p1: '若 a^{r/2} ≡ −1 (mod N)，則 a^{r/2} + 1 ≡ 0 (mod N)，故 gcd(a^{r/2} + 1, N) = N——平凡因數。同樣 gcd(a^{r/2} − 1, N) = 1。約一半有效週期產生有用因數；其餘需以不同 a 重試。',
          },
        },
        checkpoints: {
          gcd: { question: '什麼 gcd 計算從週期 r 提取因數？', answer: 'gcd(a^{r/2} ± 1, N)', hint: '來自 a^r − 1 分解的 ±1。' },
        },
      },
      '11.3': {
        title: '11.3 分解 15：互動式逐步說明',
        paragraphs: {
          p1: '標準示範以 a = 2 分解 N = 15。2^x mod 15 的週期為 r = 4，得到因數 3 與 5。',
        },
        workedExamples: {
          summary: {
            title: 'a = 2, N = 15（摘要）',
            steps: [
              { label: '序列 2^x mod 15：1, 2, 4, 8, 1, … → 週期 r = 4。', latex: '2^4 \\equiv 1 \\pmod{15}' },
              { label: 'r 為偶數。a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15)。✓', latex: '4 \\not\\equiv -1 \\pmod{15}' },
              { label: 'gcd(4 − 1, 15) = gcd(3, 15) = 3。', latex: '\\gcd(3, 15) = 3' },
              { label: 'gcd(4 + 1, 15) = gcd(5, 15) = 5。因此 15 = 3 × 5。', latex: '15 = 3 \\times 5' },
            ],
          },
        },
        widgets: {
          stepper: {
            intro: '互動式逐步說明：以 a = 2 分解 N = 15（Shor 標準示範）。',
            classicalStep: '⚙ 古典步驟',
            quantumStep: '⚛ 量子步驟',
            periodMark: ' ← 週期！',
            factors: '因數：',
            reset: '重設',
            next: '下一步 →',
            done: '完成',
            steps: [
              { title: '選擇 N 與互素 a', classical: true, content: '選合數 N = 15。選 a = 2，gcd(2, 15) = 1。' },
              { title: '計算模冪（古典檢查）', classical: true, content: '計算 x = 0, 1, 2, … 的 2^x mod 15 以發現重複。' },
              { title: '量子週期尋找', classical: false, content: '對 U|y⟩ = |2^x · y mod 15⟩ 做 QPE + QFT 估計 2^x mod 15 的週期 r。' },
              { title: '驗證週期 r = 4', classical: true, content: '2^4 mod 15 = 16 mod 15 = 1。序列：1, 2, 4, 8, 1, …' },
              { title: '檢查 r 為偶數', classical: true, content: 'r = 4 為偶數。若 r 為奇數，以不同 a 重新開始。' },
              { title: '計算 a^{r/2} mod N', classical: true, content: '2^{4/2} mod 15 = 2² mod 15 = 4。' },
              { title: '檢查 a^{r/2} ≢ −1 (mod N)', classical: true, content: '4 ≢ 14 (≡ −1 mod 15)。若 a^{r/2} ≡ −1，重新開始——此 a 無因數。' },
              { title: '透過 gcd 提取因數', classical: true, content: 'gcd(4 − 1, 15) = gcd(3, 15) = 3。gcd(4 + 1, 15) = gcd(5, 15) = 5。' },
              { title: '驗證因數分解', classical: true, content: '15 = 3 × 5。成功！' },
            ],
            tableHeaders: ['x', '2^x mod 15'],
          },
        },
        labs: { shor: 'Shor 演算法示範' },
      },
      '11.4': {
        title: '11.4 複雜度',
        paragraphs: {
          p1: '在具有 O(n) 量子位元與 poly(n) 閘的容錯量子計算機上：',
          p2: '已知最佳古典分解（一般數域篩法）為次指數：exp(O((log N)^{1/3})). Shor 提供超多項式加速——後量子密碼學遷移的原因。',
        },
        tables: {
          complexity: {
            headers: ['組件', '古典 / 量子', '成本'],
            rows: [
              { component: '選 a、gcd 檢查', type: '古典', cost: 'O(log² N)' },
              { component: '模指數電路', type: '量子', cost: 'O(n³) 閘' },
              { component: 'QPE + QFT', type: '量子', cost: 'O(n² log N) 閘' },
              { component: '連分數', type: '古典', cost: 'O(n²)' },
              { component: 'gcd(a^{r/2} ± 1, N)', type: '古典', cost: 'O(log² N)' },
            ],
          },
        },
        checkpoints: {
          time: { question: 'Shor 在容錯機器上運行時間（n = log N）？', answer: 'polynomial', hint: 'Poly(n) = poly(log N)。' },
        },
      },
      '11.5': {
        title: '11.5 密碼學影響',
        paragraphs: {
          p1: 'RSA、Diffie–Hellman 與橢圓曲線密碼（透過 Shor 的離散對數變體）依賴因數分解或離散對數的困難性。大規模容錯量子計算機運行 Shor 將破解這些系統。',
        },
        headings: { relatedLabs: '相關實驗' },
        expandables: {
          pqc: {
            title: '後量子密碼學（PQC）',
            p1: 'NIST 標準化後量子演算法（2024）基於格問題、哈希簽名與碼基方案——Shor 不攻擊的數學假設。政府與產業標準的 PQC 遷移正在進行。',
            p2: '重要細節：今日 NISQ 裝置無法對密碼學相關密鑰大小（2048 位元 RSA）運行完整 Shor。「先收集、後解密」威脅促使主動遷移，而非對即時破解的恐慌。',
          },
          periodHeart: {
            title: '週期尋找——量子核心',
            p1: '量子子程序在模乘法酉算子上用 QPE 估計 f(x) = a^x mod N 的週期 r。QFT 將 x 中的週期結構轉為 N/r 倍數處的峰值；連分數從測量相位恢復 r。見第 9 章（QFT）與第 10 章（QPE）。',
          },
        },
        labLinks: {
          shor: 'Shor 演算法示範（N=15）',
          'period-finding': '週期探索器',
          'phase-estimation': '相位估計',
          qft: 'QFT 視覺化',
        },
      },
    },
  },
  ja: {
    title: '第11章：ショアアルゴリズム',
    intro:
      'ショアアルゴリズム（1994）は耐故障量子コンピュータで大きな合成整数を多項式時間で因数分解——RSA と Diffie–Hellman を脅かす。量子の核心は QPE による周期探索；残りは古典数論。',
    labLink: 'フルラボを開く：{{title}} →',
    sections: {
      '11.1': {
        title: '11.1 周期探索への帰着',
        paragraphs: {
          p1: '合成数 N を因数分解するには、1 < a < N かつ gcd(a, N) = 1 のランダム a を選ぶ。gcd(a, N) > 1 なら古典的に因数が見つかった。そうでなければ最小 r > 0 で次を満たすものを見つける：',
          p2: 'この r は a の mod N の周期（位数）。周期探索が困難な量子ステップ；r からの因数分解は古典 gcd 演算。',
        },
        cards: {
          quantum: {
            title: '⚛ 量子部分',
            items: ['x 上に重ね合わせを準備', 'a^x mod N を計算（モジュラー指数）', 'QPE + QFT で周期 r を抽出'],
          },
          classical: {
            title: '⚙ 古典部分',
            items: ['ランダム a を選び gcd を確認', 'r が偶数、a^{r/2} ≢ −1 を確認', 'gcd(a^{r/2} ± 1, N) を計算', '自明因数なら再試行'],
          },
        },
        labs: { 'period-finding': '周期エクスプローラ' },
      },
      '11.2': {
        title: '11.2 周期から因数へ',
        paragraphs: {
          p1: 'a^r ≡ 1 (mod N) の周期 r が与えられたとき、a^r − 1 ≡ 0 (mod N) なので N は (a^{r/2} − 1)(a^{r/2} + 1) を割る。a^{r/2} ≢ −1 (mod N) ならどちらの因子も N の倍数ではなく、gcd が非自明因数を抽出。',
        },
        workedExamples: {
          conditions: {
            title: '成功する因数分解の条件',
            steps: [
              { label: 'r は偶数で r/2 が整数になる必要がある。', latex: 'r = 2k \\text{ for some integer } k' },
              { label: 'a^{r/2} ≢ −1 (mod N)。否则両 gcd が 1 または N——自明。', latex: 'a^{r/2} \\not\\equiv -1 \\pmod{N}' },
              { label: '両条件が成立すれば、gcd(a^{r/2} − 1, N) と gcd(a^{r/2} + 1, N) はランダム a で確率 ≥ 1/2 で非自明因数。', latex: 'p \\cdot q = N' },
              { label: 'いずれか失敗なら新しい a で再試行。期待 O(1) 回。', latex: '\\text{Repeat until success}' },
            ],
          },
        },
        expandables: {
          minusOne: {
            title: 'a^{r/2} ≡ −1 が失敗を招く理由',
            p1: 'a^{r/2} ≡ −1 (mod N) なら a^{r/2} + 1 ≡ 0 (mod N)、gcd(a^{r/2} + 1, N) = N——自明因数。同様 gcd(a^{r/2} − 1, N) = 1。有効周期の約半分が有用な因数；残りは別の a で再試行。',
          },
        },
        checkpoints: {
          gcd: { question: '周期 r から因数を抽出する gcd 計算は？', answer: 'gcd(a^{r/2} ± 1, N)', hint: 'a^r − 1 因数分解の ±1。' },
        },
      },
      '11.3': {
        title: '11.3 15 の因数分解：インタラクティブウォークスルー',
        paragraphs: {
          p1: '標準デモは a = 2 で N = 15 を因数分解。2^x mod 15 の周期は r = 4、因数 3 と 5。',
        },
        workedExamples: {
          summary: {
            title: 'a = 2, N = 15（要約）',
            steps: [
              { label: '列 2^x mod 15：1, 2, 4, 8, 1, … → 周期 r = 4。', latex: '2^4 \\equiv 1 \\pmod{15}' },
              { label: 'r は偶数。a^{r/2} = 2² = 4 ≢ 14 ≡ −1 (mod 15)。✓', latex: '4 \\not\\equiv -1 \\pmod{15}' },
              { label: 'gcd(4 − 1, 15) = gcd(3, 15) = 3。', latex: '\\gcd(3, 15) = 3' },
              { label: 'gcd(4 + 1, 15) = gcd(5, 15) = 5。よって 15 = 3 × 5。', latex: '15 = 3 \\times 5' },
            ],
          },
        },
        widgets: {
          stepper: {
            intro: 'インタラクティブウォークスルー：a = 2 で N = 15 を因数分解（ショア標準デモ）。',
            classicalStep: '⚙ 古典ステップ',
            quantumStep: '⚛ 量子ステップ',
            periodMark: ' ← 周期！',
            factors: '因数：',
            reset: 'リセット',
            next: '次のステップ →',
            done: '完了',
            steps: [
              { title: 'N と互素 a を選ぶ', classical: true, content: '合成数 N = 15。a = 2 を選び gcd(2, 15) = 1。' },
              { title: 'モジュラー累乗を計算（古典チェック）', classical: true, content: 'x = 0, 1, 2, … の 2^x mod 15 を評価して反復を見つける。' },
              { title: '量子周期探索', classical: false, content: 'U|y⟩ = |2^x · y mod 15⟩ で QPE + QFT が 2^x mod 15 の周期 r を推定。' },
              { title: '周期 r = 4 を確認', classical: true, content: '2^4 mod 15 = 16 mod 15 = 1。列：1, 2, 4, 8, 1, …' },
              { title: 'r が偶数か確認', classical: true, content: 'r = 4 は偶数。r が奇数なら別の a で再開。' },
              { title: 'a^{r/2} mod N を計算', classical: true, content: '2^{4/2} mod 15 = 2² mod 15 = 4。' },
              { title: 'a^{r/2} ≢ −1 (mod N) を確認', classical: true, content: '4 ≢ 14 (≡ −1 mod 15)。a^{r/2} ≡ −1 なら再開——この a から因数なし。' },
              { title: 'gcd で因数を抽出', classical: true, content: 'gcd(4 − 1, 15) = gcd(3, 15) = 3。gcd(4 + 1, 15) = gcd(5, 15) = 5。' },
              { title: '因数分解を確認', classical: true, content: '15 = 3 × 5。成功！' },
            ],
            tableHeaders: ['x', '2^x mod 15'],
          },
        },
        labs: { shor: 'ショアアルゴリズムデモ' },
      },
      '11.4': {
        title: '11.4 計算量',
        paragraphs: {
          p1: 'O(n) 量子ビットと poly(n) ゲートの耐故障量子コンピュータ上で：',
          p2: '既知の最良古典因数分解（一般数体篩法）は準指数：exp(O((log N)^{1/3})). ショアは超多項式加速——ポスト量子暗号移行の理由。',
        },
        tables: {
          complexity: {
            headers: ['コンポーネント', '古典 / 量子', 'コスト'],
            rows: [
              { component: 'a 選択、gcd チェック', type: '古典', cost: 'O(log² N)' },
              { component: 'モジュラー指数回路', type: '量子', cost: 'O(n³) ゲート' },
              { component: 'QPE + QFT', type: '量子', cost: 'O(n² log N) ゲート' },
              { component: '連分数', type: '古典', cost: 'O(n²)' },
              { component: 'gcd(a^{r/2} ± 1, N)', type: '古典', cost: 'O(log² N)' },
            ],
          },
        },
        checkpoints: {
          time: { question: '耐故障マシンでのショアの実行時間（n = log N）は？', answer: 'polynomial', hint: 'Poly(n) = poly(log N)。' },
        },
      },
      '11.5': {
        title: '11.5 暗号への影響',
        paragraphs: {
          p1: 'RSA、Diffie–Hellman、楕円曲線暗号（ショアの離散対数版）は因数分解または離散対数の困難性に依存。大規模耐故障量子コンピュータでショアを実行すればこれらを破る。',
        },
        headings: { relatedLabs: '関連ラボ' },
        expandables: {
          pqc: {
            title: 'ポスト量子暗号（PQC）',
            p1: 'NIST は格子問題、ハッシュ署名、符号ベース方式に基づくポスト量子アルゴリズム（2024）を標準化——ショアが攻撃しない数学的仮定。政府・産業標準での PQC 移行が進行中。',
            p2: '重要な nuance：今日の NISQ デバイスは暗号学的に関連する鍵サイズ（2048 ビット RSA）で完全なショアを実行できない。「今収集、後で復号」脅威が積極的移行を促す——即時破られへの panic ではない。',
          },
          periodHeart: {
            title: '周期探索——量子の心臓',
            p1: '量子サブルーチンはモジュラー乗算ユニタリで QPE を使い f(x) = a^x mod N の周期 r を推定。QFT は x の周期構造を N/r の倍数のピークに変換；連分数が測定位相から r を復元。第9章（QFT）と第10章（QPE）を参照。',
          },
        },
        labLinks: {
          shor: 'ショアアルゴリズムデモ（N=15）',
          'period-finding': '周期エクスプローラ',
          'phase-estimation': '位相推定',
          qft: 'QFT ビジュアライザ',
        },
      },
    },
  },
};
