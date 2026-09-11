import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import Container from "../common/Container";

export default function Footer({ site, profile }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#141615] py-7 text-white sm:py-9">
      <Container>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[10px] font-black text-[#171817]">
              {site.logoInitial}
            </span>
            <div>
              <p className="text-sm font-bold">{profile.name}</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/28">{profile.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Kushal"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/20 hover:bg-white hover:text-[#171817]"
            >
              <Mail size={14} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Kushal on LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/20 hover:bg-white hover:text-[#171817]"
            >
              <LinkedInIcon size={14} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Kushal on GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/20 hover:bg-white hover:text-[#171817]"
            >
              <GitHubIcon size={14} />
            </a>
            <Link
              to="/#home"
              aria-label="Back to top"
              className="ml-1 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 transition hover:border-white/20 hover:bg-white hover:text-[#171817]"
            >
              Top <ArrowUp size={13} />
            </Link>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-[9px] font-medium uppercase tracking-[.09em] text-white/22 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footerCopyright}</p>
          <p>{site.footerCredit}</p>
        </div>
      </Container>
    </footer>
  );
}
