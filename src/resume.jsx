import { useState, useEffect, useRef } from "react";

// ─── Token colors (Prettier / One Dark Pro palette) ───────────────────────
const C = {
    keyword: "#c678dd",   // purple  — const, function, import
    string: "#98c379",   // green   — "values"
    number: "#d19a66",   // orange  — numbers
    comment: "#5c6370",   // gray    — // comments
    tag: "#e06c75",   // red     — HTML tags / keys
    attr: "#d19a66",   // orange  — attributes
    fn: "#61afef",   // blue    — function names
    type: "#e5c07b",   // yellow  — types / classes
    plain: "#abb2bf",   // light   — default text
    punct: "#abb2bf",   // same    — punctuation
    special: "#56b6c2",   // cyan    — special tokens
    heading: "#e06c75",   // markdown headings
    bg: "#282c34",
    bgPanel: "#21252b",
    bgSidebar: "#181a1f",
    bgTab: "#21252b",
    bgTabActive: "#282c34",
    bgHover: "#2c313c",
    border: "#181a1f",
    lineNum: "#495162",
    statusBg: "#4078f2",
};

// ─── File icons ─────────────────────────────────────────────────────────────
const FileIcon = ({ ext }) => {
    const icons = {
        html: { color: "#e34c26", letter: "H" },
        tsx: { color: "#3178c6", letter: "T" },
        jsx: { color: "#61dafb", letter: "R" },
        js: { color: "#f7df1e", letter: "J", dark: true },
        rb: { color: "#cc342d", letter: "R" },
        json: { color: "#6bd0f4", letter: "{" },
        md: { color: "#8b949e", letter: "M" },
        css: { color: "#264de4", letter: "C" },
    };
    const cfg = icons[ext] || { color: "#8b949e", letter: "?" };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 16, height: 16, borderRadius: 3,
            background: cfg.color, color: cfg.dark ? "#000" : "#fff",
            fontSize: 9, fontWeight: 700, fontFamily: "monospace",
            flexShrink: 0, letterSpacing: 0,
        }}>{cfg.letter}</span>
    );
};

// ─── Inline token renderer ───────────────────────────────────────────────────
const Tok = ({ color, children, italic, bold }) => (
    <span style={{
        color, fontStyle: italic ? "italic" : undefined,
        fontWeight: bold ? 600 : undefined,
    }}>{children}</span>
);

