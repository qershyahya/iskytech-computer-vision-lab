(() => {
  const config = window.CV_RUNTIME || {};
  const valid = config.enabled && config.githubOwner && config.repository && config.ref;

  document.querySelectorAll('[data-notebook]').forEach((panel) => {
    const notebook = panel.dataset.notebook;
    const status = panel.querySelector('[data-runtime-status]');
    const copy = panel.querySelector('[data-runtime-copy]');
    const launch = panel.querySelector('[data-runtime-launch]');
    const colab = panel.querySelector('[data-runtime-colab]');
    const frame = panel.querySelector('[data-runtime-frame]');

    if (!valid) return;

    const repositoryPath = `${config.githubOwner}/${config.repository}/${config.ref}`;
    const binderUrl = `https://mybinder.org/v2/gh/${repositoryPath}?urlpath=lab/tree/${encodeURIComponent(notebook)}`;
    const colabUrl = `https://colab.research.google.com/github/${repositoryPath}/blob/${notebook}`;
    status.textContent = 'READY TO LAUNCH';
    copy.textContent = 'Start a real temporary JupyterLab workspace here. First launch may take several minutes while Binder builds the environment.';
    launch.removeAttribute('aria-disabled');
    launch.href = binderUrl;
    colab.hidden = false;
    colab.href = colabUrl;

    launch.addEventListener('click', (event) => {
      event.preventDefault();
      status.textContent = 'STARTING BINDER…';
      frame.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.src = binderUrl;
      iframe.title = `Live notebook: ${notebook}`;
      iframe.allow = 'clipboard-read; clipboard-write';
      iframe.loading = 'eager';
      frame.append(iframe);
    });
  });
})();
