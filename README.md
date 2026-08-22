# 🎓 EduSmart CRM - O'quv Markazi Davomat va Moliya Boshqaruv Tizimi

EduSmart CRM — bu zamonaviy o'quv markazlari, maktablar va ta'lim muassasalari uchun mo'ljallangan to'liq interaktiv **Davomat, Oylik To'lovlar, O'qituvchilar va Guruhlar Boshqaruv Tizimi**.

Tizimda **kamida 860 ta haqiqiy o'zbekcha o'quvchilar bazasi** mavjud bo'lib, barcha ma'lumotlar (ism, familiya, telefon raqamlari, ota-onalar kontaktlari, fanlar, guruhlar va to'lovlar) real vaqt rejimida boshqariladi.

---

## 🌟 Asosiy Imkoniyatlar

- 📊 **Jonli Dashboard & KPI**: Kelganlar foizi, kelmaganlar soni, kutilayotgan tushum va umumiy qarzdorlik.
- 🎓 **O'quvchilar CRM (860+ O'quvchi)**: Ko'p bosqichli tezkor qidiruv, filtrlash, ommaviy davomat belgilash.
- 👨‍🏫 **O'qituvchilar Bo'limi**: Barcha ustozlar, ularning guruhlari, xonalari, davomat foizi va reytingi.
- 🏢 **Guruhlar & Xonalar Jadvali**: 35 ta guruh, dars smenalari (ertalab, kunduzgi, kechki) va bandlik monitoringi.
- 💳 **Moliya & Kassa CRM**: Qarzdorlar ro'yxati, to'lov qabul qilish va rasmiy kvitansiya (Chek) chop etish.
- 📱 **SMS Hub**: Kelmaganlarning ota-onalariga va qarzdorlarga avtomatik SMS yuborish simulyatori.
- 🚪 **Turniket & QR Skaner**: ID va shtrix-kod orqali avtomat davomat qilish va audio signal (beep).
- ⚙️ **Kengaytirilgan Tizim Sozlamalari**: Markaz rekvizitlari, davomat va to'lov qoidalari, filiallar boshqaruvi, SMS shlyuz sozlamalari, 2FA va ma'lumotlar bazasini to'liq JSON eksport/import qilish.
- 🌓 **Dark / Light Mode & Responsiv**: Desktop vertikal sidebar + mobil moslashuvchan drawer menyu.

---

## 🚀 O'rnatish va Ishga Tushirish

```bash
# 1. Loyiha papkasiga o'tish
cd figma

# 2. Kerakli paketlarni o'rnatish
npm install

# 3. Mahalliy serverda ishga tushirish
npm run dev
```

Brauzerda `http://localhost:5173` manziliga kiring.

---

## 🌐 Internetga Joylash (Deployment)

### Vercel orqali (Tavsiya etiladi - 1 daqiqa):
1. [vercel.com](https://vercel.com) ga kiring va GitHub profilingiz orqali kiring.
2. **"Add New Project"** tugmasini bosing va ushbu GitHub repozitoriyasini tanlang.
3. **"Deploy"** tugmasini bosing. Tizim avtomatik tarzda jonli internet manzilini (`.vercel.app`) beradi!

### Netlify orqali:
1. [netlify.com](https://netlify.com) ga kiring.
2. **"Import from Git"** tugmasini bosing va repozitoriyani tanlang.
3. Build command: `npm run build`, Publish directory: `dist`.

---

## 🛠 Texnologiyalar
- **React 19**
- **Vite**
- **Tailwind CSS**
- **Lucide React Icons**
- **Canvas Confetti**

