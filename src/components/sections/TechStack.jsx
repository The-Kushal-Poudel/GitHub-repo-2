import Container from "../common/Container";

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="border-b border-black/[0.07] bg-[#f5f3ee] py-16 text-[#171817] sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3557c8]">{techStack.label}</p>
            <h2 className="mt-3 max-w-3xl text-[2rem] font-black leading-[1.02] tracking-[-0.045em] sm:text-4xl">A practical stack for shipping complete products.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/48 lg:justify-self-end">Backend-heavy by preference, full-stack by habit.</p>
        </div>

        <div className="mt-8 grid divide-y divide-black/[0.08] border-y border-black/[0.08] sm:mt-10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {techStack.groups.map((group, index) => (
            <div key={group.name} className={`py-6 sm:px-6 sm:py-7 ${index % 2 === 1 ? "sm:border-l sm:border-black/[0.08]" : ""} ${index > 1 ? "sm:border-t sm:border-black/[0.08] lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-black/[0.08]" : ""} lg:px-7`}>
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
