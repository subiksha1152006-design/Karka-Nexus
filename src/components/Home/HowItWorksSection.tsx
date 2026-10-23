import React from 'react';
import { Dna, Target, FolderGit2, Briefcase, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onNavigate: (tab: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Discover Your Interests',
      icon: Dna,
      color: 'text-[#40F5D0]',
      bgColor: 'bg-[#40F5D0]/10',
      borderColor: 'border-[#40F5D0]/30',
      tag: 'AI Career DNA',
      tabTarget: 'dna',
      description: 'Take a structured assessment measuring your analytical curiosity, preferred problem domains, and current technical exposure to discover your optimal career match.'
    },
    {
      num: '02',
      title: 'Identify Your Skill Gaps',
      icon: Target,
      color: 'text-[#A78BFA]',
      bgColor: 'bg-[#A78BFA]/10',
      borderColor: 'border-[#A78BFA]/30',
      tag: 'Skill Gap Radar',
      tabTarget: 'radar',
      description: 'Benchmark your present proficiency against actual hiring expectations. Visualize exact deficits and receive an immediate prioritized roadmap of concepts to master.'
    },
    {
      num: '03',
      title: 'Build Practical Projects',
      icon: FolderGit2,
      color: 'text-[#38BDF8]',
      bgColor: 'bg-[#38BDF8]/10',
      borderColor: 'border-[#38BDF8]/30',
      tag: 'Project Studio',
      tabTarget: 'studio',
      description: 'Generate comprehensive project blueprints with real problem statements, architectural diagrams, database schemas, and milestone tasks that prove your capability.'
    },
    {
      num: '04',
      title: 'Prepare for Opportunities',
      icon: Briefcase,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/30',
      tag: 'Interview Arena & Placements',
      tabTarget: 'interview',
      description: 'Train in the AI Interview Arena across technical and HR questions with instant conceptual feedback, track curated opportunities, and verify portfolio readiness.'
    }
  ];

  return (
    <section className="py-16 bg-[#080B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#40F5D0]">
            The Proven Transformation Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            How KARKA NEXUS AI Accelerates Your Career
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-3">
            A continuous four-stage cycle that converts raw student curiosity into verifiable industry readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xl font-extrabold text-white/30 group-hover:text-white/60 transition-colors">
                      {step.num}
                    </span>
                    <div className={`p-2.5 rounded-xl ${step.bgColor} ${step.borderColor} border`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                  </div>

                  <span className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${step.color}`}>
                    {step.tag}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#9CA7BD] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5">
                  <button
                    onClick={() => onNavigate(step.tabTarget)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#40F5D0] transition-colors cursor-pointer"
                  >
                    <span>Launch Step</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
