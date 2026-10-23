import React, { useState } from 'react';
import { 
  Code, 
  Brain, 
  BarChart3, 
  Cloud, 
  ShieldAlert, 
  Palette, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Layers, 
  Target, 
  FolderGit2, 
  Sparkles 
} from 'lucide-react';
import { CAREER_PATHWAYS } from '../../data/careersData';
import { CareerPathway, CareerId } from '../../types';

interface CareerPathwaysPreviewProps {
  onSelectRoleForRadar: (roleId: CareerId) => void;
  onExploreProjectStudio: (tech: string) => void;
}

export const CareerPathwaysPreview: React.FC<CareerPathwaysPreviewProps> = ({
  onSelectRoleForRadar,
  onExploreProjectStudio
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<CareerId>('fullstack');
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'roadmap' | 'readiness'>('overview');

  const careerIcons: Record<CareerId, React.ElementType> = {
    'fullstack': Code,
    'aiml': Brain,
    'data-analyst': BarChart3,
    'cloud-devops': Cloud,
    'cybersecurity': ShieldAlert,
    'uiux': Palette
  };

  const selectedCareer = CAREER_PATHWAYS.find(c => c.id === selectedCareerId) || CAREER_PATHWAYS[0];
  const IconComponent = careerIcons[selectedCareer.id];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#40F5D0] mb-2">
            <span>Career Pathways</span>
            <span>·</span>
            <span>Industry Role Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Engineered Pathways for High-Demand Roles
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-xl">
            Examine required industry skills, structured learning sequences, and capstone projects for each tech discipline.
          </p>
        </div>

        <button
          onClick={() => onSelectRoleForRadar(selectedCareerId)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#40F5D0]/10 border border-[#40F5D0]/30 text-[#40F5D0] hover:bg-[#40F5D0]/20 transition-all cursor-pointer self-start md:self-auto"
        >
          <Target className="w-4 h-4" />
          <span>Launch Skill Gap Radar for {selectedCareer.title}</span>
        </button>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {CAREER_PATHWAYS.map((career) => {
          const Icon = careerIcons[career.id];
          const isSelected = career.id === selectedCareerId;
          return (
            <button
              key={career.id}
              onClick={() => {
                setSelectedCareerId(career.id);
                setActiveTab('overview');
              }}
              className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer text-center ${
                isSelected
                  ? 'bg-[#101525] border-2 border-[#40F5D0] text-white shadow-[0_0_15px_rgba(64,245,208,0.2)]'
                  : 'bg-[#101525]/60 border border-white/5 text-[#9CA7BD] hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#40F5D0]/20 text-[#40F5D0]' : 'bg-white/5 text-[#9CA7BD]'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold leading-tight line-clamp-1">{career.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Career Detailed Card */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Card Header Bar */}
        <div className="p-6 bg-gradient-to-r from-[#101525] to-[#161D32] border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3.5 rounded-xl bg-[#40F5D0]/15 border border-[#40F5D0]/30 text-[#40F5D0]">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA7BD] mb-1">
                <span className="text-[#40F5D0] font-mono font-medium">{selectedCareer.category}</span>
                <span>·</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-white text-[11px] font-medium border border-white/10">
                  {selectedCareer.difficulty}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-[#A78BFA]" />
                  ~{selectedCareer.avgTimelineMonths} Months Timeline
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedCareer.title}</h3>
              <p className="text-xs text-[#9CA7BD] mt-0.5 max-w-2xl">{selectedCareer.tagline}</p>
            </div>
          </div>

          {/* Tab Navigation inside Card */}
          <div className="flex items-center gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10 self-start lg:self-auto text-xs">
            {(['overview', 'skills', 'roadmap', 'readiness'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/30 shadow-sm'
                    : 'text-[#9CA7BD] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {/* TAB 1: OVERVIEW & CAPSTONES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#A78BFA] mb-2">Track Overview</h4>
                <p className="text-sm text-[#F5F7FF] leading-relaxed max-w-3xl">
                  {selectedCareer.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#40F5D0] mb-3">Example Demonstration Projects</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCareer.exampleProjects.map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#080B14] border border-white/10 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#9CA7BD] mb-1.5">
                          <span className="font-mono text-[#A78BFA]">Capstone 0{idx + 1}</span>
                          <span className="text-[10px] text-white/50">Example</span>
                        </div>
                        <h5 className="font-semibold text-sm text-white">{proj.title}</h5>
                        <p className="text-xs text-[#9CA7BD] mt-1.5 leading-relaxed">{proj.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                        {proj.tech.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#101525] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs font-bold text-white">Ideal Candidate Profile</h5>
                  <ul className="mt-1 text-xs text-[#9CA7BD] space-y-1">
                    {selectedCareer.idealFor.map((ideal, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-[#40F5D0]" />
                        <span>{ideal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => onSelectRoleForRadar(selectedCareer.id)}
                  className="px-4 py-2 rounded-lg bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Analyze My Skills for This Role
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: REQUIRED SKILLS MATRIX */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#40F5D0]">Required Competencies</h4>
                  <p className="text-xs text-[#9CA7BD]">Core technical proficiencies evaluated during hiring screens.</p>
                </div>
                <span className="text-xs text-[#9CA7BD] font-mono">{selectedCareer.requiredSkills.length} Total Evaluated Skills</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedCareer.requiredSkills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#9CA7BD] tracking-wider">{skill.category}</span>
                      <h5 className="text-xs font-semibold text-white mt-0.5">{skill.name}</h5>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium border ${
                      skill.importance === 'Core'
                        ? 'bg-[#40F5D0]/10 text-[#40F5D0] border-[#40F5D0]/30'
                        : skill.importance === 'Recommended'
                        ? 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30'
                        : 'bg-white/5 text-[#9CA7BD] border-white/10'
                    }`}>
                      {skill.importance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#A78BFA]">Sequential Learning Sequence</h4>
                  <p className="text-xs text-[#9CA7BD]">Structured progression from fundamental foundations to placement readiness.</p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedCareer.learningRoadmap.map((step) => (
                  <div key={step.stage} className="p-4 rounded-xl bg-[#080B14] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/20 border border-[#A78BFA]/40 flex items-center justify-center font-mono font-bold text-xs text-[#A78BFA] shrink-0">
                        0{step.stage}
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                        <p className="text-xs text-[#9CA7BD] mt-0.5">{step.summary}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#40F5D0] bg-[#40F5D0]/10 px-2.5 py-1 rounded-md border border-[#40F5D0]/20 self-start sm:self-auto shrink-0">
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: READINESS CHECKLIST */}
          {activeTab === 'readiness' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#40F5D0] mb-1">Career Readiness Checklist</h4>
                <p className="text-xs text-[#9CA7BD]">Concrete milestones you should verify before applying for placement interviews.</p>
              </div>

              <div className="space-y-2">
                {selectedCareer.readinessChecklist.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#080B14] border border-white/10 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
                    <span className="text-xs text-white leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#101525] border border-white/10 text-xs text-[#9CA7BD] flex items-center justify-between">
                <span>Want to test your conceptual knowledge for these criteria?</span>
                <button
                  onClick={() => onSelectRoleForRadar(selectedCareer.id)}
                  className="text-[#40F5D0] font-semibold hover:underline"
                >
                  Start Self-Audit →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
