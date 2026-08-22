import { useMemo } from "react";
import {
  X,
  User,
  Calendar,
  Building,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import {
  formatSum,
  getAttendanceBadge,
  getPaymentBadge,
} from "../utils/helpers";

export default function StudentDetailModal({
  isOpen,
  onClose,
  student,
  onOpenPayment,
  onOpenSms,
  onUpdateStatus,
}) {
  // Generate 30-day attendance calendar grid (Always call hook before early return)
  const daysHistory = useMemo(() => {
    if (!student) return [];
    const list = [];
    const statuses = [
      "present",
      "present",
      "present",
      "present",
      "absent",
      "present",
      "late",
      "excused",
      "present",
      "present",
    ];
    for (let i = 1; i <= 30; i++) {
      const st =
        i === 20
          ? student.attendanceStatus
          : statuses[(i + student.serialNumber) % statuses.length];
      list.push({ day: i, status: st });
    }
    return list;
  }, [student]);

  if (!isOpen || !student) return null;

  const attBadge = getAttendanceBadge(student.attendanceStatus);
  const payBadge = getPaymentBadge(student.paymentStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-inner ${
                student.gender === "Erkak"
                  ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                  : "bg-rose-600/30 text-rose-300 border border-rose-500/40"
              }`}
            >
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl text-white">
                  {student.fullName}
                </h3>
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                  {student.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {student.course} • Guruh:{" "}
                <strong className="text-brand-300">{student.group}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Davomat foizi */}
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                Umumiy Davomat
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-emerald-400">
                  {student.attendanceRate}%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Faollik
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${student.attendanceRate}%` }}
                ></div>
              </div>
            </div>

            {/* Bugungi holat */}
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                Bugungi Holat
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${attBadge.color}`}
                >
                  {attBadge.label}
                </span>
                {student.checkInTime && student.checkInTime !== "-" && (
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    ({student.checkInTime})
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-1">
                <button
                  onClick={() => onUpdateStatus(student.id, "present")}
                  className="px-2 py-0.5 text-[10px] bg-emerald-600/20 text-emerald-300 rounded hover:bg-emerald-600/40"
                >
                  ✓ Keldi
                </button>
                <button
                  onClick={() => onUpdateStatus(student.id, "absent")}
                  className="px-2 py-0.5 text-[10px] bg-rose-600/20 text-rose-300 rounded hover:bg-rose-600/40"
                >
                  ✗ Kelmadi
                </button>
              </div>
            </div>

            {/* To'lov holati */}
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                To'lov Balansi
              </span>
              <div className="mt-1">
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border ${payBadge.color}`}
                >
                  {payBadge.label}
                </span>
                <p className="text-xs font-bold text-white mt-1">
                  {formatSum(student.monthlyFee)}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* O'quvchi ma'lumotlari */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-400" />
                <span>O'quvchi va Ota-ona Kontaktlari</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-400">Telefon:</span>
                <a
                  href={`tel:${student.phone}`}
                  className="font-mono text-emerald-400 font-bold hover:underline"
                >
                  {student.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ota-ona raqami:</span>
                <a
                  href={`tel:${student.parentPhone}`}
                  className="font-mono text-sky-400 font-bold hover:underline"
                >
                  {student.parentPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vasiy:</span>
                <span className="text-slate-200 font-medium">
                  {student.parentName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Jinsi:</span>
                <span className="text-slate-200">{student.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ro'yxatdan o'tgan sana:</span>
                <span className="text-slate-200 font-mono">
                  {student.registeredDate || "2024-09-10"}
                </span>
              </div>
            </div>

            {/* Dars va Bino ma'lumotlari */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-400" />
                <span>Dars va Xona Ma'lumotlari</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-400">Bino / Filial:</span>
                <span className="text-slate-200 font-medium">
                  {student.branch}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">O'qituvchi:</span>
                <span className="text-brand-300 font-semibold">
                  {student.teacher}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Xona:</span>
                <span className="text-slate-200 font-medium">
                  {student.room}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Smena / Vaqt:</span>
                <span className="text-amber-400 font-mono font-medium">
                  {student.shift}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dars kunlari:</span>
                <span className="text-slate-200">Dush - Chor - Jum</span>
              </div>
            </div>
          </div>

          {/* 30-day Attendance Matrix */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>
                  Oylik Davomat Kalendari (Oxirgi 30 kunlik qatnashuv)
                </span>
              </h4>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>{" "}
                  Keldi
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>{" "}
                  Kelmadi
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>{" "}
                  Kechikdi
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-sky-500"></span>{" "}
                  Sababli
                </span>
              </div>
            </div>

            {/* Grid of days */}
            <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5">
              {daysHistory.map((d) => {
                const badge = getAttendanceBadge(d.status);
                return (
                  <div
                    key={d.day}
                    title={`${d.day}-kun: ${badge.label}`}
                    className={`h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold border transition-transform hover:scale-110 cursor-pointer ${
                      d.status === "present"
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                        : d.status === "absent"
                          ? "bg-rose-950/60 text-rose-400 border-rose-500/40"
                          : d.status === "late"
                            ? "bg-amber-950/60 text-amber-400 border-amber-500/40"
                            : "bg-sky-950/60 text-sky-400 border-sky-500/40"
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 font-normal">
                      {d.day}
                    </span>
                    <span>{badge.code}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          {student.notes && (
            <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-300">
              <strong>Eslatma / Izoh:</strong> {student.notes}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenPayment(student);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>To'lov Qabul Qilish</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenSms(student);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SMS Yuborish</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
