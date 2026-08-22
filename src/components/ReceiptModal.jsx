import { Printer, X, CheckCircle, GraduationCap } from "lucide-react";
import { formatSum } from "../utils/helpers";

export default function ReceiptModal({ isOpen, onClose, receiptData }) {
  if (!isOpen || !receiptData) return null;

  const {
    receiptId,
    student,
    amount,
    method,
    discount,
    date,
    time,
    cashierName = "Ma'muriyat (Bosh Kassa)",
  } = receiptData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up print:border-none print:shadow-none print:w-full print:max-w-none print:bg-white print:text-black">
        {/* Modal Top Bar (hidden in print) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60 print:hidden">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            To'lov Kvitansiyasi (Chek)
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content Body */}
        <div
          className="p-6 text-slate-100 print:text-black bg-white/5 print:bg-white"
          id="printable-receipt"
        >
          {/* Center Brand Header */}
          <div className="text-center border-b border-dashed border-slate-700 pb-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto mb-2 print:bg-black">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight text-white print:text-black">
              EDUSMART TA'LIM MARKAZI
            </h2>
            <p className="text-[11px] text-slate-400 print:text-gray-600">
              Toshkent shahri, Chilonzor filiali
            </p>
            <p className="text-[11px] text-slate-400 font-mono print:text-gray-600">
              Tel: +998 (71) 200-88-00 | Web: edusmart.uz
            </p>
          </div>

          {/* Receipt Meta */}
          <div className="space-y-1.5 text-xs border-b border-dashed border-slate-700 pb-3 mb-3">
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                Chek raqami:
              </span>
              <span className="font-mono font-bold text-brand-400 print:text-black">
                {receiptId || "#CHK-2025-9041"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                Sana va vaqt:
              </span>
              <span className="font-mono text-slate-300 print:text-black">
                {date || new Date().toISOString().slice(0, 10)} |{" "}
                {time || "12:00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                Kassir / Operator:
              </span>
              <span className="text-slate-300 print:text-black">
                {cashierName}
              </span>
            </div>
          </div>

          {/* Student & Course Info */}
          <div className="space-y-1.5 text-xs border-b border-dashed border-slate-700 pb-3 mb-3">
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                O'quvchi F.I.O:
              </span>
              <span className="font-bold text-white print:text-black">
                {student.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                Talaba ID:
              </span>
              <span className="font-mono text-slate-300 print:text-black">
                {student.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">Guruh:</span>
              <span className="font-semibold text-slate-200 print:text-black">
                {student.group}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                O'qituvchi:
              </span>
              <span className="text-slate-300 print:text-black">
                {student.teacher}
              </span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-1.5 text-xs border-b border-dashed border-slate-700 pb-3 mb-3">
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                Oylik to'lov summasi:
              </span>
              <span className="font-mono text-slate-300 print:text-black">
                {formatSum(student.monthlyFee)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-amber-400 print:text-gray-700">
                <span>Chegirma:</span>
                <span className="font-mono">- {formatSum(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400 print:text-gray-600">
                To'lov usuli:
              </span>
              <span className="font-semibold text-emerald-400 print:text-black">
                {method}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
              <span className="font-bold text-sm text-white print:text-black">
                TO'LANGAN SUMMA:
              </span>
              <span className="font-mono font-extrabold text-base text-emerald-400 print:text-black">
                {formatSum(amount)}
              </span>
            </div>
          </div>

          {/* Bottom QR & Footer */}
          <div className="text-center pt-2">
            <div className="flex items-center justify-center gap-2 text-emerald-400 print:text-green-700 text-xs font-bold mb-1">
              <CheckCircle className="w-4 h-4" />
              <span>TO'LOV QABUL QILINDI</span>
            </div>
            <p className="text-[10px] text-slate-400 print:text-gray-500">
              To'lov uchun tashakkur! EduSmart ma'muriyati.
            </p>
          </div>
        </div>

        {/* Actions (hidden in print) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
          >
            Yopish
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-brand-500/25 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Chop Etish (Print)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
