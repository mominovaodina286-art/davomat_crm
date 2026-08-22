import { useState, useEffect } from "react";
import {
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  Sun,
  Moon,
  QrCode,
  Send,
  Download,
  UserPlus,
  BellRing,
} from "lucide-react";
import { BRANCHES } from "../data/studentsData";
import { exportToCSV } from "../utils/helpers";

export default function Navbar({
  darkMode,
  setDarkMode,
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

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200 bg-slate-900/90 border-slate-800 text-slate-100 dark:bg-slate-950/90 dark:border-slate-800">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/25 ring-2 ring-brand-400/20">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  EduSmart CRM
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full">
                  v3.4 PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                O'quv binosi davomati & to'lovlar monitoringi
              </p>
            </div>
          </div>

          {/* Branch & Live Date/Time */}
          <div className="hidden xl:flex items-center gap-6 bg-slate-800/60 dark:bg-slate-900/70 border border-slate-700/60 rounded-2xl px-4 py-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Building2 className="w-4 h-4 text-brand-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent border-0 text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-2"
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

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Absent Notification Badge Quick Trigger */}
            {totalAbsent > 0 && (
              <button
                onClick={onOpenAbsentSms}
                title="Kelmaganlarning ota-onalariga SMS xabar yuborish"
                className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all shadow-sm"
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
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <QrCode className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline">Turniket / Skaner</span>
            </button>

            {/* SMS Dispatcher */}
            <button
              onClick={onOpenSmsModal}
              className="flex items-center gap-2 px-3.5 py-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
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
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Filtr bo'yicha yuklab olish"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Eksport</span>
            </button>

            {/* Add Student */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Yangi O'quvchi</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
