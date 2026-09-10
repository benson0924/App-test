import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '../src/i18n/locales');

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && typeof target[k] === 'object') {
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

function parseExport(path) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/= (\{[\s\S]*\});?\s*$/);
  return Function(`"use strict"; return (${m[1]})`)();
}

function writeExport(path, name, obj) {
  writeFileSync(path, `import type { TranslationTree } from '@/i18n/types';\n\nexport const ${name}: TranslationTree = ${JSON.stringify(obj, null, 2)};\n`);
}

function countKeys(tree) {
  let n = 0;
  for (const v of Object.values(tree)) {
    if (typeof v === 'string') n++;
    else n += countKeys(v);
  }
  return n;
}

const zhTWLabsShared = {
  sequence: '序列 a^x mod N：', period: '週期 r =', factors: '因數：', recovered: '已恢復：', actual: '實際：',
  result: '結果：', error: '錯誤：', fidelity: '保真度', protocolNotes: '協定說明', send: '傳送', runProtocol: '執行協定',
  runExperiment: '執行實驗', runBb84: '執行 BB84', runDeutsch: '執行 Deutsch', runDj: '執行 DJ', recoverSecret: '恢復密鑰',
  queryOracle: '查詢神諭', estimatePhase: '估計相位', runFactoringDemo: '執行因數分解示範', optimalIterations: '最佳迭代次數',
  fromHCnot: '由 H + CNOT 產生', directState: '直接狀態', bellPhiPlus: 'Bell |Φ⁺⟩', productState: '乘積態', noError: '無錯誤',
  qubit: '量子位元 {{n}}', logicalBit: '邏輯位元', errorLocation: '錯誤位置', trials: '試驗次數：', precisionQubits: '精度量子位元：',
  truePhase: '真實相位 φ：{{phi}}（2π 的分數）', baseA: '底數 a', modulusN: '模數 N', randomBaseA: '隨機底數 a：{{a}}',
  inputQubitsN: '輸入量子位元 n：{{n}}', constantOracle: '常數神諭', balancedOracle: '平衡神諭', classification: '分類：',
  measuredInput: '測得的輸入量子位元：', siftedKeyLength: '篩選後密鑰長度：', errorRate: '錯誤率（匹配基）：',
  sifted: '篩選後：', eveIntercepts: 'Eve 竊聽（隨機基）', dragOntoCircuit: '將 {{gate}} 拖曳至電路', rotationTheta: '旋轉 θ：{{deg}}°',
  showOpenQasm: '顯示 OpenQASM', hideOpenQasm: '隱藏 OpenQASM', statevector: '狀態向量 |ψ⟩', probDistribution: '機率分布',
  measurementHistogram: '測量直方圖', measureShots: '測量（1024 次）', chshParameter: 'CHSH 參數 S =',
  violatesClassical: '違反古典上界（|S| > 2）', withinClassical: '在此樣本中位於古典上界內',
  applyGate: '套用 {{gate}}', initialTheta: '初始 θ：{{deg}}°', initialPhi: '初始 φ：{{deg}}°', amp0: '|0⟩ 振幅', amp1: '|1⟩ 振幅',
  polarAngle: 'θ（極角）：{{deg}}°', azimuthal: 'φ（方位角）：{{deg}}°', magnitudeR: '模長 r：{{r}}',
  phasePhi: '相位 φ：{{deg}}°（{{rad}} 弧度）', rectangular: '直角座標：', polar: '極座標：',
  alphaAmp0: 'α（|0⟩ 的振幅）', betaAmp1: 'β（|1⟩ 的振幅）', alphaReal: 'α 實部', alphaImag: 'α 虛部', betaReal: 'β 實部', betaImag: 'β 虛部',
  hint: '提示', hideHint: '隱藏提示', revealStep: '揭示步驟 {{n}}', bitWidth: '位元寬度：{{n}}', carryOut: '進位輸出', sum: '和',
  numberOfBits: '位元數（n）：{{n}}', possibleBitStrings: '{{count}} 種可能的位元字串',
  scrollBrowse: '顯示全部 {{count}} 個字串 — 可捲動瀏覽。',
  selectGateTruth: '選擇閘，然後點擊真值表中的列以設定輸入並查看輸出。',
  rippleCarryDesc: '輸入兩個二進位數，觀察進位位元如何從最低有效位傳播到最高有效位。',
  complexPlaneDesc: '拖動滑桿以在直角座標與極座標中探索複數。',
  qubitStateDesc: '編輯振幅 α 與 β。Ket、列向量、測量機率與 Bloch 座標即時更新。',
  measurementDesc: '設定振幅、選擇測量基，並執行多次測量以建立直方圖。',
  blochDesc: '調整 θ 與 φ，或選擇預設。所有表示保持同步。',
  gateExplorerDesc: '選擇閘並套用到目前狀態。查看矩陣–向量乘法與 Bloch 向量更新。',
  tensorDesc: '探索兩個單量子位元狀態如何組合成雙量子位元乘積態 |ψ⟩ ⊗ |φ⟩。',
  errorCorrectionDesc: '編碼 |0⟩ 或 |1⟩，注入位元翻轉錯誤，讀取症候群並校正。',
  superdenseDesc: '使用一個量子位元與一個共享 ebit 傳送兩個古典位元。',
  bb84Desc: 'BB84 量子密鑰分配模擬。',
  deutschDesc: '一次查詢即可區分單一位元上的常數與平衡函數。',
  djDesc: '以單次查詢區分常數與平衡神諭。',
  bvDesc: '一次查詢找出隱藏字串 s，其中 f(x) = s·x mod 2。',
  simonDesc: '神諭隱藏週期 s：f(x) = f(x ⊕ s)。收集碰撞以恢復 s。',
  qftDesc: '對計算基輸入套用 QFT 並檢視振幅分布。',
  phaseEstDesc: '使用受控-U 迭代估計本征相位。',
  periodDesc: '探索 Shor 演算法中使用的模指數序列。',
  shorDesc: '量子因數分解管線的古典週期尋找示範。',
  markedState: '標記狀態 |{{label}}⟩', iteration: '迭代：{{step}} / {{total}}', probMarked: 'P(標記) =',
  inputLabel: '輸入 |{{label}}⟩', hiddenS: '隱藏 s（十進位）：{{s}}', originalPsi: '原始 |ψ⟩：', bobsQubit: 'Bob 的量子位元：',
  randomize: '隨機化', runAll: '執行', stepLabel: '步驟（{{label}}）',
  oracleConst0: 'f(x)=0', oracleConst1: 'f(x)=1', oracleBalX: 'f(x)=x', oracleBalNotX: 'f(x)=NOT x',
  constant: '常數', balanced: '平衡', idealNoiseless: '|0⟩ → 常數，|1⟩ → 平衡（理想無噪聲情況）。',
  checkSimulation: '（檢查模擬）', oracleIs: '神諭為', binaryEstimate: '二進位估計：', phiEstimate: 'φ 估計：',
  periodRecovered: '已恢復週期 s =', shorFactorDemo: 'Shor 演算法示範（N = 15）',
  entangledCriterion: '對於兩個量子位元，糾纏態滿足 c₀₀·c₁₁ ≠ c₀₁·c₁₀（Schmidt 秩 > 1）。',
  entanglementSchmidt: '對於兩個量子位元，糾纏態滿足 c₀₀·c₁₁ ≠ c₀₁·c₁₀（Schmidt 秩 > 1）。',
  shorPeriodNote: 'Shor 演算法在容錯機器上使用基於 QFT 的相位估計以高效找出此週期。',
  teleportNote1: '校正表：00→I，01→X，10→Z，11→ZX（依慣例而定）。',
  teleportNote2: 'Alice 的狀態被破壞；Bob 需要古典位元才能解碼。',
  teleportNote3: '僅靠糾纏無法超光速傳信。',
  superdenseStep1: 'Alice 與 Bob 之間準備共享 Bell 對 |Φ⁺⟩。',
  superdenseStep2: 'Alice 在其量子位元上編碼古典位元（{{b0}}, {{b1}}）。',
  superdenseStep3: 'Alice 套用 CNOT 與 H，然後將其量子位元傳給 Bob。',
  superdenseStep4: 'Bob 測量兩個量子位元 → |{{outcome}}⟩ → 解碼為（{{d0}}, {{d1}}）。',
  teleportStepBell: '在量子位元 1,2 上透過 H₁ 與 CNOT₁₂ 準備 |Φ⁺⟩。',
  teleportStepAlice: 'Alice 對其量子位元套用 CNOT₀₁ 與 H₀。',
  teleportStepMeasure: 'Alice 測量 →（{{m0}}, {{m1}}）。傳送 2 個古典位元。',
  teleportStepBob: 'Bob 套用 {{z}} 與 {{x}}。',
  teleportStepVerify: '已驗證：F = {{f}}（理想值 1）。',
  teleportRunBell: '在量子位元 1,2 上準備 |Φ⁺⟩。',
  teleportRunAlice: 'Alice 套用 CNOT₀₁ 與 H₀。',
  teleportRunMeasure: 'Alice 測量 →（{{m0}}, {{m1}}）。',
  teleportRunBob: 'Bob 套用 {{z}} 與 {{x}}。',
  teleportRunFidelity: '保真度 F = {{f}}。',
  shorStepFactor: '因數分解 N = {{N}}，選擇 a = {{a}}。',
  shorStepGcd: 'gcd({{a}}, {{N}}) = {{g}} → 以古典方式找到因數。',
  shorStepPeriod: '{{a}}^x mod {{N}} 的週期為 r = {{r}}。',
  shorStepHalf: '{{a}}^{{half}} mod {{N}} = {{val}}。',
  shorStepFactors: '因數：{{p}} × {{q}} = {{N}}。',
  shorStepNoFactors: '此 a 的選擇未產生因數（請嘗試其他底數）。',
  setup: '設定', bellPair: 'Bell 對', aliceGates: 'Alice 閘', measureStep: '測量', bobCorrects: 'Bob 校正', complete: '完成',
  presetBell: 'Bell |Φ⁺⟩', presetGhz: 'GHZ (3)', presetTeleport: '傳態（部分）',
  tableAliceBit: 'Alice 位元', tableAliceBasis: 'Alice 基', tableBobBasis: 'Bob 基', tableBobBit: 'Bob 位元',
  tableX: 'x', tableFx: 'f(x)', tableXor: 'x ⊕ f(x)',
  unaryOutput: '{{gate}}({{a}}) = {{out}}', binaryOutput: '{{gate}}({{a}}, {{b}}) = {{out}}',
  binarySum: '{{a}}₂ + {{b}}₂ = {{sum}}₂（十進位：{{da}} + {{db}} = {{ds}}）',
  twoPowN: '2^{{n}} = {{count}}',
  productStateTest: '乘積態測試：', separable: '可分離（乘積態）', entangled: '糾纏（非乘積態）',
};

