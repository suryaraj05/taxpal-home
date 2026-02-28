import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardEdit, Download, Upload, Link, ClipboardList, BarChart3, CreditCard, CheckCircle, RefreshCw, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ProcessNode {
  id: string;
  icon: ReactNode;
  labelHindi: string;
  labelEnglish: string;
  status: "done" | "active" | "waiting" | "error";
  detail: string;
  route?: string;
}

const processes: ProcessNode[] = [
  { id: "reg", icon: <ClipboardEdit className="h-5 w-5" />, labelHindi: "GST पंजीकरण", labelEnglish: "GST Registration", status: "done", detail: "GSTIN: 27AADCR1234F1ZN", route: "/register" },
  { id: "inv-in", icon: <Download className="h-5 w-5" />, labelHindi: "खरीद चालान", labelEnglish: "Purchase Invoices", status: "done", detail: "127 चालान • ₹2,16,000" },
  { id: "inv-out", icon: <Upload className="h-5 w-5" />, labelHindi: "बिक्री चालान", labelEnglish: "Sales Invoices", status: "done", detail: "45 चालान • ₹2,85,000", route: "/invoices" },
  { id: "match", icon: <Link className="h-5 w-5" />, labelHindi: "ITC मिलान", labelEnglish: "ITC Matching", status: "active", detail: "98% मिलान पूरा" },
  { id: "gstr1", icon: <ClipboardList className="h-5 w-5" />, labelHindi: "GSTR-1 फाइल", labelEnglish: "GSTR-1 Filed", status: "done", detail: "10 फरवरी को फाइल हुआ" },
  { id: "gstr3b", icon: <BarChart3 className="h-5 w-5" />, labelHindi: "GSTR-3B तैयार", labelEnglish: "GSTR-3B Preparation", status: "active", detail: "ऑटो-ड्राफ्ट तैयार", route: "/file-return" },
  { id: "payment", icon: <CreditCard className="h-5 w-5" />, labelHindi: "टैक्स भुगतान", labelEnglish: "Tax Payment", status: "waiting", detail: "₹0 देय (ITC से)" },
  { id: "confirm", icon: <CheckCircle className="h-5 w-5" />, labelHindi: "फाइलिंग पुष्टि", labelEnglish: "Filing Confirmation", status: "waiting", detail: "GSTR-3B सबमिट बाकी" },
];

const statusConfig = {
  done: { color: "bg-success", ring: "ring-success/20", text: "text-success", badge: "पूर्ण", iconColor: "text-success-foreground" },
  active: { color: "bg-primary", ring: "ring-primary/20", text: "text-primary", badge: "जारी", iconColor: "text-primary-foreground" },
  waiting: { color: "bg-muted-foreground/40", ring: "ring-border", text: "text-muted-foreground", badge: "बाकी", iconColor: "text-muted" },
  error: { color: "bg-destructive", ring: "ring-destructive/20", text: "text-destructive", badge: "त्रुटि", iconColor: "text-destructive-foreground" },
};

const Orchestration = () => {
  const navigate = useNavigate();
  const donePct = Math.round((processes.filter((p) => p.status === "done").length / processes.length) * 100);

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Go back">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">प्रक्रिया दृश्य</h1>
          <p className="text-sm text-muted-foreground">Orchestration • फरवरी 2026</p>
        </div>
      </header>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl gradient-primary p-5 shadow-float">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-foreground/80">कुल प्रगति • Overall Progress</p>
            <p className="mt-1 text-4xl font-bold text-primary-foreground">{donePct}%</p>
          </div>
          <RefreshCw className="h-12 w-12 text-primary-foreground/40" />
        </div>
        <div className="mt-3 h-2 rounded-full bg-primary-foreground/20">
          <motion.div initial={{ width: 0 }} animate={{ width: `${donePct}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary-foreground" />
        </div>
      </motion.div>

      <div className="mt-6 relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-1">
          {processes.map((proc, i) => {
            const cfg = statusConfig[proc.status];
            return (
              <motion.button
                key={proc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => proc.route && navigate(proc.route)}
                className="relative flex w-full items-start gap-4 rounded-xl p-3 text-left hover:bg-muted/50 transition-colors"
                aria-label={`${proc.labelEnglish}: ${proc.detail}`}
              >
                <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ${cfg.ring} ${cfg.color} ${cfg.iconColor}`}>
                  {proc.status === "done" ? <CheckCircle className="h-5 w-5" /> : proc.icon}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${proc.status === "waiting" ? "text-muted-foreground" : "text-foreground"}`}>
                      {proc.labelHindi}
                    </p>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${cfg.text} bg-current/10`}>
                      {cfg.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{proc.labelEnglish}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{proc.detail}</p>
                </div>
                {proc.route && <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${cfg.color}`} />
            {cfg.badge}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Orchestration;
