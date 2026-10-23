import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Target, 
  FolderGit2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Share2, 
  BookOpen, 
  Flame, 
  Layers 
} from 'lucide-react';
import { DNAReport, CareerId } from '../../types';

interface CareerDNAReportProps {
  report: DNAReport;
  onRetake: () => void;
  onExploreRadar: (roleId: string) => void;
  onExploreStudio: () => void;
}

export const CareerDNAReport: React.FC<CareerDNAReportProps> = ({
  report,
  onRetake,
  onExploreRadar,
  onExploreStudio
}) => {
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);

  const handleCopyPlan = () => {
    const text = `KARKA NEXUS AI - Career DNA Summary
Target Career: ${report.primaryCareer.title} (${report.matchScore}% Match)
Generated: ${report.generatedAt}

Current Skills:
${report.currentSkillsIdentified.map(s => `- ${s}`).join('\n')}

Target Skills to Develop:
${report.skillsToDevelop.map(s => `- ${s}`).join('\n')}

30-Day Action Plan:
${report.thirtyDayPlan.map(w => `Week ${w.week}: ${w.title}\nMilestone: ${w.keyMilestone}`).join('\n\n')}

Placement Advice:
Resume Focus: ${report.placementAdvice.resumeFocus}
Target Portfolio Capstone: ${report.placementAdvice.targetPortfolioPiece}`;

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  // Helper for rendering SVG Radar Polygon
  // Center is (150, 150), radius is 100
  const center = 150;
  const radius = 95;
  const metricsCount = report.radarMetrics.length;

  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 / metricsCount) * index - Math.PI / 2;
    const r = (score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const currentPoints = report.radarMetrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.currentScore);
      return `${x},${y}`;
    })
    .join(' ');

  const targetPoints = report.radarMetrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.targetScore);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-1">
            <span>Career DNA Diagnostic Result</span>
            <span>·</span>
            <span>Generated {report.generatedAt}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Personalized Career Blueprint
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyPlan}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            {copiedPlan ? <Check className="w-3.5 h-3.5 text-[#40F5D0]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPlan ? 'Copied Plan!' : 'Copy Plan'}</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-[#9CA7BD] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Primary Match Hero Card */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#40F5D0]/10 rounded-bl-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40">
                Top Recommendation
              </span>
              <span className="text-xs text-[#9CA7BD] font-mono">{report.primaryCareer.category}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {report.primaryCareer.title}
            </h3>

            <p className="text-sm text-[#9CA7BD] leading-relaxed max-w-2xl">
              {report.primaryCareer.description}
            </p>

            {/* Why This Fits You */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A78BFA] mb-2">
                Why this matches your diagnostic answers:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#F5F7FF]/90">
                {report.whyFit.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#40F5D0] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onExploreRadar(report.primaryCareer.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(64,245,208,0.3)]"
              >
                <Target className="w-4 h-4" />
                <span>Open Skill Gap Radar</span>
              </button>
              <button
                onClick={onExploreStudio}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 hover:border-white/20 text-white transition-all cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4 text-[#A78BFA]" />
                <span>Architect Capstone Blueprint</span>
              </button>
            </div>
          </div>

          {/* Right Column: Match Score Circle & Radar Preview */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#080B14]/80 border border-white/10 text-center">
            <div className="relative flex items-center justify-center w-32 h-32 mb-3">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#40F5D0"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 * (1 - report.matchScore / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold font-mono text-white">{report.matchScore}%</span>
                <span className="text-[10px] uppercase font-mono text-[#40F5D0] font-semibold">Suitability</span>
              </div>
            </div>

            <p className="text-xs text-[#9CA7BD]">
              Calibrated against hiring criteria for {report.primaryCareer.title}.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Secondary Matched Pathways & Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Secondary Alternative Pathways */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Adjacent Alternative Pathways
            </h4>
            <span className="text-xs text-[#9CA7BD]">Complementary Tracks</span>
          </div>

          <div className="space-y-3">
            {report.secondaryCareers.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-white">{item.career.title}</h5>
                  <span className="text-xs font-mono font-bold text-[#A78BFA] bg-[#A78BFA]/10 px-2 py-0.5 rounded border border-[#A78BFA]/30">
                    {item.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-[#9CA7BD] leading-relaxed">
                  {item.reason}
                </p>
                <button
                  onClick={() => onExploreRadar(item.career.id)}
                  className="text-xs text-[#40F5D0] font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Explore this pathway</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Skills vs Skills to Conquer */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Skills Identified vs Gaps to Master
            </h4>
            <span className="text-xs text-[#40F5D0] font-mono">Dynamic Extraction</span>
          </div>

          <div>
            <span className="text-xs font-mono text-[#9CA7BD] block mb-2">Identified In Your Profile:</span>
            <div className="flex flex-wrap gap-1.5">
              {report.currentSkillsIdentified.map((skill, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-mono text-[#A78BFA] block mb-2">Priority Skills to Develop Next:</span>
            <div className="space-y-2">
              {report.skillsToDevelop.map((skill, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#080B14] border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-medium text-white">{skill}</span>
                  <span className="text-[10px] text-[#A78BFA] font-mono">Priority 0{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Interactive Radar Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#40F5D0]">
              Visual Skill Radar Matrix
            </span>
            <h3 className="text-xl font-bold text-white">
              Current Competency vs Industry Target
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#40F5D0]/30 border border-[#40F5D0]" />
              <span className="text-white">Your Profile</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#A78BFA]/20 border border-[#A78BFA] border-dashed" />
              <span className="text-[#9CA7BD]">Target Standard</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Crisp Custom SVG Radar Polygon */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-[300px] h-auto">
              {/* Concentric benchmark rings */}
              {[25, 50, 75, 100].map((ringLevel) => {
                const r = (ringLevel / 100) * radius;
                return (
                  <circle
                    key={ringLevel}
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis rays */}
              {report.radarMetrics.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target Polygon */}
              <polygon
                points={targetPoints}
                fill="rgba(167, 139, 250, 0.15)"
                stroke="#A78BFA"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Current Student Polygon */}
              <polygon
                points={currentPoints}
                fill="rgba(64, 245, 208, 0.25)"
                stroke="#40F5D0"
                strokeWidth="2"
              />

              {/* Current Points Markers */}
              {report.radarMetrics.map((m, i) => {
                const { x, y } = getCoordinates(i, m.currentScore);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#080B14"
                    stroke="#40F5D0"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>

          {/* Metrics List Breakdown */}
          <div className="space-y-3">
            {report.radarMetrics.map((metric, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#080B14] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{metric.skill}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[#40F5D0]">{metric.currentScore}% Current</span>
                    <span className="text-[#9CA7BD]">/ {metric.targetScore}% Target</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#40F5D0] rounded-full" 
                    style={{ width: `${metric.currentScore}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized 30-Day Action Plan (4 Weeks) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A78BFA] uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>30-Day Velocity Plan</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Four-Week Milestone Execution Roadmap
            </h3>
          </div>
          <span className="text-xs text-[#9CA7BD] font-mono">1-2 hrs / day pace</span>
        </div>

        {/* Week Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {report.thirtyDayPlan.map((plan) => (
            <button
              key={plan.week}
              onClick={() => setActiveWeekTab(plan.week)}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                activeWeekTab === plan.week
                  ? 'bg-[#101525] border-2 border-[#A78BFA] shadow-[0_0_15px_rgba(167,139,250,0.2)]'
                  : 'bg-[#080B14] border border-white/10 text-[#9CA7BD] hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono text-[#40F5D0] block">Week 0{plan.week}</span>
              <h5 className="font-bold text-xs text-white line-clamp-1 mt-0.5">{plan.title}</h5>
            </button>
          ))}
        </div>

        {/* Active Week Detail */}
        {(() => {
          const activePlan = report.thirtyDayPlan[activeWeekTab - 1];
          return (
            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  Week {activePlan.week}: {activePlan.title}
                </h4>
                <span className="text-xs text-[#A78BFA] font-mono">7 Days Sprint</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[#9CA7BD] font-mono uppercase">Key Focus Objectives:</span>
                <ul className="space-y-1.5 text-xs text-white">
                  {activePlan.goals.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#40F5D0] shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-[#101525] border border-[#40F5D0]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#40F5D0] block">Mandatory Milestone Deliverable</span>
                  <span className="font-semibold text-white">{activePlan.keyMilestone}</span>
                </div>
                <Flame className="w-4 h-4 text-[#40F5D0] shrink-0" />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Placement Preparation Strategy */}
      <div className="p-6 rounded-2xl bg-[#101525] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#40F5D0] tracking-wider">Placement Pillar 01</span>
          <h4 className="font-bold text-sm text-white mt-1">Resume Alignment</h4>
          <p className="text-xs text-[#9CA7BD] mt-1.5 leading-relaxed">
            {report.placementAdvice.resumeFocus}
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-mono text-[#A78BFA] tracking-wider">Placement Pillar 02</span>
          <h4 className="font-bold text-sm text-white mt-1">Target Capstone Piece</h4>
          <p className="text-xs text-[#9CA7BD] mt-1.5 leading-relaxed">
            "{report.placementAdvice.targetPortfolioPiece}" — demonstrates end-to-end implementation rather than toy exercises.
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider">Placement Pillar 03</span>
          <h4 className="font-bold text-sm text-white mt-1">Interview Defense</h4>
          <p className="text-xs text-[#9CA7BD] mt-1.5 leading-relaxed">
            {report.placementAdvice.interviewPillar}
          </p>
        </div>
      </div>

      {/* Ethical Guidance Notice */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Guidance Advisory Notice:</strong> Career DNA recommendations are algorithmic guidance derived from your selected answers and historical industry hiring frameworks. They do not represent guaranteed employment offers.
        </p>
      </div>
    </div>
  );
};
