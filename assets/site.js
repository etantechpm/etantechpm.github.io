/* Elise Tan — Portfolio · shared behavior
   - Scroll-based reveals (rAF + scroll/resize), robust everywhere
   - Mobile nav toggle
*/
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function showAll() { els.forEach(function (el) { el.classList.add('in'); }); }

  if (reduce || els.length === 0) {
    showAll();
  } else {
    var pending = els.slice();
    var ticking = false;

    function check() {
      ticking = false;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var trigger = vh * 0.92;
      var still = [];
      for (var i = 0; i < pending.length; i++) {
        var el = pending[i];
        var top = el.getBoundingClientRect().top;
        if (top < trigger) {
          var d = el.getAttribute('data-delay');
          if (d) el.style.transitionDelay = d + 'ms';
          el.classList.add('in');
        } else {
          still.push(el);
        }
      }
      pending = still;
      if (pending.length === 0) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // initial passes (covers late layout / font load)
    requestAnimationFrame(check);
    setTimeout(check, 120);
    setTimeout(check, 600);
    window.addEventListener('load', check);
    // safety net: never leave content hidden
    setTimeout(showAll, 2500);
  }

  // ---- Mobile nav ----
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var open = nav.classList.contains('open');
      toggle.textContent = open ? 'Close' : 'Menu';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = 'Menu';
      });
    });
  }
})();