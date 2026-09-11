const configuredUrl = import.meta.env.VITE_API_URL?.trim();

/**
 * When VITE_API_URL is present, the frontend reads/writes through Laravel.
 * When it is absent (for example on the frontend-only Vercel build), the
 * portfolio falls back to the bundled local data and stays fully functional.
 */
export const API_ENABLED = Boolean(configuredUrl);

export const API_URL = (configuredUrl || "http://127.0.0.1:8000").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
