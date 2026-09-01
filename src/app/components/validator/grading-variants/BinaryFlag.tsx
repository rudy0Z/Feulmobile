import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Flag, X, Check, Trash2 } from 'lucide-react';
import { REJECTION_ORDER, REJECTION_REASONS } from '../../../lib/rejectionTaxonomy';

interface BinaryFlagProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  onFlag: (tag: string) => void;
  gradeOptions: { id: number; label: string; color: string }[];
}

// Same rejection taxonomy the contributor sees in Repair Studio — one vocabulary
// both directions, so a validator's flag reads back to the contributor verbatim.
const TAGS = REJECTION_ORDER.map((id) => REJECTION_REASONS[id]);

export function BinaryFlag({ selectedGrade, onGrade, onFlag, gradeOptions }: BinaryFlagProps) {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="w-full">
      <div className="flex gap-3 mb-4 h-20">
        <button
          onClick={() => onGrade(1)} // Mapping Reject to 1
          style={{
            flex: 1, borderRadius: 24,
            background: selectedGrade === 1 ? 'var(--status-error-text)' : 'var(--status-error-bg)',
            color: selectedGrade === 1 ? 'var(--surface)' : 'var(--status-error-text)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selectedGrade === 1 ? 'var(--e-2)' : 'none',
          }}
        >
          <Trash2 className="w-6 h-6 mb-1" />
          <span style={{ fontSize: 16, fontWeight: 800 }}>Reject</span>
        </button>

        <button
          onClick={() => onGrade(5)} // Mapping Accept to 5
          style={{
            flex: 1, borderRadius: 24,
            background: selectedGrade === 5 ? 'var(--color-success)' : 'var(--status-success-bg)',
            color: selectedGrade === 5 ? 'var(--surface)' : 'var(--color-success)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: selectedGrade === 5 ? 'var(--e-2)' : 'none',
          }}
        >
          <Check className="w-6 h-6 mb-1" />
          <span style={{ fontSize: 16, fontWeight: 800 }}>Accept</span>
        </button>
      </div>

      <button
        onClick={() => setShowTags(true)}
        style={{
          width: '100%', padding: '14px', borderRadius: 999,
          background: 'transparent',
          border: '2px dashed var(--border-strong)',
          color: 'var(--text-muted)', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        <Flag className="w-4 h-4" />
        Flag for Senior Review
      </button>

      <AnimatePresence>
        {showTags && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-2xl border shadow-lg"
            style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Select Reason</span>
              <button onClick={() => setShowTags(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((reason) => {
                const Icon = reason.icon;
                return (
                  <button
                    key={reason.id}
                    onClick={() => onFlag(reason.label)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '8px 14px', borderRadius: 999,
                      background: 'var(--surface-ground)', border: '1px solid var(--border-subtle)',
                      fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'all 0.1s',
                    }}
                    className="active:scale-95"
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                    {reason.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
