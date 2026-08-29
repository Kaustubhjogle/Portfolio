import { HYPERLINKS } from "@/utils/Links";
import { useEffect, useState } from "react";

const ROLES = ["Software Engineer", "Full-Stack Developer", "Front-End Developer", "Backend Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(revealTimer);
  }, []);

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
    <section
      id="intro"
      className="@container min-h-dvh flex flex-col justify-between pt-[clamp(5rem,12cqi,8rem)] pb-[clamp(1rem,3cqi,3rem)] px-[clamp(1rem,4cqi,6rem)] relative"
    >
      {/* top nav — absolute so it overlays the hero, container-query-driven layout */}
      <nav className="absolute top-0 left-0 right-0 flex flex-col items-center gap-2 @md:flex-row @md:justify-between @md:gap-0 px-[clamp(1rem,4cqi,6rem)] py-[clamp(1rem,2cqi,2.5rem)] z-10">
        <a
          href="/Kaustubh_Jogle_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="section-label hover-line transition-colors hover:text-ink py-3 inline-flex items-center justify-center"
        >
          Download CV
        </a>
        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-0 @sm:gap-x-2 @md:gap-x-3">
          {["Intro", "Experience", "Skills", "Projects", "Education"].map((item, index, array) => (
            <span key={item} className="flex items-center gap-1 @sm:gap-2 @md:gap-3">
              <a
                href={`#${item.toLowerCase()}`}
                className="section-label hover-line transition-colors hover:text-ink py-3 px-1 inline-flex items-center"
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

      {/* giant name — authored clip-path reveal */}
      <div className="my-auto flex flex-col justify-center items-center w-full py-[clamp(2rem,6cqi,6rem)] overflow-hidden z-10 relative">
        <p
          className="section-label mb-2 text-[clamp(0.875rem,2cqi,1.25rem)] transition-opacity duration-500 ease-out"
          style={{ opacity: revealed ? 1 : 0 }}
        >
          Hello, I am
        </p>
        <div className="flex flex-wrap items-end justify-center gap-[clamp(0.5rem,1.5cqi,1.25rem)]">
          <h1 className="display-giant text-[clamp(2rem,12cqi,6rem)] text-ink leading-none relative flex flex-wrap items-end justify-center gap-[clamp(0.5rem,1.5cqi,1.25rem)]">
            <span
              className="hero-reveal"
              style={{
                clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              KAUSTUBH
            </span>
            <span
              className="hero-reveal"
              style={{
                clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
              }}
            >
              JOGLE
            </span>
          </h1>
          <span
            className="serif-italic text-[clamp(1rem,3cqi,2rem)] text-dim mb-1 max-md:mb-0 pb-0 relative transition-opacity duration-500 ease-out"
            style={{
              opacity: revealed ? 1 : 0,
              transitionDelay: '0.9s',
            }}
          >
            .dev
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col z-10 relative">
        {/* typewriter role */}
        <div className="mt-[clamp(1rem,3cqi,2rem)] flex items-center gap-2">
          <span className="section-label mr-2">Currently —</span>
          <span className="font-mono text-[clamp(0.75rem,2cqi,1rem)] text-ink">
            {displayed}
            <span className="animate-cursor-blink">|</span>
          </span>
        </div>

        {/* bottom strip — container-query-driven row/column switch */}
        <div className="mt-[clamp(1rem,3cqi,2rem)] border-t border-hairline py-[clamp(1rem,2cqi,1.5rem)] flex flex-col items-center gap-4 @md:flex-row @md:justify-between @md:items-end @md:gap-0">
          <p className="font-mono text-[clamp(0.7rem,1.5cqi,0.875rem)] text-dim max-w-xs leading-relaxed text-center @md:text-left">
            Building thoughtful software with an obsession for detail, performance, and craft.{" "}
            <a href="#experience" className="text-ink hover-line">
              See my work experience →
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-3 @md:gap-[clamp(1rem,2cqi,1.5rem)]">
            {HYPERLINKS?.map((link) => (
              <a
                key={link.name}
                href={link?.url}
                target={link?.target}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="section-label hover-line py-3 inline-flex items-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
