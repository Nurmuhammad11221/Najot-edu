// Talaba paneli uchun asosiy tartib
import StudentHeader from "./StudentHeader";
import StudentSidebar from "./StudentSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  // Holat boshqaruvi
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSidebarSmall, setIsSidebarSmall] = useState(false);

  // Mobil fonni yopish funksiyasi
  const mobilFonYopish = () => setShowMobileSidebar(false);

  // Asosiy konteyner sinfi
  const konteynerSinfi = "relative flex h-screen bg-gray-100 overflow-hidden";

  return (
    <div className={konteynerSinfi}>
      {showMobileSidebar ? (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={mobilFonYopish}
        />
      ) : null}

      <StudentSidebar
        collapsed={isSidebarSmall}
        setCollapsed={setIsSidebarSmall}
        mobileOpen={showMobileSidebar}
        setMobileOpen={setShowMobileSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader setMobileOpen={setShowMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
