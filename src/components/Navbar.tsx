import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/story' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black border-b border-white/10 ${
        scrolled ? 'py-3 md:py-4' : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://i.imgur.com/VtGiYUD.png" 
                alt="Vivere Construction Logo" 
                className="h-8 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Desktop Nav - Hidden on Mobile */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative whitespace-nowrap text-[12px] font-bold tracking-[0.3em] uppercase transition-colors group py-1 ${
                  location.pathname === link.path ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                   location.pathname === link.path ? 'scale-x-100 opacity-50' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-30'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Section: Mobile Menu Toggle & Contact */}
          <div className="flex items-center gap-4">
            {/* Persistent Phone */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="tel:6267631376"
                className="flex items-center gap-1.5 md:gap-3 text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] transition-colors text-white hover:text-white/80 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">(626) 763-1376</span>
                <span className="sm:hidden uppercase tracking-widest text-[9px]">Enquiry</span>
              </a>
            </div>

            {/* Mobile Menu Button - NEW */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] md:hidden flex flex-col p-10 pt-32"
          >
            {/* Close Button Inside for easier access */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-12 sm:gap-14">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className="block text-5xl font-serif text-white uppercase tracking-tighter leading-none hover:text-zinc-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-auto border-t border-white/5 pt-12 space-y-4"
            >
              <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase font-bold">Inquiries & Consulting</p>
              <a href="tel:6267631376" className="text-3xl sm:text-4xl font-serif text-white tracking-tight block hover:text-zinc-400 transition-colors">
                (626) 763-1376
              </a>
              <p className="text-zinc-600 text-sm font-light italic">Available Mon — Fri: 8:00 AM — 5:00 PM</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
