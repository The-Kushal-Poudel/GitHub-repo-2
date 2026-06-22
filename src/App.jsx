import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import IntroScreen from "./components/layout/IntroScreen";
import { usePortfolioData } from "./hooks/usePortfolioData";

const Projects = lazy(() => import("./components/sections/Projects"));
const Blogs = lazy(() => import("./components/sections/Blogs"));
const Experience = lazy(() => import("./components/sections/Experience"));
const FAQ = lazy(() => import("./components/sections/FAQ"));
const Reviews = lazy(() => import("./components/sections/Reviews"));
const Contact = lazy(() => import("./components/sections/Contact"));

export default function App() {
  const reducedMotion = useReducedMotion();
  const { data, loading, error } = usePortfolioData();

  if (!data) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8f3eb] px-4 text-center text-[#201d18]">
        <div className="max-w-md rounded-2xl border border-[#e6ded0] bg-white p-8 shadow-xl">
          <h2 className="font-serif text-2xl font-bold text-red-700">Unable to load portfolio</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#655d52]">
            {error || "We encountered an unexpected error loading the portfolio. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-[#151412] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    site,
    navItems,
    profile,
    hero,
    about,
    techStack,
    projectsSection,
    blogsSection,
    journeySection,
    faqSection,
    reviewsSection,
    contact,
  } = data;

  return (
    <main className="min-h-screen w-full overflow-x-hidden scroll-smooth bg-[#f8f3eb] text-[#201d18] selection:bg-[#a78d67] selection:text-white">
      <IntroScreen name={data.profile?.name?.split(" ")[0] || "Kushal"} reducedMotion={reducedMotion} />
      <ScrollProgress reducedMotion={reducedMotion} />
      <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />
      <Hero profile={profile} hero={hero} reducedMotion={reducedMotion} />
      <About about={about} reducedMotion={reducedMotion} />
      <TechStack techStack={techStack} reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <Projects projectsSection={projectsSection} reducedMotion={reducedMotion} />
        <Blogs blogsSection={blogsSection} reducedMotion={reducedMotion} />
        <Experience journeySection={journeySection} reducedMotion={reducedMotion} />
        <FAQ faqSection={faqSection} reducedMotion={reducedMotion} />
        <Reviews reviewsSection={reviewsSection} reducedMotion={reducedMotion} />
        <Contact contactData={contact} profile={profile} reducedMotion={reducedMotion} />
      </Suspense>

      <Footer site={site} reducedMotion={reducedMotion} />
      <Analytics />
    </main>
  );
}