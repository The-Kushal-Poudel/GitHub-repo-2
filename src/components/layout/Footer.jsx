import Container from "../common/Container";

export default function Footer({ site, profile }) {
  return (
    <footer className="bg-[#171712] py-8 text-white">
      <Container className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[10px] font-black text-[#171712]">{site.logoInitial}</span>
          <div>
            <p className="text-sm font-bold">{profile.name}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">{profile.role}</p>
          </div>
        </div>
        <div className="text-xs text-white/35 sm:text-right">
          <p>{site.footerCopyright}</p>
          <p className="mt-1">{site.footerCredit}</p>
        </div>
      </Container>
    </footer>
  );
}
