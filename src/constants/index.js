/* Linked from several places: the Work entry, the About paragraph, and a photo
   caption. One constant so they cannot drift apart. */
export const OASIS_URL = "https://oasisneu.com/";

export const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Photos", id: "photos" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
];

export const HERO = {
  greeting: "Hi, I'm Ciarán.",
  // Shown next to the name. People have to say it out loud on calls.
  pronunciation: "(KEER-awn)",
  intro:
    "I'm a CS and Biology student at Northeastern, from Watertown, Massachusetts.",
};

export const ABOUT_PARAGRAPHS = [
  "I like programming. Designing things, and working out how to put them together.",
  "I added Biology more recently. I've always thought life was interesting: how detailed it is, and how exactly right it has to be to work at all. So far I've taken genetics, organic chemistry, and comparative vertebrate anatomy.",
  "Both my parents are from Ireland, so most of my family is still over there and I visit often. I grew up in Watertown playing hurling and Gaelic football, went to Catholic Memorial, and now play for Galway Boston GAA. Liverpool, Celtics, Patriots.",
  `I've been a TA for four semesters and ran [OASIS](${OASIS_URL}). I like teaching and working with people.`,
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
    href: OASIS_URL,
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
      "Tracing and regression evaluation for LLM agents. Records tool calls, tokens, latency, and cost per run, then compares two versions and flags what changed, including the metrics nobody was watching.",
    href: "https://github.com/CiaranFlanagan/agenteval",
  },
];

/* Photo groups are the folder names inside src/assets/photos/.
   These two maps only control display: a new folder works without touching
   either, it just gets a title-cased name and sorts to the end. */
export const GROUP_LABELS = {
  massachusetts: "Massachusetts",
  ireland: "Ireland",
  sicily: "Sicily",
  "costa-rica": "Costa Rica",
  arkansas: "Arkansas",
  "new-york": "New York",
  southwest: "Utah & Arizona",
};

export const GROUP_ORDER = [
  "massachusetts",
  "ireland",
  "sicily",
  "costa-rica",
  "arkansas",
  "new-york",
  "southwest",
];

/* Where each group's dot sits on the map, in the viewBox units of
   worldPaths.js. These come out of scripts/gen-map; rerun it if the projection
   window changes. Points are the city, not the address: a couple of these
   photos were taken at home and a public site should not draw a ring round
   anyone's house.

   Labels are placed by hand because Boston and New York land close enough
   together to collide. */
export const MAP_POINTS = {
  massachusetts: { x: 352.5, y: 155.5, dx: 14, dy: 5, anchor: "start" },
  "new-york": { x: 333.5, y: 169.5, dx: -14, dy: 10, anchor: "end" },
  arkansas: { x: 205.2, y: 210.0, dx: 0, dy: 28, anchor: "middle" },
  southwest: { x: 86.3, y: 199.4, dx: 0, dy: 28, anchor: "middle" },
  "costa-rica": { x: 264.7, y: 394.6, dx: 0, dy: -20, anchor: "middle" },
  ireland: { x: 760.8, y: 56.0, dx: 0, dy: -20, anchor: "middle" },
  sicily: { x: 914.4, y: 196.1, dx: -14, dy: 5, anchor: "end" },
};

/* Captions are optional, keyed by "<folder>/<filename>". Anything without one
   falls back to the place and month from the photo's own metadata, which is a
   fact rather than a description. Only write one here when the file itself
   cannot say what the picture is. */
export const PHOTO_CAPTIONS = {
  "massachusetts/oasis-workshop.jpg": `Running a React workshop for [OASIS](${OASIS_URL}).`,
  "massachusetts/galway-boston-01.jpg":
    "Galway Boston, Junior B champions, 2022.",
};

export const PHOTOS_INTRO = "Places I have taken a photo. Click one.";

export const FOOTER_NOTE = "The maroon is Galway’s.";

export const CONTACT = {
  email: "flanagan.ci@northeastern.edu",
  github: "https://github.com/CiaranFlanagan",
  linkedin: "https://www.linkedin.com/in/ciaranflanagan1/",
  resume: "/resume.pdf",
};

/* The same four links appear in the hero and again in the footer. */
export const PROFILE_LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Résumé", href: CONTACT.resume },
];
