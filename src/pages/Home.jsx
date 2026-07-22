import { Suspense, lazy } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import SEO from "../components/common/SEO";

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

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://kushalpoudel2060.com.np/#website",
        "url": "https://kushalpoudel2060.com.np/",
        "name": "Kushal Poudel Portfolio",
        "description": "Backend Java and full-stack Laravel developer from Kathmandu building clean, fast web applications.",
        "publisher": {
          "@id": "https://kushalpoudel2060.com.np/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://kushalpoudel2060.com.np/#person",
        "name": profile?.name || "Kushal Poudel",
        "url": "https://kushalpoudel2060.com.np/",
        "image": "https://kushalpoudel2060.com.np/images/og-image.jpg",
        "jobTitle": profile?.roles?.join(", ") || "Backend Java & Laravel Developer",
        "sameAs": [
          profile?.github,
          profile?.linkedin,
          profile?.twitter
        ].filter(Boolean)
      }
    ]
  };

  return (
    <>
      <SEO schema={schema} />
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
