import React from 'react';
import {
  Code2,
  Terminal,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Database,
  Cpu,
  Globe,
  Activity,
  FileText,
  Building,
  Check
} from 'lucide-react';

// Hero Section: Interactive Software Architecture Visual (Zero AI-Slop)
export const HeroTechVisual: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#0B1F3A]/10 bg-white p-3 font-sans">
      {/* Mockup Frame Header */}
      <div className="flex items-center justify-between pb-3 px-2 border-b border-[#0B1F3A]/10 bg-slate-50/80 -mx-3 -mt-3 p-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[11px] font-mono text-[#0B1F3A]/60 font-semibold pl-2">
            anivex-engine.production.in
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#15803D]/10 text-[#15803D] text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
            LIVE • 14ms
          </span>
        </div>
      </div>

      {/* Main Software Mockup Content */}
      <div className="space-y-3 p-1">
        
        {/* Architecture Flow Banner */}
        <div className="p-3.5 rounded-xl bg-[#0B1F3A] text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4A72C] font-bold">
              SYSTEM ARCHITECTURE
            </span>
            <span className="text-[10px] font-mono text-slate-300">
              Region: ap-south-1 (Mumbai)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/10 border border-white/10">
              <Globe className="w-3.5 h-3.5 mx-auto text-[#F97316] mb-1" />
              <p className="font-bold text-[11px]">React Web / App</p>
              <p className="text-[9px] text-slate-300 font-mono">Vite & Tailwind</p>
            </div>
            <div className="p-2 rounded-lg bg-white/10 border border-white/10">
              <Cpu className="w-3.5 h-3.5 mx-auto text-[#D4A72C] mb-1" />
              <p className="font-bold text-[11px]">Core API Engine</p>
              <p className="text-[9px] text-slate-300 font-mono">Node / TypeScript</p>
            </div>
            <div className="p-2 rounded-lg bg-white/10 border border-white/10">
              <Database className="w-3.5 h-3.5 mx-auto text-[#15803D] mb-1" />
              <p className="font-bold text-[11px]">Secure Database</p>
              <p className="text-[9px] text-slate-300 font-mono">Postgres / Firestore</p>
            </div>
          </div>
        </div>

        {/* Code Snippet & Terminal Output */}
        <div className="p-3.5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#0B1F3A]/50 mb-1.5 pb-1 border-b border-[#0B1F3A]/8">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#F97316]" />
              <span>anivex-solution.service.ts</span>
            </span>
            <span className="text-[#15803D] font-bold">GST Validated</span>
          </div>
          <pre className="text-[11px] leading-relaxed text-[#0B1F3A]/90 overflow-x-auto">
            <code>
              <span className="text-[#15803D]">export const</span> clientProject = &#123;<br />
              &nbsp;&nbsp;provider: <span className="text-[#F97316]">'Anivex Solution'</span>,<br />
              &nbsp;&nbsp;architecture: <span className="text-[#F97316]">'Custom Full-Stack'</span>,<br />
              &nbsp;&nbsp;gstInvoicing: <span className="text-[#15803D]">true</span>,<br />
              &nbsp;&nbsp;codeOwnership: <span className="text-[#15803D]">'100% Client Transfer'</span><br />
              &#125;;
            </code>
          </pre>
        </div>

        {/* Real-time Engineering Highlights */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-[#0B1F3A]/8 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
            <div>
              <p className="font-bold text-[11px] text-[#0B1F3A]">Enterprise Security</p>
              <p className="text-[10px] text-[#0B1F3A]/60">SSL • Automated Backups</p>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-[#0B1F3A]/8 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
            <div>
              <p className="font-bold text-[11px] text-[#0B1F3A]">Direct Engineering</p>
              <p className="text-[10px] text-[#0B1F3A]/60">Zero Template Bloat</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// PolicyHub: Real UI Mockup (Zero AI-Slop)
export const PolicyHubVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-slate-900 to-[#0B1F3A] text-white flex flex-col justify-between font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-heading font-bold text-xs">PolicyHub Enterprise</span>
        </div>
        <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
          Gov Suite
        </span>
      </div>

      <div className="space-y-2 my-auto">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-slate-200">NDAs & Employment Policies</span>
            <span className="text-[10px] text-emerald-400 font-mono">Active (v2.4)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#F97316] h-1.5 rounded-full w-4/5" />
          </div>
        </div>

        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-slate-200">GST Compliance Ledgers</span>
            <span className="text-[10px] text-emerald-400 font-mono">Audit Cleared</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#15803D] h-1.5 rounded-full w-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
        <span>Granular RBAC</span>
        <span>Semantic Search</span>
      </div>
    </div>
  );
};

// VyaparDesk ERP: Real UI Mockup (Zero AI-Slop)
export const VyaparDeskVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-[#0B1F3A] to-slate-900 text-white flex flex-col justify-between font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F97316]" />
          <span className="font-heading font-bold text-xs">VyaparDesk GST ERP</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded">
          ₹ Rupee Billing
        </span>
      </div>

      <div className="space-y-2 my-auto">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase">Today's Invoices</p>
            <p className="font-bold text-sm text-[#F97316] font-mono">₹1,48,500</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase">Multi-Branch Sync</p>
            <p className="font-bold text-sm text-emerald-400 font-mono">4 Warehouses</p>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] flex items-center justify-between">
          <span className="text-slate-300">GSTIN Tax Calculation</span>
          <span className="text-emerald-400 font-bold">18% CGST/SGST</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
        <span>Barcode Tracking</span>
        <span>Auto-WhatsApp PDF</span>
      </div>
    </div>
  );
};

