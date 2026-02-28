const DEFAULT_API = 'http://localhost:5000';

// VITE_API_URL can be:
//   "http://192.168.1.42:5000"  → direct to server (dev / LAN mode)
//   ""  (empty string)           → same-origin, nginx proxies /api & /socket.io (Docker mode)
//   undefined (not set)          → falls back to DEFAULT_API

const envRaw = import.meta.env?.VITE_API_URL;
const isExplicitlyEmpty = typeof envRaw === 'string' && envRaw.trim() === '';

const normalized = isExplicitlyEmpty
  ? (typeof window !== 'undefined' ? window.location.origin : '')
  : (envRaw ? envRaw.trim().replace(/\/+$/, '') : DEFAULT_API);

export const API_BASE_URL = normalized;
export const API_REST_BASE = `${API_BASE_URL}/api`;

export function buildApiUrl(path = '') {
  if (!path) return API_BASE_URL;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
