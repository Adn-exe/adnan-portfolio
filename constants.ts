
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

export const SKILLS: Skill[] = [
  // Programming Languages
  {
    name: 'Python',
    icon: 'python',
    category: 'Languages',
    color: '#3776AB',
    description: 'My primary language for AI/ML development, data analysis, and backend logic. I leverage its vast ecosystem to build scalable, intelligent systems.',
  },
  {
    name: 'C Language',
    icon: 'c',
    category: 'Languages',
    color: '#A8B9CC',
    description: 'The foundation of my understanding of memory management and low-level system architecture. Crucial for optimizing performance-critical components.',
  },
  {
    name: 'Java',
    icon: 'java',
    category: 'Languages',
    color: '#E76F00',
    description: 'Object-oriented programming language widely used for building enterprise-grade backend systems, scalable architectures, and robust services.',
  },
  {
    name: 'R Programming',
    icon: 'r',
    category: 'Languages',
    color: '#276DC3',
    description: 'Used for specialized statistical analysis and data visualization. A powerful tool for uncovering deep insights from complex datasets.',
  },

  // Data Science / ML
  {
    name: 'NumPy',
    icon: 'numpy',
    category: 'Data Science',
    color: '#013243',
    description: 'The core of my numerical computing stack. I use it for efficient matrix operations and handling large-dimensional arrays in ML pipelines.',
  },
  {
    name: 'Pandas',
    icon: 'pandas',
    category: 'Data Science',
    color: '#150458',
    description: 'My go-to tool for data manipulation and cleaning. It streamlines the process of transforming raw data into analysis-ready structures.',
  },
  {
    name: 'Scikit-learn',
    icon: 'sklearn',
    category: 'Data Science',
    color: '#F7931E',
    description: 'Rapid prototyping and implementation of standard ML algorithms. Perfect for building baseline models and exploring feature importance.',
  },

  // Backend & APIs
  {
    name: 'Flask',
    icon: 'flask',
    category: 'Frameworks',
    color: '#FFFFFF',
    description: 'A lightweight framework for deploying ML models as APIs. Its simplicity allows for quick integration of AI services into web applications.',
  },
  {
    name: 'FastAPI',
    icon: 'fastapi',
    category: 'Frameworks',
    color: '#059669',
    description: 'High-performance Python web framework for building modern APIs with asynchronous support and automatic OpenAPI documentation.',
  },
  {
    name: 'Node.js',
    icon: 'node.js',
    category: 'Frameworks',
    color: '#539E43',
    description: 'Asynchronous event-driven JavaScript runtime designed to build scalable, high-throughput network applications and backend APIs.',
  },

  // Frontend
  {
    name: 'React',
    icon: 'react',
    category: 'Frameworks',
    color: '#61DAFB',
    description: 'Building dynamic, responsive user interfaces. I love its component-based architecture for creating interactive dashboards and tools.',
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    category: 'Core Web',
    color: '#F7DF1E',
    description: 'The core scripting language of the web. Essential for creating dynamic interactions, animations, and frontend logic.',
  },
  {
    name: 'HTML5',
    icon: 'html',
    category: 'Core Web',
    color: '#E34F26',
    description: 'Structure and semantics. The backbone of the web, ensuring content is accessible and properly organized.',
  },
  {
    name: 'CSS3',
    icon: 'css',
    category: 'Core Web',
    color: '#1572B6',
    description: 'Styling and layout. I use modern CSS features to create visually engaging, responsive, and polished user experiences.',
  },

  // AI
  {
    name: 'Prompt Engineering',
    icon: 'prompt',
    category: 'AI',
    color: '#A855F7',
    description: 'Crafting precise, structured prompts that guide LLMs toward accurate, contextually rich outputs for real-world applications.',
  },
  {
    name: 'Context Engineering',
    icon: 'context',
    category: 'AI',
    color: '#EC4899',
    description: 'Designing information architectures and retrieval strategies that feed optimal context windows to AI systems.',
  },
  {
    name: 'LangChain',
    icon: 'langchain',
    category: 'AI',
    color: '#10B981',
    description: 'Framework for developing dynamic LLM applications, retrieval-augmented generation (RAG) pipelines, and autonomous agent workflows.',
  },

  // Others
  {
    name: 'Jupyter',
    icon: 'jupyter',
    category: 'Others',
    color: '#F37626',
    description: 'My interactive laboratory for data exploration. It allows me to document my thought process, visualize results, and iterate quickly.',
  },
  {
    name: 'Git Systems',
    icon: 'git',
    category: 'Others',
    color: '#F05032',
    description: 'Version control is non-negotiable. I use Git to track changes, collaborate efficiently, and maintain the integrity of my codebases.',
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
