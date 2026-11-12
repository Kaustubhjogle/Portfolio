type Project = {
  title: string;
  summary: string;
  liveLabel?: string;
  liveUrl?: string;
  githubUrl: string;
  image?: { src: string; alt: string };
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "WhatTheCron",
    summary:
      "Build cron expressions visually or translate schedules to and from plain English with Gemini.",
    githubUrl: "https://github.com/Kaustubhjogle/What-The-Cron",
    liveUrl: "https://what-the-cron.vercel.app",
    image: {
      src: "/projects/what-the-cron.png",
      alt: "WhatTheCron project preview",
    },
    tags: ["Next.js", "React", "TypeScript", "Gemini API"],
  },
  {
    title: "PromptPane",
    summary:
      "Jump to past prompts in long ChatGPT, Claude, and Gemini conversations from a searchable index in Chrome.",
    githubUrl: "https://github.com/Kaustubhjogle/PromptPane",
    liveUrl:
      "https://chromewebstore.google.com/detail/promptpane/ejijlepcjdgncielegenkmglcbleacbl",
    liveLabel: "Chrome Web Store",
    image: {
      src: "/projects/promptpane.png",
      alt: "PromptPane extension icon",
    },
    tags: ["JavaScript", "Chrome Extensions"],
  },
  {
    title: "Uncommit the Dead",
    summary:
      "Rediscover unfinished side projects in a haunted graveyard that reads Git history and drafts revival ideas with local AI.",
    githubUrl: "https://github.com/Kaustubhjogle/Uncommit-the-Dead",
    liveUrl: "https://uncommit-the-dead.vercel.app",
    image: {
      src: "/projects/uncommit-the-dead.png",
      alt: "Uncommit the Dead project preview",
    },
    tags: ["Next.js", "React", "TypeScript", "Ollama"],
  },
  {
    title: "Swatch Studio",
    summary:
      "Explore 50 shades and seven palettes on a 3D filament swatch wheel. Lift, compare, and copy individual colours.",
    githubUrl: "https://github.com/Kaustubhjogle/swatch-studio",
    liveUrl: "https://swatch-studio.vercel.app",
    tags: ["React", "Three.js", "JavaScript"],
    image: { src: "/projects/swatch-studio.png", alt: "Swatch Studio preview" },
  },
  {
    title: "Next of Care",
    summary:
      "Turn discharge documents and prescriptions into editable care handoffs, medicine trackers, and weekly schedules in the browser.",
    githubUrl: "https://github.com/Kaustubhjogle/Next-Of-Care",
    liveUrl: "https://next-of-care.vercel.app",
    tags: ["React", "TypeScript", "Transformers.js", "PDF.js", "Tesseract.js"],
    image: { src: "/projects/next-of-care.png", alt: "Next of Care preview" },
  },
  {
    title: "PayUnfold",
    summary:
      "Review an Indian job offer for terms to ask about, then compare monthly fixed pay with a payslip.",
    githubUrl: "https://github.com/Kaustubhjogle/pay-unfold",
    image: {
      src: "/projects/pay-unfold.png",
      alt: "PayUnfold project preview",
    },
    tags: ["Next.js", "React", "JavaScript", "PDF.js"],
  },
  {
    title: "Platform to Park",
    summary:
      "Turn a Mumbai train or metro stop into a short outdoor mission using nearby green spaces and wildlife observations.",
    githubUrl: "https://github.com/Kaustubhjogle/platform-to-park",
    tags: ["Next.js", "TypeScript", "OpenStreetMap", "iNaturalist", "Ollama"],
  },
  {
    title: "Aaj Kya Banega?",
    summary:
      "A local-first meal planner that suggests what to cook from the ingredients already in your fridge.",
    githubUrl: "https://github.com/Kaustubhjogle/AajKyaBanega",
    liveUrl: "https://aaj-kya-banega-steel.vercel.app",
    tags: ["Next.js", "React", "TypeScript", "Motion"],
  },
  {
    title: "Bhai Ke Dohe",
    summary: "Browse an archive of Salman Khan’s posts on X.",
    githubUrl: "https://github.com/Kaustubhjogle/Bhai-Ke-Dohe",
    liveUrl: "https://bhaikedohe.vercel.app",
    image: {
      src: "/projects/bhaikedohe.png",
      alt: "Bhai Ke Dohe project preview",
    },
    tags: ["React", "Vite", "X API"],
  },
  {
    title: "Samarth Dasbodh",
    summary:
      "A distraction-free reader for the Dasbodh with Dashak and Samas navigation and an Ovi reading view.",
    githubUrl: "https://github.com/Kaustubhjogle/SamarthDasbodh",
    liveUrl: "https://samarth-dasbodh.vercel.app",
    image: {
      src: "/projects/samarth-dasbodh.png",
      alt: "Samarth Dasbodh project preview",
    },
    tags: ["Next.js", "TypeScript", "HeroUI", "Framer Motion"],
  },
  {
    title: "Ankidex",
    summary:
      "Create decks and flashcards, then review them on a spaced-repetition schedule.",
    githubUrl: "https://github.com/Kaustubhjogle/Ankidex",
    liveUrl: "https://ankidex.vercel.app",
    tags: ["Next.js", "TypeScript", "Supabase", "HeroUI"],
    image: { src: "/projects/ankidex.png", alt: "Ankidex project preview" },
  },
  {
    title: "Health Highway",
    summary:
      "A prototype connecting rural health workers with doctors and resources, including hospital and blood-bank information.",
    githubUrl: "https://github.com/Kaustubhjogle/Health-Highway",
    image: {
      src: "/projects/health-highway.png",
      alt: "Health Highway project preview",
    },
    tags: ["HTML", "CSS"],
  },
  {
    title: "Farmify",
    summary:
      "An Arduino system that remotely controls farm equipment over GSM and reports temperature and humidity.",
    githubUrl: "https://github.com/Kaustubhjogle/Farmify",
    tags: ["Arduino", "C++", "GSM", "DHT22", "ThingSpeak"],
  },
];
