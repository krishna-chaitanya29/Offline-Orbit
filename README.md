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

You **only need Docker** — it handles everything else (MongoDB, Node.js, etc.) automatically.

<details>
<summary><b>🪟 Windows</b></summary>

1. **Enable WSL2** (required for Docker):
   - Open **PowerShell as Administrator** and run:
   ```powershell
   wsl --install
   ```
   - Restart your PC when prompted

2. **Install Docker Desktop**:
   - Download from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
   - Run the installer → keep default settings → **Restart** when done
   - Open **Docker Desktop** from Start Menu and wait until it says "Docker is running"

3. **Install Git** (if not already installed):
   - Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - Run the installer → keep all defaults

**Verify installation** (open Command Prompt or PowerShell):
```powershell
docker --version
docker compose version
git --version
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Docker Desktop**:
   ```bash
   brew install --cask docker
   ```
   Or download manually from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

   After installing, **open Docker Desktop** from Applications and wait until the whale icon in the menu bar is steady (not animating).

3. **Install Git** (if not already installed):
   ```bash
   brew install git
   ```
   Or just run `git` in Terminal — macOS will prompt you to install Xcode Command Line Tools.

**Verify installation:**
```bash
docker --version
docker compose version
git --version
```

</details>

<details>
<summary><b>🐧 Linux (Ubuntu / Debian)</b></summary>

1. **Install Docker Engine + Compose:**
   ```bash
   # Remove old versions
   sudo apt remove docker docker-engine docker.io containerd runc 2>/dev/null

   # Install prerequisites
   sudo apt update
   sudo apt install -y ca-certificates curl gnupg

   # Add Docker's official GPG key
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg

   # Add Docker repository
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   # Install Docker
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

2. **Allow Docker without sudo:**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Install Git:**
   ```bash
   sudo apt install -y git
   ```

**Verify installation:**
```bash
docker --version
docker compose version
git --version
```

</details>

<details>
<summary><b>🐧 Linux (Fedora / RHEL / CentOS)</b></summary>

1. **Install Docker Engine + Compose:**
   ```bash
   sudo dnf install -y dnf-plugins-core
   sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
   sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Allow Docker without sudo:**
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Install Git:**
   ```bash
   sudo dnf install -y git
   ```

**Verify installation:**
```bash
docker --version
docker compose version
git --version
```

</details>

> **✅ That's it!** You don't need to install Node.js, MongoDB, or anything else — Docker handles all of that inside containers.

### Step 1 — Clone the project

```bash
git clone https://github.com/krishna-chaitanya29/Offline-Orbit.git
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

You need **Node.js**, **MongoDB**, and **Git** installed manually.

<details>
<summary><b>🪟 Windows</b></summary>

1. **Node.js v18+**:
   - Download from [https://nodejs.org/](https://nodejs.org/) (LTS version)
   - Run the installer → check "Add to PATH" → Finish

2. **MongoDB Community Server**:
   - Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Run the installer → choose "Complete" → check "Install MongoDB as a Service"
   - MongoDB will auto-start on port 27017

3. **Git**:
   - Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)

</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Git (comes with Xcode tools, or):
brew install git
```

</details>

<details>
<summary><b>🐧 Linux (Ubuntu / Debian)</b></summary>

```bash
# Node.js v18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Git
sudo apt install -y git
```

</details>

**Verify everything:**
```bash
node --version    # Should show v18+
mongosh           # Should connect to MongoDB
git --version
```

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
