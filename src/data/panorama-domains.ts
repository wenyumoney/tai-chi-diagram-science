import type { PanoramaNode } from "./types";

export const panoramaNodes: PanoramaNode[] = [
  // Core 6 domains — isCore: true
  {
    id: "core-math",
    name: { zh: "太极八卦与数学", en: "Taiji Bagua & Mathematics" },
    description: {
      zh: "八卦即3位二进制，莱布尼茨从易经中发现二进制的数学根源",
      en: "Bagua as 3-bit binary; Leibniz discovered the mathematical roots of binary in the I Ching",
    },
    category: "math",
    connections: ["core-quantum", "core-info", "ext-cs", "ext-linguistics"],
    isCore: true,
    coreSlug: "taiji-math",
  },
  {
    id: "core-quantum",
    name: { zh: "量子纠缠与互补原理", en: "Quantum Entanglement & Complementarity" },
    description: {
      zh: "玻尔的族徽上是太极图——量子互补原理的哲学表达",
      en: "Bohr's coat of arms bears the Taiji — a philosophical expression of quantum complementarity",
    },
    category: "physics",
    connections: ["core-math", "core-symmetry", "ext-cosmology", "ext-chemistry"],
    isCore: true,
    coreSlug: "quantum-entanglement",
  },
  {
    id: "core-symmetry",
    name: { zh: "对称性破缺", en: "Symmetry Breaking" },
    description: {
      zh: "宇宙从完美对称中诞生，但不完美（破缺）让万物得以存在",
      en: "The universe was born from perfect symmetry, but imperfection (breaking) allows all things to exist",
    },
    category: "physics",
    connections: ["core-quantum", "core-systems", "ext-cosmology", "ext-chemistry"],
    isCore: true,
    coreSlug: "symmetry-breaking",
  },
  {
    id: "core-info",
    name: { zh: "信息论", en: "Information Theory" },
    description: {
      zh: "香农熵=不确定性——信息是阴（未知）向阳（已知）的转化",
      en: "Shannon entropy = uncertainty — information is the transformation of yin (unknown) to yang (known)",
    },
    category: "math",
    connections: ["core-math", "core-chaos", "ext-cs", "ext-neuroscience"],
    isCore: true,
    coreSlug: "information-theory",
  },
  {
    id: "core-chaos",
    name: { zh: "混沌与分形", en: "Chaos & Fractals" },
    description: {
      zh: "确定性的混沌=有序中的无序；分形=太极图中的小太极",
      en: "Deterministic chaos = disorder within order; fractals = the small Taiji within the Taiji",
    },
    category: "math",
    connections: ["core-info", "core-systems", "ext-meteorology", "ext-biology"],
    isCore: true,
    coreSlug: "chaos-fractal",
  },
  {
    id: "core-systems",
    name: { zh: "系统科学与涌现", en: "Systems Science & Emergence" },
    description: {
      zh: "整体>部分之和——阴阳互动涌现出超越二元的新秩序",
      en: "Whole > sum of parts — yin-yang interaction generates a new order transcending duality",
    },
    category: "interdisciplinary",
    connections: ["core-symmetry", "core-chaos", "ext-biology", "ext-economics", "ext-sociology"],
    isCore: true,
    coreSlug: "systems-science",
  },
  // Extended 15 domains — isCore: false
  {
    id: "ext-cosmology",
    name: { zh: "宇宙学与暗能量", en: "Cosmology & Dark Energy" },
    description: {
      zh: "宇宙膨胀与暗能量 — 看似空无的真空（阴）实际上蕴含巨大的能量（阳）",
      en: "Cosmic expansion and dark energy — seemingly empty vacuum (yin) actually contains enormous energy (yang)",
    },
    category: "physics",
    connections: ["core-quantum", "core-symmetry", "ext-geology"],
    isCore: false,
  },
  {
    id: "ext-biology",
    name: { zh: "生物系统与自组织", en: "Biological Systems & Self-Organization" },
    description: {
      zh: "从单细胞到多细胞生命 — 细胞分化（阴→阳分化）与组织自组织的分子基础",
      en: "From single-cell to multicellular life — cell differentiation and molecular basis of tissue self-organization",
    },
    category: "biology",
    connections: ["core-chaos", "core-systems", "ext-medicine", "ext-genetics"],
    isCore: false,
  },
  {
    id: "ext-neuroscience",
    name: { zh: "意识与无意识", en: "Consciousness & Unconsciousness" },
    description: {
      zh: "意识（阳）与无意识（阴） — 二者不可分离，共同构成心智的整体",
      en: "Consciousness (yang) and unconscious (yin) — inseparable, together forming the whole of mind",
    },
    category: "neuroscience",
    connections: ["core-info", "ext-psychology", "ext-biology"],
    isCore: false,
  },
  {
    id: "ext-psychology",
    name: { zh: "荣格共时性原理", en: "Jung's Synchronicity" },
    description: {
      zh: "荣格受到易经启发提出'共时性' — 无因果关联的事件通过意义共振相连",
      en: "Jung, inspired by the I Ching, proposed 'synchronicity' — acausally connected events linked through meaning resonance",
    },
    category: "psychology",
    connections: ["ext-neuroscience", "ext-art"],
    isCore: false,
  },
  {
    id: "ext-economics",
    name: { zh: "经济周期与市场波动", en: "Economic Cycles & Market Dynamics" },
    description: {
      zh: "繁荣（阳）与衰退（阴）的交替 — 市场在非平衡态中自我调节",
      en: "Boom (yang) and bust (yin) alternation — markets self-regulate in non-equilibrium states",
    },
    category: "economics",
    connections: ["core-systems", "ext-sociology", "ext-cs"],
    isCore: false,
  },
  {
    id: "ext-sociology",
    name: { zh: "社会网络与集体行为", en: "Social Networks & Collective Behavior" },
    description: {
      zh: "个体选择（阴→阳流动）在宏观层面涌现出社会秩序和规范",
      en: "Individual choices (yin→yang flow) produce social order and norms at the macro level through emergence",
    },
    category: "sociology",
    connections: ["core-systems", "ext-economics", "ext-linguistics"],
    isCore: false,
  },
  {
    id: "ext-cs",
    name: { zh: "人工智能与神经网络", en: "AI & Neural Networks" },
    description: {
      zh: "深度学习 — 0/1（阴阳）信号的层层涌现产生智能行为",
      en: "Deep learning — layers of 0/1 (yin-yang) signals produce intelligent behavior through emergence",
    },
    category: "computer-science",
    connections: ["core-math", "core-info", "ext-neuroscience"],
    isCore: false,
  },
  {
    id: "ext-genetics",
    name: { zh: "表观遗传学", en: "Epigenetics" },
    description: {
      zh: "基因（阳=表达）受环境（阴=调控）的影响 — 阴阳互动超越固定编码",
      en: "Genes (yang = expression) influenced by environment (yin = regulation) — yin-yang interaction transcends fixed coding",
    },
    category: "biology",
    connections: ["ext-biology", "ext-medicine"],
    isCore: false,
  },
  {
    id: "ext-chemistry",
    name: { zh: "化学振荡与BZ反应", en: "Chemical Oscillations & BZ Reaction" },
    description: {
      zh: "自催化反应中离子浓度的周期性涨落（氧化=阳/还原=阴）形成时空图案",
      en: "Periodic ion concentration fluctuations (oxidation=yang/reduction=yin) in autocatalytic reactions form spatiotemporal patterns",
    },
    category: "chemistry",
    connections: ["core-symmetry", "ext-biology"],
    isCore: false,
  },
  {
    id: "ext-geology",
    name: { zh: "板块构造与地质韵律", en: "Plate Tectonics & Geological Rhythms" },
    description: {
      zh: "地壳运动 — 挤压（阴）与扩张（阳）的亿年对话塑造了地球面貌",
      en: "Crustal movement — billion-year dialogue between compression (yin) and expansion (yang) shaping Earth's surface",
    },
    category: "geology",
    connections: ["ext-cosmology", "ext-meteorology"],
    isCore: false,
  },
  {
    id: "ext-meteorology",
    name: { zh: "气候系统与非线性", en: "Climate Systems & Nonlinearity" },
    description: {
      zh: "气候变化 — 太阳辐射（阳）与海洋吸收（阴）的非线性平衡引发气候模态",
      en: "Climate change — nonlinear balance between solar radiation (yang) and ocean absorption (yin) produces climate patterns",
    },
    category: "earth-science",
    connections: ["core-chaos", "ext-geology", "ext-biology"],
    isCore: false,
  },
  {
    id: "ext-music",
    name: { zh: "音乐与和谐理论", en: "Music & Harmony Theory" },
    description: {
      zh: "协和与不协和 — 音符的'阴阳'对立统一创造旋律的情感张力",
      en: "Consonance and dissonance — the yin-yang unity of opposites in musical notes creates emotional tension in melody",
    },
    category: "arts",
    connections: ["ext-psychology", "ext-art", "core-math"],
    isCore: false,
  },
  {
    id: "ext-art",
    name: { zh: "视觉艺术中的辩证", en: "Dialectics in Visual Art" },
    description: {
      zh: "正空间与负空间 — 中国画的'留白'（阴）与'着墨'（阳）构成艺术整体",
      en: "Positive and negative space — 'blank space' (yin) and 'ink' (yang) in Chinese painting form the artistic whole",
    },
    category: "arts",
    connections: ["ext-psychology", "ext-music", "ext-linguistics"],
    isCore: false,
  },
  {
    id: "ext-linguistics",
    name: { zh: "语言符号学", en: "Linguistic Semiotics" },
    description: {
      zh: "能指与所指 — 索绪尔的二元符号模型与阴阳二元论的结构同构",
      en: "Signifier and signified — structural isomorphism between Saussure's binary sign model and yin-yang dualism",
    },
    category: "humanities",
    connections: ["ext-sociology", "ext-art", "core-math"],
    isCore: false,
  },
  {
    id: "ext-medicine",
    name: { zh: "中医系统观", en: "Systems View in Chinese Medicine" },
    description: {
      zh: "阴阳平衡作为健康模型 — 现代系统生物学的先驱，将人体视为动态平衡网络",
      en: "Yin-yang balance as health model — precursor to modern systems biology viewing the body as a dynamic equilibrium network",
    },
    category: "medicine",
    connections: ["ext-biology", "ext-genetics", "core-systems"],
    isCore: false,
  },
];
