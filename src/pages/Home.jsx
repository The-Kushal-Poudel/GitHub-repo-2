import { Suspense, lazy } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";

const Projects = lazy(() => import("../components/sections/Projects"));
const Blogs = lazy(() => import("../components/sections/Blogs"));
const Experience = lazy(() => import("../components/sections/Experience"));
const FAQ = lazy(() => import("../components/sections/FAQ"));
const Reviews = lazy(() => import("../components/sections/Reviews"));
const Contact = lazy(() => import("../components/sections/Contact"));

export default function Home({ data, reducedMotion }) {
  const {
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
    <>
      <Hero profile={profile} hero={hero} reducedMotion={reducedMotion} />
      <About about={about} reducedMotion={reducedMotion} />
      <TechStack techStack={techStack} reducedMotion={reducedMotion} />

      <Suspense fallback={null}>
        <Projects projectsSection={projectsSection} reducedMotion={reducedMotion} />
        <Blogs blogsSection={blogsSection} reducedMotion={reducedMotion} />
        <Experience journeySection={journeySection} reducedMotion={reducedMotion} />
        <FAQ faqSection={faqSection} reducedMotion={reducedMotion} />
        {/* <Reviews reviewsSection={reviewsSection} reducedMotion={reducedMotion} /> */}
        <Contact contactData={contact} profile={profile} reducedMotion={reducedMotion} />
      </Suspense>
    </>
  );
}
