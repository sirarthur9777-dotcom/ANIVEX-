import React, { useState } from 'react';
import { 
  ArrowLeft, 
  GraduationCap, 
  User, 
  Award, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Code2, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Check 
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl } from '../services/websiteSettings';
import { SeoHead } from './SeoHead';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';

interface AboutFounderPageProps {
  onBackToHome: () => void;
  onNavigateService?: (path: string) => void;
  onNavigateContact?: () => void;
}

export const AboutFounderPage: React.FC<AboutFounderPageProps> = ({
  onBackToHome,
  onNavigateService,
  onNavigateContact,
}) => {
  const { siteContent, companyInfo, websiteSettings } = useCms();
  const [activePhoto, setActivePhoto] = useState<0 | 1>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const founderName = siteContent.founderName || "Krishndas Chauhan";
  const founderRole = siteContent.founderRole || "Founder & Lead Architect";
  const founderOrg = siteContent.founderOrganization || "Anivex Solution";
  const founderAge = siteContent.founderAge || "21";
  const founderQualifications = siteContent.founderQualifications || "MCA";

  const photoFormal = siteContent.founderImage || "/images/krishndas-chauhan-founder-anivex-solution.jpeg";
  const photoCasual = siteContent.founderSecondaryImage || "/images/krishndas-chauhan-anivex-solution.jpeg";

  const photos = [
    {
      src: photoFormal,
      label: 'Executive & Architecture',
      tag: 'Formal Executive Portrait',
      alt: 'Krishndas Chauhan - Founder & Lead Architect of Anivex Solution in formal suit',
      description: 'Formal portrait representing executive leadership, enterprise software architecture, and technology direction at Anivex Solution.'
    },
    {
      src: photoCasual,
      label: 'Creative & Tech Vision',
      tag: 'Field & Innovation Portrait',
      alt: 'Krishndas Chauhan - Technology innovator and lead architect with headphones',
      description: 'Dynamic portrait representing hands-on full-stack development, modern product craftsmanship, and digital engineering.'
    }
  ];

  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '+91 9119069399';
  const whatsappUrl = formatWhatsAppUrl(
    phone,
    `Namaste Krishndas Sir, I am visiting your official profile on Anivex Solution (anivexsolution.in/aboutfounder) and would like to discuss a technology project.`
  );

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${founderName} - Founder & Lead Architect | ${founderOrg}`,
          text: `Official profile and biography of ${founderName}, ${founderRole} of ${founderOrg}.`,
          url: url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const founderSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://anivexsolution.in/aboutfounder#profilepage",
        "url": "https://anivexsolution.in/aboutfounder",
        "name": `${founderName} - Founder & Lead Architect | ${founderOrg}`,
        "description": `Official profile and verified biography of ${founderName}, ${founderRole} of ${founderOrg}.`,
        "mainEntity": {
          "@id": "https://anivexsolution.in/#krishndas-chauhan"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg",
          "caption": `${founderName} - Founder & Lead Architect of ${founderOrg}`,
          "representativeOfPage": true,
          "width": 1080,
          "height": 1350
        }
      },
      {
        "@type": "Person",
        "@id": "https://anivexsolution.in/#krishndas-chauhan",
        "name": founderName,
        "alternateName": [
          "Founder of Anivex Solution",
          "Who is Krishndas Chauhan",
          "Krishndas Chauhan Anivex",
          "Krishndas Chauhan MCA",
          "Krishndas Chauhan BCA",
          "Krishndas Chauhan Founder",
          "Krishndas Chauhan Lead Architect",
          "Krishna Das Chauhan",
          "Er. Krishndas Chauhan"
        ],
        "givenName": "Krishndas",
        "familyName": "Chauhan",
        "gender": "https://schema.org/Male",
        "jobTitle": founderRole,
        "worksFor": {
          "@type": "Organization",
          "name": founderOrg,
          "url": "https://anivexsolution.in/"
        },
        "url": "https://anivexsolution.in/aboutfounder",
        "mainEntityOfPage": "https://anivexsolution.in/aboutfounder",
        "image": [
          "https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg",
          "https://anivexsolution.in/images/krishndas-chauhan-anivex-solution.jpeg"
        ],
        "description": `${founderName} (Age: ${founderAge}) is the ${founderRole} of ${founderOrg}. He holds a Master of Computer Applications (MCA) from Mangalayatan University and a Bachelor of Computer Applications (BCA) from APCS College of IT & Management.`,
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Mangalayatan University",
            "description": "Master of Computer Applications (MCA)"
          },
          {
            "@type": "CollegeOrUniversity",
            "name": "APCS College of IT & Management",
            "description": "Bachelor of Computer Applications (BCA)"
          }
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Master of Computer Applications (MCA)",
            "credentialCategory": "degree"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Bachelor of Computer Applications (BCA)",
            "credentialCategory": "degree"
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/in/krishndas-chauhan",
          "https://github.com/krishndas-chauhan",
          "https://x.com/krishndas_",
          "https://twitter.com/krishndas_",
          "https://www.instagram.com/krishndas_chauhan",
          "https://www.facebook.com/krishndas.chauhan",
          "https://anivexsolution.in/aboutfounder"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://anivexsolution.in/aboutfounder#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is the founder of Anivex Solution?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Krishndas Chauhan is the Founder and Lead Architect of Anivex Solution. He holds a Master of Computer Applications (MCA) from Mangalayatan University and a Bachelor of Computer Applications (BCA) from APCS College of IT & Management."
            }
          },
          {
            "@type": "Question",
            "name": "Who is Krishndas Chauhan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Krishndas Chauhan is an Indian software engineer and technology architect, serving as Founder and Lead Architect of Anivex Solution. He architects custom web systems, ERP platforms, and cloud applications."
            }
          },
          {
            "@type": "Question",
            "name": "What are the educational qualifications of Krishndas Chauhan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Krishndas Chauhan holds a Master of Computer Applications (MCA) from Mangalayatan University and a Bachelor of Computer Applications (BCA) from APCS College of IT & Management."
            }
          },
          {
            "@type": "Question",
            "name": "What is Krishndas Chauhan's age and organization?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Krishndas Chauhan is 21 years old and is the Founder & Lead Architect of Anivex Solution."
            }
          }
        ]
      }
    ]
  };

  const handleDiscussProject = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      onBackToHome();
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#0B1F3A] flex flex-col selection:bg-[#F97316]/20 selection:text-[#F97316]">
      {/* Search Engine Optimization & Knowledge Graph Schema */}
      <SeoHead
        title="Krishndas Chauhan | Founder & Lead Architect | Anivex Solution"
        description="Official biography of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution. MCA from Mangalayatan University, BCA from APCS College of IT & Management. Technology leadership, enterprise software, and digital solutions."
        canonicalPath="/aboutfounder"
        ogType="profile"
        ogImage="/images/krishndas-chauhan-founder-anivex-solution.jpeg"
        ogImageAlt="Krishndas Chauhan - Founder & Lead Architect of Anivex Solution"
        ogImageWidth={1080}
        ogImageHeight={1350}
        twitterImage="/images/krishndas-chauhan-founder-anivex-solution.jpeg"
        author="Krishndas Chauhan"
        keywords="Krishndas Chauhan, Founder of Anivex Solution, Who is Krishndas Chauhan, Krishndas Chauhan MCA, Krishndas Chauhan BCA, Krishndas Chauhan age, Krishndas Chauhan Anivex, Founder & Lead Architect Krishndas Chauhan, Anivex Solution Founder"
        schema={founderSchema}
      />

      {/* Main Global Navigation */}
      <Navbar onNavigateService={onNavigateService} />

      {/* Breadcrumb & Quick Action Banner */}
      <section className="pt-24 pb-4 border-b border-[#0B1F3A]/8 bg-white/70 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#0B1F3A]/70">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0B1F3A] hover:text-[#F97316] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-[#0B1F3A]/30">/</span>
            <a
              href="/#about"
              onClick={(e) => {
                e.preventDefault();
                onBackToHome();
                setTimeout(() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              className="hover:text-[#F97316] transition-colors"
            >
              About
            </a>
            <span className="text-[#0B1F3A]/30">/</span>
            <span className="font-bold text-[#F97316] truncate max-w-[180px] sm:max-w-none">
              Krishndas Chauhan (Founder)
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0B1F3A]/10 hover:border-[#0B1F3A]/30 bg-white text-xs font-semibold text-[#0B1F3A] transition-all cursor-pointer shadow-2xs"
              title="Share or Copy Profile Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#15803D]" />
                  <span className="text-[#15803D]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#0B1F3A]/60" />
                  <span className="hidden sm:inline">Share Profile</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Profile Article Container with Schema.org Person Microdata */}
      <main
        id="main-content"
        itemScope
        itemType="https://schema.org/Person"
        className="flex-1 py-10 sm:py-16 relative"
      >
        <meta itemProp="url" content="https://anivexsolution.in/aboutfounder" />
        <meta itemProp="name" content={founderName} />
        <meta itemProp="jobTitle" content={founderRole} />
        <meta itemProp="worksFor" content={founderOrg} />
        <meta itemProp="image" content="https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg" />
        <link itemProp="sameAs" href="https://www.linkedin.com/in/krishndas-chauhan" />
        <link itemProp="sameAs" href="https://github.com/krishndas-chauhan" />
        <link itemProp="sameAs" href="https://x.com/krishndas_" />
        <link itemProp="sameAs" href="https://twitter.com/krishndas_" />
        <link itemProp="sameAs" href="https://www.instagram.com/krishndas_chauhan" />
        <link itemProp="sameAs" href="https://www.facebook.com/krishndas.chauhan" />

        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-5 w-96 h-96 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-xs font-bold text-[#F97316] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet Our Founder & Leadership</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight">
              {founderName}
            </h1>

            <p className="text-base sm:text-lg text-[#0B1F3A]/75 font-medium">
              <span className="font-bold text-[#0B1F3A]">{founderRole}</span>
              <span className="mx-2 text-[#0B1F3A]/30">•</span>
              <span className="text-[#F97316] font-extrabold">{founderOrg}</span>
            </p>
          </div>

          {/* Two-Column Grid: Visual Gallery (Left) & Core Biography (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Interactive Multi-Photo Showcase */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#0B1F3A] border-2 border-[#0B1F3A]/10 shadow-xl group">
                <img
                  src={photos[activePhoto].src}
                  alt={photos[activePhoto].alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  width="600"
                  height="800"
                />

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/60 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#D4A72C]">
                    {photos[activePhoto].tag}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {photos[activePhoto].label}
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-2 mt-1">
                    {photos[activePhoto].description}
                  </p>
                </div>
              </div>

              {/* Photo Selector Thumbnails */}
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(idx as 0 | 1)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      activePhoto === idx
                        ? 'border-[#F97316] bg-white ring-2 ring-[#F97316]/20 shadow-md'
                        : 'border-[#0B1F3A]/10 bg-white/70 hover:bg-white hover:border-[#0B1F3A]/25'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-12 h-12 rounded-xl object-cover object-top shrink-0 border border-[#0B1F3A]/10"
                    />
                    <div className="min-w-0 pr-1">
                      <div className="text-xs font-bold text-[#0B1F3A] truncate">
                        {idx === 0 ? 'Formal Studio' : 'Field Portrait'}
                      </div>
                      <div className="text-[10px] text-[#0B1F3A]/60 truncate font-medium">
                        {idx === 0 ? 'Blazer / Architecture' : 'Creative Tech'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Comprehensive Narrative & Qualifications */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* About the Founder Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#0B1F3A]/8">
                  <User className="w-5 h-5 text-[#F97316]" />
                  <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F3A]">
                    About the Founder
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#0B1F3A]/85 leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#0B1F3A] font-bold">{founderName}</strong> is the Founder and Lead Architect of{' '}
                    <strong className="text-[#0B1F3A] font-bold">{founderOrg}</strong>.
                  </p>

                  <p>
                    He holds a <strong className="text-[#0B1F3A] font-semibold">Master of Computer Applications (MCA)</strong> from{' '}
                    <strong className="text-[#0B1F3A] font-semibold">Mangalayatan University</strong> and a{' '}
                    <strong className="text-[#0B1F3A] font-semibold">Bachelor of Computer Applications (BCA)</strong>, both from{' '}
                    <strong className="text-[#0B1F3A] font-semibold">APCS College of IT & Management</strong>.
                  </p>

                  <p>
                    His educational background in computer applications provides a strong academic foundation for his professional journey in technology and his role at Anivex Solution.
                  </p>

                  <p>
                    As the driving force behind Anivex Solution, he focuses on high-performance full-stack web applications, scalable cloud backends, modern enterprise ERP systems, and secure IT solutions tailored for modern businesses across India and international markets.
                  </p>
                </div>
              </div>

              {/* Education & Qualifications */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#0B1F3A]/8">
                  <GraduationCap className="w-5 h-5 text-[#15803D]" />
                  <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F3A]">
                    Education & Qualifications
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* MCA Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/8 hover:border-[#15803D]/40 transition-colors">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#15803D]/10 text-[#15803D] text-[10px] font-extrabold uppercase tracking-wider mb-2">
                      Master Degree
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#0B1F3A]">
                      Master of Computer Applications (MCA)
                    </h3>
                    <p className="text-xs text-[#0B1F3A]/70 font-semibold mt-1">
                      Mangalayatan University
                    </p>
                    <p className="text-[11px] text-[#0B1F3A]/60 mt-2 font-normal leading-relaxed">
                      Advanced studies in distributed systems, software engineering methodologies, data structures, and enterprise architecture.
                    </p>
                  </div>

                  {/* BCA Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/8 hover:border-[#0B1F3A]/30 transition-colors">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0B1F3A]/10 text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-wider mb-2">
                      Bachelor Degree
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#0B1F3A]">
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className="text-xs text-[#0B1F3A]/70 font-semibold mt-1">
                      APCS College of IT & Management
                    </p>
                    <p className="text-[11px] text-[#0B1F3A]/60 mt-2 font-normal leading-relaxed">
                      Comprehensive grounding in computer science, database design, algorithmic problem solving, and application programming.
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Identity Specifications Grid */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#0B1F3A]/8">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-[#F97316]" />
                    <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F3A]">
                      Professional Identity
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-[#15803D] bg-[#15803D]/10 px-3 py-1 rounded-full">
                    Verified Leadership
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Full Legal Name
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {founderName}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Age
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {founderAge} Years
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Designation
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {founderRole}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Organization
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {founderOrg}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Academic Qualification
                    </span>
                    <span className="text-sm font-bold text-[#15803D]">
                      {founderQualifications}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-1">
                      Operating Jurisdiction
                    </span>
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      India & Global
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Discipline & Core Focus */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-[#0B1F3A]/8">
                  <Code2 className="w-5 h-5 text-[#F97316]" />
                  <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F3A]">
                    Architectural Discipline & Technical Philosophy
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F3A]">Zero Technical Bloat</h4>
                      <p className="text-[11px] text-[#0B1F3A]/70 mt-0.5">Focusing on high-speed execution, ultra-low latency, and resilient modular codebases.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F3A]">Business-Centric Architecture</h4>
                      <p className="text-[11px] text-[#0B1F3A]/70 mt-0.5">Every system is designed to generate measurable business ROI, customer trust, and long-term durability.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F3A]">Indian & Global Readiness</h4>
                      <p className="text-[11px] text-[#0B1F3A]/70 mt-0.5">Crafted with deep empathy for Indian operational workflows while meeting strict international security benchmarks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F3A]">Transparent Engineering</h4>
                      <p className="text-[11px] text-[#0B1F3A]/70 mt-0.5">Full intellectual property ownership, milestone-based deliveries, and clear technical roadmaps.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-bold transition-all shadow-sm hover:shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>

                <button
                  type="button"
                  onClick={handleDiscussProject}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white text-sm font-bold transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Discuss a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateToPrivacy={() => {
          window.history.pushState({}, '', '/privacy-policy');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        onNavigateToTerms={() => {
          window.history.pushState({}, '', '/terms-and-conditions');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        onNavigateToService={onNavigateService}
      />

      {/* Persistent Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};
