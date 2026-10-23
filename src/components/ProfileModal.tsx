import React, { useState } from 'react';
import { X, UserCircle2, ShieldCheck, Zap, Award, Flame, RotateCcw, Check } from 'lucide-react';
import { StorageService } from '../services/storage';
import { StudentProfile, CareerId } from '../types';
import { CAREER_PATHWAYS } from '../data/careersData';

export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}> = ({ isOpen, onClose, onProfileUpdated }) => {
  if (!isOpen) return null;

  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile());
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onProfileUpdated();
      onClose();
    }, 800);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all local prototype progress (XP, saved blueprints, missions) back to default demo state?')) {
      localStorage.clear();
      onProfileUpdated();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-panel-glow w-full max-w-lg rounded-2xl p-6 sm:p-8 space-y-6 border border-white/20 relative shadow-2xl text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-5 h-5 text-[#40F5D0]" />
            <h3 className="text-base font-bold text-white">Student Command Profile</h3>
          </div>
          <button onClick={onClose} className="text-[#9CA7BD] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[#9CA7BD] font-medium">Full Name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-[#080B14] border border-white/10 rounded-xl p-2.5 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#9CA7BD] font-medium">Degree & Academic Stage</label>
            <input
              type="text"
              required
              value={profile.degree}
              onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
              className="w-full bg-[#080B14] border border-white/10 rounded-xl p-2.5 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#9CA7BD] font-medium">Target Tech Specialization</label>
            <select
              value={profile.targetRole}
              onChange={(e) => setProfile({ ...profile, targetRole: e.target.value as CareerId })}
              className="w-full bg-[#080B14] border border-white/10 rounded-xl p-2.5 text-white"
            >
              {CAREER_PATHWAYS.map(c => (
                <option key={c.id} value={c.id} className="bg-[#080B14]">{c.title}</option>
              ))}
            </select>
          </div>

          {/* Current Stats Overview */}
          <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Level</span>
              <span className="text-lg font-bold font-mono text-white">{profile.level}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Total XP</span>
              <span className="text-lg font-bold font-mono text-[#40F5D0]">{profile.xp}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#9CA7BD] block">Streak</span>
              <span className="text-lg font-bold font-mono text-amber-400">{profile.streakDays}d</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDemoData}
              className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Prototype Data</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl bg-white/5 text-[#9CA7BD] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#40F5D0] text-[#080B14] font-bold hover:bg-[#40F5D0]/90 transition-all flex items-center gap-1.5"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{savedSuccess ? 'Saved!' : 'Save Profile'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
