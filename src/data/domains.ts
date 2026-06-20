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
          zh: "在极高能量下（宇宙早期），基本粒子都没有质量——这是完美的对称态。当宇宙冷却到一定温度，希格斯场的对称性自发破缺，粒子通过与希格斯场相互作用获得质量。阴阳从无极中分化，在此找到了最精确的物理学类比。",
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
  {
    slug: "artificial-intelligence",
    order: 7,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><path d="M9 15h6"/><path d="M12 12v5"/></svg>`,
    title: { zh: "人工智能与阴阳决策", en: "Artificial Intelligence & Yin-Yang Decision" },
    tagline: { zh: "神经网络的二元分类、GAN的对抗生成——AI处处是阴阳博弈", en: "Binary classification in neural networks, GAN adversarial generation — AI is yin-yang games everywhere" },
    overview: {
      zh: "人工智能的多个核心机制惊人地映射到太极图的阴阳原理。最基本的神经网络就是一个二元分类器：给定输入，判断'是'或'否'——这是数字世界的阴阳二分。但真正的深度在于：现代AI不只是简单的0/1判断，而是学习在连续的'灰度'空间中做决策，概率分布在0和1之间流动，正如阴阳在太极图中的消长转化。\n\n生成对抗网络(GAN)是AI中最优雅的阴阳对偶结构：一个生成器（阴——创造、隐藏、生成假数据）和一个判别器（阳——判断、揭示、区分真假）互相博弈、互相训练。生成器不断学习制造更逼真的数据，判别器不断学习更精准地识破——两者在对抗中共同进化，正如'阴阳相推而生变化'。这种'对抗性训练'已成为现代AI的基石范式。\n\n更深层看，强化学习中的探索(exploration)与利用(exploitation)困境正是太极图的动态平衡：探索未知（阴——开放、尝试新路）与利用已知（阳——收敛、优化现存）之间需要持续调节。AlphaGo的蒙特卡洛树搜索本质上就是在这种阴阳之间寻找最优路径。甚至连当今最火的大语言模型，其核心Transformer架构中的注意力机制(Attention)也是在信息（阳——显式关注）与忽略（阴——隐含舍弃）之间进行精妙的平衡。",
      en: "Multiple core mechanisms of artificial intelligence map astonishingly well to the yin-yang principles of the Taiji diagram. The most basic neural network is a binary classifier: given input, judge 'yes' or 'no' — the digital world's yin-yang dichotomy. But the true depth lies in the fact that modern AI doesn't just make simple 0/1 judgments; it learns to make decisions in a continuous 'grayscale' space, with probability distributions flowing between 0 and 1, just as yin and yang wax and wane in the Taiji diagram.\n\nGenerative Adversarial Networks (GANs) represent AI's most elegant yin-yang dual structure: a generator (yin — creating, concealing, producing fake data) and a discriminator (yang — judging, revealing, distinguishing real from fake) compete and train each other. The generator continuously learns to produce more realistic data, while the discriminator learns to detect fakes more precisely — they co-evolve through opposition, exactly as 'yin and yang push each other and give birth to change.' This 'adversarial training' has become a cornerstone paradigm of modern AI.\n\nAt a deeper level, the exploration vs. exploitation dilemma in reinforcement learning is precisely the dynamic equilibrium of the Taiji diagram: exploring the unknown (yin — openness, trying new paths) versus exploiting the known (yang — convergence, optimizing existing knowledge) requires continuous regulation. AlphaGo's Monte Carlo Tree Search essentially seeks optimal paths within this yin-yang balance. Even today's dominant large language models, with their core Transformer architecture's attention mechanism, perform a delicate balance between attending to information (yang — explicit focus) and ignoring it (yin — implicit discard).",
    },
    taijiConnections: [
      { point: { zh: "阴阳二元分类 → 神经网络二分类器（是/否、真/假、猫/狗）", en: "Yin-yang binary classification → neural network binary classifiers (yes/no, true/false, cat/dog)" } },
      { point: { zh: "阴阳相推而生变化 → GAN生成对抗的博弈共进化", en: "Yin-yang mutual push generates change → GAN adversarial game co-evolution" } },
      { point: { zh: "阴阳动态平衡 → 强化学习探索vs利用的永恒张力", en: "Yin-yang dynamic equilibrium → the eternal exploration vs exploitation tension in RL" } },
      { point: { zh: "阴中含阳、阳中含阴 → Transformer注意力中的关注与忽略互补", en: "Yin contains yang, yang contains yin → attention and ignorance as complementary in Transformers" } },
    ],
    keyExamples: [
      {
        title: { zh: "GAN：生成器与判别器的阴阳博弈", en: "GAN: The Yin-Yang Game of Generator and Discriminator" },
        description: { zh: "2014年Ian Goodfellow提出的GAN框架包含两个神经网络：生成器（阴）学习制造逼真的假图像，判别器（阳）学习区分真假。两者在对抗中互相提升——判别器越强，生成器被迫越逼真；生成器越逼真，判别器被迫越敏锐。这个'阴阳博弈'过程最终使生成器能够创造出肉眼无法分辨的合成图像、视频和音频，彻底改变了AI内容生成领域。", en: "Ian Goodfellow's 2014 GAN framework contains two neural networks: a generator (yin) learning to create realistic fake images, and a discriminator (yang) learning to distinguish real from fake. The two improve each other through opposition — the stronger the discriminator, the more realistic the generator must become; the more realistic the generator, the sharper the discriminator must be. This 'yin-yang game' ultimately enables generators to create synthetic images, videos, and audio indistinguishable to the human eye, revolutionizing AI content generation." },
      },
      {
        title: { zh: "AlphaGo：蒙特卡洛树搜索中的阴阳之道", en: "AlphaGo: The Dao of Yin-Yang in Monte Carlo Tree Search" },
        description: { zh: "DeepMind的AlphaGo击败人类围棋冠军时，其核心算法MCTS正是阴阳思维的完美体现：'探索'（阴——广泛搜寻未知走法）与'利用'（阳——深入计算已知好手）之间不断平衡。围棋361个交叉点，可能的棋局数超过宇宙中的原子数——在这样的无限可能性中，AlphaGo学会了在阴阳两极间动态调谐，找到了人类千年未见的妙手。", en: "When DeepMind's AlphaGo defeated the human Go champion, its core MCTS algorithm perfectly embodied yin-yang thinking: continuously balancing 'exploration' (yin — broadly searching unknown moves) and 'exploitation' (yang — deeply calculating known good moves). With 361 intersections on a Go board and more possible positions than atoms in the universe, AlphaGo learned to dynamically tune between yin and yang poles, discovering brilliant moves unseen in millennia of human play." },
      },
    ],
    taijiComparison: [
      { taijiAspect: { zh: "阴阳二分是一切分类的起点", en: "Yin-yang dichotomy is the origin of all classification" }, scienceAspect: { zh: "神经网络的最基本单元——感知机——就是一个二元分类器", en: "The most basic neural unit — the perceptron — is a binary classifier" } },
      { taijiAspect: { zh: "阴阳相激相荡产生动力", en: "Yin and yang clash and generate momentum" }, scienceAspect: { zh: "GAN的对抗训练：两个网络的博弈驱动了整个系统的进化", en: "GAN adversarial training: the game between two networks drives the evolution of the entire system" } },
      { taijiAspect: { zh: "阴阳消长，动态平衡", en: "Yin-yang wax and wane in dynamic balance" }, scienceAspect: { zh: "强化学习在探索与利用之间的持续调谐", en: "Reinforcement learning's continuous tuning between exploration and exploitation" } },
    ],
    references: [
      { title: "Generative Adversarial Networks — Goodfellow et al. (2014)", url: "https://arxiv.org/abs/1406.2661", type: "paper" },
      { title: "Mastering the Game of Go with Deep Neural Networks — Silver et al. (2016)", url: "https://www.nature.com/articles/nature16961", type: "paper" },
      { title: "Attention Is All You Need — Vaswani et al. (2017)", url: "https://arxiv.org/abs/1706.03762", type: "paper" },
    ],
    color: "#c084fc",
  },
  {
    slug: "cosmology",
    order: 8,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 0 20"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`,
    title: { zh: "宇宙学与太极创世", en: "Cosmology & Taiji Genesis" },
    tagline: { zh: "大爆炸是无极生太极——宇宙从'无'中诞生的科学叙述", en: "The Big Bang is Wuji giving birth to Taiji — the scientific narrative of the universe born from 'nothing'" },
    overview: {
      zh: "现代宇宙学讲述了一个与太极创世观惊人相似的故事：138亿年前，宇宙从一个无限致密、无限高温的奇点（singularity）中诞生——这就是大爆炸。在最初的10⁻³⁶秒内，宇宙经历了一次指数级的'暴涨'(inflation)，从一个量子涨落成长为宏观宇宙。这个叙事与'无极生太极，太极生两仪'的古老哲学形成了深刻的共鸣。\n\n宇宙学中最大的谜团之一——暗物质与暗能量——为太极图的阴阳结构提供了一个宇宙尺度的对应。普通物质（恒星、行星、我们可见的一切）仅占宇宙总质能的约5%，而暗物质占约27%，暗能量占约68%。这意味着我们'看得见的宇宙'（阳）只是冰山一角，绝大部分宇宙由'看不见的'（阴）组成——正如太极图中阴中含阳、阳中含阴，可见与不可见相互依存、共同构成宇宙的整体。\n\n更惊人的是，现代宇宙学揭示宇宙的'存在'本身可能来自一种精妙的对称性破缺。在大爆炸初期，物质与反物质几乎完全对称——但每10亿对粒子-反粒子对中，物质比反物质多出1个粒子。这个极其微小的不对称（CP破缺）是今天我们所见的一切存在的根本原因。没有这个阴阳不对等，宇宙将在诞生瞬间自我湮灭。这正是'孤阴不生，独阳不长'的宇宙学证明——纯粹的对称意味着虚无，生命和结构来自于对称的破缺。",
      en: "Modern cosmology tells a story astonishingly similar to the Taiji creation view: 13.8 billion years ago, the universe was born from an infinitely dense, infinitely hot singularity — the Big Bang. In the first 10⁻³⁶ seconds, the universe underwent exponential 'inflation,' growing from a quantum fluctuation into a macroscopic cosmos. This narrative resonates deeply with the ancient philosophy of 'Wuji gives birth to Taiji, Taiji gives birth to the Two Forces.'\n\nOne of cosmology's greatest mysteries — dark matter and dark energy — provides a cosmic-scale correspondence to the Taiji diagram's yin-yang structure. Ordinary matter (stars, planets, everything we can see) accounts for only about 5% of the universe's total mass-energy, while dark matter accounts for about 27% and dark energy about 68%. This means our 'visible universe' (yang) is merely the tip of the iceberg, with the vast majority of the cosmos composed of the 'invisible' (yin) — just as in the Taiji diagram, yin contains yang and yang contains yin; the visible and invisible are interdependent, together forming the cosmic whole.\n\nEven more striking is that modern cosmology reveals the universe's very 'existence' may come from an exquisite symmetry breaking. In the early universe, matter and antimatter were almost perfectly symmetric — but for every billion particle-antiparticle pairs, matter had one extra particle. This extremely tiny asymmetry (CP violation) is the fundamental reason everything we see today exists. Without this yin-yang imbalance, the universe would have self-annihilated at birth. This is the cosmological proof of 'solitary yin cannot give birth, alone yang cannot grow' — pure symmetry means nothingness; life and structure come from the breaking of symmetry.",
    },
    taijiConnections: [
      { point: { zh: "无极生太极 → 大爆炸从奇点中诞生宇宙", en: "Wuji gives birth to Taiji → Big Bang: the universe born from singularity" } },
      { point: { zh: "阴中含阳、阳中含阴 → 暗物质/暗能量（不可见的宇宙）与可见宇宙相互依存", en: "Yin contains yang, yang contains yin → dark matter/energy (invisible cosmos) interdependent with visible universe" } },
      { point: { zh: "阴阳不对称 → 物质-反物质不对称（CP破缺）是宇宙存在的前提", en: "Yin-yang asymmetry → matter-antimatter asymmetry (CP violation) as the precondition for cosmic existence" } },
      { point: { zh: "太极图旋转变化 → 宇宙膨胀与收缩的循环模型（大反弹理论）", en: "Rotating Taiji diagram → cyclic models of cosmic expansion and contraction (Big Bounce theory)" } },
    ],
    keyExamples: [
      {
        title: { zh: "宇宙微波背景辐射：大爆炸的'太极图'", en: "CMB: The Big Bang's 'Taiji Diagram'" },
        description: { zh: "宇宙微波背景辐射(CMB)是大爆炸'余晖'——宇宙诞生38万年后的第一缕光。2013年普朗克卫星绘制的CMB全天图显示微小的温度涨落（十万分之一度级别），这些涨落正是后来所有星系结构的'种子'。这张图被认为是现代宇宙学最重要的一张'照片'——它展示了一个整体均匀但内含微妙不对称的宇宙，正如太极图：整体平衡而内含阴阳之分的动态结构。", en: "The Cosmic Microwave Background (CMB) is the 'afterglow' of the Big Bang — the first light of the universe 380,000 years after its birth. The Planck satellite's 2013 all-sky CMB map shows tiny temperature fluctuations (at the level of one hundred-thousandth of a degree), which are the 'seeds' of all later galactic structure. This map is considered modern cosmology's most important 'photograph' — it reveals a universe that is globally uniform yet contains subtle internal asymmetry, just like the Taiji diagram: a dynamic structure of overall balance containing internal yin-yang differentiation." },
      },
      {
        title: { zh: "物质-反物质不对称：为什么有'有'而不是'无'？", en: "Matter-Antimatter Asymmetry: Why Is There 'Something' Rather Than 'Nothing'?" },
        description: { zh: "按照已知物理定律，大爆炸应当产生等量的物质与反物质——它们相遇即湮灭为光子，宇宙将空无一物。但事实是我们存在。物理学家发现CP对称性（电荷-宇称联合对称）在弱相互作用中会轻微破缺，导致每10⁹个反物质粒子对应10⁹+1个物质粒子——正是这10亿分之一的'阴阳不对等'，在湮灭后留下了构建整个可见宇宙的物质残余。", en: "According to known physical laws, the Big Bang should have produced equal amounts of matter and antimatter — which would annihilate each other into photons, leaving an empty universe. But we exist. Physicists discovered that CP symmetry (combined charge-parity symmetry) is slightly violated in weak interactions, resulting in 10⁹+1 matter particles for every 10⁹ antimatter particles — this one-in-a-billion 'yin-yang imbalance' left behind the material residue that built the entire visible universe after annihilation." },
      },
    ],
    taijiComparison: [
      { taijiAspect: { zh: "无极——万物未分的混沌统一体", en: "Wuji — the undifferentiated chaotic unity before all things" }, scienceAspect: { zh: "奇点——宇宙诞生前的无限致密状态", en: "Singularity — the infinitely dense state before the universe's birth" } },
      { taijiAspect: { zh: "太极生两仪——从统一中分化出阴阳", en: "Taiji gives birth to Two Forces — yin and yang differentiate from unity" }, scienceAspect: { zh: "大爆炸后基本力逐渐分离——引力、强核力、弱核力、电磁力先后分化", en: "Fundamental forces gradually separated after the Big Bang — gravity, strong force, weak force, electromagnetism differentiated in sequence" } },
      { taijiAspect: { zh: "阴阳的可见与不可见", en: "The visible and invisible of yin-yang" }, scienceAspect: { zh: "可见物质(5%) vs 暗物质(27%) + 暗能量(68%)——宇宙绝大部分是'阴'", en: "Visible matter (5%) vs dark matter (27%) + dark energy (68%) — the universe is overwhelmingly 'yin'" } },
    ],
    references: [
      { title: "Planck 2018 Results — CMB Power Spectra", url: "https://www.aanda.org/articles/aa/abs/2020/09/aa33910-18/aa33910-18.html", type: "paper" },
      { title: "CP Violation — Nobel Prize 2008 (Kobayashi & Maskawa)", url: "https://www.nobelprize.org/prizes/physics/2008/summary/", type: "article" },
      { title: "Dark Energy and the Accelerating Universe — Riess et al.", url: "https://iopscience.iop.org/article/10.1086/300499", type: "paper" },
    ],
    color: "#818cf8",
  },
  {
    slug: "psychology",
    order: 9,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="9" r="7"/><path d="M9 10c.5-1 2-2 3.5-2s3 1 3.5 2"/><circle cx="9.5" cy="8" r=".8"/><circle cx="14.5" cy="8" r=".8"/><path d="M12 16c-2 0-3.5-1-4-2h8c-.5 1-2 2-4 2z"/></svg>`,
    title: { zh: "心理学与阴阳心智", en: "Psychology & Yin-Yang Mind" },
    tagline: { zh: "荣格读《易经》发现了共时性——无意识是阴，意识是阳", en: "Jung read the I Ching and discovered synchronicity — the unconscious is yin, consciousness is yang" },
    overview: {
      zh: "卡尔·荣格——分析心理学的创始人——可能是20世纪西方思想家中最深入拥抱中国哲学的人。1920年代，荣格通过卫礼贤(Richard Wilhelm)的德译本《易经》接触到中国思想，深受震撼。他从中发现了'共时性'(Synchronicity)概念：有意义的巧合——看似无关的事件之间存在非因果但有意义的联系。这与西方的线性因果思维完全不同，而更接近太极图式的关联思维：万物互相感应、阴阳互相牵引。\n\n荣格的心理模型本身就是一幅精妙的太极图。他将人的心理分为意识（阳——理性、光亮、显性的思维）与无意识（阴——直觉、幽暗、潜藏的本能）。而心理健康的关键在于'个性化'(Individuation)——意识与无意识的整合，正是太极图的阴阳合一。荣格认为过度压抑无意识（阴）会导致人格分裂，而过度被无意识支配会失去理性——理想状态是意识和无意识之间的动态平衡，正如太极图中阴阳的和谐共存。\n\n更深层地看，现代心理学的多个分支都体现了太极哲学。认知行为疗法(CBT)本质上是帮助患者识别和调节'自动思维'（阴——潜意识的扭曲信念）与'理性回应'（阳——意识层面的客观评估）之间的平衡。正念(Mindfulness)冥想则教会人们观察自己的思绪而不做评判——这正是太极图中'S曲线'的态度：不是非此即彼的二元对抗，而是在观察中找到觉察与接纳的和谐中间态。",
      en: "Carl Jung — founder of analytical psychology — may have been the most deeply engaged Western thinker with Chinese philosophy in the 20th century. In the 1920s, Jung encountered Chinese thought through Richard Wilhelm's German translation of the I Ching and was profoundly shaken. He discovered from it the concept of 'Synchronicity': meaningful coincidences — acausal yet meaningful connections between seemingly unrelated events. This is entirely different from Western linear causal thinking and closer to Taiji-style correlative thinking: all things resonate with each other; yin and yang pull each other.\n\nJung's psychological model itself is an exquisite Taiji diagram. He divided the psyche into consciousness (yang — rational, illuminated, explicit thinking) and the unconscious (yin — intuitive, shadowy, latent instincts). The key to mental health lies in 'Individuation' — the integration of consciousness and the unconscious, exactly the yin-yang unity of the Taiji diagram. Jung believed that excessively repressing the unconscious (yin) leads to personality fragmentation, while being dominated by it leads to loss of rationality — the ideal is a dynamic balance between consciousness and the unconscious, just as yin and yang coexist harmoniously in the Taiji diagram.\n\nAt a deeper level, multiple branches of modern psychology embody Taiji philosophy. Cognitive Behavioral Therapy (CBT) essentially helps patients identify and regulate the balance between 'automatic thoughts' (yin — subconscious distorted beliefs) and 'rational responses' (yang — conscious objective evaluation). Mindfulness meditation teaches people to observe their thoughts without judgment — exactly the attitude of the 'S-curve' in the Taiji diagram: not either-or binary opposition, but finding a harmonious middle state of awareness and acceptance through observation.",
    },
    taijiConnections: [
      { point: { zh: "意识（阳）与无意识（阴）→ 荣格的心理结构模型", en: "Consciousness (yang) and unconscious (yin) → Jung's model of psychic structure" } },
      { point: { zh: "阴阳合一 → 个性化(Individuation)：意识与无意识的整合过程", en: "Yin-yang unity → Individuation: the integration process of consciousness and unconscious" } },
      { point: { zh: "共时性(Synchronicity) → 非因果但有意义的关联——太极式的万物感应", en: "Synchronicity → acausal yet meaningful connections — Taiji-style universal resonance" } },
      { point: { zh: "太极S曲线的中间态 → CBT与正念：在对抗的两极间寻找觉察与接纳的平衡", en: "The S-curve's middle state → CBT and mindfulness: finding the balance of awareness and acceptance between opposing poles" } },
    ],
    keyExamples: [
      {
        title: { zh: "荣格与《易经》的相遇", en: "Jung's Encounter with the I Ching" },
        description: { zh: "荣格在为卫礼贤《易经》英译本作序时写道：'这项工作的核心思想——共时性原则——是我在与无意识过程的长期研究后才得出的。'荣格花了30多年研究《易经》，将其视为'无意识心理学的先驱'。他甚至发展出一种使用《易经》卦象进行心理分析的方法——不是占卜，而是作为反映心灵状态的'镜子'，帮助患者看到自己内心未被意识到的紧张和冲突。", en: "Jung wrote in his foreword to Wilhelm's English translation of the I Ching: 'The core idea of this work — the principle of synchronicity — was something I only reached after decades of studying unconscious processes.' Jung spent over 30 years studying the I Ching, which he saw as a 'precursor to the psychology of the unconscious.' He even developed a method of using I Ching hexagrams for psychological analysis — not as divination, but as a 'mirror' reflecting the psyche, helping patients see inner tensions and conflicts not yet conscious." },
      },
      {
        title: { zh: "正念冥想：在阴阳之间找到'第三位置'", en: "Mindfulness: Finding the 'Third Position' Between Yin and Yang" },
        description: { zh: "正念的核心技巧是'观察而不评判'——看着自己的念头升起和消散，不抓住它们（阳的执着），也不推开它们（阴的排斥）。这恰恰是太极图S曲线所暗示的'第三种可能'：不是非黑即白，而是在黑白之间找到动态的觉察空间。神经科学研究证实，8周正念训练就能显著改变大脑结构——杏仁核（恐惧中枢）缩小、前额叶（理性中枢）增厚，体现了'阴消阳长'在神经层面的真实发生。", en: "The core technique of mindfulness is 'observing without judging' — watching thoughts arise and dissipate without grasping them (yang attachment) or pushing them away (yin aversion). This is precisely the 'third possibility' hinted at by the Taiji S-curve: not black-or-white, but finding a dynamic space of awareness between them. Neuroscience research confirms that 8 weeks of mindfulness training significantly changes brain structure — the amygdala (fear center) shrinks, the prefrontal cortex (rational center) thickens, demonstrating 'yin wanes, yang waxes' actually happening at the neural level." },
      },
    ],
    taijiComparison: [
      { taijiAspect: { zh: "阳——意识、理性、光明、显性", en: "Yang — consciousness, reason, light, explicit" }, scienceAspect: { zh: "前额叶皮层——理性决策、自我控制、执行功能", en: "Prefrontal cortex — rational decision-making, self-control, executive function" } },
      { taijiAspect: { zh: "阴——无意识、直觉、幽暗、潜藏", en: "Yin — unconscious, intuition, shadow, latent" }, scienceAspect: { zh: "杏仁核与边缘系统——情绪反应、本能恐惧、内隐记忆", en: "Amygdala and limbic system — emotional responses, instinctive fear, implicit memory" } },
      { taijiAspect: { zh: "阴阳平衡 = 心理健康", en: "Yin-yang balance = mental health" }, scienceAspect: { zh: "前额叶-边缘系统平衡 = 情绪调节能力", en: "Prefrontal-limbic balance = emotional regulation capacity" } },
    ],
    references: [
      { title: "Synchronicity: An Acausal Connecting Principle — Jung (1952)", url: "https://en.wikipedia.org/wiki/Synchronicity", type: "article" },
      { title: "Mindfulness and Brain Changes — Hölzel et al. (2011)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3004979/", type: "paper" },
      { title: "Jung's Foreword to the I Ching (1949)", url: "https://www.iging.com/intro/foreword.htm", type: "article" },
    ],
    color: "#e879f9",
  },
  {
    slug: "biology",
    order: 10,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 12V2M7 8h10"/><circle cx="12" cy="17" r="1.5"/><line x1="12" y1="18.5" x2="12" y2="22"/></svg>`,
    title: { zh: "生物学与阴阳互补", en: "Biology & Yin-Yang Complementarity" },
    tagline: { zh: "DNA双螺旋是太极图的三维版本——两条互补链互相缠绕", en: "The DNA double helix is the 3D version of the Taiji diagram — two complementary strands intertwined" },
    overview: {
      zh: "生命的分子基础——DNA双螺旋结构——可能是太极图最直接的科学视觉化。两条互补的核苷酸链（腺嘌呤A-胸腺嘧啶T，鸟嘌呤G-胞嘧啶C）互相缠绕，正如阴阳两条'鱼'在太极图中互相环抱。每一条链都包含了重建另一条链的全部信息——这正是'阴中含阳、阳中含阴'的分子级实现。\n\n基因表达调控中的表观遗传学(epigenetics)进一步深化了阴阳视角。基因不是固定的'命运'——同样的DNA序列在不同环境下可以产生完全不同的表达结果。环境信号（阳——外部刺激）通过甲基化和组蛋白修饰（阴——内部调控）'开启'或'关闭'特定基因。这就像太极图中的阴阳消长：基因表达不是非开即关的二元开关，而是在一个连续的'表达谱'上动态调整——外部环境与内部遗传程序持续对话，互相塑造。\n\n免疫系统的运作机制同样映射阴阳互补原理。免疫系统有两支：先天性免疫（阴——快速、非特异、古老的防御，像'默认设防'）和适应性免疫（阳——精准、特异、记忆性的攻击，像'定制武器'）。健康不取决于某一支的强弱，而在于两者之间的平衡——过度活跃的适应性免疫导致自身免疫疾病（阳过盛），而先天免疫不足则导致反复感染（阴过衰）。这正是中医'阴阳平衡即健康'思想的免疫学表达。",
      en: "Life's molecular foundation — the DNA double helix — may be the most direct scientific visualization of the Taiji diagram. Two complementary nucleotide strands (adenine A-thymine T, guanine G-cytosine C) intertwine, just as the two 'fish' of yin and yang embrace each other in the Taiji diagram. Each strand contains the complete information needed to reconstruct the other — this is the molecular-level realization of 'yin contains yang, yang contains yin.'\n\nEpigenetics in gene expression regulation further deepens the yin-yang perspective. Genes are not fixed 'destiny' — the same DNA sequence can produce completely different expression outcomes under different environments. Environmental signals (yang — external stimuli) 'turn on' or 'turn off' specific genes through methylation and histone modification (yin — internal regulation). This is like the waxing and waning in the Taiji diagram: gene expression is not a binary on/off switch but dynamically adjusts across a continuous 'expression spectrum' — external environment and internal genetic program engage in continuous dialogue, mutually shaping each other.\n\nThe immune system's operating mechanism similarly maps to yin-yang complementarity principles. The immune system has two branches: innate immunity (yin — rapid, non-specific, ancient defense, like 'default fortification') and adaptive immunity (yang — precise, specific, memory-based attack, like 'custom weaponry'). Health depends not on the strength of either branch alone, but on the balance between them — hyperactive adaptive immunity leads to autoimmune disease (excess yang), while insufficient innate immunity leads to recurrent infections (deficient yin). This is the immunological expression of the Chinese medical concept that 'yin-yang balance equals health.'",
    },
    taijiConnections: [
      { point: { zh: "DNA双螺旋 → 互补配对的阴阳缠绕（A-T/G-C），每链含另一链的完整信息", en: "DNA double helix → complementary yin-yang pairing (A-T/G-C), each strand contains the other's complete information" } },
      { point: { zh: "基因表达调控 → 表观遗传：环境（阳）通过分子标记（阴）调节基因活性", en: "Gene expression regulation → epigenetics: environment (yang) regulates gene activity through molecular marks (yin)" } },
      { point: { zh: "先天性免疫（阴：古老、非特异、快速）↔ 适应性免疫（阳：精准、特异、记忆）", en: "Innate immunity (yin: ancient, non-specific, rapid) ↔ adaptive immunity (yang: precise, specific, memory)" } },
      { point: { zh: "阴阳平衡 = 健康 → 免疫平衡 = 不过度也不不足", en: "Yin-yang balance = health → immune balance = neither excessive nor deficient" } },
    ],
    keyExamples: [
      {
        title: { zh: "DNA：生命密码的阴阳缠绕", en: "DNA: The Yin-Yang Entwinement of Life's Code" },
        description: { zh: "1953年沃森和克里克发现DNA双螺旋结构时，他们看到的正是太极图的三维版本。两条反向平行的糖-磷酸骨架链像两条阴阳鱼互相缠绕，碱基对(A-T, G-C)像阴阳之间的氢键桥梁。最精妙的是：每一条链都是另一条的'反版'——从一条链的序列可以精确推断另一条链的序列。这就是太极图中阴中含阳、阳中含阴的最完美分子表达：互补性不只是一个比喻，而是生命最核心的物理结构。", en: "When Watson and Crick discovered the DNA double helix in 1953, what they saw was a three-dimensional version of the Taiji diagram. Two antiparallel sugar-phosphate backbone strands intertwine like two yin-yang fish, with base pairs (A-T, G-C) like hydrogen-bond bridges between yin and yang. The most elegant aspect: each strand is the 'negative' of the other — from one strand's sequence, the other's can be precisely inferred. This is the most perfect molecular expression of 'yin contains yang, yang contains yin': complementarity is not just a metaphor but life's most fundamental physical structure." },
      },
      {
        title: { zh: "表观遗传：基因不是命运", en: "Epigenetics: Genes Are Not Destiny" },
        description: { zh: "同卵双胞胎拥有完全相同的DNA，但在不同环境中成长后，他们的基因表达模式可以差异巨大——一个可能患上精神分裂症而另一个完全健康。这就是表观遗传学揭示的真理：基因只是'乐谱'，环境决定'演奏方式'。DNA甲基化（阴——化学标记使基因沉默）和组蛋白乙酰化（阳——松解染色质使基因激活）的平衡决定了哪些基因被表达。这个发现粉碎了'基因决定论'，证明生命是基因（阴）与环境（阳）的持续对话——正如太极图中没有阴或阳单独决定整体，只有它们的互动创造生命。", en: "Identical twins share exactly the same DNA, yet when raised in different environments, their gene expression patterns can differ dramatically — one may develop schizophrenia while the other remains completely healthy. This is the truth revealed by epigenetics: genes are merely the 'score,' while the environment determines the 'performance.' The balance between DNA methylation (yin — chemical marks silencing genes) and histone acetylation (yang — loosening chromatin to activate genes) determines which genes are expressed. This discovery shattered 'genetic determinism,' proving that life is a continuous dialogue between genes (yin) and environment (yang) — just as in the Taiji diagram, neither yin nor yang alone determines the whole; only their interaction creates life." },
      },
    ],
    taijiComparison: [
      { taijiAspect: { zh: "阴阳互补，互相包含对方的信息", en: "Yin and yang are complementary, each containing the other's information" }, scienceAspect: { zh: "DNA互补链：A配T，G配C——每条链包含重建另一条链的全部信息", en: "DNA complementary strands: A pairs with T, G with C — each strand contains all information to reconstruct the other" } },
      { taijiAspect: { zh: "阴阳消长决定生命的动态表现", en: "Yin-yang waxing and waning determines life's dynamic expression" }, scienceAspect: { zh: "基因表达谱：同一基因组在不同条件下产生完全不同的蛋白质表达模式", en: "Gene expression profile: the same genome produces completely different protein expression patterns under different conditions" } },
      { taijiAspect: { zh: "阴阳平衡 = 有机体的健康", en: "Yin-yang balance = organism health" }, scienceAspect: { zh: "免疫稳态(Immune homeostasis)：先天免疫与适应性免疫的动态平衡", en: "Immune homeostasis: the dynamic balance between innate and adaptive immunity" } },
    ],
    references: [
      { title: "Molecular Structure of Nucleic Acids — Watson & Crick (1953)", url: "https://www.nature.com/articles/171737a0", type: "paper" },
      { title: "Epigenetics — Nature Reviews Genetics", url: "https://www.nature.com/subjects/epigenetics", type: "article" },
      { title: "Innate and Adaptive Immunity — Janeway's Immunobiology", url: "https://www.ncbi.nlm.nih.gov/books/NBK10759/", type: "article" },
    ],
    color: "#22d3ee",
  },
  {
    slug: "computer-science",
    order: 11,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/><circle cx="12" cy="11" r="1"/></svg>`,
    title: { zh: "计算机科学与阴阳逻辑", en: "Computer Science & Yin-Yang Logic" },
    tagline: { zh: "布尔代数的AND/OR/NOT——逻辑运算就是数字化的阴阳五行的生克", en: "Boolean AND/OR/NOT — logic operations are digitized yin-yang Five Elements generation and restraint" },
    overview: {
      zh: "计算机科学的全部大厦建立在二进制之上——0和1，开和关，真和假。这是阴阳二元论的最纯粹技术实现。但计算机科学中的'阴阳'远不止于二进制比特。在计算的每一个层次——从逻辑门到算法设计，从编程范式到计算理论——阴阳互补结构无处不在。\n\n布尔代数中的AND（与/阳）、OR（或/阴）、NOT（非/转化）构成了一切数字电路的基础。更精妙的是，德·摩根定律(De Morgan's laws)揭示了AND和OR之间的阴阳转化关系：NOT(A AND B) = (NOT A) OR (NOT B)，反之亦然。这个定律在逻辑上是精确的：正如太极图中的阴与阳通过旋转互相转化，AND和OR通过NOT（阴阳互转）互相表达。\n\n在算法的世界，阴阳对立统一的原理同样深刻。分治算法(divide-and-conquer)将一个大问题（阳——整体、统一）拆分为多个小问题（阴——局部、分解），解决小问题后再合并为整体——这是'太极→两仪→四象→八卦'的算法表达。动态规划则体现了阴阳的动态平衡：在'存储子问题结果'(阴——保留、记忆)和'重新计算'(阳——更新、变化)之间找到最优平衡点，以最小代价求解复杂问题。\n\n更抽象地看，P vs NP问题——计算机科学最深层的未解之谜——本质上是关于阴阳的不可逆性：验证一个解的正确性（阳——判断、简单）与找到这个解（阴——创造、困难）之间是否存在根本性的不对称？如果P≠NP（大多数计算机科学家相信如此），那么'判断'永远比'创造'容易——这是计算的宇宙中最深刻的阴阳不对称性。",
      en: "The entire edifice of computer science is built on binary — 0 and 1, on and off, true and false. This is the purest technical realization of yin-yang dualism. But the 'yin-yang' in computer science goes far beyond binary bits. At every level of computation — from logic gates to algorithm design, from programming paradigms to computation theory — yin-yang complementary structures are everywhere.\n\nBoolean algebra's AND (yang — conjunction), OR (yin — disjunction), and NOT (transformation) form the foundation of all digital circuits. More elegantly, De Morgan's laws reveal the yin-yang transformation relationship between AND and OR: NOT(A AND B) = (NOT A) OR (NOT B), and vice versa. This is mathematically precise: just as yin and yang in the Taiji diagram transform into each other through rotation, AND and OR express each other through NOT (yin-yang mutual transformation).\n\nIn the world of algorithms, the principle of yin-yang unity of opposites is equally profound. Divide-and-conquer algorithms split a large problem (yang — whole, unified) into multiple sub-problems (yin — local, decomposed), solve the sub-problems, then merge them back into a whole — this is the algorithmic expression of 'Taiji → Two Forces → Four Images → Eight Trigrams.' Dynamic programming embodies the dynamic balance of yin-yang: finding the optimal balance between 'storing sub-problem results' (yin — preserving, remembering) and 'recomputing' (yang — updating, changing) to solve complex problems at minimal cost.\n\nAt the most abstract level, the P vs NP problem — computer science's deepest unsolved mystery — is essentially about the irreversibility of yin and yang: is there a fundamental asymmetry between verifying a solution's correctness (yang — judging, easy) and finding that solution (yin — creating, hard)? If P≠NP (as most computer scientists believe), then 'judging' is forever easier than 'creating' — the deepest yin-yang asymmetry in the computational universe.",
    },
    taijiConnections: [
      { point: { zh: "0/1比特 → 阴阳二元的最纯粹技术实现", en: "0/1 bits → the purest technical realization of yin-yang dualism" } },
      { point: { zh: "德·摩根定律 → AND↔OR通过NOT互相转化，正如阴阳通过旋转互变", en: "De Morgan's laws → AND↔OR transform via NOT, just as yin-yang transform through rotation" } },
      { point: { zh: "分治算法 → 太极→两仪→四象的分化与回归", en: "Divide-and-conquer → differentiation and return from Taiji to Two Forces to Four Images" } },
      { point: { zh: "P vs NP → '验证'(阳)与'发现'(阴)之间的根本不对称性", en: "P vs NP → the fundamental asymmetry between 'verifying' (yang) and 'discovering' (yin)" } },
    ],
    keyExamples: [
      {
        title: { zh: "布尔代数：逻辑中的阴阳运算", en: "Boolean Algebra: Yin-Yang Operations in Logic" },
        description: { zh: "乔治·布尔1854年发表的《思维定律的研究》奠定了现代计算机科学的数学基础。布尔代数的三个基本运算——AND(与：阴阳相交始有物)、OR(或：阴阳相合而生)、NOT(非：阴阳互转)——构成了所有计算机芯片的底层逻辑。今天的CPU每秒执行数十亿次这些'阴阳运算'，每一行代码最终被编译为这些基础逻辑操作。布尔可能从未想过，他的'思维定律'不仅描述了人类推理，还恰好复现了两千年前中国人用太极八卦表达的同一个结构：用最简二元实现对世界万物的编码。", en: "George Boole's 1854 'An Investigation of the Laws of Thought' laid the mathematical foundation of modern computer science. Boolean algebra's three basic operations — AND (intersection: yin-yang intersect, something is born), OR (union: yin-yang combine, new arises), NOT (negation: yin-yang transform into each other) — form the underlying logic of all computer chips. Today's CPUs execute billions of these 'yin-yang operations' per second; every line of code is ultimately compiled into these basic logical operations. Boole probably never imagined that his 'laws of thought' not only described human reasoning but also precisely reproduced the very structure the Chinese expressed through Taiji Bagua two millennia earlier: encoding all things through the simplest binary." },
      },
      {
        title: { zh: "P vs NP：计算的阴阳不对称性", en: "P vs NP: The Yin-Yang Asymmetry of Computation" },
        description: { zh: "P vs NP是计算机科学中最重要的未解问题（克雷数学研究所悬赏100万美元）。它问的是：每个能快速验证解的问题（NP，阳——判断），是否也能快速找到解（P，阴——创造）？以数独为例：给你一个已填好的数独，你可以在几秒钟内验证它是否正确（阳的判断）。但从一个空白的数独找到这个解，可能需要指数级的时间（阴的创造）。如果P≠NP——这是大多数计算机科学家的信念——那么宇宙中永远存在一种根本性的阴阳不对称：验证永远比发现更容易。这种'不对称性'正是太极哲学的核心洞见：阴与阳不是镜像对称的，它们的不对等驱动了一切运动与变化。", en: "P vs NP is the most important unsolved problem in computer science (Clay Mathematics Institute offers a $1M prize). It asks: can every problem whose solution can be quickly verified (NP, yang — judging) also have its solution quickly found (P, yin — creating)? Take Sudoku: given a completed grid, you can verify its correctness in seconds (yang judgment). But finding that solution from a blank grid may take exponential time (yin creation). If P≠NP — as most computer scientists believe — then a fundamental yin-yang asymmetry forever exists in the universe: verifying is always easier than discovering. This 'asymmetry' is precisely the core insight of Taiji philosophy: yin and yang are not mirror-symmetric; their imbalance drives all motion and change." },
      },
    ],
    taijiComparison: [
      { taijiAspect: { zh: "阴爻(--)与阳爻(—)的组合产生八卦", en: "The combination of yin(--) and yang(—) lines produces the eight trigrams" }, scienceAspect: { zh: "布尔代数中0和1的组合产生所有逻辑函数（共2²^n种）", en: "The combination of 0 and 1 in Boolean algebra produces all logic functions (2²^n total)" } },
      { taijiAspect: { zh: "八卦的S曲线——阴阳不是一刀切而是连续转化", en: "The S-curve of the trigrams — yin-yang is not a sharp cut but continuous transformation" }, scienceAspect: { zh: "浮点数(floating point)表示——在0和1之间有无穷多个数，数字计算的连续性", en: "Floating point representation — infinite numbers between 0 and 1, the continuity of digital computation" } },
      { taijiAspect: { zh: "阴阳互为其根——一方是另一方存在的前提", en: "Yin and yang root each other — each is the precondition for the other's existence" }, scienceAspect: { zh: "P和NP的关系——如果P=NP，计算世界将彻底对称；如果P≠NP，不对称性将永远存在", en: "The P vs NP relationship — if P=NP, the computational world is perfectly symmetric; if P≠NP, asymmetry forever exists" } },
    ],
    references: [
      { title: "An Investigation of the Laws of Thought — Boole (1854)", url: "https://plato.stanford.edu/entries/boole/", type: "article" },
      { title: "P vs NP Problem — Clay Mathematics Institute", url: "https://www.claymath.org/millennium/p-vs-np/", type: "article" },
      { title: "De Morgan's Laws — Stanford Encyclopedia", url: "https://plato.stanford.edu/entries/logic-classical/", type: "article" },
    ],
    color: "#f97316",
  },
];
