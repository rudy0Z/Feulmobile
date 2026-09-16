import { motion } from 'motion/react';

interface Props {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; description: string; color: string }[];
}

// Keyboard Grade — number-key affordance made visual. Each grade shows its
// keycap so power users learn the 1–5 shortcut. (Live keydown handling lives
// in GradingTask so it works regardless of the visible instrument.)
export function KeyboardGrade({ selectedGrade, onGrade, gradeOptions }: Props) {
  const selected = gradeOptions.find((g) => g.id === selectedGrade);

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 mb-4">
        {gradeOptions.map((opt) => {
          const isSelected = selectedGrade === opt.id;
          return (
            <motion.button
              key={opt.id}
              onClick={() => onGrade(opt.id)}
              whileTap={{ scale: 0.94, y: 2 }}
              style={{
                flex: 1, maxWidth: 60, cursor: 'pointer', border: 'none', background: 'transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)',
              }}
            >
              <span
                style={{
                  width: '100%', height: 52, borderRadius: 'var(--r-xs)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-number)', fontSize: 'var(--fs-section)', fontWeight: 800,
                  background: isSelected ? opt.color : 'var(--surface-raised)',
                  color: isSelected ? 'var(--text-on-studio)' : 'var(--text-secondary)',
                  border: isSelected ? `1.5px solid ${opt.color}` : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--e-2)' : '0 2px 0 var(--border-strong)',
                  transition: 'all 0.12s',
                }}
              >
                {opt.id}
              </span>
              <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ minHeight: 24, textAlign: 'center' }}>
        {selected && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontSize: 'var(--fs-secondary)', fontWeight: 500, color: 'var(--text-muted)' }}
          >
            {selected.id} — {selected.description}
          </motion.span>
        )}
      </div>
    </div>
  );
}
