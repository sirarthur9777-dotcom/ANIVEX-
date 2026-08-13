import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';

interface AnivexAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AnivexAiModal: React.FC<AnivexAiModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am ANIVEX AI, the intelligent digital assistant developed by ANIVEX Solutions. How can I assist you with your software engineering, AI workflow, or digital product requirements today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsgText = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/anivex-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsgText }),
      });

      if (res.ok) {
        const data = await res.json();
        const botReply = data.reply || data.message;
        
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API response error');
      }
    } catch (err) {
      // Intelligent fallback responses
      let replyText = '';
      const p = userMsgText.toLowerCase();

      if (p.includes('policyhub') || p.includes('policy')) {
        replyText = `PolicyHub is ANIVEX Solutions' flagship document governance platform. It features enterprise RBAC, automated workflow verification, immutable audit logs, and instant policy search. Would you like us to demo or scope PolicyHub for your organization?`;
      } else if (p.includes('service') || p.includes('build') || p.includes('capability') || p.includes('what do you do')) {
        replyText = `ANIVEX Solutions specializes in core engineering domains:\n• Custom Enterprise Software Development\n• AI & Automated Workflow Systems\n• Scalable Web & Cloud Applications\n• Mobile Application Development\n• High-Performance UI/UX Design\n• Analytics & Data Visualizations.\n\nWhich area fits your upcoming project?`;
      } else if (p.includes('contact') || p.includes('start') || p.includes('hire') || p.includes('quote') || p.includes('cost') || p.includes('price')) {
        replyText = `Starting a project with ANIVEX is simple! You can fill out our Project Enquiry form directly on this website, specifying your project scope and budget range. Our engineering team will review your requirements and respond within 24 hours.`;
      } else if (p.includes('product') || p.includes('proprietary')) {
        replyText = `ANIVEX Solutions builds both custom software for clients and proprietary products like PolicyHub (Enterprise Policy Governance) and ANIVEX AI (Intelligent Assistance Systems).`;
      } else {
        replyText = `Thank you for reaching out to ANIVEX AI! As ANIVEX Solutions' AI assistant, I can help answer questions regarding custom software development, AI integrations, mobile apps, or enterprise product scoping. Feel free to submit an inquiry through our contact form for a detailed proposal!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInput(promptText);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#05070B]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl h-[600px] rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#05070B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-white text-base">ANIVEX AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono border border-[#D6A84F]/30">
                    LIVE DEMO
                  </span>
                </div>
                <p className="text-xs text-slate-400">Intelligent Digital Assistant Engine</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-tech-grid bg-opacity-20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#121824] border border-[#D6A84F]/40 flex items-center justify-center text-[#F5C85B] shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-medium rounded-tr-none'
                      : 'bg-[#05070B] border border-white/10 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      msg.sender === 'user' ? 'text-[#05070B]/70 text-right' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-white shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-full bg-[#121824] border border-[#D6A84F]/40 flex items-center justify-center text-[#F5C85B]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 bg-[#05070B] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="w-4 h-4 text-[#F5C85B] animate-spin" />
                  <span>ANIVEX AI is processing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Starter Prompts */}
          <div className="px-4 py-2 bg-[#05070B]/80 border-t border-white/5 flex gap-2 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleQuickPrompt('What software solutions does ANIVEX build?')}
              className="px-3 py-1 rounded-full bg-[#121824] text-slate-300 hover:text-white border border-white/10 hover:border-[#D6A84F]/40 whitespace-nowrap"
            >
              What software solutions do you build?
            </button>
            <button
              onClick={() => handleQuickPrompt('Tell me about PolicyHub.')}
              className="px-3 py-1 rounded-full bg-[#121824] text-slate-300 hover:text-white border border-white/10 hover:border-[#D6A84F]/40 whitespace-nowrap"
            >
              Tell me about PolicyHub
            </button>
            <button
              onClick={() => handleQuickPrompt('How do we start a project with ANIVEX?')}
              className="px-3 py-1 rounded-full bg-[#121824] text-slate-300 hover:text-white border border-white/10 hover:border-[#D6A84F]/40 whitespace-nowrap"
            >
              How do we start a project?
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-4 bg-[#05070B] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ANIVEX AI about software, AI workflows or custom products..."
              className="flex-1 bg-[#0B0F16] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D6A84F]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
