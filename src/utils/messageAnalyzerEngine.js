/**
 * TrustLens - Transparent Rule-Based Message Risk Analyzer Engine
 * Designed for client-side privacy, deterministic heuristics, and explainable AI-ready architecture.
 */

export const RISK_LEVELS = {
  HIGH: {
    label: 'High Risk',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    color: '#f43f5e',
    summary: 'Strong indicators of fraudulent or coercive intent detected. Proceed with extreme caution.',
    actionRequired: 'Do NOT click links, reply, or share any information. Consult verified official channels immediately.'
  },
  MODERATE: {
    label: 'Moderate Risk',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    color: '#f59e0b',
    summary: 'Suspicious elements or unusual requests detected. Needs independent verification.',
    actionRequired: 'Exercise high caution. Verify the sender identity through known telephone numbers or official apps.'
  },
  LOW: {
    label: 'Low Risk (Caution Advised)',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    color: '#10b981',
    summary: 'No obvious common scam patterns were detected in this text.',
    actionRequired: 'Remember: Absence of detected red flags is NOT a guarantee of safety. Stay vigilant with unexpected contacts.'
  }
};

// Comprehensive scam pattern dictionary
const PATTERN_DEFINITIONS = [
  // 1. Urgency & Coercive Threats
  {
    id: 'urgency_threat',
    category: 'Urgency & Coercive Pressure',
    severity: 'High',
    keywords: [
      'within 24 hours', 'immediate action required', 'account will be suspended',
      'account suspended', 'account blocked', 'disconnected tonight', 'power cut',
      'legal action', 'police arrest', 'arrest warrant', 'court notice', 'fir filed',
      'urgent notice', 'act now or', 'electricity will be disconnected', 'sim will be blocked',
      'kyc expired', 'kyc pending', 'card deactivated', 'pay immediately', 'last warning',
      'non-bailable warrant', 'customs detained'
    ],
    title: 'Manufactured Urgency or Legal/Service Threats',
    description: 'Scammers frequently fabricate strict deadlines, threats of disconnection, or fake arrest warrants to induce panic and bypass your rational judgment.',
    recommendation: 'Legitimate banks and utility providers do not disconnect services or demand urgent action via informal messages without prior formal paper/registered notices.'
  },

  // 2. Credential & Authentication Harvesting (OTP, Passwords, PIN)
  {
    id: 'otp_credential_harvesting',
    category: 'Credential & Authentication Harvesting',
    severity: 'Critical',
    keywords: [
      'share otp', 'send otp', 'enter otp', 'one time password', 'share your pin',
      'atm pin', 'upi pin to receive', 'enter pin to receive', 'cvv number', 'card expiry',
      'netbanking password', 'password reset link', 'tell us the code', 'forward this message',
      'verify your mpim', 'mpin', 'secret code'
    ],
    title: 'Explicit Request for Secret Credentials or OTP',
    description: 'The message asks for an OTP, UPI PIN, ATM PIN, or password. No legitimate entity, bank officer, or government agency will EVER ask for your OTP or PIN.',
    recommendation: 'NEVER share OTPs or PINs. In UPI, you NEVER need to enter a PIN to RECEIVE money; PIN is ONLY used when sending money from your account.'
  },

  // 3. Remote Access & Malicious App Installation
  {
    id: 'remote_access_software',
    category: 'Remote Device Hijacking',
    severity: 'Critical',
    keywords: [
      'anydesk', 'teamviewer', 'quicksupport', 'rustdesk', 'zoho assist', 'airmirror',
      'download apk', 'install apk', 'update app from link', '.apk', 'screen share',
      'allow access', 'grant permission', 'customer support tool'
    ],
    title: 'Request to Install Remote Control or Unknown Software',
    description: 'The message instructs you to install screen-sharing software (like AnyDesk or TeamViewer) or download an unknown .APK file. This allows attackers to view your screen, intercept OTPs, and take over your phone.',
    recommendation: 'Never install remote screen-sharing tools on instructions from an unknown caller or message. Immediately uninstall if downloaded.'
  },

  // 4. Fake Financial Rewards, Lottery & Cashbacks
  {
    id: 'fake_financial_reward',
    category: 'Lottery & False Reward Lures',
    severity: 'High',
    keywords: [
      'congratulations you won', 'won a lottery', 'kbc lottery', 'lucky draw',
      'cash prize of', 'claim your reward', 'free gift card', 'selected for iphone',
      'transfer charge to claim', 'refundable deposit to receive', 'processing fee for prize',
      'win rs', 'claim bonus', 'scratch card won'
    ],
    title: 'Unrealistic Prize or False Financial Reward',
    description: 'Claims that you have won a competition, lottery, or luxury item you never entered. They will inevitably ask for an "advance registration fee" or "customs tax" to release the funds.',
    recommendation: 'Genuine lotteries do not ask winners to pay an advance fee to receive their prize. Delete the message and do not engage.'
  },

  // 5. Part-time Job & Task Investment Scams
  {
    id: 'part_time_task_scam',
    category: 'Work-From-Home / Task Scam',
    severity: 'High',
    keywords: [
      'part time job', 'earn 2000 to 5000 daily', 'like youtube videos', 'subscribe to channels',
      'hotel review task', 'work from home salary', 'daily payout guaranteed', 'telegram task',
      'prepaid task', 'recharge task', 'crypto investment return', 'double your money in 24 hours',
      'vip task', 'freelance daily income'
    ],
    title: 'Guaranteed Daily Task / Job Offer Trap',
    description: 'Promises substantial daily earnings for trivial tasks like liking videos, rating hotels, or reviewing apps. Once initial trust is established, victims are trapped in "prepaid investment tasks" requiring lakhs of rupees.',
    recommendation: 'No legitimate employer pays thousands of rupees for simply liking videos. Never send money to unlock task payouts.'
  },

  // 6. Brand / Institution Impersonation
  {
    id: 'brand_impersonation',
    category: 'Entity & Authority Impersonation',
    severity: 'High',
    keywords: [
      'state bank of india', 'sbi yono', 'hdfc bank', 'icici bank', 'rbi notice',
      'income tax department', 'it refund approved', 'customs officer', 'fedex courier detained',
      'india post parcel failed', 'trai disconnected', 'telecom department', 'mumbai police',
      'delhi police', 'cbi officer', 'narcotics control bureau', 'digital arrest', 'bsnl kyc'
    ],
    title: 'Impersonation of Banks, Regulators, or Law Enforcement',
    description: 'The message poses as an established financial institution, courier service, or enforcement agency to command obedience and fear.',
    recommendation: 'Indian law enforcement does not conduct "digital arrests" via Skype/WhatsApp video calls. Contact your local police or bank via official directories.'
  },

  // 7. Suspicious Shorteners and Untrusted Links
  {
    id: 'suspicious_links',
    category: 'Deceptive Link / Vector',
    severity: 'High',
    keywords: [
      'bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.co', 'wa.me/', 't.me/',
      '.xyz/', '.top/', '.buzz/', '.click/', '.site/', 'http://', 'ip-check'
    ],
    title: 'Obfuscated Short Links or Suspicious Domains',
    description: 'The message contains URL shorteners or unverified web links designed to hide the true destination website.',
    recommendation: 'Do not click on shortened URLs from unverified senders. Manually navigate to official websites using bookmarks or search.'
  },

  // 8. Sensitive Personal Identification Harvesting
  {
    id: 'personal_identity_harvesting',
    category: 'Identity Theft Risk',
    severity: 'Medium',
    keywords: [
      'aadhaar card copy', 'pan card update', 'date of birth verification',
      'mother maiden name', 'upload id proof to link', 'biometric update link',
      'passport details'
    ],
    title: 'Unprompted Collection of National ID or Personal Details',
    description: 'Requests for sensitive identity documents (PAN, Aadhaar, Passport) can lead to identity theft, unauthorized loan applications, and SIM-swapping.',
    recommendation: 'Update KYC and official identity documents ONLY through the official banking app or in person at a registered branch.'
  }
];

