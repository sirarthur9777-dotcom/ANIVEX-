import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Smartphone, BarChart3, Sparkles, Layout, Cloud, ArrowRight, Check, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ServiceCMS } from '../types/cms';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = useCms();
  const [activeModalService, setActiveModalService] = useState<ServiceCMS | null>(null);

  const fallbackServices: ServiceCMS[] = [
    {
      id: 'web-development',
      number: '01',
      title: 'Web Development',
      description: 'High-speed, SEO-optimized web applications, client portals, and e-commerce platforms built with modern React, Next.js, and TypeScript.',
      fullDescription: 'We build high-performance web applications and corporate websites engineered for conversion, speed, and clean code. From headless architectures to mission-critical portals, our solutions deliver seamless user experiences and scalable backends.',
      iconName: 'Globe',
      features: ['React & Next.js Stacks', 'Sub-second Load Times', 'Search Engine Optimization', 'Enterprise Security'],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      displayOrder: 1,
      published: true,
    },
    {
      id: 'mobile-applications',
      number: '02',
      title: 'Mobile Applications',
      description: 'Modern Android and cross-platform mobile apps featuring fluid native interactions, offline data synchronization, and biometric security.',
      fullDescription: 'Our mobile engineering team delivers production-ready Android and cross-platform mobile apps with responsive layouts, push notification infrastructure, and instant API syncing. Published and maintained on Google Play Store with top security standards.',
      iconName: 'Smartphone',
      features: ['Android Native & Cross-Platform', 'Offline Data Sync', 'Biometric Authentication', 'Play Store Publishing'],
      technologies: ['Android', 'Kotlin', 'React Native', 'Firebase'],
      displayOrder: 2,
      published: true,
    },
    {
      id: 'erp-business',
      number: '03',
      title: 'ERP & Business Software',
      description: 'Custom ERPs, multi-warehouse inventory systems, GST billing software, and unified operational dashboards for Indian enterprises.',
      fullDescription: 'Replace chaotic spreadsheets and off-the-shelf software with tailored operational engines. We build custom ERPs that connect your inventory, GST billing, multi-branch warehouses, and executive reporting into one single source of truth.',
      iconName: 'BarChart3',
      features: ['GST-Compliant Invoicing', 'Multi-Warehouse Inventory', 'Role-Based Access Control', 'Automated Daily Ledgers'],
      technologies: ['Node.js', 'PostgreSQL', 'Express', 'React', 'Docker'],
      displayOrder: 3,
      published: true,
    },
    {
      id: 'ai-automation',
      number: '04',
      title: 'AI & Automation',
      description: 'Practical business workflow automation, document intelligence, customer triage bots, and internal productivity copilot engines.',
      fullDescription: 'Harness the power of modern machine learning and language models without the hype. We integrate semantic vector search, automated invoice extraction, smart customer support routing, and internal workflow automations directly into your software.',
      iconName: 'Sparkles',
      features: ['Document Text Extraction', 'Intelligent Workflow Triage', 'Vector Semantic Search', 'Internal Copilot Tools'],
      technologies: ['Python', 'Gemini API', 'LangChain', 'FastAPI', 'PostgreSQL'],
      displayOrder: 4,
      published: true,
    },
    {
      id: 'ui-ux-design',
      number: '05',
      title: 'UI/UX Design',
      description: 'Clean, intuitive, and accessible digital interfaces crafted with disciplined typographic hierarchy and mathematical spatial layout.',
      fullDescription: 'Great software starts with empathetic, human-centric design. We craft design systems, component libraries, and interactive high-fidelity prototypes that Indian users find effortless to navigate on any mobile or desktop screen.',
      iconName: 'Layout',
      features: ['Accessible Design Systems', 'Interactive Prototyping', 'Indian User Flow Optimization', 'High-Converting Checkout Funnels'],
      technologies: ['Figma', 'Design Tokens', 'Tailwind CSS', 'WCAG AA Standards'],
      displayOrder: 5,
      published: true,
    },
    {
      id: 'cloud-digital',
      number: '06',
      title: 'Cloud & Digital Solutions',
      description: 'Resilient cloud infrastructure, automated CI/CD deployment pipelines, database management, and ongoing software maintenance retainers.',
      fullDescription: 'We provide full lifecycle cloud architecture and technical support. From migrating legacy servers to automated cloud hosting, SSL configurations, security auditing, and continuous post-launch performance monitoring.',
      iconName: 'Cloud',
      features: ['Zero-Downtime Deployments', 'Database Backup & Replication', 'API Gateways & Microservices', '24/7 Server Health Monitoring'],
      technologies: ['AWS', 'Google Cloud', 'Docker', 'Linux', 'Vercel'],
      displayOrder: 6,
      published: true,
    },
  ];

  const activeServices = (services && services.length > 0)
    ? services.filter((s) => s.published !== false).sort((a, b) => a.displayOrder - b.displayOrder)
    : fallbackServices;

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-[#F97316]" />;
      case 'barchart3':
      case 'erp':
        return <BarChart3 className="w-5 h-5 text-[#15803D]" />;
      case 'sparkles':
      case 'ai':
        return <Sparkles className="w-5 h-5 text-[#D4A72C]" />;
      case 'layout':
      case 'design':
        return <Layout className="w-5 h-5 text-[#0B1F3A]" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-[#0284C7]" />;
      case 'globe':
      default:
        return <Globe className="w-5 h-5 text-[#F97316]" />;
    }
  };

  const getServicePath = (service: ServiceCMS): string => {
    const id = service.id?.toLowerCase() || '';
    if (id.includes('web-dev') || id.includes('website')) return '/web-development';
    if (id.includes('ui-ux') || id.includes('design')) return '/web-design';
    if (id.includes('erp') || id.includes('billing')) return '/erp-development';
    if (id.includes('mobile') || id.includes('app')) return '/web-application-development';
    if (id.includes('custom') || id.includes('software')) return '/custom-software';
    return '/software-development';
  };

  const handleCardClick = (service: ServiceCMS) => {
    if (onSelectService) {
      onSelectService(service.title);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">CORE CAPABILITIES</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            What We Build
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            Technology solutions designed around real business needs.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group card-warm card-warm-hover rounded-2xl p-7 flex flex-col justify-between bg-white relative cursor-pointer"
              onClick={() => handleCardClick(service)}
            >
              <div>
                {/* Header: Icon & Editorial Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/8 shadow-2xs group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0B1F3A]/40 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-[#0B1F3A] mb-3 group-hover:text-[#F97316] transition-colors">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-sm text-[#0B1F3A]/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key feature list */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6 pt-4 border-t border-[#0B1F3A]/6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#0B1F3A]/80">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-[#0B1F3A]/6 flex items-center justify-between text-xs font-bold text-[#0B1F3A]">
                <a
                  href={getServicePath(service)}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.history.pushState({}, '', getServicePath(service));
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] hover:underline cursor-pointer"
                >
                  Explore Details →
                </a>
                <div className="flex items-center gap-1.5 group-hover:text-[#F97316] transition-colors">
                  <span>Start Project</span>
                  <div className="w-6 h-6 rounded-full bg-[#0B1F3A]/5 group-hover:bg-[#F97316] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
