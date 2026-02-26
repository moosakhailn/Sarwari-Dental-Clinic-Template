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

//Testimonial
/* user defined variables */
var timeOnSlide = 3, 		
    // the time each image will remain static on the screen, measured in seconds
timeBetweenSlides = 1, 	
    // the time taken to transition between images, measured in seconds

// test if the browser supports animation, and if it needs a vendor prefix to do so
    animationstring = 'animation',
    animation = false,
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O Khtml'.split(' '), 
    // array of possible vendor prefixes
    pfx  = '',
    slidy = document.getElementById("slidy"); 
if (slidy.style.animationName !== undefined) { animation = true; } 
// browser supports keyframe animation w/o prefixes

if( animation === false ) {
  for( var i = 0; i < domPrefixes.length; i++ ) {
    if( slidy.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
      pfx = domPrefixes[ i ];
      animationstring = pfx + 'Animation';
      keyframeprefix = '-' + pfx.toLowerCase() + '-';
      animation = true;
      break;
    }
  }
}

if( animation === false ) {
  // animate in JavaScript fallback
} else {
  var images = slidy.getElementsByTagName("img"),
      firstImg = images[0], 
      // get the first image inside the "slidy" element.
      imgWrap = firstImg.cloneNode(false);  // copy it.
  slidy.appendChild(imgWrap); // add the clone to the end of the images
  var imgCount = images.length, // count the number of images in the slide, including the new cloned element
      totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1), // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
      slideRatio = (timeOnSlide / totalTime)*100, // determine the percentage of time an induvidual image is held static during the animation
      moveRatio = (timeBetweenSlides / totalTime)*100, // determine the percentage of time for an individual movement
      basePercentage = 100/imgCount, // work out how wide each image should be in the slidy, as a percentage.
      position = 0, // set the initial position of the slidy element
      css = document.createElement("style"); // start marking a new style sheet
  css.type = "text/css";
  css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the slidy container
  css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }\n";
  css.innerHTML += "@"+keyframeprefix+"keyframes slidy {\n"; 
  for (i=0;i<(imgCount-1); i++) { // 
    position+= slideRatio; // make the keyframe the position of the image
    css.innerHTML += position+"% { left: -"+(i * 100)+"%; }\n";
    position += moveRatio; // make the postion for the _next_ slide
    css.innerHTML += position+"% { left: -"+((i+1) * 100)+"%; }\n";
}
  css.innerHTML += "}\n";
  css.innerHTML += "#slidy { left: 0%; "+keyframeprefix+"transform: translate3d(0,0,0); "+keyframeprefix+"animation: "+totalTime+"s slidy infinite; }\n"; // call on the completed keyframe animation sequence
document.body.appendChild(css); // add the new stylesheet to the end of the document
}


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