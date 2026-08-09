import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Photos from "./components/Photos";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";

const App = () => {
  // null = closed; otherwise the index into `photos`.
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink antialiased selection:bg-maroon-100">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Photos onOpenPhoto={setLightboxIndex} />
        <Footer />
      </main>
      <Lightbox
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};

export default App;
