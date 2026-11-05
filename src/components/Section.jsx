import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

export default function Section({ id, number, title, children, selfReveal = false }) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          {/* section number */}
          <motion.p
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 text-sm tracking-widest text-gold"
          >
            {number}
          </motion.p>

          {/* title with animated gold underline highlight */}
          <h2 className="relative inline-block font-display text-3xl font-semibold text-white md:text-4xl">
            {title}
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-gold via-gold-light to-transparent"
            />
          </h2>

          {/* divider line */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="mb-8 mt-5 block h-px w-16 bg-gold/50"
          />
        </Reveal>
        {selfReveal ? children : <Reveal delay={0.1}>{children}</Reveal>}
      </div>
    </section>
  );
}
