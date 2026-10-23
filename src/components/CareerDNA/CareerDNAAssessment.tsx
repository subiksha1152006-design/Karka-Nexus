import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Dna, 
  AlertCircle, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { DNA_QUESTIONS } from '../../data/dnaQuestions';
import { generateCareerDNAReport, UserAssessmentAnswers } from '../../services/recommendationEngine';
import { DNAReport } from '../../types';
import { StorageService } from '../../services/storage';
import { CareerDNAReport } from './CareerDNAReport';

export const CareerDNAAssessment: React.FC<{
  onExploreRadar: (roleId: string) => void;
  onExploreStudio: () => void;
}> = ({ onExploreRadar, onExploreStudio }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAssessmentAnswers>({
    subjects: ['web_tech', 'design_human'],
    work_style: ['coding_logic', 'crafting_ui'],
    programming_level: 'early_learner',
    technologies_known: ['tech_html_css', 'tech_javascript', 'tech_git'],
    career_goal: 'goal_campus_placement',
    daily_time: 'time_3_4_hours'
  });

  const [generatedReport, setGeneratedReport] = useState<DNAReport | null>(() => {
    return StorageService.getDNAReport();
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQ = DNA_QUESTIONS[currentStep];
  const totalSteps = DNA_QUESTIONS.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleToggleOption = (optionId: string) => {
    setErrorMessage(null);
    const key = currentQ.id as keyof UserAssessmentAnswers;

    if (currentQ.isMultiSelect) {
      const currentList = (answers[key] as string[]) || [];
      if (currentList.includes(optionId)) {
        if (currentList.length === 1) {
          setErrorMessage('Please keep at least one option selected.');
          return;
        }
        setAnswers({
          ...answers,
          [key]: currentList.filter(id => id !== optionId)
        });
      } else {
        setAnswers({
          ...answers,
          [key]: [...currentList, optionId]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [key]: optionId
      });
    }
  };

  const handleNext = () => {
    const key = currentQ.id as keyof UserAssessmentAnswers;
    const value = answers[key];
    if (Array.isArray(value) && value.length === 0) {
      setErrorMessage('Please select at least one option to continue.');
      return;
    }
    if (!value) {
      setErrorMessage('Please choose an option to continue.');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setErrorMessage(null);
    } else {
      // Final Submit
      handleGenerateReport();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrorMessage(null);
    }
  };

  const handleGenerateReport = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const report = generateCareerDNAReport(answers);
      setGeneratedReport(report);
      StorageService.saveDNAReport(report);
      StorageService.addXP(75); // Award XP for completing DNA assessment
      setIsSubmitting(false);
    }, 600);
  };

  const handleRetake = () => {
    setGeneratedReport(null);
    setCurrentStep(0);
  };

  if (generatedReport) {
    return (
      <CareerDNAReport
        report={generatedReport}
        onRetake={handleRetake}
        onExploreRadar={onExploreRadar}
        onExploreStudio={onExploreStudio}
      />
    );
  }

  const selectedValues = answers[currentQ.id as keyof UserAssessmentAnswers];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101525] border border-[#40F5D0]/30 text-xs text-[#40F5D0] mb-3">
          <Dna className="w-3.5 h-3.5" />
          <span>Proprietary Assessment Engine</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          AI Career DNA Discovery
        </h2>
        <p className="text-sm text-[#9CA7BD] mt-2 leading-relaxed">
          Answer 6 structured inquiries into your analytical curiosity, coding exposure, and work preferences. We synthesize an objective 30-day career roadmap and skill gap blueprint.
        </p>
      </div>

      {/* Assessment Wizard Card */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl relative">
        {/* Progress header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#40F5D0] font-semibold">
              Question 0{currentStep + 1} of 0{totalSteps}
            </span>
            <span className="text-[#9CA7BD] font-mono">{progressPercent}% Completed</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#080B14] rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#40F5D0] to-[#A78BFA] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Current Question */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#A78BFA] tracking-wider">
              {currentQ.isMultiSelect ? 'Multiple Choices Allowed' : 'Select One Option'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {currentQ.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#9CA7BD]">
            {currentQ.subtitle}
          </p>
        </div>

        {/* Validation error notice */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Option Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {currentQ.options.map((option) => {
            const isSelected = currentQ.isMultiSelect
              ? Array.isArray(selectedValues) && selectedValues.includes(option.id)
              : selectedValues === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleToggleOption(option.id)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#101525] border-2 border-[#40F5D0] shadow-[0_0_15px_rgba(64,245,208,0.18)]'
                    : 'bg-[#080B14]/70 border border-white/10 hover:border-white/20 hover:bg-[#101525]/40'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">{option.label}</h4>
                  {option.description && (
                    <p className="text-xs text-[#9CA7BD] leading-relaxed">
                      {option.description}
                    </p>
                  )}
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                  isSelected
                    ? 'bg-[#40F5D0] border-[#40F5D0] text-[#080B14]'
                    : 'border-white/20 bg-white/5'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed border-white/5 text-[#9CA7BD]'
                : 'border-white/10 hover:border-white/20 text-white hover:bg-white/5 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_20px_rgba(64,245,208,0.25)] cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-[#080B14] border-t-transparent rounded-full animate-spin" />
                Synthesizing Career DNA...
              </span>
            ) : currentStep === totalSteps - 1 ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate My Career DNA Report (+75 XP)</span>
              </>
            ) : (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Educational notice */}
      <div className="mt-6 text-center text-xs text-[#9CA7BD]">
        <span>Guaranteed Algorithmic Transparency: We calculate weighted suitability vectors based on your actual responses.</span>
      </div>
    </div>
  );
};
