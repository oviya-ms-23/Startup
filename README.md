# TrustLens — The Digital Trust Assistant

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald.svg)](#privacy--security-principles)

> **"Think Before You Trust."**  
> *Understand digital threats before they become real problems.*

**TrustLens** is an open-source, privacy-first cybersecurity awareness and decision-support web application designed to help ordinary internet users, students, and senior citizens recognize digital scams, verify suspicious communications, inspect deceptive website links, and take immediate defensive action.

---

## 🛡️ Core Problems Addressed

Most digital safety solutions simply spit out binary labels (*"Safe"* or *"Unsafe"*) without explaining the attacker's methodology or coaching the user on how to verify claims independently.

TrustLens bridges this gap by:
1. **Demystifying Social Engineering Tactics:** Highlighting psychological triggers like manufactured urgency, fake authority intimidation, and deceptive task payouts.
2. **Transparent Explainability:** Explaining why an item is flagged, what the scammer intends to achieve, and what action you should take immediately.
3. **Zero-Trust Baseline:** Adhering strictly to the core principle: **Absence of detected red flags does not mean a communication is guaranteed safe.**
4. **Immediate Emergency Response:** Providing real-time crisis guidance, bank freezing procedures, and official Indian reporting pathways (**National Cyber Crime Helpline: 1930** and [cybercrime.gov.in](https://cybercrime.gov.in)).

---

## 🚀 Key Features

### 1. Message Risk Analyzer
- **Multimodal Inputs:** Accepts suspicious SMS texts, WhatsApp forwards, phishing emails, part-time job offers, and payment demands.
- **Rule-Based Heuristic Engine:** Detects urgency threats, OTP/PIN harvesting, remote access trojans (AnyDesk, TeamViewer), unrealistic lottery/task earnings, brand impersonations, and unverified UPI payment handles.
- **Explainable Verdicts:** Provides a Threat Index (0–100), classified risk levels (*High, Moderate, Low*), matched trigger phrases, and specific counter-actions.
- **Preset Test Scenarios:** Instant pre-loaded samples for electricity disconnection notices, fake YouTube job lures, bank KYC deactivation alerts, and courier customs fees.

### 2. Suspicious Link Inspector
- **Zero-Click Passive Analysis:** Pure lexical and structural inspection; **never opens or visits the target destination**.
- **Typosquatting & Brand Impersonation:** Flags lookalike domains mimicking SBI, HDFC, ICICI, Amazon, Netflix, Apple, India Post, and government tax portals.
- **Structural Anomaly Detection:** Detects raw IP address hostnames, unencrypted HTTP connections, nested subdomains, and suspicious URL shorteners (bit.ly, tinyurl, etc.).
- **Visual URL Anatomy:** Breaks down Protocol, Subdomain, Registered Domain, TLD, and Path.

### 3. Scam Education Centre
Interactive knowledge base covering the 8 most widespread scam vectors:
1. **Phishing & Smishing:** Deceptive bank & utility alert messages.
2. **UPI Payment Scams:** QR code debit traps and fake credit authorizations.
3. **Fake Job Offers:** YouTube/hotel rating task scams on Telegram.
4. **Lottery & Prize Scams:** Fake KBC/lucky draw advance fee fraud.
5. **Law Enforcement Impersonation:** Fake "Digital Arrest" calls by CBI/Customs/Police.
6. **OTP Fraud:** Social engineering attacks to steal authentication tokens.
7. **Fake Customer Support:** Search engine ad poisoning and fake toll-free lines.
8. **Malicious Links & APKs:** Android banking trojans and spyware installation.
*Includes interactive scenario drills with real-time feedback.*

### 4. Safety Action Centre & Emergency 1930 Guide
- **Golden Hour Protocol:** Step-by-step containment instructions during the critical first 2 hours after a fraudulent transfer.
- **National Reporting Resources:** Clear guidance for reporting through the **1930 Helpline** and the Indian **National Cyber Crime Reporting Portal** ([cybercrime.gov.in](https://cybercrime.gov.in)).
- **Bank Emergency Directory:** Instant access to 24x7 toll-free fraud helplines for major banks (SBI, HDFC, ICICI, Axis, PNB, Kotak, Bank of Baroda).
- **Copyable Incident Complaint Draft:** Formatted text template ready to paste into official police or bank grievance tickets.

### 5. Local Session Analysis History
- Revisit previous scans performed during the active browser session.
- Stored exclusively in local browser memory (`localStorage`).
- One-click option to completely wipe history at any time.

---

## 🔒 Privacy & Security Principles

- **Zero Remote Storage:** Your submitted text and URLs never leave your computer or smartphone.
- **No Third-Party AI Telemetry:** Analysis runs entirely on a transparent JavaScript heuristic engine executed client-side.
- **No Credential Collection:** TrustLens will never ask for your passwords, OTPs, Aadhaar numbers, or bank account credentials.
- **Safe Link Inspection:** The link inspector does not ping or send HTTP requests to suspicious URLs, preventing drive-by payload triggers.

---

## 📁 Project Architecture

```
Startup_website/
├── index.html                   # HTML entry point with fonts & meta tags
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom midnight cyber color scheme & glow utilities
├── vite.config.js               # Vite build tool configuration
├── vercel.json                  # Single Page Application routing config for Vercel
├── .gitignore                   # Git ignore specifications
└── src/
    ├── App.jsx                  # Root application orchestrator
    ├── main.jsx                 # React DOM mount point
    ├── index.css                # Tailwind base styles & glassmorphic classes
    ├── data/
    │   ├── sampleScams.js       # Preloaded test messages (utility, bank, job, lottery)
    │   ├── sampleLinks.js       # Preset test URLs for link inspection
    │   └── scamCategories.js    # Comprehensive dossiers for the 8 scam categories
    ├── utils/
    │   ├── messageAnalyzerEngine.js # Transparent rule-based scam detection engine
    │   └── linkInspectorEngine.js    # Passive zero-click URL threat analyzer
    └── components/
        ├── Navbar.jsx           # Sticky header, 1930 badge & session history trigger
        ├── HeroSection.jsx      # Headline, value proposition, and quick trust metrics
        ├── MessageAnalyzer.jsx  # Interactive message scanning workbench
        ├── RiskIndicator.jsx    # Visual risk gauge & disclaimer banner
        ├── WarningSigns.jsx     # Detailed red-flag breakdown cards
        ├── VerificationSteps.jsx # Tailored verification checklist & precautions
        ├── LinkInspector.jsx    # Zero-click URL inspector with anatomy breakdown
        ├── ScamEducation.jsx    # 8-category awareness academy with interactive drills
        ├── SafetyActionCentre.jsx # Incident protocol, bank directory & complaint draft
        ├── AnalysisHistory.jsx  # Slide-over session history drawer
        ├── HowItWorks.jsx       # Explainable heuristic architecture & roadmap
        └── Footer.jsx           # Legal disclaimers & verified official resources
```

---

## 🛠️ Local Installation & Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Setup Instructions

1. **Clone or navigate to the project directory:**
   ```bash
   cd Startup_website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚀 Pushing to GitHub

To publish this project to your own GitHub repository:

1. **Initialize Git:**
   ```bash
   git init
   ```

2. **Add and commit all project files:**
   ```bash
   git add .
   git commit -m "feat: complete TrustLens digital trust assistant MVP"
   ```

3. **Create a new repository on GitHub:**
   - Go to [GitHub.com/new](https://github.com/new).
   - Name your repository (e.g., `trustlens-assistant`).
   - Leave it public or private as desired.

4. **Link the remote and push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/trustlens-assistant.git
   git push -u origin main
   ```

---

## ☁️ Deploying to Vercel

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Push your code to GitHub as described above.
2. Sign in to [Vercel](https://vercel.com).
3. Click **"Add New Project"** and select your GitHub repository.
4. Vercel will automatically detect **Vite** as the framework preset:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **"Deploy"**. Your application will be live on a custom `.vercel.app` URL within 60 seconds!

### Option 2: Deploying via Vercel CLI
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command from the project root:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy preview or production builds (`vercel --prod`).

---

## ⚖️ Legal & Educational Disclaimer

TrustLens is an educational awareness and decision-support tool created to assist users in identifying common digital scam patterns and social engineering cues. It is **not** an accredited law enforcement agency, legal advisory, or licensed cybersecurity forensics service. TrustLens does not guarantee 100% detection of zero-day attacks or tailored spear-phishing campaigns.

If you have experienced financial fraud in India, immediately dial **1930** or visit [cybercrime.gov.in](https://cybercrime.gov.in).

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
