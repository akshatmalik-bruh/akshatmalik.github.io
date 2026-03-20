import { COLORS as C } from "../../constants/theme";
import FileIcon from "./FileIcon";
import { FILES } from "../../constants/files";

export const TabsBar = ({ openTabs, activeTab, setActiveTab, closeTab }) => {
    return (
        <div style={{
            height: 36, background: C.bgTab,
            borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "stretch",
            overflowX: "auto", overflowY: "hidden",
            flexShrink: 0,
            scrollbarWidth: "none",
        }}>
            {openTabs.map(id => {
                const f = FILES[id];
                const isActive = id === activeTab;
                const isApp = id === "app";

                return (
                    <div 
                        key={id} 
                        onClick={() => setActiveTab(id)} 
                        onAuxClick={(e) => {
                            if (e.button === 1 && !isApp) closeTab(e, id); // Middle-click close
                        }}
                        onMouseDown={(e) => {
                            if (e.button === 1) e.preventDefault(); // Prevent auto-scroll mode
                        }}
                        style={{
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
                        {!isApp && (
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
                        )}
                    </div>
                );
            })}
        </div>
    );
};
