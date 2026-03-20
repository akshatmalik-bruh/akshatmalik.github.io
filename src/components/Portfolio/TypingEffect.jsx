import { useState, useEffect } from "react";
import { COLORS as C } from "../../constants/theme";

const TypingEffect = ({ roles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === roles[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1500);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 150)));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, roles]);

    return (
        <span style={{ color: C.string, fontWeight: 700 }}>
            {`"${roles[index].substring(0, subIndex)}`}
            <span style={{ borderRight: `2px solid ${C.string}`, marginLeft: 2, animation: "blink 1s infinite" }}></span>
            {`"`}
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </span>
    );
};

export default TypingEffect;
