import React, { useState } from 'react';
import { useAdminDemo } from '../../contexts/AdminDemoContext';
import { Plus, Edit2, Trash2, GripVertical, ChevronDown, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ServiceManagement() {
  const { state } = useAdminDemo();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-zinc-500 font-serif italic text-xl">03 &mdash;</span>
            <h1 className="text-4xl font-serif tracking-tight text-white">Services</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-12">Manage what Vivere offers.</p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="space-y-6">
        {state.serviceCategories.map(category => (
          <div key={category.id} className="border border-white/10 bg-white/[0.02]">
            <button 
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <h2 className="text-xl font-serif text-white">{category.title} <span className="text-zinc-600 text-sm font-sans ml-2">({category.services.length})</span></h2>
              {expandedCategories[category.id] ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            </button>
            
            <AnimatePresence>
              {expandedCategories[category.id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 border-t border-white/5 space-y-2">
                    {category.services.map(service => (
                      <div key={service.id} className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5 bg-black/20">
                        <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-medium text-zinc-200">{service.title}</h4>
                          <p className="text-xs text-zinc-500 truncate mt-0.5">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button onClick={() => handleEdit(service)} className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {category.services.length === 0 && (
                      <div className="text-sm text-zinc-600 italic py-4 pl-8">No sub-services yet.</div>
                    )}
                    
                    <button 
                      onClick={handleAddNew}
                      className="mt-4 ml-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add sub-service
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-white/10 shadow-2xl p-6 sm:p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif text-white">{editingService ? 'Edit Service' : 'New Service'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Service Title</label>
                  <input 
                    type="text" 
                    defaultValue={editingService?.title}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</label>
                  <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-all font-sans">
                    {state.serviceCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Short Description</label>
                  <textarea 
                    defaultValue={editingService?.description}
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans resize-none"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 mb-2 block">Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                      <button key={i} className="aspect-square border border-white/10 hover:border-white/30 bg-white/[0.02] flex items-center justify-center rounded-lg transition-colors group">
                        <ImageIcon className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={() => setIsModalOpen(false)} className="bg-white text-black px-6 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors rounded-lg">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
