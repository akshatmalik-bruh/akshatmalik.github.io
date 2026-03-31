import { COLORS as C } from "./theme";

export const ABOUT_DATA = {
    name: "Akshat Malik",
    role: "Senior Frontend Developer",
    location: "Bit Mesra, Ranchi 🇮🇳",
    available: '"actively looking for jobs"',
    experience: "6th",
    facts: [
        { emoji: "🔗", label: "LinkedIn", value: "linkedin.com/in/akshat-malik" },
        { emoji: "🐈", label: "GitHub", value: "github.com/akshatmalik-bruh" },
        { emoji: "📸", label: "Instagram", value: "@akshaaaaattttt" },
        { emoji: "📝", label: "Portfolio", value: "akshat.dev" },
    ]
};

export const SKILLS_DATA = [
    {
        label: "languages", color: C.keyword,
        skills: [
            { name: "JavaScript", pct: 95 },
            { name: "Java", pct: 85 },
            { name: "Python", pct: 88 },
            { name: "TypeScript", pct: 92 }
        ],
    },
    {
        label: "generative_ai_llm", color: C.fn,
        skills: [
            { name: "LangChain", pct: 82 },
            { name: "GROQ", pct: 85 },
            { name: "OLLAMA", pct: 80 },
            { name: "Prompt Engineering", pct: 90 }
        ],
    },
    {
        label: "databases", color: C.special,
        skills: [
            { name: "MongoDB", pct: 88 },
            { name: "PostgreSQL", pct: 84 },
            { name: "Redis", pct: 75 }
        ],
    },
    {
        label: "frontend", color: C.type,
        skills: [
            { name: "HTML", pct: 95 },
            { name: "CSS", pct: 92 },
            { name: "Tailwind CSS", pct: 94 },
            { name: "React.js", pct: 96 }
        ],
    },
    {
        label: "devops_tools", color: C.string,
        skills: [
            { name: "Docker", pct: 78 },
            { name: "Git", pct: 92 },
            { name: "GitHub", pct: 94 }
        ],
    },
    {
        label: "backend_frameworks", color: C.keyword,
        skills: [
            { name: "Express", pct: 90 },
            { name: "FastAPI", pct: 85 }
        ],
    },
    {
        label: "templating_engine", color: C.fn,
        skills: [
            { name: "Jinja2", pct: 82 },
            { name: "EJS", pct: 88 }
        ],
    },
];

export const OTHER_SKILLS = [
    { name: "bcrypt", emoji: "🔐" },
    { name: "rate limiting", emoji: "🚦" },
    { name: "helmet", emoji: "⛑️" },
    { name: "cors", emoji: "🌐" },
    { name: "jwt", emoji: "🎫" },
    { name: "zod", emoji: "✅" },
];

