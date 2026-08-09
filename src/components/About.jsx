import Section from "./Section";
import { ABOUT_PARAGRAPHS, SKILLS } from "../constants";
import { withLinks } from "../copy";

const About = () => (
  <Section id="about" title="About">
    <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
      <div className="max-w-xl space-y-4">
        {ABOUT_PARAGRAPHS.map((p, i) => (
          <p key={i} className="leading-relaxed text-ink/80">
            {withLinks(p)}
          </p>
        ))}
      </div>

      <div className="space-y-5">
        {SKILLS.map((group) => (
          <div key={group.label}>
            <p className="text-sm font-medium text-ink">{group.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/60">
              {group.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
