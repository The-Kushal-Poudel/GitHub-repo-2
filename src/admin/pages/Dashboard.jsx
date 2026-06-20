import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Briefcase, BookOpen, Mail, AlertCircle } from "lucide-react";


export default function Dashboard() {
  const { authenticatedFetch } = useAdminAuth();
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0, unreadMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projectsRes, blogsRes, messagesRes] = await Promise.all([
          authenticatedFetch(apiUrl("/api/admin/projects")),
          authenticatedFetch(apiUrl("/api/admin/blogs")),
          authenticatedFetch(apiUrl("/api/admin/messages")),
        ]);

        if (!projectsRes.ok || !blogsRes.ok || !messagesRes.ok) {
          throw new Error("Failed to fetch dashboard statistics.");
        }

        const projects = await projectsRes.json();
        const blogs = await blogsRes.json();
        const messages = await messagesRes.json();

        setStats({
          projects: projects.length,
          blogs: blogs.length,
          messages: messages.length,
          unreadMessages: messages.filter((m) => !m.is_read).length,
        });
      } catch (err) {
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#a78d67] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#151412]">Overview</h1>
        <p className="mt-2 text-sm text-[#655d52]">Welcome back! Here is a summary of your portfolio data.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700 flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Projects Card */}
        <div className="rounded-xl border border-[#e6ded0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Projects</p>
              <h3 className="mt-2 text-3xl font-bold text-[#151412]">{stats.projects}</h3>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#f0eadf] text-[#a78d67]">
              <Briefcase size={22} />
            </div>
          </div>
          <p className="mt-4 text-xs text-[#655d52]">Total items in projects list</p>
        </div>

        {/* Blogs Card */}
        <div className="rounded-xl border border-[#e6ded0] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Blogs</p>
              <h3 className="mt-2 text-3xl font-bold text-[#151412]">{stats.blogs}</h3>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#f0eadf] text-[#a78d67]">
              <BookOpen size={22} />
            </div>
          </div>
          <p className="mt-4 text-xs text-[#655d52]">Total blog entries and drafts</p>
        </div>

        {/* Messages Card */}
        <div className={`rounded-xl border p-6 shadow-sm transition-colors ${
          stats.unreadMessages > 0
            ? "border-amber-200 bg-amber-50/50"
            : "border-[#e6ded0] bg-white"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Inquiries</p>
              <h3 className="mt-2 text-3xl font-bold text-[#151412]">
                {stats.unreadMessages}
                <span className="text-sm font-semibold text-[#8c806f] ml-1.5">unread</span>
              </h3>
            </div>
            <div className={`grid h-12 w-12 place-items-center rounded-lg ${
              stats.unreadMessages > 0
                ? "bg-amber-100 text-amber-700"
                : "bg-[#f0eadf] text-[#a78d67]"
            }`}>
              <Mail size={22} />
            </div>
          </div>
          <p className="mt-4 text-xs text-[#655d52]">{stats.messages} total messages received</p>
        </div>
      </div>
    </div>
  );
}
