import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Hammer, Home, Building2, Paintbrush, Truck, Map, LayoutGrid, Shield, DoorOpen, Droplet, Zap, Wind, Flame, BatteryCharging, Layers, Grid3X3, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useRef } from 'react';
import { Image } from '../components/Image';

const serviceCategories = [
  {
    id: 'core',
    title: 'Core Construction',
    shortDesc: 'Comprehensive structural transformations and full-scale build projects engineered for enduring legacy.',
    banner: 'https://www.drfbuilders.com/wp-content/uploads/2019/09/AdobeStock_100737931.jpeg',
    placeholderText: 'SLOT: Crosby or East Altadena framing shot',
    services: [
      { name: 'Rebuild Projects', desc: 'Complete teardowns and ground-up custom builds tailored flawlessly to your vision and lifestyle.', icon: Hammer },
      { name: 'Remodel & Renovation', desc: 'Surgically transforming existing spaces into extraordinary, contemporary modern homes.', icon: Paintbrush },
      { name: 'ADU Construction', desc: 'Custom Accessory Dwelling Units maximizing property limits for extended luxury living or income.', icon: Home },
      { name: 'Commercial Construction', desc: 'Professional commercial and retail volumes built with clinical precision and durability.', icon: Building2 }
    ]
  },
  {
    id: 'structural',
    title: 'Structural & Exterior',
    shortDesc: 'Solidifying the foundation and fortifying the envelope of your property to stand against time.',
    banner: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop',
    placeholderText: 'SLOT: Current site exterior shot',
    services: [
      { name: 'Demolition & Cleanup', desc: 'Safe, efficient structural removal and meticulous site clearing without disruption.', icon: Truck },
      { name: 'Excavation & Site Prep', desc: 'Geometrically precise grading and earthwork to prepare for impenetrable solid foundations.', icon: Map },
      { name: 'Foundation & Framing', desc: 'The rigid backbone of your structure, built strictly to surpass the highest safety codes.', icon: LayoutGrid },
      { name: 'Roofing Systems', desc: 'Fire-resistant, architecturally significant, high-performance roofs safeguarding your investment.', icon: Shield },
      { name: 'Exterior Finishes', desc: 'Premium luxury stucco, energy-efficient expansive windows, and bespoke grand doors.', icon: DoorOpen }
    ]
  },
  {
    id: 'systems',
    title: 'Systems & Mechanics',
    shortDesc: 'The essential infrastructure and neurological network that breathes life into your architecture.',
    banner: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop',
    placeholderText: 'SLOT: Homepark interior MEP shot',
    services: [
      { name: 'Plumbing Design', desc: 'State-of-the-art piping, bespoke fixtures, and highly efficient water management systems.', icon: Droplet },
      { name: 'Electrical & Smart Home', desc: 'Invisible, modern wiring, total smart home integrations, and cinematic lighting setups.', icon: Zap },
      { name: 'Climate Control (HVAC)', desc: 'Whisper-quiet, high-efficiency heating, ventilation, and air conditioning zoning.', icon: Wind },
      { name: 'Fire Sprinkler Systems', desc: 'Advanced hidden fire suppression ensuring maximum safety and uncompromised aesthetics.', icon: Flame },
      { name: 'EV Charging Integration', desc: 'Dedicated high-wattage circuitry and modern electric vehicle station installations.', icon: BatteryCharging }
    ]
  },
  {
    id: 'interior',
    title: 'Interior & Finishing',
    shortDesc: 'Meticulous micro-details and premium materials that complete your distinct sensory aesthetic.',
    banner: 'https://vivereconstruction.com/wp-content/uploads/2024/06/IMG_3717_Seite_23.jpg',
    placeholderText: 'SLOT: Finished-feel interior shot',
    services: [
      { name: 'Drywall & Insulation', desc: 'Flawless museum-level wall preparation and ultra energy-saving thermal barriers.', icon: Layers },
      { name: 'Paint & Textures', desc: 'Exquisite surface finishing with durable, high-end imported paints and custom washes.', icon: Paintbrush },
      { name: 'Flooring Masterworks', desc: 'Wide-plank luxury hardwoods, custom mosaic tile work, and premium plush carpets.', icon: Grid3X3 },
      { name: 'Cabinets & Millwork', desc: 'Bespoke millwork, custom floating cabinetry, and stunning luxury stone surfaces.', icon: Archive }
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30 overflow-hidden max-w-full w-full" ref={containerRef}>
      {/* 100k Hero Section */}
      <section className="relative h-[90vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Architecture" 
            className="opacity-20 scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white/50 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block">Our Disciplines</span>
            <h1 className="mb-8 uppercase tracking-tighter leading-[0.85]">
              Expert<br/>Craftsmanship
            </h1>
          </motion.div>
          <Reveal delay={0.4}>
            <p className="text-lg md:text-3xl text-zinc-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
              We provide full-service construction solutions with clinical precision, unrelenting quality, and a legacy of over 22 years.
            </p>
          </Reveal>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[10px] tracking-widest text-zinc-500 uppercase font-medium hidden sm:flex"
        >
          <span className="animate-pulse">Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* Editorial Categories */}
      <div className="flex flex-col bg-black relative z-20">
        {serviceCategories.map((category, catIndex) => (
          <section key={category.id} className="section-padding border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
                
                {/* Sticky Left Sidebar */}
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-40">
                    <Reveal>
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-8 mt-4">
                        <span className="font-serif text-[64px] lg:text-[120px] font-light text-zinc-800 leading-[0.8]">0{catIndex + 1}</span>
                        <div>
                          <h2 className="leading-[1.1] uppercase mb-3 text-3xl md:text-5xl">
                            {category.title}
                          </h2>
                          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium whitespace-nowrap">
                            0{category.services.length} SERVICES
                          </div>
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 lg:mb-12 max-w-md px-4 sm:px-0">
                        {category.shortDesc}
                      </p>
                    </Reveal>
                    
                    {/* Image Window */}
                    <Reveal delay={0.2}>
                      <div className="aspect-[4/3] lg:aspect-[3/4] w-full lg:rounded-sm overflow-hidden relative group -mx-4 sm:mx-0 w-[100vw] sm:w-full">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
                        <Image 
                          src={category.banner} 
                          alt={category.title}
                          className="transition-all duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute bottom-6 left-6 right-6 z-30 border border-white/10 p-3 bg-black/40 backdrop-blur-md opacity-70 group-hover:opacity-100 transition-opacity">
                           <span className="text-[9px] uppercase tracking-widest text-white/80 block text-center font-medium">{category.placeholderText}</span>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Right List */}
                <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0 mt-8 lg:mt-0 px-4 sm:px-0">
                  {category.services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="group border-t border-white/5 py-10 lg:py-12 first:border-0 first:pt-4 lg:first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-6 hover:bg-white/[0.02] -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors duration-500 rounded-lg cursor-default min-h-[48px]"
                      >
                        <div className="flex-grow">
                          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-primary transition-colors duration-500 uppercase tracking-tight">
                            {service.name}
                          </h3>
                          <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-lg group-hover:text-zinc-300 transition-colors duration-500 italic">
                            {service.desc}
                          </p>
                        </div>
                        <div className="shrink-0 order-first sm:order-last">
                          <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-700 bg-zinc-900/30 group-hover:-rotate-12 group-hover:scale-110">
                            <Icon className="w-5 h-5 text-zinc-500 group-hover:text-black transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Massive 100k Footer CTA */}
      <section className="section-padding relative bg-black border-t border-white/5 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_0)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          <Reveal>
            <span className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] mb-12 block">Transforming Visions</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-6xl md:text-[8rem] lg:text-[12rem] font-serif font-medium text-white mb-20 leading-none tracking-tighter uppercase">
              LET'S TALK.
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
              <span className="tracking-[0.3em] uppercase text-[10px] font-bold">Request a Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-[6px]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
