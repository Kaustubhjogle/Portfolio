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
  period: "June 2023 – Present",
  role: "Full Stack Developer",
  company: "IIFL Finance",
  companyLogo: "",
  location: "Mumbai, India",
  workArrangement: "",
  isCurrent: true,
  employmentType: "",
  duration: "",
  highlights: [
    "Migrated 8+ legacy modules to React and TypeScript for a digital lending platform supporting over ₹5,000 crore in assets under management and ₹300 crore in monthly disbursals.",
    "Automated underwriting, KYC verification, agreement signing, and mandate processing with React, Redux Toolkit, Redux-Saga, and REST APIs, reducing manual intervention by 60%.",
    "Built Java Spring Boot REST APIs for loan management and migrated MySQL stored-procedure logic into Spring Data JPA repositories and Hibernate-backed services.",
    "Integrated financial services from TransUnion CIBIL, FinBox, Sentinel, and Phonon into the lending workflow.",
    "Led vulnerability assessment and penetration testing across frontend and backend systems, coordinating audits and remediating high-risk findings in line with OWASP standards.",
    "Containerized React applications with Docker and automated deployments through Azure Container Registry and Azure Kubernetes Service, with rolling updates, automatic rollback, and audit logs.",
    "Ran user acceptance testing across three business-critical modules and resolved production bugs, with zero major rollback incidents.",
    "Coordinated sprint delivery with five cross-functional teams across product, backend, QA, compliance, and operations.",
  ],
  technologies: ["React", "TypeScript", "Redux Toolkit", "Redux-Saga", "Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Docker", "Azure Kubernetes Service"],
};

export const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/kaustubhjogle/details/recommendations/";
