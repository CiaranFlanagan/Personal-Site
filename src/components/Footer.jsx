import NowPlaying from "./NowPlaying";
import { CONTACT, FOOTER_NOTE } from "../constants";

const Footer = () => (
  <footer className="space-y-4 border-t border-ink/10 py-10">
    <NowPlaying />
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
