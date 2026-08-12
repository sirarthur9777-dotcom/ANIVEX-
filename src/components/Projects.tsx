import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/companyData';
import { ProjectItem } from '../types';
import { ExternalLink, ShieldCheck, FileText, ArrowRight, X, Layers, PlusCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  let cmsProjects;
  try {
    const cms = useCms();
    cmsProjects = cms.projects;
  } catch (e) {
    cmsProjects = PROJECTS.map(p => ({ ...p, featured: true, displayOrder: 1, published: true }));
  }

  const activeProjects = (cmsProjects && cmsProjects.length > 0)
    ? cmsProjects.filter(p => p.published !== false)
    : PROJECTS;

  return (
    <section id="projects" className="py-24 relative bg-[#05070B] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D6A84F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            FEATURED ENGINEERING
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Featured <span className="text-gold-gradient">Projects & Products</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            Explore software solutions, custom enterprise platforms, and proprietary technology products engineered by ANIVEX Solutions.
          </p>
        </div>

        {/* Projects Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl bg-[#0B0F16] border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl ${
                proj.featured
                  ? 'border-[#D6A84F]/60 shadow-[0_15px_35px_rgba(214,168,79,0.15)]'
                  : 'border-white/10 hover:border-[#D6A84F]/40'
              }`}
            >
              {/* Stylized Mockup Preview Header */}
              <div className={`relative h-48 w-full bg-gradient-to-br ${proj.imageBg} p-6 flex flex-col justify-between border-b border-white/10 overflow-hidden`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className="px-3 py-1 rounded-full bg-[#05070B]/80 backdrop-blur-md border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B]">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] text-[10px] font-bold uppercase tracking-wider">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Abstract UI Representation */}
                <div className="relative z-10 flex items-end justify-between">
                  <div className="font-display font-extrabold text-2xl text-white tracking-tight group-hover:text-[#F5C85B] transition-colors">
                    {proj.name}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-[#05070B]/70 px-2.5 py-1 rounded-md border border-white/10">
                    {proj.stats}
                  </span>
                </div>

                {/* Background Tech Vector Pattern */}
                <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full border border-white/10 pointer-events-none opacity-40 group-hover:scale-125 transition-transform duration-700" />
              </div>

              {/* Project Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#05070B] border border-white/10 text-[10px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Case Study Button */}
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="w-full py-3 rounded-xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F] text-white hover:text-[#F5C85B] text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>View Case Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Projects Clean Placeholder Structure */}
        <div className="mt-12 p-8 rounded-2xl bg-[#0B0F16]/50 border border-dashed border-white/15 text-center flex flex-col items-center justify-center">
          <div className="p-3 rounded-xl bg-[#121824] border border-[#D6A84F]/20 text-[#F5C85B] mb-3">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-1">More Projects In Pipeline</h3>
          <p className="text-xs text-slate-400 max-w-md mb-4">
            ANIVEX Solutions continuously engineers new enterprise products and custom solutions across fintech, healthcare, logistics, and AI document processing.
          </p>
          <a
            href="#contact"
            className="text-xs font-bold text-[#F5C85B] hover:underline inline-flex items-center gap-1.5"
          >
            <span>Propose a Custom Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Project Case Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070B]/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/40 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#F5C85B] tracking-wider">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white">{selectedProject.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#05070B] p-4 rounded-xl border border-white/10">
                    <div>
                      <span className="text-slate-500 block">ENGAGEMENT:</span>
                      <span className="text-slate-200 font-semibold">{selectedProject.details.clientType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">TIMELINE:</span>
                      <span className="text-slate-200 font-semibold">{selectedProject.details.timeline}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Project Overview</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedProject.details.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Technology Architecture</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(t => (
                        <span key={t} className="px-3 py-1 rounded-md bg-[#121824] text-[#F5C85B] text-xs font-mono border border-[#D6A84F]/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      setSelectedProject(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Build Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
