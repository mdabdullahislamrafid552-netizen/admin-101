import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

export default function AnalyticsManagement() {
  const [dateRange, setDateRange] = useState('30d');

  const metrics = [
    { label: 'Total Visitors', value: '1,247', trend: '+18%', positive: true },
    { label: 'Page Views', value: '4,892', trend: '+22%', positive: true },
    { label: 'Avg. Session', value: '2:34', trend: '+8%', positive: true },
    { label: 'Bounce Rate', value: '38%', trend: '-5%', positive: false },
  ];

  const visitorsData = [
    { name: '1', visitors: 120 }, { name: '5', visitors: 132 }, { name: '10', visitors: 101 },
    { name: '15', visitors: 140 }, { name: '20', visitors: 190 }, { name: '25', visitors: 220 },
    { name: '30', visitors: 250 },
  ];

  const pagesData = [
    { name: 'Projects', views: 1842 },
    { name: 'Home', views: 1420 },
    { name: 'Our Story', views: 890 },
    { name: 'Services', views: 540 },
    { name: 'Contact', views: 200 },
  ];

  const sourcesData = [
    { name: 'Direct', value: 400 },
    { name: 'Google', value: 500 },
    { name: 'Social', value: 200 },
    { name: 'Referral', value: 147 },
  ];
  const COLORS = ['#f5f5f0', '#a1a1aa', '#52525b', '#27272a'];

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-zinc-500 font-serif italic text-xl">06 &mdash;</span>
            <h1 className="text-4xl font-serif tracking-tight text-white">Analytics</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-12">See how visitors are interacting with your site.</p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-lg p-1">
          {['7d', '30d', '90d', 'Custom'].map(range => (
            <button 
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateRange === range ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              {range === 'Custom' ? <Calendar className="w-4 h-4" /> : `Last ${range}`}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((stat, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/10 p-6 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{stat.label}</h3>
            <div className="text-4xl font-serif text-white mb-4">{stat.value}</div>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${stat.positive ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5 text-green-400" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span className={stat.positive ? 'text-zinc-300' : 'text-zinc-500'}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white/[0.02] border border-white/10 p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Visitors Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorsData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', color: '#f5f5f0', fontSize: '12px' }}
                  itemStyle={{ color: '#f5f5f0' }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#f5f5f0" strokeWidth={2} dot={{ r: 4, fill: '#0a0a0a', stroke: '#f5f5f0', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/[0.02] border border-white/10 p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Top Pages</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pagesData} layout="vertical" margin={{ top: 5, right: 0, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', color: '#f5f5f0', fontSize: '12px' }}
                />
                <Bar dataKey="views" fill="#f5f5f0" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/[0.02] border border-white/10 p-6 flex flex-col items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6 self-start">Traffic Sources</h3>
          <div className="h-[250px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#27272a', color: '#f5f5f0', fontSize: '12px' }}
                  itemStyle={{ color: '#f5f5f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {sourcesData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs text-zinc-400">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white/[0.02] border border-white/10 p-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">Top Locations</h3>
          <div className="space-y-4">
            {[
              { city: 'Altadena, CA', users: 482, bar: '100%' },
              { city: 'Pasadena, CA', users: 310, bar: '64%' },
              { city: 'Los Angeles, CA', users: 185, bar: '38%' },
              { city: 'San Marino, CA', users: 94, bar: '19%' },
              { city: 'La Cañada Flintridge, CA', users: 76, bar: '15%' },
            ].map((loc, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end text-sm">
                  <span className="text-zinc-300">{loc.city}</span>
                  <span className="text-zinc-500">{loc.users}</span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-zinc-400 rounded-full" style={{ width: loc.bar }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-white/10">
        <p className="text-xs text-zinc-600 font-medium">Real Google Analytics will be integrated when deployed to production.</p>
      </div>
    </div>
  );
}
