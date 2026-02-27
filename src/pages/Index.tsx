import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ComplianceCard from "@/components/ComplianceCard";
import QuickActionButton from "@/components/QuickActionButton";
import RecentActivity from "@/components/RecentActivity";
import VoiceFAB from "@/components/VoiceFAB";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
        aria-label="TaxSetu Home, Good morning Ramesh"
      >
        <div>
          <p className="text-base text-muted-foreground">
            नमस्ते • Good morning
          </p>
          <h1 className="text-2xl font-semibold text-foreground">रमेश जी</h1>
        </div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
          aria-label="Profile picture, double tap to open settings"
        >
          <span className="text-xl">👤</span>
        </button>
      </motion.header>

      {/* Compliance Card */}
      <div className="mt-6">
        <ComplianceCard />
      </div>

      {/* Quick Actions */}
      <section className="mt-8" aria-label="Quick actions">
        <div className="grid grid-cols-2 gap-4">
          <QuickActionButton
            icon="📸"
            labelHindi="चालान जोड़ें"
            labelEnglish="Add Invoice"
            ariaLabel="Add invoice button. Double tap to take photo of invoice."
            onClick={() => navigate("/add-invoice")}
            delay={0}
          />
          <QuickActionButton
            icon="📤"
            labelHindi="फाइल करें"
            labelEnglish="File Return"
            badge="8 दिन"
            ariaLabel="File return button. 8 days until deadline."
            delay={1}
          />
          <QuickActionButton
            icon="🎙️"
            labelHindi="सवाल पूछें"
            labelEnglish="Ask Question"
            ariaLabel="Ask question button. Talk to AI assistant."
            onClick={() => navigate("/chat")}
            delay={2}
          />
          <QuickActionButton
            icon="📊"
            labelHindi="सारांश देखें"
            labelEnglish="View Summary"
            ariaLabel="View summary button. See this month's details."
            onClick={() => navigate("/summary")}
            delay={3}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <div className="mt-8">
        <RecentActivity />
      </div>

      <VoiceFAB />
    </main>
  );
};

export default Index;
