(function () {
  'use strict';

  var page = location.pathname.split('/').pop() || 'index.html';
  var koreanBase = 'https://isolmin3-cmyk.github.io/ginovo-homepage/';

  var style = document.createElement('style');
  style.textContent = `
    .site-header-v2 {
      position: fixed !important;
      top: 24px !important;
      left: 50% !important;
      z-index: 5000 !important;
      width: min(calc(100% - 32px), 1540px) !important;
      min-width: 0 !important;
      min-height: 64px !important;
      padding: 10px 22px !important;
      display: flex !important;
      align-items: center !important;
      gap: 22px !important;
      transform: translateX(-50%) !important;
      color: #fff !important;
      background: rgba(13, 19, 30, .78) !important;
      border: 1px solid rgba(255, 255, 255, .15) !important;
      border-radius: 999px !important;
      box-shadow: 0 18px 42px rgba(0, 0, 0, .34) !important;
      backdrop-filter: blur(22px) !important;
      -webkit-backdrop-filter: blur(22px) !important;
      overflow: visible !important;
      box-sizing: border-box !important;
      font-family: Pretendard, Inter, -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
    .site-header-v2 * { box-sizing: border-box; }
    .site-header-v2 a { color: inherit; text-decoration: none; }
    .header-v2-logo { display: flex; flex: 0 0 auto; align-items: center; }
    .header-v2-logo img { display: block; width: auto; height: 32px; filter: none !important; }
    .header-v2-nav { min-width: 0; margin-left: auto; }
    .header-v2-list { display: flex; align-items: center; gap: clamp(13px, 1.55vw, 27px); margin: 0; padding: 0; list-style: none; }
    .header-v2-item { position: relative; flex: 0 0 auto; }
    .header-v2-link,
    .header-v2-trigger { display: flex; align-items: center; gap: 6px; padding: 9px 2px; border: 0; color: #fff !important; background: transparent; font: inherit; font-size: clamp(12px, 1.05vw, 17px); font-weight: 600; line-height: 1; white-space: nowrap; cursor: pointer; }
    .header-v2-trigger::after { content: '⌄'; position: relative; top: -1px; font-size: 12px; transition: transform .2s ease; }
    .header-v2-item:hover > .header-v2-link,
    .header-v2-item:hover > .header-v2-trigger,
    .header-v2-item:focus-within > .header-v2-link,
    .header-v2-item:focus-within > .header-v2-trigger { color: #31e6df !important; }
    .header-v2-item:hover > .header-v2-trigger::after,
    .header-v2-item:focus-within > .header-v2-trigger::after { transform: rotate(180deg); }
    .header-v2-dropdown { position: absolute; top: 100%; left: 50%; width: max-content; min-width: 210px; padding-top: 13px; transform: translateX(-50%) translateY(-5px); opacity: 0; visibility: hidden; transition: opacity .18s ease, transform .18s ease, visibility .18s ease; }
    .header-v2-item:last-child .header-v2-dropdown { right: 0; left: auto; transform: translateY(-5px); }
    .header-v2-item:hover > .header-v2-dropdown,
    .header-v2-item:focus-within > .header-v2-dropdown,
    .header-v2-item.is-open > .header-v2-dropdown { transform: translateX(-50%) translateY(0); opacity: 1; visibility: visible; }
    .header-v2-item:last-child:hover > .header-v2-dropdown,
    .header-v2-item:last-child:focus-within > .header-v2-dropdown,
    .header-v2-item:last-child.is-open > .header-v2-dropdown { transform: translateY(0); }
    .header-v2-panel { padding: 9px; border: 1px solid rgba(255,255,255,.13); border-radius: 16px; background: rgba(16, 22, 34, .98); box-shadow: 0 20px 44px rgba(0,0,0,.4); }
    .header-v2-panel a { display: block; padding: 11px 13px; border-radius: 9px; color: #e8ebef !important; font-size: 14px; font-weight: 600; white-space: nowrap; }
    .header-v2-panel a:hover,
    .header-v2-panel a:focus { color: #31e6df !important; background: rgba(49,230,223,.1); }
    @media (max-width: 1050px) {
      .site-header-v2 { top: 14px !important; justify-content: flex-start !important; gap: 16px !important; padding: 10px 16px !important; border-radius: 24px !important; }
      .header-v2-logo img { height: 24px; }
      .header-v2-nav { overflow-x: auto; scrollbar-width: none; }
      .header-v2-nav::-webkit-scrollbar { display: none; }
      .header-v2-list { width: max-content; gap: 15px; }
      .header-v2-link, .header-v2-trigger { font-size: 12px; }
      .header-v2-dropdown { position: fixed; top: 69px; left: 50%; right: auto; transform: translateX(-50%) translateY(-5px); }
      .header-v2-item:last-child .header-v2-dropdown { right: auto; left: 50%; transform: translateX(-50%) translateY(-5px); }
      .header-v2-item:hover > .header-v2-dropdown,
      .header-v2-item:focus-within > .header-v2-dropdown,
      .header-v2-item.is-open > .header-v2-dropdown,
      .header-v2-item:last-child:hover > .header-v2-dropdown,
      .header-v2-item:last-child:focus-within > .header-v2-dropdown,
      .header-v2-item:last-child.is-open > .header-v2-dropdown { transform: translateX(-50%) translateY(0); }
    }
  `;
  document.head.appendChild(style);

  function dropdown(label, links) {
    return '<li class="header-v2-item">' +
      '<button class="header-v2-trigger" type="button" aria-haspopup="true" aria-expanded="false">' + label + '</button>' +
      '<div class="header-v2-dropdown"><div class="header-v2-panel">' + links.map(function (link) {
        return '<a href="' + link[1] + '">' + link[0] + '</a>';
      }).join('') + '</div></div></li>';
  }

  function renderHeader() {
    var header = document.querySelector('header.site-header, header.ginovo-header');
    if (!header) return;

    header.className = 'site-header-v2';
    header.setAttribute('aria-label', 'Site header');
    header.innerHTML =
      '<a class="header-v2-logo" href="./index.html" aria-label="GREEN TALK Home"><img src="./assets/logo.png" alt="GREEN TALK"></a>' +
      '<nav class="header-v2-nav" aria-label="Primary navigation"><ul class="header-v2-list">' +
        '<li class="header-v2-item"><a class="header-v2-link" href="./index.html">HOME</a></li>' +
        dropdown('ABOUT US', [
          ['Company Overview', './index.html#about'],
          ['Founding Values', './index.html#products'],
          ['Design Awards', './certificates.html'],
          ['Location', './contact.html'],
          ['History', './index.html#history']
        ]) +
        dropdown('SMART GOLF BALL', [
          ['Key Features', './smart-golf-ball.html#key-features'],
          ['Product Overview', './smart-golf-ball.html#product-overview']
        ]) +
        dropdown('PUTTING MAT', [
          ['Slope Putting Mat', './putting-mat.html#slope-putting-mat'],
          ['Sloping Putting Mat', './putting-mat.html#sloping-putting-mat']
        ]) +
        '<li class="header-v2-item"><a class="header-v2-link" href="./news.html">News</a></li>' +
        dropdown('CONTACT US', [
          ['Notices', './news.html'],
          ['Send an Inquiry', './contact.html'],
          ['FAQ', './contact.html#faq']
        ]) +
        dropdown('LANGUAGE', [
          ['Korean', koreanBase + page],
          ['English', './' + page]
        ]) +
      '</ul></nav>';

    header.querySelectorAll('.header-v2-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.header-v2-item');
        var open = item.classList.contains('is-open');
        header.querySelectorAll('.header-v2-item.is-open').forEach(function (node) {
          node.classList.remove('is-open');
          var button = node.querySelector('.header-v2-trigger');
          if (button) button.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) {
        header.querySelectorAll('.header-v2-item.is-open').forEach(function (item) {
          item.classList.remove('is-open');
          var button = item.querySelector('.header-v2-trigger');
          if (button) button.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderHeader);
  else renderHeader();
})();
