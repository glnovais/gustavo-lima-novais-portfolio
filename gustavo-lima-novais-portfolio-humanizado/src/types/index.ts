import type { LocalizedText } from '../i18n/text';

export type ProjectStatus = 'applied' | 'lab' | 'concept';

export interface Project {
  slug: string;
  index: string;
  title: LocalizedText;
  category: string;
  summary: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText[];
  technologies: string[];
  results: LocalizedText[];
  lessons: LocalizedText[];
  nextSteps: LocalizedText[];
  status: ProjectStatus;
  accent: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  period: string;
  role: LocalizedText;
  company: string;
  environment: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedText[];
  current?: boolean;
}
