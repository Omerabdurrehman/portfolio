/* ═══════════════════════════════════════
   OMER PORTFOLIO — script.js
═══════════════════════════════════════ */

/* ── project data ─────────────────── */
const PROJECTS = [
  {
    title: "Smart Stock Predictor",
    desc:  "Full-stack AI investment app for PSX and global markets. Random Forest price prediction, dual FinBERT/VADER sentiment pipeline, Google Gemini chatbot, portfolio tracker, watchlist, bond calculator, options pricing, and more — Flutter frontend, FastAPI backend, deployed on Render with Firebase auth.",
    tags:  ["Python","Flutter","FastAPI","FinBERT","VADER","Gemini","Firebase","Render"],
    imgs:  ["assets/stockprediction-1.jpeg","assets/stockprediction-2.jpeg","assets/stockprediction-3.jpeg"],
    feats: ["Random Forest Price Prediction","FinBERT + VADER Sentiment","Gemini AI Chatbot","PSX + Global Markets","Portfolio Tracker","Options & Bond Pricing","Firebase Authentication","Render Cloud Deployment"]
  },
  {
    title: "Automated Greenhouse",
    desc:  "AT89C51 microcontroller-based greenhouse monitoring and automation system. Reads temperature and humidity from sensors in real time, controls fans and irrigation pump automatically, and shows live status on a 16x2 LCD. Built as an embedded systems project.",
    tags:  ["AT89C51","C","Sensors","LCD","Embedded"],
    imgs:  ["assets/greenhouse1.png","assets/greenhouse2.png"],
    feats: ["Real-time Temperature Sensing","Humidity Monitoring","Automated Irrigation","Automated Fan Control","LCD Status Display","AT89C51 MCU"]
  },
  {
    title: "AdaptaFlow — Smart Traffic Controller",
    desc:  "4-way adaptive traffic controller using two Arduino boards in an I2C master/slave setup. LDR sensors detect night conditions and switch to dim mode automatically. Potentiometer lets you dial in green-light timing. Emergency button overrides all signals. LCD shows active phase. Piezo buzzer alerts transitions. Designed and simulated entirely in Tinkercad.",
    tags:  ["Arduino","I2C","C++","Tinkercad","LDR","LCD"],
    imgs:  ["assets/traffic1.png","assets/traffic2.png","assets/traffic3.png"],
    feats: ["Dual-Arduino I2C Master/Slave","LDR Auto Night Mode","Emergency Override Button","Adjustable Green Timing","I2C LCD Display","Piezo Buzzer","Tinkercad Simulation"]
  },
  {
    title: "Smart Water Tank Controller",
    desc:  "Arduino-based water level monitoring using HC-SR04 ultrasonic sensor. Calculates fill percentage, shows it on LCD, lights up colour-coded LEDs (empty/mid/full), and switches the pump relay automatically. Also includes an interactive browser-based cause-effect simulator showing what happens at each level in real time.",
    tags:  ["Arduino","HC-SR04","IoT","C++","LCD","Relay"],
    imgs:  ["assets/water1.jpg","assets/water2.png","assets/water3.png"],
    feats: ["HC-SR04 Ultrasonic Sensing","Fill % LCD Display","Tri-color LED Indicators","Automated Pump Relay","Interactive Web Simulator","IoT System Design"]
  }
];

/* ── per-card slider state ─────────── */
const cardSlides = {}; // {wrapperId: currentIdx}

function initCardSliders() {
  document.querySelectorAll('.proj-imgs').forEach(wrap => {
    const id = wrap.id;
    const slides = wrap.querySelector('.img-slides');
    const imgs = slides.querySelectorAll('img');
    cardSlides[id] = 0;

    // build dots
    const dotsWrap = document.getElementById('dots-' + id.split('-')[1]);
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    imgs.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'idot' + (i === 0 ? ' on' : '');
      d.addEventListener('click', e => { e.stopPropagation(); gotoCard(id, i); });
      dotsWrap.appendChild(d);
    });

    // hide prev/next if only 1 image
    if (imgs.length <= 1) {
      wrap.querySelectorAll('.slide-btn').forEach(b => b.style.display = 'none');
      dotsWrap.style.display = 'none';
    }
  });
}

