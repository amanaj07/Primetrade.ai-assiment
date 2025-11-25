# NextAuthApp — Full Project

This repository contains a Next.js frontend and an Express backend (Prisma + SQLite for dev) that together implement a small authenticated dashboard application.

Folders
- `app/` — Next.js app (pages, components)
- `backend/` — Express API with Prisma (SQLite)

Quick start (Windows PowerShell)

1. Backend (dev)
```powershell
cd authentication\backend
copy .env.example .env
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Server will run at `http://localhost:4000`.

2. Frontend (dev)
```powershell
cd authentication
npm install
npm run dev
```

If port 3000 is in use, Next will fallback to another port (the terminal logs show the actual port).

Testing the flows
- Use the included `postman_collection.json` (Import into Postman) or use `curl`/HTTPie to exercise the endpoints.

Security notes
- Passwords are hashed with `bcryptjs`.
- JWTs signed with `JWT_SECRET` defined in `.env`.

Production notes & scaling
- Replace SQLite with Postgres/MySQL by changing `prisma/schema.prisma` datasource and setting `DATABASE_URL` to a managed DB.
- Containerize backend with Docker, use a process manager, and run behind a load balancer.
- Use environment variables & a secret manager for `JWT_SECRET`.
- Consider using short-lived access tokens + refresh tokens for improved security.

What's implemented
- Register & login (JWT)
- Profile fetch/update
- Notes entity CRUD + search
- Client-side validation and responsive UI using Bootstrap CDN

Next steps (recommended)
- Add server-side protection (store tokens in httpOnly cookies) for SSR protection.
- Harden CORS and rate limits in production.
- Add CI workflow, unit tests, and end-to-end tests.
