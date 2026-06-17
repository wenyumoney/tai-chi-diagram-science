import type { DomainContent } from "./types";

export const domains: DomainContent[] = [
  {
    slug: "taiji-math",
    order: 1,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="17" r="2"/></svg>`,
    title: { zh: "太极八卦与数学", en: "Taiji Bagua & Mathematics" },
    tagline: {
      zh: "八卦即三位二进制——莱布尼茨从易经中发现二进制的灵感",
      en: "Bagua is 3-bit binary — how Leibniz found inspiration for binary arithmetic in the I Ching",
    },
    overview: {
      zh: "太极八卦图不仅是哲学符号，更是一套精密的数学系统。八卦的每一卦由三条爻线组成——阳爻（—）与阴爻（--），恰好对应二进制中的1和0。三爻排列组合形成八种卦象，恰如三位二进制数从000到111的八种状态。\n\n德国数学家莱布尼茨在17世纪通过耶稣会传教士接触到《易经》，惊讶地发现六十四卦的排列与他正在研究的二进制算术完全一致。他在《论中国人的自然神学》中写道：'这种算术与4000年前中国最早的君主伏羲所创的符号体系完全吻合。'这一发现不仅证实了二进制算术的古老渊源，更揭示了太极图思想与数学基础的深层共鸣。\n\n更深层地看，布尔代数中的与/或/非运算、群论中六十四卦置换的群结构、组合数学中阴阳二元素的所有组合可能性——这些现代数学的核心概念，都可以在太极八卦系统中找到对应的雏形。阴阳二元不是粗糙的对立，而是数学中最根本的二元性（duality）——0与1、真与假、开与关。",
      en: "The Taiji Bagua diagram is not merely a philosophical symbol — it is a precise mathematical system. Each of the eight trigrams consists of three lines — yang (—) and yin (--), precisely corresponding to binary digits 1 and 0. The three-line combinations produce eight trigrams, exactly as a three-bit binary number yields eight states from 000 to 111.\n\nGerman mathematician Leibniz encountered the I Ching through Jesuit missionaries in the 17th century and was astonished to discover that the 64 hexagrams matched his work on binary arithmetic perfectly. He wrote in 'On the Natural Theology of the Chinese': 'This arithmetic coincides perfectly with the system of symbols created by Fu Xi, the first Chinese monarch, 4000 years earlier.' This discovery not only confirmed binary arithmetic's ancient roots but revealed the deep resonance between Taiji thought and the foundations of mathematics.\n\nMore profoundly, Boolean algebra (AND/OR/NOT), group theory (the symmetry group of hexagram transformations), and combinatorics (all possible combinations of yin-yang elements) — these core concepts of modern mathematics all find corresponding prototypes in the Taiji Bagua system. The yin-yang binary is not crude opposition but the most fundamental duality in mathematics: 0 and 1, true and false, on and off.",
    },
    taijiConnections: [
      {
        point: {
          zh: "阴爻与阳爻 — 二进制位元的雏形，阴阳即0与1",
          en: "Yin and Yang lines — the prototype of binary bits; yin-yang is 0 and 1",
        },
      },
      {
        point: {
          zh: "八卦的排列组合 — 组合数学中2³=8种可能性",
          en: "The eight trigrams — the 2³=8 combinatorial possibilities of three yin-yang lines",
        },
      },
      {
        point: {
          zh: "六十四卦的循环 — 模运算与周期性的数学表达",
          en: "The 64 hexagram cycle — modular arithmetic and mathematical periodicity",
        },
      },
      {
        point: {
          zh: "太极图S曲线 — 连续统与实数系统的几何隐喻",
          en: "The Taiji S-curve — a geometric metaphor for the continuum and real number system",
        },
      },
    ],
    keyExamples: [
      {
        title: {
          zh: "莱布尼茨与二进制",
          en: "Leibniz and Binary Arithmetic",
        },
        description: {
          zh: "1701年，莱布尼茨从传教士白晋处获得《易经》六十四卦图，发现卦序与二进制数0-63完全对应。他随后发表《二进制算术的解释》，并在书信中多次引用伏羲八卦作为二进制思想最古老的来源。",
          en: "In 1701, Leibniz received the 64 hexagram diagram from missionary Joachim Bouvet and discovered the hexagram order perfectly matched binary numbers 0-63. He subsequently published 'Explanation of Binary Arithmetic' and repeatedly cited Fu Xi's Bagua as the oldest source of binary thought.",
        },
      },
      {
        title: {
          zh: "布尔代数与阴阳逻辑",
          en: "Boolean Algebra and Yin-Yang Logic",
        },
        description: {
          zh: "布尔代数中的AND（与）对应阴阳相交、OR（或）对应阴阳相合、NOT（非）对应阴阳互转。太极图中的互补逻辑（有阴必有阳，阴阳互含）为现代逻辑运算提供了最直观的哲学基础。",
          en: "In Boolean algebra, AND corresponds to yin-yang intersection, OR to yin-yang union, NOT to yin-yang transformation. The complementary logic in the Taiji diagram — where yin contains yang and vice versa — provides the most intuitive philosophical foundation for modern logical operations.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "阴阳二元是万物的基本编码单元",
          en: "Yin-yang duality as the basic coding unit of all things",
        },
        scienceAspect: {
          zh: "0/1比特是信息的最小单位，一切数字运算的原子",
          en: "0/1 bits are the smallest unit of information, the atom of all digital computation",
        },
      },
      {
        taijiAspect: {
          zh: "八卦六十四卦穷尽三爻/六爻的所有排列",
          en: "Eight trigrams exhaust all permutations of three yin-yang lines",
        },
        scienceAspect: {
          zh: "n位二进制可表示2^n种状态，组合爆炸是现代计算的基础",
          en: "n-bit binary can represent 2^n states; combinatorial explosion is the basis of modern computing",
        },
      },
      {
        taijiAspect: {
          zh: "太极图旋转变化、周而复始",
          en: "The Taiji diagram rotates cyclically, completing cycles",
        },
        scienceAspect: {
          zh: "模运算与群论中循环群的结构——太极图为有限群论提供了连续几何模型",
          en: "Modular arithmetic and cyclic group structure — the Taiji diagram provides a continuous geometric model for finite group theory",
        },
      },
    ],
    references: [
      {
        title: "Leibniz-Bouvet Correspondence (1701)",
        url: "https://en.wikipedia.org/wiki/Leibniz%27s_binary_system",
        type: "wikipedia",
      },
      {
        title: "The Mathematics of the I Ching",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S0315086008000470",
        type: "paper",
      },
      {
        title: "Boolean Algebra — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/boolalg-math/",
        type: "article",
      },
      {
        title:
          "How the I Ching Inspired Leibniz's Binary System — Scientific American",
        url: "https://www.scientificamerican.com/article/how-the-i-ching-inspired-leibnizs-binary-system/",
        type: "article",
      },
    ],
    color: "#d4a853",
  },
  {
    slug: "quantum-entanglement",
    order: 2,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M7 12h10" stroke-dasharray="1 1"/></svg>`,
    title: {
      zh: "量子纠缠与互补原理",
      en: "Quantum Entanglement & Complementarity",
    },
    tagline: {
      zh: "玻尔将太极图刻在族徽上——互补性正是量子力学的核心",
      en: "Bohr engraved the Taiji diagram on his coat of arms — complementarity is the core of quantum mechanics",
    },
    overview: {
      zh: "量子力学与太极图之间的共鸣，也许是现代科学中最令人惊叹的跨文化交汇。尼尔斯·玻尔——量子力学的奠基人之一——在1937年访问中国后，将太极图刻在了自己的家族族徽上，并附上拉丁铭文'Contraria Sunt Complementa'（相反者相成）。这不是装饰性的文化引用，而是对量子世界最核心洞见的直接表达。\n\n量子力学告诉我们，光既是波也是粒子——波粒二象性。电子具有自旋，但在被测量之前，它的自旋方向处于'上'与'下'的叠加态（superposition），正如太极图中阴中含阳、阳中含阴。EPR纠缠对（Einstein-Podolsky-Rosen）中，两个粒子无论相隔多远，对其中一个的测量会瞬时决定另一个的状态——这种非局域关联（nonlocal correlation）惊人地呼应了'阴阳互根'的古老智慧。\n\n玻尔的互补原理（Complementarity Principle）指出，波与粒子的描述是互补而非矛盾的——两种图景缺一不可，正如太极图中黑白两色的互相依存。海森堡的不确定性原理进一步揭示：位置和动量不能同时精确知晓，就像太极图中的阴阳消长——此消则彼长。",
      en: "The resonance between quantum mechanics and the Taiji diagram is perhaps the most astonishing cross-cultural convergence in modern science. Niels Bohr — one of the founders of quantum mechanics — engraved the Taiji diagram on his family coat of arms after visiting China in 1937, with the Latin inscription 'Contraria Sunt Complementa' (opposites are complementary). This was not decorative cultural reference but a direct expression of the deepest insight in the quantum world.\n\nQuantum mechanics tells us that light is both wave and particle — wave-particle duality. An electron has spin, but before measurement its spin direction exists in a superposition of 'up' and 'down', just as the Taiji diagram shows yin containing yang and yang containing yin. In EPR entangled pairs (Einstein-Podolsky-Rosen), two particles, no matter how far apart, exhibit instantaneous correlation upon measurement of one — this nonlocal correlation astonishingly echoes the ancient wisdom of 'yin-yang mutual dependence.'\n\nBohr's Complementarity Principle states that wave and particle descriptions are complementary rather than contradictory — both pictures are essential, just as black and white in the Taiji diagram depend on each other. Heisenberg's Uncertainty Principle further reveals that position and momentum cannot be simultaneously known with precision, like the waxing and waning of yin and yang — when one increases, the other decreases.",
    },
    taijiConnections: [
      {
        point: {
          zh: "阴阳叠加（阴中有阳，阳中有阴）→ 量子叠加态",
          en: "Yin-yang superposition (yin contains yang, vice versa) → quantum superposition",
        },
      },
      {
        point: {
          zh: "阴阳互根互生 → 量子纠缠的非局域关联",
          en: "Yin-yang mutual dependence → nonlocal correlation in quantum entanglement",
        },
      },
      {
        point: {
          zh: "阴阳对立统一 → 波粒二象性与互补原理",
          en: "Yin-yang unity of opposites → wave-particle duality and complementarity principle",
        },
      },
      {
        point: {
          zh: "太极图动态旋转 → 量子态的连续演化（时间演化算子）",
          en: "Rotating Taiji diagram → continuous evolution of quantum states (time evolution operator)",
        },
      },
    ],
    keyExamples: [
      {
        title: {
          zh: "玻尔的太极族徽",
          en: "Bohr's Taiji Coat of Arms",
        },
        description: {
          zh: "1947年，玻尔被丹麦国王授予大象勋章时，设计了自己的族徽——中央正是太极图。他选择'相反者相成'作为铭文，因为互补原理是他毕生学术追求的核心。这一族徽至今仍在弗雷登斯堡城堡的骑士礼拜堂中展示。",
          en: "In 1947, when awarded the Order of the Elephant by the King of Denmark, Bohr designed his coat of arms with the Taiji diagram at its center. He chose 'opposites are complementary' as his motto because the complementarity principle was central to his lifelong academic pursuit. The coat of arms is still displayed in the Knight's Chapel at Frederiksborg Castle.",
        },
      },
      {
        title: {
          zh: "EPR佯谬与贝尔不等式",
          en: "EPR Paradox and Bell's Inequality",
        },
        description: {
          zh: "爱因斯坦、波多尔斯基和罗森在1935年提出EPR佯谬，试图证明量子力学不完备。但1964年贝尔不等式和后续实验（Aspect实验，1982）证实了量子纠缠的非局域性——两个纠缠粒子的关联超越了时空限制，这正是'阴阳互根'在量子层面的精确实现。",
          en: "Einstein, Podolsky, and Rosen proposed the EPR paradox in 1935, attempting to prove quantum mechanics incomplete. But Bell's inequality (1964) and subsequent experiments (Aspect experiment, 1982) confirmed the nonlocality of quantum entanglement — the correlation between two entangled particles transcends spacetime limits, precisely realizing 'yin-yang mutual dependence' at the quantum level.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "太极图中阴眼含阳、阳眼含阴",
          en: "In the Taiji diagram, the yin dot contains yang, the yang dot contains yin",
        },
        scienceAspect: {
          zh: "量子叠加态——在测量前，粒子同时处于多种可能状态",
          en: "Quantum superposition — before measurement, a particle exists in multiple possible states simultaneously",
        },
      },
      {
        taijiAspect: {
          zh: "阴阳不可分割、互为存在条件",
          en: "Yin and yang are inseparable, each is the condition for the other's existence",
        },
        scienceAspect: {
          zh: "量子纠缠——测量一个粒子立即确定另一个粒子的状态，无论距离",
          en: "Quantum entanglement — measuring one particle instantly determines the state of another, regardless of distance",
        },
      },
      {
        taijiAspect: {
          zh: "阴阳的消长转化是一个连续动态过程",
          en: "The waxing and waning of yin and yang is a continuous dynamic process",
        },
        scienceAspect: {
          zh: "波函数的时间演化是连续而非跳跃的（薛定谔方程）",
          en: "The time evolution of the wave function is continuous, not discrete (Schrödinger equation)",
        },
      },
    ],
    references: [
      {
        title: "Complementarity — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/complementarity/",
        type: "article",
      },
      {
        title: "Niels Bohr's Coat of Arms — Niels Bohr Archive",
        url: "https://www.nbarchive.dk/collections/coat-of-arms/",
        type: "article",
      },
      {
        title: "Bell's Theorem — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/bell-theorem/",
        type: "article",
      },
      {
        title:
          "Experimental Test of Bell's Inequalities — Aspect et al. (1982)",
        url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.1804",
        type: "paper",
      },
    ],
    color: "#60a5fa",
  },
  {
    slug: "symmetry-breaking",
    order: 3,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>`,
    title: { zh: "对称性破缺", en: "Symmetry Breaking" },
    tagline: {
      zh: "宇宙从完美的对称中诞生——但不对称才让万物存在",
      en: "The universe was born from perfect symmetry — but asymmetry is what makes everything exist",
    },
    overview: {
      zh: "对称性在物理学中具有根本性的地位。物理定律在空间平移、时间平移、旋转下都保持对称——这是诺特定理（Noether's Theorem）的核心：每一种连续对称性都对应一个守恒定律。然而，宇宙之所以丰富多彩、之所以有物质（而不是等量的物质和反物质相互湮灭），恰恰是因为对称性被打破了。\n\n太极图的核心隐喻在这里无比精确：太极图中阴阳不对称地纠缠在一起——黑中有白、白中有黑，但整体图案并不是旋转对称的（只有旋转180度才恢复原状）。这种'有结构的非对称'与物理学家所说的'自发对称性破缺'惊人地相似：系统的物理定律是对称的，但系统的基态（最低能量态）却是不对称的。\n\n宇称不守恒（李政道和杨振宁，1956年诺贝尔奖）是对称性破缺的第一个重大发现——弱相互作用中左右不对称，吴健雄实验证实了这一点。希格斯机制（2013年诺贝尔奖）解释了基本粒子如何获得质量——当对称性在低能态被打破时，原本无质量的粒子'吃掉'了Goldstone玻色子而获得质量。从太极图中旋转的S曲线到宇宙中对称性破缺的级联——'不对称'不是缺陷，而是万物存在的前提。",
      en: "Symmetry holds a fundamental position in physics. Physical laws maintain symmetry under spatial translation, time translation, and rotation — this is the core of Noether's Theorem: every continuous symmetry corresponds to a conservation law. Yet the universe is rich and varied, and matter exists (rather than equal amounts of matter and antimatter annihilating each other) precisely because symmetry is broken.\n\nThe central metaphor of the Taiji diagram is remarkably precise here: yin and yang are asymmetrically entangled — black contains white, white contains black — but the overall pattern is not rotationally symmetric (it only returns to its original state after a 180-degree rotation). This 'structured asymmetry' bears striking resemblance to what physicists call 'spontaneous symmetry breaking': the physical laws of a system are symmetric, but the ground state (lowest energy state) is asymmetric.\n\nParity violation (Lee and Yang, 1956 Nobel Prize) was the first major discovery of symmetry breaking — left and right are not equivalent in weak interactions, confirmed by the Wu experiment. The Higgs mechanism (2013 Nobel Prize) explains how fundamental particles acquire mass — when symmetry breaks at low energies, originally massless particles 'eat' Goldstone bosons and gain mass. From the rotating S-curve in the Taiji diagram to the cascade of symmetry breaking in the cosmos — 'asymmetry' is not a defect but the prerequisite for all existence.",
    },
    taijiConnections: [
      {
        point: {
          zh: "太极图的整体结构既对称又不对称（旋转180度对称，但黑白色域不对称）→ 自发对称性破缺",
          en: "The Taiji diagram is both symmetric and asymmetric (180° rotation symmetric, but black/white domains are asymmetric) → spontaneous symmetry breaking",
        },
      },
      {
        point: {
          zh: "阴阳从无极（对称的虚空）中分化 → 宇宙从高度对称的早期态分化出结构",
          en: "Yin and yang differentiate from Wuji (symmetric void) → the universe differentiates structure from a highly symmetric early state",
        },
      },
      {
        point: {
          zh: "太极图中的平衡是动态平衡 → 对称性破缺后的稳定态本质上仍是动态的",
          en: "Balance in the Taiji diagram is dynamic balance → stable states after symmetry breaking remain essentially dynamic",
        },
      },
    ],
    keyExamples: [
      {
        title: {
          zh: "宇称不守恒",
          en: "Parity Violation",
        },
        description: {
          zh: "1956年，李政道和杨振宁提出弱相互作用中宇称可能不守恒。吴健雄随后通过钴-60实验证明：β衰变中发射的电子偏向一个方向，而非对称分布。自然界的左右对称并非铁律——这是'不对称'作为基本规律的首次确立。",
          en: "In 1956, Lee and Yang proposed that parity might not be conserved in weak interactions. Wu subsequently proved through the cobalt-60 experiment that electrons emitted in β-decay favor one direction rather than being symmetrically distributed. Left-right symmetry in nature is not inviolable — this was the first establishment of 'asymmetry' as a fundamental law.",
        },
      },
      {
        title: {
          zh: "希格斯机制",
          en: "The Higgs Mechanism",
        },
        description: {
          zh: "在极高能量下（宇宙早期），基本粒子都没有质量——这是完美的对称态。当宇宙冷却到一定温度，希格斯场的对称性自发破缺，粒子通过与希格斯场相互作用获得质量。Yin-yang differentiation from Wuji finds its most precise physics analogy here.",
          en: "At extremely high energies (early universe), fundamental particles have no mass — this is a perfectly symmetric state. When the universe cooled to a certain temperature, the symmetry of the Higgs field spontaneously broke, and particles acquired mass through interaction with the Higgs field. Yin-yang differentiation from Wuji finds its most precise physics analogy here.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "太极源于无极——从无差别的统一中分化阴阳",
          en: "Taiji arises from Wuji — yin and yang differentiate from an undifferentiated unity",
        },
        scienceAspect: {
          zh: "宇宙大统一理论——四种基本力在极高能量下统一，低能下分化",
          en: "Grand Unified Theory — the four fundamental forces unify at extreme energies and differentiate at low energies",
        },
      },
      {
        taijiAspect: {
          zh: "阴阳互相包含、无法完全分离",
          en: "Yin and yang contain each other and cannot be completely separated",
        },
        scienceAspect: {
          zh: "对称性破缺后，Goldstone玻色子被'吃掉'——破缺的痕迹仍留在物理中",
          en: "After symmetry breaking, Goldstone bosons are 'eaten' — traces of the broken symmetry remain in the physics",
        },
      },
    ],
    references: [
      {
        title: "Symmetry and Symmetry Breaking — Stanford Encyclopedia",
        url: "https://plato.stanford.edu/entries/symmetry-breaking/",
        type: "article",
      },
      {
        title:
          "The Discovery of Parity Nonconservation — Lee and Yang (1956)",
        url: "https://journals.aps.org/pr/abstract/10.1103/PhysRev.104.254",
        type: "paper",
      },
      {
        title: "The Higgs Boson — CERN",
        url: "https://home.cern/science/physics/higgs-boson",
        type: "article",
      },
      {
        title: "Noether's Theorem — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Noether%27s_theorem",
        type: "wikipedia",
      },
    ],
    color: "#a78bfa",
  },
  {
    slug: "information-theory",
    order: 4,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="6" width="16" height="12" rx="1"/><path d="M8 10h8"/><path d="M8 14h5"/></svg>`,
    title: { zh: "信息论", en: "Information Theory" },
    tagline: {
      zh: "香农熵就是不确定性的度量——信息=消除不确定性=阴阳从混沌到有序",
      en: "Shannon entropy measures uncertainty — information = eliminating uncertainty = yin-yang from chaos to order",
    },
    overview: {
      zh: "1948年，克劳德·香农发表《通信的数学理论》，创立了信息论。这篇论文的核心思想惊人地简洁：信息是'不确定性的消除'。一个系统的香农熵越高，其不确定性越大，包含的'信息量'（更准确地说，信息承载潜力）也越大。\n\n这个思想与太极图的哲学核心有着深刻的同构。太极图中，阴阳从无极（混沌、无差别、最大熵状态）中分化出来，形成可辨识的结构——这正是'不确定性消除'的过程。信息论中的比特（bit）是最基本的信息单位——它回答一个'是/否'问题——而这一元二元选择与阴阳的二元逻辑完全对应。\n\n更引人深思的是，香农熵的数学公式与玻尔兹曼熵（热力学中的熵）具有相同的形式，暗示着信息与物理世界的深层统一。物理学家约翰·惠勒提出'It from Bit'（万物源于比特）的假说——宇宙的基本构成可能不是物质或能量，而是信息。麦克斯韦妖——一个经典的'思想实验'——如果拥有信息（知道分子速度），就可以打破热力学第二定律；但信息本身是有熵代价的（Landauer原理）。信息、熵、不确定性——这些概念构成了一幅与太极图阴阳消长惊人一致的宇宙图景。",
      en: "In 1948, Claude Shannon published 'A Mathematical Theory of Communication,' founding information theory. The core insight of this paper is stunningly simple: information is 'the elimination of uncertainty.' The higher the Shannon entropy of a system, the greater its uncertainty and the greater its 'information content' (more precisely, its information-carrying potential).\n\nThis idea has a profound isomorphism with the philosophical core of the Taiji diagram. In the Taiji, yin and yang differentiate from Wuji (chaos, undifferentiated, maximum entropy state) to form recognizable structure — this is precisely the process of 'uncertainty elimination.' The bit in information theory is the most fundamental unit of information — it answers a yes/no question — and this elementary binary choice perfectly corresponds to the binary logic of yin and yang.\n\nEven more thought-provoking: the mathematical formula for Shannon entropy has the same form as Boltzmann entropy (in thermodynamics), suggesting a deep unity between information and the physical world. Physicist John Wheeler proposed the 'It from Bit' hypothesis — that the fundamental constitution of the universe may not be matter or energy but information. Maxwell's Demon — a classic thought experiment — could break the second law of thermodynamics if it possessed information (knowing molecular speeds); but information itself carries an entropy cost (Landauer's principle). Information, entropy, uncertainty — these concepts form a cosmic picture remarkably consistent with the yin-yang interplay of the Taiji diagram.",
    },
    taijiConnections: [
      {
        point: {
          zh: "1比特=一个阴阳选择 → 阴阳二元是信息的最小单位",
          en: "1 bit = one yin-yang choice → the yin-yang binary is the smallest unit of information",
        },
      },
      {
        point: {
          zh: "无极→太极（从混沌到有序）→ 熵减=信息获取",
          en: "Wuji → Taiji (from chaos to order) → entropy reduction = information acquisition",
        },
      },
      {
        point: {
          zh: "阴阳消长→ 信息在编码与传输中的动态变化",
          en: "Yin-yang waxing and waning → dynamic changes in information encoding and transmission",
        },
      },
      {
        point: {
          zh: "阴阳平衡→ 最优编码的信息密度（最短描述长度）",
          en: "Yin-yang balance → optimal encoding information density (minimum description length)",
        },
      },
    ],
    keyExamples: [
      {
        title: {
          zh: "香农熵公式 H = -Σ p(x) log p(x)",
          en: "Shannon Entropy Formula H = -Σ p(x) log p(x)",
        },
        description: {
          zh: "这个优雅的公式量化了不确定性。当所有事件等概率时熵最大（完全混乱——无极状态），当一个事件确定发生时熵为零（完全确定——信息已完全获取）。这与'无极而太极'——从混沌到有序的哲学叙事完全一致。",
          en: "This elegant formula quantifies uncertainty. Entropy is maximum when all events are equally likely (complete chaos — Wuji state), and zero when one event occurs with certainty (complete determination — information fully acquired). This perfectly matches the 'Wuji to Taiji' philosophical narrative — from chaos to order.",
        },
      },
      {
        title: {
          zh: "麦克斯韦妖与信息物理",
          en: "Maxwell's Demon and the Physics of Information",
        },
        description: {
          zh: "麦克斯韦想象一个'妖'能观察分子速度并选择性地开关隔板门，从而不消耗能量就将热分子和冷分子分开——似乎打破了热力学第二定律。但1961年，Landauer证明擦除1比特信息至少消耗kT·ln2的能量——信息是物理的，与熵等价。阴阳变化中的'有'与'无'在此获得了物理学上的精确意义。",
          en: "Maxwell imagined a 'demon' that could observe molecular speeds and selectively open/close a partition door, separating hot from cold molecules without expending energy — seemingly violating the second law of thermodynamics. But in 1961, Landauer proved that erasing 1 bit of information costs at least kT·ln2 of energy — information is physical, equivalent to entropy. The 'existence' and 'non-existence' in yin-yang transformations gain precise physical meaning here.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "阴阳未分的混沌（无极）→ 信息最贫乏/熵最大",
          en: "Undifferentiated chaos (Wuji) → information poorest / entropy maximum",
        },
        scienceAspect: {
          zh: "最大熵态——系统完全随机，无法预测，信息量为零",
          en: "Maximum entropy state — system is completely random, unpredictable, information content is zero",
        },
      },
      {
        taijiAspect: {
          zh: "阴阳分明、各居其位 → 信息清晰/熵最小",
          en: "Yin and yang clearly separated, each in its place → information clear / entropy minimum",
        },
        scienceAspect: {
          zh: "低熵态——结构明确，可预测，已获取信息（不确定性已被消除）",
          en: "Low entropy state — structure is clear, predictable, information has been acquired (uncertainty eliminated)",
        },
      },
    ],
    references: [
      {
        title: "A Mathematical Theory of Communication — Shannon (1948)",
        url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
        type: "paper",
      },
      {
        title: "Information is Physical — Rolf Landauer (1991)",
        url: "https://ieeexplore.ieee.org/document/90440",
        type: "paper",
      },
      {
        title: "It from Bit — John Archibald Wheeler",
        url: "https://en.wikipedia.org/wiki/It_from_bit",
        type: "wikipedia",
      },
    ],
    color: "#34d399",
  },
  {
    slug: "chaos-fractal",
    order: 5,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2"/></svg>`,
    title: { zh: "混沌与分形", en: "Chaos & Fractals" },
    tagline: {
      zh: "确定性的混沌中有奇异吸引子——太极图就是最优雅的吸引子",
      en: "Deterministic chaos contains strange attractors — the Taiji diagram is the most elegant attractor",
    },
    overview: {
      zh: "混沌理论揭示了一个颠覆直觉的事实：完全确定的系统可以产生完全不可预测的行为。一个简单的非线性方程（如逻辑斯蒂映射 x → rx(1-x)）在参数变化时会产生从稳定点到周期振荡到完全混沌的行为——这就是'确定性混沌'。\n\n太极图与混沌理论的深层联系在于：太极图描绘的不是静态的平衡，而是一种'有序之中的无序、无序之中的有序'——正是混沌系统在相空间中的特征。奇异吸引子——如洛伦兹吸引子——是一个有界、确定但永不重复的轨迹，其形状令人想起太极图的旋转结构。\n\n分形几何则展示了'自相似性'——整体与部分在结构上相似，这正是'其大无外、其小无内'的数学翻译。曼德勃罗集的边界包含无穷的细节，放大任何一部分都会看到新的、相似但从不相同的图案——太极图中的小太极（阴阳鱼眼）正是这种自相似性的古老隐喻。蝴蝶效应（蝴蝶振翅引发飓风）揭示了微观变化在非线性系统中被指数放大——这与'一阴一阳之谓道'中微小二元变化引发整体变迁的思想不谋而合。",
      en: "Chaos theory reveals a counterintuitive fact: completely deterministic systems can produce completely unpredictable behavior. A simple nonlinear equation (like the logistic map x → rx(1-x)) produces behaviors ranging from stable points to periodic oscillations to complete chaos as parameters change — this is 'deterministic chaos.'\n\nThe deep connection between the Taiji diagram and chaos theory lies in this: the Taiji depicts not static equilibrium but 'order within disorder, disorder within order' — precisely the characteristic of chaotic systems in phase space. Strange attractors — like the Lorenz attractor — produce bounded, deterministic but never-repeating trajectories, their shape reminiscent of the rotating structure of the Taiji diagram.\n\nFractal geometry demonstrates 'self-similarity' — the whole and the part share structural similarity, which is the mathematical translation of 'as large as it is, nothing is outside it; as small as it is, nothing is inside it.' The boundary of the Mandelbrot set contains infinite detail; zooming into any portion reveals new, similar but never identical patterns — the small Taiji within the Taiji (the yin-yang fish eyes) is an ancient metaphor for this self-similarity. The butterfly effect (a butterfly's wing flap causing a hurricane) reveals that microscopic changes are exponentially amplified in nonlinear systems — resonating with the idea that slight yin-yang shifts trigger holistic transformation in 'the Dao consists of one yin, one yang.'",
    },
    taijiConnections: [
      {
        point: {
          zh: "奇异吸引子 → 太极图的S曲线是系统在相空间中最优雅的吸引子形态",
          en: "Strange attractor → the S-curve of the Taiji diagram is the most elegant attractor form in phase space",
        },
      },
      {
        point: {
          zh: "分形自相似（太极中的小太极）→ 整体与部分同构",
          en: "Fractal self-similarity (small Taiji within the Taiji) → isomorphism of whole and part",
        },
      },
      {
        point: {
          zh: "蝴蝶效应 → 阴阳微小的消长引发系统的宏观转变",
          en: "Butterfly effect → minute yin-yang shifts trigger macroscopic system transformation",
        },
      },
    ],
    keyExamples: [
      {
        title: { zh: "洛伦兹吸引子", en: "The Lorenz Attractor" },
        description: {
          zh: "1963年，气象学家洛伦兹在简化的大气对流模型中发现了第一个奇异吸引子——一个三维空间中永不重复、永不自交的蝴蝶形轨迹。它的形状在相空间中像一个不断旋转、从不完全重复的太极图——确定性的系统产生了不可预测的行为。",
          en: "In 1963, meteorologist Lorenz discovered the first strange attractor in a simplified atmospheric convection model — a butterfly-shaped trajectory in 3D space that never repeats and never intersects itself. Its shape in phase space resembles a continuously rotating Taiji diagram that never fully repeats — a deterministic system producing unpredictable behavior.",
        },
      },
      {
        title: { zh: "曼德勃罗集", en: "The Mandelbrot Set" },
        description: {
          zh: "曼德勃罗集是最著名的分形——一个简单的迭代方程 zn+1 = zn² + c 产生无穷复杂的边界。放大边界任何一处，会发现自相似但不完全相同的结构——小的曼德勃罗集嵌套在大的里面，正如太极鱼眼中的小太极。",
          en: "The Mandelbrot set is the most famous fractal — the simple iterative equation zn+1 = zn² + c produces an infinitely complex boundary. Zooming into any boundary region reveals self-similar but never identical structures — small Mandelbrot sets nested within larger ones, just like the small Taiji dots within the Taiji fish eyes.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "太极图周而复始但永不静止",
          en: "The Taiji diagram cycles endlessly but never rests",
        },
        scienceAspect: {
          zh: "混沌系统在相空间中永不重复但永不离开吸引子",
          en: "Chaotic systems in phase space never repeat but never leave the attractor",
        },
      },
      {
        taijiAspect: {
          zh: "阴中有阳、阳中有阴——每一部分包含整体的缩影",
          en: "Yin contains yang, yang contains yin — every part contains a microcosm of the whole",
        },
        scienceAspect: {
          zh: "分形自相似——任意尺度下结构特征保持不变（或近乎不变）",
          en: "Fractal self-similarity — structural features remain invariant (or nearly so) at any scale",
        },
      },
    ],
    references: [
      {
        title: "Deterministic Nonperiodic Flow — Lorenz (1963)",
        url: "https://journals.ametsoc.org/view/journals/atsc/20/2/1520-0469_1963_020_0130_dnf_2_0_co_2.xml",
        type: "paper",
      },
      {
        title:
          "The Fractal Geometry of Nature — Benoit Mandelbrot",
        url: "https://en.wikipedia.org/wiki/The_Fractal_Geometry_of_Nature",
        type: "wikipedia",
      },
      {
        title: "Chaos Theory — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/chaos/",
        type: "article",
      },
    ],
    color: "#f472b6",
  },
  {
    slug: "systems-science",
    order: 6,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M5 6l5 5"/><path d="M19 6l-5 5"/><path d="M5 18l5-5"/><path d="M19 18l-5-5"/></svg>`,
    title: { zh: "系统科学与涌现", en: "Systems Science & Emergence" },
    tagline: {
      zh: "整体大于部分之和——涌现是太极图中阴与阳的'化学反应'",
      en: "The whole is greater than the sum of its parts — emergence is the 'chemistry' of yin and yang",
    },
    overview: {
      zh: "系统科学的核心命题是'整体大于部分之和'——当一个系统达到一定复杂度时，会涌现出在单个组成部分中完全不存在的全新性质。这正是太极图思想最深刻的现代回响：阴阳不是两个独立实体的简单相加，而是它们的相互作用产生了一个具有全新动力学的新整体。\n\n伊利亚·普里高津（1977年诺贝尔化学奖）研究的耗散结构理论表明：远离热力学平衡态的开放系统可以通过消耗能量和物质自发形成有序结构——这就是'自组织'。贝纳尔对流、化学振荡（BZ反应）、甚至生命本身的起源都是耗散结构的实例。太极图中阴阳的相互转化不是外力推动的结果，而是系统内生的自组织过程——这与普里高津的'有序来自涨落'惊人地吻合。\n\n涌现现象是系统科学的皇冠明珠：鸟群的整体运动形态（murmuration）无法从单只鸟的飞行规则推导出来；蚁群智能超出任何单只蚂蚁的能力；意识从神经元网络的集体活动中涌现——这些现象都体现了'阴阳相合而生万物'的古老智慧。太极图描绘的正是一个涌现的系统——黑与白的相互作用产生了一个超越黑与白的动态整体。",
      en: "The core proposition of systems science is that 'the whole is greater than the sum of its parts' — when a system reaches a certain complexity, entirely new properties emerge that do not exist in any individual component. This is the most profound modern echo of Taiji thought: yin and yang are not simply the sum of two independent entities; their interaction produces a new whole with entirely new dynamics.\n\nIlya Prigogine (1977 Nobel Prize in Chemistry) studied dissipative structure theory, showing that open systems far from thermodynamic equilibrium can spontaneously form ordered structures by consuming energy and matter — this is 'self-organization.' Bénard convection, chemical oscillations (BZ reaction), and even the origin of life itself are instances of dissipative structures. The mutual transformation of yin and yang in the Taiji diagram is not driven by external forces but is an endogenous self-organizing process — remarkably consistent with Prigogine's 'order through fluctuations.'\n\nEmergence is the crown jewel of systems science: the collective movement patterns of bird flocks (murmuration) cannot be derived from individual flying rules; ant colony intelligence exceeds the capability of any single ant; consciousness emerges from the collective activity of neural networks — these phenomena embody the ancient wisdom that 'yin and yang unite and give birth to all things.' The Taiji diagram depicts exactly an emergent system — the interaction between black and white produces a dynamic whole that transcends both.",
    },
    taijiConnections: [
      {
        point: {
          zh: "阴阳相合而生万物 → 涌现：整体具有部分不具备的新性质",
          en: "Yin and yang unite to produce all things → emergence: the whole has new properties absent from parts",
        },
      },
      {
        point: {
          zh: "太极图的动态平衡 → 耗散结构远离平衡态的稳态",
          en: "Dynamic equilibrium in the Taiji diagram → steady state of dissipative structures far from equilibrium",
        },
      },
      {
        point: {
          zh: "阴阳相互转化 → 自组织系统中反馈回路的正向与负向调节",
          en: "Mutual yin-yang transformation → positive and negative feedback regulation in self-organizing systems",
        },
      },
    ],
    keyExamples: [
      {
        title: {
          zh: "贝纳尔对流",
          en: "Bénard Convection",
        },
        description: {
          zh: "加热一层液体底部，当温度梯度超过临界值时，液体突然自组织形成规则的六边形对流胞——这就是耗散结构。微观粒子无规则的布朗运动（阳——活跃）与重力和粘滞（阴——约束）的相互作用，涌现出宏观的秩序图案。这正是阴阳互动产生结构的完美物理实例。",
          en: "When heating the bottom of a liquid layer, as the temperature gradient exceeds a critical value, the liquid suddenly self-organizes into regular hexagonal convection cells — this is a dissipative structure. The interaction between random Brownian motion of microscopic particles (yang — active) and gravity/viscosity (yin — constraining) produces an emergent macroscopic ordered pattern. This is a perfect physical example of yin-yang interaction producing structure.",
        },
      },
      {
        title: { zh: "鸟群飞行", en: "Bird Flock Murmuration" },
        description: {
          zh: "椋鸟群在黄昏时分的集体飞行是涌现的经典例子。每只鸟只遵循三条简单规则（对齐、分离、凝聚），但成千上万只鸟的集体行为涌现出如液体般流动、如波浪般起伏的壮观图案——没有任何一只鸟在'指挥'，整体形态通过局部互动自发产生。这与太极'无为而治'——自然通过阴阳互动自发形成秩序——的智慧如出一辙。",
          en: "Starling murmurations at dusk are a classic example of emergence. Each bird follows only three simple rules (alignment, separation, cohesion), but the collective behavior of thousands produces spectacular flowing, wave-like patterns — no single bird is 'conducting'; the overall shape emerges spontaneously through local interactions. This mirrors the Taiji wisdom of 'governing through non-action' — nature spontaneously produces order through yin-yang interaction.",
        },
      },
    ],
    taijiComparison: [
      {
        taijiAspect: {
          zh: "阴与阳的相互作用产生'道'——超越二元的新统一",
          en: "The interaction of yin and yang produces 'Dao' — a new unity transcending duality",
        },
        scienceAspect: {
          zh: "涌现——系统的宏观行为无法还原为其微观组分的属性之和",
          en: "Emergence — the macroscopic behavior of a system cannot be reduced to the sum of its microscopic components' properties",
        },
      },
      {
        taijiAspect: {
          zh: "阴阳的动态平衡——在持续运动变化中维持稳态",
          en: "Dynamic yin-yang equilibrium — maintaining steady state amidst continuous movement and change",
        },
        scienceAspect: {
          zh: "非平衡稳态（耗散结构）——通过持续消耗能量/物质维持有序",
          en: "Non-equilibrium steady state (dissipative structures) — maintaining order through continuous consumption of energy/matter",
        },
      },
    ],
    references: [
      {
        title:
          "Order Out of Chaos — Ilya Prigogine & Isabelle Stengers (1984)",
        url: "https://en.wikipedia.org/wiki/Order_out_of_Chaos",
        type: "wikipedia",
      },
      {
        title: "Self-Organization in Nonequilibrium Systems — Nicolis & Prigogine",
        url: "https://onlinelibrary.wiley.com/doi/book/10.1002/9780470140307",
        type: "paper",
      },
      {
        title: "Emergence — Stanford Encyclopedia of Philosophy",
        url: "https://plato.stanford.edu/entries/properties-emergent/",
        type: "article",
      },
    ],
    color: "#fb923c",
  },
];
