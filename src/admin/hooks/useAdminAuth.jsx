/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { API_URL } from "../../config/api.js";

const AdminAuthContext = createContext(null);

/**
 * Auth token storage decision
 * ───────────────────────────
 * Tokens are stored in sessionStorage rather than localStorage.
 *
 * Trade-off:
 *  - sessionStorage: token survives page refresh and same-tab navigation but
 *    is cleared when the browser tab/window is closed.  This limits the blast
 *    radius of a token leak compared to localStorage while keeping the admin
 *    session usable during a single working session.
 *
 *  - localStorage (previous behaviour): token lives indefinitely in the
 *    browser, even across browser restarts — a significant risk if the device
 *    is shared or the token is ever leaked.
 *
 *  - Memory-only: most secure but requires the admin to log in after every
 *    page refresh.
 *
 * The backend enforces a 24-hour expiry (sanctum.expiration = 1440) and
 * revokes all previous tokens on every new login, so a leaked token is
 * bounded in time even if sessionStorage is somehow compromised.
 */

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token"));
  const [adminEmail, setAdminEmail] = useState(() => sessionStorage.getItem("admin_email"));

  const login = (newToken, email) => {
    sessionStorage.setItem("admin_token", newToken);
    sessionStorage.setItem("admin_email", email);
    setToken(newToken);
    setAdminEmail(email);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_email");
    setToken(null);
    setAdminEmail(null);
  };

  const authenticatedFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    // Do not set Content-Type header manually if body is FormData
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    return res;
  };

  return (
    <AdminAuthContext.Provider value={{ token, adminEmail, login, logout, authenticatedFetch, API_URL }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
