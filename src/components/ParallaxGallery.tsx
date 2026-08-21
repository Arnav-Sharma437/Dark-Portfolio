import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
];

export default function ParallaxGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: centerRef.current,
        start: "top top",
        end: "bottom bottom",
        pinSpacing: false,
      });

      // Parallax Columns
      gsap.fromTo(
        leftColRef.current,
        { y: "0%" },
        {
          y: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { y: "20%" },
        {
          y: "-70%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full bg-bg h-[300vh] overflow-hidden">
        
        {/* Floating Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#0d99ff]/20 rounded-full animate-[spin_30s_linear_infinite]" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 border border-[#0d99ff]/20 rotate-45" />
        <div className="absolute top-1/2 left-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#0d99ff]/30 to-transparent -translate-x-[200px]" />
        
        {/* Layer 1: Pinned Center */}
        <div ref={centerRef} className="absolute inset-0 h-screen w-full flex flex-col justify-center items-center text-center z-10 pointer-events-none px-4">
          
          <div className="absolute top-1/4 right-1/4 flex items-center gap-2 px-2 py-1 bg-[#0d99ff]/10 border border-[#0d99ff]/30 rounded-[4px] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-default">
            <span className="text-[10px] text-[#0d99ff] font-mono tracking-wider">Parallax Wrapper</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Process</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary mb-6 font-body font-light">
            How we <span className="font-display italic text-text-primary">work</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-sm mx-auto mb-8">
            From initial wireframes and visual design to custom Wix Studio deployment and SEO optimization, we craft high-ranking digital experiences.
          </p>
          <a href="#" className="pointer-events-auto group relative inline-flex items-center justify-center rounded-full">
            <span className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 animate-gradient-shift accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center justify-center bg-surface border border-stroke rounded-full px-6 py-3 text-sm text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent">
              Follow on Dribbble
            </span>
          </a>
        </div>

        {/* Layer 2: Parallax Columns */}
        <div className="absolute inset-0 w-full h-[300vh] z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto w-full h-full px-6 md:px-12 relative flex justify-between">
            
            {/* Left Column */}
            <div ref={leftColRef} className="w-1/3 md:w-1/4 h-[400vh] flex flex-col space-y-32 pt-[50vh]">
              {IMAGES.slice(0, 3).map((src, i) => (
                <div 
                  key={`l-${i}`} 
                  onClick={() => setSelectedImage(src)}
                  className="pointer-events-auto w-full max-w-[320px] aspect-square bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black/50 rotate-[-4deg] even:rotate-[2deg]"
                >
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div ref={rightColRef} className="w-1/3 md:w-1/4 h-[400vh] flex flex-col space-y-48 pt-[80vh] items-end">
              {IMAGES.slice(3, 6).map((src, i) => (
                <div 
                  key={`r-${i}`}
                  onClick={() => setSelectedImage(src)} 
                  className="pointer-events-auto w-full max-w-[320px] aspect-square bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black/50 rotate-[3deg] even:rotate-[-5deg]"
                >
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
