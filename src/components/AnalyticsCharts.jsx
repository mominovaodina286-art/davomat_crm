import { useState, useMemo } from "react";
import { BarChart3, Award, AlertTriangle, Clock } from "lucide-react";

export default function AnalyticsCharts({ students }) {
  const [activeTab, setActiveTab] = useState("groups"); // "groups" | "shifts" | "financial"

  // 1. Group-level attendance calculation
  const groupStats = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      if (!map[s.group]) {
        map[s.group] = {
          group: s.group,
          course: s.course,
          teacher: s.teacher,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          paid: 0,
          pending: 0,
        };
      }
      map[s.group].total += 1;
      if (s.attendanceStatus === "present") map[s.group].present += 1;
      else if (s.attendanceStatus === "absent") map[s.group].absent += 1;
      else if (s.attendanceStatus === "late") map[s.group].late += 1;
      else if (s.attendanceStatus === "excused") map[s.group].excused += 1;

      if (s.paymentStatus === "paid") map[s.group].paid += 1;
      else map[s.group].pending += 1;
    });

    const list = Object.values(map).map((g) => {
      const rate = g.total > 0 ? Math.round((g.present / g.total) * 100) : 0;
      const payRate = g.total > 0 ? Math.round((g.paid / g.total) * 100) : 0;
      return { ...g, rate, payRate };
    });

    list.sort((a, b) => b.rate - a.rate);
    return list;
  }, [students]);

  // 2. Shift-level stats
  const shiftStats = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      const shift = s.shift || "Noma'lum";
      if (!map[shift]) {
        map[shift] = {
          shift,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
        };
      }
      map[shift].total += 1;
      if (s.attendanceStatus === "present") map[shift].present += 1;
      else if (s.attendanceStatus === "absent") map[shift].absent += 1;
      else if (s.attendanceStatus === "late") map[shift].late += 1;
      else if (s.attendanceStatus === "excused") map[shift].excused += 1;
    });

    return Object.values(map).map((sh) => ({
      ...sh,
      rate: sh.total > 0 ? Math.round((sh.present / sh.total) * 100) : 0,
    }));
  }, [students]);

  // Top performing and low performing groups
  const topGroups = groupStats.slice(0, 4);
  const bottomGroups = [...groupStats].reverse().slice(0, 4);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 mb-6">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-500/15 rounded-xl text-brand-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Davomat va Moliya Tahlili
              <span className="text-xs font-normal text-slate-400">
                (Guruhlar va Smenalar kesimida)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Har bir guruhning davomat samaradorligi va to'lov monitoringi
            </p>
          </div>
        </div>

        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "groups"
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Guruhlar Tahlili ({groupStats.length})
          </button>
          <button
            onClick={() => setActiveTab("shifts")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "shifts"
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Smenalar & Xonalar
          </button>
          <button
            onClick={() => setActiveTab("rankings")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "rankings"
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Reyting (Top / Past)
          </button>
        </div>
      </div>

      {/* Tab 1: Groups Bar Chart Visualizer */}
      {activeTab === "groups" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {groupStats.map((g) => (
            <div
              key={g.group}
              className="p-3.5 bg-slate-950/50 hover:bg-slate-800/40 rounded-xl border border-slate-800/70 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="font-semibold text-xs text-slate-200 truncate max-w-[190px]"
                  title={g.group}
                >
                  {g.group}
                </span>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                    g.rate >= 80
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : g.rate >= 60
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {g.rate}% Davomat
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mb-2 truncate">
                O'qituvchi: {g.teacher}
              </p>

              {/* Attendance visual bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(g.present / g.total) * 100}%` }}
                  title={`Kelgan: ${g.present}`}
                ></div>
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${(g.late / g.total) * 100}%` }}
                  title={`Kechikkan: ${g.late}`}
                ></div>
                <div
                  className="bg-sky-500 h-full transition-all duration-300"
                  style={{ width: `${(g.excused / g.total) * 100}%` }}
                  title={`Sababli: ${g.excused}`}
                ></div>
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${(g.absent / g.total) * 100}%` }}
                  title={`Kelmadi: ${g.absent}`}
                ></div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  {g.present} keldi
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500"></span>
                  {g.absent} kelmadi
                </span>
                <span className="font-semibold text-slate-300">
                  Jami: {g.total} ta
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Shifts and Rooms */}
      {activeTab === "shifts" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shiftStats.map((sh) => (
            <div
              key={sh.shift}
              className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span className="font-bold text-xs text-white">
                    {sh.shift}
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-400 bg-brand-500/15 px-2 py-0.5 rounded-md">
                  {sh.rate}%
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-100 my-1">
                {sh.present} / {sh.total}
              </div>
              <p className="text-xs text-slate-400">O'quvchi darsda hozir</p>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full"
                  style={{ width: `${sh.rate}%` }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                <span className="text-rose-400 font-medium">
                  Kelmadi: {sh.absent}
                </span>
                <span className="text-amber-400 font-medium">
                  Kechikdi: {sh.late}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Top & Bottom Rankings */}
      {activeTab === "rankings" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top attendance */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Eng Namunali Guruhlar (Top Davomat)</span>
            </div>
            <div className="space-y-2.5">
              {topGroups.map((g, idx) => (
                <div
                  key={g.group}
                  className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-emerald-500/20"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">
                        {g.group}
                      </p>
                      <p className="text-[10px] text-slate-400">{g.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-400">
                      {g.rate}%
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {g.present}/{g.total} o'quvchi
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low attendance */}
          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>E'tibor Talab Guruhlar (Past Davomat)</span>
            </div>
            <div className="space-y-2.5">
              {bottomGroups.map((g) => (
                <div
                  key={g.group}
                  className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-rose-500/20"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 flex items-center justify-center bg-rose-500/20 text-rose-300 font-bold text-xs rounded-full">
                      !
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">
                        {g.group}
                      </p>
                      <p className="text-[10px] text-slate-400">{g.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-rose-400">
                      {g.rate}%
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {g.absent} ta kelmagan
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
