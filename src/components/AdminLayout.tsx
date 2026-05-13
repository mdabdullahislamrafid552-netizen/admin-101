import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  Users,
  FileText,
  BarChart,
  Settings,
  Hammer,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useAdminDemo } from '../contexts/AdminDemoContext';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, logout } = useAdminDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!state.isLoggedIn) {
      navigate('/admin/login');
    }
  }, [state.isLoggedIn, navigate]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Site Content', path: '/admin/content', icon: FileText },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
  ];

  if (!state.isLoggedIn) return null;

  const SidebarContent = () => (
    <div className="h-full flex flex-col relative z-10">
      <div className="p-6">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)] relative">
            <div className="absolute inset-0 bg-white rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <Hammer className="w-4 h-4 text-black relative z-10" />
          </div>
          <span className="font-serif tracking-widest text-lg text-white group-hover:text-white/80 transition-colors">VIVERE</span>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[9px] font-bold uppercase tracking-widest text-white/30 mb-4 mt-2">Core System</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden text-sm tracking-wide ${
                isActive 
                  ? 'bg-white/10 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10 w-full">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80 transition-colors'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <motion.div layoutId="navIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
        
        <p className="px-3 text-[9px] font-bold uppercase tracking-widest text-white/30 mb-4 mt-8">Configuration</p>
        <Link
          to="/admin/settings"
          className={`flex items-center px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden text-sm tracking-wide ${
            location.pathname.startsWith('/admin/settings')
              ? 'bg-white/10 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
              : 'text-white/40 hover:bg-white/5 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3 relative z-10 w-full">
            <Settings className={`w-4 h-4 ${location.pathname.startsWith('/admin/settings') ? 'text-white' : 'text-white/40 group-hover:text-white/80 transition-colors'}`} />
            <span>Settings</span>
          </div>
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all cursor-pointer group"
        >
          <img src="https://ui-avatars.com/api/?name=Rida+Marshall&background=000000&color=ffffff" alt="Rida M." className="w-9 h-9 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform" />
          <div className="flex-grow min-w-0">
            <div className="text-xs text-white font-medium truncate group-hover:text-white/90 transition-colors">Rida Marshall</div>
            <div className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors">Logout session</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-[#f5f5f0] flex font-sans selection:bg-white selection:text-black overflow-hidden relative selection:bg-white/90">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-transparent flex-col h-screen z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col z-50 lg:hidden shadow-2xl glass-panel"
            >
              <SidebarContent />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content App Container */}
      <main className="flex-grow flex flex-col min-w-0 h-screen p-0 lg:py-4 lg:pr-4">
        
        {/* The "Inset" App Window */}
        <div className="w-full h-full bg-[#080808]/90 lg:rounded-[2rem] border-0 lg:border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative bg-noise">
          
          {/* Top Header */}
          <header className="h-16 lg:h-20 border-b border-white/[0.04] bg-transparent backdrop-blur-xl sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between transition-all">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-white/60 hover:text-white transition-colors"
                title="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                <span>Admin</span>
                <ChevronRight className="w-3 h-3 opacity-30" />
                <span className="text-white text-gradient">
                  {location.pathname === '/admin' ? 'Dashboard' : location.pathname.split('/').pop()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block w-72 group">
                <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-white/80" />
                <input 
                  type="text" 
                  placeholder="Search anything... (⌘K)" 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.04] transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.01)]"
                />
              </div>
              
              <a 
                href="/" 
                target="_blank" 
                className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
              >
                Preview Site
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>

              <div className="relative cursor-pointer hover:text-white text-white/40 transition-colors group w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.01] hover:bg-white/[0.05]">
                <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
              </div>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <div className="flex-grow overflow-y-auto custom-scrollbar p-6 lg:p-12 relative z-10 w-full shrink-0">
            <div className="max-w-6xl mx-auto pb-20 lg:pb-12">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
