import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* curtain overlay that slides up on enter */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1, originY: "bottom" }}
        animate={{ scaleY: 0, originY: "bottom" }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background:
            "linear-gradient(to bottom, #070b16 0%, #0b1120 60%, rgba(201,162,39,0.08) 100%)",
          transformOrigin: "bottom",
          pointerEvents: "none",
        }}
      />
      {children}
    </motion.div>
  );
}
