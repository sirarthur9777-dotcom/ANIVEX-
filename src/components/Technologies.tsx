import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECHNOLOGIES } from '../data/companyData';
import { Sparkles, Code2, Globe, Server, Terminal, FileCode, Cpu, Smartphone, Flame, Cloud, Database, Network } from 'lucide-react';

const techIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-[#F5C85B]" />,
  Code2: <Code2 className="w-5 h-5 text-[#F5C85B]" />,
  Globe: <Globe className="w-5 h-5 text-[#F5C85B]" />,
  Server: <Server className="w-5 h-5 text-[#F5C85B]" />,
  Terminal: <Terminal className="w-5 h-5 text-[#F5C85B]" />,
  FileCode: <FileCode className="w-5 h-5 text-[#F5C85B]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#F5C85B]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#F5C85B]" />,
  Flame: <Flame className="w-5 h-5 text-[#F5C85B]" />,
  Cloud: <Cloud className="w-5 h-5 text-[#F5C85B]" />,
  Database: <Database className="w-5 h-5 text-[#F5C85B]" />,
  Network: <Network className="w-5 h-5 text-[#F5C85B]" />,
};

export const Technologies: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Frontend & Full-stack', 'Backend', 'Core Language', 'Data & AI', 'Infrastructure'];

  const filteredTech = filterCategory === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter(t => t.category.toLowerCase().includes(filterCategory.toLowerCase()) || filterCategory.includes(t.category));

  return (
    <section id="technologies" className="py-24 relative bg-[#0B0F16] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            PROVEN ENGINEERING STACK
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Built With <span className="text-gold-gradient">Modern Technology</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            We build software using industry-standard, high-performance tech stacks that guarantee long-term stability, speed, and cross-platform compatibility.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] shadow-md'
                  : 'bg-[#05070B] text-slate-300 border border-white/10 hover:border-white/20'
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F]/40 transition-all duration-300 flex items-start gap-4 shadow-md group"
            >
              <div className="p-3 rounded-xl bg-[#0B0F16] border border-[#D6A84F]/20 group-hover:border-[#F5C85B] transition-colors shrink-0">
                {techIcons[tech.iconName]}
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-[#F5C85B] transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {tech.category}
                </span>
                <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
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
