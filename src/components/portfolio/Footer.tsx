import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <span>© {new Date().getFullYear()} Kaustubh Jogle</span>
      <a className="portfolio-link" href="#top">Back to top <ArrowUp aria-hidden="true" /></a>
    </footer>
  );
}
