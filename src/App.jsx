import { useState } from "react";
import Navbar from "./components/Navbar";
import EligibilityModal from "./components/EligibilityModal";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(false);

  const go = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-inter min-h-screen bg-white">
      <Navbar page={page} setPage={go} openModal={() => setModal(true)} />
      {page === "home" && (
        <div className="pt-[72px]">
          <HomePage setPage={go} openModal={() => setModal(true)} />
        </div>
      )}
      {page === "services" && <ServicesPage setPage={go} />}
      {page === "contact" && <ContactPage setPage={go} />}
      <EligibilityModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
