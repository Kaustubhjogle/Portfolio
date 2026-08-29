const DISCIPLINES = [
  "UI Architecture",
  "API Design",
  "Performance Optimisation",
  "System Design",
  "Database Modelling",
  "DevOps & CI/CD",
];

const STACK = [
  "TypeScript",
  "JavaScript",
  "Java",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "Spring Boot",
  "REST APIs",
];

const SOFT_SKILLS = [
  "Technical Writing",
  "Code Review",
  "Mentorship",
  "Cross-functional Collaboration",
  "Product Thinking",
  "Agile / Scrum",
];

import { useSectionReveal } from "@/hooks/useSectionReveal";

const SkillsSection = () => {
  const headerRef = useSectionReveal<HTMLDivElement>();

  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24">
      <div ref={headerRef} className="flex items-center gap-6 mb-20 section-reveal">
        <h2 className="display-giant text-[clamp(1.5rem,4vw,4rem)] text-ink">SKILLS & STACK</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
        {/* disciplines */}
        <div>
          <p className="section-label mb-6">Disciplines</p>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINES.map((s) => (
              <span
                key={s}
                className="font-mono text-sm text-dim border border-hairline px-3 py-1.5 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* tech stack */}
        <div>
          <p className="section-label mb-6">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="font-mono text-sm text-dim border border-hairline px-3 py-1.5 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* soft skills */}
        <div>
          <p className="section-label mb-6">Soft Skills</p>
          <div className="flex flex-wrap gap-2">
            {SOFT_SKILLS.map((s) => (
              <span
                key={s}
                className="font-mono text-sm text-dim border border-hairline px-3 py-1.5 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
