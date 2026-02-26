document.addEventListener("DOMContentLoaded", function() {
  const translations = {
    en: {
      one: "Home Page",
      two: "About Us",
      three: "Services",
      four: "Book Appointment",
      five: "Because Every Smile Deserves to Be Seen.",
      six: "A smile is more than just teeth — it’s confidence, self-expression, and the way you connect with the world. At our practice, we go beyond dental care to create healthy, beautiful smiles that make you feel proud, comfortable, and ready to share them everywhere you go.",
      seven: "At ",
      eight: "Sarwari Dental Clinic",
      nine: ", we believe dental care should be more than routine. As you explore our website and visit our office, you’ll see our focus is simple:",
      ten: "COMFORT.",
      eleven: "QUALITY.",
      twelve: "CONFIDENT SMILES.",
      thirteen: "Gentle, Modern Dental Care for the Whole Family",
      fourteen: "Comfortable, affordable dentistry using the latest technology.",
      fifteen: "Book Appointment",
      sixteen: "Providing gentle, modern dental care for the whole family. Your smile is our priority.",
      seventeen: "Quick Links",
      eighteen: "Home Page",
      nineteen: "About Us",
      twenty: "Services",
      twentyone: "Book Appointment",
      twentytwo: "Contact",
      twentythree: "123 Main St, City, Country",
      twentyfour: "+1 123-456-7890",
      twentyfive: "example@example.com",
      twentysix: "Office Hours",
      twentyseven: "1:00 PM – 5:00 PM",
      twentyeight: "Language:",
      twentynine: "© 2026 Sarwari Dental Clinic. All rights reserved.",
      thirty:"Developed by ",
      thirtyone:"Numanullah Moosakhail."
    },
    pa: {
  one: "اصلي پاڼه",
  two: "زموږ په اړه",
  three: "خدمات",
  four: "وخت واخلئ",
  five: "ځکه چې هره موسکا د لیدو وړ ده.",
  six: "موسکا یوازې غاښونه نه دي — دا باور، ځان څرګندونه، او له نړۍ سره د اړیکې لاره ده. زموږ په کلینیک کې، موږ د عادي غاښونو درملنې نه هاخوا ځو تر څو سالمې او ښکلي موسکاوې جوړې کړو چې تاسو پرې ویاړ وکړئ، آرام احساس وکړئ، او هر ځای یې په خوښۍ وښایئ.",
  seven: "په ",
  eight: "سروري د غاښونو کلینیک",
  nine: " کې، موږ باور لرو چې د غاښونو درملنه باید یوازې عادي نه وي. کله چې زموږ وېب‌سایټ وګورئ او کلینیک ته راشئ، زموږ تمرکز ډېر ساده دی:",
  ten: "ارامښت.",
  eleven: "کیفیت.",
  twelve: "باوري موسکاوې.",
  thirteen: "د ټولې کورنۍ لپاره نرمه او عصري د غاښونو درملنه",
  fourteen: "آرامه او ارزانه د غاښونو درملنه د نوې ټکنالوژۍ په کارولو سره.",
  fifteen: "وخت واخلئ",
  sixteen: "د ټولې کورنۍ لپاره نرمه او عصري د غاښونو درملنه. ستاسو موسکا زموږ لومړیتوب دی.",
  seventeen: "چټک لینکونه",
  eighteen: "اصلي پاڼه",
  nineteen: "زموږ په اړه",
  twenty: "خدمات",
  twentyone: "وخت واخلئ",
  twentytwo: "اړیکه",
  twentythree: "123 Main St, City, Country",
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
  five: "چون هر لبخند ارزش دیده‌شدن را دارد.",
  six: "لبخند فقط دندان نیست — اعتماد به نفس، بیان شخصیت و راه ارتباط شما با جهان است. در کلینیک ما، فراتر از درمان‌های معمول دندان‌پزشکی می‌رویم تا لبخندهای سالم و زیبایی بسازیم که باعث افتخار، آرامش و اعتماد شما شود.",
  seven: "در ",
  eight: "کلینیک دندان‌پزشکی سروری",
  nine: "، باور داریم که مراقبت از دندان باید فراتر از کارهای تکراری باشد. وقتی وب‌سایت ما را می‌بینید و به کلینیک مراجعه می‌کنید، تمرکز ما بسیار ساده است:",
  ten: "آسایش.",
  eleven: "کیفیت.",
  twelve: "لبخندهای با اعتماد.",
  thirteen: "مراقبت ملایم و مدرن دندان‌پزشکی برای تمام خانواده",
  fourteen: "دندان‌پزشکی راحت و مقرون‌به‌صرفه با استفاده از جدیدترین تکنالوژی.",
  fifteen: "رزرو نوبت",
  sixteen: "ارائه خدمات ملایم و مدرن دندان‌پزشکی برای تمام خانواده. لبخند شما اولویت ماست.",
  seventeen: "لینک‌های سریع",
  eighteen: "صفحه اصلی",
  nineteen: "درباره ما",
  twenty: "خدمات",
  twentyone: "رزرو نوبت",
  twentytwo: "تماس",
  twentythree: "123 Main St, City, Country",
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
