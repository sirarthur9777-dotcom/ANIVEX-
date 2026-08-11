import {
  ServiceItem,
  ProductItem,
  SolutionCategory,
  ProcessStep,
  TechItem,
  ProjectItem,
  WhyAnivexCard,
  CaseStudy
} from '../types';

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const TRUST_ITEMS = [
  { label: 'Software Development', icon: 'Code' },
  { label: 'AI Solutions', icon: 'Sparkles' },
  { label: 'Web & Mobile', icon: 'Smartphone' },
  { label: 'Business Automation', icon: 'Zap' },
  { label: 'Cloud Technology', icon: 'Cloud' },
];

export const ABOUT_STATS = [
  { number: '01', label: 'Strategy', desc: 'Architecture & Scoping' },
  { number: '02', label: 'Design', desc: 'Human-Centered UX/UI' },
  { number: '03', label: 'Development', desc: 'High-Performance Engineering' },
  { number: '04', label: 'Launch & Support', desc: 'Sustained Maintenance & Growth' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software',
    description: 'Business applications designed around specific workflows and complex operational requirements.',
    iconName: 'Cpu',
    features: ['Tailored Business Logic', 'High Scalability', 'System Integration', 'Enterprise APIs'],
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Development',
    description: 'Fast, responsive and scalable websites and web applications built for speed and security.',
    iconName: 'Globe',
    features: ['React & Next.js Platforms', 'Performance Optimization', 'SEO Architecture', 'Server-Side Rendering'],
  },
  {
    id: 'mobile-applications',
    number: '03',
    title: 'Mobile Applications',
    description: 'Modern Android and cross-platform mobile experiences with fluid native interactions.',
    iconName: 'Smartphone',
    features: ['Android Native & Kotlin', 'Cross-Platform Frameworks', 'Offline Synchronization', 'Biometric Security'],
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & Automation',
    description: 'AI-powered systems, intelligent digital assistants, and business workflow automation.',
    iconName: 'Sparkles',
    features: ['LLM Integration', 'Predictive Workflows', 'Document Intelligence', 'RAG & Vector Search'],
  },
  {
    id: 'erp-business',
    number: '05',
    title: 'ERP & Business Solutions',
    description: 'Custom ERPs, operational dashboards, management systems and automated business tools.',
    iconName: 'BarChart3',
    features: ['Real-Time Analytics', 'Role-Based Permissions', 'Inventory & Operations', 'Automated Reporting'],
  },
  {
    id: 'ui-ux-design',
    number: '06',
    title: 'UI/UX Design',
    description: 'Clean, intuitive and conversion-focused digital experiences built on mathematical grid systems.',
    iconName: 'Layout',
    features: ['Design Systems', 'Interactive Prototypes', 'Accessibility (WCAG)', 'Usability Audits'],
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'policyhub',
    name: 'PolicyHub',
    tagline: 'Smart Policy & Document Management',
    description: 'A modern platform designed to organize, manage, govern, and access important policies and business compliance documents securely with intelligent search.',
    status: 'Available',
    badge: 'Enterprise Platform',
    features: ['Document Versioning', 'Granular Access Control', 'AI Search Engine', 'Audit Trail Logging'],
    actionLabel: 'View Product →',
  },
  {
    id: 'anivex-ai',
    name: 'ANIVEX AI',
    tagline: 'Intelligent Digital Assistant',
    description: 'An AI-powered assistant designed to interact naturally with users, handle document contexts, and help automate everyday business and digital tasks.',
    status: 'Coming Soon',
    badge: 'Flagship AI Engine',
    features: ['Natural Conversation', 'Contextual Reasoning', 'Multi-System Integration', 'Task Automation'],
    actionLabel: 'Try Live Demo →',
    isInteractive: true,
  },
  {
    id: 'anivex-ops',
    name: 'ANIVEX OpsGrid',
    tagline: 'Next-Gen Enterprise Resource Dashboard',
    description: 'Unified operational monitoring workspace uniting business analytics, team permissions, and real-time process execution into one clean display.',
    status: 'In Development',
    badge: 'Upcoming Product',
    features: ['Modular Widgets', 'Telemetry Stream', 'Custom Connectors', 'Real-time Alerts'],
    actionLabel: 'Learn More →',
  },
];