function slideImg(e, wrapperId, dir) {
  e.stopPropagation();
  const wrap  = document.getElementById(wrapperId);
  const imgs  = wrap.querySelectorAll('.img-slides img');
  const total = imgs.length;
  const next  = ((cardSlides[wrapperId] || 0) + dir + total) % total;
  gotoCard(wrapperId, next);
}

function gotoCard(wrapperId, idx) {
  const wrap   = document.getElementById(wrapperId);
  const slides = wrap.querySelector('.img-slides');
  const n      = wrap.querySelectorAll('.img-slides img').length;
  cardSlides[wrapperId] = idx;
  slides.style.transform = `translateX(-${idx * 100}%)`;

  const dotNum = wrapperId.split('-')[1];
  const dots   = document.querySelectorAll(`#dots-${dotNum} .idot`);
  dots.forEach((d, i) => d.classList.toggle('on', i === idx));
}

/* ── project filter ────────────────── */
function filterProjects(btn) {
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.f;
  document.querySelectorAll('.proj-card').forEach(card => {
    const cats = card.dataset.cats || '';
    card.classList.toggle('hidden', f !== 'all' && !cats.includes(f));
  });
}

/* ── modal ─────────────────────────── */
let mgIdx = 0, mgCurrent = 0;

function openModal(idx) {
  mgCurrent = idx;
  mgIdx = 0;
  const p = PROJECTS[idx];

  // tags
  document.getElementById('mTags').innerHTML =
    p.tags.map(t => `<span class="proj-tags"><span>${t}</span></span>`).join('');

  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mDesc').textContent  = p.desc;

  // features
  document.getElementById('mFeats').innerHTML =
    p.feats.map(f => `<span class="mf"><i class="fas fa-check"></i>${f}</span>`).join('');

  // gallery slides
  const track = document.getElementById('mgTrack');
  track.innerHTML = p.imgs.map((src, i) => `
    <div class="mg-slide">
      <img src="${src}" alt="${p.title} ${i+1}"
           onerror="this.src='https://placehold.co/820x460/141418/6366f1?text=${encodeURIComponent(p.title)}'">
    </div>`).join('');

  // dots
  const dots = document.getElementById('mgDots');
  dots.innerHTML = p.imgs.map((_, i) =>
    `<button class="mgdot${i===0?' on':''}" onclick="mgGoto(${i})"></button>`).join('');

  // thumbnails
  const thumbs = document.getElementById('mThumbs');
  thumbs.innerHTML = p.imgs.map((src, i) => `
    <div class="mthumb${i===0?' on':''}" onclick="mgGoto(${i})">
      <img src="${src}" alt="thumb ${i+1}"
           onerror="this.src='https://placehold.co/70x48/141418/6366f1?text=${i+1}'">
    </div>`).join('');

  mgUpdateTrack();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

function mgNav(dir) {
  const total = PROJECTS[mgCurrent].imgs.length;
  mgIdx = (mgIdx + dir + total) % total;
  mgUpdateTrack();
}
function mgGoto(i) {
  mgIdx = i;
  mgUpdateTrack();
}
function mgUpdateTrack() {
  document.getElementById('mgTrack').style.transform = `translateX(-${mgIdx * 100}%)`;
  document.querySelectorAll('.mgdot').forEach((d,i) => d.classList.toggle('on', i===mgIdx));
  document.querySelectorAll('.mthumb').forEach((d,i) => d.classList.toggle('on', i===mgIdx));
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('modal').classList.contains('open')) return;
  if (e.key === 'Escape')      closeModal();
  if (e.key === 'ArrowRight')  mgNav(1);
  if (e.key === 'ArrowLeft')   mgNav(-1);
});

