export const API_BASE_URL =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ||
  (import.meta.env.PROD
    ? "https://api.wattawear.twilightparadox.com"
    : "http://localhost:3001");
