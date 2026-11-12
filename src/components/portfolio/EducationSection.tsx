import { ArrowUpRight, ChevronsUpDown, GraduationCap } from "lucide-react";

const EDUCATION = [
  {
    id: "tsec",
    institution: "Thadomal Shahani Engineering College",
    institutionUrl: "https://tsec.edu",
    period: "2021 – 2023",
    degree: "Bachelor of Technology",
    fieldOfStudy: "Computer Engineering",
    details: ["Graduated with Distinction — CGPA 9.58"],
    skills: [],
  },
  {
    id: "sbmp",
    institution: "Shri Bhagubhai Mafatlal Polytechnic",
    institutionUrl: "https://sbmp.ac.in",
    period: "2017 – 2022",
    degree: "Diploma",
    fieldOfStudy: "Computer Engineering",
    details: ["Percentage: 94.80%"],
    skills: [],
  },
  {
    id: "john-xxiii",
    institution: "John XXIII High School",
    institutionUrl: undefined,
    period: "2016 – 2017",
    degree: "SSC",
    fieldOfStudy: undefined,
    details: ["Percentage: 90.60%"],
    skills: [],
  },
];

const SKILL_PLACEHOLDERS = ["Skill 1", "Skill 2", "Skill 3"];

export default function EducationSection() {
  return (
    <section id="education" className="portfolio-panel" aria-labelledby="education-heading">
      <h2 id="education-heading"><a href="#education">Education</a></h2>
      {EDUCATION.map((school) => {
        const titleId = `education-${school.id}-title`;
        const hasSkills = school.skills.length > 0;

        return (
          <article key={school.id} id={`education-${school.id}`} aria-labelledby={titleId}
            className="portfolio-body portfolio-education">
            <details>
              <summary className="portfolio-education-summary">
                <span className="portfolio-icon portfolio-education-icon">
                  <GraduationCap aria-hidden="true" />
                </span>
                <span className="portfolio-education-heading">
                  <span id={titleId} className="portfolio-education-title">{school.institution}</span>
                  <span className="portfolio-education-meta">
                    <span><span className="sr-only">Study period: </span>{school.period}</span>
                    <span><span className="sr-only">Degree: </span>{school.degree}</span>
                    <span className={school.fieldOfStudy ? undefined : "portfolio-education-placeholder"}>
                      {school.fieldOfStudy && <span className="sr-only">Field of study: </span>}
                      {school.fieldOfStudy ?? "Field of study TBD"}
                    </span>
                  </span>
                </span>
                <ChevronsUpDown className="portfolio-education-chevron" aria-hidden="true" />
              </summary>
              <div className="portfolio-education-details">
                <ul className="portfolio-highlights">
                  {school.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {school.institutionUrl && (
                  <a className="portfolio-link" href={school.institutionUrl} target="_blank" rel="noopener noreferrer">
                    School website <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </details>
            <ul className={`portfolio-tags portfolio-education-skills${hasSkills ? "" : " portfolio-education-placeholder-tags"}`}
              aria-label={hasSkills ? "Skills" : "Skill placeholders"}>
              {(hasSkills ? school.skills : SKILL_PLACEHOLDERS).map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
