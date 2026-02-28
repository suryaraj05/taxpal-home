import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Camera, ImageIcon, Pencil, Upload, Download, RefreshCw, Check, Lightbulb, FileText, Mic } from "lucide-react";

type Method = "camera" | "gallery" | "manual" | null;

const AddInvoice = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>(null);
  const [captured, setCaptured] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const [manualData, setManualData] = useState({
    partyName: "",
    gstNumber: "",
    amount: "",
    invoiceNumber: "",
    date: "",
    type: "sales",
  });

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  const handleCapture = () => setCaptured(true);
  const handleRetake = () => setCaptured(false);

  // Method selection screen
  if (!method) {
    return (
      <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-8 pt-6">
        <header className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Go back">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">चालान जोड़ें</h1>
            <p className="text-sm text-muted-foreground">Add Invoice</p>
          </div>
        </header>

        <p className="mt-6 text-base text-muted-foreground">
          कैसे जोड़ना चाहेंगे? <span className="text-sm">• How would you like to add?</span>
        </p>

        <div className="mt-4 space-y-4">
          {([
            { key: "camera" as Method, icon: <Camera className="h-7 w-7 text-primary" />, labelHi: "कैमरे से फोटो लें", labelEn: "Take Photo", desc: "चालान की फोटो लें और ऑटो-प्रोसेस करें" },
            { key: "gallery" as Method, icon: <ImageIcon className="h-7 w-7 text-primary" />, labelHi: "गैलरी से चुनें", labelEn: "Choose from Gallery", desc: "पहले से ली गई फोटो चुनें" },
            { key: "manual" as Method, icon: <Pencil className="h-7 w-7 text-primary" />, labelHi: "हाथ से भरें", labelEn: "Manual Entry", desc: "चालान की जानकारी टाइप करें" },
          ]).map((m, i) => (
            <motion.button
              key={m.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMethod(m.key)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card text-left hover:bg-muted/50 transition-colors"
              aria-label={m.labelEn}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                {m.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{m.labelHi}</p>
                <p className="text-xs text-muted-foreground">{m.labelEn}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mic className="h-4 w-4" /> बोलें: &apos;फोटो लें&apos; या &apos;हाथ से भरें&apos;
        </p>
      </main>
    );
  }

  // Manual entry
  if (method === "manual") {
    return (
      <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-8 pt-6">
        <header className="flex items-center gap-3">
          <button onClick={() => setMethod(null)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Go back">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">हाथ से भरें</h1>
              <p className="text-sm text-muted-foreground">Manual Entry</p>
            </div>
          </div>
        </header>

        <div className="mt-6 space-y-4">
          <div className="flex gap-2">
            {(["sales", "purchase"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setManualData((p) => ({ ...p, type: t }))}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors ${
                  manualData.type === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {t === "sales" ? <Upload className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                {t === "sales" ? "बिक्री • Sales" : "खरीद • Purchase"}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">पार्टी का नाम • Party Name</label>
            <input className={inputClass} placeholder="व्यापारी का नाम" value={manualData.partyName} onChange={(e) => setManualData((p) => ({ ...p, partyName: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">GST नंबर • GST Number</label>
            <input className={inputClass} placeholder="27AADCA1234F1ZN" maxLength={15} value={manualData.gstNumber} onChange={(e) => setManualData((p) => ({ ...p, gstNumber: e.target.value.toUpperCase() }))} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">चालान नंबर • Invoice Number</label>
            <input className={inputClass} placeholder="INV-001" value={manualData.invoiceNumber} onChange={(e) => setManualData((p) => ({ ...p, invoiceNumber: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">राशि • Amount</label>
              <input className={inputClass} placeholder="₹0" type="number" value={manualData.amount} onChange={(e) => setManualData((p) => ({ ...p, amount: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">तारीख • Date</label>
              <input className={inputClass} type="date" value={manualData.date} onChange={(e) => setManualData((p) => ({ ...p, date: e.target.value }))} />
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-primary py-4 text-lg font-semibold text-primary-foreground shadow-float"
          style={{ minHeight: "60px" }}
        >
          <Check className="h-5 w-5" />
          चालान जोड़ें • Add Invoice
        </motion.button>
      </main>
    );
  }

  // Camera / Gallery mode
  return (
    <div className="relative mx-auto flex min-h-screen max-w-[400px] flex-col bg-foreground">
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
        <button onClick={() => setMethod(null)} className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/40 backdrop-blur-sm" aria-label="Go back">
          <ArrowLeft className="h-6 w-6 text-primary-foreground" />
        </button>

        <AnimatePresence>
          {showTip && !captured && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-1 mx-3 rounded-xl bg-foreground/50 px-4 py-3 backdrop-blur-sm">
              <button onClick={() => setShowTip(false)} className="float-right ml-2 text-primary-foreground/70 text-xs" aria-label="Dismiss tip">✕</button>
              <p className="flex items-center gap-2 text-sm text-primary-foreground">
                <Lightbulb className="h-4 w-4 shrink-0" />
                {method === "camera" ? "टिप: बोलकर भी फोटो ले सकते हैं - 'फोटो लें' कहें" : "गैलरी से फोटो चुनें"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {!captured ? (
            <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-primary-foreground/50" style={{ width: "300px", height: "400px" }}>
                <div className="text-center">
                  <p className="text-lg text-primary-foreground/80">
                    {method === "camera" ? "चालान यहाँ रखें" : "फोटो चुनें"}
                  </p>
                  <p className="text-sm text-primary-foreground/50 mt-1">
                    {method === "camera" ? "Place invoice here" : "Select from gallery"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 px-6">
              <div className="flex items-center justify-center rounded-2xl bg-muted/20" style={{ width: "300px", height: "400px" }}>
                <div className="text-center">
                  <FileText className="h-16 w-16 text-primary-foreground mx-auto" />
                  <p className="mt-3 text-primary-foreground text-lg font-medium">फोटो ली गई</p>
                  <p className="text-primary-foreground/60 text-sm">Photo captured</p>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/70 text-center" aria-live="polite">
                चालान प्रोसेस हो रहा है... Processing invoice...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-6 pb-8 pt-4" style={{ background: "linear-gradient(transparent, hsla(0,0%,0%,0.6))" }}>
        {!captured ? (
          <div className="flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCapture}
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-primary-foreground shadow-large"
              aria-label={method === "camera" ? "Capture photo" : "Select photo"}
            >
              {method === "camera" ? <Camera className="h-8 w-8 text-primary" /> : <ImageIcon className="h-8 w-8 text-primary" />}
            </motion.button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button onClick={handleRetake} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-primary-foreground/30 py-4 text-primary-foreground">
              <RefreshCw className="h-5 w-5" />
              <span className="font-medium">दोबारा लें</span>
            </button>
            <button onClick={() => navigate("/")} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-medium">
              <Check className="h-5 w-5" />
              <span>आगे बढ़ें</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInvoice;
