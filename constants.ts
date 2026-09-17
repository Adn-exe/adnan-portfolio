
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SmartHandel',
    solution: 'An AI-powered grocery optimizer that parses natural language shopping lists to calculate the cheapest multi-store route in real time.',
    bulletPoints: [
      'Transforms unstructured pantry notes and voice memos into structured shopping lists using Google Gemini AI.',
      'Cross-references live product inventories and seasonal discounts across major Scandinavian supermarket chains via the Kassalapp API.',
      'Calculates mathematically optimized split-store purchase strategies to maximize household grocery savings.'
    ],
    description: 'An AI-powered grocery optimizer for Norway.',
    image: '/projectImages/smartHandel.webp',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'API'],
    link: '',
    github: 'https://github.com/Adn-exe/smarthandel-mvp',
    role: 'Full Stack Dev'
  },
  {
    id: '2',
    title: 'Vizaris Studio',
    solution: 'An interactive machine learning playground that bridges deep learning theory and spatial intuition through real-time visual pipeline execution.',
    bulletPoints: [
      'Visual computation canvas for assembling neural layers, data transforms, and model architectures via intuitive drag-and-drop nodes.',
      'Live tensor inspection tool displays intermediate layer activations, dimension shifts, and gradient telemetry on the fly.',
      'Interactive loss landscape visualizer provides rapid feedback loops for parameter exploration and architectural tuning.'
    ],
    description: 'An interactive machine learning playground for visual pipeline construction.',
    image: '/projectImages/vizaris.webp',
    tags: ['React', 'TypeScript', 'Tailwind', 'ML'],
    link: 'https://vizaris.vercel.app',
    github: 'https://github.com/Adn-exe/Vizaris',
    role: 'Lead Architect'
  },
  {
    id: '3',
    title: 'Rakshak',
    solution: 'An AI-driven infrastructure risk platform that analyzes civic damage reports to generate explainable safety scores for disaster prevention.',
    bulletPoints: [
      'Citizen reporting interface identifies structural defects, cracks, and flood hazards from uploaded photos using OpenCV and computer vision.',
      'Generates an explainable 0–100 risk index to categorize structural severity and prioritize urgent municipal intervention.',
      'Equips authorities with geospatial risk heatmaps to dispatch targeted field inspections before minor damage escalates into disasters.'
    ],
    description: 'An AI-powered infrastructure safety platform for disaster prevention.',
    image: '/projectImages/rakshak.webp',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenCV', 'LLM'],
    link: '',
    github: 'https://github.com/Adn-exe/Rakshak',
    role: 'Lead AI Engineer'
  },
  {
    id: '4',
    title: 'Soul Nest',
    solution: 'A reflective digital sanctuary designed to foster mindfulness and emotional clarity through human-centered minimalism.',
    bulletPoints: [
      'Curates immersive binaural soundscapes and gentle, context-aware prompts that steer users away from metrics-driven digital fatigue.',
      'Private thought journal backed by client-side encrypted local storage ensures personal reflections never leave the device.',
      'Longitudinal mood equilibrium tracker visualizes emotional balance over time without intrusive notifications or gamification.'
    ],
    description: 'A reflective digital sanctuary fostering mindfulness through minimal aesthetics.',
    image: '/projectImages/soulNest.webp',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'JS'],
    link: '',
    github: 'https://github.com/Adn-exe/soul_nest',
    role: 'Full Stack Dev'
  }
];

export const RADAR_DOMAINS: RadarDomain[] = [
  {
    name: 'AI & Deep Learning',
    angleDeg: -90, // Top
    baseline: 92,
    description: 'Neural networks, computer vision, mathematical modeling, and predictive architectures.'
  },
  {
    name: 'Data Science & Analytics',
    angleDeg: -30, // Top-Right
    baseline: 89,
    description: 'Statistical computing, multidimensional tensor operations, and exploratory data synthesis.'
  },
  {
    name: 'Backend & APIs',
    angleDeg: 30, // Bottom-Right
    baseline: 87,
    description: 'High-throughput asynchronous microservices, REST APIs, and database orchestration.'
  },
  {
    name: 'Front-End Engineering',
    angleDeg: 90, // Bottom
    baseline: 88,
    description: 'Component-driven interactive web applications, kinetic animations, and responsive layouts.'
  },
  {
    name: 'LLM & Agent Systems',
    angleDeg: 150, // Bottom-Left
    baseline: 94,
    description: 'Autonomous agent architectures, structured prompt engineering, and context pipelines.'
  },
  {
    name: 'Systems & Architecture',
    angleDeg: 210, // Top-Left
    baseline: 85,
    description: 'Low-level memory awareness, Linux environments, Git systems, and reproducible labs.'
  }
];

