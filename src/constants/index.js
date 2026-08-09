export const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Photos", id: "photos" },
];

export const HERO = {
  greeting: "Hi, I'm Ciarán.",
  intro:
    "I'm a CS and Biology student at Northeastern, from Watertown, Massachusetts.",
};

export const ABOUT_PARAGRAPHS = [
  "I like programming. Designing things, and working out how to put them together.",
  "I added Biology more recently. I've always thought life was interesting: how detailed it is, and how exactly right it has to be to work at all. So far I've taken genetics, organic chemistry, and comparative vertebrate anatomy.",
  "Both my parents are from Ireland, so most of my family is still over there and I visit often. I grew up in Watertown playing hurling and Gaelic football, went to Catholic Memorial, and now play for Galway Boston GAA. Liverpool, Celtics, Patriots.",
  "I've been a TA for four semesters and ran OASIS. I like teaching and working with people.",
];

export const SKILLS = [
  {
    label: "Languages",
    items: ["Java", "Python", "Go", "SQL", "TypeScript", "JavaScript", "Kotlin", "Swift", "Bash", "Racket"],
  },
  {
    label: "Frameworks & tools",
    items: ["React", "FastAPI", "Express.js", "Pandas", "NumPy", "Scikit-learn", "Claude Code"],
  },
  {
    label: "DevOps & data",
    items: ["Docker", "AWS", "PostgreSQL", "MongoDB", "Git", "GitHub Actions", "Terraform", "Prometheus"],
  },
];

export const EXPERIENCES = [
  {
    range: "Jun to Aug 2026",
    role: "Software Engineer Intern",
    company: "Walmart Global Tech",
    location: "Bentonville, AR",
    description:
      "Cut new-market CI/CD onboarding from two days to fifteen minutes, extending the Kotlin and Swift generators that scaffold market apps across Walmart's iOS and Android monorepos. Shipped a stale-PR bot that closed 2,000+ abandoned pull requests in its first month.",
    technologies: ["Kotlin", "Swift", "CI/CD", "GitHub Actions"],
  },
  {
    range: "Jul to Dec 2025",
    role: "Software Engineer Co-op",
    company: "NExT Consulting (client: Via Separations)",
    location: "Boston, MA",
    description:
      "Built a full-stack warehouse management system on React, FastAPI, and PostgreSQL. Designed a 50+ table relational schema, a two-phase inventory move workflow with lot splitting, and a seven-workflow CI pipeline.",
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "AWS"],
  },
  {
    range: "Aug 2024 to present",
    role: "Teaching Assistant",
    company: "Northeastern University",
    location: "Boston, MA",
    description:
      "Test-driven development, design patterns, and object-oriented design, from the intro sequence through upper-level software engineering. TypeScript, Racket, and Java.",
    technologies: ["TypeScript", "Racket", "Java"],
  },
  {
    range: "May 2024 to May 2026",
    role: "Executive Board President",
    company: "OASIS",
    location: "Boston, MA",
    href: "https://oasisneu.com/",
    description:
      "Led a 120-student cohort and matched mentors to 25 teams building full-stack applications. Wrote the curriculum on React, Node.js, PostgreSQL, and API design, and ran eight workshops.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
];

export const PROJECTS = [
  {
    title: "bioflow",
    tech: ["Go", "Docker", "Prometheus"],
    description:
      "A job engine for containerized pipelines. It works out which steps depend on which, runs the independent ones at the same time, and skips anything whose inputs haven't changed. If a run dies partway through it picks up from the last step that finished.",
    href: "https://github.com/CiaranFlanagan/bioflow",
  },
  {
    title: "agenteval",
    tech: ["Python", "SQLite", "pytest"],
    description:
      "Tracing and regression evaluation for LLM agents. Records tool calls, tokens, latency, and cost per run, then compares two versions and flags what changed. 96% test coverage across 30 tests.",
    href: "https://github.com/CiaranFlanagan/agenteval",
  },
];

/* Photo groups are the folder names inside src/assets/photos/.
   These two maps only control display: a new folder works without touching
   either, it just gets a title-cased name and sorts to the end. */
export const GROUP_LABELS = {
  ireland: "Ireland",
  sicily: "Sicily",
  arkansas: "Arkansas",
  teaching: "Teaching",
};

export const GROUP_ORDER = ["ireland", "teaching", "arkansas", "sicily"];

/* Captions are optional, keyed by "<folder>/<filename>".
   Photos without one still show up, just uncaptioned. */
export const PHOTO_CAPTIONS = {
  "teaching/oasis-workshop.jpg": "Running a React workshop for OASIS.",
  "ireland/cobh.jpg": "Cobh, Co. Cork.",
  "sicily/etna.jpg": "Above the clouds on Etna.",
  "sicily/taormina.jpg": "Taormina, Sicily.",
  "sicily/cefalu.jpg": "Cefalù, Sicily.",
  "arkansas/hawksbill-crag.jpg": "Hawksbill Crag, Arkansas.",
};

export const CONTACT = {
  email: "flanagan.ci@northeastern.edu",
  github: "https://github.com/CiaranFlanagan",
  linkedin: "https://www.linkedin.com/in/ciaranflanagan1/",
  resume: "/resume.pdf",
};
