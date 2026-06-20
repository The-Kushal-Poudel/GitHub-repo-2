import { useState, useEffect } from "react";
import { apiUrl } from "../config/api.js";
import { useAdminAuth } from "./hooks/useAdminAuth";
import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  GraduationCap,
  Code,
  Mail,
  SlidersHorizontal,
  LogOut,
  Menu,
  HelpCircle,
  Star,
} from "lucide-react";


export default function AdminLayout({ page, navigate, children }) {
  const { logout, authenticatedFetch, adminEmail } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchUnreadCount() {
      try {
        const res = await authenticatedFetch(apiUrl("/api/admin/messages"));
        if (res.ok) {
          const messages = await res.json();
          const unread = messages.filter((m) => !m.is_read).length;
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error("Failed to fetch unread messages count", err);
      }
    }

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [page]);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to sign out?")) return;

    try {
      await authenticatedFetch(apiUrl("/api/admin/logout"), {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      logout();
      navigate("/admin/login");
    }
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
    { label: "Profile", href: "/admin/profile", icon: User },
    { label: "Site Settings", href: "/admin/settings", icon: SlidersHorizontal },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Experience", href: "/admin/experience", icon: GraduationCap },
    { label: "Skills", href: "/admin/skills", icon: Code },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
    { label: "Messages", href: "/admin/messages", icon: Mail, badge: unreadCount > 0 ? unreadCount : null },
  ];

  function handleNav(event, href) {
    event.preventDefault();
    navigate(href);
    setMobileOpen(false);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#151412] text-white">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <a href="/admin" onClick={(event) => handleNav(event, "/admin")} className="font-serif text-lg font-bold tracking-tight text-[#a78d67]">
          Kushal.<span className="text-white">Admin</span>
        </a>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.end ? page === item.href : page.startsWith(item.href);
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => handleNav(event, item.href)}
              className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${
                isActive ? "bg-[#a78d67] text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge !== null && (
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-black text-white">
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-4 truncate px-2 text-xs text-white/55">
          Signed in as:<br />
          <span className="font-bold text-white/80">{adminEmail}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg border border-white/15 px-4 py-2.5 text-left text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f3eb]">
      <aside className="z-30 hidden w-64 md:fixed md:inset-y-0 md:left-0 md:block">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-[#e6ded0] bg-white px-6 md:justify-end">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-[#151412] hover:bg-[#f0eadf] md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#a78d67] transition-colors hover:text-[#151412]">
              View Public Site
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
