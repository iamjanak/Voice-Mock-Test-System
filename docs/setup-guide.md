# Setup guide

## Frontend

```powershell
Set-Location frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` to the backend API URL.

## Backend

```powershell
Set-Location backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Set local Django configuration through environment variables before deployment.
