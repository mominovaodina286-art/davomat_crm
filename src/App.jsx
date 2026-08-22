import { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AttendanceTable from "./components/AttendanceTable";
import TeachersView from "./components/TeachersView";
import GroupsView from "./components/GroupsView";
import FinanceView from "./components/FinanceView";
import AdminView from "./components/AdminView";
import SettingsView from "./components/SettingsView";
import TurnstileModal from "./components/TurnstileModal";
import PaymentModal from "./components/PaymentModal";
import ReceiptModal from "./components/ReceiptModal";
import SmsModal from "./components/SmsModal";
import StudentDetailModal from "./components/StudentDetailModal";
import AddEditStudentModal from "./components/AddEditStudentModal";
import { generateInitialStudents } from "./data/studentsData";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "edusmart_students_v3";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "students" | "teachers" | "groups" | "finance" | "admin"
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load students from LocalStorage or generate 860 realistic students
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 800) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return generateInitialStudents(860);
  });

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Filtering states
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [selectedTeacher, setSelectedTeacher] = useState("ALL");
  const [selectedAttendanceFilter, setSelectedAttendanceFilter] =
    useState("ALL");
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState("ALL");

  // Modals state
  const [isTurnstileOpen, setIsTurnstileOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  const [smsMode, setSmsMode] = useState("absent");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);

  // Selected student targets for modals
  const [selectedStudentForAction, setSelectedStudentForAction] =
    useState(null);
  const [activeReceiptData, setActiveReceiptData] = useState(null);

  // Toast Notification system
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Branch filtered students
  const branchFilteredStudents = useMemo(() => {
    if (selectedBranch === "ALL") return students;
    return students.filter((s) => s.branch === selectedBranch);
  }, [students, selectedBranch]);

  // Comprehensive Real-Time Statistics Calculation
  const stats = useMemo(() => {
    const total = branchFilteredStudents.length;
    let present = 0;
    let absent = 0;
    let late = 0;
    let excused = 0;
    let paidCount = 0;
    let debtCount = 0;
    let totalExpectedRevenue = 0;
    let totalCollectedRevenue = 0;
    let totalDebtRevenue = 0;

    branchFilteredStudents.forEach((s) => {
      if (s.attendanceStatus === "present") present += 1;
      else if (s.attendanceStatus === "absent") absent += 1;
      else if (s.attendanceStatus === "late") late += 1;
      else if (s.attendanceStatus === "excused") excused += 1;

      if (s.paymentStatus === "paid") paidCount += 1;
      else debtCount += 1;

      totalExpectedRevenue += s.monthlyFee || 0;
      totalCollectedRevenue += s.paidAmount || 0;
      totalDebtRevenue += s.remainingAmount || 0;
    });

    const presentRate =
      total > 0 ? ((present / total) * 100).toFixed(1) : "0.0";
    const absentRate = total > 0 ? ((absent / total) * 100).toFixed(1) : "0.0";
    const lateRate = total > 0 ? ((late / total) * 100).toFixed(1) : "0.0";
    const excusedRate =
      total > 0 ? ((excused / total) * 100).toFixed(1) : "0.0";
    const paidRate = total > 0 ? ((paidCount / total) * 100).toFixed(1) : "0.0";

    return {
      total,
      present,
      presentRate,
      absent,
      absentRate,
      late,
      lateRate,
      excused,
      excusedRate,
      paidCount,
      paidRate,
      debtCount,
      totalExpectedRevenue,
      totalCollectedRevenue,
      totalDebtRevenue,
    };
  }, [branchFilteredStudents]);

  // Absent & Debtor student lists for SMS Hub
  const absentStudentsList = useMemo(() => {
    return branchFilteredStudents.filter(
      (s) => s.attendanceStatus === "absent",
    );
  }, [branchFilteredStudents]);

  const debtorStudentsList = useMemo(() => {
    return branchFilteredStudents.filter((s) => s.paymentStatus !== "paid");
  }, [branchFilteredStudents]);

  // Handlers for Attendance Updates
  const handleUpdateAttendance = (id, newStatus) => {
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            attendanceStatus: newStatus,
            checkInTime:
              newStatus === "present" || newStatus === "late"
                ? s.checkInTime !== "-"
                  ? s.checkInTime
                  : timeStr
                : "-",
          };
        }
        return s;
      }),
    );

    const st = students.find((s) => s.id === id);
    const label =
      newStatus === "present"
        ? "Keldi"
        : newStatus === "absent"
          ? "Kelmadi"
          : newStatus === "late"
            ? "Kechikdi"
            : "Sababli";
    showToast(`${st?.fullName || "O'quvchi"} davomati: ${label}`, "info");
  };

  const handleBulkUpdateAttendance = (ids, newStatus) => {
    const setIds = new Set(ids);
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);

    setStudents((prev) =>
      prev.map((s) => {
        if (setIds.has(s.id)) {
          return {
            ...s,
            attendanceStatus: newStatus,
            checkInTime:
              newStatus === "present" || newStatus === "late" ? timeStr : "-",
          };
        }
        return s;
      }),
    );

    showToast(`${ids.length} ta o'quvchi birgalikda yangilandi!`, "success");
  };

  // Check-in via Turnstile Scanner
  const handleTurnstileCheckIn = (id, timeStr) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            attendanceStatus: "present",
            checkInTime: timeStr,
          };
        }
        return s;
      }),
    );
  };

  // Payment Processing
  const handleProcessPayment = ({
    studentId,
    amount,
    method,
    discount,
    note,
  }) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newPaidAmount = (student.paidAmount || 0) + amount;
    const finalFee = student.monthlyFee - discount;
    const remaining = Math.max(0, finalFee - newPaidAmount);
    const newStatus = remaining === 0 ? "paid" : "partial";

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            paidAmount: newPaidAmount,
            remainingAmount: remaining,
            discount: (s.discount || 0) + discount,
            paymentStatus: newStatus,
            lastPaymentDate: new Date().toISOString().slice(0, 10),
            paymentMethod: method,
            notes: note ? note : s.notes,
          };
        }
        return s;
      }),
    );

    // Create Receipt data & open receipt
    const receipt = {
      receiptId: `#CHK-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      student: {
        ...student,
        paidAmount: newPaidAmount,
        remainingAmount: remaining,
        discount: (student.discount || 0) + discount,
      },
      amount,
      method,
      discount,
      date: new Date().toLocaleDateString("uz-UZ"),
      time: new Date().toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setIsPaymentOpen(false);
    setActiveReceiptData(receipt);
    setIsReceiptOpen(true);
    confetti({ particleCount: 60, spread: 60 });
    showToast(`${student.fullName} uchun to'lov qabul qilindi!`, "success");
  };

  // Add / Edit Student save
  const handleSaveStudent = (studentData) => {
    if (
      selectedStudentForAction &&
      students.some((s) => s.id === studentData.id)
    ) {
      // Edit
      setStudents((prev) =>
        prev.map((s) => (s.id === studentData.id ? studentData : s)),
      );
      showToast(`${studentData.fullName} ma'lumotlari yangilandi!`, "success");
    } else {
      // Add
      setStudents((prev) => [studentData, ...prev]);
      confetti({ particleCount: 70, spread: 60 });
      showToast(`Yangi o'quvchi muvaffaqiyatli qo'shildi!`, "success");
    }
    setIsAddEditOpen(false);
    setSelectedStudentForAction(null);
  };

  // Delete Student
  const handleDeleteStudent = (id) => {
    const target = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(
      `${target?.fullName || "O'quvchi"} ro'yxatdan o'chirildi`,
      "warning",
    );
  };

  // Filter Reset
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCourse("ALL");
    setSelectedGroup("ALL");
    setSelectedTeacher("ALL");
    setSelectedAttendanceFilter("ALL");
    setSelectedPaymentFilter("ALL");
    showToast("Filtrlar tozalandi", "info");
  };

  // Quick stat card click filter updater
  const handleStatCardFilter = (filterUpdates) => {
    if (filterUpdates.attendance !== undefined) {
      setSelectedAttendanceFilter(filterUpdates.attendance);
    }
    if (filterUpdates.payment !== undefined) {
      setSelectedPaymentFilter(filterUpdates.payment);
    }
    setActiveTab("students");
  };

  // Select teacher from TeachersView & navigate to Students table
  const handleSelectTeacherFromView = (teacherName) => {
    setSelectedTeacher(teacherName);
    setActiveTab("students");
    showToast(`Ustoz: ${teacherName} o'quvchilari filtri qo'yildi`, "info");
  };

  // Select group from GroupsView & navigate to Students table
  const handleSelectGroupFromView = (groupName) => {
    setSelectedGroup(groupName);
    setActiveTab("students");
    showToast(`Guruh: ${groupName} o'quvchilari filtri qo'yildi`, "info");
  };

  // Reset database handler
  const handleResetDatabase = () => {
    if (
      confirm(
        "Ma'lumotlar bazasini boshlang'ich 860 ta o'quvchi holatiga qaytarishni tasdiqlaysizmi?",
      )
    ) {
      const fresh = generateInitialStudents(860);
      setStudents(fresh);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      } catch {
        // ignore
      }
      showToast("Ma'lumotlar bazasi qayta tiklandi!", "success");
    }
  };

  // Export JSON backup handler
  const handleExportBackup = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(students, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `edusmart_backup_${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Zaxira nusxasi (JSON) yuklab olindi!", "success");
  };

  // Modal Open Triggers
  const openPaymentModal = (student) => {
    setSelectedStudentForAction(student);
    setIsPaymentOpen(true);
  };

  const openStudentDetailModal = (student) => {
    setSelectedStudentForAction(student);
    setIsDetailOpen(true);
  };

  const openEditModal = (student) => {
    setSelectedStudentForAction(student);
    setIsAddEditOpen(true);
  };

  const openAddModal = () => {
    setSelectedStudentForAction(null);
    setIsAddEditOpen(true);
  };

  const openSingleSmsModal = (student) => {
    setSelectedStudentForAction(student);
    setSmsMode("single");
    setIsSmsOpen(true);
  };

  const openAbsentSmsModal = () => {
    setSelectedStudentForAction(null);
    setSmsMode("absent");
    setIsSmsOpen(true);
  };

  const openDebtorSmsModal = () => {
    setSelectedStudentForAction(null);
    setSmsMode("debtor");
    setIsSmsOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 border border-slate-700 text-white rounded-2xl shadow-2xl backdrop-blur-lg">
          {toast.type === "success" && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
          {toast.type === "warning" && (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
          {toast.type === "info" && (
            <Sparkles className="w-5 h-5 text-brand-400" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Left Vertical Sidebar (Desktop persistent, Mobile drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        stats={stats}
        onOpenTurnstile={() => setIsTurnstileOpen(true)}
        onOpenSmsModal={() => {
          setSmsMode("absent");
          setIsSmsOpen(true);
        }}
        onOpenAddModal={openAddModal}
      />

      {/* Main Content Area (padded on left for fixed sidebar on lg screens) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onToggleMobileSidebar={() =>
            setIsMobileSidebarOpen(!isMobileSidebarOpen)
          }
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          onOpenTurnstile={() => setIsTurnstileOpen(true)}
          onOpenSmsModal={() => {
            setSmsMode("absent");
            setIsSmsOpen(true);
          }}
          onOpenAddModal={openAddModal}
          filteredStudents={branchFilteredStudents}
          totalAbsent={stats.absent}
          onOpenAbsentSms={openAbsentSmsModal}
        />

        {/* Main View Switcher Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1720px] w-full mx-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <StatCards
                stats={stats}
                onFilterChange={handleStatCardFilter}
                currentFilter={{
                  attendance: selectedAttendanceFilter,
                  payment: selectedPaymentFilter,
                }}
              />
              <AnalyticsCharts students={branchFilteredStudents} />
              <AttendanceTable
                students={branchFilteredStudents}
                onUpdateAttendance={handleUpdateAttendance}
                onBulkUpdateAttendance={handleBulkUpdateAttendance}
                onOpenPayment={openPaymentModal}
                onOpenStudentDetail={openStudentDetailModal}
                onOpenSmsSingle={openSingleSmsModal}
                onDeleteStudent={handleDeleteStudent}
                onEditStudent={openEditModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                selectedTeacher={selectedTeacher}
                setSelectedTeacher={setSelectedTeacher}
                selectedAttendanceFilter={selectedAttendanceFilter}
                setSelectedAttendanceFilter={setSelectedAttendanceFilter}
                selectedPaymentFilter={selectedPaymentFilter}
                setSelectedPaymentFilter={setSelectedPaymentFilter}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}

          {/* TAB 2: STUDENTS CRM (860+) */}
          {activeTab === "students" && (
            <div className="space-y-6 animate-fade-in">
              <AttendanceTable
                students={branchFilteredStudents}
                onUpdateAttendance={handleUpdateAttendance}
                onBulkUpdateAttendance={handleBulkUpdateAttendance}
                onOpenPayment={openPaymentModal}
                onOpenStudentDetail={openStudentDetailModal}
                onOpenSmsSingle={openSingleSmsModal}
                onDeleteStudent={handleDeleteStudent}
                onEditStudent={openEditModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                selectedTeacher={selectedTeacher}
                setSelectedTeacher={setSelectedTeacher}
                selectedAttendanceFilter={selectedAttendanceFilter}
                setSelectedAttendanceFilter={setSelectedAttendanceFilter}
                selectedPaymentFilter={selectedPaymentFilter}
                setSelectedPaymentFilter={setSelectedPaymentFilter}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}

          {/* TAB 3: TEACHERS */}
          {activeTab === "teachers" && (
            <TeachersView
              students={branchFilteredStudents}
              onSelectTeacher={handleSelectTeacherFromView}
            />
          )}

          {/* TAB 4: GROUPS & ROOMS */}
          {activeTab === "groups" && (
            <GroupsView
              students={branchFilteredStudents}
              onSelectGroup={handleSelectGroupFromView}
            />
          )}

          {/* TAB 5: FINANCE & CASHIER */}
          {activeTab === "finance" && (
            <FinanceView
              students={branchFilteredStudents}
              stats={stats}
              onOpenPayment={openPaymentModal}
              onOpenSmsSingle={openSingleSmsModal}
              onOpenDebtorSms={openDebtorSmsModal}
            />
          )}

          {/* TAB 6: ADMIN PANEL */}
          {activeTab === "admin" && (
            <AdminView
              students={branchFilteredStudents}
              onResetDatabase={handleResetDatabase}
              onExportBackup={handleExportBackup}
            />
          )}

          {/* TAB 7: SETTINGS CENTER */}
          {activeTab === "settings" && (
            <SettingsView
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onResetDatabase={handleResetDatabase}
              onExportBackup={handleExportBackup}
              showToast={showToast}
              totalStudents={students.length}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <TurnstileModal
        isOpen={isTurnstileOpen}
        onClose={() => setIsTurnstileOpen(false)}
        students={branchFilteredStudents}
        onCheckIn={handleTurnstileCheckIn}
      />

      <PaymentModal
        key={`pay-${selectedStudentForAction?.id || "none"}`}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        student={selectedStudentForAction}
        onProcessPayment={handleProcessPayment}
      />

      <ReceiptModal
        key={`rec-${activeReceiptData?.receiptId || "none"}`}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receiptData={activeReceiptData}
      />

      <SmsModal
        key={`sms-${smsMode}-${selectedStudentForAction?.id || "bulk"}`}
        isOpen={isSmsOpen}
        onClose={() => setIsSmsOpen(false)}
        initialMode={smsMode}
        absentStudents={absentStudentsList}
        debtorStudents={debtorStudentsList}
        singleStudent={selectedStudentForAction}
      />

      <StudentDetailModal
        key={`detail-${selectedStudentForAction?.id || "none"}`}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        student={selectedStudentForAction}
        onOpenPayment={openPaymentModal}
        onOpenSms={openSingleSmsModal}
        onUpdateStatus={handleUpdateAttendance}
      />

      <AddEditStudentModal
        key={`add-edit-${selectedStudentForAction?.id || "new"}`}
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={selectedStudentForAction}
        totalExistingCount={students.length}
      />
    </div>
  );
}
