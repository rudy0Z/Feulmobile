import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronDown, Mic, Eye, Clock, Trash2 } from 'lucide-react';
import { SwipeButton } from './SwipeButton';
import { recordConsent, getProfile } from '../../lib/session';

/* ─────────────────────────────────────────────────────────────────────
 * Consent as contract (§2A). Shown in the contributor's chosen language,
 * on ONE screen, and PROVABLY before the microphone is ever used — the
 * Studio's capture beat is unreachable until this resolves.
 * ───────────────────────────────────────────────────────────────────── */

interface Copy {
  title: string; intro: string; readMore: string; hide: string;
  swipe: string; done: string; revoke: string;
  beforeMic: string;
  dpdp: string; dpdpAct: string;
}

interface Fact { title: string; desc: string; }

/* Native-language consent copy for the headline promise + actions.
 * Falls back to English for languages not yet translated. */
const COPY: Record<string, Copy> = {
  en: {
    title: 'Your voice, your rights',
    intro: 'Before your microphone is ever switched on — here is exactly what happens to your audio.',
    readMore: 'Read the 4 details', hide: 'Hide details',
    swipe: 'Swipe to consent & record', done: 'Consent recorded',
    revoke: 'Revoke anytime in Profile → Data Vault',
    beforeMic: 'Nothing is recorded until you agree',
    dpdp: 'Feul complies with the', dpdpAct: 'Digital Personal Data Protection Act, 2023. Audio is processed under explicit consent.',
  },
  hi: {
    title: 'आपकी आवाज़, आपके अधिकार',
    intro: 'माइक्रोफ़ोन चालू होने से पहले — जानिए आपकी आवाज़ के साथ क्या होता है।',
    readMore: '4 बातें पढ़ें', hide: 'विवरण छिपाएँ',
    swipe: 'सहमति दें और रिकॉर्ड करें', done: 'सहमति दर्ज हुई',
    revoke: 'प्रोफ़ाइल → डेटा वॉल्ट से कभी भी वापस लें',
    beforeMic: 'सहमति से पहले कुछ भी रिकॉर्ड नहीं होता',
    dpdp: 'Feul,', dpdpAct: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 का पालन करता है। ऑडियो केवल स्पष्ट सहमति से संसाधित होता है।',
  },
  mr: {
    title: 'तुमचा आवाज, तुमचे हक्क',
    intro: 'मायक्रोफोन सुरू होण्याआधी — तुमच्या आवाजाचे काय होते ते पाहा.',
    readMore: '4 तपशील वाचा', hide: 'तपशील लपवा',
    swipe: 'संमती द्या आणि रेकॉर्ड करा', done: 'संमती नोंदवली',
    revoke: 'प्रोफाइल → डेटा व्हॉल्टमधून केव्हाही मागे घ्या',
    beforeMic: 'संमतीशिवाय काहीही रेकॉर्ड होत नाही',
    dpdp: 'Feul,', dpdpAct: 'डिजिटल वैयक्तिक डेटा संरक्षण कायदा, 2023 चे पालन करते. ऑडिओ केवळ स्पष्ट संमतीने प्रक्रिया केला जातो.',
  },
  ta: {
    title: 'உங்கள் குரல், உங்கள் உரிமைகள்',
    intro: 'மைக்ரோஃபோன் இயக்கப்படுவதற்கு முன் — உங்கள் ஒலிக்கு என்ன நடக்கிறது என்பதை அறியுங்கள்.',
    readMore: '4 விவரங்களைப் படியுங்கள்', hide: 'விவரங்களை மறை',
    swipe: 'ஒப்புதல் அளித்து பதிவு செய்யவும்', done: 'ஒப்புதல் பதிவானது',
    revoke: 'சுயவிவரம் → டேட்டா வால்ட்டில் எப்போது வேண்டுமானாலும் திரும்பப் பெறலாம்',
    beforeMic: 'ஒப்புதலுக்கு முன் எதுவும் பதிவு செய்யப்படாது',
    dpdp: 'Feul,', dpdpAct: 'டிஜிட்டல் தனிநபர் தரவு பாதுகாப்புச் சட்டம், 2023-ஐ பின்பற்றுகிறது. ஒலி வெளிப்படையான ஒப்புதலின் கீழ் மட்டுமே செயலாக்கப்படுகிறது.',
  },
};

/* Icon order is shared across languages; text is localized per language. */
const FACT_ICONS = [Mic, Eye, Clock, Trash2];

const FACTS: Record<string, Fact[]> = {
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

interface Props { onComplete: () => void; onCancel: () => void; }

export function ConsentSheet({ onComplete, onCancel }: Props) {
  const [expanded, setExpanded] = useState(false);
  const lang = getProfile()?.consentLang ?? 'en';
  const t = COPY[lang] ?? COPY.en;
  const facts = (FACTS[lang] ?? FACTS.en).map((f, i) => ({ ...f, icon: FACT_ICONS[i] }));
  const isLatin = lang === 'en';

  const handleConsent = () => { recordConsent(); onComplete(); };

  return (
    <AnimatePresence>
      <motion.div
        key="consent-scrim"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onCancel}
        style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(var(--carbon-rgb),0.42)', backdropFilter: 'blur(2px)' }}
      />
      <motion.div
        key="consent-sheet"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 301,
          background: 'var(--surface-raised)', borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
          padding: '10px 20px 32px', boxShadow: 'var(--e-3)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)', margin: '0 auto 20px' }} />

        <div className="flex items-start gap-3 mb-3">
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--t-verdigris-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck style={{ width: 22, height: 22, color: 'var(--t-verdigris-600)' }} strokeWidth={2} />
          </div>
          <div>
            <h2 className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: lang === 'en' ? 1.2 : 'var(--lh-deva)', margin: 0 }}>
              {t.title}
            </h2>
            <p className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: lang === 'en' ? 1.5 : 'var(--lh-deva)', marginTop: 4 }}>
              {t.intro}
            </p>
          </div>
        </div>

        {/* Provable pre-mic promise */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', margin: '10px 0 4px' }}>
          <Mic size={15} style={{ color: 'var(--action-primary)', flexShrink: 0 }} />
          <span className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: lang === 'en' ? 1.4 : 'var(--lh-deva)' }}>
            {t.beforeMic}
          </span>
        </div>

        <button
          onClick={() => setExpanded((e) => !e)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', fontSize: 14, fontWeight: 700, padding: '10px 0 4px' }}
        >
          {expanded ? t.hide : t.readMore}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex' }}>
            <ChevronDown style={{ width: 15, height: 15 }} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'var(--surface-ground)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 8 }}>
                {facts.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} style={{ padding: '14px 16px', borderBottom: i < facts.length - 1 ? '1px solid var(--divider)' : 'none', display: 'flex', gap: 12 }}>
                      <Icon style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} strokeWidth={2} />
                      <div>
                        <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px', lineHeight: isLatin ? 1.2 : 'var(--lh-deva)' }}>{f.title}</p>
                        <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: isLatin ? 1.5 : 'var(--lh-deva)', margin: 0 }}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', lineHeight: isLatin ? 1.5 : 'var(--lh-deva)', marginBottom: 12 }}>
                {t.dpdp} <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.dpdpAct}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3">
          <SwipeButton label={t.swipe} completeLabel={t.done} onComplete={handleConsent} />
        </div>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
          {t.revoke}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
