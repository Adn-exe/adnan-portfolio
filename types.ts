
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  role: string;
  status?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'Languages' | 'Data Science' | 'Frameworks' | 'Core Web';
  color?: string;
  description?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
