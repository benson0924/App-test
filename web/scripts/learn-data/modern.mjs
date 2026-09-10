export const modern = {
  en: {
    title: 'Chapter 12: Modern Topics (2026)',
    intro:
      'A research-informed snapshot of quantum computing as of September 2026. Claims are tagged by evidence strength so you can distinguish textbook physics from vendor roadmaps and genuinely open problems.',
    evidenceLabels: {
      Established: 'Established',
      'Peer-reviewed': 'Peer-reviewed',
      'Industry claim': 'Industry claim',
      'Open question': 'Open question',
    },
    footer: 'Research cutoff: September 2026. Re-verify hardware and industry claims against peer-reviewed primary sources.',
    sections: {
      '12.1': {
        title: 'Hardware Platforms',
        paragraphs: {
          p1: 'Physical qubits are implemented on several competing platforms. Each trades off coherence, gate speed, connectivity, fabrication complexity, and control overhead differently.',
        },
        headings: {
          superconducting: 'Superconducting transmon qubits',
          trappedIons: 'Trapped ions',
          neutralAtoms: 'Neutral atoms (Rydberg arrays)',
          photonic: 'Photonic qubits',
        },
        evidence: {
          scEstablished: 'Transmon circuits on microwave resonators are the dominant cloud-accessible platform (IBM, Google, Rigetti, and others). Two-qubit gates via cross-resonance or tunable couplers; typical T₁ ~ 50–300 μs and T₂ ~ 30–200 μs on leading devices (order-of-magnitude, device-dependent).',
          scPeerReviewed: 'Random circuit sampling milestones and small logical-qubit demonstrations have been published on superconducting hardware; read primary papers for qubit counts, fidelities, and verification methods.',
          scIndustry: 'Roadmaps projecting millions of physical qubits by ~2030 should be treated as engineering targets, not demonstrated capabilities.',
          ionEstablished: 'Ions confined in Paul traps offer long coherence (T₂ > 1 s in favorable conditions) and all-to-all connectivity via shared motional modes. Gate times are slower (~μs–ms) than superconducting.',
          ionPeerReviewed: 'IonQ, Quantinuum, and academic labs report high-fidelity two-qubit gates and algorithm demonstrations on chains of tens of ions.',
          atomPeerReviewed: 'Atoms in optical tweezers, excited to Rydberg states for entangling interactions, scale to hundreds–thousands of qubits with flexible 2D geometry. Native multi-qubit gates and analog Hamiltonian simulation are strengths.',
          atomOpen: 'Whether neutral-atom platforms achieve fault-tolerant logical qubits with competitive overheads relative to surface-code superconducting designs remains active research.',
          photonEstablished: 'Photons carry qubits in polarization or path encoding; room-temperature operation and natural networking are advantages. Probabilistic entangling gates (linear optics + post-selection) limit deterministic circuit depth without multiplexing.',
          photonIndustry: 'Photonic vendors emphasize scalability via chip integration and cluster-state architectures; independent benchmarking against other platforms is still maturing.',
        },
        expandables: {
          otherPlatforms: {
            title: 'Other platforms: spin qubits & topological proposals',
            p1: 'Semiconductor spin qubits (Si/SiGe, donors) and topological Majorana proposals pursue long-lived qubits with CMOS-compatible fabrication.',
            p2: 'Topological protection at scale has not been experimentally confirmed; treat Majorana-based claims with extra scrutiny until reproducible evidence accumulates.',
          },
        },
        checkpoints: {
          qubitCount: { question: 'Does a higher physical qubit count automatically mean a more powerful quantum computer?', answer: 'no', hint: 'Consider error rates, connectivity, and whether qubits are logical or physical.' },
        },
      },
      '12.2': {
        title: 'Logical Qubits & Surface Codes',
        paragraphs: {
          p1: 'Fault-tolerant quantum computation requires logical qubits encoded with redundancy so errors can be detected and corrected faster than they accumulate.',
        },
        evidence: {
          established1: 'The surface code is a leading 2D topological stabilizer code with a well-studied error threshold around ~1% (physical error rate per gate/measurement, model-dependent).',
          peerReviewed: 'Repeated syndrome extraction on distance-3 and distance-5 surface codes, demonstrating break-even or below-threshold logical error rates in isolated experiments, has been reported through 2025–2026.',
          established2: 'Encoding one logical qubit requires many physical qubits (distance d code: ~2d² physical qubits for a planar surface code layout) plus ancillas for syndrome measurement.',
          open: 'Million-logical-qubit machines capable of cryptographically relevant Shor runs are not available in 2026; resource estimates still point to 10⁶–10⁷ physical qubits for RSA-2048 factoring under optimistic assumptions.',
        },
        expandables: {
          shorEstimate: {
            title: 'Resource estimate sketch (Shor on RSA-2048)',
            p1: 'Order-of-magnitude planning numbers from the literature (not a guarantee):',
            items: [
              '~4000–8000 logical qubits for modular exponentiation (algorithm-dependent)',
              'Physical qubits per logical qubit: 1000–10000+ depending on code distance and cycle time',
              'Total physical qubits: 10⁶–10⁸ range in published estimates',
            ],
            p2: 'See recent surface-code resource papers for updated constants.',
          },
        },
      },
      '12.3': {
        title: 'Noise Channels & Decoherence (T₁, T₂)',
        paragraphs: {
          p1: 'Real qubits interact with their environment. Open-system dynamics are modeled by completely positive trace-preserving (CPTP) maps — quantum channels.',
        },
        evidence: {
          t1t2: 'T₁ (energy relaxation time): average time for |1⟩ → |0⟩ decay. T₂ (dephasing time): coherence decay in superposition; T₂ ≤ 2T₁ always.',
          errorModels: 'Common error models: bit-flip (X), phase-flip (Z), depolarizing (random Pauli), amplitude damping, and phase damping. Each channel has a Kraus operator representation.',
          benchmarking: 'Randomized benchmarking and gate set tomography characterize average gate error rates on hardware; reported fidelities of 99.5%–99.9% for single-qubit and 99%–99.9% for two-qubit gates on leading platforms.',
        },
        expandables: {
          propagation: {
            title: 'Channel–circuit error propagation',
            p1: 'A circuit with depth D and per-gate error rate p suffers roughly O(D·p) accumulated error without correction. Coherence limits also cap circuit depth via T₂.',
          },
        },
        checkpoints: {
          t2t1: { question: 'Can T2 be longer than 2 times T1?', answer: 'no', hint: 'Think about the relationship between energy relaxation and pure dephasing.' },
        },
      },
      '12.4': {
        title: 'Error Mitigation vs. Error Correction',
        evidence: {
          mitigation: 'Error mitigation (zero-noise extrapolation, probabilistic error cancellation, symmetry verification, readout error mitigation) reduces bias in noisy expectation values without full fault tolerance.',
          correction: 'Error correction (surface codes, LDPC codes, etc.) uses redundancy and syndrome measurement to protect quantum information arbitrarily long — provided physical error rates are below threshold and sufficient overhead is paid.',
          peerReviewed: 'Mitigation techniques have enabled useful chemistry and optimization experiments on NISQ devices with modest circuit depths; cost grows exponentially with depth in worst cases.',
          open: 'Whether mitigation alone can scale to classically intractable problems without correction is unsettled; most experts expect correction is required for long, precise computations.',
        },
        tables: {
          compare: {
            headers: ['Feature', 'Mitigation', 'Correction'],
            rows: [
              { feature: 'Goal', mitigation: 'Better estimates from noisy runs', correction: 'Protect logical qubits' },
              { feature: 'Overhead', mitigation: 'Extra shots / circuit variants', correction: 'Many physical qubits + ancillas' },
              { feature: 'Depth limit', mitigation: 'Practical ceiling on NISQ', correction: 'Threshold theorem (in principle unbounded)' },
            ],
          },
        },
        checkpoints: {
          zne: { question: 'Does zero-noise extrapolation create a logical qubit?', answer: 'no', hint: 'Mitigation post-processes measurement statistics; it does not encode redundancy.' },
        },
      },
      '12.5': {
        title: 'Classical Simulation Limits (2ⁿ)',
        evidence: {
          exponential: 'Exact simulation of an n-qubit pure state requires storing 2ⁿ complex amplitudes — memory and time scale exponentially in n for generic circuits.',
          gottesmanKnill: 'Clifford circuits (H, S, CNOT, Pauli measurements) simulate efficiently via the Gottesman–Knill theorem in O(n²) time — not all quantum advantage candidates are Clifford-only.',
          tensor: 'Tensor-network and approximate methods extend classical reach for structured circuits, but random-circuit sampling beyond ~50 qubits (depth-dependent) remains challenging on classical supercomputers.',
          industry: 'Claims of "quantum supremacy" or "utility advantage" must specify the classical comparison, verification method, and problem size — cross-check against independent classical simulations where published.',
        },
      },
      '12.6': {
        title: 'Resource Estimation',
        paragraphs: {
          p1: 'Before running Shor on RSA or large chemistry, practitioners estimate qubit count, gate count, wall-clock time, and error budget — often using the surface code as a reference architecture.',
        },
        evidence: {
          scaling: 'Logical error rate ε_L scales as (p/p_th)^((d+1)/2) for code distance d near threshold p_th (simplified scaling intuition).',
          tools: 'Open-source tools (e.g., Azure Quantum Resource Estimator, various academic calculators) implement updated gate counts from algorithm papers plus code-cycle times from hardware assumptions.',
        },
        expandables: {
          inputs: {
            title: 'Key inputs to any resource estimate',
            items: [
              'Algorithm: qubits, T-count, T-depth, parallelization',
              'Code: family, distance, cycle time, physical error rate',
              'Classical co-processing: magic-state distillation factories, routing',
              'Success probability and error budget per logical operation',
            ],
          },
        },
      },
      '12.7': {
        title: 'Quantum Networking',
        evidence: {
          established: 'Quantum networks distribute entanglement or secret keys between nodes. Components include quantum memories, repeaters, and quantum-classical interfaces.',
          peerReviewed: 'Entanglement distribution over metropolitan fiber (tens of km) and satellite links has been demonstrated; full quantum internet with fault-tolerant repeaters is not yet operational at scale.',
          open: 'Which architecture (trusted-node QKD vs. repeater-based entanglement swapping) dominates commercial deployment by 2030 remains unclear.',
        },
      },
      '12.8': {
        title: 'Post-Quantum Cryptography',
        evidence: {
          shorThreat: "Shor's algorithm breaks RSA and elliptic-curve cryptography on a sufficiently large fault-tolerant machine. Harvest-now-decrypt-later threats motivate migration regardless of current hardware size.",
          nist: 'NIST standardized post-quantum classical algorithms (ML-KEM, ML-DSA, SLH-DSA, 2024) — lattice-based and hash-based schemes designed to resist known quantum attacks.',
          separate: 'Post-quantum cryptography (PQC) runs on classical computers; it is separate from quantum key distribution (QKD), which uses quantum states for key agreement under specific trust models.',
        },
        checkpoints: {
          mlkem: { question: 'Does deploying ML-KEM require a quantum computer?', answer: 'no', hint: 'PQC algorithms are classical cryptographic standards.' },
        },
      },
      '12.9': {
        title: 'Software Ecosystem',
        evidence: {
          qiskit: 'Qiskit (IBM): dominant open SDK, transpilation, simulators, cloud backends, pulse-level control.',
          cirq: 'Cirq (Google): Python framework tuned for NISQ circuits and Google hardware.',
          pennylane: 'PennyLane (Xanadu): differentiable quantum programming, hybrid ML/quantum workflows.',
          openqasm: 'OpenQASM 3: interoperable circuit description language; adoption across vendors growing. QIR (LLVM-based) targets compiler toolchains.',
          industry: 'Vendor-specific cloud pricing, queue times, and claimed "quantum advantage" for customer workloads should be validated on your own problem instances.',
        },
        expandables: {
          quantumCore: {
            title: "This textbook's quantum-core",
            p1: 'Our in-browser quantum-core library provides pedagogical state-vector simulation, gate matrices, and algorithm demos. It is not a production SDK — use Qiskit/Cirq for hardware submission and large-scale simulation.',
          },
        },
      },
      '12.10': {
        title: 'Fault Tolerance Status (2026)',
        evidence: {
          threshold: 'Threshold theorems prove that if physical gate error rates are below a constant threshold, arbitrary long quantum computation is possible with polylog overhead in qubits and time.',
          prototypes: 'Early logical qubit prototypes with repeated error correction cycles exist; break-even (logical < physical error rate) has been achieved in specific demonstrations.',
          industry: 'Timelines for "fault-tolerant quantum computing by [year]" are corporate forecasts, not established science.',
          open: 'Which code family (surface, color, LDPC, bosonic) and platform wins on total system cost remains undecided.',
        },
      },
      '12.11': {
        title: 'Quantum Advantage Benchmarks',
        evidence: {
          benchmarks: 'Different benchmarks measure different things: random circuit sampling (RCS), quantum approximate optimization (QAOA), variational quantum eigensolver (VQE), quantum machine learning, and bespoke industry workloads.',
          rcs: "Google's RCS experiments (2019, 2023+) show sampling from circuits hard to simulate classically for specific sizes — this is not general-purpose speedup on all NP-hard problems.",
          industry: '"Quantum utility" or "advantage" press releases often compare against unoptimized classical baselines; always ask: optimized classical competitor? Verified result? Problem relevance?',
          open: 'Which application domains (catalysis, optimization, ML, finance) will show durable quantum advantage at economically meaningful scales is unknown as of September 2026.',
        },
        expandables: {
          checklist: {
            title: 'Checklist for reading a quantum advantage claim',
            items: [
              'What exact problem and input size?',
              'What metric (time, energy, solution quality)?',
              'What classical algorithm was compared — best known or strawman?',
              'Was the quantum result verified independently?',
              'Does success require error mitigation only, or hypothetical fault tolerance?',
            ],
          },
        },
        checkpoints: {
          rcs: { question: 'Does random circuit sampling prove that quantum computers solve all NP problems efficiently?', answer: 'no', hint: 'RCS is a specific sampling task; BQP vs NP is still unknown.' },
        },
      },
    },
  },
  'zh-TW': {
    title: '第 12 章：現代主題（2026）',
    intro:
      '截至 2026 年 9 月的量子計算研究快照。主張按證據強度標記，以便區分教科書物理、廠商路線圖與真正的開放問題。',
    evidenceLabels: {
      Established: '已确立',
      'Peer-reviewed': '同行評審',
      'Industry claim': '產業宣稱',
      'Open question': '開放問題',
    },
    footer: '研究截止：2026 年 9 月。請對照同行評審一手來源重新驗證硬體與產業宣稱。',
    sections: {
      '12.1': {
        title: '硬體平台',
        paragraphs: { p1: '物理量子位元在多個競爭平台上實現。各平台在相干時間、閘速度、連通性、製造複雜度與控制開銷上權衡不同。' },
        headings: { superconducting: '超导 transmon 量子位元', trappedIons: '離子阱', neutralAtoms: '中性原子（Rydberg 陣列）', photonic: '光子量子位元' },
        evidence: {
          scEstablished: '微波谐振器上的 transmon 电路是主流云端平台（IBM、Google、Rigetti 等）。双量子位元閘经交叉共振或可调耦合器；领先设备典型 T₁ ~ 50–300 μs、T₂ ~ 30–200 μs（量级估计，依设备而定）。',
          scPeerReviewed: '超导硬件已发表随机电路采样里程碑与小规模逻辑量子位元演示；请阅读原始论文了解量子位元数、保真度与验证方法。',
          scIndustry: '路线图预测约 2030 年数百万物理量子位元应视为工程目标，而非已证能力。',
          ionEstablished: 'Paul 阱中的离子相干时间长（有利条件下 T₂ > 1 s），通过共享运动模式实现全连通。閘时间比超导慢（~μs–ms）。',
          ionPeerReviewed: 'IonQ、Quantinuum 与学术实验室报告数十离子链上的高保真双量子位元閘与算法演示。',
          atomPeerReviewed: '光镊中的原子激发至 Rydberg 态产生纠缠相互作用，可扩展至数百–数千量子位元与灵活 2D 几何。原生多量子位元閘与模拟哈密顿量是优势。',
          atomOpen: '中性原子平台能否以相对表面码超导设计有竞争力的开销实现容錯逻辑量子位元仍是活跃研究。',
          photonEstablished: '光子以偏振或路径编码携带量子位元；室温运行与自然联网是优势。概率纠缠閘（线性光学+后选择）限制无复用的确定性电路深度。',
          photonIndustry: '光子厂商强调芯片集成与簇态架构的可扩展性；与其他平台的独立基准仍在成熟中。',
        },
        expandables: {
          otherPlatforms: {
            title: '其他平台：自旋量子位元与拓扑方案',
            p1: '半导体自旋量子位元（Si/SiGe、施主）与拓扑 Majorana 方案追求长寿命、CMOS 兼容制造的量子位元。',
            p2: '大规模拓扑保护尚未实验确认；在可重复证据积累前对 Majorana 相关宣稱应格外审慎。',
          },
        },
        checkpoints: { qubitCount: { question: '物理量子位元数更高是否自动意味着更强大的量子计算机？', answer: 'no', hint: '考虑错误率、连通性及量子位元是逻辑还是物理。' } },
      },
      '12.2': {
        title: '逻辑量子位元与表面码',
        paragraphs: { p1: '容錯量子计算需要以冗余编码的逻辑量子位元，使错误能被检测并校正的速度快于累积。' },
        evidence: {
          established1: '表面码是领先的二维拓扑稳定子码，充分研究的错误阈值约 ~1%（每閘/测量的物理错误率，依模型而定）。',
          peerReviewed: '2025–2026 年已报告距离 3 与 5 表面码的重复症候群提取，在孤立实验中展示盈亏平衡或低于阈值的逻辑错误率。',
          established2: '编码一个逻辑量子位元需要许多物理量子位元（距离 d 码：平面表面码布局约 2d² 物理量子位元）加症候群测量辅助量子位元。',
          open: '2026 年尚无能运行密码学相关 Shor 的百万逻辑量子位元机器；乐观假设下 RSA-2048 分解资源估计仍指向 10⁶–10⁷ 物理量子位元。',
        },
        expandables: {
          shorEstimate: {
            title: '资源估计概述（RSA-2048 上的 Shor）',
            p1: '文献中的量级规划数字（非保证）：',
            items: ['模指數约 4000–8000 逻辑量子位元（依算法）', '每逻辑量子位元的物理量子位元：1000–10000+（依码距与周期时间）', '总物理量子位元：已发表估计在 10⁶–10⁸ 范围'],
            p2: '请参阅近期表面码资源论文获取更新常数。',
          },
        },
      },
      '12.3': {
        title: '噪声通道与退相干（T₁、T₂）',
        paragraphs: { p1: '真实量子位元与环境相互作用。开放系统动力学由完全正保迹（CPTP）映射——量子通道——建模。' },
        evidence: {
          t1t2: 'T₁（能量弛豫时间）：|1⟩ → |0⟩ 衰减的平均时间。T₂（退相干时间）：叠加态的相干衰减；恒有 T₂ ≤ 2T₁。',
          errorModels: '常见错误模型：位元翻转（X）、相位翻转（Z）、去极化（随机 Pauli）、振幅阻尼与相位阻尼。各通道有 Kraus 算子表示。',
          benchmarking: '随机基准与閘集层析刻画硬件平均閘错误率；领先平台单量子位元 99.5%–99.9%、双量子位元 99%–99.9% 保真度已报告。',
        },
        expandables: { propagation: { title: '通道–电路错误传播', p1: '深度 D、每閘错误率 p 的电路在无校正时约累积 O(D·p) 错误。相干时间也通过 T₂ 限制电路深度。' } },
        checkpoints: { t2t1: { question: 'T₂ 能否长于 2 倍 T₁？', answer: 'no', hint: '思考能量弛豫与纯退相干的关系。' } },
      },
      '12.4': {
        title: '错误缓解 vs. 错误校正',
        evidence: {
          mitigation: '错误缓解（零噪声外推、概率错误消除、对称性验证、读出错误缓解）在无完全容錯时减少噪声期望值偏差。',
          correction: '错误校正（表面码、LDPC 码等）用冗余与症候群测量任意长久保护量子信息——前提是物理错误率低于阈值且付出足够开销。',
          peerReviewed: '缓解技术已在 NISQ 设备上实现有用化学与优化实验（适度电路深度）；最坏情况下成本随深度指数增长。',
          open: '仅靠缓解能否扩展到无校正的经典难解问题尚无定论；多数专家预期长时精确计算需要校正。',
        },
        tables: {
          compare: {
            headers: ['特性', '缓解', '校正'],
            rows: [
              { feature: '目标', mitigation: '从噪声运行获得更好估计', correction: '保护逻辑量子位元' },
              { feature: '开销', mitigation: '额外 shots / 电路变体', correction: '大量物理量子位元 + 辅助' },
              { feature: '深度限制', mitigation: 'NISQ 实际上限', correction: '阈值定理（原则上无界）' },
            ],
          },
        },
        checkpoints: { zne: { question: '零噪声外推是否创建逻辑量子位元？', answer: 'no', hint: '缓解后处理测量统计；不编码冗余。' } },
      },
      '12.5': {
        title: '古典模拟极限（2ⁿ）',
        evidence: {
          exponential: '精确模拟 n 量子位元纯态需存储 2ⁿ 复振幅——对一般电路内存与时间指数增长。',
          gottesmanKnill: 'Clifford 电路（H、S、CNOT、Pauli 测量）经 Gottesman–Knill 定理 O(n²) 时间高效模拟——并非所有量子优势候选仅为 Clifford。',
          tensor: '张量网络与近似方法扩展结构化电路的古典可达范围，但超越约 50 量子位元的随机电路采样（依深度）在超算上仍具挑战。',
          industry: '「量子霸权」或「实用优势」宣稱须说明古典比较、验证方法与问题规模——在已发表处与独立古典模拟交叉核对。',
        },
      },
      '12.6': {
        title: '资源估计',
        paragraphs: { p1: '在 RSA 或大型化学上运行 Shor 前，从业者估计量子位元数、閘数、挂钟时间与错误预算——常以表面码为参考架构。' },
        evidence: {
          scaling: '逻辑错误率 ε_L 在阈值 p_th 附近对码距 d 近似按 (p/p_th)^((d+1)/2) 缩放（简化直觉）。',
          tools: '开源工具（如 Azure Quantum Resource Estimator、各类学术计算器）实现算法论文的更新閘数加硬件假设的码周期时间。',
        },
        expandables: {
          inputs: {
            title: '任何资源估计的关键输入',
            items: ['算法：量子位元、T 数、T 深度、并行化', '码：族、距离、周期时间、物理错误率', '古典协处理：magic state 蒸馏工厂、路由', '每次逻辑操作的成功概率与错误预算'],
          },
        },
      },
      '12.7': {
        title: '量子网络',
        evidence: {
          established: '量子网络在节点间分发纠缠或秘密密钥。组件包括量子存储器、中继器与量古典接口。',
          peerReviewed: '城域光纤（数十 km）与卫星链路的纠缠分发已演示；带容錯中继器的完整量子互联网尚未大规模运行。',
          open: '2030 年前商业部署以可信节点 QKD 还是中继器纠缠交换为主尚不明朗。',
        },
      },
      '12.8': {
        title: '后量子密码学',
        evidence: {
          shorThreat: '足够大的容錯机上 Shor 算法破解 RSA 与椭圆曲线密码。无论当前硬件规模，「先收集后解密」威胁促使迁移。',
          nist: 'NIST 标准化后量子古典算法（ML-KEM、ML-DSA、SLH-DSA，2024）——基于格与哈希的方案，抵抗已知量子攻击。',
          separate: '后量子密码（PQC）在古典计算机上运行；与用量子态在特定信任模型下密钥协商的 QKD 不同。',
        },
        checkpoints: { mlkem: { question: '部署 ML-KEM 是否需要量子计算机？', answer: 'no', hint: 'PQC 算法是古典密码标准。' } },
      },
      '12.9': {
        title: '软件生态',
        evidence: {
          qiskit: 'Qiskit（IBM）：主流开源 SDK、转译、模拟器、云端后端、脉冲级控制。',
          cirq: 'Cirq（Google）：针对 NISQ 电路与 Google 硬件的 Python 框架。',
          pennylane: 'PennyLane（Xanadu）：可微分量子编程、混合 ML/量子工作流。',
          openqasm: 'OpenQASM 3：可互操作电路描述语言；厂商采用增长中。QIR（基于 LLVM）面向编译器工具链。',
          industry: '厂商特定云端定价、排队时间与对客户工作负载的「量子优势」宣稱应在自有问题实例上验证。',
        },
        expandables: {
          quantumCore: {
            title: '本教科书的 quantum-core',
            p1: '我们的浏览器内 quantum-core 库提供教学用状态向量模拟、閘矩阵与算法演示。非生产 SDK——硬件提交与大规模模拟请用 Qiskit/Cirq。',
          },
        },
      },
      '12.10': {
        title: '容錯状态（2026）',
        evidence: {
          threshold: '阈值定理证明：若物理閘错误率低于常数阈值，任意长量子计算在量子位元与时间上仅需 polylog 开销即可实现。',
          prototypes: '早期逻辑量子位元原型与重复错误校正周期存在；特定演示中已达盈亏平衡（逻辑 < 物理错误率）。',
          industry: '「某年容錯量子计算」时间表是企业预测，非确立科学。',
          open: '哪种码族（表面、色、LDPC、玻色）与平台在总系统成本上胜出尚未决定。',
        },
      },
      '12.11': {
        title: '量子优势基准',
        evidence: {
          benchmarks: '不同基准衡量不同事物：随机电路采样（RCS）、QAOA、VQE、量子机器学习与定制行业工作负载。',
          rcs: 'Google RCS 实验（2019、2023+）展示特定规模下经典难模拟的电路采样——非对所有 NP 困难问题的通用加速。',
          industry: '「量子实用」或「优势」新闻稿常与未优化古典基线比较；始终追问：优化的古典竞争者？验证结果？问题相关性？',
          open: '截至 2026 年 9 月，哪些应用领域（催化、优化、ML、金融）将在经济有意义规模上展现持久量子优势尚未知。',
        },
        expandables: {
          checklist: {
            title: '阅读量子优势宣稱的检查清单',
            items: ['确切问题与输入规模？', '指标（时间、能量、解质量）？', '比较的古典算法——已知最佳还是稻草人？', '量子结果是否独立验证？', '成功是否仅需错误缓解还是假设容錯？'],
          },
        },
        checkpoints: { rcs: { question: '随机电路采样是否证明量子计算机高效解决所有 NP 问题？', answer: 'no', hint: 'RCS 是特定采样任务；BQP vs NP 仍开放。' } },
      },
    },
  },
  ja: {
    title: '第12章：現代トピック（2026）',
    intro:
      '2026年9月時点の量子コンピューティングの研究に基づくスナップショット。主張は証拠の強さでタグ付けし、教科書の物理、ベンダーロードマップ、真の未解問題を区別できます。',
    evidenceLabels: {
      Established: '確立',
      'Peer-reviewed': '査読済み',
      'Industry claim': '業界主張',
      'Open question': '未解の問題',
    },
    footer: '研究カットオフ：2026年9月。ハードウェアと業界主張は査読済み一次資料で再確認してください。',
    sections: {
      '12.1': {
        title: 'ハードウェアプラットフォーム',
        paragraphs: { p1: '物理量子ビットは複数の競合プラットフォームで実装される。各プラットフォームはコヒーレンス、ゲート速度、接続性、製造複雑度、制御オーバーヘッドを異にトレードオフする。' },
        headings: { superconducting: '超伝導トランズモン量子ビット', trappedIons: 'イオントラップ', neutralAtoms: '中性原子（リュードベルグ配列）', photonic: '光子量子ビット' },
        evidence: {
          scEstablished: 'マイクロ波共振器上のトランズモン回路が主流のクラウドアクセス可能プラットフォーム（IBM、Google、Rigetti 等）。2量子ビットゲートはクロス共振または調整可能カプラ；先端デバイスで典型的 T₁ ~ 50–300 μs、T₂ ~ 30–200 μs（オーダー、デバイス依存）。',
          scPeerReviewed: '超伝導ハードウェアでランダム回路サンプリングのマイルストーンと小規模論理量子ビット実証が発表；量子ビット数、忠実度、検証方法は原著論文を参照。',
          scIndustry: '約2030年に数百万物理量子ビットを予測するロードマップは実証能力ではなく工学目標として扱うべき。',
          ionEstablished: 'Paul トラップのイオンは長いコヒーレンス（好条件で T₂ > 1 s）と共有運動モードによる全対全接続。ゲート時間は超伝導より遅い（~μs–ms）。',
          ionPeerReviewed: 'IonQ、Quantinuum、学術ラボが数十イオンの鎖で高忠実度2量子ビットゲートとアルゴリズム実証を報告。',
          atomPeerReviewed: '光ピンセットの原子をリュードベルグ状態に励起してもつれ相互作用、数百–数千量子ビットと柔軟な2D几何にスケール。ネイティブ多量子ビットゲートとアナログハミルトニアンシミュレーションが強み。',
          atomOpen: '中性原子プラットフォームが表面コード超伝導設計に対して競争力のあるオーバーヘッドで耐故障論理量子ビットを達成できるかは活発な研究。',
          photonEstablished: '光子は偏光または経路符号化で量子ビットを運ぶ；室温動作と自然なネットワーキングが利点。確率的もつれゲート（線形光学+事後選択）は多重化なしの決定論回路深度を制限。',
          photonIndustry: '光子ベンダーはチップ統合とクラスター状態アーキテクチャによるスケーラビリティを強調；他プラットフォームとの独立ベンチマークはまだ成熟中。',
        },
        expandables: {
          otherPlatforms: {
            title: 'その他のプラットフォーム：スピン量子ビットとトポロジカル提案',
            p1: '半導体スピン量子ビット（Si/SiGe、ドナー）とトポロジカル Majorana 提案は CMOS 互換製造で長寿命量子ビットを追求。',
            p2: '大規模なトポロジカル保護は実験的に未確認；再現可能な証拠が蓄積するまで Majorana ベースの主張は特に慎重に。',
          },
        },
        checkpoints: { qubitCount: { question: '物理量子ビット数が多いほど自動的に強力な量子コンピュータ？', answer: 'no', hint: 'エラー率、接続性、論理か物理かを考える。' } },
      },
      '12.2': {
        title: '論理量子ビットと表面符号',
        paragraphs: { p1: '耐故障量子計算には冗長性で符号化された論理量子ビットが必要——エラーが蓄積より速く検出・訂正される。' },
        evidence: {
          established1: '表面符号は主要な2次元トポロジカル安定化符号で、よく研究されたエラー閾値は約 ~1%（ゲート/測定あたりの物理エラー率、モデル依存）。',
          peerReviewed: '2025–2026年に距離3・5表面符号の反復シンドローム抽出、孤立実験でブレークイーブンまたは閾値以下の論理エラー率が報告。',
          established2: '1論理量子ビットの符号化には多くの物理量子ビットが必要（距離 d 符号：平面表面符号レイアウトで約 2d² 物理量子ビット）とシンドローム測定用アンシラ。',
          open: '2026年には暗号学的に関連するショア実行可能な百万論理量子ビットマシンはない；RSA-2048因数分解の楽観仮定でも 10⁶–10⁷ 物理量子ビットの資源見積もり。',
        },
        expandables: {
          shorEstimate: {
            title: '資源見積もり概略（RSA-2048 のショア）',
            p1: '文献のオーダー見積もり（保証ではない）：',
            items: ['モジュラー指数化に約4000–8000論理量子ビット（アルゴリズム依存）', '論理量子ビットあたり物理量子ビット：1000–10000+（符号距離とサイクル時間依存）', '総物理量子ビット：発表見積もり 10⁶–10⁸ 範囲'],
            p2: '更新された定数は最近の表面符号資源論文を参照。',
          },
        },
      },
      '12.3': {
        title: 'ノイズチャネルとデコヒーレンス（T₁、T₂）',
        paragraphs: { p1: '実量子ビットは環境と相互作用。開系ダイナミクスは完全正値トレース保存（CPTP）写像——量子チャネル——でモデル化。' },
        evidence: {
          t1t2: 'T₁（エネルギー緩和時間）：|1⟩ → |0⟩ 減衰の平均時間。T₂（デフェージング時間）：重ね合わせのコヒーレンス減衰；常に T₂ ≤ 2T₁。',
          errorModels: '一般的エラーモデル：ビットフリップ（X）、位相フリップ（Z）、脱極（ランダムパウリ）、振幅減衰、位相減衰。各チャネルにクラウス演算子表示。',
          benchmarking: 'ランダムベンチマーキングとゲートセットトモグラフィがハードウェアの平均ゲートエラー率を特徴化；先端プラットフォームで単一量子ビット 99.5%–99.9%、2量子ビット 99%–99.9% 忠実度が報告。',
        },
        expandables: { propagation: { title: 'チャネル–回路エラー伝播', p1: '深さ D、ゲートあたりエラー率 p の回路は訂正なしで約 O(D·p) エラー蓄積。コヒーレンス制限も T₂ 経由で回路深度を制限。' } },
        checkpoints: { t2t1: { question: 'T₂ は 2×T₁ より長くなれる？', answer: 'no', hint: 'エネルギー緩和と純デフェージングの関係を考える。' } },
      },
      '12.4': {
        title: 'エラー緩和 vs. エラー訂正',
        evidence: {
          mitigation: 'エラー緩和（ゼロノイズ外挿、確率的エラー相殺、対称性検証、読出しエラー緩和）は完全耐故障なしでノイズあり期待値のバイアスを減らす。',
          correction: 'エラー訂正（表面符号、LDPC 符号等）は冗長性とシンドローム測定で量子情報を任意に長く保護——物理エラー率が閾値以下で十分なオーバーヘッドを払う場合。',
          peerReviewed: '緩和技術は NISQ デバイスで有用な化学・最適化実験を可能に（ modest 回路深度）；最悪ケースで深さに対してコストは指数増大。',
          open: '緩和だけで訂正なしに古典的に困難な問題にスケールできるかは未決；長く精密な計算には訂正が必要と大多数の専門家は予想。',
        },
        tables: {
          compare: {
            headers: ['特性', '緩和', '訂正'],
            rows: [
              { feature: '目的', mitigation: 'ノイズあり実行からより良い推定', correction: '論理量子ビットを保護' },
              { feature: 'オーバーヘッド', mitigation: '追加ショット / 回路変種', correction: '多数物理量子ビット + アンシラ' },
              { feature: '深度制限', mitigation: 'NISQ の実用上限', correction: '閾値定理（原理上無制限）' },
            ],
          },
        },
        checkpoints: { zne: { question: 'ゼロノイズ外挿は論理量子ビットを作る？', answer: 'no', hint: '緩和は測定統計を後処理；冗長性は符号化しない。' } },
      },
      '12.5': {
        title: '古典シミュレーション限界（2ⁿ）',
        evidence: {
          exponential: 'n 量子ビット純状態の厳密シミュレーションは 2ⁿ 複素振幅の保存が必要——一般回路でメモリと時間は n に対して指数。',
          gottesmanKnill: 'Clifford 回路（H、S、CNOT、パウリ測定）は Gottesman–Knill 定理で O(n²) 時間に効率シミュレート——すべての量子優位候補が Clifford のみではない。',
          tensor: 'テンソルネットワークと近似手法は構造化回路の古典到達を拡張するが、~50 量子ビット超のランダム回路サンプリング（深度依存）はスパコンでも困難。',
          industry: '「量子超越」や「実用優位」の主張は古典比較、検証方法、問題サイズを明示すべき——発表があれば独立古典シミュレーションと照合。',
        },
      },
      '12.6': {
        title: '資源見積もり',
        paragraphs: { p1: 'RSA や大規模化学でショアを実行する前に、量子ビット数、ゲート数、実時間、エラーバジェットを見積もる——しばしば表面符号を参照アーキテクチャに。' },
        evidence: {
          scaling: '論理エラー率 ε_L は閾値 p_th 近くで符号距離 d に対し (p/p_th)^((d+1)/2) でスケール（簡略直感）。',
          tools: 'オープンソースツール（Azure Quantum Resource Estimator、各種学術計算機等）がアルゴリズム論文の更新ゲート数とハードウェア仮定の符号サイクル時間を実装。',
        },
        expandables: {
          inputs: {
            title: '資源見積もりの主要入力',
            items: ['アルゴリズム：量子ビット、T 数、T 深度、並列化', '符号：族、距離、サイクル時間、物理エラー率', '古典協処理：magic state 蒸留ファクトリ、ルーティング', '論理操作あたりの成功確率とエラーバジェット'],
          },
        },
      },
      '12.7': {
        title: '量子ネットワーキング',
        evidence: {
          established: '量子ネットワークはノード間でもつれや秘密鍵を配布。量子メモリ、リピータ、量古典インターフェースを含む。',
          peerReviewed: '都市圏ファイバ（数十 km）と衛星リンクでもつれ配布が実証；耐故障リピータ付き完全量子インターネットは大規模運用されていない。',
          open: '2030年までの商用展開で信頼ノード QKD かリピーターもつれスワップか優勢かは不明。',
        },
      },
      '12.8': {
        title: 'ポスト量子暗号',
        evidence: {
          shorThreat: '十分大きな耐故障マシン上でショアは RSA と楕円曲線暗号を破る。現在のハードウェア規模に関わらず「今収集・後で復号」脅威が移行を促す。',
          nist: 'NIST はポスト量子古典アルゴリズム（ML-KEM、ML-DSA、SLH-DSA、2024）を標準化——格子とハッシュベース、既知量子攻撃に耐性。',
          separate: 'ポスト量子暗号（PQC）は古典コンピュータで動作；特定信頼モデルで量子状態を鍵合意に使う QKD とは別。',
        },
        checkpoints: { mlkem: { question: 'ML-KEM の展開に量子コンピュータは必要？', answer: 'no', hint: 'PQC アルゴリズムは古典暗号標準。' } },
      },
      '12.9': {
        title: 'ソフトウェアエコシステム',
        evidence: {
          qiskit: 'Qiskit（IBM）：主流オープン SDK、トランスパイル、シミュレータ、クラウドバックエンド、パルスレベル制御。',
          cirq: 'Cirq（Google）：NISQ 回路と Google ハードウェア向け Python フレームワーク。',
          pennylane: 'PennyLane（Xanadu）：微分可能量子プログラミング、ハイブリッド ML/量子ワークフロー。',
          openqasm: 'OpenQASM 3：相互運用可能回路記述言語；ベンダー採用拡大中。QIR（LLVM ベース）はコンパイラツールチェーン向け。',
          industry: 'ベンダー固有クラウド価格、キュー時間、顧客ワークロードの「量子優位」主張は自問題インスタンスで検証すべき。',
        },
        expandables: {
          quantumCore: {
            title: '本教科書の quantum-core',
            p1: 'ブラウザ内 quantum-core ライブラリは教育的状態ベクトルシミュレーション、ゲート行列、アルゴリズムデモを提供。本番 SDK ではない——ハードウェア投入と大規模シミュレーションは Qiskit/Cirq を使用。',
          },
        },
      },
      '12.10': {
        title: '耐故障ステータス（2026）',
        evidence: {
          threshold: '閾値定理：物理ゲートエラー率が定数閾値以下なら、量子ビットと時間に polylog オーバーヘッドで任意長量子計算が可能。',
          prototypes: '反復エラー訂正サイクルの初期論理量子ビット原型が存在；特定実証でブレークイーブン（論理 < 物理エラー率）達成。',
          industry: '「某年まで耐故障量子計算」タイムラインは企業予測であり確立科学ではない。',
          open: 'どの符号族（表面、カラー、LDPC、ボゾン）とプラットフォームが総システムコストで勝つかは未決。',
        },
      },
      '12.11': {
        title: '量子優位ベンチマーク',
        evidence: {
          benchmarks: '異なるベンチマークは異なるものを測定：ランダム回路サンプリング（RCS）、QAOA、VQE、量子機械学習、業界向けワークロード。',
          rcs: 'Google RCS 実験（2019、2023+）は特定サイズで古典的に困難な回路からのサンプリングを示す——すべての NP 困難問題への汎用加速ではない。',
          industry: '「量子実用」や「優位」プレスリリースは未最適化古典ベースラインと比較することが多い；常に問う：最適化古典競合？検証結果？問題の関連性？',
          open: '2026年9月時点でどの应用领域（触媒、最適化、ML、金融）が経済的に意味のあるスケールで持続的量子優位を示すかは不明。',
        },
        expandables: {
          checklist: {
            title: '量子優位主張を読むチェックリスト',
            items: ['正確な問題と入力サイズは？', '指標（時間、エネルギー、解の質）は？', '比較した古典アルゴリズム——既知最良かストローマンか？', '量子結果は独立検証されたか？', '成功はエラー緩和のみか仮想耐故障か？'],
          },
        },
        checkpoints: { rcs: { question: 'ランダム回路サンプリングは量子コンピュータがすべての NP 問題を効率解くことを証明？', answer: 'no', hint: 'RCS は特定サンプリングタスク；BQP vs NP は未解。' } },
      },
    },
  },
};