const jaLabsShared = {
  sequence: '列 a^x mod N：', period: '周期 r =', factors: '因数：', recovered: '復元：', actual: '実際：',
  result: '結果：', error: '誤差：', fidelity: '忠実度', protocolNotes: 'プロトコル注記', send: '送信', runProtocol: 'プロトコル実行',
  runExperiment: '実験実行', runBb84: 'BB84 実行', runDeutsch: 'ドイチ実行', runDj: 'DJ 実行', recoverSecret: '秘密を復元',
  queryOracle: 'オラクル照会', estimatePhase: '位相推定', runFactoringDemo: '因数分解デモ実行', optimalIterations: '最適反復',
  fromHCnot: 'H + CNOT から', directState: '直接状態', bellPhiPlus: 'ベル |Φ⁺⟩', productState: '積状態', noError: 'エラーなし',
  qubit: '量子ビット {{n}}', logicalBit: '論理ビット', errorLocation: 'エラー位置', trials: '試行回数：', precisionQubits: '精度量子ビット：',
  truePhase: '真の位相 φ：{{phi}}（2π の分数）', baseA: '底 a', modulusN: '法 N', randomBaseA: 'ランダム底 a：{{a}}',
  inputQubitsN: '入力量子ビット n：{{n}}', constantOracle: '定数オラクル', balancedOracle: 'バランスオラクル', classification: '分類：',
  measuredInput: '測定された入力量子ビット：', siftedKeyLength: 'ふるい後鍵長：', errorRate: '誤り率（一致基底）：',
  sifted: 'ふるい後：', eveIntercepts: 'イブが傍受（ランダム基底）', dragOntoCircuit: '{{gate}} を回路にドラッグ', rotationTheta: '回転 θ：{{deg}}°',
  showOpenQasm: 'OpenQASM を表示', hideOpenQasm: 'OpenQASM を隠す', statevector: '状態ベクトル |ψ⟩', probDistribution: '確率分布',
  measurementHistogram: '測定ヒストグラム', measureShots: '測定（1024 ショット）', chshParameter: 'CHSH パラメータ S =',
  violatesClassical: '古典的上界を違反（|S| > 2）', withinClassical: 'このサンプルでは古典的上界内',
  applyGate: '{{gate}} を適用', initialTheta: '初期 θ：{{deg}}°', initialPhi: '初期 φ：{{deg}}°', amp0: '|0⟩ 振幅', amp1: '|1⟩ 振幅',
  polarAngle: 'θ（極角）：{{deg}}°', azimuthal: 'φ（方位角）：{{deg}}°', magnitudeR: '大きさ r：{{r}}',
  phasePhi: '位相 φ：{{deg}}°（{{rad}} ラジアン）', rectangular: '直交座標：', polar: '極座標：',
  alphaAmp0: 'α（|0⟩ の振幅）', betaAmp1: 'β（|1⟩ の振幅）', alphaReal: 'α 実部', alphaImag: 'α 虚部', betaReal: 'β 実部', betaImag: 'β 虚部',
  hint: 'ヒント', hideHint: 'ヒントを隠す', revealStep: 'ステップ {{n}} を表示', bitWidth: 'ビット幅：{{n}}', carryOut: 'キャリー出力', sum: '和',
  numberOfBits: 'ビット数（n）：{{n}}', possibleBitStrings: '{{count}} 種類のビット列',
  scrollBrowse: '全 {{count}} 列を表示 — スクロールして閲覧。',
  selectGateTruth: 'ゲートを選び、真理値表の行をクリックして入力を設定し出力を確認。',
  rippleCarryDesc: '2 つの二進数を入力し、キャリービットが最下位から最上位へ伝播する様子を観察。',
  complexPlaneDesc: 'スライダーで直交座標と極座標の複素数を探索。',
  qubitStateDesc: '振幅 α と β を編集。ケット、列ベクトル、測定確率、ブロッホ座標がリアルタイム更新。',
  measurementDesc: '振幅を設定し測定基底を選び、複数ショットでヒストグラムを構築。',
  blochDesc: 'θ と φ を調整するかプリセットを選択。すべての表現が同期。',
  gateExplorerDesc: 'ゲートを選び現在の状態に適用。行列–ベクトル積とブロッホベクトルの更新を確認。',
  tensorDesc: '2 つの単一量子ビット状態が積状態 |ψ⟩ ⊗ |φ⟩ にどう結合するか探索。',
  errorCorrectionDesc: '|0⟩ または |1⟩ を符号化し、ビットフリップエラーを注入、シンドロームを読み取り訂正。',
  superdenseDesc: '1 量子ビットと 1 共有 ebit で 2 古典ビットを送信。',
  bb84Desc: 'BB84 量子鍵配送シミュレーション。',
  deutschDesc: '1 回の照会で 1 ビットの定数関数とバランス関数を区別。',
  djDesc: '1 回の照会で定数とバランスのオラクルを区別。',
  bvDesc: 'f(x) = s·x mod 2 の隠れ文字列 s を 1 回で見つける。',
  simonDesc: 'オラクルは周期 s を隠す：f(x) = f(x ⊕ s)。衝突を集めて s を復元。',
  qftDesc: '計算基底入力に QFT を適用し振幅の広がりを確認。',
  phaseEstDesc: '制御-U 反復で固有位相を推定。',
  periodDesc: 'ショアアルゴリズムで使う合同累乗列を探索。',
  shorDesc: '量子因数分解パイプラインの古典周期探索デモ。',
  markedState: 'マーク状態 |{{label}}⟩', iteration: '反復：{{step}} / {{total}}', probMarked: 'P(マーク) =',
  inputLabel: '入力 |{{label}}⟩', hiddenS: '隠れ s（十進）：{{s}}', originalPsi: '元の |ψ⟩：', bobsQubit: 'Bob の量子ビット：',
  randomize: 'ランダム化', runAll: '実行', stepLabel: 'ステップ（{{label}}）',
  oracleConst0: 'f(x)=0', oracleConst1: 'f(x)=1', oracleBalX: 'f(x)=x', oracleBalNotX: 'f(x)=NOT x',
  constant: '定数', balanced: 'バランス', idealNoiseless: '|0⟩ → 定数、|1⟩ → バランス（理想ノイズなし）。',
  checkSimulation: '（シミュレーションを確認）', oracleIs: 'オラクルは', binaryEstimate: '二進推定：', phiEstimate: 'φ 推定：',
  periodRecovered: '復元された周期 s =', shorFactorDemo: 'ショアアルゴリズムデモ（N = 15）',
  entangledCriterion: '2 量子ビットでは、もつれ状態は c₀₀·c₁₁ ≠ c₀₁·c₁₀（シュミットランク > 1）を満たす。',
  entanglementSchmidt: '2 量子ビットでは、もつれ状態は c₀₀·c₁₁ ≠ c₀₁·c₁₀（シュミットランク > 1）を満たす。',
  shorPeriodNote: 'ショアアルゴリズムは耐故障マシン上で QFT ベースの位相推定によりこの周期を効率的に見つける。',
  teleportNote1: '訂正表：00→I、01→X、10→Z、11→ZX（慣例による）。',
  teleportNote2: 'Alice の状態は破壊される；Bob は古典ビットが必要。',
  teleportNote3: 'もつれだけでは超光速通信はできない。',
  superdenseStep1: 'Alice と Bob の間で共有ベル対 |Φ⁺⟩ を準備。',
  superdenseStep2: 'Alice が自分の量子ビットに古典ビット（{{b0}}, {{b1}}）を符号化。',
  superdenseStep3: 'Alice が CNOT と H を適用し、量子ビットを Bob に送る。',
  superdenseStep4: 'Bob が両量子ビットを測定 → |{{outcome}}⟩ →（{{d0}}, {{d1}}）に復号。',
  teleportStepBell: '量子ビット 1,2 で H₁ と CNOT₁₂ により |Φ⁺⟩ を準備。',
  teleportStepAlice: 'Alice が CNOT₀₁ と H₀ を適用。',
  teleportStepMeasure: 'Alice が測定 →（{{m0}}, {{m1}}）。2 古典ビットを送信。',
  teleportStepBob: 'Bob が {{z}} と {{x}} を適用。',
  teleportStepVerify: '検証済み：F = {{f}}（理想値 1）。',
  teleportRunBell: '量子ビット 1,2 で |Φ⁺⟩ を準備。',
  teleportRunAlice: 'Alice が CNOT₀₁ と H₀ を適用。',
  teleportRunMeasure: 'Alice が測定 →（{{m0}}, {{m1}}）。',
  teleportRunBob: 'Bob が {{z}} と {{x}} を適用。',
  teleportRunFidelity: '忠実度 F = {{f}}。',
  shorStepFactor: 'N = {{N}} を因数分解、 a = {{a}} を選択。',
  shorStepGcd: 'gcd({{a}}, {{N}}) = {{g}} → 古典的に因数発見。',
  shorStepPeriod: '{{a}}^x mod {{N}} の周期は r = {{r}}。',
  shorStepHalf: '{{a}}^{{half}} mod {{N}} = {{val}}。',
  shorStepFactors: '因数：{{p}} × {{q}} = {{N}}。',
  shorStepNoFactors: 'この a では因数が得られなかった（別の底を試す）。',
  setup: 'セットアップ', bellPair: 'ベル対', aliceGates: 'Alice ゲート', measureStep: '測定', bobCorrects: 'Bob 訂正', complete: '完了',
  presetBell: 'ベル |Φ⁺⟩', presetGhz: 'GHZ (3)', presetTeleport: 'テレポ（一部）',
  tableAliceBit: 'Alice ビット', tableAliceBasis: 'Alice 基底', tableBobBasis: 'Bob 基底', tableBobBit: 'Bob ビット',
  tableX: 'x', tableFx: 'f(x)', tableXor: 'x ⊕ f(x)',
  unaryOutput: '{{gate}}({{a}}) = {{out}}', binaryOutput: '{{gate}}({{a}}, {{b}}) = {{out}}',
  binarySum: '{{a}}₂ + {{b}}₂ = {{sum}}₂（十進：{{da}} + {{db}} = {{ds}}）',
  twoPowN: '2^{{n}} = {{count}}',
  productStateTest: '積状態テスト：', separable: '分離可能（積状態）', entangled: 'もつれ（積状態ではない）',
};

