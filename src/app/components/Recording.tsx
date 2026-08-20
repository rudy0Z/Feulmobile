import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Play, Check, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { Waveform } from './ui/Waveform';
import { VoiceVisualizer } from './ui/VoiceVisualizer';
import { quests, Quest } from '../lib/quests';
import { AcousticNoisePause } from './AcousticNoisePause';
import { useDevContext } from '../lib/DevContext';
import { ConsentSheet } from './ui/ConsentSheet';
import { hasConsented } from '../lib/session';

/* ─── Script data ──────────────────────────────────────────────────── */

interface ScriptTurn {
  role: 'you' | 'other';
  label: string;
  text: string;
}

const SCENARIO_SCRIPTS: Record<string, { setup: string; turns: ScriptTurn[] }> = {
  'q-scen-1': {
    setup: 'You walk into a busy café on a Monday morning. There\'s a short queue at the counter. You know what you want.',
    turns: [
      { role: 'you',   label: 'YOU',     text: '"Hi, can I get a large oat milk latte and one almond croissant, please?"' },
      { role: 'other', label: 'BARISTA', text: '"Of course! Name for the order?"' },
      { role: 'you',   label: 'YOU',     text: '"Arjun. Quick question — any dairy milk options too?"' },
      { role: 'other', label: 'BARISTA', text: '"Yes — full cream, semi-skimmed, or oat. Your latte should be about eight minutes. Queue\'s a bit long today."' },
      { role: 'you',   label: 'YOU',     text: '"Eight minutes? I have a 9 o\'clock. Can I just pay now and grab it from the bar when it\'s ready?"' },
      { role: 'other', label: 'BARISTA', text: '"Absolutely, we\'ll call your name. Card or UPI?"' },
      { role: 'you',   label: 'YOU',     text: '"UPI please. Thanks."' },
    ],
  },
  'q-scen-2': {
    setup: 'General physician\'s clinic, late afternoon. You\'ve had a fever, headache, and body ache for three days. You waited an hour to get in.',
    turns: [
      { role: 'you',    label: 'YOU',     text: '"Doctor, mujhe pichhle teen din se bukhar hai, aur sar bhi bahut bhaari lag raha hai..."' },
      { role: 'other',  label: 'DOCTOR',  text: '"Kitna temperature aa raha hai? Maine koi painkiller liya hai aapne?"' },
      { role: 'you',    label: 'YOU',     text: '"Haan, Crocin li thi — ek baar, aaj subah. Temperature 101.4 tha raat ko."' },
      { role: 'other',  label: 'DOCTOR',  text: '"Khana khaya? Neend kaisi hai? Koi khansi ya gale mein dard?"' },
      { role: 'you',    label: 'YOU',     text: '"Khana khaane ka mann nahi tha bilkul... neend bhi puri nahi hui. Gale mein thoda dard hai, khansi nahi."' },
      { role: 'other',  label: 'DOCTOR',  text: '"Theek hai. Main ek blood test aur throat swab recommend karunga. Aaj raat pani zyada pijiye."' },
      { role: 'you',    label: 'YOU',     text: '"Koi serious baat toh nahi hai na? Kab tak theek ho jaaunga?"' },
      { role: 'other',  label: 'DOCTOR',  text: '"Lagbhag 2–3 din mein. Waqt par reports aane do, phir decide karenge."' },
      { role: 'you',    label: 'YOU',     text: '"Okay, shukriya doctor. Main aaj hi test karwa leta hoon."' },
    ],
  },
  'q-scen-3': {
    setup: 'You\'re on a phone call to an electronics store\'s support line. You bought headphones two weeks ago and the left earbud has stopped working.',
    turns: [
      { role: 'you',    label: 'YOU',     text: '"Hi, I bought a pair of headphones from your Pune store on the 14th, and the left earbud has completely stopped working."' },
      { role: 'other',  label: 'SUPPORT', text: '"I\'m sorry to hear that. Can I get your order number or the registered email, please?"' },
      { role: 'you',    label: 'YOU',     text: '"Sure, it\'s arjun.mehta@gmail.com. I still have the bill too."' },
      { role: 'other',  label: 'SUPPORT', text: '"I can see the order. Since it\'s within the 30-day return window, we can process an exchange. Are you near a store?"' },
      { role: 'you',    label: 'YOU',     text: '"Not really — is there any way to do this by courier? I work long hours and the store closes at 8."' },
      { role: 'other',  label: 'SUPPORT', text: '"We do have a pickup option but it takes 5–7 days. Alternatively you could visit on a Saturday."' },
      { role: 'you',    label: 'YOU',     text: '"Okay, the pickup works. Can you confirm the replacement will be the same model? Not a refurbished unit?"' },
      { role: 'other',  label: 'SUPPORT', text: '"Yes, brand new same model. I\'ll send the pickup request now — you\'ll get an SMS tomorrow."' },
      { role: 'you',    label: 'YOU',     text: '"Perfect. Thanks for sorting this out quickly."' },
    ],
  },
  'q-scen-4': {
    setup: 'It\'s 9pm. You\'ve been on hold for 22 minutes. Your flight to Bengaluru tomorrow has just been cancelled — for the second time this week.',
    turns: [
      { role: 'you',    label: 'YOU',     text: '"I\'ve been waiting on this line for almost half an hour. And this is the second cancellation in three days. I need to understand what\'s happening."' },
      { role: 'other',  label: 'AGENT',   text: '"I sincerely apologise for the wait and the disruption, sir. Can I get your booking reference?"' },
      { role: 'you',    label: 'YOU',     text: '"It\'s FEU-4482. And I\'d like to know — what\'s the actual reason for this second cancellation?"' },
      { role: 'other',  label: 'AGENT',   text: '"There\'s been an operational crew issue on the route. We\'ve rebooked you on a 7 AM flight tomorrow."' },
      { role: 'you',    label: 'YOU',     text: '"7 AM is not viable. I have a meeting at 9 in Bengaluru. I need the 11 PM flight tonight or a full refund."' },
      { role: 'other',  label: 'AGENT',   text: '"The 11 PM is at capacity. I can put you on a waitlist or process a full refund with a meal voucher."' },
      { role: 'you',    label: 'YOU',     text: '"Is there a supervisor available? I\'d like to understand what compensation is possible for the time I\'ve already lost."' },
      { role: 'other',  label: 'AGENT',   text: '"I can escalate. Please hold for a few minutes."' },
      { role: 'you',    label: 'YOU',     text: '"I\'ll hold. But please note — I\'ve been waiting since 8:40 and I have a screenshot of both cancellation notices."' },
    ],
  },
};

