// Destaque do Link Ativo no Menu (Scroll Spy)

document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.header__menu-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.header');

  // Destaca o link correspondente no menu
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