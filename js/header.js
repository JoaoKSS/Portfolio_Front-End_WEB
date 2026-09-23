// Gerenciamento de rolagem do Cabeçalho
// Esconde suavemente ao rolar para baixo e reaparece com fundo translúcido ao rolar para cima

(function initSmartHeader() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menuToggle');

  if (!header) return;

  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;
  const scrollThreshold = 80;
  const deltaTolerance = 6;

  function updateHeader() {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Se o menu mobile estiver aberto mantém o header sempre visível
    const isMenuOpen = menuToggle && menuToggle.getAttribute('aria-expanded') === 'true';
    if (isMenuOpen) {
      header.classList.remove('header--hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // No topo da página: transparente e sem sombra
    if (currentScrollY <= 40) {
      header.classList.remove('header--hidden');
      header.classList.remove('header--scrolled');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) < deltaTolerance) {
      ticking = false;
      return;
    }

    if (delta > 0 && currentScrollY > scrollThreshold) {
      // Rolando para baixo: esconde o cabeçalho
      header.classList.add('header--hidden');
    } else if (delta < 0) {
      // Rolando para cima: reaparece o cabeçalho
      header.classList.remove('header--hidden');
      header.classList.add('header--scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateHeader();
})();