const GROUP_SCRIPTS: Record<string, { scene: string; speakers: string[]; turns: Array<{ speakerIdx: number; text: string }> }> = {
  'q-group-1': {
    scene: 'Sunday dinner, four people around a table. The eldest just brought up the upcoming family wedding in Lucknow.',
    speakers: ['Eldest (Dada ji)', 'Parent', 'Sibling', 'You (Youngest)'],
    turns: [
      { speakerIdx: 0, text: '"Toh finally, Lucknow ki shaadi ka date pakka hua — 18 ko hai."' },
      { speakerIdx: 1, text: '"Haan, flight book karni padegi jaldi. Season mein bahut rush hota hai."' },
      { speakerIdx: 2, text: '"Main toh train se jaana chahta hoon. Overnight ka mazaa alag hai."' },
      { speakerIdx: 3, text: '"Main bhi train se — koi ek gaana gaayega toh pair milaunga!"' },
      { speakerIdx: 0, text: '"Haha, woh toh hai. Lekin Dadi ji ko flight se hi jaana hoga."' },
      { speakerIdx: 1, text: '"Bilkul. Main unka aur apna ticket ek saath book kar leta hoon."' },
      { speakerIdx: 2, text: '"Aur dress code kya hai? Shaadi ke liye kuch traditional lena padega."' },
      { speakerIdx: 3, text: '"Dada ji, aapki baat sun ke lagta hai yeh shaadi kitni badi hogi. Kaafi log aa rahe hain?"' },
      { speakerIdx: 0, text: '"Minimum 400. Poorey khaandaan ko bulaya hai. Aur catering bhi Lucknawi hai."' },
      { speakerIdx: 1, text: '"Khana toh mast hoga. Awadhi biryani."' },
      { speakerIdx: 2, text: '"Aur kabab! Main pehle din hi pahunch jaaunga."' },
      { speakerIdx: 3, text: '"Hum sab saath chalein toh zyada mazaa aayega. Plan bana lete hain."' },
    ],
  },
  'q-group-2': {
    scene: 'Saturday night, 8:15 PM, busy restaurant lobby. You arrive for a 8 PM reservation only to find the table given to another party.',
    speakers: ['Host (Manager)', 'Customer', 'Customer\'s Partner'],
    turns: [
      { speakerIdx: 1, text: '"Hi, we have an 8 PM reservation under Mehta — table for two."' },
      { speakerIdx: 0, text: '"Let me check... I do see the booking, but I\'m afraid there\'s been a mix-up tonight. The table was released at 8:10."' },
      { speakerIdx: 2, text: '"Released? We were stuck in traffic — we\'re barely 15 minutes late."' },
      { speakerIdx: 0, text: '"I\'m very sorry. Our policy is 10 minutes, but I should have handled this better. Let me see what I can do."' },
      { speakerIdx: 1, text: '"We\'d appreciate that. This is a special occasion — we specifically chose this restaurant."' },
      { speakerIdx: 0, text: '"I can offer you our private booth in 20 minutes, and complimentary starters while you wait."' },
      { speakerIdx: 2, text: '"A private booth is actually nicer. But we\'d like a note for the bill as well."' },
      { speakerIdx: 0, text: '"Of course — 15% off the total. I\'m genuinely sorry for the inconvenience."' },
      { speakerIdx: 1, text: '"That works. We\'ll wait at the bar. Thank you for making it right."' },
    ],
  },
};

