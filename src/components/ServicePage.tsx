import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  Phone,
  Layers,
  Cpu,
  Globe,
  MapPin,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ServiceSeoItem } from '../data/servicesSeoData';
import { SeoHead } from './SeoHead';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl, formatPhoneTel } from '../services/websiteSettings';

interface ServicePageProps {
  service: ServiceSeoItem;
  onNavigateHome: () => void;
  onNavigateService: (path: string) => void;
  onNavigateContact: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigateContact,
}) => {
  const { websiteSettings, companyInfo } = useCms();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const phone = websiteSettings?.phone || companyInfo?.phone || '7905668826';
  const whatsappUrl = formatWhatsAppUrl(
    websiteSettings?.whatsapp || phone,
    `Namaste Anivex Solution! I am inquiring about your ${service.title} services.`
  );
  const phoneTel = formatPhoneTel(phone);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Build JSON-LD structured data for this service page
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://anivexsolution.in/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Services',
            'item': 'https://anivexsolution.in/#services'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': service.title,
            'item': `https://anivexsolution.in${service.path}`
          }
        ]
      },
      {
        '@type': 'Service',
        'name': `${service.title} Services`,
        'serviceType': service.title,
        'description': service.metaDescription,
        'provider': {
          '@type': 'Organization',
          'name': 'Anivex Solution',
          'url': 'https://anivexsolution.in/',
          'telephone': '+91 79056 68826',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Lucknow',
            'addressLocality': 'Lucknow',
            'addressRegion': 'Uttar Pradesh',
            'postalCode': '226010',
            'addressCountry': 'IN'
          }
        },
        'areaServed': [
          { '@type': 'Country', 'name': 'India' },
          { '@type': 'State', 'name': 'Uttar Pradesh' },
          { '@type': 'City', 'name': 'Lucknow' },
          { '@type': 'City', 'name': 'Varanasi' },
          { '@type': 'City', 'name': 'Jaunpur' }
        ],
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'price': 'Contact for Custom Proposal',
          'url': `https://anivexsolution.in${service.path}`
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': service.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#0B1F3A] font-sans selection:bg-[#F97316]/20 selection:text-[#F97316]">
      {/* Dynamic SEO Head Management */}
      <SeoHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={service.path}
        schema={serviceSchema}
      />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#0B1F3A]/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#0B1F3A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] flex items-center justify-center p-1 shadow-xs group-hover:bg-[#F97316] transition-colors">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <path
                    d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 32,22 L 68,78"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-lg text-[#0B1F3A] tracking-tight">
                Anivex <span className="text-[#F97316]">Solution</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="flex items-center flex-wrap gap-2 text-xs font-medium text-[#0B1F3A]/60">
            <li>
              <button
                onClick={onNavigateHome}
                className="hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#0B1F3A]/40" />
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="hover:text-[#F97316] transition-colors cursor-pointer"
              >
                Services
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-[#0B1F3A]/40" />
            </li>
            <li className="text-[#0B1F3A] font-bold" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>

        {/* Hero Section of Service */}
        <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white via-[#FFFDF7] to-white border border-[#0B1F3A]/10 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F97316]/10 via-[#D4A72C]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-bold text-[#0B1F3A]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              <span>{service.badge}</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0B1F3A] tracking-tight leading-tight">
              {service.h1}
            </h1>

            <p className="text-base sm:text-lg text-[#0B1F3A]/75 font-normal leading-relaxed">
              {service.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-sm cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Overview */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F97316] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Architecture & Approach</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
            Engineering Philosophy & Overview
          </h2>
          <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed max-w-4xl">
            {service.overview}
          </p>
        </section>

        {/* Key Deliverables Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#15803D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Core Deliverables</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 text-[#F97316] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#0B1F3A]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Benefits */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0B1F3A] text-white space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A72C]">
              MEASURABLE ADVANTAGES
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Why Indian Businesses Choose Anivex Solution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                <h3 className="font-heading font-bold text-sm text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 text-xs text-slate-300/80 leading-relaxed">
            <p>
              <strong className="text-white">Regional Focus:</strong> {service.localContext}
            </p>
          </div>
        </section>

        {/* Real-World Use Cases */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F97316] uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>Industry Practical Scenarios</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
              Real-World Use Cases & Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#0B1F3A]/5 text-[11px] font-bold text-[#0B1F3A]">
                    {useCase.industry}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#0B1F3A]">
                    Operational Challenge
                  </h3>
                  <p className="text-xs text-[#0B1F3A]/70 leading-relaxed">
                    {useCase.scenario}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0B1F3A]/10">
                  <span className="text-[10px] font-mono uppercase text-[#15803D] font-bold block mb-1">
                    DELIVERED IMPACT
                  </span>
                  <p className="text-xs text-[#0B1F3A] font-semibold">
                    {useCase.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#0B1F3A]">
            Technologies & Tools Employed
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-slate-100 border border-[#0B1F3A]/10 text-xs font-mono font-medium text-[#0B1F3A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Service FAQs with Schema */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F97316] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
              Questions About {service.title}
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#0B1F3A]/10 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-[#0B1F3A] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#F97316] shrink-0 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#0B1F3A]/75 leading-relaxed border-t border-[#0B1F3A]/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Services Internal Links */}
        <section className="p-6 rounded-2xl bg-slate-50 border border-[#0B1F3A]/10 space-y-4">
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#0B1F3A]/70">
            Explore Related Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {service.relatedServices.map((rel) => (
              <button
                key={rel.path}
                type="button"
                onClick={() => onNavigateService(rel.path)}
                className="p-3.5 rounded-xl bg-white hover:bg-[#0B1F3A] hover:text-white border border-[#0B1F3A]/10 text-left text-xs font-bold text-[#0B1F3A] flex items-center justify-between transition-colors shadow-xs cursor-pointer group"
              >
                <span>{rel.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F97316] group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </section>

        {/* Conversion CTA Footer Banner */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#12233C] to-[#0B1F3A] text-white text-center space-y-5">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Ready to Build Your {service.title} Project?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reach out to our engineering team in Uttar Pradesh today for a comprehensive, transparent project scope discussion and quotation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateContact}
              className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Start Your Project Conversation
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#15803D]" />
              <span>WhatsApp: +91 {phone}</span>
            </a>
          </div>
        </section>

      </main>

      {/* Standard Footer */}
      <footer className="mt-16 bg-[#0B1F3A] text-slate-400 py-10 border-t border-white/10 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="text-slate-300 font-semibold">
            © 2026 Anivex Solution. All Rights Reserved. Built with pride in India.
          </p>
          <p className="text-slate-400 text-[11px]">
            Serving enterprises in Lucknow, Varanasi, Jaunpur, Uttar Pradesh, and nationwide.
          </p>
        </div>
      </footer>
    </div>
  );
};
