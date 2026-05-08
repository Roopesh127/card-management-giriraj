import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import CardPage from "./components/cards/CardPage";
import ToastContainer from "./components/ui/ToastContainer";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <Sidebar />
      <div
        style={{
          marginLeft: 240,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>
          <CardPage />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
