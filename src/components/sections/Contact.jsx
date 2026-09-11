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
    <section id="contact" className="relative overflow-hidden bg-[#0a0c10] py-20 text-white sm:py-24 lg:py-28">
      <div className="cool-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-28 bottom-[-100px] h-96 w-96 rounded-full bg-[#5b6cff]/22 blur-[130px]" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7890ff]">{contactData.label}</p>
            <h2 className="text-balance mt-4 max-w-xl text-4xl font-black leading-[0.92] tracking-[-0.064em] sm:text-5xl lg:text-7xl">{contactData.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/52 sm:text-base">{contactData.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#c9ff4b] px-5 py-3 text-sm font-black text-[#0a0c10] transition hover:-translate-y-0.5">
                <Mail size={15} /> Email me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white">
                <LinkedInIcon size={15} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70 transition hover:bg-white/[0.08] hover:text-white">
                <GitHubIcon size={15} /> GitHub
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/[0.09] bg-white/[0.055] p-6 shadow-[0_30px_80px_rgba(0,0,0,.28)] backdrop-blur-xl sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[.17em] text-white/30">Direct line</p>
                <p className="mt-2 text-lg font-black">Tell me what you’re trying to build.</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5b6cff] text-white"><ArrowUpRight size={18} /></div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-white/10 bg-[#0a0c10]/55 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/20 focus:border-[#7890ff]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-white/10 bg-[#0a0c10]/55 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/20 focus:border-[#7890ff]"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
              What are we solving?
              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-xl border border-white/10 bg-[#0a0c10]/55 px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/20 focus:border-[#7890ff]"
                placeholder="Project, role, difficult bug, product idea…"
              />
            </label>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9ff4b] px-5 py-3.5 text-sm font-black text-[#0a0c10] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(201,255,75,.16)]">
              Open email <ArrowUpRight size={15} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
