import { ArrowUpRight, ChevronsUpDown, GraduationCap } from "lucide-react";
import EntryMetadata from "./EntryMetadata";

interface Education {
  id: string;
  institution: string;
  institutionUrl?: string | null;
  period?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  details: string[];
  skills: string[];
}

const EDUCATION: Education[] = [
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

// const SKILL_PLACEHOLDERS = ["Skill 1", "Skill 2", "Skill 3"];

export default function EducationSection() {
  return (
    <section id="education" className="portfolio-panel" aria-labelledby="education-heading">
      <h2 id="education-heading"><a href="#education">Education</a></h2>
      {EDUCATION.map((school) => {
        const titleId = `education-${school.id}-title`;
        const institutionUrl = school.institutionUrl?.trim();
        // const hasSkills = school.skills.length > 0;

        return (
          <article key={school.id} id={`education-${school.id}`} aria-labelledby={titleId}
            className="portfolio-body portfolio-entry portfolio-education">
            <details>
              <summary className="portfolio-entry-summary">
                <span className="portfolio-icon portfolio-entry-icon">
                  <GraduationCap aria-hidden="true" />
                </span>
                <span className="portfolio-entry-heading">
                  <span id={titleId} className="portfolio-entry-title">{school.institution}</span>
                  <EntryMetadata fields={[
                    { label: "Study period", value: school.period },
                    { label: "Degree", value: school.degree },
                    { label: "Field of study", value: school.fieldOfStudy },
                  ]} />
                </span>
                <ChevronsUpDown className="portfolio-entry-chevron" aria-hidden="true" />
              </summary>
              <div className="portfolio-entry-details">
                <ul className="portfolio-highlights">
                  {school.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {institutionUrl && (
                  <a className="portfolio-link" href={institutionUrl} target="_blank" rel="noopener noreferrer">
                    Website <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </details>
            {/* <ul className={`portfolio-tags portfolio-entry-tags${hasSkills ? "" : " portfolio-entry-placeholder-tags"}`}
              aria-label={hasSkills ? "Skills" : "Skill placeholders"}>
              {(hasSkills ? school.skills : SKILL_PLACEHOLDERS).map((skill) => <li key={skill}>{skill}</li>)}
            </ul> */}
          </article>
        );
      })}
    </section>
  );
}
