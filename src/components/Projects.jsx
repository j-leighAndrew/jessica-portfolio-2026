import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <Section id="projects" number="03" title="Featured Projects" selfReveal>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.1}
            className={`h-full ${p.featured ? "md:col-span-2" : ""}`}
          >
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}