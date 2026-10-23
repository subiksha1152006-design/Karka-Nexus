import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  FolderGit2, 
  Award, 
  BrainCircuit, 
  Layers, 
  Code2, 
  ShieldCheck 
} from 'lucide-react';

interface HeroSectionProps {
  onStartDNA: () => void;
  onExploreCareers: () => void;
  onOpenProjectStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDNA,
  onExploreCareers,
  onOpenProjectStudio
}) => {
  const [activeJourneyStage, setActiveJourneyStage] = useState<number>(2);

  const journeyStages = [
    {
      step: 1,
      title: 'Foundation & Discovery',
      status: 'Diagnostic',
      description: 'Discover your authentic strengths via AI Career DNA assessment. Filter out noise and pinpoint the single track where you excel.',
      skills: ['Computational Logic', 'Core Syntax', 'Domain Alignment']
    },
    {
      step: 2,
      title: 'Targeted Skill Mastery',
      status: 'Skill Gap Radar',
      description: 'Measure your proficiency against real-world engineering standards. Turn red gaps into green achievements with tailored tutorials.',
      skills: ['Component Architecture', 'REST APIs', 'Relational Schemas']
    },
    {
      step: 3,
      title: 'Practical Project Studio',
      status: 'Industry Blueprint',
      description: 'Generate production-grade project blueprints solving genuine problems in healthcare, agriculture, and web systems.',
      skills: ['Database Modeling', 'Cloud CI/CD', 'Docker Packaging']
    },
    {
      step: 4,
      title: 'Industry & Placement Ready',
      status: 'Placement Arena',
      description: 'Practice conceptual and technical interview rounds. Polish a non-tutorial portfolio and track verified entry-level roles.',
      skills: ['STAR Method', 'System Design', 'Technical Defense']
    }
  ];

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-radial-glow">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#40F5D0]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#A78BFA]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101525] border border-[#40F5D0]/30 text-xs text-[#F5F7FF] shadow-[0_0_20px_rgba(64,245,208,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#40F5D0] animate-pulse" />
            <span className="text-[#40F5D0] font-semibold">KARKA NEXUS AI</span>
            <span className="text-white/40">·</span>
            <span className="text-[#9CA7BD]">The Student Career Operating System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F5F7FF] leading-[1.15]">
            Your Degree Is Just <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40F5D0] via-[#A78BFA] to-[#38BDF8]">
              The Beginning.
            </span>
          </h1>

          {/* Supporting Headline */}
          <p className="text-lg sm:text-xl text-[#9CA7BD] max-w-2xl mx-auto leading-relaxed">
            Discover your strengths. Build real-world skills. Turn your potential into your next opportunity.
          </p>

          {/* Primary & Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartDNA}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_25px_rgba(64,245,208,0.35)] cursor-pointer"
            >
              <span>Build My Career Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreCareers}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#101525] hover:bg-[#161D32] border border-white/10 hover:border-[#A78BFA]/50 text-white transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#A78BFA]" />
              <span>Explore Career Paths</span>
            </button>
          </div>
        </div>

        {/* Floating Metric & Readiness Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          {/* Card 1: Skill Growth */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#40F5D0]/40 transition-all">
            <div className="flex items-center justify-between text-xs text-[#9CA7BD] mb-2">
              <span className="font-medium">Skill Growth</span>
              <TrendingUp className="w-4 h-4 text-[#40F5D0]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">+14%</span>
              <span className="text-[11px] text-[#40F5D0]">Target Delta</span>
            </div>
            <p className="text-[11px] text-[#9CA7BD] mt-1">4 core competencies upgraded</p>
          </div>

          {/* Card 2: Project Progress */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#A78BFA]/40 transition-all">
            <div className="flex items-center justify-between text-xs text-[#9CA7BD] mb-2">
              <span className="font-medium">Project Progress</span>
              <FolderGit2 className="w-4 h-4 text-[#A78BFA]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">2 / 3</span>
              <span className="text-[11px] text-[#A78BFA]">Milestones</span>
            </div>
            <p className="text-[11px] text-[#9CA7BD] mt-1">AgriVision capstone in progress</p>
          </div>

          {/* Card 3: Career Readiness */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#38BDF8]/40 transition-all">
            <div className="flex items-center justify-between text-xs text-[#9CA7BD] mb-2">
              <span className="font-medium">Career Readiness</span>
              <Award className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">78%</span>
              <span className="text-[11px] text-[#38BDF8]">Industry Level</span>
            </div>
            <p className="text-[11px] text-[#9CA7BD] mt-1">Benchmarked against junior roles</p>
          </div>

          {/* Card 4: Interview Preparation */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 hover:border-emerald-400/40 transition-all">
            <div className="flex items-center justify-between text-xs text-[#9CA7BD] mb-2">
              <span className="font-medium">Interview Prep</span>
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">8 Mock</span>
              <span className="text-[11px] text-emerald-400">Rounds</span>
            </div>
            <p className="text-[11px] text-[#9CA7BD] mt-1">Average conceptual score 84/100</p>
          </div>
        </div>

        {/* Interactive Career Visualization Journey: Beginner -> Industry-Ready Professional */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 max-w-5xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#40F5D0]">
                Interactive Student Progression Engine
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                From College Beginner to Industry-Ready Professional
              </h3>
              <p className="text-xs text-[#9CA7BD]">
                Click each stage to inspect the architectural skills and outcomes developed at every phase.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#A78BFA] bg-[#A78BFA]/10 px-2.5 py-1 rounded-md border border-[#A78BFA]/30">
                Phase {activeJourneyStage} of 4
              </span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {journeyStages.map((stage) => {
              const isActive = activeJourneyStage === stage.step;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveJourneyStage(stage.step)}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#101525] border-2 border-[#40F5D0] shadow-[0_0_15px_rgba(64,245,208,0.2)]'
                      : 'bg-[#101525]/50 border border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs text-[#40F5D0]">0{stage.step}</span>
                    <span className="text-[10px] text-[#9CA7BD] uppercase tracking-wider">{stage.status}</span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-white line-clamp-1">{stage.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          {(() => {
            const current = journeyStages[activeJourneyStage - 1];
            return (
              <div className="mt-6 p-5 rounded-xl bg-[#080B14]/80 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40">
                      Step {current.step}
                    </span>
                    <h4 className="text-base font-bold text-white">{current.title}</h4>
                  </div>
                  <p className="text-xs text-[#9CA7BD] leading-relaxed">
                    {current.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {current.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs text-white/90 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#40F5D0]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#101525] border border-white/10 text-center space-y-3">
                  <p className="text-xs text-[#9CA7BD]">Actionable Next Move:</p>
                  {activeJourneyStage === 1 && (
                    <button
                      onClick={onStartDNA}
                      className="w-full py-2 px-3 rounded-lg bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors"
                    >
                      Take Career DNA Test
                    </button>
                  )}
                  {activeJourneyStage === 2 && (
                    <button
                      onClick={onExploreCareers}
                      className="w-full py-2 px-3 rounded-lg bg-[#A78BFA] text-[#080B14] text-xs font-bold hover:bg-[#A78BFA]/90 transition-colors"
                    >
                      Audit Skill Radar
                    </button>
                  )}
                  {activeJourneyStage === 3 && (
                    <button
                      onClick={onOpenProjectStudio}
                      className="w-full py-2 px-3 rounded-lg bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors"
                    >
                      Generate Project Plan
                    </button>
                  )}
                  {activeJourneyStage === 4 && (
                    <button
                      onClick={onExploreCareers}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-400 text-[#080B14] text-xs font-bold hover:bg-emerald-300 transition-colors"
                    >
                      Practice Mock Arena
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
