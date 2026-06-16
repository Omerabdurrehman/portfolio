/* ============================
   OMER PORTFOLIO — script.js
   ============================ */

// ── PROJECT DATA ──────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Smart Stock Predictor",
    desc: "A full-stack AI-powered investment app for the Pakistan Stock Exchange and global markets. Combines Random Forest ML for price prediction, FinBERT + VADER for real-time sentiment analysis, a Google Gemini AI chatbot, and comprehensive financial tools — all in a Flutter mobile app backed by FastAPI deployed on Render.",
    tags: ["Python", "Flutter", "FastAPI", "ML", "NLP", "Firebase"],
    images: [
      "assets/stockprediction-1.jpeg",
      "assets/stockprediction-2.jpeg",
      "assets/stockprediction-3.jpeg"
    ],
    features: [
      "Random Forest Price Prediction",
      "FinBERT + VADER Sentiment",
      "Google Gemini AI Chatbot",
      "PSX + Global Markets",
      "Firebase Auth",
      "Deployed on Render"
    ]
  },
  {
    title: "Automated Greenhouse",
    desc: "An AT89C51 microcontroller-based greenhouse monitoring and control system. Manages temperature, humidity, and irrigation in real-time using embedded sensor arrays, with automated fan and pump control for optimized crop growth.",
    tags: ["AT89C51", "C", "Sensors", "Embedded"],
    images: [
      "assets/greenhouse1.png",
      "assets/greenhouse2.png"
    ],
    features: [
      "Real-time Temperature Monitoring",
      "Automated Irrigation Control",
      "Humidity Sensing",
      "AT89C51 Microcontroller",
      "LCD Status Display"
    ]
  },
  {
    title: "AdaptaFlow BTI — Smart Traffic Controller",
    desc: "A 4-way adaptive traffic controller using dual Arduino boards in an I2C master/slave configuration. Features LDR-based night mode for automatic light sensitivity, potentiometer-adjustable green light timing, emergency vehicle override, I2C LCD display, and piezo buzzer alerts — all built and simulated in Tinkercad.",
    tags: ["Arduino", "I2C", "Tinkercad", "C++"],
    images: [
      "assets/traffic1.png",
      "assets/traffic2.png",
      "assets/traffic3.png"
    ],
    features: [
      "Dual-Arduino I2C Master/Slave",
      "LDR Night Mode",
      "Emergency Override",
      "Adjustable Timing",
      "I2C LCD Display",
      "Piezo Buzzer Alerts"
    ]
  },
  {
    title: "Smart Water Tank Controller",
    desc: "An Arduino-based ultrasonic water level monitoring system using HC-SR04. Features automated pump control, tri-color LED water level indicators, real-time percentage readout on LCD, and an interactive web-based cause-effect simulator to visualize system behavior.",
    tags: ["Arduino", "HC-SR04", "IoT", "C++"],
    images: [
      "assets/water1.jpg",
      "assets/water2.png",
      "assets/water3.png"
    ],
    features: [
      "HC-SR04 Ultrasonic Sensor",
      "Automated Pump Control",
      "LED Level Indicators",
      "LCD Percentage Display",
      "Interactive Simulator"
    ]
  }
];

// ── STATE ──────────────────────────────────────────────────────
let currentProject = 0;
let currentSlide = 0;
let themeLight = false;
let menuOpen = false;

// ── LOADER ────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startHero();
    animateStats();
  }, 2200);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animTrail() {
  tx += (mx - tx) * 0.13;
  ty += (my - ty) * 0.13;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();

document.querySelectorAll('a, button, .project-card, .orb, .stab, .filter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    trail.style.width = '50px';
    trail.style.height = '50px';
    trail.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    trail.style.width = '36px';
    trail.style.height = '36px';
    trail.style.opacity = '0.5';
  });
});

// ── CANVAS PARTICLE BG ────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // repel from mouse
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += dx * force * 0.03;
        this.y += dy * force * 0.03;
      }
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(88,166,255,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(88,166,255,${0.15 * (1 - d/120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── HERO TYPING ───────────────────────────────────────────────
const ROLES = [
  "AI-powered apps",
  "Flutter mobile apps",
  "ML prediction models",
  "embedded systems",
  "FastAPI backends"
];
let roleIdx = 0, charIdx = 0, deleting = false;
const rolesEl = document.getElementById('rolesCarousel');

function startHero() {
  typeRole();
}

function typeRole() {
  const current = ROLES[roleIdx];
  if (!deleting) {
    charIdx++;
    rolesEl.innerHTML = current.slice(0, charIdx) + '<span class="roles-cursor"></span>';
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    charIdx--;
    rolesEl.innerHTML = current.slice(0, charIdx) + '<span class="roles-cursor"></span>';
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % ROLES.length;
    }
  }
  setTimeout(typeRole, deleting ? 55 : 90);
}

// ── STAT COUNTER ─────────────────────────────────────────────
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let cur = 0;
    const step = target / 30;
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(iv);
    }, 40);
  });
}

