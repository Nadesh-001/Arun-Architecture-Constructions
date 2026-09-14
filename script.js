/* =========================================================
   ARUN ARCHITECTURE & CONSTRUCTIONS
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobDrawer');
  const overlay = document.getElementById('mobOverlay');

  if (!btn || !drawer || !overlay) return;

  const isOpen = drawer.classList.toggle('open');

  overlay.classList.toggle('open', isOpen);
  btn.classList.toggle('open', isOpen);

  document.body.style.overflow = isOpen ? 'hidden' : '';
}


function closeMenu() {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobDrawer');
  const overlay = document.getElementById('mobOverlay');

  if (btn) btn.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');

  document.body.style.overflow = '';
}


/* =========================================================
   YOUTUBE + LIGHTBOX
   ========================================================= */

const lbImages = [
  {
    type: 'image',
    src: 'assets/signature_villa.jpg',
    cap: 'Signature Villa Design — Nagercoil'
  },
  {
    type: 'video',
    videoId: 'hxAc-3PQRos',
    si: 'kihhljDl2MKSJcPI',
    cap: '1.8 Cent Contemporary House (G+1) — Parakkai, Nagercoil'
  },
  {
    type: 'image',
    src: 'assets/architectural-designs-500x500.webp',
    cap: 'Residential Architectural Design — Planning'
  },
  {
    type: 'video',
    videoId: 'lVvrBCCuJqw',
    si: 'ZgWq9cyGPwL3RaQc',
    cap: 'ARUN Architecture & Constructions — Construction Showcase'
  },
  {
    type: 'image',
    src: 'assets/building-construction-500x500.webp',
    cap: 'Home Construction — Parakkai'
  },
  {
    type: 'image',
    src: 'assets/interior-designers-500x500.webp',
    cap: 'Contemporary Interior Design — Nagercoil'
  }
];

let lbCurrent = 0;


/* =========================================================
   YOUTUBE EMBED URL
   ========================================================= */

function getYouTubeEmbedUrl(videoId, autoplay = false, si = '') {
  if (!videoId || typeof videoId !== 'string') {
    return '';
  }

  const cleanId = videoId.trim();
  if (!cleanId) {
    return '';
  }

  const params = new URLSearchParams();
  if (si) {
    params.set('si', si);
  }
  params.set('rel', '0');
  params.set('playsinline', '1');

  if (autoplay === true) {
    params.set('autoplay', '1');
  }

  return (
    'https://www.youtube.com/embed/' +
    encodeURIComponent(cleanId) +
    '?' +
    params.toString()
  );
}


/* =========================================================
   UPDATE LIGHTBOX
   ========================================================= */

function updateLightboxContent() {

  const item = lbImages[lbCurrent];

  if (!item) return;

  const imgEl = document.getElementById('lbImg');
  const videoWrap = document.getElementById('lbVideoWrap');
  const iframeEl = document.getElementById('lbIframe');
  const captionEl = document.getElementById('lbCaption');
  const ytLink = document.getElementById('lbYtLink');

  if (!imgEl || !videoWrap || !iframeEl || !captionEl) {
    return;
  }


  /* -------------------------------------------------------
     STOP CURRENT VIDEO FIRST
     ------------------------------------------------------- */

  iframeEl.src = '';

  imgEl.src = '';

  videoWrap.style.display = 'none';

  if (ytLink) {
    ytLink.style.display = 'none';
    ytLink.removeAttribute('href');
  }


  /* -------------------------------------------------------
     CAPTION
     ------------------------------------------------------- */

  captionEl.textContent = item.cap || '';


  /* -------------------------------------------------------
     VIDEO
     ------------------------------------------------------- */

  if (item.type === 'video') {

    if (!item.videoId) {
      return;
    }

    imgEl.style.display = 'none';

    videoWrap.style.display = 'block';

    /*
     * IMPORTANT:
     * Do NOT autoplay when opening lightbox.
     *
     * This avoids browser autoplay restrictions
     * and unnecessary YouTube loading.
     */
    iframeEl.src = getYouTubeEmbedUrl(item.videoId, false, item.si || '');

    iframeEl.title = item.cap || 'ARUN Architecture & Constructions Video';


    /* YouTube button */

    if (ytLink) {

      ytLink.href =
        'https://www.youtube.com/watch?v=' +
        encodeURIComponent(item.videoId);

      ytLink.style.display = 'inline-flex';
    }

    return;
  }


  /* -------------------------------------------------------
     IMAGE
     ------------------------------------------------------- */

  videoWrap.style.display = 'none';

  iframeEl.src = '';

  imgEl.style.display = 'block';

  imgEl.src = item.src || '';

  imgEl.alt = item.cap || '';
}


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openLightbox(idx) {

  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;

  /*
   * Make sure the index is valid.
   */
  const parsedIndex = Number(idx);

  if (
    !Number.isInteger(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= lbImages.length
  ) {
    return;
  }

  lbCurrent = parsedIndex;

  updateLightboxContent();

  lightbox.classList.add('open');

  document.body.style.overflow = 'hidden';
}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

  const lightbox = document.getElementById('lightbox');
  const iframeEl = document.getElementById('lbIframe');
  const imgEl = document.getElementById('lbImg');
  const ytLink = document.getElementById('lbYtLink');
  const videoWrap = document.getElementById('lbVideoWrap');

  if (lightbox) {
    lightbox.classList.remove('open');
  }

  /*
   * Clearing iframe src completely stops YouTube playback.
   */
  if (iframeEl) {
    iframeEl.src = '';
  }

  if (imgEl) {
    imgEl.src = '';
  }

  if (videoWrap) {
    videoWrap.style.display = 'none';
  }

  if (ytLink) {
    ytLink.style.display = 'none';
    ytLink.removeAttribute('href');
  }

  document.body.style.overflow = '';
}


