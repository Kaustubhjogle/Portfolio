interface Experience {
  company: string;
  role: string;
  companyUrl?: string | null;
  companyLogo?: string | null;
  location?: string | null;
  workArrangement?: string | null;
  isCurrent?: boolean | null;
  employmentType?: string | null;
  period?: string | null;
  duration?: string | null;
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCE: Experience = {
  period: "2023 – Present",
  role: "Software Engineer",
  company: "IIFL Finance",
  companyLogo: "",
  location: "Mumbai, India",
  workArrangement: "",
  isCurrent: true,
  employmentType: "",
  duration: "",
  highlights: [
    "Migrated 8+ legacy modules to React for a digital lending platform that powers ₹5,000 crore+ in assets under management and ₹300 crore+ in monthly disbursals.",
    "Built responsive interfaces with React, TypeScript, Redux Toolkit, Saga, and Ant Design, improving application speed by 25%.",
  ],
  technologies: ["React", "TypeScript", "Redux Toolkit", "Ant Design"],
};

export const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/kaustubhjogle/details/recommendations/";
