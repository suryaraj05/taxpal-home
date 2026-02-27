import { motion } from "framer-motion";

const ComplianceCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="gradient-primary rounded-2xl p-8 shadow-float"
      role="status"
      aria-live="polite"
      aria-label="Compliance score 94 out of 100. Excellent status."
      style={{ minHeight: "200px" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary-foreground/70">
            स्कोर / Score
          </p>
          <motion.p
            className="mt-1 text-7xl font-bold text-primary-foreground"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            aria-label="Compliance score ninety-four out of one hundred"
          >
            94
          </motion.p>
        </div>
        <div className="rounded-full bg-primary-foreground/20 px-4 py-2">
          <span className="text-sm font-semibold text-primary-foreground">/100</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold text-primary-foreground">
          🎉 बहुत बढ़िया! <span className="text-lg font-normal">Excellent!</span>
        </p>
        <p className="mt-1 text-base text-primary-foreground/80">
          सब कुछ सही चल रहा है • Everything is on track
        </p>
      </div>
    </motion.div>
  );
};

export default ComplianceCard;
