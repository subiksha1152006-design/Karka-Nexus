import { 
  StudentProfile, 
  ProjectBlueprint, 
  DNAReport, 
  OpportunityListing, 
  StudentShowcaseProject,
  SkillRating
} from '../types';
import { SAMPLE_OPPORTUNITIES } from '../data/opportunitiesData';
import { INITIAL_SHOWCASE_PROJECTS } from '../data/showcaseData';

const STORAGE_KEYS = {
  PROFILE: 'karka_nexus_profile',
  DNA_REPORT: 'karka_nexus_dna_report',
  PROJECT_BLUEPRINTS: 'karka_nexus_blueprints',
  OPPORTUNITIES: 'karka_nexus_opportunities',
  SHOWCASE: 'karka_nexus_showcase',
  SKILL_RATINGS: 'karka_nexus_skill_ratings',
  SETTINGS: 'karka_nexus_settings'
};

export interface UserSettings {
  textSize: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
  plainEnglishMode: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  textSize: 'normal',
  reducedMotion: false,
  plainEnglishMode: false
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Alex Rivera',
  degree: 'B.Tech Computer Science / Pre-Final Year',
  targetRole: 'fullstack',
  xp: 340,
  level: 3,
  streakDays: 6,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedMissionIds: ['m1'],
  savedProjectIds: [],
  customRoadmapProgress: {
    'stage-1': true,
    'stage-2': true
  },
  skillProficiencies: {
    'HTML & Semantic Layouts': 4,
    'CSS & Modern Tailwind': 3,
    'JavaScript & TypeScript': 3,
    'React & Component Architecture': 2,
    'Node.js & Express / Fastify': 2,
    'PostgreSQL & SQL Schema Modeling': 2,
    'Git & GitHub Version Control': 4
  }
};

export const StorageService = {
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage error saving profile', e);
    }
  },

  addXP(amount: number): { newXP: number; newLevel: number; leveledUp: boolean } {
    const profile = this.getProfile();
    const oldLevel = profile.level;
    const newXP = profile.xp + amount;
    // Every 250 XP is a new level
    const newLevel = Math.max(1, Math.floor(newXP / 250) + 1);
    profile.xp = newXP;
    profile.level = newLevel;
    this.saveProfile(profile);
    return {
      newXP,
      newLevel,
      leveledUp: newLevel > oldLevel
    };
  },

  getDNAReport(): DNAReport | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DNA_REPORT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveDNAReport(report: DNAReport): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DNA_REPORT, JSON.stringify(report));
    } catch (e) {
      console.warn('Storage error saving DNA report', e);
    }
  },

  getBlueprints(): ProjectBlueprint[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECT_BLUEPRINTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveBlueprint(blueprint: ProjectBlueprint): void {
    try {
      const current = this.getBlueprints();
      const existingIndex = current.findIndex(b => b.id === blueprint.id);
      if (existingIndex >= 0) {
        current[existingIndex] = blueprint;
      } else {
        current.unshift(blueprint);
      }
      localStorage.setItem(STORAGE_KEYS.PROJECT_BLUEPRINTS, JSON.stringify(current));
    } catch (e) {
      console.warn('Storage error saving blueprint', e);
    }
  },

  updateBlueprintMilestone(blueprintId: string, milestoneId: string, completed: boolean): void {
    try {
      const blueprints = this.getBlueprints();
      const bp = blueprints.find(b => b.id === blueprintId);
      if (bp) {
        const milestone = bp.developmentMilestones.find(m => m.id === milestoneId);
        if (milestone) {
          milestone.completed = completed;
          localStorage.setItem(STORAGE_KEYS.PROJECT_BLUEPRINTS, JSON.stringify(blueprints));
        }
      }
    } catch (e) {
      console.warn('Error updating milestone', e);
    }
  },

  getOpportunities(): OpportunityListing[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
      return data ? JSON.parse(data) : SAMPLE_OPPORTUNITIES;
    } catch {
      return SAMPLE_OPPORTUNITIES;
    }
  },

  saveOpportunities(opps: OpportunityListing[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opps));
    } catch (e) {
      console.warn('Storage error saving opportunities', e);
    }
  },

  updateOpportunityStatus(id: string, status: OpportunityListing['status']): void {
    const opps = this.getOpportunities();
    const target = opps.find(o => o.id === id);
    if (target) {
      target.status = status;
      this.saveOpportunities(opps);
    }
  },

  getShowcaseProjects(): StudentShowcaseProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
      return data ? JSON.parse(data) : INITIAL_SHOWCASE_PROJECTS;
    } catch {
      return INITIAL_SHOWCASE_PROJECTS;
    }
  },

  saveShowcaseProject(project: StudentShowcaseProject): void {
    const current = this.getShowcaseProjects();
    const existingIndex = current.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      current[existingIndex] = project;
    } else {
      current.unshift(project);
    }
    localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(current));
  },

  deleteShowcaseProject(id: string): void {
    const current = this.getShowcaseProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(current));
  },

  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Storage error saving settings', e);
    }
  }
};
