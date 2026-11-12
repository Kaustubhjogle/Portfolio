import { ExternalLink, Github, Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/utils/Projects";

const FEATURED_COUNT = 3;

export default function ProjectSection() {
  const [showAll, setShowAll] = useState(false);
  const firstAdditionalProject = useRef<HTMLElement>(null);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, FEATURED_COUNT);

  useEffect(() => {
    if (showAll) firstAdditionalProject.current?.focus();
  }, [showAll]);

  return (
    <section id="projects" className="portfolio-panel" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects <span className="portfolio-count">{PROJECTS.length}</span></h2>
      <div id="project-list" className="portfolio-body portfolio-projects">
        {visibleProjects.map((project, index) => (
          <article key={project.title} className="portfolio-project"
            ref={index === FEATURED_COUNT ? firstAdditionalProject : undefined}
            tabIndex={index === FEATURED_COUNT ? -1 : undefined}
            aria-label={project.title}>
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
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`${project.liveLabel ?? "Live"}: ${project.title}`}>
                      <ExternalLink aria-hidden="true" /> {project.liveLabel ?? "Live"}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`GitHub: ${project.title}`}>
                      <Github aria-hidden="true" /> GitHub
                    </a>
                  )}
                </div>
              </div>
              <p className="portfolio-muted">{project.summary}</p>
              {project.tags.length > 0 && (
                <>
                  <h4>Technologies Used</h4>
                  <ul className="portfolio-tags">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
      {PROJECTS.length > FEATURED_COUNT && (
        <div className="portfolio-project-toggle">
          <button type="button" aria-expanded={showAll} aria-controls="project-list"
            onClick={() => {
              if (showAll) document.getElementById("projects-heading")?.scrollIntoView({ block: "start" });
              setShowAll(!showAll);
            }}>
            {showAll ? "View fewer" : "View more"}
          </button>
        </div>
      )}
    </section>
  );
}
