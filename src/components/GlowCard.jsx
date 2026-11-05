import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function GlowCard({ children, className = "", tilt = 4 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 20 };
  const rotateX = useSpring(useTransform(ny, [0, 1], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(nx, [0, 1], [-tilt, tilt]), spring);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(201,162,39,0.16), transparent 70%)`;
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    nx.set(x / r.width);
    ny.set(y / r.height);
  };

  const onLeave = () => {
    setHover(false);
    nx.set(0.5);
    ny.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enabled ? onMove : undefined}
      onMouseEnter={enabled ? () => setHover(true) : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 ${className}`}
    >
      {/* mouse glow */}
      {enabled && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0"
        />
      )}

      {/* one-shot entrance shimmer */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          initial={{ x: "-110%", opacity: 0 }}
          animate={inView ? { x: "110%", opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        />
      )}

      <div className="relative">{children}</div>
    </motion.div>
  );
}
