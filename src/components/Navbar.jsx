import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50 flex items-center justify-between py-6 px-4 md:px-8">
      <div className="flex flex-shrink-0 items-center">
        <span
          style={{ fontFamily: "Fredoka One, cursive" }}
          className="mx-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-galwayMaroon-700 to-galwayWhite"
        >
          CF
        </span>
      </div>
      <ul className="hidden md:flex space-x-4">
        <li>
          <a
            href="#profile"
            onClick={(e) => handleScroll(e, "profile")}
            className="hover:text-galwayMaroon-700"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, "about")}
            className="hover:text-galwayMaroon-700"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#technologies"
            onClick={(e) => handleScroll(e, "technologies")}
            className="hover:text-galwayMaroon-700"
          >
            Technologies
          </a>
        </li>
        <li>
          <a
            href="#experience"
            onClick={(e) => handleScroll(e, "experience")}
            className="hover:text-galwayMaroon-700"
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, "projects")}
            className="hover:text-galwayMaroon-700"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="hover:text-galwayMaroon-700"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="flex space-x-4">
        <a
          href="https://github.com/CiaranFlanagan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-2xl hover:text-galwayMaroon-700" />
        </a>
        <a
          href="https://www.linkedin.com/in/ciaranflanagan1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl hover:text-galwayMaroon-700" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
