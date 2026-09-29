(() => {
  const config = window.CV_RUNTIME || {};
  const valid = config.enabled && config.githubOwner && config.repository && config.ref;

  const openWorkspace = (url, title) => {
    const overlay = document.createElement('section');
    overlay.className = 'workspace-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);
    overlay.innerHTML = '<div class="workspace-toolbar"><strong>LIVE NOTEBOOK</strong><button type="button" class="workspace-close" aria-label="Close live notebook">Close ×</button></div>';
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = title;
    iframe.allow = 'clipboard-read; clipboard-write';
    iframe.loading = 'eager';
    overlay.append(iframe);
    const close = () => overlay.remove();
    overlay.querySelector('.workspace-close').addEventListener('click', close);
    overlay.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    document.body.append(overlay);
    overlay.querySelector('.workspace-close').focus();
  };

  document.querySelectorAll('[data-notebook]').forEach((panel) => {
    const notebook = panel.dataset.notebook;
    const status = panel.querySelector('[data-runtime-status]');
    const copy = panel.querySelector('[data-runtime-copy]');
    const launch = panel.querySelector('[data-runtime-launch]');
    const colab = panel.querySelector('[data-runtime-colab]');
    if (!valid) return;

    const repositoryPath = `${config.githubOwner}/${config.repository}/${config.ref}`;
    const binderUrl = `https://mybinder.org/v2/gh/${repositoryPath}?urlpath=lab/tree/${encodeURIComponent(notebook)}`;
    const colabUrl = `https://colab.research.google.com/github/${repositoryPath}/blob/${notebook}`;
    status.textContent = 'PUBLIC BINDER WORKSPACE';
    copy.textContent = 'Open a real temporary JupyterLab workspace over this deck. The first launch may take several minutes while Binder finishes its build.';
    launch.removeAttribute('aria-disabled');
    launch.href = binderUrl;
    colab.hidden = false;
    colab.href = colabUrl;
    launch.addEventListener('click', (event) => {
      event.preventDefault();
      openWorkspace(binderUrl, `Live notebook: ${notebook}`);
    });
  });
})();
