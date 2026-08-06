import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import ParallaxGallery from "./components/ParallaxGallery";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Small timeout to allow render before smooth scroll could trigger
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, [isLoading]);

  return (
    <div className="relative w-full bg-bg min-h-screen text-text-primary overflow-x-hidden selection:bg-text-primary selection:text-bg">
      
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <main>
            <Hero />
            <SelectedWorks />
            <Journal />
            <ParallaxGallery />
            <Stats />
          </main>
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;
