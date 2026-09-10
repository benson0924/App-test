export const phaseEstimation = {
  en: {
    title: 'Chapter 10: Quantum Phase Estimation',
    intro:
      'Quantum Phase Estimation (QPE) reads out the eigenvalue phase of a unitary operator — the subroutine that connects the QFT to Shor\'s algorithm and quantum chemistry simulations.',
    labLink: 'Open full lab: {{title}} →',
    sections: {
      '10.1': {
        title: '10.1 Problem Statement',
        paragraphs: {
          p1: 'Given a unitary U with eigenstate |u⟩ and eigenvalue e^{2πiφ}:',
          p2: 'The goal is to estimate the phase φ ∈ [0, 1) (as a fraction of a full rotation) to m bits of precision using m ancillary control qubits and O(m) controlled applications of U.',
        },
        expandables: {
          whyPhases: {
            title: 'Why phases matter',
            p1: "In Shor's algorithm, the modular multiplication unitary U|y⟩ = |ay mod N⟩ has eigenstates whose phases encode 1/r, where r is the period of a^x mod N. QPE extracts r, enabling factoring.",
          },
        },
        labs: { 'phase-estimation': 'Phase Estimation' },
      },
      '10.2': {
        title: '10.2 The QPE Circuit',
        paragraphs: {
          p1: 'The standard circuit uses m control qubits and one target qubit prepared in |u⟩:',
        },
        workedExamples: {
          controlledU: {
            title: 'Controlled-U powers',
            steps: [
              { label: 'Prepare m control qubits in |+⟩⊗ᵐ and target in eigenstate |u⟩.', latex: '|+\\rangle^{\\otimes m}|u\\rangle' },
              { label: 'Apply controlled-U^{2^j} from control qubit j (j = 0, …, m−1). Each control picks up phase e^{2πiφ·2^j}.', latex: '|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle' },
              { label: 'Control register becomes ∑_j e^{2πiφ·2^j}|j⟩ — a Fourier-like superposition encoding φ in binary.', latex: '\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle' },
              { label: 'Apply inverse QFT on controls. Measure to obtain m-bit binary approximation of φ.', latex: '|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle' },
            ],
          },
        },
        checkpoints: {
          afterControlledU: { question: 'What operation follows the controlled-U^{2^j} gates on the control register?', answer: 'inverse QFT', hint: 'Converts phase kickback into binary readout.' },
        },
      },
      '10.3': {
        title: '10.3 Binary Fraction Readout',
        paragraphs: {
          p1: 'The measurement outcome is interpreted as a binary fraction:',
          p2: 'Control qubit j (0-indexed from the top) encodes bit φ_{j+1} — the j-th digit after the binary point. This is exactly the inverse QFT extracting each bit of the phase.',
        },
        expandables: {
          kickback: {
            title: 'Phase kickback connection',
            p1: 'Each controlled-U^{2^j} kicks back phase e^{2πiφ·2^j} onto control qubit j when the target is in |u⟩. The inverse QFT reverses the QFT on these phases, concentrating amplitude on the basis state whose binary label best approximates φ.',
          },
        },
      },
      '10.4': {
        title: '10.4 Worked Example: φ = 1/3',
        paragraphs: {
          p1: 'Run the demo above with φ = 1/3 and m = 6 to see the simulated estimate, binary string, and error from our quantum-core phase estimation routine.',
        },
        workedExamples: {
          phiThird: {
            title: 'Estimating φ = 1/3 with m = 6 qubits',
            steps: [
              { label: 'Write φ = 1/3 in binary: 0.010101… (repeating).', latex: '\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2' },
              { label: 'U|u⟩ = e^{2πi/3}|u⟩. Controlled-U^{2^0} adds phase e^{2πi/3}; U^{2^1} adds e^{4πi/3}; etc.', latex: 'e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}' },
              { label: 'After inverse QFT with m = 6, measurement yields ≈ 0.010101 = 21/64 ≈ 0.328.', latex: '\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125' },
              { label: 'Error |1/3 − 21/64| ≈ 0.005. Adding qubits improves accuracy.', latex: '|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}' },
            ],
          },
        },
        widgets: {
          demo: {
            truePhase: 'True phase φ = {{phi}} (fraction of full rotation)',
            precisionQubits: 'Precision qubits m = {{m}}',
            truePhiBinary: 'True φ (binary)',
            estimatedPhi: 'Estimated φ',
            measuredBits: 'Measured bit string',
            error: '|φ − φ̂|',
            footnote: 'With m precision qubits, readout approximates φ to m binary digits after the decimal point.',
          },
        },
      },
      '10.5': {
        title: '10.5 Precision vs Qubit Count',
        paragraphs: {
          p1: 'With m precision qubits, QPE approximates φ to m binary digits (under ideal conditions):',
        },
        tables: {
          precision: {
            headers: ['Precision qubits m', 'Max error 2^{−m}', 'Example'],
            rows: [
              { m: '4', error: '0.0625', example: 'Coarse phase estimate' },
              { m: '8', error: '≈ 0.004', example: 'Moderate precision' },
              { m: '12', error: '≈ 0.00024', example: 'Shor-scale periods' },
              { m: '2n + ⌈log(1/ε)⌉', error: 'ε', example: 'Standard complexity bound' },
            ],
          },
        },
        expandables: {
          success: {
            title: 'Success probability and repetitions',
            p1: 'QPE succeeds with high probability when the target is exactly an eigenstate. For Shor, eigenstates are approximated; the algorithm repeats O(log N) times and uses continued fractions to recover r from measured phases. Total cost: O(n² log N) gates for factoring an n-bit number N.',
          },
        },
        checkpoints: {
          bits: { question: 'How many bits of φ does m precision qubits provide (ideally)?', answer: 'm' },
        },
      },
      '10.6': {
        title: "10.6 Role in Shor's Algorithm",
        paragraphs: {
          p1: "Shor's factoring algorithm reduces to: find period r of f(x) = a^x mod N, then compute gcd(a^{r/2} ± 1, N). The modular multiplication unitary",
          p2: 'has eigenphases s/r for integers s. QPE estimates s/r; continued fractions extract r.',
          p3: "Next: Chapter 11 — Shor's Algorithm · Period Explorer",
        },
        expandables: {
          modularMult: {
            title: 'Modular multiplication unitary',
            p1: 'Implementing controlled-U^{2^j} efficiently requires modular exponentiation circuits — the dominant gate cost in Shor. QPE wraps this arithmetic in a phase-estimation shell, turning period structure into measurable binary fractions.',
          },
        },
        labs: { 'phase-estimation': 'Phase Estimation' },
        links: { shor: "Chapter 11 — Shor's Algorithm", periodFinding: 'Period Explorer' },
      },
    },
  },
  'zh-TW': {
    title: '第 10 章：量子相位估計',
    intro:
      '量子相位估計（QPE）讀出酉算子的本征值相位——連接 QFT 與 Shor 演算法及量子化學模擬的子程序。',
    labLink: '開啟完整實驗：{{title}} →',
    sections: {
      '10.1': {
        title: '10.1 問題表述',
        paragraphs: {
          p1: '給定本征態 |u⟩ 與本征值 e^{2πiφ} 的酉算子 U：',
          p2: '目標是用 m 個輔助控制量子位元與 O(m) 次受控 U 應用，以 m 位元精度估計相位 φ ∈ [0, 1)（完整旋轉的分數）。',
        },
        expandables: {
          whyPhases: {
            title: '相位為何重要',
            p1: '在 Shor 演算法中，模乘法酉算子 U|y⟩ = |ay mod N⟩ 的本征態相位編碼 1/r，其中 r 是 a^x mod N 的週期。QPE 提取 r，使因數分解成為可能。',
          },
        },
        labs: { 'phase-estimation': '相位估計' },
      },
      '10.2': {
        title: '10.2 QPE 電路',
        paragraphs: {
          p1: '標準電路使用 m 個控制量子位元與一個準備在 |u⟩ 的目標量子位元：',
        },
        workedExamples: {
          controlledU: {
            title: '受控-U 冪次',
            steps: [
              { label: '將 m 個控制量子位元準備為 |+⟩⊗ᵐ，目標處於本征態 |u⟩。', latex: '|+\\rangle^{\\otimes m}|u\\rangle' },
              { label: '從控制量子位元 j（j = 0, …, m−1）套用受控-U^{2^j}。每個控制獲得相位 e^{2πiφ·2^j}。', latex: '|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle' },
              { label: '控制寄存器變為 ∑_j e^{2πiφ·2^j}|j⟩——以二進位編碼 φ 的傅立葉型疊加。', latex: '\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle' },
              { label: '對控制套用逆 QFT。測量得到 φ 的 m 位元二進位近似。', latex: '|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle' },
            ],
          },
        },
        checkpoints: {
          afterControlledU: { question: '控制寄存器上受控-U^{2^j} 閘之後進行什麼操作？', answer: 'inverse QFT', hint: '將相位回踢轉為二進位讀出。' },
        },
      },
      '10.3': {
        title: '10.3 二進位分數讀出',
        paragraphs: {
          p1: '測量結果解釋為二進位分數：',
          p2: '控制量子位元 j（從頂部 0 索引）編碼位元 φ_{j+1}——二進位小數點後第 j 位。這正是逆 QFT 逐位提取相位。',
        },
        expandables: {
          kickback: {
            title: '相位回踢連結',
            p1: '當目標在 |u⟩ 時，每個受控-U^{2^j} 將相位 e^{2πiφ·2^j} 回踢到控制量子位元 j。逆 QFT 反轉這些相位上的 QFT，將振幅集中在二進位標籤最佳近似 φ 的基態上。',
          },
        },
      },
      '10.4': {
        title: '10.4 範例：φ = 1/3',
        paragraphs: {
          p1: '在上方示範中以 φ = 1/3、m = 6 執行，查看 quantum-core 相位估計例程的模擬估計、二進位字串與誤差。',
        },
        workedExamples: {
          phiThird: {
            title: '以 m = 6 量子位元估計 φ = 1/3',
            steps: [
              { label: '將 φ = 1/3 寫為二進位：0.010101…（循環）。', latex: '\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2' },
              { label: 'U|u⟩ = e^{2πi/3}|u⟩。受控-U^{2^0} 加相位 e^{2πi/3}；U^{2^1} 加 e^{4πi/3}；等。', latex: 'e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}' },
              { label: 'm = 6 逆 QFT 後，測量得 ≈ 0.010101 = 21/64 ≈ 0.328。', latex: '\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125' },
              { label: '誤差 |1/3 − 21/64| ≈ 0.005。增加量子位元可提高精度。', latex: '|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}' },
            ],
          },
        },
        widgets: {
          demo: {
            truePhase: '真實相位 φ = {{phi}}（完整旋轉的分數）',
            precisionQubits: '精度量子位元 m = {{m}}',
            truePhiBinary: '真實 φ（二進位）',
            estimatedPhi: '估計 φ',
            measuredBits: '測得的位元字串',
            error: '|φ − φ̂|',
            footnote: 'm 個精度量子位元使讀出在小數點後近似 φ 的 m 位二進位數字。',
          },
        },
      },
      '10.5': {
        title: '10.5 精度與量子位元數',
        paragraphs: {
          p1: 'm 個精度量子位元使 QPE 近似 φ 至 m 位二進位數字（理想條件下）：',
        },
        tables: {
          precision: {
            headers: ['精度量子位元 m', '最大誤差 2^{−m}', '範例'],
            rows: [
              { m: '4', error: '0.0625', example: '粗略相位估計' },
              { m: '8', error: '≈ 0.004', example: '中等精度' },
              { m: '12', error: '≈ 0.00024', example: 'Shor 級週期' },
              { m: '2n + ⌈log(1/ε)⌉', error: 'ε', example: '標準複雜度界' },
            ],
          },
        },
        expandables: {
          success: {
            title: '成功機率與重複',
            p1: '當目標確切為本征態時，QPE 以高機率成功。對 Shor，本征態是近似的；演算法重複 O(log N) 次並用連分數從測量相位恢復 r。總成本：分解 n 位元數 N 需 O(n² log N) 閘。',
          },
        },
        checkpoints: {
          bits: { question: 'm 個精度量子位元理想上提供 φ 的多少位元？', answer: 'm' },
        },
      },
      '10.6': {
        title: '10.6 在 Shor 演算法中的角色',
        paragraphs: {
          p1: 'Shor 因數分解演算法歸結為：找 f(x) = a^x mod N 的週期 r，然後計算 gcd(a^{r/2} ± 1, N)。模乘法酉算子',
          p2: '具有整數 s 的本征相位 s/r。QPE 估計 s/r；連分數提取 r。',
          p3: '下一步：第 11 章——Shor 演算法 · 週期探索器',
        },
        expandables: {
          modularMult: {
            title: '模乘法酉算子',
            p1: '高效實現受控-U^{2^j} 需要模指數電路——Shor 中的主要閘成本。QPE 將此算術包在相位估計外殼中，將週期結構轉為可測的二進位分數。',
          },
        },
        labs: { 'phase-estimation': '相位估計' },
        links: { shor: '第 11 章——Shor 演算法', periodFinding: '週期探索器' },
      },
    },
  },
  ja: {
    title: '第10章：量子位相推定',
    intro:
      '量子位相推定（QPE）はユニタリ演算子の固有値位相を読み出す——QFT とショアアルゴリズム、量子化学シミュレーションを結ぶサブルーチン。',
    labLink: 'フルラボを開く：{{title}} →',
    sections: {
      '10.1': {
        title: '10.1 問題設定',
        paragraphs: {
          p1: '固有状態 |u⟩ と固有値 e^{2πiφ} のユニタリ U が与えられたとき：',
          p2: 'm 個の補助制御量子ビットと O(m) 回の制御 U 適用で、位相 φ ∈ [0, 1)（完全回転の分数）を m ビット精度で推定する。',
        },
        expandables: {
          whyPhases: {
            title: '位相が重要な理由',
            p1: 'ショアアルゴリズムでは、モジュラー乗算ユニタリ U|y⟩ = |ay mod N⟩ の固有状態の位相が 1/r を符号化し、r は a^x mod N の周期。QPE が r を抽出し、因数分解を可能にする。',
          },
        },
        labs: { 'phase-estimation': '位相推定' },
      },
      '10.2': {
        title: '10.2 QPE 回路',
        paragraphs: {
          p1: '標準回路は m 制御量子ビットと |u⟩ に準備された 1 ターゲット量子ビットを使う：',
        },
        workedExamples: {
          controlledU: {
            title: '制御-U の累乗',
            steps: [
              { label: 'm 制御量子ビットを |+⟩⊗ᵐ、ターゲットを固有状態 |u⟩ に準備。', latex: '|+\\rangle^{\\otimes m}|u\\rangle' },
              { label: '制御量子ビット j（j = 0, …, m−1）から制御-U^{2^j} を適用。各制御は位相 e^{2πiφ·2^j} を得る。', latex: '|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle' },
              { label: '制御レジスタは ∑_j e^{2πiφ·2^j}|j⟩ になる——φ を二進で符号化するフーリエ型重ね合わせ。', latex: '\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle' },
              { label: '制御に逆 QFT を適用。測定で φ の m ビット二進近似を得る。', latex: '|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle' },
            ],
          },
        },
        checkpoints: {
          afterControlledU: { question: '制御レジスタで制御-U^{2^j} ゲートの後に何を行う？', answer: 'inverse QFT', hint: '位相キックバックを二進読出しに変換。' },
        },
      },
      '10.3': {
        title: '10.3 二進小数読出し',
        paragraphs: {
          p1: '測定結果は二進小数として解釈される：',
          p2: '制御量子ビット j（上から 0 始まり）はビット φ_{j+1} を符号化——二進小数点後の j 桁目。これは逆 QFT が位相の各ビットを抽出するのと同じ。',
        },
        expandables: {
          kickback: {
            title: '位相キックバックの接続',
            p1: 'ターゲットが |u⟩ のとき、各制御-U^{2^j} は制御量子ビット j に位相 e^{2πiφ·2^j} をキックバック。逆 QFT はこれらの位相の QFT を逆にし、二進ラベルが φ を最もよく近似する基底状態に振幅を集中させる。',
          },
        },
      },
      '10.4': {
        title: '10.4 例：φ = 1/3',
        paragraphs: {
          p1: '上のデモで φ = 1/3、m = 6 を実行し、quantum-core 位相推定ルーチンのシミュレーション推定、二進文字列、誤差を確認。',
        },
        workedExamples: {
          phiThird: {
            title: 'm = 6 量子ビットで φ = 1/3 を推定',
            steps: [
              { label: 'φ = 1/3 を二進で書く：0.010101…（循環）。', latex: '\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2' },
              { label: 'U|u⟩ = e^{2πi/3}|u⟩。制御-U^{2^0} は位相 e^{2πi/3}；U^{2^1} は e^{4πi/3}；など。', latex: 'e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}' },
              { label: 'm = 6 で逆 QFT 後、測定は ≈ 0.010101 = 21/64 ≈ 0.328。', latex: '\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125' },
              { label: '誤差 |1/3 − 21/64| ≈ 0.005。量子ビットを増やすと精度向上。', latex: '|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}' },
            ],
          },
        },
        widgets: {
          demo: {
            truePhase: '真の位相 φ = {{phi}}（完全回転の分数）',
            precisionQubits: '精度量子ビット m = {{m}}',
            truePhiBinary: '真の φ（二進）',
            estimatedPhi: '推定 φ',
            measuredBits: '測定ビット列',
            error: '|φ − φ̂|',
            footnote: 'm 精度量子ビットで、小数点後 m 桁の二進で φ を近似読出し。',
          },
        },
      },
      '10.5': {
        title: '10.5 精度と量子ビット数',
        paragraphs: {
          p1: 'm 精度量子ビットで QPE は φ を m 桁の二進（理想条件下）で近似：',
        },
        tables: {
          precision: {
            headers: ['精度量子ビット m', '最大誤差 2^{−m}', '例'],
            rows: [
              { m: '4', error: '0.0625', example: '粗い位相推定' },
              { m: '8', error: '≈ 0.004', example: '中程度の精度' },
              { m: '12', error: '≈ 0.00024', example: 'ショア級周期' },
              { m: '2n + ⌈log(1/ε)⌉', error: 'ε', example: '標準計算量境界' },
            ],
          },
        },
        expandables: {
          success: {
            title: '成功確率と反復',
            p1: 'ターゲットが厳密に固有状態のとき QPE は高確率で成功。ショアでは固有状態は近似；アルゴリズムは O(log N) 回反復し連分数で測定位相から r を復元。総コスト：n ビット数 N の因数分解に O(n² log N) ゲート。',
          },
        },
        checkpoints: {
          bits: { question: 'm 精度量子ビットは理想に φ の何ビットを提供？', answer: 'm' },
        },
      },
      '10.6': {
        title: '10.6 ショアアルゴリズムでの役割',
        paragraphs: {
          p1: 'ショアの因数分解は：f(x) = a^x mod N の周期 r を見つけ、gcd(a^{r/2} ± 1, N) を計算に帰着。モジュラー乗算ユニタリ',
          p2: 'は整数 s の固有位相 s/r を持つ。QPE が s/r を推定；連分数が r を抽出。',
          p3: '次：第11章——ショアアルゴリズム · 周期エクスプローラ',
        },
        expandables: {
          modularMult: {
            title: 'モジュラー乗算ユニタリ',
            p1: '制御-U^{2^j} の効率的実装にはモジュラー指数回路が必要——ショアの主要ゲートコスト。QPE はこの演算を位相推定シェルで包み、周期構造を測定可能な二進小数に変換。',
          },
        },
        labs: { 'phase-estimation': '位相推定' },
        links: { shor: '第11章——ショアアルゴリズム', periodFinding: '周期エクスプローラ' },
      },
    },
  },
};
