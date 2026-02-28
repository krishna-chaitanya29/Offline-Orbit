# OfflineOrbit 📡

**OfflineOrbit** is a LAN-only real-time communication platform that works **entirely without the internet**. Text chat, audio calls, video calls, file sharing — all running on your local WiFi.

Built with the **MERN stack** (MongoDB, Express, React, Node.js), **Socket.IO** for real-time messaging, and **WebRTC** for peer-to-peer audio/video calls.

![Status](https://img.shields.io/badge/Status-Offline%20Ready-green)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

---

## Features

- **Zero Internet** — Runs 100% on LAN / WiFi, no cloud needed
- **Real-time Chat** — Instant DMs and broadcast messaging via Socket.IO
- **Audio & Video Calls** — P2P calls using WebRTC (no relay server)
- **File Uploads** — Profile pictures stored locally on the server
- **User Presence** — See who's online in real time
- **Admin Portal** — Manage users, toggle system on/off (kill switch)
- **Offline Avatars** — Auto-generated initials, no external CDN

---

## Quick Start (Docker — Recommended)

> **This is the easiest way.** One command starts everything — MongoDB, backend, and frontend. No manual setup needed.

### Prerequisites

Install **Docker Desktop** on your machine:

| OS | Download |
|----|----------|
| **Windows** | [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) |
| **macOS** | [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) |
| **Linux** | `sudo apt install docker.io docker-compose-v2` (Ubuntu/Debian) or [Docker Docs](https://docs.docker.com/engine/install/) |

After installing, **open Docker Desktop** and make sure it's running (you'll see the whale icon in your taskbar/menu bar).

### Step 1 — Clone the project

```bash
git clone https://github.com/sumithkumar123/Offline-Orbit.git
cd Offline-Orbit
```

### Step 2 — Start the app

**macOS / Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```
start.bat
```
(Double-click it, or run in Command Prompt)

**Or just run directly:**
```bash
docker compose up --build -d
```

### Step 3 — Open in browser

| URL | Who |
|-----|-----|
| `http://localhost` | On the machine running Docker |
| `http://<YOUR-IP>` | From any phone/laptop on the **same WiFi** |

To find your IP:
- **Windows:** `ipconfig` → look for `IPv4 Address` under WiFi
- **macOS:** `ipconfig getifaddr en0`
- **Linux:** `hostname -I`

### Step 4 — Use it!

1. Open the URL in your browser
2. Click **Register** → fill in your details → submit
3. Login with your email & password
4. You'll see the **Dashboard** with online users
5. Click on a user to **chat** or hit the 📞 / 📹 buttons to **call**

> **Tip:** The profile image is optional — you can register without one.

---

## For Audio/Video Calls from Other Devices

Browsers block microphone/camera access on non-HTTPS pages. Since this is a local HTTP app, you need to whitelist it:

### Chrome (recommended)
1. Open `chrome://flags` in the address bar
2. Search for **"Insecure origins treated as secure"**
3. Add your server URL, e.g. `http://192.168.1.5`
4. Set to **Enabled** → click **Relaunch**

### Firefox
Calls work automatically on Firefox over HTTP on LAN.

---

## Stopping the App

```bash
docker compose down        # Stop containers (data is kept)
docker compose down -v     # Stop + delete all data (fresh start)
```

---

## Manual Setup (Without Docker)

If you can't install Docker, you can run things manually.

### Prerequisites
1. **Node.js** v18+ → [Download](https://nodejs.org/)
2. **MongoDB** running locally on port 27017 → [Download](https://www.mongodb.com/try/download/community)

### Backend

```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/offline_orbit
JWT_SECRET=any_secret_key_here
```

Start:
```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

> **For LAN access:** Replace `localhost` with your machine's IP:
> `VITE_API_URL=http://192.168.1.5:5000`

Start:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
Offline-Orbit/
├── docker-compose.yml      # One-command setup
├── start.sh                # Start script (macOS/Linux)
├── start.bat               # Start script (Windows)
├── client/                 # React frontend (Vite + TailwindCSS)
│   ├── Dockerfile
│   ├── nginx.conf          # Reverse proxy config
│   └── src/
│       ├── components/     # UI components (Chat, Call, Avatar, etc.)
│       ├── context/        # CallContext (WebRTC state management)
│       ├── hooks/          # usePresence, useCall, useSystemState
│       ├── pages/          # Dashboard, Direct Chat, Admin Portal
│       ├── api/            # Axios HTTP client
│       └── lib/            # Socket.IO client, auth helpers
└── server/                 # Express + Socket.IO backend
    ├── Dockerfile
    ├── server.js           # Entry point
    ├── models/             # Mongoose schemas (User, Message, Thread)
    ├── controllers/        # Route handlers
    ├── routes/             # REST API routes
    ├── sockets/            # Real-time event handlers (chat, call, presence)
    ├── middleware/          # Auth, file upload (multer)
    └── utils/              # System state, broadcast seeding
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 5, TailwindCSS 3, Lucide Icons |
| Backend | Node.js, Express 5, Socket.IO 4 |
| Database | MongoDB 7 (via Docker or local) |
| Calls | WebRTC (simple-peer), no STUN/TURN needed on LAN |
| Auth | JWT (bcryptjs) |
| Uploads | Multer (local disk storage) |
| Deploy | Docker Compose, nginx reverse proxy |

---

## Default Accounts

No default admin exists — after first run:

1. Register a normal user through the UI
2. To make someone admin, connect to MongoDB and update their role:
   ```bash
   # If using Docker:
   docker exec -it orbit-mongo mongosh offline_orbit
   db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
   ```
3. Login again — you'll be redirected to the Admin Portal

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 80 is busy** | Change `"80:80"` to `"3000:80"` in `docker-compose.yml`, then open `http://localhost:3000` |
| **Port 5000 busy (macOS)** | macOS AirPlay uses 5000. Our Docker setup already maps to 5001 externally |
| **"Cannot connect to Docker daemon"** | Open Docker Desktop first, wait for it to start |
| **Registration says "Something went wrong"** | Check Docker is running: `docker compose ps` — all 3 containers should be "Up" |
| **Can't access from phone** | Make sure phone is on the **same WiFi**. Use your computer's IP, not `localhost` |
| **Audio/Video not working on phone** | See the "Audio/Video Calls from Other Devices" section above (chrome://flags) |
| **Blank page / API errors** | Run `docker compose down && docker compose up --build -d` to rebuild |

---

## License

MIT — feel free to use, modify, and share.