// ── NAV SCROLL ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  highlightNav();
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let active = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) active = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.section === active);
  });
}

// smooth scroll for nav links
document.querySelectorAll('.nav-link, .hero-cta a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (menuOpen) toggleMenu();
    }
  });
});

// ── HAMBURGER ────────────────────────────────────────────────
function toggleMenu() {
  menuOpen = !menuOpen;
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  links.classList.toggle('open', menuOpen);
  btn.classList.toggle('open', menuOpen);
}

// ── THEME ────────────────────────────────────────────────────
document.getElementById('themeToggle').addEventListener('click', () => {
  themeLight = !themeLight;
  document.body.classList.toggle('light-mode', themeLight);
  document.getElementById('themeToggle').innerHTML =
    themeLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ── SKILLS TABS ───────────────────────────────────────────────
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      // animate bars
      setTimeout(() => animateBars(panel), 50);
    }
  });
});

function animateBars(panel) {
  panel.querySelectorAll('.skill-item').forEach(item => {
    const pct = item.dataset.pct;
    const fill = item.querySelector('.skill-fill');
    fill.style.width = pct + '%';
  });
}

// Animate initial tab bars on scroll
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    animateBars(document.querySelector('.skills-panel.active'));
  }
}, { threshold: 0.2 });
if (skillsSection) skillsObserver.observe(skillsSection);

// ── PROJECT FILTER ───────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const cats = card.dataset.cats || '';
        card.classList.toggle('hidden', !cats.includes(filter));
      }
    });
  });
});

// ── MODAL ────────────────────────────────────────────────────
function openProjectModal(idx) {
  currentProject = idx;
  currentSlide = 0;
  const proj = PROJECTS[idx];

  // Tags
  document.getElementById('modalTags').innerHTML =
    proj.tags.map(t => `<span class="ptag">${t}</span>`).join('');

  // Title + desc
  document.getElementById('modalTitle').textContent = proj.title;
  document.getElementById('modalDesc').textContent = proj.desc;

  // Features
  document.getElementById('modalFeatures').innerHTML =
    proj.features.map(f => `<span class="mfeat"><i class="fas fa-check-circle"></i>${f}</span>`).join('');

  // Gallery slides
  const track = document.getElementById('galleryTrack');
  track.innerHTML = proj.images.map((src, i) => `
    <div class="gallery-slide">
      <img src="${src}" alt="${proj.title} ${i+1}"
           onerror="this.src='https://via.placeholder.com/860x480/0f1623/58a6ff?text=${encodeURIComponent(proj.title)}'">
    </div>
  `).join('');

  // Dots
  const dots = document.getElementById('galleryDots');
  dots.innerHTML = proj.images.map((_, i) =>
    `<div class="gdot${i===0?' active':''}" onclick="goToSlide(${i})"></div>`
  ).join('');

  updateGallery();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function galleryNav(dir) {
  const proj = PROJECTS[currentProject];
  currentSlide = (currentSlide + dir + proj.images.length) % proj.images.length;
  updateGallery();
}

function goToSlide(idx) {
  currentSlide = idx;
  updateGallery();
}

function updateGallery() {
  document.getElementById('galleryTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.gdot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

// keyboard nav for modal
document.addEventListener('keydown', e => {
  if (!document.getElementById('modalOverlay').classList.contains('open')) return;
  if (e.key === 'Escape') { closeModal(null); }
  if (e.key === 'ArrowRight') galleryNav(1);
  if (e.key === 'ArrowLeft') galleryNav(-1);
});

// swipe support
let touchStartX = 0;
document.getElementById('galleryTrack')?.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('galleryTrack')?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) galleryNav(dx < 0 ? 1 : -1);
});

// ── CONTACT FORM ─────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.querySelector('.btn-text').style.display = 'none';
  btn.querySelector('.btn-loading').style.display = 'flex';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
    e.target.reset();
  }, 1800);
}

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .tl-item, .info-card, .orb, .project-card, .contact-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// stagger children in gridssa
document.querySelectorAll('.about-cards, .projects-grid, .tech-orbs').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = (i * 0.07) + 's';
  });
});