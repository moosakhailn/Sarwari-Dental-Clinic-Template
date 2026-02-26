document.addEventListener("DOMContentLoaded", function() {
  const translations = {
    en: {
      one: "Home Page",
      two: "About Us",
      three: "Services",
      four: "Book Appointment",
      five: "Our Services",
      six: "We provide gentle, modern dental care for the whole family.",
      seven: "Dental Implants",
      eight: "Replace missing teeth with natural-feeling implants that look and function like real teeth.",
      nine: "Crowns & Bridges",
      ten: "Custom-made crowns and bridges restore damaged or missing teeth for a flawless smile.",
      eleven: "Deep Cleaning",
      twelve: "Professional deep cleaning to remove plaque and tartar buildup for healthy gums.",
      thirteen: "Veneers & Cosmetic Work",
      fourteen: "Enhance your smile with veneers, bonding, and other cosmetic procedures for natural-looking results.",
      fifteen: "What Our Patients Say",
      sixteen: "Providing gentle, modern dental care for the whole family. Your smile is our priority.",
      seventeen: "Quick Links",
      eighteen: "Home Page",
      nineteen: "About Us",
      twenty: "Services",
      twentyone: "Book Appointment",
      twentytwo: "Contact",
      twentythree: "123 Main Street, City, Country",
      twentyfour: "+1 123-456-7890",
      twentyfive: "example@example.com",
      twentysix: "Office Hours",
      twentyseven: "1:00 PM – 5:00 PM",
      twentyeight: "Language:",
      twentynine: "© 2026 Sarwari Dental Clinic. All rights reserved.",
      thirty: "Developed By ",
      thirtyone: "Numanullah Moosakhail."
    },
    pa: {
  one: "اصلي پاڼه",
  two: "زموږ په اړه",
  three: "خدمات",
  four: "وخت واخلئ",
  five: "زموږ خدمات",
  six: "موږ د ټولې کورنۍ لپاره نرمه او عصري د غاښونو درملنه وړاندې کوو.",
  seven: "د غاښونو ایمپلنټ",
  eight: "ورک شوي غاښونه د طبیعي احساس لرونکو ایمپلنټونو سره بدل کړئ چې د اصلي غاښونو په څېر ښکاري او کار کوي.",
  nine: "کراونونه او بریجونه",
  ten: "د ځانګړي ډول جوړ شوي کراونونه او بریجونه خراب یا ورک شوي غاښونه رغوي تر څو یوه ښکلې موسکا جوړه شي.",
  eleven: "ژوره پاک‌کاري",
  twelve: "مسلکي ژوره پاک‌کاري چې د غاښونو جراثیم او کلک مواد لرې کوي تر څو لثې سالمې پاتې شي.",
  thirteen: "وینیرونه او ښکلايي درملنه",
  fourteen: "خپله موسکا د وینیرونو، بونډینګ او نورو ښکلايي درملنو سره نوره هم ښکلی کړئ، د طبیعي پایلو لپاره.",
  fifteen: "زموږ ناروغان څه وايي",
  sixteen: "د ټولې کورنۍ لپاره نرمه او عصري د غاښونو درملنه. ستاسو موسکا زموږ لومړیتوب دی.",
  seventeen: "چټک لینکونه",
  eighteen: "اصلي پاڼه",
  nineteen: "زموږ په اړه",
  twenty: "خدمات",
  twentyone: "وخت واخلئ",
  twentytwo: "اړیکه",
  twentythree: "123 Main Street, City, Country",
  twentyfour: "+1 123-456-7890",
  twentyfive: "example@example.com",
  twentysix: "د کار ساعتونه",
  twentyseven: "1:00 PM – 5:00 PM",
  twentyeight: "ژبه:",
  twentynine: "© ۲۰۲۶ د سروري د غاښونو کلینیک. ټول حقوق خوندي دي.",
  thirty: "جوړ شوی د خوا ",
  thirtyone: "نعمان‌الله موساخېل"
},

da: {
  one: "صفحه اصلی",
  two: "درباره ما",
  three: "خدمات",
  four: "رزرو نوبت",
  five: "خدمات ما",
  six: "ما مراقبت ملایم و مدرن دندان‌پزشکی را برای تمام خانواده ارائه می‌کنیم.",
  seven: "ایمپلنت دندان",
  eight: "جایگزینی دندان‌های از دست‌رفته با ایمپلنت‌هایی که ظاهر و عملکردی مانند دندان طبیعی دارند.",
  nine: "روکش و بریج",
  ten: "روکش‌ها و بریج‌های سفارشی، دندان‌های آسیب‌دیده یا از دست‌رفته را برای لبخندی بی‌نقص ترمیم می‌کنند.",
  eleven: "پاک‌کاری عمیق",
  twelve: "پاک‌کاری حرفه‌ای و عمیق برای از بین بردن پلاک و جرم و حفظ سلامت لثه‌ها.",
  thirteen: "ونیر و خدمات زیبایی",
  fourteen: "لبخند خود را با ونیر، باندینگ و سایر درمان‌های زیبایی برای نتایج طبیعی‌تر زیباتر کنید.",
  fifteen: "نظر بیماران ما",
  sixteen: "ارائه خدمات ملایم و مدرن دندان‌پزشکی برای تمام خانواده. لبخند شما اولویت ماست.",
  seventeen: "لینک‌های سریع",
  eighteen: "صفحه اصلی",
  nineteen: "درباره ما",
  twenty: "خدمات",
  twentyone: "رزرو نوبت",
  twentytwo: "تماس",
  twentythree: "123 Main Street, City, Country",
  twentyfour: "+1 123-456-7890",
  twentyfive: "example@example.com",
  twentysix: "ساعات کاری",
  twentyseven: "1:00 PM – 5:00 PM",
  twentyeight: "زبان:",
  twentynine: "© ۲۰۲۶ کلینیک دندان‌پزشکی سروری. تمام حقوق محفوظ است.",
  thirty: "توسعه داده شده توسط ",
  thirtyone: "نعمان‌الله موساخیل"
}
  };

  const langSelect = document.getElementById("lang");

  function updateLanguage(lang) {
    for (const key in translations[lang]) {
      const el = document.getElementById(key);
      if (el) el.textContent = translations[lang][key];
    }
  }

  const savedLang = localStorage.getItem("lang") || "en";
  langSelect.value = savedLang;
  updateLanguage(savedLang);

  langSelect.addEventListener("change", function() {
    const selectedLang = this.value;
    localStorage.setItem("lang", selectedLang);
    updateLanguage(selectedLang);
  });
});
