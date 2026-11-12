import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div>
        <span>© {new Date().getFullYear()} Kaustubh Jogle</span>
        <p className="portfolio-footer-credit">Built with love, LLMs and Tea</p>
      </div>
      <a className="portfolio-link" href="#top">Back to top <ArrowUp aria-hidden="true" /></a>
    </footer>
  );
}
