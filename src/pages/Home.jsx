import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import Experience from "../components/sections/Experience";
import Blogs from "../components/sections/Blogs";
import Contact from "../components/sections/Contact";
import SEO from "../components/common/SEO";

export default function Home({ data, reducedMotion }) {
  const { profile, hero, about, techStack, projectsSection, blogsSection, journeySection, contact } = data;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://kushalpoudel2060.com.np/",
    jobTitle: "Full-Stack Developer",
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: ["Laravel", "Spring Boot", "React", "PostgreSQL", "MySQL"],
  };

  return (
    <>
      <SEO schema={schema} />
      <Hero profile={profile} hero={hero} reducedMotion={reducedMotion} />
      <Projects projectsSection={projectsSection} reducedMotion={reducedMotion} />
      <About about={about} profile={profile} reducedMotion={reducedMotion} />
      <TechStack techStack={techStack} reducedMotion={reducedMotion} />
      <Experience journeySection={journeySection} reducedMotion={reducedMotion} />
      <Blogs blogsSection={blogsSection} reducedMotion={reducedMotion} />
      <Contact contactData={contact} profile={profile} reducedMotion={reducedMotion} />
    </>
  );
}
