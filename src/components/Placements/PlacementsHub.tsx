import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  FileText, 
  Layers, 
  HelpCircle, 
  Calendar, 
  MapPin, 
  DollarSign, 
  CheckCircle2 
} from 'lucide-react';
import { OpportunityListing } from '../../types';
import { StorageService } from '../../services/storage';
import { 
  SAMPLE_OPPORTUNITIES, 
  RESUME_CHECKLIST, 
  PORTFOLIO_CHECKLIST, 
  PAP_EDUCATIONAL_GUIDE 
} from '../../data/opportunitiesData';

export const PlacementsHub: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityListing[]>(() => {
    return StorageService.getOpportunities();
  });

  const [activeTab, setActiveTab] = useState<'listings' | 'tracker' | 'checklists' | 'pap'>('listings');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'res_1': true,
    'res_2': true,
    'port_1': true
  });

  const handleToggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpdateStatus = (oppId: string, status: OpportunityListing['status']) => {
    const updated = opportunities.map(o => {
      if (o.id === oppId) {
        return { ...o, status, saved: status !== 'Not Applied' };
      }
      return o;
    });
    setOpportunities(updated);
    StorageService.saveOpportunities(updated);
  };

  const filteredListings = opportunities.filter(opp => {
    const matchesSearch = opp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'All' || opp.type === filterType;
    return matchesSearch && matchesType;
  });

  const trackedListings = opportunities.filter(opp => opp.status && opp.status !== 'Not Applied');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Placement & Career Opportunities</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Placements & Internships Hub
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            Explore curated opportunity listings, manage your application pipeline, audit portfolio & resume readiness, and inspect ethical Pay-After-Placement guidelines.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#101525] p-1.5 rounded-xl border border-white/10 text-xs self-start md:self-auto">
          {(['listings', 'tracker', 'checklists', 'pap'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#40F5D0] text-[#080B14]'
                  : 'text-[#9CA7BD] hover:text-white'
              }`}
            >
              {tab === 'listings' ? 'Opportunities' : tab === 'tracker' ? 'My Tracker' : tab === 'checklists' ? 'Prep Checklists' : 'PAP Guide'}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OPPORTUNITY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#9CA7BD] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role, skills, or org..."
                className="w-full bg-[#080B14] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:border-[#40F5D0]"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-medium">
              <span className="text-[#9CA7BD] font-mono">Filter:</span>
              {(['All', 'Internship', 'Entry-Level', 'Graduate Program'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    filterType === type
                      ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40'
                      : 'bg-white/5 text-[#9CA7BD] hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Demonstration Notice Banner */}
          <div className="p-3.5 rounded-xl bg-[#101525] border border-white/10 text-xs text-[#9CA7BD] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#40F5D0]" />
              <span>
                <strong>Demonstration Listings Notice:</strong> These cards represent sample curated opportunities for practicing application tracking and requirement analysis.
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#40F5D0] hidden sm:inline">Mock Data · No Fake Links</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map(opp => (
              <div key={opp.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-semibold tracking-wider">
                        {opp.type} · {opp.workMode}
                      </span>
                      <h4 className="text-base font-bold text-white mt-0.5">{opp.role}</h4>
                      <p className="text-xs text-[#9CA7BD]">{opp.organization}</p>
                    </div>

                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-white/90 border border-white/10 shrink-0">
                      {opp.stipendOrSalary}
                    </span>
                  </div>

                  <div className="pt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#9CA7BD] uppercase block">Required Competencies:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {opp.requiredSkills.map((skill, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-white border border-white/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[#9CA7BD] text-[11px] pt-1">
                      <strong>Eligibility:</strong> {opp.eligibility}
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-[#9CA7BD]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#40F5D0]" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#A78BFA]" />
                        {opp.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions & Tracker Selector */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[#9CA7BD]">Status:</span>
                    <select
                      value={opp.status || 'Not Applied'}
                      onChange={(e) => handleUpdateStatus(opp.id, e.target.value as any)}
                      className="bg-[#080B14] border border-white/10 rounded-lg px-2 py-1 text-xs text-[#40F5D0] focus-visible:outline-none"
                    >
                      <option value="Not Applied">Not Applied</option>
                      <option value="Saved">Saved</option>
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </div>

                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#9CA7BD] hover:text-white"
                  >
                    <span>Sample Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATION TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Application Pipeline</h3>
              <p className="text-xs text-[#9CA7BD]">Track status updates from Saved through Interviewing and Offers.</p>
            </div>
            <span className="text-xs font-mono text-[#40F5D0]">{trackedListings.length} Tracked Roles</span>
          </div>

          {trackedListings.length > 0 ? (
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-white">
                  <thead className="bg-[#101525] border-b border-white/10 text-[#9CA7BD] font-mono uppercase text-[11px]">
                    <tr>
                      <th className="p-4">Organization & Role</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Compensation</th>
                      <th className="p-4">Application Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {trackedListings.map(item => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{item.role}</div>
                          <div className="text-[11px] text-[#9CA7BD]">{item.organization}</div>
                        </td>
                        <td className="p-4 text-[#A78BFA]">{item.type}</td>
                        <td className="p-4 font-mono">{item.stipendOrSalary}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                            item.status === 'Offer'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : item.status === 'Interviewing'
                              ? 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30'
                              : item.status === 'Applied'
                              ? 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30'
                              : 'bg-white/5 text-[#9CA7BD] border-white/10'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                            className="bg-[#080B14] border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                          >
                            <option value="Saved">Saved</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Not Applied">Remove from Tracker</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-10 rounded-2xl border border-white/10 text-center space-y-3">
              <Bookmark className="w-8 h-8 text-[#9CA7BD]/40 mx-auto" />
              <h4 className="text-base font-bold text-white">No Tracked Applications Yet</h4>
              <p className="text-xs text-[#9CA7BD] max-w-sm mx-auto">
                Save opportunities from the listings tab to track interviews and offers in your personalized pipeline.
              </p>
              <button
                onClick={() => setActiveTab('listings')}
                className="px-4 py-2 rounded-xl bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors"
              >
                Browse Sample Opportunities
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PLACEMENT PREPARATION CHECKLISTS */}
      {activeTab === 'checklists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Checklist */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  ATS Resume Checklist
                </h3>
                <p className="text-xs text-[#9CA7BD]">Ensure standard recruiter readability</p>
              </div>
              <FileText className="w-4 h-4 text-[#40F5D0]" />
            </div>

            <div className="space-y-2.5">
              {RESUME_CHECKLIST.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className="w-full p-3 rounded-xl bg-[#080B14] border border-white/10 flex items-start gap-3 text-left transition-colors cursor-pointer hover:border-white/20"
                  >
                    <div className="mt-0.5 text-[#40F5D0]">
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-white/30" />}
                    </div>
                    <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-[#9CA7BD]' : 'text-white'}`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Capstone Checklist */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Portfolio Verification Checklist
                </h3>
                <p className="text-xs text-[#9CA7BD]">Criteria that distinguish senior work from tutorial clones</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" />
            </div>

            <div className="space-y-2.5">
              {PORTFOLIO_CHECKLIST.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className="w-full p-3 rounded-xl bg-[#080B14] border border-white/10 flex items-start gap-3 text-left transition-colors cursor-pointer hover:border-white/20"
                  >
                    <div className="mt-0.5 text-[#A78BFA]">
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-white/30" />}
                    </div>
                    <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-[#9CA7BD]' : 'text-white'}`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAY-AFTER-PLACEMENT (PAP) TRANSPARENCY GUIDE */}
      {activeTab === 'pap' && (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-[#40F5D0] tracking-wider">
              Educational Consumer Awareness
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {PAP_EDUCATIONAL_GUIDE.title}
            </h3>
            <p className="text-xs text-[#9CA7BD] mt-1">
              {PAP_EDUCATIONAL_GUIDE.subtitle}
            </p>
          </div>

          {/* Disclaimer notice */}
          <div className="p-4 rounded-xl bg-[#080B14] border border-[#40F5D0]/30 text-xs text-[#9CA7BD] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {PAP_EDUCATIONAL_GUIDE.disclaimer}
            </p>
          </div>

          {/* Four Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAP_EDUCATIONAL_GUIDE.pillars.map((pillar, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#080B14] border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-[#9CA7BD] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#101525] border border-white/10 text-xs text-[#9CA7BD] flex items-center justify-between">
            <span>Always ask for a written contract copy and verify salary trigger clauses before enrolling in any deferred fee program.</span>
          </div>
        </div>
      )}
    </div>
  );
};
