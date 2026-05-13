import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 lg:gap-12">
          <div className="sm:col-span-2 md:col-span-2">
            <Link to="/" className="inline-block mb-8 group">
              <img 
                src="https://i.imgur.com/VtGiYUD.png" 
                alt="Vivere Construction Logo" 
                className="h-20 w-auto transition-transform duration-500 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm max-w-md leading-relaxed mb-8 font-light text-zinc-400">
              A premium design-build and general construction company based in California. 
              We transform visions into extraordinary living spaces with expertise and passion.
            </p>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-4">License #: 839135</p>
            <p className="text-sm font-medium text-white tracking-[0.2em] uppercase">Vivere Construction</p>
          </div>

          <div>
            <h3 className="text-white font-medium uppercase tracking-[0.2em] text-xs mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Our Story', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium uppercase tracking-[0.2em] text-xs mb-8 italic">Follow Us</h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium uppercase tracking-[0.2em] text-xs mb-8 italic leading-loose">SCHEDULE A FREE PROJECT ASSESSMENT</h3>
            <ul className="space-y-6 text-sm font-light">
              <li>
                <span className="block text-white mb-2 font-medium">CALL : (626) 763-1376</span>
                <a href="mailto:info@vivereconstruction.com" className="hover:text-primary transition-colors block">
                  info@vivereconstruction.com
                </a>
              </li>
              <li className="pt-4 border-t border-white/10">
                <p className="text-zinc-400">239 N. Euclid Ave.<br/>Upland, CA 91786</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/10 text-xs font-light tracking-wider flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Vivere Construction. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
