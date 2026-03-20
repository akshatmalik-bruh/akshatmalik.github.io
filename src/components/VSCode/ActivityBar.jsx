import { COLORS as C } from "../../constants/theme";

export const ActivityBar = ({ isMobile }) => {
    const s = {
        actBar: {
            width: 48, background: C.bgSidebar,
            borderRight: `1px solid ${C.border}`,
            display: isMobile ? "none" : "flex",
            flexDirection: "column", alignItems: "center",
            padding: "8px 0", gap: 2, flexShrink: 0,
        },
    };

    return (
        <div style={s.actBar}>
            {[
                { title: "Explorer", path: "M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.5l1.5-1.5V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38H2.5V7.5H7v9.07L8.5 18H14.5v4.5zm6-6H8.5V1.5h7.5v4.5l1.5 1.5H20.5v9z" },
            ].map((btn, i) => (
                <div key={btn.title} title={btn.title} style={{
                    width: 36, height: 36, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: i === 0 ? C.plain : C.lineNum,
                    position: "relative",
                }}
                    onMouseEnter={e => e.currentTarget.style.color = C.plain}
                    onMouseLeave={e => i !== 0 && (e.currentTarget.style.color = C.lineNum)}
                >
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
    );
};
