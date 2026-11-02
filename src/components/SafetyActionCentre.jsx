import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink, 
  CheckSquare, 
  Copy, 
  Check, 
  AlertTriangle, 
  Building2, 
  Clock, 
  FileText,
  Lock,
  Camera,
  Smartphone
} from 'lucide-react';

export default function SafetyActionCentre() {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  // Directory of verified Indian bank fraud helplines (official public channels)
  const BANK_DIRECTORY = [
    { name: 'State Bank of India (SBI)', helpline: '1800 1234 / 1800 2100', portal: 'https://onlinesbi.sbi' },
    { name: 'HDFC Bank', helpline: '1800 1600 / 1800 2600', portal: 'https://hdfcbank.com' },
    { name: 'ICICI Bank', helpline: '1800 1080', portal: 'https://icicibank.com' },
    { name: 'Axis Bank', helpline: '1800 419 5959', portal: 'https://axisbank.com' },
    { name: 'Punjab National Bank (PNB)', helpline: '1800 1800 / 1800 2021', portal: 'https://pnbindia.in' },
    { name: 'Bank of Baroda', helpline: '1800 5700', portal: 'https://bankofbaroda.in' },
    { name: 'Canara Bank', helpline: '1800 425 0018', portal: 'https://canarabank.com' },
    { name: 'Kotak Mahindra Bank', helpline: '1860 266 2666', portal: 'https://kotak.com' }
  ];

  const incidentTemplate = `CYBER FRAUD COMPLAINT DRAFT
-------------------------------------------
Date & Time of Incident: [YYYY-MM-DD, HH:MM AM/PM]
Platform Encountered: [SMS / WhatsApp / Call / Website / Telegram]
Sender Number / ID / URL: [Insert phone number or website link]
Type of Fraud: [e.g. Electricity bill threat / Part-time task / Phishing bank KYC]

Financial Loss Incurred: [Yes / No]
Amount Debited: Rs. [Insert Amount]
My Bank & Account Last 4 Digits: [Bank Name, XXXX]
Transaction UTR / Reference ID: [Insert 12-digit UPI / IMPS UTR]
Beneficiary UPI ID or Account: [If known, insert receiver VPA]

Preserved Evidence Attached:
[ ] Screenshots of chat conversation
[ ] SMS header and timestamp
[ ] Bank transaction debit SMS / statement screenshot
[ ] Phone call logs with timestamps
-------------------------------------------`;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(incidentTemplate);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  return (
    <section id="action-centre" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Incident Response Protocol</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Safety Action Centre
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Immediate, actionable steps if you suspect you have engaged with a scammer or transferred funds. Fast action in the "Golden Hour" can prevent losses.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-end">
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'emergency'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Emergency Protocol
            </button>
            <button
              onClick={() => setActiveTab('banks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'banks'
                  ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bank Helplines
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'evidence'
                  ? 'bg-lavender-500/20 text-lavender-300 border border-lavender-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Evidence & Reporting
            </button>
          </div>
        </div>

        {/* TAB 1: EMERGENCY PROTOCOL */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            
            {/* Golden Hour Alert Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/40 via-midnight-900 to-slate-900 border border-rose-500/40 shadow-glow-danger">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                    <Clock className="w-8 h-8 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold">
                        Critical Incident Window
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/30 text-rose-200">
                        The First 2 Hours
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                      Did you just transfer money to a fraudster?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      Immediately call the National Cyber Crime Helpline at <strong className="text-rose-300 font-bold">1930</strong>. The Indian Citizen Financial Cyber Fraud Reporting Management System (CFCFRMS) can coordinate inter-bank account freezes to halt funds before cash-out.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href="tel:1930"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg transition-all hover:scale-105"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Dial 1930 Now</span>
                  </a>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors"
                  >
                    <span>cybercrime.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Step-by-Step 5 Rules of Emergency Severance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  01
                </div>
                <h4 className="text-sm font-bold text-white">Stop Interacting Immediately</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Disconnect the ongoing call, block the sender on WhatsApp/SMS, and leave the Telegram group. Do not engage in arguments or plead for refunds.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  02
                </div>
                <h4 className="text-sm font-bold text-white">Protect Authentication Keys</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Never share any follow-up "cancellation OTPs" or "reverse charges". Scammers frequently attempt a second debit while pretending to reverse the first.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-electric-500/10 text-electric-400 border border-electric-500/20 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  03
                </div>
                <h4 className="text-sm font-bold text-white">Freeze Cards & NetBanking</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Open your official bank app and temporarily lock debit card transactions, or call your bank's 24x7 toll-free fraud hotline to block digital access.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: BANK HELPLINES DIRECTORY */}
        {activeTab === 'banks' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <Building2 className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 font-semibold">Verified Bank Emergency Directory:</strong>{' '}
                These are verified national toll-free lines for reporting unauthorized digital transactions. TrustLens does not store or process banking data. Always verify contact numbers on the physical back of your debit card.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BANK_DIRECTORY.map((b) => (
                <div key={b.name} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                  <h5 className="text-xs font-bold text-slate-100 truncate">
                    {b.name}
                  </h5>
                  <div className="mt-2 text-xs font-mono text-electric-300 font-semibold">
                    {b.helpline}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Official Portal</span>
                    <a
                      href={b.portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EVIDENCE PRESERVATION & COMPLAINT TEMPLATE */}
        {activeTab === 'evidence' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Evidence Checklist */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Camera className="w-4 h-4 text-lavender-400" />
                <span>Evidence Preservation Checklist</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Before deleting chats or resetting your phone, preserve these specific records to file a valid police or cyber cell complaint:
              </p>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-electric-400 shrink-0 mt-1.5" />
                  <span><strong>Full Chat Screenshots:</strong> Capture conversation history showing phone numbers, profile images, and timestamps.</span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-electric-400 shrink-0 mt-1.5" />
                  <span><strong>12-Digit Transaction Reference (UTR):</strong> Available in your bank statement or UPI app debit receipt.</span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-electric-400 shrink-0 mt-1.5" />
                  <span><strong>SMS Header Codes:</strong> Keep the exact 6-character sender ID (e.g. VK-SBIINB or 10-digit number).</span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-electric-400 shrink-0 mt-1.5" />
                  <span><strong>Beneficiary Details:</strong> Recipient UPI Virtual Payment Address (VPA) or account number debited to.</span>
                </div>
              </div>
            </div>

            {/* Copyable Incident Report Template */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-electric-400" />
                    <span>Copyable Complaint Draft Template</span>
                  </h4>
                  <button
                    onClick={handleCopyTemplate}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                  >
                    {copiedTemplate ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  Use this standardized template when reporting to <strong>cybercrime.gov.in</strong> or submitting a written grievance to your bank branch:
                </p>

                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56 leading-snug">
                  {incidentTemplate}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Official Portal:</span>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-300 hover:text-white flex items-center gap-1 font-mono font-semibold"
                >
                  <span>File Complaint on cybercrime.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
