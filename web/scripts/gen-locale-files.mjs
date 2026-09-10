import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, '../src/i18n/locales');

function countKeys(tree, prefix = '') {
  let n = 0;
  for (const [k, v] of Object.entries(tree)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') n++;
    else n += countKeys(v, p);
  }
  return n;
}

function emit(locale, name, obj) {
  const dir = join(base, locale);
  mkdirSync(dir, { recursive: true });
  const body = `import type { TranslationTree } from '@/i18n/types';\n\nexport const ${name}: TranslationTree = ${JSON.stringify(obj, null, 2)};\n`;
  writeFileSync(join(dir, `${name}.ts`), body);
}

// --- ENGLISH ---
const enLabs = {
  shared: {
    stateColumn: '|ψ⟩',
    amplitude: 'Amplitude',
    probSquared: '|amp|²',
    real: 'Real',
    imaginary: 'Imaginary',
    before: 'Before',
    after: 'After',
    reset: 'Reset',
    measure: 'Measure',
    run: 'Run',
    step: 'Step',
    clear: 'Clear',
    prev: '← Prev',
    next: 'Next →',
    qubits: 'Qubits',
    depth: 'Depth',
    gates: 'Gates',
    presets: 'Presets',
    position: 'Position',
    decimal: 'decimal',
    component: 'Component',
    value: 'Value',
    columnVector: 'Column vector',
    normalized: '(normalized)',
    scaleToNormalize: 'Scale by {{scale}} to normalize',
    theoreticalProbabilities: 'Theoretical probabilities:',
    shots: '{{n}} shots',
    empiricalFrequencies: 'Empirical frequencies from {{n}} measurement{{plural}}.',
    productStateTest: 'Product state test:',
    separable: 'Separable (product state)',
    entangled: 'Entangled (not a product state)',
    syndrome: 'Syndrome (Z₀Z₁, Z₁Z₂):',
    encoded: 'Encoded',
    afterError: 'After error',
    afterCorrection: 'After correction',
    applied: 'Applied:',
    blochVector: 'Bloch vector:',
    inputAmplitudes: 'Input amplitudes',
    afterQft: 'After QFT',
    sequence: 'Sequence a^x mod N:',
    period: 'Period r =',
    factors: 'Factors:',
    recovered: 'Recovered:',
    actual: 'actual:',
    result: 'Result:',
    error: 'Error:',
    fidelity: 'Fidelity',
    protocolNotes: 'Protocol notes',
    send: 'Send',
    runProtocol: 'Run protocol',
    runExperiment: 'Run experiment',
    runBb84: 'Run BB84',
    runDeutsch: 'Run Deutsch',
    runDj: 'Run DJ',
    recoverSecret: 'Recover secret',
    queryOracle: 'Query oracle',
    estimatePhase: 'Estimate phase',
    runFactoringDemo: 'Run factoring demo',
    optimalIterations: 'Optimal iterations',
    fromHCnot: 'From H + CNOT',
    directState: 'Direct state',
    bellPhiPlus: 'Bell |Φ⁺⟩',
    productState: 'Product state',
    noError: 'No error',
    qubit: 'Qubit {{n}}',
    logicalBit: 'Logical bit',
    errorLocation: 'Error location',
    trials: 'Trials:',
    precisionQubits: 'Precision qubits:',
    truePhase: 'True phase φ: {{phi}} (fraction of 2π)',
    baseA: 'Base a',
    modulusN: 'Modulus N',
    randomBaseA: 'Random base a: {{a}}',
    inputQubitsN: 'Input qubits n: {{n}}',
    constantOracle: 'Constant oracle',
    balancedOracle: 'Balanced oracle',
    classification: 'Classification:',
    measuredInput: 'Measured input qubit:',
    siftedKeyLength: 'Sifted key length:',
    errorRate: 'Error rate (matching bases):',
    sifted: 'Sifted:',
    eveIntercepts: 'Eve intercepts (random basis)',
    dragOntoCircuit: 'Drag {{gate}} onto circuit',
    rotationTheta: 'Rotation θ: {{deg}}°',
    showOpenQasm: 'Show OpenQASM',
    hideOpenQasm: 'Hide OpenQASM',
    statevector: 'Statevector |ψ⟩',
    probDistribution: 'Probability distribution',
    measurementHistogram: 'Measurement histogram',
    measureShots: 'Measure (1024 shots)',
    isUnitary: '✓ This matrix is unitary.',
    notUnitary: '✗ Not unitary (unexpected for standard gates).',
    selectGateUnitary: 'Select a single-qubit gate to inspect its matrix and verify unitarity (U†U = I).',
    chshParameter: 'CHSH parameter S =',
    violatesClassical: 'Violates classical bound (|S| > 2)',
    withinClassical: 'Within classical bound for this sample',
    applyGate: 'Apply {{gate}}',
    initialTheta: 'Initial θ: {{deg}}°',
    initialPhi: 'Initial φ: {{deg}}°',
    amp0: '|0⟩ amp',
    amp1: '|1⟩ amp',
    polarAngle: 'θ (polar angle): {{deg}}°',
    azimuthal: 'φ (azimuthal): {{deg}}°',
    magnitudeR: 'Magnitude r: {{r}}',
    phasePhi: 'Phase φ: {{deg}}° ({{rad}} rad)',
    rectangular: 'Rectangular:',
    polar: 'Polar:',
    alphaAmp0: 'α (amplitude for |0⟩)',
    betaAmp1: 'β (amplitude for |1⟩)',
    zeroVectorError: 'State must be non-zero to normalize.',
    measurementBasis: 'Measurement basis',
    basisZ: 'Computational (Z) — |0⟩, |1⟩',
    basisX: 'X — |+⟩, |−⟩',
    basisY: 'Y — |i⟩, |−i⟩',
    alphaReal: 'α real',
    alphaImag: 'α imag',
    betaReal: 'β real',
    betaImag: 'β imag',
    hint: 'Hint',
    hideHint: 'Hide hint',
    revealStep: 'Reveal step {{n}}',
    bitWidth: 'Bit width: {{n}}',
    carryOut: 'Carry out',
    sum: 'Sum',
    numberOfBits: 'Number of bits (n): {{n}}',
    possibleBitStrings: '{{count}} possible bit strings',
    scrollBrowse: 'Showing all {{count}} strings — scroll to browse.',
    classicalRegister: 'A classical register with n bits can represent 2^n distinct states.',
    selectGateTruth: 'Select a gate, then click a row in the truth table to set inputs and see the output.',
    rippleCarryDesc: 'Enter two binary numbers and watch how carry bits propagate from least to most significant bit.',
    complexPlaneDesc: 'Drag the sliders to explore a complex number in rectangular and polar form.',
    qubitStateDesc: 'Edit amplitudes α and β. The ket, column vector, measurement probabilities, and Bloch coordinates update live.',
    measurementDesc: 'Set amplitudes, choose a measurement basis, and run repeated shots to build a histogram.',
    blochDesc: 'Adjust θ and φ, or pick a preset. All representations stay synchronized.',
    gateExplorerDesc: 'Choose a gate and apply it to the current state. See matrix–vector multiplication and the Bloch vector update.',
    tensorDesc: 'Explore how two single-qubit states combine into a two-qubit product state |ψ⟩ ⊗ |φ⟩.',
    errorCorrectionDesc: 'Encode |0⟩ or |1⟩, inject a bit-flip error, read syndrome, and correct.',
    chshDesc: 'Simulate correlations for a singlet-like source. Classical bound |S| ≤ 2; quantum mechanics can reach |S| ≈ 2√2.',
    superdenseDesc: 'Send two classical bits using one qubit and one shared ebit.',
    teleportDesc: 'Transfer unknown |ψ⟩ using shared entanglement + 2 classical bits. Qubit 0 = message, 1 = Alice, 2 = Bob.',
    bb84Desc: 'BB84 quantum key distribution simulation.',
    deutschDesc: 'One query distinguishes constant from balanced functions on one bit.',
    djDesc: 'Distinguish constant vs balanced oracle with a single query.',
    bvDesc: 'Find hidden string s where f(x) = s·x mod 2 in one query.',
    simonDesc: 'Oracle hides period s: f(x) = f(x ⊕ s). Collect collisions to recover s.',
    groverDesc: 'Watch amplitude amplification on a marked computational basis state.',
    qftDesc: 'Apply QFT to a computational basis input and inspect amplitude spread.',
    phaseEstDesc: 'Estimate an eigenphase using controlled-U iterations.',
    periodDesc: 'Explore modular exponentiation sequences used in Shor\'s algorithm.',
    shorDesc: 'Classical period-finding demo of the quantum factoring pipeline.',
    markedState: 'Marked state |{{label}}⟩',
    iteration: 'Iteration: {{step}} / {{total}}',
    probMarked: 'P(marked) =',
    inputLabel: 'Input |{{label}}⟩',
    hiddenS: 'Hidden s (decimal): {{s}}',
    originalPsi: 'Original |ψ⟩:',
    bobsQubit: 'Bob\'s qubit:',
    randomize: 'Randomize',
    runAll: 'Run',
    stepLabel: 'Step ({{label}})',
    oracleConst0: 'f(x)=0',
    oracleConst1: 'f(x)=1',
    oracleBalX: 'f(x)=x',
    oracleBalNotX: 'f(x)=NOT x',
    constant: 'Constant',
    balanced: 'Balanced',
    idealNoiseless: '|0⟩ → constant, |1⟩ → balanced (ideal noiseless case).',
    checkSimulation: '(check simulation)',
    oracleIs: 'oracle is',
    binaryEstimate: 'Binary estimate:',
    phiEstimate: 'φ estimate:',
    periodRecovered: 'Recovered period s =',
    shorFactorDemo: 'Shor\'s Algorithm Demo (N = 15)',
    entangledCriterion: 'For two qubits, entangled states satisfy c₀₀·c₁₁ ≠ c₀₁·c₁₀ (Schmidt rank > 1).',
    shorPeriodNote: 'Shor\'s algorithm uses QFT-based phase estimation to find this period efficiently on a fault-tolerant machine.',
    teleportNote1: 'Correction table: 00→I, 01→X, 10→Z, 11→ZX (convention-dependent).',
    teleportNote2: 'Alice\'s state is destroyed; Bob needs classical bits before decoding.',
    teleportNote3: 'Entanglement alone cannot signal faster than light.',
    superdenseStep1: 'Shared Bell pair |Φ⁺⟩ prepared between Alice and Bob.',
    superdenseStep2: 'Alice encodes classical bits ({{b0}}, {{b1}}) on her qubit.',
    superdenseStep3: 'Alice applies CNOT and H, then sends her qubit to Bob.',
    superdenseStep4: 'Bob measures both qubits → |{{outcome}}⟩ → decoded ({{d0}}, {{d1}}).',
    teleportStepBell: 'Prepare |Φ⁺⟩ on qubits 1,2 via H₁ and CNOT₁₂.',
    teleportStepAlice: 'Alice applies CNOT₀₁ and H₀ to her qubits.',
    teleportStepMeasure: 'Alice measures → ({{m0}}, {{m1}}). Sends 2 classical bits.',
    teleportStepBob: 'Bob applies {{z}} and {{x}}.',
    teleportStepVerify: 'Verified: F = {{f}} (ideal 1).',
    teleportRunBell: 'Prepare |Φ⁺⟩ on qubits 1,2.',
    teleportRunAlice: 'Alice applies CNOT₀₁ and H₀.',
    teleportRunMeasure: 'Alice measures → ({{m0}}, {{m1}}).',
    teleportRunBob: 'Bob applies {{z}} and {{x}}.',
    teleportRunFidelity: 'Fidelity F = {{f}}.',
    shorStepFactor: 'Factor N = {{N}}, choose a = {{a}}.',
    shorStepGcd: 'gcd({{a}}, {{N}}) = {{g}} → factor found classically.',
    shorStepPeriod: 'Period of {{a}}^x mod {{N}} is r = {{r}}.',
    shorStepHalf: '{{a}}^{{half}} mod {{N}} = {{val}}.',
    shorStepFactors: 'Factors: {{p}} × {{q}} = {{N}}.',
    shorStepNoFactors: 'This choice of a did not yield factors (try another base).',
    setup: 'Setup',
    bellPair: 'Bell pair',
    aliceGates: 'Alice gates',
    measureStep: 'Measure',
    bobCorrects: 'Bob corrects',
    complete: 'Complete',
    presetBell: 'Bell |Φ⁺⟩',
    presetGhz: 'GHZ (3)',
    presetTeleport: 'Teleport (partial)',
    tableAliceBit: 'Alice bit',
    tableAliceBasis: 'Alice basis',
    tableBobBasis: 'Bob basis',
    tableBobBit: 'Bob bit',
    tableX: 'x',
    tableFx: 'f(x)',
    tableXor: 'x ⊕ f(x)',
    unaryOutput: '{{gate}}({{a}}) = {{out}}',
    binaryOutput: '{{gate}}({{a}}, {{b}}) = {{out}}',
    binarySum: '{{a}}₂ + {{b}}₂ = {{sum}}₂ (decimal: {{da}} + {{db}} = {{ds}})',
    twoPowN: '2^{{n}} = {{count}}',
    entanglementSchmidt: 'For two qubits, entangled states satisfy c₀₀·c₁₁ ≠ c₀₁·c₁₀ (Schmidt rank > 1).',
  },
  'binary-states': { title: 'Binary State Explorer' },
  'logic-gates': { title: 'Logic Gate Simulator' },
  'binary-adder': { title: 'Binary Adder (Ripple Carry)' },
  'complex-plane': { title: 'Complex Number Explorer' },
  'qubit-state': { title: 'Single-Qubit State Explorer' },
  measurement: { title: 'Measurement Simulator' },
  'bloch-sphere': { title: '3D Bloch Sphere' },
  'gate-explorer': { title: 'Quantum Gate Explorer' },
  'unitary-checker': { title: 'Matrix & Unitary Checker' },
  'tensor-product': { title: 'Tensor Product Calculator' },
  'bell-states': { title: 'Bell State Generator' },
  entanglement: { title: 'Entanglement Measurement' },
  'error-correction': { title: '3-Qubit Bit-Flip Code' },
  chsh: { title: 'CHSH Bell Test' },
  superdense: { title: 'Superdense Coding' },
  teleportation: { title: 'Quantum Teleportation' },
  bb84: { title: 'BB84 Key Distribution' },
  deutsch: { title: 'Deutsch Algorithm' },
  'deutsch-jozsa': { title: 'Deutsch–Jozsa' },
  'bernstein-vazirani': { title: 'Bernstein–Vazirani' },
  simon: { title: "Simon's Algorithm (Demo)" },
  grover: { title: 'Grover Search' },
  qft: { title: 'Quantum Fourier Transform' },
  'phase-estimation': { title: 'Quantum Phase Estimation' },
  'period-finding': { title: 'Period Finding (mod N)' },
  shor: { title: "Shor's Algorithm Demo (N = 15)" },
};

