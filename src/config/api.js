/**
 * Centralised API URL configuration.
 *
 * All fetch calls in the application must import from this module rather
 * than reading `import.meta.env.VITE_API_URL` directly.  This ensures:
 *  - A single place to change the backend URL.
 *  - A clear error in production when the variable is missing.
 *  - Consistent trailing-slash handling.
 */

const configuredUrl = import.meta.env.VITE_API_URL;

if (!configuredUrl && import.meta.env.PROD) {
  throw new Error(
    "VITE_API_URL is required in production. " +
      "Set it in your Vercel project environment variables."
  );
}

/**
 * The backend base URL with no trailing slash.
 * Defaults to http://localhost:8000 in development when VITE_API_URL is unset.
 */
export const API_URL = (configuredUrl || "http://localhost:8000").replace(
  /\/+$/,
  ""
);

/**
 * Build a full backend URL from a relative path.
 *
 * @param {string} path - e.g. "/api/portfolio" or "api/portfolio"
 * @returns {string} Full URL including API_URL base
 *
 * @example
 * apiUrl("/api/admin/login")  // "https://your-api.onrender.com/api/admin/login"
 */
export function apiUrl(path) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
