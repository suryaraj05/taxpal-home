import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";

interface Step {
  id: number;
  labelHindi: string;
  labelEnglish: string;
  icon: string;
  description: string;
  status: "done" | "current" | "upcoming";
}

const FileReturn = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);

  const steps: Step[] = [
    { id: 1, labelHindi: "चालान जाँचें", labelEnglish: "Verify Invoices", icon: "📄", description: "45 बिक्री + 127 खरीद चालान सत्यापित", status: currentStep > 1 ? "done" : currentStep === 1 ? "current" : "upcoming" },
    { id: 2, labelHindi: "ITC मिलान", labelEnglish: "ITC Matching", icon: "🔗", description: "₹12,400 ITC मैच हुआ, कोई विसंगति नहीं", status: currentStep > 2 ? "done" : currentStep === 2 ? "current" : "upcoming" },
    { id: 3, labelHindi: "GSTR-3B तैयार", labelEnglish: "Prepare GSTR-3B", icon: "📝", description: "ऑटो-फिल हो रहा है...", status: currentStep > 3 ? "done" : currentStep === 3 ? "current" : "upcoming" },
    { id: 4, labelHindi: "समीक्षा", labelEnglish: "Review & Submit", icon: "✅", description: "फाइनल चेक और सबमिट", status: currentStep > 4 ? "done" : currentStep === 4 ? "current" : "upcoming" },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/");
    }
  };

  const summaryCards = [
    { label: "बिक्री", labelEn: "Sales", value: "₹2,85,000", icon: "📤" },
    { label: "खरीद", labelEn: "Purchases", value: "₹2,16,000", icon: "📥" },
    { label: "ITC", labelEn: "ITC Credit", value: "₹12,400", icon: "💰" },
    { label: "देय टैक्स", labelEn: "Tax Due", value: "₹0", icon: "🎉" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-8 pt-6">
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
          <h1 className="text-xl font-semibold text-foreground">रिटर्न फाइल करें</h1>
          <p className="text-sm text-muted-foreground">File Return • GSTR-3B</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="mt-6 flex gap-1.5">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step.status === "done" ? "bg-success" : step.status === "current" ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground text-right">
        चरण {currentStep}/4 • Step {currentStep}/4
      </p>

      {/* Steps */}
      <div className="mt-6 space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border p-4 transition-colors ${
              step.status === "current"
                ? "border-primary bg-primary/5 shadow-soft"
                : step.status === "done"
                ? "border-success/30 bg-success/5"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                  step.status === "done"
                    ? "bg-success text-success-foreground"
                    : step.status === "current"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.status === "done" ? <Check className="h-5 w-5" /> : step.icon}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${step.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                  {step.labelHindi}
                </p>
                <p className="text-xs text-muted-foreground">{step.labelEnglish}</p>
              </div>
              {step.status === "current" && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary animate-pulse">
                  जारी...
                </span>
              )}
            </div>
            {step.status === "current" && (
              <p className="mt-2 ml-13 text-sm text-muted-foreground">{step.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.labelEn}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="rounded-xl border border-border bg-card p-3 shadow-card"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{card.icon}</span>
              <span className="text-xs text-muted-foreground">{card.label}</span>
            </div>
            <p className="mt-1 text-lg font-bold text-foreground">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Action button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-4 text-lg font-semibold text-primary-foreground shadow-float"
        style={{ minHeight: "60px" }}
        aria-label={currentStep === 4 ? "Submit return" : "Go to next step"}
      >
        <span>{currentStep === 4 ? "✅ सबमिट करें • Submit" : "आगे बढ़ें • Next Step"}</span>
        {currentStep < 4 && <ChevronRight className="h-5 w-5" />}
      </motion.button>
    </main>
  );
};

export default FileReturn;
