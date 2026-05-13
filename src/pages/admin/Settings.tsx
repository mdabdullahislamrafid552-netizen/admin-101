import React, { useState } from 'react';
import { useAdminDemo } from '../../contexts/AdminDemoContext';
import { Save, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SettingsManagement() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 fade-in max-w-4xl relative pb-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#f5f5f0] text-[#0a0a0a] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Settings updated successfully
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-zinc-500 font-serif italic text-xl">07 &mdash;</span>
            <h1 className="text-4xl font-serif tracking-tight text-white">Settings</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-12">Manage your account and site preferences.</p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <form onSubmit={handleSave} className="space-y-12">
        {/* Profile */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Profile Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
              <input type="text" defaultValue="Rida Marshall" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 transition-all outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
              <input type="email" defaultValue="rida@vivereconstruction.com" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 transition-all outline-none" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">New Password (leave blank to keep current)</label>
              <input type="password" placeholder="••••••••" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 transition-all outline-none" />
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-white/5" />

        {/* Site Settings */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Site Settings</h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Site Title</label>
              <input type="text" defaultValue="Vivere Construction" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 transition-all outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Site Tagline</label>
              <input type="text" defaultValue="Premium Design & Build" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-white/30 transition-all outline-none" />
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="w-16 h-16 bg-white flex items-center justify-center text-black font-serif text-2xl">
                V
              </div>
              <button type="button" className="px-4 py-2 border border-white/10 text-xs text-white hover:bg-white/5 rounded transition-colors">
                Upload New Favicon
              </button>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-white/5" />

        {/* Danger Zone */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </h2>
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-medium mb-1">Delete Site Content</h3>
              <p className="text-sm text-zinc-400">Permanently delete all projects, services, and team data. This cannot be undone.</p>
            </div>
            <button type="button" className="shrink-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Delete Everything
            </button>
          </div>
        </section>

        <div className="pt-6">
          <button type="submit" className="bg-white text-black px-8 py-3 font-medium hover:bg-zinc-200 transition-colors rounded-lg flex items-center gap-2">
            <Save className="w-5 h-5" />
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
