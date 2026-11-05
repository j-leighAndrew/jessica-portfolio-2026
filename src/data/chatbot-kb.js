/**
 * Portfolio chatbot knowledge base.
 * All answers are derived strictly from verified portfolio data.
 * No invented qualifications, dates or statistics.
 */

import { profile } from "./profile";
import { skillCategories } from "./skills";
import { projects } from "./projects";
import { akbs } from "./akbs";

// ─── Flatten skills for easy matching ──────────────────────────────────────
const allSkills = skillCategories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.name }))
);
const skillNames = allSkills.map((s) => s.name.toLowerCase());
const allTechList = [...new Set([
  ...allSkills.map((s) => s.name),
  ...akbs.tech,
])].join(", ");

// ─── Static answer bank ─────────────────────────────────────────────────────
export const answers = [
  // ── About / General ──────────────────────────────────────────────────────
  {
    id: "about",
    patterns: [
      "who is jessica", "tell me about jessica", "about jessica",
      "who are you", "introduce yourself", "introduce jessica",
      "about you", "who is she", "describe jessica",
    ],
    answer: `Jessica Andrew is a Computer Science graduate based in Pretoria, South Africa. She's passionate about software engineering and building technology-driven solutions.

Through her studies and capstone project she has gained hands-on experience in full-stack development, databases, mobile apps, test automation and applied AI. She is especially interested in full-stack development, AI and building scalable digital solutions.

She is currently available for opportunities.`,
  },

  // ── Looking for / Role ────────────────────────────────────────────────────
  {
    id: "role",
    patterns: [
      "what kind of role", "what role is she looking for", "what job",
      "what position", "what is she looking for", "open to", "available for",
      "seeking", "open to work", "job search", "employment",
    ],
    answer: `Jessica is currently available for opportunities and open to roles in software development. Her strongest interests are full-stack development, AI integration and cloud/DevOps work.

She has practical experience in React, Flask, PostgreSQL, Flutter, Docker and test automation (Playwright/NUnit). She is graduating with a BSc Computer Science in November 2026 and is based in Pretoria, South Africa.

To reach out directly, you can email her at ${profile.email} or connect on LinkedIn.`,
  },

  // ── Skills / Technologies ─────────────────────────────────────────────────
  {
    id: "skills",
    patterns: [
      "what technologies", "what skills", "what can she do", "tech stack",
      "programming languages", "tools", "frameworks", "technologies she knows",
      "what does she know", "technical skills", "what has she used",
    ],
    answer: `Jessica's verified technical skills span several areas:

• Languages: Java, C++, Python, C#
• Frontend: React, JavaScript, Tailwind CSS
• Backend: Flask, REST APIs, JWT, WebSockets
• Mobile: Flutter, Dart
• Databases: PostgreSQL, MS SQL
• Testing: Playwright, NUnit, Page Object Model
• DevOps & Tools: Docker, Git/GitLab, Linux

Full list: ${allTechList}.

Hover or click any skill on the Skills section to see exactly where she used it.`,
  },

  // ── Individual skill lookup ───────────────────────────────────────────────
  {
    id: "skill-lookup",
    patterns: [], // handled dynamically in matcher
    isDynamic: true,
    handler: (input) => {
      const lower = input.toLowerCase();
      const match = allSkills.find((s) => lower.includes(s.name.toLowerCase()));
      if (!match) return null;
      return `Jessica has used **${match.name}** (${match.category}): ${match.note}`;
    },
  },

  // ── AKBs project ─────────────────────────────────────────────────────────
  {
    id: "akbs",
    patterns: [
      "akbs", "academic conference", "conference management",
      "capstone", "flagship project", "main project",
      "what project", "biggest project", "tell me about her project",
    ],
    answer: `AKBs is Jessica's flagship capstone project — an Academic Conference Management System built for the full conference lifecycle: abstract submissions, reviewing, assessment, payments, certificates and real-time scoring.

**What she built:**
${akbs.mine.map((m) => `• ${m}`).join("\n")}

**Tech used:** ${akbs.tech.join(", ")}

**Scale:** ${akbs.stats.map((s) => `${s.value} ${s.label}`).join(", ")}

It was built as a team of ${akbs.team} (${akbs.team}). You can read the full case study on the Projects section of this portfolio.`,
  },

  // ── AKBs role ─────────────────────────────────────────────────────────────
  {
    id: "akbs-role",
    patterns: [
      "her role in akbs", "role in akbs", "what did jessica do in akbs",
      "what was her role", "akbs role", "contribution to akbs", "akbs contributions",
    ],
    answer: `Jessica's role in AKBs was ${akbs.role} in a ${akbs.team}.

Her specific contributions:
${akbs.mine.map((m) => `• ${m}`).join("\n")}

She worked across the full stack: React frontend, Flask REST API, PostgreSQL database, Flutter mobile app and Docker deployment.`,
  },

  // ── AKBs chatbot ─────────────────────────────────────────────────────────
  {
    id: "akbs-chatbot",
    patterns: [
      "akbs chatbot", "chatbot in akbs", "gemini", "ai in akbs",
      "chatbot she built", "ai chatbot",
    ],
    answer: `Jessica built the AI chatbot inside the AKBs Flutter mobile app. It uses:

${akbs.chatbot.flow.map((f) => `**Step ${f.step} — ${f.title}:** ${f.detail}`).join("\n\n")}

${akbs.chatbot.summary}`,
  },

  // ── Testing experience ────────────────────────────────────────────────────
  {
    id: "testing",
    patterns: [
      "testing", "test automation", "playwright", "nunit",
      "qa", "quality assurance", "automated tests", "test experience",
      "internship testing", "testing experience",
    ],
    answer: `Jessica gained test automation experience during her internship at SITC (August 2026):

• UI test automation in C# using NUnit and Playwright for .NET
• Automated dashboards and shipment modules of enterprise shipping systems
• Applied the Page Object Model pattern for readable, maintainable test suites

This is one of three focus areas alongside full-stack development and applied AI.`,
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: "education",
    patterns: [
      "education", "degree", "university", "studying", "graduated",
      "bsc", "computer science degree", "akademia", "what did she study",
      "qualifications", "academic background",
    ],
    answer: `Jessica is completing a **BSc Computer Science** at Akademia University in Pretoria, graduating in November 2026.

Her coursework covers:
• Algorithms & data structures, software engineering and design patterns
• Computer networks, cybersecurity and operating systems
• Software architecture: microservices, API gateways and message queues
• Cloud computing (AWS, Azure, Google Cloud) and DevOps

She also holds certifications from AWS Training (Kiro Getting Started, Spec-Driven Development with Kiro — March 2026) and completed an AI Agent Development Workshop in 2026.`,
  },

  // ── Internship ───────────────────────────────────────────────────────────
  {
    id: "internship",
    patterns: [
      "internship", "work experience", "sitc", "experience", "job",
      "where has she worked", "professional experience",
    ],
    answer: `Jessica completed a Technical Tester internship at **SITC** from 1–24 August 2026.

During the internship she:
• Wrote UI test automation suites in C# with NUnit and Playwright for .NET
• Automated dashboards and shipment tracking modules of enterprise shipping systems
• Applied the Page Object Model structure for maintainable test code

This is her professional work experience alongside her capstone project (AKBs) and her BSc Computer Science studies.`,
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    id: "contact",
    patterns: [
      "contact", "email", "reach her", "get in touch", "how to contact",
      "linkedin", "github", "social", "hire jessica", "hire her",
      "connect with jessica",
    ],
    answer: `You can reach Jessica through:

• **Email:** ${profile.email}
• **LinkedIn:** ${profile.linkedin}
• **GitHub:** ${profile.github}
• **Location:** ${profile.location}

She is currently available for opportunities and would love to hear from you!`,
    cta: { label: "Email Jessica", href: `mailto:${profile.email}` },
  },

  // ── Location ─────────────────────────────────────────────────────────────
  {
    id: "location",
    patterns: [
      "where is she", "location", "where does she live", "south africa",
      "pretoria", "where is jessica based",
    ],
    answer: `Jessica is based in Pretoria, South Africa, and is currently available for opportunities.`,
  },

  // ── Docker / deployment ───────────────────────────────────────────────────
  {
    id: "docker",
    patterns: [
      "docker", "deployment", "devops", "caddy", "vps", "linux deployment",
    ],
    answer: `Jessica deployed the AKBs system using Docker Compose with 4 containers behind a Caddy reverse proxy on a Hetzner VPS. She set up automated pg_dump backups before every deploy and managed the Linux (Ubuntu) server.

She also used WSL (Windows Subsystem for Linux) and an Ubuntu VPS during an AI agent workshop.`,
  },

  // ── WebSockets ────────────────────────────────────────────────────────────
  {
    id: "websockets",
    patterns: [
      "websocket", "real-time", "live updates", "gevent", "gunicorn",
    ],
    answer: `Jessica implemented real-time WebSocket updates in AKBs for live mark submissions. She solved the challenge of multi-worker WebSocket support by replacing Flask's default Werkzeug server with Gunicorn's gevent async worker, enabling thousands of concurrent connections without a separate WebSocket server.`,
  },

  // ── Flutter / mobile ──────────────────────────────────────────────────────
  {
    id: "flutter",
    patterns: [
      "flutter", "mobile app", "android app", "dart", "mobile development",
    ],
    answer: `Jessica built the AI chatbot feature inside the AKBs Flutter Android app. The app is used by assessors, with JWT authentication, dynamic scoring criteria per student and a Gemini-powered assistant with a database fallback.

Flutter and Dart are listed under her Mobile skills category.`,
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  {
    id: "github",
    patterns: ["github", "source code", "repo", "repositories", "code"],
    answer: `You can find Jessica's GitHub at: ${profile.github}

Note that some projects (like AKBs) may be in private repositories due to academic requirements.`,
    cta: { label: "View GitHub", href: profile.github },
  },

  // ── CV / resume ───────────────────────────────────────────────────────────
  {
    id: "cv",
    patterns: ["cv", "resume", "curriculum vitae", "download cv"],
    answer: `You can download Jessica's CV directly from this portfolio using the "Download CV" button in the navigation bar, or the dedicated CV section.`,
    cta: { label: "Download CV", href: "/Jessica_Andrew_CV.pdf", download: true },
  },
];

// ─── Keyword scorer ──────────────────────────────────────────────────────────
export function findBestAnswer(input) {
  const lower = input.toLowerCase().trim();

  // 1. Try dynamic handlers first (e.g. individual skill lookup)
  for (const a of answers) {
    if (a.isDynamic && a.handler) {
      const result = a.handler(lower);
      if (result) return { answer: result, cta: null };
    }
  }

  // 2. Score static patterns
  let bestScore = 0;
  let bestAnswer = null;

  for (const a of answers) {
    if (!a.patterns?.length) continue;
    let score = 0;
    for (const pattern of a.patterns) {
      if (lower === pattern) { score += 10; break; }
      if (lower.includes(pattern)) score += 3;
      // partial word match
      const words = pattern.split(" ");
      const matchedWords = words.filter((w) => lower.includes(w));
      score += matchedWords.length * 1.5;
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = a;
    }
  }

  if (bestScore >= 2 && bestAnswer) {
    return { answer: bestAnswer.answer, cta: bestAnswer.cta ?? null };
  }

  // 3. Fallback
  return {
    answer: `I'm not sure about that — I only know what's been shared in Jessica's portfolio. For anything else, please reach out directly:\n\n📧 ${profile.email}`,
    cta: { label: "Email Jessica", href: `mailto:${profile.email}` },
  };
}