/**
 * Analyzes raw message text against scam rules and heuristics.
 * @param {string} rawText
 * @returns {object} Analysis result
 */
export function analyzeMessage(rawText) {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length === 0) {
    throw new Error('Please enter message text to analyze.');
  }

  const text = rawText.toLowerCase();
  const detectedSigns = [];
  let score = 0;

  // Evaluate each pattern
  for (const def of PATTERN_DEFINITIONS) {
    const matchedSnippets = [];
    for (const kw of def.keywords) {
      if (text.includes(kw)) {
        matchedSnippets.push(kw);
      }
    }

    if (matchedSnippets.length > 0) {
      let weight = 1;
      if (def.severity === 'Critical') weight = 4;
      else if (def.severity === 'High') weight = 2.5;
      else if (def.severity === 'Medium') weight = 1.5;

      // Compound weighting if multiple triggers matched
      const categoryScore = weight + (matchedSnippets.length - 1) * 0.5;
      score += categoryScore;

      detectedSigns.push({
        id: def.id,
        category: def.category,
        title: def.title,
        severity: def.severity,
        description: def.description,
        recommendation: def.recommendation,
        matchedPhrases: Array.from(new Set(matchedSnippets))
      });
    }
  }

  // Heuristic additions: check for phone numbers / suspicious WhatsApp sender patterns
  const internationalCountryCodeRegex = /\+(?:92|880|234|62|84|254|971|44)\s?[0-9\-\s]{7,13}/g;
  const internationalMatches = text.match(internationalCountryCodeRegex);
  if (internationalMatches && internationalMatches.length > 0) {
    score += 2;
    detectedSigns.push({
      id: 'unusual_international_prefix',
      category: 'Sender Anomaly',
      title: 'Suspicious International Number Communication',
      severity: 'Medium',
      description: 'The communication references or originates from foreign international prefixes frequently abused by overseas scam rings targeting domestic users.',
      recommendation: 'Be cautious of domestic services contacting you from international phone codes.',
      matchedPhrases: internationalMatches
    });
  }

  // Additional heuristic: Look for raw payment handles or UPI IDs
  const upiRegex = /[a-zA-Z0-9.\-_]{2,49}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi)/g;
  const upiMatches = text.match(upiRegex);
  if (upiMatches && upiMatches.length > 0) {
    score += 1.5;
    detectedSigns.push({
      id: 'upi_payment_handle',
      category: 'Direct Payment Vector',
      title: 'Unverified UPI VPA / Payment Handle Detected',
      severity: 'High',
      description: `Detected UPI payment handles (${upiMatches.slice(0, 2).join(', ')}). Fraudsters frequently provide arbitrary personal UPI handles disguised as official merchant accounts.`,
      recommendation: 'Never send money to arbitrary UPI IDs shared in text messages for utility bills, KYC charges, or courier fees.',
      matchedPhrases: upiMatches
    });
  }

  // Determine Risk Tier
  let riskLevelKey = 'LOW';
  const hasCritical = detectedSigns.some(s => s.severity === 'Critical');
  const hasHigh = detectedSigns.some(s => s.severity === 'High');

  if (hasCritical || score >= 4 || (hasHigh && detectedSigns.length >= 2)) {
    riskLevelKey = 'HIGH';
  } else if (score >= 1.5 || hasHigh || detectedSigns.length >= 1) {
    riskLevelKey = 'MODERATE';
  } else {
    riskLevelKey = 'LOW';
  }

  const riskMeta = RISK_LEVELS[riskLevelKey];

  // Specific tailored verification steps
  const verificationSteps = generateVerificationSteps(riskLevelKey, detectedSigns);

  // Safety precautions
  const safetyPrecautions = [
    'Do not click on links embedded in this message.',
    'Do not share OTPs, PINs, or confidential credentials with anyone under any circumstance.',
    'Do not call back the phone number provided inside the message.',
    'Always use independently verified contact details (e.g., from the back of your debit card or the official app).',
    'If you have already transferred money or shared bank details, immediately dial 1930 (Indian Cyber Fraud Helpline) and notify your bank to freeze transactions.'
  ];

  return {
    riskLevel: riskLevelKey,
    riskMeta,
    riskScore: Math.min(Math.round(score * 10), 100),
    detectedSigns,
    totalSignsFound: detectedSigns.length,
    verificationSteps,
    safetyPrecautions,
    timestamp: new Date().toISOString(),
    isDefiniteSafeNotice: 'TrustLens is an awareness decision-support tool. A low risk score does not guarantee the message is safe, as zero-day attacks and targeted spear-phishing may not trigger common keyword patterns. Always exercise independent critical judgment.'
  };
}

