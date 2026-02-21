import { HYPERLINKS } from "@/utils/Links";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-12 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <p className="display-giant text-2xl text-ink">KAUSTUBH JOGLE</p>
        <p className="font-mono text-xs text-dim mt-1">Available for full-time roles</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-6">
          {HYPERLINKS?.map((link) => (
            <a key={link?.name} href={link?.url} target={link?.target} className="font-mono text-xs text-dim hover-line">
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
