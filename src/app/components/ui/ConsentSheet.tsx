import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronDown, Mic } from 'lucide-react';
import { SwipeButton } from './SwipeButton';
import { Button, ListenChip } from './Primitives';
import { recordConsent, getProfile } from '../../lib/session';
import {
  COPY, FACTS, FACT_ICONS, VERBATIM_NATIVE, DPDP_VERBATIM,
  LANG_NAME, LANG_BCP, spokenConsent,
} from '../../lib/consentCopy';
import { durations } from '../../lib/motion';

/* ─────────────────────────────────────────────────────────────────────
 * Consent as contract (§2A). Shown in the contributor's chosen language,
 * on ONE screen, and PROVABLY before the microphone is ever used — the
 * Studio's capture beat is unreachable until this resolves.
 *
 * The copy lives in `lib/consentCopy.ts`, not here, because a second
 * consent surface exists (the native route `/contributor/consent`). A
 * legal promise must have exactly one definition.
 * ───────────────────────────────────────────────────────────────────── */

interface Props { onComplete: () => void; onCancel: () => void; preview?: boolean; }

/* Re-exported for existing importers — the definition lives in
 * lib/consentCopy.ts so the sheet and the native route can never drift. */
export { DPDP_VERBATIM };

export function ConsentSheet({ onComplete, onCancel, preview = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const lang = getProfile()?.consentLang ?? 'en';
  const t = COPY[lang] ?? COPY.en;
  const facts = (FACTS[lang] ?? FACTS.en).map((f, i) => ({ ...f, icon: FACT_ICONS[i] }));
  const isLatin = lang === 'en';
  const verbatimNative = VERBATIM_NATIVE[lang];
  const spoken = spokenConsent(lang);

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
          padding: 'var(--space-5) var(--space-9) var(--space-12)', boxShadow: 'var(--e-3)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 'var(--r-full)', background: 'var(--border-strong)', margin: '0 auto 20px' }} />

        <div className="flex items-start gap-3 mb-3">
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--state-settled-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck style={{ width: 22, height: 22, color: 'var(--state-settled-text)' }} strokeWidth={2} />
          </div>
          <div>
            <h2 className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-section)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: lang === 'en' ? 1.2 : 'var(--lh-deva)', margin: '0'}}>
              {t.title}
            </h2>
            <p className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: lang === 'en' ? 1.5 : 'var(--lh-deva)', marginTop: 'var(--space-2)'}}>
              {t.intro}
            </p>
          </div>
        </div>

        {/* Provable pre-mic promise */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-5) var(--space-6)', background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', margin: '10px 0 4px' }}>
          <Mic size={15} style={{ color: 'var(--action-primary)', flexShrink: 0 }} />
          <span className={lang === 'en' ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: lang === 'en' ? 1.4 : 'var(--lh-deva)' }}>
            {t.beforeMic}
          </span>
        </div>

        {/* Listenable consent — the whole sheet read aloud in the chosen language */}
        <div style={{ margin: '8px 0 2px' }}>
          <ListenChip
            speaker
            text={spoken}
            lang={LANG_BCP[lang] ?? 'en-IN'}
            label={`Listen to how your voice is protected in ${LANG_NAME[lang] ?? 'English'}`}
            playingLabel="Playing…"
          />
        </div>

        <button
          onClick={() => setExpanded((e) => !e)}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--action-primary)', fontSize: 'var(--fs-secondary)', fontWeight: 700, padding: '10px 0 4px' }}
        >
          {expanded ? t.hide : t.readMore}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: durations.base }} style={{ display: 'inline-flex' }}>
            <ChevronDown style={{ width: 15, height: 15 }} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: durations.base }} style={{ overflow: 'hidden' }}
            >
              <div style={{ background: 'var(--surface-ground)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 'var(--space-4)'}}>
                {facts.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} style={{ padding: 'var(--space-7) var(--space-8)', borderBottom: i < facts.length - 1 ? '1px solid var(--divider)' : 'none', display: 'flex', gap: 'var(--space-6)'}}>
                      <Icon style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0, marginTop: 'var(--space-1)'}} strokeWidth={2} />
                      <div>
                        <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-secondary)', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 var(--space-1)', lineHeight: isLatin ? 1.2 : 'var(--lh-deva)' }}>{f.title}</p>
                        <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: isLatin ? 1.5 : 'var(--lh-deva)', margin: '0'}}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className={isLatin ? undefined : 'font-script'} style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', lineHeight: isLatin ? 1.5 : 'var(--lh-deva)', marginBottom: 'var(--space-6)'}}>
                {t.dpdp} <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.dpdpAct}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The legal promise — verbatim, always rendered before the action */}
        <div style={{ background: 'var(--surface-sunken)', borderRadius: 'var(--r-md)', padding: 'var(--space-7) var(--space-8)', marginTop: 'var(--space-6)'}}>
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, margin: '0'}}>
            {DPDP_VERBATIM}
          </p>
          {verbatimNative && (
            <p className="font-script" style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 'var(--lh-deva)', margin: '6px 0 0' }}>
              {verbatimNative}
            </p>
          )}
        </div>

        <div className="mt-3">
          {preview ? (
            <Button full size="lg" onClick={onCancel}>Done</Button>
          ) : (
            <SwipeButton label={t.swipe} completeLabel={t.done} onComplete={handleConsent} />
          )}
        </div>
        {!preview && (
          <p style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', marginTop: 'var(--space-6)', lineHeight: 1.5 }}>
            {t.revoke}
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
