# Hasrat's Hacker Portfolio & Secure CMS

A professional, production-grade hacker portfolio built with a **MERN stack**, featuring a custom administrative dashboard and enterprise-level security hardening.

## 🚀 Key Features

- **Hacker Aesthetic**: Sleek dark mode UI with green-on-black terminal accents.
- **Dynamic Dashboard**: Full control over Profile, Machines, Skills, Writeups, Certifications, and Socials.
- **Smart Logic**: Internal routing detection (Internal vs External writeup links).
- **Blob-Based PDF Handling**: Robust download strategy for resumés bypassing Cloudinary proxy issues.
- **Responsive Layout**: Unified drawer system with backdrop-blur for mobile & desktop consistency.

## 🛡️ Security Hardening (Single-User Mode)

To protect your administrative access, I've implemented:
- **Registration Lock**: Prevents secondary account creation once the admin account exists.
- **IP Whitelisting**: Access to `/dashboard` and `/login` is restricted to IPs listed in your `.env`.
- **Hardenened Sessions**: JWT session timeout reduced to 2 hours for maximum protection.
- **Cookie Security**: HttpOnly, Secure, and SameSite set for sensitive administrative tokens.

## 💻 Tech Stack
- **Frontend**: React 19, Tailwind CSS v4, TanStack Query (v5), Redux Toolkit.
- **Backend**: Node.js, Express, MongoDB/Mongoose.
- **Editor**: Integrated Markdown Editor (`@uiw/react-md-editor`) for machine details & biography.

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js (Latest LTS)
- MongoDB (Local or Atlas)
- Cloudinary Account (for Resumé & Images)

### 2. Environment Setup
Create a `.env` file in the `/server` directory with:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=2h
CLIENT_URL=http://localhost:5173
ALLOWED_IPS=127.0.0.1,::1
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

### 3. Execution
**Run Backend:**
```bash
cd server && npm run dev
```
**Run Frontend:**
```bash
cd client && npm run dev
```

---
*// Breaking things ethically. Finding what others miss.*
