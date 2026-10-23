import React, { useState } from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  Check, 
  Copy, 
  Bookmark, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Database, 
  Layers, 
  Calendar, 
  ListChecks, 
  Presentation, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { PROJECT_DOMAINS } from '../../data/projectTemplates';
import { ProjectBlueprint } from '../../types';
import { StorageService } from '../../services/storage';

export const ProjectStudioWorkspace: React.FC<{
  onProjectSavedToCommandCenter?: () => void;
}> = ({ onProjectSavedToCommandCenter }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('agritech');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [availableDays, setAvailableDays] = useState<number>(7);
  const [preferredTech, setPreferredTech] = useState<string>('Python & React');
  const [problemArea, setProblemArea] = useState<string>('Early crop leaf disease detection & vernacular treatment advice');

  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(() => {
    const saved = StorageService.getBlueprints();
    return saved.length > 0 ? saved[0] : null;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<boolean>(false);

  const currentDomain = PROJECT_DOMAINS.find(d => d.id === selectedDomainId) || PROJECT_DOMAINS[0];

  // Dynamic Blueprint Generator responding strictly to inputs
  const handleGenerate = (variation = 1) => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedTitle = `${currentDomain.name.split(' ')[0]} ${
        variation > 1 ? 'Pulse' : 'Nexus'
      }: ${problemArea.split('&')[0].trim() || 'Applied Solution'} System`;

      // Milestone division based on days
      const days = availableDays;
      const m1Days = Math.max(1, Math.round(days * 0.25));
      const m2Days = Math.max(2, Math.round(days * 0.5));
      const m3Days = Math.max(3, Math.round(days * 0.8));

      const newBlueprint: ProjectBlueprint = {
        id: `bp_${Date.now()}`,
        title: generatedTitle,
        domain: currentDomain.name,
        difficulty,
        estimatedDays: days,
        technology: preferredTech.split(/[,&+/]/).map(t => t.trim()).filter(Boolean),
        problemStatement: `In real-world settings, individuals face significant friction with: ${problemArea.toLowerCase()}. Existing off-the-shelf tools are either prohibitively complex or lack localized adaptations.`,
        proposedSolution: `A streamlined ${difficulty.toLowerCase()}-level full-stack software application built with ${preferredTech}. It provides high usability, rapid response cycles, and persistent data tracking to directly address this issue.`,
        targetUsers: [
          'Direct end-users impacted by this domain',
          'Administrative coordinators & review officers',
          'Field inspectors or domain specialists'
        ],
        features: [
          'Intuitive, mobile-responsive dashboard with accessible contrast and high clarity',
          'Interactive input interface tailored for domain data ingestion and parsing',
          'Automated validation engine with instant feedback and structured notifications',
          'Persistent data store supporting CRUD operations, historical search, and filters',
          'Executive metrics view summarizing operational outcomes and throughput'
        ],
        systemArchitecture: {
          frontend: `React 19 + Tailwind CSS for responsive components, local state caching, and accessible dialogs.`,
          backend: preferredTech.toLowerCase().includes('python') 
            ? 'FastAPI asynchronous microservice providing REST endpoints with Pydantic validation.'
            : 'Node.js & Express server with TypeScript, modular routing, and CORS protection.',
          database: difficulty === 'Beginner'
            ? 'SQLite / Local Document Store for minimal configuration and rapid deployment.'
            : 'PostgreSQL with relational foreign-key integrity and normalized entities.',
          externalServices: 'Cloud object storage simulation and Web API background workers.'
        },
        databaseDesign: {
          entities: [
            { name: 'CoreRecords', fields: ['id', 'user_id', 'title', 'status', 'created_at'] },
            { name: 'AnalyticsEvents', fields: ['id', 'record_id', 'event_type', 'payload_json', 'timestamp'] },
            { name: 'UserProfiles', fields: ['id', 'email', 'role_tier', 'verified_flag'] }
          ],
          notes: 'Designed to avoid cascading lock overhead while providing fast indexed queries on timestamp and status.'
        },
        developmentMilestones: [
          {
            id: 'm_1',
            dayRange: `Days 1–${m1Days}`,
            title: 'Project Scaffolding & Data Modeling',
            tasks: [
              'Initialize Git repository, branch strategy, and README.md with project goals',
              'Draft database schema tables and seed sample demonstration records',
              'Implement bare-bones API route handling ping and entity retrieval'
            ],
            completed: false
          },
          {
            id: 'm_2',
            dayRange: `Days ${m1Days + 1}–${m2Days}`,
            title: 'Core Business Logic & Interaction Layer',
            tasks: [
              'Build responsive forms and interactive list views in the frontend',
              'Connect frontend client to server REST endpoints with error boundaries',
              'Implement client-side search, filtering, and validation'
            ],
            completed: false
          },
          {
            id: 'm_3',
            dayRange: `Days ${m2Days + 1}–${m3Days}`,
            title: 'Edge Cases, Security & Observability',
            tasks: [
              'Add input sanitization and defensive error handling for edge inputs',
              'Implement state persistence and optimistic UI updates',
              'Refactor code for modularity and write baseline unit test cases'
            ],
            completed: false
          },
          {
            id: 'm_4',
            dayRange: `Days ${m3Days + 1}–${days}`,
            title: 'Deployment & Portfolio Presentation Polish',
            tasks: [
              'Deploy application to cloud provider (Vercel, Render, or Hugging Face)',
              'Write comprehensive README documentation with architecture diagrams',
              'Prepare live demonstration walkthrough script for placement interviewers'
            ],
            completed: false
          }
        ],
        testingChecklist: [
          'Verify responsive layout adapts smoothly on 375px mobile viewports',
          'Ensure form rejects invalid inputs with clear, accessible error messages',
          'Verify zero unhandled runtime exceptions in browser console during operations',
          'Test persistent data recovery following page refreshes'
        ],
        futureEnhancements: [
          'Integration with real-time WebSockets for synchronous multi-user updates',
          'Role-based permissions matrix for team collaboration',
          'Offline PWA caching for rural low-bandwidth scenarios'
        ],
        demoPresentationTips: [
          'Begin with a sharp 20-second problem statement: "Why did you choose to build this?"',
          'Show the live working demo first, then walk through the architecture diagram.',
          'Highlight one difficult bug you encountered and how you systematically debugged it.'
        ],
        isUserGenerated: true,
        createdAt: new Date().toLocaleDateString()
      };

      setBlueprint(newBlueprint);
      StorageService.saveBlueprint(newBlueprint);
      StorageService.addXP(40); // Award XP
      setIsGenerating(false);
    }, 500);
  };

  const handleToggleMilestone = (milestoneId: string, currentStatus?: boolean) => {
    if (!blueprint) return;
    const updatedMilestones = blueprint.developmentMilestones.map(m => {
      if (m.id === milestoneId) {
        return { ...m, completed: !currentStatus };
      }
      return m;
    });
    const updated = { ...blueprint, developmentMilestones: updatedMilestones };
    setBlueprint(updated);
    StorageService.saveBlueprint(updated);
    if (!currentStatus) {
      StorageService.addXP(25); // Award XP for completing milestone!
    }
  };

  const handleCopyMarkdown = () => {
    if (!blueprint) return;
    const md = `# ${blueprint.title}
**Domain:** ${blueprint.domain} | **Difficulty:** ${blueprint.difficulty} | **Timeline:** ${blueprint.estimatedDays} Days
**Technologies:** ${blueprint.technology.join(', ')}

## 1. Problem Statement
${blueprint.problemStatement}

## 2. Proposed Solution
${blueprint.proposedSolution}

## 3. Key Features
${blueprint.features.map(f => `- ${f}`).join('\n')}

## 4. System Architecture
- **Frontend:** ${blueprint.systemArchitecture.frontend}
- **Backend:** ${blueprint.systemArchitecture.backend}
- **Database:** ${blueprint.systemArchitecture.database}

## 5. Development Milestones
${blueprint.developmentMilestones.map(m => `### ${m.dayRange}: ${m.title}\n${m.tasks.map(t => `- [${m.completed ? 'x' : ' '}] ${t}`).join('\n')}`).join('\n\n')}

## 6. Testing Checklist
${blueprint.testingChecklist.map(t => `- [ ] ${t}`).join('\n')}

## 7. Demo & Presentation Tips
${blueprint.demoPresentationTips.map(p => `- ${p}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handleSaveToCommandCenter = () => {
    if (!blueprint) return;
    StorageService.saveBlueprint(blueprint);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
    if (onProjectSavedToCommandCenter) {
      onProjectSavedToCommandCenter();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>AI Project Blueprint Studio</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Industry Capstone Architecture Engine
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            Configure domain parameters, tech stack preferences, and available timelines to generate production-grade 12-point project blueprints with actionable milestone tracking.
          </p>
        </div>

        <div className="text-xs font-mono text-[#9CA7BD]">
          <span>Status: </span>
          <span className="text-[#40F5D0]">Generator Ready</span>
        </div>
      </div>

      {/* Generator Configuration Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          1. Configure Project Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Domain */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA7BD]">Career Domain</label>
            <select
              value={selectedDomainId}
              onChange={(e) => {
                const dom = PROJECT_DOMAINS.find(d => d.id === e.target.value);
                setSelectedDomainId(e.target.value);
                if (dom) {
                  setPreferredTech(dom.defaultTech.slice(0, 3).join(', '));
                  setProblemArea(dom.suggestedProblems[0]);
                }
              }}
              className="w-full bg-[#080B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:border-[#40F5D0]"
            >
              {PROJECT_DOMAINS.map(d => (
                <option key={d.id} value={d.id} className="bg-[#080B14]">{d.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA7BD]">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`py-1.5 text-center text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    difficulty === lvl
                      ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40'
                      : 'text-[#9CA7BD] hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Available Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA7BD]">Available Timeline</label>
            <div className="grid grid-cols-4 gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10">
              {[3, 7, 14, 30].map(days => (
                <button
                  key={days}
                  onClick={() => setAvailableDays(days)}
                  className={`py-1.5 text-center text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    availableDays === days
                      ? 'bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/40'
                      : 'text-[#9CA7BD] hover:text-white'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Technology */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA7BD]">Preferred Tech Stack</label>
            <input
              type="text"
              value={preferredTech}
              onChange={(e) => setPreferredTech(e.target.value)}
              placeholder="e.g. Python, React, PostgreSQL"
              className="w-full bg-[#080B14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:border-[#40F5D0]"
            />
          </div>
        </div>

        {/* Problem Area Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#9CA7BD]">Specific Problem Area to Tackle</label>
          <input
            type="text"
            value={problemArea}
            onChange={(e) => setProblemArea(e.target.value)}
            className="w-full bg-[#080B14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus-visible:outline-none focus-visible:border-[#40F5D0]"
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-[#9CA7BD]">Suggestions:</span>
            {currentDomain.suggestedProblems.map((prob, i) => (
              <button
                key={i}
                onClick={() => setProblemArea(prob)}
                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors cursor-pointer text-left line-clamp-1"
              >
                {prob}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trigger */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <span className="text-xs text-[#9CA7BD]">
            Generates real-world architecture, relational models, milestone schedules, and interview defense tips.
          </span>
          <button
            onClick={() => handleGenerate(1)}
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_20px_rgba(64,245,208,0.3)] cursor-pointer"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-[#080B14] border-t-transparent rounded-full animate-spin" />
                Architecting Blueprint...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Project Blueprint (+40 XP)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Blueprint View (12-Point Production Specification) */}
      {blueprint && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8 shadow-2xl relative">
          {/* Top Bar with Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9CA7BD] mb-1 font-mono">
                <span className="text-[#40F5D0] font-semibold">{blueprint.domain}</span>
                <span>·</span>
                <span className="text-white font-medium">{blueprint.difficulty} Tier</span>
                <span>·</span>
                <span>{blueprint.estimatedDays} Days Estimated</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {blueprint.title}
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Copy complete markdown plan"
              >
                {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-[#40F5D0]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMarkdown ? 'Copied Markdown' : 'Copy Project Plan'}</span>
              </button>

              <button
                onClick={handleSaveToCommandCenter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101525] border border-[#40F5D0]/30 text-[#40F5D0] hover:bg-[#40F5D0]/10 transition-all cursor-pointer"
                title="Save project to Career Mission Command Center"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{saveSuccessNotice ? 'Saved to Command Center!' : 'Save Project'}</span>
              </button>

              <button
                onClick={() => handleGenerate(Date.now())}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#101525] border border-white/10 text-[#9CA7BD] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Create another project variation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Create Another Version</span>
              </button>
            </div>
          </div>

          {/* 1. Problem Statement & 2. Proposed Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-red-400 font-semibold tracking-wider">
                01. Real-World Problem Statement
              </span>
              <p className="text-xs text-[#F5F7FF]/90 leading-relaxed">
                {blueprint.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#40F5D0] font-semibold tracking-wider">
                02. Proposed Engineering Solution
              </span>
              <p className="text-xs text-[#F5F7FF]/90 leading-relaxed">
                {blueprint.proposedSolution}
              </p>
            </div>
          </div>

          {/* 3. Target Users & 4. Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-semibold tracking-wider">
                03. Target User Personas
              </span>
              <ul className="space-y-1.5 text-xs text-white/90">
                {blueprint.targetUsers.map((user, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                    <span>{user}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-wider">
                04. Functional Feature Specifications
              </span>
              <ul className="space-y-1.5 text-xs text-white/90">
                {blueprint.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Tech Stack & 6. System Architecture */}
          <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase text-[#40F5D0] font-semibold tracking-wider">
                05. Architecture & Stack Blueprint
              </span>
              <div className="flex flex-wrap gap-1.5">
                {blueprint.technology.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#40F5D0]/10 text-[#40F5D0] border border-[#40F5D0]/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#101525] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#9CA7BD] uppercase block">Frontend Layer</span>
                <p className="text-white text-xs leading-relaxed">{blueprint.systemArchitecture.frontend}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#101525] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#9CA7BD] uppercase block">Backend Server</span>
                <p className="text-white text-xs leading-relaxed">{blueprint.systemArchitecture.backend}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#101525] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-[#9CA7BD] uppercase block">Database & Storage</span>
                <p className="text-white text-xs leading-relaxed">{blueprint.systemArchitecture.database}</p>
              </div>
            </div>
          </div>

          {/* 7. Database Design */}
          {blueprint.databaseDesign && (
            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-semibold tracking-wider">
                  06. Database Schema Design (Entities)
                </span>
                <span className="text-[11px] text-[#9CA7BD]">{blueprint.databaseDesign.notes}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {blueprint.databaseDesign.entities.map((entity, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#101525] border border-white/5 font-mono text-xs">
                    <span className="font-bold text-[#A78BFA] block mb-1">TABLE: {entity.name}</span>
                    <ul className="space-y-0.5 text-[#9CA7BD] text-[11px]">
                      {entity.fields.map((f, fi) => (
                        <li key={fi}>· {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Interactive Development Milestones (Real Task Checkboxes with XP!) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#40F5D0] font-semibold tracking-wider">
                  07. Interactive Sprint Milestones
                </span>
                <h4 className="text-sm font-bold text-white">
                  Mark tasks as completed to track real velocity & earn XP (+25 XP per phase)
                </h4>
              </div>
              <span className="text-xs font-mono text-[#40F5D0]">
                {blueprint.developmentMilestones.filter(m => m.completed).length} / {blueprint.developmentMilestones.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprint.developmentMilestones.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border transition-all ${
                    m.completed
                      ? 'bg-[#101525] border-emerald-500/40 shadow-sm'
                      : 'bg-[#080B14] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#40F5D0]">{m.dayRange}</span>
                    <button
                      onClick={() => handleToggleMilestone(m.id, m.completed)}
                      className={`text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        m.completed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-white/5 text-[#9CA7BD] hover:text-white border border-white/10'
                      }`}
                    >
                      {m.completed ? <Check className="w-3 h-3" /> : null}
                      <span>{m.completed ? 'Phase Complete' : 'Mark Complete'}</span>
                    </button>
                  </div>

                  <h5 className="font-semibold text-xs text-white mb-2">{m.title}</h5>

                  <ul className="space-y-1 text-xs text-[#9CA7BD]">
                    {m.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-start gap-1.5">
                        <span className="text-white/40">›</span>
                        <span className={m.completed ? 'line-through text-white/50' : 'text-white/80'}>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Testing Checklist & 10. Future Enhancements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold tracking-wider">
                08. Quality Assurance & Verification
              </span>
              <ul className="space-y-1.5 text-xs text-white/90">
                {blueprint.testingChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ListChecks className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider">
                09. Future Architectural Iterations
              </span>
              <ul className="space-y-1.5 text-xs text-white/90">
                {blueprint.futureEnhancements.map((enh, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400">⚡</span>
                    <span>{enh}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 11. Presentation & Demo Pitch Tips */}
          <div className="p-5 rounded-xl bg-[#101525] border border-[#40F5D0]/30 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#40F5D0] font-semibold tracking-wider">
              10. Placement Interview Demo Pitch Tips
            </span>
            <ul className="space-y-1.5 text-xs text-white/90">
              {blueprint.demoPresentationTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Presentation className="w-3.5 h-3.5 text-[#40F5D0] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Distinguish proposed vs implemented status */}
          <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#40F5D0]" />
              <span>
                <strong>Blueprint Specification:</strong> This is a structured architecture plan ready for implementation in your development environment.
              </span>
            </div>
            <button
              onClick={handleSaveToCommandCenter}
              className="text-[#40F5D0] font-semibold hover:underline shrink-0"
            >
              Pin to Command Center →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
