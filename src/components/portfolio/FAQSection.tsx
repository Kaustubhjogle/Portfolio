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
      "Yes — I'm currently available for full-time software engineering roles. You can reach me via email, connect on LinkedIn, or check out my work on GitHub. Links are at the top and bottom of this page.",
  },
];
import { useSectionReveal } from "@/hooks/useSectionReveal";

const FAQSection = () => {
  const headerRef = useSectionReveal<HTMLDivElement>();

  return (
    <section id="faq" className="py-32 px-6 md:px-16 lg:px-24">
      <div ref={headerRef} className="flex items-center gap-6 mb-20 section-reveal">
        <h2 className="display-giant text-[clamp(1.5rem,4vw,4rem)] text-ink">FAQ</h2>
      </div>

      <div className="space-y-0">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="group border-t border-hairline py-10 hover:bg-secondary/30 transition-colors duration-300 -mx-6 md:-mx-16 lg:-mx-24 px-6 md:px-16 lg:px-24"
          >
            <h3 className="serif-italic text-2xl md:text-3xl text-ink mb-4">
              {faq.question}
            </h3>
            <p className="font-mono text-base text-dim leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </div>
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
};

export default FAQSection;
