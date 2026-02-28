// server.js (ESM)
import cors from 'cors';
import 'dotenv/config'; // Load env vars BEFORE other imports
import express from 'express';
import { createServer } from 'http';
import os from 'os';
import { Server } from 'socket.io';

import connectDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js'; // ← admin toggle
import chatRoutes from './routes/chatRoutes.js';
import systemRoutes from './routes/systemRoutes.js'; // ← public read-only state
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userUpdateRoutes from "./routes/userUpdateRoutes.js";

import { attachSocketAuth } from './middleware/authSocket.js';
import { registerSockets } from './sockets/index.js';
import { initBroadcastThread } from './utils/initBroadcastThread.js';
import { getSystemState, loadSystemState } from './utils/systemState.js'; // ← kill switch cache

// dotenv.config(); // Loaded at top

const app = express();

// ── Detect LAN IPs ──
function getLanIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4
      if (iface.internal || iface.family !== 'IPv4') continue;
      // Skip Docker bridge IPs (172.17.x.x - 172.31.x.x)
      if (/^172\.(1[7-9]|2\d|3[01])\./.test(iface.address)) continue;
      ips.push(iface.address);
    }
  }
  return ips;
}

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*', // tighten to your client origin if desired
    credentials: true,
  })
);
// Serve uploaded files statically
app.use('/uploads', express.static('public/uploads'));

// REST Routes
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/system', systemRoutes); // GET /state (auth required)
app.use('/api/admin', adminRoutes);   // GET/PUT /system (admin only)
app.use('/api/upload', uploadRoutes); // New upload endpoint
app.use("/api/users", userUpdateRoutes);

async function start() {
  try {
    // 1) DB
    await connectDb();
    console.log('[db] connected');

    // 2) Ensure single broadcast thread and keep its _id
    const broadcastThreadId = await initBroadcastThread();
    console.log('[seed] broadcast thread is ready:', String(broadcastThreadId));

    // 3) Load system state (kill switch) into cache
    await loadSystemState();
    console.log('[system] state:', getSystemState());

    // 4) HTTP + Socket.IO
    const server = createServer(app);
    const io = new Server(server, {
      cors: { origin: '*', credentials: true },
      transports: ['websocket', 'polling'],
    });

    // 5) Socket auth + initial state emit + handlers
    attachSocketAuth(io);

    // On every connection, immediately send current system state
    io.on('connection', (socket) => {
      socket.emit('system:state', getSystemState());
    });

    // Register app sockets (presence, chat, broadcast, calls)
    registerSockets(io, { broadcastThreadId });

    // 6) Expose to app (optional, handy in routes/controllers)
    app.set('io', io);
    app.set('broadcastThreadId', broadcastThreadId);

    // 7) Start
    const port = process.env.PORT || 5000;
    server.listen(port, '0.0.0.0', () => {
      // Detect LAN IPs for easy sharing
      const lanIPs = getLanIPs();

      console.log('\n');
      console.log('╔══════════════════════════════════════════════════════╗');
      console.log('║           🚀 OfflineOrbit Server Running            ║');
      console.log('╠══════════════════════════════════════════════════════╣');
      console.log(`║  Local:    http://localhost:${port}                   ║`);
      if (lanIPs.length > 0) {
        lanIPs.forEach((ip) => {
          const url = `http://${ip}:${port}`;
          const pad = ' '.repeat(Math.max(0, 37 - url.length));
          console.log(`║  Network:  ${url}${pad}║`);
        });
        console.log('╠══════════════════════════════════════════════════════╣');
        console.log('║  📱 Share this URL with others on the same WiFi:    ║');
        const shareUrl = `http://${lanIPs[0]}`;
        const sharePad = ' '.repeat(Math.max(0, 39 - shareUrl.length));
        console.log(`║     👉 ${shareUrl}${sharePad}║`);
      } else {
        console.log('╠══════════════════════════════════════════════════════╣');
        console.log('║  ⚠️  No LAN IP detected (Docker bridge mode?)       ║');
        console.log('║  Run: ipconfig / ifconfig on host to find your IP   ║');
      }
      console.log('╚══════════════════════════════════════════════════════╝');
      console.log('\n');
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
}

start();

export default app;
