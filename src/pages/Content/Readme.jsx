import { COLORS as C } from "../../constants/theme";
import { Paragraph, BlockCard, Row } from "../../components/Portfolio/UI";
import Tok from "../../components/VSCode/Tok";

const Readme = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ color: C.heading, fontSize: 22, fontWeight: 700 }}># portfolio.dev 🚀</div>
        <Paragraph>
            Welcome to my portfolio source. Built with love, caffeine, and questionable commit messages.
        </Paragraph>
        <div style={{ color: C.type, fontSize: 16, fontWeight: 600 }}>## Stack</div>
        <BlockCard accent={C.comment}>
            <Row label="framework" color={C.string} value='"Next.js 14 + TypeScript"' />
            <Row label="styling" color={C.string} value='"Tailwind CSS"' />
            <Row label="3d" color={C.string} value='"Three.js + React Three Fiber"' />
            <Row label="deploy" color={C.string} value='"Vercel"' />
        </BlockCard>
        <div style={{ color: C.type, fontSize: 16, fontWeight: 600 }}>## Quick start</div>
        <div style={{
            background: C.bgSidebar, borderRadius: 8,
            border: `1px solid ${C.border}`, padding: "14px 16px",
            fontFamily: "monospace", fontSize: 13,
        }}>
            {["git clone https://github.com/arjunsharma/portfolio",
                "cd portfolio",
                "npm install",
                "npm run dev"].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 3 ? 6 : 0 }}>
                        <Tok color={C.special}>$</Tok>
                        <Tok color={C.plain}>{line}</Tok>
                    </div>
                ))}
        </div>
        <div style={{ color: C.comment, fontSize: 12 }}>MIT © 2025 Akshat Malik</div>
    </div>
);

export default Readme;