// touch swipe for modal
let mTouchX = 0;
document.getElementById('mgTrack')?.addEventListener('touchstart', e => mTouchX = e.touches[0].clientX, {passive:true});
document.getElementById('mgTrack')?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - mTouchX;
  if (Math.abs(dx) > 40) mgNav(dx < 0 ? 1 : -1);
});

/* ── skills tabs ────────────────────── */
let skillsTriggered = false;
function switchTab(btn, tab) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('p-' + tab);
  panel.classList.add('active');
  setTimeout(() => fillBars(panel), 30);
}
function fillBars(panel) {
  (panel || document.querySelector('.tab-panel.active'))
    ?.querySelectorAll('.skill-row').forEach(row => {
      row.querySelector('.sr-fill').style.width = row.dataset.p + '%';
    });
}

/* ── nav + scroll ──────────────────── */
const navEl = document.getElementById('nav');
function onScroll() {
  navEl.classList.toggle('solid', window.scrollY > 20);

  // active nav link
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  document.querySelectorAll('.nl').forEach(a => {
    a.classList.toggle('act', a.dataset.s === current);
  });

  // skills bar trigger
  const skillsSec = document.getElementById('skills');
  if (skillsSec && !skillsTriggered) {
    const rect = skillsSec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      skillsTriggered = true;
      fillBars(null);
    }
  }

  // reveal on scroll
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('in');
  });
}
window.addEventListener('scroll', onScroll, {passive:true});

/* ── nav smooth scroll ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth'});
  });
});

/* ── hamburger / drawer ────────────── */
let drawerOpen = false;
function toggleMenu() {
  drawerOpen = !drawerOpen;
  document.getElementById('drawer').classList.toggle('open', drawerOpen);
  document.getElementById('drawerBg').classList.toggle('show', drawerOpen);
  document.getElementById('menuBtn').classList.toggle('open', drawerOpen);
}
function closeDrawer() {
  drawerOpen = false;
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerBg').classList.remove('show');
  document.getElementById('menuBtn').classList.remove('open');
}

/* ── theme ─────────────────────────── */
let light = false;
document.getElementById('themeBtn').addEventListener('click', () => {
  light = !light;
  document.body.classList.toggle('light', light);
  document.getElementById('themeBtn').innerHTML =
    light ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-circle-half-stroke"></i>';
});

/* ── hero typewriter ───────────────── */
const ROLES = [
  "AI-powered apps",
  "Flutter mobile apps",
  "ML prediction models",
  "embedded systems",
  "FastAPI backends",
  "IoT projects"
];
let rIdx=0, cIdx=0, del=false;
const roleEl = document.getElementById('roleText');
function typeRole() {
  const word = ROLES[rIdx];
  if (!del) {
    cIdx++;
    roleEl.textContent = word.slice(0, cIdx);
    if (cIdx === word.length) { del=true; setTimeout(typeRole,1600); return; }
  } else {
    cIdx--;
    roleEl.textContent = word.slice(0, cIdx);
    if (cIdx === 0) { del=false; rIdx=(rIdx+1)%ROLES.length; }
  }
  setTimeout(typeRole, del ? 50 : 85);
}

/* ── counter anim ──────────────────── */
function runCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.max(1, target / 28);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(iv);
    }, 38);
  });
}

/* ── form ───────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formOk').style.display = 'flex';
    e.target.reset();
  }, 1600);
}

/* ── add reveal class to elements ───── */
function setupReveal() {
  document.querySelectorAll(
    '.fact-card, .proj-card, .sg-item, .tl-card, .contact-row, .skill-row'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 0.06 + 's';
  });
}

/* ── init ───────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initCardSliders();
  setupReveal();
  typeRole();
  runCounters();
  onScroll(); // run once to set initial states
});
