export const projects = [
  {
  slug: "akbs",
  title: "AKBs: Academic Conference Management System",
  tagline: "Web and mobile platform for managing submissions, reviewing, assessment, payments and certificates.",
  featured: true,
  caseStudy: true,
  liveUrl: "", // sodra AKBs weer live is
  repoUrl: "",
  image: "/akbs/dashboard.webp", // bv. "/akbs/dashboard.png" sodra jy 'n skermskoot het
  preview: [
    "React 19 web app · Flutter Android app",
    "Flask REST API · WebSockets · JWT",
    "PostgreSQL 16 · TF-IDF matching · Gemini chatbot",
    "Docker Compose · Caddy · VPS",
  ],
  contributions: [
    "Reviewer workflow module: multi-role pipeline with token-based email links and conflict checks",
    "AI chatbot in the mobile app (Gemini API with a database pattern-matching fallback)",
    "Full-stack work across React, Flask and PostgreSQL, deployed with Docker",
  ],
  tech: ["React", "Flask", "PostgreSQL", "Flutter", "Docker", "WebSockets"],
},
];