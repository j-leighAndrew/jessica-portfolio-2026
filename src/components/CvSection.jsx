import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Award, Code, Download, ExternalLink, GraduationCap, X, ZoomIn } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

const CV_URL = "/Jessica_Andrew_CV.pdf";
const PREVIEW_URL = "/cv-preview.webp";
const UPDATED = "November 2026";

const highlights = [
  { icon: GraduationCap, text: "BSc Computer Science, Akademia University" },
  { icon: Code, text: "Full-stack capstone and test automation internship" },
  { icon: Award, text: "AWS training and AI agent workshop" },
];

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function Preview({ onOpen }) {
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const spring = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(ny, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(nx, [0, 1], [-5, 5]), spring);

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
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={onOpen}
        onMouseMove={enabled ? onMove : undefined}
        onMouseLeave={enabled ? onLeave : undefined}
        whileHover={enabled ? { scale: 1.03 } : undefined}
        aria-label="Enlarge the first page of my CV"
        style={{
          rotate: reduce ? 0 : -2,
          ...(enabled ? { rotateX, rotateY, transformPerspective: 900 } : {}),
        }}
        className="group relative block w-full max-w-[300px] cursor-zoom-in"
      >
        <img
          src={PREVIEW_URL}
          alt="Preview of page 1 of Jessica Andrew's CV"
          width="1100"
          height="1556"
          loading="lazy"
          className="w-full rounded shadow-xl shadow-black/50"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-navy-950/90 px-3 py-1 text-xs text-gold-light opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomIn size={14} aria-hidden="true" />
          Click to enlarge
        </span>
      </motion.button>
      <p className="text-xs text-slate-400">Page 1 of 2</p>
    </div>
  );
}

function Lightbox({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="CV preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur md:p-8"
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full flex-col items-center gap-4"
          >
            <img
              src={PREVIEW_URL}
              alt="Page 1 of Jessica Andrew's CV"
              className="max-h-[78vh] rounded"
            />
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={CV_URL}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-light"
              >
                <Download size={16} aria-hidden="true" />
                Download PDF
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm text-white transition-colors hover:border-gold hover:text-gold-light"
              >
                Open both pages
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-5 top-5 text-slate-300 transition-colors hover:text-gold-light"
          >
            <X size={28} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CvSection() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="cv" number="05" title="My CV" selfReveal>
      <div className="grid items-center gap-10 rounded-2xl border border-gold/30 bg-navy-900/60 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
        <Reveal>
          <Preview onOpen={() => setOpen(true)} />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-slate-400">
            A two-page overview of my education, skills, internship and projects.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-slate-200">
                <Icon size={20} className="shrink-0 text-gold" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={CV_URL}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-navy-950 shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
              >
                <Download size={18} aria-hidden="true" />
                Download PDF
              </a>
            </Magnetic>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white transition-colors hover:border-gold hover:text-gold-light"
            >
              View full CV
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            PDF · 2 pages · Updated {UPDATED}
          </p>
        </Reveal>
      </div>

      <Lightbox open={open} onClose={() => setOpen(false)} />
    </Section>
  );
}