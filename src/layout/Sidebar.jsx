// Yon panel — asosiy navigatsiya
import { useLanguage } from "../contexts/LanguageContext";
import { NAV_ITEMS, BOSHQARISH_MENU } from "../constants/nav.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Sidebar({
  collapsed,
  setCollapsed,
  menuOpen,
  setMenuOpen,
  mobileOpen,
  setMobileOpen,
  boshqarishRef,
}) {
  const sahifaYonaltirish = useNavigate();
  const joriyManzil = useLocation();
  const { t } = useLanguage();

  // Yiqilish tugmasini bosish
  function yonPanelniAlmashtir() {
    setCollapsed(!collapsed);
  }

  // Chiqish tugmasi (Obuna button calls this now)
  function chiqishSahifasi() {
    removeToken();
    sahifaYonaltirish("/login");
  }

  // Navigatsiya elementini bosish
  function navElementiBosish(elementYoli) {
    setMobileOpen(false);
    if (elementYoli === "/settings") {
      setMenuOpen(function (oldingi) { return !oldingi; });
    } else {
      setMenuOpen(false);
      sahifaYonaltirish(elementYoli);
    }
  }

  // Faol elementni aniqlash
  function navFaolClass(element) {
    if (element.path === "/settings") {
      const boshqarishFaol = BOSHQARISH_MENU.some(
        function (menyuElement) { return joriyManzil.pathname === menyuElement.path; }
      );
      return (menuOpen || boshqarishFaol)
        ? "bg-violet-600 text-white shadow-sm"
        : "text-gray-500 hover:bg-violet-50 hover:text-violet-700";
    }
    const sahifaMos = joriyManzil.pathname === element.path ||
      (element.path !== "/dashboard" &&
        joriyManzil.pathname.startsWith(element.path + "/"));
    if (!menuOpen && sahifaMos) {
      return "bg-violet-600 text-white shadow-sm";
    }
    return "text-gray-500 hover:bg-violet-50 hover:text-violet-700";
  }

  // Yon panel kengligi
  const yonPanelKengligi = collapsed ? 64 : 210;

  // Yon panel joylashuv sinfi
  const asideSinfi = `flex flex-col bg-white border-r border-gray-200 transition-all duration-300
        fixed inset-y-0 left-0 z-30 md:relative md:z-auto
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`;

  const tugmaBazaSinfi = "flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left transition-all duration-150 cursor-pointer";

  return (
    <aside
      className={asideSinfi}
      style={{ width: yonPanelKengligi }}
    >
      {/* Logotip */}
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

      {/* Yiqilish tugmasi — menyu ochiq bo'lganda ko'rinmaydi */}
      {menuOpen ? null : (
        <button
          onClick={yonPanelniAlmashtir}
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
      )}

      {/* Navigatsiya ro'yxati */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {NAV_ITEMS.map(function (navElement, indeks) {
          return (
            <button
              key={indeks}
              ref={navElement.path === "/settings" ? boshqarishRef : null}
              onClick={function () { navElementiBosish(navElement.path); }}
              title={collapsed ? t(navElement.labelKey) : undefined}
              className={`${tugmaBazaSinfi} ${navFaolClass(navElement)}`}
            >
              <span className="shrink-0">{navElement.icon}</span>
              {collapsed ? null : (
                <span className="text-[13px] font-semibold">
                  {t(navElement.labelKey)}
                </span>
              )}
            </button>
          );
        })}



      </nav>

      {/* Obuna qutisi */}
      {collapsed ? null : (
        <div className="m-3 rounded-2xl border border-orange-100 bg-orange-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
              <LocalMallIcon sx={{ fontSize: 20, color: "#F97316" }} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-800 leading-tight">
                {t("sidebar.subscription")}
              </p>
              <p className="text-[11px] text-orange-500 font-medium">
                {t("sidebar.expired")}
              </p>
            </div>
          </div>
          <button
            onClick={chiqishSahifasi}
            className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700
                       text-white text-xs font-bold py-2 rounded-xl
                       transition-colors cursor-pointer shadow-sm"
          >
            {t("sidebar.renew")}
          </button>
        </div>
      )}
    </aside>
  );
}