const enReference = {
  index: {
    title: 'Reference',
    gates: { title: 'Gate Reference', desc: 'Single- and multi-qubit gate matrices.' },
    formulas: { title: 'Formula Sheet', desc: 'Key equations across chapters.' },
    complexity: { title: 'Complexity', desc: 'Classical vs quantum query/time bounds.' },
    glossary: { title: 'Glossary', desc: 'Terminology from navigation data.' },
    misconceptions: { title: 'Misconceptions', desc: 'Common myths and corrections.' },
  },
  gates: {
    title: 'Gate Reference',
    intro: 'Complete gate tables with symbols, matrices (from quantum-core), actions, Bloch-sphere interpretation, and inverses.',
    singleQubit: 'Single-qubit gates',
    twoQubit: 'Two-qubit gates',
    threeQubit: 'Three-qubit gates',
    commonIdentities: 'Common identities',
    pauliRelations: 'Pauli group relations',
    universalSets: 'Universal gate sets',
    colSymbol: 'Symbol',
    colMatrix: 'Matrix',
    colAction: 'Action',
    colBloch: 'Bloch',
    colInverse: 'Inverse',
    universalEstablished1: 'Established: {H, S, T, CNOT} is a common universal set for fault-tolerant computation (T gate requires magic-state distillation in FT architectures).',
    universalEstablished2: 'Established: {Rx, Ry, Rz, CNOT} is universal for approximate compilation on NISQ devices.',
    I: { name: 'Identity', action: 'I|0⟩ = |0⟩, I|1⟩ = |1⟩ — no change', bloch: 'Identity rotation: no movement on Bloch sphere', inverse: 'I† = I' },
    X: { name: 'Pauli X (NOT)', action: 'Bit flip: X|0⟩ = |1⟩, X|1⟩ = |0⟩', bloch: 'Rotation by π about x-axis: |0⟩ ↔ |1⟩', inverse: 'X† = X (X² = I)' },
    Y: { name: 'Pauli Y', action: 'Y|0⟩ = i|1⟩, Y|1⟩ = −i|0⟩', bloch: 'Rotation by π about y-axis', inverse: 'Y† = Y (Y² = I)' },
    Z: { name: 'Pauli Z', action: 'Phase flip: Z|0⟩ = |0⟩, Z|1⟩ = −|1⟩', bloch: 'Rotation by π about z-axis', inverse: 'Z† = Z (Z² = I)' },
    H: { name: 'Hadamard', action: 'H|0⟩ = |+⟩, H|1⟩ = |−⟩', bloch: 'π rotation about (x+z)/√2 axis; maps z ↔ x', inverse: 'H† = H (H² = I)' },
    S: { name: 'Phase (S gate)', action: 'S|0⟩ = |0⟩, S|1⟩ = i|1⟩', bloch: 'Rotation by π/2 about z-axis', inverse: 'S† = S³ = ZS (S² = Z)' },
    T: { name: 'π/8 gate', action: 'T|0⟩ = |0⟩, T|1⟩ = e^{iπ/4}|1⟩', bloch: 'Rotation by π/4 about z-axis', inverse: 'T† = T⁷ (T² = S, T⁴ = Z)' },
    Rx: { name: 'Rotation about x', action: 'R_x(θ)|0⟩ = cos(θ/2)|0⟩ − i sin(θ/2)|1⟩', bloch: 'Rotation by θ about x-axis', inverse: 'R_x(θ)† = R_x(−θ)' },
    Ry: { name: 'Rotation about y', action: 'R_y(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩', bloch: 'Rotation by θ about y-axis', inverse: 'R_y(θ)† = R_y(−θ)' },
    Rz: { name: 'Rotation about z', action: 'R_z(θ)|0⟩ = e^{−iθ/2}|0⟩, R_z(θ)|1⟩ = e^{iθ/2}|1⟩', bloch: 'Rotation by θ about z-axis (global phase on |0⟩)', inverse: 'R_z(θ)† = R_z(−θ)' },
    CNOT: { name: 'Controlled-NOT', action: 'CNOT|a,b⟩ = |a, b⊕a⟩ — flips target if control is 1', bloch: 'Entangling; not a single-qubit Bloch rotation', inverse: 'CNOT† = CNOT (CNOT² = I on target)' },
    CZ: { name: 'Controlled-Z', action: 'CZ|11⟩ = −|11⟩; others unchanged — adds π phase when both 1', bloch: 'Entangling phase gate; CZ = (I⊗H) CNOT (I⊗H)', inverse: 'CZ† = CZ (CZ² = I)' },
    SWAP: { name: 'Swap', action: 'SWAP|a,b⟩ = |b,a⟩', bloch: 'Exchanges qubit states; 3 CNOT decomposition', inverse: 'SWAP† = SWAP (SWAP² = I)' },
    Toffoli: { name: 'CCNOT (Toffoli)', action: 'Flips target iff both controls are |1⟩', bloch: 'Universal classical logic; reversible AND', inverse: 'Toffoli† = Toffoli (self-inverse)' },
  },
  formulas: {
    title: 'Formula Sheet',
    intro: 'Quick reference aligned with textbook notation. Research cutoff: September 2026.',
    singleQubit: 'Single-qubit states',
    measurement: 'Measurement',
    linearAlgebra: 'Linear algebra',
    multiQubit: 'Multi-qubit & tensor products',
    bell: 'Bell states',
    singleGates: 'Single-qubit gates',
    multiGates: 'Multi-qubit gates',
    entanglementChsh: 'Entanglement & CHSH',
    qft: 'Quantum Fourier Transform',
    grover: "Grover's algorithm",
    shor: "Shor's algorithm",
    phaseEst: 'Phase estimation',
    errorCorrection: 'Error correction',
    noise: 'Noise & decoherence',
    complexity: 'Complexity classes',
    classical: 'Classical computing (Part I)',
  },
  complexity: {
    title: 'Complexity Reference',
    intro: 'Query and time complexity comparisons for foundational quantum algorithms. Constants hidden; fault-tolerant model assumed unless noted.',
    tableTitle: 'Algorithm comparison table',
    colAlgorithm: 'Algorithm',
    colProblem: 'Problem',
    colClassical: 'Classical',
    colQuantum: 'Quantum',
    colNotes: 'Notes',
    bqpTitle: 'BQP definition',
    bqpIntro: 'BQP (Bounded-error Quantum Polynomial time) is the class of decision problems solvable by a uniform family of quantum circuits in polynomial time with error probability at most 1/3.',
    bqpContainments: 'Known containments: every classical polynomial-time algorithm is a quantum algorithm (ignore classical as subset), and quantum simulation does not exceed PSPACE.',
    cautionTitle: 'Caution: BQP and NP',
    cautionIntro: 'It is unknown whether NP ⊆ BQP. Quantum computers are not known to solve all NP-complete problems efficiently. Shor\'s algorithm applies to period finding / factoring, not generic NP search.',
    cautionGrover: 'Grover gives only quadratic speedup for unstructured search — not exponential.',
    cautionPromise: 'Deutsch–Jozsa and Bernstein–Vazirani separations are for promise problems with structured oracles.',
    cautionSampling: 'Random circuit sampling demonstrates quantum behavior hard to simulate classically for specific tasks — not universal NP speedup.',
    queryVsTime: 'Query complexity vs time complexity',
    queryVsTimeBody: 'Query complexity counts oracle calls (Deutsch, Grover). Time complexity includes circuit size for implementing oracles and arithmetic (Shor). A small query count can hide large classical preprocessing or expensive oracles.',
    faultTolerance: 'Fault tolerance requirement',
    faultToleranceBody: 'Shor\'s factoring and large-scale phase estimation require fault-tolerant logical qubits with error rates below threshold. NISQ devices without correction cannot run cryptographically relevant Shor instances — complexity statements assume the ideal fault-tolerant model.',
    checkpointQ: "Does Grover's algorithm prove BQP contains NP?",
    checkpointHint: 'Grover is quadratic, not exponential; NP vs BQP is open.',
    rows: {
      deutsch: { algorithm: 'Deutsch', problem: 'Is f:{0,1}→{0,1} constant or balanced?', classical: '2 queries (worst case)', quantum: '1 query', notes: 'First separation; balanced = outputs differ on at least one input' },
      deutschJozsa: { algorithm: 'Deutsch–Jozsa', problem: 'Constant vs balanced f:{0,1}ⁿ→{0,1}', classical: '2ⁿ⁻¹ + 1 queries (worst)', quantum: '1 query', notes: 'Exponential query separation; not practical (promise problem)' },
      bernsteinVazirani: { algorithm: 'Bernstein–Vazirani', problem: 'Find hidden string s where f(x) = s·x mod 2', classical: 'n queries', quantum: '1 query', notes: 'Linear query separation; generalizes Deutsch–Jozsa' },
      grover: { algorithm: 'Grover', problem: 'Unstructured search over N items', classical: 'O(N) queries', quantum: 'O(√N) queries', notes: 'Quadratic speedup; optimal for unstructured search' },
      shor: { algorithm: 'Shor', problem: 'Factor N-bit integer', classical: 'Subexp (GNFS); no known poly-time', quantum: 'Poly(n) time (fault-tolerant model)', notes: 'Requires QFT + phase estimation; not NISQ-feasible at crypt scale' },
      simon: { algorithm: 'Simon', problem: 'Find hidden period of f with f(x)=f(x⊕s)', classical: 'O(2ⁿ/²) queries', quantum: 'O(n) queries', notes: 'Exponential separation; precursor to Shor' },
      stateSimulation: { algorithm: 'State simulation', problem: 'Simulate n-qubit generic circuit', classical: 'O(2ⁿ) memory/time', quantum: 'Physical — not efficient to output full 2ⁿ vector', notes: 'Clifford circuits simulate in O(n²) classically (Gottesman–Knill)' },
    },
  },
};

