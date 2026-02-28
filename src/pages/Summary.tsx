import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Download, Wallet, Sparkles, MessageCircle, FileUp } from "lucide-react";
import { ReactNode } from "react";

interface SummaryCard {
  id: string;
  icon: ReactNode;
  labelHindi: string;
  labelEnglish: string;
  amount: string;
  detailHindi: string;
  detailEnglish: string;
  className: string;
  ariaLabel: string;
  badge?: string;
}

const cards: SummaryCard[] = [
  {
    id: "sales",
    icon: <Upload className="h-7 w-7 text-primary-foreground" />,
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
    icon: <Download className="h-7 w-7 text-primary-foreground" />,
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
    icon: <Wallet className="h-7 w-7 text-primary-foreground" />,
    labelHindi: "टैक्स देना है",
    labelEnglish: "Tax to Pay",
    amount: "₹12,400",
    detailHindi: "ITC से भर जाएगा",
    detailEnglish: "Paid via ITC",
    badge: "कोई कैश नहीं!",
    className: "gradient-tax",
    ariaLabel: "Tax to pay: Twelve thousand four hundred rupees. Paid entirely through ITC, no cash needed.",
  },
];

const Summary = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Go back">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">फरवरी 2026</h1>
          <p className="text-sm text-muted-foreground">February 2026</p>
        </div>
      </header>

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
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {card.badge}
              </span>
            )}
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20" aria-hidden="true">
                {card.icon}
              </div>
              <div>
                <p className="text-base font-medium text-primary-foreground/80">{card.labelHindi}</p>
                <p className="text-xs text-primary-foreground/60">{card.labelEnglish}</p>
              </div>
            </div>
            <p className="mt-4 text-4xl font-bold text-primary-foreground">{card.amount}</p>
            <p className="mt-1 text-sm text-primary-foreground/70">{card.detailHindi} • {card.detailEnglish}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <MessageCircle className="h-4 w-4" /> ज्यादा जानना चाहें? बोलें: &apos;और बताओ&apos;
      </p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/file-return")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-5 text-xl font-semibold text-primary-foreground shadow-float"
        aria-label="Ready to file return. Double tap to start."
        style={{ minHeight: "64px" }}
      >
        <FileUp className="h-6 w-6" />
        <span>फाइल करने के लिए तैयार</span>
      </motion.button>
    </main>
  );
};

export default Summary;
