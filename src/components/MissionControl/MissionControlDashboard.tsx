import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Zap, 
  Award, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Bookmark, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  FolderGit2, 
  ListChecks, 
  Sparkles, 
  Code 
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { StudentProfile, ProjectBlueprint, DailyMission, SkillBadge } from '../../types';
import { CAREER_PATHWAYS } from '../../data/careersData';

export const MissionControlDashboard: React.FC<{
  onNavigateToTab: (tab: string) => void;
}> = ({ onNavigateToTab }) => {
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile());
  const [blueprints, setBlueprints] = useState<ProjectBlueprint[]>(StorageService.getBlueprints());
  const [completedDailyIds, setCompletedDailyIds] = useState<string[]>(profile.completedMissionIds || []);

  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>([
    { id: 'm1', title: 'Complete one conceptual question in Interview Arena', category: 'Placement', xp: 30, completed: true },
    { id: 'm2', title: 'Advance one milestone in your active Project Blueprint', category: 'Coding', xp: 45, completed: false },
    { id: 'm3', title: 'Audit and adjust proficiency ratings in Skill Gap Radar', category: 'System', xp: 25, completed: false },
    { id: 'm4', title: 'Verify resume action verbs against Placement Checklist', category: 'Placement', xp: 35, completed: false },
    { id: 'm5', title: 'Commit code milestone to GitHub repository', category: 'Coding', xp: 40, completed: false }
  ]);

  const skillBadges: SkillBadge[] = [
    { id: 'b1', name: 'DNA Pioneer', description: 'Generated your personalized AI Career DNA Report', iconName: 'Dna', category: 'Discovery', unlocked: true },
    { id: 'b2', name: 'Radar Calibrator', description: 'Assessed technical strengths against entry benchmark', iconName: 'Target', category: 'Diagnostics', unlocked: true },
    { id: 'b3', name: 'Blueprint Architect', description: 'Created an industry-standard 12-point project plan', iconName: 'FolderGit2', category: 'Engineering', unlocked: blueprints.length > 0 },
    { id: 'b4', name: 'Arena Gladiator', description: 'Scored 80+ in an AI Interview practice round', iconName: 'MessageSquareCode', category: 'Placement', unlocked: false },
    { id: 'b5', name: '7-Day Velocity', description: 'Maintained 7 consecutive active study days', iconName: 'Flame', category: 'Habits', unlocked: profile.streakDays >= 7 }
  ];

  // Refresh profile on mount or storage event
  useEffect(() => {
    const handleStorage = () => {
      setProfile(StorageService.getProfile());
      setBlueprints(StorageService.getBlueprints());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleToggleMission = (missionId: string, currentCompleted: boolean, xpAmount: number) => {
    const updated = dailyMissions.map(m => {
      if (m.id === missionId) {
        return { ...m, completed: !currentCompleted };
      }
      return m;
    });
    setDailyMissions(updated);

    const updatedProfile = { ...profile };
    if (!currentCompleted) {
      // Award XP
      const { newXP, newLevel } = StorageService.addXP(xpAmount);
      updatedProfile.xp = newXP;
      updatedProfile.level = newLevel;
      if (!updatedProfile.completedMissionIds.includes(missionId)) {
        updatedProfile.completedMissionIds.push(missionId);
      }
    } else {
      updatedProfile.completedMissionIds = updatedProfile.completedMissionIds.filter(id => id !== missionId);
    }
    StorageService.saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setCompletedDailyIds(updatedProfile.completedMissionIds);
  };

  const targetCareer = CAREER_PATHWAYS.find(c => c.id === profile.targetRole) || CAREER_PATHWAYS[0];

  const levelProgressPercent = ((profile.xp % 250) / 250) * 100;
  const nextLevelXP = (profile.level * 250) - profile.xp;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Mission Control Command Center</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {profile.name}
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1">
            Targeting: <strong className="text-white">{targetCareer.title}</strong> · {profile.degree}
          </p>
        </div>

        {/* Gamified HUD */}
        <div className="flex items-center gap-4 bg-[#101525] p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 pr-3 border-r border-white/10">
            <Flame className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Streak</span>
              <span className="font-mono font-bold text-white text-sm">{profile.streakDays} Days</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-3 border-r border-white/10">
            <Zap className="w-5 h-5 text-[#40F5D0]" />
            <div>
              <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Experience</span>
              <span className="font-mono font-bold text-[#40F5D0] text-sm">{profile.xp} XP</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-[#A78BFA] block">Rank Tier</span>
            <span className="font-mono font-bold text-white text-sm">Level {profile.level}</span>
          </div>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#40F5D0] font-semibold">Tier Progress: Level {profile.level}</span>
          <span className="text-[#9CA7BD]">{nextLevelXP} XP until Level {profile.level + 1}</span>
        </div>
        <div className="w-full h-2 bg-[#080B14] rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-[#40F5D0] to-[#A78BFA] rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(5, levelProgressPercent))}%` }}
          />
        </div>
      </div>

      {/* Grid: Daily Missions & Saved Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Daily Missions & Weekly Challenges */}
        <div className="lg:col-span-7 space-y-6">
          {/* Daily Missions */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Daily Career Missions
                </h3>
                <p className="text-xs text-[#9CA7BD]">Complete actionable tasks to gain momentum and XP</p>
              </div>
              <span className="text-xs font-mono text-[#40F5D0]">
                {dailyMissions.filter(m => m.completed).length} / {dailyMissions.length} Complete
              </span>
            </div>

            <div className="space-y-2.5">
              {dailyMissions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    mission.completed
                      ? 'bg-[#101525]/70 border-emerald-500/30 text-white/70'
                      : 'bg-[#080B14] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleMission(mission.id, mission.completed, mission.xp)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                        mission.completed
                          ? 'bg-emerald-500 border-emerald-400 text-[#080B14]'
                          : 'border-white/20 bg-white/5 hover:border-[#40F5D0]'
                      }`}
                      aria-label={`Toggle mission ${mission.title}`}
                    >
                      {mission.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div>
                      <h4 className={`text-xs font-semibold ${mission.completed ? 'line-through text-[#9CA7BD]' : 'text-white'}`}>
                        {mission.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#9CA7BD] uppercase tracking-wider">
                        {mission.category} Track
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${
                    mission.completed 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-[#40F5D0]/10 text-[#40F5D0] border-[#40F5D0]/30'
                  }`}>
                    +{mission.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Learning Sprint Plan */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Current Weekly Sprint Plan
              </h3>
              <span className="text-xs text-[#A78BFA] font-mono">7-Day Horizon</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#40F5D0] block">Days 1–2</span>
                <h5 className="text-xs font-bold text-white">Algorithm & SQL Practice</h5>
                <p className="text-[11px] text-[#9CA7BD]">Practice 5 queries in Interview Arena</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#A78BFA] block">Days 3–5</span>
                <h5 className="text-xs font-bold text-white">Capstone Milestone 02</h5>
                <p className="text-[11px] text-[#9CA7BD]">Connect REST endpoints to PostgreSQL schema</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-emerald-400 block">Days 6–7</span>
                <h5 className="text-xs font-bold text-white">Portfolio README Polish</h5>
                <p className="text-[11px] text-[#9CA7BD]">Draft architecture diagram and deployment</p>
              </div>
            </div>
          </div>

          {/* Skill Badges & Achievements */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Skill Badges & Milestones
              </h3>
              <span className="text-xs text-[#9CA7BD] font-mono">
                {skillBadges.filter(b => b.unlocked).length} / {skillBadges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                    badge.unlocked
                      ? 'bg-[#101525] border-[#40F5D0]/30 shadow-[0_0_12px_rgba(64,245,208,0.1)]'
                      : 'bg-[#080B14]/40 border-white/5 opacity-40'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${badge.unlocked ? 'bg-[#40F5D0]/20 text-[#40F5D0]' : 'bg-white/5 text-[#9CA7BD]'}`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{badge.name}</h5>
                    <p className="text-[10px] text-[#9CA7BD] leading-tight mt-0.5">{badge.description}</p>
                    <span className="text-[9px] font-mono text-[#A78BFA] mt-1 block">
                      {badge.unlocked ? '● Verified' : 'Locked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Saved Projects & Activity Progress Story */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Saved Projects */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Active Capstone Blueprints
              </h3>
              <button
                onClick={() => onNavigateToTab('studio')}
                className="text-xs text-[#40F5D0] font-semibold hover:underline"
              >
                + New Blueprint
              </button>
            </div>

            {blueprints.length > 0 ? (
              <div className="space-y-3">
                {blueprints.map((bp) => {
                  const completedCount = bp.developmentMilestones.filter(m => m.completed).length;
                  const totalCount = bp.developmentMilestones.length;
                  const percent = Math.round((completedCount / totalCount) * 100);

                  return (
                    <div key={bp.id} className="p-4 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#40F5D0] uppercase">{bp.domain}</span>
                        <span className="text-xs font-mono text-[#9CA7BD]">{percent}% Complete</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{bp.title}</h4>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#40F5D0] rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#9CA7BD]">
                        <span>{completedCount} / {totalCount} Milestones Verified</span>
                        <button
                          onClick={() => onNavigateToTab('studio')}
                          className="text-[#A78BFA] hover:text-white"
                        >
                          Open in Studio →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[#9CA7BD] space-y-2">
                <FolderGit2 className="w-6 h-6 mx-auto text-white/30" />
                <p>No project blueprint saved yet.</p>
                <button
                  onClick={() => onNavigateToTab('studio')}
                  className="px-3 py-1.5 rounded-lg bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors"
                >
                  Generate First Blueprint
                </button>
              </div>
            )}
          </div>

          {/* Progress Story Timeline (Section 14.E) */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Progress Story Timeline
              </h3>
              <span className="text-xs text-[#9CA7BD]">Audit Trail</span>
            </div>

            <div className="space-y-4 relative pl-4 border-l border-white/10 text-xs">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#40F5D0]" />
                <span className="text-[10px] font-mono text-[#40F5D0] block">Today</span>
                <p className="font-semibold text-white">Completed Daily Placement Review</p>
                <p className="text-[#9CA7BD] text-[11px]">Earned +35 XP towards Level {profile.level}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
                <span className="text-[10px] font-mono text-[#A78BFA] block">2 Days Ago</span>
                <p className="font-semibold text-white">Generated Capstone Architecture Plan</p>
                <p className="text-[#9CA7BD] text-[11px]">Defined PostgreSQL entities and REST endpoint mocks</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400 block">Initial Diagnostic</span>
                <p className="font-semibold text-white">AI Career DNA Diagnostic Established</p>
                <p className="text-[#9CA7BD] text-[11px]">Primary match identified as {targetCareer.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Achievement Disclaimer */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Authentic Progress Tracking:</strong> XP points, streak counters, and milestone badges represent your personal deliberate practice within KARKA NEXUS AI. They are stored in your client browser for prototype persistence.
        </p>
      </div>
    </div>
  );
};
