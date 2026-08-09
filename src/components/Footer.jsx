import NowPlaying from "./NowPlaying";
import { CONTACT, FOOTER_NOTE, PROFILE_LINKS as LINKS } from "../constants";

const Footer = () => (
  <footer className="space-y-4 border-t border-ink/10 py-10">
    <NowPlaying />
    {/* The page used to trail off. Repeating the links here means it ends on
        something to do rather than on a full stop. */}
    <div className="flex flex-wrap gap-2">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/75 transition-colors hover:border-maroon-700 hover:bg-maroon-700 hover:text-paper"
        >
          {link.label}
        </a>
      ))}
    </div>

    <div className="flex flex-col gap-2 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
      <a
        href={`mailto:${CONTACT.email}`}
        className="text-ink/70 underline decoration-ink/20 underline-offset-2 transition-colors hover:text-maroon-700"
      >
        {CONTACT.email}
      </a>
      <p>Boston, MA</p>
    </div>
    {/* Otherwise the colour is just a colour. */}
    <p className="text-sm text-ink/40">{FOOTER_NOTE}</p>
  </footer>
);

export default Footer;
