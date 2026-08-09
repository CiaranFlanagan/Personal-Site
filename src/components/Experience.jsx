import Section from "./Section";
import { EXPERIENCES } from "../constants";

const Experience = () => (
  <Section id="work" title="Work">
    <div className="space-y-9">
      {EXPERIENCES.map((exp) => (
        <div
          key={`${exp.company}-${exp.range}`}
          className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8"
        >
          <p className="text-sm text-ink/50">{exp.range}</p>

          <div className="max-w-2xl">
            <h3 className="font-medium">
              {exp.role}
              {" at "}
              {exp.href ? (
                <a
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-maroon-700 underline decoration-maroon-700/30 underline-offset-2 hover:decoration-maroon-700"
                >
                  {exp.company}
                </a>
              ) : (
                <span className="text-ink/70">{exp.company}</span>
              )}
            </h3>
            <p className="mt-2 leading-relaxed text-ink/70">{exp.description}</p>
            <p className="mt-2 text-sm text-ink/45">{exp.technologies.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Experience;
