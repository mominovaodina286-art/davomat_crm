
import { useState, useMemo } from "react";
import { Building2, Search, ArrowRight } from "lucide-react";
import { COURSES_CONFIG } from "../data/studentsData";
import { formatSum } from "../utils/helpers";

export default function GroupsView({ students, onSelectGroup }) {
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten all groups with aggregated stats from students array
  const groupsData = useMemo(() => {
    const list = [];

    COURSES_CONFIG.forEach((course) => {
      course.groups.forEach((grp) => {
        const groupStudents = students.filter((s) => s.group === grp.name);
        const presentCount = groupStudents.filter(
          (s) => s.attendanceStatus === "present",
        ).length;
        const absentCount = groupStudents.filter(
          (s) => s.attendanceStatus === "absent",
        ).length;
        const paidCount = groupStudents.filter(
          (s) => s.paymentStatus === "paid",
        ).length;
        const totalRev = groupStudents.reduce(
          (acc, s) => acc + (s.paidAmount || 0),
          0,
        );

        const attRate =
          groupStudents.length > 0
            ? Math.round((presentCount / groupStudents.length) * 100)
            : 0;

        list.push({
          ...grp,
          courseName: course.name,
          studentCount: groupStudents.length,
          presentCount,
          absentCount,
          paidCount,
          totalRev,
          attRate,
        });
      });
    });

    return list;
  }, [students]);

  const filteredGroups = useMemo(() => {
    return groupsData.filter((g) => {
      if (selectedCourse !== "ALL" && g.courseName !== selectedCourse)
        return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          g.name.toLowerCase().includes(q) ||
          g.teacher.toLowerCase().includes(q) ||
          g.room.toLowerCase().includes(q) ||
          g.courseName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [groupsData, selectedCourse, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-brand-400" />
            <span>Guruhlar va O'quv Xonalari Jadvali</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Jami {groupsData.length} ta faol guruh • Xonalar bandligi va
            smenalar
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Course filter select */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="ALL">Barcha kurs yo'nalishlari</option>
            {COURSES_CONFIG.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Search input */}
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Guruh, xona yoki ustoz..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredGroups.map((group) => (
          <div
            key={group.name}
            className="bg-slate-900/80 border border-slate-800 hover:border-brand-500/50 rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-brand-500/5 group flex flex-col justify-between"
          >
            <div>
              {/* Group Title & Course */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">
                    {group.courseName}
                  </span>
                  <h3 className="font-extrabold text-base text-white mt-1.5 group-hover:text-brand-300 transition-colors">
                    {group.name}
                  </h3>
                </div>

                <span
                  className={`text-xs font-bold px-2 py-1 rounded-xl border ${
                    group.attRate >= 80
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {group.attRate}% Davomat
                </span>
              </div>

              {/* Teacher, Room, Shift Details */}
              <div className="space-y-1.5 text-xs text-slate-300 py-3 border-y border-slate-800 my-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">O'qituvchi:</span>
                  <span className="font-bold text-slate-100">
                    {group.teacher}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">O'quv xonasi:</span>
                  <span className="font-semibold text-indigo-300">
                    {group.room}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dars vaqti (Smena):</span>
                  <span className="font-mono text-amber-400 font-semibold">
                    {group.shift}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Oylik to'lov kursi:</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {formatSum(group.fee)}
                  </span>
                </div>
              </div>

              {/* Attendance Progress bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Darsdagi o'quvchilar:</span>
                  <span className="font-bold text-white">
                    {group.presentCount} / {group.studentCount} ta
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{
                      width: `${group.studentCount > 0 ? (group.presentCount / group.studentCount) * 100 : 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-rose-500 h-full"
                    style={{
                      width: `${group.studentCount > 0 ? (group.absentCount / group.studentCount) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400">
                    {group.presentCount} keldi
                  </span>
                  <span className="text-rose-400">
                    {group.absentCount} kelmadi
                  </span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => onSelectGroup(group.name)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition group-hover:bg-brand-600 group-hover:text-white"
            >
              <span>Guruh o'quvchilarini ko'rish ({group.studentCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
