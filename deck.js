(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const decorationSlots = [
    ["53%", "5%"], ["74%", "6%"], ["95%", "9%"],
    ["3%", "25%"], ["98%", "27%"], ["-7%", "55%"], ["98%", "58%"],
    ["6%", "86%"], ["28%", "89%"], ["52%", "91%"], ["76%", "89%"], ["96%", "86%"],
    ["47%", "76%"], ["67%", "73%"], ["60%", "19%"]
  ]; const decorationLibrary = [
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
        image.style.setProperty('--decor-scale', `${0.70 + (((seed + index * 13) % 39) / 100)}`);
      });
    });
  };
  decorateSlides();

  // Put the related visual evidence inside the card that explains it.
  const attachCardVisuals = () => {
    slides.forEach((slide) => {
      const cueImages = [...slide.querySelectorAll('figure .asset-cues img')];
      const cards = [...slide.querySelectorAll('article .facts p, article .deep p, article .grid p, article ol li, .question-map > div, .tasknotes p')];
      if (!cueImages.length || !cards.length) return;
      cards.forEach((card, index) => {
        const cue = cueImages[index % cueImages.length];
        const visual = document.createElement('img');
        visual.className = 'card-visual';
        visual.src = cue.currentSrc || cue.src;
        visual.alt = '';
        visual.setAttribute('aria-hidden', 'true');
        card.append(visual);
      });
      cueImages[0].closest('.asset-cues')?.remove();
    });
  };
  attachCardVisuals();
  document.querySelectorAll('.prediction-pair').forEach((pair) => {
    const card = pair.querySelector('p');
    const visual = pair.querySelector('img');
    if (card && visual) card.append(visual);
    pair.querySelector('span')?.remove();
  });

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
