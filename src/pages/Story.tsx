import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Award, Stamp, Compass, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Counter } from '../components/Counter';
import { Image } from '../components/Image';
import { TeamCarousel } from '../components/TeamCarousel';
import { useRef, useState, useEffect } from 'react';

export default function StoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen selection:bg-primary/30 overflow-hidden max-w-full w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 sm:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:max-w-3xl"
            >
              <span className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-12 block flex items-center gap-4">
                <span className="w-12 h-[1px] bg-white/10"></span>
                Company Overview
              </span>
              <h1 className="mb-0 uppercase tracking-tighter leading-[0.85]">
                Building Trust.<br/>
                <span className="italic font-light text-zinc-600 lowercase">since 2002.</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:max-w-md pb-6 sm:pb-12"
            >
              <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed">
                For generations, we've combined expertise with unyielding integrity, turning visions into architectural milestones.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className="pt-32 pb-32 md:pt-40 md:pb-40 relative overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">
            
            {/* Left/Top: Text Column */}
            <div className="w-full lg:w-[45%] max-w-[480px]">
              <Reveal delay={0}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-[24px] h-[1px] bg-white/30" />
                  <span className="text-[#f4f4f5]/55 font-medium tracking-[0.22em] uppercase text-[11px]">
                    OUR PHILOSOPHY
                  </span>
                </div>
              </Reveal>

              <motion.h2 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-[3rem] lg:text-[3.5rem] font-serif font-light text-[#f4f4f5] leading-[1.1] tracking-[-0.015em] mb-12 uppercase"
              >
                CRAFTING<br/>
                <span className="italic text-zinc-500 font-light lowercase text-[0.95em]">experiences</span><br/>
                BEYOND<br className="hidden lg:block"/> ARCHITECTURE
              </motion.h2>

              <Reveal delay={0.4}>
                <div className="w-[32px] h-[1px] bg-white/20 mb-6" />
                <div className="flex flex-col gap-[20px] text-[15px] text-[#f4f4f5]/72 font-light leading-[1.7]">
                  <p>
                    Vivere Construction was founded with a singular, unwavering vision: to elevate the standard of building and remodeling in California. With an extensive foundation built on <strong className="text-white font-bold tracking-wide">22 years of hands-on experience</strong>, our team boasts a unique blend of construction mastery and technical foresight.
                  </p>
                  <p>
                    From the earliest blueprints to the final coat of paint, we operate as a fully licensed, bonded, and insured entity. Our expertise isn't just claimed—it's certified. We believe deeply in transparent practices, prioritizing adherence to local codes while implementing cutting-edge building techniques.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={1.3}>
                <div className="mt-[32px]">
                  <Link
                    to="#leadership"
                    className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-white/85 uppercase relative"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    MEET OUR TEAM
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
                    <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white/20 transition-colors duration-300 group-hover:bg-white/50" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right/Bottom: Photo Collage Column */}
            <div className="w-full lg:w-[50%] mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Photo 1: Top Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-end"
                  >
                    <div className="w-full aspect-square bg-zinc-950 overflow-hidden relative border border-white/30 group/photo rounded-sm">
                      <Image 
                        src="https://i.imgur.com/cfIhyyV.jpg" 
                        alt="Team at a community event" 
                        className="w-full h-full object-cover transition-all duration-[600ms] ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)] pointer-events-none transition-opacity duration-[600ms] group-hover/photo:opacity-0" />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-medium small-caps mt-2">
                       —— TEAM AT A COMMUNITY EVENT
                    </span>
                  </motion.div>
                  
                  {/* Photo 3: Bottom Left, offset up by 24px from top-right's bottom edge (we do this by adding negative margin top in desktop) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    className="flex flex-col items-end mt-0 md:-mt-[24px]"
                  >
                    <div className="w-full aspect-[4/5] bg-zinc-950 overflow-hidden relative border border-white/30 group/photo rounded-sm">
                      <Image 
                        src="https://i.imgur.com/eKUqqfd.jpg" 
                        alt="Building Trust banner" 
                        className="w-full h-full object-cover transition-all duration-[600ms] ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)] pointer-events-none transition-opacity duration-[600ms] group-hover/photo:opacity-0" />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-medium small-caps mt-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                       —— BUILDING TRUST, BUILDING COMMUNITIES
                    </span>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                  {/* Photo 2: Top Right, offset down by 32px */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
                    className="flex flex-col items-end mt-0 md:mt-[32px]"
                  >
                    <div className="w-full aspect-[4/5] bg-zinc-950 overflow-hidden relative border border-white/30 group/photo rounded-sm">
                      <Image 
                        src="https://i.imgur.com/PjJUimX.jpg" 
                        alt="Vivere built dream home mug" 
                        className="w-full h-full object-cover transition-all duration-[600ms] ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)] pointer-events-none transition-opacity duration-[600ms] group-hover/photo:opacity-0" />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-medium small-caps mt-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                       —— VIVERE BUILT — DREAM HOME MUG
                    </span>
                  </motion.div>

                  {/* Photo 4: Bottom Right, offset down by 16px relative to natural flow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 1.05, ease: "easeOut" }}
                    className="flex flex-col items-end mt-0 md:mt-[16px]"
                  >
                    <div className="w-full aspect-square bg-zinc-950 overflow-hidden relative border border-white/30 group/photo rounded-sm">
                      <Image 
                        src="https://i.imgur.com/yrdW6VO.jpg" 
                        alt="On site, Altadena" 
                        className="w-full h-full object-cover transition-all duration-[600ms] ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)] pointer-events-none transition-opacity duration-[600ms] group-hover/photo:opacity-0" />
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-medium small-caps mt-2">
                       —— ON SITE, ALTADENA
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="section-padding bg-zinc-950/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Stamp, title: "Licensed", desc: "Fully certified general contractors strictly adhering to local building codes." },
              { icon: Compass, title: "Local", desc: "Headquartered in California, focused on local sustainable growth." },
              { icon: CalendarDays, title: "22 Years", desc: "Over two decades of architectural design and commercial builds." }
            ].map((pillar, i) => (
              <div key={i} className="w-full">
                <Reveal delay={i * 0.1}>
                  <div className="p-8 sm:p-10 border border-white/5 bg-black/40 hover:border-white/20 transition-all duration-500 backdrop-blur-sm h-full group flex flex-col items-center text-center w-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border border-white/10 rounded-full flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:border-white/30 transition-all duration-700">
                      <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/70 group-hover:text-white transition-colors" strokeWidth={1} />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-serif text-white mb-2 sm:mb-4 uppercase tracking-tighter">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-500 font-light text-[10px] sm:text-sm leading-relaxed max-w-[200px]">{pillar.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section-padding overflow-hidden bg-black pb-40 relative">
        {/* Luxury Background Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 px-6 sm:px-0">
            <Reveal>
              <span className="text-white/40 font-bold tracking-[0.6em] uppercase text-[8px] sm:text-[10px] mb-8 block">Architecture of Excellence</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="uppercase leading-[0.85] tracking-tighter mb-10 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
                Lead the team, <br/>
                <span className="italic font-light text-zinc-700">and review the portfolio.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-zinc-500 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                Our legacy is built by a passionate team of experts. Encounter the visionary minds who orchestrate your extraordinary living spaces.
              </p>
            </Reveal>
          </div>

          {/* Mobile Swiper Container with Perfect Centering & Snapping */}
          <div className="-mx-6 sm:mx-0">
            <TeamCarousel variant="story" />
          </div>
        </div>
      </section>

      {/* The Hands Behind the Build Section */}
      <section className="relative bg-black py-24 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <Reveal>
            <span className="text-white/40 font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Our Crew</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-8 tracking-tighter uppercase">
              The Hands Behind The Build
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-400 font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Behind every Vivere rebuild is a team that shows up — through the heat, the dust, and the long days. These are the people making it happen.
            </p>
          </Reveal>
        </div>

        <div className="w-full relative group cursor-crosshair">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
          <motion.img 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="https://i.imgur.com/R0Ejeoy.jpg" 
            alt="The Vivere Construction Crew" 
            className="w-full h-[60vh] object-cover object-center transition-all duration-[600ms] ease-out group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10" />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 bg-black/60 backdrop-blur-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/90">
              Part of our crew, captured between shifts on site.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center relative overflow-hidden min-h-[60vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
            alt="Vivere Team" 
            className="opacity-20 transition-transform duration-[5s] group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-[6rem] lg:text-[8rem] font-serif font-medium text-white mb-16 uppercase leading-none tracking-tighter">
              READY TO<br/>BUILD?
            </h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold hover:bg-[#f4f4f5] transition-all duration-700 shadow-2xl active:scale-[0.98]"
            >
              <span className="tracking-[0.3em] uppercase text-[10px] font-bold">Schedule Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-[6px]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
