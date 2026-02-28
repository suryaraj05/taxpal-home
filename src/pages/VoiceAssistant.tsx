import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Send, BarChart3, Clock, Wallet } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const suggestedQuestions = [
  { hindi: "मेरा ITC कितना है?", english: "How much ITC do I have?" },
  { hindi: "अगली डेडलाइन कब है?", english: "When is next deadline?" },
  { hindi: "कितना टैक्स देना है?", english: "How much tax to pay?" },
];

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: "नमस्ते रमेश जी! मैं TaxSetu असिस्टेंट हूँ। आप मुझसे कोई भी टैक्स सवाल पूछ सकते हैं।" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const responses: Record<string, string> = {
        "मेरा ITC कितना है?": "आपका ITC बैलेंस ₹12,400 है। यह फरवरी 2026 के लिए है।",
        "अगली डेडलाइन कब है?": "अगली डेडलाइन 20 मार्च 2026 है - GSTR-3B के लिए। अभी 8 दिन बचे हैं।",
        "कितना टैक्स देना है?": "इस महीने ₹12,400 टैक्स है, लेकिन ITC से पूरा भर जाएगा! कोई कैश नहीं देना।",
      };
      const reply = responses[text] || "मैं समझ गया। मैं इस पर काम कर रहा हूँ। कुछ और पूछना है?";
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: reply }]);
    }, 1200);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        sendMessage("मेरा ITC कितना है?");
      }, 2500);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[400px] flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Go back">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">TaxSetu असिस्टेंट</h1>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${isListening ? "bg-success animate-pulse" : "bg-muted-foreground/40"}`} />
            <span className="text-xs text-muted-foreground">
              {isListening ? "सुन रहा हूँ..." : "ऑनलाइन"}
            </span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" role="log" aria-live="polite" aria-label="Chat messages">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 text-base leading-relaxed ${
                msg.role === "user"
                  ? "rounded-[20px_20px_4px_20px] bg-primary text-primary-foreground"
                  : "rounded-[20px_20px_20px_4px] bg-muted text-foreground"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {suggestedQuestions.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q.hindi)} className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-card hover:bg-muted transition-colors" aria-label={q.english}>
                {q.hindi}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card px-4 py-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="या यहाँ टाइप करें..."
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Text input. Type your question."
            style={{ minHeight: "48px" }}
          />

          {input ? (
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage(input)} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-soft" aria-label="Send message">
              <Send className="h-5 w-5 text-primary-foreground" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleListening}
              className={`flex h-14 w-14 items-center justify-center rounded-full shadow-float ${isListening ? "bg-destructive" : "gradient-primary"}`}
              aria-label={isListening ? "Stop listening" : "Press to speak"}
            >
              {isListening ? <MicOff className="h-5 w-5 text-primary-foreground" /> : <Mic className="h-5 w-5 text-primary-foreground" />}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
