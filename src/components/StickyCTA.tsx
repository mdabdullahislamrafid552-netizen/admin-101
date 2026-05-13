import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-auto sm:right-12 z-40 flex flex-row sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4 bg-black/90 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-t border-white/10 sm:border-transparent p-4 sm:p-0 pointer-events-auto sm:pointer-events-none shadow-[0_-10px_30px_rgba(0,0,0,0.8)] sm:shadow-none">
      <a
        href="tel:6267631376"
        className="flex-1 sm:flex-none pointer-events-auto w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white text-zinc-950 px-4 sm:px-8 py-4 sm:py-4 rounded-sm sm:rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-xl hover:bg-zinc-200 active:scale-95"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call Now</span>
      </a>
      <Link
        to="/contact"
        className="flex-1 sm:flex-none pointer-events-auto w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-zinc-900 sm:bg-black/80 sm:backdrop-blur-md border border-white/10 sm:border-white/20 text-white px-4 sm:px-8 py-4 sm:py-4 rounded-sm sm:rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-zinc-800 hover:border-white/30 shadow-xl active:scale-95"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Assessment</span>
      </Link>
    </div>
  );
}
