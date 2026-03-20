import { useState } from "react";
import { COLORS as C } from "../../constants/theme";
import { CONTACT_LINKS } from "../../constants/resumeData";
import { SectionLabel, BlockCard, Row } from "../../components/Portfolio/UI";
import Tok from "../../components/VSCode/Tok";

const Contact = () => {
    const [hoveredLink, setHoveredLink] = useState(null);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 40 }}>
            <SectionLabel color={C.keyword}>get in touch</SectionLabel>

            {/* Server Status Box */}
            <div style={{
                background: "#0d1117",
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.string}`,
                borderRadius: 8,
                padding: "20px",
                position: "relative",
                overflow: "hidden"
            }}>
                <div style={{ position: "absolute", right: 20, top: 20, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.string, boxShadow: `0 0 10px ${C.string}` }} className="pulse-dot" />
                    <span style={{ color: C.string, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>SERVER_ONLINE</span>
                </div>
                
                <h3 style={{ margin: "0 0 16px 0", color: C.plain, fontSize: 16, fontWeight: 600 }}>Connection Status</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Row label="available" color={C.string} value="true" />
                    <Row label="response_time" color={C.string} value='"< 24 hours"' />
                    <Row label="timezone" color={C.fn} value='"IST (UTC+5:30)"' />
                    <Row label="open_to" color={C.keyword} value='["freelance", "full-time", "collaborations"]' />
                </div>
            </div>

            {/* Interactive Links Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CONTACT_LINKS.map(l => {
                    const isHovered = hoveredLink === l.label;
                    return (
                        <a 
                            key={l.label} 
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={() => setHoveredLink(l.label)}
                            onMouseLeave={() => setHoveredLink(null)}
                            style={{
                                display: "flex", alignItems: "center", gap: 20,
                                background: isHovered ? `${l.color}11` : C.bgPanel,
                                border: `1px solid ${isHovered ? l.color : C.border}`,
                                borderRadius: 8, padding: "16px 20px",
                                textDecoration: "none",
                                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                transform: isHovered ? "translateX(6px)" : "none",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Hover accent line */}
                            <div style={{
                                position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                                background: l.color,
                                opacity: isHovered ? 1 : 0, transition: "opacity 0.2s"
                            }}/>

                            <span style={{ 
                                color: isHovered ? C.plain : C.comment, 
                                fontSize: 14, 
                                minWidth: 90,
                                transition: "color 0.2s",
                                fontWeight: isHovered ? 600 : 400
                            }}>
                                {l.label}
                            </span>
                            
                            <span style={{
                                color: l.color,
                                fontSize: 14,
                                textShadow: isHovered ? `0 0 8px ${l.color}66` : "none",
                                transition: "text-shadow 0.2s"
                            }}>
                                {l.value}
                            </span>

                            {isHovered && (
                                <span style={{
                                    marginLeft: "auto",
                                    color: l.color,
                                    fontSize: 12,
                                    animation: "fadeRight 0.3s forwards"
                                }}>
                                    → execute
                                </span>
                            )}
                        </a>
                    );
                })}
            </div>

            {/* Pixelated Call to Action */}
            <div style={{
                background: `linear-gradient(145deg, ${C.bgPanel}, #000000)`,
                border: `1px dashed ${C.comment}`,
                borderRadius: 12, padding: "30px 24px", textAlign: "center",
                marginTop: 10,
                position: "relative"
            }}>
                <div style={{ 
                    fontFamily: "'Press Start 2P', monospace", 
                    fontSize: "clamp(10px, 1.5vw, 14px)", 
                    color: C.string, 
                    marginBottom: 16,
                    lineHeight: 1.6,
                    textShadow: `0 0 10px ${C.string}66`,
                    imageRendering: "pixelated"
                }}>
                    {">"} AWAITING_INPUT_
                </div>
                <div style={{ color: C.plain, fontSize: 14, lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
                    Have an interesting project in mind or need a reliable developer? <br />
                    <span style={{ marginTop: 8, display: "inline-block" }}>
                        Shoot me an email, and let's build something <Tok color={C.keyword}>extraordinary</Tok> together.
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes fadeRight {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .pulse-dot {
                    animation: dotPulse 2s infinite;
                }
                @keyframes dotPulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Contact;
