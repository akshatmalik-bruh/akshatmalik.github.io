import { COLORS as C } from "../../constants/theme";
import { ABOUT_DATA } from "../../constants/resumeData";
import { BlockCard, Row, SectionLabel, Paragraph } from "../../components/Portfolio/UI";
import Tok from "../../components/VSCode/Tok";
import TypingEffect from "../../components/Portfolio/TypingEffect";
import { useNavigate } from "react-router-dom";

const LandingContent = () => {
    const navigate = useNavigate();
    const { name, location, available, facts } = ABOUT_DATA;
    const [firstName, lastName] = name.split(" ");
    
    const roles = [
        "Frontend Engineer",
        "Backend Developer",
        "Full Stack Engineer",
        "AI Enthusiast"
    ];

    const socialSvgs = [
        { 
            label: "LinkedIn", 
            href: "https://www.linkedin.com/in/akshat-malik-2079973a0/",
            path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
        },
        { 
            label: "GitHub", 
            href: "https://github.com/akshatmalik-bruh",
            path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
        },
        { 
            label: "Instagram", 
            href: "https://www.instagram.com/akshaaaaattttt/",
            path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.338-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
        }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <section>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <h1 style={{
                            fontSize: "clamp(28px, 7vw, 60px)",
                            fontWeight: 400,
                            lineHeight: 1.2,
                            margin: 0,
                            letterSpacing: "0.04em",
                            fontFamily: "'Press Start 2P', monospace",
                            imageRendering: "pixelated",
                            display: "inline-block",
                        }}>
                            <span style={{ display: "block", color: C.keyword, animation: "pixelGlitch 5s infinite" }}>
                                {firstName.toUpperCase()}
                            </span>
                            <span style={{ display: "block", color: C.fn, animation: "pixelGlitch 5s infinite 0.4s" }}>
                                {lastName.toUpperCase()}
                            </span>
                        </h1>
                        <style>{`
                            @keyframes pixelGlitch {
                                0%, 88%, 100% { transform: none; text-shadow: none; }
                                90% { transform: translateX(-3px); text-shadow: 2px 0 #e06c7566, -2px 0 #61afef55; }
                                91% { transform: translateX(3px);  text-shadow: -2px 0 #e06c7566, 2px 0 #61afef55; }
                                92% { transform: translateX(0);    text-shadow: none; }
                                94% { transform: translateX(-2px) skewX(-1deg); text-shadow: 1px 0 #c678dd44; }
                                96% { transform: none; text-shadow: none; }
                            }
                        `}</style>
                    </div>
                </div>

                <BlockCard accent={C.keyword}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
                        <span style={{ color: C.tag, fontSize: 13, minWidth: 120 }}>role:</span>
                        <TypingEffect roles={roles} />
                    </div>
                    <Row label="status" color={C.special} value='"6th Semester Undergraduate"' />
                    <Row label="location" color={C.string} value={`"${location}"`} />
                    <Row label="available" color={C.special} value={available} />
                </BlockCard>
            </section>

            <section>
                <SectionLabel color={C.fn}>quick navigation</SectionLabel>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {[
                        { label: "projects", path: "/projects", color: C.fn },
                        { label: "about_me", path: "/about-me", color: C.keyword },
                        { label: "resume", path: "/resume", color: C.tag },
                        { label: "contact", path: "/contact", color: C.special }
                    ].map(link => (
                        <div 
                            key={link.label}
                            onClick={() => navigate(link.path)}
                            style={{
                                background: C.bgPanel, border: `1px solid ${C.border}`,
                                borderRadius: 8, padding: "10px 16px", cursor: "pointer",
                                display: "flex", gap: 8, alignItems: "center",
                                transition: "all .15s"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = link.color;
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = C.border;
                                e.currentTarget.style.transform = "";
                            }}
                        >
                            <Tok color={link.color}>import</Tok>
                            <span style={{ color: C.plain }}>{`{ ${link.label} }`}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <SectionLabel color={C.special}>social connections</SectionLabel>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {socialSvgs.map(s => (
                        <a 
                            key={s.label} 
                            href={s.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                width: 50, height: 50, borderRadius: "50%",
                                background: C.bgPanel, border: `1px solid ${C.border}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: C.plain, transition: "all .15s",
                                textDecoration: "none"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = C.keyword;
                                e.currentTarget.style.color = C.keyword;
                                e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = C.border;
                                e.currentTarget.style.color = C.plain;
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                            title={s.label}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d={s.path} />
                            </svg>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingContent;
