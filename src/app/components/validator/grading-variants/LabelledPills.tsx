import { motion } from 'motion/react';

interface Props {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; description: string; color: string }[];
}

// Full-width labelled pills — one row per grade, label + description visible.
// Slower but most legible; good for training new validators.
export function LabelledPills({ selectedGrade, onGrade, gradeOptions }: Props) {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {gradeOptions.map((opt) => {
        const isSelected = selectedGrade === opt.id;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onGrade(opt.id)}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-7)',
              padding: 'var(--space-7) var(--space-8)', borderRadius: 'var(--r-md)', cursor: 'pointer',
              textAlign: 'left', transition: 'background 0.15s, border-color 0.15s',
              background: isSelected ? 'var(--surface-raised)' : 'var(--surface-sunken)',
              border: isSelected ? `1.5px solid ${opt.color}` : '1.5px solid transparent',
              boxShadow: isSelected ? 'var(--e-2)' : 'none',
            }}
          >
            <span
              style={{
                width: 34, height: 34, borderRadius: 'var(--r-full)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-number)', fontSize: 'var(--fs-body)', fontWeight: 800,
                background: isSelected ? opt.color : 'var(--surface-raised)',
                color: isSelected ? 'var(--text-on-studio)' : 'var(--text-muted)',
              }}
            >
              {opt.id}
            </span>
            <span className="flex-1 min-w-0">
              <span style={{ display: 'block', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>{opt.label}</span>
              <span style={{ display: 'block', fontSize: 'var(--fs-caption)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 'var(--space-0)'}}>{opt.description}</span>
            </span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: isSelected ? opt.color : 'var(--border-strong)' }} />
          </motion.button>
        );
      })}
    </div>
  );
}
