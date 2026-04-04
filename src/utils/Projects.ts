export const PROJECTS = [
    {
        title: "WhatTheCron — Cron Expression Builder & AI Translator",
        description: [
            "Built a full-stack two-way cron expression translator — a visual field builder(cron → plain English) and an AI powered natural language input (plain English → cron) using the Anthropic Claude API",
            "Designed and implemented a REST API endpoint using Next.js Route Handlers to proxy requests to the Gemini API server-side, ensuring the API key is never exposed to the browser or visible in client-side code",
            // "Architected unidirectional data flow with a single state object and a reusable FieldToggle component across all 5 cron fields, applying deliberate Server vs Client Component boundaries for performance and SEO"
        ],
        tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "REST API", "Gemini API"],
        githubUrl: "https://github.com/Kaustubhjogle/What-The-Cron",
        liveUrl: "https://what-the-cron.vercel.app/"
    }
];