/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/Home/HeroSection';
import { CareerPathwaysPreview } from './components/Home/CareerPathwaysPreview';
import { HowItWorksSection } from './components/Home/HowItWorksSection';
import { InteractiveCareerGalaxy } from './components/Home/InteractiveCareerGalaxy';
import { CareerDNAAssessment } from './components/CareerDNA/CareerDNAAssessment';
import { SkillGapDashboard } from './components/SkillGap/SkillGapDashboard';
import { ProjectStudioWorkspace } from './components/ProjectStudio/ProjectStudioWorkspace';
import { MissionControlDashboard } from './components/MissionControl/MissionControlDashboard';
import { InterviewArenaWorkspace } from './components/InterviewArena/InterviewArenaWorkspace';
import { PlacementsHub } from './components/Placements/PlacementsHub';
import { ShowcaseGallery } from './components/Showcase/ShowcaseGallery';
import { RoadmapViewer } from './components/Roadmaps/RoadmapViewer';
import { ProfileModal } from './components/ProfileModal';
import { StorageService, UserSettings } from './services/storage';
import { CareerId } from './types';
import { Sparkles, ArrowRight, Dna, Target, FolderGit2, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRoleForRadar, setSelectedRoleForRadar] = useState<CareerId>('fullstack');
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<UserSettings>(() => StorageService.getSettings());

  useEffect(() => {
    // Sync html element font size with settings
    const root = document.documentElement;
    if (settings.textSize === 'large') {
      root.style.fontSize = '18px';
    } else if (settings.textSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [settings.textSize]);

  const handleLaunchRadarForRole = (roleId: string) => {
    setSelectedRoleForRadar(roleId as CareerId);
    setActiveTab('radar');
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  const handleLaunchProjectStudio = (tech?: string) => {
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#080B14] text-[#F5F7FF] flex flex-col font-sans selection:bg-[#40F5D0]/30 selection:text-white ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Beginner Mode Banner (if toggled on by user) */}
      {settings.plainEnglishMode && (
        <aside aria-label="Beginner Mode Notice" className="bg-[#101525] border-b border-[#40F5D0]/30 py-2 px-4 text-xs text-center text-[#40F5D0] flex items-center justify-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>
            <strong>Beginner Plain English Active:</strong> Technical jargon is annotated with simplified real-world analogies across the interface.
          </span>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setProfileModalOpen(true)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSection
              onStartDNA={() => setActiveTab('dna')}
              onExploreCareers={() => setActiveTab('careers')}
              onOpenProjectStudio={() => setActiveTab('studio')}
            />

            <InteractiveCareerGalaxy
              onSelectCareer={(cId) => handleLaunchRadarForRole(cId)}
              onOpenProject={() => handleLaunchProjectStudio()}
            />

            <CareerPathwaysPreview
              onSelectRoleForRadar={handleLaunchRadarForRole}
              onExploreProjectStudio={handleLaunchProjectStudio}
            />

            <HowItWorksSection
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
              }}
            />

            {/* Quick Interactive Bridge CTA */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-[#40F5D0]/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#40F5D0]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#40F5D0] font-bold">
                    Start Your Next Big Move
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Every student has a distinct trajectory. Discover yours in 3 minutes.
                  </h2>
                  <p className="text-sm text-[#9CA7BD] leading-relaxed">
                    Take the AI Career DNA assessment, uncover your priority skill gaps, and begin constructing resume-worthy project blueprints today.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setActiveTab('dna');
                        window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_25px_rgba(64,245,208,0.35)] cursor-pointer"
                    >
                      <Dna className="w-4 h-4" />
                      <span>Take Career DNA Assessment</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('radar');
                        window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#101525] hover:bg-[#161D32] border border-white/10 text-white transition-all cursor-pointer"
                    >
                      <Target className="w-4 h-4 text-[#A78BFA]" />
                      <span>Test Skill Gap Radar</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'careers' && (
          <div className="space-y-4">
            <CareerPathwaysPreview
              onSelectRoleForRadar={handleLaunchRadarForRole}
              onExploreProjectStudio={handleLaunchProjectStudio}
            />
            <RoadmapViewer
              initialCareerId={selectedRoleForRadar}
              onExploreRadar={handleLaunchRadarForRole}
            />
          </div>
        )}

        {activeTab === 'dna' && (
          <CareerDNAAssessment
            onExploreRadar={handleLaunchRadarForRole}
            onExploreStudio={handleLaunchProjectStudio}
          />
        )}

        {activeTab === 'radar' && (
          <SkillGapDashboard
            initialRoleId={selectedRoleForRadar}
            onNavigateToStudio={handleLaunchProjectStudio}
          />
        )}

        {activeTab === 'studio' && (
          <ProjectStudioWorkspace
            onProjectSavedToCommandCenter={() => {
              // Could trigger celebration or prompt to view in missions
            }}
          />
        )}

        {activeTab === 'missions' && (
          <MissionControlDashboard
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
            }}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewArenaWorkspace />
        )}

        {activeTab === 'placements' && (
          <PlacementsHub />
        )}

        {activeTab === 'showcase' && (
          <ShowcaseGallery />
        )}
      </main>

      {/* Global Student Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onProfileUpdated={() => {
          // re-sync components
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
        }}
      />
    </div>
  );
}
