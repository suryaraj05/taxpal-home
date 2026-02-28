import { motion } from "framer-motion";
import { CheckCircle, Upload, Bell } from "lucide-react";
import { ReactNode } from "react";

interface ActivityItem {
  icon: ReactNode;
  iconClass: string;
  textHindi: string;
  textEnglish: string;
  time: string;
}

const items: ActivityItem[] = [
  {
    icon: <CheckCircle className="h-5 w-5" />,
    iconClass: "text-success bg-success/10",
    textHindi: "नया चालान: ABC Traders - ₹1,18,000",
    textEnglish: "New invoice: ABC Traders - ₹1,18,000",
    time: "2 मिनट पहले",
  },
  {
    icon: <Upload className="h-5 w-5" />,
    iconClass: "text-primary bg-primary/10",
    textHindi: "GSTR-3B फाइल किया गया",
    textEnglish: "GSTR-3B filed successfully",
    time: "1 घंटा पहले",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    iconClass: "text-warning bg-warning/10",
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
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.iconClass}`} aria-hidden="true">
              {item.icon}
            </div>
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
