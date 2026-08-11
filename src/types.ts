export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: 'Available' | 'Coming Soon' | 'In Development';
  badge: string;
  features: string[];
  actionLabel: string;
  isInteractive?: boolean;
}

export interface SolutionCategory {
  id: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  featured?: boolean;
  imageBg: string;
  stats?: string;
  details: {
    clientType: string;
    timeline: string;
    overview: string;
  };
}

export interface WhyAnivexCard {
  title: string;
  description: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  technology: string[];
  result: string;
}
