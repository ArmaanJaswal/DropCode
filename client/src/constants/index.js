// Base URL for shareable links & QR codes (e.g. your Vercel deployment URL)
export const CLIENT_BASE_URL =
  import.meta.env.VITE_CLIENT_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173");

// Signaling server URL (e.g. deployed backend URL on Render/Railway)
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const CHUNK_SIZE = 64 * 1024; // 64 KB

