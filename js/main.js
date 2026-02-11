/* =====================================================
   DRACULA EXPERIENCE — Interactive JavaScript
   ===================================================== */

(function () {
  'use strict';

  // ----- Navigation Scroll Effect -----
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // ----- Mobile Navigation Toggle -----
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
      var isOpen = navLinks.classList.contains('mobile-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Scroll Reveal with IntersectionObserver -----
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ----- DraculaScore Ring Animation -----
  function initScoreAnimation() {
    var scoreRing = document.querySelector('.score__ring');
    if (!scoreRing) return;

    if (!('IntersectionObserver' in window)) {
      scoreRing.classList.add('animated');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scoreRing.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(scoreRing);
  }

  // ----- FAQ Accordion -----
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-item__question');

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close all others
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ----- Smooth Scroll for Anchor Links -----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ----- Parallax-lite for background images -----
  function initParallax() {
    var parallaxElements = document.querySelectorAll('.parallax-bg img');
    if (!parallaxElements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function updateParallax() {
      var scrollY = window.scrollY;
      parallaxElements.forEach(function (el) {
        var parent = el.closest('.section');
        if (!parent) return;
        var rect = parent.getBoundingClientRect();
        var speed = 0.15;
        var offset = rect.top * speed;
        el.style.transform = 'translateY(' + offset + 'px)';
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  // ----- Initialize -----
  function init() {
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    initReveal();
    initScoreAnimation();
    initFAQ();
    initSmoothScroll();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
