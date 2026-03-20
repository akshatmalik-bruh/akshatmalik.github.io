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
        pdf: { color: "#e06c75", letter: "P" },
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

export default FileIcon;