const zhTWPracticeProblems = {
  'cl-dec': { question: '將十進位 {{x}} 轉為 4 位元二進位。', hint: '反覆除以 2，自下而上讀取餘數。', step1: '反覆將 {{x}} 除以 2 取得餘數。', step2: '補足至 4 位元。', solution: '{{x}}₁₀ = {{bin}}₂。' },
  'cl-add': { question: '二進位加法：{{a}} + {{b}} = ?', hint: '使用漣波進位：XOR 得和位元，AND 得進位。', step1: '從右至左逐位相加並處理進位。', step2: '結果', solution: '{{a}} + {{b}} = {{sum}}（二進位）。' },
  '1q-prob': { question: '若 |ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩（已歸一化），P(0) 是多少？', hint: 'Born 規則：機率為振幅模長的平方。', step1: '從狀態中識別 α。', step2: '計算 |α|²。', solution: 'P(0) = |α|² = {{p0}}。' },
  '1q-gate': { question: '{{gate}} 將 |0⟩ 映射到哪個狀態？', hint: '將閘矩陣套用到 |0⟩。', step1: '寫出 {{gate}}|0⟩。', step2: '使用該閘的標準矩陣。', solution: '{{gate}}|0⟩ → {{target}}。' },
  '1q-bloch': { question: 'Bloch 球上的量子位元 θ = {{deg}}°。z = cos θ 是多少？', hint: 'Bloch 向量 (x, y, z)，其中 z = cos θ。', step1: '在 Bloch 球上使用 z = cos θ。', step2: '計算。', solution: 'z = cos({{theta}}) ≈ {{z}}。' },
  '1q-hh': { question: 'H² 對任意單量子位元狀態有何作用？', hint: 'H 在全局相位下為自身逆；H² = I。', step1: '回想 H² = I。', step2: '因此連續套用 H 兩次會回到原狀態。', solution: 'H² = I，故 H 為對合。' },
  'la-unitary': { question: '哪個條件定義酉矩陣 U？', hint: '酉算子保持內積。', step1: '酉算子保持范數。', step2: '矩陣條件', solution: 'U†U = I（等价於 UU† = I）。' },
  'la-hermitian': { question: 'Pauli Z 為 Hermitian。它在 |1⟩ 上的本征值是多少？', hint: 'Z = diag(1, −1)。', step1: '在計算基下寫出 Z。', step2: '套用到 |1⟩。', solution: '在 |1⟩ 上本征值為 −1。' },
  'la-tensor': { question: 'n 個量子位元的 Hilbert 空間維度是多少？', hint: '每增加一個量子位元，維度乘以 2。', step1: 'n 個 ℂ² 的張量積。', step2: '維度', solution: '2ⁿ 維複向量空間。' },
  'la-inner': { question: '|0⟩ 與 |1⟩ 是否正交？', hint: '計算 ⟨0|1⟩。', step1: '基態的內積。', step2: '⟨0|1⟩ = 0', solution: '是 — 計算基為正規正交。' },
  'mq-cnot': { question: 'CNOT|10⟩ 產生什麼？', hint: '控制為第一個量子位元（1）；控制為 1 時翻轉目標。', step1: '控制 = 1，目標 = 0。', step2: '翻轉目標 → |11⟩。', solution: 'CNOT|10⟩ = |11⟩。' },
  'mq-swap': { question: '標準 SWAP 分解需要多少個 CNOT 閘？', hint: 'SWAP = CNOT ·（中間量子位元 CNOT）· CNOT 模式。', step1: '標準電路：CNOT₁₂ · CNOT₂₁ · CNOT₁₂。', step2: '三個 CNOT 即可。', solution: '3 個 CNOT 閘。' },
  'mq-phi': { question: '在 Z 基測量 |Φ⁺⟩ 的兩個量子位元：P(00)？', hint: '僅 |00⟩ 與 |11⟩ 有非零振幅，權重相等。', step1: '振幅：( |00⟩ + |11⟩)/√2。', step2: 'P(00) = |1/√2|² = 1/2。', solution: 'P(00) = 1/2。' },
  'pr-bb84': { question: 'BB84 需要經認證的古典通道嗎？', hint: '基篩選與竊聽者偵測使用古典通信。', step1: '量子態承載密鑰材料。', step2: '古典後處理比較基並估計錯誤率。', solution: '是 — 需要經認證的古典通道。' },
  'pr-chsh': { question: 'CHSH 參數 S 的古典（LHV）上界？', hint: 'Tsirelson 上界為 2√2（量子）；古典為 2。', step1: 'CHSH：S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′)。', step2: '古典 |S| ≤ 2。', solution: '古典上 |S| ≤ 2。' },
  'pr-tele': { question: '量子傳態是否僅用 2 個古典位元加共享糾纏來傳送量子態？', hint: '非超光速；2 古典位元 + 1 ebit。', step1: 'Alice 在 Bell 基測量 → 2 古典位元。', step2: 'Bob 依位元套用校正。', solution: '是 — 2 古典位元 + 1 共享 Bell 對。' },
  'pr-sd': { question: '超密集編碼用 1 量子位元 + 1 ebit 可傳送多少古典位元？', hint: '透過對共享 Bell 態的四種 Pauli 操作編碼 00、01、10、11。', step1: 'Alice 在其 Bell 對一半上以 Pauli 編碼 2 位元。', step2: 'Bob 進行 Bell 測量 → 恢復 2 位元。', solution: '2 個古典位元。' },
  'alg-dj': { question: 'Deutsch–Jozsa：區分 n 位元常數與平衡函數需要幾次查詢？', hint: '量子演算法只需一次神諭查詢。', step1: '準備均勻疊加、套用神諭、測量。', step2: '單次查詢即可。', solution: '1 次查詢（量子）對比古典最壞情況 2ⁿ⁻¹ + 1。' },
  'alg-shor': { question: "Shor 演算法因數分解 N 時，尋找 a^x mod N 的什麼性質？", hint: '階 r 滿足 a^r ≡ 1 (mod N)。', step1: '選擇與 N 互質的隨機 a。', step2: '找出 f(x) = a^x mod N 的週期 r。', solution: '模指數的週期（階）r。' },
  'alg-deutsch': { question: 'Deutsch 演算法（1 位元）：判定 f 是否為常數最多需要幾次古典查詢？', hint: '最壞情況：查 f(0) 仍不明，需查 f(1)。', step1: '古典上一次查詢仍剩兩個一致函數。', step2: '最壞情況需要第二次查詢。', solution: '古典 2 次查詢對比量子 1 次。' },
};

