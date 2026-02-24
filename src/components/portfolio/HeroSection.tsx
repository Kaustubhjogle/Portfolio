import { HYPERLINKS } from "@/utils/Links";
import { useEffect, useRef, useState } from "react";

const ROLES = ["Software Engineer", "Full-Stack Developer", "Front-End Developer", "Backend Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="intro" className="min-h-screen flex flex-col justify-start pt-24 md:pt-32 pb-0 px-6 md:px-16 lg:px-24 relative">
      {/* top nav */}
      <nav className="absolute top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center px-6 md:px-16 lg:px-24 py-6 md:py-10 gap-4 md:gap-0">
        <a href="/Kaustubh_Jogle_Resume.pdf" target="_blank" rel="noopener noreferrer" className="section-label hover-line transition-colors hover:text-ink">
          Download CV
        </a>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
          {["Intro", "Experience", "Skills", "Tech", "Education"].map((item, index, array) => (
            <span key={item} className="flex items-center gap-2 md:gap-3">
              <a
                href={`#${item.toLowerCase()}`}
                className="section-label hover-line transition-colors hover:text-ink"
              >
                {item}
              </a>
              {index < array.length - 1 && (
                <span className="section-label text-dim pb-0.5">/</span>
              )}
            </span>
          ))}
        </div>
      </nav>

      {/* giant name */}
      <div className="overflow-hidden flex flex-col justify-center items-center align-center h-[500px]">
        <p className="section-label mb-2">Hello, I am</p>
        <div className="flex flex-wrap items-end gap-3 md:gap-5">
          <h1 className="display-giant text-[clamp(1.2rem,6vw,6rem)] text-ink leading-none">
            KAUSTUBH
          </h1>
          <h1 className="display-giant text-[clamp(1.2rem,6vw,6rem)] text-ink leading-none">
            JOGLE
          </h1>
          <span className="serif-italic text-[clamp(0.8rem,1.5vw,1.5rem)] text-dim mb-1 max-md:mb-0 pb-0">
            .dev
          </span>
        </div>
      </div>

      {/* typewriter role */}
      <div className="mt-8 flex items-center gap-2">
        <span className="section-label mr-2">Currently —</span>
        <span className="font-mono text-sm text-ink">
          {displayed}
          <span className="animate-cursor-blink">|</span>
        </span>
      </div>

      {/* bottom strip */}
      <div className="mt-12 border-t border-hairline py-6 md:pt-6 md:pb-0 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-0">
        <p className="font-mono text-xs text-dim max-w-xs leading-relaxed text-center md:text-left">
          Building thoughtful software with an obsession for detail, performance, and craft.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {HYPERLINKS?.map((link) => (
            <a key={link.name} href={link?.url} target={link?.target} rel={link.name !== "Email" ? "noopener noreferrer" : undefined} className="section-label hover-line">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