export const SOLUTIONS: SolutionCategory[] = [
  {
    id: 'for-businesses',
    title: 'For Businesses',
    subtitle: 'Streamline operations & modernize core technology',
    targetAudience: 'Established Companies & Enterprises',
    description: 'Custom software, custom ERP systems, process automation engines, and unified analytical dashboards tailored to complex company workflows.',
    highlights: ['Custom ERP & CRM Systems', 'Automated Workflow Engines', 'Multi-System API Integrations', 'Data Security Protocols'],
    iconName: 'Building2',
  },
  {
    id: 'for-startups',
    title: 'For Startups',
    subtitle: 'Move fast with reliable production technology',
    targetAudience: 'Founders & Emerging Teams',
    description: 'High-speed MVP development, scalable SaaS product architecture, conversion-driven UI/UX design, and dedicated technical consulting.',
    highlights: ['Rapid Product MVP Launch', 'Cloud-Native Scalability', 'Polished Modern UI/UX', 'Technical Co-Pilot Scoping'],
    iconName: 'Rocket',
  },
  {
    id: 'for-institutions',
    title: 'For Institutions',
    subtitle: 'Secure, compliant & scalable digital infrastructure',
    targetAudience: 'Educational & Public Entities',
    description: 'Robust institutional portals, document governance management systems, role-based access portals, and compliant digital infrastructure.',
    highlights: ['Policy & Document Governance', 'High-Security Standards', 'Audit-Ready Infrastructure', 'Role-Based Access Portals'],
    iconName: 'ShieldCheck',
  },
  {
    id: 'for-individuals',
    title: 'For Individuals',
    subtitle: 'Elevate your personal brand & digital presence',
    targetAudience: 'Professionals & Creators',
    description: 'Bespoke web platforms, custom mobile tools, personal productivity software, and polished digital experiences.',
    highlights: ['High-Impact Web Design', 'Personal Productivity Tools', 'Mobile Applications', 'Optimized Performance'],
    iconName: 'UserCheck',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the problem, requirements and business goals.',
    details: 'We conduct deep technical discovery workshops to map user journeys, outline core requirements, and define non-functional constraints.',
  },
  {
    number: '02',
    title: 'Strategize',
    description: 'Create the technical and product roadmap.',
    details: 'We formulate the system architecture, select optimal tech stacks, design database schemas, and establish milestone sprint plans.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Build the UX/UI and product experience.',
    details: 'Our design team creates responsive wireframes, design systems, interactive prototypes, and accessible user interfaces.',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Engineer the solution using modern technologies.',
    details: 'Engineers construct clean, modular code with comprehensive type safety, CI/CD pipelines, and robust server architecture.',
  },
  {
    number: '05',
    title: 'Test',
    description: 'Validate performance, security and usability.',
    details: 'Rigorous end-to-end testing, security audits, load testing, and cross-browser quality assurance ensure zero defect deployment.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Deploy, monitor and continuously improve.',
    details: 'We execute zero-downtime production deployment, configure live monitoring, and offer sustained post-launch support.',
  },
];

