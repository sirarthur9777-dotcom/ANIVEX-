import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECHNOLOGIES } from '../data/companyData';
import { Sparkles, Code2, Globe, Server, Terminal, FileCode, Cpu, Smartphone, Flame, Cloud, Database, Network } from 'lucide-react';

const techIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-[#F59E0B]" />,
  Code2: <Code2 className="w-5 h-5 text-[#F59E0B]" />,
  Globe: <Globe className="w-5 h-5 text-[#F59E0B]" />,
  Server: <Server className="w-5 h-5 text-[#F59E0B]" />,
  Terminal: <Terminal className="w-5 h-5 text-[#F59E0B]" />,
  FileCode: <FileCode className="w-5 h-5 text-[#F59E0B]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F59E0B]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#F59E0B]" />,
  Flame: <Flame className="w-5 h-5 text-[#F59E0B]" />,
  Cloud: <Cloud className="w-5 h-5 text-[#F59E0B]" />,
  Database: <Database className="w-5 h-5 text-[#F59E0B]" />,
  Network: <Network className="w-5 h-5 text-[#F59E0B]" />,
};

export const Technologies: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Frontend & Full-stack', 'Backend', 'Core Language', 'Data & AI', 'Infrastructure'];

  const filteredTech = filterCategory === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter(t => t.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory.includes(t.category));

  return (
    <section id="technologies" className="py-24 relative bg-[#0B1120] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm">
            <span>🇮🇳</span>
            <span>PROVEN ENGINEERING STACK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Built With <span className="text-gold-gradient">Modern, Fast Tech</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base font-normal leading-relaxed">
            Reliable, battle-tested technologies that run fast on low-speed 4G networks, mobile browsers, and modern devices across India.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0F172A] shadow-md'
                  : 'bg-[#1E293B] text-slate-300 border border-white/10 hover:border-[#F59E0B]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Badges / Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTech.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 flex items-start gap-4 shadow-md group"
            >
              <div className="p-3 rounded-2xl bg-[#1E293B] border border-white/5 text-[#F59E0B] group-hover:scale-105 transition-transform shrink-0">
                {techIcons[tech.iconName]}
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-[#F59E0B] transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] text-amber-300 block mb-1">
                  {tech.category}
                </span>
                <p className="text-[11px] text-slate-300 leading-tight line-clamp-2">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
