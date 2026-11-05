import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingText({ words, interval = 2600 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gold-light"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}