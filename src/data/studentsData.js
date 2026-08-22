// studentsData.js - 860+ Realistic Students Generator and Initial Data
export const BRANCHES = [
  "Bosh Bino (Chilonzor filiali)",
  "2-Bino (Yunusobod filiali)",
  "3-Bino (Mirzo Ulug'bek filiali)",
];

export const COURSES_CONFIG = [
  {
    name: "IT & Dasturlash",
    groups: [
      {
        name: "Frontend-React-101",
        teacher: "Jasur Kenjayev",
        room: "IT Xona 101",
        shift: "08:30 - 10:30",
        fee: 950000,
      },
      {
        name: "Frontend-Vue-102",
        teacher: "Jasur Kenjayev",
        room: "IT Xona 102",
        shift: "11:00 - 13:00",
        fee: 900000,
      },
      {
        name: "Backend-NodeJS-201",
        teacher: "Farhod Azimov",
        room: "Server Lab 201",
        shift: "14:30 - 16:30",
        fee: 1100000,
      },
      {
        name: "Python-Django-202",
        teacher: "Farhod Azimov",
        room: "Server Lab 202",
        shift: "18:30 - 20:30",
        fee: 1050000,
      },
      {
        name: "Fullstack-Web-301",
        teacher: "Rustam Qodirov",
        room: "IT Xona 103",
        shift: "09:00 - 12:00",
        fee: 1300000,
      },
      {
        name: "Mobile-Flutter-101",
        teacher: "Jasur Kenjayev",
        room: "Lab 203",
        shift: "16:30 - 18:30",
        fee: 1000000,
      },
      {
        name: "Python-AI-DataScience",
        teacher: "Rustam Qodirov",
        room: "AI Lab 305",
        shift: "14:00 - 16:00",
        fee: 1250000,
      },
      {
        name: "Kiberxavfsizlik-401",
        teacher: "Rustam Qodirov",
        room: "Xavfsizlik Xonasi",
        shift: "18:30 - 20:30",
        fee: 1400000,
      },
      {
        name: "QA-Software-Testing",
        teacher: "Farhod Azimov",
        room: "IT Xona 104",
        shift: "11:00 - 13:00",
        fee: 850000,
      },
      {
        name: "Bolalar-IT-Scratch-01",
        teacher: "Nilufar Karimova",
        room: "Kids Lab 105",
        shift: "14:00 - 15:30",
        fee: 650000,
      },
    ],
  },
  {
    name: "Xorijiy Tillar",
    groups: [
      {
        name: "IELTS-Rocket-7.5",
        teacher: "Nodira Rasulova",
        room: "Language Lab 1",
        shift: "08:30 - 10:30",
        fee: 850000,
      },
      {
        name: "IELTS-Standard-6.5",
        teacher: "Nodira Rasulova",
        room: "Language Lab 1",
        shift: "11:00 - 13:00",
        fee: 800000,
      },
      {
        name: "General-English-Inter",
        teacher: "Dilnoza Yoqubova",
        room: "Xona 204",
        shift: "14:30 - 16:30",
        fee: 650000,
      },
      {
        name: "English-Beginner-A1",
        teacher: "Dilnoza Yoqubova",
        room: "Xona 205",
        shift: "16:30 - 18:30",
        fee: 600000,
      },
      {
        name: "English-Kids-Level2",
        teacher: "Nilufar Karimova",
        room: "Kids Room 1",
        shift: "10:00 - 11:30",
        fee: 550000,
      },
      {
        name: "Rus-tili-Muloqot-Pro",
        teacher: "Dilnoza Yoqubova",
        room: "Xona 206",
        shift: "09:00 - 11:00",
        fee: 600000,
      },
      {
        name: "Nemis-tili-Goethe-B2",
        teacher: "Nodira Rasulova",
        room: "Xona 207",
        shift: "18:30 - 20:30",
        fee: 750000,
      },
      {
        name: "Koreys-tili-Topik-I",
        teacher: "Dilnoza Yoqubova",
        room: "Xona 208",
        shift: "14:00 - 16:00",
        fee: 700000,
      },
      {
        name: "Arab-tili-Grammatika",
        teacher: "Bobur Saidov",
        room: "Xona 209",
        shift: "16:30 - 18:30",
        fee: 650000,
      },
    ],
  },
  {
    name: "Aniq Fanlar & DTM",
    groups: [
      {
        name: "Matematika-Milliy-Sertifikat",
        teacher: "Bobur Saidov",
        room: "Audit 301",
        shift: "08:30 - 10:30",
        fee: 700000,
      },
      {
        name: "Matematika-DTM-2025",
        teacher: "Bobur Saidov",
        room: "Audit 301",
        shift: "11:00 - 13:00",
        fee: 650000,
      },
      {
        name: "Fizika-Olimpiada-Pro",
        teacher: "Bobur Saidov",
        room: "Audit 302",
        shift: "14:30 - 16:30",
        fee: 700000,
      },
      {
        name: "Kimyo-Tibbiyot-Intensiv",
        teacher: "Gulnora Ergasheva",
        room: "Bio-Kimyo Lab",
        shift: "09:00 - 11:00",
        fee: 750000,
      },
      {
        name: "Biologiya-DTM-Master",
        teacher: "Gulnora Ergasheva",
        room: "Bio-Kimyo Lab",
        shift: "11:30 - 13:30",
        fee: 750000,
      },
      {
        name: "Mental-Arifmetika-Kids",
        teacher: "Nilufar Karimova",
        room: "Kids Lab 106",
        shift: "15:00 - 16:30",
        fee: 550000,
      },
      {
        name: "Ona-tili-Adabiyot-DTM",
        teacher: "Nodira Rasulova",
        room: "Audit 303",
        shift: "16:30 - 18:30",
        fee: 600000,
      },
    ],
  },
  {
    name: "Dizayn & Media",
    groups: [
      {
        name: "Grafik-Dizayn-Pro",
        teacher: "Malika Toirova",
        room: "Design Studio A",
        shift: "09:00 - 11:00",
        fee: 850000,
      },
      {
        name: "UI/UX-Figma-Design",
        teacher: "Malika Toirova",
        room: "Design Studio A",
        shift: "11:30 - 13:30",
        fee: 950000,
      },
      {
        name: "3D-Blender-Animation",
        teacher: "Malika Toirova",
        room: "Design Studio B",
        shift: "14:30 - 16:30",
        fee: 1000000,
      },
      {
        name: "Motion-Graphics-AE",
        teacher: "Sanjar Xalilov",
        room: "Media Lab",
        shift: "16:30 - 18:30",
        fee: 950000,
      },
      {
        name: "SMM-Targeting-Master",
        teacher: "Sanjar Xalilov",
        room: "Media Lab",
        shift: "18:30 - 20:30",
        fee: 800000,
      },
      {
        name: "Mobilografiya-VideoMontaj",
        teacher: "Sanjar Xalilov",
        room: "Media Studio",
        shift: "14:00 - 16:00",
        fee: 750000,
      },
    ],
  },
  {
    name: "Buxgalteriya & Biznes",
    groups: [
      {
        name: "1C-Buxgalteriya-8.3-Pro",
        teacher: "Alisher Fayziyev",
        room: "Biznes Xona 401",
        shift: "09:00 - 11:00",
        fee: 900000,
      },
      {
        name: "Amaliy-Buxgalteriya-Start",
        teacher: "Alisher Fayziyev",
        room: "Biznes Xona 401",
        shift: "14:30 - 16:30",
        fee: 850000,
      },
      {
        name: "Moliyaviy-Savodxonlik",
        teacher: "Alisher Fayziyev",
        room: "Biznes Xona 402",
        shift: "18:30 - 20:30",
        fee: 800000,
      },
    ],
  },
];

