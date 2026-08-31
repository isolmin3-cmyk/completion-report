(() => {
  const init = () => {
    const header = document.getElementById('main-header');
    const desktopMenu = header?.querySelector('.site-primary-menu');
    const nav = header?.querySelector('nav');
    if (!header || !desktopMenu || !nav || header.querySelector('.mobile-nav-toggle')) return;

    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-toggle{display:none;width:44px;height:44px;border:1px solid rgba(255,255,255,.16);border-radius:10px;background:#101827;color:#fff;align-items:center;justify-content:center;flex-direction:column;gap:5px;cursor:pointer;z-index:1002}
      .mobile-nav-toggle span{display:block;width:21px;height:2px;background:#31e6df;transition:transform .2s,opacity .2s}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg)}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(2){opacity:0}
      .mobile-nav-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
      .mobile-nav-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.58);z-index:998}
      .mobile-nav-panel{display:none;position:fixed;top:73px;right:0;bottom:0;width:min(88vw,380px);padding:24px;background:#0b1220;border-left:1px solid rgba(255,255,255,.1);overflow-y:auto;z-index:999;transform:translateX(100%);transition:transform .25s ease}
      .mobile-nav-panel.is-open{transform:translateX(0)}
      .mobile-nav-list{display:flex;flex-direction:column;gap:4px}
      .mobile-nav-link,.mobile-nav-summary{display:flex;width:100%;align-items:center;justify-content:space-between;padding:15px 12px;border-bottom:1px solid rgba(255,255,255,.08);color:#e8edf5;font-size:16px;font-weight:700;text-decoration:none;cursor:pointer;list-style:none}
      .mobile-nav-summary::-webkit-details-marker{display:none}
      .mobile-nav-summary::after{content:'+';color:#31e6df;font-size:21px;font-weight:400}
      .mobile-nav-group[open]>.mobile-nav-summary::after{content:'−'}
      .mobile-nav-submenu{display:flex;flex-direction:column;padding:6px 0 10px 14px}
      .mobile-nav-submenu a{padding:11px 12px;color:#aeb4bf;font-size:14px;text-decoration:none}
      .mobile-nav-language{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}
      .mobile-nav-language a{padding:11px;border:1px solid rgba(49,230,223,.28);border-radius:8px;color:#31e6df;text-align:center;text-decoration:none;font-size:14px}
      @media(max-width:1023px){.mobile-nav-toggle{display:flex}.mobile-nav-overlay,.mobile-nav-panel{display:block}.mobile-nav-overlay:not(.is-open){pointer-events:none;opacity:0}.mobile-nav-overlay.is-open{opacity:1}.mobile-nav-panel:not(.is-open){pointer-events:none}}
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-nav-toggle';
    button.setAttribute('aria-label', document.documentElement.lang === 'ko' ? '메뉴 열기' : 'Open menu');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(button);

    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    const panel = document.createElement('aside');
    panel.className = 'mobile-nav-panel';
    panel.setAttribute('aria-label', document.documentElement.lang === 'ko' ? '모바일 목차' : 'Mobile navigation');
    const list = document.createElement('div');
    list.className = 'mobile-nav-list';

    [...desktopMenu.children].forEach((item) => {
      const main = item.querySelector(':scope > a');
      if (!main) return;
      const children = [...item.querySelectorAll(':scope > div a')];
      if (!children.length) {
        const link = main.cloneNode(true);
        link.className = 'mobile-nav-link';
        list.appendChild(link);
        return;
      }
      const group = document.createElement('details');
      group.className = 'mobile-nav-group';
      const summary = document.createElement('summary');
      summary.className = 'mobile-nav-summary';
      summary.textContent = main.textContent.trim();
      const submenu = document.createElement('div');
      submenu.className = 'mobile-nav-submenu';
      children.forEach((child) => {
        const link = child.cloneNode(true);
        link.removeAttribute('class');
        submenu.appendChild(link);
      });
      group.append(summary, submenu);
      list.appendChild(group);
    });

    const page = location.pathname.split('/').pop() || 'index.html';
    const language = document.createElement('div');
    language.className = 'mobile-nav-language';
    const isKorean = location.hostname.includes('completion-report') || document.documentElement.lang === 'ko';
    language.innerHTML = isKorean
      ? `<a href="https://isolmin3-cmyk.github.io/GINOVO-/${page}">English</a><a href="./${page}">한국어</a>`
      : `<a href="./${page}">English</a><a href="https://isolmin3-cmyk.github.io/completion-report/${page}">한국어</a>`;
    panel.append(list, language);
    document.body.append(overlay, panel);

    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? (isKorean ? '메뉴 닫기' : 'Close menu') : (isKorean ? '메뉴 열기' : 'Open menu'));
      overlay.classList.toggle('is-open', open);
      panel.classList.toggle('is-open', open);
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    overlay.addEventListener('click', () => setOpen(false));
    panel.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setOpen(false); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
