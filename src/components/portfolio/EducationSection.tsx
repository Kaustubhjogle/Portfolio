const EDUCATION = [
  {
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "Thadomal Shahani Engineering College",
    year: "2021 — 2023",
    details: [
      "Graduated with Distinction — CGPA 9.58",
    ],
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Shri Bhagubhai Mafatlal Polytechnic",
    year: "2017 - 2022",
    details: [
      "Percentage: 94.80%"
    ],
  },
  {
    degree: "SSC",
    institution: "John XXIII High School",
    year: "2016 - 2017",
    details: [
      "Percentage: 90.60%",
    ],
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">04 /</span>
        <h2 className="display-giant text-[clamp(3rem,8vw,8rem)] text-ink">EDUCATION</h2>
      </div>

      <div className="space-y-16">
        {EDUCATION.map((edu, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 group">
            <div>
              <span className="font-mono text-xs text-dim">{edu.year}</span>
            </div>
            <div className="border-t border-hairline pt-8 md:pt-0 md:border-t-0 md:border-l md:border-hairline md:pl-8">
              <h3 className="display-giant text-3xl text-ink mb-1">{edu.degree.toUpperCase()}</h3>
              <p className="serif-italic text-sm text-dim mb-4">{edu.institution}</p>
              <ul className="space-y-2">
                {edu.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 font-mono text-xs text-dim leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 bg-dim rounded-full flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
