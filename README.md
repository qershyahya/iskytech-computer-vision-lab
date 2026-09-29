# Isky Tech Computer Vision Lab

This public repository is the source for a real MyBinder classroom runtime. It contains five self-paced notebooks and the Binder dependency definition.

## Launch after publishing

1. Create a public GitHub repository from this folder.
2. Push the `main` branch.
3. Open `https://mybinder.org` and supply the public repository URL.
4. For each notebook, copy the generated JupyterLab launch URL.
5. Add the repository owner, repository name, and commit ref to `runtime-config.js` in the deck project.
6. Test the embedded live notebook before enabling it in the deck.

The Binder runtime is temporary: notebooks are public, session storage is not persistent, and resource limits mean heavier Ultralytics runs may work better through Colab.
