import { HYPERLINKS } from "@/utils/Links";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-12 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
      <div className="flex flex-col items-center md:items-start">
        <p className="display-giant text-2xl text-ink">KAUSTUBH JOGLE</p>
        <p className="font-mono text-xs text-dim mt-1">Available for full-time roles</p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-4 md:gap-2">
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
          {HYPERLINKS?.map((link) => (
            <a key={link?.name} href={link?.url} target={link?.target} className="font-mono text-xs text-dim hover-line text-center">
              {link?.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] text-dim">© {year} — Designed & built with care</p>
      </div>
    </footer>
  );
};

export default Footer;
