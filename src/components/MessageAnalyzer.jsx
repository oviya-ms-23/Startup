import React, { useState, useEffect } from 'react';
import { ShieldAlert, Sparkles, RefreshCw, Trash2, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { analyzeMessage } from '../utils/messageAnalyzerEngine';
import { SAMPLE_SCAMS } from '../data/sampleScams';
import RiskIndicator from './RiskIndicator';
import WarningSigns from './WarningSigns';
import VerificationSteps from './VerificationSteps';

export default function MessageAnalyzer({ onSaveToHistory, prefilledMessage }) {
  const [inputText, setInputText] = useState('');
  const [selectedCategoryTag, setSelectedCategoryTag] = useState('SMS / WhatsApp');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Sync prefilled message if triggered from sample or history
  useEffect(() => {
    if (prefilledMessage) {
      setInputText(prefilledMessage);
      handleAnalyze(prefilledMessage);
    }
  }, [prefilledMessage]);

  const categoryTags = [
    'SMS / WhatsApp',
    'Bank Alert',
    'Part-time Job',
    'Payment Request',
    'Email / Phishing',
    'Customs / Parcel'
  ];

  const handleAnalyze = (textToAnalyze = inputText) => {
    const trimmed = textToAnalyze.trim();
    if (!trimmed) {
      setError('Please paste or type a message before analyzing.');
      return;
    }
    setError(null);
    setIsAnalyzing(true);

    // Give a smooth 400ms scan feedback for great UX feel
    setTimeout(() => {
      try {
        const analysis = analyzeMessage(trimmed);
        setResult(analysis);

        // Record to parent history
        if (onSaveToHistory) {
          onSaveToHistory({
            type: 'message',
            preview: trimmed.slice(0, 90) + (trimmed.length > 90 ? '...' : ''),
            fullText: trimmed,
            riskLevel: analysis.riskLevel,
            riskScore: analysis.riskScore,
            category: selectedCategoryTag,
            flagsCount: analysis.totalSignsFound,
            timestamp: new Date().toISOString()
          });
        }
      } catch (err) {
        setError(err.message || 'An error occurred during analysis.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 450);
  };

  const handleSelectSample = (sample) => {
    setInputText(sample.text);
    setSelectedCategoryTag(sample.category);
    handleAnalyze(sample.text);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <section id="analyzer" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-electric-400 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Core Detection Engine</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Message Risk Analyzer
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Paste suspicious SMS texts, WhatsApp forwards, suspicious job propositions, or bank KYC notices to identify social engineering tricks before you respond.
            </p>
          </div>

          {/* Quick sample pills */}
          <div className="text-xs text-slate-400 font-mono">
            <span>Client-side rule evaluation • Zero remote logs</span>
          </div>
        </div>

        {/* Workbench Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          
          {/* Subtle accent border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-500 via-cyber-500 to-lavender-500" />

          {/* Sample quick selector */}
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Load Realistic Test Scenarios:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {SAMPLE_SCAMS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.tag === 'High Risk' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Tag Selection */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-mono text-slate-400">Context:</span>
            {categoryTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedCategoryTag(tag)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategoryTag === tag
                    ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Main Textarea Input */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious SMS, WhatsApp message, job offer, or payment alert here... (e.g., 'Dear customer, your bank account is suspended tonight, update KYC urgently via bit.ly link...')"
              rows={5}
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-electric-400 focus:ring-1 focus:ring-electric-400/50 p-4 text-sm text-slate-100 placeholder-slate-500 transition-all font-sans leading-relaxed resize-y"
            />

            {/* Character & Word count */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
              <span>{inputText.length} characters • {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
              {inputText.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear input</span>
                </button>
              )}
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% In-Browser Evaluation • Safe & Confidential</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {inputText && (
                <button
                  onClick={handleClear}
                  type="button"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  Reset
                </button>
              )}

              <button
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing || !inputText.trim()}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isAnalyzing || !inputText.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                    : 'bg-gradient-to-r from-electric-500 via-cyber-500 to-cyber-600 hover:from-electric-400 hover:to-cyber-500 text-white shadow-glow-sm hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-electric-200" />
                    <span>Analyzing Patterns...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-white" />
                    <span>Scan Message For Threats</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* RESULTS PANEL (Visible when analyzed) */}
        {result && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* Top Indicator */}
            <RiskIndicator
              riskLevel={result.riskLevel}
              riskMeta={result.riskMeta}
              riskScore={result.riskScore}
              totalSignsFound={result.totalSignsFound}
            />

            {/* Warning Signs Breakdown */}
            <WarningSigns signs={result.detectedSigns} />

            {/* Verification Steps & Safety Precautions */}
            <VerificationSteps
              steps={result.verificationSteps}
              precautions={result.safetyPrecautions}
              rawText={inputText}
              riskLevel={result.riskLevel}
              riskScore={result.riskScore}
            />
          </div>
        )}

      </div>
    </section>
  );
}
