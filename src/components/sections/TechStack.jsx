import Container from "../common/Container";

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="border-b border-black/10 bg-[#171712] py-16 text-white sm:py-20">
      <Container>
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/35">{techStack.label}</p>
        <div className="mt-9 grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.groups.map((group) => (
            <div key={group.name} className="bg-[#171712] p-6 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d8ff57]">{group.name}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-semibold text-white/66">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
