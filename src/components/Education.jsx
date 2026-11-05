import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Section from "./Section";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const timeline = [
  {
    title: "BSc Computer Science",
    place: "Akademia University, Pretoria",
    date: "Graduating November 2026",
    points: [
      "Algorithms & data structures, software engineering and design patterns",
      "Computer networks, cybersecurity and operating systems",
      "Software architecture: microservices, API gateways and message queues",
      "Cloud computing (AWS, Azure, Google Cloud) and DevOps",
    ],
  },
  {
    title: "Technical Tester (Internship)",
    place: "SITC",
    date: "1 – 24 August 2026",
    points: [
      "UI test automation in C# with NUnit and Playwright for .NET",
      "Automated dashboards and shipment modules of enterprise shipping systems",
    ],
  },
  {
    title: "FNB Disruption 2025 Programme",
    place: "First National Bank",
    date: "2025",
    points: ["Innovation programme on digital transformation and fintech"],
  },
];

const certs = [
  "Kiro Getting Started: AWS Training & Certification (March 2026)",
  "Spec-Driven Development with Kiro: AWS Training & Certification (March 2026)",
  "AI Agent Development Workshop: building and deploying an AI agent on Ubuntu (2026)",
];

export default function Education() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <Section id="education" number="04" title="Experience & Education" selfReveal>
      <div className="grid gap-10 md:grid-cols-3">
        <ol ref={ref} className="relative space-y-8 pl-10 md:col-span-2">
          {/* spoor + goue lyn wat met scroll opbou */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scaleY, originY: 0 }}
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold to-gold-light"
          />

          {timeline.map((t) => (
            <li key={t.title} className="relative">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute -left-[41px] top-6 h-4 w-4 rounded-full border-2 border-gold bg-navy-950 shadow-[0_0_12px_rgba(201,162,39,0.5)]"
              />
              <Reveal>
                <GlowCard className="p-6" tilt={2}>
                  <p className="text-xs uppercase tracking-widest text-gold">{t.date}</p>
                  <h3 className="mt-1 font-display text-xl text-white">{t.title}</h3>
                  <p className="text-sm text-slate-400">{t.place}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-400">
                    {t.points.map((p) => (
                      <li key={p}><span className="mr-2 text-gold">›</span>{p}</li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.15} className="h-fit">
          <GlowCard className="p-6" tilt={3}>
            <h3 className="mb-4 font-display text-lg text-white">Certifications</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {certs.map((c) => (
                <li key={c}><span className="mr-2 text-gold">›</span>{c}</li>
              ))}
            </ul>
          </GlowCard>
        </Reveal>
      </div>
    </Section>
  );
}