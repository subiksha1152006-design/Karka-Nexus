/**
 * KARKA NEXUS AI - Core Type Definitions
 */

export type CareerId = 
  | 'fullstack'
  | 'aiml'
  | 'data-analyst'
  | 'cloud-devops'
  | 'cybersecurity'
  | 'uiux';

export interface CareerPathway {
  id: CareerId;
  title: string;
  tagline: string;
  category: string;
  difficulty: 'Beginner Friendly' | 'Moderate' | 'Advanced';
  avgTimelineMonths: number;
  description: string;
  requiredSkills: { name: string; category: string; importance: 'Core' | 'Recommended' | 'Bonus' }[];
  exampleProjects: { title: string; desc: string; tech: string[] }[];
  learningRoadmap: { stage: number; title: string; summary: string; duration: string }[];
  readinessChecklist: string[];
  idealFor: string[];
}

export interface DNAQuestion {
  id: string;
  title: string;
  subtitle: string;
  isMultiSelect: boolean;
  options: {
    id: string;
    label: string;
    description?: string;
    associatedCareers: CareerId[];
    skillsExtracted?: string[];
  }[];
}

export interface DNAReport {
  generatedAt: string;
  primaryCareer: CareerPathway;
  secondaryCareers: { career: CareerPathway; matchScore: number; reason: string }[];
  matchScore: number;
  whyFit: string[];
  currentSkillsIdentified: string[];
  skillsToDevelop: string[];
  recommendedProjects: {
    title: string;
    description: string;
    tech: string[];
    difficulty: string;
    estimatedDays: number;
  }[];
  thirtyDayPlan: {
    week: number;
    title: string;
    goals: string[];
    keyMilestone: string;
  }[];
  placementAdvice: {
    resumeFocus: string;
    targetPortfolioPiece: string;
    interviewPillar: string;
  };
  radarMetrics: {
    skill: string;
    currentScore: number;
    targetScore: number;
  }[];
}

export interface SkillRating {
  skillId: string;
  name: string;
  category: string;
  currentProficiency: number; // 1 to 5
  targetProficiency: number;  // 1 to 5
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDays: number;
  technology: string[];
  problemStatement: string;
  proposedSolution: string;
  targetUsers: string[];
  features: string[];
  systemArchitecture: {
    frontend: string;
    backend: string;
    database: string;
    externalServices?: string;
  };
  databaseDesign?: {
    entities: { name: string; fields: string[] }[];
    notes: string;
  };
  developmentMilestones: {
    id: string;
    dayRange: string;
    title: string;
    tasks: string[];
    completed?: boolean;
  }[];
  testingChecklist: string[];
  futureEnhancements: string[];
  demoPresentationTips: string[];
  isUserGenerated?: boolean;
  createdAt: string;
}

export interface DailyMission {
  id: string;
  title: string;
  category: 'Coding' | 'System' | 'Placement' | 'Community';
  xp: number;
  completed: boolean;
  targetCount?: number;
  currentCount?: number;
}

export interface SkillBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  earnedDate?: string;
  unlocked: boolean;
  category: string;
}

export interface StudentProfile {
  name: string;
  degree: string;
  targetRole: CareerId;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedMissionIds: string[];
  savedProjectIds: string[];
  customRoadmapProgress: Record<string, boolean>; // stepKey -> completed
  skillProficiencies: Record<string, number>; // skillName -> 1..5
}

export interface InterviewQuestion {
  id: string;
  role: CareerId | 'general';
  topic: 'Programming' | 'Data Structures' | 'SQL' | 'Machine Learning' | 'Web Development' | 'HR & Behavioral' | 'System Design';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  hints: string[];
  conceptExplanation: string;
  idealAnswer: string;
  keyEvaluationKeywords: string[];
}

export interface OpportunityListing {
  id: string;
  organization: string;
  role: string;
  type: 'Internship' | 'Entry-Level' | 'Graduate Program';
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  requiredSkills: string[];
  eligibility: string;
  stipendOrSalary: string;
  deadline: string;
  applicationUrl: string;
  isCuratedSample: boolean;
  saved?: boolean;
  status?: 'Not Applied' | 'Saved' | 'Applied' | 'Interviewing' | 'Offer';
}

export interface StudentShowcaseProject {
  id: string;
  title: string;
  category: 'Artificial Intelligence' | 'Machine Learning' | 'Web Development' | 'Data Analytics' | 'Agriculture Technology' | 'Social Impact' | 'Accessibility Technology';
  problemStatement: string;
  technologies: string[];
  projectStage: 'Prototype' | 'MVP' | 'Production Ready';
  teamMembers?: string;
  summary: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureHighlight: string;
  isUserAdded?: boolean;
  createdAt?: string;
}
