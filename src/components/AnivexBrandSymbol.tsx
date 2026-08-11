import React from 'react';
import { motion } from 'motion/react';

export const AnivexBrandSymbol: React.FC<{ size?: number }> = ({ size = 360 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[#D6A84F]/10 rounded-full blur-3xl animate-pulse-glow" />

      {/* Outer Rotating Glowing Gold Orbital Ring */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
      >
        <circle
          cx="200"
          cy="200"
          r="175"
          fill="none"
          stroke="url(#goldOrbitalGradient)"
          strokeWidth="1.5"
          strokeDasharray="16 12 8 12"
          opacity="0.75"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="rgba(217, 220, 225, 0.15)"
          strokeWidth="1"
          strokeDasharray="40 8 4 8"
        />
        <circle cx="375" cy="200" r="4" fill="#F5C85B" className="shadow-[0_0_12px_#F5C85B]" />
        <circle cx="200" cy="25" r="3" fill="#D9DCE1" />
      </motion.svg>

      {/* Inner Reverse Rotating Secondary Ring */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 w-[88%] h-[88%] pointer-events-none"
        viewBox="0 0 350 350"
      >
        <circle
          cx="175"
          cy="175"
          r="140"
          fill="none"
          stroke="rgba(214, 168, 79, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <circle cx="315" cy="175" r="3" fill="#D6A84F" />
      </motion.svg>

      {/* Center Abstract Monogram 'A+N' Symbol */}
      <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center p-4">
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_10px_25px_rgba(214,168,79,0.25)]">
          <defs>
            {/* Metallic Gold Gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#F5C85B" />
              <stop offset="80%" stopColor="#D6A84F" />
              <stop offset="100%" stopColor="#8A631D" />
            </linearGradient>

            {/* Silver Platinum Gradient */}
            <linearGradient id="silverGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Orbital Glow */}
            <linearGradient id="goldOrbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5C85B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#D6A84F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D9DCE1" stopOpacity="0.1" />
            </linearGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Structural Hex Grid Element */}
          <polygon
            points="120,20 200,66 200,158 120,204 40,158 40,66"
            fill="rgba(11, 15, 22, 0.6)"
            stroke="rgba(214, 168, 79, 0.25)"
            strokeWidth="1.5"
            className="transition-all duration-700"
          />

          {/* Interlocking Monogram Geometry: "A" + "N" synthesis */}
          {/* Left Apex Leg of 'A' / Left Pillar of 'N' */}
          <path
            d="M 60,165 L 120,40 L 140,40 L 80,165 Z"
            fill="url(#silverGradient)"
            opacity="0.95"
          />

          {/* Right Leg of 'A' / Right Pillar of 'N' */}
          <path
            d="M 160,165 L 180,165 L 120,40 L 100,40 Z"
            fill="url(#silverGradient)"
            opacity="0.75"
          />

          {/* Diagonal Connector of 'N' intersecting 'A' with Gold highlight */}
          <path
            d="M 75,55 L 165,150 L 165,165 L 145,165 L 60,75 Z"
            fill="url(#goldGradient)"
            filter="url(#glowFilter)"
          />

          {/* Horizontal Apex Bridge of 'A' with Glowing Gold accent */}
          <path
            d="M 82,118 L 158,118 L 150,132 L 90,132 Z"
            fill="url(#goldGradient)"
          />

          {/* Central Tech Precision Node */}
          <circle cx="120" cy="125" r="5" fill="#FFF0D0" className="animate-pulse" />
          <circle cx="120" cy="125" r="12" fill="none" stroke="#F5C85B" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Subtle Floating Tech Tag Badges around Orbit */}
      <div className="absolute top-2 left-6 px-2.5 py-1 rounded-full bg-[#0B0F16]/90 border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] shadow-lg flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C85B] animate-ping" />
        ANIVEX CORE v2.6
      </div>

      <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-[#0B0F16]/90 border border-white/10 text-[10px] font-mono tracking-wider text-[#D9DCE1] shadow-lg">
        NEXT-GEN TECH
      </div>
    </div>
  );
};
