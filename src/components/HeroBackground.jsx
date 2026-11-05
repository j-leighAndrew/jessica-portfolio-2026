import { useMemo } from "react";

export default function HeroBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        dx: (Math.random() - 0.5) * 80,
        o: 0.3 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* floating orbs */}
      <div
        className="absolute -top-32 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl"
        style={{ animation: "orb 14s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        style={{ animation: "orb 18s ease-in-out infinite reverse" }}
      />
      {/* subtle secondary orb for depth */}
      <div
        className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
        style={{ animation: "orb 22s ease-in-out 4s infinite" }}
      />

      {/* faint dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,162,39,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* gold particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            "--o": p.o,
            "--dx": `${p.dx}px`,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* soft fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
    </div>
  );
}
