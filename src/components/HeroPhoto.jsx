import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function HeroPhoto({
  src = "/jessica.jpg",
  alt = "Portrait of Jessica Andrew",
}) {
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;
  const [failed, setFailed] = useState(false);

  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const spring = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(ny, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(nx, [0, 1], [-8, 8]), spring);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    nx.set(0.5);
    ny.set(0.5);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80"
    >
      {/* deep ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-12 rounded-full bg-gold/15 blur-3xl"
        style={{ animation: "orb 12s ease-in-out infinite" }}
      />
      {/* secondary tighter glow for warmth */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-gold/10 blur-xl"
        style={{ animation: "orb 8s ease-in-out 2s infinite reverse" }}
      />

      {/* spinning halo arc */}
      <div aria-hidden="true" className="halo-ring absolute -inset-3 rounded-full" />
      {/* static outer ring */}
      <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-gold/15" />
      {/* static inner ring */}
      <div aria-hidden="true" className="absolute -inset-1 rounded-full border border-gold/10" />

      {/* portrait */}
      <div className="relative h-full w-full overflow-hidden rounded-full border border-gold/20 bg-navy-900 shadow-[0_0_60px_rgba(201,162,39,0.15)]">
        {/* shimmer sweep on load */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "110%", opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.0, delay: 1.2, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          />
        )}

        {failed ? (
          <div className="flex h-full w-full items-center justify-center font-display text-6xl text-gold">
            JA
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width="800"
            height="800"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-[50%_20%]"
          />
        )}
      </div>
    </motion.div>
  );
}
