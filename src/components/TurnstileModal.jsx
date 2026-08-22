import { useState, useEffect, useRef } from "react";
import { QrCode, X, ScanLine, AlertCircle, User, Volume2 } from "lucide-react";
import { playSuccessBeep, formatSum } from "../utils/helpers";

export default function TurnstileModal({
  isOpen,
  onClose,
  students,
  onCheckIn,
}) {
  const [scanInput, setScanInput] = useState("");
  const [lastScannedStudent, setLastScannedStudent] = useState(null);
  const [scanStatus, setScanStatus] = useState(null); // "success" | "already" | "not_found"
  const [recentScans, setRecentScans] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScanSubmit = (e) => {
    e.preventDefault();
    const query = scanInput.trim().toUpperCase();
    if (!query) return;

    // Search by ID or phone number
    const target = students.find(
      (s) =>
        s.id.toUpperCase() === query ||
        s.phone.replace(/\D/g, "") === query.replace(/\D/g, "") ||
        s.fullName.toUpperCase().includes(query),
    );

    if (target) {
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 5);

      onCheckIn(target.id, timeStr);
      playSuccessBeep();

      setLastScannedStudent({
        ...target,
        checkInTime: timeStr,
        attendanceStatus: "present",
      });
      setScanStatus("success");

      setRecentScans((prev) => [
        {
          id: target.id,
          name: target.fullName,
          group: target.group,
          time: timeStr,
          status: "Keldi",
        },
        ...prev.slice(0, 7),
      ]);
    } else {
      setScanStatus("not_found");
      setLastScannedStudent(null);
    }

    setScanInput("");
  };

  // Quick scan sample student
  const handleQuickSimulate = (student) => {
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    onCheckIn(student.id, timeStr);
    playSuccessBeep();

    setLastScannedStudent({
      ...student,
      checkInTime: timeStr,
      attendanceStatus: "present",
    });
    setScanStatus("success");

    setRecentScans((prev) => [
      {
        id: student.id,
        name: student.fullName,
        group: student.group,
        time: timeStr,
        status: "Keldi",
      },
      ...prev.slice(0, 7),
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                Turniket & QR / ID Skaner Simulyatori
              </h3>
              <p className="text-xs text-slate-400">
                Kirish eshigi va Face-ID / Turniket orqali avtomatik davomat
                olish
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

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Scanner Input Bar */}
          <form onSubmit={handleScanSubmit} className="relative">
            <div className="relative flex items-center">
              <ScanLine className="absolute left-4 w-5 h-5 text-indigo-400 animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Talaba ID (masalan: STU-0012) yoki telefon raqamini skanerlang..."
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                className="w-full bg-slate-950 border-2 border-indigo-500/50 rounded-2xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition font-mono"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
              >
                Kirish (Enter)
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              Skaner kodi kiritilganda tizim avtomatik 'Keldi' holatiga
              o'tkazadi va ovoz chiqaradi
            </p>
          </form>

          {/* Scan Feedback Result Card */}
          {scanStatus === "success" && lastScannedStudent && (
            <div className="p-4 bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center text-xl font-extrabold shadow-inner">
                    {lastScannedStudent.firstName[0]}
                    {lastScannedStudent.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-white">
                        {lastScannedStudent.fullName}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/40">
                        ✓ Xush kelibsiz!
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Guruh:{" "}
                      <strong className="text-white">
                        {lastScannedStudent.group}
                      </strong>{" "}
                      | Xona: {lastScannedStudent.room}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      ID: {lastScannedStudent.id} | Kelgan vaqti:{" "}
                      <span className="text-emerald-400 font-bold">
                        {lastScannedStudent.checkInTime}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-bold rounded-xl ${
                      lastScannedStudent.paymentStatus === "paid"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {lastScannedStudent.paymentStatus === "paid"
                      ? "To'lov To'langan"
                      : `Qarzdor: ${formatSum(lastScannedStudent.remainingAmount)}`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {scanStatus === "not_found" && (
            <div className="p-4 bg-rose-950/30 border border-rose-500/40 rounded-2xl text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>
                Bunday ID yoki telefon raqamli o'quvchi bazadan topilmadi! Qayta
                tekshiring.
              </span>
            </div>
          )}

          {/* Quick simulation buttons (Sample students) */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2.5">
              Tezkor sinov uchun tasodifiy o'quvchilar:
            </p>
            <div className="flex flex-wrap gap-2">
              {students.slice(0, 4).map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleQuickSimulate(st)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {st.fullName} ({st.id})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Scans Log */}
          {recentScans.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2">
                Oxirgi qayd etilgan kirishlar (Log):
              </p>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {recentScans.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-semibold text-slate-200">
                        {r.name}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        ({r.group})
                      </span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">
                      {r.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
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
