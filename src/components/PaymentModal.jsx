import { useState } from "react";
import { CreditCard, X, DollarSign, Receipt } from "lucide-react";
import { formatSum } from "../utils/helpers";

export default function PaymentModal({
  isOpen,
  onClose,
  student,
  onProcessPayment,
}) {
  const [payAmount, setPayAmount] = useState(() =>
    student
      ? student.remainingAmount > 0
        ? student.remainingAmount
        : student.monthlyFee
      : 0,
  );
  const [payMethod, setPayMethod] = useState("Payme / Click");
  const [discount, setDiscount] = useState(() =>
    student ? student.discount || 0 : 0,
  );
  const [note, setNote] = useState("");

  if (!isOpen || !student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payAmount <= 0) {
      alert("Iltimos, to'lov summasini kiriting!");
      return;
    }

    onProcessPayment({
      studentId: student.id,
      amount: Number(payAmount),
      method: payMethod,
      discount: Number(discount),
      note,
    });
  };

  const handleSetFull = () => {
    setPayAmount(
      student.remainingAmount > 0
        ? student.remainingAmount
        : student.monthlyFee,
    );
  };

  const handleSetHalf = () => {
    setPayAmount(Math.floor(student.monthlyFee / 2 / 10000) * 10000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                Oylik To'lovni Qabul Qilish
              </h3>
              <p className="text-xs text-slate-400">
                O'quvchi to'lovini qayd qilish va kvitansiya generatsiyasi
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Student Info Card */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-white text-base">
                  {student.fullName}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID:{" "}
                  <span className="font-mono text-brand-400">{student.id}</span>{" "}
                  | Guruh:{" "}
                  <span className="text-slate-200 font-semibold">
                    {student.group}
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Telefon:{" "}
                  <span className="text-slate-300 font-mono">
                    {student.phone}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">
                  Oylik to'lov:
                </span>
                <span className="text-sm font-extrabold text-emerald-400">
                  {formatSum(student.monthlyFee)}
                </span>
                {student.remainingAmount > 0 && (
                  <span className="text-[11px] font-bold text-rose-400 block mt-0.5">
                    Qarz: {formatSum(student.remainingAmount)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Payment Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                To'lov Summasi (so'm)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSetFull}
                  className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md hover:bg-emerald-500/30 transition"
                >
                  To'liq (100%)
                </button>
                <button
                  type="button"
                  onClick={handleSetHalf}
                  className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded-md hover:bg-amber-500/30 transition"
                >
                  50% to'lov
                </button>
              </div>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="1000"
                step="1000"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              To'lov Turi
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "Payme / Click",
                "Naqd pul",
                "Uzum Bank",
                "Bank o'tkazmasi",
              ].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setPayMethod(m)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition ${
                    payMethod === m
                      ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-sm"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Chegirma (Discount) & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Chegirma (so'm)
              </label>
              <input
                type="number"
                min="0"
                step="10000"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Izoh / Kassa eslatmasi
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Masalan: 5-oy to'lovi"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Buttons */}
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
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/25 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Receipt className="w-4 h-4" />
              <span>To'lovni Tasdiqlash va Chek</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
