/* ============================================================
   MAX // DIGITAL IDENTITY — script.js
   ============================================================ */

/* ============ EDIT YOUR INFORMATION BELOW ============ */

const SITE_CONFIG = {
  name: "MAX",
  title: "CYBERSECURITY // DEVELOPER",
  description: "Personal digital identity focused on programming, cybersecurity, technology, creative development, and digital experimentation.",
  email: "",
  social: {
    instagram: "https://www.instagram.com/l_m3.1?stkn=N2tyeDQ3b24zOHdi&utm_source=qr",
    tiktok: "https://www.tiktok.com/@maxar.p?_r=1&_t=ZN-99x2zE8xyfG",
    discord: "https://discord.gg/k6wsr2fdh",
    telegram: "https://t.me/maxm911"
  }
};

const PROFILE_IMAGE = "./profile.jpg";

/* ============================================================
   END OF CONFIGURATION
   ============================================================ */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     LOADER
     ============================================================ */
  function initLoader() {
    const loader = $('#loader');
    const fill = $('#loaderFill');
    const status = $('#loaderStatus');
    if (!loader) return;

    if (prefersReducedMotion) { loader.classList.add('is-hidden'); return; }

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
     CONFIG → DOM
     ============================================================ */
  function applyConfig() {
    const heroTitle = $('#heroTitle');
    if (heroTitle) heroTitle.textContent = SITE_CONFIG.title;

    const idName = $('#idName');
    const idRole = $('#idRole');
    if (idName) idName.textContent = SITE_CONFIG.name;
    if (idRole) idRole.textContent = SITE_CONFIG.title;

    document.title = `${SITE_CONFIG.name} // CYBERSECURITY & DIGITAL PORTFOLIO`;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', `${SITE_CONFIG.name} // CYBERSECURITY & DIGITAL PORTFOLIO`);
    if (ogDesc) ogDesc.setAttribute('content', SITE_CONFIG.description);

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

  function applySocialLinks() {
    $$('[data-social-link]').forEach(link => {
      const key = link.getAttribute('data-social-link');
      const url = SITE_CONFIG.social && SITE_CONFIG.social[key];
      const label = link.querySelector('[data-label]');

      if (!url || typeof url !== 'string' || url.trim() === '') {
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
    links.forEach(l => l.addEventListener('click', close));
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
        const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

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
     ACTIVE NAV
     ============================================================ */
  function initActiveNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav__link');
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
      navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.section === id));
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
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
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
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
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
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

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, active = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!active) { active = true; cursor.classList.add('is-active'); }
    }, { passive: true });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

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
     REVEAL
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
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.08 });

    const groups = {};
    items.forEach(el => {
      const p = el.parentElement;
      if (!groups[p]) groups[p] = [];
      groups[p].push(el);
    });
    Object.values(groups).forEach(group => {
      group.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`; });
    });

    items.forEach(el => obs.observe(el));
  }

  /* ============================================================
     GLITCH
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

    glitches.forEach(el => el.addEventListener('mouseenter', () => trigger(el)));

    setInterval(() => {
      if (document.hidden) return;
      const el = glitches[Math.floor(Math.random() * glitches.length)];
      trigger(el);
    }, 7500);
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
        } catch (err) { success = false; }

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
     WORLD MAP — visible continents + city dots + arcs
     ============================================================ */
  function initWorldMap() {
    if (prefersReducedMotion) return;
    const canvas = $('#worldMap');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = null;
    let running = true;
    let time = 0;

    /* Simplified continent outlines [lon, lat] */
    const CONTINENTS = [
      // North America
      [[-168,66],[-160,71],[-140,70],[-120,70],[-100,73],[-80,73],[-60,60],[-55,50],[-65,45],[-70,42],[-75,35],[-81,25],[-97,26],[-105,22],[-115,30],[-125,40],[-124,48],[-135,58],[-150,60],[-165,55],[-168,66]],
      // South America
      [[-81,8],[-75,11],[-60,11],[-50,0],[-35,-5],[-38,-15],[-48,-25],[-58,-35],[-62,-42],[-68,-55],[-75,-52],[-73,-40],[-71,-30],[-70,-18],[-77,-8],[-81,0],[-81,8]],
      // Europe
      [[-10,36],[-9,44],[-2,48],[2,51],[5,53],[8,57],[12,55],[18,55],[22,60],[28,65],[30,70],[25,71],[15,68],[5,60],[-5,50],[-10,43],[-10,36]],
      // Africa
      [[-17,15],[-17,21],[-10,27],[0,32],[10,37],[20,32],[32,31],[35,25],[43,12],[51,12],[41,-2],[40,-15],[35,-25],[25,-34],[18,-34],[12,-18],[8,4],[0,5],[-8,4],[-17,15]],
      // Asia
      [[30,45],[40,45],[50,45],[60,42],[70,40],[80,45],[90,50],[100,55],[110,60],[120,60],[130,55],[140,50],[145,45],[140,40],[135,35],[125,30],[120,22],[110,20],[100,10],[95,5],[105,0],[115,-5],[120,-8],[115,-10],[105,-5],[100,5],[95,15],[85,20],[75,25],[65,25],[55,25],[45,30],[35,35],[30,45]],
      // Australia
      [[113,-22],[114,-33],[118,-35],[125,-33],[132,-32],[140,-38],[148,-38],[153,-30],[153,-25],[146,-18],[135,-12],[125,-14],[118,-18],[113,-22]],
      // Greenland
      [[-45,60],[-55,65],[-58,72],[-50,78],[-35,82],[-25,80],[-22,72],[-30,65],[-45,60]]
    ];

    /* Active cities [lat, lon] */
    const CITIES = [
      [40.7,-74.0],[34.0,-118.2],[41.9,-87.6],[29.8,-95.4],[37.8,-122.4],
      [25.8,-80.2],[19.4,-99.1],[45.5,-73.6],[-23.5,-46.6],[-34.6,-58.4],
      [-12.0,-77.0],[51.5,-0.1],[48.9,2.3],[52.5,13.4],[41.9,12.5],
      [40.4,-3.7],[55.7,12.6],[59.3,18.1],[50.1,8.7],[52.4,4.9],
      [30.0,31.2],[6.5,3.4],[-1.3,36.8],[-26.2,28.0],[14.7,-17.4],
      [35.7,51.4],[25.2,55.3],[24.9,67.0],[19.1,72.9],[28.6,77.2],
      [13.7,100.5],[1.4,103.8],[-6.2,106.8],[14.6,121.0],[22.3,114.2],
      [31.2,121.5],[39.9,116.4],[35.7,139.7],[37.6,127.0],
      [41.0,28.9],[32.1,34.8],[33.9,35.5],[-33.9,151.2],[-37.8,145.0],[-36.8,174.8]
    ];

    const project = (lat, lon) => ({
      x: (lon + 180) / 360 * w,
      y: (90 - lat) / 180 * h
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      /* 1. Continent outlines */
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';

      CONTINENTS.forEach(poly => {
        ctx.beginPath();
        poly.forEach(([lon, lat], i) => {
          const p = project(lat, lon);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      /* 2. Lat/lon grid */
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        const a = project(lat, -180);
        const b = project(lat, 180);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (let lon = -150; lon <= 150; lon += 30) {
        const a = project(-90, lon);
        const b = project(90, lon);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      /* 3. City dots */
      const cityPoints = CITIES.map(([lat, lon]) => project(lat, lon));
      cityPoints.forEach((p, i) => {
        const phase = (time * 1.2 + i * 0.4) % (Math.PI * 2);
        const pulse = 0.5 + Math.sin(phase) * 0.5;
        const r = 1.5 + Math.sin(phase) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + pulse * 0.5})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * pulse})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      /* 4. Connection arcs with travelling packet */
      const arcs = [
        [0, 18],[18, 22],[22, 30],[30, 35],[35, 41],
        [10, 25],[25, 32],[5, 20],[15, 28],[33, 39],
        [8, 40],[42, 2],[3, 11]
      ];

      arcs.forEach(([i, j], idx) => {
        if (!cityPoints[i] || !cityPoints[j]) return;
        const a = cityPoints[i];
        const b = cityPoints[j];
        const phase = (time * 0.5 + idx * 0.15) % 1;
        const alpha = Math.sin(phase * Math.PI) * 0.55;

        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.22;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const t = phase;
        const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
        const py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.4})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });

    if ('IntersectionObserver' in window) {
      const hero = $('.hero');
      if (hero) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!running) { running = true; draw(); }
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
     PARTICLES
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
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((w * h) / 24000), 60);
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
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        if (mouse.x !== null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (14000 - d2) / 14000;
            p.x += dx * 0.0025 * f;
            p.y += dy * 0.0025 * f;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const o = (1 - d2 / 12000) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${o})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
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
    canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    window.addEventListener('resize', resize, { passive: true });

    if ('IntersectionObserver' in window) {
      const hero = $('.hero');
      if (hero) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!running) { running = true; draw(); }
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
     PORTRAIT PARALLAX
     ============================================================ */
  function initPortraitParallax() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const img = $('.hero__img');
    if (!img) return;

    let ticking = false, tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 12;
      ty = (e.clientY / window.innerHeight - 0.5) * 12;

      if (!ticking) {
        ticking = true;
        const loop = () => {
          cx += (tx - cx) * 0.08;
          cy += (ty - cy) * 0.08;
          img.style.transform = `translate(${cx}px, ${cy}px) scale(1.02)`;
          if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
            requestAnimationFrame(loop);
          } else ticking = false;
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
    initWorldMap();
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