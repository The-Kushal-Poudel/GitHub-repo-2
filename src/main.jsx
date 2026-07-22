import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import "./index.css";

const isAdminRoute = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {isAdminRoute ? (
        <AdminApp />
      ) : (
        <BrowserRouter>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
      )}
    </HelmetProvider>
  </StrictMode>,
);
