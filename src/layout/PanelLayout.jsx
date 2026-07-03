// Panel uchun umumiy tartib — O'qituvchi va Talaba uchun
import { useDarkMode } from "../hooks/useDarkMode";
import { removeToken } from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// Umumiy tartib — panel ichidagi sahifalar uchun
export default function PanelLayout({ title }) {
  const { dark, toggle } = useDarkMode();
  const sahifaNavigatsiya = useNavigate();
  const foydalanuvchiIsmi = localStorage.getItem("user_name") || "Foydalanuvchi";

  // Tizimdan chiqish
  const tizimCh = () => {
    removeToken();
    sahifaNavigatsiya("/login");
  };

  // Birinchi harf olish
  const birinchiHarf = foydalanuvchiIsmi[0]?.toUpperCase();

  // Rejim tugmasi sarlavhasi
  const rejimSarlavhasi = dark ? "Yorug' rejim" : "Tungi rejim";

  // Ikonka tanlash
  function rejimIkonkasi() {
    if (dark) {
      return <LightModeIcon fontSize="small" />;
    }
    return <DarkModeIcon fontSize="small" />;
  }

  const logoBgClass = "w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0 shadow";

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Yuqori qism */}
      <header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 md:px-6 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className={logoBgClass}>
            <span className="text-white text-sm font-extrabold">E</span>
          </div>
          <span className="font-bold text-gray-800 text-[15px]">{title}</span>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggle}
            title={rejimSarlavhasi}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 cursor-pointer"
          >
            {rejimIkonkasi()}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold">
              {birinchiHarf}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {foydalanuvchiIsmi}
            </span>
          </div>

          <button
            onClick={tizimCh}
            title="Chiqish"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <LogoutIcon fontSize="small" />
            <span className="hidden sm:block">Chiqish</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
