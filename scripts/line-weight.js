// Line weight, after the Primary design system.
// A browser draws a ring in whole device pixels at best, while it draws glyph strokes and type at their exact
// width. So rings are rounded to the nearest whole number of device pixels (--dp is one device pixel in CSS
// px), and a label inside an outline is set at the Aileron size and weight whose stem equals that ring.
// --text-d is the nominal height of the text controls on the page (34px on desktop).
(function () {
  var STEM = { 100: 0.038, 200: 0.050, 300: 0.062, 400: 0.086 };   // stem width in em, per weight
  function set() {
    var root = document.documentElement, dp = 1 / devicePixelRatio;
    var d = parseFloat(getComputedStyle(root).getPropertyValue('--text-d')) || 34;
    var ring = Math.max(1, Math.round(1.5 * d / 44 / dp)) * dp, nominal = 17.5 * d / 34, best = null;
    for (var w in STEM) {
      var size = ring / STEM[w];
      if (!best || Math.abs(size - nominal) < Math.abs(best[1] - nominal)) best = [w, size];
    }
    root.style.setProperty('--dp', dp + 'px');
    root.style.setProperty('--label-weight', best[0]);
    root.style.setProperty('--label-size', Math.round(best[1] * 4) / 4 + 'px');
    matchMedia('(resolution: ' + devicePixelRatio + 'dppx)').addEventListener('change', set, { once: true });
  }
  set();
})();
