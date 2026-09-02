  // header scroll shrink
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // mobile menu
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.classList.remove('open'); mobileMenu.classList.remove('open');
    }));
  }

  // scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // tilt interaction on service cards
  document.querySelectorAll('.tilt').forEach(el => {
    let raf = null;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg) translateZ(2px)`;
      });
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; });
  });

  // portfolio filtering (only present on work.html)
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.p-tile').forEach(tile => {
        tile.classList.toggle('hide', f !== 'all' && tile.dataset.cat !== f);
      });
    });
  });

  // interactive process accordion (only on process.html; home preview rows have no head/body pair issue since they're static)
  document.querySelectorAll('.process-row').forEach(row => {
    const head = row.querySelector('.process-row-head');
    const body = row.querySelector('.process-body');
    if (!head || !body) return;
    head.addEventListener('click', () => {
      const wasOpen = row.classList.contains('open');
      document.querySelectorAll('.process-row').forEach(r => r.classList.remove('open'));
      if (!wasOpen) row.classList.add('open');
    });
  });

  // consultation form -> confirmation state (only present on contact.html)
  const form = document.getElementById('consultForm');
  const confirmState = document.getElementById('confirmState');
  if (form && confirmState) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      confirmState.classList.add('show');
    });
  }