const MALE_NAMES = [
  "Sardor",
  "Jasur",
  "Azizbek",
  "Farrux",
  "Bobur",
  "Alisher",
  "Nodirbek",
  "Javohir",
  "Anvar",
  "Rustam",
  "Jamshid",
  "Ozodbek",
  "Behruz",
  "Shohruh",
  "Umid",
  "Diyor",
  "Ibrohim",
  "Asadbek",
  "Samandar",
  "Bilol",
  "Muhriddin",
  "Shohjahon",
  "Shavkat",
  "Bekzod",
  "Doniyor",
  "Sanjar",
  "Elmurod",
  "Temur",
  "Mirjalol",
  "Ulug'bek",
  "Sherzod",
  "Kamron",
  "Oybek",
  "Murod",
  "Eldor",
  "Abbos",
  "Otabek",
  "Xurshid",
  "Shahzod",
  "Ilhom",
  "Zafar",
  "Davron",
  "Jahongir",
  "Mirsaid",
  "Shoxrux",
  "Akbar",
  "Ravshan",
  "Tohir",
  "Botir",
  "Mansur",
  "Olimjon",
  "Sunnatilla",
  "Islombek",
  "Husniddin",
  "G'ayrat",
  "Abdulaziz",
  "Saidislom",
  "Muzaffar",
  "Shahboz",
  "Bunyod",
  "Sarvar",
  "Suhrob",
  "Dilmurod",
  "Shahriyor",
  "Xondamir",
];

