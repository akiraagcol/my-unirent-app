export default function CustomInput({
  label, placeholder, value, onChange,
  type="text", containerStyle, inputStyle
}) {
  return (
    <div style={{ marginBottom: 16, width: "100%", ...containerStyle }}>
      {label ? (
        <label style={{ display:"block", fontSize:14, fontWeight:600, marginBottom:6 }}>
          {label}
        </label>
      ) : null}

      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        style={{
          height: 50,
          width: "100%",
          borderRadius: 12,
          padding: "0 16px",
          border: "1px solid var(--border)",
          background: "#F3F4F6",
          fontSize: 14,
          outline: "none",
          ...inputStyle,
        }}
      />
    </div>
  );
}
