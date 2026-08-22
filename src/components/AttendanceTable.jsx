import { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Phone,
  MessageSquare,
  CreditCard,
  Eye,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  AlertCircle,
} from "lucide-react";
import { getPaymentBadge, formatSum } from "../utils/helpers";
import { COURSES_CONFIG } from "../data/studentsData";

export default function AttendanceTable({
  students,
  onUpdateAttendance,
  onBulkUpdateAttendance,
  onOpenPayment,
  onOpenStudentDetail,
  onOpenSmsSingle,
  onDeleteStudent,
  onEditStudent,
  searchTerm,
  setSearchTerm,
  selectedCourse,
  setSelectedCourse,
  selectedGroup,
  setSelectedGroup,
  selectedTeacher,
  setSelectedTeacher,
  selectedAttendanceFilter,
  setSelectedAttendanceFilter,
  selectedPaymentFilter,
  setSelectedPaymentFilter,
  onResetFilters,
}) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const sortField = "id";
  const sortOrder = "asc";

  // Extract unique filter lists
  const coursesList = useMemo(() => COURSES_CONFIG.map((c) => c.name), []);
  const groupsList = useMemo(() => {
    const set = new Set();
    students.forEach((s) => set.add(s.group));
    return Array.from(set).sort();
  }, [students]);

  const teachersList = useMemo(() => {
    const set = new Set();
    students.forEach((s) => set.add(s.teacher));
    return Array.from(set).sort();
  }, [students]);

  // Filtering
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matches =
          s.fullName.toLowerCase().includes(query) ||
          s.phone.replace(/\D/g, "").includes(query.replace(/\D/g, "")) ||
          s.parentPhone.replace(/\D/g, "").includes(query.replace(/\D/g, "")) ||
          s.id.toLowerCase().includes(query) ||
          s.group.toLowerCase().includes(query) ||
          s.teacher.toLowerCase().includes(query) ||
          s.course.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Course filter
      if (selectedCourse !== "ALL" && s.course !== selectedCourse) return false;
      // Group filter
      if (selectedGroup !== "ALL" && s.group !== selectedGroup) return false;
      // Teacher filter
      if (selectedTeacher !== "ALL" && s.teacher !== selectedTeacher)
        return false;
      // Attendance status filter
      if (
        selectedAttendanceFilter !== "ALL" &&
        s.attendanceStatus !== selectedAttendanceFilter
      )
        return false;
      // Payment status filter
      if (
        selectedPaymentFilter !== "ALL" &&
        s.paymentStatus !== selectedPaymentFilter
      )
        return false;

      return true;
    });
  }, [
    students,
    searchTerm,
    selectedCourse,
    selectedGroup,
    selectedTeacher,
    selectedAttendanceFilter,
    selectedPaymentFilter,
  ]);

  // Sorting
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [filteredStudents, sortField, sortOrder]);

  // Pagination
  const totalPages =
    pageSize === "ALL" ? 1 : Math.ceil(sortedStudents.length / pageSize) || 1;
  const currentStudents = useMemo(() => {
    if (pageSize === "ALL") return sortedStudents;
    const start = (currentPage - 1) * pageSize;
    return sortedStudents.slice(start, start + pageSize);
  }, [sortedStudents, currentPage, pageSize]);

  // Select all on current page
  const allCurrentSelected =
    currentStudents.length > 0 &&
    currentStudents.every((s) => selectedIds.has(s.id));

  const toggleSelectAllCurrent = () => {
    const next = new Set(selectedIds);
    if (allCurrentSelected) {
      currentStudents.forEach((s) => next.delete(s.id));
    } else {
      currentStudents.forEach((s) => next.add(s.id));
    }
    setSelectedIds(next);
  };

  const toggleSelectStudent = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkSetStatus = (status) => {
    if (selectedIds.size === 0) {
      alert("Iltimos, avval ro'yxatdan o'quvchilarni belgilang!");
      return;
    }
    onBulkUpdateAttendance(Array.from(selectedIds), status);
    setSelectedIds(new Set());
  };

  const handleSetAllFiltered = (status) => {
    if (
      confirm(
        `Filtrdagi barcha ${sortedStudents.length} ta o'quvchini "${status === "present" ? "Keldi" : status}" deb belgilashni tasdiqlaysizmi?`,
      )
    ) {
      const ids = sortedStudents.map((s) => s.id);
      onBulkUpdateAttendance(ids, status);
    }
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCourse !== "ALL" ||
    selectedGroup !== "ALL" ||
    selectedTeacher !== "ALL" ||
    selectedAttendanceFilter !== "ALL" ||
    selectedPaymentFilter !== "ALL";

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Controls & Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 space-y-4">
        {/* Top row: Search & Primary Action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="O'quvchi ismi, familiyasi, telefoni (+998...), ID yoki guruhi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Tozalash
              </button>
            )}
          </div>

          {/* Quick Bulk Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedIds.size > 0 ? (
              <div className="flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-300 animate-fade-in">
                <span>{selectedIds.size} ta belgilandi:</span>
                <button
                  onClick={() => handleBulkSetStatus("present")}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs transition"
                >
                  ✓ Keldi
                </button>
                <button
                  onClick={() => handleBulkSetStatus("absent")}
                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs transition"
                >
                  ✗ Kelmadi
                </button>
                <button
                  onClick={() => handleBulkSetStatus("late")}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs transition"
                >
                  ⏱ Kechikdi
                </button>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-slate-400 hover:text-slate-200 ml-1"
                >
                  Bekor qilish
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSetAllFiltered("present")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition"
                  title="Barcha filtrlangan o'quvchilarni 'Keldi' deb belgilash"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Barchasini "Keldi" belgilash</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Multi-Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {/* Filter: Course */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Yo'nalish / Kurs
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">Barcha kurslar</option>
              {coursesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Group */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Guruh
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">Barcha guruhlar ({groupsList.length})</option>
              {groupsList.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Teacher */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              O'qituvchi
            </label>
            <select
              value={selectedTeacher}
              onChange={(e) => {
                setSelectedTeacher(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">Barcha ustozlar</option>
              {teachersList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Davomat */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Davomat Holati
            </label>
            <select
              value={selectedAttendanceFilter}
              onChange={(e) => {
                setSelectedAttendanceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">Barchasi (Keldi / Kelmadi)</option>
              <option value="present">🟢 Keldi</option>
              <option value="absent">🔴 Kelmadi</option>
              <option value="late">🟡 Kechikdi</option>
              <option value="excused">🔵 Sababli</option>
            </select>
          </div>

          {/* Filter: Payment */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Oylik To'lov
            </label>
            <select
              value={selectedPaymentFilter}
              onChange={(e) => {
                setSelectedPaymentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">Barchasi (To'lov)</option>
              <option value="paid">✓ To'langan</option>
              <option value="pending">⚠️ Qarzdor</option>
              <option value="partial">⏳ Qisman to'langan</option>
              <option value="overdue">🚫 Muddati o'tgan</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={onResetFilters}
              disabled={!hasActiveFilters}
              className={`w-full py-1.5 px-3 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-1.5 ${
                hasActiveFilters
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
                  : "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtrni tozalash</span>
            </button>
          </div>
        </div>

        {/* Counter summary bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
          <div>
            Topildi:{" "}
            <span className="font-bold text-white">
              {sortedStudents.length} ta
            </span>{" "}
            o'quvchi
            {hasActiveFilters && " (Filtr qo'llanilgan)"}
          </div>
          <div className="flex items-center gap-2">
            <span>Sahifada:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(
                  e.target.value === "ALL" ? "ALL" : Number(e.target.value),
                );
                setCurrentPage(1);
              }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value={25}>25 ta</option>
              <option value={50}>50 ta</option>
              <option value={100}>100 ta</option>
              <option value={200}>200 ta</option>
              <option value="ALL">Barchasi (860+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main High-Performance Attendance Table */}
      <div className="overflow-x-auto min-h-[420px]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px] select-none sticky top-0 z-10">
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allCurrentSelected}
                  onChange={toggleSelectAllCurrent}
                  className="rounded border-slate-700 text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="p-3.5 w-14">#</th>
              <th className="p-3.5 min-w-[200px]">O'quvchi F.I.O & ID</th>
              <th className="p-3.5 min-w-[150px]">Telefon Raqami</th>
              <th className="p-3.5 min-w-[150px]">Ota-ona Raqami</th>
              <th className="p-3.5 min-w-[170px]">Guruh & Kurs</th>
              <th className="p-3.5 min-w-[140px]">O'qituvchi & Xona</th>
              <th className="p-3.5 min-w-[220px] text-center">
                Bugungi Davomat (Tezkor)
              </th>
              <th className="p-3.5 min-w-[90px] text-center">Vaqt</th>
              <th className="p-3.5 min-w-[130px]">Oylik To'lov</th>
              <th className="p-3.5 min-w-[120px] text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan={11} className="p-12 text-center text-slate-400">
                  <AlertCircle className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                  <p className="text-sm font-semibold">
                    Hech qanday o'quvchi topilmadi
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring
                  </p>
                </td>
              </tr>
            ) : (
              currentStudents.map((student, index) => {
                const payBadge = getPaymentBadge(student.paymentStatus);
                const isSelected = selectedIds.has(student.id);
                const rowNum =
                  pageSize === "ALL"
                    ? index + 1
                    : (currentPage - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors duration-150 ${
                      isSelected
                        ? "bg-brand-950/30 hover:bg-brand-950/50"
                        : "hover:bg-slate-800/40"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectStudent(student.id)}
                        className="rounded border-slate-700 text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
                      />
                    </td>

                    {/* Row Index */}
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                      {rowNum}
                    </td>

                    {/* Full Name & ID */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner ${
                            student.gender === "Erkak"
                              ? "bg-indigo-900/60 text-indigo-200 border border-indigo-700/50"
                              : "bg-rose-900/60 text-rose-200 border border-rose-700/50"
                          }`}
                        >
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </div>
                        <div>
                          <div
                            onClick={() => onOpenStudentDetail(student)}
                            className="font-bold text-slate-100 hover:text-brand-400 cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{student.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] text-slate-400">
                              {student.id}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              • {student.attendanceRate}% faol
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-3.5">
                      <a
                        href={`tel:${student.phone.replace(/\s+/g, "")}`}
                        className="font-mono font-medium text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition"
                      >
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{student.phone}</span>
                      </a>
                    </td>

                    {/* Parent Phone */}
                    <td className="p-3.5">
                      <div className="flex items-center justify-between gap-1">
                        <div>
                          <a
                            href={`tel:${student.parentPhone.replace(/\s+/g, "")}`}
                            className="font-mono text-[11px] text-slate-300 hover:text-sky-400 block"
                          >
                            {student.parentPhone}
                          </a>
                          <span className="text-[10px] text-slate-500">
                            {student.parentName}
                          </span>
                        </div>
                        <button
                          onClick={() => onOpenSmsSingle(student)}
                          title="Ota-onasiga SMS yuborish"
                          className="p-1.5 bg-slate-800 hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 rounded-lg transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Group & Course */}
                    <td className="p-3.5">
                      <div>
                        <span
                          className="font-semibold text-slate-200 block truncate max-w-[160px]"
                          title={student.group}
                        >
                          {student.group}
                        </span>
                        <span
                          className="text-[10px] text-brand-400 font-medium truncate block max-w-[160px]"
                          title={student.course}
                        >
                          {student.course}
                        </span>
                      </div>
                    </td>

                    {/* Teacher & Room */}
                    <td className="p-3.5">
                      <div>
                        <span
                          className="font-medium text-slate-200 block truncate max-w-[140px]"
                          title={student.teacher}
                        >
                          {student.teacher}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {student.room} ({student.shift})
                        </span>
                      </div>
                    </td>

                    {/* Interactive Attendance Buttons (Tezkor Davomat) */}
                    <td className="p-3.5 text-center">
                      <div className="inline-flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 shadow-inner">
                        <button
                          onClick={() =>
                            onUpdateAttendance(student.id, "present")
                          }
                          title="Keldi deb belgilash"
                          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            student.attendanceStatus === "present"
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                              : "text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/40"
                          }`}
                        >
                          <span>✓</span>
                          <span>Keldi</span>
                        </button>

                        <button
                          onClick={() =>
                            onUpdateAttendance(student.id, "absent")
                          }
                          title="Kelmadi deb belgilash"
                          className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            student.attendanceStatus === "absent"
                              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105"
                              : "text-slate-400 hover:text-rose-400 hover:bg-rose-950/40"
                          }`}
                        >
                          <span>✗</span>
                          <span>Kelmadi</span>
                        </button>

                        <button
                          onClick={() => onUpdateAttendance(student.id, "late")}
                          title="Kechikdi deb belgilash"
                          className={`px-1.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                            student.attendanceStatus === "late"
                              ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105"
                              : "text-slate-400 hover:text-amber-400 hover:bg-amber-950/40"
                          }`}
                        >
                          <span>⏱ Kechikdi</span>
                        </button>

                        <button
                          onClick={() =>
                            onUpdateAttendance(student.id, "excused")
                          }
                          title="Sababli deb belgilash"
                          className={`px-1.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                            student.attendanceStatus === "excused"
                              ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105"
                              : "text-slate-400 hover:text-sky-400 hover:bg-sky-950/40"
                          }`}
                        >
                          <span>🔵 Sababli</span>
                        </button>
                      </div>
                    </td>

                    {/* Check-in Time */}
                    <td className="p-3.5 text-center font-mono text-[11px]">
                      {student.attendanceStatus === "present" ||
                      student.attendanceStatus === "late" ? (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-bold">
                          {student.checkInTime || "08:30"}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>

                    {/* Payment Status & Amount */}
                    <td className="p-3.5">
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full border ${payBadge.color}`}
                        >
                          {payBadge.label}
                        </span>
                        <p className="text-[11px] font-semibold text-slate-300 mt-0.5">
                          {formatSum(student.monthlyFee)}
                        </p>
                        {student.paymentStatus !== "paid" && (
                          <p className="text-[10px] text-rose-400 font-semibold">
                            Qarz: {formatSum(student.remainingAmount)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick Payment Button */}
                        <button
                          onClick={() => onOpenPayment(student)}
                          title="To'lov qabul qilish / Chek chiqarish"
                          className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </button>

                        {/* View Student Profile */}
                        <button
                          onClick={() => onOpenStudentDetail(student)}
                          title="O'quvchi kartochkasi & Davomat tarixi"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Student */}
                        <button
                          onClick={() => onEditStudent(student)}
                          title="Tahrirlash"
                          className="p-1.5 bg-slate-800 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 rounded-lg transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Student */}
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `${student.fullName} ni tizimdan o'chirishni tasdiqlaysizmi?`,
                              )
                            ) {
                              onDeleteStudent(student.id);
                            }
                          }}
                          title="O'chirish"
                          className="p-1.5 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pageSize !== "ALL" && totalPages > 1 && (
        <div className="p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 bg-slate-950/60">
          <div>
            Jami{" "}
            <span className="font-bold text-white">
              {sortedStudents.length}
            </span>{" "}
            ta o'quvchidan{" "}
            <span className="font-bold text-white">
              {(currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, sortedStudents.length)}
            </span>{" "}
            ko'rsatilmoqda (Sahifa {currentPage} / {totalPages})
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Birinchi sahifa"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Oldingi"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Current page indicator pills */}
            <div className="flex items-center gap-1 px-2">
              <span className="font-bold text-white bg-brand-600 px-3 py-1 rounded-lg">
                {currentPage}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 px-1">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Keyingi"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Oxirgi sahifa"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