const jaPracticeProblems = {
  'cl-dec': { question: '十進 {{x}} を 4 ビット二進に変換。', hint: '2 で割り続け、下から余りを読む。', step1: '{{x}} を 2 で割り続けて余りを得る。', step2: '4 ビットにパディング。', solution: '{{x}}₁₀ = {{bin}}₂。' },
  'cl-add': { question: '二進加算：{{a}} + {{b}} = ?', hint: 'リップルキャリー：XOR で和ビット、AND でキャリー。', step1: '右からビットごとにキャリー付きで加算。', step2: '結果', solution: '{{a}} + {{b}} = {{sum}}（二進）。' },
  '1q-prob': { question: '|ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩（正規化）のとき P(0) は？', hint: 'ボーンの規則：確率は振幅の二乗の大きさ。', step1: '状態から α を特定。', step2: '|α|² を計算。', solution: 'P(0) = |α|² = {{p0}}。' },
  '1q-gate': { question: '{{gate}} は |0⟩ をどの状態に写すか？', hint: 'ゲート行列を |0⟩ に適用。', step1: '{{gate}}|0⟩ を書く。', step2: 'ゲートの標準行列を使う。', solution: '{{gate}}|0⟩ → {{target}}。' },
  '1q-bloch': { question: 'ブロッホ球上の量子ビットで θ = {{deg}}°。z = cos θ は？', hint: 'ブロッホベクトル (x, y, z)、z = cos θ。', step1: 'ブロッホ球で z = cos θ を使う。', step2: '評価。', solution: 'z = cos({{theta}}) ≈ {{z}}。' },
  '1q-hh': { question: 'H² は任意の単一量子ビット状態に何をするか？', hint: 'H は大域位相を除き自身の逆；H² = I。', step1: 'H² = I を思い出す。', step2: 'H を 2 回適用すると元の状態に戻る。', solution: 'H² = I、よって H は対合。' },
  'la-unitary': { question: 'ユニタリ行列 U を定義する条件は？', hint: 'ユニタリは内積を保存。', step1: 'ユニタリ演算子はノルムを保存。', step2: '行列条件', solution: 'U†U = I（UU† = I と同値）。' },
  'la-hermitian': { question: 'パウリ Z はエルミート。|1⟩ の固有値は？', hint: 'Z = diag(1, −1)。', step1: '計算基底で Z を書く。', step2: '|1⟩ に適用。', solution: '|1⟩ の固有値は −1。' },
  'la-tensor': { question: 'n 量子ビットのヒルベルト空間の次元は？', hint: '量子ビットごとに因子 2 が増える。', step1: 'n 個の ℂ² のテンソル積。', step2: '次元', solution: '2ⁿ 次元の複ベクトル空間。' },
  'la-inner': { question: '|0⟩ と |1⟩ は直交するか？', hint: '⟨0|1⟩ を計算。', step1: '基底状態の内積。', step2: '⟨0|1⟩ = 0', solution: 'はい — 計算基底は正規直交。' },
  'mq-cnot': { question: 'CNOT|10⟩ は何を生成するか？', hint: '制御は第 1 量子ビット（1）；制御が 1 のときターゲットを反転。', step1: '制御 = 1、ターゲット = 0。', step2: 'ターゲット反転 → |11⟩。', solution: 'CNOT|10⟩ = |11⟩。' },
  'mq-swap': { question: '標準 SWAP 分解の CNOT ゲート数は？', hint: 'SWAP = CNOT ·（中間量子ビット CNOT）· CNOT パターン。', step1: '標準回路：CNOT₁₂ · CNOT₂₁ · CNOT₁₂。', step2: '3 つの CNOT で十分。', solution: '3 個の CNOT ゲート。' },
  'mq-phi': { question: '|Φ⁺⟩ の両量子ビットを Z 基底で測定：P(00)？', hint: '|00⟩ と |11⟩ のみ非零振幅、等しい重み。', step1: '振幅：( |00⟩ + |11⟩)/√2。', step2: 'P(00) = |1/√2|² = 1/2。', solution: 'P(00) = 1/2。' },
  'pr-bb84': { question: 'BB84 は認証済み古典チャネルが必要か？', hint: '基底ふるいと盗聴検出は古典通信を使う。', step1: '量子状態が鍵材料を運ぶ。', step2: '古典後処理で基底を比較し誤り率を推定。', solution: 'はい — 認証済み古典チャネルが必要。' },
  'pr-chsh': { question: 'CHSH パラメータ S の古典（LHV）上界は？', hint: 'ツィレルソン上界は 2√2（量子）；古典は 2。', step1: 'CHSH：S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′)。', step2: '古典 |S| ≤ 2。', solution: '古典では |S| ≤ 2。' },
  'pr-tele': { question: '量子テレポーテーションは 2 古典ビットと共有もつれだけで量子状態を送るか？', hint: '超光速ではない；2 古典ビット + 1 ebit。', step1: 'Alice がベル基底で測定 → 2 古典ビット。', step2: 'Bob がビットに基づき訂正を適用。', solution: 'はい — 2 古典ビット + 1 共有ベル対。' },
  'pr-sd': { question: '超高密度符号化は 1 量子ビット + 1 ebit で何古典ビット送れるか？', hint: '共有ベル状態への 4 つのパウリ操作で 00,01,10,11 を符号化。', step1: 'Alice がベル対の半分にパウリで 2 ビットを符号化。', step2: 'Bob がベル測定 → 2 ビット復元。', solution: '2 古典ビット。' },
  'alg-dj': { question: 'ドイチ・ヨズサ：n ビットの定数とバランスを区別する照会数は？', hint: '量子アルゴリズムは 1 回のオラクル照会で十分。', step1: '一様重ね合わせを準備、オラクル適用、測定。', step2: '1 回の照会で十分。', solution: '1 回（量子）対 古典最悪 2ⁿ⁻¹ + 1。' },
  'alg-shor': { question: 'ショアアルゴリズムは N を因数分解する際 a^x mod N の何を見つけるか？', hint: 'a^r ≡ 1 (mod N) を満たす位数 r。', step1: 'N と互素のランダム a を選ぶ。', step2: 'f(x) = a^x mod N の周期 r を見つける。', solution: '合同累乗の周期（位数）r。' },
  'alg-deutsch': { question: 'ドイチ（1 ビット）：f が定数かどうかの最大古典照会数は？', hint: '最悪：f(0) を照会しても不明、f(1) が必要。', step1: '古典では 1 回の照会で 2 関数が残る。', step2: '最悪で 2 回目が必要。', solution: '古典 2 回対 量子 1 回。' },
};

