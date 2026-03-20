import { COLORS as C } from "../../constants/theme";
import { SKILLS_DATA, OTHER_SKILLS } from "../../constants/resumeData";
import { SectionLabel, BlockCard } from "../../components/Portfolio/UI";

const SkillItem = ({ name, pct, color }) => (
    <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "flex-end" }}>
            <span style={{ fontSize: 14, color: C.plain, fontWeight: 600 }}>{name}</span>
            <span style={{ fontSize: 12, color: C.comment, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
        </div>
        <div style={{ height: 6, width: "100%", background: C.bgSidebar, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <div style={{ 
                height: "100%", 
                width: `${pct}%`, 
                background: `linear-gradient(90deg, ${color}88, ${color})`,
                borderRadius: 10,
                boxShadow: `0 0 15px ${color}33`,
                transition: "width 1s ease-out"
            }} />
        </div>
    </div>
);

const Skills = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 48, maxWidth: 800 }}>
            {SKILLS_DATA.map((group) => (
                <section key={group.label}>
                    <SectionLabel color={group.color}>
                        {group.label.replace(/_/g, " ")}
                    </SectionLabel>
                    <BlockCard accent={group.color}>
                        <div style={{ padding: "10px 0" }}>
                            {group.skills.map(skill => (
                                <SkillItem 
                                    key={skill.name} 
                                    name={skill.name} 
                                    pct={skill.pct} 
                                    color={group.color} 
                                />
                            ))}
                        </div>
                    </BlockCard>
                </section>
            ))}

            <section>
                <SectionLabel color={C.keyword}>other essential skills</SectionLabel>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                    {OTHER_SKILLS.map(skill => (
                        <div key={skill.name} style={{
                            background: C.bgPanel, border: `1px solid ${C.border}`,
                            borderRadius: 8, padding: "14px 18px",
                            display: "flex", alignItems: "center", gap: 12,
                            transition: "all .15s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = C.string}
                        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                        >
                            <div style={{ fontSize: 20 }}>{skill.emoji}</div>
                            <div style={{ color: C.plain, fontWeight: 600, fontSize: 13 }}>{skill.name}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Skills;
