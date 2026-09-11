import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "framer-motion";
import Header, { ScrollProgress } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import { portfolioData } from "./data/portfolioData";

export default function App() {
  const reducedMotion = useReducedMotion();
  const { site, navItems, profile } = portfolioData;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0c10] text-[#11131a]">
      <ScrollProgress reducedMotion={reducedMotion} />
      <Header site={site} navItems={navItems} reducedMotion={reducedMotion} />

      <Routes>
        <Route path="/" element={<Home data={portfolioData} reducedMotion={reducedMotion} />} />
        <Route path="/project/:slug" element={<ProjectDetail data={portfolioData} reducedMotion={reducedMotion} />} />
        <Route path="/blog/:id" element={<BlogDetail data={portfolioData} reducedMotion={reducedMotion} />} />
      </Routes>

      <Footer site={site} profile={profile} reducedMotion={reducedMotion} />
      <Analytics />
    </main>
  );
}