// About Studio: Architectural Blueprint Visual (Zero AI-Slop)
export const AboutStudioVisual: React.FC = () => {
  return (
    <div className="w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-[#0B1F3A] via-slate-900 to-[#0B1F3A] p-6 text-white flex flex-col justify-between border border-[#0B1F3A]/20 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#F97316] flex items-center justify-center text-white text-xs font-bold">
            AS
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-white">Anivex Solution</h4>
            <p className="text-[10px] text-slate-400">Software Engineering Studio • India</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#D4A72C] font-semibold">
          High-Trust Delivery
        </span>
      </div>

      {/* Blueprint Core Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <Code2 className="w-5 h-5 mx-auto text-[#F97316] mb-1.5" />
          <p className="font-bold text-xs text-white">Custom Code</p>
          <p className="text-[10px] text-slate-400 mt-0.5">No Bloated CMS</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <Layers className="w-5 h-5 mx-auto text-[#D4A72C] mb-1.5" />
          <p className="font-bold text-xs text-white">Modern Stack</p>
          <p className="text-[10px] text-slate-400 mt-0.5">React & Cloud</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <ShieldCheck className="w-5 h-5 mx-auto text-[#15803D] mb-1.5" />
          <p className="font-bold text-xs text-white">100% IP</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Full Code Handover</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400 mb-1.5" />
          <p className="font-bold text-xs text-white">GST Invoicing</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Verified Indian Entity</p>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Founded & Led by Krishndas Chauhan</span>
        <span className="text-[#15803D]">● Verified Studio</span>
      </div>
    </div>
  );
};

// OpsGrid: Real UI Mockup (Zero AI-Slop)
export const OpsGridVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-[#0B1F3A] to-slate-900 text-white flex flex-col justify-between font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          <span className="font-heading font-bold text-xs">Anivex OpsGrid Monitor</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded">
          Telemetric Suite
        </span>
      </div>

      <div className="space-y-2 my-auto">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase">System Uptime</p>
            <p className="font-bold text-sm text-emerald-400 font-mono">99.98%</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase">Process Queues</p>
            <p className="font-bold text-sm text-[#F97316] font-mono">0 Lag / 12ms</p>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] flex items-center justify-between">
          <span className="text-slate-300">Live API WebSockets</span>
          <span className="text-emerald-400 font-bold">Connected • Secure SSL</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
        <span>Role-Based RBAC</span>
        <span>Realtime Telemetry</span>
      </div>
    </div>
  );
};