const zhTWRefGates = {
  Y: { name: 'Pauli Y', action: 'Y|0⟩ = i|1⟩，Y|1⟩ = −i|0⟩', bloch: '繞 y 軸旋轉 π', inverse: 'Y† = Y (Y² = I)' },
  Z: { name: 'Pauli Z', action: '相位翻轉：Z|0⟩ = |0⟩，Z|1⟩ = −|1⟩', bloch: '繞 z 軸旋轉 π', inverse: 'Z† = Z (Z² = I)' },
  S: { name: '相位（S 閘）', action: 'S|0⟩ = |0⟩，S|1⟩ = i|1⟩', bloch: '繞 z 軸旋轉 π/2', inverse: 'S† = S³ = ZS (S² = Z)' },
  T: { name: 'π/8 閘', action: 'T|0⟩ = |0⟩，T|1⟩ = e^{iπ/4}|1⟩', bloch: '繞 z 軸旋轉 π/4', inverse: 'T† = T⁷ (T² = S, T⁴ = Z)' },
  Rx: { name: '繞 x 旋轉', action: 'R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩', bloch: '繞 x 軸旋轉 θ', inverse: 'R_x(θ)† = R_x(−θ)' },
  Ry: { name: '繞 y 旋轉', action: 'R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩', bloch: '繞 y 軸旋轉 θ', inverse: 'R_y(θ)† = R_y(−θ)' },
  Rz: { name: '繞 z 旋轉', action: 'R_z(θ)|0⟩ = e^{−iθ/2}|0⟩，R_z(θ)|1⟩ = e^{iθ/2}|1⟩', bloch: '繞 z 軸旋轉 θ（|0⟩ 上的全局相位）', inverse: 'R_z(θ)† = R_z(−θ)' },
  CZ: { name: '受控 Z', action: 'CZ|11⟩ = −|11⟩；其他不變 — 兩者為 1 時加 π 相位', bloch: '產生糾纏的相位閘；CZ = (I⊗H) CNOT (I⊗H)', inverse: 'CZ† = CZ (CZ² = I)' },
  SWAP: { name: '交換', action: 'SWAP|a,b⟩ = |b,a⟩', bloch: '交換量子位元狀態；3 個 CNOT 分解', inverse: 'SWAP† = SWAP (SWAP² = I)' },
  Toffoli: { name: 'CCNOT（Toffoli）', action: '當兩個控制皆為 |1⟩ 時翻轉目標', bloch: '通用古典邏輯；可逆 AND', inverse: 'Toffoli† = Toffoli（自逆）' },
  singleQubit: '單量子位元閘', twoQubit: '雙量子位元閘', threeQubit: '三量子位元閘', commonIdentities: '常用恆等式', pauliRelations: 'Pauli 群關係', universalSets: '通用閘集',
  colSymbol: '符號', colMatrix: '矩陣', colAction: '作用', colBloch: 'Bloch', colInverse: '逆',
  universalEstablished1: '已建立：{H, S, T, CNOT} 是容錯計算常用的通用閘集（T 閘在容錯架構中需要魔法態蒸馏）。',
  universalEstablished2: '已建立：{Rx, Ry, Rz, CNOT} 在 NISQ 裝置上可用於近似編譯，為通用集。',
};

