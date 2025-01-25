export const PROFILE_CONTENT = `  Computer Science student at Northeastern University with experience in software engineering, leadership, and project management.`;

export const ABOUT_TEXT = `I am a Computer Science student at Northeastern University, currently in my second year and actively seeking co-op opportunities for Fall 2025. I enjoy building innovative and impactful projects, applying my technical skills to solve real-world challenges. 

I have experience working as a Teaching Assistant for Fundamentals of Computer Science, supporting students in their learning and setting them up for success in their CS journeys. Additionally, I serve as the Project Series Director for Oasis, mentoring a cohort of over 100 students through web development workshops and team-based projects. These roles have enhanced my technical expertise and my ability to lead and collaborate effectively.

Outside of academics, I am passionate about Boston sports and enjoy playing Gaelic football and hurling. In my downtime, I also like skiing, exploring new ideas, and learning more about emerging technologies.`;

export const EXPERIENCES = [
  {
    year: "Aug 2024 – Present",
    role: "Teaching Assistant - Fundamentals of Computer Science I",
    company: "Northeastern University",
    location: "Boston, MA",
    description: `Led lab sessions for 50+ students, focusing on functional programming with Racket. Hosted office hours for 10-20 students and graded assignments and exams for 500+ students.`,
    technologies: [
      "Racket",
      "Functional Programming",
      "Recursion",
      "Higher-order Functions",
      "Data Abstraction",
      "Algorithmic Techniques",
    ],
  },
  {
    year: "May 2024 – Present",
    role: "Project Series Director, Executive Board Member",
    company: "Oasis",
    location: "Boston, MA",
    description: `Managed a 128-student cohort, teaching full-stack web development and overseeing 24 project teams. Delivered workshops on front-end, back-end, and project management. Coordinated events with Northeastern University CS organizations.`,
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "APIs",
      "Authentication",
      "Database Design",
      "Agile",
      "Version Control",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Museo",
    image: "museo.png",
    description: `Built and deployed an art gallery app using React and TypeScript, allowing users to browse and save artworks. Integrated the Metropolitan Museum of Art API for seamless artwork exploration and search. Used Supabase for backend services and Tailwind CSS for responsive styling, hosted on Netlify.`,
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
  },
  {
    title: "Three Trios",
    image: "three-trios.png",
    description: `Designed a two-player card game in Java, emphasizing OOP principles like encapsulation and modularity. Streamlined game logic with Java streams and lambdas for concise and reusable functionality. Built an interactive GUI with Java Swing to deliver an engaging and scalable user experience.`,
    technologies: ["Java", "Java Swing"],
  },
  {
    title: "CiaranFlanagan.com",
    image: "portfolio.png",
    description: `Created a portfolio website with React and TypeScript to showcase projects and skills. Styled with Tailwind CSS for a clean, responsive design that works across devices. Deployed on Netlify for fast, reliable hosting and easy updates.`,
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Submerged",
    image: "submerged.png",
    description: `Developed a survival game where players protect a submarine from evolving fish by fending them off. Applied a genetic algorithm as a machine learning approach to create adaptive and challenging fish behavior. Utilized HTML canvas for rendering dynamic animations and interactive gameplay.`,
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];

export const CONTACT = {
  address: "Boston, MA",
  phoneNo: "781-205-0452",
  email: "flanagan.ci@northeastern.edu",
};
