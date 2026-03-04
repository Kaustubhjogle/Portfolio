import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = ["Intro", "Experience", "Skills", "Tech", "Education"];

const BottomNavbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");

    useEffect(() => {
        const handleScroll = () => {
            // The top navbar gets generally out of view after scrolling down ~400px (Hero section holds it at the top)
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px" } // Adjust margins to trigger when section is in roughly top-middle of screen
        );

        SECTIONS.forEach((item) => {
            const element = document.getElementById(item.toLowerCase());
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
            )}
        >
            <nav className="bg-paper/90 backdrop-blur-md border border-hairline rounded-full px-6 py-3 flex items-center justify-center gap-4 md:gap-6 shadow-xl shadow-black/5 min-w-[320px]">
                {SECTIONS.map((item) => {
                    const isActive = activeSection === item.toLowerCase();
                    return (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={cn(
                                "font-mono text-xs md:text-sm transition-colors cursor-pointer",
                                isActive ? "text-ink font-bold" : "text-dim hover:text-ink"
                            )}
                        >
                            {item}
                        </a>
                    );
                })}
            </nav>
        </div>
    );
};

export default BottomNavbar;