const jaRefGates = {
  Y: { name: 'パウリ Y', action: 'Y|0⟩ = i|1⟩、Y|1⟩ = −i|0⟩', bloch: 'y 軸まわりに π 回転', inverse: 'Y† = Y (Y² = I)' },
  Z: { name: 'パウリ Z', action: '位相反転：Z|0⟩ = |0⟩、Z|1⟩ = −|1⟩', bloch: 'z 軸まわりに π 回転', inverse: 'Z† = Z (Z² = I)' },
  S: { name: '位相（S ゲート）', action: 'S|0⟩ = |0⟩、S|1⟩ = i|1⟩', bloch: 'z 軸まわりに π/2 回転', inverse: 'S† = S³ = ZS (S² = Z)' },
  T: { name: 'π/8 ゲート', action: 'T|0⟩ = |0⟩、T|1⟩ = e^{iπ/4}|1⟩', bloch: 'z 軸まわりに π/4 回転', inverse: 'T† = T⁷ (T² = S, T⁴ = Z)' },
  Rx: { name: 'x 軸回転', action: 'R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩', bloch: 'x 軸まわりに θ 回転', inverse: 'R_x(θ)† = R_x(−θ)' },
  Ry: { name: 'y 軸回転', action: 'R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩', bloch: 'y 軸まわりに θ 回転', inverse: 'R_y(θ)† = R_y(−θ)' },
  Rz: { name: 'z 軸回転', action: 'R_z(θ)|0⟩ = e^{−iθ/2}|0⟩、R_z(θ)|1⟩ = e^{iθ/2}|1⟩', bloch: 'z 軸まわりに θ 回転（|0⟩ の大域位相）', inverse: 'R_z(θ)† = R_z(−θ)' },
  CZ: { name: '制御 Z', action: 'CZ|11⟩ = −|11⟩；他は不変 — 両方 1 のとき π 位相', bloch: 'もつれ位相ゲート；CZ = (I⊗H) CNOT (I⊗H)', inverse: 'CZ† = CZ (CZ² = I)' },
  SWAP: { name: 'スワップ', action: 'SWAP|a,b⟩ = |b,a⟩', bloch: '量子ビット状態を交換；3 CNOT 分解', inverse: 'SWAP† = SWAP (SWAP² = I)' },
  Toffoli: { name: 'CCNOT（トフォリ）', action: '両制御が |1⟩ のときターゲットを反転', bloch: '汎用古典論理；可逆 AND', inverse: 'Toffoli† = Toffoli（自己逆）' },
  singleQubit: '単一量子ビットゲート', twoQubit: '2 量子ビットゲート', threeQubit: '3 量子ビットゲート', commonIdentities: 'よく使う恒等式', pauliRelations: 'パウリ群の関係', universalSets: '汎用ゲート集合',
  colSymbol: '記号', colMatrix: '行列', colAction: '作用', colBloch: 'ブロッホ', colInverse: '逆',
  universalEstablished1: '確立：{H, S, T, CNOT} は耐故障計算で一般的な汎用集合（T ゲートは FT では魔法状態蒸留が必要）。',
  universalEstablished2: '確立：{Rx, Ry, Rz, CNOT} は NISQ デバイスでの近似合成に汎用。',
};

