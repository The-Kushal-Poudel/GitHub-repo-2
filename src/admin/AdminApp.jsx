import { useEffect, useMemo, useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "./hooks/useAdminAuth";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Faqs from "./pages/Faqs";
import Reviews from "./pages/Reviews";
import Messages from "./pages/Messages";

function normalisePath(pathname) {
  if (!pathname.startsWith("/admin")) return "/admin";
  return pathname.replace(/\/$/, "") || "/admin";
}

function AdminRoutes() {
  const { token } = useAdminAuth();
  const [path, setPath] = useState(() => normalisePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalisePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    const cleanPath = normalisePath(nextPath);
    window.history.pushState({}, "", cleanPath);
    setPath(cleanPath);
  };

  const pages = useMemo(() => ({
    "/admin": <Dashboard />,
    "/admin/profile": <Profile />,
    "/admin/settings": <Settings />,
    "/admin/projects": <Projects />,
    "/admin/blogs": <Blogs />,
    "/admin/experience": <Experience />,
    "/admin/skills": <Skills />,
    "/admin/faqs": <Faqs />,
    "/admin/reviews": <Reviews />,
    "/admin/messages": <Messages />,
  }), []);

  if (!token) {
    return <AdminLogin onLoggedIn={() => navigate("/admin")} />;
  }

  if (path === "/admin/login") {
    navigate("/admin");
    return null;
  }

  return (
    <AdminLayout page={path} navigate={navigate}>
      {pages[path] || <Dashboard />}
    </AdminLayout>
  );
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
}
