import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";

const profileSections = [
  {
    title: "व्यापार विवरण",
    titleEn: "Business Details",
    items: [
      { icon: "🏪", label: "व्यापार का नाम", labelEn: "Business Name", value: "रमेश ट्रेडर्स" },
      { icon: "📋", label: "GSTIN", labelEn: "GST Number", value: "27AADCR1234F1ZN" },
      { icon: "📍", label: "राज्य", labelEn: "State", value: "महाराष्ट्र" },
      { icon: "📞", label: "मोबाइल", labelEn: "Mobile", value: "+91 98765 43210" },
    ],
  },
  {
    title: "सेटिंग्स",
    titleEn: "Settings",
    items: [
      { icon: "🌐", label: "भाषा", labelEn: "Language", value: "हिंदी + English", action: true },
      { icon: "🔔", label: "सूचनाएँ", labelEn: "Notifications", value: "चालू", action: true },
      { icon: "🎙️", label: "वॉइस असिस्टेंट", labelEn: "Voice Assistant", value: "सक्रिय", action: true },
      { icon: "🔒", label: "सुरक्षा", labelEn: "Security", value: "PIN सेट है", action: true },
    ],
  },
  {
    title: "सहायता",
    titleEn: "Help & Support",
    items: [
      { icon: "❓", label: "मदद", labelEn: "Help Center", value: "", action: true },
      { icon: "📖", label: "ट्यूटोरियल", labelEn: "Tutorial", value: "", action: true },
      { icon: "💬", label: "संपर्क करें", labelEn: "Contact Us", value: "", action: true },
      { icon: "⭐", label: "रेटिंग दें", labelEn: "Rate App", value: "", action: true },
    ],
  },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      {/* Header */}
      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-foreground">प्रोफाइल</h1>
        <p className="text-sm text-muted-foreground">Profile & Settings</p>
      </motion.header>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-3xl">
          👤
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground">रमेश कुमार</h2>
          <p className="text-sm text-muted-foreground">ramesh@example.com</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            ✅ सत्यापित • Verified
          </span>
        </div>
      </motion.div>

      {/* Sections */}
      {profileSections.map((section, si) => (
        <motion.section
          key={section.titleEn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + si * 0.1 }}
          className="mt-6"
        >
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {section.title} <span className="font-normal">• {section.titleEn}</span>
          </h3>
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden divide-y divide-border">
            {section.items.map((item) => (
              <button
                key={item.labelEn}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition-colors"
                aria-label={`${item.labelEn}: ${item.value}`}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.labelEn}</p>
                </div>
                {item.value && <span className="text-sm text-muted-foreground truncate max-w-[120px]">{item.value}</span>}
                {item.action && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 py-4 text-destructive font-medium hover:bg-destructive/5 transition-colors"
        aria-label="Log out"
      >
        <LogOut className="h-5 w-5" />
        <span>लॉग आउट • Log Out</span>
      </motion.button>

      <p className="mt-4 text-center text-xs text-muted-foreground">TaxSetu v1.0.0</p>
    </main>
  );
};

export default Profile;