const zhTWRefComplexity = {
  tableTitle: '演算法比較表', colAlgorithm: '演算法', colProblem: '問題', colClassical: '古典', colQuantum: '量子', colNotes: '備註',
  bqpTitle: 'BQP 定義', bqpIntro: 'BQP（有界誤差量子多項式時間）是以誤差概率至多 1/3 で多項式時間量子電路族可解的決策問題類。',
  bqpContainments: '已知包含關係：每個古典多項式時間演算法都是量子演算法（古典為子集），且量子模擬不超過 PSPACE。',
  cautionTitle: '注意：BQP 與 NP', cautionIntro: 'NP ⊆ BQP 是否成立尚未知。量子電腦並非已知能高效解所有 NP 完全問題。Shor 演算法適用於週期尋找／因數分解，而非一般 NP 搜尋。',
  cautionGrover: 'Grover 對無結構搜尋僅提供二次加速 — 非指數級。',
  cautionPromise: 'Deutsch–Jozsa 與 Bernstein–Vazirani 的分离針對具有結構神諭的承諾問題。',
  cautionSampling: '隨機電路採樣對特定任務展示量子行為難以古典模擬 — 非通用 NP 加速。',
  queryVsTime: '查詢複雜度 vs 時間複雜度', queryVsTimeBody: '查詢複雜度計數神諭呼叫（Deutsch、Grover）。時間複雜度包含實現神諭與算術的電路大小（Shor）。少量查詢可能隱藏大量古典預處理或昂貴神諭。',
  faultTolerance: '容錯需求', faultToleranceBody: 'Shor 因數分解與大規模相位估計需要錯誤率低於閾值的容錯邏輯量子位元。無校正的 NISQ 裝置無法執行密碼學相關的 Shor 實例 — 複雜度敘述假設理想容錯模型。',
  checkpointQ: 'Grover 演算法是否證明 BQP 包含 NP？', checkpointHint: 'Grover 為二次加速，非指數；NP 與 BQP 關係仍開放。',
  rows: {
    deutsch: { algorithm: 'Deutsch', problem: 'f:{0,1}→{0,1} 是常數還是平衡？', classical: '2 次查詢（最壞）', quantum: '1 次查詢', notes: '首次分离；平衡 = 至少一個輸入上輸出不同' },
    deutschJozsa: { algorithm: 'Deutsch–Jozsa', problem: '常數 vs 平衡 f:{0,1}ⁿ→{0,1}', classical: '2ⁿ⁻¹ + 1 次查詢（最壞）', quantum: '1 次查詢', notes: '指數級查詢分离；不實用（承諾問題）' },
    bernsteinVazirani: { algorithm: 'Bernstein–Vazirani', problem: '找出隱藏字串 s，f(x) = s·x mod 2', classical: 'n 次查詢', quantum: '1 次查詢', notes: '線性查詢分离；推廣 Deutsch–Jozsa' },
    grover: { algorithm: 'Grover', problem: '在 N 個項目中無結構搜尋', classical: 'O(N) 次查詢', quantum: 'O(√N) 次查詢', notes: '二次加速；無結構搜尋最優' },
    shor: { algorithm: 'Shor', problem: '分解 N 位元整數', classical: '次指數（GNFS）；無已知多項式時間', quantum: '多項式時間（容錯模型）', notes: '需要 QFT + 相位估計；密碼規模下非 NISQ 可行' },
    simon: { algorithm: 'Simon', problem: '找出 f(x)=f(x⊕s) 的隱藏週期', classical: 'O(2ⁿ/²) 次查詢', quantum: 'O(n) 次查詢', notes: '指數級分离；Shor 的前身' },
    stateSimulation: { algorithm: '狀態模擬', problem: '模擬 n 量子位元通用電路', classical: 'O(2ⁿ) 記憶體／時間', quantum: '物理實現 — 無法高效輸出完整 2ⁿ 向量', notes: 'Clifford 電路可古典 O(n²) 模擬（Gottesman–Knill）' },
  },
};

