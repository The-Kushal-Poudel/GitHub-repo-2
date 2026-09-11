import Container from "../common/Container";

export default function Footer({ site, profile }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#141615] py-8 text-white">
      <Container className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[10px] font-black text-[#171817]">{site.logoInitial}</span>
          <div>
            <p className="text-sm font-bold">{profile.name}</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/25">{profile.role}</p>
          </div>
        </div>
        <div className="text-[10px] font-medium uppercase tracking-[.09em] text-white/22 sm:text-right">
          <p>{site.footerCopyright}</p>
          <p className="mt-1">{site.footerCredit}</p>
        </div>
      </Container>
    </footer>
  );
}
