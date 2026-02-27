import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import AddInvoice from "./pages/AddInvoice";
import VoiceAssistant from "./pages/VoiceAssistant";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const hideNavRoutes = ["/add-invoice", "/chat"];

const AppLayout = () => {
  const location = useLocation();
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add-invoice" element={<AddInvoice />} />
        <Route path="/chat" element={<VoiceAssistant />} />
        <Route path="/invoices" element={<Index />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/profile" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <BottomNav />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
