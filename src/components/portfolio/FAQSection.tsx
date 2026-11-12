import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What technologies do I work with?",
    answer:
      "I work primarily with TypeScript, JavaScript, and Java. On the frontend, I use React, Next.js, Tailwind CSS, Framer Motion, and Vite. On the backend, I work with Java, Spring Boot, and REST APIs. My strongest areas are UI Architecture, API Design, Performance Optimisation, System Design, Database Modelling, and DevOps/CI/CD.",
  },
  {
    question: "What's my professional experience?",
    answer:
      "I'm currently a Software Engineer at IIFL Finance in Mumbai, where I've been since 2023. I design and develop scalable, user-friendly interfaces and have migrated 8+ legacy modules to a modern React-based stack for IIFL's digital lending platform, which powers 5,000 Cr+ AUM and 300 Cr+ monthly disbursals.",
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
