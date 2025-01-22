import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6 px-4 md:px-8">
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
          <a href="#profile" className="hover:text-galwayMaroon-700">
            Profile
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-galwayMaroon-700">
            About
          </a>
        </li>
        <li>
          <a href="#technologies" className="hover:text-galwayMaroon-700">
            Technologies
          </a>
        </li>
        <li>
          <a href="#experience" className="hover:text-galwayMaroon-700">
            Experience
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-galwayMaroon-700">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-galwayMaroon-700">
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