export const TECHNOLOGIES: TechItem[] = [
  { name: 'AI & Machine Learning', category: 'Intelligence', description: 'LLM fine-tuning, RAG, and intelligent search systems', iconName: 'Sparkles' },
  { name: 'React', category: 'Frontend', description: 'Declarative component architecture for interactive UIs', iconName: 'Code2' },
  { name: 'Next.js', category: 'Frontend & Full-stack', description: 'Server-side rendering, static generation, and API routes', iconName: 'Globe' },
  { name: 'Node.js', category: 'Backend', description: 'High-performance asynchronous server runtime', iconName: 'Server' },
  { name: 'JavaScript', category: 'Core Language', description: 'Dynamic web and server ecosystem capabilities', iconName: 'Terminal' },
  { name: 'TypeScript', category: 'Core Language', description: 'Strict type safety for large-scale enterprise codebases', iconName: 'FileCode' },
  { name: 'Python', category: 'Data & AI', description: 'Data processing, automation scripts, and ML frameworks', iconName: 'Cpu' },
  { name: 'Android', category: 'Mobile Platform', description: 'Native Kotlin application development', iconName: 'Smartphone' },
  { name: 'Firebase', category: 'Cloud Infrastructure', description: 'Real-time database, authentication, and hosting', iconName: 'Flame' },
  { name: 'Cloud Infrastructure', category: 'DevOps & Hosting', description: 'Scalable container deployments and serverless architecture', iconName: 'Cloud' },
  { name: 'MySQL', category: 'Relational Database', description: 'Structured relational data storage and transactional integrity', iconName: 'Database' },
  { name: 'REST & GraphQL APIs', category: 'Integrations', description: 'Robust contract-first API gateways and microservices', iconName: 'Network' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'policyhub-project',
    name: 'PolicyHub',
    category: 'SaaS Platform & Enterprise Product',
    description: 'A modern platform designed to organize, manage, govern, and access important corporate policies and business compliance documents.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'AI Vector Search'],
    featured: true,
    imageBg: 'from-amber-950/40 via-slate-900 to-[#0B0F16]',
    stats: 'Enterprise Ready',
    details: {
      clientType: 'ANIVEX Flagship Product',
      timeline: '2025 – Active',
      overview: 'Engineered from the ground up to solve corporate document clutter, PolicyHub integrates fine-grained permission control, automated document lifecycle management, and instant semantic search.',
    },
  },
  {
    id: 'nexus-erp',
    name: 'Nexus Operations Portal',
    category: 'Custom ERP & Business Automation',
    description: 'Unified operational dashboard designed for multi-branch inventory tracking, workforce allocation, and automated financial auditing.',
    techStack: ['Next.js', 'TypeScript', 'Express', 'MySQL', 'Tailwind CSS'],
    featured: false,
    imageBg: 'from-slate-900 via-[#0B0F16] to-zinc-950',
    stats: 'Multi-Branch System',
    details: {
      clientType: 'Commercial Enterprise System',
      timeline: '4 Months Development',
      overview: 'Replaced 5 legacy spreadsheets with a real-time web portal that processes stock updates and generates automated compliance reports.',
    },
  },
  {
    id: 'aura-health-app',
    name: 'Aura Mobile Companion',
    category: 'Mobile Application (Android)',
    description: 'Cross-platform mobile experience featuring offline biometric sync, health metric visualizers, and instant appointment booking.',
    techStack: ['Android', 'TypeScript', 'Firebase', 'REST APIs'],
    featured: false,
    imageBg: 'from-blue-950/30 via-[#0B0F16] to-slate-950',
    stats: 'Android & Cross-Platform',
    details: {
      clientType: 'Healthcare Provider',
      timeline: '3 Months Development',
      overview: 'Built with offline-first synchronization to ensure patient medical summaries remain available even in low-connectivity environments.',
    },
  },
];

export const WHY_ANIVEX_CARDS: WhyAnivexCard[] = [
  {
    title: 'Built For Real Problems',
    description: 'We focus on practical, production-grade technology that solves operational bottlenecks and delivers measurable business value.',
    iconName: 'Target',
  },
  {
    title: 'Scalable Architecture',
    description: 'Systems are architected from day one with future growth, high traffic concurrency, and clean modularity in mind.',
    iconName: 'Layers',
  },
  {
    title: 'Human-Centered Design',
    description: 'Technology should be powerful without becoming complicated. We craft clear visual hierarchies and intuitive user journeys.',
    iconName: 'Sparkles',
  },
  {
    title: 'Security First',
    description: 'Security, data protection, strict role permissions, and compliance guidelines are embedded throughout our development lifecycle.',
    iconName: 'Shield',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We don’t disappear after deployment. We provide post-launch optimization, system monitoring, and continuous product evolution.',
    iconName: 'Clock',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Centralizing Enterprise Compliance & Document Access',
    industry: 'Enterprise Software & Compliance',
    problem: 'Dispersed corporate policy PDFs across legacy drives led to audit delays, version confusion, and employee non-compliance.',
    solution: 'Designed and deployed PolicyHub, a centralized web platform featuring semantic search, automated access permissions, and document version tracking.',
    technology: ['React', 'Node.js', 'AI Vector Search', 'Firebase'],
    result: 'Streamlined document discovery and ensured 100% audit-trail compliance across internal business units.',
  },
  {
    id: 'case-2',
    title: 'Automating Multi-Channel Order Scoping & ERP Workflows',
    industry: 'Logistics & Supply Chain',
    problem: 'Manual data entry between warehouse inventory logs and sales portals resulted in order fulfillment bottlenecks and stock count errors.',
    solution: 'Built a custom ERP suite with web dashboard, real-time inventory webhooks, and role-based permissions for warehouse staff.',
    technology: ['Next.js', 'TypeScript', 'MySQL', 'Express'],
    result: 'Eliminated manual inventory reconciliation delays and established real-time stock visibility for managers.',
  },
];
