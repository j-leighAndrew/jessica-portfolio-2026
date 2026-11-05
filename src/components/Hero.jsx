import { motion, useReducedMotion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import RotatingText from "./RotatingText";
import HeroPhoto from "./HeroPhoto";

function WordReveal({ text, baseDelay = 0, className = "" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: baseDelay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.28em", transformPerspective: 600 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const buttonMotion = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.97 } };

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-28 md:grid-cols-5">
        <div className="md:col-span-3">
          {/* availability badge */}
         <motion.p
  {...reveal(0)}
  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300 backdrop-blur"
>
  <span className="h-2 w-2 rounded-full bg-gold" />
  Software Developer · Based in South Africa
</motion.p>

          {/* main heading with word-by-word reveal */}
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl xl:text-8xl">
            <WordReveal text="Hi, I'm" baseDelay={0.1} />
            {" "}
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", transformPerspective: 600 }}
              className="text-gold"
            >
              Jessica.
            </motion.span>
          </h1>

          <motion.h2 {...reveal(0.45)} className="mt-6 text-2xl text-slate-200 md:text-3xl lg:text-4xl">
            I'm a{" "}
            <RotatingText words={["Software Developer", "Problem Solver", "Full-Stack Builder"]} />
          </motion.h2>

          <motion.p {...reveal(0.55)} className="mt-6 max-w-xl text-lg text-slate-400">
            Building ideas into digital experiences. Computer Science graduate
            turning complex problems into practical software.
          </motion.p>

          <motion.div {...reveal(0.68)} className="mt-10 flex flex-wrap gap-4">
            <motion.a
              {...buttonMotion}
              href="#projects"
              className="rounded-full bg-gold px-7 py-3 font-medium text-navy-950 shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
            >
              View my projects
            </motion.a>
            <motion.a
              {...buttonMotion}
              href="/Jessica_Andrew_CV.pdf"
              download
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-light"
            >
              Download my CV
            </motion.a>
            <motion.a
              {...buttonMotion}
              href="#contact"
              className="rounded-full px-7 py-3 text-slate-300 transition-colors hover:text-gold-light"
            >
              Contact me →
            </motion.a>
          </motion.div>
        </div>

        <div className="order-first md:order-last md:col-span-2">
          <HeroPhoto />
        </div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        {...reveal(1.1)}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-widest text-slate-400 md:flex focus:outline-none focus:text-gold-light"
      >
        Scroll
        <span className="relative mt-1 h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            aria-hidden="true"
            className="absolute left-0 w-full bg-gradient-to-b from-gold to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
            style={{ height: "60%" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
