const Tok = ({ color, children, italic, bold }) => (
    <span style={{
        color, fontStyle: italic ? "italic" : undefined,
        fontWeight: bold ? 600 : undefined,
    }}>{children}</span>
);

export default Tok;
