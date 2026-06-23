import { useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import TechSection from "@/components/portfolio/TechSection";
import ProjectSection from "@/components/portfolio/ProjectSection";
import EducationSection from "@/components/portfolio/EducationSection";
import Footer from "@/components/portfolio/Footer";
import BottomNavbar from "@/components/layout/BottomNavbar";
import RobotGame from "@/components/game/RobotGame";
import GameToggle from "@/components/game/GameToggle";

const Index = () => {
  const [gameActive, setGameActive] = useState(false);

  return (
    <div className="bg-paper min-h-screen">
      {/* subtle noise overlay for texture */}
      <div className="noise-overlay" />

      <HeroSection />
      <BottomNavbar />

      {/* section divider */}
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <ExperienceSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <SkillsSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <TechSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <ProjectSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <EducationSection />

      <Footer />

      <RobotGame active={gameActive} />
      <GameToggle active={gameActive} onToggle={() => setGameActive(!gameActive)} />
    </div>
  );
};

export default Index;
