import { Menu, User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header
      style={{
        height: 60,
        background: "white",
        borderBottom: "1px solid #e8ecf0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Menu size={20} color="#555" style={{ cursor: "pointer" }} />
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "rgb(41, 187, 206)",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Cards
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          padding: "6px 12px",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#63cece",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={16} color="white" />
        </div>
        <ChevronDown size={14} color="#666" />
      </div>
    </header>
  );
}
