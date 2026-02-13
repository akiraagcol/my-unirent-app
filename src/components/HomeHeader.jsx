import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "microcontrollers", label: "Microcontrollers" },
  { id: "sbc", label: "Single-board" },
  { id: "sensors", label: "Sensors" },
  { id: "modules", label: "Modules" },
  { id: "power", label: "Power" },
];

export default function HomeHeader({ onQueryChange, onCategoryChange }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const handleSetQuery = (text) => {
    setQuery(text);
    onQueryChange(text);
  };

  const handleSetCategory = (catId) => {
    setActiveCat(catId);
    onCategoryChange(catId);
  };

  return (
    <section style={{ marginBottom: 14 }}>
      <div
        style={{
          marginTop: 12,
          marginBottom: 12,
          height: 44,
          borderRadius: 22,
          padding: "0 14px",
          background: "#F3F4F6",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: "var(--textSecondary)" }}>🔎</span>
        <input
          value={query}
          onChange={(e)=>handleSetQuery(e.target.value)}
          placeholder="Search devices"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom: 10 }}>
        {CATEGORIES.map(cat => {
          const active = activeCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={()=>handleSetCategory(cat.id)}
              style={{
                whiteSpace: "nowrap",
                padding: "10px 16px",
                borderRadius: 20,
                border: "1.5px solid #FDB022",
                background: active ? "#FDB022" : "#FFF6DB",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
