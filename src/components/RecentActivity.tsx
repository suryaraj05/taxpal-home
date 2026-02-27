import { motion } from "framer-motion";

interface ActivityItem {
  icon: string;
  textHindi: string;
  textEnglish: string;
  time: string;
}

const items: ActivityItem[] = [
  {
    icon: "✅",
    textHindi: "नया चालान: ABC Traders - ₹1,18,000",
    textEnglish: "New invoice: ABC Traders - ₹1,18,000",
    time: "2 मिनट पहले",
  },
  {
    icon: "📤",
    textHindi: "GSTR-3B फाइल किया गया",
    textEnglish: "GSTR-3B filed successfully",
    time: "1 घंटा पहले",
  },
  {
    icon: "🔔",
    textHindi: "ITC मिलान पूरा हुआ",
    textEnglish: "ITC matching completed",
    time: "3 घंटे पहले",
  },
];

const RecentActivity = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      aria-label="Recent activity list. Showing 3 most recent items."
      role="feed"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          हाल की गतिविधि
        </h2>
        <button
          className="text-sm font-medium text-primary hover:underline"
          aria-label="View all activity"
        >
          सब देखें
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card"
            aria-label={item.textEnglish}
          >
            <span className="text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">
                {item.textHindi}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentActivity;
