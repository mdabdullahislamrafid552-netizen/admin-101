import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from './Image';

const TEAM_MEMBERS = [
  {
    name: 'Sal Amin',
    role: 'Chief Executive Officer',
    experience: '20+ Years Experience',
    desc: 'Sal Amin leads Vivere Construction with integrity and vision. He believes in building not just structures, but long-lasting homes with quality, care, and excellence. His leadership focuses on collaboration, passion, and delivering exceptional project results.',
    img: 'https://i.imgur.com/uqpSCZz.png'
  },
  {
    name: 'Charmaine Carter',
    role: 'Chief Project Officer',
    experience: '20+ Years Experience',
    desc: 'Charmaine Carter is a key part of Vivere Construction operations. She manages project timelines, labor coordination, and client communication. Known for her attention to detail and strong organizational skills, she ensures every project is delivered smoothly and professionally.',
    img: 'https://i.imgur.com/RgbVADR.jpg'
  },
  {
    name: 'Ken Kohistani',
    role: 'Licensed General Contractor',
    experience: '25+ Years Experience',
    desc: 'Ken Kohistani specializes in construction, renovation, and rebuilding projects. With strong hands-on expertise and leadership, he ensures every project meets the highest quality standards. His craftsmanship and dedication bring client visions into reality.',
    img: 'https://i.imgur.com/XvatrWu.png'
  },
  {
    name: 'Lida Touma',
    role: 'Chief Financial Officer',
    experience: '15+ Years Experience',
    desc: 'Lida Touma is the Chief Financial Officer of Vivere Construction, overseeing all accounting and financial operations within the company. With a background in real estate and mortgage finance, she brings extensive experience in financial planning, budgeting, and strategic growth. Her expertise helps ensure efficient operations, strong financial management, and long-term success for both the company and its clients.',
    img: 'https://i.imgur.com/7gMPFSR.jpg'
  }
];

export function TeamCarousel({
  variant = 'home'
} : {
  variant?: 'home' | 'story'
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events to update active index
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Width of one item is slightly less than container width on mobile
    const itemWidth = container.clientWidth * 0.85; 
    const scrollLeft = container.scrollLeft;
    
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeIndex) {
      setActiveIndex(Math.min(Math.max(index, 0), TEAM_MEMBERS.length - 1));
    }
  };

  const scrollTo = (index: number) => {
    setUserInteracted(true);
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const itemWidth = container.clientWidth * 0.85;
    
    container.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // First-load hint animation
  useEffect(() => {
    if (!isMobile) return;
    
    const hasAnimated = sessionStorage.getItem('teamCarouselAnimated');
    if (hasAnimated) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        sessionStorage.setItem('teamCarouselAnimated', 'true');
        
        setTimeout(() => {
          if (!scrollContainerRef.current || userInteracted) return;
          const container = scrollContainerRef.current;
          
          container.scrollTo({ left: 30, behavior: 'smooth' });
          
          setTimeout(() => {
            if (!userInteracted && scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }
          }, 600 + 300); // 600ms scroll out + 300ms hold
        }, 800);
        
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    
    return () => observer.disconnect();
  }, [isMobile, userInteracted]);

  // Auto advance
  useEffect(() => {
    if (!isMobile || userInteracted) return;
    
    const intervalId = setInterval(() => {
      if (!userInteracted && scrollContainerRef.current) {
        const nextIndex = (activeIndex + 1) % TEAM_MEMBERS.length;
        scrollTo(nextIndex);
        // Reset user interacted after auto-scroll because scrollTo sets it to true
        setUserInteracted(false); 
      }
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [isMobile, userInteracted, activeIndex]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Mobile Header elements */}
      {isMobile && (
        <div className="absolute -top-12 right-4 sm:right-6 lg:right-8 z-10 block md:hidden">
          <div className="text-[11px] font-bold tracking-[0.2em] font-mono text-zinc-500 uppercase">
            {String(activeIndex + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}
          </div>
        </div>
      )}

      {/* Main container */}
      <div 
        className={`flex overflow-x-auto snap-x snap-mandatory 
          md:grid md:grid-cols-2 lg:grid-cols-4 
          gap-4 md:gap-10 
          pb-4 md:pb-16 pt-8 px-4 sm:px-6 lg:px-8 
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          ${isMobile ? "scroll-smooth touch-pan-x" : ""}
        `}
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={() => setUserInteracted(true)}
      >
        {TEAM_MEMBERS.map((member, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`
                flex-shrink-0 snap-center group flex flex-col pt-4
                w-[85%] md:w-auto
                ${isMobile ? "transition-opacity duration-500" : ""}
                ${isMobile && !isActive ? "opacity-30" : "opacity-100"}
              `}
              style={isMobile && i === TEAM_MEMBERS.length - 1 ? { paddingRight: '15%' } : {}}
            >
              <div className="w-full h-[1px] bg-white/10 mb-8 transition-colors duration-700 group-hover:bg-white/30" />
              
              <div className="mb-6 flex flex-col items-start gap-1 px-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{member.role}</span>
                <h3 className="text-3xl font-serif text-white/90 font-light tracking-tight">{member.name}</h3>
              </div>

              <div className="w-full aspect-[3/4] relative overflow-hidden mb-8 border border-white/5 bg-zinc-900">
                <Image 
                  src={member.img}
                  alt={member.name}
                  className="transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-700 z-10 group-hover:bg-transparent pointer-events-none" />
              </div>
              
              <div className="flex flex-col flex-grow text-left px-1">
                <p className="text-zinc-400 font-light text-sm leading-[1.8] group-hover:text-zinc-300 transition-colors duration-500 mb-8 text-pretty pr-4">
                  {member.desc}
                </p>
                
                <div className="mt-auto">
                  <Link
                    to="/contact"
                    className="group/btn inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-500"
                  >
                    <span className="relative">
                      Connect
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/30 transition-all duration-500 group-hover/btn:w-full" />
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-white/30 transition-colors duration-500">
                      <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      {isMobile && (
        <div className="flex justify-center items-center gap-2 mt-8 md:hidden pb-12">
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? 'w-6 h-1 bg-white/80' 
                  : 'w-1 h-1 bg-white/30'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
