import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Hammer, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));
      
      if (adminDoc.exists() || userCredential.user.email === 'admin@vivere.com') {
        if (!adminDoc.exists() && userCredential.user.email === 'admin@vivere.com') {
          // Initialize DB doc for the demo admin
          await setDoc(doc(db, 'admins', userCredential.user.uid), { role: 'master', email: userCredential.user.email });
        }
        navigate('/admin');
      } else {
        setError('Access denied: Unauthorized account.');
        await auth.signOut();
      }
    } catch (err: any) {
      if ((err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') && email === 'admin@vivere.com' && password === 'admin123') {
        // Auto-bootstrap the admin account if it doesn't exist yet
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'admins', userCredential.user.uid), { role: 'master', email });
          navigate('/admin');
          return;
        } catch (signupErr: any) {
          setError('Setup failed. Ensure Firebase Email/Password Auth is fully enabled.');
          setLoading(false);
          return;
        }
      }
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-800/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-white/5">
              <Hammer className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">Vivere Admin</h1>
            <p className="text-zinc-500 font-light text-sm">Secure access for construction management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-center">
              <p className="text-xs text-zinc-400 font-mono mb-2 uppercase tracking-widest">Demo Credentials</p>
              <p className="text-sm border-white">Email: <span className="text-white font-bold ml-1">admin@vivere.com</span></p>
              <p className="text-sm text-white mt-1">Password: <span className="text-white font-bold ml-1">admin123</span></p>
            </div>

            <div>

              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-white/20 focus:bg-black/60 transition-all pl-14"
                  required
                />
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-white/20 focus:bg-black/60 transition-all pl-14"
                  required
                />
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              className="w-full group relative flex items-center justify-center gap-4 py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
