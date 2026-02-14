import { motion } from "motion/react";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <motion.div
      className="fixed top-6 right-6 z-40"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex flex-col items-end gap-2">
        <motion.div
          className="text-[var(--off-white)] text-sm"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          <span className="text-[var(--pink)]">{current}</span>
          <span className="text-[var(--off-white)]/50"> / {total}</span>
        </motion.div>

        <div className="w-32 h-1.5 bg-[var(--off-white)]/10 rounded-full overflow-hidden backdrop-blur-sm border border-[var(--off-white)]/20">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--pink)] to-[var(--gold)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              boxShadow: "0 0 10px rgba(255, 107, 157, 0.6)"
            }}
          />
        </div>

        {current === total && (
          <motion.div
            className="text-[var(--gold)] text-xs"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            All memories unlocked
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
