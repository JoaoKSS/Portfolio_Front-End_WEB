// Gerenciamento de Abertura e Fechamento do Menu Mobile
// Padrão de acessibilidade WCAG com foco, ARIA e fechamento inteligente

(function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  const menuLinks = primaryNav ? primaryNav.querySelectorAll('.header__menu-link') : [];

  if (!menuToggle || !primaryNav) {
    return;
  }

  function setMenuState(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    menuToggle.classList.toggle('header__toggle--active', open);
    primaryNav.classList.toggle('header__nav--open', open);
  }

  // Alterna o menu ao clicar no botão alternador
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Fecha o menu ao clicar em qualquer link de âncora
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Fecha o menu ao pressionar a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        setMenuState(false);
        menuToggle.focus();
      }
    }
  });

  // Fecha automaticamente ao redimensionar para visualização desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        setMenuState(false);
      }
    }
  });

  // Fecha ao rolar a página
  window.addEventListener('scroll', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      setMenuState(false);
    }
  }, { passive: true });

  // Fecha ao clicar fora do menu quando aberto
  document.addEventListener('click', (e) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    const clickedInsideNav = primaryNav.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (!clickedInsideNav && !clickedToggle) {
      setMenuState(false);
    }
  });
})();
