import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  Send,
  QrCode,
  ShieldCheck,
  Settings,
  Sun,
  Moon,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  darkMode,
  setDarkMode,
  stats,
  onOpenTurnstile,
  onOpenSmsModal,
  onOpenAddModal,
  teachersCount = 11,
  groupsCount = 35,
}) {
  const navItems = [
    {
      id: "dashboard",
      label: "Boshqaruv Paneli",
      icon: LayoutDashboard,
      badge: "Jonli",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "students",
      label: "O'quvchilar Bo'limi",
      icon: Users,
      badge: `${stats.total}`,
      badgeColor: "bg-brand-500/20 text-brand-300 border-brand-500/30",
    },
    {
      id: "teachers",
      label: "O'qituvchilar Bo'limi",
      icon: GraduationCap,
      badge: `${teachersCount} ta`,
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    },
    {
      id: "groups",
      label: "Guruhlar & Xonalar",
      icon: Building2,
      badge: `${groupsCount}`,
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    {
      id: "finance",
      label: "Moliya & Kassa",
      icon: CreditCard,
      badge: `${stats.debtCount} qarz`,
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      id: "sms",
      label: "SMS & Xabarnomalar",
      icon: Send,
      badge: "Hub",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      action: onOpenSmsModal,
    },
    {
      id: "turnstile",
      label: "Turniket & Skaner",
      icon: QrCode,
      badge: "QR/Face",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      action: onOpenTurnstile,
    },
    {
      id: "admin",
      label: "Admin Paneli",
      icon: ShieldCheck,
      badge: "PRO",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    },
    {
      id: "settings",
      label: "Tizim Sozlamalari",
      icon: Settings,
      badge: "Kengaytirilgan",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/25 ring-2 ring-brand-400/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                    EduSmart CRM
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Ta'lim & Davomat Markazi
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links (Scrollable) */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Asosiy Bo'limlar
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/25 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-mono font-bold ${
                        isActive
                          ? "bg-white/20 text-white border-white/30"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </button>
            );
          })}

          {/* Quick Action Button inside sidebar */}
          <div className="pt-4 px-1">
            <button
              onClick={() => {
                onOpenAddModal();
                setIsMobileOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-brand-500/15 hover:bg-brand-500/25 text-brand-300 border border-brand-500/30 rounded-xl text-xs font-bold transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>+ Yangi O'quvchi Qo'shish</span>
            </button>
          </div>

          {/* Mini Attendance Live Card */}
          <div className="mt-4 p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 font-medium">
                Bugungi Davomat:
              </span>
              <span className="text-emerald-400 font-extrabold font-mono">
                {stats.presentRate}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.presentRate}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span className="text-emerald-400 font-semibold">
                {stats.present} kelgan
              </span>
              <span className="text-rose-400 font-semibold">
                {stats.absent} kelmagan
              </span>
            </div>
          </div>
        </div>

        {/* Bottom User / Admin Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                  AD
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div className="truncate max-w-[120px]">
                <p className="text-xs font-bold text-white truncate">
                  Admin Ma'muriyat
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Super Admin
                </p>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition"
              title="Mavzuni almashtirish"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
