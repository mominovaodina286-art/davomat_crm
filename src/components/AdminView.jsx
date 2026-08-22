import { useState } from "react";
import {
  ShieldCheck,
  Building,
  Database,
  Download,
  RefreshCw,
  FileText,
} from "lucide-react";
import { BRANCHES } from "../data/studentsData";

export default function AdminView({
  students,
  onResetDatabase,
  onExportBackup,
}) {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  // System audit logs sample
  const systemLogs = [
    {
      time: "11:42:15",
      type: "DAVOMAT",
      user: "Admin",
      text: "Turniket orqali STU-0045 o'quvchisi 'Keldi' deb qayd etildi",
    },
    {
      time: "11:38:00",
      type: "MOLIYA",
      user: "Kassa 1",
      text: "STU-0012 uchun 950,000 so'm oylik to'lov qabul qilindi (#CHK-8841)",
    },
    {
      time: "11:15:30",
      type: "SMS_HUB",
      user: "Admin",
      text: "14 nafar darsga kelmagan o'quvchilar ota-onalariga SMS jo'natildi",
    },
    {
      time: "10:50:12",
      type: "DAVOMAT",
      user: "O'qituvchi Jasur K.",
      text: "Frontend-React-101 guruhi davomati to'liq tasdiqlandi",
    },
    {
      time: "10:30:00",
      type: "TIZIM",
      user: "System",
      text: "Avtomatik zaxira nusxasi (Daily Cloud Backup) yaratildi",
    },
    {
      time: "09:00:00",
      type: "TIZIM",
      user: "Admin",
      text: "Barcha 3 ta filialda ertalabki smena davomati boshlandi",
    },
  ];

  const adminRoles = [
    {
      name: "Jasur Kenjayev",
      role: "Bosh Administrator (Super Admin)",
      access: "Barcha huquqlar (100%)",
      status: "Aktiv",
      email: "admin@edusmart.uz",
    },
    {
      name: "Madina Karimova",
      role: "Bosh Kassir & Moliya Menejeri",
      access: "To'lovlar, Cheklar, Moliya hisoboti",
      status: "Aktiv",
      email: "kassa@edusmart.uz",
    },
    {
      name: "Sardor Rahimov",
      role: "Filial Menejeri (Yunusobod)",
      access: "Davomat, O'quvchilar, SMS",
      status: "Aktiv",
      email: "yunusobod@edusmart.uz",
    },
    {
      name: "Dilnoza Toirova",
      role: "Filial Menejeri (Mirzo Ulug'bek)",
      access: "Davomat, O'quvchilar, SMS",
      status: "Aktiv",
      email: "mu@edusmart.uz",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg ring-4 ring-brand-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">
                  Tizim Administratori Paneli
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                EduSmart Ta'lim Boshqaruv Tizimi xavfsizligi, filiallar va
                ma'lumotlar bazasi boshqaruvi
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onExportBackup}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Zaxira Nusxa (JSON)</span>
            </button>
            <button
              onClick={onResetDatabase}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition"
            >
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span>Bazasini Qayta Tiklash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subtabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === "overview"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
              : "bg-slate-900/80 text-slate-400 hover:text-white"
          }`}
        >
          Umumiy Holat & Filiallar
        </button>
        <button
          onClick={() => setActiveSubTab("staff")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === "staff"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
              : "bg-slate-900/80 text-slate-400 hover:text-white"
          }`}
        >
          Xodimlar va Huquqlar ({adminRoles.length})
        </button>
        <button
          onClick={() => setActiveSubTab("logs")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === "logs"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
              : "bg-slate-900/80 text-slate-400 hover:text-white"
          }`}
        >
          Audit Jurnali & Xavfsizlik
        </button>
      </div>

      {/* Subtab 1: Branches Overview */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BRANCHES.map((bName, idx) => {
              const bStudents = students.filter((s) => s.branch === bName);
              const bPresent = bStudents.filter(
                (s) => s.attendanceStatus === "present",
              ).length;
              const bRate =
                bStudents.length > 0
                  ? Math.round((bPresent / bStudents.length) * 100)
                  : 0;

              return (
                <div
                  key={bName}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-brand-500/20 text-brand-400 rounded-xl">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {bName}
                        </h4>
                        <p className="text-[10px] text-emerald-400 font-semibold">
                          ● Faoliyatda (100%)
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-300 font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
                    <div className="p-2 bg-slate-950/60 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase block">
                        O'quvchilar
                      </span>
                      <span className="font-extrabold text-white font-mono">
                        {bStudents.length} ta
                      </span>
                    </div>
                    <div className="p-2 bg-slate-950/60 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase block">
                        Davomat %
                      </span>
                      <span className="font-extrabold text-emerald-400 font-mono">
                        {bRate}%
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Dars xonalari:</span>
                      <span className="text-slate-200 font-semibold">
                        12 ta xona
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>O'qituvchilar soni:</span>
                      <span className="text-slate-200 font-semibold">
                        11 nafar
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bugun kelganlar:</span>
                      <span className="text-emerald-400 font-semibold">
                        {bPresent} o'quvchi
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Performance Status */}
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
            <h4 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Tizim Ma'lumotlar Bazasi & Server Holati</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">
                  Bazadagi O'quvchilar:
                </span>
                <span className="text-base font-extrabold text-white">
                  {students.length} ta
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">
                  Local Database Cache:
                </span>
                <span className="text-base font-extrabold text-emerald-400">
                  Sinxron (OK)
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">
                  API Response Time:
                </span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  14 ms
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">
                  SMS Gateway Status:
                </span>
                <span className="text-base font-extrabold text-sky-400">
                  Ulangan (Active)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Staff & Roles */}
      {activeSubTab === "staff" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h4 className="font-bold text-sm text-white">
              Tizim Foydalanuvchilari va Huquqlari
            </h4>
            <span className="text-xs text-slate-400">
              {adminRoles.length} ta faol xodim
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Foydalanuvchi F.I.O</th>
                  <th className="p-3.5">Lavozimi / Roli</th>
                  <th className="p-3.5">Ruxsat darajasi</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5 text-center">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {adminRoles.map((r) => (
                  <tr key={r.email} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-white">{r.name}</td>
                    <td className="p-3.5 text-brand-300 font-medium">
                      {r.role}
                    </td>
                    <td className="p-3.5 text-slate-300">{r.access}</td>
                    <td className="p-3.5 font-mono text-slate-400">
                      {r.email}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Audit Logs */}
      {activeSubTab === "logs" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-400" />
            <span>Tizim Amallari Audit Jurnali (Live Activity Log)</span>
          </h4>
          <div className="space-y-2">
            {systemLogs.map((l, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 text-[11px]">
                    {l.time}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30 font-mono">
                    {l.type}
                  </span>
                  <span className="text-slate-200">{l.text}</span>
                </div>
                <span className="text-slate-400 text-[11px]">
                  Operator: {l.user}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