/**
 * Generates tailored step-by-step verification instructions based on findings.
 */
function generateVerificationSteps(riskLevel, signs) {
  const steps = [];

  const hasUrgency = signs.some(s => s.id === 'urgency_threat');
  const hasCredential = signs.some(s => s.id === 'otp_credential_harvesting');
  const hasRemote = signs.some(s => s.id === 'remote_access_software');
  const hasJob = signs.some(s => s.id === 'part_time_task_scam');
  const hasReward = signs.some(s => s.id === 'fake_financial_reward');
  const hasBrand = signs.some(s => s.id === 'brand_impersonation');

  if (hasCredential || hasRemote) {
    steps.push({
      priority: 1,
      title: 'Halt all credential input immediately',
      detail: 'Never disclose OTP or install screen-sharing software. If you already did, immediately toggle Airplane Mode, turn off Wi-Fi, and call your bank from another phone.'
    });
  }

  if (hasBrand || hasUrgency) {
    steps.push({
      priority: 2,
      title: 'Verify directly via official app or website',
      detail: 'If the message claims your bank account, electricity, or SIM card is suspended, open the official provider app or visit their official branch website directly. Do not use any contact details provided in the message.'
    });
  }

  if (hasJob) {
    steps.push({
      priority: 3,
      title: 'Inspect company credentials and domain',
      detail: 'Search the company on LinkedIn or official career portals. Legitimate employers conduct formal interviews and do not operate hiring primarily through anonymous Telegram groups.'
    });
  }

  if (hasReward) {
    steps.push({
      priority: 4,
      title: 'Verify contest authenticity',
      detail: 'Ask yourself: Did you buy a ticket or enter this contest? If no, it is 100% mathematically impossible to have won. Ignore requests for processing fees.'
    });
  }

  // Default baseline steps
  if (steps.length === 0) {
    steps.push({
      priority: 1,
      title: 'Confirm sender origin',
      detail: 'Check the sender ID header (e.g., legitimate bank SMS headers in India have specific 6-character formats like VK-HDFCBK or VM-SBIINB, not regular 10-digit mobile numbers).'
    });
    steps.push({
      priority: 2,
      title: 'Consult someone you trust',
      detail: 'Before transferring money or sharing personal information, show the message to a technologically literate family member or colleague.'
    });
  }

  return steps;
}
