import { FiArrowUpRight } from "react-icons/fi";
import Section from "./Section";
import { PROJECTS } from "../constants";

/*
 * These carry the engineering claims the résumé leads on, and they were the
 * faintest thing on the page: two small boxes of grey text below the fold.
 * Full-width rows instead, so the descriptions get a readable measure, with
 * the repo path shown rather than left to a hover.
 */
const Projects = () => (
  <Section id="projects" title="Side projects">
    <div className="space-y-4">
      {PROJECTS.map((project) => (
        <a
          key={project.title}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-ink/10 bg-white/60 p-6 transition-colors hover:border-maroon-700/40 hover:bg-maroon-100/40 md:p-7"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {project.title}
            </h3>
            <span className="flex items-center gap-1 text-sm text-ink/45 transition-colors group-hover:text-maroon-700">
              {project.href.replace("https://", "")}
              <FiArrowUpRight aria-hidden />
            </span>
          </div>

          <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-ink/10 px-2.5 py-0.5 text-xs text-ink/55"
              >
                {tech}
              </li>
            ))}
          </ul>
        </a>
      ))}
    </div>
  </Section>
);

export default Projects;
