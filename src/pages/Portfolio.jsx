import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { COLORS as C } from "../constants/theme";
import { FILES, ROOT_FILES, GLOBAL_FILES } from "../constants/files";
import { ActivityBar } from "../components/VSCode/ActivityBar";
import { Sidebar } from "../components/VSCode/Sidebar";
import { TabsBar } from "../components/VSCode/TabsBar";
import { Breadcrumbs } from "../components/VSCode/Breadcrumbs";

// ── Pixel Ninja with running legs ─────────────────────────────────────────
// Two-frame walk cycle — legs and arms swap position each frame
function NinjaSVG({ flip, frame }) {
  const f = frame % 2; // 0 or 1
  // Leg positions: frame 0 = right fwd, frame 1 = left fwd
  const ll = f === 0 ? { x: 3, y: 10 } : { x: 4, y: 10 }; // left leg hip
  const rl = f === 0 ? { x: 7, y: 10 } : { x: 6, y: 10 }; // right leg hip
  const lf = f === 0 ? 2 : 3;   // left foot x
  const rf = f === 0 ? 8 : 7;   // right foot x
  // Arm positions swap opposite to legs
  const la = f === 0 ? { x: 0, y: 7 } : { x: 1, y: 6 }; // left arm
  const ra = f === 0 ? { x: 9, y: 6 } : { x: 9, y: 7 }; // right arm

  return (
    <svg
      width="22" height="22"
      viewBox="0 0 12 14"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated", transform: flip ? "scaleX(-1)" : "none", display: "block" }}
    >
      {/* Headband */}
      <rect x="3" y="0" width="6" height="1" fill="#e06c75"/>
      {/* Head */}
      <rect x="2" y="1" width="8" height="4" fill="#2c313a"/>
      {/* Eyes */}
      <rect x="4" y="2" width="1" height="1" fill="#e5c07b"/>
      <rect x="7" y="2" width="1" height="1" fill="#e5c07b"/>
      {/* Headband wrap */}
      <rect x="2" y="1" width="8" height="1" fill="#e06c75"/>
      {/* Scarf */}
      <rect x="3" y="5" width="6" height="1" fill="#61afef"/>
      {/* Body */}
      <rect x="3" y="6" width="6" height="4" fill="#1e2329"/>
      {/* Left arm */}
      <rect x={la.x} y={la.y} width="3" height="1" fill="#2c313a"/>
      {/* Right arm */}
      <rect x={ra.x} y={ra.y} width="3" height="1" fill="#2c313a"/>
      {/* Belt */}
      <rect x="3" y="9" width="6" height="1" fill="#e5c07b"/>
      {/* Left leg */}
      <rect x={ll.x} y={ll.y} width="2" height="3" fill="#1e2329"/>
      {/* Right leg */}
      <rect x={rl.x} y={rl.y} width="2" height="3" fill="#1e2329"/>
      {/* Left foot */}
      <rect x={lf} y="13" width="3" height="1" fill="#0d1117"/>
      {/* Right foot */}
      <rect x={rf} y="13" width="3" height="1" fill="#0d1117"/>
    </svg>
  );
}

// Tiny pixel dust puff
function DustPuff() {
  return (
    <svg width="10" height="8" viewBox="0 0 5 4" shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated", display: "block" }}>
      <rect x="1" y="2" width="1" height="1" fill="#abb2bf"/>
      <rect x="0" y="1" width="1" height="1" fill="#abb2bf99"/>
      <rect x="2" y="1" width="1" height="1" fill="#abb2bf66"/>
      <rect x="3" y="2" width="1" height="1" fill="#abb2bf44"/>
      <rect x="1" y="3" width="2" height="1" fill="#abb2bf33"/>
    </svg>
  );
}

function TitleBarRoamer() {
  const containerRef = useRef(null);
  const stateRef     = useRef({ x: 40, dir: 1, frameTimer: 0, frame: 0 });
  const [pos, setPos]   = useState({ x: 40, dir: 1 });
  const [frame, setFrame] = useState(0);
  const [dust, setDust]   = useState([]);
  const dustId = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let last = null;
    const SPEED = 0.5;

    const tick = (ts) => {
      if (last === null) last = ts;
      const dt = Math.min(ts - last, 50);
      last = ts;

      const width = containerRef.current?.offsetWidth || 300;
      const maxX  = width - 26;

      let { x, dir, frameTimer, frame } = stateRef.current;
      x += dir * SPEED * dt * 0.06;
      if (x >= maxX) { x = maxX; dir = -1; }
      if (x <= 0)    { x = 0;    dir =  1; }

      // Walk frame tick every ~150ms
      frameTimer += dt;
      if (frameTimer >= 150) {
        frameTimer = 0;
        frame = 1 - frame;
        setFrame(frame);

        // Spawn dust puff behind the ninja
        const id = ++dustId.current;
        const dustX = dir > 0 ? Math.round(x) - 8 : Math.round(x) + 22;
        setDust(d => [...d.slice(-6), { id, x: dustX }]);
        setTimeout(() => setDust(d => d.filter(p => p.id !== id)), 550);
      }

      stateRef.current = { x, dir, frameTimer, frame };
      setPos({ x, dir });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* centred label */}
      <span style={{ fontSize: 11, color: C.comment, letterSpacing: "0.04em", pointerEvents: "none", userSelect: "none" }}>
        akshat.dev &mdash; Visual Studio Code
      </span>

      {/* dust puffs */}
      {dust.map(d => (
        <div key={d.id} style={{
          position: "absolute", top: "50%", left: d.x,
          transform: "translateY(-60%)", pointerEvents: "none",
          animation: "dustPuff .55s ease-out forwards",
        }}>
          <DustPuff />
        </div>
      ))}

      {/* Ninja */}
      <div style={{
        position: "absolute", top: "50%", left: Math.round(pos.x),
        transform: "translateY(-50%)", lineHeight: 0, pointerEvents: "none",
      }}>
        <NinjaSVG flip={pos.dir < 0} frame={frame} />
      </div>

      <style>{`
        @keyframes dustPuff {
          0%   { opacity: 1; transform: translateY(-60%) scale(1); }
          60%  { opacity: 0.5; transform: translateY(-80%) scale(1.6); }
          100% { opacity: 0; transform: translateY(-100%) scale(2.2); }
        }
      `}</style>
    </div>
  );
}

