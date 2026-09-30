import React from 'react';
import { motion } from 'motion/react';
import { Quote, Building2, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { TestimonialCMS } from '../types/cms';

export const Testimonials: React.FC = () => {
  const { testimonials } = useCms();

  const fallbackTestimonials: TestimonialCMS[] = [
    {
      id: 'test-1',
      customerName: 'Rajesh Varma',
      company: 'Apex Logistics & Freight',
      designation: 'Managing Director',
      profileImage: '',
      testimonial: 'Anivex Solution built our multi-branch inventory and dispatch management system in record time. Their deep understanding of Indian GST billing and local warehouse operations made the whole transition seamless.',
      rating: 5,
      featured: true,
      published: true,
      displayOrder: 1,
    },
    {
      id: 'test-2',
      customerName: 'Priya Sundaram',
      company: 'FinTrack Digital',
      designation: 'Co-Founder & COO',
      profileImage: '',
      testimonial: 'The level of craftsmanship Krishndas and the Anivex Solution team deliver is exceptional. Clean architecture, lightning-fast UI, and zero fluff. They are our go-to technology engineering partner.',
      rating: 5,
      featured: true,
      published: true,
      displayOrder: 2,
    },
    {
      id: 'test-3',
      customerName: 'Amitabh Sharma',
      company: 'MedSecure Health Systems',
      designation: 'Head of Technology',
      profileImage: '',
      testimonial: 'From architecture scoping to high-speed MVP deployment, Anivex Solution delivered exactly what was promised. Their responsive WhatsApp support and sprint accountability are top-tier.',
      rating: 5,
      featured: true,
      published: true,
      displayOrder: 3,
    },
  ];

  const activeTestimonials = (testimonials && testimonials.length > 0)
    ? testimonials.filter((t) => t.published !== false).sort((a, b) => a.displayOrder - b.displayOrder)
    : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-24 bg-white relative border-t border-[#0B1F3A]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">CLIENT EXPERIENCES</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Trusted by Indian Enterprises & Founders
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            What directors, operations heads, and business leaders say about partnering with Anivex Solution.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="card-warm card-warm-hover rounded-2xl p-7 bg-[#FFFDF7] flex flex-col justify-between"
            >
              <div>
                {/* Verified Engagement Badge & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#15803D]/10 text-[#15803D] text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Client Engagement</span>
                  </span>
                  <Quote className="w-6 h-6 text-[#0B1F3A]/15" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-[#0B1F3A]/85 leading-relaxed font-normal italic mb-6">
                  "{item.testimonial}"
                </p>
              </div>

              {/* Author Lockup (Zero-Pill clean typography) */}
              <div className="pt-4 border-t border-[#0B1F3A]/6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    {item.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0B1F3A]">
                      {item.customerName}
                    </h4>
                    <p className="text-xs text-[#0B1F3A]/60">
                      {item.designation}, {item.company}
                    </p>
                  </div>
                </div>

                <Building2 className="w-4 h-4 text-[#0B1F3A]/40" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