/* =========================================================
   LIGHTBOX OUTSIDE CLICK
   ========================================================= */

function lbOutsideClick(e) {

  if (!e) return;

  if (e.target && e.target.id === 'lightbox') {
    closeLightbox();
  }
}


/* =========================================================
   LIGHTBOX PREVIOUS / NEXT
   ========================================================= */

function lbNav(dir) {

  if (!Number.isInteger(dir)) {
    return;
  }

  if (!lbImages.length) {
    return;
  }

  /*
   * Stop currently playing video before navigation.
   */
  const iframeEl = document.getElementById('lbIframe');

  if (iframeEl) {
    iframeEl.src = '';
  }

  lbCurrent =
    (lbCurrent + dir + lbImages.length) %
    lbImages.length;

  updateLightboxContent();
}


/* =========================================================
   LIGHTBOX KEYBOARD CONTROL
   ========================================================= */

document.addEventListener('keydown', function (e) {

  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;

  if (!lightbox.classList.contains('open')) {
    return;
  }

  if (e.key === 'Escape') {
    closeLightbox();
  }

  if (e.key === 'ArrowLeft') {
    lbNav(-1);
  }

  if (e.key === 'ArrowRight') {
    lbNav(1);
  }
});


/* =========================================================
   GALLERY KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.gallery-item').forEach(function (item) {

    item.addEventListener('keydown', function (e) {

      if (e.key === 'Enter' || e.key === ' ') {

        e.preventDefault();

        item.click();
      }

    });

  });

});


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

function toggleFaq(btn) {

  if (!btn) return;

  const item = btn.parentElement;

  if (!item) return;

  const ans = item.querySelector('.faq-a');

  if (!ans) return;

  const isOpen = item.classList.contains('open');


  /* Close all FAQ items */

  document.querySelectorAll('.faq-item.open').forEach(function (el) {

    el.classList.remove('open');

    const answer = el.querySelector('.faq-a');

    if (answer) {
      answer.style.maxHeight = '0';
    }

  });


  /* Open selected FAQ */

  if (!isOpen) {

    item.classList.add('open');

    ans.style.maxHeight =
      ans.scrollHeight + 40 + 'px';
  }
}


/* =========================================================
   SCROLL ANIMATIONS
   ========================================================= */

function initAnimations() {

  const animatedElements =
    document.querySelectorAll('[data-animate]');


  if (!animatedElements.length) {
    return;
  }


  if ('IntersectionObserver' in window) {

    const revealObs =
      new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add('in-view');

            revealObs.unobserve(entry.target);
          }

        });

      }, {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px'
      });


    animatedElements.forEach(function (el) {

      revealObs.observe(el);

    });

  } else {

    animatedElements.forEach(function (el) {

      el.classList.add('in-view');

    });

  }
}


