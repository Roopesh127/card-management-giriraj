import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, XCircle, X } from "lucide-react";
import { removeToast } from "../../features/toast/toastSlice";

export default function ToastContainer() {
  const toasts = useSelector((s) => s.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 8,
            minWidth: 280,
            background: toast.type === "success" ? "#e8f5e9" : "#ffebee",
            border: `1px solid ${toast.type === "success" ? "#a5d6a7" : "#ef9a9a"}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            animation: "slideIn 0.3s ease",
            color: toast.type === "success" ? "#2e7d32" : "#c62828",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} color="#2e7d32" />
          ) : (
            <XCircle size={18} color="#c62828" />
          )}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => dispatch(removeToast(toast.id))}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
