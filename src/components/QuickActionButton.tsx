import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuickActionProps {
  icon: ReactNode;
  labelHindi: string;
  labelEnglish: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
  ariaLabel: string;
  delay?: number;
}

const QuickActionButton = ({
  icon,
  labelHindi,
  labelEnglish,
  badge,
  badgeColor = "warning",
  onClick,
  ariaLabel,
  delay = 0,
}: QuickActionProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + delay * 0.1, duration: 0.4 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ scale: 1.03 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-soft focus-visible:ring-4 focus-visible:ring-primary/50"
    >
      {badge && (
        <span
          className="absolute right-3 top-3 rounded-full bg-warning px-2.5 py-0.5 text-xs font-semibold text-warning-foreground"
        >
          {badge}
        </span>
      )}
      <div className="flex h-12 w-12 items-center justify-center text-primary" aria-hidden="true">
        {icon}
      </div>
      <span className="mt-3 text-sm font-semibold text-foreground">
        {labelHindi}
      </span>
      <span className="text-xs text-muted-foreground">{labelEnglish}</span>
    </motion.button>
  );
};

export default QuickActionButton;
