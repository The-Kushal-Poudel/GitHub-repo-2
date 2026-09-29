import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
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
    } catch {
      setStatus({ type: "error", message: "Local backend is unavailable. Opening your email app instead." });
      setTimeout(openEmail, 450);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-reference-section">
      <Container>
        <div className="contact-reference-panel">
          <div className="contact-reference-watermark" aria-hidden="true">CONTACT</div>
          <div className="contact-reference-texture" aria-hidden="true" />

          <div className="contact-reference-head">
            <p className="section-tech-label">07 / {contactData.label}</p>
            <span className="section-script-title">Contact</span>
            <h2>CONTACT</h2>
            <p>{contactData.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-editorial-form">
            <div className="contact-editorial-row">
              <label>
                <span>01. YOUR NAME:</span>
                <input
                  required
                  autoComplete="name"
                  maxLength={80}
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="First and last, please*"
                />
              </label>
              <label>
                <span>02. EMAIL ADDRESS:</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={160}
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="Where can I reply?*"
                />
              </label>
              <div className="contact-inquiry-cell">
                <span>03. INQUIRY TYPE:</span>
                <strong>Project / Role / Collaboration</strong>
              </div>
            </div>

            <div className="contact-message-layout">
              <label className="contact-message-field">
                <span className="contact-script-line">I&apos;d love to say hi</span>
                <textarea
                  required
                  rows="5"
                  maxLength={3000}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="...feel free to ask questions or add a few more details*"
                />
              </label>

              <aside className="contact-elsewhere">
                <p>ELSEWHERE:</p>
                <a href={profile.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={17} /> GITHUB</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon size={17} /> LINKEDIN</a>
                <a href={`mailto:${profile.email}`}><span className="contact-mail-dot">@</span> EMAIL</a>
              </aside>
            </div>

            {status && (
              <div className={`contact-form-status ${status.type}`} role={status.type === "error" ? "alert" : "status"}>
                {status.type === "success" && <CheckCircle2 size={15} />}
                {status.message}
              </div>
            )}

            <button disabled={submitting} aria-busy={submitting} type="submit" className="contact-submit-button">
              {submitting ? "SENDING..." : API_ENABLED ? "SUBMIT FORM" : "OPEN EMAIL"}
              <ArrowUpRight size={14} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
