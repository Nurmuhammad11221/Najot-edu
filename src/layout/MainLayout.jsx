// Asosiy sahifa tartibi — admin panel uchun
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import BoshqarishMenu from "./BoshqarishMenu";

export default function MainLayout() {
  // Holat o'zgaruvchilari
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSidebarSmall, setIsSidebarSmall] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const boshqarishRef = useRef(null);
  const menuRef = useRef(null);

  // Tashqi bosilganda menyuni yopish
  useEffect(function () {
    function tashqiBosilganTekshir(evt) {
      const ichkiMenu = menuRef.current?.contains(evt.target);
      const ichkiTugma = boshqarishRef.current?.contains(evt.target);
      if (!ichkiMenu && !ichkiTugma) setIsMenuVisible(false);
    }
    document.addEventListener("mousedown", tashqiBosilganTekshir);
    return function () {
      document.removeEventListener("mousedown", tashqiBosilganTekshir);
    };
  }, []);

  // Mobil fonni yopish uchun
  function mobilFonniYopish() {
    setShowMobileSidebar(false);
  }

  // Menyu fonini yopish
  function menuFonniYopish() {
    setIsMenuVisible(false);
  }

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      {showMobileSidebar ? (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={mobilFonniYopish}
        />
      ) : null}

      <Sidebar
        collapsed={isSidebarSmall}
        setCollapsed={setIsSidebarSmall}
        menuOpen={isMenuVisible}
        setMenuOpen={setIsMenuVisible}
        mobileOpen={showMobileSidebar}
        setMobileOpen={setShowMobileSidebar}
        boshqarishRef={boshqarishRef}
      />

      {/* Qoraytirilgan fon */}
      {isMenuVisible ? (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={menuFonniYopish}
        />
      ) : null}

      <BoshqarishMenu
        menuOpen={isMenuVisible}
        setMenuOpen={setIsMenuVisible}
        collapsed={isSidebarSmall}
        mobileOpen={showMobileSidebar}
        menuRef={menuRef}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setMobileOpen={setShowMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
