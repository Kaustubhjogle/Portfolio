type Project = {
  title: string;
  kind: string;
  summary: string;
  description: string[];
  liveLabel: string;
  liveUrl: string;
  githubUrl?: string;
  image?: { src: string; alt: string };
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "WhatTheCron",
    kind: "Web app",
    summary: "Build cron schedules visually or translate them to and from plain English.",
    liveLabel: "Live",
    description: [
      "Built a full-stack two-way cron expression translator — a visual field builder(cron → plain English) and an AI powered natural language input (plain English → cron) using the Gemini API",
      "Designed and implemented a REST API endpoint using Next.js Route Handlers to proxy requests to the Gemini API server-side, ensuring the API key is never exposed to the browser or visible in client-side code",
      // "Architected unidirectional data flow with a single state object and a reusable FieldToggle component across all 5 cron fields, applying deliberate Server vs Client Component boundaries for performance and SEO"
    ],
    tags: [],
    githubUrl: "https://github.com/Kaustubhjogle/What-The-Cron",
    liveUrl: "https://what-the-cron.vercel.app/",
  },
  {
    title: "PromptPane",
    kind: "Chrome extension",
    summary: "Jump to past prompts in long ChatGPT, Claude, and Gemini conversations.",
    liveLabel: "Chrome Web Store",
    description: [
      "Lost track of a message 40 scrolls up in a ChatGPT conversation. Built a Chrome extension instead of scrolling again.",
      "PromptPane adds a navigable prompt index to AI chat interfaces every message you sent, with a reply preview, clickable to jump straight there",
      "Ships to real users on the Chrome Web Store. Works on ChatGPT, Gemini, and Claude.",
    ],
    tags: [],
    liveUrl:
      "https://chromewebstore.google.com/detail/promptpane/ejijlepcjdgncielegenkmglcbleacbl",
  },
];
