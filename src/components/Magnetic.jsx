import { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={enabled ? { x, y } : undefined}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}