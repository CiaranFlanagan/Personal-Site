import Navbar from "./components/navbar";
import Profile from "./components/Profile";
import About from "./components/About";

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
    
      <div className="fixed top-0 -z-10 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
     
      <div className="container mx-auto px-8 h-screen flex flex-col justify-between">
        <Navbar />
        <Profile />
        <About />
      </div>
    </div>
  );
};

export default App;
