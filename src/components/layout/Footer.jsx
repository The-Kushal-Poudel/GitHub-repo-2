import { ArrowUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";

export default function Footer({ site, profile }) {
  return (
    <footer className="wave-footer">
      <div className="wave-footer-shapes" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path className="wave-layer wave-layer-one" d="M0,96 C170,25 280,152 445,88 C610,24 720,150 885,80 C1040,15 1165,130 1440,56 L1440,180 L0,180 Z" />
          <path className="wave-layer wave-layer-two" d="M0,112 C175,53 318,156 505,105 C690,56 790,152 960,103 C1118,58 1235,137 1440,92 L1440,180 L0,180 Z" />
          <path className="wave-layer wave-layer-three" d="M0,128 C175,96 325,160 515,126 C705,92 835,160 1010,126 C1180,92 1295,145 1440,118 L1440,180 L0,180 Z" />
        </svg>
      </div>

      <div className="wave-footer-content">
        <div className="wave-footer-left">
          <span className="wave-footer-mark" aria-hidden="true">KP</span>
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>
        </div>

        <div className="wave-footer-center">
          <span>{site.footerCopyright}</span>
          <span>{site.footerCredit}</span>
        </div>

        <div className="wave-footer-links">
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={15} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon size={15} /></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon size={15} /></a>
          <Link to="/#home" aria-label="Back to top"><ArrowUp size={15} /></Link>
        </div>
      </div>
    </footer>
  );
}
