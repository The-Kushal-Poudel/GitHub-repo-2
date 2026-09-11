import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
          <App />
        </BrowserRouter>
      )}
    </HelmetProvider>
  </StrictMode>,
);
