(() => {
  const allSlides = [...document.querySelectorAll('.slide')];
  const sessionIds = ['s1', 's2', 's3', 'lab-detection', 's7', 's9', 's12'];
  const slides = sessionIds.map((id) => document.getElementById(id)).filter(Boolean);
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

  const sessionMeta = {
    s1: ['0–5 min', 'Frame the job'],
    s2: ['5–12 min', 'Predict failure'],
    s3: ['12–20 min', 'Hover through five results'],
    'lab-detection': ['20–35 min', 'Run one code lab together'],
    s7: ['35–43 min', 'Turn output into evidence'],
    s9: ['43–48 min', 'Choose a threshold'],
    s12: ['48–50 min', 'Exit ticket']
  };  const sessionBar = document.createElement('aside');
  sessionBar.id = 'session-route';
  sessionBar.innerHTML = '<span>50-MINUTE LAB</span><strong></strong><small></small><button type="button" aria-pressed="true">HIDE TIMER</button>';
  const timerReveal = document.createElement('button');
  timerReveal.id = 'session-timer-reveal';
  timerReveal.type = 'button';
  timerReveal.textContent = 'SHOW TIMING';
  document.body.append(sessionBar, timerReveal);
  const setTimerVisible = (visible) => {
    document.body.classList.toggle('timer-hidden', !visible);
    sessionBar.querySelector('button').setAttribute('aria-pressed', String(visible));
    try { localStorage.setItem('cv-deck-timer-visible', String(visible)); } catch {}
  };
  let timerVisible = true;
  try { timerVisible = localStorage.getItem('cv-deck-timer-visible') !== 'false'; } catch {}
  setTimerVisible(timerVisible);
  sessionBar.querySelector('button').addEventListener('click', () => setTimerVisible(false));
  timerReveal.addEventListener('click', () => setTimerVisible(true));
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

  const previewData = [
    ['Classification', 'assets/classification-image-cat.png', 'assets/classification-cue-category-tile.png', 'Cat · 0.92 confidence', 'What evidence would make you trust this label?'],
    ['Detection', 'assets/detection-three-objects.png', 'assets/detection-cue-box-corner.png', '3 objects · separate boxes and scores', 'Which finding would you inspect first if confidence fell?'],
    ['Segmentation', 'assets/segmentation-boot-boundary.png', 'assets/segmentation-cue-pixels.png', 'Boot mask · exact visible boundary', 'Where would a box lose information that the mask keeps?'],
    ['Landmarks', 'assets/landmarks-pinch-hand.png', 'assets/landmarks-cue-coordinate.png', 'Fingertips and joints · coordinates', 'Which point is most likely to disappear with occlusion?'],
    ['Tracking', 'assets/tracking-ball-trail.png', 'assets/tracking-cue-id-tag.png', 'One ID · followed across frames', 'At what moment could this object receive the wrong ID?']
  ];  const questionSlide = document.querySelector('#s3');
  const questionCards = questionSlide ? [...questionSlide.querySelectorAll('.question-map > div')] : [];
  if (questionSlide && questionCards.length) {
    const preview = document.createElement('aside');
    preview.className = 'lab-result-preview';
    preview.setAttribute('aria-live', 'polite');
    questionSlide.append(preview);
    const showPreview = (index) => {
      const [title, original, resultImage, result, prompt] = previewData[index];
      preview.innerHTML = `<span>${title} · QUICK LOOK</span><div class="preview-compare"><section><b>ORIGINAL</b><img src="${original}" alt="Original input"></section><section><b>RESULT</b><img src="${resultImage}" alt="Result cue"><strong>${result}</strong></section></div><p><b>DISCUSS</b>${prompt}</p>`;
      preview.classList.add('is-visible');
    };
    const hidePreview = () => preview.classList.remove('is-visible');
    questionCards.forEach((card, index) => {
      card.tabIndex = 0;
      card.setAttribute('aria-label', `${card.textContent.trim()}. Show result preview.`);
      card.addEventListener('pointerenter', () => showPreview(index));
      card.addEventListener('pointerleave', hidePreview);
      card.addEventListener('focus', () => showPreview(index));
      card.addEventListener('blur', hidePreview);
      card.addEventListener('click', () => showPreview(index));
    });
  }
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
    const [time, action] = sessionMeta[slide.id] || ['', ''];
    sessionBar.querySelector('strong').textContent = time;
    sessionBar.querySelector('small').textContent = action;
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
