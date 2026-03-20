import { COLORS as C } from "../../constants/theme";
import { SectionLabel, BlockCard, Paragraph, Row } from "../../components/Portfolio/UI";
import Tok from "../../components/VSCode/Tok";

const Publication = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 40 }}>
            {/* Header Section */}
            <section>
                <div style={{ marginBottom: 24 }}>
                    <h1 style={{
                        fontSize: "clamp(32px, 6vw, 56px)",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        margin: 0,
                        letterSpacing: "-0.03em",
                        color: C.keyword,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
                    }}>
                        RESEARCH<br />
                        <span style={{ color: C.fn }}>PUBLICATION</span>
                    </h1>
                </div>

                <div style={{
                    fontSize: "clamp(16px, 2.2vw, 20px)",
                    lineHeight: 1.5,
                    color: C.plain,
                    fontWeight: 700,
                    borderLeft: `4px solid ${C.keyword}`,
                    paddingLeft: 20,
                    marginTop: 20,
                    marginBottom: 20
                }}>
                    Youth standpoints on Food Wastage At Indian Weddings
                </div>
            </section>

            {/* Abstract / Purpose */}
            <section>
                <SectionLabel color={C.fn}>abstract / purpose</SectionLabel>
                <BlockCard accent={C.fn}>
                    <Paragraph>
                        The purpose of this study was to investigate <Tok color={C.string}>youth awareness</Tok>,
                        attitudes, and behavioral intentions regarding food waste at traditional Indian weddings.
                        These celebrations are a significant cultural factor contributing to
                        <Tok color={C.keyword}>food loss in the nation</Tok>, requiring a shift in large-scale social consumption patterns.
                    </Paragraph>
                </BlockCard>
            </section>

            {/* Proposed Solution */}
            <section>
                <SectionLabel color={C.special}>proposed solution</SectionLabel>
                <BlockCard accent={C.special}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ fontSize: 13, color: C.comment, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            // smart_food_distribution_platform
                        </div>
                        <Paragraph>
                            A digital ecosystem designed to facilitate the timely redistribution of surplus food by bridging the gap between:
                        </Paragraph>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <Row label="source" color={C.keyword} value='"Food Donors"' />
                            <Row label="target" color={C.fn} value='"Recipients"' />
                            <Row label="bridge" color={C.string} value='"Logistics Partners"' />
                        </div>
                    </div>
                </BlockCard>
            </section>

            {/* Reflection Paragraph */}
            <section>
                <SectionLabel color={C.type}>key findings</SectionLabel>
                <BlockCard accent={C.type}>
                    <Paragraph>
                        By synthesizing qualitative survey data and socio-economic analysis, the study identifies the
                        <Tok color={C.type}>youth as the primary drivers</Tok> of waste reduction.
                        Through the integration of technology-driven redistribution and community-led awareness programs,
                        Indian weddings can transition from sites of excessive consumption to models of
                        <Tok color={C.keyword}>sustainable social responsibility</Tok>.
                    </Paragraph>
                </BlockCard>
            </section>


            {/* Action Section */}
            <section style={{ textAlign: "center", marginTop: 20 }}>
                <a
                    href="https://drive.google.com/file/d/1FgbL2TuScu7BhsIsuyZh-BFhnWWmKmVC/preview"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        gap: 12, background: C.keyword, color: C.bg,
                        padding: "16px 32px", borderRadius: 10,
                        fontSize: 15, fontWeight: 800, textDecoration: "none",
                        transition: "all .2s cubic-bezier(0.16, 1, 0.3, 1)",
                        boxShadow: `0 8px 16px ${C.keyword}33`,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = `0 12px 24px ${C.keyword}55`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = `0 8px 16px ${C.keyword}33`;
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                    Read Full Publication
                </a>

                <div style={{ marginTop: 20, color: C.comment, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                    external: drive.google.com
                </div>
            </section>
        </div>
    );
};

export default Publication;
