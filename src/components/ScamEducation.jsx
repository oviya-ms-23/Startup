import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  MailWarning, 
  QrCode, 
  Briefcase, 
  Trophy, 
  ShieldAlert, 
  KeyRound, 
  Headphones, 
  Link2,
  ChevronRight,
  X,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { SCAM_CATEGORIES } from '../data/scamCategories';

// Map icon string names to Lucide components
const ICON_MAP = {
  MailWarning,
  QrCode,
  Briefcase,
  Trophy,
  ShieldAlert,
  KeyRound,
  Headphones,
  Link2
};

export default function ScamEducation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScam, setSelectedScam] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Filter categories by search
  const filteredCategories = SCAM_CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (cat) => {
    setSelectedScam(cat);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedScam(null);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleAnswerSelect = (idx) => {
    if (quizSubmitted) return;
    setQuizAnswer(idx);
    setQuizSubmitted(true);
  };

  return (
    <section id="scam-education" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyber-400 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Cyber Awareness Academy</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Scam Education Centre
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore the 8 most widespread digital scam methodologies. Learn the psychological triggers attackers use, recognizable warning signs, and prevention rules.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search scams (e.g. UPI, OTP, Job)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || ShieldAlert;

            return (
              <div
                key={cat.id}
                onClick={() => handleOpenModal(cat)}
                className="group glass-card-interactive rounded-2xl p-5 flex flex-col justify-between cursor-pointer border border-slate-800/80 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-electric-500/10 text-electric-400 border border-electric-500/20 group-hover:scale-110 group-hover:bg-electric-500/20 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-electric-300 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>Learn Signs & Drill</span>
                  <ChevronRight className="w-4 h-4 text-electric-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL DETAIL VIEW FOR SELECTED SCAM */}
      {selectedScam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 md:p-8 border border-slate-700 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-electric-500/20 to-lavender-500/20 border border-electric-500/30 text-electric-300">
                {React.createElement(ICON_MAP[selectedScam.icon] || ShieldAlert, { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-electric-400 font-semibold">
                  Scam Dossier
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white">
                  {selectedScam.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedScam.summary}
            </p>

            {/* How It Unfolds */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-electric-400" />
                <span>How This Scam Unfolds</span>
              </h4>
              <div className="space-y-2">
                {selectedScam.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <span className="font-mono font-bold text-electric-300 shrink-0">
                      Step {idx + 1}:
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Signs & Prevention Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              
              {/* Warning Signs */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-rose-300 mb-2 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Immediate Red Flags</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedScam.warningSigns.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Rules */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-emerald-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Prevention Rules</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedScam.preventionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Interactive Drill / Mini Quiz */}
            {selectedScam.quiz && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase text-lavender-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>Interactive Scenario Drill</span>
                </div>

                <p className="text-xs md:text-sm font-semibold text-white mb-3">
                  {selectedScam.quiz.question}
                </p>

                <div className="space-y-2 mb-3">
                  {selectedScam.quiz.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (idx === selectedScam.quiz.correctIndex) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold';
                      } else if (idx === quizAnswer) {
                        btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                      } else {
                        btnStyle = 'opacity-50 border-slate-800 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + idx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quiz feedback */}
                {quizSubmitted && (
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    quizAnswer === selectedScam.quiz.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                  }`}>
                    <strong>
                      {quizAnswer === selectedScam.quiz.correctIndex ? 'Correct! ' : 'Caution Needed: '}
                    </strong>
                    {selectedScam.quiz.explanation}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
