import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MessageAnalyzer from './components/MessageAnalyzer';
import LinkInspector from './components/LinkInspector';
import ScamEducation from './components/ScamEducation';
import SafetyActionCentre from './components/SafetyActionCentre';
import HowItWorks from './components/HowItWorks';
import AnalysisHistory from './components/AnalysisHistory';
import Footer from './components/Footer';

export default function App() {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('trustlens_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState(null);

  // Sync session history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('trustlens_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [history]);

  const handleSaveToHistory = (entry) => {
    setHistory((prev) => [entry, ...prev.slice(0, 19)]); // Keep last 20 records
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('trustlens_history');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSelectHistoryItem = (item) => {
    if (item.type === 'message' && item.fullText) {
      setPrefilledMessage(item.fullText);
      const target = document.querySelector('#analyzer');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAnalyzer = () => {
    const el = document.querySelector('#analyzer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLinkInspector = () => {
    const el = document.querySelector('#link-inspector');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col selection:bg-electric-500/30 selection:text-electric-300">
      
      {/* Top Header Navigation */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onAnalyzeClick={scrollToAnalyzer}
          onInspectLinkClick={scrollToLinkInspector}
        />

        {/* Core Message Risk Analyzer */}
        <MessageAnalyzer
          onSaveToHistory={handleSaveToHistory}
          prefilledMessage={prefilledMessage}
        />

        {/* Passive Zero-Click Link Inspector */}
        <LinkInspector
          onSaveToHistory={handleSaveToHistory}
        />

        {/* Scam Education Centre (8 Categories + Drills) */}
        <ScamEducation />

        {/* Safety Action Centre & 1930 Helpline */}
        <SafetyActionCentre />

        {/* Explainable Engine: How TrustLens Works */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />

      {/* Analysis History Slide-Over Drawer */}
      <AnalysisHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onSelectHistoryItem={handleSelectHistoryItem}
      />

    </div>
  );
}
