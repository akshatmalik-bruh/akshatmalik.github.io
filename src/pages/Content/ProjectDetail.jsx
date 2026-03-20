import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { COLORS as C } from "../../constants/theme";
import { PROJECTS_DATA } from "../../constants/resumeData";

const Badge = ({ text, color }) => (
    <span style={{
        fontSize: 13, padding: "4px 14px", borderRadius: 20,
        background: (color || C.keyword) + "18",
        color: color || C.keyword,
        border: `1px solid ${(color || C.keyword)}55`,
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.03em",
    }}>{text}</span>
);

const StackCategory = ({ label, items, color }) => {
    const colors = {
        languages: C.keyword, ai_llm: C.special, ai: C.special,
        databases: C.fn, db: C.fn, frontend: C.type,
        backend: C.string, security: C.number, tools: C.tag,
        core: C.fn, docs: C.special, build: C.type,
        framework: C.keyword, styling: C.type,
    };
    const c = colors[label] || C.plain;
    return (
        <div style={{ marginBottom: 20 }}>
            <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 10
            }}>
                <div style={{
                    width: 3, height: 20, borderRadius: 4,
                    background: `linear-gradient(180deg, ${c}, ${c}44)`,
                    flexShrink: 0,
                }} />
                <span style={{
                    color: c, fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.12em",
                }}>{label.replace(/_/g, " ")}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 13 }}>
                {items.map(item => <Badge key={item} text={item} color={c} />)}
            </div>
        </div>
    );
};

const Divider = ({ color }) => (
    <div style={{
        height: 1, width: "100%", margin: "8px 0",
        background: `linear-gradient(90deg, ${color || C.keyword}55, transparent)`,
    }} />
);

const ProjectDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.pathname.split("/").pop();
    const project = PROJECTS_DATA.find(p => p.name.toLowerCase().replace(/ /g, '-') === id);

    if (!project) return <Navigate to="/projects" replace />;

    const statusMeta = {
        live:  { color: C.string,  label: "LIVE",  glyph: "●" },
        beta:  { color: C.number,  label: "BETA",  glyph: "◐" },
        wip:   { color: C.comment, label: "WIP",   glyph: "○" },
    };
    const sm = statusMeta[project.status] || statusMeta.wip;

    return (
        <div style={{
            display: "flex", flexDirection: "column", gap: 0,
            maxWidth: 900, margin: "0 auto",
            fontFamily: "'JetBrains Mono', monospace",
        }}>
            {/* ── BACK BUTTON ─────────────────────────────────── */}
            <div
                onClick={() => navigate("/projects")}
                style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    color: C.comment, fontSize: 12, cursor: "pointer",
                    marginBottom: 28, width: "fit-content",
                    transition: "color .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.plain}
                onMouseLeave={e => e.currentTarget.style.color = C.comment}
            >
                ← back to projects
            </div>

            {/* ── HERO BLOCK ───────────────────────────────────── */}
            <div style={{
                background: C.bgPanel,
                border: `1px solid ${project.color}44`,
                borderRadius: 16,
                padding: "clamp(24px, 4vw, 48px)",
                marginBottom: 32,
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Glow blob */}
                <div style={{
                    position: "absolute", top: -60, right: -60,
                    width: 200, height: 200, borderRadius: "50%",
                    background: project.color + "22",
                    filter: "blur(60px)", pointerEvents: "none",
                }} />

                {/* Title */}
                <h1 style={{
                    fontSize: "clamp(32px, 6vw, 56px)",
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: "0 0 20px 0",
                    letterSpacing: "-0.04em",
                    color: project.color,
                }}>
                    {project.name}
                </h1>

                {/* Short desc */}
                <p style={{
                    color: C.plain, fontSize: "clamp(14px, 2vw, 17px)",
                    lineHeight: 1.7, margin: 0,
                    maxWidth: 720,
                }}>
                    {project.desc}
                </p>
            </div>

            {/* ── OVERVIEW ─────────────────────────────────────── */}
            <div style={{
                background: C.bgPanel, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: "clamp(20px, 3vw, 36px)", marginBottom: 24,
            }}>
                <h2 style={{
                    fontSize: "clamp(9px, 1.4vw, 11px)", fontWeight: 400,
                    color: C.fn, letterSpacing: "0.05em",
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: `0 0 10px ${C.fn}88`,
                    lineHeight: 1.8, marginBottom: 16,
                }}>
                    // Overview
                </h2>
                <Divider color={C.fn} />
                <p style={{
                    color: C.plain, fontSize: "clamp(14px, 1.8vw, 16px)",
                    lineHeight: 1.9, marginTop: 16,
                }}>
                    {project.fullDesc}
                </p>
            </div>

            {/* ── TECH STACK ───────────────────────────────────── */}
            <div style={{
                background: C.bgPanel, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: "clamp(20px, 3vw, 36px)", marginBottom: 24,
            }}>
                <h2 style={{
                    fontSize: "clamp(9px, 1.4vw, 11px)", fontWeight: 400,
                    color: C.keyword, letterSpacing: "0.05em",
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: `0 0 10px ${C.keyword}88`,
                    lineHeight: 1.8, marginBottom: 16,
                }}>
                    // Tech Stack
                </h2>
                <Divider color={C.keyword} />
                <div style={{ marginTop: 20 }}>
                    {project.stack.map(s => (
                        <StackCategory key={s.label} label={s.label} items={s.items} />
                    ))}
                </div>
            </div>

            {/* ── REPOSITORY ───────────────────────────────────── */}
            <div style={{
                background: C.bgPanel, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: "clamp(20px, 3vw, 36px)",
            }}>
                <h2 style={{
                    fontSize: "clamp(9px, 1.4vw, 11px)", fontWeight: 400,
                    color: C.special, letterSpacing: "0.05em",
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: `0 0 10px ${C.special}88`,
                    lineHeight: 1.8, marginBottom: 16,
                }}>
                    // Repository
                </h2>
                <Divider color={C.special} />
                <div style={{
                    marginTop: 20, display: "flex", alignItems: "center",
                    gap: 14, flexWrap: "wrap",
                }}>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: C.bgSidebar, borderRadius: 10,
                        padding: "10px 18px", border: `1px solid ${C.border}`,
                        flex: 1, minWidth: 200,
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={C.plain}>
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003-.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span style={{ color: C.special, fontSize: 13, wordBreak: "break-all" }}>
                            {project.github.replace("https://", "")}
                        </span>
                    </div>
                    <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: project.color + "18",
                            border: `1px solid ${project.color}55`,
                            color: project.color, borderRadius: 10,
                            padding: "10px 20px", textDecoration: "none",
                            fontSize: 13, fontWeight: 700,
                            transition: "all .15s", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = project.color + "30"}
                        onMouseLeave={e => e.currentTarget.style.background = project.color + "18"}
                    >
                        View Source ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
