import { ArrowUpRight, Download } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile }) {
  return (
    <section id="about" className="about-reference-section">
      <Container>
        <div className="about-reference-frame">
          <div className="about-outline-word" aria-hidden="true">ABOUT</div>
          <div className="about-paper-texture" aria-hidden="true" />

          <div className="about-copy-panel">
            <p className="section-tech-label">02 / {about.label}</p>
            <span className="section-script-title">About me</span>
            <h2>{profile.name.toUpperCase()}</h2>
            <p className="about-role-line">{profile.role} · {profile.location}</p>
            <p className="about-description">{about.description}</p>

            <div className="about-meta-grid">
              <div>
                <span>FOCUS</span>
                <strong>Backend systems + product UI</strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong>{profile.availability}</strong>
              </div>
            </div>

            <div className="about-signature" aria-hidden="true">Kushal</div>

            <div className="about-actions">
              <a href="#projects" className="about-button about-button-dark">View work <ArrowUpRight size={14} /></a>
              <a href={profile.cv} download={profile.cvFileName} className="about-button about-button-light">Download CV <Download size={14} /></a>
            </div>
          </div>

          <div className="about-portrait-panel">
            <div className="about-portrait-slash" aria-hidden="true" />
            <img src={profile.image} alt={profile.name} loading="lazy" decoding="async" />
            <div className="about-portrait-overlay" aria-hidden="true" />
            <div className="about-portrait-code">KP / PROFILE / 02</div>
          </div>

          <div className="about-dot-rail" aria-hidden="true">
            {about.principles.map((item, index) => (
              <span key={item.id} className={index === 0 ? "is-active" : ""} />
            ))}
          </div>

          <div className="about-principles-strip">
            {about.principles.map((item) => (
              <div key={item.id}>
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
