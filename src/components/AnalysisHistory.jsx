import React from 'react';
import { History, X, Trash2, ArrowUpRight, ShieldAlert, Globe, Clock, CheckCircle2, Lock } from 'lucide-react';

export default function AnalysisHistory({ isOpen, onClose, history, onClearHistory, onSelectHistoryItem }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-midnight-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-midnight-900 border-l border-slate-800 h-full flex flex-col shadow-2xl relative">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-lavender-500/10 text-lavender-400 border border-lavender-500/20">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Session Scan History
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {history.length} {history.length === 1 ? 'record' : 'records'} in this browser session
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy Disclose Banner */}
        <div className="p-3 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Local memory only. Never synced or uploaded to cloud.</span>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <History className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-xs font-mono">No analyses performed yet in this session.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Scan a message or link above and your results will appear here.
              </p>
            </div>
          ) : (
            history.map((item, index) => {
              const isHigh = item.riskLevel === 'HIGH';
              const isMod = item.riskLevel === 'MODERATE';

              return (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-slate-750 transition-all flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {item.type === 'message' ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-electric-400" />
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-lavender-400" />
                      )}
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                        {item.category || item.type}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      isHigh ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      isMod ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                    "{item.preview}"
                  </p>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {item.type === 'message' && (
                      <button
                        onClick={() => {
                          onSelectHistoryItem(item);
                          onClose();
                        }}
                        className="text-electric-300 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <span>Re-inspect</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Clear All */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Session History</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
