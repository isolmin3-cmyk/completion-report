/*
 * Smart Golf Ball 페이지 문구 관리 지점입니다.
 * 추후 관리자 페이지에서 아래 값을 저장하도록 연결하면 이미지 수정 없이 반영됩니다.
 */
window.SMARTBALL_CONTENT_STORAGE_KEY = 'ginovo-smartball-content';
window.SMARTBALL_CONTENT_DEFAULTS = {
  anatomyTitle: 'Smart Golf Ball that embodies the feel and performance of a regular golf ball',
  anatomyLayerTitle: 'Layer',
  anatomyLayerDescription: 'Ionomer shock absorption structure ensures durability',
  anatomyElastomerTitle: 'Elastomer',
  anatomyElastomerDescription: 'Securing repulsion force and core eccentricity.\nApplying perfect control technology.',
  anatomyShellTitle: 'Protective Shell',
  anatomyShellDescription: '',
  anatomyCoverTitle: 'Outer Cover',
  anatomyCoverDescription: 'Dimples that minimize air resistance.\nMaintains a hole diameter of 42.67mm.',
  specTitle: 'Status of 100% achievement of physical specification goal',
  specWeight: 'Weight: 45.93g',
  specSize: 'Outer diameter size: 42.67mm',
  specRebound: 'Repulsion force: 72.1',
  specEccentricity: 'Eccentricity: 0.095%',
  systemTitle: 'GINOVO putting system',
  systemSubtitle: 'Perfect configuration for smart golf so you can focus on putting practice',
  systemDescription: 'Smart Golf Ball, wireless charger, putting mat, reflector, mobile holder set',
  chargerTitle: 'Smart wireless charging system',
  chargerSubtitle: 'Portable wireless charger with no restrictions on location',
  chargerNote1: 'Heat control within the capsule through on-chip thermal management',
  chargerNote2: 'Tri-color LED indicator for status visibility',
  distanceTitle: 'Repetitive and quantitative putting practice by target distance/green speed',
  distancePoint1: 'Perfect putting practice support without distance restrictions',
  distancePoint2: 'Quantitative stroke support through repeated practice to achieve target distance'
};
try {
  window.SMARTBALL_CONTENT = Object.assign({}, window.SMARTBALL_CONTENT_DEFAULTS, JSON.parse(localStorage.getItem(window.SMARTBALL_CONTENT_STORAGE_KEY) || '{}'));
} catch (_) {
  window.SMARTBALL_CONTENT = Object.assign({}, window.SMARTBALL_CONTENT_DEFAULTS);
}
