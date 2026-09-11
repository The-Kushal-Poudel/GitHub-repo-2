import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import Container from "../common/Container";

export default function Contact({ contactData, profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-[#d8ff57] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/45">{contactData.label}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-5xl lg:text-6xl">{contactData.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-black/60 sm:text-base">{contactData.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#171712] px-5 py-3 text-sm font-bold text-white">
                <Mail size={15} /> Email me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-bold">
                <LinkedInIcon size={15} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-bold">
                <GitHubIcon size={15} /> GitHub
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[28px] bg-[#171712] p-6 text-white sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition focus:border-[#d8ff57]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition focus:border-[#d8ff57]"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
              Message
              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition focus:border-[#d8ff57]"
                placeholder="Tell me a little about the role or product..."
              />
            </label>
            <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d8ff57] px-5 py-3 text-sm font-black text-[#171712]">
              Compose email <ArrowUpRight size={15} />
            </button>
            <p className="mt-3 text-[11px] leading-5 text-white/35">No backend required — this opens your default email app with the message pre-filled.</p>
          </form>
        </div>
      </Container>
    </section>
  );
}
