import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProjectSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ProgressBar from './components/ProgressBar.jsx'; 

export default function App() {

  useEffect(() => {
     // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger when the page is fully loaded
    ScrollTrigger.refresh();
         
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  }, [])

  return (
    <>
    <Header />
    <HeroSection />
    <CustomCursor />
    <AboutSection />
    <ProjectSection />
    <ContactSection />
    <Footer />
    <ProgressBar />
    </>
  )
}