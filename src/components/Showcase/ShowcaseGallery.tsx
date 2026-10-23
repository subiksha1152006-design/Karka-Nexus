import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  X, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  Sparkles 
} from 'lucide-react';
import { StudentShowcaseProject } from '../../types';
import { StorageService } from '../../services/storage';

export const ShowcaseGallery: React.FC = () => {
  const [projects, setProjects] = useState<StudentShowcaseProject[]>(() => {
    return StorageService.getShowcaseProjects();
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<StudentShowcaseProject | null>(null);

  // Add / Edit Project Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<StudentShowcaseProject>>({
    title: '',
    category: 'Web Development',
    problemStatement: '',
    summary: '',
    technologies: ['React', 'TypeScript', 'Node.js'],
    projectStage: 'MVP',
    teamMembers: 'Solo Builder',
    architectureHighlight: '',
    githubUrl: 'https://github.com/my-profile/my-project',
    demoUrl: 'https://my-project.vercel.app'
  });

  const categories = [
    'All',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
    'Data Analytics',
    'Agriculture Technology',
    'Social Impact',
    'Accessibility Technology'
  ];

  const handleOpenAddModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      category: 'Web Development',
      problemStatement: '',
      summary: '',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      projectStage: 'MVP',
      teamMembers: 'Solo Student Builder',
      architectureHighlight: '',
      githubUrl: 'https://github.com/example/student-project',
      demoUrl: 'https://example-demo.app'
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (project: StudentShowcaseProject) => {
    setEditingProjectId(project.id);
    setFormData(project);
    setModalOpen(true);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this project entry from your local prototype showcase?')) {
      StorageService.deleteShowcaseProject(id);
      setProjects(StorageService.getShowcaseProjects());
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.problemStatement) return;

    const projectToSave: StudentShowcaseProject = {
      id: editingProjectId || `user_proj_${Date.now()}`,
      title: formData.title,
      category: (formData.category as any) || 'Web Development',
      problemStatement: formData.problemStatement,
      summary: formData.summary || formData.problemStatement,
      technologies: Array.isArray(formData.technologies) 
        ? formData.technologies 
        : (formData.technologies as any).split(',').map((t: string) => t.trim()),
      projectStage: (formData.projectStage as any) || 'MVP',
      teamMembers: formData.teamMembers || 'Student Team',
      architectureHighlight: formData.architectureHighlight || 'Modular client-server separation with persistent storage.',
      githubUrl: formData.githubUrl,
      demoUrl: formData.demoUrl,
      isUserAdded: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    StorageService.saveShowcaseProject(projectToSave);
    setProjects(StorageService.getShowcaseProjects());
    StorageService.addXP(50); // Award XP for publishing project
    setModalOpen(false);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#40F5D0] mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Capstone Portfolio Gallery</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Student Project Showcase
          </h2>
          <p className="text-sm text-[#9CA7BD] mt-1 max-w-2xl">
            Explore demonstration capstones solving tangible problems across agriculture, civic impact, and artificial intelligence. Submit and manage your personal project entries.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#40F5D0] text-[#080B14] hover:bg-[#40F5D0]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(64,245,208,0.25)] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit My Project (+50 XP)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#9CA7BD] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or tech..."
              className="w-full bg-[#080B14] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:border-[#40F5D0]"
            />
          </div>

          <span className="text-xs font-mono text-[#9CA7BD]">
            Showing {filteredProjects.length} of {projects.length} Projects
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedCategory === cat
                  ? 'bg-[#40F5D0]/20 text-[#40F5D0] border border-[#40F5D0]/40'
                  : 'bg-[#101525] border border-white/5 text-[#9CA7BD] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#40F5D0]/40 transition-all flex flex-col justify-between group cursor-pointer shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#A78BFA] font-semibold tracking-wider line-clamp-1">
                  {proj.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10">
                  {proj.projectStage}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-[#40F5D0] transition-colors line-clamp-1">
                {proj.title}
              </h4>

              <p className="text-xs text-[#9CA7BD] line-clamp-2 leading-relaxed">
                {proj.problemStatement}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#080B14] text-white/80 border border-white/10">
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#080B14] text-[#9CA7BD]">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#9CA7BD]">
              <span className="text-[11px] text-[#40F5D0] font-medium group-hover:underline">
                Inspect Blueprint →
              </span>

              {proj.isUserAdded && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(proj);
                    }}
                    className="p-1 text-[#9CA7BD] hover:text-white"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className="p-1 text-red-400 hover:text-red-300"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel-glow w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 space-y-6 border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 text-[#9CA7BD] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-8">
              <span className="text-xs font-mono uppercase text-[#40F5D0] font-semibold">
                {selectedProject.category} · {selectedProject.projectStage}
              </span>
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              {selectedProject.teamMembers && (
                <p className="text-xs text-[#9CA7BD]">{selectedProject.teamMembers}</p>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-red-400 block mb-1">
                  Problem Addressed
                </span>
                <p className="text-xs text-[#F5F7FF] leading-relaxed">
                  {selectedProject.problemStatement}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] block mb-1">
                  Summary & Solution
                </span>
                <p className="text-xs text-[#9CA7BD] leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#A78BFA] block mb-1">
                  Architecture & Engineering Highlight
                </span>
                <p className="text-xs text-white/90 font-mono bg-[#080B14] p-3 rounded-xl border border-white/10 leading-relaxed">
                  {selectedProject.architectureHighlight}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#9CA7BD] block mb-1.5 uppercase">
                  Technologies Utilized:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-[#40F5D0]/10 text-[#40F5D0] border border-[#40F5D0]/30 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#40F5D0]/10 hover:bg-[#40F5D0]/20 text-[#40F5D0] text-xs border border-[#40F5D0]/30"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo Portal</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveProject}
            className="glass-panel-glow w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 space-y-4 border border-white/20 relative shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingProjectId ? 'Edit Project Entry' : 'Publish Student Project to Showcase'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#9CA7BD] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#9CA7BD] font-medium">Project Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AgriSense: Soil Telemetry & Blight Detector"
                className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[#9CA7BD] font-medium">Domain Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c} className="bg-[#080B14]">{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#9CA7BD] font-medium">Project Stage</label>
                <select
                  value={formData.projectStage}
                  onChange={(e) => setFormData({ ...formData, projectStage: e.target.value as any })}
                  className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
                >
                  <option value="Prototype">Prototype</option>
                  <option value="MVP">MVP</option>
                  <option value="Production Ready">Production Ready</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#9CA7BD] font-medium">Problem Statement</label>
              <textarea
                rows={3}
                required
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                placeholder="What tangible real-world problem does this project solve?"
                className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#9CA7BD] font-medium">Architecture Highlight</label>
              <input
                type="text"
                value={formData.architectureHighlight}
                onChange={(e) => setFormData({ ...formData, architectureHighlight: e.target.value })}
                placeholder="e.g. Asynchronous FastAPI microservice with Web Worker audio parser"
                className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[#9CA7BD] font-medium">GitHub Repository URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#9CA7BD] font-medium">Demo / Presentation URL</label>
                <input
                  type="text"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://my-demo.com"
                  className="w-full bg-[#080B14] border border-white/10 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/5 text-[#9CA7BD] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#40F5D0] text-[#080B14] font-bold hover:bg-[#40F5D0]/90 transition-colors"
              >
                {editingProjectId ? 'Save Changes' : 'Publish Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Demonstration Ethics Notice */}
      <div className="p-4 rounded-xl bg-[#080B14] border border-white/10 text-xs text-[#9CA7BD] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#40F5D0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Ethical Showcase Transparency:</strong> Initial featured entries are structured educational demonstrations inspired by student capstone methodologies. User submissions are stored in local browser state for prototype demonstration.
        </p>
      </div>
    </div>
  );
};
