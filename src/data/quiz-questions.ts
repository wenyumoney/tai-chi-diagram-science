export interface QuizQuestion {
  id: string;
  question: { zh: string; en: string };
  options: { zh: string; en: string }[];
  correctIndex: number;
  explanation: { zh: string; en: string };
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "taiji-math": [
    {
      id: "math-1",
      question: {
        zh: "八卦的每一卦由几条爻线组成？",
        en: "How many lines make up each trigram (Bagua)?",
      },
      options: [
        { zh: "2条", en: "2" },
        { zh: "3条", en: "3" },
        { zh: "4条", en: "4" },
        { zh: "6条", en: "6" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "八卦每卦由三爻组成——阳爻(—)与阴爻(--)，恰好对应3位二进制数。",
        en: "Each trigram consists of three lines — yang (—) and yin (--), corresponding to a 3-bit binary number.",
      },
    },
    {
      id: "math-2",
      question: {
        zh: "哪位数学家从《易经》六十四卦中发现了二进制算术的古老渊源？",
        en: "Which mathematician discovered the ancient roots of binary arithmetic in the I Ching's 64 hexagrams?",
      },
      options: [
        { zh: "牛顿", en: "Newton" },
        { zh: "莱布尼茨", en: "Leibniz" },
        { zh: "欧拉", en: "Euler" },
        { zh: "高斯", en: "Gauss" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "1701年，莱布尼茨通过传教士白晋获得六十四卦图，发现卦序与二进制数0-63完全对应。",
        en: "In 1701, Leibniz received the 64 hexagram diagram from missionary Bouvet and found the hexagram order perfectly matched binary numbers 0-63.",
      },
    },
    {
      id: "math-3",
      question: {
        zh: "太极图中的阴阳二元，在数学上对应什么？",
        en: "What does the yin-yang duality correspond to in mathematics?",
      },
      options: [
        { zh: "正负数", en: "Positive and negative numbers" },
        { zh: "0和1（二进制最根本的二元性）", en: "0 and 1 (the most fundamental duality)" },
        { zh: "奇数和偶数", en: "Odd and even numbers" },
        { zh: "实数和虚数", en: "Real and imaginary numbers" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "阴阳二元不是粗糙的对立，而是数学中最根本的二元性——0与1、真与假、开与关，是一切信息编码和计算的起点。",
        en: "Yin-yang duality is not crude opposition but the most fundamental duality in mathematics: 0 and 1, true and false, on and off — the foundation of all information encoding.",
      },
    },
    {
      id: "math-4",
      question: {
        zh: "太极图的S曲线在数学上隐喻了什么？",
        en: "What does the Taiji S-curve metaphorically represent in mathematics?",
      },
      options: [
        { zh: "正弦函数", en: "The sine function" },
        { zh: "连续统与实数系统", en: "The continuum and real number system" },
        { zh: "抛物线", en: "A parabola" },
        { zh: "双曲线", en: "A hyperbola" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "太极图S曲线将圆连续分为阴阳两半，隐喻实数连续统——在0与1之间存在无穷多个数，离散二元背后是连续统的光谱。",
        en: "The S-curve continuously divides the circle into yin-yang halves, metaphorically representing the real number continuum — infinite values exist between 0 and 1.",
      },
    },
  ],

  "quantum-entanglement": [
    {
      id: "quantum-1",
      question: {
        zh: "哪位量子力学奠基人将太极图刻在了自己的家族族徽上？",
        en: "Which founder of quantum mechanics engraved the Taiji diagram on his family coat of arms?",
      },
      options: [
        { zh: "爱因斯坦", en: "Einstein" },
        { zh: "尼尔斯·玻尔", en: "Niels Bohr" },
        { zh: "薛定谔", en: "Schrödinger" },
        { zh: "海森堡", en: "Heisenberg" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "1947年，玻尔被授予大象勋章时设计了刻有太极图的族徽，并附铭文'Contraria Sunt Complementa'（相反者相成）。",
        en: "In 1947, Bohr designed his coat of arms featuring the Taiji diagram when awarded the Order of the Elephant, with the motto 'Contraria Sunt Complementa.'",
      },
    },
    {
      id: "quantum-2",
      question: {
        zh: "量子纠缠中，两个纠缠粒子的自旋方向是什么关系？",
        en: "What is the relationship between the spins of two entangled particles?",
      },
      options: [
        { zh: "相同方向", en: "Same direction" },
        { zh: "相反方向（反相关）", en: "Opposite directions (anti-correlated)" },
        { zh: "随机无关", en: "Random and unrelated" },
        { zh: "取决于距离", en: "Depends on distance" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "两个纠缠粒子自旋方向相反且保持瞬时关联——无论相隔多远，测量一个立即确定另一个的状态，这正是'阴阳互根'在量子层面的精确实现。",
        en: "Two entangled particles have opposite spins with instantaneous correlation — measuring one immediately determines the other regardless of distance, mirroring yin-yang mutual dependence.",
      },
    },
    {
      id: "quantum-3",
      question: {
        zh: "量子叠加态在太极图中对应什么？",
        en: "What does quantum superposition correspond to in the Taiji diagram?",
      },
      options: [
        { zh: "太极图的圆形外框", en: "The circular outer boundary" },
        { zh: "阴中有阳、阳中有阴（眼点）", en: "Yin contains Yang, Yang contains Yin (the eye dots)" },
        { zh: "太极图的S曲线", en: "The S-curve" },
        { zh: "太极图的旋转方向", en: "The rotation direction" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "正如太极图中阴眼含阳、阳眼含阴，量子粒子在被测量前同时处于多种可能状态的叠加——两种状态并不互斥，而是共存。",
        en: "Just as the Taiji diagram shows yin containing yang and vice versa, a quantum particle exists in superposition of multiple states simultaneously before measurement.",
      },
    },
    {
      id: "quantum-4",
      question: {
        zh: "玻尔族徽上的拉丁铭文是什么意思？",
        en: "What does the Latin motto on Bohr's coat of arms mean?",
      },
      options: [
        { zh: "万物皆数", en: "All is number" },
        { zh: "相反者相成", en: "Opposites are complementary" },
        { zh: "知识即力量", en: "Knowledge is power" },
        { zh: "道法自然", en: "The Dao follows nature" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "'Contraria Sunt Complementa'意为'相反者相成'——这正是玻尔互补原理的核心：波与粒子的描述是互补而非矛盾的，两种图景缺一不可。",
        en: "'Contraria Sunt Complementa' means 'opposites are complementary' — the core of Bohr's Complementarity Principle: wave and particle descriptions are complementary, not contradictory.",
      },
    },
  ],

  "symmetry-breaking": [
    {
      id: "sym-1",
      question: {
        zh: "对称性自发破缺在太极哲学中对应什么？",
        en: "What does spontaneous symmetry breaking correspond to in Taiji philosophy?",
      },
      options: [
        { zh: "阴阳合一", en: "Yin-yang unity" },
        { zh: "阴阳从平衡到不平衡的跃迁", en: "Yin-yang transition from balance to imbalance" },
        { zh: "阴阳循环", en: "Yin-yang cycle" },
        { zh: "阴阳对立", en: "Yin-yang opposition" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "对称性破缺描述系统从高度对称态跃迁到不对称的稳定态——正如阴阳从初始的平衡走向具体的、不对称的万物显化。",
        en: "Symmetry breaking describes a system transitioning from a highly symmetric state to a stable asymmetric one — just as yin-yang moves from primordial balance to concrete, asymmetric manifestation.",
      },
    },
    {
      id: "sym-2",
      question: {
        zh: "对称性破缺的势能面常被称为什么？",
        en: "What is the potential surface of symmetry breaking commonly called?",
      },
      options: [
        { zh: "抛物线势", en: "Parabolic potential" },
        { zh: "墨西哥帽势能", en: "Mexican hat potential" },
        { zh: "双阱势", en: "Double-well potential" },
        { zh: "谐振子势", en: "Harmonic oscillator potential" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "Mexican hat potential 是描述自发对称性破缺的经典图像——中心对称点是不稳定的，系统自发滑向周边稳定的破缺态。",
        en: "The Mexican hat potential is the classic illustration of spontaneous symmetry breaking — the central symmetric point is unstable; the system spontaneously slides to a stable broken state.",
      },
    },
    {
      id: "sym-3",
      question: {
        zh: "根据太极视角，哪种状态才是真正稳定的？",
        en: "According to the Taiji perspective, which state is truly stable?",
      },
      options: [
        { zh: "完美对称态", en: "Perfectly symmetric state" },
        { zh: "完全混沌态", en: "Completely chaotic state" },
        { zh: "破缺态（对称被打破后）", en: "The broken state (after symmetry breaks)" },
        { zh: "静止不变态", en: "Static unchanging state" },
      ],
      correctIndex: 2,
      explanation: {
        zh: "正如太极图中的阴阳不是各占一半的静止平衡，而是动态的、不对称的互相缠绕——稳定的现实来自对称的破缺，而非完美的对称。",
        en: "Just as yin-yang in the Taiji diagram is not a static 50/50 balance but a dynamic, asymmetric intertwining — stable reality emerges from broken symmetry, not perfect symmetry.",
      },
    },
  ],

  "information-theory": [
    {
      id: "info-1",
      question: {
        zh: "信息论中，比特(bit)的0/1二元对应太极中的什么？",
        en: "In information theory, what does the bit's 0/1 duality correspond to in Taiji?",
      },
      options: [
        { zh: "天和地", en: "Heaven and Earth" },
        { zh: "阴和阳", en: "Yin and Yang" },
        { zh: "动和静", en: "Motion and stillness" },
        { zh: "刚和柔", en: "Hard and soft" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "比特(bit)是信息的最小单位，0/1二元是一切数字信息的原子——正如阴阳二元是万物描述的基本编码单元。",
        en: "The bit is the smallest unit of information; the 0/1 duality is the atom of all digital information — just as yin-yang is the basic coding unit for describing all things.",
      },
    },
    {
      id: "info-2",
      question: {
        zh: "信息和不确定性之间是什么关系？",
        en: "What is the relationship between information and uncertainty?",
      },
      options: [
        { zh: "信息增加不确定性", en: "Information increases uncertainty" },
        { zh: "信息消除不确定性（熵减）", en: "Information eliminates uncertainty (entropy reduction)" },
        { zh: "信息与不确定性无关", en: "Information is unrelated to uncertainty" },
        { zh: "信息等于不确定性", en: "Information equals uncertainty" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "信息获取本质上就是熵减——每获得一个bit的信息，不确定性就减少一半。阴阳之分就是最原始的信息提取：把混沌分为可知的两类。",
        en: "Information acquisition is essentially entropy reduction — each bit of information halves uncertainty. The yin-yang distinction is the most primitive information extraction: dividing chaos into two knowable categories.",
      },
    },
    {
      id: "info-3",
      question: {
        zh: "在阴阳-信息论的视角下，'道'最接近什么概念？",
        en: "From the yin-yang information theory perspective, 'Dao' is closest to what concept?",
      },
      options: [
        { zh: "最大熵（完全不确定性）", en: "Maximum entropy (complete uncertainty)" },
        { zh: "零熵（完全确定）", en: "Zero entropy (complete certainty)" },
        { zh: "信息的源头——阴阳未分的整体", en: "The source of information — the undivided whole before yin-yang" },
        { zh: "信道容量", en: "Channel capacity" },
      ],
      correctIndex: 2,
      explanation: {
        zh: "'道生一，一生二'——道是阴阳未分的整体，是信息诞生的源头。阴阳二分（1 bit）是第一次信息提取，从混沌中建立了第一个区别。",
        en: "'The Dao gives birth to one, one gives birth to two' — Dao is the undivided whole, the source of information. The yin-yang split (1 bit) is the first act of information extraction, creating the first distinction from chaos.",
      },
    },
  ],

  "chaos-fractal": [
    {
      id: "chaos-1",
      question: {
        zh: "分形(fractal)的核心特征在太极图中如何体现？",
        en: "How is the core feature of fractals reflected in the Taiji diagram?",
      },
      options: [
        { zh: "太极图是完美的圆形", en: "The Taiji diagram is a perfect circle" },
        { zh: "太极图的黑白两色", en: "The black and white colors" },
        { zh: "自相似性——太极图中的小太极（眼点）", en: "Self-similarity — the small Taiji within the Taiji (eye dots)" },
        { zh: "太极图的S曲线", en: "The S-curve" },
      ],
      correctIndex: 2,
      explanation: {
        zh: "分形的本质是自相似性——部分包含整体的全部信息。太极图中的阴阳眼点正是'图中含图'的自相似结构：阴中有阳（小太极）、阳中有阴（小太极）。",
        en: "The essence of fractals is self-similarity — the part contains the whole. The yin-yang eye dots are exactly this: yin contains yang (a small Taiji), yang contains yin (a small Taiji).",
      },
    },
    {
      id: "chaos-2",
      question: {
        zh: "混沌理论中的'奇异吸引子'体现了什么核心思想？",
        en: "What core idea does the 'strange attractor' in chaos theory embody?",
      },
      options: [
        { zh: "完全随机无序", en: "Complete randomness" },
        { zh: "混沌中有序，无序中有规律", en: "Order within chaos, patterns within disorder" },
        { zh: "系统必然走向毁灭", en: "Systems inevitably collapse" },
        { zh: "一切皆可精确预测", en: "Everything is precisely predictable" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "奇异吸引子揭示混沌并非完全无序——在看似随机的行为背后隐藏着精致的几何结构。这正如太极哲学中的'乱中有序、序中有乱'。",
        en: "Strange attractors reveal that chaos is not complete disorder — behind seemingly random behavior lies elegant geometric structure. This echoes the Taiji philosophy of 'order within chaos, chaos within order.'",
      },
    },
    {
      id: "chaos-3",
      question: {
        zh: "太极图中阴与阳的边界（S曲线）在混沌理论中对应什么？",
        en: "What does the boundary between yin and yang (the S-curve) correspond to in chaos theory?",
      },
      options: [
        { zh: "不动点", en: "A fixed point" },
        { zh: "分形边界——无限复杂的分割线", en: "A fractal boundary — an infinitely complex dividing line" },
        { zh: "一条直线", en: "A straight line" },
        { zh: "极限环", en: "A limit cycle" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "太极图的S曲线不是简单的弧线——如果无限放大，它可能呈现分形边界般的复杂性：阴阳不是一刀切开的，而是在每一层、每个尺度上都互相渗透。",
        en: "The S-curve is not a simple arc — if infinitely magnified, it may present fractal-boundary complexity: yin and yang are not cleanly split but interpenetrate at every level and scale.",
      },
    },
  ],

  "systems-science": [
    {
      id: "sys-1",
      question: {
        zh: "太极图'阴中含阳、阳中含阴'在系统科学中对应什么核心概念？",
        en: "What core systems science concept does 'yin contains yang, yang contains yin' correspond to?",
      },
      options: [
        { zh: "线性因果", en: "Linear causality" },
        { zh: "反馈回路（正反馈与负反馈互相嵌套）", en: "Feedback loops (positive and negative feedback nested)" },
        { zh: "层级结构", en: "Hierarchical structure" },
        { zh: "系统边界", en: "System boundary" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "太极图的眼点揭示了任何系统都含有其对立面的种子——正反馈中孕育着负反馈的调节力量，增长中隐含着衰退的起点。这就是系统思维的精华。",
        en: "The Taiji eye dots reveal that every system contains the seed of its opposite — positive feedback contains the regulatory force of negative feedback, growth implies the onset of decline. This is the essence of systems thinking.",
      },
    },
    {
      id: "sys-2",
      question: {
        zh: "太极图体现的'整体大于部分之和'在系统科学中称为什么？",
        en: "What is 'the whole is greater than the sum of its parts' called in systems science?",
      },
      options: [
        { zh: "还原论", en: "Reductionism" },
        { zh: "涌现(Emergence)", en: "Emergence" },
        { zh: "熵增", en: "Entropy increase" },
        { zh: "同态", en: "Homeostasis" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "涌现是系统科学的核心概念——当阴阳两部分组合在一起，太极图不仅仅是一个黑半圆加一个白半圆；它产生了一个全新的、不可还原为部分的整体意义。",
        en: "Emergence is the core concept of systems science — when yin and yang combine, the Taiji diagram is not merely a black half-circle plus a white half-circle; it generates a holistic meaning irreducible to its parts.",
      },
    },
    {
      id: "sys-3",
      question: {
        zh: "阴阳的'消长转化'在系统行为中体现为什么？",
        en: "What does the 'waxing and waning' of yin-yang manifest as in system behavior?",
      },
      options: [
        { zh: "一次性事件", en: "A one-time event" },
        { zh: "动态平衡与自我调节", en: "Dynamic equilibrium and self-regulation" },
        { zh: "永久增长", en: "Permanent growth" },
        { zh: "随机波动", en: "Random fluctuation" },
      ],
      correctIndex: 1,
      explanation: {
        zh: "阴阳消长不是无规律的随机波动，而是系统自我调节的动态平衡——就像生态系统中的捕食者-猎物循环、经济周期中的繁荣与衰退，都是阴阳消长的系统表现。",
        en: "Yin-yang waxing and waning is not random fluctuation but dynamic equilibrium through self-regulation — like predator-prey cycles in ecosystems or boom-bust in economic cycles, all are systemic expressions of yin-yang dynamics.",
      },
    },
  ],

  "artificial-intelligence": [
    { id: "ai-1", question: { zh: "GAN中生成器和判别器分别对应阴阳的什么？", en: "In GANs, what do the generator and discriminator correspond to in yin-yang?" }, options: [{ zh: "生成器=阳，判别器=阴", en: "Generator=yang, Discriminator=yin" }, { zh: "生成器=阴（创造隐藏），判别器=阳（判断揭示）", en: "Generator=yin (creating), Discriminator=yang (judging)" }, { zh: "两者都是阳", en: "Both are yang" }, { zh: "两者都是阴", en: "Both are yin" }], correctIndex: 1, explanation: { zh: "生成器（阴）和判别器（阳）互相博弈训练，正如'阴阳相推而生变化'。", en: "Generator (yin) and discriminator (yang) train through competition — 'yin and yang push each other to change.'" } },
    { id: "ai-2", question: { zh: "强化学习的核心困境是什么？", en: "What is the core dilemma in reinforcement learning?" }, options: [{ zh: "速度vs精度", en: "Speed vs accuracy" }, { zh: "探索vs利用（阴阳动态平衡）", en: "Exploration vs exploitation (yin-yang dynamic balance)" }, { zh: "数据vs算法", en: "Data vs algorithm" }, { zh: "训练vs测试", en: "Training vs testing" }], correctIndex: 1, explanation: { zh: "探索未知（阴）与利用已知（阳）之间需要持续调节，这正是太极图的动态平衡。", en: "Balancing exploration (yin) and exploitation (yang) is exactly the dynamic equilibrium of Taiji." } },
    { id: "ai-3", question: { zh: "AlphaGo的核心算法MCTS在做什么？", en: "What does AlphaGo's MCTS algorithm do?" }, options: [{ zh: "穷举所有走法", en: "Enumerate all moves" }, { zh: "在广泛搜索（阴）和深入计算（阳）之间平衡", en: "Balance broad search (yin) and deep calculation (yang)" }, { zh: "只模仿人类棋谱", en: "Only imitate humans" }, { zh: "随机选择", en: "Choose randomly" }], correctIndex: 1, explanation: { zh: "MCTS在探索与利用之间动态平衡，是AlphaGo超越人类的关键。", en: "MCTS dynamically balances exploration and exploitation — key to AlphaGo surpassing humans." } },
  ],

  "cosmology": [
    { id: "cosmo-1", question: { zh: "大爆炸在太极哲学中对应什么？", en: "What does the Big Bang correspond to in Taiji philosophy?" }, options: [{ zh: "阴阳平衡", en: "Yin-yang balance" }, { zh: "无极生太极（从'无'中诞生宇宙）", en: "Wuji gives birth to Taiji" }, { zh: "阴阳消长", en: "Yin-yang waxing-waning" }, { zh: "天人合一", en: "Heaven-human unity" }], correctIndex: 1, explanation: { zh: "138亿年前宇宙从奇点中诞生——从'无极'状态中产生了我们的'太极'宇宙。", en: "13.8B years ago, the universe was born from singularity — from 'Wuji' emerged our 'Taiji' universe." } },
    { id: "cosmo-2", question: { zh: "可见物质占宇宙总质能的多少？", en: "What % of the universe is visible matter?" }, options: [{ zh: "约50%", en: "~50%" }, { zh: "约5%", en: "~5%" }, { zh: "约95%", en: "~95%" }, { zh: "约27%", en: "~27%" }], correctIndex: 1, explanation: { zh: "可见物质仅5%，暗物质27%，暗能量68%——宇宙绝大部分是'阴'（不可见的）。", en: "Visible: 5%, dark matter: 27%, dark energy: 68% — the universe is overwhelmingly 'yin' (invisible)." } },
    { id: "cosmo-3", question: { zh: "物质-反物质不对称叫什么？", en: "What is the matter-antimatter asymmetry called?" }, options: [{ zh: "CPT对称", en: "CPT symmetry" }, { zh: "CP破缺（电荷-宇称破缺）", en: "CP violation" }, { zh: "暗能量", en: "Dark energy" }, { zh: "量子涨落", en: "Quantum fluctuation" }], correctIndex: 1, explanation: { zh: "每10亿对粒子-反粒子中物质多1个——正是这十亿分之一的'阴阳不对等'留下了构建可见宇宙的物质。", en: "1 extra matter particle per billion pairs — this one-in-a-billion yin-yang imbalance left the material to build the visible universe." } },
  ],

  "psychology": [
    { id: "psych-1", question: { zh: "哪位心理学家从《易经》发现了'共时性'？", en: "Which psychologist discovered 'synchronicity' from the I Ching?" }, options: [{ zh: "弗洛伊德", en: "Freud" }, { zh: "卡尔·荣格", en: "Carl Jung" }, { zh: "斯金纳", en: "Skinner" }, { zh: "马斯洛", en: "Maslow" }], correctIndex: 1, explanation: { zh: "荣格通过《易经》发展出'共时性'——非因果但有意义的巧合，太极式的万物感应。", en: "Jung developed 'synchronicity' from the I Ching — acausal yet meaningful connections, Taiji-style universal resonance." } },
    { id: "psych-2", question: { zh: "荣格模型中意识和无意识分别对应什么？", en: "What do consciousness and unconscious correspond to in Jung's model?" }, options: [{ zh: "意识=阴，无意识=阳", en: "Consciousness=yin, Unconscious=yang" }, { zh: "意识=阳（理性光明），无意识=阴（直觉幽暗）", en: "Consciousness=yang (rational), Unconscious=yin (intuitive)" }, { zh: "两者都是混合体", en: "Both are mixed" }, { zh: "无阴阳对应", en: "No correspondence" }], correctIndex: 1, explanation: { zh: "意识是阳——理性光明；无意识是阴——直觉幽暗。心理健康在于两者的整合（个性化=阴阳合一）。", en: "Consciousness=yang (rational light); Unconscious=yin (intuitive shadow). Mental health = integration (Individuation = yin-yang unity)." } },
    { id: "psych-3", question: { zh: "正念冥想的太极智慧是什么？", en: "What is the Taiji wisdom of mindfulness?" }, options: [{ zh: "驱逐所有负念", en: "Expel all negative thoughts" }, { zh: "观察不评判——在阴阳间找动态觉察空间", en: "Observe without judging — find dynamic awareness between yin-yang" }, { zh: "只关注积极", en: "Only focus on positive" }, { zh: "进入无意识", en: "Enter unconscious state" }], correctIndex: 1, explanation: { zh: "不抓住（阳的执着）也不推开（阴的排斥），在S曲线中间态找到觉察与接纳的平衡。", en: "Neither grasping (yang) nor rejecting (yin) — find the balance of awareness and acceptance in the S-curve's middle." } },
  ],

  "biology": [
    { id: "bio-1", question: { zh: "DNA双螺旋和太极图有什么相似？", en: "How are DNA and Taiji diagram similar?" }, options: [{ zh: "都是圆形", en: "Both are circular" }, { zh: "两条互补链缠绕，每链含另一链信息——阴阳互含", en: "Two complementary strands, each contains the other — yin-yang mutual containment" }, { zh: "无关联", en: "No connection" }, { zh: "都用二进制", en: "Both use binary" }], correctIndex: 1, explanation: { zh: "DNA双链互补配对，每链是另一条的'反版'——太极图'阴中含阳、阳中含阴'的分子级实现。", en: "DNA's complementary strands — each is the 'negative' of the other — molecular realization of 'yin contains yang, yang contains yin.'" } },
    { id: "bio-2", question: { zh: "表观遗传学揭示的真理是什么？", en: "What truth does epigenetics reveal?" }, options: [{ zh: "基因决定一切", en: "Genes determine everything" }, { zh: "基因=乐谱，环境=演奏——基因(阴)与环境(阳)的持续对话", en: "Genes=score, environment=performance — gene (yin) and environment (yang) dialogue" }, { zh: "环境无影响", en: "No environmental effect" }, { zh: "表达是固定的", en: "Expression is fixed" }], correctIndex: 1, explanation: { zh: "同卵双胞胎相同DNA可产生不同结果——生命是基因（阴）与环境（阳）的持续对话。", en: "Identical twins' same DNA can produce different outcomes — life is a continuous gene (yin) and environment (yang) dialogue." } },
    { id: "bio-3", question: { zh: "免疫系统的阴阳对应是什么？", en: "What is the immune system's yin-yang?" }, options: [{ zh: "先天=阳，适应=阴", en: "Innate=yang, Adaptive=yin" }, { zh: "先天=阴（古老非特异），适应=阳（精准特异记忆）", en: "Innate=yin (ancient, non-specific), Adaptive=yang (precise, memory)" }, { zh: "无对应", en: "No correspondence" }, { zh: "都是阴", en: "Both are yin" }], correctIndex: 1, explanation: { zh: "先天免疫（阴——快速古老）与适应性免疫（阳——精准记忆）的平衡决定健康。", en: "Balance between innate (yin — rapid, ancient) and adaptive (yang — precise, memory-based) immunity determines health." } },
  ],

  "computer-science": [
    { id: "cs-1", question: { zh: "布尔代数AND/OR/NOT在太极中对应什么？", en: "What do Boolean AND/OR/NOT correspond to in Taiji?" }, options: [{ zh: "AND=阳(交)、OR=阴(合)、NOT=转化", en: "AND=yang(intersect), OR=yin(union), NOT=transform" }, { zh: "都对应阳", en: "All yang" }, { zh: "都对应阴", en: "All yin" }, { zh: "无对应", en: "None" }], correctIndex: 0, explanation: { zh: "AND（相交）、OR（相合）、NOT（转化）——三种基本逻辑精确映射了阴阳的三种基本关系。", en: "AND (intersection), OR (union), NOT (transformation) — the three basic logic operations map to the three basic yin-yang relationships." } },
    { id: "cs-2", question: { zh: "德·摩根定律展示了AND和OR之间的什么关系？", en: "What do De Morgan's Laws show about AND and OR?" }, options: [{ zh: "两者相同", en: "They are identical" }, { zh: "AND和OR通过NOT互相转化——阴阳互化", en: "AND and OR transform via NOT — yin-yang transformation" }, { zh: "两者互斥", en: "They are exclusive" }, { zh: "AND更基础", en: "AND is more basic" }], correctIndex: 1, explanation: { zh: "NOT(A AND B)=(NOT A) OR (NOT B)。AND和OR通过NOT互相转化——逻辑世界中最精确的阴阳互化定律。", en: "NOT(A AND B)=(NOT A) OR (NOT B). AND and OR transform through NOT — logic's most precise yin-yang transformation law." } },
    { id: "cs-3", question: { zh: "P vs NP问题在太极视角下意味着什么？", en: "What does P vs NP mean from a Taiji view?" }, options: [{ zh: "计算世界完全对称", en: "Perfectly symmetric computing" }, { zh: "'验证'(阳)与'发现'(阴)的根本不对称", en: "Fundamental asymmetry between verifying (yang) and discovering (yin)" }, { zh: "所有问题可快速解决", en: "All problems can be solved quickly" }, { zh: "无规律", en: "No patterns" }], correctIndex: 1, explanation: { zh: "如果P≠NP，'判断'永远比'创造'容易——太极的核心洞见：阴阳不对等驱动一切运动变化。", en: "If P≠NP, 'judging' is forever easier than 'creating' — Taiji's core insight: yin-yang imbalance drives all motion and change." } },
  ],
};
