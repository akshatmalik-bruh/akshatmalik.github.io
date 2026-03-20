import { COLORS as C } from "../../constants/theme";
import { FILES } from "../../constants/files";

export const Breadcrumbs = ({ activeTab }) => {
    if (!activeTab) return null;
    const f = FILES[activeTab];
    return (
        <div style={{
            height: 24, background: C.bgTabActive,
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center",
            padding: "0 16px", gap: 4,
            fontSize: 11, color: C.comment, flexShrink: 0,
        }}>
            <span>portfolio</span>
            {f.folder && <><span> › </span><span>{f.folder}</span></>}
            <span> › </span>
            <span style={{ color: C.plain }}>{f.name}</span>
        </div>
    );
};
