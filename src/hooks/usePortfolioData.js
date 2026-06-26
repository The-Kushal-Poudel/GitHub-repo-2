import { useState, useEffect } from "react";
import { API_URL, apiUrl } from "../config/api.js";
import { portfolioData as defaultData } from "../data/portfolioData.js";

/** Prefix relative backend paths (e.g. /storage/…) with the API origin. */
function resolveUrl(url) {
  if (!url) return url;
  // Already absolute — leave it alone
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Relative path from backend → prepend API origin
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

const defaultSite = {
  logoInitial: "K.",
  logoName: "Kushal",
  logoHighlight: "Poudel",
  footerCopyright: `Copyright ${new Date().getFullYear()} Kushal Poudel. All rights reserved.`,
  footerCredit: "Built with React, Laravel API and Tailwind CSS",
};

const defaultNavItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "blogs", label: "Blogs", href: "#blogs" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const defaultHero = {
  title: "I build clean, fast and meaningful digital experiences.",
  primaryButton: "Download CV",
  secondaryButton: "View Projects",
  secondaryLink: "#projects",
  chips: [
    { id: "laravel", label: "Laravel", className: "left-2 top-8 z-20", delay: 0.7 },
    { id: "react", label: "React", className: "right-4 top-24 z-20 hidden sm:block", delay: 1.1 },
    { id: "java", label: "Java", className: "bottom-36 right-12 z-20 hidden sm:block", delay: 1.45 },
  ],
};

const defaultAbout = {
  label: "About Me",
  title: "Turning ideas into functional and beautiful web applications.",
  signature: "Kushal",
  cards: [],
};

const defaultContact = {
  label: "Let's Connect",
  title: "Have a project in mind? Let's build something amazing together.",
  image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  imageAlt: "Clean developer workspace with laptop",
  namePlaceholder: "Your Name",
  emailPlaceholder: "Email Address",
  messagePlaceholder: "Your Message",
  buttonText: "Send Message",
  submittingText: "Sending Message...",
  emailSubjectPrefix: "Portfolio inquiry from",
};

const defaultFaqSection = {
  label: "Frequently Asked Questions",
  title: "Got questions? I've got answers.",
  description: "Here are some of the most common things people ask me about my work, availability, and process.",
  items: [
    {
      id: "faq-availability",
      question: "Are you available for freelance or full-time work?",
      answer: "Yes! I am currently open to both freelance projects and full-time opportunities. Feel free to reach out through the contact section and let's discuss your project or job opening.",
    },
    {
      id: "faq-tech-stack",
      question: "What technologies do you specialize in?",
      answer: "I primarily work with Laravel, PHP, MySQL, and Tailwind CSS for backend and full-stack web development. I also have experience with React for frontend interfaces and Java with Spring for backend systems.",
    },
    {
      id: "faq-timeline",
      question: "How long does a typical project take?",
      answer: "It depends on the project scope and complexity. A simple website can take 1-2 weeks, while a full-featured web application with admin panel, authentication, and complex features may take 4-8 weeks or more.",
    },
    {
      id: "faq-process",
      question: "What is your development process?",
      answer: "I start by understanding the requirements and goals. Then I plan the architecture, build the backend logic, create the frontend interface, test thoroughly, and finally deploy. I maintain clear communication throughout the process.",
    },
    {
      id: "faq-collaboration",
      question: "Can you work with an existing team or codebase?",
      answer: "Absolutely. I am comfortable collaborating with teams using Git workflows, code reviews, and agile practices. I can also jump into existing codebases, understand the architecture, and contribute effectively.",
    },
    {
      id: "faq-support",
      question: "Do you provide support after project delivery?",
      answer: "Yes, I offer post-delivery support including bug fixes, minor updates, and maintenance. For ongoing support, we can discuss a maintenance plan that fits your needs and budget.",
    },
  ],
};

const defaultReviewsSection = {
  label: "Ratings & Reviews",
  title: "What people say about my work.",
  description: "Feedback from clients, colleagues, and collaborators I've had the pleasure of working with.",
  items: [
    {
      id: "review-1",
      name: "Suman Shrestha",
      role: "Project Manager, Softsaron",
      rating: 5,
      text: "Kushal delivered the travel website on time with clean code and a well-structured admin panel. His Laravel skills are impressive and he communicates clearly throughout the project.",
    },
    {
      id: "review-2",
      name: "Anisha Maharjan",
      role: "Startup Founder",
      rating: 5,
      text: "Working with Kushal was a great experience. He understood our vision quickly and built exactly what we needed. The attention to detail in both backend logic and frontend design was outstanding.",
    },
    {
      id: "review-3",
      name: "Rajesh Tamang",
      role: "Senior Developer, FoneNxt",
      rating: 4.5,
      text: "During his internship, Kushal showed exceptional dedication and quick learning ability. He picked up Java and Spring concepts fast and contributed meaningfully to our backend projects.",
    },
    {
      id: "review-4",
      name: "Priya Adhikari",
      role: "Freelance Client",
      rating: 5,
      text: "Kushal built our e-commerce dashboard with all the features we requested. The database design was solid, the UI was responsive, and he was always available for feedback and revisions.",
    },
    {
      id: "review-5",
      name: "Bikash Karki",
      role: "College Project Partner",
      rating: 4.5,
      text: "A reliable and skilled developer. Kushal handled the entire backend for our final year project. His understanding of MVC architecture and database relationships is really strong.",
    },
    {
      id: "review-6",
      name: "Nisha Gurung",
      role: "UI/UX Designer",
      rating: 5,
      text: "Kushal translated my designs into pixel-perfect, responsive pages. He respected the design system and added subtle interactions that made the final product feel polished and professional.",
    },
  ],
};

function arrayFromJson(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function updateMeta(seo = {}, profile = {}) {
  const title = seo.title || `${profile.name || "Developer"} | Portfolio`;
  const description = seo.description || profile.bio || "Developer portfolio website.";
  const ogImage = seo.ogImage || "/images/og-image.jpg";

  document.title = title;

  const upsert = (selector, attribute, content) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      const match = selector.match(/\[(name|property)="(.+)"\]/);
      if (match) tag.setAttribute(match[1], match[2]);
      document.head.appendChild(tag);
    }
    tag.setAttribute(attribute, content);
  };

  upsert('meta[name="description"]', "content", description);
  upsert('meta[property="og:title"]', "content", title);
  upsert('meta[property="og:description"]', "content", description);
  upsert('meta[property="og:image"]', "content", ogImage);
}