export const PROJECTS_DATA = [
  {
    name: "Readme Generator",
    desc: "AI-driven README architecture tool using Octokit for GitHub telemetry and Llama 3 for intelligent documentation. Features Redis caching and Groq-powered LLM rate limiting.",
    fullDesc: "A complete automation suite that uses Octokit to fetch repository data. The metadata is processed by Llama 3 via Groq to generate high-quality, professional documentation. It implements a robust Redis caching layer and tiered rate limiting to ensure 99.9% availability during concurrent LLM calls.",
    stack: [
        { label: "languages", items: ["TypeScript", "JavaScript"] },
        { label: "ai_llm", items: ["GROQ (Llama 3)"] },
        { label: "databases", items: ["MongoDB", "Redis"] },
        { label: "frontend", items: ["React.js", "Toastify"] },
        { label: "security", items: ["Zod", "JWT", "bcrypt"] },
        { label: "backend", items: ["Node.js", "Express", "Mongoose ORM", "Express Rate Limiting"] },
        { label: "tools", items: ["Octokit"] },
    ],
    color: C.fn,
    github: "https://github.com/akshatmalik-bruh/ReadMe-file-generator",
  },
  {
    name: "Resume Analyser",
    desc: "AI-powered resume analysis and optimization tool with dynamic generation using Google's Gemini and Meta's LLAMA.",
    fullDesc: "An end-to-end platform that leverages multiple LLMs (Gemini, Llama) via GROQ to provide in-depth feedback on resumes. It generates tailored resumes based on job descriptions and scoring patterns, featuring secure authentication and robust backend handling.",
    stack: [
        { label: "ai", items: ["Gemini", "Llama (Groq)"] },
        { label: "backend", items: ["Express", "Mongoose"] },
        { label: "db", items: ["MongoDB"] },
        { label: "security", items: ["JWT", "bcrypt"] }
    ],
    color: C.keyword,
    github: "https://github.com/akshatmalik-bruh/resumeAnalyser",
  },
  {
    name: "CP Extension",
    desc: "Browser extension for LeetCode and Codeforces that automates problem analysis and provides AI-powered time/space complexity optimizations.",
    fullDesc: "A powerful browser companion that scrapes problem statements directly from CP platforms. It analyzes the user's code for efficiency, provides a detailed breakdown of complexity, and suggests highly optimized alternatives using Llama 3. Features a secure Node.js backend with Redis for caching analysis results.",
    stack: [
        { label: "extension", items: ["manifest.json", "HTML", "JavaScript"] },
        { label: "ai_llm", items: ["GROQ (LLAMA 3)"] },
        { label: "backend", items: ["Node.js", "Express", "Rate Limiting"] },
        { label: "databases", items: ["Redis"] },
    ],
    color: C.type,
    github: "https://github.com/akshatmalik-bruh/CPextension",
  },
  {
    name: "Money Transfer App",
    desc: "A conceptual fintech platform illustrating atomic transactions and database consistency using MongoDB sessions.",
    fullDesc: "This project serves as a practical demonstration of ACID properties in distributed systems. It simulates high-concurrency money transfers with a strict 'all-or-nothing' philosophy: if any step of the multi-document transaction fails, the entire process is rolled back, ensuring zero financial data corruption. Built with a secure Node/Express backend and a responsive React frontend.",
    stack: [
        { label: "frontend", items: ["React.js"] },
        { label: "languages", items: ["JavaScript"] },
        { label: "backend", items: ["Express", "Mongoose"] },
        { label: "databases", items: ["MongoDB"] },
        { label: "security", items: ["JWT", "bcrypt"] },
    ],
    color: C.string,
    github: "https://github.com/akshatmalik-bruh/virtual_money_transfer",
  },
  {
    name: "Snap Stream",
    desc: "YouTube video summarizer that returns a concise 30-second reading block from any video URL. optimized for tech reviews and listicles.",
    fullDesc: "A high-performance video intelligence tool that automates content synthesis. It utilizes yt-dlp for precise metadata extraction and Ollama (local LLM) to generate intelligent 30-second summaries. Built with a FastAPI backend, PostgreSQL for data persistence, and Jinja2 for a seamless frontend experience.",
    stack: [
        { label: "backend", items: ["Python", "FastAPI", "yt-dlp"] },
        { label: "ai_llm", items: ["Ollama (Local LLM)"] },
        { label: "database", items: ["PostgreSQL"] },
        { label: "frontend", items: ["Jinja2"] },
    ],
    color: C.special,
    github: "https://github.com/akshatmalik-bruh/snap-stream",
  },
];

export const EXPERIENCE_DATA = [
  {
    role: "Senior Frontend Developer",
    company: "Razorpay",
    period: "2023 – Present",
    color: C.keyword,
    highlights: [
      "Led migration to micro-frontend architecture across 4 product teams",
      "Reduced main bundle size by 42% using dynamic imports + tree shaking",
      "Mentored 5 junior developers, established frontend guild",
      "Built real-time payment status dashboard used by 500k merchants",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Postman",
    period: "2021 – 2023",
    color: C.fn,
    highlights: [
      "Rebuilt collection sharing UI now used by 3M+ developers",
      "Integrated Monaco editor with custom LSP for API definitions",
      "Shipped dark mode across all product surfaces in 6 weeks",
    ],
  },
  {
    role: "SDE Intern",
    company: "Juspay",
    period: "2020 – 2021",
    color: C.special,
    highlights: [
      "Shipped payment UI SDK in PureScript, adopted by 12 banks",
      "Reduced checkout load time by 800ms through lazy loading",
    ],
  },
];

export const CONTACT_LINKS = [
  {
    label: "email",
    value: "akshat.malik.dev@gmail.com",
    href: "mailto:akshat.malik.dev@gmail.com",
    color: C.string,
  },
  {
    label: "github",
    value: "github.com/akshatmalik-bruh",
    href: "https://github.com/akshatmalik-bruh",
    color: C.fn,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/akshat-malik",
    href: "https://www.linkedin.com/in/akshat-malik-2079973a0/",
    color: C.special,
  },
  {
    label: "instagram",
    value: "@akshaaaaattttt",
    href: "https://www.instagram.com/akshaaaaattttt/",
    color: C.keyword,
  },
];
