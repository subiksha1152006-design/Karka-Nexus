import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Sparkles, 
  Layers, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  FolderGit2, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';
import { CAREER_PATHWAYS } from '../../data/careersData';
import { CareerId } from '../../types';
import { StorageService } from '../../services/storage';

interface SkillGapDashboardProps {
  initialRoleId?: CareerId;
  onNavigateToStudio: (tech: string) => void;
}

export const SkillGapDashboard: React.FC<SkillGapDashboardProps> = ({
  initialRoleId = 'fullstack',
  onNavigateToStudio
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<CareerId>(initialRoleId);
  const [targetBenchmarkLevel, setTargetBenchmarkLevel] = useState<'entry' | 'mid'>('entry');

  const selectedCareer = CAREER_PATHWAYS.find(c => c.id === selectedRoleId) || CAREER_PATHWAYS[0];

  // Initialize or fetch saved skill proficiencies (1 to 5)
  const [userRatings, setUserRatings] = useState<Record<string, number>>(() => {
    const profile = StorageService.getProfile();
    const map: Record<string, number> = {};
    selectedCareer.requiredSkills.forEach((skill, index) => {
      map[skill.name] = profile.skillProficiencies[skill.name] || (index < 3 ? 3 : 2);
    });
    return map;
  });

  // Target proficiency benchmark based on selected benchmark mode
  const targetRating = targetBenchmarkLevel === 'entry' ? 4 : 5;

  const handleRatingChange = (skillName: string, value: number) => {
    const updated = { ...userRatings, [skillName]: value };
    setUserRatings(updated);
    // Persist to profile
    const profile = StorageService.getProfile();
    profile.skillProficiencies = { ...profile.skillProficiencies, ...updated };
    StorageService.saveProfile(profile);
  };

  const handleRoleChange = (roleId: CareerId) => {
    setSelectedRoleId(roleId);
    const newCareer = CAREER_PATHWAYS.find(c => c.id === roleId) || CAREER_PATHWAYS[0];
    const profile = StorageService.getProfile();
    const map: Record<string, number> = {};
    newCareer.requiredSkills.forEach((skill, index) => {
      map[skill.name] = profile.skillProficiencies[skill.name] || (index < 2 ? 3 : index < 4 ? 2 : 1);
    });
    setUserRatings(map);
  };

  // Calculations
  const analysis = useMemo(() => {
    const skills = selectedCareer.requiredSkills.map(s => {
      const current = userRatings[s.name] || 1;
      const target = s.importance === 'Core' ? targetRating : targetRating - 1;
      const gap = Math.max(0, target - current);
      return {
        name: s.name,
        category: s.category,
        importance: s.importance,
        current,
        target,
        gap
      };
    });

    const totalPossible = skills.reduce((acc, curr) => acc + curr.target, 0);
    const totalCurrent = skills.reduce((acc, curr) => acc + curr.current, 0);
    const readinessScore = Math.min(100, Math.round((totalCurrent / totalPossible) * 100));

    // Priority gaps (highest gap + Core importance)
    const priorityGaps = [...skills]
      .sort((a, b) => b.gap - a.gap || (a.importance === 'Core' ? -1 : 1))
      .filter(s => s.gap > 0);

    return {
      skills,
      readinessScore,
      priorityGaps
    };
  }, [selectedCareer, userRatings, targetRating]);

  // SVG Radar Coordinates Calculation
  const radarSkills = analysis.skills.slice(0, 7); // Show top 7 for balanced polygon
  const center = 150;
  const radius = 95;
  const totalNodes = radarSkills.length;

  const getCoordinates = (index: number, value: number, maxVal = 5) => {
    const angle = (Math.PI * 2 / totalNodes) * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPolygon = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.current);
      return `${x},${y}`;
    })
    .join(' ');

  const targetPolygon = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.target);
      return `${x},${y}`;
    })
    .join(' ');

  // Suggested mini project ideas based on the largest gap
  const topGap = analysis.priorityGaps[0];
  const suggestedMiniProject = topGap
    ? `Build a focused prototype specifically exercising "${topGap.name}" (e.g. integrate error-handled API endpoints with automated unit tests).`
    : `Congratulations! Your self-assessed ratings meet the ${targetBenchmarkLevel === 'entry' ? 'entry-level' : 'mid-level'} target benchmark. Proceed to capstone project deployment.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Interactive Skill Gap Radar</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Competency Benchmark Dashboard
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            Select your target career, rate your current technical proficiency, and watch your readiness score and actionable gaps recalculate in real-time.
          </p>
        </div>

        {/* Benchmark Selector */}
        <div className="flex items-center gap-2 bg-[#101525] p-1.5 rounded-xl border border-white/10 text-xs self-start md:self-auto">
          <span className="text-[#9CA7BD] px-2 font-mono">Target:</span>
          <button
            onClick={() => setTargetBenchmarkLevel('entry')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              targetBenchmarkLevel === 'entry'
                ? 'bg-[#40F5D0] text-[#080B14]'
                : 'text-[#9CA7BD] hover:text-white'
            }`}
          >
            Entry-Level Hire
          </button>
          <button
            onClick={() => setTargetBenchmarkLevel('mid')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              targetBenchmarkLevel === 'mid'
                ? 'bg-[#A78BFA] text-[#080B14]'
                : 'text-[#9CA7BD] hover:text-white'
            }`}
          >
            Senior/Competitive
          </button>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CAREER_PATHWAYS.map(career => {
          const isSelected = career.id === selectedRoleId;
          return (
            <button
              key={career.id}
              onClick={() => handleRoleChange(career.id)}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#101525] border-2 border-[#40F5D0] text-white shadow-[0_0_15px_rgba(64,245,208,0.2)]'
                  : 'bg-[#101525]/50 border border-white/5 text-[#9CA7BD] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] uppercase font-mono block text-[#40F5D0]">Pathway</span>
              <h4 className="text-xs font-bold line-clamp-1 mt-0.5">{career.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Top Metric Cards & Readiness Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Score Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-mono text-[#40F5D0]">Career Readiness Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold font-mono text-white">{analysis.readinessScore}%</span>
              <span className="text-xs text-[#9CA7BD]">of target benchmark</span>
            </div>
            <p className="text-xs text-[#9CA7BD] mt-2">
              {analysis.readinessScore >= 80 
                ? 'High readiness! Ready for technical interview defense.' 
                : analysis.readinessScore >= 60 
                ? 'Approaching placement baseline. Focus on top gaps.' 
                : 'Foundational stage. Consistent practice will build velocity.'}
            </p>
          </div>

          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke={analysis.readinessScore >= 75 ? '#40F5D0' : '#A78BFA'}
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={201}
                strokeDashoffset={201 * (1 - analysis.readinessScore / 100)}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
          </div>
        </div>

        {/* Top Priority Gaps */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <span className="text-xs uppercase font-mono text-[#A78BFA]">Immediate Priority Gaps</span>
          <div className="space-y-1.5 pt-1">
            {analysis.priorityGaps.slice(0, 3).map((gap, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#080B14] border border-white/5">
                <span className="font-semibold text-white line-clamp-1">{gap.name}</span>
                <span className="font-mono text-xs text-amber-400 font-bold">-{gap.gap} Delta</span>
              </div>
            ))}
            {analysis.priorityGaps.length === 0 && (
              <p className="text-xs text-emerald-400">All target skills reached or exceeded!</p>
            )}
          </div>
        </div>

        {/* Suggested Next Action */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-mono text-[#38BDF8]">Recommended Next Move</span>
            <p className="text-xs text-[#9CA7BD] mt-1.5 leading-relaxed">
              {suggestedMiniProject}
            </p>
          </div>

          <button
            onClick={() => onNavigateToStudio(selectedCareer.requiredSkills[0]?.name || 'FullStack')}
            className="w-full py-2 px-3 rounded-xl bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Generate Project to Close Gaps</span>
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Radar & Interactive Skill Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Radar Chart */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Multivariate Radar Graph
              </h3>
              <p className="text-xs text-[#9CA7BD]">Real-time visual comparison</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-[#40F5D0] font-semibold">● You</span>
              <span className="text-[#A78BFA] font-semibold">--- Target</span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="flex items-center justify-center py-2">
            <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto">
              {/* Concentric rings */}
              {[1, 2, 3, 4, 5].map(level => {
                const r = (level / 5) * radius;
                return (
                  <circle
                    key={level}
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Spoke lines */}
              {radarSkills.map((_, i) => {
                const { x, y } = getCoordinates(i, 5);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target polygon */}
              <polygon
                points={targetPolygon}
                fill="rgba(167, 139, 250, 0.15)"
                stroke="#A78BFA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* User rating polygon */}
              <polygon
                points={currentPolygon}
                fill="rgba(64, 245, 208, 0.25)"
                stroke="#40F5D0"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Nodes and Labels */}
              {radarSkills.map((s, i) => {
                const { x, y } = getCoordinates(i, s.current);
                const labelPos = getCoordinates(i, 5.8);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="4" fill="#080B14" stroke="#40F5D0" strokeWidth="2" />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill="#9CA7BD"
                      fontSize="9"
                      fontWeight="600"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {s.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] space-y-1">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#40F5D0]" />
              <span>Interactive Responsiveness</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Adjust the rating sliders on the right. Notice how the radar shape morphs, recalculating readiness and prioritization metrics instantly.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Rating Sliders */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Skill Self-Rating Controls
              </h3>
              <p className="text-xs text-[#9CA7BD]">Rate from 1 (Novice) to 5 (Production Mastery)</p>
            </div>
            <span className="text-xs font-mono text-[#40F5D0]">
              {selectedCareer.requiredSkills.length} Tracked Skills
            </span>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
            {analysis.skills.map((skill) => {
              const currentVal = skill.current;
              const hasGap = skill.gap > 0;

              return (
                <div key={skill.name} className="p-4 rounded-xl bg-[#080B14] border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#9CA7BD]">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#40F5D0] font-bold">Lvl {currentVal}/5</span>
                      <span className="text-[#9CA7BD]">→ Target Lvl {skill.target}</span>
                      {hasGap ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px]">
                          -{skill.gap}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                          Matched
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Slider & Quick Buttons */}
                  <div className="space-y-1.5">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={currentVal}
                      onChange={(e) => handleRatingChange(skill.name, parseInt(e.target.value, 10))}
                      className="w-full accent-[#40F5D0] cursor-pointer"
                      aria-label={`Proficiency rating for ${skill.name}`}
                    />

                    <div className="flex justify-between text-[10px] font-mono text-[#9CA7BD]">
                      <span>1: Novice</span>
                      <span>2: Early</span>
                      <span>3: Competent</span>
                      <span>4: Industry Junior</span>
                      <span>5: Production Pro</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mandatory Transparency Disclaimer */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Measurement Integrity Notice:</strong> Self-reported skill ratings are reflective educational diagnostics to guide your daily deliberate practice. They do not constitute formally proctored or scientifically validated psychometric assessments.
        </p>
      </div>
    </div>
  );
};
