import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { portfolioData } from "./data/portfolioData";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

export default function App() {
  const reducedMotion = useReducedMotion();
  const { site, navItems, profile } = portfolioData;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#171712] selection:bg-[#d8ff57] selection:text-[#171712]">
      <ScrollProgress reducedMotion={reducedMotion} />
      <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />

      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes>
          <Route path="/" element={<Home data={portfolioData} reducedMotion={reducedMotion} />} />
          <Route path="/project/:slug" element={<ProjectDetail data={portfolioData} reducedMotion={reducedMotion} />} />
          <Route path="/blog/:id" element={<BlogDetail data={portfolioData} reducedMotion={reducedMotion} />} />
        </Routes>
      </Suspense>

      <Footer site={site} profile={profile} reducedMotion={reducedMotion} />
      <Analytics />
    </main>
  );
}
