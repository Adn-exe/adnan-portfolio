
export interface Project {
  id: string;
  title: string;
  solution: string;
  bulletPoints: string[];
  description?: string;
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
  category: 'Languages' | 'Data Science' | 'Frameworks' | 'Core Web' | 'ML' | 'Backend' | 'Frontend' | 'AI' | 'Others';
  color?: string;
  description?: string;
  level?: number;
  proficiency?: 'Mastery' | 'Advanced' | 'Proficient';
  radarDomain?: string;
  domainIndex?: number;
}

export interface RadarDomain {
  name: string;
  angleDeg: number;
  baseline: number;
  description: string;
}


