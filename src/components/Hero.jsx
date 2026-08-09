import { motion } from "framer-motion";
import PhotoPile from "./PhotoPile";
import { HERO, CONTACT } from "../constants";

const LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Résumé", href: CONTACT.resume },
];

const Hero = () => {
  return (
    <section
      id="top"
      className="grid items-center gap-14 py-16 md:grid-cols-[1.1fr_1fr] md:gap-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-semibold tracking-tight md:text-[3.25rem] md:leading-[1.05]">
          {HERO.greeting}
        </h1>
        {/* People have to say it out loud on a call, so just tell them. */}
        <p className="mt-3 text-sm tracking-wide text-ink/40">
          {HERO.pronunciation}
        </p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
          {HERO.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/75 transition-colors hover:border-maroon-700 hover:bg-maroon-700 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
      >
        <PhotoPile />
      </motion.div>
    </section>
  );
};

export default Hero;
