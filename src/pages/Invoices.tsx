import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronRight, Upload, Download, CheckCircle, Clock, AlertCircle, SearchX } from "lucide-react";

interface Invoice {
  id: string;
  party: string;
  amount: string;
  date: string;
  type: "sales" | "purchase";
  status: "verified" | "pending" | "error";
  gstNumber: string;
}

const mockInvoices: Invoice[] = [
  { id: "INV-001", party: "ABC Traders", amount: "₹1,18,000", date: "27 फरवरी", type: "sales", status: "verified", gstNumber: "27AADCA1234F1ZN" },
  { id: "INV-002", party: "XYZ Enterprises", amount: "₹85,500", date: "26 फरवरी", type: "purchase", status: "pending", gstNumber: "29BBDCX5678G2ZP" },
  { id: "INV-003", party: "Sharma & Sons", amount: "₹42,000", date: "25 फरवरी", type: "sales", status: "verified", gstNumber: "07CCDCS9012H3ZQ" },
  { id: "INV-004", party: "Gupta Electronics", amount: "₹2,35,000", date: "24 फरवरी", type: "purchase", status: "error", gstNumber: "09DDECG3456I4ZR" },
  { id: "INV-005", party: "Patel Textiles", amount: "₹67,800", date: "23 फरवरी", type: "sales", status: "verified", gstNumber: "24EEFCP7890J5ZS" },
  { id: "INV-006", party: "Kumar Hardware", amount: "₹1,54,200", date: "22 फरवरी", type: "purchase", status: "verified", gstNumber: "33FFGCK1234K6ZT" },
];

const statusConfig = {
  verified: { label: "सत्यापित", labelEn: "Verified", icon: <CheckCircle className="h-3.5 w-3.5" />, className: "bg-success/10 text-success" },
  pending: { label: "लंबित", labelEn: "Pending", icon: <Clock className="h-3.5 w-3.5" />, className: "bg-warning/10 text-warning" },
  error: { label: "त्रुटि", labelEn: "Error", icon: <AlertCircle className="h-3.5 w-3.5" />, className: "bg-destructive/10 text-destructive" },
};

type FilterType = "all" | "sales" | "purchase";

const Invoices = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = mockInvoices.filter((inv) => {
    const matchesSearch = inv.party.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || inv.type === filter;
    return matchesSearch && matchesFilter;
  });

  const salesTotal = mockInvoices.filter((i) => i.type === "sales").length;
  const purchaseTotal = mockInvoices.filter((i) => i.type === "purchase").length;

  return (
    <main className="mx-auto min-h-screen max-w-[400px] px-6 pb-32 pt-6">
      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold text-foreground">चालान</h1>
        <p className="text-sm text-muted-foreground">Invoices • {mockInvoices.length} कुल</p>
      </motion.header>

      <div className="mt-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="चालान खोजें... Search invoices"
          className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Search invoices"
        />
      </div>

      <div className="mt-4 flex gap-2">
        {([
          { key: "all" as FilterType, labelHi: "सभी", labelEn: "All", count: mockInvoices.length },
          { key: "sales" as FilterType, labelHi: "बिक्री", labelEn: "Sales", count: salesTotal },
          { key: "purchase" as FilterType, labelHi: "खरीद", labelEn: "Purchase", count: purchaseTotal },
        ]).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
              filter === f.key ? "bg-primary text-primary-foreground shadow-soft" : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {f.labelHi} ({f.count})
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <AnimatePresence>
          {filtered.map((inv, i) => {
            const status = statusConfig[inv.status];
            return (
              <motion.button
                key={inv.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: i * 0.05 }}
                className="w-full rounded-2xl border border-border bg-card p-4 shadow-card text-left flex items-center gap-3 hover:bg-muted/50 transition-colors"
                aria-label={`${inv.party}, ${inv.amount}, ${status.labelEn}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${inv.type === "sales" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
                  {inv.type === "sales" ? <Upload className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{inv.party}</p>
                  <p className="text-xs text-muted-foreground">{inv.id} • {inv.date}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-bold text-foreground">{inv.amount}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
                    {status.icon} {status.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <SearchX className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="mt-3 text-muted-foreground">कोई चालान नहीं मिला</p>
            <p className="text-sm text-muted-foreground">No invoices found</p>
          </div>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/add-invoice")}
        className="fixed bottom-24 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full gradient-primary shadow-float"
        aria-label="Add new invoice"
      >
        <Plus className="h-7 w-7 text-primary-foreground" />
      </motion.button>
    </main>
  );
};

export default Invoices;
