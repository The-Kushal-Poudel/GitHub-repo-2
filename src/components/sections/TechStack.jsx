import Container from "../common/Container";

const groupStyles = [
  "bg-[#4f73ff] text-white",
  "bg-[#ff7858] text-white",
  "bg-[#caff4f] text-[#0d1830]",
  "bg-[#9ed7ff] text-[#10203a]",
];

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="border-b border-[#152238]/10 bg-[#f6f0e7] py-18 text-[#152238] sm:py-22 lg:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4f73ff]">{techStack.label}</p>
            <h2 className="mt-3 max-w-3xl text-[2.5rem] font-black leading-[.96] tracking-[-.055em] sm:text-5xl lg:text-6xl">A practical stack for shipping complete products.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#152238]/48 lg:justify-self-end">Backend-heavy by preference, full-stack by habit.</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {techStack.groups.map((group, index) => (
            <article key={group.name} className={`min-h-[260px] rounded-[24px] p-6 shadow-[0_12px_35px_rgba(21,34,56,.05)] ${groupStyles[index % groupStyles.length]}`}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-[0.14em]">{group.name}</p>
                <span className="text-[9px] font-black opacity-45">0{index + 1}</span>
              </div>
              <div className="mt-12 space-y-3">
                {group.items.map((item) => <p key={item} className="text-[15px] font-bold opacity-75">{item}</p>)}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
