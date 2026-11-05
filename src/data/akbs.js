export const akbs = {
  title: "AKBs",
  subtitle: "Academic Conference Management System",
  status: "Completed capstone project",
  overview:
    "A web and mobile platform for managing the full academic conference cycle: abstract submissions, reviewing, assessment, payments, certificates and real-time scoring.",
  role: "Full-stack developer",
  team: "UnityStack, a team of 4",
  liveUrl: "", // plak hier die skakel sodra AKBs weer live is

  mine: [
     "Reviewer workflow module: multi-role pipeline (Student, Reviewer, Admin) with token-based email links, institution conflict checks and scoring criteria",
  "Built the AI chatbot in the Flutter mobile app (Gemini API with a database pattern-matching fallback)",
  "Full-stack development across the React frontend, Flask API and PostgreSQL database",
  "Real-time WebSocket updates with Gunicorn gevent workers",
  "Gmail OAuth2 API integration for OTP email delivery",
  "Dockerised deployment behind a Caddy reverse proxy",
  ],
  team_work: [
    "Flutter Android mobile app",
    "Sponsor management",
    "Login and registration",
    "Certificates",
    "Budget management",
    "Payments",
  ],

  tech: [
    "React 19", "Python", "Flask", "PostgreSQL", "Flutter",
    "Docker", "WebSockets", "JWT", "Caddy", "Git",
  ],

  stats: [
  { value: "100+", label: "API endpoints" },   
  { value: "30+", label: "database tables" },  
  { value: "3", label: "client platforms" },
  { value: "4", label: "Docker containers" },
],

  architecture: [
    { label: "Clients", detail: "React 19 web app (admin + public) · Flutter Android mobile app" },
    { label: "API layer", detail: "Flask REST API · WebSockets (flask-sock/gevent) · JWT auth · OTP via Gmail API" },
    { label: "Data layer", detail: "PostgreSQL 16 · psycopg2 (raw SQL, no ORM) · Docker named volumes" },
   { label: "Infrastructure", detail: "Docker Compose (4 containers) · Caddy (auto HTTPS) · nginx · Hetzner VPS · automated pg_dump backups before every deploy" },
  ],

  screenshots: [
  { src: "/akbs/dashboard.webp", wide: true, caption: "Admin dashboard: submission pipeline, categories and budget overview" },
  { src: "/akbs/evaluation.webp", wide: true, caption: "Evaluation: weighted scoring per criterion, with accept or reject" },
  { src: "/akbs/reviewers.webp", caption: "Reviewer management, with institution conflict warnings" },
  { src: "/akbs/moments.webp", caption: "Conference moments: photo feed with likes and comments" },
  { src: "/akbs/mobile.webp", caption: "Flutter mobile app: home screen with live programme" },
],

  chatbot: {
  summary:
    "The assistant is powered by Google Gemini with a local fallback layer. It answers questions about the programme, submissions, payments and reviewer assignments, pulling live data from PostgreSQL for each user's context.",
  flow: [
    { step: "1", title: "Pattern matching", detail: "Common questions (programme details, student lists, payment status) are recognised and answered directly from PostgreSQL." },
    { step: "2", title: "Gemini with context", detail: "Other questions are sent to the Gemini API together with the user's role, profile and relevant database data." },
    { step: "3", title: "Resilient fallback", detail: "A retry strategy across four Gemini model versions with exponential backoff, ending in a rule-based answer so the chatbot never returns an empty response." },
  ],
},

  features: [
    "Five user roles: Admin, Reviewer, Assessor, Submitter and Attendee",
    "Full abstract submission and review workflow with file uploads (PDF, DOCX, PPTX)",
    "TF-IDF machine learning algorithm for automatic assessor-to-student matching based on research area",
    "Two-factor authentication: password + OTP email verification via the Gmail OAuth2 API",
    "Payment integration: PayFast card/EFT gateway + manual EFT with admin confirmation",
    "Real-time updates via WebSocket broadcast for live mark submissions",
    "Certificate generation and automated email delivery with PDF attachments",
    "Google Calendar OAuth2 integration for session scheduling",
    "Conference moments photo feed (Instagram-style) with likes and comments",
    "Flutter Android app for assessors: JWT auth, dynamic scoring criteria per student",
    "Argon2id password hashing and Google Sign-In",
    "Dynamic grading criteria per field of study, with live winner announcement",
  ],

  challenges: [
    {
      problem: "Multi-worker WebSocket support: Flask's default Werkzeug server does not support concurrent WebSocket connections, causing connections to drop under load.",
      solution: "Replaced the default worker with Gunicorn's gevent async worker class. This lets a single worker process handle thousands of concurrent WebSocket connections via cooperative multitasking, without the complexity of a separate WebSocket server.",
    },
    {
      problem: "OTP email delivery in Docker: the app used SMTP (Gmail App Password), which worked locally but failed silently in the container because the credentials were not available as environment variables.",
      solution: "Migrated from SMTP to the Gmail REST API using OAuth2 refresh tokens. Credentials are injected through environment variables, which makes the solution Docker-compatible and more secure.",
    },
    {
      problem: "TF-IDF assessor matching returned 0% for all students because abstracts had no text content: only file names were stored, not the abstract text.",
      solution: "Extended the matching query to fall back to the uploaded file name (which contains the research title) when no abstract text exists. This gave the algorithm enough signal to compute meaningful similarity scores without full text extraction.",
    },
    {
      problem: "Windows CRLF line endings broke the Python backend in the Linux Docker container: Python 3.12 rejected string literals containing carriage returns, causing a SyntaxError on startup.",
      solution: "Added a .gitattributes file enforcing LF line endings for Python and shell files, and a pre-deploy check that scans for BOM and CRLF before every backend deploy.",
    },
    {
  problem: "The Gemini API returned inconsistent availability across model versions, causing the chatbot to fail silently when a specific model was rate-limited or returned a 503 error.",
  solution: "Implemented a waterfall retry strategy across four Gemini model versions with exponential backoff (1s, 2s, 4s). If all models are exhausted, the system falls back to a rule-based pattern matcher that queries the database directly, ensuring the chatbot never returns an empty response.",
},
  ],

  // Los leeg tot jy werklike resultate het
  results: [],
};