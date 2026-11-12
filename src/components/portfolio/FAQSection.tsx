import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What technologies do I work with?",
    answer:
      "I build frontend applications with React, Next.js, TypeScript, and Redux Toolkit. For backend work I use Java, Spring Boot, REST APIs, Spring Data JPA, Hibernate, and MySQL. I also use Docker and CI/CD pipelines to deploy applications to Azure Kubernetes Service.",
  },
  {
    question: "What's my professional experience?",
    answer:
      "I’ve been a Full Stack Developer at IIFL Finance in Mumbai since June 2023. I migrated 8+ legacy modules to React and TypeScript and helped automate lending workflows, reducing manual intervention by 60%. My work also covers Spring Boot APIs, database migration, security audits, and Azure deployments.",
  },
  {
    question: "What have I built?",
    answer:
      "I built WhatTheCron, a full-stack two-way cron expression translator with AI-powered natural language input using the Gemini API, and PromptPane, a Chrome extension that adds a navigable prompt index to AI chat interfaces like ChatGPT, Gemini, and Claude. PromptPane is live on the Chrome Web Store.",
  },
  {
    question: "Am I available for hire?",
    answer:
      "Yes — I'm currently available for full-time software engineering roles. You can reach me via email, connect on LinkedIn, or check out my work on GitHub. Contact links are at the top of this page.",
  },
];
export default function FAQSection() {
  return (
    <section id="faq" className="portfolio-panel" aria-labelledby="faq-heading">
      <h2 id="faq-heading">FAQ</h2>
      {FAQS.map(({ question, answer }) => (
        <details key={question} className="portfolio-faq">
          <summary>{question}<ChevronDown aria-hidden="true" /></summary>
          <p className="portfolio-muted">{answer}</p>
        </details>
      ))}
    </section>
  );
}
