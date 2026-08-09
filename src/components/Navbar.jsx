import { useEffect, useState } from "react";
import { NAV_LINKS } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState(null);

  // Highlights whichever section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      // Band across the upper-middle of the viewport, so the highlight changes
      // when a section reaches reading position rather than when it first peeks in.
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={(e) => handleScroll(e, "top")}
          className="shrink-0 font-medium tracking-tight"
        >
          {/* The full name wraps and crowds the links on narrow screens. */}
          <span className="sm:hidden">Ciarán</span>
          <span className="hidden sm:inline">Ciarán Flanagan</span>
        </a>
        <ul className="flex items-center gap-4 text-sm sm:gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative transition-colors hover:text-maroon-700 ${
                  active === link.id ? "text-maroon-700" : "text-ink/60"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-maroon-700 transition-all duration-300 ${
                    active === link.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
