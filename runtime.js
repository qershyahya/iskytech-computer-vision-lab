(() => {
  const config = window.CV_RUNTIME || {};
  const isHostedDeck = location.protocol === 'https:' && location.hostname === 'qershyahya.github.io';
  const valid = isHostedDeck && config.enabled && config.binderHost && config.githubOwner && config.repository && config.ref;
  if (!valid) {
    document.querySelectorAll('[data-notebook]').forEach((panel) => {
      panel.querySelector('[data-runtime-status]').textContent = 'LIVE WORKSPACE AVAILABLE ON THE HOSTED DECK';
      panel.querySelector('[data-runtime-copy]').textContent = 'Open the published lesson deck to start the real Binder workspace in this slide.';
    });
    return;
  }

  const firstPanel = document.querySelector('[data-notebook]');
  if (!firstPanel) return;
  const repositoryPath = `${config.githubOwner}/${config.repository}/${config.ref}`;
  const binderUrlFor = (notebook) => `${config.binderHost}/v2/gh/${repositoryPath}?urlpath=lab/tree/${encodeURIComponent(notebook)}`;
  const initialPanel = document.querySelector('.slide.active [data-notebook]') || firstPanel;
  let activeNotebook = initialPanel.dataset.notebook;
  const iframe = document.createElement('iframe');
  iframe.className = 'live-binder-frame';
  iframe.src = binderUrlFor(activeNotebook);
  iframe.title = 'Live computer-vision notebook workspace';
  iframe.allow = 'clipboard-read; clipboard-write';
  iframe.loading = 'eager';

  const parking = document.createElement('div');
  parking.id = 'binder-parking';
  parking.append(iframe);
  document.body.append(parking);
  document.body.classList.add('binder-enabled');

  const setRuntimeText = (status, copy) => {
    document.querySelectorAll('[data-notebook]').forEach((panel) => {
      panel.querySelector('[data-runtime-status]').textContent = status;
      panel.querySelector('[data-runtime-copy]').textContent = copy;
    });
  };
  setRuntimeText('LIVE WORKSPACE STARTING', 'The real Binder workspace is starting once in the background and will appear here automatically.');
  iframe.addEventListener('load', () => {
    setRuntimeText('LIVE WORKSPACE', 'The shared Binder workspace is ready in this slide.');
  }, { once: true });

  const showWorkspace = (slide) => {
    const panel = slide?.querySelector('[data-notebook]');
    if (panel) {
      const requestedNotebook = panel.dataset.notebook;
      if (requestedNotebook !== activeNotebook) {
        activeNotebook = requestedNotebook;
        iframe.src = binderUrlFor(activeNotebook);
        setRuntimeText('LIVE WORKSPACE SWITCHING', 'Opening this lab notebook in the shared Binder workspace.');
      }
      panel.querySelector('[data-runtime-frame]').append(iframe);
      return;
    }
    parking.append(iframe);
  };
  window.addEventListener('deck:slidechange', (event) => showWorkspace(event.detail.slide));
})();
