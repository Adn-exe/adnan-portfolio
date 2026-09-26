
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
  badges?: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Databases' | 'Soft Skills' | string;
  color?: string;
  description?: string;
  level?: number;
  proficiency?: 'Mastery' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Beginner' | string;
  radarDomain?: string;
  domainIndex?: number;
}

export interface RadarDomain {
  name: string;
  angleDeg: number;
  baseline: number;
  description: string;
}


