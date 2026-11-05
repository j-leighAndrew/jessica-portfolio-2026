import { Link } from "react-router-dom";
import GlowCard from "./GlowCard";

export default function ProjectCard({ project }) {
  const {
    slug, title, tagline, contributions, tech,
    liveUrl, repoUrl, featured, caseStudy, image, preview,
  } = project;

  return (
    <GlowCard className="group h-full" tilt={featured ? 2.5 : 4}>
      <div className={`grid h-full gap-8 p-8 ${featured ? "md:grid-cols-5" : ""}`}>
        <div className={featured ? "md:col-span-3" : ""}>
          {featured && (
            <span className="mb-3 inline-block text-xs uppercase tracking-widest text-gold">
              Flagship project
            </span>
          )}
          <h3 className="font-display text-2xl text-white">{title}</h3>
          <p className="mt-2 text-slate-400">{tagline}</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-400">
            {contributions.map((c) => (
              <li key={c}>
                <span className="mr-2 text-gold">›</span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-light">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {caseStudy && (
              <Link
                to={`/projects/${slug}`}
                className="inline-flex items-center gap-2 text-gold after:absolute after:inset-0"
              >
                <span className="relative">
                  Explore case study
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 rounded-full bg-gold px-5 py-2 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-light"
              >
                Live demo ↗
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 text-sm text-slate-300 transition-colors hover:text-gold-light"
              >
                Source code
              </a>
            )}
          </div>
        </div>

        {featured && (
          <div className="md:col-span-2">
            {image ? (
              <div className="overflow-hidden rounded-lg border border-white/10">
                <img
                  src={image}
                  alt={`${title} screenshot`}
                  className="w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div aria-hidden="true" className="flex h-full min-h-[14rem] flex-col justify-center gap-3">
                {preview?.map((line, i) => (
                  <div
                    key={line}
                    className="rounded-lg border border-white/10 bg-navy-900/60 px-4 py-3 text-sm text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:border-gold/40"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </GlowCard>
  );
}