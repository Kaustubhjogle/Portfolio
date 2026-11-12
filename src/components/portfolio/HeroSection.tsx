import { ArrowDownRight, Clock3, CodeXml, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { HYPERLINKS } from "@/utils/Links";
import { EXPERIENCE } from "@/utils/Experience";

const mumbaiTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const socialIcons = { GitHub: Github, LinkedIn: Linkedin };

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HeroSection() {
  const [minute, setMinute] = useState(() => Math.floor(Date.now() / 60_000));
  const now = new Date(minute * 60_000);
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
            <div className="portfolio-contact-row">
              <span className="portfolio-icon"><MapPin aria-hidden="true" /></span>
              <span>{EXPERIENCE.location}</span>
            </div>
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
          <span className="portfolio-follow-note" aria-hidden="true">follow me <ArrowDownRight /></span>
          {HYPERLINKS.filter(({ name }) => name in socialIcons).map((link) => {
            const Icon = socialIcons[link.name as keyof typeof socialIcons];
            return (
              <a key={link.name} className="portfolio-icon portfolio-social" href={link.url}
                target={link.target} rel="noopener noreferrer" aria-label={link.name}>
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </section>
      <section className="portfolio-panel" aria-labelledby="greeting">
        <h2 id="greeting">{getGreeting(now.getHours())}</h2>
        <div className="portfolio-body">
          <p>I build web applications and tools for developers. At IIFL Finance, I work on digital lending software. I also built WhatTheCron, a cron translator, and PromptPane, a Chrome extension for navigating long AI chats.</p>
        </div>
      </section>
    </>
  );
}
