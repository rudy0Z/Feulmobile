import { motion } from 'motion/react';

interface SegmentedControlProps {
  selectedGrade: number | null;
  onGrade: (grade: number) => void;
  gradeOptions: { id: number; label: string; color: string; description: string }[];
}

export function SegmentedControl({ selectedGrade, onGrade, gradeOptions }: SegmentedControlProps) {
  function getSegmentColor(id: number, selected: number | null): string {
    if (selected !== id) return 'var(--t-bone-100)';
    if (id <= 2) return 'var(--state-failed)';
    if (id === 3) return 'var(--money-pending)';
    return 'var(--color-success)';
  }

  const selectedGradeObj = gradeOptions.find(g => g.id === selectedGrade);

  return (
    <div className="w-full">
      <div className="flex rounded-2xl overflow-hidden mb-3" style={{ gap: 'var(--space-1)'}}>
        {gradeOptions.map((opt) => {
          const isSelected = selectedGrade === opt.id;
          const fillColor = getSegmentColor(opt.id, selectedGrade);
          const isDimmed = selectedGrade !== null && !isSelected;
          
          return (
            <button
              key={opt.id}
              onClick={() => onGrade(opt.id)}
              style={{
                flex: 1, height: 56,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: fillColor, border: 'none', cursor: 'pointer',
                transition: 'background 0.18s, transform 0.12s, opacity 0.18s',
                transform: isSelected ? 'scaleY(1.08)' : 'scaleY(1)',
                opacity: isDimmed ? 0.3 : 1,
                borderRadius: opt.id === 1 ? '12px 0 0 12px' : opt.id === 5 ? '0 12px 12px 0' : '0',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-number)',
                  fontSize: isSelected ? 22 : 16,
                  fontWeight: isSelected ? 800 : 500,
                  color: isSelected ? 'var(--text-on-studio)' : 'var(--text-muted)',
                  transition: 'font-size 0.12s',
                  lineHeight: 1,
                }}
              >
                {opt.id}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mb-4 px-0.5">
        {gradeOptions.map((opt) => (
          <span
            key={opt.id}
            style={{
              flex: 1, textAlign: 'center',
              fontSize: 'var(--fs-caption)',
              fontWeight: selectedGrade === opt.id ? 700 : 500,
              color: selectedGrade === opt.id ? 'var(--text-primary)' : 'var(--text-muted)',
              transition: 'color 0.15s', lineHeight: 1.3,
            }}
          >
            {opt.label}
          </span>
        ))}
      </div>

      {selectedGradeObj && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl mb-4"
          style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedGradeObj.color, flexShrink: 0 }} />
          <span style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selectedGradeObj.id} — {selectedGradeObj.label}
          </span>
        </motion.div>
      )}
    </div>
  );
}
