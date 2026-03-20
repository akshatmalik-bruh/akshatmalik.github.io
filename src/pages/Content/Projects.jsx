import { COLORS as C } from "../../constants/theme";
import { PROJECTS_DATA } from "../../constants/resumeData";
import { SectionLabel } from "../../components/Portfolio/UI";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const navigate = useNavigate();
    const statusColor = { live: C.string, beta: C.number, wip: C.comment };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <SectionLabel color={C.keyword}>featured projects</SectionLabel>
            {PROJECTS_DATA.map((p, i) => (
                <div key={p.name} 
                    onClick={() => navigate(`/projects/${p.name.toLowerCase().replace(/ /g, '-')}`)}
                    style={{
                        background: C.bgPanel, borderRadius: 10,
                        border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${p.color}`,
                        padding: "18px 20px",
                        transition: "all .15s",
                        cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.style.borderColor = p.color;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "";
                        e.currentTarget.style.borderColor = C.border;
                    }}
                >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.name}</span>
                        </div>
                    </div>
                    <p style={{ color: C.plain, fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.stack.flatMap(s => s.items).map(t => (
                            <span key={t} style={{
                                fontSize: 11, padding: "2px 8px", borderRadius: 4,
                                background: C.bgSidebar, color: C.special,
                                border: `1px solid ${C.border}`,
                            }}>{t}</span>
                        ))}
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: C.comment, fontStyle: 'italic' }}>
                        Click to view full description →
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Projects;
