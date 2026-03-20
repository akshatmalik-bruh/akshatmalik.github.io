import { COLORS as C } from "../../constants/theme";
import { SectionLabel, BlockCard, Row, Paragraph } from "../../components/Portfolio/UI";
import Tok from "../../components/VSCode/Tok";

const AboutMe = () => {
    const education = [
        { level: "College", school: "BIT Mesra Ranchi", desc: "B.Tech in CSE", score: "8.18/10 GPA" },
        { level: "Class 12th", school: "MIET Public School", desc: "PCM", score: "91.8%" },
        { level: "Class 10th", school: "MIET Public School", score: "95.4%" }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <section>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{
                        fontSize: "clamp(48px, 10vw, 84px)",
                        fontWeight: 900,
                        lineHeight: 0.9,
                        margin: 0,
                        letterSpacing: "-0.04em",
                        color: C.keyword,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
                    }}>
                        ABOUT<br />
                        <span style={{ color: C.fn }}>ME</span>
                    </h1>
                </div>

                <div style={{ fontSize: "clamp(18px, 2.5vw, 22px)", lineHeight: 1.6, color: C.plain, marginBottom: 12 }}>
                    Hi! I'm <Tok color={C.keyword} bold>Akshat</Tok>, a software developer living at the crossroads of
                    <Tok color={C.fn}> backend engineering</Tok>,
                    <Tok color={C.string}> frontend engineering</Tok>, and using
                    <Tok color={C.special}> Generative AI</Tok>.
                </div>
                <Paragraph style={{ marginTop: 16 }}>
                    I love building systems that are not just functional but genuinely intelligent and scalable.
                    Currently in 6th semester at <Tok color={C.type}>BIT Mesra Ranchi</Tok>.
                </Paragraph>
            </section>

            <section>
                <SectionLabel color={C.fn}>quick facts</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                    {education.map((edu, idx) => (
                        <div key={idx} style={{
                            width: "100%", background: C.bgPanel, border: `1px solid ${C.border}`,
                            borderRadius: 10, padding: "16px 20px", display: "flex",
                            justifyContent: "space-between", alignItems: "center",
                            gap: 16, flexWrap: "wrap",
                            transition: "all .15s"
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = C.fn}
                            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 200 }}>
                                <div style={{ fontSize: 11, color: C.comment, textTransform: "uppercase" }}>{edu.level}</div>
                                <div style={{ fontWeight: 700, fontSize: "clamp(14px, 2vw, 18px)", color: C.plain }}>{edu.school}</div>
                                {edu.desc && <div style={{ fontSize: 12, color: C.type }}>{edu.desc}</div>}
                            </div>
                            <div style={{ fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 800, color: C.string }}>{edu.score}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <SectionLabel color={C.keyword}>good at</SectionLabel>
                <BlockCard accent={C.keyword}>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            "Developing scalable backends",
                            "Pixel-perfect frontends",
                            "Integrating LLM and utilising its powers in the website",
                            "Currently diving into the RAG architecture"
                        ].map((skill, idx) => (
                            <li key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <Tok color={C.keyword}>→</Tok>
                                <span style={{ color: C.plain, fontSize: 16 }}>{skill}</span>
                            </li>
                        ))}
                    </ul>
                </BlockCard>
            </section>
        </div>
    );
};

export default AboutMe;
