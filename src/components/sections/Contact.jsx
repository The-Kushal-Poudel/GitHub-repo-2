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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || "Could not send your message.");
      }

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
    <section id="contact" className="bg-[#191b1a] py-16 text-white sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#91a6f0]">{contactData.label}</p>
            <h2 className="text-balance mt-3 max-w-xl text-[2.15rem] font-black leading-[0.97] tracking-[-0.05em] sm:mt-4 sm:text-5xl sm:leading-[0.94] sm:tracking-[-0.058em] lg:text-6xl">{contactData.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/52 sm:text-base">{contactData.description}</p>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5 sm:mt-9 sm:gap-x-5 sm:gap-y-3 sm:pt-6">
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-10 items-center gap-2 rounded-lg pr-2 text-sm font-bold text-white transition hover:text-[#91a6f0]"><Mail size={15} /> Email</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg pr-2 text-sm font-bold text-white/55 transition hover:text-white"><LinkedInIcon size={15} /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg pr-2 text-sm font-bold text-white/55 transition hover:text-white"><GitHubIcon size={15} /> GitHub</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[20px] border border-white/[0.09] bg-white/[0.035] p-5 sm:rounded-[22px] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-5 sm:mb-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-white/28">Direct line</p>
                <p className="mt-2 text-lg font-black">Tell me what you’re building.</p>
              </div>
              <ArrowUpRight size={18} className="text-[#91a6f0]" />
            </div>

            {status && (
              <div className={`mb-5 rounded-xl border px-4 py-3 text-sm ${status.type === "success" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100" : "border-amber-300/20 bg-amber-300/10 text-amber-100"}`}>
                <span className="inline-flex items-center gap-2">
                  {status.type === "success" && <CheckCircle2 size={15} />}
                  {status.message}
                </span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
                Name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="min-h-12 rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-base font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0] sm:text-sm" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
                Email
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="min-h-12 rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-base font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0] sm:text-sm" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
              Message
              <textarea required rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-base font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0] sm:text-sm" placeholder="Project, role, product idea…" />
            </label>
            <button disabled={submitting} type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#171817] transition duration-300 hover:bg-[#91a6f0] disabled:cursor-wait disabled:opacity-60">
              {submitting ? "Sending…" : API_ENABLED ? "Send message" : "Open email"} <ArrowUpRight size={15} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
