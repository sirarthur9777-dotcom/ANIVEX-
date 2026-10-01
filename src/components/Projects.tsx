import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, X, Calendar, User, ExternalLink, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ProjectCMS } from '../types/cms';
import { PolicyHubVisual, VyaparDeskVisual, OpsGridVisual } from './TechVisualMockups';

export const Projects: React.FC = () => {
  const { projects } = useCms();
  const [selectedProject, setSelectedProject] = useState<ProjectCMS | null>(null);

  const fallbackProjects: ProjectCMS[] = [
    {
      id: 'policyhub-project',
      name: 'PolicyHub Governance Engine',
      client: 'Enterprise Corporate Client',
      category: 'SaaS Platform & Enterprise Product',
      projectType: 'SaaS Product',
      shortDescription: 'Enterprise document governance platform uniting granular permissions, version control, and instant semantic search.',
      fullDescription: 'Engineered to eliminate corporate document clutter and regulatory compliance friction. We designed an automated document lifecycle pipeline, audit trail system, and vector-grounded search that indexes thousands of enterprise contracts in sub-seconds.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Vector DB'],
      features: ['Granular Authorization', 'Semantic Document Search', 'Automated Versioning', 'Audit Trail Compliance'],
      featured: true,
      imageBg: 'from-slate-900 to-[#0B1F3A]',
      projectUrl: 'https://anivex.com/products/policyhub',
      stats: 'Enterprise Ready',
      status: 'Featured',
      clientType: 'Anivex Flagship Product',
      timeline: '2025 – Active',
      completionDate: 'June 2025',
      overview: 'Engineered from the ground up to solve corporate document clutter, PolicyHub integrates fine-grained permission control, automated document lifecycle management, and instant semantic search.',
      displayOrder: 1,
      published: true,
    },
    {
      id: 'nexus-erp',
      name: 'Anivex VyaparDesk ERP',
      client: 'Apex Retail & Logistics India',
      category: 'Custom ERP & Business Automation',
      projectType: 'ERP / Business Software',
      shortDescription: 'Unified operational dashboard designed for multi-branch inventory tracking, workforce allocation, and automated GST invoices.',
      fullDescription: 'Replaced manual spreadsheets and fragmented paper billings with a real-time web portal that processes stock updates across 5 regional warehouses, generates compliant GST tax invoices, and reconciles daily financial accounts.',
      techStack: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Tailwind CSS'],
      features: ['Multi-Branch Inventory Sync', 'GST Tax Invoicing', 'Role-Based Permissions', 'Automated Ledgers'],
      featured: true,
      imageBg: 'from-slate-900 to-[#0B1F3A]',
      projectUrl: '#contact',
      stats: '5 Branches Deployed',
      status: 'Completed',
      clientType: 'Commercial Enterprise System',
      timeline: '4 Months Development',
      completionDate: 'April 2025',
      overview: 'Replaced 5 legacy spreadsheets with a real-time web portal that processes stock updates and generates automated compliance reports.',
      displayOrder: 2,
      published: true,
    },
    {
      id: 'aura-health-app',
      name: 'Aura Mobile Companion',
      client: 'HealthCare Plus India',
      category: 'Mobile Application (Android)',
      projectType: 'Mobile App',
      shortDescription: 'Cross-platform mobile application featuring offline biometric sync, health metric visualizers, and instant appointment booking.',
      fullDescription: 'Built with offline-first synchronization to ensure patient medical summaries and lab reports remain accessible even in low-connectivity rural clinic settings. Includes biometric login and instant WhatsApp notification integration.',
      techStack: ['Android', 'Kotlin', 'Firebase', 'REST APIs'],
      features: ['Biometric Authentication', 'Offline-First Sync', 'Vitals Visualizer', 'Push Appointment Reminders'],
      featured: false,
      imageBg: 'from-slate-900 to-[#0B1F3A]',
      projectUrl: '#contact',
      stats: 'Android & iOS App',
      status: 'Active',
      clientType: 'Healthcare Provider',
      timeline: '3 Months Development',
      completionDate: 'February 2025',
      overview: 'Built with offline-first synchronization to ensure patient medical summaries remain available even in low-connectivity environments.',
      displayOrder: 3,
      published: true,
    },
  ];

  const activeProjects = (projects && projects.length > 0)
    ? projects.filter((p) => p.published !== false).sort((a, b) => a.displayOrder - b.displayOrder)
    : fallbackProjects;

  return (
    <section id="projects" className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">PROVEN DELIVERIES</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Recent Work & Case Studies
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            Real software, web applications, and digital systems delivered with disciplined craftsmanship for Indian and global businesses.
          </p>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project, index) => {
            const projectImg = project.image || project.imageUrl || '/images/hero_indian_tech_business_1790750492543.jpg';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="card-warm card-warm-hover rounded-2xl overflow-hidden bg-white flex flex-col justify-between"
              >
                <div>
                  {/* Project Technical UI Mockup Preview (Zero AI-Slop) */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden border-b border-[#0B1F3A]/6">
                    {project.id === 'policyhub-project' ? (
                      <PolicyHubVisual />
                    ) : project.id === 'nexus-erp' ? (
                      <VyaparDeskVisual />
                    ) : project.id === 'aura-health-app' ? (
                      <OpsGridVisual />
                    ) : project.image && !project.image.includes('_') ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <OpsGridVisual />
                    )}

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B1F3A]/90 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Metadata line (Zero-Pill clean typography) */}
                    <div className="flex items-center gap-2 text-xs text-[#0B1F3A]/60 mb-2">
                      <span>{project.client || 'Enterprise Client'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.completionDate || '2025'}</span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#0B1F3A] mb-3">
                      {project.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed mb-6 font-normal">
                      {project.shortDescription || project.fullDescription || project.overview}
                    </p>

                    {/* Tech stack tags */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#FFFDF7] border border-[#0B1F3A]/8 text-[11px] font-medium text-[#0B1F3A]/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-[#0B1F3A]/6">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#0B1F3A]/15 hover:border-[#F97316] hover:bg-[#F97316] text-[#0B1F3A] hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/10 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-[#0B1F3A]/60 hover:text-[#0B1F3A] hover:bg-[#0B1F3A]/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-[#F97316] font-bold uppercase tracking-wider mb-1">
                    <span>{selectedProject.category}</span>
                    <span>·</span>
                    <span>{selectedProject.completionDate || '2025'}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs text-[#0B1F3A]/60 mt-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>Client: {selectedProject.client || selectedProject.clientType || 'Enterprise Client'}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/8 mb-6">
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-[#0B1F3A]/80 leading-relaxed">
                    {selectedProject.fullDescription || selectedProject.overview || selectedProject.shortDescription}
                  </p>
                </div>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                      Key Deliverables & Capabilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#0B1F3A]/8 text-xs text-[#0B1F3A]/85">
                          <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                      Engineered With
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-[#0B1F3A]/8 text-xs font-medium text-[#0B1F3A]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B1F3A]/8">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
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
                    className="px-5 py-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wide shadow-xs transition-colors"
                  >
                    Build Something Similar →
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
