// Boshqarish menyusi — yon paneldan ochiladi
import { useLanguage } from "../contexts/LanguageContext";
import { BOSHQARISH_MENU } from "../constants/nav.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function BoshqarishMenu({
  menuOpen,
  setMenuOpen,
  collapsed,
  mobileOpen,
  menuRef,
}) {
  const sahifaNavigatsiya = useNavigate();
  const joriyManzil = useLocation();
  const { t } = useLanguage();

  const [kattaEkranMi, setKattaEkranMi] = useState(window.innerWidth >= 768);

  // Ekran o'lchamini kuzatish
  useEffect(function () {
    function ekranTekshir() {
      setKattaEkranMi(window.innerWidth >= 768);
    }
    window.addEventListener("resize", ekranTekshir);
    return function () {
      window.removeEventListener("resize", ekranTekshir);
    };
  }, []);

  // Chap pozitsiya hisobi
  function chapPozitsiyaHisoblash() {
    if (kattaEkranMi) {
      return collapsed ? 64 : 210;
    }
    if (mobileOpen) {
      return collapsed ? 64 : 210;
    }
    return 0;
  }

  const chapPozitsiya = chapPozitsiyaHisoblash();

  // Menyuni yopish
  function menyuniYopish() {
    setMenuOpen(false);
  }

  // Element bosilganda
  function elementBosilganda(elementYoli) {
    sahifaNavigatsiya(elementYoli);
    setMenuOpen(false);
  }

  // Faollik sinfini aniqlash
  function faollikSinfi(joriyYol) {
    const faolMi = joriyManzil.pathname === joriyYol;
    return faolMi ? "bg-violet-50" : "hover:bg-violet-50";
  }

  function matnFaollikSinfi(joriyYol) {
    const faolMi = joriyManzil.pathname === joriyYol;
    return faolMi ? "text-violet-700" : "text-gray-700 group-hover:text-violet-700";
  }

  function ikonkaFaollikSinfi(joriyYol) {
    const faolMi = joriyManzil.pathname === joriyYol;
    return faolMi ? "text-violet-600" : "text-gray-400 group-hover:text-violet-500";
  }

  // Menyu animatsiya uslublari
  const menyuUslubi = {
    left: chapPozitsiya,
    width: 260,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    boxShadow: "6px 0 40px rgba(0,0,0,0.13)",
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? "translateX(0)" : "translateX(-30px)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: menuOpen ? "auto" : "none",
  };

  return (
    <div
      ref={menuRef}
      className="fixed top-0 bottom-0 bg-white z-50 flex flex-col"
      style={menyuUslubi}
    >
      {/* Sarlavha */}
      <div className="flex items-center gap-3 px-4 py-5">
        <button
          onClick={menyuniYopish}
          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-violet-600 hover:bg-violet-700 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <ChevronLeftIcon sx={{ fontSize: 24, color: "#fff" }} />
        </button>
        <span className="text-[20px] font-bold text-gray-800">Menu</span>
      </div>

      <div className="mx-4 h-px bg-gray-100 mb-3" />

      {/* Menyu elementlari */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto">
        {BOSHQARISH_MENU.map(function (menyuBandi, tartibRaqam) {
          return (
            <button
              key={tartibRaqam}
              onClick={function () { elementBosilganda(menyuBandi.path); }}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left
                         transition-colors duration-150 cursor-pointer mb-1
                         ${faollikSinfi(menyuBandi.path)}`}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 shrink-0 ${ikonkaFaollikSinfi(menyuBandi.path)}`}
              >
                {menyuBandi.icon}
              </span>
              <span
                className={`text-[15px] font-semibold leading-none ${matnFaollikSinfi(menyuBandi.path)}`}
              >
                {t(menyuBandi.labelKey)}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
