/* =============================================
   ABSOLUTE STUDIO – JavaScript
   ============================================= */

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Close mobile menu
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
  // Reinit animations
  setTimeout(initFadeIn, 100);
  return false;
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ===== INTERSECTION OBSERVER – FADE IN =====
function initFadeIn() {
  const elements = document.querySelectorAll('.page.active .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  // Open clicked if was closed
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.disabled = true;
  btn.textContent = 'Odesílání...';
  // Simulate send
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    document.getElementById('contactForm').reset();
  }, 1400);
}

// ===== SMOOTH NAV HOVER =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// ===== SCROLL PROGRESS (subtle) =====
function createScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
    background: linear-gradient(90deg, #2A9D8F, #4ECDC4);
    transition: width 0.1s; width: 0%;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// ===== KRYO DEVICE IMAGE PARALLAX (subtle) =====
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.page.active .hero-img');
  const heroCircle = document.querySelector('.page.active .hero-circle-overlay');
  if (heroImg) {
    const scrolled = window.scrollY;
    const transformVal = `translateY(${scrolled * 0.3}px)`;
    heroImg.style.transform = transformVal;
    if (heroCircle) {
      heroCircle.style.transform = transformVal;
    }
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Show home page
  showPage('uvod');
  // Scroll progress bar
  createScrollProgress();
  // Init animations after short delay
  setTimeout(initFadeIn, 300);
});

// ===== REINIT FADE ON PAGE CHANGE =====
// Override showPage to also re-trigger on page clicks
const _originalShowPage = showPage;
