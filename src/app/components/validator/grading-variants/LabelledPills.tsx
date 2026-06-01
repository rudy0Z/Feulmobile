import { motion } from 'motion/react';

interface LabelledPillsProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; color: string }[];
}

export function LabelledPills({ selectedGrade, onGrade, gradeOptions }: LabelledPillsProps) {
  const pillColors = [
    { bg: 'var(--status-error-bg)', active: 'var(--status-error-text)' }, // 1
    { bg: 'var(--accent-50)', active: 'var(--accent-primary-deep)' }, // 2
    { bg: 'var(--warning-50)', active: 'var(--warning-700)' }, // 3
    { bg: 'var(--status-success-bg)', active: 'var(--color-success)' }, // 4
    { bg: 'var(--status-success-bg)', active: 'var(--success-900)' }, // 5
  ];

  return (
    <div className="w-full flex flex-col gap-2 mb-4">
      {gradeOptions.map((opt, idx) => {
        const isSelected = selectedGrade === opt.id;
        const isDimmed = selectedGrade !== null && !isSelected;
        const colors = pillColors[idx];

        return (
          <button
            key={opt.id}
            onClick={() => onGrade(opt.id)}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 26,
              background: isSelected ? colors.active : colors.bg,
              color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              border: isSelected ? 'none' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: isDimmed ? 0.2 : 1,
            }}
          >
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: 16, 
              fontWeight: 800,
              opacity: isSelected ? 1 : 0.5,
              width: 24,
            }}>
              {opt.id}
            </span>
            <span style={{ 
              flex: 1, 
              textAlign: 'center', 
              fontSize: 14, 
              fontWeight: 700,
              marginRight: 24,
            }}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
