import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  Calendar, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Save 
} from 'lucide-react';
import { CAREER_PATHWAYS } from '../../data/careersData';
import { CareerId, CareerPathway } from '../../types';
import { StorageService } from '../../services/storage';

export const RoadmapViewer: React.FC<{
  initialCareerId?: CareerId;
  onExploreRadar: (careerId: string) => void;
}> = ({ initialCareerId = 'fullstack', onExploreRadar }) => {
  const [selectedCareerId, setSelectedCareerId] = useState<CareerId>(initialCareerId);
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const [stageNotes, setStageNotes] = useState<Record<string, string>>(() => {
    try {
      const data = localStorage.getItem('karka_roadmap_notes');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>(() => {
    const profile = StorageService.getProfile();
    return profile.customRoadmapProgress || { 'fullstack_stage_1': true };
  });

  const selectedCareer = CAREER_PATHWAYS.find(c => c.id === selectedCareerId) || CAREER_PATHWAYS[0];

  const handleToggleStage = (stageNum: number) => {
    const key = `${selectedCareerId}_stage_${stageNum}`;
    const nextVal = !completedStages[key];
    const updated = { ...completedStages, [key]: nextVal };
    setCompletedStages(updated);

    const profile = StorageService.getProfile();
    profile.customRoadmapProgress = updated;
    StorageService.saveProfile(profile);

    if (nextVal) {
      StorageService.addXP(25); // Award XP
    }
  };

  const handleSaveNote = (stageNum: number, noteText: string) => {
    const key = `${selectedCareerId}_stage_${stageNum}`;
    const updated = { ...stageNotes, [key]: noteText };
    setStageNotes(updated);
    try {
      localStorage.setItem('karka_roadmap_notes', JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving note', e);
    }
  };

  const handleResetRoadmap = () => {
    if (window.confirm('Reset progress for this roadmap?')) {
      const updated = { ...completedStages };
      selectedCareer.learningRoadmap.forEach(s => {
        delete updated[`${selectedCareerId}_stage_${s.stage}`];
      });
      setCompletedStages(updated);
      const profile = StorageService.getProfile();
      profile.customRoadmapProgress = updated;
      StorageService.saveProfile(profile);
    }
  };

  const completedCount = selectedCareer.learningRoadmap.filter(
    s => completedStages[`${selectedCareerId}_stage_${s.stage}`]
  ).length;

  const totalStages = selectedCareer.learningRoadmap.length;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured Career Roadmaps</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Sequential Learning Pathway
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            A comprehensive, stage-by-stage engineering curriculum. Mark completed stages, add study notes, and track your syllabus velocity.
          </p>
        </div>

        <button
          onClick={handleResetRoadmap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-[#9CA7BD] hover:text-white transition-all cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CAREER_PATHWAYS.map(c => {
          const isSelected = c.id === selectedCareerId;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCareerId(c.id);
                setExpandedStage(1);
              }}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#101525] border-2 border-[#40F5D0] text-white shadow-[0_0_15px_rgba(64,245,208,0.2)]'
                  : 'bg-[#101525]/50 border border-white/5 text-[#9CA7BD] hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#40F5D0] block">Track</span>
              <h4 className="text-xs font-bold line-clamp-1 mt-0.5">{c.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Overall Progress Meter */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">{selectedCareer.title} Roadmap</h3>
            <p className="text-xs text-[#9CA7BD]">{selectedCareer.tagline}</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#40F5D0] font-bold text-base">{progressPercent}%</span>
            <span className="text-[#9CA7BD]">({completedCount} of {totalStages} Stages Cleared)</span>
          </div>
        </div>

        <div className="w-full h-2 bg-[#080B14] rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-[#40F5D0] to-[#A78BFA] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stages List Accordion */}
      <div className="space-y-4">
        {selectedCareer.learningRoadmap.map((step) => {
          const isDone = !!completedStages[`${selectedCareerId}_stage_${step.stage}`];
          const isExpanded = expandedStage === step.stage;
          const noteKey = `${selectedCareerId}_stage_${step.stage}`;
          const currentNote = stageNotes[noteKey] || '';

          return (
            <div
              key={step.stage}
              className={`glass-panel rounded-2xl border transition-all ${
                isDone 
                  ? 'border-emerald-500/40 bg-[#101525]/80' 
                  : isExpanded 
                  ? 'border-[#40F5D0]/50' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Stage Header Summary */}
              <div
                onClick={() => setExpandedStage(isExpanded ? null : step.stage)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStage(step.stage);
                    }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-400 text-[#080B14]'
                        : 'border-white/20 bg-white/5 hover:border-[#40F5D0]'
                    }`}
                    aria-label={`Toggle stage ${step.stage} completed`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : <Circle className="w-3.5 h-3.5 text-white/40" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-[#A78BFA] font-bold">Stage 0{step.stage}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-[#9CA7BD] font-mono">{step.duration}</span>
                      {isDone && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          Cleared
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">{step.title}</h4>
                  </div>
                </div>

                <div className="text-[#9CA7BD]">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Stage Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#40F5D0] block mb-1">
                      Curriculum Syllabus Summary
                    </span>
                    <p className="text-white/90 leading-relaxed text-xs">
                      {step.summary}
                    </p>
                  </div>

                  {/* Study Notes Feature */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[11px] font-semibold text-[#9CA7BD] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#A78BFA]" />
                      <span>My Stage Study Notes & Resources:</span>
                    </label>
                    <textarea
                      rows={3}
                      value={currentNote}
                      onChange={(e) => handleSaveNote(step.stage, e.target.value)}
                      placeholder="Add reminders, tutorial links, or key takeaway insights here..."
                      className="w-full bg-[#080B14] border border-white/10 rounded-xl p-3 text-white text-xs focus-visible:outline-none focus-visible:border-[#40F5D0]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleToggleStage(step.stage)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#40F5D0] text-[#080B14] font-bold hover:bg-[#40F5D0]/90'
                      }`}
                    >
                      {isDone ? 'Mark as In Progress' : 'Mark Stage Complete (+25 XP)'}
                    </button>

                    <button
                      onClick={() => onExploreRadar(selectedCareer.id)}
                      className="text-xs text-[#A78BFA] hover:underline"
                    >
                      Audit related skills in Radar →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Transparency Disclaimer */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Curriculum Rigor Notice:</strong> Roadmaps provide structured sequential frameworks for deliberate self-study and capstone building. Finishing a roadmap represents curriculum coverage; real job placement depends on practical problem-solving defense during live employer assessments.
        </p>
      </div>
    </div>
  );
};