const enPractice = {
  ui: {
    title: 'Practice Hub',
    intro: 'Randomized problems with hints, step-by-step reveals, and full solutions. Answers verified with quantum-core where applicable.',
    mixed: 'Mixed',
    score: 'Score:',
    newRandomSet: 'New random set',
    shuffleNewSet: 'Shuffle new set',
    questionOf: 'Question {{current}} of {{total}}',
    verified: '✓ verified',
    check: '⚠ check',
    hint: 'Hint',
    hideHint: 'Hide hint',
    revealStep: 'Reveal step {{n}}',
    step: 'Step {{n}}',
    correct: 'Correct!',
    incorrect: 'Incorrect.',
    fullSolution: 'Full solution',
    finish: 'Finish',
    next: 'Next',
  },
  categories: {
    classical: 'Classical',
    oneQubit: 'One Qubit',
    linearAlgebra: 'Linear Algebra',
    multiQubit: 'Multi-qubit',
    protocols: 'Protocols',
    algorithms: 'Algorithms',
  },
  problems: {
    'cl-xor': { question: 'What is {{a}} XOR {{b}}?', hint: 'XOR is 1 when inputs differ.', step1: 'XOR returns 1 if exactly one input is 1.', step2: 'Inputs: a={{a}}, b={{b}}.', solution: '{{a}} ⊕ {{b}} = {{xor}}.' },
    'cl-bin': { question: 'Convert binary {{bits}} to decimal.', hint: 'Sum powers of two where the bit is 1.', step1: 'Read bits from right to left as 2⁰, 2¹, 2², …', step2: 'Evaluate {{bits}} in base 2.', solution: '{{bits}}₂ = {{dec}}₁₀.' },
    'cl-dec': { question: 'Convert decimal {{x}} to 4-bit binary.', hint: 'Repeatedly divide by 2 and read remainders bottom-up.', step1: 'Divide {{x}} by 2 repeatedly to get remainders.', step2: 'Pad to 4 bits.', solution: '{{x}}₁₀ = {{bin}}₂.' },
    'cl-add': { question: 'Binary add: {{a}} + {{b}} = ?', hint: 'Use ripple-carry: XOR for sum bit, AND for carry.', step1: 'Add bit-by-bit from right with carry.', step2: 'Result', solution: '{{a}} + {{b}} = {{sum}} (binary).' },
    '1q-prob': { question: 'If |ψ⟩ = {{alpha}}|0⟩ + {{beta}}|1⟩ (normalized), what is P(0)?', hint: 'Born rule: probability is squared magnitude of amplitude.', step1: 'Identify α from the state.', step2: 'Compute |α|².', solution: 'P(0) = |α|² = {{p0}}.' },
    '1q-gate': { question: 'Which state does {{gate}} map |0⟩ to?', hint: 'Apply the gate matrix to |0⟩.', step1: 'Write {{gate}}|0⟩.', step2: 'Use the standard matrix for the gate.', solution: '{{gate}}|0⟩ → {{target}}.' },
    '1q-bloch': { question: 'A qubit on the Bloch sphere has θ = {{deg}}°. What is z = cos θ?', hint: 'Bloch vector: (x, y, z) with z = cos θ.', step1: 'Use z = cos θ on the Bloch sphere.', step2: 'Evaluate.', solution: 'z = cos({{theta}}) ≈ {{z}}.' },
    '1q-hh': { question: 'What does H² do to any single-qubit state?', hint: 'H is its own inverse up to global phase; H² = I.', step1: 'Recall H² = I.', step2: 'So applying H twice returns the original state.', solution: 'H² = I, so H is an involution.' },
    'la-unitary': { question: 'Which condition defines a unitary matrix U?', hint: 'Unitary preserves inner products.', step1: 'Unitary operators preserve norm.', step2: 'Matrix condition', solution: 'U†U = I (equivalently UU† = I).' },
    'la-hermitian': { question: 'Pauli Z is Hermitian. What is its eigenvalue on |1⟩?', hint: 'Z = diag(1, −1).', step1: 'Write Z in the computational basis.', step2: 'Apply to |1⟩.', solution: 'Eigenvalue −1 on |1⟩.' },
    'la-tensor': { question: 'What is the dimension of the Hilbert space for n qubits?', hint: 'Each qubit adds a factor of 2.', step1: 'Tensor product of n copies of ℂ².', step2: 'Dimension', solution: '2ⁿ-dimensional complex vector space.' },
    'la-inner': { question: 'Are |0⟩ and |1⟩ orthogonal?', hint: 'Compute ⟨0|1⟩.', step1: 'Inner product of basis states.', step2: '⟨0|1⟩ = 0', solution: 'Yes — computational basis is orthonormal.' },
    'mq-bell': { question: 'Is |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 a product state?', hint: 'Check if amplitudes factor as c₀₀·c₁₁ = c₀₁·c₁₀.', step1: 'Product state criterion for 2 qubits.', step2: 'Bell state fails factorization — it is entangled.', solution: 'No — |Φ⁺⟩ is entangled.' },
    'mq-cnot': { question: 'What does CNOT|10⟩ produce?', hint: 'Control is first qubit (1); target flips when control is 1.', step1: 'Control = 1, target = 0.', step2: 'Flip target → |11⟩.', solution: 'CNOT|10⟩ = |11⟩.' },
    'mq-swap': { question: 'How many CNOT gates in the standard SWAP decomposition?', hint: 'SWAP = CNOT · (CNOT with middle qubit) · CNOT pattern.', step1: 'Standard circuit: CNOT₁₂ · CNOT₂₁ · CNOT₁₂.', step2: 'Three CNOTs suffice.', solution: '3 CNOT gates.' },
    'mq-phi': { question: 'Measuring both qubits of |Φ⁺⟩ in Z basis: P(00)?', hint: 'Only |00⟩ and |11⟩ have nonzero amplitude, equal weight.', step1: 'Amplitudes: (|00⟩ + |11⟩)/√2.', step2: 'P(00) = |1/√2|² = 1/2.', solution: 'P(00) = 1/2.' },
    'pr-bb84': { question: 'BB84 requires an authenticated classical channel?', hint: 'Basis sifting and eavesdropper detection use classical communication.', step1: 'Quantum states carry key material.', step2: 'Classical post-processing compares bases and estimates error rate.', solution: 'Yes — authenticated classical channel is required.' },
    'pr-chsh': { question: 'Classical (LHV) bound on CHSH parameter S?', hint: 'Tsirelson bound is 2√2 quantum; classical is 2.', step1: 'CHSH: S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′).', step2: 'Classical |S| ≤ 2.', solution: '|S| ≤ 2 classically.' },
    'pr-tele': { question: 'Quantum teleportation transmits the quantum state using only classical bits (2) plus shared entanglement?', hint: 'No faster-than-light; 2 classical bits + 1 ebit.', step1: 'Alice measures in Bell basis → 2 classical bits.', step2: 'Bob applies correction based on bits.', solution: 'Yes — 2 classical bits + 1 shared Bell pair.' },
    'pr-sd': { question: 'Superdense coding sends how many classical bits using 1 qubit + 1 ebit?', hint: 'Encode 00, 01, 10, 11 via four Pauli operations on shared Bell state.', step1: 'Alice encodes 2 bits via Pauli on her half of Bell pair.', step2: 'Bob performs Bell measurement → 2 bits recovered.', solution: '2 classical bits.' },
    'alg-grover': { question: 'Grover search over N = 2^{{n}} items: query complexity?', hint: 'Quadratic speedup over classical O(N).', step1: 'Grover iterate amplifies marked state amplitude.', step2: '~π/4 · √N iterations.', solution: 'O(√N) oracle queries.' },
    'alg-dj': { question: 'Deutsch–Jozsa: queries to distinguish constant vs balanced (n-bit)?', hint: 'Quantum algorithm needs exactly one oracle query.', step1: 'Prepare uniform superposition, apply oracle, measure.', step2: 'Single query suffices.', solution: '1 query (quantum) vs 2ⁿ⁻¹ + 1 worst-case classically.' },
    'alg-shor': { question: "Shor's algorithm factors N by finding what property of a^x mod N?", hint: 'Order r where a^r ≡ 1 (mod N).', step1: 'Choose random a coprime to N.', step2: 'Find period r of f(x) = a^x mod N.', solution: 'Period (order) r of modular exponentiation.' },
    'alg-deutsch': { question: 'Deutsch algorithm (1 bit): maximum classical queries to determine if f is constant?', hint: 'Worst case: query f(0), still ambiguous, need f(1).', step1: 'Classically, one query leaves two consistent functions.', step2: 'Second query is required in worst case.', solution: '2 queries classically vs 1 quantum.' },
  },
  choices: {
    yes: 'Yes', no: 'No', period: 'Period', minimum: 'Minimum', maximum: 'Maximum', parityOnly: 'Parity only',
    identity: 'Identity (returns the state)', bitFlip: 'Bit flip', phaseFlip: 'Phase flip', projectZero: 'Projects to |0⟩',
    unitary: 'U†U = I', hermitian: 'U = U†', detZero: 'det(U) = 0', real: 'U is real',
    dim2n: '2ⁿ', dimN2: 'n²', dim2nLinear: '2n', dimFactorial: 'n!',
    cnotCount1: '1', cnotCount2: '2', cnotCount3: '3', cnotCount4: '4',
    sdBits1: '1', sdBits2: '2', sdBits3: '3', sdBits4: '4',
    query1: '1', queryN: 'n', query2n: '2ⁿ⁻¹ + 1', query2nFull: '2ⁿ',
    deutschClassical2: '2', deutschClassical3: '3', deutschClassical4: '4',
    chsh2: '≤ 2', chsh2sqrt2: '≤ 2√2', chsh4: '≤ 4', chsh1: '≤ 1',
    groverSqrt: 'O(√N)', groverLog: 'O(log N)', groverN: 'O(N)', groverN2: 'O(N²)',
    ket0: '|0⟩', ket1: '|1⟩', ketPlus: '|+⟩', ketMinus1: '−|1⟩',
    prob05: '0.5', prob025: '0.25', prob1: '1', prob0: '0',
  },
};

