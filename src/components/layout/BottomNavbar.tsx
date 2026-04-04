import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = ["Intro", "Experience", "Skills", "Tech", "Projects", "Education"];

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

            // Scroll Spy Logic
            // Force select last section if user reaches the very bottom of the page
            const isBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50;
            if (isBottom) {
                setActiveSection(SECTIONS[SECTIONS.length - 1].toLowerCase());
                return;
            }

            let current = "intro";
            SECTIONS.forEach((item) => {
                const id = item.toLowerCase();
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Section is active if its top enters upper 40% of the viewport
                    if (rect.top <= window.innerHeight * 0.4) {
                        current = id;
                    }
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Trigger immediately on mount

        return () => window.removeEventListener("scroll", handleScroll);
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
