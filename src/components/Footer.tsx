import React from 'react';
import { ShieldCheck, Sparkles, ExternalLink, Heart, Terminal, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#080B14] text-[#9CA7BD] pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#40F5D0]/20 to-[#A78BFA]/20 border border-[#40F5D0]/40 flex items-center justify-center font-mono font-bold text-[#40F5D0]">
                K
              </div>
              <span className="font-bold text-white text-base tracking-wider">KARKA NEXUS AI</span>
            </div>
            <p className="text-[#9CA7BD] text-xs leading-relaxed">
              "Your Skills. Your Future. Your Next Big Move."
            </p>
            <p className="text-[11px] text-[#9CA7BD]/80 leading-relaxed">
              A futuristic student career operating system designed to uncover career direction, eliminate skill gaps through practical capstones, and accelerate placement readiness.
            </p>
          </div>

          {/* Quick Pathways */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Core Modules</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('dna')} className="hover:text-[#40F5D0] transition-colors">
                  AI Career DNA Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('radar')} className="hover:text-[#40F5D0] transition-colors">
                  Skill Gap Radar Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('studio')} className="hover:text-[#40F5D0] transition-colors">
                  AI Project Blueprint Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-[#40F5D0] transition-colors">
                  Career Mission Command Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interview')} className="hover:text-[#40F5D0] transition-colors">
                  Placement Interview Arena
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Placement */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Placement & Learning</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('placements')} className="hover:text-[#40F5D0] transition-colors">
                  Opportunity Tracker & Sample Listings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showcase')} className="hover:text-[#40F5D0] transition-colors">
                  Student Project Showcase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-[#40F5D0] transition-colors">
                  Interactive Career Pathways
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placements')} className="hover:text-[#40F5D0] transition-colors">
                  Pay-After-Placement Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Ethical Notice */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Platform Integrity</h4>
            <div className="p-3 rounded-lg bg-[#101525] border border-white/10 text-[11px] space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 text-[#40F5D0] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Demonstration Ethics</span>
              </div>
              <p className="text-[#9CA7BD]">
                All career assessments, project generation plans, and interview ratings are algorithmic educational guidance tools. Sample job cards are labeled mockups for portfolio practice.
              </p>
            </div>
            <p className="text-[10px] text-[#9CA7BD]/60">
              Inspired by the Karka AI & Tech Academy mission of practical engineering mastery and merit-based tech careers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9CA7BD]/70 gap-4">
          <p>© {new Date().getFullYear()} KARKA NEXUS AI. Built for the Next-Gen Tech Workforce.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#40F5D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#40F5D0] animate-pulse" />
              Engine Online
            </span>
            <span>·</span>
            <span>WCAG 2.1 AA Compliant</span>
            <span>·</span>
            <span>Client-Authoritative Persistence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
