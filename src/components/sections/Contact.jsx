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
    <section id="contact" className="bg-[#191b1a] py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#91a6f0]">{contactData.label}</p>
            <h2 className="text-balance mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.058em] sm:text-5xl lg:text-6xl">{contactData.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/52 sm:text-base">{contactData.description}</p>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#91a6f0]"><Mail size={15} /> Email</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-white"><LinkedInIcon size={15} /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-white"><GitHubIcon size={15} /> GitHub</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-white/28">Direct line</p>
                <p className="mt-2 text-lg font-black">Tell me what you’re building.</p>
              </div>
              <ArrowUpRight size={18} className="text-[#91a6f0]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
                Name
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0]" placeholder="Your name" />
              </label>
              <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
                Email
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0]" placeholder="you@example.com" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/32">
              Message
              <textarea required rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="resize-none rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-sm font-medium normal-case tracking-normal text-white outline-none transition placeholder:text-white/18 focus:border-[#91a6f0]" placeholder="Project, role, product idea…" />
            </label>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#171817] transition duration-300 hover:bg-[#91a6f0]">
              Open email <ArrowUpRight size={15} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
