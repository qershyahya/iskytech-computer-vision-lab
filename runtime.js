(() => {
  const config = window.CV_RUNTIME || {};
  const valid = config.enabled && config.binderHost && config.githubOwner && config.repository && config.ref;
  if (!valid) return;

  const repositoryPath = `${config.githubOwner}/${config.repository}/${config.ref}`;
  const firstPanel = document.querySelector('[data-notebook]');
  if (!firstPanel) return;
  const firstNotebook = firstPanel.dataset.notebook;
  const binderUrl = `${config.binderHost}/v2/gh/${repositoryPath}?urlpath=lab/tree/${encodeURIComponent(firstNotebook)}`;
  const buildUrl = `${config.binderHost}/build/gh/${repositoryPath}`;
  let workspaceOpened = false;

  // Start the cached image/server request from slide 1. Binder's JupyterLab sets frame-ancestors 'self', so it cannot be embedded in this deck.
  fetch(buildUrl, { mode: 'no-cors', cache: 'no-store' }).catch(() => {});
  document.body.classList.add('binder-external');
  document.querySelectorAll('[data-notebook]').forEach((panel) => {
    panel.querySelector('[data-runtime-status]').textContent = 'SHARED BINDER WORKSPACE';
    panel.querySelector('[data-runtime-copy]').textContent = 'The live workspace opens automatically when you enter the first lab.';
  });

  window.addEventListener('deck:slidechange', (event) => {
    if (workspaceOpened || !event.detail.slide.querySelector('[data-notebook]')) return;
    workspaceOpened = true;
    const workspace = window.open(binderUrl, 'computer-vision-binder');
    if (workspace) return;
    workspaceOpened = false;
    event.detail.slide.querySelector('[data-runtime-status]').textContent = 'ALLOW THE BINDER TAB';
    event.detail.slide.querySelector('[data-runtime-copy]').textContent = 'Your browser blocked the automatic tab. Use the notebook download or Colab option on this slide.';
  });
})();
