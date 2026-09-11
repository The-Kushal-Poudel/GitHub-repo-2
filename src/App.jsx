import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import { usePortfolioData } from "./hooks/usePortfolioData";

function RoutePolish({ reducedMotion }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "start",
          });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, reducedMotion]);

  return null;
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const { data } = usePortfolioData();
  const { site, navItems, profile } = data;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f3ee] text-[#171817]">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <RoutePolish reducedMotion={reducedMotion} />
      <ScrollProgress reducedMotion={reducedMotion} />
      <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />

      <main id="main-content" tabIndex="-1" className="outline-none">
        <Routes>
          <Route path="/" element={<Home data={data} reducedMotion={reducedMotion} />} />
          <Route path="/project/:slug" element={<ProjectDetail data={data} reducedMotion={reducedMotion} />} />
          <Route path="/blog/:id" element={<BlogDetail data={data} reducedMotion={reducedMotion} />} />
          <Route path="*" element={<NotFound profile={profile} />} />
        </Routes>
      </main>

      <Footer site={site} profile={profile} />
      <Analytics />
    </div>
  );
}
