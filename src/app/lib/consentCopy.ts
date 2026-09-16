import { Mic, Eye, Clock, Trash2, type LucideIcon } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
 * Consent copy — the SINGLE source of truth for what we promise about a
 * contributor's voice.
 *
 * Why this is a module and not inline in a component: the DPDP verbatim
 * line is a legal promise, and the moment it exists in two places someone
 * edits one of them. The consent surface is rendered by BOTH the sheet
 * (lazy, in-flow) and the native route `/contributor/consent` (the
 * deep-linkable proof), so the string has to live above both.
 *
 * RULE: `DPDP_VERBATIM` is never paraphrased, never translated in place,
 * and never shortened. A native-language rendering goes in
 * `VERBATIM_NATIVE` ALONGSIDE it — never instead of it.
 * ───────────────────────────────────────────────────────────────────── */

export interface ConsentCopy {
  title: string; intro: string; readMore: string; hide: string;
  swipe: string; done: string; revoke: string;
  beforeMic: string;
  dpdp: string; dpdpAct: string;
}

export interface ConsentFact { title: string; desc: string; }

/* Native-language copy for the headline promise + actions.
 * Falls back to English for languages not yet translated. */
export const COPY: Record<string, ConsentCopy> = {
  en: {
    title: 'Your voice, your rights',
    intro: 'Before your microphone is ever switched on — here is exactly what happens to your audio.',
    readMore: 'Read the 4 details', hide: 'Hide details',
    swipe: 'Swipe to consent & record', done: 'Consent recorded',
    revoke: 'Revoke anytime in Profile → Data Vault',
    beforeMic: 'Nothing is recorded until you agree',
    dpdp: 'This platform complies with the', dpdpAct: 'Digital Personal Data Protection Act, 2023. Audio is processed under explicit consent.',
  },
  hi: {
    title: 'आपकी आवाज़, आपके अधिकार',
    intro: 'माइक्रोफ़ोन चालू होने से पहले — जानिए आपकी आवाज़ के साथ क्या होता है।',
    readMore: '4 बातें पढ़ें', hide: 'विवरण छिपाएँ',
    swipe: 'सहमति दें और रिकॉर्ड करें', done: 'सहमति दर्ज हुई',
    revoke: 'प्रोफ़ाइल → डेटा वॉल्ट से कभी भी वापस लें',
    beforeMic: 'सहमति से पहले कुछ भी रिकॉर्ड नहीं होता',
    dpdp: '', dpdpAct: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 का पालन करता है। ऑडियो केवल स्पष्ट सहमति से संसाधित होता है।',
  },
  mr: {
    title: 'तुमचा आवाज, तुमचे हक्क',
    intro: 'मायक्रोफोन सुरू होण्याआधी — तुमच्या आवाजाचे काय होते ते पाहा.',
    readMore: '4 तपशील वाचा', hide: 'तपशील लपवा',
    swipe: 'संमती द्या आणि रेकॉर्ड करा', done: 'संमती नोंदवली',
    revoke: 'प्रोफाइल → डेटा व्हॉल्टमधून केव्हाही मागे घ्या',
    beforeMic: 'संमतीशिवाय काहीही रेकॉर्ड होत नाही',
    dpdp: '', dpdpAct: 'डिजिटल वैयक्तिक डेटा संरक्षण कायदा, 2023 चे पालन करते. ऑडिओ केवळ स्पष्ट संमतीने प्रक्रिया केला जातो.',
  },
  ta: {
    title: 'உங்கள் குரல், உங்கள் உரிமைகள்',
    intro: 'மைக்ரோஃபோன் இயக்கப்படுவதற்கு முன் — உங்கள் ஒலிக்கு என்ன நடக்கிறது என்பதை அறியுங்கள்.',
    readMore: '4 விவரங்களைப் படியுங்கள்', hide: 'விவரங்களை மறை',
    swipe: 'ஒப்புதல் அளித்து பதிவு செய்யவும்', done: 'ஒப்புதல் பதிவானது',
    revoke: 'சுயவிவரம் → டேட்டா வால்ட்டில் எப்போது வேண்டுமானாலும் திரும்பப் பெறலாம்',
    beforeMic: 'ஒப்புதலுக்கு முன் எவையும் பதிவு செய்யப்படாது',
    dpdp: '', dpdpAct: 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம், 2023-ஐ பின்பற்றுகிறது. ஒலி வெளிப்படையான ஒப்புதலின் கீழ் மட்டுமே செயலாக்கப்படுகிறது.',
  },
};

/* Icon order is shared across languages; text is localized per language.
 * The four facts answer the four questions a contributor actually has:
 * what / who / how long / how to get out. */
export const FACT_ICONS: LucideIcon[] = [Mic, Eye, Clock, Trash2];

