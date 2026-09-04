
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SmartHandel',
    description: 'An AI-powered grocery optimizer for Norway. SmartHandel parses natural language shopping lists using Google Gemini AI and finds the cheapest store combinations in real-time via the Kassalapp API.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'API'],
    link: '',
    github: 'https://github.com/Adn-exe/smarthandel-mvp',
    role: 'Full Stack Dev'
  },
  {
    id: '2',
    title: 'Vizaris Studio',
    description: 'An interactive machine learning playground for visual pipeline construction. It bridges the gap between theory and intuition by allowing users to explore data flow across the ML lifecycle in real-time through an architectural lens.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Tailwind', 'ML'],
    link: 'https://vizaris.vercel.app',
    github: 'https://github.com/Adn-exe/Vizaris',
    role: 'Lead Architect'
  },
  {
    id: '3',
    title: 'Rakshak',
    description: 'Rakshak is an AI-powered infrastructure safety platform that lets citizens report visible damage to flood-prone and critical structures, analyzes the evidence, and generates an explainable 0–100 risk score. Authorities can then review these reports, prioritize high-risk locations, and conduct field inspections before potential failures become disasters.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenCV', 'LLM'],
    link: '',
    github: 'https://github.com/Adn-exe/Rakshak',
    role: 'Lead AI Engineer'
  },
  {
    id: '4',
    title: 'Soul Nest',
    description: 'A reflective digital sanctuary fostering mindfulness through minimal aesthetics and gentle prompts. It prioritizes emotional clarity and user well-being over metrics-driven engagement, creating a unique human-centered UI.',
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=1200',
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