const FEMALE_NAMES = [
  "Dilnoza",
  "Madina",
  "Mohira",
  "Nilufar",
  "Malika",
  "Sevara",
  "Kamola",
  "Ziyoda",
  "Shahlo",
  "Gulnora",
  "Feruza",
  "Marjona",
  "Rayhona",
  "Laylo",
  "Zilola",
  "Aziza",
  "Nozima",
  "Sabrina",
  "Durdona",
  "Sarvinoz",
  "Shahzoda",
  "Gulbahor",
  "Parizoda",
  "Barno",
  "Nigora",
  "Munisa",
  "Charos",
  "Umida",
  "Dilrabo",
  "Lola",
  "Hilola",
  "Shohida",
  "Komila",
  "Rukhsora",
  "Yulduz",
  "Gulchehra",
  "Feruzabonu",
  "Jasmina",
  "Go'zal",
  "Nafisa",
  "Robiya",
  "Diyora",
  "Zuhra",
  "Fotima",
  "Mubina",
  "Shirin",
  "Gulasal",
  "Dildora",
  "Nargiza",
  "Munavvar",
  "Zarina",
  "Zeboxon",
  "Guldasta",
];

const SURNAMES_BASE = [
  "Karimov",
  "Rahimov",
  "Toirov",
  "Abdullayev",
  "Qodirov",
  "Yo'ldoshev",
  "Aliyev",
  "Mahmudov",
  "Ismoilov",
  "Yusupov",
  "Sharipov",
  "Nazarov",
  "Saidov",
  "Xoliqov",
  "Tursunov",
  "Oripov",
  "Mamatov",
  "Ergashev",
  "Sobirov",
  "Rustamov",
  "Vohidov",
  "Qosimov",
  "Normatov",
  "Akbarov",
  "Boboyev",
  "Rasulov",
  "Kenjayev",
  "Azimov",
  "Yoqubov",
  "Xalilov",
  "Ochilov",
  "Jumayev",
  "Karomatov",
  "Shukurov",
  "Fayziyev",
  "Jo'rayev",
  "Mirzayev",
  "Saidmurodov",
  "G'aniyev",
  "Bozorov",
  "Safarov",
  "Haydarov",
  "Xolmatov",
  "Polvonov",
  "Shamsiyev",
  "Davlatov",
  "Ro'ziyev",
  "Berdiyev",
];

