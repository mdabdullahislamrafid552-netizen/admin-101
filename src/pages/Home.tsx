import { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldAlert, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Counter } from '../components/Counter';
import { Image } from '../components/Image';
import { TeamCarousel } from '../components/TeamCarousel';
import { staticProjects } from '../data/projects';

export default function HomePage() {
  const heroRef = useRef(null);
  const featuredProjects = staticProjects.slice(0, 3);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(heroScroll, [0, 1], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden max-w-full w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center overflow-hidden bg-black pt-20">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-zinc-950 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury modern home exterior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full flex-grow flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center relative mt-10 md:mt-0"
          >
            <h1 className="flex flex-col items-center justify-center relative w-full max-w-full overflow-hidden py-10">
              <span className="text-[14vw] md:text-[11vw] leading-none font-serif font-medium tracking-[0.1em] md:tracking-[0.05em] text-white m-0 p-0 block drop-shadow-lg text-center w-full">
                VIVERE
              </span>
              <span className="text-[8vw] md:text-[8vw] leading-none font-serif italic text-zinc-100/90 md:absolute md:top-[70%] md:left-1/2 md:-translate-x-1/2 tracking-[0.1em] md:tracking-[0.05em] drop-shadow-md text-center w-full mt-2 md:mt-0">
                CONSTRUCTION
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 md:left-auto md:right-12 md:bottom-12 z-20 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.a
            href="tel:6267631376"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            CALL NOW
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-black/80 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              BOOK ASSESSMENT
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Emergency / Support Message Section */}
      <section className="py-24 md:py-32 border-y border-white/10 bg-zinc-900/50 backdrop-blur-md relative z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-l border-orange-500/20 pl-4 sm:pl-8 lg:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
          >
            <div className="flex-shrink-0 mt-2">
              <div className="w-16 h-16 rounded-full border border-orange-500/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                <ShieldAlert className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">Fire Recovery Support</h3>
              <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-6">
                To those affected by the recent fire — please know that you’re not alone. At Vivere Construction, we understand the emotional and financial toll these events can take on families and property owners. We’re here to support you with honest guidance, reliable service, and a commitment to helping you rebuild stronger.
              </p>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12">
                Whether you need help assessing damage, planning your next steps, or starting the reconstruction process, our team is ready to stand with you — every step of the way. Let’s rebuild together.
              </p>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mb-4">
                  <a href="tel:6267631376" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold transition-all duration-300 text-[12px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] active:scale-95">
                    Call (626) 763-1376
                  </a>
                  <Link to="/contact" className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    DM Us Directly <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Free initial assessment · No obligation.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview - Split Editorial */}
      <section className="pt-40 pb-40 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <Reveal delay={0}>
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-[24px] h-[1px] bg-white/55" />
                  <span className="text-[#f4f4f5]/55 font-medium tracking-[0.22em] uppercase text-[11px]">
                    VIVERE CONSTRUCTION. WHERE EXPERIENCE MATTERS.
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <motion.h2 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[9vw] sm:text-4xl md:text-6xl font-serif font-medium text-white mb-6 md:mb-8 leading-tight"
                >
                  Transforming visions into <span className="italic text-zinc-500">extraordinary</span> living spaces.
                </motion.h2>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="w-[32px] h-[1px] bg-white/20 mb-6" />
                <div className="flex flex-col gap-[20px] text-[15px] text-[#f4f4f5]/72 font-light leading-[1.7] mb-10 md:mb-12">
                  <p>
                    Over two decades of experience isn't just a number, it's a testament to our unwavering commitment. We believe in the power of collaboration. Our team of passionate craftsmen, designers, and project managers work hand-in-hand with you, fostering a seamless and transparent experience.
                  </p>
                  <p>
                    From inspiration to flawless execution, our innovative design-build process ensures a stress-free journey. We navigate every detail, from the initial blueprint to the final flourish, ensuring a smooth and successful project. Peace of mind is built in. With transparent communication and meticulous project management, you can trust Vivere Construction to deliver a home that surpasses expectations.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={1.2}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                  <Link
                    to="/contact"
                    className="group relative inline-flex items-center justify-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold hover:bg-[#f4f4f5] transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="tracking-[0.3em] uppercase text-[10px] font-bold">Schedule Assessment</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-[6px]" />
                  </Link>
                  <span className="text-[13px] font-light text-[#f4f4f5] opacity-70 leading-[1.5] block">
                    Let Vivere Construction be a part of <span className="italic">your story</span>.
                  </span>
                </div>
              </Reveal>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group/photo"
            >
              <div className="rounded-sm overflow-hidden border border-white/30 relative">
                <img
                  src="https://i.imgur.com/5alUqt0.jpg"
                  alt="Vivere Construction Team"
                  className="w-full h-auto transition-all duration-[600ms] ease-in-out object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)] pointer-events-none transition-opacity duration-[600ms] group-hover/photo:opacity-0" />
              </div>

              <div className="absolute -bottom-6 right-0">
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-medium small-caps">
                  —— THE VIVERE TEAM, 2026
                </span>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute flex flex-col justify-center items-center bg-black/85 backdrop-blur-[8px] p-8 pb-7 border border-white/10 hidden md:flex" style={{ bottom: '-10%', left: '-8%' }}
              >
                <div className="text-[64px] font-serif font-light text-white leading-none tracking-tight flex items-start">
                  <Counter value={22} duration={3} />
                  <span className="text-[32px] ml-1 mt-1">+</span>
                </div>
                <div className="w-[24px] h-[1px] bg-white/20 mt-4 mb-3" />
                <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-[0.2em] text-center">
                  Years of<br />Excellence
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview - Large Cards */}
      <section className="section-padding relative z-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
            <div className="max-w-2xl">
              <Reveal>
                <span className="text-white/50 font-medium tracking-[0.3em] uppercase text-[10px] mb-6 block">
                  Our Expertise
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-white leading-[1.1]">
                  Comprehensive<br className="hidden md:block" />Construction
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link
                to="/services"
                className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
              >
                <span className="border-b border-white/20 group-hover:border-primary/50 pb-2 transition-colors">View All Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
            {[
              {
                title: 'NEW BUILD',
                desc: 'From ground-up custom builds to major structural additions, we turn visions into architectural milestones.',
                img: 'https://vivereconstruction.com/wp-content/uploads/2024/06/shutterstock_2323065829-1-1-scaled.jpg',
                metric: '12 COMPLETED'
              },
              {
                title: 'ADU',
                desc: 'Expand your property\'s utility and value with our premium Accessory Dwelling Unit solutions.',
                img: 'https://vivereconstruction.com/wp-content/uploads/2024/06/shutterstock_2465761965-scaled.jpg',
                metric: '8 COMPLETED'
              },
              {
                title: 'Renovations',
                desc: 'High-end structural remodeling and aesthetic transformations designed for the modern lifestyle.',
                img: 'https://vivereconstruction.com/wp-content/uploads/2024/06/IMG_3717_Seite_23.jpg',
                metric: '20+ COMPLETED'
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 ${index === 2 ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <Image src={service.img} alt={service.title} className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black flex-col to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border border-white/20 px-3 py-1.5 backdrop-blur-sm bg-black/20">
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.2em] text-white/90 uppercase">{service.metric}</span>
                </div>

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-2 sm:mb-4 uppercase tracking-tighter group-hover:-translate-y-1 transition-transform duration-500">{service.title}</h3>
                  <p className="text-[11px] sm:text-sm text-zinc-400 font-light mb-4 sm:mb-6 line-clamp-2 md:line-clamp-3 group-hover:-translate-y-1 transition-transform duration-500 delay-75">{service.desc}</p>
                  
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 group-hover:text-primary transition-colors text-white translate-y-full group-hover:translate-y-0 duration-500">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Learn More</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Portfolio Intro Section */}
      <section className="py-32 relative z-20 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">
                Lead the team, and review the team's portfolio.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-zinc-400 font-light text-lg max-w-2xl">
                Our legacy is built by a passionate team of experts. Encounter the visionary minds who orchestrate your extraordinary living spaces, and view the masterpieces we've brought to life.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Serial by serial / Team Slider section */}
        <div className="max-w-px md:max-w-none"></div> {/* Fix for grid overflow side-effects on parent, although not really needed */}
        <TeamCarousel variant="home" />
      </section>

      {/* Featured Projects Section */}
      <AnimatePresence mode="wait">
        {featuredProjects.length > 0 && (
          <section className="section-padding relative z-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
                <div>
                  <Reveal>
                    <span className="text-white/50 font-medium tracking-[0.3em] uppercase text-[10px] mb-6 block">
                      Case Studies
                    </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="text-white leading-[1.1]">
                      Featured Highlights
                    </h2>
                  </Reveal>
                </div>
                <Reveal delay={0.2}>
                  <Link
                    to="/projects"
                    className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                  >
                    <span className="border-b border-white/20 group-hover:border-primary/50 pb-2 transition-colors">Explore Full Portfolio</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <Link to="/projects" className="block">
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden relative mb-8 bg-zinc-900">
                        <img 
                          src={project.featuredImage} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                          <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-serif font-medium text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-500 font-light line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Process Section - Brutalist/Minimalist */}
      <section className="section-padding relative z-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <Reveal>
              <span className="text-white/50 font-medium tracking-[0.3em] uppercase text-[10px] mb-8 block">
                How We Work
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1]">
                Unveiling Your Dream Home
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                A seamless journey in 3 distinct steps, engineered for precision and excellence.
              </p>
            </Reveal>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-10">
            {[
              {
                step: '01',
                title: 'Collaborative Design',
                desc: 'Through open communication and collaboration, we delve into your vision. Our design team leverages data-driven approaches to tailor the perfect layout and functionality.',
              },
              {
                step: '02',
                title: 'Personalized Optimization',
                desc: 'We analyze past projects and client preferences to understand what works best. With this knowledge, we optimize your space for maximum functionality and happiness.',
              },
              {
                step: '03',
                title: 'Seamless Support',
                desc: 'Our dedicated project managers provide clear communication and keep you informed. We\'re here to answer your questions and ensure a smooth and enjoyable experience.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 md:p-6 lg:p-10 border border-white/10 bg-zinc-950 hover:bg-zinc-900 hover:border-white/20 transition-all duration-500 relative"
              >
                <div className="w-2 h-2 rounded-full bg-primary/40 mb-6 group-hover:bg-primary transition-colors duration-500" />
                <span className="text-7xl lg:text-8xl font-serif font-light text-zinc-800 mb-6 block group-hover:text-primary transition-colors duration-700">{item.step}</span>
                <h3 className="text-xl lg:text-2xl font-serif font-medium mb-4 text-white group-hover:-translate-y-1 transition-transform duration-500">{item.title}</h3>
                <div className="w-full h-[1px] bg-white/10 mb-5 group-hover:bg-white/20 transition-colors" />
                <p className="text-zinc-400 font-light leading-relaxed text-sm lg:text-base group-hover:-translate-y-1 transition-transform duration-500 delay-75">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white text-center relative z-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('https://vivereconstruction.com/wp-content/uploads/2025/05/altadena-ca-thumb.jpg')] bg-cover bg-center bg-no-repeat opacity-40 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-medium mb-8 leading-none drop-shadow-xl text-white">Let's Rebuild<br className="hidden md:block" /> Together</h2>
            <p className="text-xl md:text-2xl text-zinc-200 mb-16 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Let Vivere Construction be a part of your story. Schedule your complimentary project assessment today.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold hover:bg-[#f4f4f5] transition-all duration-700 shadow-2xl active:scale-[0.98]"
            >
              <span className="tracking-[0.3em] uppercase text-[10px] font-bold">Schedule Assessment</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-[6px]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
