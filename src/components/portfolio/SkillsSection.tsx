const SKILLS = [
  { name: "UI Architecture", level: 95 },
  { name: "API Design", level: 88 },
  { name: "Performance Optimisation", level: 85 },
  { name: "Database Modelling", level: 78 },
  { name: "DevOps & CI/CD", level: 72 },
  { name: "System Design", level: 80 },
];

const SOFT_SKILLS = [
  "Technical Writing",
  "Code Review",
  "Mentorship",
  "Cross-functional Collaboration",
  "Product Thinking",
  "Agile / Scrum",
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="group">
    <div className="flex justify-between items-baseline mb-2">
      <span className="font-mono text-xs text-ink">{name}</span>
      <span className="font-mono text-[10px] text-dim">{level}%</span>
    </div>
    <div className="h-px bg-hairline w-full relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-ink transition-all duration-1000"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">02 /</span>
        <h2 className="display-giant text-[clamp(3rem,8vw,8rem)] text-ink">SKILLS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* technical */}
        <div>
          <p className="section-label mb-8">Technical Proficiency</p>
          <div className="space-y-8">
            {SKILLS.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </div>

        {/* soft skills */}
        <div>
          <p className="section-label mb-8">Soft Skills & Practices</p>
          <div className="flex flex-wrap gap-3">
            {SOFT_SKILLS.map((s) => (
              <div
                key={s}
                className="border border-hairline px-4 py-2 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                <span className="font-mono text-xs text-dim hover:text-ink transition-colors">{s}</span>
              </div>
            ))}
          </div>

          {/* big quote */}
          <blockquote className="mt-16 border-l-2 border-ink pl-6">
            <p className="serif-italic text-xl text-ink leading-relaxed">
              "Simplicity is the ultimate sophistication — in code, as in life."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