const enPlayground = {
  index: {
    title: 'Playground',
    intro: '{{count}} interactive labs for hands-on exploration. Each lab connects to material in the Learn chapters — use them to build intuition before or after reading.',
    homeLink: '← Home',
    learnLink: 'Learn Chapters →',
    chapterCircuits: 'Circuits',
    circuitBuilderTitle: 'Quantum Circuit Builder',
  },
  labPage: {
    notFound: 'Lab not found',
    unknownId: 'Unknown lab id:',
    comingSoon: 'This lab is coming soon.',
    backToPlayground: '← Back to Playground',
    allLabs: '← All Labs',
  },
  circuitBuilder: {
    title: 'Quantum Circuit Builder',
    intro: 'Drag gates onto the circuit grid. Run step-by-step to watch the statevector evolve, or simulate the full circuit. Export equivalent OpenQASM 3.0.',
    qubitsLabel: 'Qubits: {{n}}',
    depthGates: 'Depth: {{depth}} · Gates: {{gates}}',
    run: 'Run',
    step: 'Step',
    measure1024: 'Measure (1024 shots)',
    clear: 'Clear',
    showQasm: 'Show OpenQASM',
    hideQasm: 'Hide OpenQASM',
    statevector: 'Statevector |ψ⟩',
    probDistribution: 'Probability distribution',
    measurementHistogram: 'Measurement histogram',
    presetBell: 'Bell |Φ⁺⟩',
    presetGhz: 'GHZ (3)',
    presetTeleport: 'Teleport (partial)',
    dragGate: 'Drag {{gate}} onto circuit',
    rotationTheta: 'Rotation θ: {{deg}}°',
  },
};

