import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Photos from "./components/Photos";
import Footer from "./components/Footer";
import Lightbox from "./components/Lightbox";

const App = () => {
  // The set the lightbox is stepping through, and where it is in it.
  // `index` is null when closed.
  const [viewer, setViewer] = useState({ photos: [], index: null });

  const open = useCallback((photos, index) => setViewer({ photos, index }), []);
  const close = useCallback(() => setViewer((v) => ({ ...v, index: null })), []);
  const move = useCallback((index) => setViewer((v) => ({ ...v, index })), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink antialiased selection:bg-maroon-100">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6">
        <Hero />
        <About />
        {/* Photos sit above the work: it is the part of the page that is
            actually his, and burying it meant most visitors never reached it. */}
        <Photos onOpenPhoto={open} />
        <Experience />
        <Projects />
        <Footer />
      </main>
      <Lightbox
        photos={viewer.photos}
        index={viewer.index}
        onClose={close}
        onIndexChange={move}
      />
    </div>
  );
};

export default App;
