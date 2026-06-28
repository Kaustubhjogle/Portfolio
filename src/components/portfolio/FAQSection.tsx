const FAQS = [
  {
    question: "What technologies does Kaustubh work with?",
    answer:
      "Kaustubh works primarily with TypeScript, JavaScript, and Java. On the frontend, he uses React, Next.js, Tailwind CSS, Framer Motion, and Vite. On the backend, he works with Java, Spring Boot, and REST APIs. He has strong skills in UI Architecture, API Design, Performance Optimisation, System Design, Database Modelling, and DevOps/CI/CD.",
  },
  {
    question: "What is Kaustubh's professional experience?",
    answer:
      "Kaustubh is currently a Software Engineer at IIFL Finance in Mumbai, India, where he has been working since 2023. He designs and develops scalable, user-friendly interfaces and has migrated 8+ legacy modules to a modern React-based stack for IIFL's digital lending platform, which powers 5,000 Cr+ AUM and 300 Cr+ monthly disbursals.",
  },
  {
    question: "What projects has Kaustubh built?",
    answer:
      "Kaustubh has built WhatTheCron, a full-stack two-way cron expression translator with AI-powered natural language input using the Gemini API, and PromptPane, a Chrome extension that adds a navigable prompt index to AI chat interfaces like ChatGPT, Gemini, and Claude. PromptPane is available on the Chrome Web Store.",
  },
  // {
  //   question: "Is Kaustubh available for hire?",
  //   answer:
  //     "Kaustubh is currently available for full-time software engineering roles. You can reach him via email at kaustubhrjogle@gmail.com, connect on LinkedIn, or view his work on GitHub.",
  // },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">06 /</span>
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
