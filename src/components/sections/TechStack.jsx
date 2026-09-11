import Container from "../common/Container";

export default function TechStack({ techStack }) {
  return (
    <section id="skills" className="relative overflow-hidden border-b border-white/[0.08] bg-[#0a0c10] py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute left-1/3 top-[-180px] h-80 w-80 rounded-full bg-[#5b6cff]/18 blur-[120px]" />
      <Container className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7890ff]">{techStack.label}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">Tools are the easy part. Knowing where to use them isn’t.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/40">A backend-heavy stack with enough frontend range to own the full user flow.</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.groups.map((group, index) => (
            <div key={group.name} className="rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7890ff]/35 hover:bg-[#7890ff]/[0.05] sm:p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c9ff4b]">{group.name}</p>
                <span className="text-[9px] font-black text-white/20">0{index + 1}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-bold text-white/58">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
