import { ArrowUpRight, BriefcaseBusiness, Building2, ChevronsUpDown } from "lucide-react";
import { EXPERIENCE, RECOMMENDATIONS_URL } from "@/utils/Experience";
import EntryMetadata from "./EntryMetadata";

export default function ExperienceSection() {
  const companyUrl = EXPERIENCE.companyUrl?.trim();
  const companyLogo = EXPERIENCE.companyLogo?.trim();
  const location = EXPERIENCE.location?.trim();
  const workArrangement = EXPERIENCE.workArrangement?.trim();

  return (
    <>
      <section id="experience" className="portfolio-panel" aria-labelledby="experience-heading">
        <h2 id="experience-heading"><a href="#experience">Experience</a></h2>
        <article className="portfolio-body portfolio-experience" aria-labelledby="experience-company">
          <header className="portfolio-experience-company">
            <span className="portfolio-icon portfolio-entry-icon">
              {companyLogo ? (
                <img src={companyLogo} alt="" loading="lazy" />
              ) : <Building2 aria-hidden="true" />}
            </span>
            <div className="portfolio-experience-company-details">
              <h3 id="experience-company">
                {companyUrl ? (
                  <a className="portfolio-link" href={companyUrl} target="_blank" rel="noopener noreferrer">
                    {EXPERIENCE.company}
                  </a>
                ) : EXPERIENCE.company}
              </h3>
              {(location || workArrangement || EXPERIENCE.isCurrent) && (
                <p className="portfolio-experience-location">
                  {location && <span>{location}</span>}
                  {workArrangement && <span>{location ? `(${workArrangement})` : workArrangement}</span>}
                  {EXPERIENCE.isCurrent && (
                    <span className="portfolio-current-employer"><span className="sr-only">Current employer</span></span>
                  )}
                </p>
              )}
            </div>
          </header>
          <div className="portfolio-entry">
            <details open>
              <summary className="portfolio-entry-summary">
                <span className="portfolio-icon portfolio-entry-icon"><BriefcaseBusiness aria-hidden="true" /></span>
                <span className="portfolio-entry-heading">
                  <span className="portfolio-entry-title">{EXPERIENCE.role}</span>
                  <EntryMetadata fields={[
                    { label: "Employment type", value: EXPERIENCE.employmentType },
                    { label: "Employment period", value: EXPERIENCE.period },
                    { label: "Duration", value: EXPERIENCE.duration },
                  ]} />
                </span>
                <ChevronsUpDown className="portfolio-entry-chevron" aria-hidden="true"/>
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
