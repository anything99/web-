/* ============================================================
   AMMAR // DIGITAL IDENTITY
   script.js — Core System
   ============================================================

   ============ EDIT YOUR INFORMATION BELOW ============
*/

const SITE_CONFIG = {
  name: "AMMAR",
  title: "CYBERSECURITY // DEVELOPER",
  description: "Personal digital identity focused on programming, cybersecurity, technology, creative development, and digital experimentation.",
  location: "ALGERIA",
  email: "", // leave empty if not configured
  social: {
    instagram: "https://www.instagram.com/l_m3.1?stkn=N2tyeDQ3b24zOHdi&utm_source=qr",
    tiktok: "https://www.tiktok.com/@maxar.p?_r=1&_t=ZN-99x2zE8xyfG",
    discord: "https://discord.gg/k6wsr2fdh",
    telegram: "https://t.me/maxm911"
  }
};

const PROFILE_IMAGE = "./profile.jpg";

/* ============================================================
   END OF CONFIGURATION — DO NOT EDIT BELOW UNLESS NEEDED
   ============================================================ */

(function () {
  'use strict';

  /* ---------- UTILITIES ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     LOADING SCREEN
     ============================================================ */
  function initLoader() {
    const loader = $('#loader');
    const fill = $('#loaderFill');
    const status = $('#loaderStatus');
    if (!loader) return;

    if (prefersReducedMotion) {
      loader.classList.add('is-hidden');
      return;
    }

    const stages = [
      { p: 25, label: 'INITIALIZING' },
      { p: 55, label: 'IDENTITY' },
      { p: 80, label: 'SYSTEM' },
      { p: 100, label: 'READY' }
    ];

    let i = 0;
    const tick = () => {
      if (i >= stages.length) {
        setTimeout(() => loader.classList.add('is-hidden'), 200);
        return;
      }
      const s = stages[i++];
      if (fill) fill.style.width = s.p + '%';
      if (status) status.textContent = s.label;
      setTimeout(tick, 260 + Math.random() * 140);
    };
    setTimeout(tick, 180);
  }

  /* ============================================================
     DYNAMIC PERSONAL INFORMATION
     ============================================================ */
  function applyConfig() {
    // Hero title & status
    const heroTitle = $('#heroTitle');
    if (heroTitle) heroTitle.textContent = SITE_CONFIG.title;

    // Identity panel
    const idName = $('#idName');
    const idRole = $('#idRole');
    const idLocation = $('#idLocation');
    if (idName) idName.textContent = SITE_CONFIG.name;
    if (idRole) idRole.textContent = SITE_CONFIG.title;
    if (idLocation) idLocation.textContent = SITE_CONFIG.location;

    // Update document title
    document.title = `${SITE_CONFIG.name} // CYBERSECURITY & DIGITAL PORTFOLIO`;

    // OG meta
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', `${SITE_CONFIG.name} // CYBERSECURITY & DIGITAL PORTFOLIO`);
    if (ogDesc) ogDesc.setAttribute('content', SITE_CONFIG.description);

    // Profile image
    const img = $('#profileImg');
    if (img) {
      img.src = PROFILE_IMAGE;
      img.addEventListener('error', () => {
        img.style.background = 'linear-gradient(135deg, #111 0%, #222 100%)';
        img.removeAttribute('src');
        img.alt = 'Profile image unavailable';
      }, { once: true });
    }
  }

  /* ============================================================
     SOCIAL LINKS
     ============================================================ */
  function applySocialLinks() {
    $$('[data-social-link]').forEach(link => {
      const key = link.getAttribute('data-social-link');
      const url = SITE_CONFIG.social && SITE_CONFIG.social[key];
      const label = link.querySelector('[data-label]');

      if (!url || typeof url !== 'string' || url.trim() === '') {
        // Graceful fallback
        link.setAttribute('aria-disabled', 'true');
        link.classList.add('is-disabled');
        link.removeAttribute('href');
        link.removeAttribute('target');
        link.removeAttribute('rel');
        if (label) label.textContent = 'LINK NOT CONFIGURED';
        else link.textContent = 'LINK NOT CONFIGURED';
      } else {
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /* ============================================================
     EMAIL HANDLING
     ============================================================ */
  function applyEmail() {
    const emailBtn = $('#emailBtn');
    if (!emailBtn) return;

    const email = SITE_CONFIG.email && SITE_CONFIG.email.trim();
    if (!email) {
      emailBtn.textContent = 'EMAIL NOT CONFIGURED';
      emailBtn.classList.add('is-disabled');
      emailBtn.setAttribute('aria-disabled', 'true');
      emailBtn.removeAttribute('href');
      return;
    }
    emailBtn.setAttribute('href', `mailto:${email}`);
    emailBtn.textContent = 'EMAIL';
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    const toggle = $('#navToggle');
    const menu = $('#mobileMenu');
    const links = $$('.mobile-menu__link');
    if (!toggle || !menu) return;

    const open = () => {
      toggle.classList.add('is-open');
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    };

    const close = () => {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    };

    toggle.addEventListener('click', () => {
      menu.classList.contains('is-open') ? close() : open();
    });

    links.forEach(link => {
      link.addEventListener('click', () => close());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
  }

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navH = 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navH;

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });

    // Scroll indicator
    const scrollInd = $('#scrollIndicator');
    if (scrollInd) {
      scrollInd.addEventListener('click', (e) => {
        e.preventDefault();
        const about = $('#about');
        if (!about) return;
        window.scrollTo({
          top: about.offsetTop - 72,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }
  }

  /* ============================================================
     ACTIVE NAVIGATION
     ============================================================ */
  function initActiveNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav__link');
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
      navLinks.forEach(l => {
        l.classList.toggle('is-active', l.dataset.section === id);
      });
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      });
      sections.forEach(s => obs.observe(s));
    }
  }

  /* ============================================================
     NAV SCROLL STATE
     ============================================================ */
  function initNavScroll() {
    const nav = $('#nav');
    if (!nav) return;
    let ticking = false;
    const update = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */
  function initScrollProgress() {
    const bar = $('#progress');
    if (!bar) return;
    let ticking = false;

    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function initCursor() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const cursor = $('#cursor');
    const ring = $('.cursor__ring');
    const dot = $('.cursor__dot');
    if (!cursor || !ring || !dot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let active = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!active) {
        active = true;
        cursor.classList.add('is-active');
      }
    }, { passive: true });

    // Smooth ring
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    // Hover states
    const hoverTargets = 'a, button, [data-cursor="hover"], .project-card, .social-card, .skill-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.remove('is-hover');
    });

    document.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-down'));

    document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    document.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
  }

  /* ============================================================
     REVEAL SYSTEM
     ============================================================ */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08
    });

    // Stagger within grids
    const groups = {};
    items.forEach(el => {
      const parent = el.parentElement;
      if (!groups[parent]) groups[parent] = [];
      groups[parent].push(el);
    });

    Object.values(groups).forEach(group => {
      group.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
      });
    });

    items.forEach(el => obs.observe(el));
  }

  /* ============================================================
     GLITCH SYSTEM
     ============================================================ */
  function initGlitch() {
    if (prefersReducedMotion) return;
    const glitches = $$('.glitch');
    if (!glitches.length) return;

    const trigger = (el) => {
      if (el.classList.contains('is-glitching')) return;
      el.classList.add('is-glitching');
      setTimeout(() => el.classList.remove('is-glitching'), 400);
    };

    glitches.forEach(el => {
      el.addEventListener('mouseenter', () => trigger(el));
    });

    // Occasional ambient glitch
    if (glitches.length) {
      setInterval(() => {
        if (document.hidden) return;
        const el = glitches[Math.floor(Math.random() * glitches.length)];
        trigger(el);
      }, 7500);
    }
  }

  /* ============================================================
     CLIPBOARD
     ============================================================ */
  function initClipboard() {
    $$('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const value = btn.getAttribute('data-copy');
        if (!value) return;

        let success = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(value);
            success = true;
          } else {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = value;
            ta.setAttribute('readonly', '');
            ta.style.position = 'absolute';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            success = document.execCommand('copy');
            document.body.removeChild(ta);
          }
        } catch (err) {
          success = false;
        }

        const original = btn.textContent;
        btn.textContent = success ? 'COPIED' : 'FAILED';
        btn.classList.toggle('is-copied', success);
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1400);
      });
    });
  }

  /* ============================================================
     PARTICLE BACKGROUND (Canvas)
     ============================================================ */
  function initParticles() {
    if (prefersReducedMotion) return;
    const canvas = $('#particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = null;
    let running = true;

    const mouse = { x: null, y: null };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((w * h) / 22000), 70);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          a: Math.random() * 0.5 + 0.15
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse influence
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 14000) {
            const f = (14000 - dist2) / 14000;
            p.x += dx * 0.0025 * f;
            p.y += dy * 0.0025 * f;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
        ctx.fill();
      }

      // Subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const o = (1 - d2 / 12000) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${o})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', resize, { passive: true });

    // Pause when hero not visible (perf)
    if ('IntersectionObserver' in window) {
      const hero = $('.hero');
      if (hero) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!running) {
                running = true;
                draw();
              }
            } else {
              running = false;
              if (raf) cancelAnimationFrame(raf);
            }
          });
        }, { threshold: 0 });
        obs.observe(hero);
      }
    }

    resize();
    draw();
  }

  /* ============================================================
     PROFILE IMAGE PARALLAX
     ============================================================ */
  function initPortraitParallax() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const wrap = $('.hero__portrait-wrap');
    const img = $('.hero__img');
    if (!wrap || !img) return;

    let ticking = false;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      const cxN = (e.clientX / window.innerWidth - 0.5) * 2;
      const cyN = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = cxN * 6;
      ty = cyN * 6;

      if (!ticking) {
        ticking = true;
        const loop = () => {
          cx += (tx - cx) * 0.08;
          cy += (ty - cy) * 0.08;
          img.style.transform = `translate(${cx}px, ${cy}px) scale(1.02)`;
          if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
            requestAnimationFrame(loop);
          } else {
            ticking = false;
          }
        };
        requestAnimationFrame(loop);
      }
    }, { passive: true });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    applyConfig();
    applySocialLinks();
    applyEmail();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initNavScroll();
    initScrollProgress();
    initCursor();
    initReveal();
    initGlitch();
    initClipboard();
    initParticles();
    initPortraitParallax();
    initLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();