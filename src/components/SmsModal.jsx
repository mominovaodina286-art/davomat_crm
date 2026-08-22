import { useState } from "react";
import {
  Send,
  X,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatSum } from "../utils/helpers";

const DEFAULT_TEMPLATES = {
  absent:
    "Hurmatli ota-ona! Farzandingiz {student_name} bugun {group} darsiga qatnashmadi. Iltimos, sababini bildiring. EduSmart: +998(71)200-88-00",
  debtor:
    "Hurmatli {student_name}! Sizning {group} kursi bo'yicha {debt_amount} so'm oylik to'lovingiz muddati keldi. EduSmart CRM.",
};

export default function SmsModal({
  isOpen,
  onClose,
  initialMode = "absent", // "absent" | "debtor" | "single"
  absentStudents = [],
  debtorStudents = [],
  singleStudent = null,
}) {
  const [activeTab, setActiveTab] = useState(initialMode);
  const [customTemplate, setCustomTemplate] = useState(() => {
    if (initialMode === "single" && singleStudent) {
      return `Assalomu alaykum, ${singleStudent.fullName}! EduSmart o'quv markazidan sizga muhim xabar...`;
    }
    return DEFAULT_TEMPLATES[initialMode] || DEFAULT_TEMPLATES.absent;
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  if (!isOpen) return null;

  // Selected recipient list based on active tab
  const recipientList =
    activeTab === "absent"
      ? absentStudents
      : activeTab === "debtor"
        ? debtorStudents
        : singleStudent
          ? [singleStudent]
          : [];

  const handleSendSms = () => {
    if (recipientList.length === 0) {
      alert("Xabar yuborish uchun qabul qiluvchilar ro'yxati bo'sh!");
      return;
    }

    setIsSending(true);
    setSendProgress(10);

    const interval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setSentSuccess(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Preview generated first sample SMS
  const sampleRecipient = recipientList[0];
  let sampleMessage = customTemplate;
  if (sampleRecipient) {
    sampleMessage = sampleMessage
      .replace(/\{student_name\}/g, sampleRecipient.fullName)
      .replace(/\{group\}/g, sampleRecipient.group)
      .replace(
        /\{debt_amount\}/g,
        formatSum(
          sampleRecipient.remainingAmount || sampleRecipient.monthlyFee,
        ),
      )
      .replace(
        /\{phone\}/g,
        sampleRecipient.parentPhone || sampleRecipient.phone,
      );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-500/30">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                SMS Xabarnomalar Markazi (SMS Hub)
              </h3>
              <p className="text-xs text-slate-400">
                Ota-onalar va o'quvchilarga avtomatik SMS yuborish
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

        {/* Tab Switcher */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveTab("absent");
              setCustomTemplate(
                "Hurmatli ota-ona! Farzandingiz {student_name} bugun {group} darsiga qatnashmadi. Iltimos, sababini bildiring. EduSmart: +998(71)200-88-00",
              );
              setSentSuccess(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "absent"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Kelmaganlar Ota-onasiga ({absentStudents.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("debtor");
              setCustomTemplate(
                "Hurmatli {student_name}! Sizning {group} kursi bo'yicha {debt_amount} so'm oylik to'lovingiz muddati keldi. EduSmart CRM.",
              );
              setSentSuccess(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === "debtor"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "bg-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Qarzdorlarga Eslatma ({debtorStudents.length})</span>
          </button>

          {singleStudent && (
            <button
              onClick={() => setActiveTab("single")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "single"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Yakka SMS ({singleStudent.firstName})</span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {sentSuccess ? (
            <div className="p-6 text-center bg-emerald-950/40 border border-emerald-500/50 rounded-2xl animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-white">
                SMS Xabarlar Muvaffaqiyatli Yuborildi!
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Jami{" "}
                <strong className="text-emerald-400">
                  {recipientList.length} ta
                </strong>{" "}
                qabul qiluvchiga shlyuz orqali yetkazildi.
              </p>
            </div>
          ) : (
            <>
              {/* Template Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    SMS Xabar Matni (Shablon)
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {customTemplate.length} belgi (1 SMS)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
                  placeholder="Xabar matnini kiriting..."
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-500">
                    Mavjud parametrlar:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTemplate((prev) => prev + " {student_name}")
                    }
                    className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-brand-300 rounded font-mono hover:bg-slate-700"
                  >
                    {"{student_name}"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTemplate((prev) => prev + " {group}")
                    }
                    className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-brand-300 rounded font-mono hover:bg-slate-700"
                  >
                    {"{group}"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTemplate((prev) => prev + " {debt_amount}")
                    }
                    className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-brand-300 rounded font-mono hover:bg-slate-700"
                  >
                    {"{debt_amount}"}
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              {sampleRecipient && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block mb-1">
                    Namuna ko'rinishi (
                    {sampleRecipient.parentPhone || sampleRecipient.phone}):
                  </span>
                  <p className="text-xs text-slate-200 font-sans italic bg-sky-950/20 p-2.5 rounded-xl border border-sky-500/20">
                    "{sampleMessage}"
                  </p>
                </div>
              )}

              {/* Progress Bar when sending */}
              {isSending && (
                <div className="space-y-1.5 animate-fade-in">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>SMS xabarlar uzatilmoqda...</span>
                    <span>{sendProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${sendProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Qabul qiluvchilar:{" "}
            <strong className="text-white">{recipientList.length} ta</strong>{" "}
            kontakt
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
            >
              Yopish
            </button>
            {!sentSuccess && (
              <button
                onClick={handleSendSms}
                disabled={isSending || recipientList.length === 0}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-sky-600/25 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSending
                    ? "Yuborilmoqda..."
                    : `SMS Yuborish (${recipientList.length})`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
