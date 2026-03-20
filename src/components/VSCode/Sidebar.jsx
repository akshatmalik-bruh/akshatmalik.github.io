import { COLORS as C } from "../../constants/theme";
import FileIcon from "./FileIcon";
import { ROOT_FILES, PUBLIC_FILES, FILES, PROJECT_FILES, PUBLICATIONS_FILES } from "../../constants/files";
import { useState } from "react";

const FolderRow = ({ label, open, onClick, defaultOpen }) => (
    <div
        onClick={onClick}
        style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 12px", cursor: "pointer",
            background: "transparent", transition: "background .1s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = C.bgHover}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
        <svg width="12" height="12" viewBox="0 0 16 16" fill={C.comment} style={{
            transform: open || defaultOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform .1s",
        }}>
            <path d="M6 4l4 4-4 4V4z" />
        </svg>
        <span style={{ fontWeight: 600, fontSize: 11, color: C.plain }}>{label}</span>
    </div>
);

const FileRow = ({ id, active, onClick, indent = 22 }) => {
    const f = FILES[id];
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: `4px 12px 4px ${indent}px`, cursor: "pointer",
                background: active ? C.bgHover : "transparent",
                color: active ? C.plain : C.comment,
                transition: "background .1s",
            }}
            onMouseEnter={e => !active && (e.currentTarget.style.background = C.bgHover)}
            onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}
        >
            <FileIcon ext={f.ext} />
            <span style={{ fontSize: 13 }}>{f.name}</span>
        </div>
    );
};

export const Sidebar = ({ activeTab, openFile, isMobile, sidebarOpen, setSidebarOpen }) => {
    const [publicOpen, setPublicOpen] = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(true);
    const [publicationsOpen, setPublicationsOpen] = useState(true);

    const s = {
        sidebar: {
            width: isMobile ? "100%" : 220,
            maxWidth: isMobile ? "100%" : 220,
            background: C.bgPanel,
            borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            flexShrink: 0, overflow: "hidden",
            ...(isMobile ? {
                position: "absolute", top: 0, left: 0, bottom: 0,
                zIndex: 50, transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform .25s ease",
                width: "75vw",
            } : {}),
        },
    };

    return (
        <div style={s.sidebar}>
            <div style={{
                padding: "10px 12px 8px", fontSize: 10, fontWeight: 600,
                letterSpacing: ".12em", color: C.comment, textTransform: "uppercase",
                borderBottom: `1px solid ${C.border}`, flexShrink: 0,
            }}>Explorer</div>

            <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
                <FolderRow label="public" open={publicOpen} onClick={() => setPublicOpen(o => !o)} />
                {publicOpen && (
                    <div>
                        {PUBLIC_FILES.map(id => (
                            <FileRow key={id} id={id} active={id === activeTab} onClick={() => openFile(id)} indent={28} />
                        ))}
                    </div>
                )}

                <FolderRow label="portfolio" open defaultOpen />
                <div>
                    {ROOT_FILES.map(id => (
                        <FileRow key={id} id={id} active={id === activeTab} onClick={() => openFile(id)} />
                    ))}
                </div>

                <FolderRow label="projects" open={projectsOpen} onClick={() => setProjectsOpen(o => !o)} />
                {projectsOpen && (
                    <div>
                        {PROJECT_FILES.map(id => (
                            <FileRow key={id} id={id} active={id === activeTab} onClick={() => openFile(id)} indent={28} />
                        ))}
                    </div>
                )}

                <FolderRow label="publications" open={publicationsOpen} onClick={() => setPublicationsOpen(o => !o)} />
                {publicationsOpen && (
                    <div>
                        {PUBLICATIONS_FILES.map(id => (
                            <FileRow key={id} id={id} active={id === activeTab} onClick={() => openFile(id)} indent={28} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
