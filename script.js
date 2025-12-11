/**
 * Portfolio JavaScript
 * Handles dark mode, smooth scrolling, scroll animations, and mobile menu
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const themeToggle = document.getElementById("theme-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");

// ============================================
// THEME TOGGLE (Dark Mode)
// ============================================
const THEME_KEY = "portfolio-theme";

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  // Default to dark for first load across all browsers
  return "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Initialize theme
setTheme(getPreferredTheme());

// Theme toggle click handler
themeToggle.addEventListener("click", toggleTheme);

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
}

function closeMobileMenu() {
  mobileMenuBtn.classList.remove("active");
  navMenu.classList.remove("active");
  document.body.style.overflow = "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close mobile menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
  const scrollY = window.scrollY;

  // Add/remove scrolled class
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScrollY = scrollY;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if it's just "#"
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
  const scrollY = window.scrollY;
  const navbarHeight = navbar.offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      highlightNavLink();
    });
  }
});

// ============================================
// TYPING ANIMATION FOR HERO (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
const heroGradient = document.querySelector(".hero-gradient");
const heroParticles = document.querySelector(".hero-particles");

function parallaxEffect() {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector(".hero").offsetHeight;

  if (scrollY < heroHeight) {
    const moveY = scrollY * 0.3;
    const moveParticles = scrollY * 0.15;

    if (heroGradient) {
      heroGradient.style.transform = `translateY(${moveY}px)`;
    }
    if (heroParticles) {
      heroParticles.style.transform = `translateY(${moveParticles}px)`;
    }
  }
}

window.addEventListener("scroll", () => {
  window.requestAnimationFrame(parallaxEffect);
});

// ============================================
// SKILL TAGS HOVER ANIMATION
// ============================================
const skillTags = document.querySelectorAll(".skill-tag");

skillTags.forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) translateY(-2px)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
  });
});

// ============================================
// PROJECT CARDS TILT EFFECT
// ============================================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ============================================
// HIGHLIGHT CARDS COUNTER ANIMATION
// ============================================
const highlightNumbers = document.querySelectorAll(".highlight-number");

function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    const currentValue = Math.floor(easeOutQuart * (end - start) + start);

    // Check if the original text has special characters
    const originalText = element.dataset.value || element.textContent;

    if (originalText.includes("M")) {
      element.textContent = (currentValue / 10).toFixed(0) + "M+";
    } else if (originalText.includes("%")) {
      element.textContent = currentValue + "%";
    } else if (originalText.includes("+")) {
      element.textContent = currentValue + "+";
    } else {
      element.textContent = currentValue;
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Create observer for highlight numbers
const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;

        // Store original value
        element.dataset.value = text;

        // Extract number from text
        let endValue;
        if (text.includes("M")) {
          endValue = parseFloat(text) * 10;
        } else {
          endValue = parseFloat(text.replace(/[^0-9.]/g, ""));
        }

        if (!isNaN(endValue)) {
          animateNumber(element, 0, endValue, 2000);
        }

        numberObserver.unobserve(element);
      }
    });
  },
  { threshold: 0.5 }
);

highlightNumbers.forEach((number) => {
  numberObserver.observe(number);
});

// ============================================
// FORM VALIDATION (if contact form is added)
// ============================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============================================
// PRELOADER (Optional)
// ============================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial reveal animations
  setTimeout(() => {
    revealElements.forEach((element, index) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          element.classList.add("active");
        }, index * 100);
      }
    });
  }, 100);
});

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener("keydown", (e) => {
  // Tab trap for mobile menu
  if (navMenu.classList.contains("active")) {
    const focusableElements = navMenu.querySelectorAll("a, button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  }, 250);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(
  "%c👋 Hello there, curious developer!",
  "color: #00d4ff; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cFeel free to explore the code. Built with ❤️ by Subham Panda",
  "color: #a8b4c9; font-size: 12px;"
);
