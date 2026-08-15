/* ═══════════════════════════════════════
   OMER PORTFOLIO — script.js
═══════════════════════════════════════ */

/* ── project data ─────────────────── */
const PROJECTS = [
  {
    title: "Smart Stock Predictor",
    desc:  "Full-stack AI investment app for PSX and global markets. Random Forest price prediction, dual FinBERT/VADER sentiment pipeline, Gemini chatbot, portfolio tracker, bond calculator, options pricing — Flutter frontend, FastAPI backend, deployed on Render with Firebase auth.",
    tags:  ["Python","Flutter","FastAPI","FinBERT","VADER","Gemini","Firebase","Render"],
    imgs:  ["assets/stockprediction-1.jpeg","assets/stockprediction-2.jpeg","assets/stockprediction-3.jpeg","assets/stockprediction-4.jpeg","assets/stockprediction-5.jpeg","assets/stockprediction-6.jpeg","assets/stockprediction-7.jpeg","assets/stockprediction-8.jpeg","assets/stockprediction-9.jpeg","assets/stockprediction-10.jpeg","assets/stockprediction-11.jpeg","assets/stockprediction-12.jpeg","assets/stockprediction-13.jpeg","assets/stockprediction-14.jpeg","assets/stockprediction-15.jpeg","assets/stockprediction-16.jpeg","assets/stockprediction-17.jpeg"],
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
    imgs:  ["assets/water1.png","assets/water2.png","assets/water3.png"],
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

/* ── hero Morph Text (blur-morph word rotation) ─── */
const ROLES = [
  "AI-powered apps",
  "Flutter mobile apps",
  "ML prediction models",
  "embedded systems",
  "FastAPI backends",
  "IoT projects"
];
let morphIdx = 0;
function runMorphText() {
  const el = document.getElementById('morphText');
  if (!el) return;
  el.textContent = ROLES[morphIdx];
  el.classList.add('morph-in');
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('morph-in')));

  setInterval(() => {
    el.classList.add('morph-out');
    setTimeout(() => {
      morphIdx = (morphIdx + 1) % ROLES.length;
      el.textContent = ROLES[morphIdx];
      el.classList.remove('morph-out');
      el.classList.add('morph-in');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('morph-in')));
    }, 380);
  }, 2600);
}

/* ── hero badge Flip Fade Text ──────── */
const BADGE_WORDS = ["Open to opportunities", "Actively building", "Always learning"];
let badgeIdx = 0;
function runBadgeFlip() {
  const el = document.getElementById('badgeFlip');
  if (!el) return;
  setInterval(() => {
    el.classList.add('ff-out');
    setTimeout(() => {
      badgeIdx = (badgeIdx + 1) % BADGE_WORDS.length;
      el.textContent = BADGE_WORDS[badgeIdx];
      el.classList.remove('ff-out');
      el.classList.add('ff-in');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('ff-in')));
    }, 450);
  }, 3200);
}

/* ── Kinetic Text Loader ────────────── */
function hidePageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.classList.add('kl-hide');
  setTimeout(() => loader.remove(), 600);
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
    '.fact-card, .proj-card, .tl-card, .contact-row, .skill-row'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 0.06 + 's';
  });
}

/* ══════════════════════════════════════════════
   NEW — interactive layer
══════════════════════════════════════════════ */

/* ── Glow Border Cards (cursor-tracking radial glow) ── */
function initGlowCards() {
  const selector = '.fact-card, .proj-card, .contact-row, .tl-card, .contact-form';
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('glow-card');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

/* ── Radial Glow Buttons (track cursor position) ── */
function initGlowButtons() {
  document.querySelectorAll('.btn-solid, .cv-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--gx', (e.clientX - r.left) + 'px');
      btn.style.setProperty('--gy', (e.clientY - r.top) + 'px');
    });
  });
}

/* ── Magnetic pull for icons / social buttons ── */
function initMagnetic() {
  document.querySelectorAll('.sfd, .btn-icon, .icon-btn').forEach(el => {
    el.classList.add('magnetic');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * 0.35}px, ${my * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ── Spotlight Navbar ── */
function initSpotlightNav() {
  const wrap = document.querySelector('.nav-center');
  if (!wrap) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    wrap.style.setProperty('--nx', (e.clientX - r.left) + 'px');
    wrap.style.setProperty('--ny', (e.clientY - r.top) + 'px');
    wrap.classList.add('spot-on');
  });
  wrap.addEventListener('mouseleave', () => wrap.classList.remove('spot-on'));
}

/* ── Tech Marquee (Logo Slider) ── */
const MARQUEE_ITEMS = [
  {icon:'fab fa-python',           label:'Python'},
  {icon:'fas fa-mobile-alt',       label:'Flutter'},
  {icon:'fas fa-server',           label:'FastAPI'},
  {icon:'fas fa-brain',            label:'scikit-learn'},
  {icon:'fas fa-fire-flame-curved',label:'Firebase'},
  {icon:'fab fa-git-alt',          label:'Git'},
  {icon:'fas fa-microchip',        label:'Arduino'},
  {icon:'fas fa-database',         label:'MySQL'},
  {icon:'fab fa-js',               label:'JavaScript'},
  {icon:'fas fa-cloud',            label:'Render'},
  {icon:'fas fa-robot',            label:'Gemini API'},
  {icon:'fas fa-chart-line',       label:'FinBERT'}
];
function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const html = MARQUEE_ITEMS.map(m =>
    `<div class="marquee-item"><i class="${m.icon}"></i><span>${m.label}</span></div>`
  ).join('');
  track.innerHTML = html + html; // duplicate for seamless loop
}

