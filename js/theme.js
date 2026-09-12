// Gerenciamento de Alternância de Tema (Dark/Light)
 
(function initTheme() {
  const THEME_STORAGE_KEY = 'portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggle');

  // tema inicial
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Verifica preferência do sistema operacional
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  // Aplica o tema ao documento
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeToggleBtn) {
      const isLight = theme === 'light';
      themeToggleBtn.setAttribute('aria-pressed', String(isLight));
    }
  }

  // Aplicação inicial
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Event Listener no botão de alternância
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  }

  // alterações de preferência no sistema operacional 
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();