import { useState, useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ArchiveIcon from "@mui/icons-material/Archive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { groupsApi } from "../api/groups";
import { studentsApi } from "../api/students";
import { useLanguage } from "../contexts/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();
  
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    students: 0,
    groups: 0,
    payments: 0,
    debtors: 0,
    frozen: 0,
    archived: 0,
  });

  useEffect(function () {
    async function loadData() {
      // Talabalarni yuklash
      try {
        const studentRes = await studentsApi.getAll(1, 1000);
        const studentList = Array.isArray(studentRes) ? studentRes : (studentRes?.data || studentRes?.students || []);
        setStatistics((prev) => ({ ...prev, students: studentList.length }));
      } catch (err) {
        console.error(err);
      }

      // Guruhlarni yuklash
      try {
        const groupRes = await groupsApi.getAll();
        const groupList = Array.isArray(groupRes) ? groupRes : (groupRes?.data || groupRes?.groups || []);
        setStatistics((prev) => ({ ...prev, groups: groupList.length }));
      } catch (err) {
        console.error(err);
      }

      // Arxivdagi guruhlarni yuklash
      try {
        const archiveRes = await groupsApi.getArchive();
        const archiveList = Array.isArray(archiveRes) ? archiveRes : (archiveRes?.data || archiveRes?.groups || []);
        setStatistics((prev) => ({ ...prev, archived: archiveList.length }));
      } catch (err) {
        console.error(err);
      }
    }
    
    loadData();
  }, []);

  const statCards = [
    {
      icon: <SchoolIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.active_students",
      count: statistics.students,
    },
    {
      icon: <GroupsIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.groups",
      count: statistics.groups,
    },
    {
      icon: <CreditCardIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.payments_month",
      count: statistics.payments,
    },
    {
      icon: <WarningAmberIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.debtors",
      count: statistics.debtors,
    },
    {
      icon: <AcUnitIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.frozen",
      count: statistics.frozen,
    },
    {
      icon: <ArchiveIcon sx={{ color: "#7C3AED", fontSize: 28 }} />,
      labelKey: "dashboard.archived",
      count: statistics.archived,
    },
  ];

  function toggleSchedule() {
    setIsScheduleOpen(!isScheduleOpen);
  }

  const currentUser = localStorage.getItem("user_name") ? localStorage.getItem("user_name") : "foydalanuvchi";

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-0.5">
          Xush kelibsiz, {currentUser}!
        </h1>
        <p className="text-sm text-gray-400">{t("dashboard.welcome")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map(function (statItem, index) {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5
                         flex flex-col items-center gap-2
                         transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-violet-100"
            >
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center mb-1">
                {statItem.icon}
              </div>
              <span className="text-[12px] text-gray-400 font-medium text-center">
                {t(statItem.labelKey)}
              </span>
              <span className="text-3xl font-extrabold text-gray-800">
                {statItem.count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={toggleSchedule}
          className="w-full flex items-center justify-between px-5 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <span>{t("dashboard.schedule")}</span>
          {isScheduleOpen ? (
            <ExpandLessIcon sx={{ color: "#7C3AED" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#9CA3AF" }} />
          )}
        </button>
        {isScheduleOpen ? (
          <div className="px-5 py-8 text-sm text-gray-400 text-center border-t border-gray-50">
            {t("dashboard.no_schedule")}
          </div>
        ) : null}
      </div>
    </>
  );
}
