import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

export default function NotFound({ profile }) {
  return (
    <>
      <SEO title="Page not found" description="The requested portfolio page could not be found." noIndex />
      <section className="grid min-h-[68svh] place-items-center border-b border-black/[0.07] bg-[#f5f3ee] py-20 sm:py-28">
        <Container className="w-full">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3557c8]">404 · Off route</p>
            <h1 className="mt-4 text-balance text-[clamp(3.2rem,14vw,7rem)] font-black leading-[0.88] tracking-[-0.07em] text-[#171817]">
              Nothing useful lives here.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-black/52 sm:text-base">
              The page may have moved, or the link may be outdated. Head back to the work, or contact me directly.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#171817] px-6 text-sm font-bold text-white transition hover:bg-[#3557c8]">
                <ArrowLeft size={15} /> Back to work
              </Link>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/40 px-6 text-sm font-semibold text-black/58 transition hover:bg-white hover:text-black">
                <Mail size={15} /> Email me
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
