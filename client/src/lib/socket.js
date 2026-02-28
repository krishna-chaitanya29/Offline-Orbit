import { io } from 'socket.io-client';
import { API_BASE_URL } from './apiBase';
import { getToken } from './authToken';

let socket = null;

export function getSocket() {
  return socket;
}

/**
 * Tear down the current socket so a fresh one can be created
 * (e.g. after login / logout when the JWT changes).
 */
export function disconnectSocket() {
  if (socket) {
    try { socket.disconnect(); } catch { }
    socket = null;
  }
}

/**
 * Create (or return existing) socket connection.
 * Skips creation when there is no auth token yet.
 */
export function connectSocket() {
  if (socket?.connected) return socket;

  // If there is an existing socket that is NOT connected (stale/rejected),
  // destroy it so we can create a fresh one with the current token.
  if (socket) {
    try { socket.disconnect(); } catch { }
    socket = null;
  }

  const token = getToken();
  if (!token) {
    console.warn('[socket] no auth token – skipping connection');
    return null;
  }

  // When API_BASE_URL is same-origin (empty/current host), pass undefined
  // so socket.io-client auto-connects to the page's origin.
  const target = API_BASE_URL || undefined;
  socket = io(target, {
    auth: { token },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('[socket] connected', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('[socket] connect_error:', err.message);
  });

  return socket;
}
