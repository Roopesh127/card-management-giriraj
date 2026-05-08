import { maskCardNumber } from "../../utils/cardValidators";
import { Lock, Archive, Check } from "lucide-react";

export default function CardItem({ card, showNumber }) {
  const isDisabled = card.isLocked || card.isArchived;
  const displayNumber = showNumber
    ? card.cardNumber.replace(/(.{4})/g, "$1 ").trim()
    : maskCardNumber(card.cardNumber);

  return (
    <div
      style={{
        // background: isDisabled
        //   ? "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)"
        //   : card.isDefault
        //     ? "linear-gradient(135deg, #87ceeb 0%, #00bfff 100%)"
        //     : "linear-gradient(135deg, #1a3a6e 0%, #1565c0 50%, #0d47a1 100%)",

        background: isDisabled
          ? "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)"
          : card.isDefault || card.isGPay
            ? "#0096FF"
            : "linear-gradient(135deg, #1a3a6e 0%, #1565c0 50%, #0d47a1 100%)",

        borderRadius: 16,
        padding: "20px 24px",
        minHeight: 170,
        position: "relative",
        overflow: "hidden",
        color: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {card.isLocked && (
            <div
              style={{
                padding: "3px 8px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
              }}
            >
              <Lock size={11} />
            </div>
          )}
          {card.isArchived && (
            <div
              style={{
                padding: "3px 8px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
              }}
            >
              <Archive size={11} />
            </div>
          )}
          {card.isDefault && !isDisabled && (
            <div
              style={{
                padding: "3px 8px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
              }}
            >
              <Check size={11} />
            </div>
          )}
          {card.isGPay && (
            <div
              style={{
                background: "white",
                borderRadius: 2,
                padding: "2px 8px",
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span style={{ color: "#4285f4", fontWeight: 800, fontSize: 11 }}>
                G
              </span>
              <span style={{ color: "#555", fontSize: 10, fontWeight: 700 }}>
                Pay
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="18" height="12" viewBox="0 0 18 12">
            <circle cx="6" cy="6" r="5.5" fill="#EB001B" opacity="0.9" />
            <circle cx="12" cy="6" r="5.5" fill="#F79E1B" opacity="0.9" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
            {card.bankName}
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 10,
          letterSpacing: 0.5,
        }}
      >
        {card.name}
      </div>
      <div
        style={{
          fontSize: 14,
          letterSpacing: 2,
          marginBottom: 14,
          fontFamily: "monospace",
        }}
      >
        {displayNumber}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>
              Valid Till
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>
              {card.validTill.replace("/20", "/")}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>
              CVV
            </div>
            <div style={{ fontSize: 13, letterSpacing: 3 }}>•••</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#EB001B",
              opacity: 0.95,
            }}
          />
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#F79E1B",
              marginLeft: -13,
              opacity: 0.95,
            }}
          />
        </div>
      </div>
    </div>
  );
}
