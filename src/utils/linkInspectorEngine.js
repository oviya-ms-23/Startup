/**
 * TrustLens - Link Safety Inspector (Passive / Zero-Click Lexical Analysis)
 * Inspects URLs purely through structure, string heuristics, brand signatures, and TLD checks.
 * NEVER makes outgoing network requests to potentially malicious destinations.
 */

// Known URL shorteners
const KNOWN_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.co', 'ow.ly', 'buff.ly',
  'adf.ly', 'bit.do', 'rb.gy', 'shorte.st', 'trib.al', 'rebrand.ly', 's.id'
];

// High-risk or frequently scam-abused Top-Level Domains (TLDs)
const SUSPICIOUS_TLDS = [
  'xyz', 'top', 'buzz', 'cc', 'work', 'icu', 'fun', 'stream', 'download',
  'click', 'site', 'rest', 'gq', 'cf', 'tk', 'ml', 'ga', 'space', 'monster',
  'vip', 'hair', 'bond', 'beauty', 'quest', 'skin', 'autos', 'boats'
];

// High-profile target brands commonly impersonated in phishing
const TARGET_BRANDS = [
  { name: 'State Bank of India', brandTerms: ['sbi', 'onlinesbi', 'sbiyono', 'yonosbi'], legitDomains: ['onlinesbi.sbi', 'sbi.co.in', 'sbicard.com'] },
  { name: 'HDFC Bank', brandTerms: ['hdfc', 'hdfcbank', 'netbanking.hdfcbank'], legitDomains: ['hdfcbank.com', 'hdfc.com'] },
  { name: 'ICICI Bank', brandTerms: ['icici', 'icicibank', 'imobile'], legitDomains: ['icicibank.com'] },
  { name: 'Punjab National Bank', brandTerms: ['pnb', 'pnbnetbanking'], legitDomains: ['pnbindia.in'] },
  { name: 'Axis Bank', brandTerms: ['axisbank', 'axis'], legitDomains: ['axisbank.com'] },
  { name: 'Paytm', brandTerms: ['paytm', 'paytmbank'], legitDomains: ['paytm.com', 'paytmbank.com'] },
  { name: 'PhonePe', brandTerms: ['phonepe'], legitDomains: ['phonepe.com'] },
  { name: 'Google', brandTerms: ['google', 'gmail', 'googlepay', 'gpay'], legitDomains: ['google.com', 'google.co.in', 'pay.google.com'] },
  { name: 'Amazon', brandTerms: ['amazon', 'amazn', 'amazonpay'], legitDomains: ['amazon.com', 'amazon.in'] },
  { name: 'Netflix', brandTerms: ['netflix', 'netfliix'], legitDomains: ['netflix.com'] },
  { name: 'Apple', brandTerms: ['apple', 'icloud', 'appleid'], legitDomains: ['apple.com', 'icloud.com'] },
  { name: 'India Post', brandTerms: ['indiapost', 'speedpost'], legitDomains: ['indiapost.gov.in'] },
  { name: 'Income Tax India', brandTerms: ['incometax', 'incometaxindia', 'efiling'], legitDomains: ['incometax.gov.in', 'tin-nsdl.com'] },
  { name: 'Electricity Board', brandTerms: ['bescom', 'mahadiscom', 'tneb', 'bses', 'upcl', 'dhbvn'], legitDomains: [] }
];

/**
 * Inspect a URL without executing network calls.
 * @param {string} inputUrl
 * @returns {object} Inspection result
 */
