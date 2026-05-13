import React, { useState } from 'react';
import { useAdminDemo } from '../../contexts/AdminDemoContext';
import { Edit2, Trash2, Plus, X, UploadCloud, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TeamManagement() {
  const { state } = useAdminDemo();
  const [activeTab, setActiveTab] = useState<'Leadership' | 'Crew'>('Leadership');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const leadership = state.teamMembers.filter(m => m.type === 'Leadership');
  const crew = state.teamMembers.filter(m => m.type === 'Crew');

  const handleEdit = (m?: any) => {
    setEditingMember(m || null);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-8 fade-in relative h-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-zinc-500 font-serif italic text-xl">04 &mdash;</span>
            <h1 className="text-4xl font-serif tracking-tight text-white">Team</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-12">Manage your leadership team and crew.</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('Leadership')}
            className={`pb-4 text-sm tracking-wide transition-colors relative ${activeTab === 'Leadership' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Leadership
            {activeTab === 'Leadership' && (
              <motion.div layoutId="team-tab" className="absolute bottom-0 left-0 right-0 h-px bg-white" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('Crew')}
            className={`pb-4 text-sm tracking-wide transition-colors relative ${activeTab === 'Crew' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Crew
            {activeTab === 'Crew' && (
              <motion.div layoutId="team-tab" className="absolute bottom-0 left-0 right-0 h-px bg-white" />
            )}
          </button>
        </div>

        <button 
          onClick={() => handleEdit()}
          className="bg-white text-black font-medium text-sm px-4 py-2 hover:bg-zinc-200 transition-colors flex items-center gap-2 mb-3"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add {activeTab} Member</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Leadership' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map(member => (
                <div key={member.id} className="group border border-white/10 bg-white/[0.02] overflow-hidden relative group">
                  <div className="aspect-[4/5] overflow-hidden bg-black relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale" />
                    
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(member)} className="p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded backdrop-blur transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-black/50 hover:bg-red-500 text-white rounded backdrop-blur transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl font-serif text-white mb-1">{member.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="border-2 border-dashed border-white/10 hover:border-white/30 bg-black/50 p-12 flex flex-col items-center justify-center text-center transition-colors rounded-xl relative overflow-hidden group">
                <Users className="w-12 h-12 text-zinc-500 mb-4" />
                <h3 className="text-lg font-serif text-white mb-2">Crew Team Photo</h3>
                <p className="text-sm text-zinc-500 max-w-md">Upload a high-quality photo of your crew. This will be featured on the Our Story page.</p>
                <div className="mt-6 flex gap-4">
                  <button className="px-5 py-2.5 bg-white/[0.05] border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">Upload New Photo</button>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold mb-4">Crew Members List</h3>
                <div className="bg-white/[0.02] border border-white/10 flex flex-col">
                  {['Mark Roberts', 'David Chen', 'Luiz Hernandez', 'Samir Patel', 'John Fitzgerald'].map((name, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 bg-black/20 hover:bg-white/5 transition-colors group ${i !== 4 ? 'border-b border-white/5' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-xs font-serif text-zinc-400 border border-white/10">
                          {name.charAt(0)}
                        </div>
                        <span className="text-sm text-zinc-300 font-medium">{name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-zinc-500 hover:text-white rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-zinc-500 hover:text-red-400 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-zinc-950 border-l border-white/10 shadow-2xl z-50 flex flex-col pt-8 sm:pt-0"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <h2 className="text-2xl font-serif text-white">{editingMember ? 'Edit Member' : `Add ${activeTab} Member`}</h2>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <div className="space-y-4">
                  <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Photo</label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-zinc-900 border border-white/10 rounded-full overflow-hidden shrink-0">
                        {editingMember ? (
                          <img src={editingMember.photo} alt={editingMember.name} className="w-full h-full object-cover grayscale" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <button className="px-4 py-2 border border-white/10 text-xs text-white hover:bg-white/5 transition-colors rounded">
                        Upload Photo
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={editingMember?.name}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Role/Title</label>
                    <input 
                      type="text" 
                      defaultValue={editingMember?.role}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Short Bio</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex items-center justify-end gap-4 shrink-0 bg-zinc-950">
                <button onClick={() => setIsPanelOpen(false)} className="px-5 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={() => setIsPanelOpen(false)} className="bg-white text-black px-6 py-2.5 text-sm font-medium hover:bg-zinc-200 transition-colors rounded-none">
                  Save Member
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
