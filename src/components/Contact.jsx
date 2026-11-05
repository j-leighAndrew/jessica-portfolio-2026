import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { profile } from "../data/profile";

function Words({ text, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="mr-[0.25em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-gold">06 / LET'S CONNECT</p>
        </Reveal>

        <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-7xl">
          <Words text="Have an idea?" />
          <br />
          <Words text="Let's build something great." className="text-gold" />
        </h2>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Have an opportunity, a project or an interesting idea? I'd love to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block rounded-full bg-gold px-8 py-3.5 font-medium text-navy-950 shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
              >
                Email me →
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-light"
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-light"
              >
                GitHub
              </a>
            </Magnetic>
          </div>
          <p className="mt-6 text-sm text-slate-400">{profile.email}</p>
        </Reveal>

        <div className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-sm text-slate-400 md:flex-row">
          <p>© 2026 Jessica Andrew · Pretoria, South Africa</p>
          <p>Built with React, Vite, Tailwind CSS and Framer Motion</p>
          <a href="#home" className="transition-colors hover:text-gold-light">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}