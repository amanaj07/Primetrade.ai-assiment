# Backend (Express + Prisma)

This folder contains a lightweight Express backend that provides authentication (JWT), profile endpoints, and a sample `notes` CRUD API.

Quick setup (local dev):

1. Copy the example env: `cp .env.example .env` (Windows: `copy .env.example .env`).
2. Install dependencies: `npm install` inside `authentication/backend`.
3. Initialize Prisma and DB:
   - `npx prisma migrate dev --name init` (creates `dev.db` SQLite file)
   - `npx prisma generate`
4. Start server: `npm run dev` (requires `nodemon`) or `npm start`.

Default server: `http://localhost:4000`.

Important endpoints:
- `POST /api/auth/register` { email, password, name }
- `POST /api/auth/login` { email, password }
- `GET /api/profile` Authorization: Bearer <token>
- `GET /api/notes?q=` list notes (search q)
- `POST /api/notes` { title, content }
- `PUT /api/notes/:id` { title, content }
- `DELETE /api/notes/:id`

Security notes:
- Passwords hashed with `bcryptjs`.
- JWT signed with `JWT_SECRET` from `.env`.

Scaling notes and production readiness are covered in the project root README.
