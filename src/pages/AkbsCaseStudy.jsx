import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import GlowCard from "../components/GlowCard";
import { akbs } from "../data/akbs";

function Block({ title, children }) {
  return (
    <section className="mt-20">
      <Reveal>
        <h2 className="font-display text-2xl text-white md:text-3xl">{title}</h2>
        <span className="mb-8 mt-3 block h-px w-12 bg-gold" />
      </Reveal>
      {children}
    </section>
  );
}

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || target === null || reduce) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  if (target === null) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{n}{suffix}</span>;
}

function Connector() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ originY: 0 }}
      className="mx-auto h-8 w-px bg-gradient-to-b from-gold to-gold/20"
    />
  );
}

function Gallery({ shots }) {
  const [failed, setFailed] = useState({});
  const [open, setOpen] = useState(null);
  const okIdx = shots.map((_, i) => i).filter((i) => !failed[i]);
  const okKey = okIdx.join(",");

  useEffect(() => {
    if (open === null) return;
    const step = (dir) =>
      setOpen((cur) => {
        const pos = okIdx.indexOf(cur);
        return okIdx[(pos + dir + okIdx.length) % okIdx.length];
      });
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, okKey]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {shots.map((s, i) => (
          <Reveal
            key={s.src}
            delay={(i % 3) * 0.08}
            className={s.wide ? "md:col-span-3" : ""}
          >
            <figure>
              <button
                type="button"
                disabled={!!failed[i]}
                onClick={() => setOpen(i)}
                aria-label={`Enlarge: ${s.caption}`}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-navy-900/60 transition-colors hover:border-gold/40 disabled:cursor-default"
              >
                {failed[i] ? (
                  <div className="flex aspect-video items-center justify-center text-sm text-slate-400">
                    Screenshot coming soon
                  </div>
                ) : (
                  <div className={s.wide ? "p-3 md:p-4" : "flex aspect-[4/5] items-center justify-center p-4"}>
                    <img
                      src={s.src}
                      alt={s.caption}
                      loading="lazy"
                      onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                      className={s.wide ? "w-full" : "max-h-full max-w-full object-contain"}
                    />
                  </div>
                )}
                {!failed[i] && (
                  <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs text-gold-light opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Click to enlarge ⤢
                  </span>
                )}
              </button>
              <figcaption className="mt-2 text-sm text-slate-400">{s.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur md:p-8"
          >
            <motion.figure
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-full flex-col items-center"
            >
              <img
                src={shots[open].src}
                alt={shots[open].caption}
                className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-slate-300">
                {shots[open].caption}
              </figcaption>
            </motion.figure>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 text-3xl text-slate-300 transition-colors hover:text-gold-light"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function AkbsCaseStudy() {
  const a = akbs;

  return (
    <article className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Reveal y={12}>
        <Link to="/#projects" className="text-sm text-slate-400 transition-colors hover:text-gold-light">
          ← Back to projects
        </Link>
      </Reveal>

      <header className="mt-8">
        <Reveal delay={0.05}>
          <p className="text-sm uppercase tracking-widest text-gold">{a.status}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-2 font-display text-5xl text-white md:text-7xl">{a.title}</h1>
          <p className="mt-2 text-xl text-slate-300">{a.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">{a.overview}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {a.tech.map((t) => (
              <span key={t} className="rounded-full border border-gold/30 px-3 py-1 text-sm text-gold-light">
                {t}
              </span>
            ))}
          </div>
          {a.liveUrl && (
            <a
              href={a.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-gold px-6 py-3 font-medium text-navy-950 transition-colors hover:bg-gold-light"
            >
              Try the live demo ↗
            </a>
          )}
        </Reveal>
      </header>

      <Reveal delay={0.1} className="mt-10">
        <GlowCard className="grid gap-4 p-6 text-sm sm:grid-cols-2" tilt={2}>
          <p><span className="text-gold">My role:</span> {a.role}</p>
          <p><span className="text-gold">Team:</span> {a.team}</p>
        </GlowCard>
      </Reveal>

      {a.stats?.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {a.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <GlowCard className="p-5 text-center" tilt={3}>
                <p className="font-display text-3xl text-gold">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      )}

      <Block title="Screenshots">
        <Gallery shots={a.screenshots} />
      </Block>

      <Block title="My role and the team's work">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <GlowCard className="h-full border-gold/40 p-6" tilt={2}>
              <h3 className="mb-3 font-display text-lg text-gold">My contributions</h3>
              <ul className="space-y-2 text-slate-400">
                {a.mine.map((m) => (
                  <li key={m}><span className="mr-2 text-gold">›</span>{m}</li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <GlowCard className="h-full p-6" tilt={2}>
              <h3 className="mb-3 font-display text-lg text-white">Team contributions</h3>
              <ul className="space-y-2 text-slate-400">
                {a.team_work.map((m) => (
                  <li key={m}><span className="mr-2 text-slate-400">›</span>{m}</li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        </div>
      </Block>

      <Block title="System architecture">
        <div className="mx-auto max-w-3xl">
          {a.architecture.map((layer, i) => (
            <div key={layer.label}>
              <Reveal delay={0.05}>
                <GlowCard className="p-5" tilt={2}>
                  <p className="font-display text-lg text-white">{layer.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{layer.detail}</p>
                </GlowCard>
              </Reveal>
              {i < a.architecture.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </Block>

      {a.chatbot && (
        <Block title="The AI chatbot">
          <Reveal>
            <p className="max-w-3xl text-slate-400">{a.chatbot.summary}</p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {a.chatbot.flow.map((f, i) => (
              <Reveal key={f.step} delay={i * 0.1} className="h-full">
                <GlowCard className="h-full p-5" tilt={3}>
                  <p className="font-display text-2xl text-gold">{f.step}</p>
                  <h3 className="mt-1 text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.detail}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      <Block title="Key features">
        <ul className="grid gap-x-8 gap-y-3 text-slate-400 md:grid-cols-2">
          {a.features.map((f, i) => (
            <Reveal key={f} delay={(i % 2) * 0.06}>
              <li><span className="mr-2 text-gold">›</span>{f}</li>
            </Reveal>
          ))}
        </ul>
      </Block>

      <Block title="Challenges and solutions">
        <div className="space-y-4">
          {a.challenges.map((c) => (
            <Reveal key={c.problem}>
              <GlowCard className="p-6" tilt={2}>
                <p className="text-white"><span className="text-gold">Challenge:</span> {c.problem}</p>
                <p className="mt-3 text-slate-400"><span className="text-gold">Solution:</span> {c.solution}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Block>

      {a.results?.length > 0 && (
        <Block title="Testing and results">
          <ul className="space-y-2 text-slate-400">
            {a.results.map((r) => (
              <li key={r}><span className="mr-2 text-gold">›</span>{r}</li>
            ))}
          </ul>
        </Block>
      )}
    </article>
  );
}