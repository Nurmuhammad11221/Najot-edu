// O'qituvchi paneli uchun asosiy tartib komponenti
import { Outlet } from "react-router-dom";
import { useState } from "react";
import TeacherHeader from "./TeacherHeader";
import TeacherSidebar from "./TeacherSidebar";

export default function TeacherLayout() {
  // Yon panel holatlari
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSidebarSmall, setIsSidebarSmall] = useState(false);

  // Qora fon bosilganda
  function qoraFonBosildi() {
    setShowMobileSidebar(false);
  }

  // Asosiy tartib sinfi
  const asosiyTartibSinfi = "relative flex h-screen bg-gray-100 overflow-hidden";

  return (
    <div className={asosiyTartibSinfi}>
      {showMobileSidebar ? (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={qoraFonBosildi}
        />
      ) : null}

      <TeacherSidebar
        collapsed={isSidebarSmall}
        setCollapsed={setIsSidebarSmall}
        mobileOpen={showMobileSidebar}
        setMobileOpen={setShowMobileSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TeacherHeader setMobileOpen={setShowMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
