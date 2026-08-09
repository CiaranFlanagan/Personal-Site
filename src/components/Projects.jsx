import { FiArrowUpRight } from "react-icons/fi";
import Section from "./Section";
import { PROJECTS } from "../constants";

const Projects = () => (
  <Section id="projects" title="Side projects">
    <div className="grid gap-8 md:grid-cols-2">
      {PROJECTS.map((project) => (
        <a
          key={project.title}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg border border-ink/10 bg-white/50 p-6 transition-colors hover:border-maroon-700/40 hover:bg-maroon-100/40"
        >
          <h3 className="flex items-center gap-1 font-medium">
            {project.title}
            <FiArrowUpRight className="text-ink/30 transition-colors group-hover:text-maroon-700" />
          </h3>
          <p className="mt-3 leading-relaxed text-ink/70">{project.description}</p>
          <p className="mt-3 text-sm text-ink/45">{project.tech.join(", ")}</p>
        </a>
      ))}
    </div>
  </Section>
);

export default Projects;
