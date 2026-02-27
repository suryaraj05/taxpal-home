import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Check } from "lucide-react";

type RegistrationStep = "personal" | "business" | "gst" | "verify";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>("personal");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    businessName: "",
    businessType: "",
    state: "",
    gstNumber: "",
    panNumber: "",
    bankAccount: "",
  });

  const steps: { key: RegistrationStep; labelHi: string; labelEn: string; icon: string }[] = [
    { key: "personal", labelHi: "व्यक्तिगत", labelEn: "Personal", icon: "👤" },
    { key: "business", labelHi: "व्यापार", labelEn: "Business", icon: "🏪" },
    { key: "gst", labelHi: "GST विवरण", labelEn: "GST Details", icon: "📋" },
    { key: "verify", labelHi: "सत्यापन", labelEn: "Verify", icon: "✅" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === step);

  const handleNext = () => {
    const next = steps[currentIndex + 1];
    if (next) setStep(next.key);
    else navigate("/");
  };

  const handleBack = () => {
    const prev = steps[currentIndex - 1];
    if (prev) setStep(prev.key);
    else navigate(-1);
  };

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  const renderStep = () => {
    switch (step) {
      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">नाम • Name</label>
              <input className={inputClass} placeholder="पूरा नाम दर्ज करें" value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">मोबाइल नंबर • Mobile</label>
              <input className={inputClass} placeholder="+91 98765 43210" type="tel" value={formData.mobile} onChange={(e) => updateField("mobile", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">ईमेल • Email</label>
              <input className={inputClass} placeholder="email@example.com" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
          </div>
        );
      case "business":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">व्यापार का नाम • Business Name</label>
              <input className={inputClass} placeholder="व्यापार का नाम दर्ज करें" value={formData.businessName} onChange={(e) => updateField("businessName", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">व्यापार का प्रकार • Business Type</label>
              <select className={inputClass} value={formData.businessType} onChange={(e) => updateField("businessType", e.target.value)}>
                <option value="">चुनें • Select</option>
                <option value="proprietorship">एकल स्वामित्व • Proprietorship</option>
                <option value="partnership">साझेदारी • Partnership</option>
                <option value="pvtltd">प्रा. लि. • Pvt. Ltd.</option>
                <option value="llp">LLP</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">राज्य • State</label>
              <select className={inputClass} value={formData.state} onChange={(e) => updateField("state", e.target.value)}>
                <option value="">चुनें • Select</option>
                <option value="MH">महाराष्ट्र</option>
                <option value="DL">दिल्ली</option>
                <option value="GJ">गुजरात</option>
                <option value="KA">कर्नाटक</option>
                <option value="TN">तमिलनाडु</option>
                <option value="UP">उत्तर प्रदेश</option>
                <option value="RJ">राजस्थान</option>
              </select>
            </div>
          </div>
        );
      case "gst":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">GSTIN नंबर</label>
              <input className={inputClass} placeholder="27AADCR1234F1ZN" maxLength={15} value={formData.gstNumber} onChange={(e) => updateField("gstNumber", e.target.value.toUpperCase())} />
              <p className="mt-1 text-xs text-muted-foreground">15 अक्षरों का GST नंबर दर्ज करें</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">PAN नंबर • PAN Number</label>
              <input className={inputClass} placeholder="AADCR1234F" maxLength={10} value={formData.panNumber} onChange={(e) => updateField("panNumber", e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">बैंक खाता • Bank Account</label>
              <input className={inputClass} placeholder="खाता संख्या दर्ज करें" value={formData.bankAccount} onChange={(e) => updateField("bankAccount", e.target.value)} />
            </div>

            {/* GST info card */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm font-medium text-foreground">💡 GST पंजीकरण के बारे में</p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• ₹40 लाख+ टर्नओवर पर GST अनिवार्य</li>
                <li>• सर्विस सेक्टर: ₹20 लाख+ पर अनिवार्य</li>
                <li>• रजिस्ट्रेशन 3-7 कार्य दिवसों में होता है</li>
              </ul>
            </div>
          </div>
        );
      case "verify":
        return (
          <div className="space-y-4">
            <div className="rounded-2xl bg-success/5 border border-success/20 p-6 text-center">
              <span className="text-5xl">🎉</span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">सब तैयार!</h3>
              <p className="text-sm text-muted-foreground mt-1">All set! Review your details.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-3 divide-y divide-border">
              {[
                { label: "नाम", value: formData.name || "—" },
                { label: "मोबाइल", value: formData.mobile || "—" },
                { label: "व्यापार", value: formData.businessName || "—" },
                { label: "GSTIN", value: formData.gstNumber || "—" },
                { label: "PAN", value: formData.panNumber || "—" },
                { label: "राज्य", value: formData.state || "—" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between pt-2 first:pt-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-8 pt-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">पंजीकरण</h1>
          <p className="text-sm text-muted-foreground">Registration</p>
        </div>
      </header>

      {/* Step indicator */}
      <div className="mt-6 flex gap-1">
        {steps.map((s, i) => (
          <div key={s.key} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                i < currentIndex
                  ? "bg-success text-success-foreground"
                  : i === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentIndex ? <Check className="h-4 w-4" /> : s.icon}
            </div>
            <span className={`text-[10px] ${i === currentIndex ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {s.labelHi}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {steps[currentIndex].icon} {steps[currentIndex].labelHi} <span className="text-sm font-normal text-muted-foreground">• {steps[currentIndex].labelEn}</span>
            </h2>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-4 text-lg font-semibold text-primary-foreground shadow-float"
        style={{ minHeight: "60px" }}
      >
        <span>{step === "verify" ? "✅ पंजीकरण पूरा करें • Complete" : "आगे बढ़ें • Next"}</span>
        {step !== "verify" && <ChevronRight className="h-5 w-5" />}
      </motion.button>
    </main>
  );
};

export default Register;
