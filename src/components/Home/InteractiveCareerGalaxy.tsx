import React, { useState } from 'react';
import { Sparkles, Layers, ChevronRight, Zap, Target, FolderGit2 } from 'lucide-react';
import { CAREER_PATHWAYS } from '../../data/careersData';
import { CareerId } from '../../types';

interface GalaxyNode {
  id: string;
  name: string;
  type: 'career' | 'skill' | 'project';
  careerId: CareerId;
  x: number; // percentage in view
  y: number;
  description: string;
  color: string;
}

export const InteractiveCareerGalaxy: React.FC<{
  onSelectCareer: (careerId: CareerId) => void;
  onOpenProject: () => void;
}> = ({ onSelectCareer, onOpenProject }) => {
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'career' | 'skill' | 'project'>('all');

  const nodes: GalaxyNode[] = [
    { id: 'c_fs', name: 'Full-Stack Developer', type: 'career', careerId: 'fullstack', x: 50, y: 50, description: 'Core web architecture linking client react interfaces to scalable APIs.', color: '#40F5D0' },
    { id: 's_react', name: 'React Architecture', type: 'skill', careerId: 'fullstack', x: 38, y: 35, description: 'Component state, custom hooks, and virtual DOM rendering.', color: '#38BDF8' },
    { id: 's_node', name: 'Node.js & Express', type: 'skill', careerId: 'fullstack', x: 62, y: 36, description: 'Non-blocking I/O server engines, REST routes, and middleware.', color: '#4ADE80' },
    { id: 's_sql', name: 'PostgreSQL Modeling', type: 'skill', careerId: 'fullstack', x: 50, y: 22, description: 'Relational entity normalization, indexing, and transactional integrity.', color: '#A78BFA' },
    { id: 'p_portal', name: 'Campus Peer Portal', type: 'project', careerId: 'fullstack', x: 32, y: 20, description: 'Capstone collaborative student mentoring exchange system.', color: '#F472B6' },

    { id: 'c_ai', name: 'AI / ML Engineer', type: 'career', careerId: 'aiml', x: 22, y: 68, description: 'Predictive intelligence, vector embeddings, and deep neural nets.', color: '#A78BFA' },
    { id: 's_py', name: 'Python Scientific', type: 'skill', careerId: 'aiml', x: 12, y: 55, description: 'NumPy vectorized arrays, pandas dataframes, and matrix calculus.', color: '#FBBF24' },
    { id: 's_torch', name: 'PyTorch Deep Learning', type: 'skill', careerId: 'aiml', x: 28, y: 84, description: 'Tensors, backprop autograd, CNN computer vision architectures.', color: '#FB7185' },
    { id: 'p_crop', name: 'Crop Disease Scanner', type: 'project', careerId: 'aiml', x: 10, y: 82, description: 'Mobile visual diagnostic tool fine-tuned on plant leaf blights.', color: '#34D399' },

    { id: 'c_data', name: 'Data Analyst', type: 'career', careerId: 'data-analyst', x: 78, y: 68, description: 'Transforming telemetry tables into executive visual narratives.', color: '#38BDF8' },
    { id: 's_adv_sql', name: 'Window Functions', type: 'skill', careerId: 'data-analyst', x: 88, y: 54, description: 'PARTITION BY, rolling moving averages, and cumulative ranking.', color: '#40F5D0' },
    { id: 's_bi', name: 'BI Dashboards', type: 'skill', careerId: 'data-analyst', x: 72, y: 84, description: 'Executive drilldowns, DAX measures, and cohort retention charts.', color: '#C084FC' },
    { id: 'p_churn', name: 'E-Commerce Churn Audit', type: 'project', careerId: 'data-analyst', x: 90, y: 82, description: 'Cohort retention analysis pinpointing month-over-month drop-offs.', color: '#F59E0B' }
  ];

  const filteredNodes = nodes.filter(n => activeFilter === 'all' || n.type === activeFilter);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#40F5D0] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Career Galaxy</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Visual Constellation of Roles, Skills & Projects
            </h3>
            <p className="text-xs text-[#9CA7BD] mt-1">
              Every student has a distinct trajectory. Click any celestial node to view relational connections and launch targeted modules.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-[#080B14] p-1 rounded-xl border border-white/10 text-xs">
            {(['all', 'career', 'skill', 'project'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/30'
                    : 'text-[#9CA7BD] hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All Nodes' : `${filter}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Galaxy Canvas */}
        <div className="relative w-full h-[400px] sm:h-[480px] bg-[#080B14]/90 rounded-xl my-6 border border-white/10 overflow-hidden bg-nexus-grid flex items-center justify-center">
          {/* Subtle center halo */}
          <div className="absolute w-72 h-72 rounded-full bg-[#40F5D0]/5 blur-3xl pointer-events-none" />
          <div className="absolute w-56 h-56 rounded-full bg-[#A78BFA]/5 blur-2xl pointer-events-none" />

          {/* Render Connections SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Full-stack connections */}
            <line x1="50%" y1="50%" x2="38%" y2="35%" stroke="rgba(64, 245, 208, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="62%" y2="36%" stroke="rgba(64, 245, 208, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="50%" y2="22%" stroke="rgba(64, 245, 208, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="38%" y1="35%" x2="32%" y2="20%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
            
            {/* AI connections */}
            <line x1="22%" y1="68%" x2="12%" y2="55%" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="22%" y1="68%" x2="28%" y2="84%" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="28%" y1="84%" x2="10%" y2="82%" stroke="rgba(251, 113, 133, 0.3)" strokeWidth="1" />

            {/* Data Analyst connections */}
            <line x1="78%" y1="68%" x2="88%" y2="54%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="78%" y1="68%" x2="72%" y2="84%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="72%" y1="84%" x2="90%" y2="82%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
          </svg>

          {/* Interactive Celestial Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isCareer = node.type === 'career';
            const isProject = node.type === 'project';

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-115 focus-visible:outline-none`}
                aria-label={`${node.name} (${node.type})`}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer pulse when selected */}
                  {isSelected && (
                    <div 
                      className="absolute -inset-2 rounded-full animate-ping opacity-30" 
                      style={{ backgroundColor: node.color }} 
                    />
                  )}

                  {/* Core Node Circle */}
                  <div 
                    className={`rounded-full flex items-center justify-center transition-all ${
                      isCareer 
                        ? 'w-10 h-10 border-2 shadow-lg' 
                        : isProject 
                        ? 'w-7 h-7 border shadow-md' 
                        : 'w-6 h-6 border shadow-sm'
                    }`}
                    style={{
                      backgroundColor: '#101525',
                      borderColor: node.color,
                      boxShadow: `0 0 16px ${node.color}50`
                    }}
                  >
                    <div 
                      className="rounded-full" 
                      style={{ 
                        width: isCareer ? '12px' : '8px', 
                        height: isCareer ? '12px' : '8px', 
                        backgroundColor: node.color 
                      }} 
                    />
                  </div>
                </div>

                {/* Node Label */}
                <div className="mt-1.5 whitespace-nowrap text-center">
                  <span 
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#080B14]/80 border transition-colors ${
                      isSelected 
                        ? 'text-white border-white/40 shadow-sm' 
                        : 'text-[#F5F7FF]/80 border-white/10 group-hover:text-white'
                    }`}
                  >
                    {node.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Drawer / Info Bar */}
        {selectedNode ? (
          <div className="p-4 rounded-xl bg-[#101525] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: selectedNode.color }} 
                />
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#9CA7BD]">
                  {selectedNode.type} Node
                </span>
                <span className="text-white/30">·</span>
                <h4 className="text-sm font-bold text-white">{selectedNode.name}</h4>
              </div>
              <p className="text-xs text-[#9CA7BD] max-w-2xl leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {selectedNode.type === 'career' && (
                <button
                  onClick={() => onSelectCareer(selectedNode.careerId)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#40F5D0] text-[#080B14] text-xs font-bold hover:bg-[#40F5D0]/90 transition-colors"
                >
                  View Pathway
                </button>
              )}
              {selectedNode.type === 'skill' && (
                <button
                  onClick={() => onSelectCareer(selectedNode.careerId)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#A78BFA] text-[#080B14] text-xs font-bold hover:bg-[#A78BFA]/90 transition-colors"
                >
                  Inspect in Radar
                </button>
              )}
              {selectedNode.type === 'project' && (
                <button
                  onClick={onOpenProject}
                  className="px-3.5 py-1.5 rounded-lg bg-[#38BDF8] text-[#080B14] text-xs font-bold hover:bg-[#38BDF8]/90 transition-colors"
                >
                  Open in Project Studio
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-3 text-center text-xs text-[#9CA7BD]/70">
            Click any node on the galaxy constellation to inspect skills, capstone connections, and actionable study roadmaps.
          </div>
        )}
      </div>
    </section>
  );
};
