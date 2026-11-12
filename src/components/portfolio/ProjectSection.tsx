import { ExternalLink, Github, Image } from "lucide-react";
import { PROJECTS } from "@/utils/Projects";

export default function ProjectSection() {
  return (
    <section id="projects" className="portfolio-panel" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects <span className="portfolio-count">{PROJECTS.length}</span></h2>
      <div className="portfolio-body portfolio-projects">
        {PROJECTS.map((project) => (
          <article key={project.title} className="portfolio-project">
            <div className="portfolio-project-media">
              {project.image ? (
                <img src={project.image.src} alt={project.image.alt} loading="lazy" />
              ) : (
                <div className="portfolio-project-placeholder">
                  <Image aria-hidden="true" />
                  <span>Project image</span>
                </div>
              )}
            </div>
            <div className="portfolio-project-details">
              <div className="portfolio-project-header">
                <h3>{project.title}</h3>
                <div className="portfolio-project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`${project.liveLabel}: ${project.title}`}>
                    <ExternalLink aria-hidden="true" /> {project.liveLabel}
                  </a>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`GitHub: ${project.title}`}>
                      <Github aria-hidden="true" /> GitHub
                    </a>
                  )}
                </div>
              </div>
              <p className="portfolio-muted">{project.summary}</p>
              <h4>Technologies Used</h4>
              <ul className={`portfolio-tags${project.tags.length ? "" : " portfolio-project-tag-placeholders"}`}>
                {(project.tags.length ? project.tags : ["Tag 1", "Tag 2", "Tag 3"]).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