export function usePortfolioData() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  async function fetchData(active = true, signal = null) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl("/api/portfolio"), {
        headers: { Accept: "application/json" },
        ...(signal && { signal }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
      }

      const payload = await response.json();
      if (!active) return;

      const settings = payload.settings || {};
      const profileData = payload.profile;
      if (!profileData) {
        throw new Error("No profile found in database. Run backend migrations and seeders first.");
      }

      const seo = settings.seo || {};
      updateMeta(seo, profileData);

      const mappedData = {
        site: {
          ...defaultSite,
          ...(settings.site || {}),
          footerCopyright: settings.site?.footerCopyright || `Copyright ${new Date().getFullYear()} ${profileData.name}. All rights reserved.`,
        },
        navItems: Array.isArray(settings.navItems) && settings.navItems.length > 0 ? settings.navItems : defaultNavItems,
        profile: {
          name: profileData.name,
          role: profileData.role,
          location: profileData.location,
          email: profileData.email,
          phone: profileData.phone,
          image: resolveUrl(profileData.image_url) || "/images/pic3.webp",
          imageFallback: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80",
          cv: resolveUrl(profileData.cv_url) || "/Kushal_Poudel_CV.pdf",
          cvFileName: "Kushal_Poudel_CV.pdf",
          github: profileData.github_url || "#",
          linkedin: profileData.linkedin_url || "#",
          availability: profileData.availability || "Available for work",
          bio: profileData.bio,
        },
        hero: {
          ...defaultHero,
          ...(settings.hero || {}),
          description: settings.hero?.description || profileData.bio,
          chips: settings.hero?.chips || defaultHero.chips,
        },
        about: {
          ...defaultAbout,
          ...(settings.about || {}),
          description: settings.about?.description || profileData.bio,
        },
        techStack: {
          label: settings.techStack?.label || "Technologies I Work With",
          items: (payload.skills || []).map((skill) => ({
            id: skill.id.toString(),
            label: skill.label,
            icon: skill.icon,
          })),
        },
        projectsSection: {
          label: "Featured Projects",
          title: "Some things I have built.",
          ctaText: "Contact Me",
          ctaLink: "#contact",
          ...(settings.projectsSection || {}),
          items: (payload.projects || []).map((project) => ({
            id: project.id.toString(),
            slug: project.slug,
            title: project.title,
            description: project.description,
            techStack: arrayFromJson(project.tech_stack),
            role: project.role,
            features: arrayFromJson(project.features),
            githubLink: project.github_link,
            liveLink: project.live_link,
            status: project.status,
            image: resolveUrl(project.image_url),
            imageAlt: project.image_alt,
          })),
        },
        blogsSection: {
          label: "Latest Blogs",
          title: "Thoughts, learning and development notes.",
          description: "I write about Laravel, React, backend development, project building, and my developer journey.",
          ctaText: "Suggest a Topic",
          ctaLink: "#contact",
          ...(settings.blogsSection || {}),
          items: (payload.blogs || []).map((blog) => ({
            id: blog.id.toString(),
            title: blog.title,
            category: blog.category,
            date: blog.published_at
              ? new Date(blog.published_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
              : "Draft",
            description: blog.description,
            content: blog.content,
            link: blog.link,
          })),
        },
        journeySection: {
          label: "My Journey",
          title: "Education and Experience",
          ...(settings.journeySection || {}),
          items: (payload.experience || []).map((exp) => ({
            id: exp.id.toString(),
            year: exp.year_label,
            title: exp.title,
            company: exp.company,
            icon: exp.icon,
            text: exp.description,
          })),
        },
        faqSection: {
          ...defaultFaqSection,
          ...(settings.faqSection || {}),
          items: payload.faqs || defaultFaqSection.items,
        },
        reviewsSection: {
          ...defaultReviewsSection,
          ...(settings.reviewsSection || {}),
          items: payload.reviews || defaultReviewsSection.items,
        },
        contact: {
          ...defaultContact,
          ...(settings.contact || {}),
        },
      };

      setData(mappedData);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      if (active) setError(err.message);
    } finally {
      if (active) {
        setLoading(false);
        setReady(true);
      }
    }
  }

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    fetchData(active, controller.signal);
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return { data, loading, error, ready, refetch: () => fetchData(true) };
}