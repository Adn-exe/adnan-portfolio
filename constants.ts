
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
    name: 'Programming Languages',
    angleDeg: -90, // Top
    baseline: 78,
    description: 'C, Python, R, SQL, and JavaScript proficiency for algorithm design and systems execution.',
  },
  {
    name: 'Frameworks & Libraries',
    angleDeg: -30, // Top-Right
    baseline: 75,
    description: 'Component architecture and web backends: React, Node.js, Flask, and Django.',
  },
  {
    name: 'Databases & Storage',
    angleDeg: 30, // Bottom-Right
    baseline: 70,
    description: 'Relational and document databases: MySQL, SQLite, MongoDB, Supabase, and Firebase.',
  },
  {
    name: 'Tools & Platforms',
    angleDeg: 90, // Bottom
    baseline: 81,
    description: 'Developer ecosystems: Git, Stitch, Codex, Antigravity, and Canva.',
  },
  {
    name: 'Soft Skills & Leadership',
    angleDeg: 150, // Bottom-Left
    baseline: 82,
    description: 'Teamwork, time management, active collaboration, and reliable project delivery.',
  },
  {
    name: 'Analytical & Problem Solving',
    angleDeg: 210, // Top-Left
    baseline: 83,
    description: 'Critical thinking, root-cause diagnosis, and rapid situational adaptability.',
  },
];

