import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, Check, Clock } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { firestoreService } from '../lib/firestoreService';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [typeOfConstruction, setTypeOfConstruction] = useState('');
  const [otherConstruction, setOtherConstruction] = useState('');
  const [projectSetup, setProjectSetup] = useState('');
  const [showAdditional, setShowAdditional] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const projectDescription = formData.get('projectDescription') as string;
    const address = formData.get('address') as string;
    const bedrooms = formData.get('bedrooms') as string;
    const bathrooms = formData.get('bathrooms') as string;
    const hearAbout = formData.get('hearAbout') as string;
    const bestTime = formData.get('bestTime') as string;

    const constructionVal = typeOfConstruction === 'Other' ? `Other: ${otherConstruction}` : typeOfConstruction;

    const builtMessage = `
Project Description: ${projectDescription}
Address: ${address || 'N/A'}
Bedrooms: ${bedrooms || 'N/A'}
Bathrooms: ${bathrooms || 'N/A'}
Type of Construction: ${constructionVal || 'N/A'}
Currently working with: ${projectSetup || 'N/A'}
How did you hear about us: ${hearAbout || 'N/A'}
Best time to contact: ${bestTime || 'N/A'}
    `.trim();

    const data = {
      name,
      email,
      phone,
      message: builtMessage,
    };

    try {
      await firestoreService.submitMessage(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send request. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-zinc-900 px-6 py-4 border border-white/10 rounded-sm text-white focus:border-primary outline-none transition-all duration-300 font-light placeholder-zinc-700 text-sm";
  const labelClasses = "block text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-3";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden max-w-full w-full">
      {/* Header */}
      <section className="section-padding border-b border-white/5 pt-40 bg-zinc-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="mb-6 uppercase">
              Request a Consultation
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              Partner with excellence. Tell us about your visionary space, and let's begin the orchestration of your masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
            
            {/* Contact Form (Left Side) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="bg-zinc-950 p-6 md:p-16 rounded-sm border border-white/5 relative shadow-inner-white">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 flex flex-col items-center text-center"
                    >
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                        <CheckCircle2 className="w-12 h-12 text-primary shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
                      </div>
                      <h2 className="text-3xl font-serif font-medium text-white mb-4">Request Submitted</h2>
                      <p className="text-zinc-500 font-light max-w-md text-lg italic">
                        "Your vision is now in expert hands. We will contact you shortly to begin the journey."
                      </p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 border-b border-zinc-800 hover:text-white hover:border-white transition-all pb-2"
                      >
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form" 
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-16"
                    >
                      {/* Basic Info */}
                      <div className="space-y-10">
                        <div className="flex items-center gap-4">
                           <h3 className="text-2xl font-serif text-white whitespace-nowrap">Basic Information</h3>
                           <div className="h-[1px] flex-grow bg-white/5" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                          <div>
                            <label htmlFor="name" className={labelClasses}>Full Name *</label>
                            <input type="text" id="name" name="name" required className={inputClasses} placeholder="John Doe" />
                          </div>
                          <div>
                            <label htmlFor="phone" className={labelClasses}>Phone *</label>
                            <input type="tel" id="phone" name="phone" required className={inputClasses} placeholder="(626) 763-1376" />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="email" className={labelClasses}>Email *</label>
                            <input type="email" id="email" name="email" required className={inputClasses} placeholder="info@vivereconstruction.com" />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="projectDescription" className={labelClasses}>Tell us about your project *</label>
                            <textarea id="projectDescription" name="projectDescription" required className={`${inputClasses} resize-none min-h-[120px]`} placeholder="Briefly describe what you're looking to build or remodel..." />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <button
                          type="button"
                          onClick={() => setShowAdditional(!showAdditional)}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-500 group-hover:border-white/30">
                            <span className="text-zinc-500 group-hover:text-white transition-colors text-lg font-light leading-none mb-1">
                              {showAdditional ? '-' : '+'}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">
                            {showAdditional ? 'Hide Additional Details' : 'Show Additional Details (Optional)'}
                          </span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {showAdditional && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-16 pt-8">
                              {/* Property Details */}
                              <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                   <h3 className="text-2xl font-serif text-white whitespace-nowrap">Property Details</h3>
                                   <div className="h-[1px] flex-grow bg-white/5" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
                                  <div className="md:col-span-2">
                                    <label htmlFor="address" className={labelClasses}>Property Address</label>
                                    <input type="text" id="address" name="address" className={inputClasses} placeholder="123 Example St, City, CA 90000" />
                                  </div>
                                  <div>
                                    <label htmlFor="bedrooms" className={labelClasses}>Bedrooms</label>
                                    <input type="number" id="bedrooms" name="bedrooms" min="0" className={inputClasses} placeholder="4" />
                                  </div>
                                  <div>
                                    <label htmlFor="bathrooms" className={labelClasses}>Bathrooms</label>
                                    <input type="number" id="bathrooms" name="bathrooms" min="0" step="0.5" className={inputClasses} placeholder="3.5" />
                                  </div>
                                </div>

                                <div>
                                  <label className={labelClasses}>Construction Type</label>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                                    {['Rebuild', 'Remodel', 'Other'].map((opt) => (
                                      <div
                                        key={opt}
                                        onClick={() => setTypeOfConstruction(opt)}
                                        className={`cursor-pointer flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border shadow-sm transition-all duration-500 scale-100 active:scale-95 ${typeOfConstruction === opt ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50'}`}
                                      >
                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex flex-shrink-0 items-center justify-center transition-all duration-500 ${typeOfConstruction === opt ? 'border-primary bg-primary shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'border-zinc-700'}`}>
                                          {typeOfConstruction === opt && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black font-bold" />}
                                        </div>
                                        <span className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-widest ${typeOfConstruction === opt ? 'text-white' : 'text-zinc-500'}`}>{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Other specify input */}
                                  <AnimatePresence>
                                    {typeOfConstruction === 'Other' && (
                                      <motion.div
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        exit={{ opacity: 0, scaleY: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="origin-top mt-6"
                                      >
                                        <input 
                                          type="text" 
                                          value={otherConstruction}
                                          onChange={(e) => setOtherConstruction(e.target.value)}
                                          className={inputClasses} 
                                          placeholder="Please specify your project type..." 
                                          required={typeOfConstruction === 'Other'}
                                        />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>

                              {/* Project Setup */}
                              <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                   <h3 className="text-2xl font-serif text-white whitespace-nowrap">Collaborators</h3>
                                   <div className="h-[1px] flex-grow bg-white/5" />
                                </div>
                                <div>
                                  <label className={labelClasses}>Working with an architect or contractor?</label>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Architect', 'Contractor', 'Both', 'Neither'].map((opt) => (
                                      <div
                                        key={opt}
                                        onClick={() => setProjectSetup(opt)}
                                        className={`cursor-pointer flex flex-col items-center justify-center gap-3 p-6 border transition-all duration-500 text-center ${projectSetup === opt ? 'border-primary bg-primary/5' : 'border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50'}`}
                                      >
                                        <div className={`w-6 h-6 rounded-sm border flex flex-shrink-0 items-center justify-center transition-all ${projectSetup === opt ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-zinc-700'}`}>
                                          {projectSetup === opt && <Check className="w-4 h-4 text-black stroke-[3]" />}
                                        </div>
                                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${projectSetup === opt ? 'text-white' : 'text-zinc-600'}`}>{opt}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Additional Info */}
                              <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                   <h3 className="text-2xl font-serif text-white whitespace-nowrap">Schedule</h3>
                                   <div className="h-[1px] flex-grow bg-white/5" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                  <div>
                                    <label htmlFor="hearAbout" className={labelClasses}>Referral Source</label>
                                    <input type="text" id="hearAbout" name="hearAbout" className={inputClasses} placeholder="Google, Word of Mouth, etc." />
                                  </div>
                                  <div>
                                    <label htmlFor="bestTime" className={labelClasses}>Preferred Contact Window</label>
                                    <select id="bestTime" name="bestTime" defaultValue="" className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1.5rem_center]`}>
                                      <option value="" disabled>Select Timeframe</option>
                                      <option value="Morning">Morning (8am - 12pm)</option>
                                      <option value="Afternoon">Afternoon (12pm - 5pm)</option>
                                      <option value="Evening">Evening (5pm - 8pm)</option>
                                      <option value="Anytime">Anytime</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <div className="pt-10">
                        <button
                          type="submit"
                          disabled={loading}
                          className="group w-full flex items-center justify-center gap-6 px-12 py-6 bg-white text-black rounded-full font-bold hover:bg-[#f4f4f5] transition-all duration-700 shadow-2xl active:scale-[0.98] disabled:opacity-50"
                        >
                          <span className="tracking-[0.3em] uppercase text-[10px]">
                            {loading ? 'Transmitting...' : 'Initiate Consultation'}
                          </span>
                          {!loading && <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-[6px]" />}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sidebar (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 space-y-16"
            >
              <div className="bg-zinc-950 p-8 lg:p-12 border border-white/5 space-y-12 shadow-2xl">
                <Reveal>
                  <h3 className="text-3xl font-serif text-white whitespace-nowrap mb-4">Collaborative Hub</h3>
                  <p className="text-zinc-500 font-light leading-relaxed">Reach out directly to our leadership team for immediate inquiries.</p>
                </Reveal>
                <div className="space-y-8 flex flex-col">
                  <div className="flex items-start gap-6 group pb-8">
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                      <Phone className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Direct Line</h4>
                      <a href="tel:6267631376" className="text-lg md:text-xl text-zinc-300 hover:text-white transition-colors font-light">(626) 763-1376</a>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />

                  <div className="flex items-start gap-6 group py-8">
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                      <Mail className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Electronic Mail</h4>
                      <a href="mailto:info@vivereconstruction.com" className="text-lg md:text-xl text-zinc-300 hover:text-white transition-colors font-light break-all">info@vivereconstruction.com</a>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />

                  <div className="flex items-start gap-6 group py-8">
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                      <MapPin className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Headquarters</h4>
                      <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">239 N. Euclid Ave.<br />Upland, CA 91786</p>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />

                  <div className="flex items-start gap-6 group pt-8">
                    <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                      <Clock className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Availability</h4>
                      <p className="text-lg md:text-xl text-zinc-300 font-light">Mon — Fri: 8:00 AM — 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
