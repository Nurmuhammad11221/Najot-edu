// O'qituvchi yon paneli — guruhlar va profil navigatsiyasi
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LayersIcon from "@mui/icons-material/Layers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import GroupsIcon from "@mui/icons-material/Groups";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Guruh ichki navigatsiya elementlari
const GURUH_BOLALARI = [
  { icon: <GroupsIcon sx={{ fontSize: 18 }} />, labelKey: "nav.groups", path: "/teacher" },
  {
    icon: <HourglassEmptyIcon sx={{ fontSize: 18 }} />,
    labelKey: "tp.collecting",
    path: "/teacher/collecting",
  },
];

export default function TeacherSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const sahifaYonaltirish = useNavigate();
  const joriyManzil = useLocation();
  const { t } = useLanguage();
  const [guruhlarOchiq, setGuruhlarOchiq] = useState(true);

  // Faollik tekshirish funksiyasi
  const faolMi = (tekshirYol) => {
    if (tekshirYol === "/teacher") {
      return (
        joriyManzil.pathname === "/teacher" ||
        joriyManzil.pathname.startsWith("/teacher/groups")
      );
    }
    return joriyManzil.pathname === tekshirYol || joriyManzil.pathname.startsWith(tekshirYol + "/");
  };

  const birontaBolaMi = GURUH_BOLALARI.some((bola) => faolMi(bola.path));

  // Sahifaga o'tish
  const sahifagaOt = (yonaltirYol) => {
    setMobileOpen(false);
    sahifaYonaltirish(yonaltirYol);
  };

  // Yiqilish/kengaytirish
  function yonPanelAlmashtir() {
    setCollapsed(!collapsed);
  }

  // Guruhlar sarlavha bosilganda
  function guruhlarSarlavhaBosildi() {
    if (collapsed) {
      sahifagaOt("/teacher");
    } else {
      setGuruhlarOchiq(function (oldingi) { return !oldingi; });
    }
  }

  // Umumiy sinf o'zgaruvchilari
  const yonPanelSinfi = `flex flex-col bg-white border-r border-gray-200 transition-all duration-300
        fixed inset-y-0 left-0 z-30 md:relative md:z-auto
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`;

  const faolSinfi = "bg-violet-600 text-white shadow-sm";
  const oddiySinfi = "text-gray-500 hover:bg-violet-50 hover:text-violet-700";
  const profilOddiySinfi = "text-gray-600 hover:bg-violet-50 hover:text-violet-700";

  return (
    <aside
      className={yonPanelSinfi}
      style={{ width: collapsed ? 64 : 230 }}
    >
      {/* Logotip */}
      <div className="flex items-center gap-2.5 px-4 py-[14px] border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0 shadow">
          <span className="text-white text-sm font-extrabold">E</span>
        </div>
        {collapsed ? null : (
          <span className="font-extrabold text-violet-700 text-[15px] tracking-wide">
            NajotEdu
          </span>
        )}
      </div>

      {/* Kengaytirish tugmasi */}
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

      {/* Navigatsiya */}
      <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {/* Guruhlar (ochiluvchi bo'lim) */}
        <button
          onClick={guruhlarSarlavhaBosildi}
          title={collapsed ? t("nav.groups") : undefined}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left
            transition-all duration-150 cursor-pointer
            ${birontaBolaMi
              ? "text-violet-700"
              : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
            }`}
        >
          <span className="shrink-0">
            <LayersIcon fontSize="small" />
          </span>
          {collapsed ? null : (
            <>
              <span className="text-[13px] font-bold flex-1">{t("nav.groups")}</span>
              <ExpandMoreIcon
                sx={{
                  fontSize: 18,
                  transform: guruhlarOchiq ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </>
          )}
        </button>

        {/* Ichki elementlar */}
        {!collapsed && guruhlarOchiq ? (
          <div className="flex flex-col gap-0.5 pl-3">
            {GURUH_BOLALARI.map(function (bolaBandi) {
              return (
                <button
                  key={bolaBandi.path}
                  onClick={function () { sahifagaOt(bolaBandi.path); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl w-full text-left
                    transition-all duration-150 cursor-pointer
                    ${faolMi(bolaBandi.path) ? faolSinfi : oddiySinfi}`}
                >
                  <span className="shrink-0">{bolaBandi.icon}</span>
                  <span className="text-[13px] font-semibold">{t(bolaBandi.labelKey)}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Profil sahifasi */}
        <button
          onClick={function () { sahifagaOt("/teacher/profile"); }}
          title={collapsed ? t("tp.profile") : undefined}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full text-left
            transition-all duration-150 cursor-pointer mt-1
            ${faolMi("/teacher/profile") ? faolSinfi : profilOddiySinfi}`}
        >
          <span className="shrink-0">
            <PersonIcon fontSize="small" />
          </span>
          {collapsed ? null : (
            <span className="text-[13px] font-semibold">{t("tp.profile")}</span>
          )}
        </button>
      </nav>
    </aside>
  );
}
