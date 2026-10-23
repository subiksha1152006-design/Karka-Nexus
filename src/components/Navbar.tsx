import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Compass, 
  Dna, 
  Target, 
  FolderGit2, 
  Gamepad2, 
  MessageSquareCode, 
  Briefcase, 
  FolderKanban, 
  Menu, 
  X, 
  Zap, 
  Settings, 
  CheckCircle2, 
  UserCircle2 
} from 'lucide-react';
import { StorageService, UserSettings } from '../services/storage';
import { StudentProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfile: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
  settings,
  onUpdateSettings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile());

  useEffect(() => {
    const handleProfileUpdate = () => {
      setProfile(StorageService.getProfile());
    };
    window.addEventListener('storage', handleProfileUpdate);
    const interval = setInterval(handleProfileUpdate, 2000);
    return () => {
      window.removeEventListener('storage', handleProfileUpdate);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'careers', label: 'Explore Careers', icon: Compass },
    { id: 'dna', label: 'AI Career DNA', icon: Dna },
    { id: 'radar', label: 'Skill Gap Radar', icon: Target },
    { id: 'studio', label: 'Project Studio', icon: FolderGit2 },
    { id: 'missions', label: 'Mission Control', icon: Gamepad2 },
    { id: 'interview', label: 'Interview Arena', icon: MessageSquareCode },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'showcase', label: 'Showcase', icon: FolderKanban }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080B14]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#40F5D0] rounded-lg p-1"
            aria-label="KARKA NEXUS AI Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#40F5D0]/20 to-[#A78BFA]/20 border border-[#40F5D0]/40 group-hover:border-[#40F5D0] transition-colors shadow-[0_0_15px_rgba(64,245,208,0.2)]">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#40F5D0] to-[#A78BFA] text-lg font-mono">
                K
              </span>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#40F5D0] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-wider text-base text-[#F5F7FF]">KARKA</span>
                <span className="font-extrabold tracking-widest text-[#40F5D0] text-sm">NEXUS</span>
                <span className="text-[10px] uppercase font-mono px-1 py-0.2 text-[#A78BFA] bg-[#A78BFA]/10 border border-[#A78BFA]/30 rounded">AI</span>
              </div>
              <p className="text-[10px] text-[#9CA7BD] tracking-tight hidden sm:block">
                Career Operating System
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs lg:text-sm font-medium ${
                    isActive
                      ? 'text-[#40F5D0] bg-[#40F5D0]/10 border border-[#40F5D0]/30 shadow-[0_0_12px_rgba(64,245,208,0.15)]'
                      : 'text-[#9CA7BD] hover:text-[#F5F7FF] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Student XP Badge */}
            <button
              onClick={() => handleNavClick('missions')}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#101525] border border-[#A78BFA]/30 hover:border-[#A78BFA] transition-colors text-xs text-[#F5F7FF]"
              title="Career Command Center XP"
            >
              <Zap className="w-3.5 h-3.5 text-[#40F5D0]" />
              <span className="font-mono font-semibold text-[#40F5D0]">{profile.xp} XP</span>
              <span className="text-[#9CA7BD] text-[11px]">Lv {profile.level}</span>
            </button>

            {/* Accessibility & Preferences Toggle */}
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`p-2 rounded-lg border transition-colors ${
                  settingsOpen || settings.plainEnglishMode || settings.textSize !== 'normal'
                    ? 'border-[#40F5D0] text-[#40F5D0] bg-[#40F5D0]/10'
                    : 'border-white/10 text-[#9CA7BD] hover:text-white hover:bg-white/5'
                }`}
                aria-label="Accessibility & Interface Settings"
                title="Accessibility & Learning Mode Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Accessibility Dropdown */}
              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-72 p-4 rounded-xl glass-panel shadow-2xl border border-white/20 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                    <span className="font-semibold text-white">Accessibility & View</span>
                    <button onClick={() => setSettingsOpen(false)} className="text-[#9CA7BD] hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Text Size */}
                  <div className="mb-3">
                    <label className="block text-[#9CA7BD] mb-1.5">Text Scale</label>
                    <div className="grid grid-cols-3 gap-1 bg-[#080B14] p-1 rounded-lg border border-white/10">
                      {(['normal', 'large', 'xlarge'] as const).map(size => (
                        <button
                          key={size}
                          onClick={() => {
                            const updated = { ...settings, textSize: size };
                            onUpdateSettings(updated);
                            StorageService.saveSettings(updated);
                          }}
                          className={`py-1 text-center rounded capitalize font-medium ${
                            settings.textSize === size ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40' : 'text-[#9CA7BD] hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Plain English Mode */}
                  <div className="flex items-center justify-between py-2 border-t border-white/10">
                    <div>
                      <p className="font-medium text-white">Beginner Plain English</p>
                      <p className="text-[10px] text-[#9CA7BD]">Simplifies technical jargon into intuitive concepts</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...settings, plainEnglishMode: !settings.plainEnglishMode };
                        onUpdateSettings(updated);
                        StorageService.saveSettings(updated);
                      }}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${settings.plainEnglishMode ? 'bg-[#40F5D0]' : 'bg-white/20'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-[#080B14] transition-transform ${settings.plainEnglishMode ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between py-2 border-t border-white/10">
                    <div>
                      <p className="font-medium text-white">Reduce Animations</p>
                      <p className="text-[10px] text-[#9CA7BD]">Disables ambient background particle effects</p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...settings, reducedMotion: !settings.reducedMotion };
                        onUpdateSettings(updated);
                        StorageService.saveSettings(updated);
                      }}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors ${settings.reducedMotion ? 'bg-[#40F5D0]' : 'bg-white/20'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-[#080B14] transition-transform ${settings.reducedMotion ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Sign In button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
            >
              <UserCircle2 className="w-4 h-4 text-[#40F5D0]" />
              <span className="hidden sm:inline">Profile</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('dna')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all shadow-[0_0_15px_rgba(64,245,208,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career DNA</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-white/10 text-[#9CA7BD] hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#080B14] px-4 pt-3 pb-6 space-y-1">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-[#9CA7BD]">
              <span>Signed in as <strong className="text-white">{profile.name}</strong></span>
            </div>
            <span className="text-xs font-mono text-[#40F5D0]">{profile.xp} XP (Lv {profile.level})</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left ${
                    isActive
                      ? 'bg-[#40F5D0]/10 text-[#40F5D0] border border-[#40F5D0]/30'
                      : 'text-[#9CA7BD] hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
