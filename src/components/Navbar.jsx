import logo from "../assets/lebronnn.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10" src={logo} alt="logo did not load :(" />
      </div>
      <ul className="flex space-x-4">
        <li>
          <a href="#profile" className="hover:text-cyan-300">
            Profile
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-cyan-300">
            About
          </a>
        </li>
        <li>
          <a href="#technologies" className="hover:text-cyan-300">
            Technologies
          </a>
        </li>
        <li>
          <a href="#experience" className="hover:text-cyan-300">
            Experience
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-cyan-300">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-cyan-300">
            Contact
          </a>
        </li>
      </ul>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a
          href="https://github.com/CiaranFlanagan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/ciaranflanagan1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
