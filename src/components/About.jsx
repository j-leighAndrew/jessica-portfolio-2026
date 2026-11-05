import Section from "./Section";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const focus = [
  {
    title: "Full-stack development",
    text: "React, Flask and PostgreSQL, from the database to the interface, on a team capstone project.",
  },
  {
    title: "Test automation",
    text: "UI test automation in C# with NUnit and Playwright during my internship.",
  },
  {
    title: "Applied AI",
    text: "A chatbot built on the Gemini API, backed by live database data.",
  },
];

const whyParagraphs = [
  "I chose Computer Science because I have always been curious about how technology works and how it can be used to solve real-world problems. What started as an interest in computers has grown into a passion for creating things, solving challenges, and learning how different technologies work together.",
  "During my studies, I discovered that I enjoy the process of taking an idea and turning it into something that actually works. Working on projects like my academic conference management system has shown me how software can make people's lives easier and how much I enjoy being part of that process.",
  "I chose this field because I want to keep growing as a developer and use my skills to build meaningful solutions that make a difference.",
];

const traits = ["Creative", "Critical thinking", "Always learning"];

export default function About() {
  return (
    <Section id="about" number="01" title="About Me" selfReveal>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-5 text-lg leading-relaxed text-slate-400 md:col-span-2">
          <Reveal>
            <p>
              I am a Computer Science graduate with a passion for software
              engineering and building technology-driven solutions. Through my
              studies and my capstone project, I gained hands-on experience in
              programming, application development, databases and system design.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              I enjoy understanding how systems work, solving technical
              challenges and turning ideas into functional applications. I am
              especially interested in full-stack development, AI and building
              scalable digital solutions.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <GlowCard className="p-6">
            <h3 className="mb-4 font-display text-lg text-white">Quick facts</h3>
            <ul className="space-y-3 text-sm">
              <li><span className="text-gold">Location:</span> South Africa</li>
              <li><span className="text-gold">Degree:</span> BSc Computer Science</li>
              <li><span className="text-gold">Graduating:</span> November 2026</li>
              <li><span className="text-gold">Focus:</span> Full-stack, AI, cloud</li>
            </ul>
          </GlowCard>
        </Reveal>
      </div>

      {/* Why Computer Science? */}
      <div className="mt-20">
        <Reveal>
          <h3 className="font-display text-2xl text-white md:text-3xl">
            Why Computer Science?
          </h3>
          <span className="mb-8 mt-3 block h-px w-14 bg-gold" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <blockquote className="border-l-2 border-gold pl-5 font-display text-xl leading-relaxed text-gold-light">
              Computer Science is more than just writing code. It is about being
              creative, thinking critically, and constantly challenging myself
              to learn something new.
            </blockquote>
            <ul className="mt-6 flex flex-wrap gap-2">
              {traits.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-light"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="space-y-4 leading-relaxed text-slate-400 md:col-span-3">
            {whyParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {focus.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1} className="h-full">
            <GlowCard className="h-full p-6">
              <h3 className="font-display text-lg text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.text}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}