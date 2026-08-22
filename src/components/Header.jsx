import { useState, useEffect } from "react";
import {
  Menu,
  Building2,
  Calendar,
  Clock,
  QrCode,
  Send,
  Download,
  UserPlus,
  BellRing,
} from "lucide-react";
import { BRANCHES } from "../data/studentsData";
import { exportToCSV } from "../utils/helpers";

export default function Header({
  activeTab,
  onToggleMobileSidebar,
  selectedBranch,
  setSelectedBranch,
  onOpenTurnstile,
  onOpenSmsModal,
  onOpenAddModal,
  filteredStudents,
  totalAbsent,
  onOpenAbsentSms,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const getTabTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return {
          title: "Boshqaruv Paneli & Statistika",
          subtitle:
            "O'quv markazining real-time davomat va moliya ko'rsatkichlari",
        };
      case "students":
        return {
          title: "O'quvchilar Bo'limi (860+)",
          subtitle: "Davomat olish, oylik to'lovlar, qidiruv va filtrlash",
        };
      case "teachers":
        return {
          title: "O'qituvchilar Bo'limi",
          subtitle: "Ustozlar ro'yxati, ularning guruhlari va samaradorligi",
        };
      case "groups":
        return {
          title: "Guruhlar va Xonalar Jadvali",
          subtitle: "Yo'nalishlar, dars xonalari bandligi va smenalar",
        };
      case "finance":
        return {
          title: "Moliya & Kassa Tizimi",
          subtitle: "Oylik to'lovlar tushumi, qarzdorlik va kvitansiyalar",
        };
      case "admin":
        return {
          title: "Administrator Paneli",
          subtitle: "Filiallar, xodimlar rollari va tizim xavfsizligi",
        };
      case "settings":
        return {
          title: "Tizim Sozlamalari (Configuration Center)",
          subtitle:
            "Markaz parametrlari, davomat va moliya qoidalari, SMS shlyuz",
        };
      default:
        return {
          title: "EduSmart CRM",
          subtitle: "Davomat va boshqaruv tizimi",
        };
    }
  };

  const currentTabInfo = getTabTitle();

  return (
    <header className="sticky top-0 z-30 w-full border-b backdrop-blur-xl bg-slate-900/90 border-slate-800 text-slate-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                {currentTabInfo.title}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                {currentTabInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Center: Branch Selector & Live Time */}
          <div className="hidden xl:flex items-center gap-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Building2 className="w-4 h-4 text-brand-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent border-0 text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-1"
              >
                <option value="ALL" className="bg-slate-900 text-slate-200">
                  🏢 Barcha Binolar (Markaziy)
                </option>
                {BRANCHES.map((b) => (
                  <option
                    key={b}
                    value={b}
                    className="bg-slate-900 text-slate-200"
                  >
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-4 w-[1px] bg-slate-700"></div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium capitalize">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="h-4 w-[1px] bg-slate-700"></div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Absent Notification Badge Quick Trigger */}
            {totalAbsent > 0 && (
              <button
                onClick={onOpenAbsentSms}
                title="Kelmaganlarning ota-onalariga SMS xabar yuborish"
                className="relative hidden sm:flex items-center gap-2 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                <BellRing className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{totalAbsent} ta Kelmadi</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>
            )}

            {/* Turnstile / QR Code Check-in */}
            <button
              onClick={onOpenTurnstile}
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-semibold transition hover:scale-[1.02] active:scale-[0.98]"
              title="Turniket va QR Skaner"
            >
              <QrCode className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline">Turniket</span>
            </button>

            {/* SMS Dispatcher */}
            <button
              onClick={onOpenSmsModal}
              className="flex items-center gap-2 px-3.5 py-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 rounded-xl text-xs font-semibold transition hover:scale-[1.02] active:scale-[0.98]"
              title="SMS Xabarnoma yuborish"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span className="hidden md:inline">SMS Hub</span>
            </button>

            {/* Export CSV / Excel */}
            <button
              onClick={() =>
                exportToCSV(
                  filteredStudents,
                  `davomat_${new Date().toISOString().slice(0, 10)}.csv`,
                )
              }
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition hover:scale-[1.02] active:scale-[0.98]"
              title="Filtr bo'yicha CSV yuklab olish"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Eksport</span>
            </button>

            {/* Add Student */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-brand-500/25 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Yangi O'quvchi</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