const jaRefComplexity = {
  tableTitle: 'アルゴリズム比較表', colAlgorithm: 'アルゴリズム', colProblem: '問題', colClassical: '古典', colQuantum: '量子', colNotes: '注記',
  bqpTitle: 'BQP の定義', bqpIntro: 'BQP（有界誤差量子多項式時間）は誤差確率最大 1/3 で一様な多項式時間量子回路族が解ける決定問題のクラス。',
  bqpContainments: '既知の包含：古典多項式時間は量子の部分集合、量子シミュレーションは PSPACE を超えない。',
  cautionTitle: '注意：BQP と NP', cautionIntro: 'NP ⊆ BQP かは未解。量子コンピュータがすべての NP 完全問題を効率的に解けるとは知られていない。ショアは周期探索／因数分解に適用され、一般 NP 探索ではない。',
  cautionGrover: 'グローバーは非構造探索で二次加速のみ — 指数ではない。',
  cautionPromise: 'ドイチ・ヨズサとバーンスタイン・ヴァジラニの優位は構造化オラクルの約束問題に対するもの。',
  cautionSampling: 'ランダム回路サンプリングは特定タスクで古典シミュレーションが困難な量子振る舞いを示す — 普遍的 NP 加速ではない。',
  queryVsTime: 'クエリ計算量 vs 時間計算量', queryVsTimeBody: 'クエリ計算量はオラクル呼び出し（ドイチ、グローバー）。時間計算量はオラクルと演算の回路サイズを含む（ショア）。少ないクエリは大きな古典前処理や高コストオラクルを隠すことがある。',
  faultTolerance: '耐故障要件', faultToleranceBody: 'ショアの因数分解と大規模位相推定は閾値以下のエラー率の耐故障論理量子ビットが必要。訂正なし NISQ では暗号学的に relevant なショアは実行不能 — 計算量の記述は理想耐故障モデルを仮定。',
  checkpointQ: 'グローバーアルゴリズムは BQP が NP を含むことを証明するか？', checkpointHint: 'グローバーは二次であり指数ではない；NP と BQP は未解。',
  rows: {
    deutsch: { algorithm: 'ドイチ', problem: 'f:{0,1}→{0,1} は定数かバランスか？', classical: '2 照会（最悪）', quantum: '1 照会', notes: '最初の優位；バランス = 少なくとも一入力で出力が異なる' },
    deutschJozsa: { algorithm: 'ドイチ・ヨズサ', problem: '定数 vs バランス f:{0,1}ⁿ→{0,1}', classical: '2ⁿ⁻¹ + 1 照会（最悪）', quantum: '1 照会', notes: '指数的クエリ優位；実用外（約束問題）' },
    bernsteinVazirani: { algorithm: 'バーンスタイン・ヴァジラニ', problem: '隠れ文字列 s を見つける、f(x) = s·x mod 2', classical: 'n 照会', quantum: '1 照会', notes: '線形クエリ優位；ドイチ・ヨズサの一般化' },
    grover: { algorithm: 'グローバー', problem: 'N 項目の非構造探索', classical: 'O(N) 照会', quantum: 'O(√N) 照会', notes: '二次加速；非構造探索で最適' },
    shor: { algorithm: 'ショア', problem: 'N ビット整数の因数分解', classical: '準指数（GNFS）；多項式時間は未知', quantum: '多項式時間（耐故障モデル）', notes: 'QFT + 位相推定が必要；暗号スケールでは NISQ 非現実的' },
    simon: { algorithm: 'サイモン', problem: 'f(x)=f(x⊕s) の隠れ周期を見つける', classical: 'O(2ⁿ/²) 照会', quantum: 'O(n) 照会', notes: '指数的優位；ショアの前身' },
    stateSimulation: { algorithm: '状態シミュレーション', problem: 'n 量子ビット汎用回路のシミュレーション', classical: 'O(2ⁿ) メモリ／時間', quantum: '物理実装 — 完全 2ⁿ ベクトル出力は非効率', notes: 'クリフォード回路は古典 O(n²)（ゴッテスマン–ニル）' },
  },
};

const zhTWRefFormulas = {
  singleQubit: '單量子位元狀態', measurement: '測量', linearAlgebra: '線性代數', multiQubit: '多量子位元與張量積',
  bell: 'Bell 態', singleGates: '單量子位元閘', multiGates: '多量子位元閘', entanglementChsh: '糾纏與 CHSH',
  qft: '量子傅立葉變換', grover: 'Grover 演算法', shor: 'Shor 演算法', phaseEst: '相位估計',
  errorCorrection: '錯誤校正', noise: '噪聲與退相干', complexity: '複雜度類', classical: '古典計算（第一部）',
};

const jaRefFormulas = {
  singleQubit: '単一量子ビット状態', measurement: '測定', linearAlgebra: '線形代数', multiQubit: '多量子ビットとテンソル積',
  bell: 'ベル状態', singleGates: '単一量子ビットゲート', multiGates: '多量子ビットゲート', entanglementChsh: 'もつれと CHSH',
  qft: '量子フーリエ変換', grover: 'グローバーアルゴリズム', shor: 'ショアアルゴリズム', phaseEst: '位相推定',
  errorCorrection: '誤り訂正', noise: 'ノイズとデコヒーレンス', complexity: '計算量クラス', classical: '古典計算（第 I 部）',
};

const zhTWPracticeChoices = {
  yes: '是', no: '否', period: '週期', minimum: '最小值', maximum: '最大值', parityOnly: '僅奇偶性',
  identity: '恆等（返回原狀態）', bitFlip: '位元翻轉', phaseFlip: '相位翻轉', projectZero: '投影到 |0⟩',
  unitary: 'U†U = I', hermitian: 'U = U†', detZero: 'det(U) = 0', real: 'U 為實矩陣',
};

const jaPracticeChoices = {
  yes: 'はい', no: 'いいえ', period: '周期', minimum: '最小値', maximum: '最大値', parityOnly: 'パリティのみ',
  identity: '恒等（状態を返す）', bitFlip: 'ビット反転', phaseFlip: '位相反転', projectZero: '|0⟩ に射影',
  unitary: 'U†U = I', hermitian: 'U = U†', detZero: 'det(U) = 0', real: 'U は実数',
};

for (const [locale, labsShared, practiceProblems, refGates, refComplexity, refFormulas, practiceChoices] of [
  ['zh-TW', zhTWLabsShared, zhTWPracticeProblems, zhTWRefGates, zhTWRefComplexity, zhTWRefFormulas, zhTWPracticeChoices],
  ['ja', jaLabsShared, jaPracticeProblems, jaRefGates, jaRefComplexity, jaRefFormulas, jaPracticeChoices],
]) {
  const labs = parseExport(join(base, locale, 'labs.ts'));
  deepMerge(labs.shared, labsShared);
  writeExport(join(base, locale, 'labs.ts'), 'labs', labs);

  const practice = parseExport(join(base, locale, 'practice.ts'));
  deepMerge(practice.problems, practiceProblems);
  deepMerge(practice.choices, practiceChoices);
  writeExport(join(base, locale, 'practice.ts'), 'practice', practice);

  const reference = parseExport(join(base, locale, 'reference.ts'));
  deepMerge(reference.gates, refGates);
  deepMerge(reference.complexity, refComplexity);
  deepMerge(reference.formulas, refFormulas);
  writeExport(join(base, locale, 'reference.ts'), 'reference', reference);
}

const summary = {};
for (const locale of ['en', 'zh-TW', 'ja']) {
  summary[locale] = {};
  for (const name of ['labs', 'reference', 'practice', 'playground']) {
    summary[locale][name] = countKeys(parseExport(join(base, locale, `${name}.ts`)));
  }
}
console.log(JSON.stringify(summary, null, 2));
