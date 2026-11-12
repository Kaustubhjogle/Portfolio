import { ArrowUpRight, Building2, CalendarDays, MapPin } from "lucide-react";
import { EXPERIENCE, RECOMMENDATIONS_URL } from "@/utils/Experience";

export default function ExperienceSection() {
  return (
    <>
      <section id="experience" className="portfolio-panel" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <article className="portfolio-body portfolio-record">
          <div className="portfolio-icon portfolio-record-icon"><Building2 aria-hidden="true" /></div>
          <div>
            <h3>{EXPERIENCE.company}</h3>
            <p className="portfolio-meta"><MapPin aria-hidden="true" />{EXPERIENCE.location}</p>
            <div className="portfolio-role">
              <h4>{EXPERIENCE.role}</h4>
              <p className="portfolio-meta"><CalendarDays aria-hidden="true" />{EXPERIENCE.period}</p>
              <ul className="portfolio-highlights">
                {EXPERIENCE.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              <ul className="portfolio-tags" aria-label="Technologies">
                {EXPERIENCE.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
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
