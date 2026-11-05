import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import { skillCategories } from "../data/skills";

export default function Skills() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabRefs = useRef([]);
  const cat = skillCategories[active];
  const last = skillCategories.length - 1;

  const onKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <Section id="skills" number="02" title="Technical Skills" selfReveal>
      <Reveal>
        <p className="mb-10 max-w-2xl text-slate-400">
          No percentage bars. Each technology shows where I have actually used it.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
          {/* kategorieë: horisontale ry op 'n foon, vertikale lys op rekenaar */}
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0"
          >
            {skillCategories.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.name}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`skill-tab-${i}`}
                  aria-selected={on}
                  aria-controls="skills-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-left text-sm transition-colors md:rounded-none md:py-2.5 ${
                    on ? "text-gold-light" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="skill-indicator"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-gold/60 bg-gold/10 md:rounded-none md:border-y-0 md:border-r-0 md:border-l-2 md:border-gold"
                    />
                  )}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* paneel */}
          <GlowCard className="min-h-[20rem] p-6 md:p-8" tilt={0}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.name}
                role="tabpanel"
                id="skills-panel"
                aria-labelledby={`skill-tab-${active}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl text-white">{cat.name}</h3>
                  <p className="text-xs text-slate-400">
                    {cat.items.length} {cat.items.length === 1 ? "technology" : "technologies"}
                  </p>
                </div>

                <div className="mt-4">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                      className="grid gap-1 border-t border-white/10 py-4 first:border-t-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
                    >
                      <span className="font-medium text-white">{item.name}</span>
                      <span className="leading-relaxed text-slate-400">{item.note}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </GlowCard>
        </div>
      </Reveal>
    </Section>
  );
}