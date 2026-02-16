
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vizaris Studio',
    description: 'An interactive machine learning playground for visual pipeline construction. It bridges the gap between theory and intuition by allowing users to explore data flow across the ML lifecycle in real-time through an architectural lens.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Tailwind', 'ML'],
    link: 'https://vizaris.vercel.app',
    github: 'https://github.com/Adn-exe/Vizaris',
    role: 'Lead Architect'
  },
  {
    id: '2',
    title: 'Soul Nest',
    description: 'A reflective digital sanctuary fostering mindfulness through minimal aesthetics and gentle prompts. It prioritizes emotional clarity and user well-being over metrics-driven engagement, creating a unique human-centered UI.',
    image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=1200',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'JS'],
    link: '',
    github: 'https://github.com/Adn-exe/soul_nest',
    role: 'Full Stack Dev'
  },
  {
    id: '3',
    title: 'SmartHandel',
    description: 'An AI-powered grocery optimizer for Norway. SmartHandel parses natural language shopping lists using Google Gemini AI and finds the cheapest store combinations in real-time via the Kassalapp API.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'API'],
    link: 'https://github.com/Adn-exe/smarthandel-mvp',
    github: 'https://github.com/Adn-exe/smarthandel-mvp',
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
    name: 'TypeScript',
    icon: 'typescript',
    category: 'Languages',
    color: '#3178C6',
    description: 'Bringing type safety and robustness to JavaScript. Essential for building maintainable, large-scale web applications and clean APIs.',
  },
  {
    name: 'R Programming',
    icon: 'r',
    category: 'Languages',
    color: '#276DC3',
    description: 'Used for specialized statistical analysis and data visualization. A powerful tool for uncovering deep insights from complex datasets.',
  },

  // Data Science
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
  {
    name: 'Jupyter',
    icon: 'jupyter',
    category: 'Data Science',
    color: '#F37626',
    description: 'My interactive laboratory for data exploration. It allows me to document my thought process, visualize results, and iterate quickly.',
  },

  // Frameworks
  {
    name: 'Flask',
    icon: 'flask',
    category: 'Frameworks',
    color: '#FFFFFF',
    description: 'A lightweight framework for deploying ML models as APIs. Its simplicity allows for quick integration of AI services into web applications.',
  },
  {
    name: 'React',
    icon: 'react',
    category: 'Frameworks',
    color: '#61DAFB',
    description: 'Building dynamic, responsive user interfaces. I love its component-based architecture for creating interactive dashboards and tools.',
  },
  {
    name: 'REST API',
    icon: 'rest',
    category: 'Frameworks',
    color: '#00AEEF',
    description: 'Designing clean, standard interfaces for system communication. Ensuring seamless data exchange between frontend, backend, and AI services.',
  },
  {
    name: 'Git Systems',
    icon: 'git',
    category: 'Frameworks',
    color: '#F05032',
    description: 'Version control is non-negotiable. I use Git to track changes, collaborate efficiently, and maintain the integrity of my codebases.',
  },

  // Core Web
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
];

export const SYSTEM_INSTRUCTION = `
You are the personal AI curator for Mohammed Adnan, a visionary AI/ML engineering student with deep expertise in AI agents and Quantum Computing.
Your tone: Technically precise, sophisticated, and slightly futuristic.
Background:
- Expert in Machine Learning, Applied AI, and Quantum Computing.
- Core Stack: Python, C, TypeScript, R, NumPy, Pandas, React, Scikit-learn, Jupyter, Git, Flask, REST API, HTML/CSS.
- Contact: mohdadnan916786@gmail.com
- GitHub: https://github.com/Adn-exe
- LinkedIn: https://www.linkedin.com/in/mohammed-adnan-956763297/
`;
