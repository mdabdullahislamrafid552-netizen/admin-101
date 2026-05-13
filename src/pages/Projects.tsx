import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Image } from '../components/Image';
import { staticProjects, StaticProject } from '../data/projects';

function ProjectDetailOverlay({ project, onClose }: { project: StaticProject; onClose: () => void }) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black text-white min-h-screen w-full flex flex-col relative"
      >
      {/* Film grain for the gallery page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] fixed" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")', backgroundSize: '256px' }} />

      {/* Sticky Header Back Navigation */}
      <div className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </button>
        <span className="text-[10px] md:text-xs font-serif italic text-zinc-500">
          {String(staticProjects.findIndex(p => p.id === project.id) + 1).padStart(2, '0')}
        </span>
      </div>

        {/* Hero Featured Image */}
        <div className="w-full h-[60vh] md:h-[80vh] relative bg-zinc-950 z-10">
          <Image src={project.featuredImage} alt={project.title} className="opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent gap-0" />
          
          <div className="absolute bottom-0 w-full p-6 md:p-16 max-w-7xl mx-auto">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
                   {project.category}
                 </span>
                 <div className="hidden sm:block h-[1px] w-12 bg-white/20" />
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                   {project.location}
                 </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white tracking-tight leading-none relative">
                {/* Large Editorial Number behind the title */}
                <span className="absolute -top-12 md:-top-20 -left-6 md:-left-12 text-[6rem] md:text-[10rem] font-serif font-light text-white/5 pointer-events-none select-none z-[-1]">
                  {String(staticProjects.findIndex(p => p.id === project.id) + 1).padStart(2, '0')}
                </span>
                {project.title}
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10">
          
          {/* Long Description */}
          <div className="max-w-3xl mb-24">
            <Reveal>
             <p className="text-xl md:text-3xl font-light leading-relaxed text-zinc-300 text-pretty">
               {project.description}
             </p>
            </Reveal>
          </div>

          {/* Masonry Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {project.images.map((img: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col group ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                 <div 
                   className="w-full aspect-[4/3] sm:aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden mb-6 bg-zinc-900 border border-white/5 cursor-zoom-in relative rounded-sm"
                   onClick={() => setLightboxImage(img)}
                 >
                   <Image 
                      src={img} 
                      alt={`View ${idx + 1}`} 
                      className="transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" 
                      loading="lazy" 
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg" />
                   </div>
                 </div>
                 <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed px-2 text-pretty">
                   <span className="font-mono text-xs text-zinc-600 mr-3">{String(idx + 1).padStart(2, '0')}.</span>
                   {project.captions?.[idx]}
                 </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" 
            onClick={() => setLightboxImage(null)}
          >
             <button 
               className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-4" 
               onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
             >
               <X className="w-8 h-8" />
             </button>
             <Image 
                src={lightboxImage} 
                alt="Fullscreen" 
                wrapperClassName="max-h-screen"
                className="max-h-[90vh] object-contain"
             />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<StaticProject | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white/30 relative overflow-hidden max-w-full w-full" ref={containerRef}>
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectDetailOverlay 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* 100k Mega Hero */}
            <section className="relative h-[90vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Vivere Architecture" 
            className="opacity-20 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/50 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">
              ARCHIVES & PORTFOLIO
            </span>
            <h1 className="mb-8 uppercase tracking-tighter leading-[0.85]">
              Selected<br />Works
            </h1>
          </motion.div>
          <Reveal delay={0.4}>
            <p className="text-lg md:text-2xl text-zinc-400 max-w-4xl mx-auto font-light leading-relaxed mt-4 md:mt-8 px-4 text-pretty w-full text-center">
              A growing portfolio of fire rebuilds across Altadena — restoring homes, families, and a community one project at a time.
            </p>
          </Reveal>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[10px] tracking-widest text-zinc-500 uppercase font-medium hidden sm:flex"
        >
          <span className="animate-pulse">View Gallery</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* Main Grid Without Sidebar */}
      <section className="section-padding relative z-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-48"
            >
              <AnimatePresence mode="popLayout">
                {staticProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`group cursor-pointer flex flex-col relative ${index % 2 !== 0 ? 'md:mt-48' : ''}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Mobile Label */}
                    <div className="block lg:hidden mb-3 text-[11px] font-bold tracking-[0.4em] uppercase text-zinc-500">
                      {project.category} — 2026
                    </div>
                    {/* Vertical Label (Desktop) */}
                    <div className="hidden lg:block absolute -left-12 top-1/4 -translate-x-full rotate-180 [writing-mode:vertical-rl] text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-600/50">
                      {project.category} — 2026
                    </div>
                    {/* Editorial Number */}
                    <div className="hidden md:block absolute -left-8 -top-8 text-[8rem] font-serif font-light text-white/5 leading-none z-0 pointer-events-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950 mb-10 rounded-sm shrink-0 z-10 w-full">
                      <Image
                        src={project.featuredImage}
                        alt={project.title}
                        className="transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                           <div className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full uppercase text-[10px] font-bold tracking-widest hover:scale-105 hover:bg-zinc-100 transition-all shadow-2xl">
                             View Gallery <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Editorial Typography Below Image */}
                    <div className="flex flex-col relative z-20">
                       <div className="flex items-center gap-4 mb-5">
                         <span className="text-[10px] font-bold md:hidden uppercase tracking-[0.3em] text-zinc-600 mr-2">
                           {String(index + 1).padStart(2, '0')}.
                         </span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">
                           {project.category}
                         </span>
                         <div className="h-[1px] flex-grow bg-white/10" />
                         {project.location && (
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-right whitespace-nowrap">
                             {project.location}
                           </span>
                         )}
                       </div>
                       <h3 className="text-4xl md:text-[3.5rem] font-serif text-white group-hover:text-zinc-200 transition-colors duration-500 leading-[1.1] mb-6 tracking-tight text-balance">
                         {project.title}
                       </h3>
                       <p className="text-zinc-400 font-light text-base leading-relaxed text-pretty opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-700 delay-100">
                         {project.shortDescription}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="py-40 relative bg-zinc-950 border-t border-white/5 overflow-hidden mt-20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <Reveal>
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Ready to Begin?</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[12vw] sm:text-[6rem] lg:text-[8rem] font-serif font-medium text-white mb-10 md:mb-16 leading-[0.9] tracking-tighter hover:text-zinc-300 transition-colors cursor-default">
              BUILD WITH US.
            </h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold hover:bg-[#f4f4f5] transition-all duration-700 shadow-2xl active:scale-[0.98]"
            >
              <span className="tracking-[0.3em] uppercase text-[10px] font-bold">Start Your Project</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-[6px]" />
            </Link>
          </motion.div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
