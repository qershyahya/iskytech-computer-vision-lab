(() => {
  const config = window.CV_RUNTIME || {};
  const valid = config.enabled && config.githubOwner && config.repository && config.ref;
  if (!valid) return;

  const firstPanel = document.querySelector('[data-notebook]');
  if (!firstPanel) return;
  const repositoryPath = `${config.githubOwner}/${config.repository}/${config.ref}`;
  const firstNotebook = firstPanel.dataset.notebook;
  const binderUrl = `https://mybinder.org/v2/gh/${repositoryPath}?urlpath=lab/tree/${encodeURIComponent(firstNotebook)}`;
  const iframe = document.createElement('iframe');
  iframe.className = 'live-binder-frame';
  iframe.src = binderUrl;
  iframe.title = 'Live computer-vision notebook workspace';
  iframe.allow = 'clipboard-read; clipboard-write';
  iframe.loading = 'eager';

  const parking = document.createElement('div');
  parking.id = 'binder-parking';
  parking.append(iframe);
  document.body.append(parking);
  document.body.classList.add('binder-enabled');

  const prepare = (panel) => {
    panel.querySelector('[data-runtime-status]').textContent = 'LIVE WORKSPACE PREPARING';
    panel.querySelector('[data-runtime-copy]').textContent = 'This shared Binder session starts in the background from slide 1 and appears here automatically.';
  };
  document.querySelectorAll('[data-notebook]').forEach(prepare);

  const showWorkspace = (slide) => {
    const panel = slide?.querySelector('[data-notebook]');
    if (panel) {
      panel.querySelector('[data-runtime-frame]').append(iframe);
      panel.querySelector('[data-runtime-status]').textContent = 'LIVE WORKSPACE';
      return;
    }
    parking.append(iframe);
  };

  window.addEventListener('deck:slidechange', (event) => showWorkspace(event.detail.slide));
})();
