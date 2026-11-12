import { ArrowUpRight, BriefcaseBusiness, Building2, ChevronsUpDown } from "lucide-react";
import { EXPERIENCE, RECOMMENDATIONS_URL } from "@/utils/Experience";

export default function ExperienceSection() {
  return (
    <>
      <section id="experience" className="portfolio-panel" aria-labelledby="experience-heading">
        <h2 id="experience-heading"><a href="#experience">Experience</a></h2>
        <article className="portfolio-body portfolio-experience" aria-labelledby="experience-company">
          <header className="portfolio-experience-company">
            <span className="portfolio-icon portfolio-entry-icon">
              {EXPERIENCE.companyLogo ? (
                <img src={EXPERIENCE.companyLogo} alt="" loading="lazy" />
              ) : <Building2 aria-hidden="true" />}
            </span>
            <div className="portfolio-experience-company-details">
              <h3 id="experience-company">
                <a className="portfolio-link" href={EXPERIENCE.companyUrl} target="_blank" rel="noopener noreferrer">
                  {EXPERIENCE.company}
                </a>
              </h3>
              <p className="portfolio-experience-location">
                <span>{EXPERIENCE.location}</span>
                <span className={EXPERIENCE.workArrangement ? undefined : "portfolio-entry-placeholder"}>
                  ({EXPERIENCE.workArrangement || "Work arrangement TBD"})
                </span>
                {EXPERIENCE.isCurrent && (
                  <span className="portfolio-current-employer"><span className="sr-only">Current employer</span></span>
                )}
              </p>
            </div>
          </header>
          <div className="portfolio-entry">
            <details>
              <summary className="portfolio-entry-summary">
                <span className="portfolio-icon portfolio-entry-icon"><BriefcaseBusiness aria-hidden="true" /></span>
                <span className="portfolio-entry-heading">
                  <span className="portfolio-entry-title">{EXPERIENCE.role}</span>
                  <span className="portfolio-entry-meta">
                    <span className={EXPERIENCE.employmentType ? undefined : "portfolio-entry-placeholder"}>
                      {EXPERIENCE.employmentType && <span className="sr-only">Employment type: </span>}
                      {EXPERIENCE.employmentType || "Employment type TBD"}
                    </span>
                    <span><span className="sr-only">Employment period: </span>{EXPERIENCE.period}</span>
                    <span className={EXPERIENCE.duration ? undefined : "portfolio-entry-placeholder"}>
                      {EXPERIENCE.duration && <span className="sr-only">Duration: </span>}
                      {EXPERIENCE.duration || "Duration TBD"}
                    </span>
                  </span>
                </span>
                <ChevronsUpDown className="portfolio-entry-chevron" aria-hidden="true" />
              </summary>
              <div className="portfolio-entry-details">
                <ul className="portfolio-highlights">
                  {EXPERIENCE.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </details>
            <ul className="portfolio-tags portfolio-entry-tags" aria-label="Technologies">
              {EXPERIENCE.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
        </article>
      </section>
      <section className="portfolio-panel portfolio-thanks" aria-labelledby="thanks-heading">
        <h2 id="thanks-heading">Big thanks</h2>
        <div className="portfolio-body">
          <p>The best way to learn about me is through the people I've worked with:</p>
          <a className="portfolio-link" href={RECOMMENDATIONS_URL} target="_blank" rel="noopener noreferrer">
            Read recommendations on LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
