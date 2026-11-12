import { ArrowUpRight, CalendarDays, GraduationCap } from "lucide-react";

const EDUCATION = [
  {
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "Thadomal Shahani Engineering College",
    institutionUrl: "https://tsec.edu",
    year: "2021 – 2023",
    details: [
      "Graduated with Distinction — CGPA 9.58",
    ],
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Shri Bhagubhai Mafatlal Polytechnic",
    institutionUrl: "https://sbmp.ac.in",
    year: "2017 – 2022",
    details: [
      "Percentage: 94.80%"
    ],
  },
  {
    degree: "SSC",
    institution: "John XXIII High School",
    institutionUrl: undefined,
    year: "2016 – 2017",
    details: [
      "Percentage: 90.60%",
    ],
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="portfolio-panel" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      {EDUCATION.map((school) => (
        <article key={school.institution} className="portfolio-body portfolio-record">
          <div className="portfolio-icon portfolio-record-icon"><GraduationCap aria-hidden="true" /></div>
          <div>
            <h3>
              {school.institutionUrl ? (
                <a className="portfolio-link" href={school.institutionUrl} target="_blank" rel="noopener noreferrer">
                  {school.institution} <ArrowUpRight aria-hidden="true" />
                </a>
              ) : school.institution}
            </h3>
            <p className="portfolio-meta"><CalendarDays aria-hidden="true" />{school.year}</p>
            <div className="portfolio-role">
              <h4>{school.degree}</h4>
              {school.details.map((detail) => <p key={detail} className="portfolio-muted">{detail}</p>)}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
