import { useState, useEffect } from 'react';
import { firestoreService, InboxMessage } from '../../lib/firestoreService';
import { Mail, CheckCircle, Trash2, Phone, Calendar, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InboxManagement() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await firestoreService.getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await firestoreService.markMessageAsRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      try {
        await firestoreService.deleteMessage(id);
        setMessages(messages.filter(m => m.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 tracking-tight">Communications</h1>
          <p className="text-zinc-400 font-light text-sm md:text-base">Manage client inquiries and contact form submissions.</p>
        </div>
        
        <div className="relative group z-10">
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full pl-12 pr-6 py-4 text-white outline-none focus:border-white/30 transition-all w-full md:w-80 text-sm shadow-[0_0_20px_rgba(255,255,255,0.02)]"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex justify-center">
             <div className="w-8 h-8 border-2 border-white/5 border-t-zinc-500 rounded-full animate-spin" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-20 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
             <Mail className="w-16 h-16 text-zinc-800 mx-auto mb-6 relative z-10" />
             <p className="text-zinc-500 font-light text-lg relative z-10">Inbox is empty. No new communication found.</p>
          </div>
        ) : filteredMessages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden bg-zinc-900/50 border border-white/5 rounded-[2rem] p-6 lg:p-8 hover:border-white/20 transition-all ${
              msg.status === 'unread' ? 'border-l-4 border-l-white bg-zinc-900 border-white/10' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10">
              <div className="flex-shrink-0 flex lg:flex-col lg:items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                  msg.status === 'unread' ? 'bg-white text-black' : 'bg-black border border-white/10 text-zinc-500'
                }`}>
                  <User className="w-6 h-6" />
                </div>
                {msg.status === 'unread' && (
                  <span className="lg:mt-2 px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold text-white uppercase tracking-widest text-center shadow-lg">New</span>
                )}
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white mb-2">{msg.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                      <span className="flex items-center gap-2 text-white/80">
                        <Mail className="w-3.5 h-3.5 opacity-50" />
                        {msg.email}
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 opacity-50" />
                          {msg.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 opacity-50" />
                        {msg.createdAt.toDate().toLocaleDateString(undefined, { 
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    {msg.status === 'unread' && (
                      <button 
                        onClick={() => handleMarkAsRead(msg.id!)}
                        className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Mark Read
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(msg.id!)}
                      className="p-3 text-zinc-600 hover:text-red-400 bg-black lg:bg-transparent lg:hover:bg-red-500/10 border border-white/5 lg:border-transparent rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                  <p className="text-zinc-400 font-light leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
