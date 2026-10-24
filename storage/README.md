# Storage

Use `backend/media/` only for local development uploads. Production audio and
other user uploads should use a configured object-storage service. Keep
credentials in environment variables and out of source control.
