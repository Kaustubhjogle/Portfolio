const EXPERIENCES = [
  {
    year: "2023 — Now",
    role: "Software Engineer",
    company: "IIFL Finance",
    location: "Mumbai, India",
    description:
      "Designed and developed scalable, user-friendly interfaces and migrated 8+ legacy modules to a modern React-based stack for IIFL’s digital lending platform, powering 5,000 Cr+ AUM and 300 Cr+ monthly disbursals. Implemented responsive UIs using React, TypeScript, Redux Toolkit, Saga, and Ant Design, improving application speed by 25%",
    tags: ["React", "TypeScript", "Next.js"],
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-16 lg:px-24">
      {/* section header */}
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">01 /</span>
        <h2 className="display-giant text-[clamp(3rem,8vw,8rem)] text-ink">EXPERIENCE</h2>
      </div>

      <div className="space-y-0">
        {EXPERIENCES.map((exp, i) => (
          <div
            key={i}
            className="group border-t border-hairline py-10 grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 hover:bg-secondary/30 transition-colors duration-300 -mx-6 md:-mx-16 lg:-mx-24 px-6 md:px-16 lg:px-24"
          >
            {/* year */}
            <div className="pt-1">
              <span className="font-mono text-xs text-dim">{exp.year}</span>
            </div>

            {/* content */}
            <div>
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="serif-italic text-2xl text-ink">{exp.role}</h3>
                <span className="section-label">@ {exp.company}</span>
              </div>
              <p className="font-mono text-xs text-dim leading-relaxed max-w-xl mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] border border-hairline px-2 py-0.5 text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* location */}
            <div className="pt-1 text-right">
              <span className="font-mono text-[10px] text-dim">{exp.location}</span>
            </div>
          </div>
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
};

export default ExperienceSection;
