import { motion } from 'motion/react';

interface Props {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; description: string; color: string }[];
}

// Thumb Arc — grades laid out on a shallow arc so all five sit within one-thumb
// reach at the bottom of the screen. Optimised for one-handed rapid grading.
export function ThumbArc({ selectedGrade, onGrade, gradeOptions }: Props) {
  const selected = gradeOptions.find((g) => g.id === selectedGrade);
  // Shallow arc: middle button sits lowest, ends lift up.
  const lift = (i: number, n: number) => {
    const mid = (n - 1) / 2;
    return Math.abs(i - mid) * 10; // px upward offset
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-center gap-2.5" style={{ height: 128, paddingTop: 24 }}>
        {gradeOptions.map((opt, i) => {
          const isSelected = selectedGrade === opt.id;
          return (
            <motion.button
              key={opt.id}
              onClick={() => onGrade(opt.id)}
              whileTap={{ scale: 0.9 }}
              animate={{ y: isSelected ? -8 : 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              style={{
                marginBottom: lift(i, gradeOptions.length),
                width: 56, height: 56, borderRadius: 'var(--r-full)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-number)',
                fontSize: isSelected ? 22 : 18, fontWeight: 800,
                cursor: 'pointer', border: 'none',
                background: isSelected ? opt.color : 'var(--t-bone-100)',
                color: isSelected ? 'var(--text-on-studio)' : 'var(--text-secondary)',
                boxShadow: isSelected ? 'var(--e-3)' : 'var(--e-1)',
                transition: 'background 0.15s, color 0.15s, font-size 0.12s',
              }}
            >
              {opt.id}
            </motion.button>
          );
        })}
      </div>

      <div style={{ minHeight: 44, marginTop: 8, textAlign: 'center' }}>
        {selected ? (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{selected.label}</span>
            <span style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginTop: 1 }}>{selected.description}</span>
          </motion.div>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>Tap a score — 1 poor, 5 perfect</span>
        )}
      </div>
    </div>
  );
}