const PATRONYMICS_MALE = [
  "Alisher o'g'li",
  "Rustam o'g'li",
  "Farhod o'g'li",
  "Jasur o'g'li",
  "Nodir o'g'li",
  "Bobur o'g'li",
  "Sherzod o'g'li",
  "Ulug'bek o'g'li",
  "Anvar o'g'li",
  "Sanjar o'g'li",
  "Otabek o'g'li",
  "Ilhom o'g'li",
  "Zafar o'g'li",
  "Jamshid o'g'li",
  "Davron o'g'li",
];

const PATRONYMICS_FEMALE = [
  "Alisher qizi",
  "Rustam qizi",
  "Farhod qizi",
  "Jasur qizi",
  "Nodir qizi",
  "Bobur qizi",
  "Sherzod qizi",
  "Ulug'bek qizi",
  "Anvar qizi",
  "Sanjar qizi",
  "Otabek qizi",
  "Ilhom qizi",
  "Zafar qizi",
  "Jamshid qizi",
  "Davron qizi",
];

const PHONE_PREFIXES = [
  "90",
  "91",
  "93",
  "94",
  "95",
  "97",
  "98",
  "99",
  "88",
  "33",
  "77",
];

// Pseudo-random deterministic generator to have stable realistic 860+ records
function pseudoRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return function () {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function generateInitialStudents(count = 860) {
  const rand = pseudoRandom(20250520);
  const students = [];

  // Flatten all groups
  const allGroups = [];
  COURSES_CONFIG.forEach((course) => {
    course.groups.forEach((grp) => {
      allGroups.push({
        ...grp,
        courseName: course.name,
      });
    });
  });

  const checkInHours = [
    "08:12",
    "08:18",
    "08:24",
    "08:28",
    "08:35",
    "08:42",
    "08:50",
    "11:05",
    "11:14",
    "14:20",
    "14:28",
    "16:22",
    "18:25",
  ];
  const notesReasons = [
    "Kasal bo'lganligi haqida onasi xabar berdi",
    "Shaxsiy sabab bilan javob so'ragan",
    "Yo'l tirbandligi sababli kechikdi",
    "Maktab tadbiri tufayli qatnashmadi",
    "To'lov kechiktirilgan (25-sanagacha)",
    "Olimpiadaga tayyorgarlikda",
    "Viloyatga ketgan",
    "Shifokor ko'rigida",
    "Boshqa guruhdan ko'chib o'tgan",
    "",
  ];

  for (let i = 1; i <= count; i++) {
    const isMale = rand() > 0.44;
    const firstName = isMale
      ? MALE_NAMES[Math.floor(rand() * MALE_NAMES.length)]
      : FEMALE_NAMES[Math.floor(rand() * FEMALE_NAMES.length)];

    let baseSurname = SURNAMES_BASE[Math.floor(rand() * SURNAMES_BASE.length)];
    let lastName = baseSurname;
    if (!isMale) {
      if (baseSurname.endsWith("ov")) lastName = baseSurname + "a";
      else if (baseSurname.endsWith("ev")) lastName = baseSurname + "a";
    }

    const patronymic = isMale
      ? PATRONYMICS_MALE[Math.floor(rand() * PATRONYMICS_MALE.length)]
      : PATRONYMICS_FEMALE[Math.floor(rand() * PATRONYMICS_FEMALE.length)];

    const prefix = PHONE_PREFIXES[Math.floor(rand() * PHONE_PREFIXES.length)];
    const p1 = Math.floor(100 + rand() * 900);
    const p2 = Math.floor(10 + rand() * 90);
    const p3 = Math.floor(10 + rand() * 90);
    const phone = `+998 (${prefix}) ${p1}-${p2}-${p3}`;

    const parentPrefix =
      PHONE_PREFIXES[Math.floor(rand() * PHONE_PREFIXES.length)];
    const pp1 = Math.floor(100 + rand() * 900);
    const pp2 = Math.floor(10 + rand() * 90);
    const pp3 = Math.floor(10 + rand() * 90);
    const parentPhone = `+998 (${parentPrefix}) ${pp1}-${pp2}-${pp3}`;

    const parentRelation = isMale
      ? rand() > 0.5
        ? "Otasi"
        : "Onasi"
      : rand() > 0.5
        ? "Onasi"
        : "Otasi";
    const parentName = `${baseSurname} ${isMale ? "Olimjon" : "Dilshoda"} (${parentRelation})`;

    const grp = allGroups[i % allGroups.length];
    const branch = BRANCHES[Math.floor(rand() * BRANCHES.length)];

    // Attendance distribution
    // 74% present, 14% absent, 7% late, 5% excused
    const attRoll = rand();
    let attendanceStatus;
    let checkInTime;
    if (attRoll < 0.74) {
      attendanceStatus = "present";
      checkInTime = checkInHours[Math.floor(rand() * checkInHours.length)];
    } else if (attRoll < 0.88) {
      attendanceStatus = "absent";
      checkInTime = "-";
    } else if (attRoll < 0.95) {
      attendanceStatus = "late";
      checkInTime = "08:52";
    } else {
      attendanceStatus = "excused";
      checkInTime = "-";
    }

    // Payment distribution
    // 70% paid, 18% pending, 8% partial, 4% overdue
    const payRoll = rand();
    let paymentStatus;
    let paidAmount;
    const discount = rand() > 0.85 ? (rand() > 0.5 ? 50000 : 100000) : 0;
    const finalMonthlyFee = grp.fee - discount;

    if (payRoll < 0.7) {
      paymentStatus = "paid";
      paidAmount = finalMonthlyFee;
    } else if (payRoll < 0.88) {
      paymentStatus = "pending";
      paidAmount = 0;
    } else if (payRoll < 0.96) {
      paymentStatus = "partial";
      paidAmount = Math.floor((finalMonthlyFee * 0.5) / 10000) * 10000;
    } else {
      paymentStatus = "overdue";
      paidAmount = 0;
    }

    const pastAtt = [];
    const attCodes = ["P", "P", "P", "P", "A", "P", "L", "E", "P", "P"];
    for (let h = 0; h < 10; h++) {
      pastAtt.push(attCodes[Math.floor(rand() * attCodes.length)]);
    }

    const padId = String(i).padStart(4, "0");
    const note = notesReasons[Math.floor(rand() * notesReasons.length)];

    students.push({
      id: `STU-${padId}`,
      serialNumber: i,
      firstName,
      lastName,
      fullName: `${lastName} ${firstName}`,
      patronymic,
      gender: isMale ? "Erkak" : "Ayol",
      phone,
      parentPhone,
      parentName,
      branch,
      course: grp.courseName,
      group: grp.name,
      teacher: grp.teacher,
      room: grp.room,
      shift: grp.shift,
      attendanceStatus,
      checkInTime,
      attendanceRate: Math.floor(75 + rand() * 25), // 75% to 100%
      absentDaysTotal: Math.floor(rand() * 5),
      paymentStatus,
      monthlyFee: finalMonthlyFee,
      baseFee: grp.fee,
      discount,
      paidAmount,
      remainingAmount: finalMonthlyFee - paidAmount,
      paymentMethod:
        paymentStatus === "paid"
          ? rand() > 0.4
            ? "Payme / Click"
            : "Naqd pul"
          : "-",
      lastPaymentDate:
        paymentStatus === "paid"
          ? "2025-05-04"
          : paymentStatus === "partial"
            ? "2025-05-02"
            : "2025-04-05",
      nextPaymentDate: "2025-06-05",
      registeredDate: "2024-09-10",
      recentAttendance: pastAtt,
      notes: note,
    });
  }

  return students;
}
