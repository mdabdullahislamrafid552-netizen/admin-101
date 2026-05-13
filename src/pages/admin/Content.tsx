import React, { useState } from 'react';
import { Save, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContentManagement() {
  const [expandedSection, setExpandedSection] = useState<string>('homepage');

  const contentSections = [
    {
      id: 'homepage',
      title: 'Homepage',
      fields: [
        { label: 'Hero Subtitle', type: 'text', placeholder: 'Rebuilding Stronger. Designing Better.' },
        { label: 'Hero Title', type: 'text', placeholder: 'Premium builds in Altadena.' },
        { label: 'Fire Recovery Title', type: 'text', placeholder: 'We specialize in fire rebuilds.' },
        { label: 'Fire Recovery Paragraph', type: 'textarea', placeholder: 'Enter details about the rebuilding process...' },
      ]
    },
    {
      id: 'story',
      title: 'Our Story',
      fields: [
        { label: 'Mission Header', type: 'text', placeholder: 'Our Mission' },
        { label: 'Mission Text', type: 'textarea', placeholder: 'Vivere Construction is built on trust...' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact Details',
      fields: [
        { label: 'Phone Number', type: 'text', placeholder: '(626) 555-0123' },
        { label: 'Email Address', type: 'text', placeholder: 'hello@vivereconstruction.com' },
        { label: 'Business Location', type: 'text', placeholder: 'Altadena, California' },
      ]
    },
    {
      id: 'footer',
      title: 'Footer',
      fields: [
        { label: 'Instagram URL', type: 'text', placeholder: 'https://instagram.com/...' },
        { label: 'Houzz URL', type: 'text', placeholder: 'https://houzz.com/...' },
      ]
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save functionality
    alert('Content saved! (Demo only)');
  };

  return (
    <div className="space-y-8 fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-zinc-500 font-serif italic text-xl">05 &mdash;</span>
            <h1 className="text-4xl font-serif tracking-tight text-white">Site Content</h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-12">Edit the main pages of your site.</p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <form onSubmit={handleSave} className="space-y-4">
        {contentSections.map(section => (
          <div key={section.id} className="border border-white/10 bg-white/[0.02]">
            <button 
              type="button"
              onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
              className="w-full flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <h2 className="text-xl font-serif text-white">{section.title}</h2>
              {expandedSection === section.id ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
            </button>
            
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/5 space-y-6 bg-black/20">
                    {section.fields.map((field, i) => (
                      <div key={i} className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea 
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans resize-none"
                            placeholder={field.placeholder}
                            rows={4}
                            defaultValue={field.placeholder}
                          ></textarea>
                        ) : (
                          <input 
                            type="text" 
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-white/30 transition-all font-sans"
                            placeholder={field.placeholder}
                            defaultValue={field.placeholder}
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-2 flex justify-end">
                      <button type="submit" className="bg-white text-black text-sm px-5 py-2 hover:bg-zinc-200 transition-colors flex items-center gap-2 rounded">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </form>
    </div>
  );
}
