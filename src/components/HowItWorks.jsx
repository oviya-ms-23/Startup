import React from 'react';
import { Cpu, Eye, ShieldCheck, Binary, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Local Lexical Parsing',
      icon: Binary,
      description: 'Your submitted text or URL is tokenized strictly in-memory inside your local web browser. No plain text is sent to third-party tracking APIs.'
    },
    {
      step: '02',
      title: 'Rule-Based Pattern Matching',
      icon: Cpu,
      description: 'The engine evaluates content against curated heuristic signatures: urgency vectors, OTP/PIN harvesting, fake job hooks, and brand typosquatting.'
    },
    {
      step: '03',
      title: 'Explainable Reasoning',
      icon: Eye,
      description: 'Instead of an ambiguous "Safe / Unsafe" verdict, TrustLens itemizes every flagged element, explaining what the attacker is attempting to accomplish.'
    },
    {
      step: '04',
      title: 'Actionable Crisis Playbook',
      icon: ShieldCheck,
      description: 'Provides exact step-by-step verification procedures, emergency bank helplines, and the Indian 1930 Cyber Fraud Helpline protocol.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 scroll-mt-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 text-electric-300 border border-electric-500/20 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology & Transparency</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How TrustLens Works
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Demystifying cybersecurity through explainable heuristics and transparent threat indicators rather than black-box labels.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl glass-panel border border-slate-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-700">
                      {item.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-electric-400 border border-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Deterministic Heuristic</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Note / AI Evolution */}
        <div className="mt-8 p-6 rounded-2xl bg-midnight-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-lavender-500/10 text-lavender-400 border border-lavender-500/20 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI-Ready Modular Architecture</h4>
              <p className="text-xs text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                TrustLens is engineered so that privacy-preserving Small Language Models (SLMs) and on-device models can be introduced in later versions without altering the explainable UX pipeline.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 shrink-0">
            Phase 1 MVP • Zero Telemetry
          </div>
        </div>

      </div>
    </section>
  );
}
