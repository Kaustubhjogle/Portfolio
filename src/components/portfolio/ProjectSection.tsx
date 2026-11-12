import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/utils/Projects";

export default function ProjectSection() {
  return (
    <section id="projects" className="portfolio-panel" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects <span className="portfolio-count">{PROJECTS.length}</span></h2>
      {PROJECTS.map((project) => (
        <article key={project.title} className="portfolio-body portfolio-project">
          <div className="portfolio-row-title">
            <h3>{project.title}</h3>
            <span className="portfolio-meta">{project.kind}</span>
          </div>
          <p className="portfolio-muted">{project.summary}</p>
          <div className="portfolio-project-links">
            <a className="portfolio-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.liveLabel} <ArrowUpRight aria-hidden="true" />
            </a>
            {project.githubUrl && (
              <a className="portfolio-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                Source code <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
