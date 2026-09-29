# Permit this public lesson deck to display the ephemeral Binder JupyterLab session.
c.ServerApp.tornado_settings = {
    "headers": {
        "Content-Security-Policy": "frame-ancestors 'self' https://qershyahya.github.io",
    }
}
