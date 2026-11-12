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

const GROUPS = [
  { title: "Technologies", skills: STACK },
  { title: "Engineering", skills: DISCIPLINES },
  { title: "Collaboration", skills: SOFT_SKILLS },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="portfolio-panel" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Stack</h2>
      {GROUPS.map(({ title, skills }) => (
        <div key={title} className="portfolio-body portfolio-stack">
          <h3>{title}</h3>
          <ul className="portfolio-tags">
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
