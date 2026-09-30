import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { FaqCMS } from '../types/cms';

export const FaqSection: React.FC = () => {
  const { faqs, companyInfo } = useCms();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const whatsappUrl = `https://wa.me/${phoneToUse}?text=${encodeURIComponent(
    'Namaste Anivex Solution! I have a question about your software development process.'
  )}`;

  const fallbackFaqs: FaqCMS[] = [
    {
      id: 'faq-1',
      question: 'What types of software solutions does Anivex Solution build?',
      answer: 'We design and develop custom web applications, Android & iOS mobile apps, custom ERP systems, GST-compliant billing software, and conversion-focused business websites.',
      category: 'General',
      displayOrder: 1,
      published: true,
    },
    {
      id: 'faq-2',
      question: 'How long does a typical project take to develop and launch?',
      answer: 'High-speed business websites and MVPs typically take 1 to 3 weeks. Comprehensive custom software or ERP solutions typically require 4 to 8 weeks depending on the complexity and scope.',
      category: 'Process',
      displayOrder: 2,
      published: true,
    },
    {
      id: 'faq-3',
      question: 'Do you provide GST tax invoices and Indian payment options?',
      answer: 'Yes, absolutely. We provide official GST tax invoices for all client engagements, and accept UPI (Google Pay, PhonePe, Paytm), IMPS/NEFT direct bank transfers, and standard business payment methods.',
      category: 'Billing',
      displayOrder: 3,
      published: true,
    },
    {
      id: 'faq-4',
      question: 'Will we have full ownership of the source code and IP?',
      answer: 'Yes. Upon project completion and handover, you receive 100% intellectual property ownership, complete source code repository access, and all associated deployment assets.',
      category: 'Ownership',
      displayOrder: 4,
      published: true,
    },
    {
      id: 'faq-5',
      question: 'What kind of support do you provide after launch?',
      answer: 'Every Anivex Solution engagement includes post-launch warranty support, bug fixes, server monitoring, and direct WhatsApp communication for rapid responses. We also offer ongoing maintenance retainers.',
      category: 'Support',
      displayOrder: 5,
      published: true,
    },
  ];

  const activeFaqs = (faqs && faqs.length > 0)
    ? faqs.filter((f) => f.published !== false).sort((a, b) => a.displayOrder - b.displayOrder)
    : fallbackFaqs;

  const categories = ['All', ...Array.from(new Set(activeFaqs.map((f) => f.category || 'General')))];

  const filteredFaqs = selectedCategory === 'All'
    ? activeFaqs
    : activeFaqs.filter((f) => (f.category || 'General') === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Clear Answers, Zero Jargon
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-xl font-normal leading-relaxed">
            Everything you need to know about engaging Anivex Solution for your next technology project.
          </p>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-1.5 p-1 bg-white border border-[#0B1F3A]/8 rounded-xl max-w-md mx-auto mb-10 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="card-warm rounded-xl overflow-hidden bg-white border border-[#0B1F3A]/8 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base text-[#0B1F3A]">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#F97316] text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-[#0B1F3A]/75 leading-relaxed border-t border-[#0B1F3A]/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#0B1F3A]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-heading font-bold text-sm text-[#0B1F3A]">
              Have a specific question about your project?
            </h4>
            <p className="text-xs text-[#0B1F3A]/60 mt-0.5">
              Talk directly with Krishndas Chauhan or our engineering team on WhatsApp.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp (+91)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
