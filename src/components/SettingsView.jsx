import { useState } from "react";
import {
  Settings,
  Building2,
  Clock,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Palette,
  Save,
  Sliders,
  RefreshCw,
  Download,
  Plus,
  Trash2,
} from "lucide-react";

export default function SettingsView({
  darkMode,
  setDarkMode,
  onResetDatabase,
  onExportBackup,
  showToast,
}) {
  const [activeTab, setActiveTab] = useState("general");

  // General center settings state
  const [centerName, setCenterName] = useState("EduSmart Ta'lim Markazi");
  const [slogan, setSlogan] = useState(
    "Kelajak kasblari va zamonaviy fanlar akademiyasi",
  );
  const [mainPhone, setMainPhone] = useState("+998 (71) 200-88-00");
  const [supportPhone, setSupportPhone] = useState("+998 (90) 123-45-67");
  const [mainAddress, setMainAddress] = useState(
    "Toshkent shahri, Chilonzor tumani, 9-mavze, 24-bino",
  );
  const [workHours, setWorkHours] = useState("08:00 - 21:00");
  const [offDay, setOffDay] = useState("Yakshanba");

  // Attendance & Turnstile rules state
  const [gracePeriodMinutes, setGracePeriodMinutes] = useState(15);
  const [autoMarkAbsent, setAutoMarkAbsent] = useState(true);
  const [turnstileSound, setTurnstileSound] = useState(true);
  const [autoSmsToParents, setAutoSmsToParents] = useState(true);
  const [autoSmsDelayMinutes, setAutoSmsDelayMinutes] = useState(30);

  // Financial & Pricing rules state
  const [paymentDueDay, setPaymentDueDay] = useState(5);
  const [allowPartialPayments, setAllowPartialPayments] = useState(true);
  const [familyDiscountPercent, setFamilyDiscountPercent] = useState(10);
  const [grantDiscountPercent, setGrantDiscountPercent] = useState(50);
  const [currencySymbol, setCurrencySymbol] = useState("so'm");
  const [receiptFooterText, setReceiptFooterText] = useState(
    "To'lov uchun tashakkur! O'qishlaringizda omad tilaymiz. EduSmart Ma'muriyati.",
  );

  // SMS Templates state
  const [smsGatewayProvider, setSmsGatewayProvider] = useState("Eskiz.uz");
  const [smsApiKey, setSmsApiKey] = useState("eskiz_live_key_9938472847291847");
  const [smsSenderName, setSmsSenderName] = useState("EDUSMART");
  const [tplAbsent, setTplAbsent] = useState(
    "Hurmatli ota-ona! Farzandingiz {student_name} bugun {group} darsiga qatnashmadi. EduSmart: +998(71)200-88-00",
  );
  const [tplDebt, setTplDebt] = useState(
    "Hurmatli {student_name}! Sizning {group} kursi bo'yicha {debt_amount} so'm to'lovingiz muddati keldi. EduSmart.",
  );
  const [tplPaymentSuccess, setTplPaymentSuccess] = useState(
    "Hurmatli {student_name}! Sizning {amount} so'm to'lovingiz qabul qilindi. Chek: {receipt_id}. EduSmart.",
  );

  // Branches list
  const [branchesList, setBranchesList] = useState([
    {
      id: 1,
      name: "Bosh Bino (Chilonzor filiali)",
      rooms: 12,
      capacity: 350,
      manager: "Jasur Kenjayev",
      phone: "+998 71 200-88-01",
    },
    {
      id: 2,
      name: "2-Bino (Yunusobod filiali)",
      rooms: 10,
      capacity: 280,
      manager: "Sardor Rahimov",
      phone: "+998 71 200-88-02",
    },
    {
      id: 3,
      name: "3-Bino (Mirzo Ulug'bek filiali)",
      rooms: 8,
      capacity: 240,
      manager: "Dilnoza Toirova",
      phone: "+998 71 200-88-03",
    },
  ]);

  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchRooms, setNewBranchRooms] = useState(6);

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeoutHours, setSessionTimeoutHours] = useState(12);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("Barcha sozlamalar muvaffaqiyatli saqlandi!", "success");
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;
    const newB = {
      id: Date.now(),
      name: newBranchName.trim(),
      rooms: Number(newBranchRooms),
      capacity: Number(newBranchRooms) * 25,
      manager: "Yangi Menejer",
      phone: "+998 90 000-00-00",
    };
    setBranchesList([...branchesList, newB]);
    setNewBranchName("");
    showToast("Yangi filial ro'yxatga qo'shildi!", "success");
  };

  const handleDeleteBranch = (id) => {
    if (confirm("Ushbu filialni ro'yxatdan o'chirishni tasdiqlaysizmi?")) {
      setBranchesList(branchesList.filter((b) => b.id !== id));
      showToast("Filial o'chirildi", "info");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Settings Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950/30 to-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold flex items-center justify-center shadow-lg ring-4 ring-brand-500/20">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Tizim Sozlamalari (Configuration Center)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              O'quv markazi qoidalari, davomat parametrlari, moliya va SMS
              shlyuz sozlamalari
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-brand-500/25 transition hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          <span>O'zgarishlarni Saqlash</span>
        </button>
      </div>

      {/* Main Settings Layout (Left tabs, Right form panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Subtabs Sidebar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1 lg:sticky lg:top-24 h-fit">
          {[
            { id: "general", label: "Markaz Profili & Brend", icon: Building2 },
            {
              id: "attendance",
              label: "Davomat & Turniket Qoidalari",
              icon: Clock,
            },
            {
              id: "finance",
              label: "Moliya & To'lov Qoidalari",
              icon: CreditCard,
            },
            {
              id: "sms",
              label: "SMS Shlyuz & Shablonlar",
              icon: MessageSquare,
            },
            { id: "branches", label: "Filiallar & Xonalar", icon: Sliders },
            {
              id: "security",
              label: "Xavfsizlik & Zaxira (Backup)",
              icon: ShieldCheck,
            },
            {
              id: "appearance",
              label: "Tizim Interfeysi & Mavzu",
              icon: Palette,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/25 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span className="text-left">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Content Area */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* 1. GENERAL CENTER PROFILE */}
            {activeTab === "general" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-400" />
                    <span>O'quv Markazi Asosiy Ma'lumotlari</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kvitansiyalarda va rasmiy xabarlarda ko'rinadigan markaz
                    rekvizitlari
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Markaz Nomi *
                    </label>
                    <input
                      type="text"
                      value={centerName}
                      onChange={(e) => setCenterName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Markaz Shiori / Slogan
                    </label>
                    <input
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Asosiy Telefon Raqami (Call-center)
                    </label>
                    <input
                      type="text"
                      value={mainPhone}
                      onChange={(e) => setMainPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Qo'shimcha / Administrator Telefoni
                    </label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">
                      Markaziy Bino Manzili
                    </label>
                    <input
                      type="text"
                      value={mainAddress}
                      onChange={(e) => setMainAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Ish Vaqti
                    </label>
                    <input
                      type="text"
                      value={workHours}
                      onChange={(e) => setWorkHours(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Dam Olish Kuni
                    </label>
                    <input
                      type="text"
                      value={offDay}
                      onChange={(e) => setOffDay(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. ATTENDANCE & ACCESS RULES */}
            {activeTab === "attendance" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span>Davomat va Turniket Nazorati Qoidalari</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kechikish chegaralari, ovozli signallar va avtomatlashtirish
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Ruxsat berilgan kechikish vaqti (Grace Period)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Dars boshlangandan so'ng necha daqiqagacha "Kechikdi"
                        deb hisoblanadi (keyin "Kelmadi")
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={gracePeriodMinutes}
                        onChange={(e) =>
                          setGracePeriodMinutes(Number(e.target.value))
                        }
                        className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white font-mono"
                      />
                      <span className="text-slate-400">daqiqa</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Avtomatik "Kelmadi" belgilash
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Kechikish vaqti o'tgach, kelmagan deb belgilash
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoMarkAbsent}
                      onChange={(e) => setAutoMarkAbsent(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Turniketda ovozli tasdiq (Audio Beep)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        O'quvchi ID yoki QR skaner qilganda muvaffaqiyatli
                        signal chalish
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={turnstileSound}
                      onChange={(e) => setTurnstileSound(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Kelmaganlar uchun avtomatik SMS yuborish
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        O'quvchi darsga kelmaganda ma'lum vaqt o'tib ota-onaga
                        avtomat SMS jo'natish
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoSmsToParents}
                      onChange={(e) => setAutoSmsToParents(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        SMS kechikishi (Kutish vaqti)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Dars boshlangandan necha daqiqa o'tib SMS yuborilsin
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="10"
                        max="120"
                        value={autoSmsDelayMinutes}
                        onChange={(e) =>
                          setAutoSmsDelayMinutes(Number(e.target.value))
                        }
                        className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white font-mono"
                      />
                      <span className="text-slate-400">daqiqa</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. FINANCE & PRICING RULES */}
            {activeTab === "finance" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span>Moliya, Tariflar va Cheklar Sozlamalari</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Oylik to'lov muddatlari, chegirma mezonlari va kvitansiya
                    matnlari
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Oylik To'lov Oxirgi Sanasi (Har oyning ...)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="28"
                        value={paymentDueDay}
                        onChange={(e) =>
                          setPaymentDueDay(Number(e.target.value))
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-brand-500"
                      />
                      <span className="text-slate-400 font-bold">
                        -sanasigacha
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Qisman To'lovlarga Ruxsat Berish
                    </label>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        checked={allowPartialPayments}
                        onChange={(e) =>
                          setAllowPartialPayments(e.target.checked)
                        }
                        className="w-5 h-5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      />
                      <span className="text-slate-300">
                        50% yoki qisman to'lovlarni qabul qilish
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Valyuta Belgisi
                    </label>
                    <input
                      type="text"
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Oilaviy Chegirma (Oila a'zolari uchun, %)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={familyDiscountPercent}
                      onChange={(e) =>
                        setFamilyDiscountPercent(Number(e.target.value))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Grant / Imtiyozli Chegirma (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={grantDiscountPercent}
                      onChange={(e) =>
                        setGrantDiscountPercent(Number(e.target.value))
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">
                      Kvitansiya (Chek) Pastki Eslatma Matni (Footer)
                    </label>
                    <textarea
                      rows={3}
                      value={receiptFooterText}
                      onChange={(e) => setReceiptFooterText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. SMS GATEWAY & TEMPLATES */}
            {activeTab === "sms" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <span>SMS Shlyuz (Gateway) va Xabar Shablonlari</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Avtomatlashtirilgan xabarlar matni va provayder sozlamalari
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      SMS Provayderi
                    </label>
                    <select
                      value={smsGatewayProvider}
                      onChange={(e) => setSmsGatewayProvider(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Eskiz.uz">Eskiz.uz (O'zbekiston)</option>
                      <option value="PlayMobile">PlayMobile SMS Gateway</option>
                      <option value="SMS-Assistant">SMS-Assistant Pro</option>
                      <option value="Twilio">Twilio Global SMS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Sender ID (Jo'natuvchi Nomi)
                    </label>
                    <input
                      type="text"
                      value={smsSenderName}
                      onChange={(e) => setSmsSenderName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      API Authorization Key
                    </label>
                    <input
                      type="password"
                      value={smsApiKey}
                      onChange={(e) => setSmsApiKey(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Templates Textareas */}
                <div className="space-y-4 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-rose-400 mb-1">
                      🔴 Kelmaganlik haqida SMS shabloni:
                    </label>
                    <textarea
                      rows={2}
                      value={tplAbsent}
                      onChange={(e) => setTplAbsent(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-brand-500 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-amber-400 mb-1">
                      🟡 To'lov qarzdorlik eslatmasi shabloni:
                    </label>
                    <textarea
                      rows={2}
                      value={tplDebt}
                      onChange={(e) => setTplDebt(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-brand-500 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-emerald-400 mb-1">
                      🟢 To'lov qabul qilinganlik kvitansiyasi shabloni:
                    </label>
                    <textarea
                      rows={2}
                      value={tplPaymentSuccess}
                      onChange={(e) => setTplPaymentSuccess(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-brand-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. BRANCHES & ROOMS MANAGEMENT */}
            {activeTab === "branches" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-indigo-400" />
                    <span>Filiallar va Binolarni Sozlash</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Yangi filial qo'shish va dars xonalari sig'imini boshqarish
                  </p>
                </div>

                {/* Add New Branch Form */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-end gap-3 text-xs">
                  <div className="flex-1 w-full">
                    <label className="block font-semibold text-slate-300 mb-1">
                      Yangi Filial Nomi
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: 4-Bino (Sergeli filiali)"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="w-full sm:w-32">
                    <label className="block font-semibold text-slate-300 mb-1">
                      Xonalar soni
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={newBranchRooms}
                      onChange={(e) =>
                        setNewBranchRooms(Number(e.target.value))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBranch}
                    className="w-full sm:w-auto px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Filial Qo'shish</span>
                  </button>
                </div>

                {/* Existing Branches List */}
                <div className="space-y-3">
                  {branchesList.map((branch) => (
                    <div
                      key={branch.id}
                      className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {branch.name}
                        </h4>
                        <p className="text-slate-400 mt-0.5">
                          {branch.rooms} ta o'quv xonasi • Sig'im:{" "}
                          {branch.capacity} o'quvchi • Rahbar: {branch.manager}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-semibold">
                          {branch.phone}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SECURITY & BACKUP */}
            {activeTab === "security" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-rose-400" />
                    <span>Xavfsizlik, Zaxira Nusxalar va Ma'lumotlar</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ma'lumotlar bazasini eksport qilish, tiklash va sessiya
                    xavfsizligi
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Ikki bosqichli autentifikatsiya (2FA SMS)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Administrator kirganda telefoniga SMS kod yuborish
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Avtomatik chiqib ketish (Session Timeout)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Faoliyatsizlik vaqtidan so'ng tizimdan avtomat chiqish
                      </p>
                    </div>
                    <select
                      value={sessionTimeoutHours}
                      onChange={(e) =>
                        setSessionTimeoutHours(Number(e.target.value))
                      }
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-semibold"
                    >
                      <option value={1}>1 soat</option>
                      <option value={6}>6 soat</option>
                      <option value={12}>12 soat</option>
                      <option value={24}>24 soat</option>
                    </select>
                  </div>

                  {/* Database Actions Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <Download className="w-4 h-4" />
                        <span>Barcha 860+ Ma'lumotlarni Yuklash (JSON)</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        O'quvchilar, to'lovlar va davomat tarixining to'liq
                        zaxira nusxasini kompyuterga saqlash
                      </p>
                      <button
                        type="button"
                        onClick={onExportBackup}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Zaxirani Yuklab Olish</span>
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-rose-400 font-bold">
                        <RefreshCw className="w-4 h-4" />
                        <span>Ma'lumotlar Bazasini Qayta Tiklash</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Barcha test o'zgarishlarini tozalab, boshlang'ich 860 ta
                        o'quvchi bazasiga qaytarish
                      </p>
                      <button
                        type="button"
                        onClick={onResetDatabase}
                        className="w-full py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-xl font-bold transition flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Boshlang'ichga Qaytarish</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. APPEARANCE & LOCALIZATION */}
            {activeTab === "appearance" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <span>Tizim Ko'rinishi, Mavzu va Tillar</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Dark / Light mode va interfeys tilini sozlash
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Tungi Rejim (Dark Theme)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Ko'zni charchatmaydigan qora zamonaviy CRM interfeysi
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`px-4 py-2 rounded-xl font-bold transition ${
                        darkMode
                          ? "bg-brand-600 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {darkMode
                        ? "🌙 Dark Mode (Aktiv)"
                        : "☀️ Light Mode (Aktiv)"}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">
                        Tizim Tili (Language)
                      </h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Interfeys va hisobotlar asosiy tili
                      </p>
                    </div>
                    <select
                      defaultValue="uz"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-semibold"
                    >
                      <option value="uz">🇺🇿 O'zbek tili (Lotin)</option>
                      <option value="uz_cyrl">🇺🇿 Ўзбек тили (Кирилл)</option>
                      <option value="ru">🇷🇺 Русский язык</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons Bottom */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                O'zgarishlar darhol mahalliy xotirada faollashadi
              </span>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-brand-500/25 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                <span>Sozlamalarni Saqlash</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