export const FACTS: Record<string, ConsentFact[]> = {
  en: [
    { title: 'What gets recorded',   desc: 'Only your voice during active recording — nothing ambient, nothing in the background.' },
    { title: 'Who sees it',          desc: 'Research teams who commission datasets. Your name is never shared — only anonymised clips.' },
    { title: 'How long',             desc: 'Up to 24 months. You can request deletion any time from Profile → Data Vault.' },
    { title: 'Your right to delete', desc: 'Withdraw consent whenever you like; deletion is processed within 30 days.' },
  ],
  hi: [
    { title: 'क्या रिकॉर्ड होता है',   desc: 'केवल रिकॉर्डिंग के दौरान आपकी आवाज़ — कोई पृष्ठभूमि की आवाज़ नहीं।' },
    { title: 'इसे कौन देखता है',       desc: 'डेटासेट बनाने वाली शोध टीमें। आपका नाम कभी साझा नहीं होता — केवल गुमनाम क्लिप।' },
    { title: 'कितने समय तक',           desc: '24 महीने तक। आप प्रोफ़ाइल → डेटा वॉल्ट से कभी भी हटाने का अनुरोध कर सकते हैं।' },
    { title: 'हटाने का आपका अधिकार',   desc: 'जब चाहें सहमति वापस लें; हटाना 30 दिनों में पूरा होता है।' },
  ],
  mr: [
    { title: 'काय रेकॉर्ड होते',       desc: 'फक्त रेकॉर्डिंगदरम्यान तुमचा आवाज — पार्श्वभूमीतील काहीही नाही.' },
    { title: 'ते कोण पाहते',           desc: 'डेटासेट तयार करणाऱ्या संशोधन टीम. तुमचे नाव कधीही सामायिक होत नाही — फक्त निनावी क्लिप.' },
    { title: 'किती काळ',               desc: '24 महिन्यांपर्यंत. तुम्ही प्रोफाइल → डेटा व्हॉल्टमधून केव्हाही हटवण्याची विनंती करू शकता.' },
    { title: 'हटवण्याचा तुमचा हक्क',   desc: 'हवे तेव्हा संमती मागे घ्या; हटवणे 30 दिवसांत केले जाते.' },
  ],
  ta: [
    { title: 'என்ன பதிவாகிறது',        desc: 'பதிவின் போது உங்கள் குரல் மட்டும் — பின்னணி ஒலி எதுவும் இல்லை.' },
    { title: 'யார் பார்க்கிறார்கள்',    desc: 'தரவுத்தொகுப்புகளை உருவாக்கும் ஆராய்ச்சிக் குழுக்கள். உங்கள் பெயர் பகிரப்படாது — அநாமதேய கிளிப்புகள் மட்டுமே.' },
    { title: 'எவ்வளவு காலம்',          desc: '24 மாதங்கள் வரை. சுயவிவரம் → டேட்டா வால்ட்டில் இருந்து எப்போது வேண்டுமானாலும் நீக்க கோரலாம்.' },
    { title: 'நீக்கும் உரிமை',          desc: 'விரும்பியபோது ஒப்புதலைத் திரும்பப் பெறுங்கள்; நீக்கம் 30 நாட்களில் செயலாக்கப்படும்.' },
  ],
};

/* THE legal promise — verbatim, never paraphrased (MASTER §10.6).
 * English rendering is mandatory on every consent surface. */
export const DPDP_VERBATIM =
  'Under DPDP Act 2023, you can delete your voice data anytime. Money paid is never clawed back.';

/* Native rendering of the same promise. Rendered ALONGSIDE the English,
 * never instead of it — so the promise is always readable in a language
 * the contributor chose AND in the language of the Act. */
export const VERBATIM_NATIVE: Record<string, string> = {
  hi: 'DPDP अधिनियम 2023 के तहत, आप कभी भी अपना वॉइस डेटा हटा सकते हैं। चुकाए गए पैसे कभी वापस नहीं लिए जाते।',
  mr: 'DPDP कायदा 2023 अंतर्गत, तुम्ही तुमचा व्हॉइस डेटा कधीही हटवू शकता. दिलेले पैसे कधीही परत घेतले जात नाहीत.',
  ta: 'DPDP சட்டம் 2023-ன் கீழ், உங்கள் குரல் தரவை எப்போது வேண்டுமானாலும் நீக்கலாம். செலுத்தப்பட்ட பணம் ஒருபோதும் திரும்பப் பெறப்படாது.',
};

export const LANG_NAME: Record<string, string> = { en: 'English', hi: 'Hindi', mr: 'Marathi', ta: 'Tamil' };
export const LANG_BCP: Record<string, string> = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN' };

/** The whole promise as one spoken string — used by the listen affordance. */
export function spokenConsent(lang: string): string {
  const t = COPY[lang] ?? COPY.en;
  const facts = FACTS[lang] ?? FACTS.en;
  const native = VERBATIM_NATIVE[lang];
  return `${t.title}. ${t.intro} ${facts.map((f) => `${f.title}. ${f.desc}`).join(' ')} ${native ?? DPDP_VERBATIM}`;
}
