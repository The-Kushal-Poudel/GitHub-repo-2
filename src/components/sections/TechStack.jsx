import Container from "../common/Container";

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="border-b border-black/[0.07] bg-[#f5f3ee] py-20 text-[#171817] sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{techStack.label}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] sm:text-4xl">A practical stack for shipping complete products.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/48 lg:justify-self-end">Backend-heavy by preference, full-stack by habit.</p>
        </div>

        <div className="mt-10 grid border-y border-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {techStack.groups.map((group, index) => (
            <div key={group.name} className={`py-7 sm:px-6 lg:px-7 ${index > 0 ? "lg:border-l lg:border-black/[0.08]" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#171817]">{group.name}</p>
                <span className="text-[9px] font-bold text-black/20">0{index + 1}</span>
              </div>
              <div className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <p key={item} className="text-sm font-medium text-black/50">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
