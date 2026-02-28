import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

const VoiceFAB = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <div className="absolute inset-0 rounded-full gradient-primary animate-pulse-ring" />
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/chat")}
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full gradient-primary shadow-large"
        aria-label="Voice assistant. Double tap or say 'Hey TaxSetu' to activate."
      >
        <Mic className="h-7 w-7 text-primary-foreground" />
      </motion.button>
    </div>
  );
};

export default VoiceFAB;
