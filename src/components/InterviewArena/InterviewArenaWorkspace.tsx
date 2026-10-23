import React, { useState, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Sparkles, 
  Timer, 
  CheckCircle2, 
  RotateCcw, 
  Send, 
  HelpCircle, 
  Eye, 
  ArrowRight, 
  Award, 
  AlertCircle, 
  ShieldCheck, 
  BrainCircuit, 
  Lightbulb 
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../../data/interviewQuestions';
import { InterviewQuestion, CareerId } from '../../types';
import { evaluateStudentAnswer, EvaluationResult } from '../../services/interviewEvaluator';
import { StorageService } from '../../services/storage';

export const InterviewArenaWorkspace: React.FC = () => {
  // Session Configuration State
  const [selectedTopic, setSelectedTopic] = useState<string>('Web Development');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [sessionActive, setSessionActive] = useState<boolean>(false);

  // Active Session State
  const [currentQuestions, setCurrentQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [sessionResults, setSessionResults] = useState<{ question: InterviewQuestion; evaluation: EvaluationResult; answer: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Timer State (120 seconds per question if enabled)
  const [timeLeft, setTimeLeft] = useState<number>(120);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive && isTimed && !evaluation && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, isTimed, evaluation, timeLeft]);

  const topics = [
    'Web Development',
    'SQL',
    'Machine Learning',
    'Data Structures',
    'Programming',
    'HR & Behavioral'
  ];

  const handleStartSession = () => {
    // Filter questions matching topic and difficulty or fallback
    let matches = INTERVIEW_QUESTIONS.filter(q => q.topic === selectedTopic);
    if (matches.length === 0) {
      matches = INTERVIEW_QUESTIONS;
    }
    setCurrentQuestions(matches);
    setCurrentIndex(0);
    setStudentAnswer('');
    setShowHint(false);
    setEvaluation(null);
    setSessionResults([]);
    setIsCompleted(false);
    setTimeLeft(120);
    setSessionActive(true);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestions[currentIndex]) return;
    const q = currentQuestions[currentIndex];
    const evalResult = evaluateStudentAnswer(q, studentAnswer);
    setEvaluation(evalResult);

    // Award XP
    if (evalResult.score >= 60) {
      StorageService.addXP(30);
    } else {
      StorageService.addXP(15);
    }

    setSessionResults(prev => [...prev, { question: q, evaluation: evalResult, answer: studentAnswer }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStudentAnswer('');
      setShowHint(false);
      setEvaluation(null);
      setTimeLeft(120);
    } else {
      setIsCompleted(true);
      setSessionActive(false);
    }
  };

  const handleResetSession = () => {
    setSessionActive(false);
    setIsCompleted(false);
    setEvaluation(null);
    setStudentAnswer('');
  };

  const currentQ = currentQuestions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Interactive Placement Preparation Tool</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            AI Interview Arena
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            Simulate realistic technical and behavioral placement interview rounds. Practice structured communication, obtain conceptual scoring, and review model industry responses.
          </p>
        </div>

        {sessionActive && (
          <button
            onClick={handleResetSession}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-[#9CA7BD] hover:text-white transition-all cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        )}
      </div>

      {/* Screen 1: Session Setup / Configuration (when not active and not completed) */}
      {!sessionActive && !isCompleted && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          <div>
            <h3 className="text-lg font-bold text-white">Configure Placement Mock Round</h3>
            <p className="text-xs text-[#9CA7BD] mt-0.5">Select topic, difficulty tier, and optional timer mode.</p>
          </div>

          <div className="space-y-4">
            {/* Topic Selection */}
            <div>
              <label className="text-xs font-semibold text-[#9CA7BD] block mb-2 font-mono uppercase">
                Interview Domain & Topic
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      selectedTopic === topic
                        ? 'bg-[#101525] border-2 border-[#40F5D0] text-white shadow-[0_0_15px_rgba(64,245,208,0.2)]'
                        : 'bg-[#080B14] border border-white/10 text-[#9CA7BD] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty & Timer Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#9CA7BD] font-mono uppercase block">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`py-2 text-center text-xs font-medium rounded-lg transition-all cursor-pointer ${
                        selectedDifficulty === diff
                          ? 'bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/40 font-semibold'
                          : 'text-[#9CA7BD] hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#9CA7BD] font-mono uppercase block">
                  Practice Timing
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setIsTimed(false)}
                    className={`py-2 text-center text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      !isTimed
                        ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40 font-semibold'
                        : 'text-[#9CA7BD] hover:text-white'
                    }`}
                  >
                    Practice Mode (Untimed)
                  </button>
                  <button
                    onClick={() => setIsTimed(true)}
                    className={`py-2 text-center text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      isTimed
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                        : 'text-[#9CA7BD] hover:text-white'
                    }`}
                  >
                    Timed (120s / Question)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <span className="text-xs text-[#9CA7BD]">Earn XP for structured conceptual completeness.</span>
            <button
              onClick={handleStartSession}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_20px_rgba(64,245,208,0.3)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Arena Round</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Active Question Interaction */}
      {sessionActive && currentQ && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl relative">
          {/* Question Status Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#40F5D0] font-semibold">
                Question {currentIndex + 1} of {currentQuestions.length}
              </span>
              <span>·</span>
              <span className="text-[#A78BFA]">{currentQ.topic}</span>
              <span>·</span>
              <span className="text-white/60">{currentQ.difficulty}</span>
            </div>

            {isTimed && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold border ${
                timeLeft < 30 ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' : 'bg-white/5 text-amber-300 border-white/10'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Hint toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs text-[#A78BFA] hover:underline cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Interviewer Hint' : 'View Interviewer Hint'}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3 rounded-lg bg-[#080B14] border border-[#A78BFA]/30 text-xs text-[#9CA7BD] space-y-1">
                  <span className="font-semibold text-white block">Key Elements to Address:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {currentQ.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Student Answer Textarea (Disabled when evaluated) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#9CA7BD] flex items-center justify-between">
              <span>Your Structured Response:</span>
              <span className="font-mono text-[11px] text-[#9CA7BD]">
                {studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0} Words
              </span>
            </label>
            <textarea
              rows={6}
              disabled={!!evaluation}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Articulate your explanation clearly. Mention foundational mechanisms, core terminology, and practical trade-offs..."
              className="w-full bg-[#080B14] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white focus-visible:outline-none focus-visible:border-[#40F5D0] leading-relaxed resize-y"
            />
          </div>

          {/* Submit or Next Controls */}
          {!evaluation ? (
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-[#9CA7BD]">Take your time to structure your answer logically.</span>
              <button
                onClick={handleSubmitAnswer}
                disabled={studentAnswer.trim().length === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_15px_rgba(64,245,208,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Conceptual Evaluation</span>
              </button>
            </div>
          ) : (
            /* Instant Evaluation Breakdown */
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="p-5 rounded-xl bg-[#080B14] border border-[#40F5D0]/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold font-mono text-[#40F5D0]">
                      {evaluation.score}/100
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white uppercase block">
                        Verdict: {evaluation.verdict}
                      </span>
                      <span className="text-[11px] text-[#9CA7BD]">Conceptual completeness score</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    +30 XP Awarded
                  </span>
                </div>

                <p className="text-xs text-white leading-relaxed">
                  {evaluation.detailedFeedback}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-[#101525] border border-white/5 space-y-1.5">
                    <span className="font-semibold text-emerald-400 block">Demonstrated Strengths:</span>
                    <ul className="space-y-1 text-[#9CA7BD]">
                      {evaluation.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[#101525] border border-white/5 space-y-1.5">
                    <span className="font-semibold text-amber-400 block">Areas for Enhancement:</span>
                    <ul className="space-y-1 text-[#9CA7BD]">
                      {evaluation.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400">›</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Important Concept & Sample Ideal Answer */}
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-[#101525] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-[#A78BFA] block font-semibold">
                      Core Concept Explanation
                    </span>
                    <p className="text-xs text-[#9CA7BD] leading-relaxed">
                      {currentQ.conceptExplanation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#101525] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-[#40F5D0] block font-semibold">
                      Model Industry Response
                    </span>
                    <p className="text-xs text-white/90 leading-relaxed font-mono">
                      "{currentQ.idealAnswer}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Advance button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(64,245,208,0.25)]"
                >
                  <span>{currentIndex < currentQuestions.length - 1 ? 'Next Question' : 'View Practice Summary'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Screen 3: Practice Summary Report */}
      {isCompleted && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#40F5D0]/20 border border-[#40F5D0]/40 flex items-center justify-center mx-auto text-[#40F5D0]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Practice Session Summary</h3>
            <p className="text-xs text-[#9CA7BD]">
              You completed {sessionResults.length} interview questions across {selectedTopic}.
            </p>
          </div>

          {/* Average Score */}
          {(() => {
            const avgScore = Math.round(
              sessionResults.reduce((acc, curr) => acc + curr.evaluation.score, 0) / Math.max(1, sessionResults.length)
            );
            return (
              <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 flex items-center justify-around text-center">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Average Score</span>
                  <span className="text-3xl font-extrabold font-mono text-[#40F5D0]">{avgScore}/100</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Questions Practiced</span>
                  <span className="text-3xl font-extrabold font-mono text-white">{sessionResults.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Total XP Gained</span>
                  <span className="text-3xl font-extrabold font-mono text-[#A78BFA]">+{sessionResults.length * 30} XP</span>
                </div>
              </div>
            );
          })()}

          {/* Questions review breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#9CA7BD]">Detailed Question Review:</h4>
            {sessionResults.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#080B14] border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">0{idx + 1}. {item.question.question}</span>
                  <span className="font-mono font-bold text-[#40F5D0]">{item.evaluation.score}/100</span>
                </div>
                <p className="text-[#9CA7BD] text-[11px] italic">
                  Your Answer: "{item.answer.slice(0, 160)}..."
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#A78BFA]">
                  <span>Verdict: {item.evaluation.verdict}</span>
                  <span>·</span>
                  <span>Matched {item.evaluation.matchedKeywords.length} core concepts</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleResetSession}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all cursor-pointer"
            >
              Start Another Interview Session
            </button>
          </div>
        </div>
      )}

      {/* Objective Scoring Notice */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Evaluation Transparency Notice:</strong> Scoring evaluates semantic keyword presence, structured depth, and conceptual alignment with standard interview rubrics. Automated scores are meant for self-paced study and do not substitute for human recruiter judgment.
        </p>
      </div>
    </div>
  );
};
