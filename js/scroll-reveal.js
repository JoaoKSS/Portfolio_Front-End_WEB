// Revelação de elementos ao rolar a página

(function () {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.05, // Dispara suavemente assim que a ponta do elemento surge na tela
    }
  );

  revealElements.forEach((el) => observer.observe(el));
})();
