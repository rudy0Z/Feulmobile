/**
 * Recording content for each quest, keyed by quest id (§ Pass 2).
 * Kept separate from quests.ts metadata so the studio can consume clean,
 * format-specific shapes. All tracks/prompts are MOCKED — no real audio.
 */

/* ── CALIBRATION: the first-ever LINES capture folds a 2-phrase mic check
   into the take instead of adding a standalone screen (08-PHASE-1 §1.6).
   The phrases are deliberately short and neutral — they exist so the
   contributor can watch the level meter move and trust it before the real
   take starts, not to be good data. Keyed by quest id: only the first job
   in the newcomer chain carries one. ─────────────────────────────────── */
export const CALIBRATION_LINES: Record<string, string[]> = {
  'q-lines-1': [
    '"टेस्ट, एक, दो, तीन।"',
    '"मेरी आवाज़ साफ़ आ रही है?"',
  ],
};

/** Posture cue shown while the first-job calibration runs. */
export const CALIBRATION_POSTURE = 'Hold the phone about 15cm from your mouth';

/* ── LINES: an ordered list of short lines to read ──────────────── */
export const LINES_CONTENT: Record<string, string[]> = {
  'q-lines-1': [
    '"नमस्ते, आप कैसे हैं?"',
    '"मुझे एक कप चाय चाहिए।"',
    '"क्या आप यहाँ नए हैं?"',
    '"बहुत अच्छा, धन्यवाद।"',
    '"कल मिलते हैं।"',
    '"यह रास्ता कहाँ जाता है?"',
    '"थोड़ा धीरे बोलिए, प्लीज़।"',
    '"आपका दिन शुभ हो।"',
  ],
  'q-lines-2': [
    '"नवीन सॅमसंग गॅलक्सी आता ३०% सूट सह."',
    '"ताजे फळं — फक्त ९९ रुपये किलो."',
    '"घरपोच सेवा, कोणतेही अतिरिक्त शुल्क नाही."',
    '"आजचा खास बेत — दोन घ्या, एक फुकट."',
    '"नोंदणी करा आणि भेट मिळवा."',
    '"मर्यादित साठा, आजच बुक करा."',
  ],
  'q-lines-3': [
    '"That comes to ₹1,240."',
    '"Your appointment is on the 3rd of March."',
    '"Please call me back on 98200 41556."',
    '"The total is two thousand, five hundred and ten rupees."',
    '"Order number four-seven-two, placed on Tuesday."',
    '"It\'s a quarter past nine in the morning."',
    '"Your balance is ₹18,730 as of today."',
  ],
};

/* ── SCENARIO: a setup + alternating turns; you record the "you" turns ── */
export interface ScriptTurn {
  role: 'you' | 'other';
  label: string;
  text: string;
}
export interface ScenarioScript {
  setup: string;
  tone: string;
  turns: ScriptTurn[];
}

