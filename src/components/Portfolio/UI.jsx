import { COLORS as C } from "../../constants/theme";

export const SectionLabel = ({ color, children }) => (
    <h2 style={{
        color,
        fontSize: "clamp(10px, 1.6vw, 13px)",
        marginBottom: 24,
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: "'Press Start 2P', monospace",
        imageRendering: "pixelated",
        lineHeight: 1.8,
    }}>
        {"// "}{children}
    </h2>
);

export const Paragraph = ({ children, style }) => (
    <p style={{ color: C.plain, fontSize: 16, lineHeight: 1.8, marginBottom: 12, ...style }}>{children}</p>
);

export const BlockCard = ({ accent, children }) => (
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

export const Row = ({ label, color, value, suffix }) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
        <span style={{ color: C.tag, fontSize: 13, minWidth: 120 }}>{label}:</span>
        <span style={{ color, fontSize: 13 }}>{value}</span>
        {suffix && <span style={{ color: C.comment, fontSize: 12 }}>{suffix}</span>}
    </div>
);
