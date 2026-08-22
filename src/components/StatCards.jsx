import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatSum, formatCompactSum } from "../utils/helpers";

export default function StatCards({ stats, onFilterChange, currentFilter }) {
  const {
    total,
    present,
    presentRate,
    absent,
    absentRate,
    late,
    lateRate,
    excused,
    excusedRate,
    paidCount,
    paidRate,
    debtCount,
    totalExpectedRevenue,
    totalCollectedRevenue,
    totalDebtRevenue,
  } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. Jami O'quvchilar */}
      <div
        onClick={() => onFilterChange({ attendance: "ALL", payment: "ALL" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          currentFilter.attendance === "ALL" && currentFilter.payment === "ALL"
            ? "bg-slate-800/90 border-brand-500/60 ring-2 ring-brand-500/30 shadow-lg shadow-brand-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Jami O'quvchilar
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
              {total.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-400 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-emerald-400 font-medium gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 100% aktiv
          </span>
          <span className="text-slate-500">3 filial bo'yicha</span>
        </div>
      </div>

      {/* 2. Kelganlar (Davomat Foizi) */}
      <div
        onClick={() => onFilterChange({ attendance: "present" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
          currentFilter.attendance === "present"
            ? "bg-slate-800/90 border-emerald-500/60 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-emerald-500/30 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Kelganlar
              </span>
              <span className="px-1.5 py-0.2 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md">
                {presentRate}%
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1.5 tracking-tight">
              {present.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${presentRate}%` }}
            ></div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Davomat ko'rsatkichi</span>
            <span className="text-emerald-400 font-bold">{presentRate}%</span>
          </div>
        </div>
      </div>

      {/* 3. Kelmaganlar */}
      <div
        onClick={() => onFilterChange({ attendance: "absent" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          currentFilter.attendance === "absent"
            ? "bg-slate-800/90 border-rose-500/60 ring-2 ring-rose-500/30 shadow-lg shadow-rose-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-rose-500/30 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Kelmaganlar
              </span>
              <span className="px-1.5 py-0.2 text-[11px] font-bold bg-rose-500/20 text-rose-300 rounded-md">
                {absentRate}%
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1.5 tracking-tight">
              {absent.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 group-hover:scale-110 transition-transform">
            <UserX className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="text-rose-400 font-medium">SMS yuborish lozim</span>
          <span className="text-slate-500">
            {total > 0 ? ((absent / total) * 100).toFixed(1) : 0}% darsda yo'q
          </span>
        </div>
      </div>

      {/* 4. Kechikkan & Sababli */}
      <div
        onClick={() => onFilterChange({ attendance: "late" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          currentFilter.attendance === "late" ||
          currentFilter.attendance === "excused"
            ? "bg-slate-800/90 border-amber-500/60 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-amber-500/30 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Kechikkan / Sababli
            </p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
                {late}
              </span>
              <span className="text-xs font-semibold text-sky-400">
                + {excused} sababli
              </span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="text-amber-300">Kechikkan: {lateRate}%</span>
          <span className="text-sky-300">Sababli: {excusedRate}%</span>
        </div>
      </div>

      {/* 5. Oylik To'lov Qilganlar */}
      <div
        onClick={() => onFilterChange({ payment: "paid" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          currentFilter.payment === "paid"
            ? "bg-slate-800/90 border-teal-500/60 ring-2 ring-teal-500/30 shadow-lg shadow-teal-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-teal-500/30 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                To'lov Qilganlar
              </span>
              <span className="px-1.5 py-0.2 text-[11px] font-bold bg-teal-500/20 text-teal-300 rounded-md">
                {paidRate}%
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-300 mt-1.5 tracking-tight">
              {paidCount.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="text-emerald-400 font-medium">To'liq to'langan</span>
          <span className="text-slate-500">Qarzdor: {debtCount} ta</span>
        </div>
      </div>

      {/* 6. Moliya & Tushum */}
      <div
        onClick={() => onFilterChange({ payment: "pending" })}
        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
          currentFilter.payment === "pending"
            ? "bg-slate-800/90 border-purple-500/60 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10"
            : "bg-slate-900/70 border-slate-800 hover:border-purple-500/30 hover:bg-slate-850"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Jami Tushum / Qarz
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight">
              {formatCompactSum(totalCollectedRevenue)}
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <span
            className="text-rose-400 font-semibold truncate"
            title={`Qarzdorlik: ${formatSum(totalDebtRevenue)}`}
          >
            Qarz: {formatCompactSum(totalDebtRevenue)}
          </span>
          <span className="text-purple-300 font-medium">
            {totalExpectedRevenue > 0
              ? ((totalCollectedRevenue / totalExpectedRevenue) * 100).toFixed(
                  0,
                )
              : 0}
            % tushum
          </span>
        </div>
      </div>
    </div>
  );
}
