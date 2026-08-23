// Shared lightbox for every photo gallery/grid/bento/mosaic on the site.
// Any element with [data-lightbox] opens the viewer; group siblings via
// matching data-lightbox-group to get prev/next arrows within that group.
(function () {
  var group = [];
  var index = 0;
  var overlay, imgEl, captionEl, counterEl;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox-prev" type="button" aria-label="Previous photo">&lsaquo;</button>' +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" alt="">' +
        '<figcaption class="lightbox-caption"></figcaption>' +
      '</figure>' +
      '<button class="lightbox-next" type="button" aria-label="Next photo">&rsaquo;</button>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('.lightbox-img');
    captionEl = overlay.querySelector('.lightbox-caption');
    counterEl = overlay.querySelector('.lightbox-counter');

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () { step(-1); });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () { step(1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  function render() {
    var item = group[index];
    var full = item.getAttribute('data-lightbox-full') || item.getAttribute('href') || item.querySelector('img').src;
    imgEl.src = full;
    imgEl.alt = item.getAttribute('data-lightbox-alt') || item.querySelector('img').alt || '';
    var caption = item.getAttribute('data-lightbox-caption') || '';
    captionEl.textContent = caption;
    captionEl.hidden = !caption;
    counterEl.textContent = group.length > 1 ? (index + 1) + ' / ' + group.length : '';
    var multi = group.length > 1;
    overlay.querySelector('.lightbox-prev').hidden = !multi;
    overlay.querySelector('.lightbox-next').hidden = !multi;
  }

  function step(dir) {
    index = (index + dir + group.length) % group.length;
    render();
  }

  function open(trigger) {
    if (!overlay) build();
    var gid = trigger.getAttribute('data-lightbox') || '';
    var selector = gid
      ? '[data-lightbox="' + CSS.escape(gid) + '"]'
      : '[data-lightbox]:not([data-lightbox=""])';
    var scope = trigger.closest('[data-lightbox-scope]') || document;
    group = Array.prototype.slice.call(scope.querySelectorAll(gid ? selector : '[data-lightbox]'));
    if (!gid) group = [trigger];
    index = Math.max(0, group.indexOf(trigger));
    render();
    overlay.classList.add('is-open');
    document.documentElement.classList.add('lightbox-locked');
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('lightbox-locked');
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger);
  });
})();
