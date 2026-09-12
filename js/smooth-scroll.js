// Scroll Spy — Destaque do link ativo no menu de navegação

(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const navLinks = document.querySelectorAll('.header__menu-link');
  const sections = Array.from(document.querySelectorAll('section[id]')).filter(
    (s) => s.id !== 'hero'
  );

  function setActive(id) {
    navLinks.forEach((link) => {
      const matches = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('header__menu-link--active', matches);
      if (matches) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function getActiveId() {
    const trigger = window.scrollY + window.innerHeight * 0.4;
    let active = 'sobre';
    for (const section of sections) {
      if (section.offsetTop <= trigger) {
        active = section.id;
      }
    }
    return active;
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setActive(id);
    });
  });

  // Scroll spy com throttle via requestAnimationFrame
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(getActiveId());
        ticking = false;
      });
    },
    { passive: true }
  );

  // Estado inicial
  window.addEventListener('load', () => setActive(getActiveId()));
})();