import { NavLink as RouterNavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface Tab {
  to: string;
  icon: string;
  labelHindi: string;
  labelEnglish: string;
}

const tabs: Tab[] = [
  { to: "/", icon: "🏠", labelHindi: "होम", labelEnglish: "Home" },
  { to: "/invoices", icon: "📄", labelHindi: "चालान", labelEnglish: "Invoices" },
  { to: "/chat", icon: "💬", labelHindi: "चैट", labelEnglish: "Chat" },
  { to: "/profile", icon: "👤", labelHindi: "प्रोफाइल", labelEnglish: "Profile" },
];

const BottomNav = () => {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-[400px] items-center justify-around px-2 py-1">
        {tabs.map((tab) => (
          <RouterNavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className="relative flex min-h-[60px] min-w-[60px] flex-col items-center justify-center rounded-xl px-3 py-2 transition-colors"
            aria-label={`${tab.labelEnglish} tab`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-1 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 text-2xl" aria-hidden="true">
                  {tab.icon}
                </span>
                <span
                  className={`relative z-10 mt-0.5 text-xs font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.labelHindi}
                </span>
              </>
            )}
          </RouterNavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
