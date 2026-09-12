// Gerenciamento de Rolagem Suave e Destaque do Link Ativo (Scroll Spy)

document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.header__menu-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.header');

  // Rolagem suave para links internos de âncora
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    let targetElement = null;
    try {
      targetElement = document.querySelector(href);
    } catch {
      return;
    }

    if (!targetElement) return;

    // Evita a navegação de frame padrão do navegador
    e.preventDefault();

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Gerenciamento de foco acessível (WCAG 2.1)
    if (!targetElement.hasAttribute('tabindex')) {
      targetElement.setAttribute('tabindex', '-1');
      targetElement.addEventListener('blur', () => targetElement.removeAttribute('tabindex'), { once: true });
    }
    targetElement.focus({ preventScroll: true });

    // Atualiza histórico apenas em ambientes http/https sem violar a política de segurança de file://
    if (window.location.protocol !== 'file:') {
      try {
        history.pushState(null, '', href);
      } catch {
        // Ignora restrições do ambiente
      }
    }
  });

  // Destaca o link correspondente no menu (Scroll Spy)
  function updateActiveLink() {
    const headerHeight = header ? header.offsetHeight : 80;
    const scrollPosition = window.scrollY + headerHeight + 50;

    let currentSectionId = '';

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = id;
      }
    });

    // No topo da página (Hero) ou na seção Sobre, destaca 'Sobre'
    if (window.scrollY < 300 || currentSectionId === 'hero' || currentSectionId === 'sobre') {
      currentSectionId = 'sobre';
    }

    menuLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('header__menu-link--active');
      } else {
        link.classList.remove('header__menu-link--active');
      }
    });
  }

  // Monitora a rolagem e executa na inicialização
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});