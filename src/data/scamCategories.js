export const SCAM_CATEGORIES = [
  {
    id: 'phishing',
    title: 'Phishing & Smishing Scams',
    shortTitle: 'Phishing',
    icon: 'MailWarning',
    badge: 'Most Common',
    summary: 'Deceptive emails or SMS messages disguised as banks, courier firms, or utility providers designed to steal passwords, PAN/Aadhaar data, and payment details.',
    howItWorks: [
      'Victim receives an urgent SMS (e.g. "Your bank account has been suspended" or "Your electricity will be cut off tonight").',
      'The message includes a link to a cloned website that looks almost identical to the genuine portal.',
      'Victim enters netbanking username, password, or debit card CVV.',
      'Scammers harvest these credentials in real time and initiate unauthorized fund transfers.'
    ],
    warningSigns: [
      'Urgent deadlines (e.g., "within 2 hours", "tonight at 9:30 PM").',
      'Sender ID is a normal 10-digit mobile number rather than an official alphanumeric registered header (like VK-SBIINB).',
      'Links pointing to shortened URLs (bit.ly) or strange extensions (.xyz, .top, .buzz).',
      'Spelling errors or grammatical oddities in corporate communication.'
    ],
    preventionTips: [
      'Never access banking services through SMS links. Always open your verified mobile banking app or type the official URL manually.',
      'Remember that banks never notify account suspension solely via SMS with a web link to fix it.',
      'Check the padlock and examine the full domain name before typing credentials.'
    ],
    quiz: {
      question: 'You receive an SMS from a 10-digit mobile number stating your electricity will be disconnected tonight unless you click a bit.ly link. What should you do?',
      options: [
        'Click the link to verify if your last bill was credited.',
        'Ignore the SMS link and check your status via the official DISCOM mobile app or electricity bill receipt.',
        'Call the mobile number back to speak to the representative.'
      ],
      correctIndex: 1,
      explanation: 'Official power distribution companies send transactional notices through registered enterprise SMS headers and will never cut power within hours via an unverified bit.ly link.'
    }
  },
  {
    id: 'upi_scams',
    title: 'UPI & Payment Gateway Fraud',
    shortTitle: 'UPI Scams',
    icon: 'QrCode',
    badge: 'Financial Threat',
    summary: 'Tricking users into sending money under the belief they are receiving payments, refunds, or cashback rewards.',
    howItWorks: [
      'Scammer poses as a buyer on OLX/Facebook Marketplace or an executive offering cashback.',
      'They claim: "I am sending you Rs 5,000. Just scan this QR code or enter your UPI PIN to approve the credit."',
      'Victim enters UPI PIN thinking it will receive the funds.',
      'Entering a UPI PIN authorizes a DEBIT, instantly draining the funds from the victim\'s bank account.'
    ],
    warningSigns: [
      'Anyone claiming you must enter your UPI PIN to "receive" or "accept" money.',
      'Being asked to scan a QR code sent over WhatsApp to receive money.',
      'Requests to transfer a nominal Rs 1 or Rs 5 first to "verify" or "link" your account.'
    ],
    preventionTips: [
      'GOLDEN RULE OF UPI: UPI PIN is ONLY needed when money leaves your bank account. You NEVER need a PIN to receive money.',
      'Scanning a QR code always sends money out; it never puts money into your wallet.',
      'Block anyone immediately who insists on a PIN entry for receiving refunds or payments.'
    ],
    quiz: {
      question: 'A buyer on an online marketplace sends you a QR code and says scanning it will credit your bank account with Rs 2,500. What is happening?',
      options: [
        'It is a standard UPI merchant payment process.',
        'Scanning a QR code and entering your PIN will debit Rs 2,500 from YOUR account, not credit it.',
        'It is safe as long as the amount shown matches the agreed price.'
      ],
      correctIndex: 1,
      explanation: 'In the Indian UPI framework, QR codes and UPI PINs are exclusively debit triggers. Receiving money happens automatically without PIN authorization.'
    }
  },
  {
    id: 'fake_jobs',
    title: 'Part-Time Tasks & Fake Job Offers',
    shortTitle: 'Fake Job Offers',
    icon: 'Briefcase',
    badge: 'Growing Vector',
    summary: 'Offers of substantial daily income for trivial online tasks (liking YouTube videos, reviewing hotels) that rapidly morph into massive investment traps.',
    howItWorks: [
      'Unsolicited WhatsApp or Telegram message from an alleged HR recruiter promising Rs 3,000-8,000/day.',
      'Victim is asked to complete simple tasks (like 3 YouTube videos) and actually receives Rs 150-500 via UPI to establish trust.',
      'Victim is invited to a VIP Telegram group with alleged "colleagues" celebrating massive payouts.',
      'Victim is asked to invest "prepaid task" funds (e.g., deposit Rs 10,000 to earn Rs 15,000). Once large sums are deposited, withdrawals are frozen and scammers vanish.'
    ],
    warningSigns: [
      'High daily compensation for minimal, non-skilled work like liking social media posts.',
      'Recruitment conducted entirely via WhatsApp or Telegram without interviews or official email domains.',
      'Being asked to pay money, purchase cryptocurrency, or make "security deposits" to unlock your salary.'
    ],
    preventionTips: [
      'Legitimate companies never ask employees or freelancers to pay money to receive their wages.',
      'Small initial payouts are intentional psychological bait to lower your guard.',
      'Verify company openings on their official career portal or LinkedIn, not on Telegram channels.'
    ],
    quiz: {
      question: 'A Telegram task manager pays you Rs 300 for liking 5 videos, but now demands Rs 5,000 for a "VIP Prepaid Task" that will allegedly pay back Rs 8,000. What should you do?',
      options: [
        'Deposit the Rs 5,000 because they already proved their honesty with the first payout.',
        'Stop immediately, report the group, and do not send any money — the first payout was bait for a classic task scam.',
        'Ask to start with Rs 2,500 instead.'
      ],
      correctIndex: 1,
      explanation: 'The initial small payout is a calculated scammer investment to build trust before orchestrating an advance-fee fraud.'
    }
  },
  {
    id: 'lottery_prizes',
    title: 'Lottery & False Prize Scams',
    shortTitle: 'Lottery / Prizes',
    icon: 'Trophy',
    badge: 'Psychological Trap',
    summary: 'Notices claiming you won millions in a popular contest or lucky draw, with the catch that you must pay upfront taxes or processing fees.',
    howItWorks: [
      'Message arrives announcing you have won Rs 25 Lakh in KBC, a shopping lucky draw, or an international lottery.',
      'An alleged "claims officer" provides fake certificates, logos, and bank account numbers.',
      'Victim is told to deposit "GST clearance charges", "customs registration fee", or "stamp duty".',
      'The demands for fees continue indefinitely until the victim realizes no prize exists.'
    ],
    warningSigns: [
      'You won a prize for a contest or draw you never entered.',
      'Demand for advance processing fees or taxes to release your prize money.',
      'Urgent calls from foreign or unfamiliar phone numbers urging immediate compliance.'
    ],
    preventionTips: [
      'It is mathematically impossible to win a lottery you did not buy a ticket for.',
      'Under Indian and international law, genuine prizes deduct applicable taxes at source (TDS); winners are never asked to remit fees to personal UPI handles.',
      'Do not engage, call back, or send "small confirmation deposits".'
    ],
    quiz: {
      question: 'You receive a WhatsApp message featuring the KBC logo stating your SIM card won Rs 25 Lakh, but you must pay Rs 3,500 registration tax. Is this genuine?',
      options: [
        'Yes, because prizes in India require GST clearance.',
        'No, legitimate lotteries deduct taxes at source (TDS) and KBC never conducts lucky draws on random mobile numbers.',
        'Yes, provided the officer sends you his photo ID.'
      ],
      correctIndex: 1,
      explanation: 'KBC and Sony TV have repeatedly issued public warnings that they do not conduct random SIM card lucky draws, and demanding advance fees for lottery release is always fraud.'
    }
  },
  {
    id: 'identity_impersonation',
    title: 'Law Enforcement & Authority Impersonation',
    shortTitle: 'Digital Arrest / Authority',
    icon: 'ShieldAlert',
    badge: 'Coercive Threat',
    summary: 'Scammers posing as Police officers, CBI, Customs, or Telecom (TRAI) officials threatening fake "digital arrest" or legal prosecution.',
    howItWorks: [
      'Call or message claiming a courier in your name contains narcotics, fake passports, or illegal SIMs.',
      'The call is "transferred" to fake officers dressed in police uniforms sitting against fake police station backdrops on Skype/WhatsApp video calls.',
      'They accuse the victim of money laundering and place them under "digital arrest", demanding they stay on camera for hours.',
      'They coerce the victim into transferring their life savings into "RBI verification security accounts" which are fraudulent mule accounts.'
    ],
    warningSigns: [
      'Claims of "digital arrest" via Skype, WhatsApp, or video conference.',
      'Demands to keep the video call on 24/7 without informing family or lawyers.',
      'Instructions to transfer money to "secure government bank accounts" for verification.'
    ],
    preventionTips: [
      'There is NO provision for "digital arrest" under the Indian Penal Code, Bharatiya Nyaya Sanhita, or Code of Criminal Procedure.',
      'Police, CBI, Enforcement Directorate, and Customs NEVER conduct interrogations or make arrests via video calls.',
      'No government agency will ever ask you to transfer your money to any bank account for "verification".'
    ],
    quiz: {
      question: 'A person on a Skype video call wearing a police uniform claims a parcel with your Aadhaar contains illegal drugs and orders you to transfer Rs 2 Lakh to an "RBI verification account" under digital arrest. What should you do?',
      options: [
        'Transfer the money immediately to avoid being arrested at your home.',
        'Disconnect the call immediately and dial 1930 or visit your local police station — "digital arrest" is an elaborate scam.',
        'Stay on the call and ask for their badge number.'
      ],
      correctIndex: 1,
      explanation: 'The Indian Ministry of Home Affairs has explicitly warned that "digital arrest" is a scam. No genuine law enforcement agency demands fund transfers for investigation.'
    }
  },
  {
    id: 'otp_fraud',
    title: 'OTP & Authentication Interception',
    shortTitle: 'OTP Fraud',
    icon: 'KeyRound',
    badge: 'Authentication Risk',
    summary: 'Social engineering tactics aimed at getting users to disclose one-time passwords generated during financial transactions or account recoveries.',
    howItWorks: [
      'Scammer initiates a transaction on an e-commerce or netbanking platform using previously leaked card details.',
      'The bank sends an OTP to the victim’s phone.',
      'Scammer immediately calls posing as a bank manager, courier delivery boy, or tech support agent: "Sir, I sent a cancellation code, please tell me the 6 digits so I can cancel the fraudulent transaction."',
      'Victim reads out the OTP, completing the fraudulent debit.'
    ],
    warningSigns: [
      'Anyone calling and asking for an OTP that just arrived on your mobile phone.',
      'The OTP SMS clearly reads "Do not share this OTP with anyone", yet the caller insists it is needed for "verification" or "cancellation".',
      'High-pressure insistence that the code will expire in 60 seconds.'
    ],
    preventionTips: [
      'Read the actual SMS body containing the OTP: it tells you what the code is for (e.g. "OTP for Rs 15,000 purchase at Amazon").',
      'No bank executive, customer support agent, or telecom employee is ever authorized to ask for your OTP.',
      'Treat OTPs like your ATM PIN — strictly private to your own eyes.'
    ],
    quiz: {
      question: 'A caller claiming to be from your bank says an unauthorized transaction of Rs 10,000 is occurring and asks for the OTP just sent to your phone to cancel it. What is the truth?',
      options: [
        'Sharing the OTP allows the caller to stop the transaction.',
        'The caller initiated the transaction and needs the OTP from you to complete the theft.',
        'You should read the first 3 digits only.'
      ],
      correctIndex: 1,
      explanation: 'Sharing an OTP never cancels a transaction. The scammer triggered the transaction themselves and is using social engineering so you authorize their theft.'
    }
  },
  {
    id: 'fake_support',
    title: 'Fake Customer Support & Search Engine Ads',
    shortTitle: 'Fake Customer Support',
    icon: 'Headphones',
    badge: 'Deceptive Support',
    summary: 'Fraudulent contact numbers placed on Google search ads, Google Maps, and social media posing as airlines, banks, food delivery, or courier helplines.',
    howItWorks: [
      'A user searches Google for "Swiggy refund helpline" or "IndiGo airlines customer care".',
      'Scammers purchase Google Search Ads or edit phone numbers on Google Maps business listings.',
      'User dials the number and reaches a scam call center.',
      'Scammer instructs the user to download AnyDesk or click a refund link to process a Rs 200 refund, and steals thousands from their account.'
    ],
    warningSigns: [
      'Customer support numbers that are normal 10-digit mobile numbers rather than official 1800 toll-free lines.',
      'Support agent asking you to download screen-sharing apps like AnyDesk or TeamViewer.',
      'Agent asking for your debit card CVV, expiry date, or asking you to make a Rs 5 payment to verify refund.'
    ],
    preventionTips: [
      'Never search for customer support phone numbers on generic search engine results.',
      'Always access customer support directly from inside the official company app (e.g., Zomato, Swiggy, Amazon, IRCTC).',
      'Legitimate customer care will never ask you to install AnyDesk or share your screen.'
    ],
    quiz: {
      question: 'You want a refund for a failed food delivery order. How should you find customer support?',
      options: [
        'Search Google for "[App Name] toll free customer care number" and call the first sponsored phone number.',
        'Use the "Help" or "Support" section directly inside the official app you placed the order with.',
        'Look up numbers listed in user comments on social media.'
      ],
      correctIndex: 1,
      explanation: 'Search engine results are frequently poisoned by fraudulent ads. In-app chat/support is the only authenticated channel.'
    }
  },
  {
    id: 'malicious_links',
    title: 'Malicious Links & Malicious APKs',
    shortTitle: 'Malicious Links & APKs',
    icon: 'Link2',
    badge: 'Malware Threat',
    summary: 'Links that trick users into downloading malicious Android application package files (.APK) disguised as bill update utilities or lottery apps.',
    howItWorks: [
      'User is sent a link via WhatsApp: "Click here to download new YONO SBI update.apk" or "PM Kisan Yojana subsidy form.apk".',
      'The file bypasses the Google Play Store because it contains spyware.',
      'Once installed, the malicious app requests Accessibility permissions and SMS read permissions.',
      'The app silently intercepts all banking OTPs and forwards them to the attacker without displaying notifications on the victim\'s screen.'
    ],
    warningSigns: [
      'Links prompting you to download files ending in `.apk`.',
      'Instructions telling you to enable "Install unknown apps" or disable Play Protect in phone settings.',
      'Apps demanding broad SMS or Accessibility service permissions upon launch.'
    ],
    preventionTips: [
      'Never download or sideload .APK files received via WhatsApp, Telegram, or SMS links.',
      'Only install apps through official app stores (Google Play Store, Apple App Store).',
      'Keep Google Play Protect active at all times on Android devices.'
    ],
    quiz: {
      question: 'An SMS asks you to download an "sbi-kyc-update.apk" file directly from a web link. What should you do?',
      options: [
        'Download and install it to keep your bank account active.',
        'Never install APK files from external links; official bank apps are only distributed through Google Play Store or Apple App Store.',
        'Scan it with phone antivirus and install if clean.'
      ],
      correctIndex: 1,
      explanation: 'APKs shared via SMS or messaging apps are the primary distribution vector for mobile banking trojans. Banks never distribute updates via direct file downloads.'
    }
  }
];
