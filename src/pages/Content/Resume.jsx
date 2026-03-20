import { COLORS as C } from "../../constants/theme";
import { SectionLabel, BlockCard } from "../../components/Portfolio/UI";

const Resume = () => {
    return (
        <div style={{
            display: "flex", flexDirection: "column", gap: 32,
            maxWidth: 600, margin: "0 auto", padding: "40px 20px",
            textAlign: "center",
        }}>
            <div style={{
                width: 80, height: 80, background: C.tag + "18",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto",
                border: `1px solid ${C.tag}44`,
            }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill={C.tag}>
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
            </div>

            <section>
                <h2 style={{
                    fontSize: 28, fontWeight: 900, color: C.plain,
                    marginBottom: 12, letterSpacing: "-0.03em",
                }}>
                    Official Resume
                </h2>
                <p style={{
                    color: C.comment, fontSize: 13, lineHeight: 1.6,
                    maxWidth: 400, margin: "0 auto 32px",
                }}>
                    The following file is a binary PDF. You can view it directly or download it for your records.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            gap: 10, background: C.tag, color: C.bg,
                            padding: "12px 28px", borderRadius: 8,
                            fontSize: 14, fontWeight: 700, textDecoration: "none",
                            transition: "all .15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = ".9"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        View PDF ↗
                    </a>

                    <a
                        href="/resume.pdf"
                        download="Akshat_Malik_Resume.pdf"
                        style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            gap: 10, background: "transparent", color: C.tag,
                            padding: "12px 28px", borderRadius: 8,
                            border: `1px solid ${C.tag}`,
                            fontSize: 14, fontWeight: 700, textDecoration: "none",
                            transition: "all .15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = C.tag + "11"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                        Download PDF ↓
                    </a>
                </div>
            </section>

            <div style={{
                marginTop: 40, padding: 20, borderRadius: 12,
                background: C.bgSidebar, border: `1px solid ${C.border}`,
            }}>
                <div style={{
                    color: C.comment, fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
                }}>
                    File Metadata
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
                    <MetaRow label="Format" value="Portable Document Format (PDF)" color={C.string} />
                    <MetaRow label="Size" value="73 KB" color={C.number} />
                    <MetaRow label="Last_Update" value="2024-03-20" color={C.keyword} />
                </div>
            </div>
        </div>
    );
};

const MetaRow = ({ label, value, color }) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
        <span style={{ color: C.comment, fontSize: 12 }}>{label}:</span>
        <span style={{ color: color, fontSize: 12, fontWeight: 600 }}>{value}</span>
    </div>
);

export default Resume;