/* ─── Main component ───────────────────────────────────────────────── */

type Phase = 'intro' | 'recording' | 'done';
type RecordingState = 'idle' | 'recording' | 'completed';

export function Recording() {
  const navigate = useNavigate();
  const { questId } = useParams();

  const quest: Quest | undefined = quests.find(q => q.id === questId);
  const format = quest?.format ?? 'lines';

  /* ── Consent gate: lazy, before the first capture (§ Pass 1) ── */
  const [consentPassed, setConsentPassed] = useState(hasConsented());

  /* ── Swipe-from-left-edge to go back ── */
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientX - startX > 72 && startX < 56) navigate(-1);
    };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
    };
  }, [navigate]);

  if (!consentPassed) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <ConsentSheet
          onComplete={() => setConsentPassed(true)}
          onCancel={() => navigate(-1)}
        />
      </div>
    );
  }

  if (format === 'lines') return <LinesRecording quest={quest} />;
  if (format === 'scenario') return <ScenarioRecording quest={quest} />;
  return <GroupRecording quest={quest} />;
}

/* ─────────────────────────────────────────────────────────────────── */
/*  LINES — quick multi-clip recording                                 */
/* ─────────────────────────────────────────────────────────────────── */

const FALLBACK_LINES = [
  '"नमस्ते, आप कैसे हैं?"',
  '"मुझे एक कप चाय चाहिए।"',
  '"क्या आप यहाँ नए हैं?"',
  '"बहुत अच्छा! धन्यवाद।"',
  '"कल मिलते हैं।"',
  '"यह रास्ता कहाँ जाता है?"',
];

