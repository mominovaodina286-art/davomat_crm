import { useState, useMemo } from "react";
import {
  CreditCard,
  Wallet,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Phone,
  MessageSquare,
  Search,
  Download,
  DollarSign,
} from "lucide-react";
import { formatSum, formatCompactSum, exportToCSV } from "../utils/helpers";

export default function FinanceView({
  students,
  stats,
  onOpenPayment,
  onOpenSmsSingle,
  onOpenDebtorSms,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debtFilter, setDebtFilter] = useState("all_debtors"); // "all_debtors" | "overdue" | "partial"

  // Debtors list
  const debtorStudents = useMemo(() => {
    return students.filter((s) => s.paymentStatus !== "paid");
  }, [students]);

  const filteredDebtors = useMemo(() => {
    return debtorStudents.filter((s) => {
      if (debtFilter === "overdue" && s.paymentStatus !== "overdue")
        return false;
      if (debtFilter === "partial" && s.paymentStatus !== "partial")
        return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          s.fullName.toLowerCase().includes(q) ||
          s.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
          s.group.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [debtorStudents, debtFilter, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Financial KPI Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Collected */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Jami Tushum Summasi
              </p>
              <h3 className="text-2xl font-extrabold text-emerald-400 mt-1.5 font-mono">
                {formatSum(stats.totalCollectedRevenue)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {stats.paidRate}% to'langan
            </span>
            <span>{stats.paidCount} ta o'quvchi</span>
          </div>
        </div>

        {/* Total Outstanding Debt */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Umumiy Qarzdorlik
              </p>
              <h3 className="text-2xl font-extrabold text-rose-400 mt-1.5 font-mono">
                {formatSum(stats.totalDebtRevenue)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="text-rose-400 font-semibold">
              {stats.debtCount} ta qarzdor
            </span>
            <span>Undirish kerak</span>
          </div>
        </div>

        {/* Total Expected Revenue */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Rejadagi Oylik Tushum
              </p>
              <h3 className="text-2xl font-extrabold text-white mt-1.5 font-mono">
                {formatCompactSum(stats.totalExpectedRevenue)} so'm
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Barcha guruhlar bo'yicha</span>
            <span className="text-brand-300 font-bold">100% reja</span>
          </div>
        </div>

        {/* Payment Success Rate */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                To'lov Samaradorligi
              </p>
              <h3 className="text-2xl font-extrabold text-teal-300 mt-1.5 font-mono">
                {stats.paidRate}%
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.paidRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Debtors Management CRM Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Controls Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <span>Qarzdor O'quvchilar Ro'yxati & Eslatma Yuborish</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Jami {debtorStudents.length} ta o'quvchida to'lanmagan oylik
              qarzdorlik mavjud
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Filter pills */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
              <button
                onClick={() => setDebtFilter("all_debtors")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  debtFilter === "all_debtors"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Barchasi ({debtorStudents.length})
              </button>
              <button
                onClick={() => setDebtFilter("overdue")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  debtFilter === "overdue"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Muddati o'tgan
              </button>
              <button
                onClick={() => setDebtFilter("partial")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  debtFilter === "partial"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Qisman to'langan
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 sm:w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Qarzdor ismi yoki ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Bulk Reminder SMS */}
            <button
              onClick={onOpenDebtorSms}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-amber-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Barchasiga SMS Eslatma ({debtorStudents.length})</span>
            </button>

            {/* Export Debtors */}
            <button
              onClick={() =>
                exportToCSV(
                  debtorStudents,
                  `qarzdorlar_${new Date().toISOString().slice(0, 10)}.csv`,
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition"
              title="Qarzdorlar ro'yxatini yuklab olish"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Eksport</span>
            </button>
          </div>
        </div>

        {/* Debtors Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3.5 w-12">#</th>
                <th className="p-3.5 min-w-[180px]">O'quvchi F.I.O & ID</th>
                <th className="p-3.5 min-w-[140px]">Telefon Raqami</th>
                <th className="p-3.5 min-w-[160px]">Guruh & O'qituvchi</th>
                <th className="p-3.5 min-w-[110px]">Oylik Kurs</th>
                <th className="p-3.5 min-w-[110px]">To'langan</th>
                <th className="p-3.5 min-w-[130px]">Qarzdorlik Summasi</th>
                <th className="p-3.5 min-w-[110px] text-center">
                  To'lov Holati
                </th>
                <th className="p-3.5 min-w-[160px] text-right">
                  Tezkor Amallar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDebtors.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    Qarzdor o'quvchilar topilmadi! Barcha to'lovlar qabul
                    qilingan.
                  </td>
                </tr>
              ) : (
                filteredDebtors.map((student, idx) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition"
                  >
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">
                        {student.fullName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {student.id}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <a
                        href={`tel:${student.phone}`}
                        className="font-mono text-slate-300 hover:text-emerald-400 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{student.phone}</span>
                      </a>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">
                        {student.group}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.teacher}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      {formatSum(student.monthlyFee)}
                    </td>
                    <td className="p-3.5 font-mono text-emerald-400">
                      {formatSum(student.paidAmount)}
                    </td>
                    <td className="p-3.5 font-mono font-extrabold text-rose-400">
                      {formatSum(student.remainingAmount)}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                          student.paymentStatus === "partial"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        }`}
                      >
                        {student.paymentStatus === "partial"
                          ? "Qisman to'langan"
                          : "Qarzdor"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenPayment(student)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>To'lash</span>
                        </button>
                        <button
                          onClick={() => onOpenSmsSingle(student)}
                          className="p-1.5 bg-slate-800 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 rounded-xl transition"
                          title="SMS eslatma jo'natish"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
