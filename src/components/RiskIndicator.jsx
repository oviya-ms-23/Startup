import React from 'react';
import { AlertTriangle, AlertOctagon, CheckCircle2, Shield, Info } from 'lucide-react';

export default function RiskIndicator({ riskLevel, riskMeta, riskScore, totalSignsFound }) {
  const isHigh = riskLevel === 'HIGH';
  const isModerate = riskLevel === 'MODERATE';
  const isLow = riskLevel === 'LOW';

  const getBorderColor = () => {
    if (isHigh) return 'border-rose-500/50 shadow-glow-danger';
    if (isModerate) return 'border-amber-500/50 shadow-glow-amber';
    return 'border-emerald-500/40 shadow-glow-safe';
  };

  const getIcon = () => {
    if (isHigh) return <AlertOctagon className="w-8 h-8 text-rose-400 animate-pulse" />;
    if (isModerate) return <AlertTriangle className="w-8 h-8 text-amber-400" />;
    return <Shield className="w-8 h-8 text-emerald-400" />;
  };

  return (
    <div className={`p-6 rounded-2xl glass-panel border ${getBorderColor()} transition-all duration-300`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Icon & Risk Level Announcement */}
        <div className="flex items-start gap-4">
          <div className={`p-3.5 rounded-xl border ${
            isHigh ? 'bg-rose-500/10 border-rose-500/30' :
            isModerate ? 'bg-amber-500/10 border-amber-500/30' :
            'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            {getIcon()}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400 font-semibold">
                Risk Assessment Result
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskMeta.badgeClass}`}>
                {riskMeta.label}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
              {isHigh && 'Critical Warning Signs Detected'}
              {isModerate && 'Caution: Potential Red Flags Present'}
              {isLow && 'No Immediate Scam Indicators Flagged'}
            </h3>

            <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              {riskMeta.summary}
            </p>
          </div>
        </div>

        {/* Right: Heuristic Threat Score & Signs Count */}
        <div className="flex items-center gap-4 self-start md:self-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-center">
            <span className="block text-2xl font-extrabold font-mono text-white">
              {totalSignsFound}
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Flags Raised
            </span>
          </div>

          <div className="h-8 w-[1px] bg-slate-800" />

          <div className="text-center">
            <span className={`block text-2xl font-extrabold font-mono ${
              isHigh ? 'text-rose-400' : isModerate ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {riskScore}/100
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Threat Index
            </span>
          </div>
        </div>

      </div>

      {/* CRITICAL SAFETY DISCLAIMER BANNER (Never claim safe) */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <Info className="w-4 h-4 text-electric-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-slate-100 font-semibold">Core Safety Principle:</strong>{' '}
          {isLow ? (
            <span className="text-emerald-300/90">
              Absence of detected keywords does <strong>NOT</strong> prove a message is definitely legitimate or safe. Sophisticated spear-phishing or fresh phone numbers may not trigger static rules. Always verify requests independently before taking action.
            </span>
          ) : (
            <span>
              TrustLens is an educational decision-support tool. Do not proceed with the sender's instructions until independently verified through trusted official channels.
            </span>
          )}
        </p>
      </div>

    </div>
  );
}
