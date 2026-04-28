"""Legacy module intentionally disabled.

Use app.main:app as the only backend entrypoint.
"""

raise RuntimeError(
    "Legacy backend/app.py is disabled. Start the backend with: uvicorn app.main:app --reload"
)