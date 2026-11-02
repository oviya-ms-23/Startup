import React, { useState } from 'react';
import { Shield, ShieldAlert, History, Menu, X, ExternalLink, PhoneCall, Lock } from 'lucide-react';

export default function Navbar({ historyCount, onOpenHistory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Message Analyzer', href: '#analyzer' },
    { label: 'Link Inspector', href: '#link-inspector' },
    { label: 'Scam Education', href: '#scam-education' },
    { label: 'Action Centre', href: '#action-centre' },
    { label: 'How It Works', href: '#how-it-works' }
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-midnight-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 via-cyber-500 to-lavender-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-sm">
                <div className="w-full h-full bg-midnight-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-electric-400 group-hover:text-electric-300 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white font-sans">
                    Trust<span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-lavender-400">Lens</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-electric-500/10 text-electric-300 border border-electric-500/20">
                    Safety v1.0
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:inline">
                  The Digital Trust Assistant
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-850/60 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Actions (Emergency Helpline 1930 & History) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* History Drawer Trigger */}
            <button
              onClick={onOpenHistory}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold font-mono text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition-all hover:border-slate-600"
              title="View your session scan history"
            >
              <History className="w-4 h-4 text-lavender-400" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-electric-500/30 text-electric-300 border border-electric-500/40 text-[10px] font-bold">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Helpline 1930 Indian National Cyber Fraud Button */}
            <a
              href="#action-centre"
              onClick={() => handleNavClick('#action-centre')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all shadow-sm group"
              title="Immediate emergency guidance for cyber fraud"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Helpline 1930</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenHistory}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 relative"
              aria-label="History"
            >
              <History className="w-4 h-4 text-lavender-400" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {historyCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-midnight-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-850 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="#action-centre"
              onClick={() => handleNavClick('#action-centre')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40"
            >
              <PhoneCall className="w-4 h-4" />
              <span>National Cyber Fraud Helpline: 1930</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
