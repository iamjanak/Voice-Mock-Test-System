# System architecture

```text
React (Vite) frontend
        |
        | HTTP API
        v
Django REST API ---- n8n workflows
        |
        +---- Database
        +---- Local media / production object storage
```
