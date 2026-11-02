import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldX, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WarningSigns({ signs }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!signs || signs.length === 0) {
    return (
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <h4 className="text-base font-semibold text-slate-200">No Patterned Red Flags Detected</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          The analyzed text does not match common urgency coercion, known phishing keywords, or typical credential-harvesting phrases.
        </p>
      </div>
    );
  }

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Medium':
        return 'bg-cyber-500/20 text-cyber-300 border-cyber-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>Detected Warning Signs ({signs.length})</span>
        </h4>
        <span className="text-xs text-slate-400">Click any card to inspect reasoning</span>
      </div>

      <div className="space-y-3">
        {signs.map((sign, index) => {
          const isExpanded = expandedId === sign.id || expandedId === null && index === 0;

          return (
            <div
              key={sign.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                sign.severity === 'Critical'
                  ? 'border-rose-500/30 bg-rose-950/10'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              {/* Card Header */}
              <button
                type="button"
                onClick={() => toggleExpand(sign.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-850/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono border uppercase tracking-wider ${getSeverityBadge(sign.severity)}`}>
                    {sign.severity}
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                      {sign.title}
                    </h5>
                    <span className="text-xs text-slate-400 font-mono">
                      Category: {sign.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sign.matchedPhrases && sign.matchedPhrases.length > 0 && (
                    <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      "{sign.matchedPhrases[0]}"
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3 text-xs bg-midnight-950/40">
                  
                  {/* Detailed Description */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Why this is flagged:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {sign.description}
                    </p>
                  </div>

                  {/* Matched triggers */}
                  {sign.matchedPhrases && sign.matchedPhrases.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-slate-400">Trigger phrases:</span>
                      {sign.matchedPhrases.map((phrase, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-[11px]"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recommended Action */}
                  <div className="p-3 rounded-lg bg-electric-950/30 border border-electric-500/20 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-electric-300 font-semibold block">Recommended Action:</strong>
                      <span className="text-slate-300 leading-snug">
                        {sign.recommendation}
                      </span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
