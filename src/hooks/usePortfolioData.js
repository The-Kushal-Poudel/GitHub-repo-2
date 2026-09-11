import { useEffect, useState } from "react";
import { API_ENABLED, API_URL, apiUrl } from "../config/api.js";
import { portfolioData as defaultData } from "../data/portfolioData.js";
import cmsSnapshot from "../data/cmsSnapshot.json";

const toneCycle = ["ink", "forest", "sand", "blue", "sunset", "plum"];

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

function resolveAssetUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;

  // Backend uploads are exposed from /storage. Frontend-owned assets such as
  // /images/* and /project Images/* should stay relative to the React app.
  if (url.startsWith("/storage/") || url.startsWith("storage/")) {
    const normalized = url.startsWith("/") ? url : `/${url}`;
    return `${API_URL}${normalized}`;
  }

  return url.startsWith("/") ? url : `/${url}`;
}

function downloadUrl(url) {
  if (!url) return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}

function paragraphs(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== "string") return [];

  return value
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !/^#\s+/.test(part));
}

function classifySkills(skills) {
  const groups = {
    Backend: [],
    Frontend: [],
    Data: [],
    Workflow: [],
  };

  const backend = new Set(["laravel", "php", "spring", "spring boot", "java", "rest api", "rest apis"]);
  const frontend = new Set(["react", "tailwind css", "javascript", "vite", "blade", "html", "css"]);
  const data = new Set(["postgresql", "mysql", "sql", "room", "room db", "sqlite"]);
  const workflow = new Set(["git", "docker", "vercel", "render", "stripe", "github"]);

  skills.forEach((skill) => {
    const label = skill.label?.trim();
    if (!label) return;
    const key = label.toLowerCase();

    if (backend.has(key)) groups.Backend.push(label);
    else if (frontend.has(key)) groups.Frontend.push(label);
    else if (data.has(key)) groups.Data.push(label);
    else if (workflow.has(key)) groups.Workflow.push(label);
    else groups.Workflow.push(label);
  });

  return Object.entries(groups)
    .filter(([, items]) => items.length)
    .map(([name, items]) => ({ name, items }));
}