// ─── ABOUT content ────────────────────────────────────────────────────────────
const AboutContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Hero */}
        <section>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "linear-gradient(135deg, #c678dd, #61afef)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, flexShrink: 0,
                }}>👋</div>
                <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                        <Tok color={C.keyword}>const</Tok>
                        {" "}
                        <Tok color={C.fn} bold>me</Tok>
                        {" "}
                        <Tok color={C.plain}>=</Tok>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.type, marginTop: 4 }}>
                        Arjun Sharma
                    </div>
                </div>
            </div>

            <BlockCard accent={C.keyword}>
                <Row label="role" color={C.string} value='"Senior Frontend Developer"' />
                <Row label="location" color={C.string} value='"Jaipur, Rajasthan 🇮🇳"' />
                <Row label="available" color={C.special} value="true" />
                <Row label="experience" color={C.number} value="3" suffix=" years" />
            </BlockCard>
        </section>

        {/* Bio */}
        <section>
            <SectionLabel color={C.comment} icon="//">{" "}about me</SectionLabel>
            <Paragraph>
                I build things for the web with a focus on{" "}
                <Tok color={C.keyword}>clean code</Tok>,{" "}
                <Tok color={C.fn}>thoughtful UX</Tok>, and{" "}
                <Tok color={C.string}>pixel-perfect interfaces</Tok>.
                Based in Jaipur, I've been crafting digital experiences since 2020.
            </Paragraph>
            <Paragraph>
                When I'm not pushing pixels, I'm contributing to open source,
                writing dev blog posts, or brewing{" "}
                <Tok color={C.special}>pour-over coffee ☕</Tok>.
            </Paragraph>
        </section>

        {/* Quick facts */}
        <section>
            <SectionLabel color={C.comment} icon="//">{" "}quick facts</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {[
                    { emoji: "🎓", label: "Education", value: "B.Tech CS — MNIT" },
                    { emoji: "🚀", label: "Projects", value: "12+ shipped" },
                    { emoji: "⭐", label: "GitHub", value: "1.8k stars" },
                    { emoji: "📝", label: "Articles", value: "24 published" },
                ].map(f => (
                    <div key={f.label} style={{
                        background: C.bgPanel, border: `1px solid ${C.border}`,
                        borderRadius: 8, padding: "12px 14px",
                    }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{f.emoji}</div>
                        <div style={{ fontSize: 11, color: C.comment, marginBottom: 2 }}>{f.label}</div>
                        <div style={{ color: C.string, fontWeight: 600 }}>{f.value}</div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// ─── SKILLS content ───────────────────────────────────────────────────────────
const SkillsContent = () => {
    const groups = [
        {
            label: "frontend", color: C.keyword,
            skills: [
                { name: "React / Next.js", pct: 95 },
                { name: "TypeScript", pct: 90 },
                { name: "Three.js / R3F", pct: 78 },
                { name: "CSS / Tailwind", pct: 92 },
            ],
        },
        {
            label: "backend", color: C.fn,
            skills: [
                { name: "Node.js / Express", pct: 88 },
                { name: "PostgreSQL", pct: 82 },
                { name: "GraphQL", pct: 75 },
                { name: "Redis", pct: 68 },
            ],
        },
        {
            label: "tools", color: C.special,
            skills: [
                { name: "Git / GitHub", pct: 93 },
                { name: "Docker", pct: 75 },
                { name: "Figma", pct: 80 },
                { name: "Vite / Webpack", pct: 85 },
            ],
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <SectionLabel color={C.comment} icon="//">{" "}tech stack</SectionLabel>
            {groups.map(g => (
                <div key={g.label}>
                    <div style={{ marginBottom: 12 }}>
                        <Tok color={C.keyword}>const </Tok>
                        <Tok color={C.fn}>{g.label}</Tok>
                        <Tok color={C.plain}> = {"["}</Tok>
                    </div>
                    <div style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                        {g.skills.map(s => (
                            <div key={s.name}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ color: C.string }}>"{s.name}"</span>
                                    <span style={{ color: C.number, fontSize: 12 }}>{s.pct}%</span>
                                </div>
                                <div style={{ height: 5, borderRadius: 3, background: C.bgPanel, overflow: "hidden" }}>
                                    <div style={{
                                        height: "100%", borderRadius: 3,
                                        width: `${s.pct}%`,
                                        background: `linear-gradient(90deg, ${g.color}, ${C.fn})`,
                                        transition: "width 1s ease",
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Tok color={C.plain}>{"]"}</Tok>
                </div>
            ))}
        </div>
    );
};

// ─── PROJECTS content ─────────────────────────────────────────────────────────
const ProjectsContent = () => {
    const projects = [
        {
            name: "DevPulse",
            desc: "Real-time GitHub activity dashboard. Visualises commits, PRs and code review patterns across your entire team.",
            stack: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
            stars: 284, color: C.keyword,
            status: "live",
        },
        {
            name: "Forma UI",
            desc: "Zero-dependency accessible component library with 60+ components, full TypeScript support and Storybook docs.",
            stack: ["React", "TypeScript", "Storybook", "Rollup"],
            stars: "1.2k", color: C.fn,
            status: "live",
        },
        {
            name: "Kira",
            desc: "AI writing assistant designed for developers — context-aware suggestions, grammar checks and tone adjustments.",
            stack: ["SvelteKit", "OpenAI", "Supabase", "Tailwind"],
            stars: 432, color: C.special,
            status: "beta",
        },
        {
            name: "Logbook",
            desc: "Minimal daily journaling app with markdown support, end-to-end encryption and beautiful reading mode.",
            stack: ["React Native", "Expo", "SQLite"],
            stars: 97, color: C.type,
            status: "wip",
        },
    ];

    const statusColor = { live: C.string, beta: C.number, wip: C.comment };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <SectionLabel color={C.comment} icon="//">{" "}featured projects</SectionLabel>
            {projects.map((p, i) => (
                <div key={p.name} style={{
                    background: C.bgPanel, borderRadius: 10,
                    border: `1px solid ${C.border}`,
                    borderLeft: `3px solid ${p.color}`,
                    padding: "18px 20px",
                    transition: "transform .15s",
                }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""}
                >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.name}</span>
                            <span style={{
                                fontSize: 10, padding: "1px 7px", borderRadius: 20,
                                background: statusColor[p.status] + "22",
                                color: statusColor[p.status], fontWeight: 600,
                            }}>{p.status}</span>
                        </div>
                        <span style={{ color: C.number, fontSize: 12 }}>⭐ {p.stars}</span>
                    </div>
                    <p style={{ color: C.plain, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.stack.map(t => (
                            <span key={t} style={{
                                fontSize: 11, padding: "2px 8px", borderRadius: 4,
                                background: C.bgSidebar, color: C.special,
                                border: `1px solid ${C.border}`,
                            }}>{t}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── EXPERIENCE content ───────────────────────────────────────────────────────
const ExperienceContent = () => {
    const jobs = [
        {
            role: "Senior Frontend Developer",
            company: "Razorpay", period: "2023 – Present",
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
            company: "Postman", period: "2021 – 2023",
            color: C.fn,
            highlights: [
                "Rebuilt collection sharing UI now used by 3M+ developers",
                "Integrated Monaco editor with custom LSP for API definitions",
                "Shipped dark mode across all product surfaces in 6 weeks",
            ],
        },
        {
            role: "SDE Intern",
            company: "Juspay", period: "2020 – 2021",
            color: C.special,
            highlights: [
                "Shipped payment UI SDK in PureScript, adopted by 12 banks",
                "Reduced checkout load time by 800ms through lazy loading",
            ],
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <SectionLabel color={C.comment} icon="//">{" "}work history</SectionLabel>
            <div style={{ position: "relative", paddingLeft: 20 }}>
                {/* timeline line */}
                <div style={{
                    position: "absolute", left: 6, top: 8, bottom: 8,
                    width: 1, background: C.border,
                }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {jobs.map(j => (
                        <div key={j.company} style={{ position: "relative" }}>
                            {/* dot */}
                            <div style={{
                                position: "absolute", left: -20, top: 6,
                                width: 12, height: 12, borderRadius: "50%",
                                background: j.color, border: `2px solid ${C.bg}`,
                            }} />
                            <div style={{
                                background: C.bgPanel, borderRadius: 10,
                                border: `1px solid ${C.border}`,
                                padding: "16px 18px",
                            }}>
                                <div style={{ marginBottom: 4 }}>
                                    <Tok color={j.color} bold>{j.role}</Tok>
                                </div>
                                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                                    <span style={{ color: C.type, fontSize: 13 }}>@ {j.company}</span>
                                    <span style={{ color: C.comment, fontSize: 12 }}>{j.period}</span>
                                </div>
                                <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                                    {j.highlights.map((h, i) => (
                                        <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                            <Tok color={j.color}>→</Tok>
                                            <span style={{ color: C.plain, fontSize: 13, lineHeight: 1.5 }}>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── CONTACT content ──────────────────────────────────────────────────────────
const ContactContent = () => {
    const links = [
        { label: "email", value: "arjun@sharma.dev", href: "mailto:arjun@sharma.dev", color: C.string },
        { label: "github", value: "github.com/arjunsharma", href: "#", color: C.fn },
        { label: "linkedin", value: "linkedin.com/in/arjunsharma", href: "#", color: C.special },
        { label: "twitter", value: "@arjun_builds", href: "#", color: C.keyword },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <SectionLabel color={C.comment} icon="//">{" "}get in touch</SectionLabel>

            <BlockCard accent={C.string}>
                <Row label="available" color={C.string} value="true" />
                <Row label="response_time" color={C.string} value='"< 24 hours"' />
                <Row label="timezone" color={C.string} value='"IST (UTC+5:30)"' />
                <Row label="open_to" color={C.keyword} value='["freelance", "full-time", "oss"]' />
            </BlockCard>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(l => (
                    <a key={l.label} href={l.href} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        background: C.bgPanel, border: `1px solid ${C.border}`,
                        borderRadius: 8, padding: "12px 16px",
                        textDecoration: "none",
                        transition: "border-color .15s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = l.color}
                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                    >
                        <span style={{ color: C.comment, fontSize: 12, minWidth: 72 }}>{l.label}</span>
                        <Tok color={l.color}>{l.value}</Tok>
                    </a>
                ))}
            </div>

            <div style={{
                background: `linear-gradient(135deg, ${C.keyword}18, ${C.fn}18)`,
                border: `1px solid ${C.keyword}44`,
                borderRadius: 10, padding: "20px 22px", textAlign: "center",
            }}>
                <div style={{ color: C.type, fontWeight: 700, marginBottom: 6 }}>Open to opportunities</div>
                <div style={{ color: C.plain, fontSize: 13, lineHeight: 1.6 }}>
                    Always happy to chat about interesting projects,{" "}
                    <Tok color={C.keyword}>new roles</Tok>, or just{" "}
                    <Tok color={C.string}>good coffee ☕</Tok>
                </div>
            </div>
        </div>
    );
};

// ─── README content ───────────────────────────────────────────────────────────
const ReadmeContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ color: C.heading, fontSize: 22, fontWeight: 700 }}># portfolio.dev 🚀</div>
        <Paragraph>
            Welcome to my portfolio source. Built with love, caffeine, and questionable commit messages.
        </Paragraph>
        <div style={{ color: C.type, fontSize: 16, fontWeight: 600 }}>## Stack</div>
        <BlockCard accent={C.comment}>
            <Row label="framework" color={C.string} value='"Next.js 14 + TypeScript"' />
            <Row label="styling" color={C.string} value='"Tailwind CSS"' />
            <Row label="3d" color={C.string} value='"Three.js + React Three Fiber"' />
            <Row label="deploy" color={C.string} value='"Vercel"' />
        </BlockCard>
        <div style={{ color: C.type, fontSize: 16, fontWeight: 600 }}>## Quick start</div>
        <div style={{
            background: C.bgSidebar, borderRadius: 8,
            border: `1px solid ${C.border}`, padding: "14px 16px",
            fontFamily: "monospace", fontSize: 13,
        }}>
            {["git clone https://github.com/arjunsharma/portfolio",
                "cd portfolio",
                "npm install",
                "npm run dev"].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 3 ? 6 : 0 }}>
                        <Tok color={C.special}>$</Tok>
                        <Tok color={C.plain}>{line}</Tok>
                    </div>
                ))}
        </div>
        <div style={{ color: C.comment, fontSize: 12 }}>MIT © 2025 Arjun Sharma</div>
    </div>
);

// ─── Shared sub-components ───────────────────────────────────────────────────
const SectionLabel = ({ color, icon, children }) => (
    <div style={{ color, fontSize: 12, marginBottom: 14, fontStyle: "italic" }}>
        {icon}{children}
    </div>
);

const Paragraph = ({ children }) => (
    <p style={{ color: C.plain, fontSize: 14, lineHeight: 1.75, marginBottom: 10 }}>{children}</p>
);

const BlockCard = ({ accent, children }) => (
    <div style={{
        background: C.bgPanel, borderRadius: 8,
        border: `1px solid ${C.border}`,
        borderLeft: `2px solid ${accent}`,
        padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 8,
    }}>
        {children}
    </div>
);

const Row = ({ label, color, value, suffix }) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={{ color: C.tag, fontSize: 13, minWidth: 120 }}>{label}:</span>
        <span style={{ color, fontSize: 13 }}>{value}</span>
        {suffix && <span style={{ color: C.comment, fontSize: 12 }}>{suffix}</span>}
    </div>
);

// ─── FILE CONFIG ──────────────────────────────────────────────────────────────
const FILES = {
    about: { name: "about.jsx", ext: "jsx", lang: "JSX", Content: AboutContent },
    skills: { name: "skills.tsx", ext: "tsx", lang: "TypeScript", Content: SkillsContent },
    projects: { name: "projects.js", ext: "js", lang: "JavaScript", Content: ProjectsContent },
    experience: { name: "experience.jsx", ext: "jsx", lang: "JSX", Content: ExperienceContent },
    contact: { name: "contact.json", ext: "json", lang: "JSON", Content: ContactContent },
    readme: { name: "README.md", ext: "md", lang: "Markdown", Content: ReadmeContent, folder: "public" },
};

const ROOT_FILES = ["about", "skills", "projects", "experience", "contact"];
const PUBLIC_FILES = ["readme"];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function VSCodePortfolio() {
    const [openTabs, setOpenTabs] = useState(["about"]);
    const [activeTab, setActiveTab] = useState("about");
    const [publicOpen, setPublicOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const openFile = (id) => {
        if (!openTabs.includes(id)) setOpenTabs(t => [...t, id]);
        setActiveTab(id);
        if (isMobile) setSidebarOpen(false);
    };

    const closeTab = (e, id) => {
        e.stopPropagation();
        const idx = openTabs.indexOf(id);
        const next = openTabs.filter(t => t !== id);
        setOpenTabs(next);
        if (activeTab === id) {
            setActiveTab(next.length ? next[Math.max(0, idx - 1)] : null);
        }
    };

    const ActiveContent = activeTab ? FILES[activeTab]?.Content : null;

    // styles
    const s = {
        root: {
            display: "flex", flexDirection: "column",
            height: "100vh", overflow: "hidden",
            background: C.bg, color: C.plain,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontSize: 13,
        },
        titlebar: {
            height: 32, background: C.bgSidebar,
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center",
            padding: "0 12px", gap: 8, flexShrink: 0,
        },
        workspace: {
            display: "flex", flex: 1, minHeight: 0,
            position: "relative",
        },
        // activity bar — hidden on mobile
        actBar: {
            width: 48, background: C.bgSidebar,
            borderRight: `1px solid ${C.border}`,
            display: isMobile ? "none" : "flex",
            flexDirection: "column", alignItems: "center",
            padding: "8px 0", gap: 2, flexShrink: 0,
        },
        sidebar: {
            width: isMobile ? "100%" : 220,
            maxWidth: isMobile ? "100%" : 220,
            background: C.bgPanel,
            borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            flexShrink: 0, overflow: "hidden",
            // mobile: absolute overlay
            ...(isMobile ? {
                position: "absolute", top: 0, left: 0, bottom: 0,
                zIndex: 50, transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform .25s ease",
                width: "75vw",
            } : {}),
        },
        editorArea: {
            flex: 1, display: "flex", flexDirection: "column",
            minWidth: 0, background: C.bgTabActive,
        },
        tabsBar: {
            height: 36, background: C.bgTab,
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "stretch",
            overflowX: "auto", overflowY: "hidden",
            flexShrink: 0,
            scrollbarWidth: "none",
        },
        codeArea: {
            flex: 1, overflowY: "auto", padding: "24px 28px",
            scrollbarWidth: "thin", scrollbarColor: `${C.lineNum} transparent`,
        },
    };

    return (
        <div style={s.root}>
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3e4452; border-radius: 3px; }
        a { text-decoration: none; }
      `}</style>

            {/* TITLE BAR */}
            <div style={s.titlebar}>
                {/* hamburger on mobile */}
                {isMobile && (
                    <button onClick={() => setSidebarOpen(o => !o)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: C.plain, padding: 4, display: "flex", flexDirection: "column",
                        gap: 4, marginRight: 4,
                    }}>
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: "block", width: 18, height: 2,
                                background: C.plain, borderRadius: 1,
                                transition: "all .2s",
                                ...(sidebarOpen && i === 0 ? { transform: "translateY(6px) rotate(45deg)" } : {}),
                                ...(sidebarOpen && i === 1 ? { opacity: 0 } : {}),
                                ...(sidebarOpen && i === 2 ? { transform: "translateY(-6px) rotate(-45deg)" } : {}),
                            }} />
                        ))}
                    </button>
                )}
                {/* traffic lights */}
                {!isMobile && (
                    <div style={{ display: "flex", gap: 6 }}>
                        {["#ff5f57", "#ffbd2e", "#27c93f"].map(c => (
                            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                        ))}
                    </div>
                )}
                <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: C.comment }}>
                    portfolio.dev — Visual Studio Code
                </div>
            </div>

            {/* WORKSPACE */}
            <div style={s.workspace}>

                {/* backdrop for mobile sidebar */}
                {isMobile && sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} style={{
                        position: "absolute", inset: 0, zIndex: 40,
                        background: "rgba(0,0,0,.5)",
                    }} />
                )}

                {/* ACTIVITY BAR */}
                <div style={s.actBar}>
                    {[
                        { title: "Explorer", path: "M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.5l1.5-1.5V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38H2.5V7.5H7v9.07L8.5 18H14.5v4.5zm6-6H8.5V1.5h7.5v4.5l1.5 1.5H20.5v9z" },
                        { title: "Search", path: "M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1 8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z" },
                        { title: "Git", path: "M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687z" },
                    ].map((btn, i) => (
                        <div key={btn.title} title={btn.title} style={{
                            width: 36, height: 36, borderRadius: 6,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: i === 0 ? C.plain : C.lineNum,
                            position: "relative",
                        }}>
                            {i === 0 && <div style={{
                                position: "absolute", left: -6, width: 2, height: 20,
                                background: C.fn, borderRadius: "0 2px 2px 0",
                            }} />}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d={btn.path} />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* SIDEBAR */}
                <div style={s.sidebar}>
                    <div style={{
                        padding: "10px 12px 8px", fontSize: 10, fontWeight: 600,
                        letterSpacing: ".12em", color: C.comment, textTransform: "uppercase",
                        borderBottom: `1px solid ${C.border}`, flexShrink: 0,
                    }}>Explorer</div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
                        {/* Root folder */}
                        <FolderRow label="portfolio" open defaultOpen />
                        <div>
                            {ROOT_FILES.map(id => (
                                <FileRow key={id} id={id} active={id === activeTab && openTabs.includes(id)} onClick={() => openFile(id)} />
                            ))}
                        </div>

                        {/* Public folder */}
                        <FolderRow label="public" open={publicOpen} onClick={() => setPublicOpen(o => !o)} />
                        {publicOpen && (
                            <div>
                                {PUBLIC_FILES.map(id => (
                                    <FileRow key={id} id={id} active={id === activeTab && openTabs.includes(id)} onClick={() => openFile(id)} indent={28} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* EDITOR */}
                <div style={s.editorArea}>
                    {/* TABS — hidden on mobile, mobile shows stacked sections */}
                    {!isMobile && (
                        <div style={s.tabsBar}>
                            {openTabs.map(id => {
                                const f = FILES[id];
                                const isActive = id === activeTab;
                                return (
                                    <div key={id} onClick={() => setActiveTab(id)} style={{
                                        display: "flex", alignItems: "center", gap: 6,
                                        padding: "0 12px", minWidth: 120, maxWidth: 180,
                                        cursor: "pointer", flexShrink: 0,
                                        borderRight: `1px solid ${C.border}`,
                                        borderTop: `1px solid ${isActive ? C.fn : "transparent"}`,
                                        background: isActive ? C.bgTabActive : C.bgTab,
                                        color: isActive ? C.plain : C.comment,
                                        fontSize: 12, whiteSpace: "nowrap",
                                        transition: "background .1s",
                                    }}>
                                        <FileIcon ext={f.ext} />
                                        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</span>
                                        <span onClick={e => closeTab(e, id)} style={{
                                            width: 16, height: 16, borderRadius: 3,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            opacity: isActive ? .7 : 0, transition: "opacity .15s",
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.background = C.bgHover; }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = isActive ? .7 : 0; e.currentTarget.style.background = "transparent"; }}
                                        >
                                            <svg width="10" height="10" viewBox="0 0 16 16" fill={C.plain}>
                                                <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.647.707.707z" />
                                            </svg>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* BREADCRUMB */}
                    {!isMobile && activeTab && (
                        <div style={{
                            height: 24, background: C.bgTabActive,
                            borderBottom: `1px solid ${C.border}`,
                            display: "flex", alignItems: "center",
                            padding: "0 16px", gap: 4,
                            fontSize: 11, color: C.comment, flexShrink: 0,
                        }}>
                            <span>portfolio</span>
                            {FILES[activeTab]?.folder && <><span> › </span><span>{FILES[activeTab].folder}</span></>}
                            <span> › </span>
                            <span style={{ color: C.plain }}>{FILES[activeTab]?.name}</span>
                        </div>
                    )}

                    {/* CONTENT */}
                    <div style={s.codeArea}>
                        {isMobile ? (
                            /* Mobile: all sections stacked */
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                {ROOT_FILES.concat(PUBLIC_FILES).map((id, i) => {
                                    const f = FILES[id];
                                    return (
                                        <div key={id} style={{ marginBottom: 48 }}>
                                            {/* section header */}
                                            <div style={{
                                                display: "flex", alignItems: "center", gap: 8,
                                                marginBottom: 20, paddingBottom: 10,
                                                borderBottom: `1px solid ${C.border}`,
                                            }}>
                                                <FileIcon ext={f.ext} />
                                                <span style={{ color: C.plain, fontWeight: 600 }}>{f.name}</span>
                                                <span style={{ color: C.comment, fontSize: 11, marginLeft: "auto" }}>{f.lang}</span>
                                            </div>
                                            <f.Content />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* Desktop: active tab content */
                            activeTab && ActiveContent ? (
                                <div style={{ maxWidth: 720 }}>
                                    <ActiveContent />
                                </div>
                            ) : (
                                <div style={{
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    height: "100%", color: C.lineNum, gap: 8,
                                }}>
                                    <div style={{ fontSize: 40, opacity: .15 }}>⌨</div>
                                    <div style={{ fontSize: 13 }}>select a file to open</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* STATUS BAR */}
            <div style={{
                height: 24, background: C.statusBg,
                display: "flex", alignItems: "center",
                padding: "0 12px", gap: 16, fontSize: 11,
                color: "#fff", flexShrink: 0, userSelect: "none",
            }}>
                <span>⎇ main</span>
                <span>✓ 0 errors</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
                    <span>{activeTab ? FILES[activeTab]?.lang : "—"}</span>
                    <span>UTF-8</span>
                    <span>Ln 1, Col 1</span>
                </div>
            </div>
        </div>
    );
}

// ─── Sidebar sub-components ───────────────────────────────────────────────────
function FolderRow({ label, open, onClick, defaultOpen }) {
    const [isOpen, setIsOpen] = useState(defaultOpen ?? false);
    const toggle = onClick ?? (() => setIsOpen(o => !o));
    const expanded = onClick ? open : isOpen;

    return (
        <div onClick={toggle} style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: "4px 10px 4px 8px", cursor: "pointer",
            color: C.comment, fontSize: 12, userSelect: "none",
        }}
            onMouseEnter={e => e.currentTarget.style.background = C.bgHover}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                style={{ transform: expanded ? "rotate(90deg)" : "", transition: "transform .15s" }}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#e3b341">
                <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            </svg>
            <span>{label}</span>
        </div>
    );
}

function FileRow({ id, active, onClick, indent = 28 }) {
    const f = FILES[id];
    return (
        <div onClick={onClick} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: `3px 10px 3px ${indent}px`,
            cursor: "pointer", fontSize: 12,
            color: active ? C.plain : C.comment,
            background: active ? C.bgHover : "transparent",
            userSelect: "none", transition: "background .1s",
        }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.bgHover; e.currentTarget.style.color = C.plain; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; if (!active) e.currentTarget.style.color = C.comment; }}
        >
            <FileIcon ext={f.ext} />
            <span>{f.name}</span>
        </div>
    );
}