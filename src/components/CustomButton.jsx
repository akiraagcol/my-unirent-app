export default function CustomButton({ title, onClick, type="primary", style, textStyle, disabled }) {
  const isPrimary = type === "primary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 50,
        borderRadius: 25,
        width: "100%",
        margin: "8px 0",
        border: "none",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        background: isPrimary ? "var(--secondary)" : "var(--primary)",
        color: "var(--white)",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span style={{ fontSize: 16, ...textStyle }}>{title}</span>
    </button>
  );
}
