// Gerenciamento de Alternância de Tema (Dark/Light)

(function initTheme() {
  const THEME_STORAGE_KEY = 'portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggle');

  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeToggleBtn) {
      const isLight = theme === 'light';
      themeToggleBtn.setAttribute('aria-pressed', String(isLight));
      themeToggleBtn.setAttribute(
        'aria-label',
        isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro'
      );
    }
  }

  applyTheme(getActiveTheme());

  // Alternância manual pelo botão
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = getActiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);

      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
      }
    });
  }

  // Sincronização automática com mudanças do sistema operacional
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();