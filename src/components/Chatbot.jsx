import { useState, useRef, useEffect, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { findBestAnswer } from "../data/chatbot-kb";
import { profile } from "../data/profile";

// ─── Suggested questions ────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Tell me about Jessica",
  "What technologies has she used?",
  "What was her role in AKBs?",
  "What testing experience does she have?",
  "What kind of role is she looking for?",
  "How can I contact her?",
];

// ─── Simple markdown-like renderer ──────────────────────────────────────────
function MessageText({ text }) {
  // Convert **bold**, bullet lines and newlines to JSX
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        // bullet
        if (line.startsWith("• ") || line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-gold" aria-hidden="true">›</span>
              <span>{renderBold(line.replace(/^[•\-]\s*/, ""))}</span>
            </div>
          );
        }
        return <p key={i}>{renderBold(line)}</p>;
      })}
    </div>
  );
}

function renderBold(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{p}</strong> : p
  );
}

// ─── Single message bubble ──────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gold text-navy-950 font-medium rounded-br-sm"
            : "bg-navy-800 text-slate-300 rounded-bl-sm border border-white/8"
        }`}
      >
        {isUser ? (
          <p>{msg.text}</p>
        ) : (
          <MessageText text={msg.text} />
        )}
        {msg.cta && (
          <a
            href={msg.cta.href}
            download={msg.cta.download || undefined}
            target={msg.cta.href.startsWith("http") ? "_blank" : undefined}
            rel={msg.cta.href.startsWith("http") ? "noreferrer" : undefined}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3 py-1.5 text-xs text-gold-light transition hover:bg-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {msg.cta.label} →
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-navy-800 border border-white/8 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gold/70"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Chatbot component ──────────────────────────────────────────────────
export default function Chatbot() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      text: `Hi! 👋 I'm Jessica's portfolio assistant. I can answer questions about her skills, experience, projects and how to get in touch.\n\nFeel free to ask anything, or pick a question below.`,
      cta: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const labelId = useId();
  const [showSuggestions, setShowSuggestions] = useState(true);

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  // focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowSuggestions(false);
    const userMsg = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // simulate a short think delay for naturalness
    setTimeout(() => {
      const { answer, cta } = findBestAnswer(trimmed);
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: `b-${Date.now()}`, role: "bot", text: answer, cta },
      ]);
    }, 500 + Math.random() * 400);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Jessica's assistant"}
        aria-expanded={open}
        aria-controls="chatbot-panel"
        whileHover={reduce ? {} : { scale: 1.08 }}
        whileTap={reduce ? {} : { scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/30 text-navy-950 transition-colors hover:bg-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? false : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold leading-none"
              aria-hidden="true"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              {/* chat bubble icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                  fill="currentColor"
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {/* unread dot when closed */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-navy-950"
          />
        )}
      </motion.button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-50 flex w-[min(92vw,400px)] flex-col rounded-2xl border border-white/10 bg-navy-950/95 shadow-2xl shadow-black/50 backdrop-blur-lg overflow-hidden"
            style={{ maxHeight: "min(80vh, 580px)" }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/8 bg-navy-900/80 px-4 py-3">
              <div>
                <p id={labelId} className="font-display text-sm font-semibold text-white">
                  Portfolio Assistant
                </p>
                <p className="text-xs text-slate-400">Ask me about Jessica</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
            </div>

            {/* disclaimer */}
            <div className="border-b border-white/5 bg-navy-900/40 px-4 py-2">
              <p className="text-[11px] text-slate-400 leading-tight">
                🤖 Automated portfolio assistant — answers are based on Jessica's verified portfolio content and may not cover every detail.
              </p>
            </div>

            {/* messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg) => (
                <Bubble key={msg.id} msg={msg} />
              ))}

              {/* typing */}
              <AnimatePresence>
                {typing && <TypingIndicator key="typing" />}
              </AnimatePresence>

              {/* suggestions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1.5 text-xs text-gold-light transition hover:bg-gold/10 hover:border-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* contact CTA strip */}
            <div className="border-t border-white/5 bg-navy-900/40 px-4 py-2 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">Not finding what you need?</p>
              <a
                href={`mailto:${profile.email}`}
                className="text-xs text-gold transition hover:text-gold-light focus:outline-none focus-visible:underline"
              >
                Contact Jessica →
              </a>
            </div>

            {/* input */}
            <form
              onSubmit={onSubmit}
              className="border-t border-white/8 bg-navy-900/60 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="chatbot-input" className="sr-only">
                  Ask a question about Jessica
                </label>
                <input
                  ref={inputRef}
                  id="chatbot-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  autoComplete="off"
                  className="flex-1 rounded-xl bg-navy-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 border border-white/8 focus:border-gold/50 focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-navy-950 transition hover:bg-gold-light disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
