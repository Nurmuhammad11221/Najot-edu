// Talaba yon paneli — navigatsiya elementlari
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLanguage } from "../contexts/LanguageContext";
import { STUDENT_NAV } from "../constants/studentNav.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function StudentSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const sahifaYonaltirish = useNavigate();
  const joriyManzil = useLocation();
  const { t } = useLanguage();

  // Faollik tekshiruvi
  const faolMi = function (tekshirYol) {
    if (tekshirYol === "/student") return joriyManzil.pathname === "/student";
    return (
      joriyManzil.pathname === tekshirYol ||
      joriyManzil.pathname.startsWith(tekshirYol + "/")
    );
  };

  // Kengaytirish/qisqartirish tugmasi
  function yonPanelAlmashtir() {
    setCollapsed(!collapsed);
  }

  // Element bosilganda
  function sahifagaOtish(elementYoli) {
    setMobileOpen(false);
    sahifaYonaltirish(elementYoli);
  }

  // Umumiy tugma sinflari
  const tugmaBazaSinfi = "flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left transition-all duration-150 cursor-pointer";
  const faolSinfi = "bg-violet-600 text-white shadow-sm";
  const oddiySinfi = "text-gray-500 hover:bg-violet-50 hover:text-violet-700";

  // Aside sinfi
  const yonPanelSinfi = `flex flex-col bg-white border-r border-gray-200 transition-all duration-300
        fixed inset-y-0 left-0 z-30 md:relative md:z-auto
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`;

  return (
    <aside
      className={yonPanelSinfi}
      style={{ width: collapsed ? 64 : 210 }}
    >
      {/* Logotip qismi */}
      <div className="flex items-center gap-2.5 px-4 py-[14px] border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0 shadow">
          <span className="text-white text-sm font-extrabold">E</span>
        </div>
        {collapsed ? null : (
          <span className="font-extrabold text-violet-700 text-[15px] tracking-wide">
            Najot-edu
          </span>
        )}
      </div>

      {/* Yiqilish tugmasi */}
      <button
        onClick={yonPanelAlmashtir}
        className="absolute -right-3 top-4.5 z-10 w-6 h-6 bg-white border border-gray-200
                   rounded-full flex items-center justify-center shadow-sm
                   hover:bg-violet-50 transition-colors cursor-pointer"
      >
        {collapsed ? (
          <ChevronRightIcon sx={{ fontSize: 13, color: "#7C3AED" }} />
        ) : (
          <ChevronLeftIcon sx={{ fontSize: 13, color: "#7C3AED" }} />
        )}
      </button>

      {/* Navigatsiya ro'yxati */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {STUDENT_NAV.map(function (navBandi, tartibRaqam) {
          const bandFaolMi = faolMi(navBandi.path);
          return (
            <button
              key={tartibRaqam}
              onClick={function () { sahifagaOtish(navBandi.path); }}
              title={collapsed ? t(navBandi.labelKey) : undefined}
              className={`${tugmaBazaSinfi} ${bandFaolMi ? faolSinfi : oddiySinfi}`}
            >
              <span className="shrink-0">{navBandi.icon}</span>
              {collapsed ? null : (
                <span className="text-[13px] font-semibold">{t(navBandi.labelKey)}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
