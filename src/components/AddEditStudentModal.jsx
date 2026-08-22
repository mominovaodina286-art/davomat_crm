import { useState } from "react";
import { UserPlus, Edit3, X } from "lucide-react";
import { BRANCHES, COURSES_CONFIG } from "../data/studentsData";

export default function AddEditStudentModal({
  isOpen,
  onClose,
  onSave,
  studentToEdit = null,
  totalExistingCount = 860,
}) {
  const isEditing = Boolean(studentToEdit);

  const initialCourseIdx = studentToEdit
    ? Math.max(
        0,
        COURSES_CONFIG.findIndex((c) => c.name === studentToEdit.course),
      )
    : 0;
  const initialGroupIdx = studentToEdit
    ? Math.max(
        0,
        (COURSES_CONFIG[initialCourseIdx]?.groups || []).findIndex(
          (g) => g.name === studentToEdit.group,
        ),
      )
    : 0;

  const [firstName, setFirstName] = useState(
    () => studentToEdit?.firstName || "",
  );
  const [lastName, setLastName] = useState(() => studentToEdit?.lastName || "");
  const [gender, setGender] = useState(() => studentToEdit?.gender || "Erkak");
  const [phone, setPhone] = useState(() => studentToEdit?.phone || "+998 90 ");
  const [parentPhone, setParentPhone] = useState(
    () => studentToEdit?.parentPhone || "+998 99 ",
  );
  const [parentName, setParentName] = useState(
    () => studentToEdit?.parentName || "",
  );
  const [branch, setBranch] = useState(
    () => studentToEdit?.branch || BRANCHES[0],
  );
  const [selectedCourseIndex, setSelectedCourseIndex] =
    useState(initialCourseIdx);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(initialGroupIdx);
  const [customFee, setCustomFee] = useState(
    () => studentToEdit?.monthlyFee || COURSES_CONFIG[0].groups[0].fee,
  );
  const [attendanceStatus, setAttendanceStatus] = useState(
    () => studentToEdit?.attendanceStatus || "present",
  );
  const [notes, setNotes] = useState(() => studentToEdit?.notes || "");

  const currentCourse =
    COURSES_CONFIG[selectedCourseIndex] || COURSES_CONFIG[0];
  const currentGroup =
    currentCourse.groups[selectedGroupIndex] || currentCourse.groups[0];

  // When group changes, auto set custom fee
  const handleCourseChange = (idx) => {
    setSelectedCourseIndex(idx);
    setSelectedGroupIndex(0);
    setCustomFee(COURSES_CONFIG[idx].groups[0].fee);
  };

  const handleGroupChange = (idx) => {
    setSelectedGroupIndex(idx);
    setCustomFee(currentCourse.groups[idx].fee);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      alert("Iltimos, ism va familiyani to'liq kiriting!");
      return;
    }

    const paidAmt = studentToEdit
      ? studentToEdit.paidAmount
      : Number(customFee);
    const remainingAmt = Math.max(0, Number(customFee) - paidAmt);
    const payStatus =
      remainingAmt === 0 ? "paid" : paidAmt > 0 ? "partial" : "pending";

    const payload = {
      ...(studentToEdit || {}),
      id: studentToEdit
        ? studentToEdit.id
        : `STU-${String(totalExistingCount + 1).padStart(4, "0")}`,
      serialNumber: studentToEdit
        ? studentToEdit.serialNumber
        : totalExistingCount + 1,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${lastName.trim()} ${firstName.trim()}`,
      gender,
      phone: phone.trim(),
      parentPhone: parentPhone.trim(),
      parentName:
        parentName.trim() ||
        `${lastName.trim()} ${gender === "Erkak" ? "Olim aka (Otasi)" : "Dilshoda opa (Onasi)"}`,
      branch,
      course: currentCourse.name,
      group: currentGroup.name,
      teacher: currentGroup.teacher,
      room: currentGroup.room,
      shift: currentGroup.shift,
      monthlyFee: Number(customFee),
      attendanceStatus,
      checkInTime: attendanceStatus === "present" ? "08:30" : "-",
      attendanceRate: studentToEdit ? studentToEdit.attendanceRate : 100,
      paymentStatus: studentToEdit ? studentToEdit.paymentStatus : payStatus,
      paidAmount: paidAmt,
      remainingAmount: remainingAmt,
      notes: notes.trim(),
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-500/20 text-brand-400 rounded-2xl border border-brand-500/30">
              {isEditing ? (
                <Edit3 className="w-6 h-6" />
              ) : (
                <UserPlus className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {isEditing
                  ? "O'quvchi Ma'lumotlarini Tahrirlash"
                  : "Yangi O'quvchi Qo'shish"}
              </h3>
              <p className="text-xs text-slate-400">
                O'quvchi shaxsiy, aloqa va kurs ma'lumotlarini kiritish
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Ism & Familiya & Jinsi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ismi *
              </label>
              <input
                type="text"
                required
                placeholder="Jasur"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Familiyasi *
              </label>
              <input
                type="text"
                required
                placeholder="Karimov"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Jinsi
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Erkak">Erkak (O'g'il bola)</option>
                <option value="Ayol">Ayol (Qiz bola)</option>
              </select>
            </div>
          </div>

          {/* Telefonlar & Ota-ona */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                O'quvchi Telefoni *
              </label>
              <input
                type="text"
                required
                placeholder="+998 90 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ota-ona Telefoni *
              </label>
              <input
                type="text"
                required
                placeholder="+998 99 765-43-21"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ota-ona F.I.O / Kimligi
              </label>
              <input
                type="text"
                placeholder="Karimov Rustam (Otasi)"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Bino & Yo'nalish & Guruh */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                O'quv Binosi / Filial
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Kurs Yo'nalishi
              </label>
              <select
                value={selectedCourseIndex}
                onChange={(e) => handleCourseChange(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {COURSES_CONFIG.map((c, idx) => (
                  <option key={c.name} value={idx}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Guruh
              </label>
              <select
                value={selectedGroupIndex}
                onChange={(e) => handleGroupChange(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {currentCourse.groups.map((g, idx) => (
                  <option key={g.name} value={idx}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Auto Group Info Preview */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">
                O'qituvchi:
              </span>
              <span className="font-semibold text-brand-300">
                {currentGroup.teacher}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Xona:</span>
              <span className="font-semibold text-slate-200">
                {currentGroup.room}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Smena:</span>
              <span className="font-semibold text-amber-400">
                {currentGroup.shift}
              </span>
            </div>
          </div>

          {/* Oylik To'lov & Bugungi Davomat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Oylik To'lov Summasi (so'm)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={customFee}
                onChange={(e) => setCustomFee(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bugungi Davomat Holati
              </label>
              <select
                value={attendanceStatus}
                onChange={(e) => setAttendanceStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                <option value="present">🟢 Keldi (Bugun darsda)</option>
                <option value="absent">🔴 Kelmadi</option>
                <option value="late">🟡 Kechikdi</option>
                <option value="excused">🔵 Sababli</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Qo'shimcha Izoh / Sabab
            </label>
            <input
              type="text"
              placeholder="O'quvchi haqida qo'shimcha ma'lumot..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Footer inside form */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 transition"
            >
              {isEditing ? "O'zgarishlarni Saqlash" : "O'quvchini Qo'shish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
