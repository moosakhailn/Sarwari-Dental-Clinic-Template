document.addEventListener("DOMContentLoaded", () => {
    const searchWrapper = document.querySelector(".search-icon");
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = searchWrapper.querySelector(".autocom-box");

    // Example suggestions array with links
    const suggestions = [
    // ENGLISH
    { name: "Home Page", url: "/index.html" },
    { name: "About Us", url: "/files/about.html" },
    { name: "Services", url: "/files/services.html" },
    { name: "Book Appointment", url: "/files/booking.html" },
    { name: "Our Services", url: "/files/services.html" },
    { name: "Call Us", url: "/files/booking.html" },
    { name: "Book Online", url: "/files/booking.html" },
    { name: "Choose your preferred date and time", url: "/files/booking.html" },
    { name: "Full Name", url: "/files/booking.html" },
    { name: "Email", url: "/files/booking.html" },
    { name: "Phone", url: "/files/booking.html" },
    { name: "Date", url: "/files/booking.html" },
    { name: "Time", url: "/files/booking.html" },
    { name: "Notes (optional)", url: "/files/booking.html" },
    { name: "Leave a Review", url: "/files/booking.html" },
    { name: "Providing gentle, modern dental care for the whole family", url: "/files/services.html" },
    { name: "Quick Links", url: "/files/services.html" },
    { name: "Office Hours", url: "/files/services.html" },
    { name: "Contact", url: "/files/booking.html" },

    // PASHTO
    { name: "مخ پاڼه", url: "/index.html" },
    { name: "زموږ په اړه", url: "/files/about.html" },
    { name: "خدمات", url: "/files/services.html" },
    { name: "د ملاقات وخت ټاکل", url: "/files/booking.html" },
    { name: "د ناروغانو نظرونه", url: "/files/services.html" },
    { name: "د دفتر وختونه", url: "/files/services.html" },
    { name: "چټک لینکونه", url: "/files/services.html" },

    // DARI
    { name: "صفحه اول", url: "/index.html" },
    { name: "در مورد ما", url: "/files/about.html" },
    { name: "خدمات", url: "/files/services.html" },
    { name: "رزرو وقت ملاقات", url: "/files/booking.html" },
    { name: "نظرات بیماران", url: "/files/services.html" },
    { name: "ساعت کاری دفتر", url: "/files/services.html" },
    { name: "لینک های سریع", url: "/files/services.html" }
];

    inputBox.addEventListener("input", () => {
        const userValue = inputBox.value.trim();
        let filtered = [];

        if(userValue) {
            filtered = suggestions
                .filter(item => item.name.toLowerCase().startsWith(userValue.toLowerCase()))
                .map(item => `<li data-url="${item.url}">${item.name}</li>`);

            searchWrapper.classList.add("active");
        } else {
            searchWrapper.classList.remove("active");
        }

        showSuggestions(filtered);
    });

    function showSuggestions(list) {
        suggBox.innerHTML = list.join("");
        const items = suggBox.querySelectorAll("li");

        items.forEach(li => {
            li.addEventListener("click", () => {
                const url = li.getAttribute("data-url");
                if(url) {
                    window.location.href = url; // navigate to the link
                }
            });
        });
    }

    // Close dropdown if clicking outside
    document.addEventListener("click", (e) => {
        if(!searchWrapper.contains(e.target)) {
            searchWrapper.classList.remove("active");
        }
    });
});

// Testimonial-Menu Bug Fix

$(document).ready(function() {
    const menuBtn = $('.menu-btn');      // Hamburger icon
    const menuLinks = $('.menu-link');   // Menu links
    const mainContent = $('.main-content'); // All content to swipe
    const navbarMenu = $('.navbar .menu');
    let isActive = false;

    function openMenu() {
        mainContent.addClass('swipe-out');  // swipe out content
        menuBtn.addClass('fixed');           // fix button
        navbarMenu.addClass('active');       // slide in menu
        $('body').addClass('lock-scroll');   // lock scrolling
        menuBtn.find('i').addClass('active');
        isActive = true;
    }

    function closeMenu() {
        mainContent.removeClass('swipe-out');
        menuBtn.removeClass('fixed');
        navbarMenu.removeClass('active');
        $('body').removeClass('lock-scroll');
        menuBtn.find('i').removeClass('active');
        isActive = false;
    }

    // Hamburger click
    menuBtn.click(function(e){
        e.preventDefault();
        if(!isActive) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // Menu link click restores everything
    menuLinks.click(function(){
        if(isActive) {
            closeMenu();
        }
    });
});

// Footer
const footer = document.querySelector(".site-footer");

/* Slide-in animation */
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      footer.classList.add("is-visible");
      observer.disconnect();
    }
  },
  { threshold: 0.25 }
);
observer.observe(footer);

/* Gradient background */
const gradientDiv = document.createElement("div");
gradientDiv.className = "footer-gradient";
footer.prepend(gradientDiv);

/* Canvas for particles */
const canvas = document.createElement("canvas");
canvas.className = "footer-particles";
footer.appendChild(canvas);
const ctx = canvas.getContext("2d");

/* Resize canvas to footer */
function resizeCanvas() {
  canvas.width = footer.offsetWidth;
  canvas.height = footer.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* Mouse-follow light */
const light = document.createElement("div");
light.className = "footer-light";
footer.appendChild(light);

footer.addEventListener("mousemove", e => {
  const rect = footer.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  footer.style.setProperty("--x", `${x}%`);
  footer.style.setProperty("--y", `${y}%`);
});

/* Particle class (clean dentist bubbles/sparkles) */
class Particle {
  constructor(x, y, radius, color, sparkle=false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.color = color;
    this.alpha = 0.3 + Math.random()*0.3;
    this.sparkle = sparkle;
    this.sparkleAlpha = Math.random();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if(this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if(this.sparkle) {
      // sparkle pulse
      this.sparkleAlpha += (Math.random()-0.5)*0.05;
      if(this.sparkleAlpha > 1) this.sparkleAlpha = 1;
      if(this.sparkleAlpha < 0.3) this.sparkleAlpha = 0.3;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    let a = this.sparkle ? this.sparkleAlpha : this.alpha;
    ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${a})`;
    ctx.fill();
  }
}

/* Create dentist-themed particles */
const particles = [];
const colors = [
  {r:255,g:255,b:255}, // white
  {r:173,g:216,b:230}, // light blue
  {r:135,g:206,b:250}  // soft sky blue
];

for(let i=0;i<35;i++){
  const color = colors[Math.floor(Math.random()*colors.length)];
  const sparkle = Math.random() < 0.25; // 25% sparkles
  particles.push(new Particle(
    Math.random()*canvas.width,
    Math.random()*canvas.height,
    2 + Math.random()*3,
    color,
    sparkle
  ));
}

/* Animate particles */
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.move();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();