// zh-TW translations - key structural mirror with full translations
const zhTW = {
  labs: JSON.parse(JSON.stringify(enLabs)),
  reference: JSON.parse(JSON.stringify(enReference)),
  practice: JSON.parse(JSON.stringify(enPractice)),
  playground: JSON.parse(JSON.stringify(enPlayground)),
};

// Apply zh-TW translations to shared + titles (abbreviated via mapping function)
const zhMap = {
  'Binary State Explorer': '二元狀態探索器',
  'Logic Gate Simulator': '邏輯閘模擬器',
  'Binary Adder (Ripple Carry)': '二元加法器（漣波進位）',
  'Complex Number Explorer': '複數探索器',
  'Single-Qubit State Explorer': '單量子位元狀態探索器',
  'Measurement Simulator': '測量模擬器',
  '3D Bloch Sphere': '三維 Bloch 球面',
  'Quantum Gate Explorer': '量子閘探索器',
  'Matrix & Unitary Checker': '矩陣與酉性檢查器',
  'Tensor Product Calculator': '張量積計算器',
  'Bell State Generator': 'Bell 態產生器',
  'Entanglement Measurement': '糾纏測量',
  '3-Qubit Bit-Flip Code': '三量子位元位元翻轉碼',
  'CHSH Bell Test': 'CHSH Bell 測試',
  'Superdense Coding': '超密集編碼',
  'Quantum Teleportation': '量子傳態',
  'BB84 Key Distribution': 'BB84 密鑰分配',
  'Deutsch Algorithm': 'Deutsch 演算法',
  'Deutsch–Jozsa': 'Deutsch–Jozsa',
  'Bernstein–Vazirani': 'Bernstein–Vazirani',
  'Simon\'s Algorithm (Demo)': 'Simon 演算法（示範）',
  'Grover Search': 'Grover 搜尋',
  'Quantum Fourier Transform': '量子傅立葉變換',
  'Quantum Phase Estimation': '量子相位估計',
  'Period Finding (mod N)': '週期尋找（模 N）',
  "Shor's Algorithm Demo (N = 15)": 'Shor 演算法示範（N = 15）',
};

