import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

const isAdminRoute = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isAdminRoute ? (
      <AdminApp />
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);