/* ── FAQ Accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });
}

/* ── Kinetic section-title reveal (wrap words, animate on scroll) ── */
function initTitleReveal() {
  document.querySelectorAll('.sec-title').forEach(title => {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map((w, i) =>
      `<span class="stw" style="transition-delay:${i * 0.05}s">${w}&nbsp;</span>`
    ).join('');
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  document.querySelectorAll('.sec-title').forEach(t => io.observe(t));
}

/* ── 3D tilt for project cards (Cursor Card effect) ── */
function initCardTilt() {
  const isFine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (!isFine) return;
  document.querySelectorAll('.proj-card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── Discord copy-to-clipboard (no public profile URL) ── */
function initDiscordCopy() {
  const DISCORD_USER = 'omer_20720';

  function copy(feedbackEl, revert) {
    navigator.clipboard?.writeText(DISCORD_USER).catch(() => {});
    if (feedbackEl) {
      const original = feedbackEl.textContent;
      feedbackEl.textContent = 'Copied!';
      feedbackEl.classList.add('copied');
      setTimeout(() => {
        feedbackEl.textContent = original;
        feedbackEl.classList.remove('copied');
      }, 1400);
    }
  }

  const discordRow = document.getElementById('discordRow');
  discordRow?.addEventListener('click', () => copy(document.getElementById('discordLabel')));

  const discordFlip = document.getElementById('discordFlip');
  discordFlip?.addEventListener('click', () => copy(document.getElementById('discordTip')));
}

/* ── Project card polish: shine sweep, featured ribbon, icon tags ── */
const TAG_ICONS = {
  python:'fab fa-python', flutter:'fas fa-mobile-alt', fastapi:'fas fa-server',
  finbert:'fas fa-comment-dots', vader:'fas fa-face-smile', gemini:'fas fa-robot',
  firebase:'fas fa-fire-flame-curved', render:'fas fa-cloud',
  at89c51:'fas fa-microchip', c:'fas fa-code', 'c++':'fas fa-code',
  sensors:'fas fa-satellite-dish', lcd:'fas fa-tv', embedded:'fas fa-microchip',
  arduino:'fas fa-microchip', i2c:'fas fa-network-wired', tinkercad:'fas fa-cube',
  ldr:'fas fa-sun', 'hc-sr04':'fas fa-wave-square', iot:'fas fa-satellite', relay:'fas fa-toggle-on'
};
const CAT_ICONS = { ai:'fas fa-brain', mobile:'fas fa-mobile-alt', embedded:'fas fa-microchip' };

function initProjectCards() {
  document.querySelectorAll('.proj-card').forEach((card, i) => {
    // shine sweep overlay
    const imgsWrap = card.querySelector('.proj-imgs');
    if (imgsWrap && !imgsWrap.querySelector('.proj-shine')) {
      const shine = document.createElement('div');
      shine.className = 'proj-shine';
      imgsWrap.appendChild(shine);
    }
    // featured ribbon on flagship project
    if (i === 0 && imgsWrap && !imgsWrap.querySelector('.proj-featured')) {
      const ribbon = document.createElement('div');
      ribbon.className = 'proj-featured';
      ribbon.innerHTML = '<i class="fas fa-star"></i> Featured';
      imgsWrap.appendChild(ribbon);
    }
    // icon-ify tags
    card.querySelectorAll('.proj-tags span').forEach(span => {
      if (span.querySelector('i')) return;
      const key = span.textContent.trim().toLowerCase();
      const icon = TAG_ICONS[key] || 'fas fa-tag';
      span.innerHTML = `<i class="${icon}"></i>${span.textContent}`;
    });
    // icon-ify category badges
    card.querySelectorAll('.cat-badge').forEach(badge => {
      if (badge.querySelector('i')) return;
      const key = badge.textContent.trim().toLowerCase();
      const icon = CAT_ICONS[key] || 'fas fa-tag';
      badge.innerHTML = `<i class="${icon}"></i>${badge.textContent}`;
    });
  });
}

/* ── init ───────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initCardSliders();
  setupReveal();
  runMorphText();
  runBadgeFlip();
  runCounters();
  initGlowCards();
  initGlowButtons();
  initMagnetic();
  initSpotlightNav();
  initMarquee();
  initFAQ();
  initTitleReveal();
  initCardTilt();
  initDiscordCopy();
  initProjectCards();
  onScroll(); // run once to set initial states
});

window.addEventListener('load', () => {
  setTimeout(hidePageLoader, 400);
});
