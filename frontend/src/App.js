import { useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import BootSequence from "@/components/BootSequence";
import OceanBackground from "@/components/OceanBackground";
import AnchorCursor from "@/components/AnchorCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Certs from "@/components/Certs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="App overflow-x-hidden font-display text-white antialiased">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <OceanBackground />
      <AnchorCursor />
      <Navbar />
      <main
        className={`relative transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero booted={booted} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Certs />
        <Contact />
        <Footer />
      </main>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
