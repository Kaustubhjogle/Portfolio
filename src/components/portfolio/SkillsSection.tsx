import { Box } from "lucide-react";

type Technology = {
  name: string;
  url?: string;
  icon?: string;
};

const STACK: { id: string; title: string; technologies: Technology[] }[] = [
  {
    id: "languages",
    title: "Languages",
    technologies: [
      { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "typescript" },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "javascript" },
      { name: "Java", url: "https://dev.java/", icon: "java" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    technologies: [
      { name: "React", url: "https://react.dev/", icon: "react" },
      { name: "Next.js", url: "https://nextjs.org/", icon: "nextdotjs" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: "tailwindcss" },
      { name: "Framer Motion", url: "https://motion.dev/" },
      { name: "Vite", url: "https://vite.dev/", icon: "vite" },
      { name: "HTML5" }, { name: "CSS3" }, { name: "Ant Design" },
      { name: "shadcn/ui" }, { name: "Redux Toolkit" }, { name: "Redux-Saga" },
      { name: "Axios" }, { name: "Webpack" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    technologies: [
      { name: "Spring Boot", url: "https://spring.io/projects/spring-boot", icon: "springboot" },
      { name: "REST APIs", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST" },
      { name: "Spring Data JPA" }, { name: "Hibernate" }, { name: "Maven" },
      { name: "JWT Authentication" },
    ],
  },
];

const PRACTICES = [
  { id: "databases", title: "Databases", skills: ["MySQL", "SQL Server"] },
  {
    id: "tools",
    title: "Tools & Platforms",
    skills: ["Docker", "Azure Container Registry", "Azure Kubernetes Service", "Git", "GitHub Actions", "Jira", "Postman"],
  },
  {
    id: "engineering",
    title: "Engineering",
    skills: ["UI Architecture", "API Design", "Performance Optimisation", "System Design",
      "Database Modelling", "DevOps & CI/CD"],
  },
  {
    id: "collaboration",
    title: "Collaboration",
    skills: ["Technical Writing", "Code Review", "Mentorship", "Cross-functional Collaboration",
      "Product Thinking", "Agile / Scrum"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="portfolio-panel" aria-labelledby="skills-heading">
      <h2 id="skills-heading"><a href="#skills">Stack</a></h2>
      <div className="portfolio-stack">
        {STACK.map(({ id, title, technologies }, index) => (
          <div key={id} className="portfolio-stack-row">
            <h3 id={`stack-${id}`}>
              <span className="portfolio-stack-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {title}
            </h3>
            <ul aria-labelledby={`stack-${id}`} className="portfolio-stack-list">
              {technologies.map(({ name, url, icon }) => {
                const label = (
                  <>
                    {icon ? (
                      <span className="portfolio-brand-icon" style={{ maskImage: `url(/icons/${icon}.svg)` }}
                        aria-hidden="true" />
                    ) : <Box className="portfolio-stack-placeholder" aria-hidden="true" />}
                    {name}
                  </>
                );
                return (
                  <li key={name}>
                    {url ? (
                      <a className="portfolio-stack-chip" href={url} target="_blank" rel="noopener noreferrer">{label}</a>
                    ) : <span className="portfolio-stack-chip">{label}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {PRACTICES.map(({ id, title, skills }, index) => (
          <div key={id} className="portfolio-stack-row">
            <h3 id={`stack-${id}`}>
              <span className="portfolio-stack-index" aria-hidden="true">
                {String(STACK.length + index + 1).padStart(2, "0")}
              </span>
              {title}
            </h3>
            <ul aria-labelledby={`stack-${id}`} className="portfolio-stack-list">
              {skills.map((skill) => <li key={skill} className="portfolio-stack-chip">{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
