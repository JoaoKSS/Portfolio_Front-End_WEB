// Scroll Spy — Destaque do link ativo no menu de navegação

(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const navLinks = document.querySelectorAll('.header__menu-link');
  const navTargets = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      const element = id ? document.getElementById(id) : null;
      return element ? { id, element } : null;
    })
    .filter(Boolean);

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
    const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
    if (isNearBottom && navTargets.length > 0) {
      return navTargets[navTargets.length - 1].id;
    }

    const trigger = window.scrollY + window.innerHeight * 0.35;
    let active = navTargets[0] ? navTargets[0].id : 'sobre';

    for (const target of navTargets) {
      if (target.element.offsetTop <= trigger) {
        active = target.id;
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
        history.pushState(null, '', '#' + id);
      }
      setActive(id);

      const menuToggle = document.getElementById('menuToggle');
      if (menuToggle) menuToggle.checked = false;
    });
  });

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

  // Navegação por histórico
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setActive(hash);
        return;
      }
    }
    setActive(getActiveId());
  });

  // Estado inicial
  window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setActive(hash);
        return;
      }
    }
    setActive(getActiveId());
  });
})();