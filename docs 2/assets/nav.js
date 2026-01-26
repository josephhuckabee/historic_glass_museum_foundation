(() => {
  const init = () => {
    const header = document.querySelector('.site-header');
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#primary-nav');

    if (!header || !btn || !nav) return;

    const close = () => {
      header.removeAttribute('data-nav-open');
      btn.setAttribute('aria-expanded', 'false');
    };

    const open = () => {
      header.setAttribute('data-nav-open', 'true');
      btn.setAttribute('aria-expanded', 'true');
    };

    btn.addEventListener('click', () => {
      const isOpen = header.getAttribute('data-nav-open') === 'true';
      if (isOpen) close();
      else open();
    });

    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a && window.matchMedia('(max-width: 599px)').matches) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 600px)').matches) close();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();