Object.values(zhTW.labs).forEach((v) => { if (v.title && zhMap[v.title]) v.title = zhMap[v.title]; });

zhTW.labs.shared = {
  stateColumn: '|ψ⟩', amplitude: '振幅', probSquared: '|振幅|²', real: '實部', imaginary: '虛部',
  before: '之前', after: '之後', reset: '重設', measure: '測量', run: '執行', step: '步驟', clear: '清除',
  prev: '← 上一步', next: '下一步 →', qubits: '量子位元', depth: '深度', gates: '閘', presets: '預設',
  position: '位元位置', decimal: '十進位', component: '分量', value: '值', columnVector: '列向量',
  normalized: '（已歸一化）', scaleToNormalize: '乘以 {{scale}} 以歸一化',
  theoreticalProbabilities: '理論機率：', shots: '{{n}} 次測量', empiricalFrequencies: '來自 {{n}} 次測量{{plural}}的實測頻率。',
  productStateTest: '乘積態測試：', separable: '可分離（乘積態）', entangled: '糾纏（非乘積態）',
  syndrome: '症候群（Z₀Z₁, Z₁Z₂）：', encoded: '編碼後', afterError: '錯誤後', afterCorrection: '校正後',
  applied: '已套用：', blochVector: 'Bloch 向量：', inputAmplitudes: '輸入振幅', afterQft: 'QFT 之後',
  selectGateUnitary: '選擇單量子位元閘以檢視其矩陣並驗證酉性（U†U = I）。',
  isUnitary: '✓ 此矩陣為酉矩陣。', notUnitary: '✗ 非酉矩陣（標準閘不應出現此情況）。',
  chshDesc: '模擬單態源的相關性。古典上界 |S| ≤ 2；量子力學可達 |S| ≈ 2√2。',
  teleportDesc: '使用共享糾纏與 2 個古典位元傳送未知 |ψ⟩。量子位元 0 = 訊息，1 = Alice，2 = Bob。',
  groverDesc: '觀察標記計算基態上的振幅放大。',
  classicalRegister: '具有 n 個位元的古典寄存器可表示 2^n 種不同狀態。',
  zeroVectorError: '狀態必須非零才能歸一化。',
  measurementBasis: '測量基', basisZ: '計算基（Z）— |0⟩, |1⟩', basisX: 'X — |+⟩, |−⟩', basisY: 'Y — |i⟩, |−i⟩',
};

zhTW.reference.index = {
  title: '參考資料', gates: { title: '量子閘參考', desc: '單量子位元與多量子位元閘矩陣。' },
  formulas: { title: '公式表', desc: '各章節關鍵方程式。' }, complexity: { title: '複雜度', desc: '古典與量子查詢／時間界。' },
  glossary: { title: '詞彙表', desc: '導覽資料中的術語。' }, misconceptions: { title: '常見誤解', desc: '常見迷思與正確說明。' },
};
zhTW.reference.gates.title = '量子閘參考';
zhTW.reference.gates.intro = '完整的閘表，含符號、矩陣（來自 quantum-core）、作用、Bloch 球解釋與逆閘。';
zhTW.reference.gates.singleQubit = '單量子位元閘';
zhTW.reference.gates.twoQubit = '雙量子位元閘';
zhTW.reference.gates.threeQubit = '三量子位元閘';
zhTW.reference.gates.I = { name: '恆等', action: 'I|0⟩ = |0⟩, I|1⟩ = |1⟩ — 無變化', bloch: '恆等旋轉：Bloch 球上不移動', inverse: 'I† = I' };
zhTW.reference.gates.X = { name: 'Pauli X（NOT）', action: '位元翻轉：X|0⟩ = |1⟩, X|1⟩ = |0⟩', bloch: '繞 x 軸旋轉 π：|0⟩ ↔ |1⟩', inverse: 'X† = X (X² = I)' };
zhTW.reference.gates.H = { name: 'Hadamard', action: 'H|0⟩ = |+⟩, H|1⟩ = |−⟩', bloch: '繞 (x+z)/√2 軸旋轉 π；z ↔ x', inverse: 'H† = H (H² = I)' };
zhTW.reference.gates.CNOT = { name: '受控 NOT', action: 'CNOT|a,b⟩ = |a, b⊕a⟩ — 控制為 1 時翻轉目標', bloch: '產生糾纏；非單量子位元 Bloch 旋轉', inverse: 'CNOT† = CNOT (CNOT² = I on target)' };

zhTW.reference.formulas.title = '公式表';
zhTW.reference.formulas.intro = '與教科書符號一致的快速參考。研究截止：2026 年 9 月。';

zhTW.reference.complexity.title = '複雜度參考';
zhTW.reference.complexity.intro = '基礎量子演算法的查詢與時間複雜度比較。常數省略；除非另有說明，假設容錯模型。';

zhTW.practice.ui = {
  title: '練習中心', intro: '隨機題目，附提示、逐步揭示與完整解答。適用時以 quantum-core 驗證答案。',
  mixed: '混合', score: '得分：', newRandomSet: '新隨機題組', shuffleNewSet: '重新洗牌題組',
  questionOf: '第 {{current}} 題，共 {{total}} 題', verified: '✓ 已驗證', check: '⚠ 請檢查',
  hint: '提示', hideHint: '隱藏提示', revealStep: '揭示步驟 {{n}}', step: '步驟 {{n}}',
  correct: '正確！', incorrect: '不正確。', fullSolution: '完整解答', finish: '完成', next: '下一題',
};
zhTW.practice.categories = { classical: '古典', oneQubit: '單量子位元', linearAlgebra: '線性代數', multiQubit: '多量子位元', protocols: '協定', algorithms: '演算法' };
zhTW.practice.problems['cl-xor'] = { question: '{{a}} XOR {{b}} 是多少？', hint: '輸入不同時 XOR 為 1。', step1: '恰有一個輸入為 1 時 XOR 回傳 1。', step2: '輸入：a={{a}}, b={{b}}。', solution: '{{a}} ⊕ {{b}} = {{xor}}。' };
zhTW.practice.problems['cl-bin'] = { question: '將二元 {{bits}} 轉為十進位。', hint: '對位元為 1 的位置加 2 的冪。', step1: '從右到左讀位元為 2⁰, 2¹, 2², …', step2: '計算 {{bits}} 的二進位值。', solution: '{{bits}}₂ = {{dec}}₁₀。' };
zhTW.practice.problems['mq-bell'] = { question: '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 是乘積態嗎？', hint: '檢查 c₀₀·c₁₁ = c₀₁·c₁₀。', step1: '雙量子位元乘積態判準。', step2: 'Bell 態無法因式分解 — 為糾纏態。', solution: '否 — |Φ⁺⟩ 為糾纏態。' };
zhTW.practice.problems['alg-grover'] = { question: '在 N = 2^{{n}} 個項目中 Grover 搜尋的查詢複雜度？', hint: '相對古典 O(N) 的二次加速。', step1: 'Grover 迭代放大標記態振幅。', step2: '約 π/4 · √N 次迭代。', solution: 'O(√N) 次神諭查詢。' };

