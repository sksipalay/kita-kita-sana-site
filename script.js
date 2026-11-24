document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.querySelector('.sr-only').textContent = 'Open navigation menu';
      mainNav.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.querySelector('.sr-only').textContent = isExpanded
        ? 'Open navigation menu'
        : 'Close navigation menu';
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    mainNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    return;
  }

  document.querySelectorAll('.hero-copy, .hero-visual').forEach((element, index) => {
    element.classList.add('is-entering');
    element.style.setProperty('--enter-delay', `${index * 120}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.embed-card').forEach((card, index) => {
      card.classList.add('reveal-on-scroll');
      card.style.setProperty('--reveal-delay', `${index * 100}ms`);
      revealObserver.observe(card);
    });
  }
});