function LinesRecording({ quest }: { quest: Quest | undefined }) {
  const navigate = useNavigate();
  const dev = useDevContext();
  const [currentLine, setCurrentLine] = useState(0);
  const [state, setState] = useState<RecordingState>('idle');
  const [time, setTime] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [showNoisePause, setShowNoisePause] = useState(false);

  const lines = FALLBACK_LINES;
  const total = lines.length;
  const progress = (done.length / total) * 100;

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (state === 'recording') t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const accept = () => {
    const next = [...done, currentLine];
    setDone(next);
    if (currentLine < total - 1) { setCurrentLine(p => p + 1); setState('idle'); setTime(0); }
    else navigate('/contributor');
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
      <SwipeHint />

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <BackButton label="Quests" onPress={() => navigate('/contributor/quests')} dark />
        <div className="flex items-center justify-between mb-1">
          <QuestFormatEyebrow format="lines" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
            {done.length}/{total}
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: '#FFFFFF', marginBottom: 14 }}>
          {quest?.title ?? 'Quick Lines'}
        </h2>
        <ProgressBar value={progress} />
      </div>

      {/* Waveform bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: '90%' }}>
          <Waveform color="var(--accent-primary)" opacity={state === 'recording' ? 0.12 : 0.05} height={100} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-28 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
            className="w-full"
          >
            {/* Line counter */}
            <div className="flex justify-center mb-5">
              <span style={{
                padding: '5px 18px', borderRadius: 999,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)',
              }}>
                Line {currentLine + 1} of {total}
              </span>
            </div>

            {/* Prompt card */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '28px 24px',
              marginBottom: 36,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 500, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.6 }}>
                {lines[currentLine]}
              </p>
            </div>

            <RecordingControls
              state={state}
              time={time}
              fmtTime={fmtTime}
              onStart={() => {
                setState('recording'); setTime(0);
                if (dev.forceNoisePause) {
                  setTimeout(() => setShowNoisePause(true), 2000);
                }
              }}
              onStop={() => setState('completed')}
              onAccept={accept}
              onRetry={() => { setState('idle'); setTime(0); }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {showNoisePause && (
        <AcousticNoisePause
          onClose={() => { setShowNoisePause(false); setState('idle'); setTime(0); }}
          onResume={() => setShowNoisePause(false)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  SCENARIO — multi-turn solo session                                 */
/* ─────────────────────────────────────────────────────────────────── */

function ScenarioRecording({ quest }: { quest: Quest | undefined }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [turnIdx, setTurnIdx] = useState(0);
  const [state, setState] = useState<RecordingState>('idle');
  const [time, setTime] = useState(0);

  const scriptData = quest ? SCENARIO_SCRIPTS[quest.id] : undefined;
  const setup = scriptData?.setup ?? '';
  const turns = scriptData?.turns ?? [];
  const myTurns = turns.filter(t => t.role === 'you');

  // Which "my turn" index we're on
  const [myTurnIdx, setMyTurnIdx] = useState(0);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (state === 'recording') t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const advanceTurn = () => {
    // Find the next "you" turn in the full script after current
    const currentMyTurn = myTurns[myTurnIdx];
    const currentFullIdx = turns.findIndex(t => t === currentMyTurn);
    const nextMyTurnIdx = myTurnIdx + 1;
    if (nextMyTurnIdx < myTurns.length) {
      setMyTurnIdx(nextMyTurnIdx);
      const nextTurn = myTurns[nextMyTurnIdx];
      const nextFullIdx = turns.indexOf(nextTurn);
      setTurnIdx(nextFullIdx);
      setState('idle');
      setTime(0);
    } else {
      setPhase('done');
    }
  };

  const currentYourTurnFullIdx = turns.indexOf(myTurns[myTurnIdx] ?? turns[0]);

  /* ── INTRO PHASE ── */
  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
        <SwipeHint />
        <div className="px-6 pt-14 pb-4">
          <BackButton label="Quests" onPress={() => navigate('/contributor/quests')} dark />
          <QuestFormatEyebrow format="scenario" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 6, marginBottom: 4 }}>
            {quest?.title ?? 'Solo Scenario'}
          </h2>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
            {myTurns.length} turns to record · {quest?.duration ?? '—'}
          </p>
        </div>

        <div className="flex-1 px-6 pb-32 overflow-y-auto">
          {/* Setup card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)',
            padding: '22px', marginBottom: 20,
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Setup
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
              {setup}
            </p>
          </div>

          {/* Script preview — first 4 turns */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
              Script preview
            </p>
            {turns.slice(0, 4).map((t, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: t.role === 'you' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)',
                  width: 52, flexShrink: 0, paddingTop: 2,
                }}>
                  {t.label}
                </span>
                <p style={{
                  fontSize: 13, fontWeight: t.role === 'you' ? 600 : 400,
                  color: t.role === 'you' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.38)',
                  lineHeight: 1.6, fontStyle: t.role === 'other' ? 'italic' : 'normal',
                }}>
                  {t.text}
                </p>
              </div>
            ))}
            {turns.length > 4 && (
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.2)', marginTop: 4, paddingLeft: 64 }}>
                + {turns.length - 4} more turns
              </p>
            )}
          </div>

          {/* What to expect */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '16px', marginBottom: 8,
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
              How it works
            </p>
            {[
              'Read each turn carefully before recording',
              'Record only YOUR lines — context turns are shown for reference',
              'Speak naturally, as if you\'re actually in the situation',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span style={{ fontSize: 13, color: 'var(--accent-primary)', fontWeight: 700, marginTop: 0.5, flexShrink: 0 }}>·</span>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Start CTA */}
        <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setPhase('recording')}
            style={{
              width: '100%', height: 58, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0px 8px 28px rgba(var(--accent-glow-rgb),0.40), inset 0px 1px 0px rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>Start Session</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    );
  }

  /* ── DONE PHASE ── */
  if (phase === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1E6B40', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </motion.div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
          Session Complete
        </h2>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 10 }}>
          {myTurns.length} turns recorded
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 8 }}>
          +₹{quest?.cashPayout ?? 0}
        </p>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: 40 }}>
          Your voice just trained an AI.
        </p>
        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
            boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.38)',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  /* ── RECORDING PHASE ── */
  const currentTurn = myTurns[myTurnIdx];
  const prevTurns = turns.slice(0, currentYourTurnFullIdx);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
      <SwipeHint />

      {/* Header */}
      <div className="px-6 pt-14 pb-3">
        <BackButton label="Quests" onPress={() => navigate('/contributor/quests')} dark />
        <div className="flex items-center justify-between mb-1">
          <QuestFormatEyebrow format="scenario" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
            Your turn {myTurnIdx + 1}/{myTurns.length}
          </span>
        </div>
        <ProgressBar value={((myTurnIdx) / myTurns.length) * 100} />
      </div>

      {/* Script scroll */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Previous context turns */}
        {prevTurns.slice(-3).map((t, i) => (
          <motion.div
            key={`prev-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mb-4"
          >
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', width: 52, flexShrink: 0, paddingTop: 2,
            }}>
              {t.label}
            </span>
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.25)', lineHeight: 1.65,
              fontStyle: 'italic',
            }}>
              {t.text}
            </p>
          </motion.div>
        ))}

        {/* Current YOUR turn — highlighted */}
        <motion.div
          key={`current-${myTurnIdx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 16,
            border: '1px solid rgba(var(--accent-glow-rgb),0.30)',
            padding: '18px',
            marginBottom: 24,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 0 3px rgba(var(--accent-glow-rgb),0.25)',
            }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
              Your Turn
            </span>
          </div>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.65 }}>
            {currentTurn?.text}
          </p>
        </motion.div>

        {/* Waveform bg during recording */}
        {state === 'recording' && (
          <div style={{ marginBottom: 16 }}>
            <VoiceVisualizer active height={80} />
          </div>
        )}

        <RecordingControls
          state={state}
          time={time}
          fmtTime={fmtTime}
          onStart={() => { setState('recording'); setTime(0); }}
          onStop={() => setState('completed')}
          onAccept={advanceTurn}
          onRetry={() => { setState('idle'); setTime(0); }}
          submitLabel={myTurnIdx < myTurns.length - 1 ? 'Submit & Next Turn' : 'Submit & Finish'}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  GROUP — pass-the-device local multi-speaker                        */
/* ─────────────────────────────────────────────────────────────────── */

function GroupRecording({ quest }: { quest: Quest | undefined }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [state, setState] = useState<RecordingState>('idle');
  const [time, setTime] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [waitingPass, setWaitingPass] = useState(false);

  const scriptData = quest ? GROUP_SCRIPTS[quest.id] : undefined;
  const scene = scriptData?.scene ?? '';
  const speakers = scriptData?.speakers ?? ['Speaker 1', 'Speaker 2', 'Speaker 3'];
  const turns = scriptData?.turns ?? [];

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (state === 'recording') t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const currentTurn = turns[turnIdx];
  const nextTurn = turns[turnIdx + 1];
  const speakerChanged = nextTurn && nextTurn.speakerIdx !== currentTurn?.speakerIdx;

  const acceptTurn = () => {
    if (turnIdx >= turns.length - 1) { setPhase('done'); return; }
    if (speakerChanged) {
      setWaitingPass(true);
    } else {
      setTurnIdx(p => p + 1);
      setState('idle');
      setTime(0);
    }
  };

  const proceedAfterPass = () => {
    setTurnIdx(p => p + 1);
    setState('idle');
    setTime(0);
    setWaitingPass(false);
  };

  const speakerColors = [
    'var(--accent-primary)',
    '#4EC992',
    '#7B83C4',
    '#E8B84B',
  ];

  /* ── INTRO ── */
  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
        <SwipeHint />
        <div className="flex-1 px-6 pt-14 pb-32 overflow-y-auto">
          <BackButton label="Quests" onPress={() => navigate('/contributor/quests')} dark />
          <QuestFormatEyebrow format="group" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 6, marginBottom: 16 }}>
            {quest?.title ?? 'Group Session'}
          </h2>

          {/* Scene card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)', padding: '22px', marginBottom: 24,
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Scene
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
              {scene}
            </p>
          </div>

          {/* Speaker roles */}
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            {speakers.length} speakers · everyone gathers around one device
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {speakers.map((name, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.04)', borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '14px 16px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `${speakerColors[i % speakerColors.length]}22`,
                  border: `1.5px solid ${speakerColors[i % speakerColors.length]}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: speakerColors[i % speakerColors.length] }}>
                    {i + 1}
                  </span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{name}</p>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.07)', padding: '16px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
              How it works
            </p>
            {[
              'Each speaker takes the device when it\'s their turn',
              'Read your line, then tap Record',
              'Pass the device to the next speaker when prompted',
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700, flexShrink: 0, marginTop: 0.5 }}>·</span>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-10" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setPhase('recording')}
            style={{
              width: '100%', height: 58, borderRadius: 999,
              background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0px 8px 28px rgba(var(--accent-glow-rgb),0.40), inset 0px 1px 0px rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <Users className="w-5 h-5 text-white" />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>Everyone's Ready — Start</span>
          </motion.button>
        </div>
      </div>
    );
  }

  /* ── DONE ── */
  if (phase === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1E6B40', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </motion.div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
          Session Complete
        </h2>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 10 }}>
          {speakers.length} speakers · {turns.length} turns recorded
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 8 }}>
          +₹{quest?.cashPayout ?? 0}
        </p>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: 40 }}>
          Real voices. Real conversations. Real data.
        </p>
        <button
          onClick={() => navigate('/contributor')}
          style={{
            width: '100%', height: 56, borderRadius: 999,
            background: 'linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)',
            border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
            boxShadow: '0px 8px 24px rgba(var(--accent-glow-rgb),0.38)',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  /* ── PASS DEVICE TRANSITION ── */
  if (waitingPass && nextTurn) {
    const nextSpeaker = speakers[nextTurn.speakerIdx];
    const color = speakerColors[nextTurn.speakerIdx % speakerColors.length];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="text-center"
        >
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `${color}22`,
            border: `2px solid ${color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color }}>
              {nextTurn.speakerIdx + 1}
            </span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pass the device to
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 32 }}>
            {nextSpeaker}
          </h2>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={proceedAfterPass}
            style={{
              padding: '14px 40px', borderRadius: 999,
              background: color, border: 'none', cursor: 'pointer',
              fontSize: 15, fontWeight: 700, color: '#FFFFFF',
              boxShadow: `0px 8px 20px ${color}55`,
            }}
          >
            I'm {nextSpeaker.split(' ')[0]} — Ready
          </motion.button>
        </motion.div>
      </div>
    );
  }

  /* ── RECORDING PHASE ── */
  const speaker = currentTurn ? speakers[currentTurn.speakerIdx] : '';
  const color = currentTurn ? speakerColors[currentTurn.speakerIdx % speakerColors.length] : 'var(--accent-primary)';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--navy)', fontFamily: 'var(--font-sans)' }}>
      <SwipeHint />

      {/* Header */}
      <div className="px-6 pt-14 pb-3">
        <div className="flex items-center justify-between mb-1">
          <QuestFormatEyebrow format="group" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
            Turn {turnIdx + 1}/{turns.length}
          </span>
        </div>
        <ProgressBar value={(turnIdx / turns.length) * 100} />
      </div>

      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        {/* Speaker indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `${color}22`,
            border: `2px solid ${color}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, color }}>{(currentTurn?.speakerIdx ?? 0) + 1}</span>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Now recording</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF' }}>{speaker}</p>
          </div>
        </div>

        {/* Previous turn context */}
        {turnIdx > 0 && turns[turnIdx - 1] && (
          <div className="flex gap-3 mb-4">
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', width: 52, flexShrink: 0, paddingTop: 2,
            }}>
              {speakers[turns[turnIdx - 1].speakerIdx]?.split(' ')[0]}
            </span>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', lineHeight: 1.65, fontStyle: 'italic' }}>
              {turns[turnIdx - 1].text}
            </p>
          </div>
        )}

        {/* Current line */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 16,
          border: `1px solid ${color}44`,
          padding: '20px',
          marginBottom: 28,
        }}>
          <div className="flex items-center gap-2 mb-3">
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 0 3px ${color}33` }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>Your Line</span>
          </div>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.65 }}>
            {currentTurn?.text}
          </p>
        </div>

        {state === 'recording' && (
          <div style={{ marginBottom: 16 }}>
            <VoiceVisualizer active height={80} />
          </div>
        )}

        <RecordingControls
          state={state}
          time={time}
          fmtTime={fmtTime}
          onStart={() => { setState('recording'); setTime(0); }}
          onStop={() => setState('completed')}
          onAccept={acceptTurn}
          onRetry={() => { setState('idle'); setTime(0); }}
          accentColor={color}
          submitLabel={turnIdx < turns.length - 1 ? (speakerChanged ? 'Submit & Pass Device' : 'Submit & Next Turn') : 'Submit & Finish'}
        />
      </div>
    </div>
  );
}

/* ─── Shared sub-components ────────────────────────────────────────── */

function BackButton({ onPress, dark }: { label?: string; onPress: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onPress}
      style={{
        display: 'flex', alignItems: 'center',
        background: 'none', border: 'none', cursor: 'pointer',
        color: dark ? 'rgba(255,255,255,0.55)' : 'var(--accent-primary)',
        padding: '4px 0', marginBottom: 8,
      }}
    >
      <ChevronLeft style={{ width: 22, height: 22 }} strokeWidth={2.5} />
    </button>
  );
}

function SwipeHint() {
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 20, zIndex: 50,
        background: 'linear-gradient(to right, rgba(255,255,255,0.04), transparent)',
        pointerEvents: 'none',
      }}
    />
  );
}

function QuestFormatEyebrow({ format }: { format: 'lines' | 'scenario' | 'group' }) {
  const labels = { lines: 'QUICK LINES', scenario: 'SOLO SCENARIO', group: 'GROUP SESSION' };
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
      color: format === 'lines' ? 'rgba(255,255,255,0.4)' : 'var(--accent-primary)',
      textTransform: 'uppercase',
    }}>
      {labels[format]}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 3, marginTop: 8 }}>
      <motion.div
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(90deg, var(--accent-primary-light), var(--accent-primary-deep))',
          borderRadius: 999, height: 3,
        }}
      />
    </div>
  );
}

interface RecordingControlsProps {
  state: RecordingState;
  time: number;
  fmtTime: (s: number) => string;
  onStart: () => void;
  onStop: () => void;
  onAccept: () => void;
  onRetry: () => void;
  accentColor?: string;
  submitLabel?: string;
}

function RecordingControls({
  state, time, fmtTime, onStart, onStop, onAccept, onRetry,
  accentColor = 'var(--accent-primary)',
  submitLabel = 'Submit',
}: RecordingControlsProps) {
  return (
    <div className="text-center">
      {state === 'idle' && (
        <div className="flex flex-col items-center">
          <motion.button
            initial={{ scale: 0.92 }} animate={{ scale: 1 }}
            whileTap={{ scale: 0.94 }}
            onClick={onStart}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `linear-gradient(145deg, var(--accent-primary-light), var(--accent-primary-deep))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
              boxShadow: `0px 8px 24px rgba(var(--accent-glow-rgb),0.45), inset 0px 1px 0px rgba(255,255,255,0.2)`,
              border: 'none', cursor: 'pointer',
            }}
          >
            <Mic className="w-10 h-10 text-white" />
          </motion.button>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>Tap to record</p>
        </div>
      )}

      {state === 'recording' && (
        <div className="flex flex-col items-center">
          <motion.button
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            whileTap={{ scale: 0.94 }}
            onClick={onStop}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `linear-gradient(145deg, var(--accent-primary-deep), var(--accent-primary-deep))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: `0px 8px 28px rgba(var(--accent-deep-rgb),0.55), inset 0px 1px 0px rgba(255,255,255,0.15)`,
              border: 'none', cursor: 'pointer',
            }}
          >
            <Square className="w-8 h-8 text-white fill-white" />
          </motion.button>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
            {fmtTime(time)}
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-primary)' }}>Recording…</p>
        </div>
      )}

      {state === 'completed' && (
        <div className="flex flex-col items-center">
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#1E6B40',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
            {fmtTime(time)}
          </div>
          <div className="flex items-center gap-3 mb-6 mt-2">
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 999,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
            }}>
              <Play className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Play back</span>
            </button>
          </div>
          <button
            onClick={onAccept}
            style={{
              width: '100%', height: 56, borderRadius: 999,
              background: `linear-gradient(160deg, var(--accent-primary-light) 0%, var(--accent-primary-deep) 100%)`,
              border: 'none', cursor: 'pointer',
              boxShadow: `0px 8px 24px rgba(var(--accent-glow-rgb),0.38), inset 0px 1px 0px rgba(255,255,255,0.18)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>{submitLabel}</span>
          </button>
          <button
            onClick={onRetry}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}
          >
            Record again
          </button>
        </div>
      )}
    </div>
  );
}
