
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SmartHandel',
    solution: 'An AI-powered grocery shopping assistant that compares real-time prices and offers across stores and determines cost-efficient shopping routes.',
    bulletPoints: [
      'Built an AI shopping-list parser using Google Gemini to convert natural-language requests into structured grocery items.',
      'Integrated grocery pricing and promotional data with single- vs. multi-store price optimization.',
      'Developed a mobile-first PWA with interactive maps, route visualization, caching, localization, and optimized shopping workflows.'
    ],
    description: 'An AI-powered grocery shopping assistant that compares real-time prices and offers across stores.',
    image: '/projectImages/smartHandel.webp',
    tags: ['Paid Project', 'Freelancer', 'React', 'TypeScript', 'Node.js', 'Express', 'Gemini API', 'Leaflet', 'PWA'],
    badges: ['Paid Project', 'Freelancer'],
    link: '',
    github: 'https://github.com/Adn-exe/smarthandel-mvp',
    role: 'Full Stack Dev'
  },
  {
    id: '2',
    title: 'Qubiq Academy',
    solution: 'An interactive quantum computing learning platform combining quantum circuit building, simulation, visualization, coding challenges, and AI-assisted learning.',
    bulletPoints: [
      'Built an interactive quantum circuit composer supporting multiple quantum gates and circuit manipulation.',
      'Implemented statevector simulation with probability sampling and quantum-state visualization.',
      'Added 3D Bloch sphere visualizations, Qiskit code generation, interactive challenges, and a Gemini-powered AI tutor.'
    ],
    description: 'An interactive quantum computing platform with visual simulation and AI tutoring.',
    image: '/projectImages/qubicAcademy.png',
    tags: ['React', 'TypeScript', 'Three.js', 'Qiskit', 'Supabase', 'Zustand'],
    link: 'https://qubic-academy.vercel.app/',
    github: 'https://github.com/Adn-exe/QubicAcademy/',
    role: 'Lead Architect'
  },
  {
    id: '3',
    title: 'Vizaris Studio',
    solution: 'A no-code machine learning learning platform that lets beginners explore data preprocessing, model training, visualization, and model interpretation through an interactive interface.',
    bulletPoints: [
      'Built a visual ML workflow for dataset cleaning, preprocessing, model training, and result analysis.',
      'Added interactive visualizations for Logistic Regression, Decision Trees, and Random Forests.',
      'Integrated Google Gemini as an AI learning assistant for contextual ML explanations.'
    ],
    description: 'A no-code machine learning platform for interactive workflow construction and model interpretation.',
    image: '/projectImages/vizaris.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    link: 'https://vizaris.vercel.app',
    github: 'https://github.com/Adn-exe/Vizaris',
    role: 'Lead Architect'
  },
  {
    id: '4',
    title: 'Rakshak',
    solution: 'An AI-powered infrastructure safety platform that analyzes photographs of potentially damaged infrastructure and generates explainable risk assessments.',
    bulletPoints: [
      'Built an AI vision pipeline for analyzing infrastructure images and generating risk assessments.',
      'Designed citizen reporting and authority dashboards for submitting and reviewing infrastructure reports.',
      'Added multilingual support, interactive maps, image-quality validation, and AI model failover.'
    ],
    description: 'An AI-powered infrastructure safety platform for explainable civic risk assessments.',
    image: '/projectImages/rakshak.webp',
    tags: ['Next.js', 'FastAPI', 'Python', 'OpenCV', 'Gemini Vision'],
    link: '',
    github: 'https://github.com/Adn-exe/Rakshak',
    role: 'Lead AI Engineer'
  },
  {
    id: '5',
    title: 'Soul Nest',
    solution: 'A minimalist social journaling platform designed around sharing thoughts, expressing moods, and connecting through personal reflections.',
    bulletPoints: [
      'Developed a Flask-based platform for creating, managing, and sharing thoughts.',
      'Implemented user feeds, comments, mood selection, and social interactions.',
      'Built the backend using Flask and SQLAlchemy with persistent data storage and a responsive interface.'
    ],
    description: 'A minimalist social journaling platform for sharing thoughts and reflections.',
    image: '/projectImages/soulNest.webp',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Bootstrap'],
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
    description: 'C, Python, R, and JavaScript proficiency for algorithm design and systems execution.',
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
    description: 'Relational and document databases: MySQL, MongoDB, Supabase, and Firebase.',
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
    level: 30,
    proficiency: 'Beginner',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Basic familiarity with statistical functions, simple data frames, and introductory plotting.',
  },

  {
    name: 'JavaScript',
    icon: 'javascript',
    category: 'Languages',
    color: '#F7DF1E',
    level: 30,
    proficiency: 'Beginner',
    radarDomain: 'Programming Languages',
    domainIndex: 0,
    description: 'Very basic syntax familiarity, simple console output, and introductory programming concepts.',
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
    level: 40,
    proficiency: 'Beginner',
    radarDomain: 'Frameworks & Libraries',
    domainIndex: 1,
    description: 'Basic server setup, simple route handling, and introductory middleware concepts.',
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
    level: 80,
    proficiency: 'Advanced',
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
    skills: ['C', 'Python', 'R', 'JavaScript'],
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
    skills: ['MySQL', 'MongoDB', 'Supabase', 'Firebase'],
    alignment: 'left',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    skills: ['Teamwork', 'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability', 'Creative Writing'],
    alignment: 'right',
  },
];
