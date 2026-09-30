(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const decorationSlots = [
    ["4%", "4%"], ["24%", "3%"], ["48%", "3%"], ["72%", "4%"], ["94%", "6%"],
    ["3%", "28%"], ["97%", "31%"], ["3%", "60%"], ["97%", "65%"],
    ["5%", "92%"], ["28%", "94%"], ["54%", "94%"], ["78%", "93%"], ["94%", "90%"]
  ];
  const decorationLibrary = [
    "assets/decor-lens-pixels.png", "assets/decor-magnifier-pixels.png", "assets/decor-image-tiles.png",
    "assets/decor-pixel-squares.png", "assets/decor-camera-field.png", "assets/decor-light-ray.png",
    "assets/decor-crop-corners.png", "assets/decor-confidence-gauge.png", "assets/decor-target-mug.png",
    "assets/decor-dot-trail.png", "assets/decor-corner-grid.png", "assets/decor-overlap-circles.png",
    "assets/decor-motion-arrows.png", "assets/decor-landmark-constellation.png", "assets/decor-mask-blob.png",
    "assets/decor-binary-tiles.png", "assets/decor-camera-body.png", "assets/decor-error-spark.png"
  ];
  const seedFor = (value) => [...value].reduce((seed, character) => ((seed * 31) + character.charCodeAt(0)) >>> 0, 17);
  const decorateSlides = () => {
    slides.forEach((slide) => {
      const seed = seedFor(slide.id);
      const used = new Set();
      slide.querySelectorAll('.decorations img').forEach((image, index) => {
        image.src = decorationLibrary[(seed + (index * 7)) % decorationLibrary.length];
        let slot = (seed + (index * 5) + (index * index)) % decorationSlots.length;
        while (used.has(slot)) slot = (slot + 1) % decorationSlots.length;
        used.add(slot);
        const [left, top] = decorationSlots[slot];
        image.style.setProperty('--decor-left', left);
        image.style.setProperty('--decor-top', top);
        image.style.setProperty('--decor-rotate', `${((seed >> (index % 8)) + index * 19) % 54 - 27}deg`);
        image.style.setProperty('--decor-scale', `${0.64 + (((seed + index * 13) % 34) / 100)}`);
      });
    });
  };
  decorateSlides();
  const previous = document.querySelector('#previous-slide');
  const next = document.querySelector('#next-slide');
  if (!slides.length || !previous || !next) return;

  const indexForHash = () => slides.findIndex((slide) => `#${slide.id}` === location.hash);
  const show = (index) => {
    const safeIndex = (index + slides.length) % slides.length;
    const slide = slides[safeIndex];
    slides.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === safeIndex));
    previous.disabled = safeIndex === 0;
    next.disabled = safeIndex === slides.length - 1;
    window.dispatchEvent(new CustomEvent('deck:slidechange', { detail: { slide, index: safeIndex } }));
  };
  const current = () => Math.max(0, indexForHash());
  const go = (delta) => {
    const target = current() + delta;
    if (target < 0 || target >= slides.length) return;
    history.pushState(null, '', `#${slides[target].id}`);
    show(target);
  };

  show(current());
  previous.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  window.addEventListener('hashchange', () => show(current()));
  window.addEventListener('popstate', () => show(current()));
  window.addEventListener('keydown', (event) => {
    if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
    if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); go(1); }
  });
})();
