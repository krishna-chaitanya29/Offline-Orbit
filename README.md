# OfflineOrbit 📡

**OfflineOrbit** is a robust, LAN-only communication platform designed to work entirely without an internet connection. It enables secure text messaging, audio/video calling, and file sharing within a local network (e.g., College Campus, Office, or Home Wi-Fi).

![Project Status](https://img.shields.io/badge/Status-Offline%20Ready-green)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)

## 🚀 Features

-   **Zero Internet Dependency**: Runs 100% on localhost or LAN IP.
-   **Real-time Chat**: Instant messaging via Socket.IO.
-   **Audio & Video Calls**: P2P communication using WebRTC.
-   **File Sharing**: Upload profile pictures and files locally (stored on server disk).
-   **Offline Avatars**: Auto-generated initials for user avatars (no external CDN).
-   **Admin Portal**: specialized dashboard to manage users and toggle system availability (Kill Switch).
-   **User Presence**: Real-time Online/Offline status indicators.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TailwindCSS, Lucide Icons.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Local Instance).
-   **Real-time**: Socket.IO.
-   **Media**: Simple-Peer (WebRTC), Multer (Local File Uploads).

## 📋 Prerequisites

Before running the project, ensure you have the following installed locally:

1.  **Node.js** (v18+ recommended)
2.  **MongoDB Community Server** (Must be running locally on port `27017`)
    *   [Download MongoDB](https://www.mongodb.com/try/download/community)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/sumithkumar123/Offline-Orbit.git
cd Offline-Orbit
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Configuration (.env):**
Create a `.env` file in the `server` folder with the following details:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/offline_orbit
JWT_SECRET=your_super_secret_key_here
```
*(Note: ensure `MONGODB_URI` points to `127.0.0.1`, not `localhost` if node versions vary).*

### 3. Frontend Setup
```bash
cd ../client
npm install
```

**Configuration (.env):**
Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```
*(Replace `localhost` with your machine's LAN IP address if testing from other devices on the network, e.g., `http://192.168.1.5:5000`)*

## 🏃‍♂️ Running the App

You need to run both the server and client concurrently.

**1. Start the Server:**
```bash
# In terminal 1 (server directory)
npm run dev
```
Checking database connection... Connected to `mongodb://127.0.0.1:27017/offline_orbit`

**2. Start the Client:**
```bash
# In terminal 2 (client directory)
npm run dev
```
App running at `http://localhost:5173`

## 📱 Using on LAN (Mobile/Other Laptops)

To access the app from a phone or another computer on the same Wi-Fi:
1.  Find your PC's IP address (`ipconfig` on Windows or `ifconfig` on Mac/Linux).
2.  Update `client/.env` `VITE_API_URL` to `http://YOUR_PC_IP:5000`.
3.  Access the frontend via `http://YOUR_PC_IP:5173`.
4.  *Note: Audio/Video permissions might require HTTPS or specific browser flags on mobile.*

## 🔒 Offline Capability Notes

-   **Database**: Uses local MongoDB, so data stays on your machine.
-   **Images**: Profile pictures are uploaded to `server/public/uploads` and served statically.
-   **Icons**: Using `lucide-react` (bundled JS), no external font CDNs.
-   **Avatars**: Custom component generates SVG avatars locally based on user initials.

## 🤝 Contributing

Feel free to fork and submit PRs. Ensure all new features maintain the "Zero Internet" usage policy.