zhTW.playground.index = { title: '實驗場', intro: '{{count}} 個互動實驗室，供親手探索。每個實驗與學習章節連結 — 可在閱讀前後建立直覺。', homeLink: '← 首頁', learnLink: '學習章節 →', chapterCircuits: '電路', circuitBuilderTitle: '量子電路建構器' };
zhTW.playground.labPage = { notFound: '找不到實驗', unknownId: '未知的實驗 ID：', comingSoon: '此實驗即將推出。', backToPlayground: '← 返回實驗場', allLabs: '← 所有實驗' };
zhTW.playground.circuitBuilder = { title: '量子電路建構器', intro: '將閘拖曳至電路格線。逐步執行以觀察狀態向量演化，或模擬完整電路。可匯出等效的 OpenQASM 3.0。', qubitsLabel: '量子位元：{{n}}', depthGates: '深度：{{depth}} · 閘：{{gates}}', run: '執行', step: '步驟', measure1024: '測量（1024 次）', clear: '清除', showQasm: '顯示 OpenQASM', hideQasm: '隱藏 OpenQASM', statevector: '狀態向量 |ψ⟩', probDistribution: '機率分布', measurementHistogram: '測量直方圖', presetBell: 'Bell |Φ⁺⟩', presetGhz: 'GHZ (3)', presetTeleport: '傳態（部分）', dragGate: '將 {{gate}} 拖曳至電路', rotationTheta: '旋轉 θ：{{deg}}°' };

// Japanese
const ja = {
  labs: JSON.parse(JSON.stringify(enLabs)),
  reference: JSON.parse(JSON.stringify(enReference)),
  practice: JSON.parse(JSON.stringify(enPractice)),
  playground: JSON.parse(JSON.stringify(enPlayground)),
};

const jaMap = {
  'Binary State Explorer': '二進状態エクスプローラ',
  'Logic Gate Simulator': '論理ゲートシミュレータ',
  'Binary Adder (Ripple Carry)': '二進加算器（リップルキャリー）',
  'Complex Number Explorer': '複素数エクスプローラ',
  'Single-Qubit State Explorer': '単一量子ビット状態エクスプローラ',
  'Measurement Simulator': '測定シミュレータ',
  '3D Bloch Sphere': '3D ブロッホ球',
  'Quantum Gate Explorer': '量子ゲートエクスプローラ',
  'Matrix & Unitary Checker': '行列・ユニタリチェッカー',
  'Tensor Product Calculator': 'テンソル積計算機',
  'Bell State Generator': 'ベル状態生成器',
  'Entanglement Measurement': 'もつれ測定',
  '3-Qubit Bit-Flip Code': '3量子ビットビットフリップ符号',
  'CHSH Bell Test': 'CHSH ベルテスト',
  'Superdense Coding': '超高密度符号化',
  'Quantum Teleportation': '量子テレポーテーション',
  'BB84 Key Distribution': 'BB84 鍵配送',
  'Deutsch Algorithm': 'ドイチアルゴリズム',
  'Deutsch–Jozsa': 'ドイチ・ヨズサ',
  'Bernstein–Vazirani': 'バーンスタイン・ヴァジラニ',
  "Simon's Algorithm (Demo)": 'サイモンアルゴリズム（デモ）',
  'Grover Search': 'グローバー探索',
  'Quantum Fourier Transform': '量子フーリエ変換',
  'Quantum Phase Estimation': '量子位相推定',
  'Period Finding (mod N)': '周期探索（mod N）',
  "Shor's Algorithm Demo (N = 15)": 'ショアアルゴリズムデモ（N = 15）',
};

Object.values(ja.labs).forEach((v) => { if (v.title && jaMap[v.title]) v.title = jaMap[v.title]; });

ja.labs.shared = {
  stateColumn: '|ψ⟩', amplitude: '振幅', probSquared: '|振幅|²', real: '実部', imaginary: '虚部',
  before: '前', after: '後', reset: 'リセット', measure: '測定', run: '実行', step: 'ステップ', clear: 'クリア',
  prev: '← 前へ', next: '次へ →', qubits: '量子ビット', depth: '深さ', gates: 'ゲート', presets: 'プリセット',
  position: '位置', decimal: '十進', component: '成分', value: '値', columnVector: '列ベクトル',
  normalized: '（正規化済み）', scaleToNormalize: '{{scale}} 倍して正規化',
  theoreticalProbabilities: '理論確率：', shots: '{{n}} ショット', empiricalFrequencies: '{{n}} 回の測定{{plural}}からの実測度数。',
  productStateTest: '積状態テスト：', separable: '分離可能（積状態）', entangled: 'もつれ（積状態ではない）',
  syndrome: 'シンドローム（Z₀Z₁, Z₁Z₂）：', encoded: '符号化後', afterError: 'エラー後', afterCorrection: '訂正後',
  applied: '適用：', blochVector: 'ブロッホベクトル：', inputAmplitudes: '入力振幅', afterQft: 'QFT 後',
  selectGateUnitary: '単一量子ビットゲートを選び、行列とユニタリ性（U†U = I）を確認します。',
  isUnitary: '✓ この行列はユニタリです。', notUnitary: '✗ 非ユニタリ（標準ゲートでは想定外）。',
  chshDesc: '一重項源の相関をシミュレート。古典的上界 |S| ≤ 2；量子力学では |S| ≈ 2√2。',
  teleportDesc: '共有もつれと 2 古典ビットで未知の |ψ⟩ を転送。量子ビット 0 = メッセージ、1 = Alice、2 = Bob。',
  groverDesc: 'マークされた計算基底状態での振幅増幅を観察。',
  classicalRegister: 'n ビットの古典レジスタは 2^n 種類の状態を表現できます。',
  zeroVectorError: '正規化には非ゼロ状態が必要です。',
  measurementBasis: '測定基底', basisZ: '計算基底（Z）— |0⟩, |1⟩', basisX: 'X — |+⟩, |−⟩', basisY: 'Y — |i⟩, |−i⟩',
};

ja.reference.index = {
  title: 'リファレンス', gates: { title: 'ゲートリファレンス', desc: '単一・多量子ビットゲートの行列。' },
  formulas: { title: '公式シート', desc: '各章の主要方程式。' }, complexity: { title: '計算量', desc: '古典と量子のクエリ／時間境界。' },
  glossary: { title: '用語集', desc: 'ナビゲーションデータの用語。' }, misconceptions: { title: 'よくある誤解', desc: 'よくある迷思と正しい説明。' },
};
ja.reference.gates.title = 'ゲートリファレンス';
ja.reference.gates.intro = 'シンボル、行列（quantum-core 由来）、作用、ブロッホ球の解釈、逆ゲートを含む完全なゲート表。';
ja.reference.gates.I = { name: '恒等', action: 'I|0⟩ = |0⟩, I|1⟩ = |1⟩ — 変化なし', bloch: '恒等回転：ブロッホ球上で移動なし', inverse: 'I† = I' };
ja.reference.gates.X = { name: 'パウリ X（NOT）', action: 'ビット反転：X|0⟩ = |1⟩, X|1⟩ = |0⟩', bloch: 'x 軸まわりに π 回転：|0⟩ ↔ |1⟩', inverse: 'X† = X (X² = I)' };
ja.reference.gates.H = { name: 'アダマール', action: 'H|0⟩ = |+⟩, H|1⟩ = |−⟩', bloch: '(x+z)/√2 軸まわりに π；z ↔ x', inverse: 'H† = H (H² = I)' };
ja.reference.gates.CNOT = { name: '制御 NOT', action: 'CNOT|a,b⟩ = |a, b⊕a⟩ — 制御が 1 のときターゲットを反転', bloch: 'もつれを生成；単一量子ビットのブロッホ回転ではない', inverse: 'CNOT† = CNOT (CNOT² = I on target)' };

