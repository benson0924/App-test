export const index = {
  en: {
    title: 'Learn',
    intro:
      'Thirteen chapters progressing from classical computing through quantum algorithms and contemporary topics. Each chapter includes interactive elements, worked examples, and links to playground labs.',
    chapterTag: 'Ch. {{n}}',
    fallbackDescription: 'Interactive chapter with concept checks and labs.',
    nav: {
      home: '← Home',
      start: 'Classical Computing →',
    },
    descriptions: {
      '/learn/classical':
        'Bits, binary arithmetic, logic gates, Boolean algebra, adders, reversibility, classical error correction, complexity classes, and Turing machines — the classical substrate quantum computing extends.',
      '/learn/one-qubit':
        'The qubit as a two-level quantum system: superposition, the Bloch sphere, measurement statistics, and the fundamental single-qubit gates X, Y, Z, H, and phase rotations.',
      '/learn/linear-algebra':
        'Complex numbers, vectors, matrices, inner products, eigenvalues, and tensor products — the mathematical language used throughout quantum computing.',
      '/learn/multiple-qubits':
        'Composite systems, tensor-product Hilbert spaces, multi-qubit gates, Bell states, and partial measurement on subsystems.',
      '/learn/circuits':
        'Quantum circuit model, universal gate sets, circuit depth and width, decomposition strategies, and how algorithms map to gate sequences.',
      '/learn/error-correction':
        'Quantum noise models, the no-cloning theorem, stabilizer codes, surface-code intuition, and the threshold theorem for fault tolerance.',
      '/learn/entanglement':
        'Entanglement measures, separability, Schmidt decomposition, EPR pairs, and why entanglement is a resource rather than a communication channel.',
      '/learn/protocols':
        'Quantum teleportation, superdense coding, Bell/CHSH tests, and BB84 quantum key distribution — protocols that use entanglement and measurement.',
      '/learn/algorithms':
        'Oracle model, Deutsch and Deutsch–Jozsa, Bernstein–Vazirani, Simon, and Grover search — early quantum speedups and query complexity.',
      '/learn/qft':
        'The quantum Fourier transform, phase kickback, QFT circuit construction, and its role as a subroutine in period finding and chemistry simulation.',
      '/learn/phase-estimation':
        'Quantum phase estimation: estimating eigenvalues of unitaries, precision scaling, and connection to Hamiltonian simulation.',
      '/learn/shor':
        "Shor's factoring algorithm — modular exponentiation, period finding via QFT, and implications for public-key cryptography.",
      '/learn/modern':
        'Fault-tolerant roadmaps (2026), NISQ variational algorithms, quantum advantage claims, error-mitigation techniques, and open research frontiers.',
    },
  },
  'zh-TW': {
    title: '學習',
    intro:
      '十三個章節，從古典計算經量子演算法到當代主題循序漸進。每章包含互動元素、詳解範例與實驗場連結。',
    chapterTag: '第 {{n}} 章',
    fallbackDescription: '含概念檢查與實驗的互動章節。',
    nav: {
      home: '← 首頁',
      start: '古典計算 →',
    },
    descriptions: {
      '/learn/classical':
        '位元、二進位算術、邏輯閘、布林代數、加法器、可逆性、古典錯誤校正、複雜度類別與圖靈機——量子計算所延伸的古典基礎。',
      '/learn/one-qubit':
        '量子位元作為二能級量子系統：疊加、Bloch 球面、測量統計與基本單量子位元閘 X、Y、Z、H 及相位旋轉。',
      '/learn/linear-algebra':
        '複數、向量、矩陣、內積、本征值與張量積——量子計算全程使用的數學語言。',
      '/learn/multiple-qubits':
        '複合系統、張量積 Hilbert 空間、多量子位元閘、Bell 態與子系統的部分測量。',
      '/learn/circuits':
        '量子電路模型、通用閘集、電路深度與寬度、分解策略及演算法如何映射為閘序列。',
      '/learn/error-correction':
        '量子噪聲模型、不可克隆定理、穩定子碼、表面碼直覺與容錯的閾值定理。',
      '/learn/entanglement':
        '糾纏度量、可分性、Schmidt 分解、EPR 對，以及糾纏為何是資源而非通訊通道。',
      '/learn/protocols':
        '量子傳態、超密集編碼、Bell/CHSH 測試與 BB84 量子密鑰分配——使用糾纏與測量的協定。',
      '/learn/algorithms':
        '神諭模型、Deutsch 與 Deutsch–Jozsa、Bernstein–Vazirani、Simon 與 Grover 搜尋——早期量子加速與查詢複雜度。',
      '/learn/qft':
        '量子傅立葉變換、相位回踢、QFT 電路構造及其在週期尋找與化學模擬中的子程序角色。',
      '/learn/phase-estimation':
        '量子相位估計：估計酉算子本征值、精度縮放與哈密頓量模擬的連結。',
      '/learn/shor':
        'Shor 因數分解演算法——模指數、透過 QFT 的週期尋找及對公鑰密碼學的影響。',
      '/learn/modern':
        '容錯路線圖（2026）、NISQ 變分演算法、量子優勢宣稱、錯誤缓解技術與開放研究前沿。',
    },
  },
  ja: {
    title: '学習',
    intro:
      '古典計算から量子アルゴリズム、現代トピックまで進む全13章。各章にインタラクティブ要素、詳解例、プレイグラウンドラボへのリンク。',
    chapterTag: '第{{n}}章',
    fallbackDescription: '概念チェックとラボ付きのインタラクティブ章。',
    nav: {
      home: '← ホーム',
      start: '古典計算 →',
    },
    descriptions: {
      '/learn/classical':
        'ビット、二進演算、論理ゲート、ブール代数、加算器、可逆性、古典誤り訂正、計算量クラス、チューリングマシン——量子計算が拡張する古典の基盤。',
      '/learn/one-qubit':
        '二能準量子系統としての量子ビット：重ね合わせ、ブロッホ球、測定統計、基本単一量子ビットゲート X, Y, Z, H と位相回転。',
      '/learn/linear-algebra':
        '複素数、ベクトル、行列、内積、固有値、テンソル積——量子計算全体で使う数学言語。',
      '/learn/multiple-qubits':
        '複合系、テンソル積ヒルベルト空間、多量子ビットゲート、ベル状態、部分系の部分測定。',
      '/learn/circuits':
        '量子回路モデル、汎用ゲート集合、回路深度と幅、分解戦略、アルゴリズムのゲート列への写像。',
      '/learn/error-correction':
        '量子ノイズモデル、ノークローニング定理、安定化符号、表面符号の直感、耐故障の閾値定理。',
      '/learn/entanglement':
        'もつれの尺度、分離可能性、シュミット分解、EPR 対、もつれが通信チャネルではなく資源である理由。',
      '/learn/protocols':
        '量子テレポーテーション、超高密度符号化、Bell/CHSH テスト、BB84 量子鍵配送——もつれと測定を使うプロトコル。',
      '/learn/algorithms':
        'オラクルモデル、ドイチとドイチ・ヨズサ、バーンスタイン・ヴァジラニ、サイモン、グローバー探索——初期の量子加速とクエリ計算量。',
      '/learn/qft':
        '量子フーリエ変換、位相キックバック、QFT 回路構成、周期探索と化学シミュレーションでのサブルーチンとしての役割。',
      '/learn/phase-estimation':
        '量子位相推定：ユニタリの固有値推定、精度スケーリング、ハミルトニアンシミュレーションとの接続。',
      '/learn/shor':
        'ショアの因数分解アルゴリズム——モジュラー指数、QFT による周期探索、公開鍵暗号への含意。',
      '/learn/modern':
        '耐故障ロードマップ（2026）、NISQ 変分アルゴリズム、量子優位主張、エラー緩和技術、未解の研究フロンティア。',
    },
  },
};
