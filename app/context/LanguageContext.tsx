"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "si" | "ta";

export interface LanguageInfo {
  code: Language;
  label: string;
  nativeLabel: string;
  shortLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "en", label: "English", shortLabel: "EN", nativeLabel: "English", flag: "🇬🇧" },
  { code: "si", label: "Sinhala", shortLabel: "සිං", nativeLabel: "සිංහල", flag: "🇱🇰" },
  { code: "ta", label: "Tamil", shortLabel: "தமி", nativeLabel: "தமிழ்", flag: "🇱🇰" },
];

export const translations = {
  en: {
    // Navigation
    solutions: "Solutions",
    pricing: "Pricing",
    developer: "Developer",
    media: "Media",
    aboutUs: "About us",
    careers: "Careers",
    login: "Log in",
    signup: "Sign up",
    coreSolutions: "Core Solutions",
    productSuite: "Product Suite",
    brandPromise: "Every Transaction Multiplies Value",
    exploreAllSolutions: "Explore all solutions",
    xgatewayDesc: "Digital checkout, webhooks & multi-currency IPG",
    xposDesc: "Android smart POS terminals & instant counter sync",
    xsplitDesc: "BNPL & split instalments",
    xqrDesc: "Dynamic LankaQR, UPI & Alipay+",
    xcollectorDesc: "Field agent doorstep collections",
    xsupplierDesc: "B2B buyer credit & instant payouts",
    online: "Online",
    inStore: "In-Store",

    // Hero
    heroHeadline: "Lead the Future of Digital Payments in Sri Lanka",
    heroSubtitle: "Sri Lanka's leading digital finance platform connecting merchants, citizens, and government on one trusted rail.",
    scaleAndReliability: "Scale & Reliability",
    trustedByThousands: "Trusted by thousands in",
    sriLanka: "Sri Lanka.",
    trustSubtitle: "We enable seamless digital transactions and support sustainable business growth with affordable, bank-grade payment solutions built for islandwide reach.",
    cbslRegulated: "CBSL Regulated & Licensed",
    pciCertified: "PCI-DSS Level 1 Certified",

    // Stats
    statVolumeLabel: "Total Transaction Volume",
    statVolumeSub: "Cumulative processing across all rails",
    statVolumeBadge: "Scale",
    statMerchantsLabel: "Merchants Nationwide",
    statMerchantsSub: "Retailers, SMEs & enterprise brands",
    statMerchantsBadge: "Network",
    statMonthlyTxLabel: "Transactions Every Month",
    statMonthlyTxSub: "High-frequency real-time throughput",
    statMonthlyTxBadge: "Monthly",
    statProcessedLabel: "Processed Monthly",
    statProcessedSub: "Consistent instant settlement volume",
    statProcessedBadge: "Volume",
    trustedBankingPartners: "Trusted Banking Partners",
    supportedPaymentMethods: "Supported Payment Options",

    // Core Solutions
    twoCoreSolutions: "Two Core Solutions.",
    coreSolutionsDesc: "Engineered to power frictionless online checkout and unified in-store counter operations.",
    xgatewayTitle: "Internet Payment Gateway (IPG)",
    xgatewaySub: "Accept Visa, Mastercard, LankaPay, UPI, WeChat Pay, and Alipay+ through one secure hosted or API checkout.",
    xposTitle: "Unified Smart POS Platform",
    xposSub: "Smart Android terminals designed for retail, hospitality, delivery, and unattended kiosks with real-time settlement.",

    // Product Suite
    productSuiteHeading: "Specialized Financial Rails",
    productSuiteSub: "Modular payment products built for custom workflows, instalments, collections, and automated supply chains.",

    // CTA
    readyToScale: "Ready to scale your payments?",
    ctaTitle: "Start multiplying your business value today.",
    ctaSubtitle: "Join over 40,000 businesses across Sri Lanka using WEBXPAY to accept digital payments anywhere, anytime.",
    getStartedNow: "Get Started Now",
    talkToSales: "Talk to Sales",

    // Footer
    products: "Products",
    company: "Company",
    resources: "Resources",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    poweredBy: "Powered by SEBS LABS",
    languageSelect: "Language",
  },
  si: {
    // Navigation
    solutions: "විසඳුම්",
    pricing: "ගාස්තු",
    developer: "සංවර්ධකයින්",
    media: "මාධ්‍ය",
    aboutUs: "අප ගැන",
    careers: "වෘත්තීය අවස්ථා",
    login: "ඇතුල් වන්න",
    signup: "ලියාපදිංචි වන්න",
    coreSolutions: "ප්‍රධාන විසඳුම්",
    productSuite: "නිෂ්පාදන පෙළ",
    brandPromise: "සෑම ගනුදෙනුවකින්ම වටිනාකම වැඩි කරයි",
    exploreAllSolutions: "සියලු විසඳුම් බලන්න",
    xgatewayDesc: "ඩිජිටල් ගෙවීම්, වෙබ්හුක්ස් සහ බහු-මුදල් IPG",
    xposDesc: "ඇන්ඩ්‍රොයිඩ් ස්මාර්ට් POS පර්යන්ත සහ කවුන්ටර සමමුහුර්තකරණය",
    xsplitDesc: "පසුව ගෙවීමේ (BNPL) සහ වාරික ගෙවීම්",
    xqrDesc: "ලංකාQR, UPI සහ Alipay+ ක්ෂණික ගෙවීම්",
    xcollectorDesc: "ක්ෂේත්‍ර නියෝජිත දොරකඩ එකතු කිරීම්",
    xsupplierDesc: "B2B ගැනුම්කරු ණය සහ ක්ෂණික ගෙවීම්",
    online: "මාර්ගගත",
    inStore: "වෙළඳසැල තුළ",

    // Hero
    heroHeadline: "ශ්‍රී ලංකාවේ ඩිජිටල් ගෙවීම් අනාගතයට නායකත්වය දෙන්න",
    heroSubtitle: "එක් විශ්වාසනීය පද්ධතියක් හරහා වෙළඳුන්, පාරිභෝගිකයින් සහ ආයතන සම්බන්ධ කරන ශ්‍රී ලංකාවේ ප්‍රමුඛතම ඩිජිටල් මූල්‍ය වේදිකාව.",
    scaleAndReliability: "පරිමාණය සහ විශ්වාසනීයත්වය",
    trustedByThousands: "දහස් ගණනක් ව්‍යාපාරිකයින්ගේ විශ්වාසය දිනූ",
    sriLanka: "ශ්‍රී ලංකාවේ.",
    trustSubtitle: "දිවයින පුරා ව්‍යාප්ත, දැරිය හැකි සහ බැංකු මට්ටමේ ආරක්ෂිත ගෙවීම් විසඳුම් සමඟ ඔබේ ව්‍යාපාර වර්ධනයට අපි ශක්තියක් වෙමු.",
    cbslRegulated: "මහ බැංකුව (CBSL) මගින් නියාමිතයි",
    pciCertified: "PCI-DSS මට්ටම 1 සහතික ලත්",

    // Stats
    statVolumeLabel: "සමස්ත ගනුදෙනු වටිනාකම",
    statVolumeSub: "සියලුම ගෙවීම් මාර්ග හරහා සම්පූර්ණ ප්‍රමාණය",
    statVolumeBadge: "පරිමාණය",
    statMerchantsLabel: "දිවයින පුරා වෙළඳුන්",
    statMerchantsSub: "සිල්ලර, කුඩා හා මධ්‍ය පරිමාණ සහ ප්‍රමුඛ වෙළඳ නාම",
    statMerchantsBadge: "ජාලය",
    statMonthlyTxLabel: "මාසික ගනුදෙනු සංඛ්‍යාව",
    statMonthlyTxSub: "අධිවේගී තත්‍ය කාලීන ගනුදෙනු ධාරිතාව",
    statMonthlyTxBadge: "මාසික",
    statProcessedLabel: "මාසිකව සැකසූ මුදල",
    statProcessedSub: "ස්ථාවර සහ ක්ෂණික පියවීම් වටිනාකම",
    statProcessedBadge: "වටිනාකම",
    trustedBankingPartners: "විශ්වාසනීය බැංකු සහකරුවන්",
    supportedPaymentMethods: "පිළිගත් ගෙවීම් ක්‍රම",

    // Core Solutions
    twoCoreSolutions: "ප්‍රධාන විසඳුම් දෙකක්.",
    coreSolutionsDesc: "මාර්ගගත ගෙවීම් සහ වෙළඳසැල් කවුන්ටර මෙහෙයුම් එකම පද්ධතියකින් සවිබල ගැන්වීම සඳහා නිර්මාණය කර ඇත.",
    xgatewayTitle: "අන්තර්ජාල ගෙවීම් ද්වාරය (IPG)",
    xgatewaySub: "Visa, Mastercard, LankaPay, UPI, WeChat Pay, සහ Alipay+ එකම ආරක්ෂිත පද්ධතියකින් භාරගන්න.",
    xposTitle: "ඒකාබද්ධ ස්මාර්ට් POS වේදිකාව",
    xposSub: "සිල්ලර වෙළඳසැල්, ආපනශාලා, බෙදාහැරීම් සහ ස්වයංක්‍රීය කියෝස්ක් සඳහා ස්මාර්ට් ඇන්ඩ්‍රොයිඩ් පර්යන්ත.",

    // Product Suite
    productSuiteHeading: "විශේෂිත මූල්‍ය විසඳුම්",
    productSuiteSub: "වාරික ක්‍රම, ක්ෂේත්‍ර එකතු කිරීම් සහ සැපයුම් දාම සඳහා නිර්මාණය කළ ගෙවීම් මෙවලම්.",

    // CTA
    readyToScale: "ඔබේ ව්‍යාපාරය දියුණු කිරීමට සූදානම්ද?",
    ctaTitle: "අදම ඔබේ ව්‍යාපාරයේ වටිනාකම වැඩි කරගන්න.",
    ctaSubtitle: "ඕනෑම තැනකදී, ඕනෑම වේලාවක ඩිජිටල් ගෙවීම් භාරගැනීමට WEBXPAY භාවිතා කරන 40,000කට අධික ව්‍යාපාර සමඟ එක්වන්න.",
    getStartedNow: "දැන්ම ආරම්භ කරන්න",
    talkToSales: "විමසීම් සඳහා අමතන්න",

    // Footer
    products: "නිෂ්පාදන",
    company: "සමාගම",
    resources: "සම්පත්",
    privacyPolicy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
    termsOfUse: "භාවිත කොන්දේසි",
    poweredBy: "Powered by SEBS LABS",
    languageSelect: "භාෂාව",
  },
  ta: {
    // Navigation
    solutions: "தீர்வுகள்",
    pricing: "கட்டணங்கள்",
    developer: "டெவலப்பர்கள்",
    media: "ஊடகம்",
    aboutUs: "எங்களைப் பற்றி",
    careers: "வேலைவாய்ப்புகள்",
    login: "உள்நுழைக",
    signup: "பதிவு செய்க",
    coreSolutions: "முக்கிய தீர்வுகள்",
    productSuite: "தயாரிப்புகள் தொகுப்பு",
    brandPromise: "ஒவ்வொரு பரிவர்த்தனையும் மதிப்பை பெருக்கும்",
    exploreAllSolutions: "அனைத்து தீர்வுகளையும் காண்க",
    xgatewayDesc: "டிஜிட்டல் செக்அவுட், வெப்ஹூக்ஸ் மற்றும் பல-நாணய IPG",
    xposDesc: "ஆண்ட்ராய்டு ஸ்மார்ட் POS டெர்மினல்கள் & கவுண்டர் ஒத்திசைவு",
    xsplitDesc: "BNPL மற்றும் தவணை முறையில் செலுத்துதல்",
    xqrDesc: "டைனமிக் LankaQR, UPI மற்றும் Alipay+",
    xcollectorDesc: "கள முகவர் வீட்டு வாசலில் பணம் வசூலித்தல்",
    xsupplierDesc: "B2B வாங்குபவர் கடன் & உடனடி கொடுப்பனவுகள்",
    online: "இணையவழி",
    inStore: "கடைகளில்",

    // Hero
    heroHeadline: "இலங்கையில் டிஜிட்டல் கொடுப்பனவுகளின் எதிர்காலத்தை வழிநடத்துங்கள்",
    heroSubtitle: "வர்த்தகர்கள், பொதுமக்கள் மற்றும் நிறுவனங்களை ஒரே நம்பகமான அமைப்பில் இணைக்கும் இலங்கையின் முன்னணி டிஜிட்டல் நிதி தளம்.",
    scaleAndReliability: "வளர்ச்சி மற்றும் நம்பகத்தன்மை",
    trustedByThousands: "ஆயிரக்கணக்கானோரால் நம்பப்படும்",
    sriLanka: "இலங்கையில்.",
    trustSubtitle: "நாடு தழுவிய reach கொண்ட, மலிவான மற்றும் வங்கி-தர கொடுப்பனவு தீர்வுகள் மூலம் தடையற்ற டிஜிட்டல் பரிவர்த்தனைகளை சாத்தியமாக்குகிறோம்.",
    cbslRegulated: "இலங்கை மத்திய வங்கியால் (CBSL) உரிமம் பெற்றது",
    pciCertified: "PCI-DSS நிலை 1 சான்றிதழ் பெற்றது",

    // Stats
    statVolumeLabel: "மொத்த பரிவர்த்தனை மதிப்பு",
    statVolumeSub: "அனைத்து வழிகளிலும் மொத்த பரிவர்த்தனை செயல்முறை",
    statVolumeBadge: "அளவு",
    statMerchantsLabel: "நாடு தழுவிய வர்த்தகர்கள்",
    statMerchantsSub: "சில்லறை, சிறு-நடுத்தர மற்றும் முன்னணி வர்த்தகங்கள்",
    statMerchantsBadge: "நெட்வொர்க்",
    statMonthlyTxLabel: "மாதாந்திர பரிவர்த்தனைகள்",
    statMonthlyTxSub: "உயர் அதிர்வெண் நிகழ்நேர பரிவர்த்தனை திறன்",
    statMonthlyTxBadge: "மாதாந்திரம்",
    statProcessedLabel: "மாதாந்திர செயல்முறை மதிப்பு",
    statProcessedSub: "நிலையான உடனடி தீர்வு அளவு",
    statProcessedBadge: "மதிப்பு",
    trustedBankingPartners: "நம்பகமான வங்கி பங்காளர்கள்",
    supportedPaymentMethods: "ஏற்றுக்கொள்ளப்பட்ட கட்டண முறைகள்",

    // Core Solutions
    twoCoreSolutions: "இரண்டு முக்கிய தீர்வுகள்.",
    coreSolutionsDesc: "இணையவழி பரிவர்த்தனைகள் மற்றும் கடைகளில் கவுண்டர் செயல்பாடுகளை எளிதாக்க வடிவமைக்கப்பட்டுள்ளது.",
    xgatewayTitle: "இணைய கட்டண நுழைவாயில் (IPG)",
    xgatewaySub: "Visa, Mastercard, LankaPay, UPI, WeChat Pay, மற்றும் Alipay+ கொடுப்பனவுகளை ஒரே பாதுகாப்பான அமைப்பில் ஏற்றுக்கொள்ளுங்கள்.",
    xposTitle: "ஒருங்கிணைந்த ஸ்மார்ட் POS தளம்",
    xposSub: "சில்லறை விற்பனை, உணவகங்கள் மற்றும் டெலிவரிக்கான ஸ்மார்ட் ஆண்ட்ராய்டு டெர்மினல்கள்.",

    // Product Suite
    productSuiteHeading: "சிறப்பு நிதித் தீர்வுகள்",
    productSuiteSub: "தவணை முறைகள், கள வசூலிப்பு மற்றும் விநியோகச் சங்கிலிக்கான நவீன கட்டணக் கருவிகள்.",

    // CTA
    readyToScale: "உங்கள் வணிகத்தை உயர்த்த தயாரா?",
    ctaTitle: "இன்றே உங்கள் வணிக மதிப்பை பெருக்க தொடங்குங்கள்.",
    ctaSubtitle: "எங்கும், எப்போதும் டிஜிட்டல் கொடுப்பனவுகளை ஏற்க WEBXPAY ஐப் பயன்படுத்தும் 40,000+ வணிகங்களுடன் இணையுங்கள்.",
    getStartedNow: "இப்போதே தொடங்குங்கள்",
    talkToSales: "விற்பனைப் பிரிவைத் தொடர்புகொள்ளுங்கள்",

    // Footer
    products: "தயாரிப்புகள்",
    company: "நிறுவனம்",
    resources: "வளங்கள்",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    termsOfUse: "பயன்பாட்டு விதிமுறைகள்",
    poweredBy: "Powered by SEBS LABS",
    languageSelect: "மொழி",
  },
};

export type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
  languages: LANGUAGES,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("webxpay_lang") as Language;
      if (saved && (saved === "en" || saved === "si" || saved === "ta")) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("webxpay_lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage errors
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
