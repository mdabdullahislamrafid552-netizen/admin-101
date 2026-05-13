import React, { useState } from 'react';
import { useAdminDemo, Project } from '../../contexts/AdminDemoContext';
import { Edit2, Eye, Trash2, Plus, X, UploadCloud, MapPin, CheckCircle, Clock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectManagement() {
  const { state, deleteProject, addProject } = useAdminDemo();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', location: '', category: 'Fire Rebuild', status: 'In Progress', imageCount: 0,
    featuredImage: 'https://images.unsplash.com/photo-1541888086925-0c13d7108ff4?w=200&h=200&fit=crop'
  });

  const handleOpenPanel = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({
        title: '', location: '', category: 'Fire Rebuild', status: 'In Progress', imageCount: 0,
        featuredImage: 'https://images.unsplash.com/photo-1541888086925-0c13d7108ff4?w=200&h=200&fit=crop'
      });
    }
    setIsPanelOpen(true);
  };

  const handleSave = () => {
    if (!editingId) {
      addProject({
        id: Date.now().toString(),
        title: formData.title || 'Untitled Project',
        location: formData.location || 'Unknown',
        category: formData.category || 'Fire Rebuild',
        status: (formData.status as any) || 'In Progress',
        imageCount: 1, 
        updatedAt: 'Just now',
        featuredImage: formData.featuredImage!
      });
    }
    setIsPanelOpen(false);
  };

  return (
    <div className="space-y-8 fade-in h-full flex flex-col relative w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-gradient">Projects</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-white/40 font-bold ml-12">Manage your rebuild portfolio.</p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="hidden sm:flex items-center bg-white/[0.02] border border-white/[0.05] rounded-full p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Filter..." className="bg-transparent pl-8 pr-4 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none w-32 focus:w-48 transition-all" />
            </div>
          </div>
          <button 
            onClick={() => handleOpenPanel()}
            className="bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-white/[0.08] to-transparent" />

      {/* Projects Grid/List */}
      <div className="space-y-3">
        {state.projects.map((project, i) => (
          <div key={project.id} className="group glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-6 relative overflow-hidden">
            {/* Hover reveal glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
            </div>
            
            <div className="flex-grow min-w-0 flex flex-col justify-center">
              <h3 className="text-xl font-serif text-white truncate mb-2">{project.title}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-white/60 flex items-center gap-1.5 text-xs tracking-wide"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
                <span className="text-white/20">&bull;</span>
                <span className="uppercase tracking-widest text-[9px] font-bold text-white/40">{project.category}</span>
                <span className="text-white/20">&bull;</span>
                <span className="text-white/40 text-xs">{project.imageCount} images</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 mt-4 sm:mt-0 relative z-10">
              <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                project.status === 'In Progress' ? 'border-white/10 text-white/60 bg-white/5' :
                project.status === 'Completed' ? 'border-[#f5f5f0]/30 text-[#f5f5f0] bg-[#f5f5f0]/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' :
                'border-white/5 text-white/30 bg-transparent'
              }`}>
                {project.status === 'In Progress' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                {project.status}
              </div>

              <div className="flex items-center gap-1">
                <button onClick={() => handleOpenPanel(project)} className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm(`Delete ${project.title}?`)) deleteProject(project.id);
                  }}
                  className="p-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {state.projects.length === 0 && (
          <div className="text-center py-24 text-white/40 font-serif glass-card rounded-3xl">
            No projects found. Add your first project to get started.
          </div>
        )}
      </div>

      {/* Slide-in Edit Panel - High End Redesign */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-[#020202]/80 backdrop-blur-xl z-[60]"
            />
            <motion.div 
              initial={{ x: '100%', filter: 'blur(10px)' }} 
              animate={{ x: 0, filter: 'blur(0px)' }} 
              exit={{ x: '100%', filter: 'blur(10px)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[680px] bg-[#050505]/95 backdrop-blur-3xl border-l border-white/[0.08] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-[70] flex flex-col pt-8 sm:pt-0"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.05] shrink-0">
                <h2 className="text-2xl font-serif text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setIsPanelOpen(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
                
                <div className="flex gap-8 items-start">
                  <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-2xl">
                    <img src={formData.featuredImage} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Project Title</label>
                      <input 
                        type="text" 
                        value={formData.title} 
                        onChange={e => setFormData(s => ({ ...s, title: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-serif text-white placeholder-white/20 outline-none focus:border-white/40 transition-colors"
                        placeholder="e.g. Crosby Residence"
                      />
                    </div>
                    <div className="space-y-1.5 pt-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Location</label>
                      <input 
                        type="text" 
                        value={formData.location} 
                        onChange={e => setFormData(s => ({ ...s, location: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-white placeholder-white/20 outline-none focus:border-white/40 transition-colors font-sans tracking-wide"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Status</label>
                    <div className="relative">
                      <select 
                        value={formData.status} 
                        onChange={e => setFormData(s => ({ ...s, status: e.target.value as any }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-white/[0.2] focus:bg-white/[0.04] transition-all font-sans appearance-none"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="w-2 h-2 border-r border-b border-white/40 transform rotate-45" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Category</label>
                    <div className="relative">
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData(s => ({ ...s, category: e.target.value as any }))}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-white/[0.2] focus:bg-white/[0.04] transition-all font-sans appearance-none"
                      >
                        <option value="Fire Rebuild">Fire Rebuild</option>
                        <option value="New Build">New Build</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <div className="w-2 h-2 border-r border-b border-white/40 transform rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Project Gallery</label>
                    <span className="text-xs text-white/30">{formData.imageCount} images</span>
                  </div>
                  <div className="border-2 border-dashed border-white/[0.05] hover:border-white/[0.15] bg-white/[0.01] p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer rounded-2xl group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-5 h-5 text-white/50 group-hover:text-white" />
                    </div>
                    <p className="text-sm text-white/80 font-medium tracking-wide mb-1">Upload Architectural Photos</p>
                    <p className="text-xs text-white/30">Drag files here or click to browse</p>
                  </div>
                </div>
                
              </div>

              <div className="p-6 border-t border-white/[0.05] flex items-center justify-end gap-3 shrink-0 bg-transparent backdrop-blur-md">
                <button onClick={() => setIsPanelOpen(false)} className="px-6 py-3 text-sm text-white/50 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-white text-black px-8 py-3 text-sm font-semibold rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
