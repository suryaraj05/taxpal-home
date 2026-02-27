import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const cards = [
  {
    id: "sales",
    icon: "📤",
    labelHindi: "बिक्री",
    labelEnglish: "Sales",
    amount: "₹2,85,000",
    detailHindi: "45 चालान",
    detailEnglish: "45 invoices",
    className: "gradient-sales",
    ariaLabel: "Sales: Two lakh eighty-five thousand rupees from 45 invoices",
  },
  {
    id: "purchases",
    icon: "📥",
    labelHindi: "खरीद",
    labelEnglish: "Purchases",
    amount: "₹2,16,000",
    detailHindi: "127 चालान",
    detailEnglish: "127 invoices",
    className: "gradient-purchases",
    ariaLabel: "Purchases: Two lakh sixteen thousand rupees from 127 invoices",
  },
  {
    id: "tax",
    icon: "💰",
    labelHindi: "टैक्स देना है",
    labelEnglish: "Tax to Pay",
    amount: "₹12,400",
    detailHindi: "ITC से भर जाएगा",
    detailEnglish: "Paid via ITC",
    badge: "🎉 कोई कैश नहीं!",
    className: "gradient-tax",
    ariaLabel:
      "Tax to pay: Twelve thousand four hundred rupees. Paid entirely through ITC, no cash needed.",
  },
];

const Summary = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            फरवरी 2026
          </h1>
          <p className="text-sm text-muted-foreground">February 2026</p>
        </div>
      </header>

      {/* Cards */}
      <div className="mt-8 space-y-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`relative rounded-2xl p-8 shadow-float ${card.className}`}
            style={{ minHeight: "160px" }}
            aria-label={card.ariaLabel}
          >
            {card.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
                {card.badge}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                {card.icon}
              </span>
              <div>
                <p className="text-base font-medium text-primary-foreground/80">
                  {card.labelHindi}
                </p>
                <p className="text-xs text-primary-foreground/60">
                  {card.labelEnglish}
                </p>
              </div>
            </div>
            <p className="mt-4 text-4xl font-bold text-primary-foreground">
              {card.amount}
            </p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              {card.detailHindi} • {card.detailEnglish}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Voice hint */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        💬 ज्यादा जानना चाहें? बोलें: &apos;और बताओ&apos;
      </p>

      {/* File button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-5 text-xl font-semibold text-primary-foreground shadow-float"
        aria-label="Ready to file return. Double tap to start."
        style={{ minHeight: "64px" }}
      >
        <span>📤</span>
        <span>फाइल करने के लिए तैयार</span>
      </motion.button>
    </main>
  );
};

export default Summary;