export const SCENARIO_CONTENT: Record<string, ScenarioScript> = {
  'q-scen-1': {
    setup: 'You walk into a busy café on a Monday morning. Short queue, you know what you want.',
    tone: 'Warm, a little rushed',
    turns: [
      { role: 'you',   label: 'YOU',     text: '"Hi, can I get a large oat milk latte and one almond croissant, please?"' },
      { role: 'other', label: 'BARISTA', text: '"Of course! Name for the order?"' },
      { role: 'you',   label: 'YOU',     text: '"Arjun. Quick question — any dairy milk options too?"' },
      { role: 'other', label: 'BARISTA', text: '"Yes — full cream, semi-skimmed, or oat. Your latte should be about eight minutes; queue\'s a bit long today."' },
      { role: 'you',   label: 'YOU',     text: '"Eight minutes? I have a 9 o\'clock. Can I pay now and grab it from the bar when it\'s ready?"' },
      { role: 'other', label: 'BARISTA', text: '"Absolutely, we\'ll call your name. Card or UPI?"' },
      { role: 'you',   label: 'YOU',     text: '"UPI, please. Thanks!"' },
    ],
  },
  'q-scen-3': {
    setup: 'A phone call to an electronics store\'s support line. You bought headphones two weeks ago and the left earbud is dead.',
    tone: 'Polite but firm',
    turns: [
      { role: 'you',   label: 'YOU',     text: '"Hi, I bought headphones from your Pune store on the 14th, and the left earbud has completely stopped working."' },
      { role: 'other', label: 'SUPPORT', text: '"I\'m sorry to hear that. Can I get your order number or registered email, please?"' },
      { role: 'you',   label: 'YOU',     text: '"Sure, it\'s arjun.mehta@gmail.com. I still have the bill too."' },
      { role: 'other', label: 'SUPPORT', text: '"I can see the order. It\'s within the 30-day window, so we can process an exchange. Are you near a store?"' },
      { role: 'you',   label: 'YOU',     text: '"Not really — is there a courier option? I work long hours and the store closes at 8."' },
      { role: 'other', label: 'SUPPORT', text: '"We have a pickup option, but it takes 5–7 days. Or you could visit on a Saturday."' },
      { role: 'you',   label: 'YOU',     text: '"The pickup works. Can you confirm it\'ll be the same model, brand new — not refurbished?"' },
      { role: 'other', label: 'SUPPORT', text: '"Yes, brand new, same model. I\'ll raise the pickup now — you\'ll get an SMS tomorrow."' },
      { role: 'you',   label: 'YOU',     text: '"Perfect. Thanks for sorting this out quickly."' },
    ],
  },
  'q-scen-4': {
    setup: "It's 9pm, you've been on hold 22 minutes. Your flight to Bengaluru tomorrow has just been cancelled — for the second time this week.",
    tone: 'Frustrated, controlled',
    turns: [
      { role: 'you',   label: 'YOU',   text: '"I\'ve been waiting almost half an hour, and this is the second cancellation in three days. I need to understand what\'s happening."' },
      { role: 'other', label: 'AGENT', text: '"I sincerely apologise for the wait and the disruption, sir. Can I get your booking reference?"' },
      { role: 'you',   label: 'YOU',   text: '"It\'s FEU-4482. And I\'d like to know the actual reason for this second cancellation."' },
      { role: 'other', label: 'AGENT', text: '"There\'s an operational crew issue on the route. We\'ve rebooked you on a 7 AM flight tomorrow."' },
      { role: 'you',   label: 'YOU',   text: '"7 AM isn\'t viable — I have a 9 o\'clock meeting in Bengaluru. I need the 11 PM tonight or a full refund."' },
      { role: 'other', label: 'AGENT', text: '"The 11 PM is at capacity. I can waitlist you, or process a full refund with a meal voucher."' },
      { role: 'you',   label: 'YOU',   text: '"Is a supervisor available? I\'d like to know what compensation is possible for the time I\'ve lost."' },
      { role: 'other', label: 'AGENT', text: '"I can escalate. Please hold for a few minutes."' },
      { role: 'you',   label: 'YOU',   text: '"I\'ll hold. But please note — I\'ve been waiting since 8:40 and I have screenshots of both cancellations."' },
    ],
  },
};

/* ── INTERVIEW: setup + question stems (other voice) each with your prompt ── */
export interface InterviewQuestion {
  /** The stem you hear (the other voice). */
  stem: string;
  /** A quiet hint for what your answer should cover. */
  youHint: string;
}
export interface InterviewScript {
  setup: string;
  interviewer: string;
  questions: InterviewQuestion[];
}

