import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
  LineDotRightHorizontal,
  Download,
  Upload,
  Grid2x2,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Ordered Food",
    date: "20th May 2022",
    desc: "Charges applied on credit card",
    amount: -150.5,
  },
  {
    id: 2,
    name: "Ticket Refund",
    date: "20th May 2022",
    desc: "Amount credited on debit card",
    amount: +50.5,
  },
  {
    id: 3,
    name: "Interest credited",
    date: "20th May 2022",
    desc: "Charges applied on credit card",
    amount: +5.5,
  },
  {
    id: 4,
    name: "Electricity bill paid",
    date: "20th May 2022",
    desc: "",
    amount: -1050.5,
  },
];

export default function TransactionsPanel() {
  const [cardOpen, setCardOpen] = useState(true);
  const [txOpen, setTxOpen] = useState(true);

  const sectionStyle = {
    background: "white",
    borderRadius: 10,
    marginBottom: 12,
    border: "1px solid #e8ecf0",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    cursor: "pointer",
    background: "#f9fbfc",
    userSelect: "none",
  };

  return (
    <div style={{ width: 290, flexShrink: 0 }}>
      <div style={sectionStyle}>
        <div style={headerStyle} onClick={() => setCardOpen(!cardOpen)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <Grid2x2 size={14} color="#1565c0" />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#1a2744",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Card Details
            </span>
          </div>
          {cardOpen ? (
            <ChevronUp
              size={16}
              color="rgb(41, 187, 206)"
              style={{
                borderRadius: "50%",
                background: "rgb(228, 238, 238)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
          ) : (
            <ChevronDown
              size={16}
              color="rgb(41, 187, 206)"
              style={{
                borderRadius: "50%",
                background: "rgb(228, 238, 238)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
          )}
        </div>
        {cardOpen && (
          <div style={{ padding: "12px 16px" }}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#888",
                fontFamily: "'Nunito', sans-serif",
                lineHeight: 1.5,
              }}
            >
              Manage your saved cards — lock, archive, set defaults and more.
            </p>
          </div>
        )}
      </div>

      {/* ── Today's Transactions Section ── */}
      <div style={sectionStyle}>
        <div style={headerStyle} onClick={() => setTxOpen(!txOpen)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <LineDotRightHorizontal size={14} color="#1565c0" />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#1a2744",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Today's Transactions
            </span>
          </div>
          {txOpen ? (
            <ChevronUp
              size={16}
              color="rgb(41, 187, 206)"
              style={{
                borderRadius: "50%",
                background: "rgb(228, 238, 238)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
          ) : (
            <ChevronDown
              size={16}
              color="rgb(41, 187, 206)"
              style={{
                borderRadius: "50%",
                background: "rgb(228, 238, 238)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
          )}
        </div>

        {txOpen && (
          <div>
            {transactions.map((tx, i) => (
              <div
                key={tx.id}
                style={{
                  padding: "10px 16px",
                  borderTop: i > 0 ? "1px solid rgb(41, 187, 206)" : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgb(228, 238, 238)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {tx.amount > 0 ? (
                    <Download size={16} color="rgb(41, 187, 206)" />
                  ) : (
                    <Upload size={16} color="rgb(41, 187, 206)" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#333",
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      {tx.name}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: tx.amount > 0 ? "#43a047" : "#e53935",
                        fontFamily: "'Nunito', sans-serif",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {tx.amount > 0 ? "+" : ""}$
                      {Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#999" }}>{tx.date}</div>
                  {tx.desc && (
                    <div style={{ fontSize: 11, color: "#1565c0" }}>
                      {tx.desc}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