function updateMeta(seo = {}, profile = {}) {
  const title = seo.title || `${profile.name || "Kushal Poudel"} | Full-Stack Developer`;
  const description = seo.description || profile.bio || defaultData.hero.description;
  const ogImage = seo.ogImage || "/images/pic3.webp";

  document.title = title;

  const upsert = (selector, kind, key, content) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(kind, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  upsert('meta[name="description"]', "name", "description", description);
  upsert('meta[property="og:title"]', "property", "og:title", title);
  upsert('meta[property="og:description"]', "property", "og:description", description);
  upsert('meta[property="og:image"]', "property", "og:image", ogImage);
}

function mergePortfolio(payload) {
  const settings = payload.settings || {};
  const profileData = payload.profile;

  const profile = profileData
    ? {
        ...defaultData.profile,
        name: profileData.name || defaultData.profile.name,
        role: profileData.role || defaultData.profile.role,
        location: profileData.location || defaultData.profile.location,
        email: profileData.email || defaultData.profile.email,
        phone: profileData.phone || defaultData.profile.phone,
        image: resolveAssetUrl(profileData.image_url) || defaultData.profile.image,
        cv: downloadUrl(resolveAssetUrl(profileData.cv_url)) || defaultData.profile.cv,
        github: profileData.github_url || defaultData.profile.github,
        linkedin: profileData.linkedin_url || defaultData.profile.linkedin,
        availability: profileData.availability || defaultData.profile.availability,
        bio: profileData.bio || defaultData.profile.bio,
      }
    : defaultData.profile;

  const hasProjectPayload = Array.isArray(payload.projects);
  const backendProjects = hasProjectPayload ? payload.projects : [];
  const projectItems = hasProjectPayload
    ? backendProjects.map((project, index) => {
        const fallback = defaultData.projectsSection.items.find((item) => item.slug === project.slug) || {};
        const rawImages = arrayFromJson(project.images);
        const images = rawImages.map((image) => ({
          ...image,
          url: resolveAssetUrl(image?.url),
        }));
        const firstImage = images.find((image) => image?.url)?.url || null;
        const hasBackendImageField = project.images !== null && project.images !== undefined;

        return {
          ...fallback,
          id: String(project.id ?? fallback.id ?? project.slug),
          slug: project.slug || fallback.slug,
          title: project.title || fallback.title,
          kicker: fallback.kicker || project.role || "Project",
          description: project.description || fallback.description || "",
          techStack: arrayFromJson(project.tech_stack).length
            ? arrayFromJson(project.tech_stack)
            : (fallback.techStack || []),
          role: project.role || fallback.role || "Full-stack development",
          features: arrayFromJson(project.features).length
            ? arrayFromJson(project.features)
            : (fallback.features || []),
          githubLink: project.github_link || fallback.githubLink || null,
          liveLink: project.live_link || fallback.liveLink || null,
          status: project.status || fallback.status || "Project",
          images,
          image: hasBackendImageField ? firstImage : (fallback.image || null),
          imageAlt: images[0]?.alt || fallback.imageAlt || `${project.title || fallback.title || "Project"} preview`,
          challenge:
            fallback.challenge ||
            "The challenge was turning real product requirements into reliable workflows, clear data rules, and a usable interface without making the system fragile.",
          problem:
            fallback.problem ||
            project.description ||
            "The project needed a dependable product flow that could handle real requirements without becoming difficult to maintain.",
          contribution:
            fallback.contribution ||
            project.role ||
            "I worked across the implementation, business rules, and user-facing flow to turn the requirements into a maintainable product.",
          architecture:
            fallback.architecture ||
            ["Input", "Business rules", "Application flow", "Output"],
          decisions:
            fallback.decisions ||
            [
              "Keep business rules explicit instead of hiding important state changes inside the interface.",
              "Prefer maintainable boundaries that make future changes safer.",
              "Design backend behavior and user flow together so edge cases have one clear source of truth.",
            ],
          outcome:
            fallback.outcome ||
            "The result is a maintainable product flow with clearer boundaries, safer state changes, and room to keep evolving the feature set.",
          takeaway:
            fallback.takeaway ||
            "The project reflects how I approach product work: understand the workflow first, then make the implementation support it cleanly.",
          tone: fallback.tone || toneCycle[index % toneCycle.length],
        };
      })
    : defaultData.projectsSection.items;

  const hasBlogPayload = Array.isArray(payload.blogs);
  const backendBlogs = hasBlogPayload ? payload.blogs : [];
  const blogItems = hasBlogPayload
    ? backendBlogs.map((blog) => ({
        id: String(blog.id),
        title: blog.title,
        category: blog.category || "Notes",
        date: blog.published_at
          ? new Date(blog.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
          : "Draft",
        description: blog.description || "",
        content: paragraphs(blog.content),
        link: blog.link || null,
      }))
    : defaultData.blogsSection.items;

  const hasExperiencePayload = Array.isArray(payload.experience);
  const backendExperience = hasExperiencePayload ? payload.experience : [];
  const journeyItems = hasExperiencePayload
    ? backendExperience.map((item) => ({
        id: String(item.id),
        period: item.year_label,
        title: item.title,
        company: item.company,
        text: item.description,
        icon: item.icon,
      }))
    : defaultData.journeySection.items;

  const hasSkillPayload = Array.isArray(payload.skills);
  const backendSkills = hasSkillPayload ? payload.skills : [];
  const backendSkillGroups = hasSkillPayload ? classifySkills(backendSkills) : [];

  const site = { ...defaultData.site, ...(settings.site || {}) };
  const navItems = Array.isArray(settings.navItems) && settings.navItems.length
    ? settings.navItems
    : defaultData.navItems;

  const hero = {
    ...defaultData.hero,
    ...(settings.hero || {}),
    signals: settings.hero?.signals || defaultData.hero.signals,
    stack: settings.hero?.stack || defaultData.hero.stack,
  };

  const about = {
    ...defaultData.about,
    ...(settings.about || {}),
    principles: settings.about?.principles || defaultData.about.principles,
  };

  const techStack = {
    ...defaultData.techStack,
    ...(settings.techStack || {}),
    groups: settings.techStack?.groups || (hasSkillPayload ? backendSkillGroups : defaultData.techStack.groups),
  };

  const projectsSection = {
    ...defaultData.projectsSection,
    ...(settings.projectsSection || {}),
    items: projectItems,
  };

  const blogsSection = {
    ...defaultData.blogsSection,
    ...(settings.blogsSection || {}),
    items: blogItems,
  };

  const journeySection = {
    ...defaultData.journeySection,
    ...(settings.journeySection || {}),
    items: journeyItems,
  };

  const contact = {
    ...defaultData.contact,
    ...(settings.contact || {}),
  };

  updateMeta(settings.seo || {}, profile);

  return {
    ...defaultData,
    site,
    navItems,
    profile,
    hero,
    about,
    techStack,
    projectsSection,
    blogsSection,
    journeySection,
    contact,
  };
}

const hasBundledSnapshot = Boolean(cmsSnapshot && Object.keys(cmsSnapshot).length);
const bundledData = hasBundledSnapshot ? mergePortfolio(cmsSnapshot) : defaultData;

export function usePortfolioData() {
  const [data, setData] = useState(bundledData);
  const [loading, setLoading] = useState(API_ENABLED);
  const [error, setError] = useState(null);

  async function fetchData(signal) {
    if (!API_ENABLED) {
      setData(bundledData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl("/api/portfolio"), {
        headers: { Accept: "application/json" },
        signal,
      });

      if (!response.ok) {
        throw new Error(`Laravel API returned ${response.status}`);
      }

      const payload = await response.json();
      setData(mergePortfolio(payload));
    } catch (err) {
      if (err.name === "AbortError") return;
      console.warn("Portfolio API unavailable; using bundled fallback data.", err);
      setError(err.message || "Backend unavailable");
      setData(bundledData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    data,
    loading,
    error,
    backendEnabled: API_ENABLED,
    refetch: () => fetchData(undefined),
  };
}
