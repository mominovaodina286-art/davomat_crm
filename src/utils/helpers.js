// helpers.js - Utility functions for formatting, export, calculations and audio

export function formatSum(amount) {
  if (amount === undefined || amount === null) return "0 so'm";
  return amount.toLocaleString("uz-UZ") + " so'm";
}

export function formatCompactSum(amount) {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + " mlrd";
  }
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + " mln";
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(0) + " ming";
  }
  return String(amount);
}

export function getAttendanceBadge(status) {
  switch (status) {
    case "present":
      return {
        label: "Keldi",
        code: "P",
        color:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
        btnActive: "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30",
        dotColor: "bg-emerald-500",
        tag: "success",
      };
    case "absent":
      return {
        label: "Kelmadi",
        code: "A",
        color:
          "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800",
        btnActive: "bg-rose-600 text-white shadow-sm shadow-rose-500/30",
        dotColor: "bg-rose-500",
        tag: "danger",
      };
    case "late":
      return {
        label: "Kechikdi",
        code: "L",
        color:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
        btnActive: "bg-amber-500 text-white shadow-sm shadow-amber-500/30",
        dotColor: "bg-amber-500",
        tag: "warning",
      };
    case "excused":
      return {
        label: "Sababli",
        code: "E",
        color:
          "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-800",
        btnActive: "bg-sky-600 text-white shadow-sm shadow-sky-500/30",
        dotColor: "bg-sky-500",
        tag: "info",
      };
    default:
      return {
        label: "Noma'lum",
        code: "-",
        color:
          "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
        btnActive: "bg-gray-600 text-white",
        dotColor: "bg-gray-400",
        tag: "neutral",
      };
  }
}

export function getPaymentBadge(status) {
  switch (status) {
    case "paid":
      return {
        label: "To'langan",
        color:
          "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
        tag: "success",
      };
    case "pending":
      return {
        label: "Qarzdor",
        color:
          "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700",
        tag: "danger",
      };
    case "partial":
      return {
        label: "Qisman to'langan",
        color:
          "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700",
        tag: "warning",
      };
    case "overdue":
      return {
        label: "Muddati o'tgan",
        color:
          "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700",
        tag: "danger",
      };
    default:
      return {
        label: "Kutilmoqda",
        color:
          "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
        tag: "neutral",
      };
  }
}

// Export students to CSV
export function exportToCSV(students, filename = "oquvchilar_davomati.csv") {
  const headers = [
    "ID",
    "F.I.O",
    "Telefon",
    "Ota-ona Telefoni",
    "Guruh",
    "Yo'nalish",
    "O'qituvchi",
    "Xona",
    "Smena",
    "Bugungi Davomat",
    "Kelgan Vaqti",
    "Davomat Ko'rsatkichi (%)",
    "To'lov Holati",
    "Oylik To'lov (so'm)",
    "To'langan Summa (so'm)",
    "Qarzdorlik (so'm)",
    "Oxirgi To'lov Sanasi",
    "Izoh",
  ];

  const rows = students.map((s) => [
    s.id,
    `"${s.fullName}"`,
    `"${s.phone}"`,
    `"${s.parentPhone}"`,
    `"${s.group}"`,
    `"${s.course}"`,
    `"${s.teacher}"`,
    `"${s.room}"`,
    `"${s.shift}"`,
    s.attendanceStatus === "present"
      ? "Keldi"
      : s.attendanceStatus === "absent"
        ? "Kelmadi"
        : s.attendanceStatus === "late"
          ? "Kechikdi"
          : "Sababli",
    s.checkInTime || "-",
    `${s.attendanceRate}%`,
    s.paymentStatus === "paid"
      ? "To'langan"
      : s.paymentStatus === "pending"
        ? "Qarzdor"
        : s.paymentStatus === "partial"
          ? "Qisman to'langan"
          : "Muddati o'tgan",
    s.monthlyFee,
    s.paidAmount,
    s.remainingAmount,
    s.lastPaymentDate || "-",
    `"${s.notes || ""}"`,
  ]);

  const csvContent =
    "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Beep sound feedback for scanner / actions
export function playSuccessBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch {
    // Audio context might fail without user gesture, safe to ignore
  }
}
