import { useEffect, useRef, useState } from "react";

// ── Pixel art cursors drawn as inline SVGs ─────────────────────────────────

// Normal: classic pixel arrow
const CURSOR_NORMAL = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <rect x="2" y="0" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="2" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="4" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="6" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="8" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="10" width="2" height="2" fill="#c678dd"/>
  <rect x="2" y="12" width="2" height="2" fill="#c678dd"/>
  <rect x="4" y="2" width="2" height="2" fill="#c678dd"/>
  <rect x="4" y="4" width="2" height="2" fill="#c678dd"/>
  <rect x="4" y="6" width="2" height="2" fill="#c678dd"/>
  <rect x="4" y="8" width="2" height="2" fill="#c678dd"/>
  <rect x="4" y="10" width="2" height="2" fill="#c678dd"/>
  <rect x="6" y="4" width="2" height="2" fill="#c678dd"/>
  <rect x="6" y="6" width="2" height="2" fill="#c678dd"/>
  <rect x="6" y="8" width="2" height="2" fill="#c678dd"/>
  <rect x="8" y="6" width="2" height="2" fill="#c678dd"/>
  <rect x="8" y="8" width="2" height="2" fill="#c678dd"/>
  <rect x="10" y="8" width="2" height="2" fill="#c678dd"/>
  <!-- white outline -->
  <rect x="0" y="0" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="2" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="4" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="6" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="8" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="12" width="2" height="2" fill="#abb2bf"/>
  <rect x="0" y="14" width="2" height="2" fill="#abb2bf"/>
  <rect x="2" y="14" width="2" height="2" fill="#abb2bf"/>
  <rect x="4" y="12" width="2" height="2" fill="#abb2bf"/>
  <rect x="6" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="6" y="12" width="2" height="2" fill="#abb2bf"/>
  <rect x="8" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="10" y="6" width="2" height="2" fill="#abb2bf"/>
  <rect x="10" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="12" y="8" width="2" height="2" fill="#abb2bf"/>
  <rect x="2"  y="0" width="2" height="2" fill="#abb2bf" opacity="0.3"/>
</svg>`;

// Click: pixelated fist/pointer burst
const CURSOR_CLICK = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <!-- fist body -->
  <rect x="4" y="6" width="2" height="2" fill="#61afef"/>
  <rect x="6" y="4" width="2" height="2" fill="#61afef"/>
  <rect x="8" y="4" width="2" height="2" fill="#61afef"/>
  <rect x="10" y="4" width="2" height="2" fill="#61afef"/>
  <rect x="6" y="6" width="2" height="2" fill="#61afef"/>
  <rect x="8" y="6" width="2" height="2" fill="#61afef"/>
  <rect x="10" y="6" width="2" height="2" fill="#61afef"/>
  <rect x="4" y="8" width="2" height="2" fill="#61afef"/>
  <rect x="6" y="8" width="2" height="2" fill="#61afef"/>
  <rect x="8" y="8" width="2" height="2" fill="#61afef"/>
  <rect x="10" y="8" width="2" height="2" fill="#61afef"/>
  <rect x="4" y="10" width="2" height="2" fill="#61afef"/>
  <rect x="6" y="10" width="2" height="2" fill="#61afef"/>
  <rect x="8" y="10" width="2" height="2" fill="#61afef"/>
  <rect x="10" y="10" width="2" height="2" fill="#61afef"/>
  <rect x="6" y="12" width="2" height="2" fill="#61afef"/>
  <rect x="8" y="12" width="2" height="2" fill="#61afef"/>
  <!-- sparkle dots -->
  <rect x="0" y="0" width="2" height="2" fill="#e5c07b"/>
  <rect x="12" y="0" width="2" height="2" fill="#e5c07b"/>
  <rect x="0" y="12" width="2" height="2" fill="#e5c07b"/>
  <rect x="14" y="6" width="2" height="2" fill="#98c379"/>
  <rect x="2" y="2" width="2" height="2" fill="#98c379"/>
  <!-- outline -->
  <rect x="4" y="4" width="2" height="2" fill="#abb2bf"/>
  <rect x="2" y="6" width="2" height="2" fill="#abb2bf"/>
  <rect x="2" y="8" width="2" height="2" fill="#abb2bf"/>
  <rect x="2" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="4" y="12" width="2" height="2" fill="#abb2bf"/>
  <rect x="10" y="12" width="2" height="2" fill="#abb2bf"/>
  <rect x="12" y="10" width="2" height="2" fill="#abb2bf"/>
  <rect x="12" y="6" width="2" height="2" fill="#abb2bf"/>
  <rect x="10" y="2" width="2" height="2" fill="#abb2bf"/>
  <rect x="6" y="2" width="2" height="2" fill="#abb2bf"/>
</svg>`;

const svgToDataUri = (svg) =>
    `url("data:image/svg+xml,${encodeURIComponent(svg.trim())}")`;

// ── Component ──────────────────────────────────────────────────────────────
export const CustomCursor = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [clicking, setClicking] = useState(false);
    const [trail, setTrail] = useState([]);
    const trailId = useRef(0);

    useEffect(() => {
        const onMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        const onDown = () => {
            setClicking(true);
            // spawn a small burst particle
            const id = ++trailId.current;
            setTrail(t => [...t, { id, x: 0, y: 0 }]);
            setTimeout(() => setTrail(t => t.filter(p => p.id !== id)), 500);
        };
        const onUp = () => setClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, []);

    const cursorSvg = clicking ? CURSOR_CLICK : CURSOR_NORMAL;
    const scale = clicking ? 1.3 : 1;

    return (
        <>
            {/* Main cursor element */}
            <div
                className="custom-cursor"
                style={{
                    position: "fixed",
                    left: pos.x,
                    top: pos.y,
                    width: 32,
                    height: 32,
                    pointerEvents: "none",
                    zIndex: 99999,
                    transform: `translate(-2px, -2px) scale(${scale})`,
                    transformOrigin: "top left",
                    transition: "transform .08s ease",
                    imageRendering: "pixelated",
                    backgroundImage: svgToDataUri(cursorSvg),
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                }}
            />

            {/* Click ripple particles */}
            {clicking && trail.map((p) => (
                <div key={p.id} className="cursor-particle" style={{
                    position: "fixed",
                    left: pos.x,
                    top: pos.y,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 99998,
                    background: "#c678dd",
                    transform: "translate(-50%, -50%)",
                    animation: "cursor-burst .4s ease-out forwards",
                }} />
            ))}

            <style>{`
                @media (pointer: fine) {
                    * { cursor: none !important; }
                }
                @media (pointer: coarse), (max-width: 768px) {
                    .custom-cursor { display: none !important; }
                    .cursor-particle { display: none !important; }
                }

                @keyframes cursor-burst {
                    0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
                    100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
