document.addEventListener("DOMContentLoaded", function() {
  const translations = {
    en: {
      one: "Home Page",
      two: "About Us",
      three: "Services",
      four: "Book Appointment",
      five: "About Sarwari Dental Clinic",
      six: "Combining expertise, modern technology, and compassionate care to give you the perfect smile.",
      seven: "Dr. Sarwari",
      eight: "With over a decade of experience, Dr. Sarwari brings a passion for dental excellence. From routine check-ups to advanced procedures, he ensures every patient feels comfortable and confident. Our mission is to deliver healthy smiles through personalized care, modern techniques, and a patient-first approach.",
      nine: "✔ Transparency at every step of your treatment",
      ten: "✔ Advanced dental technology",
      eleven: "✔ Focus on patient education",
      twelve: "✔ High standards of hygiene & safety",
      thirteen: "Our Clinic Values",
      fourteen: "Excellence",
      fifteen: "We always strive to provide top-quality dental care using the latest techniques.",
      sixteen: "Compassion",
      seventeen: "We ensure a warm, friendly environment where patients feel safe and valued.",
      eighteen: "Integrity",
      nineteen: "Honest communication and transparency guide every treatment plan.",
      twenty: "Innovation",
      twentyone: "We continuously adopt modern technology to make treatments faster and more effective.",
      twentytwo: "Comfort",
      twentythree: "Our clinic is designed to make every visit relaxing and stress-free.",
      twentyfour: "Providing gentle, modern dental care for the whole family. Your smile is our priority.",
      twentyfive: "Quick Links",
      twentysix: "Home Page",
      twentyseven: "About Us",
      twentyeight: "Services",
      twentynine: "Book Appointment",
      thirty: "Contact",
      thirtyone: "123 Main St, City, Country",
      thirtytwo: "+1 123-456-7890",
      thirtythree: "example@example.com",
      thirtyfour: "Office Hours",
      thirtyfive: "1:00 PM – 5:00 PM",
      thirtysix: "Language:",
      thirtyseven: "© 2026 Sarwari Dental Clinic. All rights reserved.",
      thirtyeight:"Developed by ",
      thirtynine:"Numanullah Moosakhail."
    },
    pa: {
  one: "مخ پاڼه",
  two: "زموږ په اړه",
  three: "خدمتونه",
  four: "د ملاقات وخت واخلئ",
  five: "د سروري د غاښونو کلینیک په اړه",
  six: "موږ تجربه، عصري ټکنالوژي او پاملرنه سره یوځای کوو تر څو تاسو ته غوره موسکا درکړو.",
  seven: "ډاکټر سروري",
  eight: "له لسو کلونو څخه د زیاتې تجربې سره، ډاکټر سروري د غاښونو درملنې سره ځانګړې مینه لري. له عادي معایناتو څخه تر پرمختللو درملنو پورې، هغه ډاډ ورکوي چې هر ناروغ ارام او باوري احساس وکړي. زموږ موخه دا ده چې د شخصي پاملرنې، عصري طریقو او د ناروغ لومړیتوب له لارې روغې موسکاوې رامنځته کړو.",
  nine: "✔ د درملنې په هر پړاو کې روڼتیا",
  ten: "✔ پرمختللې د غاښونو ټکنالوژي",
  eleven: "✔ د ناروغانو پوهاوي ته ځانګړې پاملرنه",
  twelve: "✔ د پاکوالي او خوندیتوب لوړ معیارونه",
  thirteen: "زموږ د کلینیک ارزښتونه",
  fourteen: "لوړ کیفیت",
  fifteen: "موږ تل هڅه کوو چې د نوې طریقو په کارولو سره د لوړ کیفیت د غاښونو درملنه وړاندې کړو.",
  sixteen: "خواخوږي",
  seventeen: "موږ داسې تود او دوستانه چاپېریال برابروو چې ناروغان پکې خوندي او ارزښتمن احساس وکړي.",
  eighteen: "ریښتینولي",
  nineteen: "صادقانه خبرې او روڼتیا د هرې درملنې بنسټ جوړوي.",
  twenty: "نوښت",
  twentyone: "موږ تل نوې ټکنالوژي کاروو تر څو درملنه چټکه او اغېزمنه شي.",
  twentytwo: "ارامتیا",
  twentythree: "زموږ کلینیک داسې جوړ شوی چې هره لیدنه مو ارامه او بې‌فشاره وي.",
  twentyfour: "موږ د ټولې کورنۍ لپاره نرم او عصري د غاښونو درملنه برابروو. ستاسو موسکا زموږ لومړیتوب دی.",
  twentyfive: "چټک لینکونه",
  twentysix: "مخ پاڼه",
  twentyseven: "زموږ په اړه",
  twentyeight: "خدمتونه",
  twentynine: "د ملاقات وخت واخلئ",
  thirty: "اړیکه",
  thirtyone: "123 Main St, City, Country",
  thirtytwo: "+1 123-456-7890",
  thirtythree: "example@example.com",
  thirtyfour: "د کار ساعتونه",
  thirtyfive: "1:00 PM – 5:00 PM",
  thirtysix: "ژبه:",
  thirtyseven: "© ۲۰۲۶ د سروري د غاښونو کلینیک. ټول حقوق خوندي دي.",
  thirtyeight: " جوړ شوی د خوا ",
  thirtynine: "نعمان‌الله موساخېل "
},

da: {
  one: "صفحه اصلی",
  two: "درباره ما",
  three: "خدمات",
  four: "رزرو وقت ملاقات",
  five: "درباره کلینیک دندان‌پزشکی سروری",
  six: "ما تخصص، تکنالوژی مدرن و مراقبت دلسوزانه را با هم ترکیب می‌کنیم تا لبخند ایده‌آل را برای شما فراهم کنیم.",
  seven: "دکتر سروری",
  eight: "با بیش از ده سال تجربه، دکتر سروری با علاقه و تعهد در بخش دندان‌پزشکی فعالیت می‌کند. از معاینات عادی تا درمان‌های پیشرفته، او اطمینان می‌دهد که هر بیمار احساس آرامش و اطمینان داشته باشد. هدف ما ایجاد لبخندهای سالم از طریق مراقبت شخصی، روش‌های مدرن و اولویت دادن به بیمار است.",
  nine: "✔ شفافیت در تمام مراحل درمان",
  ten: "✔ تکنالوژی پیشرفته دندان‌پزشکی",
  eleven: "✔ تمرکز ویژه بر آگاهی بیماران",
  twelve: "✔ معیارهای بلند بهداشت و ایمنی",
  thirteen: "ارزش‌های کلینیک ما",
  fourteen: "برتری",
  fifteen: "ما همیشه تلاش می‌کنیم خدمات دندان‌پزشکی با کیفیت عالی و روش‌های نوین ارائه کنیم.",
  sixteen: "دلسوزی",
  seventeen: "ما محیطی گرم و دوستانه فراهم می‌کنیم تا بیماران احساس امنیت و ارزشمندی کنند.",
  eighteen: "صداقت",
  nineteen: "ارتباط صادقانه و شفافیت اساس هر برنامه درمانی ماست.",
  twenty: "نوآوری",
  twentyone: "ما همواره از تکنالوژی مدرن استفاده می‌کنیم تا درمان‌ها سریع‌تر و مؤثرتر شوند.",
  twentytwo: "راحتی",
  twentythree: "کلینیک ما طوری طراحی شده که هر مراجعه آرام و بدون استرس باشد.",
  twentyfour: "ما خدمات دندان‌پزشکی نرم و مدرن را برای تمام خانواده ارائه می‌کنیم. لبخند شما اولویت ماست.",
  twentyfive: "لینک‌های سریع",
  twentysix: "صفحه اصلی",
  twentyseven: "درباره ما",
  twentyeight: "خدمات",
  twentynine: "رزرو وقت ملاقات",
  thirty: "تماس",
  thirtyone: "123 Main St, City, Country",
  thirtytwo: "+1 123-456-7890",
  thirtythree: "example@example.com",
  thirtyfour: "ساعات کاری",
  thirtyfive: "1:00 PM – 5:00 PM",
  thirtysix: "زبان:",
  thirtyseven: "© ۲۰۲۶ کلینیک دندان‌پزشکی سروری. تمام حقوق محفوظ است.",
  thirtyeight: "توسعه داده شده توسط ",
  thirtynine: "نعمان‌الله موساخیل "
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
