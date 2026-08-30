/* Slope Putting Mat 제품 비교 카드의 기본 콘텐츠와 관리자 편집 연결 */
window.PUTTING_MAT_COMPARISON_DEFAULTS = [
  {
    image: './assets/img-016.png',
    title: '90cm',
    subtitle: 'Slope Putting Mat / Representative product / Slope on both sides',
    items: ['Various attack line training', 'Uphill/Downhill/Hook/Slice', 'Environment most similar to the field']
  },
  {
    image: './assets/img-014.png',
    title: '70cm',
    subtitle: 'Sloping putting mat / game type training / slope + game combination',
    items: ['Putting game method applied', 'Practice using slope sections', 'Solo & Group Play']
  },
  {
    image: './assets/img-015.png',
    title: '60cm',
    subtitle: 'Slope Putting Mat / Compact type / Slope on one side',
    items: ['Suitable for narrow spaces', 'Basic putting routine training', 'Use of personal space, office, etc.']
  }
];

window.PUTTING_MAT_COMPARISON_STORAGE_KEY = 'ginovo-putting-mat-comparison-v1';

window.getPuttingMatComparisonContent = function () {
  const defaults = window.PUTTING_MAT_COMPARISON_DEFAULTS;
  try {
    const saved = JSON.parse(localStorage.getItem(window.PUTTING_MAT_COMPARISON_STORAGE_KEY) || 'null');
    if (!Array.isArray(saved)) return defaults;
    return defaults.map((fallback, index) => ({ ...fallback, ...(saved[index] || {}) }));
  } catch (_) {
    return defaults;
  }
};

window.applyPuttingMatComparisonContent = function () {
  const cards = document.querySelectorAll('[data-comparison-card]');
  const content = window.getPuttingMatComparisonContent();
  cards.forEach((card, index) => {
    const data = content[index];
    if (!data) return;
    const image = card.querySelector('[data-card-image]');
    const title = card.querySelector('[data-card-title]');
    const subtitle = card.querySelector('[data-card-subtitle]');
    const items = card.querySelectorAll('[data-card-item]');
    if (image && data.image) image.src = data.image;
    if (title) title.textContent = data.title || '';
    if (subtitle) subtitle.textContent = data.subtitle || '';
    items.forEach((item, itemIndex) => { item.textContent = data.items?.[itemIndex] || ''; });
  });
};

document.addEventListener('DOMContentLoaded', window.applyPuttingMatComparisonContent);
