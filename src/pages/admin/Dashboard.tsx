import React from 'react';
import { useAdminDemo } from '../../contexts/AdminDemoContext';
import { ArrowUpRight, ArrowDownRight, Plus, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sparkline = ({ data, color, positive }: { data: number[], color: string, positive: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d - min) / (max - min)) * 90}`).join(' ');
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-30">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Gradient fill */}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={positive ? '#ffffff' : '#a1a1aa'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={positive ? '#ffffff' : '#a1a1aa'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,100 ${points} 100,100`} fill={`url(#gradient-${color})`} />
        <polyline points={points} fill="none" stroke={positive ? '#ffffff' : '#a1a1aa'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default function DashboardOverview() {
  const { state } = useAdminDemo();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Projects', value: state.projects.length, trend: '+1 this month', positive: true, data: [10, 11, 12, 12, 13, 14, 15] },
    { label: 'Site Visitors (30d)', value: '1,247', trend: '+18%', positive: true, data: [40, 50, 45, 60, 80, 75, 120] },
    { label: 'Service Inquiries', value: '12', trend: '+4 this week', positive: true, data: [2, 1, 3, 5, 8, 4, 12] },
    { label: 'Pages Edited', value: '8', trend: '-2 vs last week', positive: false, data: [15, 12, 14, 10, 8, 9, 8] },
  ];

  return (
    <div className="space-y-12 fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-serif tracking-tight text-gradient">Good evening, Rida.</h1>
        <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Here is what's happening with Vivere today.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-[1.5rem] p-6 flex flex-col relative group overflow-hidden h-40">
            <Sparkline data={stat.data} color="white" positive={stat.positive} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-auto relative z-10">{stat.label}</h3>
            
            <div className="mt-auto relative z-10">
              <div className="flex items-end justify-between">
                <div className="text-4xl font-serif text-white tracking-tight">{stat.value}</div>
                <div className={`flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest pb-1 ${stat.positive ? 'text-white/80' : 'text-white/40'}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.trend}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Activity className="w-4 h-4 text-white/40" />
            <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Recent Activity</h3>
          </div>
          
          <div className="glass-card rounded-[2rem] p-8">
            <div className="space-y-8">
              {state.activityFeed.map((activity, i) => (
                <div key={activity.id} className="relative pl-8 group">
                  {i !== state.activityFeed.length - 1 && (
                    <div className="absolute left-[5px] top-6 bottom-[-32px] w-px bg-white/[0.05] group-hover:bg-white/[0.1] transition-colors" />
                  )}
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border border-white/20 bg-[#0a0a0a] shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:bg-white group-hover:border-white transition-all" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors">{activity.message}</p>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/40 font-bold shrink-0">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Plus className="w-4 h-4 text-white/40" />
            <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Quick Actions</h3>
          </div>
          
          <div className="glass-card rounded-[2rem] p-3 flex flex-col gap-2">
            {[
              { label: 'Add New Project', route: '/admin/projects' },
              { label: 'Update Services', route: '/admin/services' },
              { label: 'Edit Homepage', route: '/admin/content' },
              { label: 'View Analytics', route: '/admin/analytics' },
            ].map(action => (
              <button 
                key={action.label}
                onClick={() => navigate(action.route)}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all group"
              >
                <span className="text-sm tracking-wide text-white/60 group-hover:text-white transition-colors">{action.label}</span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </button>
            ))}
            
            <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full mix-blend-screen" />
              <h4 className="text-sm font-serif text-white mb-2 relative z-10">Need help?</h4>
              <p className="text-xs text-white/50 relative z-10">Contact your dedicated Vivere platform engineer for support.</p>
              <button className="mt-4 text-[10px] uppercase tracking-widest font-bold text-white border-b border-white/30 hover:border-white transition-colors pb-1 relative z-10">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
