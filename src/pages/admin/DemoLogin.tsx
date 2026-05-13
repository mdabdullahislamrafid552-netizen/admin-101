import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminDemo } from '../../contexts/AdminDemoContext';
import { Hammer } from 'lucide-react';
import { motion } from 'motion/react';

export default function DemoLogin() {
  const { login } = useAdminDemo();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/admin');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Cinematic animated background */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[url('https://images.unsplash.com/photo-1541888086925-0c13d7108ff4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen pointer-events-none"
      />
      
      {/* Light orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white/[0.01] rounded-full blur-[80px] pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[420px] w-full glass-panel rounded-3xl p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)] relative"
          >
            <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-40 mix-blend-screen" />
            <Hammer className="w-6 h-6 text-black relative z-10" />
          </motion.div>
          <h1 className="text-3xl font-serif text-white mb-3 tracking-tight text-gradient">Vivere System</h1>
          <p className="text-white/40 text-center text-sm">Secure access to the management platform.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1 group-focus-within:text-white/80 transition-colors">Work Email</label>
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-white/[0.2] focus:bg-white/[0.04] transition-all font-sans shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              placeholder="name@vivereconstruction.com"
              required
            />
          </div>
          <div className="space-y-2 group">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1 group-focus-within:text-white/80 transition-colors">Password</label>
              <a href="#" className="text-[10px] text-white/30 hover:text-white transition-colors">Forgot?</a>
            </div>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none focus:border-white/[0.2] focus:bg-white/[0.04] transition-all font-sans shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold tracking-wide rounded-xl px-4 py-4 mt-2 hover:bg-white/90 hover:scale-[1.02] transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {loading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
              />
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/[0.05] text-center">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            Demo Build Auth Bypassed
          </p>
        </div>
      </motion.div>
    </div>
  );
}
