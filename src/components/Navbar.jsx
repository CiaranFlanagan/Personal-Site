import logo from "../assets/lebronnn.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6 px-4 md:px-8">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10" src={logo} alt="logo did not load :(" />
      </div>
      <ul className="hidden md:flex space-x-4">
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
      <div className="flex space-x-4">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-2xl hover:text-cyan-300" />
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl hover:text-cyan-300" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
