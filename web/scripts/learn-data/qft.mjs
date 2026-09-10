export const qft = {
  en: {
    title: 'Chapter 9: Quantum Fourier Transform',
    intro:
      'The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform. It maps computational-basis states to Fourier-basis states and is the engine behind phase estimation, period finding, and Shor\'s algorithm.',
    labLink: 'Open full lab: {{title}} →',
    sections: {
      '9.1': {
        title: '9.1 Definition and ω_N',
        paragraphs: {
          p1: 'For N = 2ⁿ, define the N-th root of unity:',
          p2: 'The QFT on an n-qubit register acts on computational basis |x⟩ as:',
          p3: 'The QFT matrix F_N has entries F_kx = ω_N^{kx} / √N. For example, with N = {{N}} and k = {{k}}: ω_N^{kx} = e^{i·{{angle}}°}.',
        },
        expandables: {
          unitarity: {
            title: 'Unitarity of F_N',
            p1: 'The rows (and columns) of F_N are orthonormal because ∑_{x=0}^{N−1} ω_N^{x(k−k\')} = N·δ_{kk\'}. Therefore F_N†F_N = I — the QFT is a valid quantum gate.',
          },
        },
        checkpoints: {
          omega: { question: 'What is ω_N in terms of N?', answer: 'e^{2πi/N}', hint: 'Primitive N-th root of unity.' },
        },
      },
      '9.2': {
        title: '9.2 The Measurement Warning',
        paragraphs: {
          p1: 'A critical distinction from classical FFT: the QFT transforms amplitudes, not measured classical data. After QFT, the state is a superposition of all Fourier basis states.',
          p2: 'For input |x⟩, every output amplitude has magnitude 1/√N — the information about x is encoded in the phases ω_N^{xk}, not in a single peak.',
        },
        warning: {
          title: 'Warning:',
          p1: 'You cannot read all N amplitudes at once.',
          p2: 'A single measurement returns one outcome k with probability |⟨k|QFT|ψ⟩|². Extracting the full Fourier spectrum requires either many copies of the state or structured algorithms (e.g. phase estimation) that read out specific bits of k one at a time.',
        },
        widgets: {
          amplitude: {
            numQubits: 'Number of qubits n = {{n}} (N = {{N}})',
            inputState: 'Input basis state |x⟩: x = {{x}} = |{{label}}⟩',
            spread: 'After QFT, amplitudes spread across all {{N}} basis states — each |k⟩ has probability |⟨k|F_N|x⟩|² = 1/N.',
            footnote: 'Measuring once yields one k — you cannot read all N amplitudes from a single run. The QFT lab visualizes full state vectors for small n.',
          },
        },
      },
      '9.3': {
        title: '9.3 Circuit Decomposition',
        paragraphs: {
          p1: 'The QFT admits an efficient O(n²) gate circuit — exponentially faster than the O(N²) classical DFT matrix multiply for N = 2ⁿ.',
        },
        workedExamples: {
          twoQubit: {
            title: '2-qubit QFT circuit',
            steps: [
              { label: 'Apply H to qubit 0 (MSB in big-endian convention).' },
              { label: 'Controlled phase R₂ on qubit 1, controlled by qubit 0: angle π/2.', latex: 'R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}' },
              { label: 'Apply H to qubit 1.' },
              { label: 'Swap qubits to match standard bit ordering (optional).', latex: '\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0' },
            ],
          },
          general: {
            title: 'General n-qubit pattern',
            steps: [
              { label: 'For j = 0, …, n−1: apply H to qubit j, then controlled phases R_m from qubits j+1, …, n−1 with angles π/2^{m−j−1}.' },
              { label: 'After all Hadamards and phases, apply SWAP gates to reverse qubit order.', latex: 'O(n^2) \\text{ gates total}' },
              { label: 'Each controlled phase R_d = diag(1, e^{2πi/2^d}).', latex: 'R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}' },
            ],
          },
        },
        expandables: {
          product: {
            title: 'Product representation',
            p1: 'This binary-fraction form connects directly to phase estimation: each control qubit captures one bit of a phase φ.',
          },
        },
      },
      '9.4': {
        title: '9.4 Inverse QFT',
        paragraphs: {
          p1: 'The inverse QFT (IQFT) uses the conjugate phases — replace ω_N with ω_N^{−1}:',
          p2: 'In circuit form: reverse the gate order and conjugate every phase angle (π/2^d → −π/2^d).',
        },
        widgets: {
          iqft: {
            fidelity: 'QFT then IQFT on |{{label}}⟩ (n={{n}}): fidelity on original basis state = {{fidelity}}% (ideal: 100%).',
          },
        },
        checkpoints: {
          exponent: { question: 'How does the IQFT differ from the QFT in the exponent?', answer: 'negative exponent', hint: 'Sign of 2πixk/N.' },
        },
      },
      '9.5': {
        title: '9.5 Connection to Period Finding',
        paragraphs: {
          p1: "Period finding — the core of Simon's and Shor's algorithms — exploits the QFT to extract periodicity from superposition states.",
          p2: 'See also: Period Explorer and Chapter 11: Shor\'s Algorithm.',
        },
        workedExamples: {
          periodFinding: {
            title: 'Period finding sketch',
            steps: [
              { label: 'Prepare uniform superposition over x, compute f(x) into ancilla (or use phase oracle).' },
              { label: 'Measure or discard ancilla; input register collapses to superposition over x with the same f-value — a periodic state.', latex: '\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle' },
              { label: 'Apply QFT to the input register. Peaks appear at k multiples of N/r.', latex: '\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r' },
              { label: 'Measure k; classical post-processing (continued fractions) recovers period r.', latex: 'r = N / \\gcd(k, N)' },
            ],
          },
        },
        expandables: {
          hsp: {
            title: 'Hidden subgroup perspective',
            p1: 'The QFT succeeds when the function is constant on cosets of a hidden subgroup H of ℤ_N (or ℤ_2ⁿ for Simon). Measuring Fourier basis states reveals information about H⊥ — unifying Deutsch–Jozsa, Simon, and Shor as hidden-subgroup problems.',
          },
        },
        labs: { qft: 'QFT Visualizer' },
        links: { periodFinding: 'Period Explorer', shor: "Chapter 11: Shor's Algorithm" },
      },
    },
  },
  'zh-TW': {
    title: '第 9 章：量子傅立葉變換',
    intro:
      '量子傅立葉變換（QFT）是離散傅立葉變換的量子類似物。它將計算基態映射到傅立葉基態，是相位估計、週期尋找與 Shor 演算法的核心。',
    labLink: '開啟完整實驗：{{title}} →',
    sections: {
      '9.1': {
        title: '9.1 定義與 ω_N',
        paragraphs: {
          p1: '對 N = 2ⁿ，定義 N 次單位根：',
          p2: 'n 量子位元寄存器上的 QFT 對計算基 |x⟩ 的作用為：',
          p3: 'QFT 矩陣 F_N 的元素為 F_kx = ω_N^{kx} / √N。例如 N = {{N}}、k = {{k}}：ω_N^{kx} = e^{i·{{angle}}°}。',
        },
        expandables: {
          unitarity: {
            title: 'F_N 的酉性',
            p1: 'F_N 的行（與列）正交歸一，因為 ∑_{x=0}^{N−1} ω_N^{x(k−k\')} = N·δ_{kk\'}。因此 F_N†F_N = I——QFT 是有效的量子閘。',
          },
        },
        checkpoints: {
          omega: { question: 'ω_N 用 N 如何表示？', answer: 'e^{2πi/N}', hint: '本原 N 次單位根。' },
        },
      },
      '9.2': {
        title: '9.2 測量警告',
        paragraphs: {
          p1: '與古典 FFT 的關鍵區別：QFT 變換振幅，而非測量後的古典資料。QFT 後，狀態是所有傅立葉基態的疊加。',
          p2: '對輸入 |x⟩，每個輸出振幅的幅度為 1/√N——關於 x 的資訊編碼在相位 ω_N^{xk} 中，而非單一峰值。',
        },
        warning: {
          title: '警告：',
          p1: '無法一次讀出所有 N 個振幅。',
          p2: '單次測量以機率 |⟨k|QFT|ψ⟩|² 回傳一個結果 k。提取完整傅立葉頻譜需要多份狀態副本，或結構化演算法（如相位估計）逐位讀出 k 的特定位元。',
        },
        widgets: {
          amplitude: {
            numQubits: '量子位元數 n = {{n}}（N = {{N}}）',
            inputState: '輸入基態 |x⟩：x = {{x}} = |{{label}}⟩',
            spread: 'QFT 後，振幅分散於全部 {{N}} 個基態——每個 |k⟩ 的機率為 |⟨k|F_N|x⟩|² = 1/N。',
            footnote: '測量一次只得一個 k——無法從單次執行讀出所有 N 個振幅。QFT 實驗為小 n 視覺化完整狀態向量。',
          },
        },
      },
      '9.3': {
        title: '9.3 電路分解',
        paragraphs: {
          p1: 'QFT 有高效的 O(n²) 閘電路——對 N = 2ⁿ 比 O(N²) 古典 DFT 矩陣乘法快指數級。',
        },
        workedExamples: {
          twoQubit: {
            title: '2 量子位元 QFT 電路',
            steps: [
              { label: '對量子位元 0（大端慣例中的 MSB）套用 H。' },
              { label: '在量子位元 1 上套用受控相位 R₂，由量子位元 0 控制：角度 π/2。', latex: 'R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}' },
              { label: '對量子位元 1 套用 H。' },
              { label: '交換量子位元以匹配標準位元順序（可選）。', latex: '\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0' },
            ],
          },
          general: {
            title: '一般 n 量子位元模式',
            steps: [
              { label: '對 j = 0, …, n−1：對量子位元 j 套用 H，然後從量子位元 j+1, …, n−1 以角度 π/2^{m−j−1} 套用受控相位 R_m。' },
              { label: '所有 Hadamard 與相位後，套用 SWAP 閘反轉量子位元順序。', latex: 'O(n^2) \\text{ gates total}' },
              { label: '每個受控相位 R_d = diag(1, e^{2πi/2^d})。', latex: 'R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}' },
            ],
          },
        },
        expandables: {
          product: {
            title: '乘積表示',
            p1: '此二進位分數形式直接連接相位估計：每個控制量子位元捕捉相位 φ 的一位。',
          },
        },
      },
      '9.4': {
        title: '9.4 逆 QFT',
        paragraphs: {
          p1: '逆 QFT（IQFT）使用共轭相位——將 ω_N 替換為 ω_N^{−1}：',
          p2: '電路形式：反轉閘順序並共轭每個相位角（π/2^d → −π/2^d）。',
        },
        widgets: {
          iqft: {
            fidelity: '对 |{{label}}⟩（n={{n}}）做 QFT 再 IQFT：原始基態保真度 = {{fidelity}}%（理想：100%）。',
          },
        },
        checkpoints: {
          exponent: { question: 'IQFT 與 QFT 在指數上有何不同？', answer: 'negative exponent', hint: '2πixk/N 的符號。' },
        },
      },
      '9.5': {
        title: '9.5 與週期尋找的連結',
        paragraphs: {
          p1: '週期尋找——Simon 與 Shor 演算法的核心——利用 QFT 從疊加態提取週期性。',
          p2: '另見：週期探索器與第 11 章：Shor 演算法。',
        },
        workedExamples: {
          periodFinding: {
            title: '週期尋找概述',
            steps: [
              { label: '對 x 準備均勻疊加，將 f(x) 計入輔助量子位元（或使用相位神諭）。' },
              { label: '測量或丟棄輔助量子位元；輸入寄存器坍縮為相同 f 值的 x 疊加——週期態。', latex: '\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle' },
              { label: '對輸入寄存器套用 QFT。在 k 為 N/r 的倍數處出現峰值。', latex: '\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r' },
              { label: '測量 k；古典後處理（連分數）恢復週期 r。', latex: 'r = N / \\gcd(k, N)' },
            ],
          },
        },
        expandables: {
          hsp: {
            title: '隱藏子群觀點',
            p1: '當函數在 ℤ_N（或 Simon 的 ℤ_2ⁿ）的隱藏子群 H 的陪集上為常數時，QFT 成功。測量傅立葉基態揭示 H⊥ 的資訊——統一 Deutsch–Jozsa、Simon 與 Shor 為隱藏子群問題。',
          },
        },
        labs: { qft: 'QFT 視覺化' },
        links: { periodFinding: '週期探索器', shor: '第 11 章：Shor 演算法' },
      },
    },
  },
  ja: {
    title: '第9章：量子フーリエ変換',
    intro:
      '量子フーリエ変換（QFT）は離散フーリエ変換の量子版です。計算基底状態をフーリエ基底状態に写し、位相推定、周期探索、ショアアルゴリズムのエンジンです。',
    labLink: 'フルラボを開く：{{title}} →',
    sections: {
      '9.1': {
        title: '9.1 定義と ω_N',
        paragraphs: {
          p1: 'N = 2ⁿ に対し、N 次単位根を定義：',
          p2: 'n 量子ビットレジスタの QFT は計算基底 |x⟩ に次のように作用：',
          p3: 'QFT 行列 F_N の要素は F_kx = ω_N^{kx} / √N。例：N = {{N}}、k = {{k}}：ω_N^{kx} = e^{i·{{angle}}°}。',
        },
        expandables: {
          unitarity: {
            title: 'F_N のユニタリ性',
            p1: 'F_N の行（と列）は ∑_{x=0}^{N−1} ω_N^{x(k−k\')} = N·δ_{kk\'} により正規直交。したがって F_N†F_N = I——QFT は有効な量子ゲート。',
          },
        },
        checkpoints: {
          omega: { question: 'ω_N は N でどう表される？', answer: 'e^{2πi/N}', hint: '原始 N 次単位根。' },
        },
      },
      '9.2': {
        title: '9.2 測定の警告',
        paragraphs: {
          p1: '古典 FFT との重要な違い：QFT は測定された古典データではなく振幅を変換する。QFT 後、状態はすべてのフーリエ基底状態の重ね合わせ。',
          p2: '入力 |x⟩ に対し、各出力振幅の大きさは 1/√N——x の情報は単一のピークではなく位相 ω_N^{xk} に符号化される。',
        },
        warning: {
          title: '警告：',
          p1: '一度にすべての N 振幅は読めない。',
          p2: '1 回の測定は確率 |⟨k|QFT|ψ⟩|² で 1 つの結果 k を返す。完全なフーリエスペクトルの抽出には状態の複数コピー、または k の特定ビットを 1 つずつ読む構造化アルゴリズム（例：位相推定）が必要。',
        },
        widgets: {
          amplitude: {
            numQubits: '量子ビット数 n = {{n}}（N = {{N}}）',
            inputState: '入力基底状態 |x⟩：x = {{x}} = |{{label}}⟩',
            spread: 'QFT 後、振幅はすべての {{N}} 基底状態に広がる——各 |k⟩ の確率は |⟨k|F_N|x⟩|² = 1/N。',
            footnote: '1 回の測定で 1 つの k——1 回の実行からすべての N 振幅は読めない。QFT ラボは小さい n で完全状態ベクトルを視覚化。',
          },
        },
      },
      '9.3': {
        title: '9.3 回路分解',
        paragraphs: {
          p1: 'QFT は効率的な O(n²) ゲート回路を持つ——N = 2ⁿ に対して O(N²) の古典 DFT 行列乗算より指数的に速い。',
        },
        workedExamples: {
          twoQubit: {
            title: '2 量子ビット QFT 回路',
            steps: [
              { label: '量子ビット 0（ビッグエンディアンで MSB）に H を適用。' },
              { label: '量子ビット 1 に制御位相 R₂、量子ビット 0 制御：角度 π/2。', latex: 'R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}' },
              { label: '量子ビット 1 に H を適用。' },
              { label: '標準ビット順に合わせて量子ビットを SWAP（任意）。', latex: '\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0' },
            ],
          },
          general: {
            title: '一般 n 量子ビットパターン',
            steps: [
              { label: 'j = 0, …, n−1 に対し：量子ビット j に H、次に量子ビット j+1, …, n−1 から角度 π/2^{m−j−1} の制御位相 R_m。' },
              { label: 'すべてのアダマールと位相の後、SWAP ゲートで量子ビット順を逆転。', latex: 'O(n^2) \\text{ gates total}' },
              { label: '各制御位相 R_d = diag(1, e^{2πi/2^d})。', latex: 'R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}' },
            ],
          },
        },
        expandables: {
          product: {
            title: '積表示',
            p1: 'この二進小数形式は位相推定に直接接続：各制御量子ビットが位相 φ の 1 ビットを捉える。',
          },
        },
      },
      '9.4': {
        title: '9.4 逆 QFT',
        paragraphs: {
          p1: '逆 QFT（IQFT）は共役位相を使う——ω_N を ω_N^{−1} に置換：',
          p2: '回路形式：ゲート順を逆にし、すべての位相角を共役（π/2^d → −π/2^d）。',
        },
        widgets: {
          iqft: {
            fidelity: '|{{label}}⟩（n={{n}}）で QFT して IQFT：元の基底状態の保真度 = {{fidelity}}%（理想：100%）。',
          },
        },
        checkpoints: {
          exponent: { question: 'IQFT は QFT と指数でどう異なる？', answer: 'negative exponent', hint: '2πixk/N の符号。' },
        },
      },
      '9.5': {
        title: '9.5 周期探索との接続',
        paragraphs: {
          p1: '周期探索——サイモンとショアの核心——QFT を利用して重ね合わせ状態から周期性を抽出する。',
          p2: '関連：周期エクスプローラと第11章：ショアアルゴリズム。',
        },
        workedExamples: {
          periodFinding: {
            title: '周期探索の概略',
            steps: [
              { label: 'x 上に一様重ね合わせを準備、f(x) を補助量子ビットに計算（または位相オラクル）。' },
              { label: '補助を測定または破棄；入力レジスタは同じ f 値の x の重ね合わせ——周期状態に崩壊。', latex: '\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle' },
              { label: '入力レジスタに QFT を適用。k が N/r の倍数でピーク。', latex: '\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r' },
              { label: 'k を測定；古典後処理（連分数）で周期 r を復元。', latex: 'r = N / \\gcd(k, N)' },
            ],
          },
        },
        expandables: {
          hsp: {
            title: '隠れ部分群の観点',
            p1: '関数が ℤ_N（またはサイモンの ℤ_2ⁿ）の隠れ部分群 H の陪集合上で定数のとき QFT は成功。フーリエ基底状態の測定は H⊥ の情報を明らかに——ドイチ・ヨズサ、サイモン、ショアを隠れ部分群問題として統一。',
          },
        },
        labs: { qft: 'QFT ビジュアライザ' },
        links: { periodFinding: '周期エクスプローラ', shor: '第11章：ショアアルゴリズム' },
      },
    },
  },
};
