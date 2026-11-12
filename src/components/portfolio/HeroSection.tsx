import { ArrowRight, Clock3, CodeXml, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { HYPERLINKS } from "@/utils/Links";
import { EXPERIENCE } from "@/utils/Experience";

const mumbaiTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const socialIcons = {
  X: <span className="portfolio-brand-icon portfolio-x-icon" aria-hidden="true" />,
  GitHub: <Github aria-hidden="true" />,
  LinkedIn: <Linkedin aria-hidden="true" />,
};

function getGreeting(hour: number) {
  if (hour < 5 || hour >= 22) return { heading: "Good night", line: "Still up? So is the build." };
  if (hour < 12) return { heading: "Good morning", line: "Coffee first, code second." };
  if (hour < 18) return { heading: "Good afternoon", line: "Deep in a build, probably." };
  return { heading: "Good evening", line: "One more commit?" };
}

export default function HeroSection() {
  const location = EXPERIENCE.location?.trim();
  const [minute, setMinute] = useState(() => Math.floor(Date.now() / 60_000));
  const now = new Date(minute * 60_000);
  const greeting = getGreeting(now.getHours());
  const email = HYPERLINKS.find((link) => link.name === "Email");
  const time = mumbaiTime.format(now);

  useEffect(() => {
    const interval = window.setInterval(() => setMinute(Math.floor(Date.now() / 60_000)), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <section id="intro" tabIndex={-1} aria-labelledby="portfolio-name">
        <div className="portfolio-hero">
          <h1 id="portfolio-name">Kaustubh Jogle</h1>
          <p>Software Engineer</p>
        </div>
        <div className="portfolio-contact" aria-label="Contact and location">
          <div className="portfolio-contact-column">
            <div className="portfolio-contact-row">
              <span className="portfolio-icon"><CodeXml aria-hidden="true" /></span>
              <span>{EXPERIENCE.role} @ {EXPERIENCE.company}</span>
            </div>
            {location && (
              <div className="portfolio-contact-row">
                <span className="portfolio-icon"><MapPin aria-hidden="true" /></span>
                <span>{location}</span>
              </div>
            )}
            {email && (
              <div className="portfolio-contact-row">
                <span className="portfolio-icon"><Mail aria-hidden="true" /></span>
                <a href={email.url}>{email.label}</a>
              </div>
            )}
          </div>
          <div className="portfolio-contact-column portfolio-contact-local">
            <div className="portfolio-contact-row">
              <span className="portfolio-icon"><Clock3 aria-hidden="true" /></span>
              <span><time dateTime={now.toISOString()}>{time}</time> <span className="portfolio-muted">/ IST</span></span>
            </div>
          </div>
        </div>
        <div className="portfolio-follow" aria-label="Follow me">
          <span className="portfolio-follow-note" aria-hidden="true">
            <span>follow me</span>
            <ArrowRight className="portfolio-follow-arrow-inline" />
            <svg className="portfolio-follow-arrow-gutter" viewBox="0 0 48 42" fill="none"
              stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3C7 23 17 34 44 32m-8-6 8 6-7 7" />
            </svg>
          </span>
          {HYPERLINKS.filter(({ name }) => name in socialIcons).map((link) => {
            const icon = socialIcons[link.name as keyof typeof socialIcons];
            return (
              <a key={link.name} className="portfolio-icon portfolio-social" href={link.url}
                target={link.target} rel="noopener noreferrer" aria-label={link.name}>
                {icon}
              </a>
            );
          })}
        </div>
      </section>
      <section className="portfolio-panel" aria-labelledby="greeting">
        <h2 id="greeting">{greeting.heading}</h2>
        <div className="portfolio-body">
          <p className="portfolio-greeting-line portfolio-muted">{greeting.line}</p>
          <p>Software Developer at IIFL Finance in Mumbai, India. I use React, Next.js, TypeScript, Spring Boot, and REST APIs to build fast, user-centric web apps.</p>
        </div>
      </section>
    </>
  );
}
