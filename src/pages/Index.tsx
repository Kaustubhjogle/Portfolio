import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectSection from "@/components/portfolio/ProjectSection";
import EducationSection from "@/components/portfolio/EducationSection";
import FAQSection from "@/components/portfolio/FAQSection";
import Footer from "@/components/portfolio/Footer";
import RobotGame from "@/components/game/RobotGame";
import GameToggle from "@/components/game/GameToggle";
import "./portfolio.css";

export default function Index() {
  const [gameActive, setGameActive] = useState(false);

  return (
    <div id="top" className="portfolio-v2">
      <a className="portfolio-skip" href="#intro">Skip to content</a>
      <header className="portfolio-header">
        <div className="portfolio-column portfolio-header-inner">
          <a href="#top" className="portfolio-wordmark" aria-label="Kaustubh Jogle home">KJ</a>
          <nav aria-label="Portfolio">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="/Kaustubh_Jogle_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      <main className="portfolio-column">
        <HeroSection />
        <ExperienceSection />
        <ProjectSection />
        <SkillsSection />
        <EducationSection />
        <FAQSection />
        <Footer />
      </main>
      <RobotGame active={gameActive} />
      <GameToggle active={gameActive} onToggle={() => setGameActive((active) => !active)} />
    </div>
  );
}
