import { useEffect, useState } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";


export default function Messages() {
  const { authenticatedFetch } = useAdminAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  async function loadMessages() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/messages"));
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load messages.");
      setMessages(data);
    } catch (err) {
      setErrorText(err.message || "Could not load messages.");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadMessages();
  }, []);

  async function markRead(id) {
    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/messages/${id}/read`), {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to update message.");
      setMessages((current) => current.map((message) => message.id === id ? { ...message, is_read: true } : message));
    } catch (err) {
      setErrorText(err.message || "Could not update message.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a78d67]">Inbox</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#151412]">Contact Messages</h1>
        <p className="mt-2 text-sm text-[#6d6358]">Messages submitted from the public contact form are stored here.</p>
      </div>

      {errorText && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          <AlertCircle size={16} /> {errorText}
        </div>
      )}

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-xl border border-[#e6ded0] bg-white p-8 text-center text-sm text-[#8c806f]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="rounded-xl border border-[#e6ded0] bg-white p-8 text-center text-sm text-[#8c806f]">No messages yet.</div>
        ) : messages.map((message) => (
          <article key={message.id} className={`rounded-xl border bg-white p-5 shadow-xl shadow-black/5 ${message.is_read ? "border-[#e6ded0]" : "border-[#a78d67]"}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Mail size={17} className="text-[#a78d67]" />
                  <h2 className="font-bold text-[#151412]">{message.name}</h2>
                  {!message.is_read && <span className="rounded-full bg-[#a78d67] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">New</span>}
                </div>
                <a href={`mailto:${message.email}`} className="mt-1 block text-sm font-semibold text-[#6d6358] hover:text-[#151412]">{message.email}</a>
                <p className="mt-1 text-xs text-[#8c806f]">{new Date(message.created_at).toLocaleString()}</p>
              </div>
              {!message.is_read && (
                <button onClick={() => markRead(message.id)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e6ded0] px-3 py-2 text-xs font-bold text-[#151412] hover:bg-[#f8f3eb]">
                  <CheckCircle2 size={15} /> Mark Read
                </button>
              )}
            </div>
            <p className="mt-4 whitespace-pre-line rounded-lg bg-[#f8f3eb] p-4 text-sm leading-7 text-[#4f493f]">{message.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
