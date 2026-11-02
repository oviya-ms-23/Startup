import React, { useState } from 'react';
import { Eye, ShieldAlert, AlertTriangle, CheckCircle2, Globe, Link2, ExternalLink, ShieldCheck, Info, RefreshCw } from 'lucide-react';
import { inspectLink } from '../utils/linkInspectorEngine';
import { SAMPLE_LINKS } from '../data/sampleLinks';

export default function LinkInspector({ onSaveToHistory }) {
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInspect = (urlToInspect = inputUrl) => {
    const trimmed = urlToInspect.trim();
    if (!trimmed) {
      setError('Please enter a website link or domain name to inspect.');
      return;
    }
    setError(null);
    setIsScanning(true);

    setTimeout(() => {
      try {
        const inspection = inspectLink(trimmed);
        setResult(inspection);

        if (onSaveToHistory) {
          onSaveToHistory({
            type: 'link',
            preview: trimmed,
            fullText: trimmed,
            riskLevel: inspection.riskLevel,
            riskScore: inspection.threatScore,
            category: inspection.impersonatedBrand ? `Impersonation: ${inspection.impersonatedBrand}` : 'URL Inspection',
            flagsCount: inspection.flags.length,
            timestamp: new Date().toISOString()
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to inspect link.');
      } finally {
        setIsScanning(false);
      }
    }, 400);
  };

  const handleSelectSample = (sample) => {
    setInputUrl(sample.url);
    handleInspect(sample.url);
  };

  return (
    <section id="link-inspector" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-lavender-400 uppercase tracking-wider mb-2">
              <Eye className="w-4 h-4" />
              <span>Passive URL Threat Intelligence</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Suspicious Link Inspector
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Verify unknown links without opening them. TrustLens inspects URL architecture, detects typosquatting of known brands, identifies suspicious shorteners, and spots IP address traps.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold">Zero-Click Guarantee:</span> Link is never loaded or visited
          </div>
        </div>

        {/* URL Input Box */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-lavender-500 via-cyber-500 to-electric-500" />

          {/* Sample Links Pills */}
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Try Preset Test URLs:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {SAMPLE_LINKS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-lavender-400" />
                  <span>{sample.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Link2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste link here... (e.g., https://sbi-netbanking-verify.xyz/update or bit.ly/prize-2026)"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/50 text-sm text-slate-100 placeholder-slate-500 font-mono transition-all"
              />
            </div>

            <button
              onClick={() => handleInspect()}
              disabled={isScanning || !inputUrl.trim()}
              className={`px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-all inline-flex items-center justify-center gap-2 ${
                isScanning || !inputUrl.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-lavender-500 to-cyber-600 hover:from-lavender-400 hover:to-cyber-500 text-white shadow-glow-sm hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Inspecting...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-white" />
                  <span>Inspect Link</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            
            {/* Top Indicator */}
            <div className={`p-6 rounded-2xl glass-panel border ${
              result.riskLevel === 'HIGH' ? 'border-rose-500/50 shadow-glow-danger' :
              result.riskLevel === 'MODERATE' ? 'border-amber-500/50 shadow-glow-amber' :
              'border-emerald-500/40 shadow-glow-safe'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    result.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-400' :
                    result.riskLevel === 'MODERATE' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Link Risk Classification:
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase font-mono ${
                        result.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        result.riskLevel === 'MODERATE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {result.riskLevel} RISK
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 mt-1 break-all">
                      Inspected: {result.sanitizedUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">Suspicion Index:</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {result.threatScore}/100
                  </span>
                </div>
              </div>

              {/* Preliminary Inspection Limitation Notice */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                <Info className="w-4 h-4 text-lavender-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice of Limitation:</strong> {result.disclaimer}
                </p>
              </div>
            </div>

            {/* URL Structural Anatomy Card */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-electric-400" />
                <span>URL Structural Anatomy</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Protocol</span>
                  <span className={`font-semibold ${result.anatomy.protocol === 'https:' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.anatomy.protocol}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Subdomain</span>
                  <span className="text-slate-200 truncate block">
                    {result.anatomy.subdomain}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Domain</span>
                  <span className="text-electric-300 font-semibold truncate block">
                    {result.anatomy.domain}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Top-Level Domain</span>
                  <span className="text-lavender-300 font-semibold">
                    {result.anatomy.tld}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Port</span>
                  <span className="text-slate-200">
                    {result.anatomy.port}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Path</span>
                  <span className="text-slate-300 truncate block" title={result.anatomy.pathname}>
                    {result.anatomy.pathname}
                  </span>
                </div>
              </div>
            </div>

            {/* Detected Flags */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">
                Structural Observations & Flags ({result.flags.length})
              </h4>

              {result.flags.length === 0 ? (
                <div className="p-4 rounded-xl glass-panel border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No obvious anomalous structure, IP hostnames, or brand spoofing patterns recognized in this link.</span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {result.flags.map((flag, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                            flag.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                            flag.severity === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-cyber-500/20 text-cyber-300 border border-cyber-500/30'
                          }`}>
                            {flag.severity}
                          </span>
                          <h5 className="text-xs font-bold text-slate-100">
                            {flag.title}
                          </h5>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {flag.description}
                      </p>

                      <div className="text-xs text-electric-300 bg-electric-950/30 p-2.5 rounded-lg border border-electric-500/20">
                        <strong>Safety Guidance:</strong> {flag.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
