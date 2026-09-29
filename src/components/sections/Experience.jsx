import Container from "../common/Container";

export default function Experience({ journeySection }) {
  return (
    <section id="experience" className="career-editorial-section">
      <Container>
        <header className="career-editorial-head">
          <div className="career-editorial-heading">
            <p className="section-tech-label">05 / {journeySection.label}</p>
            <span className="section-script-title">Career</span>
            <h2>{journeySection.title}</h2>
          </div>

          <p className="career-editorial-intro">
            A timeline of the work, teams and learning that shaped how I build software.
          </p>
        </header>

        <div className="career-editorial-body">
          <aside className="career-editorial-rail" aria-hidden="true">
            <span>BEGIN</span>
            <i />
            <strong>NOW</strong>
          </aside>

          <div className="career-editorial-list">
            {journeySection.items.map((item, index) => {
              const current = index === 0;

              return (
                <article
                  key={item.id}
                  className={`career-editorial-item ${current ? "is-current" : ""}`}
                >
                  <div className="career-editorial-period">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.period}</strong>
                  </div>

                  <div className="career-editorial-main">
                    <div className="career-editorial-title-row">
                      <h3>{item.title}</h3>
                      {current && <span className="career-editorial-current">CURRENT</span>}
                    </div>

                    <p className="career-editorial-company">{item.company}</p>
                    <p className="career-editorial-copy">{item.text}</p>
                  </div>

                  <div className="career-editorial-arrow" aria-hidden="true">↗</div>
                </article>
              );
            })}
          </div>

          <div className="career-editorial-ghost" aria-hidden="true">
            EXPERIENCE
          </div>
        </div>
      </Container>
    </section>
  );
}