export const SKILLS: Skill[] = [
  // Programming Languages
  {
    name: 'C',
    icon: 'c',
    category: 'Languages',
    color: '#A8B9CC',
    level: 80,
    proficiency: 'Advanced',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Foundational understanding of pointers, manual memory allocation, data structures, and low-level system execution.',
  },
  {
    name: 'Python',
    icon: 'python',
    category: 'Languages',
    color: '#3776AB',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Core language for AI/ML pipelines, backend development, scripting automation, and computational modeling.',
  },
  {
    name: 'R',
    icon: 'r',
    category: 'Languages',
    color: '#276DC3',
    level: 70,
    proficiency: 'Intermediate',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Statistical modeling, hypothesis testing, data analysis, and exploratory scientific visualization.',
  },
  {
    name: 'SQL',
    icon: 'sql',
    category: 'Languages',
    color: '#00758F',
    level: 72,
    proficiency: 'Intermediate',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Relational queries, complex joins, indexing strategies, schema modeling, and aggregate data transformations.',
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    category: 'Languages',
    color: '#F7DF1E',
    level: 56,
    proficiency: 'Beginner',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Fundamental syntax, basic DOM manipulation, simple functions, and core programming concepts.',
  },

  // Frameworks & Libraries
  {
    name: 'React',
    icon: 'react',
    category: 'Frameworks',
    color: '#61DAFB',
    level: 52,
    proficiency: 'Beginner',
    radarDomain: 'Frameworks & Libraries',
    domainIndex: 1,
    description: 'Component fundamentals, basic JSX structure, simple props, and essential hook basics.',
  },
  {
    name: 'Node.js',
    icon: 'node.js',
    category: 'Frameworks',
    color: '#539E43',
    level: 70,
    proficiency: 'Intermediate',
    radarDomain: 'Frameworks & Libraries',
    domainIndex: 1,
    description: 'Non-blocking event-driven JavaScript runtime for scalable backend services, REST APIs, and middleware.',
  },
  {
    name: 'Flask',
    icon: 'flask',
    category: 'Frameworks',
    color: '#FFFFFF',
    level: 81,
    proficiency: 'Advanced',
    radarDomain: 'Frameworks & Libraries',
    domainIndex: 1,
    description: 'Lightweight WSGI Python framework for rapid API prototyping, microservices, and web endpoints.',
  },
  {
    name: 'Django',
    icon: 'django',
    category: 'Frameworks',
    color: '#092E20',
    level: 70,
    proficiency: 'Intermediate',
    radarDomain: 'Frameworks & Libraries',
    domainIndex: 1,
    description: 'Batteries-included Python web framework with robust ORM, authentication, and secure application architecture.',
  },

  // Tools & Platforms
  {
    name: 'Git',
    icon: 'git',
    category: 'Tools',
    color: '#F05032',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Tools & Platforms',
    domainIndex: 3,
    description: 'Distributed version control, branching workflows, history inspection, merging, and release management.',
  },
  {
    name: 'Stitch',
    icon: 'stitch',
    category: 'Tools',
    color: '#6366F1',
    level: 79,
    proficiency: 'Advanced',
    radarDomain: 'Tools & Platforms',
    domainIndex: 3,
    description: 'Rapid UI screen generation, design systems, visual prototyping, and agile layout composition.',
  },
  {
    name: 'Codex',
    icon: 'codex',
    category: 'Tools',
    color: '#10A37F',
    level: 80,
    proficiency: 'Advanced',
    radarDomain: 'Tools & Platforms',
    domainIndex: 3,
    description: 'AI-assisted code generation, semantic synthesis, automated test scaffolding, and developer acceleration.',
  },
  {
    name: 'Antigravity',
    icon: 'antigravity',
    category: 'Tools',
    color: '#00D1FF',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Tools & Platforms',
    domainIndex: 3,
    description: 'Autonomous AI agent workflows, IDE pair programming, multi-agent coordination, and full-stack orchestration.',
  },
  {
    name: 'Canva',
    icon: 'canva',
    category: 'Tools',
    color: '#00C4CC',
    level: 79,
    proficiency: 'Advanced',
    radarDomain: 'Tools & Platforms',
    domainIndex: 3,
    description: 'Visual communication design, digital asset preparation, presentation graphics, and design mockups.',
  },

  // Databases
  {
    name: 'MySQL',
    icon: 'mysql',
    category: 'Databases',
    color: '#00758F',
    level: 54,
    proficiency: 'Beginner',
    radarDomain: 'Databases & Storage',
    domainIndex: 2,
    description: 'Foundational SQL queries, basic table structures, simple SELECT queries, and basic CRUD operations.',
  },
  {
    name: 'SQLite',
    icon: 'sqlite',
    category: 'Databases',
    color: '#003B57',
    level: 72,
    proficiency: 'Intermediate',
    radarDomain: 'Databases & Storage',
    domainIndex: 2,
    description: 'Lightweight serverless SQL database engine embedded in client applications, prototypes, and tests.',
  },
  {
    name: 'MongoDB',
    icon: 'mongodb',
    category: 'Databases',
    color: '#47A248',
    level: 70,
    proficiency: 'Intermediate',
    radarDomain: 'Databases & Storage',
    domainIndex: 2,
    description: 'NoSQL document database, flexible JSON document schemas, indexing, and scalable aggregation pipelines.',
  },
  {
    name: 'Supabase',
    icon: 'supabase',
    category: 'Databases',
    color: '#3ECF8E',
    level: 70,
    proficiency: 'Intermediate',
    radarDomain: 'Databases & Storage',
    domainIndex: 2,
    description: 'Open-source backend-as-a-service powered by PostgreSQL with instant REST APIs, auth, and real-time streams.',
  },
  {
    name: 'Firebase',
    icon: 'firebase',
    category: 'Databases',
    color: '#FFCA28',
    level: 68,
    proficiency: 'Intermediate',
    radarDomain: 'Databases & Storage',
    domainIndex: 2,
    description: 'Real-time document storage via Firestore, serverless cloud functions, and real-time client state sync.',
  },

  // Soft Skills
  {
    name: 'Teamwork',
    icon: 'teamwork',
    category: 'Soft Skills',
    color: '#38BDF8',
    level: 83,
    proficiency: 'Advanced',
    radarDomain: 'Soft Skills & Leadership',
    domainIndex: 4,
    description: 'Cross-functional collaboration, active listening, clear team communication, and cooperative sprint delivery.',
  },
  {
    name: 'Problem Solving',
    icon: 'problem-solving',
    category: 'Soft Skills',
    color: '#F59E0B',
    level: 84,
    proficiency: 'Advanced',
    radarDomain: 'Analytical & Problem Solving',
    domainIndex: 5,
    description: 'Systematic root-cause diagnosis, algorithmic reasoning, identifying trade-offs, and pragmatic solution design.',
  },
  {
    name: 'Critical Thinking',
    icon: 'critical-thinking',
    category: 'Soft Skills',
    color: '#8B5CF6',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Analytical & Problem Solving',
    domainIndex: 5,
    description: 'Objective evaluation of complex arguments, empirical validation, and data-informed decision making.',
  },
  {
    name: 'Time Management',
    icon: 'time-management',
    category: 'Soft Skills',
    color: '#10B981',
    level: 80,
    proficiency: 'Advanced',
    radarDomain: 'Soft Skills & Leadership',
    domainIndex: 4,
    description: 'Sprint planning, milestone tracking, priority triage, and disciplined execution against tight deadlines.',
  },
  {
    name: 'Adaptability',
    icon: 'adaptability',
    category: 'Soft Skills',
    color: '#EC4899',
    level: 83,
    proficiency: 'Advanced',
    radarDomain: 'Analytical & Problem Solving',
    domainIndex: 5,
    description: 'Rapid learning curve with emerging tech stacks, thriving in dynamic environments, and welcoming feedback.',
  },
  {
    name: 'Creative Writing',
    icon: 'creative-writing',
    category: 'Soft Skills',
    color: '#E879F9',
    level: 82,
    proficiency: 'Advanced',
    radarDomain: 'Analytical & Problem Solving',
    domainIndex: 5,
    description: 'Narrative storytelling, reflective essays, structured prose, and creative communication.',
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
    title: 'Programming Languages',
    skills: ['C', 'Python', 'R', 'SQL', 'JavaScript'],
    alignment: 'right',
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'Flask', 'Django'],
    alignment: 'left',
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    skills: ['Git', 'Stitch', 'Codex', 'Antigravity', 'Canva'],
    alignment: 'right',
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['MySQL', 'SQLite', 'MongoDB', 'Supabase', 'Firebase'],
    alignment: 'left',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    skills: ['Teamwork', 'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability', 'Creative Writing'],
    alignment: 'right',
  },
];
