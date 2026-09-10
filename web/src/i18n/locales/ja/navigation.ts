import type { TranslationTree } from '@/i18n/types';

export const navigation: TranslationTree = {
  learnNav: {
    classical: '古典計算',
    oneQubit: '1量子ビット',
    linearAlgebra: '線形代数',
    multipleQubits: '複数量子ビット',
    circuits: '量子回路',
    errorCorrection: '量子誤り訂正',
    entanglement: '量子もつれ',
    protocols: '量子プロトコル',
    algorithms: '量子アルゴリズム',
    qft: '量子フーリエ変換',
    phaseEstimation: '位相推定',
    shor: 'Shor のアルゴリズム',
    modern: '現代トピック（2026）',
  },
  labChapters: {
    classical: '古典計算',
    oneQubit: '1量子ビット',
    linearAlgebra: '線形代数',
    multipleQubits: '複数量子ビット',
    qec: '量子誤り訂正',
    protocols: 'プロトコル',
    algorithms: 'アルゴリズム',
    shor: 'Shor',
  },
  labs: {
    'binary-states': '二進状態エクスプローラ',
    'logic-gates': '論理ゲートシミュレータ',
    'binary-adder': '二進加算器',
    'complex-plane': '複素数エクスプローラ',
    'qubit-state': '単一量子ビット状態エクスプローラ',
    measurement: '測定シミュレータ',
    'bloch-sphere': '3D ブロッホ球',
    'gate-explorer': '量子ゲートエクスプローラ',
    'unitary-checker': '行列・ユニタリ検証器',
    'tensor-product': 'テンソル積計算器',
    'bell-states': 'ベル状態ジェネレータ',
    entanglement: 'もつれ測定',
    'error-correction': '誤り訂正シミュレータ',
    chsh: 'ベル/CHSH 実験',
    superdense: '超高密度符号化',
    teleportation: '量子テレポーテーション',
    bb84: 'BB84 シミュレータ',
    deutsch: 'Deutsch アルゴリズム',
    'deutsch-jozsa': 'Deutsch–Jozsa',
    'bernstein-vazirani': 'Bernstein–Vazirani',
    simon: 'Simon のアルゴリズム',
    grover: 'Grover 探索',
    qft: 'QFT ビジュアライザ',
    'phase-estimation': '位相推定',
    'period-finding': '周期エクスプローラ',
    shor: 'Shor アルゴリズムデモ',
  },
  glossary: {
    amplitude: {
      term: '振幅',
      definition: '量子基底状態に付随する複素係数。',
    },
    ancilla: {
      term: 'アンシラ量子ビット',
      definition: '計算中に一時的に使用する追加の量子ビット。',
    },
    basis: {
      term: '基底',
      definition: '状態を表現するために用いる正規直交ベクトルの集合。',
    },
    bit: {
      term: 'ビット',
      definition: '古典の二状態情報単位。',
    },
    blochSphere: {
      term: 'ブロッホ球',
      definition: '純粋な単一量子ビット状態の幾何学的表現。',
    },
    bqp: {
      term: 'BQP',
      definition: '有界誤差量子計算機で効率的に解ける決定問題の計算量クラス。',
    },
    circuitDepth: {
      term: '回路深度',
      definition: '回路に必要な逐次操作層の数。',
    },
    cnot: {
      term: 'CNOT',
      definition: '制御 X ゲート（Controlled-X gate）。',
    },
    decoherence: {
      term: 'デコヒーレンス',
      definition: '環境との相互作用により量子コヒーレンスが失われる現象。',
    },
    entanglement: {
      term: '量子もつれ',
      definition: '各サブシステムの状態の積として表せない量子相関。',
    },
    gate: {
      term: 'ゲート',
      definition: '古典ビットまたは量子状態に適用する操作。',
    },
    globalPhase: {
      term: '大域位相',
      definition: '観測可能な予測を変えない全体の複素位相。',
    },
    hadamardGate: {
      term: 'アダマールゲート',
      definition: 'Z 基底と X 基底を変換する単一量子ビットゲート。',
    },
    hilbertSpace: {
      term: 'ヒルベルト空間',
      definition: '量子状態が表現される複ベクトル空間。',
    },
    ket: {
      term: 'ケット',
      definition: '状態ベクトルを表すディラック記法 |ψ⟩。',
    },
    measurement: {
      term: '測定',
      definition: '量子確率に従って古典的な結果を生じる過程。',
    },
    oracle: {
      term: 'オラクル',
      definition: 'アルゴリズムが問い合わせる関数を表すブラックボックス操作。',
    },
    phase: {
      term: '位相',
      definition: '複素振幅の角度成分。',
    },
    qubit: {
      term: '量子ビット',
      definition: '二準位の基本的な量子情報単位。',
    },
    superposition: {
      term: '重ね合わせ',
      definition: '基底状態の線形結合。',
    },
    tensorProduct: {
      term: 'テンソル積',
      definition: '量子系を結合するための数学的操作。',
    },
    unitary: {
      term: 'ユニタリ',
      definition: 'ノルムを保つ可逆な線形操作。',
    },
  },
  misconceptions: {
    q0: {
      myth: '量子ビットは無限の古典情報を読み取れる形で保存する。',
      correction: '純粋な量子ビットの数学的記述には連続的な振幅が必要だが、単一の測定ではそれらの振幅は明らかにならない。',
    },
    q1: {
      myth: '重ね合わせはすべての可能な答えを同時に調べられることを意味する。',
      correction: '量子アルゴリズムは振幅を操作し、干渉によって有用な出力の確率を高める。',
    },
    q2: {
      myth: '測定は量子ビットが密かに持っていた値をただ明らかにする。',
      correction: 'その古典的解釈では、一般に量子測定の統計を再現できない。',
    },
    q3: {
      myth: '量子もつれは光速を超えてメッセージを送る。',
      correction: 'もつれは相関を生むが、実用的な通信は依然として無信号原理に従う。',
    },
    q4: {
      myth: '量子テレポーテーションは物質を移動する。',
      correction: '共有されたもつれと古典通信を用いて量子状態を転送する。',
    },
    q5: {
      myth: '量子コンピュータは古典コンピュータに取って代わる。',
      correction: '量子プロセッサは専用システムであり、通常は古典コンピュータと協調して動作する。',
    },
    q6: {
      myth: 'Grover 探索はデータベースのすべての項目を瞬時に検索する。',
      correction: 'Grover は二次のクエリ優位性を与える：O(N) → O(√N)。',
    },
    q7: {
      myth: 'Shor のアルゴリズムはすべての暗号システムを無効にする。',
      correction: 'Shor は RSA などのシステムの下にある数学構造を狙う。他の暗号方式は異なる仮定に基づく。',
    },
  },
};
