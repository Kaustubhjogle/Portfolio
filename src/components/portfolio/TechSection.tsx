const STACK = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Java", "Rust (learning)"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { category: "Backend", items: ["Java", "Spring Boot", "REST APIs"] },
  // { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  // { category: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "AWS", "Linux"] },
  // { category: "Tools", items: ["Figma", "Vim / Neovim", "Git", "Postman", "Linear"] },
];

const TechSection = () => {
  return (
    <section id="tech" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="flex items-center gap-6 mb-20">
        <span className="section-label">03 /</span>
        <h2 className="display-giant text-[clamp(3rem,8vw,8rem)] text-ink">TECH STACK</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
        {STACK.map((group) => (
          <div key={group.category} className="bg-paper p-8 hover:bg-secondary/20 transition-colors duration-200">
            <p className="section-label mb-5">{group.category}</p>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-ink rounded-full flex-shrink-0" />
                  <span className="font-mono text-sm text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechSection;
