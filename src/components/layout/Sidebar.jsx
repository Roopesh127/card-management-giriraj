import {
  Home,
  CreditCard,
  ArrowLeftRight,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: CreditCard, label: "Cards", id: "cards", active: true },
  { icon: ArrowLeftRight, label: "Transactions", id: "transactions" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 237,
        minHeight: "100vh",
        background: "#0c3b5d",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        color: "white",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        style={{
          padding: "22px 22px 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: "#27b3e2",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
              <path
                d="M8 30 L20 12 L32 30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M12 23 L20 17 L28 23"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 0.4,
              }}
            >
              GIRIRAJ{" "}
              <span style={{ fontWeight: 400, opacity: 0.9 }}>
                DIGITAL
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: "bold",
            lineHeight: 1.5,
            opacity: 0.9,
            paddingLeft: 44,
          }}
        >
          Software & Web Development
          <br />
          Company - Umbraco Gold Partner
        </div>
      </div>
      <div
        style={{
          padding: "12px 22px",
          flex: 1,
        }}
      >
        {navItems.map(({ icon: Icon, label, id, active }) => (
          <div
            key={id}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div
              style={{
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon
                  size={14}
                  color={active ? "#20b8e5" : "white"}
                />

                <span
                  style={{
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#20b8e5" : "white",
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Right Arrow */}
              {active && (
                <ChevronRight
                  size={14}
                  color="#20b8e5"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "20px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 12,
            opacity: 0.95,
          }}
        >
          <LogOut size={14} />
          Logout
        </div>
      </div>
    </aside>
  );
}
