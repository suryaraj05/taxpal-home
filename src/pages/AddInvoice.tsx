import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddInvoice = () => {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const handleCapture = () => {
    setCaptured(true);
  };

  const handleRetake = () => {
    setCaptured(false);
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-[400px] flex-col bg-foreground">
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/40 backdrop-blur-sm"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-primary-foreground" />
        </button>

        <AnimatePresence>
          {showTip && !captured && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 mx-3 rounded-xl bg-foreground/50 px-4 py-3 backdrop-blur-sm"
            >
              <button
                onClick={() => setShowTip(false)}
                className="float-right ml-2 text-primary-foreground/70 text-xs"
                aria-label="Dismiss tip"
              >
                ✕
              </button>
              <p className="text-sm text-primary-foreground">
                💡 टिप: बोलकर भी फोटो ले सकते हैं - &apos;फोटो लें&apos; कहें
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Camera area */}
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {!captured ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Viewfinder guide */}
              <div
                className="flex items-center justify-center rounded-2xl border-2 border-dashed border-primary-foreground/50"
                style={{ width: "300px", height: "400px" }}
              >
                <div className="text-center">
                  <p className="text-lg text-primary-foreground/80">
                    चालान यहाँ रखें
                  </p>
                  <p className="text-sm text-primary-foreground/50 mt-1">
                    Place invoice here
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 px-6"
            >
              {/* Simulated captured image */}
              <div
                className="flex items-center justify-center rounded-2xl bg-muted/20"
                style={{ width: "300px", height: "400px" }}
              >
                <div className="text-center">
                  <span className="text-6xl">📄</span>
                  <p className="mt-3 text-primary-foreground text-lg font-medium">
                    फोटो ली गई
                  </p>
                  <p className="text-primary-foreground/60 text-sm">
                    Photo captured
                  </p>
                </div>
              </div>

              <p className="text-sm text-primary-foreground/70 text-center" aria-live="polite">
                चालान प्रोसेस हो रहा है... Processing invoice...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 px-6 pb-8 pt-4" style={{ background: "linear-gradient(transparent, hsla(0,0%,0%,0.6))" }}>
        {!captured ? (
          <div className="flex items-center justify-between">
            <button
              className="flex h-[60px] w-[60px] flex-col items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm"
              aria-label="Choose from gallery"
            >
              <span className="text-2xl">🖼️</span>
              <span className="text-[10px] text-primary-foreground mt-0.5">गैलरी</span>
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCapture}
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-primary-foreground shadow-large"
              aria-label="Capture photo. Double tap or say 'photo lo'."
            >
              <span className="text-3xl">📸</span>
            </motion.button>

            <button
              className="flex h-[60px] w-[60px] flex-col items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm"
              aria-label="Toggle flash. Currently off."
            >
              <span className="text-2xl">⚡</span>
              <span className="text-[10px] text-primary-foreground mt-0.5">फ्लैश</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleRetake}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-primary-foreground/30 py-4 text-primary-foreground"
              aria-label="Retake photo"
            >
              <span>🔄</span>
              <span className="font-medium">दोबारा लें</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-medium"
              aria-label="Looks good, continue"
            >
              <span>✓</span>
              <span>आगे बढ़ें</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInvoice;
