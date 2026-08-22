import { useMemo, useState } from "react";
import { GraduationCap, Search, ArrowRight } from "lucide-react";
import { formatSum } from "../utils/helpers";

const TEACHERS_META = [
  {
    name: "Jasur Kenjayev",
    specialty: "Frontend & Mobile Dasturlash (React, Vue, Flutter)",
    phone: "+998 (90) 112-33-44",
    experience: "7 yil tajriba",
    rating: 4.9,
  },
  {
    name: "Farhod Azimov",
    specialty: "Backend Dasturlash (Node.js, Python, QA Testing)",
    phone: "+998 (90) 223-44-55",
    experience: "6 yil tajriba",
    rating: 4.8,
  },
  {
    name: "Rustam Qodirov",
    specialty: "Fullstack, Kiberxavfsizlik & AI Data Science",
    phone: "+998 (93) 334-55-66",
    experience: "8 yil tajriba",
    rating: 5.0,
  },
  {
    name: "Nodira Rasulova",
    specialty: "IELTS Rocket (7.5+) & Nemis tili (B2)",
    phone: "+998 (97) 445-66-77",
    experience: "9 yil tajriba (IELTS 8.5)",
    rating: 4.95,
  },
  {
    name: "Dilnoza Yoqubova",
    specialty: "General English, Rus tili & Koreys tili (Topik)",
    phone: "+998 (99) 556-77-88",
    experience: "5 yil tajriba",
    rating: 4.85,
  },
  {
    name: "Malika Toirova",
    specialty: "Grafik Dizayn, UI/UX Figma & 3D Blender",
    phone: "+998 (91) 667-88-99",
    experience: "6 yil tajriba",
    rating: 4.9,
  },
  {
    name: "Bobur Saidov",
    specialty: "Matematika (Milliy sertifikat & DTM) va Fizika",
    phone: "+998 (94) 778-99-00",
    experience: "10 yil tajriba",
    rating: 4.95,
  },
  {
    name: "Nilufar Karimova",
    specialty: "Bolalar IT (Scratch), Mental Arifmetika & Kids English",
    phone: "+998 (90) 889-00-11",
    experience: "4 yil tajriba",
    rating: 4.8,
  },
  {
    name: "Sanjar Xalilov",
    specialty: "SMM Targeting, Motion Graphics & Mobilografiya",
    phone: "+998 (93) 990-11-22",
    experience: "5 yil tajriba",
    rating: 4.85,
  },
  {
    name: "Gulnora Ergasheva",
    specialty: "Biologiya & Kimyo (Tibbiyot yo'nalishi)",
    phone: "+998 (98) 101-22-33",
    experience: "11 yil tajriba",
    rating: 4.9,
  },
  {
    name: "Alisher Fayziyev",
    specialty: "1C Buxgalteriya 8.3 & Moliyaviy Savodxonlik",
    phone: "+998 (88) 212-33-44",
    experience: "8 yil tajriba",
    rating: 4.85,
  },
];

export default function TeachersView({ students, onSelectTeacher }) {
  const [search, setSearch] = useState("");

  // Aggregate teacher statistics from students array
  const teacherStats = useMemo(() => {
    const map = {};

    TEACHERS_META.forEach((tm) => {
      map[tm.name] = {
        ...tm,
        totalStudents: 0,
        presentToday: 0,
        absentToday: 0,
        groups: new Set(),
        rooms: new Set(),
        shifts: new Set(),
        totalRevenue: 0,
      };
    });

    students.forEach((s) => {
      const tName = s.teacher;
      if (!map[tName]) {
        map[tName] = {
          name: tName,
          specialty: s.course,
          phone: "+998 (90) --- -- --",
          experience: "O'qituvchi",
          rating: 4.8,
          totalStudents: 0,
          presentToday: 0,
          absentToday: 0,
          groups: new Set(),
          rooms: new Set(),
          shifts: new Set(),
          totalRevenue: 0,
        };
      }

      map[tName].totalStudents += 1;
      if (s.attendanceStatus === "present") map[tName].presentToday += 1;
      else if (s.attendanceStatus === "absent") map[tName].absentToday += 1;

      map[tName].groups.add(s.group);
      map[tName].rooms.add(s.room);
      map[tName].shifts.add(s.shift);
      map[tName].totalRevenue += s.paidAmount || 0;
    });

    return Object.values(map).map((t) => {
      const attRate =
        t.totalStudents > 0
          ? Math.round((t.presentToday / t.totalStudents) * 100)
          : 0;
      return {
        ...t,
        attendanceRate: attRate,
        groupsList: Array.from(t.groups),
        roomsList: Array.from(t.rooms),
        shiftsList: Array.from(t.shifts),
      };
    });
  }, [students]);

  const filteredTeachers = useMemo(() => {
    if (!search.trim()) return teacherStats;
    const q = search.toLowerCase();
    return teacherStats.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.specialty.toLowerCase().includes(q) ||
        t.groupsList.some((g) => g.toLowerCase().includes(q)),
    );
  }, [teacherStats, search]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-400" />
            <span>O'quv Markazi Ustozlari va Pedagoglar Tarkibi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Jami {teacherStats.length} nafar o'qituvchi • Davomat va guruhlar
            monitoringi
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="O'qituvchi ismi yoki fani..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.name}
            className="bg-slate-900/80 border border-slate-800 hover:border-brand-500/50 rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-brand-500/5 group flex flex-col justify-between"
          >
            <div>
              {/* Header: Teacher Name, Avatar, Rating */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-base flex items-center justify-center shadow-md ring-2 ring-brand-500/30 group-hover:scale-105 transition-transform">
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-brand-300 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-brand-400 font-medium line-clamp-1">
                      {teacher.specialty}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {teacher.experience}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold font-mono">
                    ★ {teacher.rating}
                  </span>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-center mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    O'quvchilar
                  </span>
                  <span className="text-sm font-extrabold text-white font-mono">
                    {teacher.totalStudents} ta
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Davomat %
                  </span>
                  <span
                    className={`text-sm font-extrabold font-mono ${
                      teacher.attendanceRate >= 80
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {teacher.attendanceRate}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Guruhlar
                  </span>
                  <span className="text-sm font-extrabold text-brand-300 font-mono">
                    {teacher.groupsList.length} ta
                  </span>
                </div>
              </div>

              {/* Assigned Groups Pills */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-400 block">
                  Biriktirilgan Guruhlar:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
                  {teacher.groupsList.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700/80 rounded-md text-[11px] font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-4 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Telefon:</span>
                  <a
                    href={`tel:${teacher.phone}`}
                    className="font-mono text-emerald-400 font-semibold hover:underline"
                  >
                    {teacher.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">O'quv xonalari:</span>
                  <span className="text-slate-200 font-medium">
                    {teacher.roomsList.join(", ") || "Audit 101"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Guruhlar tushumi:</span>
                  <span className="text-purple-400 font-mono font-bold">
                    {formatSum(teacher.totalRevenue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => onSelectTeacher(teacher.name)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition group-hover:bg-brand-600 group-hover:text-white"
            >
              <span>Ushbu o'qituvchi o'quvchilarini ko'rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