ja.reference.formulas.title = '公式シート';
ja.reference.formulas.intro = '教科書の記法に沿ったクイックリファレンス。研究カットオフ：2026年9月。';

ja.reference.complexity.title = '計算量リファレンス';
ja.reference.complexity.intro = '基礎量子アルゴリズムのクエリ・時間計算量の比較。定数は省略；特記なき場合は耐故障モデルを仮定。';

ja.practice.ui = {
  title: '練習ハブ', intro: 'ヒント、段階的な開示、完全な解答付きのランダム問題。該当する場合は quantum-core で検証。',
  mixed: '混合', score: 'スコア：', newRandomSet: '新しいランダムセット', shuffleNewSet: 'セットをシャッフル',
  questionOf: '問題 {{current}} / {{total}}', verified: '✓ 検証済み', check: '⚠ 要確認',
  hint: 'ヒント', hideHint: 'ヒントを隠す', revealStep: 'ステップ {{n}} を表示', step: 'ステップ {{n}}',
  correct: '正解！', incorrect: '不正解。', fullSolution: '完全な解答', finish: '終了', next: '次へ',
};
ja.practice.categories = { classical: '古典', oneQubit: '単一量子ビット', linearAlgebra: '線形代数', multiQubit: '多量子ビット', protocols: 'プロトコル', algorithms: 'アルゴリズム' };
ja.practice.problems['cl-xor'] = { question: '{{a}} XOR {{b}} は？', hint: '入力が異なるとき XOR は 1。', step1: 'ちょうど一方の入力が 1 のとき XOR は 1。', step2: '入力：a={{a}}, b={{b}}。', solution: '{{a}} ⊕ {{b}} = {{xor}}。' };
ja.practice.problems['cl-bin'] = { question: '二進 {{bits}} を十進に変換。', hint: 'ビットが 1 の位置の 2 の累乗を足す。', step1: '右から 2⁰, 2¹, 2², … として読む。', step2: '{{bits}} を基数 2 で評価。', solution: '{{bits}}₂ = {{dec}}₁₀。' };
ja.practice.problems['mq-bell'] = { question: '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 は積状態か？', hint: 'c₀₀·c₁₁ = c₀₁·c₁₀ を確認。', step1: '2 量子ビットの積状態の条件。', step2: 'ベル状態は因数分解できない — もつれ。', solution: 'いいえ — |Φ⁺⟩ はもつれている。' };
ja.practice.problems['alg-grover'] = { question: 'N = 2^{{n}} 項目のグローバー探索のクエリ計算量は？', hint: '古典 O(N) に対する二次加速。', step1: 'グローバー反復でマーク状態の振幅を増幅。', step2: '約 π/4 · √N 回の反復。', solution: 'O(√N) オラクルクエリ。' };

ja.playground.index = { title: 'プレイグラウンド', intro: '手を動かして学べる {{count}} 個のインタラクティブラボ。各ラボは学習章と連携 — 読む前後に直感を養えます。', homeLink: '← ホーム', learnLink: '学習章 →', chapterCircuits: '回路', circuitBuilderTitle: '量子回路ビルダー' };
ja.playground.labPage = { notFound: 'ラボが見つかりません', unknownId: '不明なラボ ID：', comingSoon: 'このラボは近日公開予定です。', backToPlayground: '← プレイグラウンドに戻る', allLabs: '← すべてのラボ' };
ja.playground.circuitBuilder = { title: '量子回路ビルダー', intro: 'ゲートを回路グリッドにドラッグ。段階実行で状態ベクトルの変化を観察するか、回路全体をシミュレート。等価な OpenQASM 3.0 をエクスポート。', qubitsLabel: '量子ビット：{{n}}', depthGates: '深さ：{{depth}} · ゲート：{{gates}}', run: '実行', step: 'ステップ', measure1024: '測定（1024 ショット）', clear: 'クリア', showQasm: 'OpenQASM を表示', hideQasm: 'OpenQASM を隠す', statevector: '状態ベクトル |ψ⟩', probDistribution: '確率分布', measurementHistogram: '測定ヒストグラム', presetBell: 'ベル |Φ⁺⟩', presetGhz: 'GHZ (3)', presetTeleport: 'テレポ（一部）', dragGate: '{{gate}} を回路にドラッグ', rotationTheta: '回転 θ：{{deg}}°' };

// Write all files
for (const [locale, data] of [['en', { labs: enLabs, reference: enReference, practice: enPractice, playground: enPlayground }], ['zh-TW', zhTW], ['ja', ja]]) {
  for (const [name, obj] of Object.entries(data)) {
    emit(locale, name, obj);
  }
}

// index.ts
const indexContent = `import type { Locale, TranslationTree } from '../types';
import { mergeTrees } from '../translator';
import { common as enCommon } from './en/common';
import { navigation as enNavigation } from './en/navigation';
import { home as enHome } from './en/home';
import { curriculum as enCurriculum } from './en/curriculum';
import { labs as enLabs } from './en/labs';
import { reference as enReference } from './en/reference';
import { practice as enPractice } from './en/practice';
import { playground as enPlayground } from './en/playground';
import { common as zhCommon } from './zh-TW/common';
import { navigation as zhNavigation } from './zh-TW/navigation';
import { home as zhHome } from './zh-TW/home';
import { curriculum as zhCurriculum } from './zh-TW/curriculum';
import { labs as zhLabs } from './zh-TW/labs';
import { reference as zhReference } from './zh-TW/reference';
import { practice as zhPractice } from './zh-TW/practice';
import { playground as zhPlayground } from './zh-TW/playground';
import { common as jaCommon } from './ja/common';
import { navigation as jaNavigation } from './ja/navigation';
import { home as jaHome } from './ja/home';
import { curriculum as jaCurriculum } from './ja/curriculum';
import { labs as jaLabs } from './ja/labs';
import { reference as jaReference } from './ja/reference';
import { practice as jaPractice } from './ja/practice';
import { playground as jaPlayground } from './ja/playground';

const bundles: Record<Locale, TranslationTree> = {
  en: mergeTrees(enCommon, enNavigation, enHome, enCurriculum, { labs: enLabs }, { reference: enReference }, { practice: enPractice }, { playground: enPlayground }),
  'zh-TW': mergeTrees(zhCommon, zhNavigation, zhHome, zhCurriculum, { labs: zhLabs }, { reference: zhReference }, { practice: zhPractice }, { playground: zhPlayground }),
  ja: mergeTrees(jaCommon, jaNavigation, jaHome, jaCurriculum, { labs: jaLabs }, { reference: jaReference }, { practice: jaPractice }, { playground: jaPlayground }),
};

export function getLocaleBundle(locale: Locale): TranslationTree {
  return bundles[locale] ?? bundles.en;
}
`;
writeFileSync(join(base, 'index.ts'), indexContent);

const summary = {};
for (const locale of ['en', 'zh-TW', 'ja']) {
  summary[locale] = {};
  for (const name of ['labs', 'reference', 'practice', 'playground']) {
    const mod = locale === 'en'
      ? { labs: enLabs, reference: enReference, practice: enPractice, playground: enPlayground }[name]
      : locale === 'zh-TW' ? zhTW[name] : ja[name];
    summary[locale][name] = countKeys(mod);
  }
}
console.log(JSON.stringify(summary, null, 2));
