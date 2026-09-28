import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import Container from "../common/Container";

export default function Footer({ site, profile }) {
  return (
    <footer className="border-t border-white/10 bg-[#0a1429] py-8 text-white sm:py-10">
      <Container>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#caff4f] text-[10px] font-black text-[#0d1830]">{site.logoInitial}</span>
            <div>
              <p className="text-sm font-black">{profile.name}</p>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-white/30">{profile.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <a href={`mailto:${profile.email}`} aria-label="Email Kushal" className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/50 transition hover:border-[#caff4f] hover:bg-[#caff4f] hover:text-[#0d1830]"><Mail size={14} /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Kushal on LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/50 transition hover:border-[#9ed7ff] hover:bg-[#9ed7ff] hover:text-[#0d1830]"><LinkedInIcon size={14} /></a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Kushal on GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/50 transition hover:border-[#ff7858] hover:bg-[#ff7858] hover:text-white"><GitHubIcon size={14} /></a>
            <Link to="/#home" aria-label="Back to top" className="ml-1 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-[10px] font-black uppercase tracking-[0.12em] text-white/50 transition hover:border-white/25 hover:bg-white hover:text-[#0d1830]">Top <ArrowUp size={13} /></Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.08] pt-5 text-[9px] font-medium uppercase tracking-[.09em] text-white/22 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footerCopyright}</p><p>{site.footerCredit}</p>
        </div>
      </Container>
    </footer>
  );
}
