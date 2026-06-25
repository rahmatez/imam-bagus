/* ============================================
   PORTFOLIO - IMAM BAGUS
   Interactive JavaScript
   ============================================ */

'use strict';

/* ---- Cursor Glow ---- */
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
});

/* ---- Navbar Scroll Effect ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

/* ---- Active Nav Link on Scroll ---- */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Typing Effect ---- */
const roles = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Creative Coder',
  'Tech Innovator',
];

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 120;

const typedText = document.getElementById('typedText');

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 60;
  } else {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting  = true;
    typingDelay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    typingDelay = 400;
  }

  setTimeout(typeEffect, typingDelay);
}

setTimeout(typeEffect, 800);

/* ---- AOS (Animate on Scroll) ---- */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

initAOS();

/* ---- Counter Animation ---- */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + '+';
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach((counter) => animateCounter(counter));
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

/* ---- Skill Tooltip ---- */
const skillItems   = document.querySelectorAll('.skill-item');
const skillTooltip = document.getElementById('skillTooltip');
const tooltipName  = skillTooltip.querySelector('.tooltip-name');
const tooltipFill  = skillTooltip.querySelector('.tooltip-fill');
const tooltipPct   = skillTooltip.querySelector('.tooltip-percent');

skillItems.forEach((item) => {
  item.addEventListener('mouseenter', (e) => {
    const name  = item.getAttribute('data-skill');
    const level = item.getAttribute('data-level');

    tooltipName.textContent     = name;
    tooltipPct.textContent      = level + '%';
    tooltipFill.style.width     = '0%';
    skillTooltip.classList.add('visible');

    setTimeout(() => {
      tooltipFill.style.width = level + '%';
    }, 50);

    positionTooltip(e);
  });

  item.addEventListener('mousemove', positionTooltip);

  item.addEventListener('mouseleave', () => {
    skillTooltip.classList.remove('visible');
  });
});

function positionTooltip(e) {
  const x = e.clientX + 16;
  const y = e.clientY - 60;
  const vw = window.innerWidth;
  const tw = 180;

  skillTooltip.style.left = (x + tw > vw ? x - tw - 32 : x) + 'px';
  skillTooltip.style.top  = y + 'px';
}

/* ---- Project Filter ---- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show     = filter === 'all' || category === filter;

      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText   = submitBtn.querySelector('span');
  const original  = btnText.textContent;

  btnText.textContent = 'Mengirim...';
  submitBtn.disabled  = true;

  setTimeout(() => {
    btnText.textContent = original;
    submitBtn.disabled  = false;
    contactForm.reset();
    formSuccess.classList.add('show');

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1500);
});

/* ---- Smooth Scroll for Anchor Links ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Parallax Blobs on Mouse Move ---- */
const blobs = document.querySelectorAll('.blob');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  blobs.forEach((blob, i) => {
    const depth  = (i + 1) * 8;
    const moveX  = x * depth;
    const moveY  = y * depth;
    blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

/* ---- Reveal Navbar Links on Load ---- */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
