document.addEventListener("DOMContentLoaded", () => {

  // ----- Supabase client -----
  const supabaseDental = window.supabase.createClient(
  "https://khvyorfwdviuywcfldxh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtodnlvcmZ3ZHZpdXl3Y2ZsZHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxOTYyNDIsImV4cCI6MjA4MTc3MjI0Mn0.RfJGw9Vc06ET7F8bw_C7HcGCL28B_GKuA99lRHr_1rI"
);

  // ----- SEARCH BOX -----
  const searchWrapper = document.querySelector(".search-icon");
  const inputBox = searchWrapper.querySelector("input");
  const suggBox = searchWrapper.querySelector(".autocom-box");

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
        if(url) window.location.href = url;
      });
    });
  }

  document.addEventListener("click", (e) => {
    if(!searchWrapper.contains(e.target)) searchWrapper.classList.remove("active");
  });

  // ----- MENU SWIPE -----
  $(document).ready(function() {
    const menuBtn = $('.menu-btn'); 
    const menuLinks = $('.menu-link');
    const mainContent = $('.main-content');
    const navbarMenu = $('.navbar .menu');
    let isActive = false;

    function openMenu() {
      mainContent.addClass('swipe-out');
      menuBtn.addClass('fixed');
      navbarMenu.addClass('active');
      $('body').addClass('lock-scroll');
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

    menuBtn.click(function(e){ e.preventDefault(); if(!isActive) openMenu(); else closeMenu(); });
    menuLinks.click(function(){ if(isActive) closeMenu(); });
  });

  // ----- FETCH & DISPLAY TESTIMONIALS -----
  async function loadTestimonials() {
    const { data, error } = await supabaseDental
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if(error) return console.error("Error fetching testimonials:", error);

    const track = document.querySelector('.slider-track');
    track.innerHTML = "";

    data.forEach(review => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.dataset.rating = review.rating;
      card.innerHTML = `
        <div class="photo"><img src="/images/guest.png" alt="${review.name}"></div>
        <p class="message">${review.comment}</p>
        <p class="name">– ${review.name}</p>
        <p class="date">${new Date(review.created_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</p>
        <div class="stars"></div>
      `;
      track.appendChild(card);
    });

    initializeSlider();
  }

  // ----- SLIDER & STARS -----
  function initializeSlider() {
    const track = document.querySelector('.slider-track');
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    if(cards.length === 0) return;

    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = '';

    // Render stars
    cards.forEach(card => {
      const container = card.querySelector('.stars');
      container.innerHTML = '';
      const rating = parseFloat(card.dataset.rating);
      for(let i=1;i<=5;i++){
        if(rating>=i) container.innerHTML += '★';
        else if(rating>=i-0.5) container.innerHTML += `<span style="position:relative;display:inline-block;width:1em;">
          <span style="position:absolute;overflow:hidden;width:50%;">★</span>
          <span style="color:#ccc;">★</span></span>`;
        else container.innerHTML += '<span style="color:#ccc;">★</span>';
      }
    });

    // Clones for infinite loop
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length-1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);

    const allCards = Array.from(track.querySelectorAll('.testimonial-card'));
    let current = 0;

    // Dots
    for(let i=0;i<cards.length;i++){
      const dot=document.createElement('div');
      dot.classList.add('dot');
      if(i===0) dot.classList.add('active');
      dot.addEventListener('click',()=>{ current=i; updateSlider(false); resetAutoplay(); });
      dotsContainer.appendChild(dot);
    }

    function updateSlider(animated=true){
      const cardWidth = allCards[0].offsetWidth + 30;
      const wrapperWidth = track.parentElement.offsetWidth;
      const centerOffset = (wrapperWidth - allCards[0].offsetWidth)/2;
      track.style.transition = animated?'transform 0.6s cubic-bezier(.22,.61,.36,1)':'none';
      track.style.transform = `translateX(${- (current+1)*cardWidth + centerOffset}px)`;
      allCards.forEach(c=>c.classList.remove('active','prev','next','edge-left','edge-right'));
      allCards[current+1].classList.add('active');
      if(current>=1) allCards[current].classList.add('prev');
      if(current<=cards.length-2) allCards[current+2].classList.add('next');
      if(current===0) allCards[0].classList.add('edge-left');
      if(current===cards.length-1) allCards[cards.length+1].classList.add('edge-right');
      document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===current));
    }

    function nextSlide(){ current++; if(current>=cards.length) current=0; updateSlider(); }
    function prevSlide(){ current--; if(current<0) current=cards.length-1; updateSlider(); }

    prevBtn.addEventListener('click',()=>{ prevSlide(); resetAutoplay(); });
    nextBtn.addEventListener('click',()=>{ nextSlide(); resetAutoplay(); });

    // Autoplay
    let autoplayTimeout;
    const AUTOPLAY_DELAY = 4000;
    function autoplayLoop() {
      autoplayTimeout = setTimeout(() => { nextSlide(); autoplayLoop(); }, AUTOPLAY_DELAY);
    }
    function startAutoplay() { if(!autoplayTimeout) autoplayLoop(); }
    function stopAutoplay() { clearTimeout(autoplayTimeout); autoplayTimeout=null; }
    function resetAutoplay() { stopAutoplay(); startAutoplay(); }

    allCards.forEach(card=>{
      card.addEventListener('mouseenter',()=>{ if(card.classList.contains('active')) stopAutoplay(); });
      card.addEventListener('mouseleave',()=> startAutoplay());
      card.addEventListener('mousemove',e=>{
        const rect = card.getBoundingClientRect();
        const x=(e.clientX-rect.left)/rect.width -0.5;
        const y=(e.clientY-rect.top)/rect.height -0.5;
        card.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
      });
      card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
    });

    updateSlider(false);
    startAutoplay();
  }

  // ----- PARTICLES -----
  const ccanvas=document.getElementById('sliderParticles');
  const btx=ccanvas.getContext('2d');
  ccanvas.width=ccanvas.offsetWidth;
  ccanvas.height=ccanvas.offsetHeight;
  const pparticles=[];
  for(let i=0;i<50;i++){
    pparticles.push({ x: Math.random()*ccanvas.width, y: Math.random()*ccanvas.height, r: Math.random()*2+1, dx: (Math.random()-0.5)*0.5, dy: (Math.random()-0.5)*0.5 });
  }
  function animateParticles(){
    btx.clearRect(0,0,ccanvas.width,ccanvas.height);
    pparticles.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>ccanvas.width) p.dx*=-1;
      if(p.y<0||p.y>ccanvas.height) p.dy*=-1;
      btx.beginPath();
      btx.arc(p.x,p.y,p.r,0,Math.PI*2);
      btx.fillStyle='rgba(255,255,255,0.3)';
      btx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ----- FOOTER EFFECTS -----
  const footer = document.querySelector(".site-footer");
  const observer = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){ footer.classList.add("is-visible"); observer.disconnect(); }
  }, { threshold: 0.25 });
  observer.observe(footer);
  const gradientDiv = document.createElement("div"); gradientDiv.className="footer-gradient"; footer.prepend(gradientDiv);
  const canvas = document.createElement("canvas"); canvas.className="footer-particles"; footer.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  function resizeCanvas(){ canvas.width = footer.offsetWidth; canvas.height = footer.offsetHeight; }
  resizeCanvas(); window.addEventListener("resize", resizeCanvas);
  const light = document.createElement("div"); light.className="footer-light"; footer.appendChild(light);
  footer.addEventListener("mousemove", e=>{
    const rect=footer.getBoundingClientRect();
    const x=((e.clientX-rect.left)/rect.width)*100;
    const y=((e.clientY-rect.top)/rect.height)*100;
    footer.style.setProperty("--x",`${x}%`); footer.style.setProperty("--y",`${y}%`);
  });

  class Particle {
    constructor(x,y,radius,color,sparkle=false){ this.x=x;this.y=y;this.radius=radius;this.vx=(Math.random()-0.5)*0.3;this.vy=(Math.random()-0.5)*0.3;this.color=color;this.alpha=0.3+Math.random()*0.3;this.sparkle=sparkle;this.sparkleAlpha=Math.random(); }
    move(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width) this.vx*=-1; if(this.y<0||this.y>canvas.height) this.vy*=-1; if(this.sparkle){ this.sparkleAlpha+=(Math.random()-0.5)*0.05; if(this.sparkleAlpha>1)this.sparkleAlpha=1; if(this.sparkleAlpha<0.3)this.sparkleAlpha=0.3; } }
    draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); let a=this.sparkle?this.sparkleAlpha:this.alpha; ctx.fillStyle=`rgba(${this.color.r},${this.color.g},${this.color.b},${a})`; ctx.fill(); }
  }
  const particles=[]; const colors=[{r:255,g:255,b:255},{r:173,g:216,b:230},{r:135,g:206,b:250}];
  for(let i=0;i<35;i++){ const color=colors[Math.floor(Math.random()*colors.length)]; const sparkle=Math.random()<0.25; particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,2+Math.random()*3,color,sparkle)); }
  function animate(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.move();p.draw();}); requestAnimationFrame(animate);}
  animate();

  // ----- INITIALIZE -----
  loadTestimonials();

});
