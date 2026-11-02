import React from 'react';
import { Shield, ExternalLink, Heart, Lock, AlertCircle, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-midnight-950 pt-14 pb-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-lavender-500 p-[1px]">
                <div className="w-full h-full bg-midnight-950 rounded-[7px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-electric-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Trust<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-lavender-400">Lens</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The Digital Trust Assistant. Empowering students, senior citizens, and smartphone users to recognize fraud patterns, inspect suspicious links, and take decisive safety actions.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 pt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Storage Architecture: Messages analyzed client-side only.</span>
            </div>
          </div>

          {/* Official Indian Emergency Helplines */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-200">
              Official Cyber Helplines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="tel:1930"
                  className="hover:text-white flex items-center gap-1.5 text-rose-300 font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>National Helpline: 1930</span>
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 text-slate-300"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 text-slate-300"
                >
                  <span>Sanchar Saathi (Chakshu Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cert-in.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 text-slate-300"
                >
                  <span>CERT-In Security Advisories</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#analyzer" className="hover:text-white transition-colors">
                  Message Risk Analyzer
                </a>
              </li>
              <li>
                <a href="#link-inspector" className="hover:text-white transition-colors">
                  Suspicious Link Inspector
                </a>
              </li>
              <li>
                <a href="#scam-education" className="hover:text-white transition-colors">
                  Scam Education Centre
                </a>
              </li>
              <li>
                <a href="#action-centre" className="hover:text-white transition-colors">
                  Emergency Action Centre
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Heuristic Architecture
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Educational Disclaimer */}
        <div className="pt-6 pb-4 text-[11px] text-slate-500 leading-relaxed border-b border-slate-900">
          <div className="flex items-start gap-2 mb-1.5 text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <strong className="text-slate-300 font-semibold">Educational & Awareness Disclaimer:</strong>
          </div>
          <p>
            TrustLens is an educational awareness and decision-support assistant designed to help non-technical users identify common scam patterns and social engineering cues. It is not an accredited law enforcement entity, financial advisory, or professional cybersecurity forensics investigation agency. TrustLens does not guarantee 100% threat detection. If you have been the victim of financial fraud, contact your banking institution immediately and register an official complaint at <strong>cybercrime.gov.in</strong> or dial <strong>1930</strong>.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} TrustLens Digital Safety Initiative. Built for public cyber resilience.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono">Zero Logs Policy</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">100% Client-Side Evaluation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