export const INTERVIEW_CONTENT: Record<string, InterviewScript> = {
  'q-int-1': {
    setup: "General physician's clinic, late afternoon. You've had a fever for three days.",
    interviewer: 'Doctor',
    questions: [
      { stem: '"Bataiye, kya takleef hai? Kab se ho raha hai?"', youHint: 'Describe the 3-day fever and heavy head.' },
      { stem: '"Temperature kitna aa raha hai?"', youHint: 'Give the reading — around 101.4 at night.' },
      { stem: '"Koi dawai li hai ab tak?"', youHint: 'Mention the one Crocin this morning.' },
      { stem: '"Khaana theek se kha rahe hain?"', youHint: 'Say your appetite is low.' },
      { stem: '"Neend kaisi hai?"', youHint: 'Sleep has been broken and short.' },
      { stem: '"Gale mein dard ya khansi?"', youHint: 'Mild throat pain, no cough.' },
      { stem: '"Koi purani bimari ya allergy?"', youHint: 'Nothing chronic; no known allergies.' },
      { stem: '"Theek hai. Kal report leke aaiyega — koi sawaal?"', youHint: 'Ask how long recovery should take.' },
    ],
  },
  'q-int-2': {
    setup: 'A recruiter is running a first phone screen for a support role.',
    interviewer: 'Recruiter',
    questions: [
      { stem: '"Thanks for taking the call. Could you walk me through your current role?"', youHint: 'Two lines on what you do today.' },
      { stem: '"What made you start looking for something new?"', youHint: 'A calm, honest reason.' },
      { stem: '"What\'s your notice period at the moment?"', youHint: 'State it plainly — e.g. 30 days.' },
      { stem: '"Are you comfortable with rotational shifts?"', youHint: 'Your genuine preference.' },
      { stem: '"What are your salary expectations?"', youHint: 'A range you\'re comfortable with.' },
      { stem: '"Great. Any questions for me before we wrap up?"', youHint: 'Ask one thing about the team or next steps.' },
    ],
  },
};

/* ── ROOM: one scene + a scrolling "score" of cues for a single take ── */
export interface RoomCue {
  who: string;
  line: string;
}
export interface RoomScript {
  scene: string;
  people: string[];
  score: RoomCue[];
}

export const ROOM_CONTENT: Record<string, RoomScript> = {
  'q-room-1': {
    scene: 'Sunday dinner, four people around a table. The eldest just brought up the upcoming family wedding in Lucknow. Keep it flowing — overlap and laughter are welcome.',
    people: ['Dada ji', 'Parent', 'Sibling', 'You'],
    score: [
      { who: 'Dada ji', line: '"Toh finally, Lucknow ki shaadi ka date pakka hua — 18 ko hai."' },
      { who: 'Parent',  line: '"Haan, flight jaldi book karni padegi. Season mein rush hota hai."' },
      { who: 'Sibling', line: '"Main train se jaana chahta hoon — overnight ka mazaa alag hai."' },
      { who: 'You',     line: '"Main bhi train se! Koi gaana gaayega toh pair milaunga."' },
      { who: 'Dada ji', line: '"Haha. Lekin Dadi ji ko flight se hi jaana hoga."' },
      { who: 'Parent',  line: '"Bilkul. Main unka aur apna ticket saath book kar leta hoon."' },
      { who: 'Sibling', line: '"Dress code kya hai? Kuch traditional lena padega."' },
      { who: 'You',     line: '"Dada ji, kitne log aa rahe hain? Badi shaadi lag rahi hai."' },
      { who: 'Dada ji', line: '"Minimum 400. Poore khaandaan ko bulaya hai — catering bhi Lucknawi."' },
      { who: 'Parent',  line: '"Awadhi biryani! Khana toh mast hoga."' },
      { who: 'Sibling', line: '"Aur kabab! Main pehle din hi pahunch jaaunga."' },
      { who: 'You',     line: '"Sab saath chalein toh zyada mazaa aayega. Plan bana lete hain."' },
    ],
  },
  'q-room-2': {
    scene: 'Living room, last over of a tight run chase. 8 needed off 6, everyone on the edge of the sofa. React live — cheer, groan, argue about the field.',
    people: ['Friend 1', 'Friend 2', 'You'],
    score: [
      { who: 'Friend 1', line: '"Arre yaar, 8 off 6 — ho jaayega, ho jaayega!"' },
      { who: 'You',      line: '"Full toss! Maar isko — chalo chakka!"' },
      { who: 'Friend 2', line: '"Sirf ek run? Yeh strike rotate kyun kar raha hai!"' },
      { who: 'Friend 1', line: '"Ab 7 off 4. Tension mat lo, tension mat lo."' },
      { who: 'You',      line: '"OOHHH chauka! Kya timing thi boss!"' },
      { who: 'Friend 2', line: '"3 off 3 ab. Main toh dekhoonga hi nahi, bahut pressure hai."' },
      { who: 'Friend 1', line: '"Bowler slower daalega, dekhna... yes! Do run!"' },
      { who: 'You',      line: '"Last ball, 1 to win — sab chup!"' },
      { who: 'Friend 2', line: '"GAYA! Ho gaya! WE WON, we won!"' },
    ],
  },
};