export default function Portfolio() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Find file id from path
    const getFileIdFromPath = (path) => {
        const file = Object.entries(FILES).find(([id, f]) => f.path === path);
        return file ? file[0] : null;
    };

    const currentFileId = getFileIdFromPath(location.pathname);
    const [openTabs, setOpenTabs] = useState(["app"]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Sync open tabs with current active file
    useEffect(() => {
        if (currentFileId) {
            setOpenTabs(prev => {
                if (prev.includes(currentFileId)) return prev;
                return [...prev, currentFileId];
            });
        }
    }, [currentFileId]);

    const openFile = (id) => {
        navigate(FILES[id].path);
        if (isMobile) setSidebarOpen(false);
    };

    const closeTab = (e, id) => {
        if (id === "app") return; // Safeguard: app.jsx should never close
        
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        
        setOpenTabs(prev => {
            const idx = prev.indexOf(id);
            if (idx === -1) return prev;
            
            const nextTabs = prev.filter(t => t !== id);
            
            // Navigate away if we are closing the currently active tab
            if (currentFileId === id) {
                if (nextTabs.length > 0) {
                    const newActiveId = nextTabs[Math.max(0, idx - 1)];
                    setTimeout(() => navigate(FILES[newActiveId].path), 0);
                } else {
                    setTimeout(() => navigate("/"), 0);
                }
            }
            
            return nextTabs;
        });
    };

    const s = {
        root: {
            display: "flex", flexDirection: "column",
            height: "100dvh", width: "100vw", overflow: "hidden",
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
        editorArea: {
            flex: 1, display: "flex", flexDirection: "column",
            minWidth: 0, background: C.bgTabActive,
        },
        codeArea: {
            flex: 1, overflowY: "auto", 
            padding: isMobile ? "16px 16px 80px 16px" : "24px 28px 60px 28px",
            scrollbarWidth: "thin", scrollbarColor: `${C.lineNum} transparent`,
        },
    };

    return (
        <div style={s.root}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { overflow: hidden; height: 100vh; width: 100vw; margin: 0; }
                #root { max-width: 100vw; width: 100vw; height: 100vh; margin: 0; border: none; }
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #3e4452; border-radius: 3px; }
            `}</style>

            {/* TITLE BAR */}
            <div style={s.titlebar}>
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
                {!isMobile && (
                    <div style={{ display: "flex", gap: 6 }}>
                        {["#ff5f57", "#ffbd2e", "#27c93f"].map(c => (
                            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                        ))}
                    </div>
                )}
                <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: C.comment, position: "relative", overflow: "hidden" }}>
                    <TitleBarRoamer />
                </div>
            </div>

            {/* WORKSPACE */}
            <div style={s.workspace}>
                {isMobile && sidebarOpen && (
                    <div onClick={() => setSidebarOpen(false)} style={{
                        position: "absolute", inset: 0, zIndex: 40,
                        background: "rgba(0,0,0,.5)",
                    }} />
                )}

                <ActivityBar isMobile={isMobile} />
                
                <Sidebar 
                    activeTab={currentFileId} 
                    openFile={openFile} 
                    isMobile={isMobile} 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen} 
                />

                <div style={s.editorArea}>
                    {!isMobile && (
                        <TabsBar 
                            openTabs={openTabs} 
                            activeTab={currentFileId} 
                            setActiveTab={openFile} 
                            closeTab={closeTab} 
                        />
                    )}

                    {currentFileId && <Breadcrumbs activeTab={currentFileId} />}

                    <div style={s.codeArea}>
                        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                            <Routes>
                                {Object.entries(FILES).map(([id, f]) => (
                                    <Route key={id} path={f.path} element={<f.Content />} />
                                ))}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATUS BAR */}
            <div style={{
                height: 24, background: C.statusBg,
                display: "flex", alignItems: "center",
                padding: "0 12px", gap: 14, fontSize: 11, color: "#fff",
                zIndex: 60,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0L6.5 1.5l6 6-6 6L8 15l7.5-7.5L8 0z" />
                    </svg>
                    <span>main*</span>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
                    {currentFileId && <span>{FILES[currentFileId].lang}</span>}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 14 }}>✌</span>
                        <span>Prettier</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
