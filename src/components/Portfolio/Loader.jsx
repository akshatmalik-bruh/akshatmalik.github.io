import { useEffect, useState, useRef } from "react";

// ── Pixel art robot drawn with box-shadow (4px per pixel) ─────────────────
const PX = 4; // pixel size

// Each [col, row] is one "pixel" of the character
// Robot design: 14w x 18h grid
const ROBOT_FRAMES = [
  // Frame 1 — left leg forward
  [
    // HEAD
    [4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
    [3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
    [3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
    // eyes
    [4,3],[5,3],[7,3],[8,3],
    [3,3],[9,3],[10,3],
    [3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],
    [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
    // antenna
    [6,0],[7,0],[6,-1],[7,-1],[6,-2],
    // BODY
    [3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
    [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],
    [2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],
    [2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],
    [2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],
    [3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],
    // ARMS
    [0,7],[1,7],[0,8],[1,8],[0,9],[1,9],
    [12,7],[13,7],[12,8],[13,8],[12,9],[13,9],
    // LEGS frame 1
    [4,12],[5,12],[4,13],[5,13],[4,14],[5,14],[4,15],[3,15],[4,16],[3,16],
    [8,12],[9,12],[8,13],[9,13],[9,14],[10,14],[9,15],[10,15],[9,16],[10,16],
  ],
  // Frame 2 — right leg forward (swap legs)
  [
    // HEAD (same)
    [4,0],[5,0],[6,0],[7,0],[8,0],[9,0],
    [3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
    [3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],
    [4,3],[5,3],[7,3],[8,3],
    [3,3],[9,3],[10,3],
    [3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],
    [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],
    [6,0],[7,0],[6,-1],[7,-1],[7,-2],
    // BODY (same)
    [3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],
    [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],
    [2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],
    [2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,9],[10,9],[11,9],
    [2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],
    [3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],
    [0,7],[1,7],[0,8],[1,8],[0,9],[1,9],
    [12,7],[13,7],[12,8],[13,8],[12,9],[13,9],
    // LEGS frame 2 (swapped)
    [4,12],[5,12],[4,13],[5,13],[3,14],[4,14],[3,15],[4,15],[3,16],[4,16],
    [8,12],[9,12],[8,13],[9,13],[8,14],[9,14],[9,15],[10,15],[9,16],[10,16],
  ],
];

const COLORS = {
  body:    "#61afef",
  outline: "#282c34",
  eye:     "#e5c07b",
  screen:  "#98c379",
  joint:   "#c678dd",
};

function makeBoxShadow(pixels, colorMap, px) {
  return pixels.map(([c, r]) => {
    const color = colorMap[`${c},${r}`] || COLORS.body;
    return `${c * px}px ${r * px}px 0 ${color}`;
  }).join(", ");
}

// Assign special colors to specific pixel coordinates
function getColorMap(frame) {
  const map = {};
  // eyes
  if (frame === 0 || frame === 1) {
    [[4,3],[5,3],[7,3],[8,3]].forEach(([c,r]) => { map[`${c},${r}`] = COLORS.eye; });
    [[3,3],[9,3],[10,3]].forEach(([c,r]) => { map[`${c},${r}`] = COLORS.outline; });
    [[3,1],[10,1],[3,2],[10,2],[3,4],[10,4]].forEach(([c,r]) => { map[`${c},${r}`] = COLORS.outline; });
    // screen on body
    [[5,8],[6,8],[7,8],[8,8],[5,9],[6,9],[7,9],[8,9]].forEach(([c,r]) => { map[`${c},${r}`] = COLORS.screen; });
    // joints
    [[0,9],[1,9],[12,9],[13,9]].forEach(([c,r]) => { map[`${c},${r}`] = COLORS.joint; });
  }
  return map;
}

function RobotSprite({ frame }) {
  const pixels = ROBOT_FRAMES[frame] || ROBOT_FRAMES[0];
  const colorMap = getColorMap(frame);
  const shadow = makeBoxShadow(pixels, colorMap, PX);

  return (
    <div style={{
      position: "absolute",
      bottom: "100%",
      left: -2 * PX,
      width: PX,
      height: PX,
      background: COLORS.body,
      boxShadow: shadow,
      imageRendering: "pixelated",
    }} />
  );
}

// ── Main Loader Component ──────────────────────────────────────────────────
const DURATION = 2800; // ms total

export const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const startRef = useRef(Date.now());

  // Progress animation
  useEffect(() => {
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.floor(eased * 100));
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Pause a moment then exit
        setGlitch(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onDone, 600);
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  // Walk animation
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 2), 180);
    return () => clearInterval(id);
  }, []);

  const BAR_W = 320;
  const characterLeft = Math.floor((progress / 100) * BAR_W);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999999,
      background: "#0d1117",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 40,
      opacity: exiting ? 0 : 1,
      transition: exiting ? "opacity .6s ease" : "none",
    }}>

      {/* Scanlines overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>

        {/* Title */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 900,
          letterSpacing: "0.15em",
          marginBottom: 8,
          color: glitch ? "#e06c75" : "#c678dd",
          textShadow: glitch
            ? "3px 0 #61afef, -3px 0 #e5c07b"
            : `0 0 20px #c678dd88`,
          transition: "color .1s, text-shadow .1s",
          imageRendering: "pixelated",
        }}>
          AKSHAT.DEV
        </div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#61afef",
          letterSpacing: "0.3em",
          marginBottom: 56,
          opacity: 0.7,
        }}>
          INITIALIZING PORTFOLIO...
        </div>

        {/* Progress bar + robot */}
        <div style={{
          position: "relative",
          width: BAR_W,
          margin: "0 auto",
        }}>
          {/* Robot walking on the bar */}
          <div style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: 12,
            left: characterLeft,
            transition: "left .06s linear",
          }}>
            <RobotSprite frame={frame} />
          </div>

          {/* Track */}
          <div style={{
            width: BAR_W,
            height: 12,
            background: "#1e2329",
            borderRadius: 2,
            border: "2px solid #30363d",
            overflow: "hidden",
            imageRendering: "pixelated",
          }}>
            {/* Fill — segmented pixel style */}
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: `repeating-linear-gradient(
                90deg,
                #c678dd 0px, #c678dd 8px,
                #9d50bb 8px, #9d50bb 12px
              )`,
              transition: "width .06s linear",
              boxShadow: "0 0 8px #c678dd88",
            }} />
          </div>

          {/* Percentage */}
          <div style={{
            marginTop: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#abb2bf",
            letterSpacing: "0.1em",
          }}>
            <span style={{ color: "#c678dd" }}>{progress}</span>
            <span style={{ opacity: 0.5 }}>% loaded</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      {[
        { top: 20, left: 20 },
        { top: 20, right: 20 },
        { bottom: 20, left: 20 },
        { bottom: 20, right: 20 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos, zIndex: 2,
          width: 20, height: 20,
          borderTop: i < 2 ? "2px solid #c678dd44" : "none",
          borderBottom: i >= 2 ? "2px solid #c678dd44" : "none",
          borderLeft: (i === 0 || i === 2) ? "2px solid #c678dd44" : "none",
          borderRight: (i === 1 || i === 3) ? "2px solid #c678dd44" : "none",
        }} />
      ))}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
