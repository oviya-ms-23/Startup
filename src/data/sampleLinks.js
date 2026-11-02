export const SAMPLE_LINKS = [
  {
    id: 'link_sbi_phishing',
    title: 'Fake SBI KYC Portal (.xyz domain)',
    url: 'https://sbi-netbanking-verify.xyz/update-kyc',
    expectedRisk: 'High Risk',
    notes: 'Impersonates State Bank of India on a suspicious .xyz domain with sensitive action path.'
  },
  {
    id: 'link_ip_address_login',
    title: 'Raw IP Hostname Banking Link',
    url: 'http://192.168.10.45/secure/update-pan.html',
    expectedRisk: 'High Risk',
    notes: 'Insecure unencrypted HTTP protocol with raw IP address instead of registered domain.'
  },
  {
    id: 'link_shortener_lure',
    title: 'Masked URL Shortener Prize Link',
    url: 'https://bit.ly/claim-free-iphone16-gift',
    expectedRisk: 'High Risk',
    notes: 'Shortener masks destination and includes obvious bait keywords.'
  },
  {
    id: 'link_amazon_delivery_top',
    title: 'Amazon Spoof with .top TLD',
    url: 'https://amazon-order-delivery.top/track',
    expectedRisk: 'High Risk',
    notes: 'Unauthorized use of Amazon brand on high-risk .top extension.'
  },
  {
    id: 'link_legitimate_sbi',
    title: 'Official State Bank of India Portal',
    url: 'https://www.onlinesbi.sbi/',
    expectedRisk: 'Low Risk (Caution Advised)',
    notes: 'Authorized domain under official .sbi high-trust top-level domain.'
  }
];