/* =========================================================
   INITIAL PAGE SCRIPTS
   ========================================================= */

function initPageScripts() {

  initAnimations();

}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initPageScripts
  );

} else {

  initPageScripts();

}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

function initCounters() {

  const statsGrid =
    document.querySelectorAll('.stats-grid');


  if (!statsGrid.length) {
    return;
  }


  if (!('IntersectionObserver' in window)) {

    statsGrid.forEach(function (grid) {

      grid.querySelectorAll('[data-count]')
        .forEach(function (el) {

          const target =
            Number(el.dataset.count) || 0;

          const suffix =
            el.dataset.suffix || '';

          el.textContent =
            target + suffix;

        });

    });

    return;
  }


  const counterObs =
    new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target
          .querySelectorAll('[data-count]')
          .forEach(function (el) {

            const target =
              Number(el.dataset.count) || 0;

            const suffix =
              el.dataset.suffix || '';

            let count = 0;

            const step =
              Math.max(1, Math.ceil(target / 55));


            const timer =
              setInterval(function () {

                count =
                  Math.min(
                    count + step,
                    target
                  );

                el.textContent =
                  count + suffix;


                if (count >= target) {

                  clearInterval(timer);

                }

              }, 22);

          });


        counterObs.unobserve(entry.target);

      });

    }, {
      threshold: 0.45
    });


  statsGrid.forEach(function (el) {

    counterObs.observe(el);

  });
}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initCounters
  );

} else {

  initCounters();

}


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
   ========================================================= */

function initActiveNavigation() {

  const navAs =
    document.querySelectorAll('.navlinks a');

  const sections =
    document.querySelectorAll('section[id]');


  if (!navAs.length || !sections.length) {
    return;
  }


  if (!('IntersectionObserver' in window)) {
    return;
  }


  const navObs =
    new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
          return;
        }


        navAs.forEach(function (a) {

          a.classList.toggle(
            'active',
            a.getAttribute('href') ===
            '#' + entry.target.id
          );

        });

      });

    }, {
      threshold: 0.35,
      rootMargin: '-76px 0px 0px 0px'
    });


  sections.forEach(function (section) {

    navObs.observe(section);

  });
}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initActiveNavigation
  );

} else {

  initActiveNavigation();

}


/* =========================================================
   HEADER SCROLL STATE + SCROLL TOP BUTTON
   ========================================================= */

function initScrollHandler() {

  const header =
    document.getElementById('siteHeader');

  const scrollBtn =
    document.getElementById('scrollTopBtn');


  window.addEventListener('scroll', function () {

    const y = window.scrollY;


    if (header) {

      header.classList.toggle(
        'scrolled',
        y > 20
      );

    }


    if (scrollBtn) {

      scrollBtn.classList.toggle(
        'visible',
        y > 450
      );

    }

  }, {
    passive: true
  });

}


if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    initScrollHandler
  );

} else {

  initScrollHandler();

}


/* =========================================================
   WHATSAPP FORM
   ========================================================= */

function sendWhatsApp(e) {

  if (e) {
    e.preventDefault();
  }


  const getValue = function (id) {

    const el =
      document.getElementById(id);

    return el
      ? el.value.trim()
      : '';

  };


  const name =
    getValue('name');

  const phone =
    getValue('phone');

  const email =
    getValue('email');

  const type =
    getValue('type');

  const location =
    getValue('location');

  const budget =
    getValue('budget');

  const message =
    getValue('message');


  const text =
    '*New Project Enquiry*' +
    '\n\n' +
    '*Name:* ' +
    name +
    '\n' +
    '*Phone:* ' +
    phone +
    '\n' +
    '*Email:* ' +
    email +
    '\n' +
    '*Project Type:* ' +
    type +
    '\n' +
    '*Location:* ' +
    location +
    '\n' +
    '*Approximate Budget:* ' +
    budget +
    '\n' +
    '*Project Details:* ' +
    message;


  const whatsappUrl =
    'https://wa.me/916374698498?text=' +
    encodeURIComponent(text);


  window.open(
    whatsappUrl,
    '_blank',
    'noopener,noreferrer'
  );
}


/* =========================================================
   END OF SCRIPT
   ========================================================= */
