# NextAuthApp - Full Stack JWT Authentication

A complete, production-ready full-stack authentication system built with Next.js, Express.js, SQLite, and Prisma ORM.

## 📋 System Requirements (پہلے یہ ہے)

**Installation se pehle tumhare paas ye hone chahiye:**

- **Node.js** v16 ya upar (https://nodejs.org)
- **npm** ya **yarn** package manager
- **Git** (code clone karne ke liye)

**Check karo:**
```bash
node --version
npm --version
git --version
```

---

## 🚀 Quick Setup (3 Simple Steps)

### Step 1: Clone Repository
```bash
git clone https://github.com/amanaj07/Primetrade.ai-assiment.git
cd Primetrade.ai-assiment
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variable
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
```

**Windows PowerShell ke liye:**
```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:4000
"@ | Out-File -Encoding UTF8 .env.local
```

---

## 🔧 Backend Setup (Database + Server)

### Step 1: Go to Backend Folder
```bash
cd backend
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

### Step 3: Setup Database (Important!)
```bash
# Create database aur tables
npx prisma migrate dev --name init
```

Ye command:
- SQLite database banayega (`dev.db`)
- Database tables banayega
- Prisma client generate karega

### Step 4: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
Backend listening on http://localhost:4000
```

✅ Backend ready hai!

---

## ▶️ Start Frontend (New Terminal)

**Naya terminal kholo** (backend wale ko chhod ke):

```bash
# Root folder mein jao
cd ..

# Frontend start karo
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.x.x
  - Local: http://localhost:3000
```

---

## 🎯 Test Karo - Kya Kaam Kare?

1. **Browser mein jao:** http://localhost:3000
2. **Register page par jao:** http://localhost:3000/register
3. **Naya account banao** (koi bhi email/password)
4. **Login karo** dashboard mein
5. **Notes create karo aur manage karo**

✅ Sab kaam ho raha hai!

---

## 🚨 Common Errors aur Solutions

### ❌ Error: "Network unreachable" or "API responded 404"

**Reason:** Backend nahi chal raha

**Fix:**
```bash
cd backend
npm run dev
```

✅ Backend start karo aur 10 seconds wait karo

---

### ❌ Error: "Cannot find module '@prisma/client'"

**Reason:** Backend dependencies install nahi hue

**Fix:**
```bash
cd backend
npm install
```

---

### ❌ Error: "SQLITE_CANTOPEN"

**Reason:** Database migrations nahi chale

**Fix:**
```bash
cd backend
npx prisma migrate dev --name init
```

---

### ❌ Error: "Port 4000 already in use"

**Reason:** Koi aur application port 4000 use kar raha hai

**Fix - Option 1:** Pehle wali process band karo
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :4000
kill -9 <PID>
```

**Fix - Option 2:** Backend port change karo

Edit `backend/.env`:
```
PORT=5000
```

Tab frontend mein update karo `backend/.env` se ya hardcode:
```javascript
// backend/index.js line 11
const PORT = process.env.PORT || 5000;
```

---

## 📁 Project Structure

```
Primetrade.ai-assiment/
├── app/                          # Next.js Frontend
│   ├── login/                    # Login page
│   ├── register/                 # Register page
│   ├── dashboard/                # Protected dashboard
│   ├── components/               # React components
│   └── api/                      # Routes
├── backend/                      # Express.js Backend
│   ├── index.js                  # Main server
│   ├── package.json              # Dependencies
│   ├── .env                      # Backend config
│   └── prisma/
│       ├── schema.prisma         # Database schema
│       └── dev.db                # SQLite database (auto-created)
├── .env.local                    # Frontend config (tumhe create karna hai)
├── package.json                  # Frontend dependencies
└── README.md                     # Ye file
```

---

## 🔑 Environment Files Explained

### `.env.local` (Frontend - Tumhe Create Karna Hai)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
**Kya hai:** Frontend ko backend ki location batata hai

### `backend/.env` (Backend - Pehle se Hai)
```
PORT=4000
JWT_SECRET=CHANGE_THIS_SECRET
DATABASE_URL="file:./dev.db"
```
**Kya hai:** Backend ka configuration

---

## ✨ Features

✅ User Registration with Email Validation  
✅ JWT Authentication (Secure Token)  
✅ Password Hashing with bcryptjs  
✅ User Profile Management  
✅ CRUD Operations for Notes  
✅ Search Functionality  
✅ SQLite Database  
✅ Prisma ORM  
✅ CORS Enabled  
✅ Error Handling  

---

## 📚 Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14 |
| Backend | Express.js |
| Database | SQLite |
| ORM | Prisma |
| Auth | JWT + bcryptjs |
| Styling | Tailwind CSS |

---

## 🔐 API Endpoints

```
POST   /api/auth/register       # New user create karo
POST   /api/auth/login          # Login karo
GET    /api/profile             # Profile dekho (token chahiye)
PUT    /api/profile             # Profile update karo (token chahiye)
GET    /api/notes               # Notes dekho (token chahiye)
POST   /api/notes               # Note banao (token chahiye)
PUT    /api/notes/:id           # Note update karo (token chahiye)
DELETE /api/notes/:id           # Note delete karo (token chahiye)
```

---

## 🎓 Learning Value

Ye project sikhata hai:
- Full-stack web development
- Next.js fundamentals
- Express.js server creation
- JWT authentication
- Database design with Prisma
- Frontend-Backend communication
- CORS aur API security basics
- Environment configuration

---

## 🆘 Problem Still There?

1. **Terminal mein error message padho carefully**
2. **Check karo ki sab install hai:**
   ```bash
   node --version
   npm --version
   npx --version
   ```
3. **Backend aur Frontend dono running hain?**
4. **Port 3000 aur 4000 free hain?**
5. **`.env.local` file banaya?**

---

## 📞 Troubleshooting Checklist

- [ ] Node.js v16+ install hai
- [ ] `npm install` frontend mein chala diya
- [ ] `cd backend && npm install` chala diya
- [ ] `npx prisma migrate dev --name init` chala diya
- [ ] `.env.local` file banaya with `NEXT_PUBLIC_API_URL=http://localhost:4000`
- [ ] Backend server chal raha hai (Terminal mein "Backend listening on..." dikh raha hai)
- [ ] Frontend server chal raha hai (Terminal mein "http://localhost:3000" dikh raha hai)
- [ ] Browser mein http://localhost:3000 khol sakte ho

Agar sab theek hai tab:
```
✅ Register karo
✅ Login karo
✅ Notes create karo
```

---

## 🚀 Ready to Deploy?

- **Frontend:** Vercel pe (5 min)
- **Backend:** Railway/Render/Fly.io pe
- **Database:** PostgreSQL (production ke liye)

---

## 📝 License

MIT - Free to use for learning and projects

---

**Happy Coding! 🎉**

Agar koi problem ho to terminal ka exact error message de aur main fix kar dunga!
