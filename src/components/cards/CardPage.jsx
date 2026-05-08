import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import CardCarousel from "./CardCarousel";
import TransactionsPanel from "./TransactionsPanel";
import AddCardDialog from "./AddCardDialog";

export default function CardPage() {
  const [activeTab, setActiveTab] = useState("saved");
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <div
        style={{
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "#666",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <span style={{ color: "rgb(41, 187, 206)", cursor: "pointer" }}>
          Home
        </span>
        <ChevronRight size={14} />
        <span style={{ color: "#333", fontWeight: 600 }}>Cards</span>
      </div>
      <div
        style={{
          margin: "23px 23px 23px 23px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "white",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "'Nunito', sans-serif",
          boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
        }}
      >
        <div style={{ padding: "0 24px 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              borderBottom: "1px solid rgb(41, 187, 206)",
            }}
          >
            <div style={{ display: "flex" }}>
              {["saved", "gd"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "16px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Nunito', sans-serif",
                    color: activeTab === tab ? "rgb(41, 187, 206)" : "#888",
                    borderBottom:
                      activeTab === tab
                        ? "2px solid rgb(41, 187, 206)"
                        : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {tab === "saved" ? "Saved Cards" : "GD Cards"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDialog(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgb(41, 187, 206)",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
              }}
            >
              <Plus size={16} /> Add Card
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <TransactionsPanel />
            <div style={{ flex: 1, minWidth: 300 }}>
              <CardCarousel cardType="credit" title="Credit Cards" />
              <CardCarousel cardType="debit" title="Debit Cards" />
            </div>
          </div>
        </div>
      </div>
      {showDialog && <AddCardDialog onClose={() => setShowDialog(false)} />}
    </div>
  );
}
