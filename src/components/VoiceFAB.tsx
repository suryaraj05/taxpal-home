import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VoiceFAB = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full gradient-primary animate-pulse-ring" />

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/chat")}
        className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full gradient-primary shadow-large"
        aria-label="Voice assistant. Double tap or say 'Hey TaxSetu' to activate."
      >
        <span className="text-3xl" aria-hidden="true">🎙️</span>
      </motion.button>
    </div>
  );
};

export default VoiceFAB;