export function inspectLink(inputUrl) {
  if (!inputUrl || typeof inputUrl !== 'string' || inputUrl.trim().length === 0) {
    throw new Error('Please enter a website URL to inspect.');
  }

  let sanitized = inputUrl.trim();
  if (!/^https?:\/\//i.test(sanitized)) {
    sanitized = 'http://' + sanitized;
  }

  let parsed;
  try {
    parsed = new URL(sanitized);
  } catch (err) {
    throw new Error('Invalid URL format. Please ensure the address contains a valid host or domain name.');
  }

  const flags = [];
  let threatScore = 0;

  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();

  // 1. Check IP address hostname
  const ipV4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipV4Regex.test(hostname)) {
    flags.push({
      severity: 'Critical',
      title: 'Raw IP Address Hostname Detected',
      description: `The URL uses a numeric IP address (${hostname}) instead of a registered domain name. Legitimate public services and banks almost universally use branded domain names. Numeric IP URLs are a major signature of malicious servers or botnets.`,
      recommendation: 'Do NOT open this link. It completely bypasses normal domain registration transparency.'
    });
    threatScore += 35;
  }

  // 2. Check Protocol (Insecure HTTP)
  if (protocol === 'http:') {
    flags.push({
      severity: 'High',
      title: 'Insecure Protocol (Unencrypted HTTP)',
      description: 'The link does not use SSL/TLS encryption (HTTPS). Any sensitive data entered on this site can be intercepted or modified by third parties on the same network.',
      recommendation: 'Modern financial and identity verification websites strictly enforce HTTPS. Never input passwords or cards on unencrypted HTTP pages.'
    });
    threatScore += 20;
  }

  // 3. Check for Known Shorteners
  const isShortener = KNOWN_SHORTENERS.some(short => hostname === short || hostname.endsWith('.' + short));
  if (isShortener) {
    flags.push({
      severity: 'High',
      title: 'URL Shortener Masks Destination',
      description: `This link uses a URL redirection service (${hostname}). Shorteners intentionally obscure the true destination hostname, making it impossible to see where you will land before clicking.`,
      recommendation: 'Use a public unshortener service or expander tool before visiting. Never enter credentials following a shortened link.'
    });
    threatScore += 25;
  }

  // 4. Extract TLD & Check High-Risk TLDs
  const domainParts = hostname.split('.');
  const tld = domainParts.length > 1 ? domainParts[domainParts.length - 1] : '';
  if (SUSPICIOUS_TLDS.includes(tld)) {
    flags.push({
      severity: 'High',
      title: `High-Risk Top-Level Domain (.${tld})`,
      description: `The domain uses the .${tld} extension. These top-level domains are heavily leveraged by phishing syndicates due to cheap or anonymous bulk registration promotions.`,
      recommendation: 'Verify why an established brand or official entity would operate on an unusual generic TLD.'
    });
    threatScore += 25;
  }

  // 5. Check for Brand Impersonation / Typosquatting
  let impersonatedBrand = null;
  for (const brand of TARGET_BRANDS) {
    // Check if brand keyword is in hostname
    for (const term of brand.brandTerms) {
      if (hostname.includes(term)) {
        // Check if the domain is among legitimate domains
        const isLegitimate = brand.legitDomains.some(legit => hostname === legit || hostname.endsWith('.' + legit));
        if (!isLegitimate) {
          impersonatedBrand = brand.name;
          flags.push({
            severity: 'Critical',
            title: `Potential Brand Impersonation (${brand.name})`,
            description: `The URL contains terms associated with "${brand.name}", but the host (${hostname}) does not match any official authorized domains (${brand.legitDomains.join(', ') || 'Official Portals'}).`,
            recommendation: `This is a classic typosquatting or phishing trap. Access ${brand.name} strictly by searching via official search engines or bookmarking the verified URL.`
          });
          threatScore += 40;
          break;
        }
      }
    }
    if (impersonatedBrand) break;
  }

  // 6. Subdomain Trickery (e.g., sbi.com.account-update.xyz)
  if (domainParts.length >= 4) {
    flags.push({
      severity: 'Medium',
      title: 'Excessive Subdomain Stacking',
      description: `The hostname contains multiple levels of subdomains (${hostname}). Scammers frequently place legitimate brand names in the subdomain prefix (e.g. "sbi.com.fakeportal.net") to mislead mobile users whose address bars hide the end of the URL.`,
      recommendation: 'Examine the right-most portion of the domain name immediately before the first slash. That is the true domain owner.'
    });
    threatScore += 15;
  }

  // 7. Suspicious Path or Sensitive Action Keywords in Path
  const suspiciousPathKeywords = ['update-kyc', 'pan-verification', 'claim-reward', 'free-gift', 'login-verify', 'wallet-recharge', 'bank-security', 'refund-portal'];
  const matchedPathKeywords = suspiciousPathKeywords.filter(kw => pathname.includes(kw));
  if (matchedPathKeywords.length > 0) {
    flags.push({
      severity: 'Medium',
      title: 'High-Risk Action Path Identified',
      description: `The URL path includes sensitive keywords (${matchedPathKeywords.join(', ')}). In combination with unverified domains, this often points directly to fake phishing credential collection forms.`,
      recommendation: 'Do not submit any personal forms or account identifiers on this page.'
    });
    threatScore += 15;
  }

  // 8. Determine Risk Classification
  let riskLevel = 'LOW';
  if (threatScore >= 35 || flags.some(f => f.severity === 'Critical')) {
    riskLevel = 'HIGH';
  } else if (threatScore >= 15 || flags.some(f => f.severity === 'High')) {
    riskLevel = 'MODERATE';
  } else {
    riskLevel = 'LOW';
  }

  return {
    rawUrl: inputUrl,
    sanitizedUrl: sanitized,
    anatomy: {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      domain: domainParts.slice(-2).join('.'),
      tld: '.' + tld,
      subdomain: domainParts.length > 2 ? domainParts.slice(0, -2).join('.') : '(none)',
      pathname: parsed.pathname || '/',
      port: parsed.port || (parsed.protocol === 'https:' ? '443' : '80')
    },
    riskLevel,
    threatScore: Math.min(threatScore, 100),
    flags,
    impersonatedBrand,
    timestamp: new Date().toISOString(),
    disclaimer: 'Zero-Click Analysis: TrustLens did NOT connect to this server. Preliminary structural inspection cannot guarantee a website is safe. Even HTTPS sites with clean names can host malicious content or malware.'
  };
}
