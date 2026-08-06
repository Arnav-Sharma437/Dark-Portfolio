import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/40" : ""
        }`}
      >
        {/* 1. Logo */}
        <a 
          href="#"
          className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 hover:scale-110 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full animate-gradient-shift accent-gradient opacity-80 group-hover:opacity-100" />
          <div className="absolute inset-[1px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary mt-[2px]">JA</span>
          </div>
        </a>

        {/* 2. Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav Links */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {["Home", "Work", "Resume"].map((link, i) => {
            const isActive = i === 0;
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-300 ${
                  isActive 
                    ? "text-text-primary bg-stroke/50" 
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                }`}
              >
                {link}
              </a>
            );
          })}
        </nav>

        {/* 4. Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 5. "Say hi" button */}
        <a 
          href="#contact"
          className="group relative ml-2 sm:ml-0 inline-flex items-center justify-center rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
        >
          {/* Animated Gradient Border Layer */}
          <span className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300" />
          
          {/* Inner Content */}
          <span className="relative flex items-center justify-center w-full h-full bg-surface rounded-full backdrop-blur-md text-text-primary px-3 sm:px-4 py-1.5 sm:py-2">
            Say hi <span className="ml-1 text-[10px] sm:text-xs">↗</span>
          </span>
        </a>

      </div>
    </header>
  );
}
