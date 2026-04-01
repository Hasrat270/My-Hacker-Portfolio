# 🖥️ Hasrat's Hacker Portfolio — Full-Stack MERN CMS

A production-grade, personal hacker portfolio with a fully integrated admin dashboard. Built with the MERN stack, styled with a pure terminal/hacker aesthetic, and hardened with enterprise-level security.

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Project Structure](#-project-structure)
3. [Features Overview](#-features-overview)
4. [Security Hardening](#-security-hardening)
5. [Environment Setup](#-environment-setup)
6. [Running the Project](#-running-the-project)
7. [Dashboard Guide](#-dashboard-guide)
8. [Frontend Architecture](#-frontend-architecture)
9. [Backend Architecture](#-backend-architecture)
10. [API Reference](#-api-reference)
11. [Deployment Notes](#-deployment-notes)
12. [Known Limitations](#-known-limitations)

---

## 💻 Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | SPA routing (no page reloads) |
| TanStack Query v5 | Server state management & caching |
| Tailwind CSS v4 | Utility-first styling |
| `@uiw/react-md-editor` | Markdown editor in dashboard |
| `react-markdown` + `dompurify` | Sanitized markdown rendering on public pages |
| `react-pdf` | PDF resume viewer |
| `react-helmet-async` | SEO meta tags per page |
| Axios | HTTP client (centralized in `src/api/apiClient.js`) |

### Backend
| Package | Purpose |
|---|---|
| Node.js + Express | Server & routing |
| MongoDB + Mongoose | Database & ORM |
| JWT (`jsonwebtoken`) | Stateless authentication tokens |
| `cookie-parser` | HttpOnly cookie handling |
| `bcryptjs` | Password hashing |
| `cloudinary` + `multer` | Image & PDF upload/storage |
| `nodemailer` | Forgot password email delivery |
| `express-rate-limit` | Brute-force protection |
| `helmet` | HTTP security headers |
| `morgan` | Request logging |

---

## 📁 Project Structure

```
My-Hacker-Portfolio/
├── client/                         # React Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js        # Centralized Axios instance
│   │   ├── components/
│   │   │   ├── common/             # Reusable UI (Button, Card, Badge, TerminalText)
│   │   │   └── layout/
│   │   │       ├── Navbar/         # Navbar, NavLinks, NavActions, MobileDrawer, Hamburger
│   │   │       ├── Footer.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       └── SEO.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Auth state (pure React, no Redux)
│   │   │   └── useAuth.js          # Convenience hook
│   │   ├── features/
│   │   │   └── portfolio/          # Public sections (Hero, About, Skills, etc.)
│   │   ├── hooks/                  # Custom hooks (useTypewriter, useScrollReveal, useProfile)
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx      # Navbar + Footer wrapper
│   │   │   └── DashboardLayout.jsx # Sidebar + Outlet for dashboard
│   │   ├── pages/
│   │   │   ├── Auth/               # Login, Register, ForgotPassword, ResetPassword
│   │   │   ├── Dashboard/
│   │   │   │   └── components/     # DashProfile, DashSkills, DashMachines, etc.
│   │   │   ├── Error/              # ErrorPage (404, 403, 500, 501)
│   │   │   ├── Home.jsx
│   │   │   ├── MachineDetail.jsx
│   │   │   ├── WriteupDetail.jsx
│   │   │   └── Resume.jsx
│   │   ├── App.jsx                 # Route definitions
│   │   ├── main.jsx                # App entrypoint
│   │   └── index.css               # Global styles & Tailwind
│
└── server/                         # Node.js Backend
    ├── src/
    │   ├── config/
    │   │   ├── db.js               # MongoDB connection
    │   │   └── cloudinary.js       # Cloudinary SDK config
    │   ├── controllers/
    │   │   ├── auth.controller.js  # Register, Login, Logout, ForgotPassword, ResetPassword
    │   │   └── profile.controller.js
    │   ├── middleware/
    │   │   ├── protect.js          # JWT verification
    │   │   ├── ipWhitelist.js      # IP-based access control
    │   │   ├── validate.js         # Request validation runner
    │   │   ├── validators.js       # Validation rule sets
    │   │   └── error.js            # Global error handler
    │   ├── models/                 # Mongoose schemas
    │   │   ├── user.model.js
    │   │   ├── profile.model.js
    │   │   ├── machine.model.js
    │   │   ├── writeup.model.js
    │   │   ├── skill.model.js
    │   │   ├── certification.model.js
    │   │   ├── lab.model.js
    │   │   ├── social.model.js
    │   │   └── contact.model.js
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   ├── portfolio.routes.js  # Skills, Machines, Writeups, Certs, Socials, Contact, Labs
    │   │   └── profile.routes.js    # Profile get/update, image & resume upload
    │   ├── utils/
    │   │   ├── crudController.js   # Generic CRUD factory
    │   │   ├── crudRoutes.js       # Generic route factory (GET public, mutate protected)
    │   │   ├── asyncHandler.js     # try/catch wrapper
    │   │   ├── jwt.js              # Token generation & cookie setting
    │   │   ├── upload.js           # Multer + Cloudinary stream handler
    │   │   └── sendEmail.js        # Nodemailer email util
    │   ├── app.js                  # Express app setup & middleware stack
    │   └── server.js               # Server entrypoint
    └── .env                        # Environment variables (see below)
```

---

## ✨ Features Overview

### Public Portfolio
- **Hero Section**: Typewriter role animation, terminal prompt aesthetic
- **About**: Profile picture, bio, dynamic stats (HTB machines, CVEs, CTF wins, etc.)
- **Skills**: Hexagonal grid organized by category with Beginner/Intermediate/Expert color coding
- **Machines**: Card grid of solved HTB/THM/PortSwigger machines with detail pages
- **Writeups**: Card grid with Markdown-rendered writeup detail pages
- **Certifications**: Badge + issuer + expiry display
- **Labs**: Custom lab/challenge tracking
- **Contact**: Dynamic contact info + social links from database
- **Resume**: Inline PDF viewer via `react-pdf` + Blob-based download

### Admin Dashboard
- 8 management panels: Profile, Skills, Machines, Writeups, Certs, Socials, Contact, Labs
- Markdown editor (`@uiw/react-md-editor`) for Machine details and biography
- Profile picture + Resume upload via Cloudinary
- Collapsible sidebar with active route highlighting
- Mobile drawer with overlay (desktop pushes content)

---

## 🛡️ Security Hardening

### 1. Single-User Registration Lock
```js
// auth.controller.js
const userCount = await User.countDocuments();
if (userCount > 0) return res.status(403).json({ message: "Registration Locked" });
```
Once your account is created, no second user can register.

### 2. IP Whitelisting Middleware
```
// server/.env
ALLOWED_IPS=127.0.0.1,::1,YOUR_PUBLIC_IP
```
Applied to `/api/auth` and `/api/profile` routes. Run `curl ifconfig.me` to get your public IP.
> **Leave empty to disable.** Public portfolio data (`/api/skills`, `/api/machines`, etc.) is never restricted.

### 3. Session Hardening
- **JWT Expiry**: 2 hours (`JWT_EXPIRES_IN=2h`)
- **Cookie Flags**: `HttpOnly`, `SameSite=Strict`, `Secure` (in production)
- **Hybrid Storage**: Cookie + `localStorage` token prevents ghost sessions on refresh
- **JWT Secret**: 128-char cryptographic hex key

### 4. HTTP Security Headers
`helmet` middleware is applied globally — sets `X-Frame-Options`, `X-XSS-Protection`, `Content-Security-Policy`, etc.

### 5. Rate Limiting
- Global: 100 req / 15 min (production), 1000 (dev)
- Auth routes: 10 req / 15 min (production), 100 (dev)

### 6. Password Security
- Passwords hashed with `bcryptjs` before storage
- Reset tokens are SHA-256 hashed before saving (raw token sent via email only)

---

## ⚙️ Environment Setup

Create `/server/.env`:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/hacker-portfolio

# JWT
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_EXPIRES_IN=2h

# Frontend URL (for CORS & password reset links)
CLIENT_URL=http://localhost:5173

# Email (Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Security — IP Whitelist (comma-separated, leave empty to disable)
ALLOWED_IPS=127.0.0.1,::1,YOUR_PUBLIC_IP
```

---

## 🚀 Running the Project

### Prerequisites
- Node.js LTS
- MongoDB running locally or MongoDB Atlas URI

### Install & Run

```bash
# Backend
cd server
npm install
npm run dev       # runs on http://localhost:5000

# Frontend
cd client
npm install
npm run dev       # runs on http://localhost:5173
```

### First-Time Setup
1. Start both servers
2. Go to `http://localhost:5173/register` and create your **one and only** admin account
3. Log in at `/login`
4. Fill out your profile, upload a profile picture and resume in the dashboard
5. Add your skills, machines, writeups, and certifications

> After step 2, registration is permanently locked — no one else can create an account.

---

## 📊 Dashboard Guide

| Panel | Route | Description |
|---|---|---|
| **Profile** | `/dashboard/profile` | Name, bio (Markdown), stats, profile picture, resume upload |
| **Skills** | `/dashboard/skills` | Add/edit/delete skills with category, level, icon URL |
| **Machines** | `/dashboard/machines` | HTB/THM machines with OS, difficulty, tags, Markdown details, Writeup URL |
| **Writeups** | `/dashboard/writeups` | Writeups with platform, difficulty, Markdown content, External URL |
| **Certs** | `/dashboard/certs` | Certifications with issuer, dates, credential URL, badge image |
| **Socials** | `/dashboard/socials` | Social links (GitHub, LinkedIn, HTB, etc.) |
| **Contact** | `/dashboard/contact` | Email, phone, WhatsApp |
| **Labs** | `/dashboard/labs` | Custom lab/challenge entries |

### Dashboard Hints
#### Machines — Writeup URL field
```
> [HINT]: Use http:// for external site OR /writeups/ID for internal
```
- **External**: Opens in new tab (e.g., Medium article)
- **Internal**: SPA navigation to your own writeup page (e.g., `/writeups/67ebe...`)

#### Writeups — External URL field
```
> [HINT]: This becomes '$ ./view-original.sh' button — use http:// for external link
```
- Appears as "view original" button if filled
- Leave empty if writeup only lives in your portfolio

---

## 🏗️ Frontend Architecture

### Routing Strategy
```
<Routes>
  <Route element={<MainLayout />}>     ← Navbar + Footer
    <Route path="/" ...>
    <Route path="/about" ...>
    ...
  </Route>

  <Route path="/login" ...>            ← Auth pages (no layout)
  <Route path="/register" ...>

  <Route path="/dashboard" element={<ProtectedRoute>}> ← Sidebar layout
    <Route path="profile" ...>
    ...
  </Route>
</Routes>
```

### State Management
- **Auth state**: Pure React `useState` inside `AuthContext` — no Redux
- **Server state**: TanStack Query (caching, background refetching, invalidation)
- **UI state**: Local component `useState`

### API Layer
All API calls go through `src/api/apiClient.js` (Axios instance with baseURL and credentials). Change backend URL in one place only.

### Smart Link Detection (MachineDetail)
```js
const isExternal = machine.writeupUrl?.startsWith("http");
// External → <a target="_blank">
// Internal → <Link to={...}>  (SPA navigation, no reload)
```

---

## 🔌 Backend Architecture

### Generic CRUD Pattern
All portfolio resources use a shared factory:
```js
// portfolio.routes.js
router.use("/machines", crudRoutes(crudController(Machine)));
```

```js
// crudRoutes.js — GET is public, mutations require auth
router.get("/", controller.getAll);       // public
router.get("/:id", controller.getOne);   // public
router.post("/", protect, controller.create);    // admin only
router.put("/:id", protect, controller.update);  // admin only
router.delete("/:id", protect, controller.remove); // admin only
```

### Resume Download Flow
1. Dashboard: Resume PDF uploaded → Cloudinary → URL stored in MongoDB
2. Frontend: `fetch(url)` → `Blob` → `URL.createObjectURL()` → programmatic `<a>` click
3. `setTimeout 10s` → `revokeObjectURL()` (memory cleanup)

> This Blob strategy bypasses Cloudinary Content-Disposition headers that would otherwise give the file a UUID filename.

---

## 📡 API Reference

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | ❌ | Login (returns JWT cookie + token) |
| POST | `/register` | ❌ | Register (locked after first user) |
| POST | `/logout` | ❌ | Clears JWT cookie |
| POST | `/forgot-password` | ❌ | Sends reset email |
| PUT | `/reset-password/:token` | ❌ | Resets password |

### Profile (`/api/profile`) — IP Whitelisted
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ❌ | Get profile (public for portfolio display) |
| PUT | `/` | ✅ | Update profile |
| POST | `/upload-pic` | ✅ | Upload profile picture (Cloudinary) |
| POST | `/upload-resume` | ✅ | Upload resume PDF (Cloudinary) |

### Portfolio (`/api/`) — All GET public, mutations require auth
Available for: `/skills`, `/machines`, `/writeups`, `/certifications`, `/socials`, `/contact`, `/labs`

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/:resource` | ❌ |
| GET | `/:resource/:id` | ❌ |
| POST | `/:resource` | ✅ |
| PUT | `/:resource/:id` | ✅ |
| DELETE | `/:resource/:id` | ✅ |

---

## 🌐 Deployment Notes

### Before Going Live
1. Set `NODE_ENV=production` in server environment
2. Update `CLIENT_URL` to your production domain
3. Update `ALLOWED_IPS` with your production server/home IP
4. Ensure Cloudinary keys are set
5. Set a strong `MONGO_URI` (Atlas recommended)
6. Enable `secure: true` on cookies (auto-enabled in production)

### CORS
```js
// app.js
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
```
Update `CLIENT_URL` in `.env` to your frontend domain.

### Rate Limiting
Auto-tightened in production (100 req/15min global, 10 req/15min auth).

---

## ⚠️ Known Limitations

| Issue | Notes |
|---|---|
| **Stale Resume URL** | If Cloudinary URL changes (e.g. re-upload), re-upload via Dashboard to refresh DB |
| **IP Whitelist & Dynamic IPs** | If your ISP changes your IP, update `ALLOWED_IPS` in `.env` and restart server |
| **2h Session Timeout** | By design — re-login required every 2 hours when admin |
| **Tailwind Typography** | Minor `@plugin` warning in Vite — does not affect functionality |
| **Single User Only** | Registration permanently locked after first account — by design |

---

## 🥷 Author

**Hasrat Khan** — Penetration Tester, Bug Hunter, CTF Player

```
// Breaking things ethically. Finding what others miss.
```

[![GitHub](https://img.shields.io/badge/GitHub-Hasrat270-00ff41?style=flat&logo=github)](https://github.com/Hasrat270)
