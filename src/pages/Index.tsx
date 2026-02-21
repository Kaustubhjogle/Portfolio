import HeroSection from "@/components/portfolio/HeroSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import TechSection from "@/components/portfolio/TechSection";
import EducationSection from "@/components/portfolio/EducationSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="bg-paper min-h-screen">
      {/* subtle noise overlay for texture */}
      <div className="noise-overlay" />

      <HeroSection />

      {/* section divider */}
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <ExperienceSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <SkillsSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <TechSection />
      <div className="h-px bg-hairline mx-6 md:mx-16 lg:mx-24" />

      <EducationSection />

      <Footer />
    </div>
  );
};

export default Index;
