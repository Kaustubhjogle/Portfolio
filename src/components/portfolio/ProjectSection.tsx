import { PROJECTS } from "@/utils/Projects";
import { Github, ExternalLink } from "lucide-react";

const ProjectSection = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 lg:px-24">
      {/* section header */}
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">04 /</span>
        <h2 className="display-giant text-[clamp(1.5rem,4vw,4rem)] text-ink">PROJECTS</h2>
      </div>

      <div className="space-y-0">
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            className="group border-t border-hairline py-10 hover:bg-secondary/30 transition-colors duration-300 -mx-6 md:-mx-16 lg:-mx-24 px-6 md:px-16 lg:px-24"
          >
            <div className="ml-10">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="serif-italic text-4xl text-ink">{project.title}</h3>
              </div>
              <ul className="font-mono text-base text-dim leading-relaxed max-w-4xl mb-4 list-none p-0 space-y-2">
                {project.description.map((d) => (
                  <li key={d} className="flex items-start gap-3 font-mono text-base text-dim leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 bg-dim rounded-full flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs border border-hairline px-2 py-0.5 text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-dim hover:text-ink hover-line transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-dim hover:text-ink hover-line transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Try it Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
};

export default ProjectSection;
