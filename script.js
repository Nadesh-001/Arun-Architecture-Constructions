    /* ------ MOBILE MENU ------ */
    function toggleMenu() {
      const btn = document.getElementById('menuBtn');
      const drawer = document.getElementById('mobDrawer');
      const overlay = document.getElementById('mobOverlay');
      const isOpen = drawer.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      btn.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    function closeMenu() {
      document.getElementById('menuBtn').classList.remove('open');
      document.getElementById('mobDrawer').classList.remove('open');
      document.getElementById('mobOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    /* ------ LIGHTBOX ------ */
    const lbImages = [
      { type: 'image', src: 'assets/471427032_1578245142807242_8924903744951973875_n.jpg', cap: 'Signature Residence — Nagercoil' },
      { type: 'video', videoId: 'hxAc-3PQRos', cap: '1.8 Cent Contemporary House (G+1) — Parakkai, Nagercoil' },
      { type: 'image', src: 'assets/architectural-designs-500x500.webp', cap: 'Residential Architectural Design — Planning' },
      { type: 'video', videoId: 'UfWdqGujElY', cap: 'ARUN Architecture & Constructions — Construction & Design Showcase' },
      { type: 'image', src: 'assets/building-construction-500x500.webp', cap: 'Home Construction — Parakkai' },
      { type: 'image', src: 'assets/interior-designers-500x500.webp', cap: 'Contemporary Interior Design — Nagercoil' },
    ];
    let lbCurrent = 0;

    function updateLightboxContent() {
      const item = lbImages[lbCurrent];
      const imgEl = document.getElementById('lbImg');
      const videoWrap = document.getElementById('lbVideoWrap');
      const iframeEl = document.getElementById('lbIframe');
      const captionEl = document.getElementById('lbCaption');
      const ytLink = document.getElementById('lbYtLink');

      captionEl.textContent = item.cap;

      if (item.type === 'video') {
        imgEl.style.display = 'none';
        imgEl.src = '';
        videoWrap.style.display = 'block';
        iframeEl.src = 'https://www.youtube.com/embed/' + item.videoId + '?autoplay=1&rel=0&playsinline=1';
        if (ytLink) {
          ytLink.href = 'https://www.youtube.com/watch?v=' + item.videoId;
          ytLink.innerHTML = 'WATCH ON YOUTUBE <svg class="icon-svg arrow-icon" aria-hidden="true"><use href="#icon-arrow"></use></svg>';
          ytLink.style.display = 'inline-flex';
        }
      } else {
        videoWrap.style.display = 'none';
        iframeEl.src = '';
        imgEl.style.display = 'block';
        imgEl.src = item.src;
        imgEl.alt = item.cap;
        if (ytLink) {
          ytLink.style.display = 'none';
        }
      }
    }

    function openLightbox(idx) {
      lbCurrent = idx;
      updateLightboxContent();
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('open');
      const iframeEl = document.getElementById('lbIframe');
      if (iframeEl) iframeEl.src = '';
      const videoWrap = document.getElementById('lbVideoWrap');
      if (videoWrap) videoWrap.classList.remove('reel-mode');
      const imgEl = document.getElementById('lbImg');
      if (imgEl) imgEl.src = '';
      const ytLink = document.getElementById('lbYtLink');
      if (ytLink) ytLink.style.display = 'none';
      document.body.style.overflow = '';
    }

    function lbOutsideClick(e) {
      if (e.target.id === 'lightbox') closeLightbox();
    }

    function lbNav(dir) {
      lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
      updateLightboxContent();
    }

    document.addEventListener('keydown', e => {
      const lb = document.getElementById('lightbox');
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') item.click(); });
    });

    /* ------ TESTIMONIALS CAROUSEL ------ */
    let tIdx = 0;
    const TOTAL = 6;
    function visCount() { return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1060 ? 2 : 3; }
    function maxIdx() { return Math.ceil(TOTAL / visCount()) - 1; }

    function buildDots() {
      const c = document.getElementById('tDots'); c.innerHTML = '';
      for (let i = 0; i <= maxIdx(); i++) {
        const b = document.createElement('button');
        b.className = 't-dot' + (i === tIdx ? ' active' : '');
        b.setAttribute('aria-label', 'Testimonial page ' + (i + 1));
        b.onclick = () => { tIdx = i; updateCarousel(); };
        c.appendChild(b);
      }
    }
    function updateCarousel() {
      const track = document.getElementById('tTrack');
      const card = track.querySelector('.t-card');
      if (!card) return;
      const gap = 22;
      const cardW = card.getBoundingClientRect().width + gap;
      const vis = visCount();
      track.style.transform = `translateX(-${tIdx * cardW * vis}px)`;
      buildDots();
    }
    function tMove(dir) {
      tIdx = Math.max(0, Math.min(maxIdx(), tIdx + dir));
      updateCarousel();
    }
    let tAuto = setInterval(() => { tIdx = tIdx >= maxIdx() ? 0 : tIdx + 1; updateCarousel(); }, 4600);
    const tWrap = document.querySelector('.t-carousel-wrap');
    tWrap.addEventListener('mouseenter', () => clearInterval(tAuto));
    tWrap.addEventListener('mouseleave', () => { tAuto = setInterval(() => { tIdx = tIdx >= maxIdx() ? 0 : tIdx + 1; updateCarousel(); }, 4600); });
    window.addEventListener('resize', () => { tIdx = 0; updateCarousel(); });
    buildDots();

    /* ------ FAQ ACCORDION ------ */
    function toggleFaq(btn) {
      const item = btn.parentElement;
      const ans = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 40 + 'px';
      }
    }

    /* ------ SCROLL ANIMATIONS (IntersectionObserver) ------ */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); revealObs.unobserve(e.target); }
      });
    }, { threshold: .1 });
    document.querySelectorAll('[data-animate]').forEach(el => revealObs.observe(el));

    /* ------ ANIMATED COUNTERS ------ */
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-count]').forEach(el => {
            const target = +el.dataset.count;
            const suffix = el.dataset.suffix || '';
            let count = 0; const step = Math.ceil(target / 55);
            const t = setInterval(() => {
              count = Math.min(count + step, target);
              el.textContent = count + suffix;
              if (count >= target) clearInterval(t);
            }, 22);
          });
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: .45 });
    document.querySelectorAll('.stats-grid').forEach(el => counterObs.observe(el));

    /* ------ ACTIVE NAV ON SCROLL ------ */
    const navAs = document.querySelectorAll('.navlinks a');
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navAs.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { threshold: .35, rootMargin: '-76px 0px 0px 0px' });
    document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

    /* ------ HEADER SCROLL STATE + SCROLL-TOP BTN ------ */
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      document.getElementById('siteHeader').classList.toggle('scrolled', y > 20);
      scrollBtn.classList.toggle('visible', y > 450);
    }, { passive: true });

    /* ------ WHATSAPP FORM ------ */
    function sendWhatsApp(e) {
      e.preventDefault();
      const v = id => document.getElementById(id).value;
      const text = `Hello ARUN Architecture %26 Constructions,%0A%0AName: ${encodeURIComponent(v('name'))}%0APhone: ${encodeURIComponent(v('phone'))}%0AEmail: ${encodeURIComponent(v('email'))}%0AProject Type: ${encodeURIComponent(v('type'))}%0ALocation: ${encodeURIComponent(v('location'))}%0AProject Details: ${encodeURIComponent(v('message'))}`;
      window.open(`https://wa.me/916374698498?text=${text}`, '_blank');
    }

    /* ------ VENDOR CAROUSEL INFINITE SEAMLESS LOOP ------ */
    const vendorTrack = document.querySelector('.vendor-track');
    if (vendorTrack && vendorTrack.children.length) {
      vendorTrack.innerHTML += vendorTrack.innerHTML;
    }
