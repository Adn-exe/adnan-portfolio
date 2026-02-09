
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vizaris Studio',
    description: 'An interactive machine learning playground for visual pipeline construction. It bridges the gap between theory and intuition by allowing users to explore data flow across the ML lifecycle in real-time through an architectural lens.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'TypeScript', 'Tailwind', 'ML'],
    link: 'https://vizaris.vercel.app',
    github: 'https://github.com/Adn-exe',
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
    title: 'Coming Soon',
    description: 'Will let you know on 100%',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    tags: ['Python'],
    link: '#',
    role: 'Researcher',
    status: 'In Progress'
  }
];

export const SKILLS: Skill[] = [
  // Programming Languages
  { name: 'Python', icon: 'python', category: 'frontend' }, // Category maps to 'Languages' in UI
  { name: 'C Language', icon: 'c', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'R Programming', icon: 'r', category: 'frontend' },

  // Libraries & Tools
  { name: 'NumPy', icon: 'numpy', category: 'backend' }, // Category maps to 'Data Science'
  { name: 'Pandas', icon: 'pandas', category: 'backend' },
  { name: 'Scikit-learn', icon: 'sklearn', category: 'backend' },
  { name: 'Jupyter', icon: 'jupyter', category: 'backend' },

  // Frameworks & Web
  { name: 'Flask', icon: 'flask', category: 'ai' }, // Category maps to 'Frameworks'
  { name: 'React', icon: 'react', category: 'ai' },
  { name: 'REST API', icon: 'rest', category: 'ai' },
  { name: 'Git Systems', icon: 'git', category: 'ai' },

  // Web Basics
  { name: 'HTML5', icon: 'html', category: 'devops' }, // Category maps to 'Core Web'
  { name: 'CSS3', icon: 'css', category: 'devops' },
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
