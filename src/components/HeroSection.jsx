import React from 'react';
import { ShieldAlert, ArrowRight, Eye, CheckCircle2, Lock, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export default function HeroSection({ onAnalyzeClick, onInspectLinkClick }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden cyber-grid-bg">
      {/* Background ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-electric-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[380px] h-[300px] bg-lavender-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          {/* Awareness Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-sm mb-6 animate-pulse-subtle">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Protecting internet users against digital scams & social engineering</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Think Before You{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-cyber-400 to-lavender-400">
              Trust.
            </span>
          </h1>

          {/* Supporting Subheadline */}
          <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
            Understand digital threats before they become real problems.
            TrustLens decodes suspicious SMS messages, WhatsApp job offers, payment requests, and misleading website links into clear, actionable advice.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-electric-500 to-cyber-600 hover:from-electric-400 hover:to-cyber-500 text-white shadow-glow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>Analyze a Message</span>
              <ArrowRight className="w-4 h-4 text-electric-200" />
            </button>

            <button
              onClick={onInspectLinkClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              <Eye className="w-4 h-4 text-lavender-400" />
              <span>Inspect a Link</span>
            </button>
          </div>

          {/* Core Trust Guarantees */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl pt-8 border-t border-slate-800/80 text-left">
            
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-electric-500/10 text-electric-400 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">100% Client-Side</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  Your submitted messages are analyzed strictly inside your browser. No server storage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-lavender-500/10 text-lavender-400 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Explainable Logic</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  Every warning sign clearly explains why it was flagged and what the scammer wants.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Emergency Protocol</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  Integrated with National Cyber Crime Helpline (1930) and bank freeze procedures.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
