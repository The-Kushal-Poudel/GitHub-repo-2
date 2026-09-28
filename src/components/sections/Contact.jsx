import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import { API_ENABLED, apiUrl } from "../../config/api";
import Container from "../common/Container";

export default function Contact({ contactData, profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const openEmail = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    if (!API_ENABLED) {
      openEmail();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(apiUrl("/api/messages"), {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || "Could not send your message.");
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: "Message saved. I’ll get back to you soon." });
    } catch (error) {
      setStatus({ type: "error", message: "Local backend is unavailable. Opening your email app instead." });
      setTimeout(openEmail, 450);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#4f73ff] py-18 text-white sm:py-22 lg:py-28">
      <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/16" aria-hidden="true" />
      <div className="pointer-events-none absolute right-14 top-16 h-24 w-24 rounded-full bg-[#caff4f]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#caff4f]">{contactData.label}</p>
            <h2 className="mt-4 max-w-xl text-balance text-[2.8rem] font-black leading-[.92] tracking-[-.06em] sm:text-6xl lg:text-[5.5rem]">{contactData.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70 sm:text-base">{contactData.description}</p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/20 pt-6">
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-10 items-center gap-2 text-sm font-black text-white transition hover:text-[#caff4f]"><Mail size={15} /> Email</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-white/68 transition hover:text-white"><LinkedInIcon size={15} /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-white/68 transition hover:text-white"><GitHubIcon size={15} /> GitHub</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/18 bg-[#fffaf3] p-5 text-[#152238] shadow-[0_28px_80px_rgba(18,34,82,.22)] sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-5">
              <div><p className="text-[9px] font-black uppercase tracking-[.15em] text-[#152238]/30">Direct line</p><p className="mt-2 text-xl font-black">Tell me what you’re building.</p></div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#caff4f]"><ArrowUpRight size={18} /></span>
            </div>

            {status && (
              <div role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`mb-5 rounded-xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-300 bg-amber-50 text-amber-800"}`}>
                <span className="inline-flex items-center gap-2">{status.type === "success" && <CheckCircle2 size={15} />}{status.message}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#152238]/38">Name
                <input required autoComplete="name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="min-h-12 rounded-xl border border-[#152238]/12 bg-white px-4 py-3.5 text-base font-medium normal-case tracking-normal text-[#152238] outline-none transition placeholder:text-[#152238]/25 focus:border-[#4f73ff] sm:text-sm" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#152238]/38">Email
                <input required type="email" autoComplete="email" maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="min-h-12 rounded-xl border border-[#152238]/12 bg-white px-4 py-3.5 text-base font-medium normal-case tracking-normal text-[#152238] outline-none transition placeholder:text-[#152238]/25 focus:border-[#4f73ff] sm:text-sm" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#152238]/38">Message
              <textarea required rows="6" maxLength={3000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="resize-none rounded-xl border border-[#152238]/12 bg-white px-4 py-3.5 text-base font-medium normal-case tracking-normal text-[#152238] outline-none transition placeholder:text-[#152238]/25 focus:border-[#4f73ff] sm:text-sm" placeholder="Project, role, product idea…" />
            </label>
            <button disabled={submitting} aria-busy={submitting} type="submit" className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#152238] px-5 text-sm font-black text-white transition duration-300 hover:bg-[#ff7858] disabled:cursor-wait disabled:opacity-60">
              {submitting ? "Sending…" : API_ENABLED ? "Send message" : "Open email"} <ArrowUpRight size={15} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
