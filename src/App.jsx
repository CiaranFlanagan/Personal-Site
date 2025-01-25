import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackToTopButton from "./components/BackToTopButton";

const App = () => {
  return (
    <div className="overflow-x-hidden h-screen text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen flex flex-col">
      <div className="fixed top-0 -z-10 w-full min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <Navbar />
      <div className="container mx-auto px-8 flex-grow flex flex-col justify-between pt-24">
        <section id="profile">
          <Profile />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="technologies">
          <Technologies />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default App;
