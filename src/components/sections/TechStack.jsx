import Container from "../common/Container";

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="stack-reference-section">
      <Container>
        <div className="stack-reference-frame">
          <div className="stack-reference-header">
            <div>
              <p className="section-tech-label">03 / {techStack.label}</p>
              <span className="section-script-title">Toolset</span>
              <h2>MY WORKING<br />ARCHIVE</h2>
            </div>
            <p>
              A practical stack for shipping complete products — backend-heavy by preference, full-stack by habit.
            </p>
          </div>

          <div className="stack-gallery-shell">
            <div className="stack-gallery-fade stack-gallery-fade-left" aria-hidden="true" />
            <div className="stack-gallery-fade stack-gallery-fade-right" aria-hidden="true" />
            <div className="stack-gallery-rail">
              {techStack.groups.map((group, index) => (
                <article
                  key={group.name}
                  className={`stack-gallery-card ${index === 1 ? "is-featured" : ""}`}
                >
                  <div className="stack-card-index">(0{index + 1})</div>
                  <div className="stack-card-visual" aria-hidden="true">
                    <span className="stack-visual-ring" />
                    <span className="stack-visual-line" />
                    <strong>{group.name.slice(0, 2).toUpperCase()}</strong>
                  </div>
                  <h3>{group.name}</h3>
                  <div className="stack-card-items">
                    {group.items.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="stack-reference-footer">
            <span>EXPLORE / TOOLSET / 2026</span>
            <span>BACKEND · FRONTEND · DATA · WORKFLOW</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
