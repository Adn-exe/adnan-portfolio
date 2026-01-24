
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
  category: 'frontend' | 'backend' | 'devops' | 'ai';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