export const SKILLS: Skill[] = [
  // Programming Languages
  {
    name: 'Python',
    icon: 'python',
    category: 'Languages',
    color: '#3776AB',
    level: 95,
    proficiency: 'Mastery',
    radarDomain: 'AI & Deep Learning',
    domainIndex: 0,
    description: 'Primary language for AI/ML development, tensor computation, data science pipelines, and backend service logic.',
  },
  {
    name: 'C Language',
    icon: 'c',
    category: 'Languages',
    color: '#A8B9CC',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Systems & Architecture',
    domainIndex: 5,
    description: 'Foundational understanding of pointers, manual memory allocation, and low-level system architecture.',
  },
  {
    name: 'Java',
    icon: 'java',
    category: 'Languages',
    color: '#E76F00',
    level: 68,
    proficiency: 'Intermediate',
    radarDomain: 'Backend & APIs',
    domainIndex: 2,
    description: 'Object-oriented programming language for designing enterprise-grade services and scalable architectures.',
  },
  {
    name: 'R Programming',
    icon: 'r',
    category: 'Languages',
    color: '#276DC3',
    level: 80,
    proficiency: 'Proficient',
    radarDomain: 'Data Science & Analytics',
    domainIndex: 1,
    description: 'Statistical modeling, hypothesis testing, and exploratory visualization for research datasets.',
  },

  // Data Science / ML
  {
    name: 'NumPy',
    icon: 'numpy',
    category: 'Data Science',
    color: '#013243',
    level: 90,
    proficiency: 'Mastery',
    radarDomain: 'Data Science & Analytics',
    domainIndex: 1,
    description: 'Vectorized computing, n-dimensional matrix operations, and numerical linear algebra for ML pipelines.',
  },
  {
    name: 'Pandas',
    icon: 'pandas',
    category: 'Data Science',
    color: '#150458',
    level: 92,
    proficiency: 'Mastery',
    radarDomain: 'Data Science & Analytics',
    domainIndex: 1,
    description: 'Data transformation, cleaning, indexing, and tabular feature engineering for analytical models.',
  },
  {
    name: 'Scikit-learn',
    icon: 'sklearn',
    category: 'Data Science',
    color: '#F7931E',
    level: 72,
    proficiency: 'Proficient',
    radarDomain: 'AI & Deep Learning',
    domainIndex: 0,
    description: 'Supervised and unsupervised learning, regression, classification, clustering, and cross-validation workflows.',
  },

  // Backend & APIs
  {
    name: 'FastAPI',
    icon: 'fastapi',
    category: 'Frameworks',
    color: '#059669',
    level: 75,
    proficiency: 'Proficient',
    radarDomain: 'Backend & APIs',
    domainIndex: 2,
    description: 'High-speed asynchronous Python web APIs with automatic OpenAPI schema generation and pydantic validation.',
  },
  {
    name: 'Flask',
    icon: 'flask',
    category: 'Frameworks',
    color: '#FFFFFF',
    level: 86,
    proficiency: 'Advanced',
    radarDomain: 'Backend & APIs',
    domainIndex: 2,
    description: 'Lightweight WSGI framework for rapid ML model endpoints, microservices, and prototype deployments.',
  },
  {
    name: 'Node.js',
    icon: 'node.js',
    category: 'Frameworks',
    color: '#539E43',
    level: 64,
    proficiency: 'Intermediate',
    radarDomain: 'Backend & APIs',
    domainIndex: 2,
    description: 'Non-blocking event-driven JavaScript runtime for scalable full-stack middleware and toolchains.',
  },

  // Frontend
  {
    name: 'React',
    icon: 'react',
    category: 'Frameworks',
    color: '#61DAFB',
    level: 70,
    proficiency: 'Proficient',
    radarDomain: 'Front-End Engineering',
    domainIndex: 3,
    description: 'Component architecture, declarative UI state, custom hooks, and interactive dashboard interfaces.',
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    category: 'Core Web',
    color: '#F7DF1E',
    level: 90,
    proficiency: 'Mastery',
    radarDomain: 'Front-End Engineering',
    domainIndex: 3,
    description: 'Modern ES6+ syntax, asynchronous control flow, DOM manipulation, and dynamic client-side mechanics.',
  },
  {
    name: 'HTML5',
    icon: 'html',
    category: 'Core Web',
    color: '#E34F26',
    level: 94,
    proficiency: 'Mastery',
    radarDomain: 'Front-End Engineering',
    domainIndex: 3,
    description: 'Accessible semantic markup, SEO-ready structure, audio/video elements, and modern DOM APIs.',
  },
  {
    name: 'CSS3',
    icon: 'css',
    category: 'Core Web',
    color: '#1572B6',
    level: 92,
    proficiency: 'Mastery',
    radarDomain: 'Front-End Engineering',
    domainIndex: 3,
    description: 'Advanced responsive design, Tailwind utilities, CSS variables, glassmorphism, and hardware-accelerated animations.',
  },

  // AI & LLM Systems
  {
    name: 'Prompt Engineering',
    icon: 'prompt',
    category: 'AI',
    color: '#A855F7',
    level: 96,
    proficiency: 'Mastery',
    radarDomain: 'LLM & Agent Systems',
    domainIndex: 4,
    description: 'Few-shot prompting, chain-of-thought orchestration, structured JSON outputs, and adversarial robustness.',
  },
  {
    name: 'Context Engineering',
    icon: 'context',
    category: 'AI',
    color: '#EC4899',
    level: 94,
    proficiency: 'Mastery',
    radarDomain: 'LLM & Agent Systems',
    domainIndex: 4,
    description: 'Retrieval augmentation (RAG), chunking strategies, vector embeddings, and memory optimization.',
  },
  {
    name: 'LangChain',
    icon: 'langchain',
    category: 'AI',
    color: '#10B981',
    level: 89,
    proficiency: 'Advanced',
    radarDomain: 'LLM & Agent Systems',
    domainIndex: 4,
    description: 'Composing multi-step LLM chains, autonomous tool-use agents, and dynamic external API integrations.',
  },
];

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  alignment: 'left' | 'right';
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Python', 'C Language', 'Java', 'R Programming'],
    alignment: 'right',
  },
  {
    id: 'ml',
    title: 'ML & Data Science',
    skills: ['NumPy', 'Pandas', 'Scikit-learn'],
    alignment: 'left',
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Flask', 'FastAPI', 'Node.js'],
    alignment: 'right',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    alignment: 'left',
  },
  {
    id: 'ai',
    title: 'AI',
    skills: ['Prompt Engineering', 'Context Engineering', 'LangChain'],
    alignment: 'right',
  },
  {
    id: 'others',
    title: 'Others',
    skills: ['Jupyter', 'Git Systems'],
    alignment: 'left',
  },
];
